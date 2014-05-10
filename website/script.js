$( document ).ready(function() {
  //quick - someone's coming - hide everything!
  $("#why, #results, #thanks").hide();
  var patientSex = $('form input[name=radios]:checked').val();
  setColourScheme();
  
  //page striptease slow toggles
  $("#why-link").click(function() {
    $("#why").slideToggle("slow");
    $(".filler").slideToggle();
  });
  $("#thanks-link").click(function() {
    $("#thanks").slideToggle("slow");
  });

  function setColourScheme() {
    //toggle colour scheme for boys/girls
    if (patientSex == "Male") {
      $("body").css({backgroundImage: "url('images/bokeh_growth_chart_boys.jpg')"});
      $(".nav").css({backgroundColor: "#C2E3F1"});
      $(".nav a").css({color: "#58A9F1"});
    }
    else {
      $("body").css({backgroundImage: "url('images/bokeh_growth_chart_girls.jpg')"});
      $(".nav").css({backgroundColor: "#FBE1ED"});
      $(".nav a").css({color: "#ED95C1"});
    }
  };

  //to suppress automatic page reload on submitting form
  $('#centileform').submit(function () {
    return false;
  });

  $("#patient-sex input").on("click", function(){
    patientSex = $(this).attr('value');
    setColourScheme();
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
});