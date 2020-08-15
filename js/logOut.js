
    function signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function() {
            alert('User signed out.');
            location.href = "https://aguskuster.github.io/JAP-ecommerce/index.html"
        });
    }

    function onLoad() {
        gapi.load('auth2', function() {
            gapi.auth2.init();
        });
    }
