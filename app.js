$( document ).ready(function() {
    let searchButton = $("#search-button");
    let message = $("#message");

    $(searchButton).click(function() {
        const httpRequest = new XMLHttpRequest();
        let url = "http://localhost:8888/comp2245-assignment4/superheroes.php";
        httpRequest.onreadystatechange = doSomething;
        httpRequest.open('GET', url);
        function doSomething() {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    let response = httpRequest.responseText;
                    alert(response)
                } else {
                    alert('There was a problem with the request.');
                }
            }
        }
        httpRequest.send();
    })
})
