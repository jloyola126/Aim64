/*
  AimPunch.js file to handle all events and animations
  Programmer:Jonathan Loyola
*/
var timervar = null; //timer for recursive call...used for animation
var el = null; //event listener
var score = 0; //score counter
var trackingScore = 0;
var shots = 0;  //shots counter
var accuracy = 0;
var changeDir = false; //change direction boolean
var moveRight = 1; //move right counter set to default value 1
var moveLeft = 0; //move left counter set to default 0
var changeToSpawn = false; //change animation mechanism boolean
var spawnDiffEasy = false; //var used to control spawning speed on easy
var spawnDiffMedium = false; //var used to control spawning speed on medium
var spawwnDiffHard = false; //var used to control spawning speed on hard
var spawnDiffExpert = false; //var used to control spawning speed on expert
var defaultTimer = false;  //var used to keep track of timer toogle
var logAccHigh = false; //determines if current new score is higher than high score
var toggleTimesUp = false; //determines correct message to display based on login status
var isLoggedIn = ""; //determines if user is currently logged in
var loggedInUser = ""; //determines which user is logged in

//if current user is logged in, grab their high score for score comparison
if(localStorage.getItem("isLoggedInStr") == "true"){
    var username_db = localStorage.getItem("isLoggedInUserStr"); //grab logged in user for database fetch
    //make a jquery ajax call to get the current user's highscore from database
    $.ajax(
    {
        url:'get_highscore.php',
        type: 'GET',
        data:
        {
            loginusername:username_db
        },
        success:function(response)
        {
          localStorage.setItem("saved_highscore",response); 
        }
    });
}
//Handles all actions when timer hits 00:00 and game is over
function timedOutReload()
{
    //Only display the highscore submission window if a user is logged in and new score is higher than current score pulled from database
    if(localStorage.getItem("isLoggedInStr") == "true" && document.getElementById("login_button").value == "Logout" && (localStorage.getItem("saved_highscore") < score))
    {
        document.getElementById("high_score_db").style.display = "block"; //if the parameters are met, show score submission window
        document.getElementById("show_score_num").textContent = score; //display current new score
        toggleTimesUp = true; //set boolean to display correct verbage in timeout window
    }
    if(toggleTimesUp == true) //if timesUp is set to true, show verbage matching login status as true
    {
        document.getElementById("timed-out").textContent= 'TIMES UP, Click submit to save your score online!'
    }
    else //show verbage matching a user who is not logged in
    {
        document.getElementById("timed-out").textContent= 'TIMES UP, Score Saved Locally, Click Restart to Play Again';
    }

    var rangeRemove = document.getElementById("range"); 
    remove(rangeRemove); //remove range element from current display
    var timerRemove = document.getElementById("timer");
    remove(timerRemove); //remove timer element from current display
    document.body.style.backgroundColor = 'black'; //set background to black
} 

function timer(x)
{
    //if default timer variable passed in is true, set timer to 90 seconds
    if (x)
    {
        var sec = 90;

        //set interval by 1 second and format
        var timer = setInterval(function()
        {
            if (sec >= 0 && sec <10)
            {
                document.getElementById("timer").textContent='00:'+'0'+sec;
            }
            else
            {
                document.getElementById("timer").textContent='00:'+sec;
            }
            sec--;
            if (sec < 0) 
            {
                clearInterval(timer);
                timedOutReload();
            }
        }, 1000);
    }
    else
    {
        document.getElementById("timer").textContent='00:00'; //else, timer should only show a default time of 00:00
    }   
}
//getrandomintinclusive will handle spawning boundaries
function getRandomIntInclusive(min, max) 
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
      
