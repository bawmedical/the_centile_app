#!usr/bin/python
import scipy.stats as st

value = 80.72977321
L = 0.941523967
M = 86.45220101
S = 0.040321528  

z_score = (((value/M)**L)-1.0)/(L*S)
print "z-score:" + str(z_score)
print "percentile:" + str(st.norm.cdf(z_score))

  
