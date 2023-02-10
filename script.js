let ukupniTotal = 0;
let ukupniMinutesTotal = 0;
let ratingTotal = 0;
let numOfRateElements = 0;

function rentMovie(element) {

    // Declaring variables
    let mainElement = element.closest('.single-movie');
    let movieName = mainElement.querySelector('.content h3').innerText;
    let moviePrice = mainElement.querySelector('.price').innerText;
    let movieLength = mainElement.querySelector('.mov-length').innerText;
    let cartItems = document.querySelector('.cart-items');
    let showRating = mainElement.querySelector('.rate-section');

    // Getting integer out of strings
    moviePrice = parseInt(moviePrice.substring(1, moviePrice.length));
    movieLength = parseInt(movieLength.substring(0, 3));

    ukupniTotal += moviePrice;
    ukupniMinutesTotal += movieLength;

    cartItems.innerHTML += `<div class="cart-single-movie">
                                <h3>${movieName}</h3>
                                <p>Price: $${moviePrice}</p>
                                <p>Length: ${movieLength} min.</p>
                                <br>
                            </div>`;

    document.querySelector('.total p.total-price').innerText = `Total price: $${ukupniTotal}`;
    document.querySelector('.total p.total-watched').innerText = `Total watched: ${ukupniMinutesTotal} min. / ${(ukupniMinutesTotal / 60).toFixed(2)} hours`;

    element.setAttribute('disabled', 'true');
    element.innerText = 'Rented';

    // Checking movie names to show rating options

    showHTMLRating(movieName, showRating);

}

// Statement in new function - cleaner code

function showHTMLRating(movieName, showRating) {
    if (movieName.includes(movieName.substring(0, movieName.length))) {

        let result = getRandomMovieName(movieName, 5);

        showRating.innerHTML = `<div class="rate">
                                        <input type="radio" id="star5-${result.toLowerCase()}" name="rate-${result.toLowerCase()}" value="5" />
                                        <label for="star5-${result.toLowerCase()}" title="text">5 stars</label>
                                        <input type="radio" id="star4-${result.toLowerCase()}" name="rate-${result.toLowerCase()}" value="4" />
                                        <label for="star4-${result.toLowerCase()}" title="text">4 stars</label>
                                        <input type="radio" id="star3-${result.toLowerCase()}" name="rate-${result.toLowerCase()}" value="3" />
                                        <label for="star3-${result.toLowerCase()}" title="text">3 stars</label>
                                        <input type="radio" id="star2-${result.toLowerCase()}" name="rate-${result.toLowerCase()}" value="2" />
                                        <label for="star2-${result.toLowerCase()}" title="text">2 stars</label>
                                        <input type="radio" id="star1-${result.toLowerCase()}" name="rate-${result.toLowerCase()}" value="1" />
                                        <label for="star1-${result.toLowerCase()}" title="text">1 star</label>
                                    </div>
                                    <br>
                                    <button class="btn" onclick="getRating(this)">Rate!</button>`
    }
}

// Function for randomizing N characters for movie rating so when adding sequels for example, labels and radios won't overlap, hopefully.

function getRandomMovieName(movieName, length) {
    let result = ' ';
    movieName = movieName.replace(/[^\w\s!?]/g, '');
    const charactersLength = movieName.length;
    for (let i = 0; i < length; i++) {
        result += movieName.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

// Rating function

function getRating(element) {
    let mainElement = element.closest('.single-movie');
    let rate = mainElement.querySelectorAll('.rate input');

    for (const r of rate) {
        if (r.checked) {
            ratingTotal += parseInt(r.value);
            numOfRateElements++;
            element.setAttribute('disabled', 'true');
            element.innerText = 'Rated';
        }
        r.disabled = true;
    }

    if (ratingTotal !== 0) {
        document.querySelector('.total p.total-rate').innerText = `Total rate: ${(ratingTotal / numOfRateElements).toFixed(2)} ★`;
    }

}

// Function which creates HTML input element for adding a movie

function addMovie() {
    let element = document.createElement('div');
    element.classList.add('add-movie');



    element.innerHTML = `<label for="movie-name">Movie name:</label><br>
                         <input type="text" id="movie-name" name="new-movie" placeholder="Movie name" size="30" required><br>
                         <label for="movie-year">Year released:</label><br>
                         <input type="text" id="movie-year" name="new-movie" placeholder="Year" size="30" required><br>
                         <label for="movie-length">Movie length:</label><br>
                         <input type="text" id="movie-length" name="new-movie" placeholder="Length" size="30" required><br>
                         <label for="movie-price">Movie price ($):</label><br>
                         <input type="text" id="movie-price" name="new-movie" placeholder="Price" size="30" required><br><br>
                         <label for="movie-image">Upload movie cover:</label><br>
                         <input type="file" id="image-input" name="new-movie" value="Upload image" accept="image/jpg" required><br>
                         <button class="btn" onclick="submitMovie()">Submit movie!</button>
                         `

    document.body.appendChild(element);
}

// Function that submits movie to the movie section

function submitMovie() {
    let element = document.querySelector('.add-movie');
    let movieName = element.querySelector('input[id="movie-name"]').value;
    let movieYear = element.querySelector('input[id="movie-year"]').value;
    let movieLength = element.querySelector('input[id="movie-length"]').value;
    let moviePrice = element.querySelector('input[id="movie-price"]').value;

    moviePrice = parseInt(moviePrice);
    movieLength = parseInt(movieLength);
    movieYear = parseInt(movieYear);

    let moviesDiv = document.querySelector('.movies');
    let newDiv = document.createElement('div');

    if (movieName !== '') {
        if (movieYear >= 1900 && movieYear <= new Date().getFullYear()) {
            if (movieLength >= 0) {
                if (moviePrice >= 0) {
                    newDiv.innerHTML = `<img id="output">
                        <div class="content">
                            <h3>${movieName} (${movieYear})</h3>
                            <p class="price">$${moviePrice}</p>
                            <p class="mov-length">${movieLength} min.</p>
                        </div>
                        <button class="btn" onclick="rentMovie(this)">Watch</button>
                        <div class="rate-section"></div>`;
                    newDiv.classList.add('single-movie');

                    moviesDiv.appendChild(newDiv);

                    // Clearing inputs after submitting

                    let inputs = document.querySelectorAll('input[id="movie-name"], input[id="movie-year"], input[id="movie-length"], input[id="movie-price"]');
                    inputs.forEach(input => {
                        input.value = '';
                    });
                }
            }
        }
    }
}

// add a function to display uploaded image while adding the movie!