window.addEventListener('load', () => {
    document.getElementById("addSignUp").style.display = "none";
    setTimeout(carga, 1000)

    function carga() {
        document.getElementById('swapper').className = 'hide'

        document.getElementById('contenido').className = 'center'
    }

})


const googleButton = document.querySelector('#googleLogin');
googleButton.addEventListener('click', e => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(result => {
            location.href = "index.html";
        })
        .catch(err => {
            console.log(err);
        })

});


const fbButton = document.querySelector('#facebookLogin');
fbButton.addEventListener('click', e => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(result => {
            location.href = "index.html";
        })
        .catch(err => {
            console.log(err);
        })

});


function LogOut() {
    firebase.auth().signOut().then(function() {
        console.log("Sign Out Success");
    }).catch(function(error) {
        console.log(error);
    });
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