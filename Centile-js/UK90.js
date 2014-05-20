function erf(x) {
  // calculates the Error Function of a normal(Z) distribution
  // erf() function borrowed from JStat.js library
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

function erfcinv(p) {
  // Returns the inverse of the complementary error function
  var j = 0;
  var x, err, t, pp;
  if (p >= 2)
    return -100;
  if (p <= 0)
    return 100;
  pp = (p < 1) ? p : 2 - p;
  t = Math.sqrt(-2 * Math.log(pp / 2));
  x = -0.70711 * ((2.30753 + t * 0.27061) /
                  (1 + t * (0.99229 + t * 0.04481)) - t);
  for (; j < 2; j++) {
    err = (1-erf(x)) - pp;
    x += err / (1.12837916709551257 * Math.exp(-x * x) - x * err);
  }
  return (p < 1) ? x : -x;
};

function cdf(x, mean, std) {
  // calculates the Cumulative Distribution Function
  // (returns percentile given a z-score)
  // cdf() function borrowed from JStat.js library
  return 0.5 * (1 + erf((x - mean) / Math.sqrt(2 * std * std)));
}

function invcdf(p, mean, std) {
  // calculates the Inverse Cumulative Distribution Function
  // (returns <zscore> given a <percentile>)
  // this borrowed from Jstat.normal.inv()
    return -1.41421356237309505 * std * erfcinv(2 * p) + mean;
  }

function contextMeasurements(LMS, contextCentiles) {
  // calculates some measurements at a range of percentiles, given the
  // LMS values and an optional argument contextCentiles (see below)

  // unpack LMS array into separate variables
  var L = LMS[0], M = LMS[1], S = LMS[2];

  // contextCentiles is an array containing which centiles the user would
  // would like to see as contextual information. If contextCentiles
  // is undefined then the default is to return contextual measurements
  // for the 3rd, 5th, 10th, 25th, 50th, 75th, 90th, 95th, and 97th centiles.
  // 'custom' contextCentiles will be returned in the order in which they are specified.
 
  if (typeof contextCentiles === 'undefined') {
    contextCentiles = [0.03, 0.05, 0.10, 0.25, 0.50, 0.75, 0.90, 0.95, 0.97];
  }
  var contextValues = {};

  for (var i = 0; i < contextCentiles.length; i++) {
    zscore = invcdf(contextCentiles[i], 0, 1)
    if (L==0) {
      measurement = M*Math.exp(S*zscore);
    }
    else {
      measurement = M*(Math.pow((1+L*S*zscore),(1/L)));
    }
    //contextValues.push(measurement);
	contextValues[''+(contextCentiles[i]*100)+'%']=measurement;
  }
  return contextValues;
}

function lmsToCentile(X, LMS) {
    // calculates a percentile value when given the measurement, 
    // and L M S values as an array of the three values eg [L, M, S]
    // Works for any of the parameters (weight, BMI etc)
    
    // formulae taken from http://www.cdc.gov/growthcharts/percentile_data_files.htm
    // X is the measurement under consideration
    // returns the percentile as a number from 0 to 100

    // unpack LMS into separate variables
    var L = LMS[0], M = LMS[1], S = LMS[2];

    if (L === 0) {
      zscore = Math.log((X/M)/S);
    }
    else {
      zscore = ((Math.pow((X/M), L)-1)/(L*S));
    };

    centile = 100 * cdf(zscore, 0, 1);
    
    return centile;
  }

module.exports = {
  getData: function(X, LMS, contextCentiles) {
    return {
      Centile: lmsToCentile(X, LMS),
      Context: contextMeasurements(LMS, contextCentiles)
    }
  }
};