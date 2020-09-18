
    function signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function() {
            alert('User signed out.');
            location.href = "../index.html"
            localStorage.removeItem("user");
            localStorage.removeItem("img");
        });
    }

    function onLoad() {
        gapi.load('auth2', function() {
            gapi.auth2.init();
        });
    }
