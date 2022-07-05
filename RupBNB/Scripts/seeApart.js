months = {0: "Jan", 1: "Feb", 2: "Mar", 3: "Apr", 4: "May", 5: "Jun",
            6: "Jul", 7: "Aug", 8: "Sep", 9: "Oct", 10: "Nov", 11: "Dec"};

days = {0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursaday", 5: "Friday", 6: "Saturday"};

//Different Format
months2 = {0: "January", 1: "February", 2: "March", 3: "April", 4: "May", 5: "June",
            6: "July", 7: "August", 8: "September", 9: "October", 10: "November", 11: "December"};

//Global apartment to use when need to
var apartment;

//Global paramater- each "page" has 6 reviews
//when users preses "Next" button will add, when "Previous" button decrease
var numOfPageReview;

//Global variable- total number of reviews of apartment
var totalReviews;

//const global paramater for maximum amenities to display (if there are more- option to select see more ameneties)
const MAX_AMENETIES_SIZE = 14;

//when document ready
$(document).ready(function () {

    numOfPageReview = 1;

    //if no apartment id in session storage, redirect to index.html
    //can happen if the user change the url by himself
    let apartmentId = sessionStorage.getItem("CGroup4_apartmentId");
    if (apartmentId == undefined) {
        window.location.replace("index.html");
    }

    //bring apartment details
    ajaxCall("GET", `../api/Apartments/${apartmentId}`, "", SCBGetApartment, ECBGetApartment);

    //get apartments total number of reviews 
    ajaxCall("GET", `../api/Apartments/getTotalReviews/${apartmentId}`, "", SCBGetTotalReview, ECBGetTotalReview);

    //when user press on confirm reservation
    $(document).on("click", "#makeReservation", clickReserve);

    //trigger event each date one of the date input has changed
    $('input[type=date]').change(function() {
        checkDates();
    });

    $("#saveIcon").click(clickedOnLikedApartmentIcon);



});

//success call back for GetTotalReview
function SCBGetTotalReview(num) {
    totalReviews = num;

    updateReviewsButtons();
}

//error call back for GetTotalReview
function ECBGetTotalReview(err) {
    sessionStorage.setItem("CGroup4_errorMessage", err.responseText);
    window.location.replace("notFound.html");
}

//this function get called when user click on liked apartment icon
//toggle the icon color and insert/delte the liked apartment accordingly
function clickedOnLikedApartmentIcon() {

    //user is regestierd
    if (localStorage.getItem("CGroup4_user")) {
        $("#saveIcon").toggleClass("fa-regular fa-solid");
        let userEmail = JSON.parse(localStorage.getItem("CGroup4_user")).Email;
        let apartmentId = apartment.Id;
        let data = {
            User: {Email: userEmail},
            Apartment: {Id: apartmentId}
        };

        if ($("#saveIcon").hasClass("fa-solid")) {

            ajaxCall("POST", "../api/likedApartments", JSON.stringify(data), scb, ecb)
        }
        else {
            ajaxCall("DELETE", `../api/deleteLikedApartment`, JSON.stringify(data), scb, ecb)
        }
    }
    else {  //user is not registered
        userNotLogedIn();
    }

}

function scb(res) {
    console.log(res);
}

function ecb(err) {
    console.log(err);
}


//this function is called when press reserve inside modal (confirm reservation)
//if user is not logged in he dosent allow to make reservation, user can go to sighUp or login
//else- make the reservation
function clickReserve() {

    //if user is not logged in
    if (localStorage.getItem("CGroup4_user") == undefined) {
        userNotLogedIn();
        return;
    }

    makeReservation();
}

//this function get called when user try to reserve apartment, but he is not logged in
//presnt message to the user and can redirect him to login/signup
function userNotLogedIn() {
    Swal.fire({
        title: 'Must be logged in for make reservation',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Log In',
        denyButtonText: `Sign Up`,
      }).then((result) => {
         if (result.isConfirmed) {
           window.location.replace("login.html")
         } else if (result.isDenied) {
            window.location.replace("signUp.html")
        }
    });
}

//this function get called everytime one of the dates in modal has changed
function checkDates() {

    let checkInDate = new Date($("#checkInDatePicker").val());
    let checkOutDate = new Date($("#checkOutDatePicker").val());

    //set min date for checkOut (minimun checkInDate + MinNights)
    let minCheckOutDate = new Date(checkInDate);
    minCheckOutDate.setDate(minCheckOutDate.getDate() + apartment.MinNight);
    $("#checkOutDatePicker").attr("min", minCheckOutDate.toISOString().split('T')[0]);

    const diffTime = checkOutDate - checkInDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    //check if differance bewtween checkOutDate and checkInDate is less that the minimum nights for the apartment
    if (diffDays < apartment.MinNight) {
        //set check out date to be minNight days after checkInDate
        checkOutDate = new Date(checkInDate);
        checkOutDate.setDate(checkOutDate.getDate() + apartment.MinNight);
    }  
    
    //set date to the date input
    $("#checkOutDatePicker").val(checkOutDate.toISOString().split('T')[0]);
    $("#checkInDatePicker").val(checkInDate.toISOString().split('T')[0]);

    //render date to Modal
    writeDateInModal("checkIn", checkInDate);
    writeDateInModal("checkOut", checkOutDate);
}

//this function is the success call back of GetApartment
//the response is apartment details that will be rendered to the screen
function SCBGetApartment(returnApartment) {

    //save apartment in global variable to be able to access to the detials again if needed
    apartment = returnApartment;

    myMap(Number(apartment.Latitude), Number(apartment.Longitude)); //display apartment in map
    
    $("#image").attr("src", apartment.Img);
    $("#modalImage").attr("src", apartment.Img);
    $("#name").append(apartment.Name);
    $("#underName").append(`${apartment.Accommodates} guests`);
    $("#underName").append(`&nbsp<b>·</b>&nbsp${apartment.NumBedrooms} bedroom`);
    $("#underName").append(`&nbsp<b>·</b>&nbsp${apartment.NumBeds} bed`);
    $("#underName").append(`&nbsp<b>·</b>&nbsp${apartment.NumBathrooms}`);

    if(apartment.Description.length > 200) {
        $("#description").prepend(apartment.Description.substring(0, 300));
        $("#more").append(apartment.Description.substring(301));
        $("#readBTN").css("display", "block");
    }
    else {
        $("#description").prepend(apartment.Description);
        $("#dots").css("display", "none");
        $("#more").css("display", "none");
        $("#readBTN").css("display", "none");
    }

    //check if user liked this apartment
    if (localStorage.getItem("CGroup4_user")){ //user is registered
        let userEmail = JSON.parse(localStorage.getItem("CGroup4_user")).Email;
        let id = apartment.Id;
        ajaxCall("GET", `../api/likedApartments?email=${userEmail}&id=${id}`, "", likedApartmentsExistSCB, ecb);
    }
    //set the min dates for date pickers
    setMinDates();
    //render apartments score to the page
    renderApartmentScores();
    //set initial dates in modal for reservation
    setModalDates();
    //add amenties to page
    let amenities = JSON.parse(apartment.Amenities);
    renderAmenties(amenities);
    //get host img and more details
    getHostDetails(apartment.Host.Email);
    //get apartment reviews
    getReviews(apartment.Id, numOfPageReview);
    //calculate total price of current dates with apartment price
    calculatePrice();

    
}

//ECB of ajax call, there is a problem
function ECBGetApartment(error) {
    sessionStorage.setItem("CGroup4_errorMessage", error.responseText);
    window.location.replace("notFound.html");
}

//liked apartment scb function
//return true if the user liked the apartment
//fill the liked apartment icon
function likedApartmentsExistSCB(res) {
    if(res == true) {
        $("#saveIcon").toggleClass("fa-regular fa-solid");
    }
}

//this function set the min dates for checkIn to be today and for checkOut to be today + minNights of the apartment
function setMinDates() {
    //set the minimun date of the date inputs to be in difference like apartment minNights
    let minCheckInDate = new Date();
    let minCheckOutDate = new Date(minCheckInDate);
    minCheckOutDate.setDate(minCheckOutDate.getDate() + apartment.MinNight);
    $("#checkInDatePicker").attr("min", minCheckInDate.toISOString().split('T')[0]);
    $("#checkOutDatePicker").attr("min", minCheckOutDate.toISOString().split('T')[0]);
    $("#price").prepend("$" + apartment.Price);
    if(apartment.MinNight > 1) {
        $("#minNight").prepend(`${apartment.MinNight}<span style="font-weight: 300;"> - Nights minimum</span>`);
    }
}

//this function render apartment scores ratings section in the page
function renderApartmentScores() {
    $("#details").append(
        `   
            <div class="col text-center">
                <i class="fa-solid fa-star fa-2x" title="Rating"></i>
                <p>Rating ${apartment.Rating}</p>
            </div>

            <div class="col text-center">
                <i class="fa-solid fa-broom fa-2x" title="Cleanliness"></i>
                <p>Cleanliness ${apartment.ReviewsClean}</p>
            </div>

            <div class="col text-center">
                <i class="fa-solid fa-location-pin fa-2x" title="Location"></i>
                <p>Location ${apartment.ReviewLocation}</p>
            </div>

            <div class="col text-center">
                <i class="fa-solid fa-crosshairs fa-2x" title="Accuracy"></i>
                <p>Accuracy ${apartment.ReviewLocation}</p>
            </div>

        `
    )
}

//function sets default dates in modal calender.
//startdDate default is the current day
//endDate default the startDate + apartments minNight
function setModalDates() {
        // Temporary, will get the date from search filter later
        const today = new Date();
        const todayString = today.toISOString().split('T')[0];
        $("#checkInDatePicker").val(todayString);
        writeDateInModal("checkIn", today);
    
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + apartment.MinNight);
        const tomorrowString = tomorrow.toISOString().split('T')[0];
        $("#checkOutDatePicker").val(tomorrowString);
        writeDateInModal("checkOut", tomorrow);
}

