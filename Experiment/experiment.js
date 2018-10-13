
var mySceneTLX;        /* Top Left corner X coordinate */
var mySceneTLY;        /* Top Left corner Y coordinate */
var mySceneBRX;        /* Bottom Right corner X coordinate */
var mySceneBRY;        /* Bottom Right corner Y coordinate */
var mySceneW;          /* Scene Width */
var mySceneH;          /* Scene Height */
var myCenterX;         /* Scene Center X coordinate */
var myCenterY;         /* Scene Center Y coordinate */

/* Room Variables */
var leftB;              /* Left Barrier */
var rightB;             /* Right Barrier */
var bottomB;            /* Bottom Barrier */
var topB;               /* Top Barrier */
var backB=-4.0;         /* Back Barrier */
var wallThickness;      /* Wall Thickness */

/* Room Objects */
var myFloor;            /* Floor */
var myCeiling;          /* Ceiling */
var myBack;             /* Back */
var myRight;            /* Right */
var myLeft;             /* Left */






/* Ball variables */
var myBall;             /* Ball Object */
var myBallRadius;       /* Radius */
var myBallX;            /* X Position */
var myBallY;            /* Y Position */
var myBallVX;           /* X Velocity */
var myBallVY;           /* Y Velocity */
var myBallAX;           /* X Acceleration */
var myBallAY;           /* Y Acceleration */
var myBallZ;            /* Z Position for placing ball */



var R1value=2 , R2value=2 , R3value=2 , Vvalue=3.96 ;



/* Parameters, Variables */
var gravityX;           /* X component of Gravity in m/S2 */
var gravityY;           /* Y component of Gravity in m/S2 */

/*variables for geometry*/
var line1;
var line3;
var res1;
var res2;
var res3;
var res;
var ammeter1;
var ammeter3;
var ammeter4;
var switch1;
var switch2;
var a1, a2, a3, a4, a5, a6;

/******************* Interaction functions ***********************/


 
function myBallDrag(element, newpos)
{
    myBallX = newpos.x;
    if (newpos.x < (leftB + myBallRadius)) { myBallX = (leftB + myBallRadius) }
    else if (newpos.x > (rightB - myBallRadius)) { myBallX = (rightB - myBallRadius) }
    myBallY = newpos.y;
    if (newpos.y < (bottomB + myBallRadius)) { myBallY = (bottomB + myBallRadius); }
    else if (newpos.y > (topB - myBallRadius)) { myBallY = (topB  - myBallRadius); }
    myBallZ = newpos.z;

    myBall.position.set(myBallX, myBallY, myBallZ);
}

/******************* End of Interaction functions ***********************/

var Res1, Res2, Res3, Voltage , req = .66 ;
var DefaultR1, DefaultR2, DefaultR3, DefaultV;
var R1max, R2max, R3max, Vmax;
var R1min, R2min, R3min, Vmin;
var amm1=2, amm2=2, amm3=2,amm4=6, Volt=3.96;




function test()
{
    amm4 = Math.round((Vvalue/req)*100)/100;
    PIEchangeDisplayText("Ammeter4, A4",amm4);
    Volt = Math.round((amm4*req)*100)/100;
    PIEchangeDisplayText("Voltage V", Volt);
    
    amm1 = Math.round((Volt/R1value)*100)/100;
    PIEchangeDisplayText("Ammeter1, A1",amm1);
    
    amm2 = Math.round((Volt/R2value)*100)/100;
    PIEchangeDisplayText("Ammeter2, A2",amm2);
    
    amm3 = Math.round((Volt/R3value)*100)/100;
    PIEchangeDisplayText("Ammeter3, A3",amm3);
}




function handleR1(newValue)
{

    55
    R1value = newValue;
    var c = (R1value*R2value*R3value)/(R1value*R2value+R2value*R3value+R3value*R1value);
    c = Math.round(c*100)/100;
    PIEchangeInputCommand("Res(Eq): "+ req + " " + "ohms", "Res(Eq): "+ c + " " + "ohms", handleReq );
    req = c;
    test();
    PIErender();
}


