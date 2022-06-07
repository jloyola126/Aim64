var removeRegButtonLoggedIn = document.getElementById("register");
removeRegButtonLoggedIn.style.display = "none"; //upon being logged in, do not display Register button
document.getElementById("login_button").value = "Logout"; //upon being logged in, set Login to Logout

//if Logout is clicked, direct to logout.php which will end session and clear cache storage of all variables, display register button
document.getElementById("login_button").onclick = function()
{
    window.location = "logout.php";  
    localStorage.clear();
    removeRegButtonLoggedIn.style.display = "block";
}