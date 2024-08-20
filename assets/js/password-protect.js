document.getElementById('login-button').addEventListener('click', function () {
    var password = document.getElementById('password').value;
    login(password);
});

function login(secret) {
    var hash = sha1(secret);  // Hash the password using SHA-1
    var url = hash + '/index.html';  // Construct the URL based on the hash
    var alert = document.querySelector('[data-id="alert"]');

    // Set the time limit for the link (e.g., 5 minutes from now)
    var nva = new Date().getTime() + 5 * 60 * 1000;  // 5 minutes in milliseconds

    // Password verification simulation
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            // Hide the login container
            document.getElementById('login-container').style.display = 'none';

            // When the video ends, redirect to the URL with the nva parameter
            video.onended = function () {
                window.location.href = url + "?nva=" + nva;  // Redirect with the nva parameter
            };
        } else {
            alert.style.display = 'block';
            document.getElementById('password').setAttribute('placeholder', 'Incorrect password');
            document.getElementById('password').value = '';
        }
    };

    request.onerror = function () {
        alert.style.display = 'block';
        document.getElementById('password').setAttribute('placeholder', 'Incorrect password');
        document.getElementById('password').value = '';
    };

    request.send();
}
