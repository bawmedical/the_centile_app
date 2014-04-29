#!usr/bin/python

from math import * 
from numpy import genfromtxt, isnan
import scipy.stats as st
import sys

# column format for UK90 data: 0=Age, (1,2,3)=Height(LMS male), 
# (4,5,6)=Height(LMS female), (7,8,9)=Weight(LMS male), 
# (10,11,12)=Weight(LMS female), (13,14,15)=BMI(LMS male)
# (16,17,18)=BMI(LMS female)

# row format for UK90 data: 0,1= information. row 19 is 0 years old. 
# row 19-n is n weeks premature (for n up to 17)
# row 19+n is n months old (for n up to 276)

# args in: height, weight, age, sex
# "premature?" argument not needed, can just assume that age is in 
# weeks if negative but this must be coded into whatever function calls this.

def get_row_of_table(age):
	#opens UK90 data, returns row with LMS scores for (male&female) 
	#BMI, height and weight
	UK90 = genfromtxt('UK90_height_weight_bmi.csv', delimiter=',')
	return UK90[19+age]
	
def get_LMS_height(uk90Row,sex):
	#LMS for height starts at 1 for male, 4 for female
	#sex has been converted to 0 for male, 3 for female
	[L,M,S] = uk90Row[1+sex:1+sex+3]
	return [L,M,S]

def get_LMS_weight(uk90Row,sex):
	#LMS for weight starts at 7 for male, 10 for female
	#sex has been converted to 0 for male, 3 for female
	[L,M,S] = uk90Row[7+sex:7+sex+3]
	return [L,M,S]	

def get_LMS_bmi(uk90Row,sex):
	#LMS for height starts at 13 for male, 16 for female
	#sex has been converted to 0 for male, 3 for female
	[L,M,S] = uk90Row[13+sex:13+sex+3]
	return [L,M,S]
	
def lms_to_centile(X, L, M, S):
	# formulae taken from http://www.cdc.gov/growthcharts/percentile_data_files.htm
	#X is the measurement under consideration
	#returns the percentile as a number from 0 to 100
	if L==0:
		Z = log(X/M)/S
	else:
		Z = (((X/M)**L)-1)/(L*S)
	centile = 100*st.norm.cdf(Z)
	return centile
	
def centile_to_measurement(centile, L, M, S):
	Z = st.norm.ppf(float(centile)/100)
	if L==0:
		X = M*exp(S*Z)
	else:
		X = M*((1+L*S*Z)**(1/L))
	return X
	
def sig_fig(x,n):
	# rounds number to n significant figures
	if x==0:
		return 0
	else:
		return round(x, n-1-int(floor(log10(x)))) 
	
def display_context(context_measurements,CONTEXT_CENTILES):
	for i in range(0,len(CONTEXT_CENTILES)):
		print str(CONTEXT_CENTILES[i]) + "%: " + str(sig_fig(context_measurements[i],4))
	return
	
def calculate_centiles_and_context(height,weight,age,sex):
	height = float(height) #centimetres
	weight = float(weight) #kilograms
	age = round(float(age))    #months if positive, weeks if negative
	bmi = weight/((height/100)**2)
	# convert sex to 0 or 3 for ease of use in getting data from UK90 table
	if sex=="M":
		sex = 0
	elif sex == "F":
		sex = 3
	
	#get LMS for height, weight, BMI
	uk90Row = get_row_of_table(age)
	nans = isnan(uk90Row)
	uk90Row[nans]=0 #setting nan to zero is necessary for three_sig_fig()
	heightLMS = get_LMS_height(uk90Row,sex)
	weightLMS = get_LMS_weight(uk90Row,sex)
	bmiLMS = get_LMS_bmi(uk90Row,sex)
	
	#calculate centiles
	heightCentile = lms_to_centile(height,*heightLMS)
	weightCentile = lms_to_centile(weight,*weightLMS)	
	bmiCentile 	  = lms_to_centile(bmi,*bmiLMS)
	
	#calculate contexts
	heightContext=[]
	weightContext=[]
	bmiContext=[]
	for centile in CONTEXT_CENTILES:
		heightContext.append(centile_to_measurement(centile,*heightLMS))
		weightContext.append(centile_to_measurement(centile,*weightLMS))
		bmiContext.append(centile_to_measurement(centile,*bmiLMS))
		
	return [heightCentile,weightCentile,bmiCentile,
			heightContext,weightContext,bmiContext]


CONTEXT_CENTILES  = [97, 95, 90, 75, 50, 25, 10, 5, 3]

if __name__ == "__main__":
	#grab arguments from command line
	height = sys.argv[1] #centimetres
	weight = sys.argv[2] #kilograms
	age = sys.argv[3]    #months if positive, weeks if negative
	sex = str(sys.argv[4])    # "M" or "F"
	
	[heightCentile,weightCentile,bmiCentile,
	heightContext,weightContext,bmiContext] = calculate_centiles_and_context(
	height,weight,age,sex)

	print "Height centile is: " + str(round(heightCentile,1)) + "%"
	print "Weight centile is: " + str(round(weightCentile,1)) + "%"
	print "BMI centile is: " +    str(round(bmiCentile,1)) + "%"
	
	print"-------------------"

	print "For context, the height centiles are: "
	display_context(heightContext,CONTEXT_CENTILES)

	print"-------------------"

	print "For context, the weight centiles are: "
	display_context(weightContext,CONTEXT_CENTILES)

	print"-------------------"

	print "For context, the BMI centiles are: "
	display_context(bmiContext,CONTEXT_CENTILES)

	if float(age)<-7:
		print "Note that for babies more than 7 weeks premature, \
there is no data for height or BMI"



