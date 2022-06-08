<?php
 session_start();
 include "pull_hs.php";
?>
<DOCTYPE html>
<html>
<head>
  <title> Aim 64</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./styles.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
</head>

<body class="br-color">
  <div id = "opac-default">
    <div id = "range">
        <div id = "score"></div>
        <div id = "timer"></div>
        <img alt = "Fire!" id ="img1" src="./targetcropped.png"/>
    </div>
    <div id = "suggestion-alert">Play on Full Screen for best experience</div>
    <button id = "back-home" onclick= "toHomePage()"type="button">HomePage</button>
    <div id = "game-title">Aim 64</div>
    <button id="play-me">Play</button>
    <div class = "high-scores-parent">
      <div id = "high-scores-heading">Local High Score</div>
      <div id = "high-scores"></div>
      <button id = "register">Register to Save High Scores!</button>
      <input type="button" id = "login_button" value="Login"></button>
    </div>
    <div id="timed-out"></div>
    <button id="stop-me">Restart</button>
  </div>
  <section id="top_5">
    <h4>Top 5 Players!</h4>
    <table>
      <tr>
        <th>User</th>
        <th>Score</th>
      </tr>
      <?php
        while($rows = $result->fetch_assoc())
        {
      ?>
          <tr>
            <td><?php echo $rows['username'];?></td>
            <td><?php echo $rows['score'];?></td>
          </tr>
      <?php
        }
      ?>
    </table>
  </section>
  <form id="form" name="form">
    <button id="X">X</button>
  
    <label for="Username">Username</label>
    <br><br>
    &bull;<small>Username can be up to 15 characters long</small>
    <input id="username" name="username" placeholder="Username" type="text">
    <br><br>
    
    <label for="password">Password</label>
    <br><br>
    &bull; <small>Password must be at least 8 characters and can be up to 15 characters long</small>
    <input id="password" name="password" placeholder="Password" type="password">
    <br><br>
    
    <input type="submit" name="submit" id="submit"/>

    <div id="message"></div>
  </form>
  <form id = "form_login" name="form_login">
    
    <button id="X">X</button>
  
    <label for="username_login">Username</label>
    <input id="username_login" name="username_login" placeholder="Username" type="text">
    <br><br>
    
    <label for="password_login">Password</label>
    <input id="password_login" name="password_login" placeholder="Password" type="password">

    <br><br>
    <input type="submit" name="login" value="Login" id="login"/>

    <div id="message_login"></div>
  </form>
  <form id="high_score_db" name="high_score_db">
    <label for="hs_db" id="text_center">Score</label>
    <div id = "show_score_num"></div>
    <br><br>

    <input type="submit" name="hs_db_sub" value="Submit" id="hs_db_sub">

    <div id="message_hs"></div>
  </form>

  <script src="./AimPunch.js"></script>
  <?php
    include "login.php";
    session_start();
    // Check user login or not
    if(isset($_SESSION['uname'])){
      echo '<div id = "greeting">Welcome '.$_SESSION['uname'].' !</div>';
      echo '<script src = "./loggedinactions.js"></script>';
    }
  ?>
</body>
</html>
      
      
