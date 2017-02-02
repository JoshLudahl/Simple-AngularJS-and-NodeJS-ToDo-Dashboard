
  var long;
  var lat;
  var api;
  var weatherIcon;
  var tempF;
  var tempC;
  var zipAPI;
  $(document).ready(function() {
    $("#nonGeo").hide();
    //set options for accuracy and timeout (if timeout, will push to error)
    var geoOptions = {
      enableHighAccuracy: true
    }

    //geoFunction
getData();


    function getData() {

      var zipAPI = "http://api.openweathermap.org/data/2.5/weather?q=Tigard,us&appid=602f5168f5601912a8f4ffd9a6bf52a0";

      $.getJSON(zipAPI, function(data){
        long = data.coord.lon;
        lat = data.coord.lat;

      //JSON function to get data
        tempF =  data.main.temp * 9/5 - 459.67;
        tempC = data.main.temp - 273.15;
        $("#city").html(data.name);
        $("#temp").html(Math.floor(tempF)+ "<sup>o</sup>F");
        $("#condition").html(data.weather[0].main);


        var tempUnit = "F";
        //changer for temp conversion
        $("#btnUnit").click(function(){
          if (tempUnit == "F") {
            $("#temp").html(Math.floor(tempC)+ "<sup>o</sup>C");
            tempUnit = "C";
          }
          else {
            $("#temp").html(Math.floor(tempF)+ "<sup>o</sup>F");
            tempUnit = "F";
          }

        });

        var iconToken = "";

        switch (data.weather[0].icon) {
          //day
          case "01d" :
          iconToken = "<i class='wi wi-day-sunny'></i>";
          break;
          case "02d" :
          iconToken = "<i class='wi wi-day-cloudy'></i>";
          break;
          case "03d" :
          iconToken = "<i  class='wi wi-cloud'></i>";
          break;
          case "04d" :
          iconToken = "<i class='wi wi-cloudy'></i>";
          break;
          case "09d" :
          iconToken = "<i class='wi wi-day-rain-mix'></i>";
          break;
          case "10d" :
          iconToken = "<i class='wi wi-day-rain'></i>";
          break;
          case "11d" :
          iconToken = "<i class='wi wi-day-thunderstorm'></i>";
          break;
          case "13d" :
          iconToken = "<i class='wi wi-day-snow'></i>";
          break;
          case "50d" :
          iconToken = "<i class='wi wi-day-sprinkle'></i>";
          break;

          //night
          case "01n" :
          iconToken = "<i class='wi wi-night-clear'></i>";
          break;
          case "02n" :
          iconToken = "<i class='wi wi-night-cloudy'></i>";
          break;
          case "03n" :
          iconToken = "<i class='wi wi-night-cloud'></i>";
          break;
          case "04n" :
          iconToken = "<i class='wi wi-night-cloudy'></i>";
          break;
          case "09n" :
          iconToken = "<i class='wi wi-night-rain-mix'></i>";
          break;
          case "10n" :
          iconToken = "<i class='wi wi-night-rain'></i>";
          break;
          case "11n" :
          iconToken = "<i class='wi wi-night-thunderstorm'></i>";
          break;
          case "13n" :
          iconToken = "<i class='wi wi-night-snow'></i>";
          break;
          case "50n" :
          iconToken = "<i class='wi wi-night-sprinkle'></i>";
          break

        }
        //set icon to match weather code
        $("#cloudIcon").html(iconToken + "</i>");

      }); // JSON


    } // Success Function
    var geoError = function(error) {
      console.log('Error occurred. Error code: ' + error.code);
      $("#nonGeo").append("<br /><span class=\"error\">Cannot access geolocation, please provide a zip code: </span>");
      $("#nonGeo").show();

      $("#zipGo").click(function(){
        $(".error").hide();
        var zipAPI = "http://api.openweathermap.org/data/2.5/weather?zip=" + $("#zipcode").val() + ",us&appid=602f5168f5601912a8f4ffd9a6bf52a0";

        $.getJSON(zipAPI, function(data){
          long = data.coord.lon;
          lat = data.coord.lat;
          getData();

        });
      });
    };




getData();

  }); // Main
