$(document).ready(function () {
    let searchButton = $("#search-button");
    let message = $("#message");
    let inputField = $("#input-field");

    $(searchButton).click(function () {
        const userInput = inputField.val().trim();
        const cleanInput = encodeURIComponent(userInput);

        let url;
        let httpRequest;

        if (cleanInput.length == 0) {
            url = "http://localhost/comp2245-assignment4/superheroes.php";
            httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = handleEmptyInput;
            httpRequest.open('GET', url);
            httpRequest.send();
        } else {
            url = `http://localhost/comp2245-assignment4/superheroes.php?query=${cleanInput}`;
            httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = doSomething;
            httpRequest.open('GET', url);
            httpRequest.send();
        }

        function handleEmptyInput() {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    let response = JSON.parse(httpRequest.responseText);
                    const aliasList = `<ul>${response.map(hero => `<li>${decodeURIComponent(hero['alias'])}</li>`).join('')}</ul>`;
                    message.html(aliasList);
                } else {
                    alert('There was a problem with the request.');
                }
            }
        }
        
        function doSomething() {
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                    let response = JSON.parse(httpRequest.responseText);

                    if (cleanInput.length > 0) {
                        for (let hero of response) {
                            const decodedInput = decodeURIComponent(cleanInput);
                            if (decodedInput == hero['alias'] || decodedInput == hero['name']) {
                                const result = `
                                    <h3>${hero['alias']}</h3>
                                    <h4>${hero['name']}</h4>
                                    <p>${hero['biography']}</p>
                                `;
                                message.removeClass("not-found")
                                message.html(result);
                                break;
                            } else {
                                message.addClass("not-found")
                                message.html("SUPERHERO NOT FOUND");
                            }
                        }
                    } else {
                    console.error('There was a problem with the request:', httpRequest.status);
                }
            }
        }
    }});
});
