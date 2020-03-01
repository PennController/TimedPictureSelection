PennController.ResetPrefix(null);

Header(
    // empty header
)
.log( "ID" , getVar("ID") )


newTrial(
    defaultText
        .center()
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
        .global()
    ,
    newTextInput("ID", "")
        .center()
        .print()
    ,
    newButton("Start")
        .center()
        .print()
        .wait( getTextInput("ID").testNot.text("") )
    ,
    getVar("ID")
        .set( getTextInput("ID") )
)


Template( "fulldesign.csv" ,
    row => newTrial(
        newText("sentence", row.Sentence)
            .center()
            .hidden()
            .print()
        ,
        newTimer(200)
            .start()
            .wait()
        ,
        defaultImage
            .size(300,300)
            .selector("choice")
        ,
        newSelector("choice")
            .log()
            .frame("dotted 2px purple")
            .disable()
        ,
        newCanvas(650,300)
            .add(   0 , 0 , newImage(row.PictureSg) )
            .add( 350 , 0 , newImage(row.PicturePl) )
            .print()
        ,
        getSelector("choice")
            .shuffle()
            .keys("F","J")
        ,
        newTimer(500)
            .start()
            .wait()
        ,
        newAudio("description", row.Audio)
            .log()
            .play()
        ,
        getText("sentence")
            .unfold(row.Duration)
        ,
        getSelector("choice")
            .enable()
            .once()
            .wait()
        ,
        newTimer(500)
            .start()
            .wait()
        ,
        getAudio("description")
            .wait("first")
    )
    .log( "Item"     , row.Item     )
    .log( "Group"    , row.Group    )
    .log( "Ending"   , row.Ending   )
    .log( "Duration" , row.Duration )
)


SendResults();


newTrial(
    newText("Thank you for your participation!")
        .print()
    ,
    newText("<p><a href='https://www.pcibex.net/' target='_blank'>Click here to validate your submission</a></p>")
        .print()
    ,
    newTimer(1)
        .wait()
)
.setOption("countsForProgressBar",false)
