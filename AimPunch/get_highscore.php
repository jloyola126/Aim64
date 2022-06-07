
<?php

    session_start();
    $host = ""; /* Host name */
    $user = ""; /* User */
    $password = ""; /* Password */
    $dbname = ""; /* Database name */

    $con = mysqli_connect($host, $user, $password,$dbname);
    // Check connection
    if (!$con) 
    {
        die("Connection failed: " . mysqli_connect_error());
    }

    $uname = mysqli_real_escape_string($con,$_GET['loginusername']);

    $sql_query = "select * from user_info where username='".$uname."'"; //Query to pull row values for current user from database
    $result = mysqli_query($con,$sql_query);
    $row = mysqli_fetch_assoc($result);
    
    echo $row['score']; //return the score of the user
?>