$( document ).ready(function() {

  function displayVals() {
  var patientAge = $( "#patient-age" ).val();
  var patientHeight = $( "#patient-height" ).val();
  var patientWeight = $( "#patient-weight" ).val();

  $( "#show-age" ).append( "<p>Test</p>")
  }

  $( "#calculate-centile" ).click( displayVals() );

});