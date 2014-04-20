#!usr/bin/python
import scipy.stats as st

value = 81.99171445 #this should be the 50th percentile
L = 0.941523967
M = 86.45220101
S = 0.040321528  

z_score = (((value/M)**L)-1.0)/L*S
print z_score

print st.norm.ppf(z_score)

  
