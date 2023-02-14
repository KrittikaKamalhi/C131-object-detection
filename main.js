img = "";
status = "";
objects = [];

function preload(){
    img = loadImage('pet_img.webp');
}

function setup(){
    canvas = createCanvas(640,480);
    canvas.center();
    
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById('status').innerHTML = "Status : Detecting objects";
}

function modelLoaded(){
    console.log("coco ssd model has been successfully loaded");
    status = true;
    objectDetector.detect(img,gotResults);
}

function gotResults(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(img,0,0,640,480);
    if(status != "")
    {
        for( i=0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : objects detected";

            fill("#ff1100");

            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("#ff1100");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

        }

    }
} 