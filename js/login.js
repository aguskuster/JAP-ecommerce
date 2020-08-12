//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {

});

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());



    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;

    console.log("ID Token: " + id_token);

    location.href = "../index.html"

}

function checkLogin() {
    let user = document.getElementById('usr').value;
    let pass = document.getElementById('pwd').value;

    if (user != "" && pass != "") {
        location.href = "../index.html"
    } else {
        alert("Comprube sus datos")
    }

}