function handleR2(newValue)
{

    R2value = newValue;
    
    var c = (R1value*R2value*R3value)/(R1value*R2value+R2value*R3value+R3value*R1value);
    c = Math.round(c*100)/100;
    PIEchangeInputCommand("Res(Eq): "+ req + " " + "ohms", "Res(Eq): "+ c + " " + "ohms", handleReq );
    req = c;
    test();
    PIErender();
}


function handleR3(newValue)
{
    
    R3value = newValue;
    var c = (R1value*R2value*R3value)/(R1value*R2value+R2value*R3value+R3value*R1value);
    c = Math.round(c*100)/100;
    PIEchangeInputCommand("Res(Eq): "+ req + " " + "ohms", "Res(Eq): "+ c + " " + "ohms", handleReq );
    req = c;
    test();
    PIErender();
}


function handleV(newValue)
{
    
    Vvalue = newValue;
    test();
    PIErender();
}

function handleReq()
{
    
    PIErender();
}







function initialiseControlVariables()
{
    
    /* Labels */


    Res1="R1";
    Res2="R2";
    Res3="R3";
    Voltage="V(Volts)";
    
    
    /* Default (initial) Values */
    
    DefaultR1= 2;
    DefaultR2= 2;
    DefaultR3= 2;
    DefaultV= 4;
//    /* Slider Limits */

//
    R1max = 10;
    R1min = 1;
    R2max = 10;
    R2min = 1;
    R3max = 10;
    R3min = 1;
    Vmax= 20;
    Vmin = 1;
    
//    /* Slider Steps */

    R1step = 0.5;
    R2step = 0.5;
    R3step = 0.5;
    Vstep = 1;
       
}



/******************* End of GUI control objects code ***********************/

/******************* Load Experiment objects code ***********************/

var helpContent;
function initialiseHelp()
{
    helpContent="";
    helpContent = helpContent + "<h2>Resistance in parallel experiment</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
    helpContent = helpContent + "<p>The experiment shows the relation between three resistance placed parallel to one another. </p>";
    helpContent = helpContent + "<h3>Animation control</h3>";
    helpContent = helpContent + "<p>The top line has animation controls. There are two states of the experiment.</p>";
    helpContent = helpContent + "<h3>The setup stage</h3>";
    helpContent = helpContent + "<p>The initial state is setup stage. In this stage, you can see a control window at the right. You have access to four sliders.</p>";
    helpContent = helpContent + "<p>You can control the following:</p>";
    helpContent = helpContent + "<ul>";
    helpContent = helpContent + "<li>R1&nbsp;&nbsp;:&nbsp;Controls the value of resistance1.</li>";
    helpContent = helpContent + "<li>R2&nbsp;&nbsp;:&nbsp;Controls the value of resistance2.</li>";
    helpContent = helpContent + "<li>R3&nbsp;:&nbsp;Controls the value of resistance3.</li>";
    helpContent = helpContent + "<li>V(volt)&nbsp;:&nbsp;Controls the value of applied voltage i.e Voltage</li>";
    helpContent = helpContent + "</ul>";
    helpContent = helpContent + "<p>You also have an additional input command showing the value of equivalent resistance. As the resistance changes the value of requivalent changes in the given space.</p>";
    helpContent = helpContent + "<p>Once you setup the experiment, you can enter the animation stage by clicking the start button</p>";
    helpContent = helpContent + "<h3>The animation stage</h3>";
    helpContent = helpContent + "<p>In the animation stage, the current flows from positive terminal to negative terminal of battery. Current is divided and ammeter readings are shown.</p>";
    helpContent = helpContent + "<p>The right hand panel now shows the values of the five experiment variables during animation.</p>";
    helpContent = helpContent + "<ul>";
    helpContent = helpContent + "<li>A1&nbsp;&nbsp;:&nbsp;Shows the ammeter reading attached to R1.</li>";
    helpContent = helpContent + "<li>A2&nbsp;&nbsp;:&nbsp;Shows the ammeter reading to R2.</li>";
    helpContent = helpContent + "<li>A3&nbsp;:&nbsp;Shows the ammeter reading attached to R3.</li>";
    helpContent = helpContent + "<li>A4&nbsp;:&nbsp;Shows the net current flowing in the circuit.</li>";
    helpContent = helpContent + "<li>V&nbsp;:&nbsp;Shows the Voltage gained across the resistances.</li>";
    helpContent = helpContent + "</ul>";
    helpContent = helpContent + "<p>In addition you will also see the fluctuations of the readings in the blue observation table.</p>";
    helpContent = helpContent + "<p>You can pause and resume the animation by using the pause/play nutton on the top line</p>";
    helpContent = helpContent + "<h2>Happy Experimenting</h2>";
    PIEupdateHelp(helpContent);
}

