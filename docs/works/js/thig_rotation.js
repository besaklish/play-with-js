function init() {
    var stage = new createjs.Stage("demoCanvas");

    // if resize, then make the canvas fit to it.
    window.addEventListener("resize", handleResize);
    handleResize();

    function handleResize(event){
        var width = window.innerWidth;
        var height = window.innerHeight;

        stage.canvas.width = width;
        stage.canvas.height = height;

        stage.update();
    }

    // add a bitmap (thig_kiwi.jpg)
    var bitmap = new createjs.Bitmap("../images/thig_kiwi.jpg");
    var bounds = bitmap.getBounds();
    bitmap.setTransform(300, 300, 0.1, 0.1, 0);
    stage.addChild(bitmap);

    // add a button (for making thig bigger)
    var button = new createjs.Container();
    stage.addChild(button);
    var bg = new createjs.Shape();
    button.addChild(bg);
    var label = new createjs.Text("Click here", "24px sans-serif", "#563d7c");
    button.addChild(label);

    // set the properties for the button
    button.cursor = "pointer";
    button.x = 100;
    button.y = 100;

    // function: push the button and thig gets bigger
    button.addEventListener("click", handleClick);
    function handleClick(event){
        bitmap.scale *= 1.1;
        stage.update();
    }

    // add a text
    var text = new createjs.Text("Mawaru\nThig", "80px Arial", "#002000");
    text.x = 110;
    text.y = 300;
    text.alpha = 0.3;
    stage.addChild(text);

    // Ticker: make thig rotate
    createjs.Ticker.addEventListener("tick", handleTick);
    createjs.Ticker.setFPS(10);
    function handleTick(event){
        if(!event.paused){
            bounds = bitmap.getBounds();
            bitmap.rotation = bitmap.rotation+10;
            bitmap.regX = bounds.width/2;
            bitmap.regY = bounds.height/2;
            stage.update();
        }
    }

    // settings for the stage
    stage.enableMouseOver();

    if(createjs.Touch.isSupported() == true){
        createjs.Touch.enable(stage);
    }

    stage.update();
}