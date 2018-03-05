var acceleration;
var alpha;
var beta;
var gamma;

window.addEventListener("deviceorientation", handleOrientation, true);

function handleOrientation(event) {
  var absolute = event.absolute;
  var alpha = event.alpha;
  this.alpha = event.alpha;
  var beta = event.beta;
  this.beta = event.beta;
  var gamma = event.gamma;
  this.gamma = event.gamma;
  var ballPos = (gamma / 90) * 200;
  console.log(event);
  $('.absolute').html(absolute);
  $('.alpha').html(alpha.toFixed(3));
  $('.beta').html(beta.toFixed(3));
  $('.gamma').html(gamma.toFixed(3));
  $('.ball').css('transform', 'translateX(' + ballPos + 'px)');

}

window.addEventListener("devicemotion", handleMotion, true);

function handleMotion(event) {
  var acceleration = event.acceleration;
  this.acceleration = event.acceleration;
  var interval = event.interval;
  if (acceleration.x) {
    $('.accelerationx').html(acceleration.x.toFixed(3));
    $('.accelerationy').html(acceleration.y.toFixed(3));
    $('.accelerationz').html(acceleration.z.toFixed(3));
    $('.interval').html(interval);

  }
}

$(document).ready(function () {
  $('#txt_id').val("OM");
  var awsHost = 'https://25ggnyf2vk.execute-api.ap-southeast-2.amazonaws.com/dev/devices';
    
  function postData(payload){
    // data = JSON.stringify({ data: "test" });
    var deviceId = $('#txt_id').val();
    if(!payload){
        _payload = {
          id: deviceId, x: acceleration.x, y: acceleration.y,
          z: acceleration.z, alpha: alpha, beta: beta, gamma: gamma
        };
        payload = [];
        payload.push(_payload);
    }
    data = JSON.stringify(payload);
    console.log("Posting generated data");
    console.log(payload);
    $.ajax({
      url: awsHost,
      type: "POST",
      data: data,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function () {
        console.log("success output");
      }
    })
      .done(function (data) {
        if (console && console.log) {
          console.log("Sample of data:", data);
          // $("#result").html(JSON.stringify(data));
        }
      });
  }

  $(".send").on('click', function () {
    postData();
  });
  



  var startSendingReadings = false;
  var count = 0;

  $(".startbtn").on('click', function () {
    if(startSendingReadings){
      // startbtn
      $(".startbtn").html("Start Sending");
      startSendingReadings = false;
    }else{
      $(".startbtn").html("Stop Sending");
    //   postData();
      startSendingReadings = true;
      count = 0;
    }
  });

  var ajax_call = function() {
    //your jQuery ajax code
    if(startSendingReadings){
      count++;
      console.log("setInterval every now and then %s", count);
      $("#result").html("Sending data count:" + count);
    //   postData();
    }
  };
  var X = 0.1;
  var interval = 1000 * 60 * X; // where X is your every X minutes

//   setInterval(ajax_call, interval);

/**
* sample rate generates 100 messages per second 
* (or a sampling rate of 100 Hz).
* */
  var sampleCnt = 0;
  var sampledData = [];
  var sampleData = function() {
    //your jQuery ajax code
    if (sampleCnt < 100) {
      sampleCnt++;
    //   console.log("ajax 1 sending :: " + sampleCnt);
      var deviceId = $('#txt_id').val();
      var date = new Date().getTime();
      var payload = {
        id: deviceId, x: acceleration.x, y: acceleration.y,
        z: acceleration.z, alpha: alpha, beta: beta, gamma: gamma,
        ts: date
      };
      sampledData.push(payload);
    }else{
        if(startSendingReadings){
            count++;
            console.log("setInterval every now and then %s", count);
            $("#result").html("Sending data count:" + count);
            postData(sampledData);
            console.log("send this data");
            console.log(sampledData);
        }
        sampledData = [];
        sampleCnt = 0;
        clearInterval();
    }
    
  };
  var X = 1/100;
  var interval = 1000 *  X; // where X is your every X minutes

  setInterval(sampleData, interval);
  
  // function alertMe() {
  //   setInterval(function(){
  //   console.log("hi");
  //   },200);
  // }
});