// define variables to be used inside several functions.
var queue, stage, manifest;
var bitmap_tea, bitmap_perl, bitmap_guild, button;

// PreloadJS
function init() {
    queue = new createjs.LoadQueue();

    queue.addEventListener('complete', handleComplete);
    queue.addEventListener('fileload', handleFileload);

    manifest = [
        {
            id: 'bitmap_tea',
            src:'../images/tapioka_tea.png'
        },
        {
            id: 'bitmap_guild',
            src:'../images/toki.jpg'
        },
        {
            id: 'bitmap_perl',
            src:'../images/tapioka_perl.png'
        },
    ];

    queue.setMaxConnections(1);
    queue.loadManifest(manifest);
}

function handleFileload(event){
    if (event.item.id === "bitmap_tea"){
        bitmap_tea = new createjs.Bitmap(event.result);
        bitmap_tea.set({x:250, y:75, scale:0.25});
        bitmap_tea.regX = bitmap_tea.getTransformedBounds().width / 2;
        bitmap_tea.regY = bitmap_tea.getTransformedBounds().height /2;
    }
    else if (event.item.id == "bitmap_guild"){
        bitmap_guild = new createjs.Bitmap(event.result);
        bitmap_guild.set({x:100, y:150, scale:0.25});
        bound_guild = bitmap_guild.getTransformedBounds();
    }
    else if (event.item.id == "bitmap_perl"){
        bitmap_perl = new createjs.Bitmap(event.result);
        bitmap_perl.set({scale:0.2});
        bitmap_perl.set({regX: bitmap_perl.getTransformedBounds().width/2, regY: bitmap_perl.getTransformedBounds().height/2})
        bitmap_perl.visible = false;
    }
}

// after PreloadJS complete its task, move on to EaselJS
function handleComplete(event){
    stage = new createjs.Stage("demoCanvas");

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
    bitmap_tea.regX *= 1.1;
    bitmap_tea.regY *= 1.1;
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
        poo.x = bound_guild.x + bound_guild.width / 2 - poo.regX;
        poo.y = bound_guild.y + bound_guild.height - poo.regY;
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

