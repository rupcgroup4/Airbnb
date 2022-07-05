//used to get the name of month from date variable
months = {
    0: "Jan", 1: "Feb", 2: "Mar", 3: "Apr", 4: "May", 5: "Jun",
    6: "Jul", 7: "Aug", 8: "Sep", 9: "Oct", 10: "Nov", 11: "Dec"
};
////used to get the name of days from date variable
days = { 0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursaday", 5: "Friday", 6: "Saturday" };

//Global Parameter
let apartment;

//check if has reservationId in local storage
//make ajax call to get reservation details
$(document).ready(function () {

    let reservationId = sessionStorage.getItem("CGroup4_reservationId");
    if (reservationId == undefined) {
        window.location.replace("index.html");
    }

    $('#spinner').css('display', 'block');

    ajaxCall("GET", `../api/Reservations/${reservationId}`, "", SCBGetReservation, ECB);

    $("#apartmentView").click( () => {
        window.location.replace("seeApart.html");
    });
});

//this function is the success call back of GetReservation
function SCBGetReservation(returnReservation) {
    //save reservation in global variable to be able to access to the detials again if needed
    reservation = returnReservation

    let apartmentId = reservation.Apartment.Id;
    ajaxCall("GET", `../api/Apartments/${apartmentId}`, "", SCBGetApartment, ECB);
}


//this function is the success call back of GetApartment
//the response is apartment details that will be render to the screen
function SCBGetApartment(returnApartment) {

    $('#spinner').css('display', 'none');

    //save apartment in global variable to be able to access to the detials again if needed
    apartment = returnApartment;

    sessionStorage.setItem("CGroup4_apartmentId", apartment.Id);

    const checkIn = new Date(reservation.StartDate);
    const checkOut = new Date(reservation.EndDate);

    myMap(Number(apartment.Latitude), Number(apartment.Longitude));

    $("#image").attr("src", apartment.Img);
    $("#modalImage").attr("src", apartment.Img); 
    $("#name").append(`<b>${apartment.Name}</b>`);
    $("#apartmentView").append(`<b>See apartment details</b>`);
 
    $("#reservaionNum").append(
        `Booking confirmation
        <small>CONFIRMATION NUMBER: #${reservation.Id}</small>

    `);

    //calculate differnce in day and the price of the reservation
    let difference = checkOut - checkIn;
    const TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    $("#TotalNights").append(TotalDays);
    $("#price").prepend("$" + apartment.Price);
    $("#TotalPrice").prepend("$" + (apartment.Price * TotalDays));

    $("#details").append(
        `
            
             <div class="col">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="check-in">
                        <div class="d-flex flex-row align-items-center">
                            <h1 id="checkInDate">24</h1>
                            <div class="d-flex flex-column ml-2 date">
                                <span id="checkInMonthAndYear">July 20</span>
                                <span id="checkInDay">Friday</span>
                            </div>
                        </div>
                        <div class="d-flex flex-column ml-2 date">
                            <span>Check in</span>
                            <span>Anytime after 3PM</span>
                        </div>
                    </
                    <div class="check-out">
                        <div class="d-flex flex-row align-items-center">
                            <h1 id="checkOutDate">25</h1>
                            <div class="d-flex flex-column ml-2 date">
                                <span id="checkOutMonthAndYear">July 20</span>
                                <span id="checkOutDay">Friday</span>
                            </div>
                        </div>
                        <div class="d-flex flex-column ml-2 date">
                            <span>Check out</span>
                            <span>11AM</span>
                        </
                    </div>
                </div>
            </div>
        `
    )
    //render date to Modal
    writeDate("checkIn", checkIn);
    writeDate("checkOut", checkOut);
    //get host img and more details
    ajaxCall("GET", `../api/Hosts?email=${hostEmail}`, "", SCBGetHostDetails, ECB);
}
//This function get inOrOut = ["checkIn" or "checkOut"] and a date
//then set the date in the modal accordingly to inOrOut
function writeDate(inOrOut, date) {

    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = days[date.getDay()];

    $(`#${inOrOut}Date`).html(date.getDate())
    $(`#${inOrOut}MonthAndYear`).html(month + " " + year);
    $(`#${inOrOut}Day`).html(day);
}
//this function is the success call back of getHostDetails
//the response is host details that will be render to the screen
function SCBGetHostDetails(host) {
    $("#host").append(
        `
            <hr>
            <div class="col">
                <h4 id="hostInfo">Contact info</h4>
                <div class="d-flex justify-content-between">
                    <h5>${host.FirstName} </h5>
                    <h5>${host.Email}</h5>
                </div>
            </div>
            <hr>
        `
    )
}

//general error callback functions
function ECB(error) {
    sessionStorage.setItem("CGroup4_errorMessage", error.responseText);
    window.location.replace("notFound.html");
}

// Initialize and add the map
function myMap(lat, lon) {
    // The location of Uluru
    const location = { lat: lat, lng: lon };
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
// google map success callback
function initMap() {
    console.log("connect to google map");
}

