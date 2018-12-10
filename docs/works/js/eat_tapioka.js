function init() {
    var stage = new createjs.Stage("demoCanvas");

    // add a bitmap (tapioka_tea.png and tapioka_perl.jpg)
    var bitmap_tea = new createjs.Bitmap("../images/tapioka_tea.png");
    bitmap_tea.setTransform(200, 200, 0.25, 0.25);
    bitmap_tea.regX = bitmap_tea.image.width / 2;
    bitmap_tea.regY = bitmap_tea.image.height /2;
    bitmap_tea.image.onload = function(){
        stage.update();
    }

    var bitmap_perl = new createjs.Bitmap("../images/tapioka_perl.png");
    bitmap_perl.setTransform(200, 100, 0.2, 0.2);
    bitmap_perl.regX = bitmap_perl.image.width / 2;
    bitmap_perl.regY = bitmap_perl.image.height /2;
    bitmap_perl.image.onload = function(){
        stage.update();
    }

    var bitmap_guild = new createjs.Bitmap("../images/toki.jpg");
    bitmap_guild.setTransform(750, 750, 0.25, 0.25);
    bitmap_guild.regX = bitmap_guild.image.width/2;
    bitmap_guild.regY = bitmap_guild.image.height/2;
    bitmap_guild.image.onload = function(){
        stage.update();
    }

    // add a button (for making thig bigger)
    var button = new createjs.Container();
    button.cursor = "pointer";
    button.x = 100;
    button.y = 100;

    // add a bg and label to the button
    var label = new createjs.Text("Click here", "24px sans-serif", "#563d7c");
    var bg = new createjs.Shape();
    bg.graphics.beginFill("#002000").drawRoundRect(-7.5, -7.5, label.getBounds().width+15, label.getBounds().height+15, 10);
    bg.alpha = 0.1;
    button.addChild(bg);
    button.addChild(label);

    // addChild
    stage.addChild(button);
    stage.addChild(bitmap_guild);
    stage.addChild(bitmap_tea);
    stage.addChild(bitmap_perl);

    // addEventListener
    button.on("click", handleClick);
    bitmap_tea.on("mousedown", handleDown);
    bitmap_tea.on("pressmove", handleMove);
    bitmap_perl.on("mousedown", handleDown);
    bitmap_perl.on("pressmove", handleMove);

    // EventListenrs
    var drag_x;
    var drag_y;
    function handleDown(event){
        drag_x = stage.mouseX - event.target.x;
        drag_y = stage.mouseY - event.target.y;
    }

    function handleMove(event){
        event.target.x = event.stageX - drag_x;
        event.target.y = event.stageY - drag_y;
        stage.update();
    }

    function handleClick(event){
        bitmap_tea.scale *= 1.1;
        stage.update();
    }

    function handleTick(event){
        if(!event.paused){
            stage.update();
        }
    }

    // addEventListener: tick / drag / click
    createjs.Ticker.addEventListener("tick", handleTick);

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