$( document ).ready(function() {
  //quick - hide everything!
  $("#why, #results, #thanks").hide();
  
  function toggleColourScheme() {
    //code to switch between blue & pink 
  }

  //to suppress automatic page reload on submitting form
  $('#centileform').submit(function () {
    return false;
  });

  var patientSex = "Female"; //this is the default value as set in the HTML definition of the radio buttons
  $("#patient-sex input").on("click", function(){
    patientSex = $(this).attr('value');
    toggleColourScheme();
  });

  $( "#calculate-centile" ).click( function() {
    $("#results").slideUp("fast");
    patientSex = $('form input[name=radios]:checked').val();
    var patientAge = ($( "#patient-age" ).val())/12; //convert months to years
    var patientHeight = ($( "#patient-height" ).val())/100; //convert cm to metres
    var patientWeight = $( "#patient-weight" ).val();
    console.log(patientSex + patientAge + patientHeight + patientWeight); //left in for testing

    //need error checking logic and rejection of silly entries in here
    //age 0 to 23
    //height 0.3m to 2.5m
    //weight 0kg to 250kg

    //build payload
    swaggerurl = "http://ec2-54-237-33-114.compute-1.amazonaws.com:8020/ec2/Centile/GetAllCentiles?AgeInYears="+patientAge+"&HeightInMetres="+patientHeight+"&Sex="+patientSex+"&WeightInKG="+patientWeight;

    //API call
    $.get(swaggerurl, function(data,status){
      console.log(status);
      console.log("heightcentile: "+ data.HeightStats.Centile, "weightcentile: "+data.WeightStats.Centile, "BMI: "+data.BMI, "BMIcentile: "+data.BMIStats.Centile);

      //enter results into table#results
      $("td#heightcentile").html(Math.round(data.HeightStats.Centile)+"th");
      $("td#weightcentile").html(Math.round(data.WeightStats.Centile)+"th");
      $("td#bmi").html(Math.round(data.BMI)+" kgm<sup>-2</sup>");
      $("td#bmicentile").html(Math.round(data.BMIStats.Centile)+"th");
      $("#results").slideDown("slow");
    });
  });


  $("#why-link").click(function() {
    $("#why").slideToggle();
    $(".filler").slideToggle();
  });

  $("thanks-link").click(function() {
    $("#thanks").slideToggle();
    $(".filler").slideToggle();
  });

  $.ajax({
    url: "http://ec2-54-237-33-114.compute-1.amazonaws.com:8020/ec2/Centile/swagger/",

  });

});