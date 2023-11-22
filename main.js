sound = ""
status = ""
objects = [];

function preload()
{
    sound = loadSound("alarm.wav");
}

function setup()
{
    canvas = createCanvas(500, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(500, 500);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function draw()
{
    image(video, 0, 0, 500, 500);
    
    if (status != "")
    {
        objectDetector.detect(video, gotResult);
        r = random(255);
        g = random(255);
        b = random(255);
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Object detected";
            fill(r,g,b)
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

             if(objects[i].label == "person")
             {
                document.getElementById("number_of_objects").innerHTML = "Baby found";
                console.log("stop");
                sound.stop();
             }
             else
             {
                document.getElementById("number_of_objects").innerHTML = "Baby not found";
                console.log("play");
                sound.play();
             }
        }
        if(objects.length == 0)
        {
           document.getElementById("number_of_objects").innerHTML = "Baby not found";
           console.log("play");
           sound.play();
        }
    }

}

function modelLoaded()
{
    console.log("Model loaded!");
    status = true

}

function gotResult(error, results)
{
    if (error)
    {
        console.error(error)
    }
    console.log(results)
    objects = results;
}