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
        showRating.innerHTML = `<div class="rate">
                                        <input type="radio" id="star5-${(movieName.substring(0, 3)).toLowerCase()}" name="rate-${(movieName.substring(0, 3)).toLowerCase()}" value="5" />
                                        <label for="star5-${(movieName.substring(0, 3)).toLowerCase()}" title="text">5 stars</label>
                                        <input type="radio" id="star4-${(movieName.substring(0, 3)).toLowerCase()}" name="rate-${(movieName.substring(0, 3)).toLowerCase()}" value="4" />
                                        <label for="star4-${(movieName.substring(0, 3)).toLowerCase()}" title="text">4 stars</label>
                                        <input type="radio" id="star3-${(movieName.substring(0, 3)).toLowerCase()}" name="rate-${(movieName.substring(0, 3)).toLowerCase()}" value="3" />
                                        <label for="star3-${(movieName.substring(0, 3)).toLowerCase()}" title="text">3 stars</label>
                                        <input type="radio" id="star2-${(movieName.substring(0, 3)).toLowerCase()}" name="rate-${(movieName.substring(0, 3)).toLowerCase()}" value="2" />
                                        <label for="star2-${(movieName.substring(0, 3)).toLowerCase()}" title="text">2 stars</label>
                                        <input type="radio" id="star1-${(movieName.substring(0, 3)).toLowerCase()}" name="rate-${(movieName.substring(0, 3)).toLowerCase()}" value="1" />
                                        <label for="star1-${(movieName.substring(0, 3)).toLowerCase()}" title="text">1 star</label>
                                    </div>
                                    <br>
                                    <button class="btn" onclick="getRating2(this)">Rate!</button>`
    }
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