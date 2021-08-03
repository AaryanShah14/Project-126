song="";
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
ScoreLeftWrist=0;
ScoreRightWrist=0;

function preload(){
    song=loadSound("music.mp3");

}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}


function draw(){
    image(video, 0,0, 600,500);
    fill('#1c5403');
    stroke('#1c5403');
    if(ScoreLeftWrist > 0.2){
        circle(leftwristx, leftwristy, 20);
        InNumberLeftWristy=Number(leftwristy);
        remove_decimal=floor(InNumberLeftWristy);
        volume=remove_decimal/500;
        document.getElementById("volume").innerHTML="volume- " + volume;
        song.setVolume(volume);
    }

if(ScoreRightWrist > 0.2){
    circle(rightwristx, rightwristy, 20);
    if(rightwristy > 0 && rightwristy <= 100){
        document.getElementById("speed").innerHTML="speed = 0.5X";
        song.rate(0.5);
    }
    else if(rightwristy > 100 && rightwristy <=200){
        document.getElementById("speed").innerHTML="speed = 1.0X";
        song.rate(1.0);
    }
    else if(rightwristy > 200 && rightwristy <=300){
        document.getElementById("speed").innerHTML="speed = 1.5X";
        song.rate(1.5);
    }
    else if(rightwristy > 300 && rightwristy <=400){
        document.getElementById("speed").innerHTML="speed = 2.0X";
        song.rate(2.0);
    }
    else if(rightwristy > 400 && rightwristy <=500){
        document.getElementById("speed").innerHTML="speed = 2.5X";
        song.rate(2.5);
    }
}
  
}


function play1(){
song.play();
song.setVolume(1.0);
song.rate(1.0)
}

function stop1(){
song.stop();
}

function modelLoaded(){
    console.log("Posenet is initilized");
}

function gotPoses(results){
if(results.length>0){
    console.log(results);

    leftwristx=results[0].pose.leftWrist.x;
    leftwristy=results[0].pose.leftWrist.y;
    console.log("leftWristx- " + leftwristx + " leftWristy- " + leftwristy);


    rightwristx=results[0].pose.rightWrist.x;
    rightwristy=results[0].pose.rightWrist.y;
    console.log("rightWristx- " + rightwristx + " rightWristy- " + rightwristy);

    ScoreLeftWrist=results[0].pose.keypoints[9].score;
    console.log("ScoreLeftWrist- " + ScoreLeftWrist);

    ScoreRightWrist=results[0].pose.keypoints[10].score;
    console.log("ScoreRightWrist- " + ScoreRightWrist);
}

}