  // ajax function
  function ajax(url, flux, rappel, method) {
   var r = window.XMLHttpRequest ? new XMLHttpRequest() :
     (window.ActiveXObject ?  new ActiveXObject("Microsoft.XMLHTTP") : '');
   if (!r) return false;
   r.onreadystatechange = function () {rappel(r);}
   r.open(method ? method : 'GET', url, true);
   if (flux)
       r.setRequestHeader("Content-Type",
                          "application/json; ");
   r.send(flux);
   return true;
  }


  function rappel(xhr){
     if(xhr.readyState == 4){
          if(xhr.status == 200){
            document.getElementById("result").style.color = "black";
            document.getElementById("result").innerHTML = xhr.responseText;
          }
          else{
            document.getElementById("result").style.color = "red";
            document.getElementById("result").innerHTML = xhr.responseText;
          }
     }
  }


//webkitURL is deprecated but nevertheless
URL = window.URL || window.webkitURL;
var gumStream;
//stream from getUserMedia()
var rec;
//Recorder.js object
var input;
//MediaStreamAudioSourceNode we'll be recording
// shim for AudioContext when it's not avb.
var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext;


audioCrudo = null;

function grabar(){
  var constraints = {
    audio: true,
    video: false
  }

  navigator.mediaDevices.getUserMedia(constraints).then(function(stream) {
    console.log("getUserMedia() success, stream created, initializing Recorder.js ...");
    audioContext = new AudioContext();
    gumStream = stream;
    input = audioContext.createMediaStreamSource(stream);
    /* Create the Recorder object and configure to record mono sound (1 channel) Recording 2 channels will double the file size */
    rec = new Recorder(input, {
        numChannels: 1
    })
    //start the recording process
    rec.record()
    console.log("Recording started");
  }).catch(function(err) {

  });
}

function parar(){
  //tell the recorder to stop the recording
  rec.stop(); //stop microphone access
  gumStream.getAudioTracks()[0].stop();
  //create the wav blob and pass it on to createDownloadLink
  rec.exportWAV(descarga);
}

function descarga(blob){
  audioCrudo = blob;
  console.log("worth");
  saveAs(blob,"audio.wav");
  setTimeout(function(){ajax('http://127.0.0.1:5591/check-audio','',rappel,'GET')},5000);
}
