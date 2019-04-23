PennController.ResetPrefix(null);
PennController.Debug();

// PennController(
//     newSelector("test")
//     ,
//     newCanvas(700,500)
//         .settings.add(0,0, newVideo("https://lab.florianschwarz.net/PennController/wordpress/wp-content/uploads/2018/10/buffy_screen.mp4").settings.size(700,500) )
//         .settings.add(0,0, newCanvas(200,200).settings.css('border','solid 1px red').settings.selector("test"))
//         .settings.add(400,250, newCanvas(200,200).settings.css('border','solid 1px red').settings.selector("test"))
//         .print()
//     ,
//     newTimer(100).wait()
// )

// PennController.PreloadZip("https://morgunovakatya.ru/experiment/scale.zip");

// PennController.AddHost("http://files.lab.florianschwarz.net/ibexfiles/PennController/SampleTrials/");

// PennController.AddTable("myTable",
//     "Target,Competitor,Audio,Duration\n"+
//     "2fishRoundTank.png,1fishSquareTank.png,fishRound.ogg,2600\n"+
//     "2fishRoundTank.png,1fishSquareTank.png,fishRound.ogg,2600"//+
//     // ""
// )

PennController(
    defaultText
        .print()
    ,
    newText("<p>Welcome to this experiment.</p>")
    ,
    newText("<p>You will listen to sentences and indicate which of two pictures is being described.</p>")
    ,
    newText("<p>Please try to click the picture you think the sentence describes as fast as you can.</p>")
    ,
    newText("<p>Please type in your ID below and then click on the Start button to start the experiment.</p>")
    ,
    newVar("ID","")
        .settings.global()
    ,
    newTextInput("ID", "")
        .print()
    ,
    newButton("Start")
        .print()
        .wait( getTextInput("ID").testNot.text("") )
    ,
    getVar("ID")
        .set( getTextInput("ID") )
)
.log( "ID" , getVar("ID") )

PennController.Template( "fulldesign.csv" ,
    row => PennController(
        newText("sentence", row.Sentence)
            .settings.center()
            .settings.hidden()
            .print()
        ,
        newTimer(200)
            .start()
            .wait()
        ,
        defaultImage
            .settings.size(300,300)
            .settings.selector("choice")
        ,
        newSelector("choice")
            .settings.log()
            .settings.disable()
        ,
        newCanvas(650,300)
            .settings.add(   0 , 0 , newImage(row.PictureSg) )
            .settings.add( 350 , 0 , newImage(row.PicturePl) )
            .print()
        ,
        getSelector("choice")
            .shuffle()
        ,
        newTimer(500)
            .start()
            .wait()
        ,
        newAudio("description", row.Audio)
            .settings.log()
            .play()
        ,
        getText("sentence")
            .unfold(row.Duration)
        ,
        getSelector("choice")
            .settings.enable()
            .settings.once()
            .wait()
        ,
        getAudio("description")
            .wait("first")
    )
    .log( "ID" , getVar("ID") )
)

PennController.SendResults();

PennController(
    newText("Thank you for your participation!")
        .print()
    ,
    newText("<p><a href='https://confirmationlink/' target='_blank'>Click here to validate your submission</a></p>")
        .print()
    ,
    newTimer(1)
        .wait()
)
.setOption("countsForProgressBar",false)

