function calculateCentile(height, weight, age, sex) {

}

// calculates a percentile value when given the measurement, 
// and L M S values. Works for any parameter (weight, BMI etc)
function lmsToCentile(X, L, M, S) {
  // formulae taken from http://www.cdc.gov/growthcharts/percentile_data_files.htm
  // X is the measurement under consideration
  // returns the percentile as a number from 0 to 100
  if (L === 0) {
    zscore = Math.log((X/M)/S)
  }
  else {
    zscore = ((Math.pow((X/M), L)-1)/(L*S));
  }
  centile = 100 * cdf(zscore, 0, 1)
  // I'm not completely sure why but the parameters from the cdf() function
  // allow mean = 0 and sd = 1 and the results are still correct
  // according to Wolfram Alpha
  
  return centile
}

// calculates the Error Function of a normal(Z) distribution
// erf() function borrowed from JStat.js library
function erf(x) {
  var cof = [-1.3026537197817094, 6.4196979235649026e-1, 1.9476473204185836e-2,
             -9.561514786808631e-3, -9.46595344482036e-4, 3.66839497852761e-4,
             4.2523324806907e-5, -2.0278578112534e-5, -1.624290004647e-6,
             1.303655835580e-6, 1.5626441722e-8, -8.5238095915e-8,
             6.529054439e-9, 5.059343495e-9, -9.91364156e-10,
             -2.27365122e-10, 9.6467911e-11, 2.394038e-12,
             -6.886027e-12, 8.94487e-13, 3.13092e-13,
             -1.12708e-13, 3.81e-16, 7.106e-15,
             -1.523e-15, -9.4e-17, 1.21e-16,
             -2.8e-17];
  var j = cof.length - 1;
  var isneg = false;
  var d = 0;
  var dd = 0;
  var t, ty, tmp, res;

  if (x < 0) {
    x = -x;
    isneg = true;
  }

  t = 2 / (2 + x);
  ty = 4 * t - 2;

  for(; j > 0; j--) {
    tmp = d;
    d = ty * d - dd + cof[j];
    dd = tmp;
  }

  res = t * Math.exp(-x * x + 0.5 * (cof[0] + ty * d) - dd);
  return isneg ? res - 1 : 1 - res;
};

// calculates the Cumulative Distribution Function
// (returns percentile given a z-score)
// cdf() function borrowed from JStat.js library
function cdf(x, mean, std) {
  return 0.5 * (1 + erf((x - mean) / Math.sqrt(2 * std * std)));
}


//for testing this payload is the 50th centile for both height
//and weight for a 4 year old (48 month old) male:
//calculateCentile(102.49, 16.551, 48, "M")

console.log(lmsToCentile(102.06, 1, 103.06, 0.04021))

