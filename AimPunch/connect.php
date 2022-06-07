<?php

    $db_host=""; 
    $db_user="";	
    $db_password="";	
    $db_name="";	

    try
    {
        $db=new PDO("mysql:host={$db_host};dbname={$db_name}",$db_user,$db_password);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch(PDOEXCEPTION $e)
    {
        $e->getMessage();
    }
    $username = $_POST["newusername"];
    $checkUser = $db->prepare("SELECT username from user_info WHERE username = :uname");
    $checkUser->bindParam(":uname",$username);
    $checkUser->execute();
    $user = $checkUser->fetch(PDO::FETCH_ASSOC);

    if(isset($_POST["newusername"]) && isset($_POST["newpassword"]) && empty($user)) //if username and password are set and user is a new user
    {	
        $username = $_POST["newusername"];

        $password = $_POST["newpassword"];

        //insert username and passsword into databae
        $stmt=$db->prepare("INSERT INTO user_info(username, 
                                                    password)
                                            VALUES
                                                (:uname,
                                                 :upassword)"); 

    
        $stmt->bindParam(":uname",$username);
        $stmt->bindParam(":upassword",$password);
            
        if($stmt->execute()) //if query was successful, echo 0
        {
            echo 0;		
        }	
        else //else echo 1 for error
        {
            echo 1;		
        }
    }
    else //if username and password are set but username already exists, echo 2
    {
        echo 2;
    }
?>
