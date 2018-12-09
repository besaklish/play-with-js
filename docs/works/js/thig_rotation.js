function init() {
    var stage = new createjs.Stage("demoCanvas");

    // add a bitmap (thig_kiwi.jpg)
    var bitmap = new createjs.Bitmap("../images/toki.jpg");
    var bounds = bitmap.getBounds();
    bitmap.setTransform(200, 200, 0.1, 0.1, 0);
    stage.addChild(bitmap);

    // add a button (for making thig bigger)
    var button = new createjs.Container();
    button.cursor = "pointer";
    button.x = 100;
    button.y = 100;
    stage.addChild(button);

    // add a bg and label to the button
    var label = new createjs.Text("Click here", "24px sans-serif", "#563d7c");
    var bg = new createjs.Shape();
    bg.graphics.beginFill("#002000").drawRoundRect(-7.5, -7.5, label.getBounds().width+15, label.getBounds().height+15, 10);
    bg.alpha = 0.1;
    button.addChild(bg);
    button.addChild(label);

    // function: push the button and thig gets bigger
    button.addEventListener("click", handleClick);
    function handleClick(event){
        bitmap.scale *= 1.1;
        stage.update();
    }

    // add a text
    var text = new createjs.Text("Mawaru\nThig", "80px Arial", "#002000");
    text.x = 100;
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

    stage.update();
}