var infoContent;
function initialiseInfo()
{
    infoContent =  "";
    infoContent = infoContent + "<h2>Resistance in Parallel  concepts.</h2>";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent + "<p>The experiment shows the relation between the parallel resistance and the equivalent resistance and the relation between ammeter readings that are in series with the resistances with the net ammeter reading.</p>";
    infoContent = infoContent + "<h3>Resistance in Parallel</h3>";
    infoContent = infoContent + "<p>Resistance is the hinderess in the current flow. When the resistances are placed in parallel then the equivalent resistance is decreased.</p>";
    infoContent = infoContent + "<p>We are given the values of the resistances and we need to find the equivalent resistance or if equivalent resistance is known then we can find any unkown resistance.</p>";
    infoContent = infoContent + "<p>Formula for finding equivalent Resistance from given three resistances in parallel is Req = (R1*R2*R3)/(R1*R2+R2*R3+R3*R1);</p>";
    
    infoContent = infoContent + "<h3>Ammeter Readings</h3>";
    infoContent = infoContent + "<p>Given the constant voltage applied the current flown through the resistance is inversely propotional to the value of resistance.</p>";
    infoContent = infoContent + "<p>Once we have found the equivalent resistance then dividing applied voltage by it will give us the net current which will divide furthur into branches.</p>";
    infoContent = infoContent + "<p>Voltameter reading will give the voltage accross the resistances. Through this voltage we will determine the current in each branch.</p>";
    
    infoContent = infoContent + "<p>Calculations for the ammeter  reading is A4 = Voltage applied / Requivalent.</p>";
    infoContent = infoContent + "<p>The voltage across Resistances is given by:V = (A4 reading)*(Requivalent)</p>";
    infoContent = infoContent + "<p>Calculation for individual ammeter is: A1 = V/R1, A2 = V/R2, A3= V/R3;</p>";
    
    infoContent = infoContent + "<p>According to kirchoff law net current is equal to sum of individual currents. A4 reading =  A1 + A2 + A3</p>";
    infoContent = infoContent + "<h2>Happy Experimenting</h2>";
    PIEupdateInfo(infoContent);
}

function initialiseScene()
{
    /* Initialise Scene Variables */
    mySceneTLX = 0.0;
    mySceneTLY = 3.0;
    mySceneBRX = 4.0;
    mySceneBRY = 0.0;
    mySceneW   = (mySceneBRX - mySceneTLX);
    mySceneH   = (mySceneTLY - mySceneBRY);
    myCenterX  = (mySceneTLX + mySceneBRX) / 2.0;
    myCenterY  = (mySceneTLY + mySceneBRY) / 2.0;
    myBallZ    = -2.0;
}

function initialiseOtherVariables()
{
    /* Initialise variables */
    myBallRadius = mySceneW/30.0;
    wallThickness = 0.0;

    /* Gravity */
    gravityX = 0.0;
    gravityY = -9.8;

    /* Barriers */
    leftB=mySceneTLX;
    rightB=mySceneBRX;
    bottomB=mySceneBRY;
    topB=mySceneTLY;
}

function addArrows()
{
    a1.visible = true;
    a2.visible = true;
    a3.visible = true;
    a4.visible = true;
    a5.visible = true;
    a6.visible = true;  
    
}

function noArrows()
{
    a1.visible = false;
    a2.visible = false;
    a3.visible = false;
    a4.visible = false;
    a5.visible = false;
    a6.visible = false;  
    PIErender();
}

function stopAnimation()
{
   PIEcreateTable("Observation table", 2, 4, true);

    PIEsetRowInput(1, 1, "0");

    
    
    var headerRow=["AmmeterA1 ", " AmmeterA2 ", " AmmeterA3 ", "AmmeterA4"];
    PIEupdateTableRow(0, headerRow);
    
    
    switch1.visible = false;
    switch2.visible = true;
    noArrows();
    PIEstopAnimation();
    PIErender();
}


