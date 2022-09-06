window.addEventListener("load", () => {
    const outer = document.querySelector("#outer");
    const canvas = document.querySelector("#inner");
    const context = canvas.getContext("2d");
    
    // Initialize "pen"
    function initPen(color = "#222222", size = "10") {
        context.strokeStyle = color
        context.lineWidth = size
        context.lineCap = "round";
    }
    initPen();

    // Variables
    canvas.width = 600;
    canvas.height = 400;
    
    const minScale = 0.1;
    const maxScale = 4;
    const scaleStep = 0.003;

    var shiftDown = false;
    var lastTLCorner = {left:0, top:0};
    
    var mousePos = {x:0, y:0};
    var lastPos = mousePos;
    var drawing = false;

    //--------------------------------------------------------------------------------------------------
    //--------------------------------------------INPUT--------------------------------------------------
    //--------------------------------------------------------------------------------------------------
    // MOUSE INPUT
    // Retrieve mouse position relative to the canvas and relative to screen
    function getMousePos(canvasObject, mouseEvent) {
        var rect = canvasObject.getBoundingClientRect();
        return {
            x: mouseEvent.clientX - rect.left,
            y: mouseEvent.clientY - rect.top
        };
    }

    // TOUCH/STYLUS INPUT
    // Get touch position relative to canvas
    function getTouchPos(canvasObject, touchEvent) {
        var rect = canvasObject.getBoundingClientRect();
        return {
            canvasX: touchEvent.touches[0].clientX - rect.left,
            canvasY: touchEvent.touches[0].clientY - rect.top
        };
    }
    //--------------------------------------------------------------------------------------------------



    //--------------------------------------------------------------------------------------------------
    //----------------------------------DRAWING EVENT LISTENERS-----------------------------------------
    //--------------------------------------------------------------------------------------------------
    // MOUSE EVENT LISTENERS
    canvas.addEventListener("mousedown", startPos, false);
    canvas.addEventListener("mouseup", endPos, false);
    canvas.addEventListener("mousemove", move, false);
    
    // TOUCH EVENT LISTENERS
    // Mouse input is easier to work with, so these listeners
    // convert touch input into mouse input for them to be worked, as opposed to creating
    // entirely new, but functionally identical drawing methods for touch.
    
    // This is done by taking the canvas position of the touch event
    // and translating it into a MouseEvent, which constitutes a set of X and Y positions.

    // NOTE: e.touches[n] refers to which individual touch is being referenced,
    // as many devices allow for multiple touch inputs at once. 
    canvas.addEventListener("touchstart", function (e) {
        mousePos = getTouchPos(canvas, e);
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousedown", {
            clientX: touch.clientX,
            clientY: touch.clientY  
        });
        canvas.dispatchEvent(mouseEvent);
    }, false);
    canvas.addEventListener("touchend", function (e) {
        var mouseEvent = new MouseEvent("mouseup", {});
        canvas.dispatchEvent(mouseEvent);
    }, false);
    canvas.addEventListener("touchmove", function (e) {
        var touch = e.touches[0];
        var mouseEvent = new MouseEvent("mousemove", {
            clientX: touch.clientX,
            clientY: touch.clientY  
        });
        canvas.dispatchEvent(mouseEvent);
    }, false);
    //--------------------------------------------------------------------------------------------------
    
    
    //--------------------------------------------------------------------------------------------------
    //--------------------------------------DRAW TO SCREEN----------------------------------------------
    //--------------------------------------------------------------------------------------------------
    // Beginning of Stroke
    function startPos(e){
        drawing = true;
        lastPos = getMousePos(canvas, e);
    }
    // End of Stroke
    function endPos(){
        drawing = false;
    }
    // Update mouse position
    function move(e) {
        mousePos = getMousePos(canvas, e);        
    }
    // Get regular draw-to-screen interval, browser-based
    window.requestAnimFrame = (function (callback) {
        return window.requestAnimationFrame || 
           window.webkitRequestAnimationFrame ||
           window.mozRequestAnimationFrame ||
           window.oRequestAnimationFrame ||
           window.msRequestAnimaitonFrame ||
           function (callback) {
                window.setTimeout(callback, 1000/60);
           };
    })
    // Draw to canvas
    function renderCanvas() {
        if (drawing) {
            context.beginPath();
            context.moveTo(lastPos.x, lastPos.y);
            context.lineTo(mousePos.x, mousePos.y);
            context.stroke();
            lastPos = mousePos;
        }
    }
    // Animate drawing
    (function drawLoop() {
        requestAnimationFrame(drawLoop);
        renderCanvas();
    })();
    //--------------------------------------------------------------------------------------------------


    //--------------------------------------------------------------------------------------------------
    //-------------------------------------------TOOLS--------------------------------------------------
    //--------------------------------------------------------------------------------------------------
    // Pen; Eraser; Wipe canvas;
    document.addEventListener("keydown", function (e) {
        // // For my own purposes VV.
        // console.log(`pressed "${e.key}" key`);
        
        // // If the user is holding down Shift and spacebar, enable zoom.
        // // When more key combos need to be mapped, the structure of this will likely become 
        // // "if (modifier key True then switch event.key".
        // while (e.shiftKey && e.key == " ") {
        //     if (drawing) {
        //         screenOrigin.x = invZoomedX(mousePos.canvasX) - lastPos.screenX;
        //         screenOrigin.y = invZoomedY(mousePos.canvasY) - lastPos.screenY;
        //     }
        // }
        // // If the user is ONLY holding down spacebar, enable pan.

        // In case of indiv key presses, enable the tool that corresponds to the shortcut.
        if (e.shiftKey) {
            shiftDown = true;
            wrapper.style.cursor = "move";
        }

        switch(e.key) {
            case ("p"):
                changeColor();
                break;
            case("e"):
                // context.strokeStyle = "rgba(0,0,0,1)";
                erase();
                break;
            case("d"):
                clearCanvas();
                initPen();
                break;            
            default:
                break;
        }
    }, false);
    document.addEventListener("keyup", function (e) {
        shiftDown = false;
        wrapper.style.cursor = "default";
    }, false);

    // TOOL FUNCTIONS
    function clearCanvas() {
        canvas.width = canvas.width;
    }
    const erase = () => {
        context.globalCompositeOperation = "destination-out";
    }
    const changeColor = () => {
        context.strokeStyle = "#222222";
        context.globalCompositeOperation = "source-over";
    }
    //--------------------------------------------------------------------------------------------------
});
