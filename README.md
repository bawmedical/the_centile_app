the_centile_app
===============
A suite of tools for calculating paediatric growth centiles from LMS statistical tables, including a basic scriptology, REST API, UI elements, supporting documentation

* Centile-js directory contains UK90.js - basic code in javascript which will return a centile, when given age, sex, height, weight as input. As it is currently written there is no command line usage, it would need to be integrated into a webapp or node.js for use. It is left here as a resource of working statistical code for conversion of LMS tables into centiles.
* EWD-based-webapp contains the code and all dependencies for the EWD-based web application
* Mobile-webapp is essentially a fork of the centile_app project with the aim of allowing the calculations to be done in the client device. It's aimed at mobile workers such as hospital doctors.
* PyCentile contains Python scripts for calculating centiles from LMS data + age, sex, height, weight information. There are two different versions, one for use with the UK90 LMS tables and the other for use with the CDC's USA LMS tables.

* **IMPORTANT: Essential data contained within this app's repository is COPYRIGHTED and is NOT freely distributable. PLEASE ENSURE YOU READ THE LICENSE DOCUMENT FULLY**

Contributors
------------

###Dr Marcus Baw (GP, director BawMedical Ltd, director openGPSoC-CIC)
* MRC License application for use of UK90 LMS tables
* Website content & UI (yes my fault)
* API specification and initial documentation
* javascript centile engine
* Twitter: @marcus_baw
* Web: http://www.bawmedical.co.uk

###Chris Casey (CPC Computer Solutions)
* API development in EWD/Swagger/node.js
* AWS cloud hosting
* Twitter: @ChrisPCasey

###Paul Rubenstein (biomedical statistician)
* statistical advice in plain English
* Python engine for centile lookups

###Rob Dyke (director Tactix4, director openGPSoC-CIC )
* N3 hosting
* Twitter: @robdykedotcom
* Web: http://www.tactix4.com

###NHSHackDay Google Group contributors (thread: http://goo.gl/r8EiyN)
* feature requests & general support

Acknowledgements
----------------
* Professor Tim Cole (https://iris.ucl.ac.uk/iris/browse/profile?upi=TCOLE39) who originally developed the LMS tables.
* the Medical Research Council (http://www.mrc.ac.uk/index.htm), whom are the copyright owners of the UK90 LMS Tables and who very kindly have provided us with a free license to use them for non-profit purposes in an open source app.
* the Centers for Disease Control (http://www.cdc.gov/), who openly publish their LMS tables and formulae (http://www.cdc.gov/growthcharts/percentile_data_files.htm), which gave us an advance test-bed for building the Python centile engine, and gave us some important pointers as to how to do the conversion from measurement to centile.
* with thanks to the Scipy.stats Python library and the JStat JavaScript library.
