#!usr/bin/python
import scipy.stats as st
import sys

#grab command line args: (argv[0]=script name), height, weight, age, sex
height = float(sys.argv[1]) #centimetres
weight = float(sys.argv[2]) #kilograms
age = float(sys.argv[3])    #months
sex = float(sys.argv[4])    # "M" or "F"

#lookup LMS values for that age and sex from dataset currently hardcoded for 1yr old male and height chart
#TODO
L = 0.941523967
M = 86.45220101
S = 0.040321528

#calculate percentile of the offered values
height_centile = st.norm.cdf( ( ((height/M)**L)-1.0) / (L*S) )
#weight_centile = st.norm.cdf( ( ((weight/M)**L)-1.0) / (L*S) )

print "percentile:" + str(height_centile)

#need to return a range of values for context - eg heights for 3rd, 5th, 10th, 50th....
 
