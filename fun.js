function init() {
    var stage = new createjs.Stage("demoCanvas");
    var circle = new createjs.Shape();
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
    circle.shadow = new createjs.Shadow("#000000", 5, 5, 0);
    circle.x = 100;
    circle.y = 100;

    var text = new createjs.Text("Did you click the circle?", "15px Arial", "#00aaff");
    text.x = 20;
    text.y = 20;
    text.textBaseline = "alphabetic";

    circle.addEventListener("mousedown", handleMousedown);
    circle.addEventListener("pressup", handlePressup)
    function handleMousedown(event){
        circle.shadow = null;
        circle.x += 5;
        circle.y += 5;
        stage.update();
    }

    var count = 0;
    function handlePressup(event){
        text.text = "Yes, you just clicked the circle";
        circle.x -= 5;
        circle.y -= 5;
        circle.shadow = new createjs.Shadow("#000000", 5, 5, 0);
        if (count > 4){
            text.text = "You pushed the button too many!"
        }
        stage.update();
        count++;
    }

     var movingCircle = new createjs.Shape();
    movingCircle.graphics.beginFill("Pink").drawCircle(0, 0, 50);
    movingCircle.x = 100;
    movingCircle.y = 300;

    createjs.Ticker.addEventListener("tick", handleTick);
    createjs.Ticker.interval = 30;
    var flagRight = true;
    var flagDown = false;
    function handleTick(event){
        if (movingCircle.x < 0){
            flagRight = true;
        }
        if (movingCircle.x > 500){
            flagRight = false;
        }
        if (movingCircle.y < 0){
            flagDown = true;
        }
        if (movingCircle.y > 500){
            flagDown = false;
        }
        if (flagRight){
            movingCircle.x += 5;
        }else {
            movingCircle.x -= 5;
        }
        if (flagDown){
            movingCircle.y += 5;
        }else {
            movingCircle.y -= 5;
        }
        stage.update();
    }

    stage.addChild(circle);
    stage.addChild(text);
    stage.addChild(movingCircle);
    stage.enableMouseOver();
    stage.update();
}