/*
PennController(
    newFunction("addLayer", function(){
        if (!this.layers)
            this.layers = [];
        let layer = newCanvas(198,0).settings.css("border-top","solid 1px lightgray");
        this.layers.push(layer);
        getCanvas("surface")
            .settings.add( 1+(this.layers.length%2), 196-this.layers.length, layer )
            ._runPromises();
    })
    ,
    newFunction("removeLayer", function(){
        if (!this.layers || this.layers.length<1)
            return;
        let c = this.layers.pop().remove();
        c._promises[c._promises.length-1].call(c._element);
    })
    ,
    newText("This is a table. Layers of dust will appear in gray.")
        .print()
    ,
    newCanvas("surface", 200, 200)
        .settings.add(0,196,newCanvas(200,4).settings.css("background","black"))
        .print()
    ,
    newCanvas(300, 40)
        .settings.add(0,0,newButton("Add dust").settings.callback( getFunction("addLayer").call() ))
        .settings.add("right at 300px",0,newButton("Remove dust").settings.callback( getFunction("removeLayer").call() ))
        .print()
    ,
    newText("<p style='font-style: italic;'>The table is dusty and clean</p>")
        .print()
    ,
    newButton("Continue").print().wait()
)


PennController(
    newFunction("addWater", function(){
        if (!this.layers)
            this.layers = [];
        let layer = newCanvas(198,0).settings.css("border-top","solid 1px lightgray");
        this.layers.push(layer);
        getCanvas("surface")
            .settings.add( 1+(this.layers.length%2), 196-this.layers.length, layer )
            ._runPromises();
    })
    ,
    newFunction("removeLayer", function(){
        if (!this.layers || this.layers.length<1)
            return;
        let c = this.layers.pop().remove();
        c._promises[c._promises.length-1].call(c._element);
    })
    ,
    newText("This is a table. Layers of dust will appear in gray.")
        .print()
    ,
    newCanvas("surface", 200, 200)
        .settings.add(0,196,newCanvas(200,4).settings.css("background","black"))
        .print()
    ,
    newCanvas(300, 40)
        .settings.add(0,0,newButton("Add dust").settings.callback( getFunction("addLayer").call() ))
        .settings.add("right at 300px",0,newButton("Remove dust").settings.callback( getFunction("removeLayer").call() ))
        .print()
    ,
    newText("<p style='font-style: italic;'>The table is dusty and clean</p>")
        .print()
    ,
    newTimer(200).wait()
)
*/


// const FONTSIZE = 15;
// const SPEED = 1.5;
// const UPDATEBLURRATE = 10;
// const LEFTRIGHTGAP = 0;
// const BLURSIZE = 50;
// let Xs = [];

// PennController(
//     newButton("validate","validate")
//         .print()
//         .wait()
//     ,
//     // MASK
//     newCanvas("blur", BLURSIZE+"vw", 1.5*FONTSIZE+"vw")
//         .settings.css("background", "radial-gradient(ellipse at center, "+
//                                     "rgba(255,255,255,0) 0%,rgba(255,255,255,0) 24%,"+
//                                     "rgba(255,255,255,1) 63%,rgba(255,255,255,1) 66%,rgba(255,255,255,1) 100%)")
//     ,
//     newCanvas("left_white",  Number((240-BLURSIZE)/2)+"vw", 1.5*FONTSIZE+"vw")
//         .settings.css("background", "white")
//     ,
//     newCanvas("right_white", Number((240-BLURSIZE)/2)+"vw", 1.5*FONTSIZE+"vw")
//         .settings.css("background", "white")
//     ,
//     newCanvas("mask", "240vw", 1.5*FONTSIZE+"vw")
//         .settings.add(          Number((240-BLURSIZE)/2)+"vw" , "center at 50%" ,  getCanvas("blur")        )
//         .settings.add(                                  "0vw" , "center at 50%" ,  getCanvas("left_white")  )
//         .settings.add( Number((240-BLURSIZE)/2+BLURSIZE)+"vw" , "center at 50%" ,  getCanvas("right_white") )
//     ,
//     // END MASK
//     newText("sentence", "The green toad put the yellow frog on the napkin into the box.")
//         .settings.css({'font-size': FONTSIZE+"vw", 'white-space': 'nowrap'})
//         .settings.cssContainer({overflow:"hidden"})
//     ,
//     newCanvas("screen", "100vw", "100vh")
//         .settings.add(                              0 , 0 , newCanvas("left",  Number(50-LEFTRIGHTGAP/2)+"vw", "100vh") )
//         .settings.add( Number(50+LEFTRIGHTGAP/2)+"vw" , 0 , newCanvas("right", Number(50-LEFTRIGHTGAP/2)+"vw", "100vh") )
//         .settings.add(                              0 , 0 , newCanvas("read", "100vw", "100vh").settings.cssContainer("overflow","hidden") )
//         .print()
//         .settings.cssContainer({position: "absolute", top: 0, left: 0})
//     ,
//     getCanvas("read")
//         .settings.add("left at 50%"  , "center at 50%", getText("sentence"))
//         // .settings.add("center at 50%", "center at 50%", getCanvas("mask")  )
//     ,
//     newEyeTracker("wouf", 10)
//         .calibrate()
//         .settings.add( getCanvas("left") , getCanvas("right") )
//         .settings.callback(function(x,y){
//             let el = getText("sentence")._element.jQueryContainer;
//             let offset = el.offset();
//             let windowWidth = $(window).width();
//             let elWidth = el.width();
//             let left = offset.left + SPEED*(windowWidth/2 - x)/100;
//             if (left>windowWidth-10)
//                 left = windowWidth-10;
//             if (left+elWidth<10)
//                 left = 10 - elWidth;
//             el.offset({top: offset.top, left: left});
//             // if (Xs.length < UPDATEBLURRATE)
//             //     Xs.push(x);
//             // else{
//             //     let left = 0;
//             //     Xs.map(n=>left+=n);
//             //     let mask = getCanvas("mask")._element.jQueryElement;
//             //     mask.offset({top: mask.offset().top, left: left/UPDATEBLURRATE - 1.2*windowWidth});
//             //     Xs = [x];
//             // }
//         })
//         .start()
//     ,
//     getCanvas("read")
//         .settings.css("cursor","none")
//     ,
//     getButton("validate")
//         .wait()
// )


