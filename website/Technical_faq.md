#Technical

##What is a centile? (because not *all* techies are `/^math|maths/` geeks)
A centile is a way of demonstrating where a particular measurement lies within a distribution of data. A good way to express it in a way that makes sense is if a measurement is at the 20th centile, then it is higher than 20% of the population's measurement. (and, therefore, lower than 80%). So, to pick random examples, a low measurement might be at something like the 5th centile, a high measurement could be the 97th. In the very centre of the distribution and at the very middle value, is the **Median**, which is mathematically identical to the 50th centile.

##How are the centiles calculated?
For each sex and age point (in months), there is a normal distribution of weight and height. The characteristics of this normal distribution are described in terms of the parameters L, M and S - these stand for median (M), the generalized coefficient of variation (S), and the power in the Box-Cox transformation (L).
The equation for calculating a centile from a measurement (eg height or weight) and the L, M and S characteristics is:

**Step 1** - calculate z-score (degree of deviation from the mean of a measurement in units of 1 SD)

           ((X/M)**L) - 1
    Z = -------------------- (assumes L≠0, which it is for our dataset)
           LS

(source: http://www.cdc.gov/growthcharts/percentile_data_files.htm)

**Step 2** - convert z-score into a percentile

This is done via a mathematical 'lookup table' of a  typical normal distribution, in the programming languages I have looked at, the lookup is described as the Cumulative Distribution Function CDF.

In Python (yuk), these two steps boil down to:

`centile = scipy.stats.norm.cdf( ( ((measurement/M)**L)-1.0) / (L*S) )`

The rest of our open source code is on GitHub at https://github.com/openGPSoC/the_centile_app, please take a look, optimise, improve, criticise, bugfix, fork, etc...