//this function render apartment amenities section in the page
function renderAmenties(amenities) {

    //MAX_AMENETIES_SIZE=14 (currently)
    let maxAmeneties = amenities.length <= MAX_AMENETIES_SIZE ? amenities.length : MAX_AMENETIES_SIZE; 

    //render the first MAX_AMENETIES_SIZE
    for (let i = 0; i < maxAmeneties; i++) {
        $("#ameneties")
            .append(`
                <div class="col">
                    <h6>
                        <span class="badge bg-secondary">${amenities[i]}</span>
                    </h6>
                </div>
            `);
    }
    //render the rest to hide div that can be opened by press
    if (amenities.length > MAX_AMENETIES_SIZE) {
        for (let i = maxAmeneties; i < amenities.length; i++) {

            $("#amenetiesMore")
                .append(`
                    <div class="col">
                        <h6>
                            <span class="badge bg-secondary">${amenities[i]}</span>
                        </h6>
                    </div>
                `);
        }

        $("#amenetiesBTN").css("display", "block");
    }
    
}

//this function expand the ameneties div
function expandAmeneties() {
    let ameneties = document.getElementById("amenetiesMore"); 
    let showMoreBTN = document.getElementById("amenetiesBTN");
    if (ameneties.style.display === "none") {
        ameneties.style.display = "flex";
        showMoreBTN.innerHTML = "Show more >";
    }
    else {
      ameneties.style.display = "none";
      showMoreBTN.innerHTML = "Show less >";
    }
}