// // Animates the canvas 'ball' and changes its color
// shake = color=>[
//     getCanvas("ball").settings.css({transition: '0.25s ease-in-out', transform: 'translateX(10px)'})
//     ,
//     getButton("shake").settings.disable()
//     ,
//     newTimer(300).start().wait()
//     ,
//     getCanvas("ball").settings.css({transform: 'none'})
//     ,
//     newTimer(300).start().wait()
//     ,
//     getCanvas("ball").settings.css('background', color)
//     ,
//     getButton("reset").settings.enable()
// ]

// // Generates a palette with two colors
// palette = (color1,color2,...elements)=>[
//     newCanvas("board", 100, 100)
//         .settings.center()
//         .settings.add( "center at 50" ,  -5  , newImage('bgPalette', 'https://www.dropbox.com/s/oa5ipw0b5gfgm5v/1494779624.png?raw=1' ).settings.size(120,90) )
//         .settings.add( 40 , 12 , newCanvas("color1" , 20, 20).settings.css('background', color1) )
//         .settings.add( 15 , 25 , newCanvas("color2" , 20, 20).settings.css('background', color2) )   
//         .print()
//     ,
//     newPalette("palette")
//         .settings.addColor( color1 , getCanvas("color1") /*, '2'*/ )
//         .settings.addColor( color2 , getCanvas("color2") /*, '1'*/ )
//         .settings.addElement( ...elements )
// ]


// // Generates a report sequence Canvas with the four specified colors
// report = (actual1,actual2,buffy1,buffy2) => [
//     newGroup("draw"),
//     newGroup("buffy"),
//     newGroup("shaken")
//     ,
//     newCanvas( "buffysGuesses" , 100 , 80 )
//         .settings.add( "center at 25%" ,  5 , newText("firstBuffy", "draw").settings.italic() )
//         .settings.add( "center at 25%" , 45 , newText("secondBuffy", "shake").settings.italic() )
//         .settings.add( "center at 75%" ,  5 , newCanvas("buffyPatch1", 20, 20).settings.css('background',buffy1) )
//         .settings.add( "center at 75%" , 45 , newCanvas("buffyPatch2", 20, 20).settings.css('background',buffy2) )
//     ,
//     newCanvas("buffyPanel", 200, 100)
//         .settings.css("font-family", "Chalkduster, fantasy")
//         .settings.add( "right at 100%" , "center at 55%" , newImage("buffy", "buffy_blindfold.png").settings.size(80,80) )
//         .settings.add( -5 , -10 , newImage("buffyBubble", "buffyBubble.png").settings.size(130,120) )
//         .settings.add( "center at 25%" , 0 , newText("think", "I THINK...") )
//         .settings.add( 0 , 20 , getCanvas("buffysGuesses") )
//     ,
//     newCanvas("drawnBall", 20, 20).settings.css({'border': 'solid 1px white', 'border-radius': '10px', 'background': actual1})
//     ,
//     newCanvas("shakenBall", 20, 20).settings.css({'border': 'solid 1px white', 'border-radius': '10px', 'background': actual2})
//     ,
//     newText("label draw" , "1. Draw:"), newText("label guess", "2. Buffy's guesses:"), newText("label shake", "3. Shake:")
//     ,
//     newCanvas( "labels" , 600 , 20 )
//         .settings.css({"font-family": "Chalkduster, fantasy", color: "white"})
//         .settings.add( "center at 16%" , "center at 50%" , getText("label draw").settings.group("draw") )
//         .settings.add( "center at 50%" , "center at 50%" , getText("label guess").settings.group("buffy") )
//         .settings.add( "center at 83%" , "center at 50%" , getText("label shake").settings.group("shaken") )
//     ,
//     newCanvas( "reports" , 600 , 110 )
//         .settings.add( "center at 16%" , "center at 50%" , getCanvas("drawnBall").settings.group("draw") )
//         .settings.add( "center at 50%" , "center at 50%" , getCanvas("buffyPanel").settings.group("buffy") )
//         .settings.add( "center at 83%" , "center at 50%" , getCanvas("shakenBall").settings.group("shaken")  )
//     ,
//     newImage("chalk", "https://www.dropbox.com/s/bpwbe2psliq0ak5/chalk_overlay.png?raw=1")
//         .settings.size(600,160)
//         .settings.css("opacity",0.2)
//         .settings.cssContainer("pointer-events", "none")
//     ,
//     newCanvas( "sequence" , 600 , 160 )
//         .settings.css("border", "solid 5px darkgoldenrod")
//         .settings.add( 0 , 0  , newImage("blackboard", "https://www.dropbox.com/s/xo5r6a38xook8x7/blackboard.png?raw=1").settings.size(600,160) )
//         .settings.add( 0 , 10 , getCanvas("labels")  )
//         .settings.add( 0 , 40 , getCanvas("reports") )
//         .settings.add( "center at 30%" , "center at 50%" , newCanvas("lineLeft", 0,108).settings.css("border","dashed 1px white").settings.group("buffy") )
//         .settings.add( "center at 70%" , "center at 50%" , newCanvas("lineRight",0,108).settings.css("border","dashed 1px white").settings.group("shaken") )
//         .settings.add( 0 , 0  , getImage("chalk") )
// ]

