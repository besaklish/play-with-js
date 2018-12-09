function init() {
    var stage = new createjs.Stage("demoCanvas");

    var bitmap = new createjs.Bitmap("thig_kiwi.jpg");
    var bounds = bitmap.getBounds();
    bitmap.setTransform(300, 300, 0.1, 0.1, 0);
    stage.addChild(bitmap);

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

    var button = new createjs.Container();
    stage.addChild(button);

    var bg = new createjs.Shape();
    button.addChild(bg);

    var label = new createjs.Text("Click here", "24px sans-serif", "#563d7c");

    button.addChild(label);

    button.addEventListener("click", handleClick);

    function handleClick(event){
        bitmap.scale *= 1.1;
        stage.update();
    }

    stage.enableMouseOver();

    button.cursor = "pointer";

    button.x = 100;
    button.y = 100;

    var text = new createjs.Text("Mawaru\nThig", "80px Arial", "#002000");
    text.x = 110;
    text.y = 300;
    text.alpha = 0.3;
    stage.addChild(text);

    stage.update();
}