//make ajax call to get host details
function getHostDetails(hostEmail) {
    ajaxCall("GET", `../api/Hosts?email=${hostEmail}`, "", SCBGetHostDetails, ECBGetHostDetails);
}

//SCB of ajax call getHostDetails
//render host details to the page
function SCBGetHostDetails(host) {

    const isSuperHost = host.IsSuperHost != false ? '<img class="headerImg" src="../images/superHost.png" />' : ""
    const isVerified = host.IsVerified != false ? '<img class="headerImg" src="../images/verified.jpg" />' : ""

    $("#host").append(`
            <div class="col">
                <div class="d-flex justify-content-between">
                    <p><b>${apartment.RoomType} in ${apartment.Neighborhood} hosted by ${host.FirstName}</b></p>
                    <img class="headerImg" src="${host.Img}" />
                    ${isSuperHost}
                    ${isVerified }
                </div>
            </div>
        `)
}

//ECB of ajax call getHostDetails, there is a problem
function ECBGetHostDetails(error) {
    sessionStorage.setItem("CGroup4_errorMessage", error.responseText);
    window.location.replace("notFound.html");
}

//?????????????????????????????????????????????????
//ajax call to get the reviews of the apartment
function getReviews(apartmentId, numOfPageReview) {
   // ajaxCall("GET", `../api/Reviews?apartmentId=${apartmentId}&numOfPageReview=${numOfPageReview}`, "", getReviewsSCB, getReviewsECB);
    ajaxCall("GET", `../api/Reviews/apartmentId/${apartmentId}/numOfPageReview/${numOfPageReview}`, "", getReviewsSCB, getReviewsECB);

}


