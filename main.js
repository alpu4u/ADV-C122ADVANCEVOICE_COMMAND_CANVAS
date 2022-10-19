x = 0;
y = 0;
screen_width = 0;
screen_height = 0;
to_number = "";
draw_apple = "";
speak_data = "";

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 

function preload(){
  draw_apple = loadImage("apple.png");
}
 
recognition.onresult = function(event) {
 console.log(event); 
 content = event.results[0][0].transcript;
 to_number = Number(content);
 if(Number.isInteger(to_number)){
  document.getElementById("status").innerHTML = "Started drawing apple " + to_number;
  draw_apple = "set";
 }
 else{
  document.getElementById("status").innerHTML = "The speech has not recognized a number.";
 }
}

function setup() {
 screen_width = window.innerWidth;
 screen_height = window.innerHeight;
 canvas = createCanvas(screen_width, screen_height-150);
 canvas.position(1, 149);
}

function draw() {
 if(draw_apple == "set")
  {
    //let apple = loadImage("apple.png");
    for(var i=1; i<to_number; i++){
      x = Math.floor(Math.random * 700);
      y = Math.floor(Math.random * 400);
     image(draw_apple, x, y, 50, 50);
    }
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    draw_apple = "";
    speak();
  }
}

function speak(){
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    to_number = speak_data;
}
