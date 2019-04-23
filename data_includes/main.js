PennController.ResetPrefix(null);
PennController.Debug();


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
    .log( "ID"       , getVar("ID") )
    .log( "Item"     , row.Item     )
    .log( "Group"    , row.Group    )
    .log( "Ending"   , row.Ending   )
    .log( "Duration" , row.Duration )
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
