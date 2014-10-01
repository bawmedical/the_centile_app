EWD.sockets.log = true; //make this false after testing so socket messages don't appear in the console
function suffix(i) {
    var j = i % 10;
    if (j == 1 && i != 11) {
        return i + "st";
    }
    if (j == 2 && i != 12) {
        return i + "nd";
    }
    if (j == 3 && i != 13) {
        return i + "rd";
    }
    return i + "th";
};
var centTable =  function(jsoIn,measure) {
	var tableOut='<table><tr><th>Centile</th><th>Value</th></tr>';
	for (var row in jsoIn) {
		tableOut+='<tr><td>'+row+'</td><td>'+Math.round(jsoIn[row])+measure+'</td></tr>'
	}
	tableOut+='</table>';
	return tableOut;
}
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
		  var centHeight=Math.round(data.HeightStats.Centile);
		  var centWeight=Math.round(data.WeightStats.Centile);
		  var centBMI=Math.round(data.BMIStats.Centile);
		  $("td#heightcentile").html(suffix(centHeight));
		  $('#heightPopover').popover("destroy"); //need to clear any existing content
		  $('#heightPopover').popover({html:true,content:centTable(data.HeightStats.Context,'cm')});
		  $("td#weightcentile").html(suffix(centWeight));
		  $('#weightPopover').popover("destroy"); //need to clear any existing content
		  $('#weightPopover').popover({html:true,content:centTable(data.WeightStats.Context,'kg')});
		  $("td#bmi").html(Math.round(data.BMI)+" kgm<sup>-2</sup>");
		  $("td#bmicentile").html(suffix(centBMI));
		  $('#BMIPopover').popover("destroy"); //need to clear any existing content
		  $('#BMIPopover').popover({html:true,content:centTable(data.BMIStats.Context,'')});
		  //add warning colours
		  if (centHeight > 85 || centHeight < 15) {
			$("td#heightcentile").addClass('danger')
			}
		  else {$("td#heightcentile").removeClass('danger')};
		  if (centWeight > 85 || centWeight < 15) {
			$("td#weightcentile").addClass('danger')
			}
		  else {$("td#weightcentile").removeClass('danger')};
		  if (centBMI > 85 || centBMI < 15) {
			$("td#bmicentile").addClass('danger')
			}
		  else {$("td#bmicentile").removeClass('danger')};

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
			ageInMonths: ((($( "#patient-age" ).val())) % 12),
			weightInKg: $( "#patient-weight" ).val(),
			heightInM: ($( "#patient-height" ).val())/100,
			sex: $('form input[name=radios]:checked').val()
	  },
	}); 
  });
});