const canvas = document.getElementById('analog-clock');
const minutesSpan = document.getElementById("minutes");
const secondsSpan = document.getElementById("seconds");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const digitalClock = document.getElementById("digital-clock");
const shia = document.getElementById("shia");
const digital = document.getElementById("digital");

var seconds = 59;
var minutes = 24;

// canvas.width = canvas.scrollWidth;
// canvas.height = canvas.scrollHeight;
var ctx = canvas.getContext('2d');
var drawInterval;
stopButton.disabled = true;

startButton.addEventListener("click",startTimer,false);

stopButton.addEventListener("click",stopTimer,false);

function startTimer(){
    var audio = new Audio('ShiaLaBeouf.mp3');
    audio.play();	
    digital.setAttribute("style","display:block");
    shia.setAttribute("style","display:none");
    startButton.disabled = true;
    stopButton.disabled = false;
    ctx = canvas.getContext('2d');
    drawInterval = setInterval(drawCanvas,1000);
    drawInterval;
}

function stopTimer(){
    console.log("ok");
    var audio = new Audio('youNotGonna.mp3');
    audio.play();
    digital.setAttribute("style","display:none");
    shia.setAttribute("style","display:block");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    window.clearInterval(drawInterval);
    seconds = 59;
    minutes = 24;
    ctx = undefined;
    canvas.width = canvas.scrollWidth;
    canvas.height = canvas.scrollHeight;
    ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#d63031';
    ctx.shadowBlur=5;
    ctx.shadowColor="#ff4d4d";
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.arc(200,200,175,0,Math.PI*2);
    ctx.stroke();

    ctx.strokeStyle = '#7158e2';
    ctx.shadowBlur=5;
    ctx.shadowColor="#7d5fff";
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.arc(200,200,150,0,Math.PI*2);
    ctx.stroke();
    startButton.disabled = false;
    stopButton.disabled = true;
    minutesSpan.textContent = nf(0);
    secondsSpan.textContent = nf(0);
}

var drawCanvas = function(){
    canvas.width = canvas.scrollWidth;
    canvas.height = canvas.scrollHeight;
    ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#d63031';
    ctx.shadowBlur=5;
    ctx.shadowColor="#ff4d4d";
    ctx.beginPath();
    var angle = normalize(seconds,0,59,0,Math.PI*2);
    ctx.lineWidth = 10;
    ctx.arc(200,200,175,Math.PI*0,angle);
    ctx.stroke();

    ctx.strokeStyle = '#7158e2';
    ctx.shadowBlur=5;
    ctx.shadowColor="#7d5fff";
    ctx.beginPath();
    var angle = normalize(minutes,0,24,0,Math.PI*2);
    ctx.lineWidth = 10;
    ctx.arc(200,200,150,Math.PI*0,angle);
    ctx.stroke();
    minutesSpan.textContent = nf(minutes);
    secondsSpan.textContent = nf(seconds);
    console.log(seconds);
    if(minutes <= 0){
        stopTimer();
    }
    seconds--;
    if(seconds <= 0){
        minutes--;
        seconds = 59;
    }

}
function normalize(enteredValue, minEntry, maxEntry, normalizedMin, normalizedMax) {

    var mx = (enteredValue-minEntry)/(maxEntry-minEntry);
    var preshiftNormalized = mx*(normalizedMax-normalizedMin);
    var shiftedNormalized = preshiftNormalized + normalizedMin;

    return shiftedNormalized;

}

function nf(j) {
    return ('0' + j).slice(-2);
}
