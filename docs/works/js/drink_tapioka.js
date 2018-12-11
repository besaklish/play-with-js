// define variables to be used inside several functions.
var queue, stage, manifest;
var bitmap_tea, bitmap_perl, bitmap_guild, button;

// PreloadJS
function init() {
    queue = new createjs.LoadQueue();

    queue.addEventListener('complete', completeHandler);

    manifest = [
        {
            id: 'bitmap_tea',
            src:'../images/tapioka_tea.png'
        },
        {
            id: 'bitmap_perl',
            src:'../images/tapioka_perl.png'
        },
        {
            id: 'bitmap_guild',
            src:'../images/toki.jpg'
        }
    ];

    queue.setMaxConnections(3);
    queue.loadManifest(manifest);
}

// after PreloadJS complete its task, move on to EaselJS
function completeHandler(event){
    stage = new createjs.Stage("demoCanvas");

    bitmap_tea = new createjs.Bitmap(manifest[0].src);
    bitmap_tea.image.onload = function(){
        bitmap_tea.setTransform(250, 75, 0.25, 0.25);
        bitmap_tea.regX = bitmap_tea.getTransformedBounds().width / 2;
        bitmap_tea.regY = bitmap_tea.getTransformedBounds().height /2;
        stage.update();
    };

    bitmap_perl = new createjs.Bitmap(manifest[1].src);
    bitmap_perl.setTransform(200, 100, 0.2, 0.2);
    bitmap_perl.regX = bitmap_perl.image.width / 2;
    bitmap_perl.regY = bitmap_perl.image.height /2;
    bitmap_perl.visible = false;
    bitmap_perl.image.onload = function(){
        stage.update();
    };

    bitmap_guild = new createjs.Bitmap(manifest[2].src);
    bitmap_guild.setTransform(200, 250, 0.25, 0.25);
    bitmap_guild.regX = bitmap_guild.image.width /2;
    bitmap_guild.regY = bitmap_guild.image.height/2;
    bitmap_guild.image.onload = function(){
        // bound_guild is to be used for "handleUp" eventHandler
        bound_guild = bitmap_guild.getTransformedBounds();
        stage.update();
    };

    // add a button (for making thig bigger)
    button = new createjs.Container();
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
    bitmap_tea.on("pressup", handleUp);
    bitmap_perl.on("mousedown", handleDown);
    bitmap_perl.on("pressmove", handleMove);

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

var drag_x;
var drag_y;
var drag_regX;
var drag_regY;
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

// look near bitmap_guild consructor for bound_guild
var bound_guild;
var poo_array = [];
function handleUp(event){
    if (bound_guild.contains(bitmap_tea.x+bitmap_tea.regX, bitmap_tea.y+bitmap_tea.regY)){
        // Thig pooes!
        var poo = bitmap_perl.clone();
        poo.visible = true;
        poo.alpha = 0;
        poo.x = bound_guild.x + bound_guild.width / 2;
        poo.y = bound_guild.y + bound_guild.height;
        poo.on("pressmove", handleMove);

        // a poo goes down because of the laws of gravity.
        createjs.Tween.get(poo).to({y:poo.y+10, alpha:1}, 1000);

        // move the bitmap_tea back to the original position.
        createjs.Tween.get(bitmap_tea).to({x:250, y:75}, 1000);
        
        // add the poo to an array.
        poo_array.push(poo);

        stage.addChild(poo);
        stage.update();
    }

    // If there are too much pooes on the screen, let's creen them!
    if (poo_array.length === 7){
        alert("The screen is too dirty.\nThis page reloads itself automatically.");
        window.location.reload();
    }
    else if (poo_array.length === 5){
        alert("You let Thig poo too many times.\nReload and clean the screen.");
    }
    stage.update();
}