//Function moveIt() will handle spawning
function moveIt()
{
    //if score is between 0 and 30,activate medium difficulty set easy to false
    if(score >= 0 && score < 30)
    {
        spawnDiffMedium = true;
        spawnDiffEasy = false;
        el.style.top = getRandomIntInclusive(11,50) + '%';
        el.style.right = (Math.random() * 60) + '%';
        el.style.left = (Math.random() * 60) + '%';
    }
     //if score is between 30 and 60,turn on hard difficulty, set medium to false
    if(score >= 30 && score < 60)
    {
        spawwnDiffHard = true;
        spawnDiffMedium = false;
        el.style.top = getRandomIntInclusive(11,50) + '%';
        el.style.right = (Math.random() * 60) + '%';
        el.style.left = (Math.random() * 60) + '%';
    }
    //if score is greater than or equal to 60, turn on expert difficulty, set hard to false
    if(score >= 60)
    {
        spawnDiffExpert = true;
        spawnDiffHard = false;
        el.style.top = getRandomIntInclusive(11,50) + '%';
        el.style.right = (Math.random() * 60) + '%';
        el.style.left = (Math.random() * 60) + '%';
    }
    //move target every 1 second
    if(changeToSpawn == true && spawnDiffEasy == true)
    {
        timervar = setTimeout(moveIt,1000);
    }
    //move target every 0.8 seconds
    else if(spawnDiffMedium == true)
    {
        timervar = setTimeout(moveIt,800);
    }
    //move target every 0.7 seconds
    else if(spawwnDiffHard == true)
    {
        timervar = setTimeout(moveIt,700);
    }
    //move target every 0.5 seconds
    else if(spawnDiffExpert == true)
    {
        timervar = setTimeout(moveIt,500);
    }
    else
    {
        timervar = setTimeout(moveIt, 20);
    }
}
//Increase score counter, play sound when shot registers a score.
function scoreUp()
{
    score++;
    scoreboard();
}
//once reload event is called, reload the page which will call window.onload()
function reloadEvent()
{
    document.getElementById("stop-me").onclick = function()
    {
        location.reload();
    }
}
function reloadHandler()
{
    var x = document.getElementById("stop-me");
    x.style.display = "none"; //set the display of the restart button to be omitted
    //Once play button is clicked on, restart button will show up, calling reloadEvent() to handle onClick of said button
    if (x.style.display == "none"){
        x.style.display = "block";
        reloadEvent();
    }
    else{
        x.style.display = "none";
    }
}
function remove(y)
{
    //Similar to reloadHandler() but only job is to remove block elements upon an action.
    y.style.display = "block";
    if (y.style.display == "block")
    {
        y.style.display = "none";
    }
}

function scoreboard()
{
    //Scoreboard function will first attempt to get local highscore and if it does not exist, will set one upon playing for the first time.
   
    if(shots == 0)
    {
        accuracy = 0;
    }   
    else
    {
        accuracy = ((score/shots)* 100).toFixed(2);
    }

    var highscore = localStorage.getItem("highscore"); //set a variable to hold highscore stored in cache
    var accuracyHigh = localStorage.getItem("accuracyHigh"); //set a variabel to hold accuracy record in cache

    if(highscore != null) //if highscore has a value
    {
        if (score > highscore) //and if score is greater than highscore
        {
            logAccHigh = true; //set logAccHigh to true as we will be recording new accuracy record
            localStorage.setItem("highscore", score); //Set new highscore
        }
    }
    else
    {
        localStorage.setItem("highscore", score); //else if highscore is null, set default values for score
        localStorage.setItem("accuracyHigh",accuracy); //...and set default value for accuracy
    }
    if(logAccHigh == true) //if new score has been recorded, store that corresponding accuracy in cache
    {
        localStorage.setItem("accuracyHigh",accuracy);      
    }
    accuracyHigh = localStorage.getItem("accuracyHigh"); //pull accuracy record from cache
    var showHighScores = document.getElementById("high-scores"); //initializing showHighScores variable to element high-scores
    if(highscore == null)
    {
        showHighScores.textContent = 'Score: ' + '0' + '     ' + 'Acc: ' + '0' + '%'; //write high scores to div
    }
    else
    {
        showHighScores.textContent = 'Score: ' + highscore + '     ' + 'Acc: ' + accuracyHigh + '%';
    }//if statement handles shots showing 0, score showing 0 and accuracy being calculated correctly for 0/0. Else handles outputting shots, score, and accuracy with accuracy being rounded to 2 decimal places.
    if(shots == 0 && score == 0)
    {
        document.getElementById("score").textContent = "Shots: " + shots + " Score: " + score  + " Accuracy: " + 0 + "%";
    }
    else
    {
        document.getElementById("score").textContent = "Shots: " + shots + " Score: " + score  + " Accuracy: " + accuracy + "%";
    }
}


scoreboard(); //call the scoreboard to show preloaded.
//Once play me is clicked...
timer(defaultTimer);

