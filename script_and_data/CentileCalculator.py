#!usr/bin/python

from math import * 
from numpy import *
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
	heightCentile = lms_to_centile(height, L, M, S)
	return heightCentile


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
	weightCentile = lms_to_centile(weight, L, M, S)
	return weightCentile
	

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
	
	bmi = weight/((height/100)**2)
	bmiCentile = lms_to_centile(bmi, L, M, S)
	return bmiCentile

	
def lms_to_centile(X, L, M, S):
	# formulae taken from http://www.cdc.gov/growthcharts/percentile_data_files.htm
	#X is the measurement under consideration
	#returns the percentile as a number from 0 to 1
	if L==0:
		Z = ln(X/M)/S
	else:
		Z = (((X/M)**L)-1)/(L*S)
	centile = (1+erf(Z/sqrt(2)))/2
	return centile
	
def get_lms_and_percentiles(array):
	L = array[2]
	M = array[3]
	S = array[4]
	p3 = array[5]
	p5 = array[6]
	p10 = array[7]
	p25 = array[8]
	p50 = array[9]
	p75 = array[10]
	p90 = array[11]
	p95 = array[12]
	p97 = array[13]
	return [L, M, S, p3, p5, p10, p25, p50, p75, p90, p95, p97]



#grab command line args: (argv[0]=script name), height, weight, age, sex
height = float(sys.argv[1]) #centimetres
weight = float(sys.argv[2]) #kilograms
age = float(sys.argv[3])    #months
sex = str(sys.argv[4])    # "M" or "F"


print "Height percentile is: " + str(calculate_height_centile(height, age, sex))
print "Weight percentile is: " + str(calculate_weight_centile(weight, age, sex))
print "BMI percentile is: " + str(calculate_bmi_centile(height, weight, age, sex))
