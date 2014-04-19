Why?
====

Prior to the developemt of the_centile_app, the only way to work out a child's growth centile was to use a traditional centile chart <link> either on paper or as a downloadable PDF <link>.

The disadvantages of this are:
------------------------------
* it's actually not that accurate and is prone to visual tracking errors
* using a paper chart designed for multiple measurements means it's actually a problem to deal with the document in most paperless GP systems - once it's been scanned for storage, it can't then be updated with new centile measurements (unless you are truly crazy, and print out the old one, add new data, and scan it in again... madness)
* the actual centile number was never in a form that could be automatically saved into a GP system

It also meant that we tended to use the chart as the sole method of visualisation of the data over time, failing to separate the means of calculation from the means of presentation. Just because we need the chart to calculate

We at openGPSoC thought it was important that clinicians and parents could find out this simple information in a much more "web 2.0" way.

Advantages of a computerized centile calculation engine:
--------------------------------------------------------
* we can calculate the centile to a higher accuracy than just "between the 25th and 50th centile"
* data is in a computable form and can be saved as coded data in GP and other paperless record systems
* the data can be consumed in a variety of ways - as a mobile app, in a browser, by third party applications via the API
* new ways of visualising centile measurements may be developed

Perhaps the main reason that this had not been done before is that the centiles are calculated from the UK90 LMS data which is the property and copyright of the Medical Research Council.

openGPSoC, not being deterred, approached them and asked for a license to use the data, which they gave us.