// // Generates a report without Buffy :'(
// reportNoBuffy = (...args) => report(...args).concat([
//     getCanvas("labels").settings.remove( getText("label guess")  ),
//     getCanvas("reports").settings.remove( getCanvas("buffyPanel") ),
//     getCanvas("sequence").settings.remove( getCanvas("lineLeft")   ).settings.remove( getCanvas("lineRight")  )
//     ,
//     getCanvas("sequence").settings.add( "center at 50%" , "center at 50%" , newCanvas("lineMiddle", 0,  108).settings.css("border", "dashed 1px white") )
//     ,
//     getText("label shake").settings.text("2. Shake:")
// ])
    

// // Adds some style to the occurrences of the color's row in the string
// String.prototype.styleColor = function(row) {
//     return this.replace(
//                 new RegExp("(\\W"+row.Color+"(\\W|$))")
//                 , 
//                 "<span style='color:"+row.Color+"; text-shadow: 1px 0 0 #000, 0 -1px 0 #000, 0 1px 0 #000, -1px 0 0 #000; font-weight: normal'>$1</span>"
//            );
// }

// PennController.Template( "psbuffy.csv" ,
//     row => PennController( "practice-"  + row.Order + "-" + row.Subject + "-" + row.MatrixLeftPredicate + "-" + row.Condition ,
//         newText("Practice trial")
//             .settings.center()
//             .settings.italic()
//             .settings.color('blue')
//             .print()
//         ,
//         newText("description", "<p><em>Fact:</em> &nbsp; "+row.Sentence.charAt(0).toUpperCase()+row.Sentence.slice(1).styleColor(row)+"</p>").print()
//         ,
//         report(row.Actual1,row.Actual2,row.Buffy1,row.Buffy2),
//         getCanvas("sequence").print(),
//         getGroup("draw").settings.hidden(),
//         getGroup("buffy").settings.hidden(),
//         getGroup("shaken").settings.hidden()
//         ,
//         newTimer("between-steps", DELAY).start().wait()    
//         ,
//         getGroup("draw").settings.visible(),
//         getTimer("between-steps").start().wait()
//         ,
//         getGroup("buffy").settings.visible(),
//         getTimer("between-steps").start().wait()
//         ,
//         getGroup("shaken").settings.visible(),
//         getCanvas("lineRight").settings.visible()
//         ,
//         palette( row.Color , row.altercolor , getCanvas('drawnBall') , getCanvas('buffyPatch1') , getCanvas("buffyPatch2") , getCanvas('shakenBall') ),
//         getPalette("palette")
//             .brush( getCanvas('drawnBall')   , row.Actual1 )
//             .brush( getCanvas('buffyPatch1') , row.Buffy1  )
//             .brush( getCanvas('buffyPatch2') , row.Buffy2  )
//             .brush( getCanvas('shakenBall')  , row.Actual2 )
//             .settings.log()
//         ,
//         newKey(" ").settings.callback( getButton("continue").click() ),
//         newButton('continue', "Continue")
//             .print()
//             .wait()
//             .remove()
//         ,
//         getCanvas('board').remove()
//         ,
//         ...checkColors(row)
//         ,
//         ( row.Order==10 ? 
//           getTooltip("feedback")
//               .settings.text("Good, practice is over! The experiment will start next and we will no longer give you feedback.")
//               .settings.label("Start the experiment")
//               .print( getCanvas("sequence") )
//               .wait()
//         : 
//         null )
//     )
// )
    
    
    
