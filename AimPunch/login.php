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

    $uname = mysqli_real_escape_string($con,$_POST['loginusername']); 
    $password = mysqli_real_escape_string($con,$_POST['loginpassword']);

    if ($uname != "" && $password != "") //if username and password are set
    {

        $sql_query = "select count(*) as cntUser from user_info where username='".$uname."' and password='".$password."'"; //Query the database to verify user 
        $result = mysqli_query($con,$sql_query);
        $row = mysqli_fetch_array($result);

        $count = $row['cntUser'];

        $_SESSION['uname'] = $uname;

        if($count > 0) //if user found an row is at least 1
        {
           echo 1; //echo 1 for successful query
        }
        else
        {
            echo 0; //echo 0 for error.
        }
            
    }
?>
    
