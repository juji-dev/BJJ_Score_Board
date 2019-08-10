
let data;
let startTime;
let currentTime;
var play = false;

var redScore = {"penalty" : 0,"advantage" : 0,"points" : 0}
var blueScore = {"penalty" : 0,"advantage" : 0,"points" : 0}

function populate(){
    const fs = require('fs');
    let raw = fs.readFileSync('data.json');
    data = JSON.parse(raw);
    console.log(data);
    setAthletes()
    setMatchInformation()
    setTime()
    setMatchStage()
    setInterval(countDown, 1000)
}

function setAthletes(){
    document.getElementById("redAthlete").innerHTML =  (data.redFirstName + " " + data.redSecondName).toUpperCase() + " - " + data.redTeam.toUpperCase();
    document.getElementById("blueAthlete").innerHTML =  (data.blueFirstName + " " + data.blueSecondName).toUpperCase() +" - " + data.blueTeam.toUpperCase();
}

function setMatchStage(){
    document.getElementById("stage").innerHTML =  data.stage.toUpperCase(); 
}

function setMatchInformation(){ 
    var matchInfo = data.giNoGi + " " +data.gender + " " +  data.age + " " +data.belt + " " + data.weight;
    matchInfo.toString();
    document.getElementById("matchInfo").innerHTML =  matchInfo.toUpperCase();  
}

function setTime(){
    startTime = data.time * 60;
    currentTime = startTime 
    document.getElementById("time").innerHTML =  currentTime.toString().toHHMMSS(); 
}

function setStart(){
    play = true;
}

function setPause(){
    play = false;
}

function resetTime(){
    play = false;
    currentTime = startTime; 
    document.getElementById("time").innerHTML =  currentTime.toString().toHHMMSS();

}

function countDown(){
    if(play === true){
        if(currentTime > 0){
        currentTime = currentTime-1; 
        document.getElementById("time").innerHTML =  currentTime.toString().toHHMMSS(); 
        }
    }
}

function incRed(amount, type){
    var bodyText;
    var targetID;
    switch(type){
        case 0:
            redScore.points = redScore.points + amount;
            bodyText = redScore.points;
            targetID = "redPoints"
        break;
        case 1:
            redScore.advantage = redScore.advantage + amount;
            bodyText = redScore.advantage;
            targetID = "redAdvantage"
        break;
        case 2: 
            redScore.penalty = redScore.penalty + amount;
            bodyText = redScore.penalty;
            targetID = "redPenalty"
        break;
    }  
    document.getElementById(targetID).innerHTML = bodyText;
}
function incBlue(amount, type){
    var bodyText;
    var targetID;
    switch(type){
        case 0:
            blueScore.points = blueScore.points + amount;
            bodyText = blueScore.points;
            targetID = "bluePoints"
        break;
        case 1:
            blueScore.advantage = blueScore.advantage + amount;
            bodyText = blueScore.advantage;
            targetID = "blueAdvantage"
        break;
        case 2: 
            blueScore.penalty = blueScore.penalty + amount;
            bodyText = blueScore.penalty;
            targetID = "bluePenalty"
        break;
    }  
    document.getElementById(targetID).innerHTML = bodyText;
}

String.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return  minutes + ':' + seconds;
}

function restart(){
    const electron = require('electron')
    const {ipcRenderer} = electron    
    ipcRenderer.send('restart')
}
    
//git pages analytics


