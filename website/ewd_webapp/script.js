EWD.sockets.log = true; //make this false after testing so socket messages don't appear in the console
EWD.application = {
	name: 'Centile', //this specifies the server code to call
	timeout: 3600,
	onStartup: function() {
		//you could load page fragments here e.g. 	EWD.getFragment('main.html', 'mainPanel');
	},
	onFragment: {
		//here you could put js code to run after each fragment loads e.g.
		//'main.html': function() {}
	},
	onMessage: {
		//this is where messages received from the server are processed
		getCentiles: function(messageObj) {
		  if (messageObj.message.error) {
			toastr.warning(messageObj.message.error);
			return;
			};
		  data=messageObj.message;
		  console.log(status);
		  console.log("heightcentile: "+ data.HeightStats.Centile, "weightcentile: "+data.WeightStats.Centile, "BMI: "+data.BMI, "BMIcentile: "+data.BMIStats.Centile);

		  //enter results into table#results
		  $("td#heightcentile").html(Math.round(data.HeightStats.Centile)+"th");
		  $("td#weightcentile").html(Math.round(data.WeightStats.Centile)+"th");
		  $("td#bmi").html(Math.round(data.BMI)+" kgm<sup>-2</sup>");
		  $("td#bmicentile").html(Math.round(data.BMIStats.Centile)+"th");
		  $("#results").slideDown("slow");		
		}
	}
};

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
  
  $('body').on( 'click', '#calculate-centile', function(event) {
	event.preventDefault(); event.stopPropagation();
	$("#results").hide();
	EWD.sockets.sendMessage({
		type: 'getCentiles',
		params: {
			ageInYears: Math.floor(($( "#patient-age" ).val()) / 12),
			ageInMonths: (($( "#patient-age" ).val())) % ($( "#patient-age" ).val()),
			weightInKg: $( "#patient-weight" ).val(),
			heightInM: ($( "#patient-height" ).val())/100,
			sex: $('form input[name=radios]:checked').val()
	  },
	}); 
  });
/*
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
 */
});