// Execute a function when the user presses a key on the keyboard
$('#form').keypress(function (e) {
    var key = e.which;
    if(key == 13)  // the enter key code
     {
       $('#submit').click();
       return false;  
     }
}); 
// Execute a function when the user presses a key on the keyboard 
$('#form_login').keypress(function (e) {
    var key = e.which;
    if(key == 13)  // the enter key code
     {
       $('#login').click();
       return false;  
     }
}); 
//JQuery function for handling click event on submitting a new high score to database
$(document).on('click','#hs_db_sub',function(e)
{
    e.preventDefault(); //prevent default submit button action
 
    var username_db = localStorage.getItem("isLoggedInUserStr"); //get user from cache when user is logged in
    var score_db = score; //set var score_db to the set score recorded when the game ended
    
    if(score_db == 0) //if score is 0, alert user
    {
        alert('Score is 0!');
    }
    else //else, we will make an ajax call to 'scorelog.php' and log the score into the database for the current logged in user
    {
        $.ajax(
            {
                url:'scorelog.php',
                type: 'post',
                data:
                {
                    score_username:username_db,
                    newscore:score_db
                },
                success:function(response) //upon success...
                {
                    if(response == 1) //if response is 1, display that score was submitted correctly and fade out message, then perform self redirect
                    {
                        var msg = "";
                        msg = "Score submitted successfully";
                        $('#message_hs').html(msg);
                        $(document).ready(function(){
                            $('#message_hs').fadeIn().delay(3000).fadeOut();
                        });
                        setTimeout(function(){resetForm("high_score_db")},3000);
                        setTimeout(function(){window.location = "AimPunch.php"},3000)
                     }
                    else //we have an error and display error in submitting score
                    {
                        msg = "Unable to submit score";
                        $('#message_hs').html(msg);
                        $(document).ready(function(){
                            $('#message_hs').fadeIn().delay(3000).fadeOut();
                        });
                        setTimeout(function(){resetForm("high_score_db")},3000);
                    }             
                }
            }
        );
 
        $('#high_score_db')[0].reset();//reset form contents of high_score_db form ID
 
    }
});
//JQuery function for handling click event on submitting a new user to database
$(document).on('click','#submit',function(e){
    e.preventDefault(); //prevent default submit button action

    var username = $('#username').val(); //pull username from username field in registration form
    var password = $('#password').val(); //pull password from passsword field in registration form

    if(username == '') //if username is empty, alert that a username must be supplied
    {
        alert('Please enter a username');
    }
    else if (password == '') //else if password is empty, alert that a password must be supplied
    {
        alert("Please enter a password"); 
    }
    else  if (password.length  < 8) //else if password is less than 8 characters long, alert that password must be compliant
    {
        alert("Password must be at least 8 characters long!");
    }
    else
    {
       //make an ajax call to 'connect.php' and store in the username and password set to the database
        $.ajax({
            url:'connect.php',
            type: 'post',
            data:
            {  
                newusername:username,
                newpassword:password
            },
            success:function(response) //upon success...
            {
                if(response == 0) //if response is 0, display successful registration
                {
                    var msg = "Registered Successfully";
                    $('#message').html(msg);
                    $(document).ready(function(){
                        $('#message').fadeIn().delay(3000).fadeOut();
                    });
                    setTimeout(function(){resetForm("form")},3000);
                }
                else if(response == 1) //else, an error occured and display a failed registration
                {
                    var errmsg = "Failed to register";
                    $('#message').html(errmsg);
                    $(document).ready(function(){
                        $('#message').fadeIn().delay(3000).fadeOut();
                    });
                }
                else //prompt that username is already taken
                {
                    var msgo = "Username already taken";
                    $('#message').html(msgo);
                    $(document).ready(function(){
                        $('#message').fadeIn().delay(3000).fadeOut();
                    }); 
                }          
            }
        });

        $('#form')[0].reset(); //reset registration form

    }
});
//JQuery function for handling click event on user login
$(document).on('click','#login',function(e)
{
    e.preventDefault(); //prevent default submit button action
 
    var username = $('#username_login').val(); //pull username from login form field
    var password = $('#password_login').val(); //pull password from login form field
 
    if(username == '') //if username is empty, alert that a password must be supplied
    {
        alert('please enter username');
    }
    else if (password == '') //else if password is empty, alert that a password must be supplied
    {
        alert("Please enter a password");
    }
    else //make an ajax call to 'login.php' to handle login form verification with database
    {
        $.ajax({
            url:'login.php',
            type: 'post',
            data:
            {
                loginusername:username,
                loginpassword:password
            },
            success:function(response) //upon success...
            {
               if(response == 1) //if response is 1, display login successful message
               {
                    var msg = "";
                    msg = "Login Successful";
                    $('#message_login').html(msg);
                    $(document).ready(function(){
                        $('#message_login').fadeIn().delay(5000).fadeOut();
                    });
                    setTimeout(function(){resetForm("form_login")},5000);
                    isLoggedIn = "true"; //set status of logged in user to true
                    localStorage.setItem("isLoggedInStr",isLoggedIn); //store logged in status in cache
                    localStorage.setItem("isLoggedInUserStr",username); //store logged in user in cache
                    window.location.reload(); //reload window
                }
                else //else alert user that they have supplied an invalid username or password
                {
                    msg = "Invalid username or password";
                    $('#message_login').html(msg);
                    $(document).ready(function(){
                        $('#message_login').fadeIn().delay(4000).fadeOut();
                    });
                }        
            }
        });

        $('#form_login')[0].reset(); //reset login form contents
    }
 });

