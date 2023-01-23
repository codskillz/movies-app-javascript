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

    if (movieName.includes('Maverick')) {
        showRating.innerHTML = `<div class="rate">
                                        <input type="radio" id="star5-top" name="rate-top" value="5" />
                                        <label for="star5-top" title="text">5 stars</label>
                                        <input type="radio" id="star4-top" name="rate-top" value="4" />
                                        <label for="star4-top" title="text">4 stars</label>
                                        <input type="radio" id="star3-top" name="rate-top" value="3" />
                                        <label for="star3-top" title="text">3 stars</label>
                                        <input type="radio" id="star2-top" name="rate-top" value="2" />
                                        <label for="star2-top" title="text">2 stars</label>
                                        <input type="radio" id="star1-top" name="rate-top" value="1" />
                                        <label for="star1-top" title="text">1 star</label>
                                    </div>
                                    <br>
                                    <button class="btn" onclick="getRating(this)">Rate!</button>`
    }
    else if (movieName.includes('Endgame')) {
        showRating.innerHTML = `<div class="rate">
                                        <input type="radio" id="star5-end" name="rate-end" value="5" />
                                        <label for="star5-end" title="text">5 stars</label>
                                        <input type="radio" id="star4-end" name="rate-end" value="4" />
                                        <label for="star4-end" title="text">4 stars</label>
                                        <input type="radio" id="star3-end" name="rate-end" value="3" />
                                        <label for="star3-end" title="text">3 stars</label>
                                        <input type="radio" id="star2-end" name="rate-end" value="2" />
                                        <label for="star2-end" title="text">2 stars</label>
                                        <input type="radio" id="star1-end" name="rate-end" value="1" />
                                        <label for="star1-end" title="text">1 star</label>
                                    </div>
                                    <br>
                                    <button class="btn" onclick="getRating(this)">Rate!</button>`
    }
    else if (movieName.includes('Casino Royale')) {
        showRating.innerHTML = `<div class="rate">
                                    <input type="radio" id="star5-roy" name="rate-roy" value="5" />
                                    <label for="star5-roy" title="text">5 stars</label>
                                    <input type="radio" id="star4-roy" name="rate-roy" value="4" />
                                    <label for="star4-roy" title="text">4 stars</label>
                                    <input type="radio" id="star3-roy" name="rate-roy" value="3" />
                                    <label for="star3-roy" title="text">3 stars</label>
                                    <input type="radio" id="star2-roy" name="rate-roy" value="2" />
                                    <label for="star2-roy" title="text">2 stars</label>
                                    <input type="radio" id="star1-roy" name="rate-roy" value="1" />
                                    <label for="star1-roy" title="text">1 star</label>
                                </div>
                                <br>
                                <button class="btn" onclick="getRating(this)">Rate!</button>`
    }
    else if (movieName.includes('Spider-Man')) {
        showRating.innerHTML = `<div class="rate">
                                    <input type="radio" id="star5-man" name="rate-man" value="5" />
                                    <label for="star5-man" title="text">5 stars</label>
                                    <input type="radio" id="star4-man" name="rate-man" value="4" />
                                    <label for="star4-man" title="text">4 stars</label>
                                    <input type="radio" id="star3-man" name="rate-man" value="3" />
                                    <label for="star3-man" title="text">3 stars</label>
                                    <input type="radio" id="star2-man" name="rate-man" value="2" />
                                    <label for="star2-man" title="text">2 stars</label>
                                    <input type="radio" id="star1-man" name="rate-man" value="1" />
                                    <label for="star1-man" title="text">1 star</label>
                                </div>
                                <br>
                                <button class="btn" onclick="getRating(this)">Rate!</button>`
    }

}

function getRating(element) {

    let mainElement = element.closest('.single-movie');

    // Upon adding more movies in the HTML section, you need to declare a variable and write a for loop aswell for rating to work... duhh... kinda sloppy but does the job :)

    let MavRate = mainElement.querySelectorAll('input[name="rate-top"]');
    let EndRate = mainElement.querySelectorAll('input[name="rate-end"]');
    let RoyRate = mainElement.querySelectorAll('input[name="rate-roy"]');
    let ManRate = mainElement.querySelectorAll('input[name="rate-man"]');

    // I had to write each movie rate separately, *sigh*, here goes...

    for (const m of MavRate) {
        if (m.checked) {
            ratingTotal += parseInt(m.value);
            numOfRateElements++;
            element.setAttribute('disabled', 'true');
            element.innerText = 'Rated';
        }
        m.disabled = true;
    }

    for (const e of EndRate) {
        if (e.checked) {
            ratingTotal += parseInt(e.value);
            numOfRateElements++;
            element.setAttribute('disabled', 'true');
            element.innerText = 'Rated';
        }
        e.disabled = true;
    }

    for (const r of RoyRate) {
        if (r.checked) {
            ratingTotal += parseInt(r.value);
            numOfRateElements++;
            element.setAttribute('disabled', 'true');
            element.innerText = 'Rated';
        }
        r.disabled = true;
    }

    for (const s of ManRate) {
        if (s.checked) {
            ratingTotal += (parseInt(s.value));
            numOfRateElements++;
            element.setAttribute('disabled', 'true');
            element.innerText = 'Rated';
        }
        s.disabled = true;
    }

    if (ratingTotal !== 0) {
        document.querySelector('.total p.total-rate').innerText = `Total rate: ${(ratingTotal / numOfRateElements).toFixed(2)} ★`;
    }
}