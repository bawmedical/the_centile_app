#!usr/bin/python

from math import * 
from numpy import *
import scipy.stats as st
import sys

def get_all_centiles(height,weight,age,sex):
	#TODO: add conversion for metric/imperial?
	heightCentile = calculate_height_centile(height, age, sex)
	weightCentile = calculate_weight_centile(weight, age, sex)
	bmiCentile = calculate_bmi_centile(heightCentile, weightCentile, sex)
	return(heightCentile,weightCentile,bmiCentile)


def calculate_height_centile(height, age, sex):
	heightData = genfromtxt('statage.csv', delimiter=',')
	if sex=='M':
		sex = 1
	else:
		sex = 2
		
	i=0;
	while (heightData[i][0]!=sex)|(round(heightData[i][1])!=age):
		i=i+1
	
	[L,M,S,p3,p5,p10,p25,p50,p75,p90,p95,p97] = get_lms_and_percentiles(heightData[i])
	context = [p3,p5,p10,p25,p50,p75,p90,p95,p97]
	heightCentile = lms_to_centile(height, L, M, S)
	return heightCentile, context


def calculate_weight_centile(weight, age, sex):
	weightData = genfromtxt('wtage.csv', delimiter=',')		
	if sex=='M':
		sex = 1
	else:
		sex = 2
		
	i=0;
	while (weightData[i][0]!=sex)|(round(weightData[i][1])!=age):
		i=i+1
	
	[L,M,S,p3,p5,p10,p25,p50,p75,p90,p95,p97] = get_lms_and_percentiles(weightData[i])
	context = [p3,p5,p10,p25,p50,p75,p90,p95,p97]
	weightCentile = lms_to_centile(weight, L, M, S)
	return weightCentile, context
	

def calculate_bmi_centile(height, weight, age, sex):
	bmiData = genfromtxt('bmiagerev.csv',delimiter=',')
	if sex=='M':
		sex = 1
	else:
		sex = 2
		
	i=0;

	while (bmiData[i][0]!=sex)|(round(bmiData[i][1])!=age):
		i=i+1
	
	[L,M,S,p3,p5,p10,p25,p50,p75,p90,p95,p97] = get_lms_and_percentiles(bmiData[i])
	context = [p3,p5,p10,p25,p50,p75,p90,p95,p97]
	bmi = weight/((height/100)**2)
	bmiCentile = lms_to_centile(bmi, L, M, S)
	return bmiCentile, context

	
def lms_to_centile(X, L, M, S):
	# formulae taken from http://www.cdc.gov/growthcharts/percentile_data_files.htm
	#X is the measurement under consideration
	#returns the percentile as a number from 0 to 1
	if L==0:
		Z = ln(X/M)/S
	else:
		Z = (((X/M)**L)-1)/(L*S)
	centile = st.norm.cdf(Z)
	return centile
	
def get_lms_and_percentiles(array):
	[L, M, S, p3, p5, p10, p25, p50, p75, p90, p95, p97] = array[2:14]
	return [L, M, S, p3, p5, p10, p25, p50, p75, p90, p95, p97]

def display_context(percentiles):
	print "3%: " + str(percentiles[0])
	print "5%: " + str(percentiles[1])
	print "10%: " + str(percentiles[2])
	print "25%: " + str(percentiles[3])
	print "50%: " + str(percentiles[4])
	print "75%: " + str(percentiles[5])
	print "90%: " + str(percentiles[6])
	print "95%: " + str(percentiles[7])
	print "97%: " + str(percentiles[8])


#grab command line args: (argv[0]=script name), height, weight, age, sex
height = float(sys.argv[1]) #centimetres
weight = float(sys.argv[2]) #kilograms
age = float(sys.argv[3])    #months
sex = str(sys.argv[4])    # "M" or "F"

[heightCentile, heightContext] = calculate_height_centile(height, age, sex)
[weightCentile, weightContext] = calculate_weight_centile(weight, age, sex)
[bmiCentile, bmiContext] = calculate_bmi_centile(height, weight, age, sex)

print("Height percentile is: %.1f" % (heightCentile*100) +"%")
print("Weight percentile is: %.1f" % (weightCentile*100) +"%")
print("BMI percentile is: %.1f" % (bmiCentile*100) +"%")

print"-------------------"

print "For context, the height centiles are: "
display_context(heightContext)

print"-------------------"

print "For context, the weight centiles are: "
display_context(weightContext)

print"-------------------"

print "For context, the BMI centiles are: "
display_context(bmiContext)
