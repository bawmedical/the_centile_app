*the_centile_app* API Documentation and Technical Notes
===============================================
*note that this documentation is still in development. At present it is actually more of a specification to serve as guidance for those developing the API itself*

##Background
Inside *the_centile_app*, centiles are calculated from raw statistical data about the range of 'normal' heights and weight, derived from the UK90 LMS Tables owned by the Medical Research Council. The MRC have very kindly granted us a free license to use this data to build this public platform which greatly simplifies the work involved in getting a centile out of values for height, weight, age and sex.

Unfortunately, there is no simple mathematical 'algorithm' at work. Neither is this a simple lookup table, although we may investigate the latter possibility as a means of optimising the app at scale.

If you wish to fork our project, our app and site code is free and open source however, but not the LMS tables, which are not our property and thereforewe are unable to pass these on with our code. You may well be able to obtain your own licence from the MRC however - they were very straightforward with us.

##Terms Of Use
**Free at the point of use** We have built *the_centile_app* in good faith to provide functionality that does not currently exist on the web, and to benefit patients and medical professionals. The terms of our licence for the data explicitly state that we have been granted a free license in order to produce a free webapp. We believe that this should also include any client applications. At present, **ALL** applications making use of this API should be free and non-commercial (ie no advertising, no fee for use, no membership fees)

##API
*the_centile_app* exposes its centile calculating functionality as a REST API.

Submit a HTTP POST request with a JSON payload containing:

* age of patient **in months** (constraints: negative values and values > 480 months will be rejected as these are outside the scope of a paediatric centile calculation. 1 decimal place)
* sex of the patient (the string "M" or "F", everything else will be rejected)
* height/length (eg for a baby) **in metres** (constraints: 1 significant digit, 2 decimal places are **required**)
* weight **in kilograms** (constraints: 3 significant digits, 1 decimal place. Arbitrary maximum value 500)

If the request is valid, the response from the server will be JSON containing:

* the parameters you submitted in your request (to allow for some closed-loop error checking on the client side and to aid in detection of a server side bug)
* centile value for height/length (integer between 0 and 100)
* centile value for weight (integer between 0 and 100)
* BMI - Body Mass Index corrected for age (numeric with 2 significant digits, 1 decimal place)

##Important Notes
* at present, for various reasons including bandwidth issues, the API allows one request per IP address per 60 seconds.

###Less Important Notes
* Head Circumference centile is not currently supported
* API use is logged 