//function for when user presses "next" or "previous" review
//function gets a sight indicated which button the user presses
//function update numOfPageReview accordingly and displays the relavent reviews 
function changeDisplayedReviews(sign) {

    if (sign == "+") {
        numOfPageReview++;
    }
    else { //sign == "-"
        numOfPageReview--;
    }
    getReviews(apartment.Id, numOfPageReview);

    updateReviewsButtons();
 
}


function updateReviewsButtons() {

    //check if there or no previous reviews to display (we are on the first review "page")
    if (numOfPageReview == 1) {
        $("#previousBTN").attr('disabled', true); //disable
    }
    else {
        $("#previousBTN").attr('disabled', false); 
    }

    //check if there are less that 6 comments ("page")
    if (totalReviews <= (numOfPageReview * 6)) {
        $("#nextBTN").attr('disabled', true); //disable
    }
    else {
        $("#nextBTN").attr('disabled', false);
    }
}

//SCB function of getReviews
//render the reviews to the page
function getReviewsSCB(reviews) {
    if (reviews == undefined) {
        $("#reviewDiv").hide();
        return;
    }

    $("#numReviews").html(`${apartment.Rating} · ${totalReviews} reviews`)

    $("#reviews").html(""); //clean div that holds reviews

    for(let i = 0; i < reviews.length; i++) {

        //to display the year and month of the review
        const date = new Date(reviews[i].ReviewDate);
        const year = date.getFullYear();
        const month = months2[date.getMonth()];

        const comment = checkIfReviewIsLong(reviews[i]);
           
        $("#reviews").append(`
                <div class="col">
                    <div>
                        <div class="d-flex">
                            <img src="../images/user-avatar.png" class="reviewImg">
                            <div class="d-flex flex-column ms-2">
                                <h6 class="mt-1 mb-0">${reviews[i].UserName}</h6>
                                <p class="reviewComment">${month + " " + year}</p>
                            </div>
                        </div>
                        ${comment}
                    </div>
                </div>
            `);
    }
    
}

