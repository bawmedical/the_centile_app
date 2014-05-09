the_centile_app
===============
* a suite of tools for calculating paediatric growth centiles from LMS statistical tables.
    * CDC directory contains (mostly deprecated) code for calculating centiles from the freely available US CDC LMS tables, we mainly used this for initial development before our license application with the MRC UK came through.
    * UK90 directory contains code for calculating centiles from the UK90 LMS tables:
        * UK90.js - javascript/node.js implementation
        * UK90.py - python implementation
        * UK90.rb - [planned]
* website to contain a webapp for calculating centiles:
    * explanatory notes and FAQ for parents, technical FAQ, API documentation
    * see website for more details

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

###Paul Rubenstein (biomedical statistician)
* statistical advice in plain English
* Python engine for centile lookups

###Chris Casey (CPC Computer Solutions)
* API development in EWD/Swagger/node.js
* AWS cloud hosting
* Twitter: @ChrisPCasey

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
