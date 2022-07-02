months = {0: "Jan", 1: "Feb", 2: "Mar", 3: "Apr", 4: "May", 5: "Jun",
            6: "Jul", 7: "Aug", 8: "Sep", 9: "Oct", 10: "Nov", 11: "Dec"};

days = {0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursaday", 5: "Friday", 6: "Saturday"};

//Different Format
months2 = {0: "January", 1: "February", 2: "March", 3: "April", 4: "May", 5: "June",
            6: "July", 7: "August", 8: "September", 9: "October", 10: "November", 11: "December"};
let apartment;

data = [
    {
        Id: 1, 
        PropertyType: "Private room in rental unit" , 
        HostEmail: "Daniel1@gmail.com" , 
        Name: "Quiet Garden View Room & Super Fast WiFi", 
        Description: "Quiet Garden View Room & Super Fast WiFi<br /><br /><b>The space</b><br />I'm renting a bedroom (room overlooking the garden) in my apartment in Amsterdam <br /><br />The room is located to the east of the city centre in a quiet typical Amsterdam neighbourhood the Indische Buurt. Amsterdamâ€™s historic centre is less than 15 minutes away by bike or tram.<br /><br /><br />The features of the room are:<br /><br />- Twin beds (80 x 200 cm down quilts and pillows) <br />- 2 pure cotton towels for each guest <br />- reading lamps<br />- bedside table<br />- wardrobe<br />- table with chairs<br />- tea and coffee making facilities<br />- mini bar<br />- alarm clock<br />- Hi-Fi system with cd player connection for mp3 player / phone<br />- map of Amsterdam and public transport<br />- Wi-Fi Internet connection <br /><br />Extra services:<br /><br />- Bike rental<br /><br /><b>License number</b><br />0363 5F3A 5684 6750 D14D", 
        Img: "https://a0.muscache.com/pictures/10272854/8dcca016_original.jpg", 
        Neighborhood: "Indische Buurt (Indies Neighborhood) is a neighbourhood in the eastern portion of the city of Amsterdam in the Dutch province of Noord-Holland. The name dates from the early 20th century and is derived from the fact that the neighbourhood's streets ar",
        Latitude: 52.36575,
        Longtitude: 4.94142,
        RoomType: "Private room",
        NumBathrooms: "1.5 shared baths",
        NumBedrooms: 1,
        NumBeds: 2,
        Accommodates: 2,
        Amenities: "Carbon monoxide alarm;Shampoo;Hot water;Wifi;Hair dryer;Extra pillows and blankets;Heating;Bed linens;Fire extinguisher;Long term stays allowed;Essentials;Iron;Smoke alarm;Paid parking on premises;Paid parking off premises;Hangers;Dedicated workspace;Coffe",
        Price: 59,
        MinNights: 3,
        MaxNights: 28,
        Rating: 4.88,
        ReviewAccuracy: 4.93,
        ReviewClean: 5,
        ReviewLocation: 4.68
    }
]
hostData = [
    {
        Email: "Abhishek72@gmail.com",
        UserName: "Abhishek72",
        FirstName: "Abhishek",
        LastName: "Abhishek",
        Password: 12345678,
        BirthDate: "1961-12-01",
        UserRegisteredSince: "2015-08-21",
        HostSince: "2015-08-21",
        Location: "Amsterdam North Holland Netherlands",
        About: "My wife and I are travelers. We travel for work or for vacations. If I can recall correctly we have been to almost 20+ countries till now and lucky to meet people from different cultures and nationalities.",
        ResponseTime: "a few days or more",
        ResponseRate: "25%",
        IsSuperHost: 1,
        Img: "https://a0.muscache.com/im/users/42104065/profile_pic/1440162676/original.jpg?aki_policy=profile_x_medium",
        IsVerified: 1
    }
]

//before window unload clear CGroup4_blockReservation from session storage
window.onbeforeunload = function () {
    sessionStorage.removeItem("CGroup4_blockReservation");
}

$(document).ready(function () {

    let apartmentId = sessionStorage.getItem("CGroup4_apartmentId");
    if (apartmentId == undefined) {
        window.location.replace("index.html");
    }

    if (sessionStorage.getItem("CGroup4_blockReservation") != undefined) {
        $("#reserve").removeClass("d-flex");
        $("#reserve").css("display", "none");
    }

    ajaxCall("GET", `../api/Apartments/${apartmentId}`, "", SCBGetApartment, ECBGetApartment);

    //when user press on confirm reservation
    $(document).on("click", "#makeReservation", clickReserve);

    //set the minimun date of the date inputs to be today 
    $("#checkInDatePicker").attr("min", new Date().toISOString().split('T')[0]);
    $("#checkOutDatePicker").attr("min", new Date().toISOString().split('T')[0]);


    //trigger event each date one of the date input has changed
    $('input[type=date]').change(function() {
        checkDates();
    });


});

function clickReserve() {
    //if user is not logged in
    if (sessionStorage.getItem("CGroup4_user") == undefined) {
        userNotLogedIn();
        return;
    }

    const startDate = new Date($("#checkInDatePicker").val());
    const endDate = new Date($("#checkOutDatePicker").val());
    const minNight = apartment.MinNight;

    const Difference_In_Time = endDate - startDate;
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    if (minNight <= Difference_In_Days) {
        console.log("in if", minNight);
        makeReservation();
    }
    else {
        $("#reserveModal").modal('hide');
        alert("min night bad");
    }
}

function userNotLogedIn() {
    Swal.fire({
        title: 'Must be logged in for make reservation',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Log In',
        denyButtonText: `Sign Up`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
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

    //set min date for checkOut (minimun checkInDate + 1)
    let minCheckOutDate = new Date(checkInDate);
    minCheckOutDate.setDate(minCheckOutDate.getDate() + 1);
    $("#checkOutDatePicker").attr("min", minCheckOutDate.toISOString().split('T')[0]);

    //check if check out is smaller than check in date
    if (checkOutDate <= checkInDate) {
        //set check out date to be 1 day after check in
        checkOutDate = new Date(checkInDate);
        checkOutDate.setDate(checkOutDate.getDate() + 1);
    }  
    
    //set date to the date input
    $("#checkOutDatePicker").val(checkOutDate.toISOString().split('T')[0]);
    $("#checkInDatePicker").val(checkInDate.toISOString().split('T')[0]);
    //render date to Modal
    writeDateInModal("checkIn", checkInDate);
    writeDateInModal("checkOut", checkOutDate);

}

//this function is the success call back of GetApartment
//the response is apartment details that will be render to the screen
function SCBGetApartment(returnApartment) {

    //save apartment in global variable to be able to access to the detials again if needed
    apartment = returnApartment;

    myMap(Number(apartment.Latitude), Number(apartment.Longitude));
    
    $("#image").attr("src", apartment.Img);
    $("#modalImage").attr("src", apartment.Img);
    $("#name").append(apartment.Name);

    if(apartment.Description.length > 200) {
        $("#description").prepend(apartment.Description.substring(0, 200));
        $("#more").append(apartment.Description.substring(201));
        $("#readBTN").css("display", "block");
    } else {
        $("#description").prepend(apartment.Description);
        $("#dots").css("display", "none");
        $("#more").css("display", "none");
        $("#readBTN").css("display", "none");
    }
    
    $("#price").prepend("$" + apartment.Price);

    renderApartmentDetails();
    
    setModalDates();

    let amenities = JSON.parse(apartment.Amenities);
    renderAmenties(amenities);

    //get host img and more details
    getHostDetails(apartment.HostEmail);

    //get apartment reviews
    getReviews(apartment.Id);

    //calculate total price of current dates with apartment price
    calculatePrice();
}

//this function render apartment details section in the page
function renderApartmentDetails() {
    $("#details").append(
        `
            <div class="col text-center">
                <i class="fas fa-bed fa-2x" title="Number of beds"></i>
                <h4>${apartment.NumBeds}</h4>
            </div>

            <div class="col text-center">
                <i class="fa-solid fa-person fa-2x" title="Number of persons"></i>
                <h4>${apartment.NumBeds}</h4>
            </div>

            <div class="col text-center">
                <i class="fa-solid fa-star fa-2x" title="Rating score"></i>
                <h4>${apartment.Rating}</h4>
            </div>

            <div class="col text-center">
                <i class="fa-solid fa-broom fa-2x" title="Cleaning review"></i>
                <h4>${apartment.ReviewsClean}</h4>
            </div>
            <div class="col text-center">
                <i class="fa-solid fa-location-pin fa-2x" title="Location review"></i>
                <h4>${apartment.ReviewLocation}</h4>
            </div>
        `
    )
}

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


function renderAmenties(amenities) {

   
    let maxAmeneties = amenities.length <= 14 ? amenities.length : 14;
    
    for (let i = 0; i < maxAmeneties; i++) {
        $("#ameneties")
            .append(
                `
                <div class="col">
                    <h6>
                        <span class="badge bg-secondary">${amenities[i]}</span>
                    </h6>
                </div>
            `
        );
    }

    if(amenities.length > 14) {
        for (let i = maxAmeneties; i < amenities.length; i++) {

            $("#amenetiesMore")
                .append(
                    `
                    <div class="col">
                        <h6>
                            <span class="badge bg-secondary">${amenities[i]}</span>
                        </h6>
                    </div>
                `
            );

        }

       

        $("#amenetiesBTN").css("display", "block");
    }
    
}

function expandAmeneties() {
    
    let ameneties = document.getElementById("amenetiesMore"); 
    let showMoreBTN = document.getElementById("amenetiesBTN");

    if (ameneties.style.display === "none") {
        ameneties.style.display = "flex";
        showMoreBTN.innerHTML = "Show more >";
      } else {
        ameneties.style.display = "none";
        showMoreBTN.innerHTML = "Show less >";
      }


}


function getHostDetails(hostEmail) {

    SCBGetHostDetails(hostData);

    //let qs = "email=" + hostEmail;
    //ajaxCall("GET", `../api/Hosts?${qs}`, "", SCBGetHostDetails, ECBGetHostDetails);
}

function SCBGetHostDetails(host) {

    const isSuperHost = host[0].IsSuperHost != 0 ? '<img class="headerImg" src="../Pages/superHost.png" />' : ""
    const isVerified = host[0].IsVerified != 0 ? '<img class="headerImg" src="../Pages/verified.jpg" />' : ""


    $("#host").append(
        `
            <div class="col">
                <div class="d-flex justify-content-between">
                    <img class="headerImg" src="${host[0].Img}" />
                    <h4>${host[0].FirstName}</h4>
                    ${isSuperHost}
                    ${isVerified }
                </div>
            </div>
        `
    )

}

function ECBGetHostDetails(error) {
    console.log(error);
}

function ECBGetApartment(error) {
    console.log(error);
}


function getReviews(apartmentId) {

    ajaxCall("GET", `../api/Reviews/${apartmentId}`, "", getReviewsSCB, getReviewsECB);
}

function getReviewsSCB(reviews) {

    for(let i = 0; i < reviews.length; i++) {

        const date = new Date(reviews[i].ReviewDate);
        const year = date.getFullYear();
        const month = months2[date.getMonth()];


        $("#numReviews").html(`${apartment.Rating} · ${reviews.length} reviews`)

        const comment = checkIfReviewIsLong(reviews[i]);
           
        $("#reviews").append(
            `
                <div class="col">
                    <div>
                        <div class="d-flex">
                            <img src="user-avatar.png" class="reviewImg">
                            <div class="d-flex flex-column ms-2">
                                <h6 class="mt-1 mb-0">${reviews[i].UserName}</h6>
                                <p class="reviewComment">${month + " " + year}</p>
                            </div>
                        </div>
                        ${comment}
                    </div>
                </div>
    
            `
        );
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

    } else {
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
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Show less >";
      moreText.style.display = "inline";
    }
}

function getReviewsECB(err) {
    sessionStorage.setItem("CGroup4_errorMessage", err.responseText);
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
        ApartmentId: apartmentId,
        UserEmail: userEmail,
        IsCanceled: 0
    }

    ajaxCall("POST", "../api/Reservations", JSON.stringify(res), makeReservationSCB, makeReservationECB);

}

function makeReservationSCB(response) {
    console.log(response);
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


//This function get inOrOut = ["checkIn" or "checkOut"] and a date
//then set the date in the modal accordingly to inOrOut
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