// checkColors = row => {
//     let top = [
//         newTooltip("feedback", "")
//             .settings.position("bottom center")
//             .settings.frame('none')
//         ,
//         newVar("correct", true)
//     ];
//     let commands = [
//         getVar("correct").test.is(true).failure(
//             getTooltip("feedback").settings.text("Oops, it appears you were wrong").print(getCanvas("sequence")).wait()
//         )
//     ];
//     if ((row.Subject=="Second" && row.MatrixLeftPredicate=="Was") || row.Subject=="Again") commands = [
//         getPalette("palette").test.color(getCanvas("shakenBall"),row.Color).failure( blink(getCanvas("shakenBall")) , getVar("correct").set(v=>false) )
//         ,
//         ...commands
//         ,
//         getPalette("palette").brush( getCanvas("shakenBall") , row.Color )
//     ];
//     if (row.Subject=="Second" && row.MatrixLeftPredicate=="Thought") commands = [
//         getPalette("palette").test.color(getCanvas("buffyPatch2"),row.Color).failure( blink(getCanvas("buffyPatch2")) , getVar("correct").set(v=>false) )
//         ,
//         ...commands
//         ,
//         getPalette("palette").brush( getCanvas("buffyPatch2") , row.Color )
//     ];
//     if ((row.Subject=="First" && row.MatrixLeftPredicate=="Was") || row.Subject=="Again") commands = [
//         getPalette("palette").test.color(getCanvas("drawnBall"),row.Color).failure( blink(getCanvas("drawnBall")) , getVar("correct").set(v=>false) )
//         ,
//         ...commands
//         ,
//         getPalette("palette").brush( getCanvas("drawnBall") , row.Color )
//     ];
//     if (row.Subject=="First" && row.MatrixLeftPredicate=="Thought") commands = [
//         getPalette("palette").test.color(getCanvas("buffyPatch1"),row.Color).failure( blink(getCanvas("buffyPatch1")) , getVar("correct").set(v=>false) )
//         ,
//         ...commands
//         ,
//         getPalette("palette").brush( getCanvas("buffyPatch1") , row.Color )
//     ];
//     return [
//         ...top
//         ,
//         ...commands
//         ,
//         unblink(getCanvas("drawnBall")),unblink(getCanvas("shakenBall")),unblink(getCanvas("buffyPatch1")),unblink(getCanvas("buffyPatch2")),
//         getCanvas("drawnBall").settings.css("border", "solid 1px white"),
//         getCanvas("shakenBall").settings.css("border", "solid 1px white"),
//         getCanvas("buffyPatch1").settings.css("border", "none"),
//         getCanvas("buffyPatch2").settings.css("border", "none")
//         ,
//         newTimer("beforeEnd", 200).start().wait()
//         ,
//         getVar("correct").test.is(true).failure(
//             getTooltip("feedback").settings.text("Now that's better").settings.label("Got it!").print(getCanvas("sequence")).wait()
//         )
//     ];
// }
    

// blink = element => newFunction(function(){
//         element._element.jQueryElement.css("border", "solid 2px red");
//         let b = 1;
//         let a = setInterval(()=>{
//             b = 1 - b;
//             element._element.jQueryElement.css("border", (b==1?"solid 2px red":"none"));
//         }, 500);
//         this['blink-'+element._element.id] = a;
//     }).call()
        
        
// unblink = element => newFunction(function(){
//         if (this.hasOwnProperty('blink-'+element._element.id)) clearInterval(this['blink-'+element._element.id]);
//     }).call()


// PennController.ResetPrefix(null);

// PennController.AddHost("https://files.lab.florianschwarz.net/ibexfiles/PennController/SampleTrials/");

// const DELAY = 750;

// PennController.Sequence( 
//     startsWith("practice")
// )

    
// // Exectued before all trials
// PennController.Header(
//     defaultTooltip                  // Aspect & properties of all tooltips
//         .settings.size(250, 60)
//         .settings.key("")
//         .settings.frame()
//         .settings.label("Click here or Press Space")
//     ,
//     newTimer(200).start().wait()
// )    