function renewCircuit()
{
    //stopAnimation();
    line1.visible = true;
    line3.visible = true;
    res1.visible = true;
    res3.visible = true;
    ammeter1.visible = true;
    ammeter3.visible = true;
    ammeter4.visible = true;
    res.visible = false;
    res2.visible = true;
    
    PIErender();
}



/*function for replace*/
function replaceCircuit()
{
    
    line1.visible = false;
    line3.visible = false;
    res1.visible = false;
    res3.visible = false;
    ammeter1.visible = false;
    ammeter3.visible = false;
    ammeter4.visible = false;
    res.visible = true;
    res2.visible = false;
    stopAnimation();
    PIErender();
    
}


function startAnimation()
{
    
     PIEupdateTableCell(1, 0, amm1);
    PIEupdateTableCell(1, 1, amm2);
    PIEupdateTableCell(1, 2, amm3);
    PIEupdateTableCell(1, 3, amm4);
    switch1.visible = true;
    switch2.visible = false;
    if(res1.visible)
    addArrows();
    else{
        addArrows();
        a2.visible = false;
        a4.visible = false;
    }
    PIEstartAnimation();
    PIErender();
}




function resetExperiment()
{
    
    PIEcreateTable("Observation table", 2, 4, true);

    PIEsetRowInput(1, 1, "0");
    
    PIEupdateTable()
    renewCircuit();
    stopAnimation();
    PIErender();
}





