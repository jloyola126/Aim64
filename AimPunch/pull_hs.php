
<?php

    session_start();
    $host = ""; /* Host name */
    $user = ""; /* User */
    $password = ""; /* Password */
    $dbname = ""; /* Database name */

    $con = mysqli_connect($host, $user, $password,$dbname);
    // Check connection
    if (!$con) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $sql_query = "SELECT username,score from user_info ORDER BY score DESC limit 5"; //Query to only select the top 5 players
    $result = mysqli_query($con,$sql_query);
?>