//function that handles form manipulation after a successful submission
resetForm = function(x)
{
    var opac = document.getElementById("opac-default"); 
    opac.style.opacity= "1"; //set opacity of main page back to normal
    var form_one = document.getElementById(x);
    form_one.style.display = "none"; //hide form window
    document.getElementById("play-me").style.pointerEvents = 'auto'; //reset pointer events for Play button
    document.getElementById("register").style.pointerEvents = 'auto'; //reset pointer events for Register button
    document.getElementById("login_button").style.pointerEvents = 'auto'; //reset pointer events for Login button
}
//function that handles form manipulation after Register button is clicked on 
document.getElementById("register").onclick = function()
{
    var opac = document.getElementById("opac-default");
    opac.style.opacity= "0.2"; //set main page opacitiy to 0.2
    var form_one = document.getElementById("form");
    form_one.style.opacity= "1"; //set form opacity to 1
    form_one.style.display = "block"; //show form 
    document.getElementById("play-me").style.pointerEvents = 'none'; //disable pointer events for Play button
    document.getElementById("register").style.pointerEvents = 'none'; //disable pointer events for Register button
    document.getElementById("login_button").style.pointerEvents = 'none'; //disable pointer events for Login button
    document.getElementById("X").onclick =function()
    {
        resetForm("form"); //reset form upon clicking on X of every form window
    }
}
//function that handles form manipulation after Login button is clicked on 
document.getElementById("login_button").onclick = function()
{
    var opac = document.getElementById("opac-default");
    opac.style.opacity= "0.2"; //set main page opacitiy to 0.2
    var form_login = document.getElementById("form_login");
    form_login.style.opacity= "1"; //set form opacity to 1 
    form_login.style.display = "block"; //show form
    document.getElementById("play-me").style.pointerEvents = 'none'; //disable pointer events for Play button
    document.getElementById("register").style.pointerEvents = 'none'; //disable pointer events for Register button
    document.getElementById("login_button").style.pointerEvents = 'none'; //disable pointer events for Login button
    document.getElementById("X").onclick =function()
    {
        resetForm("form_login"); //reset form upon clicking on X of every form window
    }
}
document.getElementById("play-me").onclick = function () 
{
    defaultTimer = true; //default timer variable set when play button is clicked
    timer(defaultTimer);
    el = document.getElementById("img1");  //getting the Cannon Image by ID
    el.onclick = scoreUp;
    //...remove High Scores heading
    var removeHSHeading = document.getElementById("high-scores-heading");
    remove(removeHSHeading);
    //...remove high scores integer value
    var removeHS = document.getElementById("high-scores");
    remove(removeHS);
    //...remove play button
    var removePlayMe = document.getElementById("play-me");
    remove(removePlayMe);
    //...remove game title
    var removeGameTitle = document.getElementById("game-title");
    remove(removeGameTitle);
    //...remove Register button
    var removeRegisterButton = document.getElementById("register");
    remove(removeRegisterButton);
    //...remove Login button
    var removeLoginButton = document.getElementById("login_button");
    remove(removeLoginButton);
    //...remove Top 5 table
    var removeTop5 = document.getElementById("top_5");
    remove(removeTop5);
    document.getElementById("range").onclick = function () //getting the element which is Range or the clickable area on screen
    {
        shots++; //if its clicked, increment the number of shots taken
        scoreboard(); //call the ScoreBoard function to populate values
    }
    scoreboard(); //Otherwise, this assuming that only the cannon is being clicked on and getting point
    el.style.right = '5%'; //start off the target 5% from the right of the screen
    el.style.width = '10%';
    moveIt(); //call animation function
    reloadHandler(); //call reload handler to see if a reload is needed to start a new game.
}