//this function get a review and render it to the screen int the correct way
//if the review is more than 200 characters the review will have button "See more"
function checkIfReviewIsLong(review) {
    let comment;
    if(review.Comments.length > 200) {

        comment = 
        `<p id="${"review"+review.Id}" >
            ${review.Comments.substring(0, 200)}
            <span id="${"dots"+review.Id}">...</span>
            <span id="${"more"+review.Id}" class="more">${review.Comments.substring(201)}</span>
            <br>
            <button onclick="expandReview(${review.Id})" id="${"reviewBTN"+review.Id}" class="reviewBTN">Show more ></button>
         </p>`;

    }
    else {
        comment = `<p id="${"review"+review.Id}" >
            ${review.Comments}
        </p>`
    }

    return comment;
}

//Expand Appartment Description
function expandReview(reviewId) {
    var dots = document.getElementById("dots"+reviewId);
    var moreText = document.getElementById("more"+reviewId);
    var btnText = document.getElementById("reviewBTN"+reviewId);
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Show more >";
      moreText.style.display = "none";
    }
    else {
      dots.style.display = "none";
      btnText.innerHTML = "Show less >";
      moreText.style.display = "inline";
    }
}

function getReviewsECB(error) {
    sessionStorage.setItem("CGroup4_errorMessage", error.responseText);
    window.location.replace("notFound.html");
}

//when press on confirm reservation
function makeReservation() {

    const startDate = new Date($("#checkInDatePicker").val());
    const endDate = new Date($("#checkOutDatePicker").val());
    const apartmentId = sessionStorage.getItem("CGroup4_apartmentId");
    const userEmail = JSON.parse(localStorage.getItem("CGroup4_user")).Email;

    //new order that will be sent to backend
    //order id is Identity in sql
    const res = {
        Id: 0,
        StartDate: startDate,
        EndDate: endDate,
        Apartment: {Id: apartmentId},
        User: {Email: userEmail},
        IsCanceled: 0
    }

    //ajax call to create new reservation
    ajaxCall("POST", "../api/Reservations", JSON.stringify(res), makeReservationSCB, makeReservationECB);

}


//SCB of make new reservation
//save new reservation id in session storage and redirect the user to invoice.html
function makeReservationSCB(reservationId) {
    sessionStorage.setItem("CGroup4_reservationId", reservationId);
    window.location.replace("invoice.html");
}

//makeReservation Error callback
//present messgae if the apartment is not avialable in the dates
function makeReservationECB(err) {

    if (err.status == 400) {

        Swal.fire({
            icon: 'error',
            title: 'Already Booked!',
            text: 'The dates you choose are not available'
        })

    } else {
        sessionStorage.setItem("CGroup4_errorMessage", err.responseText);
        window.location.replace("notFound.html");
    }
}


// Initialize and add the map
function myMap(lat, lon) {
    // The location of Uluru
    const location = { lat: lat, lng: lon};
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
    center: location,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
    position: location,
    map: map,
    });
}

//google callback function when connect to map service
function initMap(){
    console.log("connect to google map");
}

//Expand Appartment Description
function expandText() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("readBTN");
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Show more";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Show less";
      moreText.style.display = "inline";
    }
}


//This function get string called inOrOut it value will be ["checkIn" or "checkOut"] and a date called date
//then desplayed the date in bold in the modal accordingly
function writeDateInModal(inOrOut, date) {

    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = days[date.getDay()];

    $(`#${inOrOut}Date`).html(date.getDate()) 
    $(`#${inOrOut}MonthAndYear`).html(month + " " + year);
    $(`#${inOrOut}Day`).html(day);

    calculatePrice();
}


//This function calculate the total price based on the check in and check out dates
// and the price per night of the apartment
function calculatePrice() {

    if(apartment === undefined) {
        return;
    }
    const price = apartment.Price;

    const checkIn = new Date($("#checkInDatePicker").val());
    const checkOut = new Date($("#checkOutDatePicker").val());

    const diffTime = Math.abs(checkOut - checkIn);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    $("#priceXnight").html(`$${price} x ${diffDays} nights`);
    $("#totalprice").html(`$${price * diffDays}`);
}