function loadExperimentElements()
{
var geometry;
var material;
var loader;
var texture;

    PIEsetExperimentTitle("Resistance in parallel");
    PIEsetDeveloperName("Piyush Karira");

    /* initialise help and info content */
    initialiseHelp();
    initialiseInfo();

    /* initialise Scene */
    initialiseScene();

    /* initialise Other Variables */
    initialiseOtherVariables();

    /* Create Ball and add it to scene */
    myBall = new THREE.Mesh(new THREE.CircleGeometry(myBallRadius, 32, 32), new THREE.MeshLambertMaterial({color:0xededed}));
    myBall.position.set(myBallX, myBallY, myBallZ);
    PIEdragElement(myBall);
    PIEsetDrag(myBall, myBallDrag);
    
    
    /*Arrows*/
    var mat = new THREE.LineBasicMaterial( { color: "red" } );
    var geo = new THREE.Geometry();
    geo.vertices.push(new THREE.Vector3( .95, 1.45, 0) );
    geo.vertices.push(new THREE.Vector3( 1, 1.5, 0) );
    geo.vertices.push(new THREE.Vector3( 1.05, 1.45, 0) );
     a1 = new THREE.Line( geo, mat );
    PIEaddElement(a1);
    a1.visible = false;
    /*res1*/
    
    var mat = new THREE.LineBasicMaterial( { color: "red" } );
    var geo = new THREE.Geometry();
    geo.vertices.push(new THREE.Vector3( 2.05, 2.25, 0) );
    geo.vertices.push(new THREE.Vector3( 2.10, 2.20, 0) );
    geo.vertices.push(new THREE.Vector3( 2.05, 2.15, 0) );
     a2 = new THREE.Line( geo, mat );
    PIEaddElement(a2);
    a2.visible = false;
    
    /*res2*/
    var mat = new THREE.LineBasicMaterial( { color: "red" } );
    var geo = new THREE.Geometry();
    geo.vertices.push(new THREE.Vector3( 2.10, 2.05, 0) );
    geo.vertices.push(new THREE.Vector3( 2.15, 2, 0) );
    geo.vertices.push(new THREE.Vector3( 2.10, 1.95, 0) );
     a3 = new THREE.Line( geo, mat );
    PIEaddElement(a3);
    a3.visible = false;
    
    /*res3*/
    var mat = new THREE.LineBasicMaterial( { color: "red" } );
    var geo = new THREE.Geometry();
    geo.vertices.push(new THREE.Vector3( 2.05, 1.85, 0) );
    geo.vertices.push(new THREE.Vector3( 2.10, 1.80, 0) );
    geo.vertices.push(new THREE.Vector3( 2.05, 1.75, 0) );
    a4 = new THREE.Line( geo, mat );
    PIEaddElement(a4);
    a4.visible = false;
    
    
    var mat = new THREE.LineBasicMaterial( { color: "red" } );
    var geo = new THREE.Geometry();
    geo.vertices.push(new THREE.Vector3( 1.30, 2.50, 0) );
    geo.vertices.push(new THREE.Vector3( 1.35, 2.45, 0) );
    geo.vertices.push(new THREE.Vector3( 1.30, 2.40, 0) );
     a5 = new THREE.Line( geo, mat );
    PIEaddElement(a5);
    a5.visible = false;
    
    var mat = new THREE.LineBasicMaterial( { color: "red" } );
    var geo = new THREE.Geometry();
    geo.vertices.push(new THREE.Vector3( 2.95, 1.55, 0) );
    geo.vertices.push(new THREE.Vector3( 3, 1.5, 0) );
    geo.vertices.push(new THREE.Vector3( 3.05, 1.55, 0) );
     a6 = new THREE.Line( geo, mat );
    PIEaddElement(a6);
    a6.visible = false;
    
    
    
    
    /*for wire */
    var mat = new THREE.LineBasicMaterial( { color: 0x0000ff } );
    var geo = new THREE.Geometry();
    
    geo.vertices.push(new THREE.Vector3( 1, 1, 0) );
    geo.vertices.push(new THREE.Vector3( 1, 2, 0) );
    geo.vertices.push(new THREE.Vector3( 3, 2, 0) );
    geo.vertices.push(new THREE.Vector3( 3, 1, 0) );
    geo.vertices.push(new THREE.Vector3( 2.6, 1, 0) );
    var line = new THREE.Line( geo, mat );
    PIEaddElement(line);
    
    /*forbottom wires*/
    var mat = new THREE.LineBasicMaterial( { color: 0x0000ff } );
    var geo = new THREE.Geometry();
    geo.vertices.push(new THREE.Vector3( 1, 1, 0) );
    geo.vertices.push(new THREE.Vector3( 1.35, 1, 0) );
    geo.vertices.push(new THREE.Vector3( 1.35, .5, 0) );
    var line = new THREE.Line( geo, mat );
    PIEaddElement(line);
    
    var mat = new THREE.LineBasicMaterial( { color: 0x0000ff } );
    var geo = new THREE.Geometry();
     geo.vertices.push(new THREE.Vector3( 1.45, .5, 0) );
    geo.vertices.push(new THREE.Vector3( 1.45, 1, 0) );
    geo.vertices.push(new THREE.Vector3( 1.65, 1, 0) );
    geo.vertices.push(new THREE.Vector3( 1.65, .5, 0) );
    var line = new THREE.Line( geo, mat );
    PIEaddElement(line);
    
    var mat = new THREE.LineBasicMaterial( { color: 0x0000ff } );
    var geo = new THREE.Geometry();
    geo.vertices.push(new THREE.Vector3( 1.75, .5, 0) );
    geo.vertices.push(new THREE.Vector3( 1.75, 1, 0) );
    geo.vertices.push(new THREE.Vector3( 2.25, 1, 0) );
    var line = new THREE.Line( geo, mat );
    PIEaddElement(line);
    
    /*switch*/
    var mat = new THREE.LineBasicMaterial( { color: "red" } );
    var geo = new THREE.Geometry();
    geo.vertices.push(new THREE.Vector3( 2.25, 1, 0) );
    geo.vertices.push(new THREE.Vector3( 2.6, 1, 0) );
     switch1 = new THREE.Line( geo, mat );
    PIEaddElement(switch1);
    switch1.visible = false;
    
    var mat = new THREE.LineBasicMaterial( { color: "red" } );
    var geo = new THREE.Geometry();
    geo.vertices.push(new THREE.Vector3( 2.25, 1, 0) );
    geo.vertices.push(new THREE.Vector3( 2.6, 1.1, 0) );
     switch2 = new THREE.Line( geo, mat );
    PIEaddElement(switch2);
    switch2.visible = true;
    
    
    
    /*for voltameter*/
    var mat = new THREE.LineBasicMaterial( { color: 0x0000ff } );
    var geo = new THREE.Geometry();
    geo.vertices.push(new THREE.Vector3( 1.1, 2, 0) );
    geo.vertices.push(new THREE.Vector3( 1.1, 2.45, 0) );
    geo.vertices.push(new THREE.Vector3( 2.30, 2.45, 0) );
    geo.vertices.push(new THREE.Vector3( 2.30, 2, 0) );
    var line = new THREE.Line( geo, mat );
    PIEaddElement(line);
    
    
    /*res1wire*/
    var mat = new THREE.LineBasicMaterial( { color: 0x0000ff } );
    var geo = new THREE.Geometry();
    geo.vertices.push(new THREE.Vector3( 1.2, 2, 0) );
    geo.vertices.push(new THREE.Vector3( 1.25, 2.20, 0) );
    geo.vertices.push(new THREE.Vector3( 2.15, 2.20, 0) );
     geo.vertices.push(new THREE.Vector3( 2.20, 2, 0) );
     line1 = new THREE.Line( geo, mat );
    PIEaddElement(line1);
    
    /*res3wire*/
    var mat = new THREE.LineBasicMaterial( { color: 0x0000ff } );
    var geo = new THREE.Geometry();
    geo.vertices.push(new THREE.Vector3( 1.2, 2, 0) );
    geo.vertices.push(new THREE.Vector3( 1.25, 1.8, 0) );
    geo.vertices.push(new THREE.Vector3( 2.15, 1.8, 0) );
     geo.vertices.push(new THREE.Vector3( 2.20, 2, 0) );
     line3 = new THREE.Line( geo, mat );
    PIEaddElement(line3);
    
    /*res*/
    var geo = new THREE.BoxGeometry( .3, .04, 0.2 );
    var mat = new THREE.MeshBasicMaterial( {color:0xFE9A2E} );
     res = new THREE.Mesh( geo, mat );
    res.position.set(1.5,2,0);
    PIEaddElement( res );
    res.visibile = false;
    
    /*res1*/
    var geo = new THREE.BoxGeometry( .3, .05, 0.2 );
    var mat = new THREE.MeshBasicMaterial( {color:0xFE9A2E} );
     res1 = new THREE.Mesh( geo, mat );
    res1.position.set(1.5,2.20,0);
    PIEaddElement( res1 );
    
    /*res2*/
    var geo = new THREE.BoxGeometry( .3, .05, 0.2 );
    var mat = new THREE.MeshBasicMaterial( {color: 0xFE9A2E} );
     res2 = new THREE.Mesh( geo, mat );
    res2.position.set(1.5,2,0);
    PIEaddElement( res2 );
    
    /*res3*/
    var geo = new THREE.BoxGeometry( .3, .05, 0.2 );
    var mat = new THREE.MeshBasicMaterial( {color: 0xFE9A2E} );
     res3 = new THREE.Mesh( geo, mat );
    res3.position.set(1.5,1.80,0);
    PIEaddElement( res3 );
    
    
    
    /*Voltamer*/
    var geo = new THREE.CircleGeometry( myBallRadius/1.2, 35, 35 );
    var mat = new THREE.MeshBasicMaterial( { color:  0xfffff0 } );
    var ammeter = new THREE.Mesh( geo, mat );
    ammeter.position.set(1.6,2.45,0);
    PIEaddElement( ammeter );
    
    
    /*ammeter1*/
    var geo = new THREE.CircleGeometry( myBallRadius/1.5, 35, 35 );
    var mat = new THREE.MeshBasicMaterial( { color:  0xA4A4A4} );
     ammeter1 = new THREE.Mesh( geo, mat );
    ammeter1.position.set(1.9,2.20,0);
    PIEaddElement( ammeter1 );
    
    /*ammeter2*/
    var geo = new THREE.CircleGeometry( myBallRadius/1.5, 35, 35 );
    var mat = new THREE.MeshBasicMaterial( { color:  0xA4A4A4} );
    var ammeter2 = new THREE.Mesh( geo, mat );
    ammeter2.position.set(1.9,2,0);
    PIEaddElement( ammeter2 );
    
    var geo = new THREE.CircleGeometry( myBallRadius/1.5, 35, 35 );
    var mat = new THREE.MeshBasicMaterial( { color: 0xA4A4A4 } );
     ammeter4 = new THREE.Mesh( geo, mat );
    ammeter4.position.set(2.60,2.0 ,0);
    PIEaddElement( ammeter4 );
    
    /*ammeter3*/
    var geo = new THREE.CircleGeometry( myBallRadius/1.5, 35, 35 );
    var mat = new THREE.MeshBasicMaterial( { color: 0xA4A4A4 } );
     ammeter3 = new THREE.Mesh( geo, mat );
    ammeter3.position.set(1.9,1.80 ,0);
    PIEaddElement( ammeter3 );
    
    
    /*battery1*/
    var a = 20;
    var cuboidOrange =  new THREE.Mesh( new THREE.CubeGeometry( 4/a, 4.5/a, 6/a ),new THREE.MeshBasicMaterial({color: 0xB43104}));
    cuboidOrange.position.set(1.4,.6,0);
    PIEaddElement(cuboidOrange);
    
    var a=20;
    var cuboidBlack =  new THREE.Mesh( new THREE.CubeGeometry( 4/a, 3/a, 6/a ),new THREE.MeshBasicMaterial({color: "black"}));
    cuboidBlack.position.set(.0009,.2,0);
    cuboidOrange.add(cuboidBlack);
    
    var a=20;
    var minus =  new THREE.Mesh( new THREE.CubeGeometry( 1/a, 0.3/a, 0.1/a ),new THREE.MeshBasicMaterial({color: "red"}));
    minus.position.set(.1, .24, .5);
    cuboidOrange.add(minus);
    
    var a=20;
    var plus1 =  new THREE.Mesh( new THREE.CubeGeometry( 1/a, 0.3/a, 0.1/a ),new THREE.MeshBasicMaterial({color: "red"}));
    plus1.position.set(.01, .24, .5);
    cuboidOrange.add(plus1);
    
    var a=20;
    plus2 =  new THREE.Mesh( new THREE.CubeGeometry( 2/a, 0.2/a, 0.09/a ),new THREE.MeshBasicMaterial({color: "red"}));
    plus2.position.set(.01, .24, .5);
    cuboidOrange.add(plus2);
    plus2.rotation.z=Math.PI/2;
    
    
    
    /*batter2*/
    var a = 20;
    var cuboidOrange =  new THREE.Mesh( new THREE.CubeGeometry( 4/a, 4.5/a, 6/a),new THREE.MeshBasicMaterial({color: 0xB43104}));
    cuboidOrange.position.set(1.7,.6,0);
    PIEaddElement(cuboidOrange);
    
    var a=20;
    var cuboidBlack =  new THREE.Mesh( new THREE.CubeGeometry( 4/a, 3/a, 6/a ),new THREE.MeshBasicMaterial({color: "black"}));
    cuboidBlack.position.set(.0001,.2,0);
    cuboidOrange.add(cuboidBlack);
    
    var a=20;
    var minus =  new THREE.Mesh( new THREE.CubeGeometry( 1/a, 0.3/a, 0.1/a ),new THREE.MeshBasicMaterial({color: "red"}));
    minus.position.set(.08, .24, .5);
    cuboidOrange.add(minus);
    
    var a=20;
    var plus1 =  new THREE.Mesh( new THREE.CubeGeometry( 1/a, 0.3/a, 0.1/a ),new THREE.MeshBasicMaterial({color: "red"}));
    plus1.position.set(.0005, .24, .5);
    cuboidOrange.add(plus1);
    
    var a=20;
    plus2 =  new THREE.Mesh( new THREE.CubeGeometry( 2/a, 0.2/a, 0.09/a ),new THREE.MeshBasicMaterial({color: "red"}));
    plus2.position.set(.0005, .24, .5);
    cuboidOrange.add(plus2);
    plus2.rotation.z=Math.PI/2;
    
    

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    geometry = new THREE.BoxGeometry( mySceneW * 2, wallThickness, 100);
    material = new THREE.MeshLambertMaterial( {color: 0xaaaaaa} );
    myFloor  = new THREE.Mesh( geometry, material );
    // myFloor.lookAt(new THREE.Vector3(0,1,0));
    myFloor.position.set(myCenterX, bottomB - (wallThickness / 2), 0.0);
    //myFloor.receiveShadow = true;
    //PIEaddElement(myFloor);
    /* Ceiling */
    geometry = new THREE.BoxGeometry( mySceneW * 2, wallThickness, 100 );
    material = new THREE.MeshLambertMaterial( {color: 0xffffff} );
    myCeiling = new THREE.Mesh( geometry, material );
    myCeiling.position.set(myCenterX, topB+(wallThickness/2), 0.0);
    //myFloor.receiveShadow = true;
    //PIEaddElement(myCeiling);
    /* Left */
    geometry = new THREE.BoxGeometry( wallThickness, mySceneH * 2, 100 );
    material = new THREE.MeshLambertMaterial( {color: 0xaa0000} );
    myLeft = new THREE.Mesh( geometry, material );
    myLeft.position.set(leftB-(wallThickness/2), myCenterY, 0.0);
    //myLeft.receiveShadow = true;
   // PIEaddElement(myLeft);
    /* Right */
    geometry = new THREE.BoxGeometry( wallThickness, mySceneH * 2, 100 );
    material = new THREE.MeshLambertMaterial( {color: 0xaa0000} );
    myRight = new THREE.Mesh( geometry, material );
    myRight.position.set(rightB+(wallThickness/2), myCenterY, 0.0);
    //myRight.receiveShadow = true;
    //PIEaddElement(myRight);
    /* Back */
    // material = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, map: texture } );
    // geometry = new THREE.PlaneBufferGeometry( mySceneW * 2, mySceneH * 2 );
    geometry = new THREE.BoxGeometry( 12.7, 7, 0 );
    material = new THREE.MeshLambertMaterial( {color: 0xF5DA81} );
    myBack = new THREE.Mesh( geometry, material );
    myBack.position.set(0,0,-0.01);
    //myBack.receiveShadow = true;
    PIEaddElement(myBack);
    
    
       
    
    PIEaddButton("Replace");
    document.getElementById("Replace").addEventListener("click", replaceCircuit);
    
    document.getElementById("start").addEventListener("click", startAnimation);
    document.getElementById("stop").addEventListener("click", stopAnimation  );

    
    
    
    /* Instantiate experiment controls */
    initialiseControlVariables();
    /* Create Input Panel */
    PIEaddInputSlider(Res1, DefaultR1, handleR1, R1min, R1max, R1step);
    PIEaddInputSlider(Res2, DefaultR2, handleR2, R2min, R2max, R2step);
    PIEaddInputSlider(Res3, DefaultR3, handleR3, R3min, R3max, R3step);
    PIEaddInputSlider(Voltage, DefaultV, handleV, Vmin, Vmax, Vstep);
    PIEinputGUI.width = 280;
    PIEaddInputCommand("Res(Eq): "+ req + " " + "ohms", handleReq);
    
    
    /* Create Display Panel */
    PIEaddDisplayText("Ammeter1, A1", 2);
    PIEaddDisplayText("Ammeter2, A2", 2);
    PIEaddDisplayText("Ammeter3, A3", 2);
    PIEaddDisplayText("Ammeter4, A4", 6);
    PIEaddDisplayText("Voltage V", 4);
    PIEdisplayGUI.width = 280;
    
    
    
    
    /* Reset all positions */
    resetExperiment();

    
    PIEsetAreaOfInterest(mySceneTLX, mySceneTLY, mySceneBRX, mySceneBRY);
    
    
    
    
    
  
    
    document.getElementById("start").addEventListener("click", startAnimation);
    document.getElementById("stop").addEventListener("click", stopAnimation  );
    
    
    /* Observation Table */
    PIEcreateTable("Observation table", 2, 4, true);

    PIEsetRowInput(1, 1, "0");

    
    
    var headerRow=["AmmeterA1 ", " AmmeterA2 ", " AmmeterA3 ", "AmmeterA4"];
    PIEupdateTableRow(0, headerRow);
   
    
    


}







/******************* End of Load Experiment objects code ***********************/



/******************* End of Reset Experiment code ***********************/

/******************* Update (animation changes) code ***********************/

/**
 
 */
function updateExperimentElements()
{

}

/******************* Update (animation changes) code ***********************/
