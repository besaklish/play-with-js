function init() {
    var stage = new createjs.Stage("demoCanvas");
    
    class Question{
        constructor(x, y, rect, text, stage){
            this.x = x;
            this.y = y;
            this.rect = rect;
            this.text = text;
            this.stage = stage;
            
            //set the position of rect and text
            rect.x = x;
            rect.y = y;
            text.x = x;
            text.y = y;

            //add rect and text to the stage
            stage.addChild(rect);
            stage.addChild(text);
        }
    }

    var text = new createjs.Text("This is a text", "20px Arial", "#00ffff");
    text.x = 110;
    text.y = 300;

    var rect = new createjs.Shape();
    rect.graphics.beginFill("#ff0000").drawRect(0, 0, 150, 20);
    rect.x = 100;
    rect.y = 300;

    var question = new Question(100, 100, rect, text, stage);

    var rectBound = text.getBounds();
    var rectBoundX = new createjs.Text(String(rectBound.width), "20px Arial", "#ff00ff");
    rectBoundX.x = 10;
    rectBoundX.y = 30;
    stage.addChild(rectBoundX)

    stage.enableMouseOver();
    stage.update();
}