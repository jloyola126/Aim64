<?php
    $servername = "";
    $username = "";
    $password = "";
    $dbname = "";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } 

    $uname = mysqli_real_escape_string($conn,$_POST['score_username']);
    $score = mysqli_real_escape_string($conn,$_POST['newscore']);

    $sql = "UPDATE user_info SET score= $score WHERE username='$uname'"; //Query to set new high score for logged in user

    if ($conn->query($sql) === TRUE) {
        echo 1;
    } else {
        echo 0;
    }

    $conn->close();
?>



