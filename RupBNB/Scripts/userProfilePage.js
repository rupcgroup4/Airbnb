
var user; //global paramater

$(document).ready(function () {

    user = JSON.parse(window.localStorage.getItem('CGroup4_user'))
    if (user == undefined) {
        window.location.replace("index.html");
    }
    $("#username").html(user.UserName);
    getMyFutureReservations();

})

//function gets a date and return a string representing the date in 'dd/mm/yyyy' format
function formatDate(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1; //get month return (0-11) of a date: January =0, February = 1, ... 
    let day = date.getDate();

    return day + "/" + month + "/" + year;
}

//This function is called when "Apartment Details" button is clicked
function seeApart(apartmentId) {
    sessionStorage.setItem("CGroup4_apartmentId", apartmentId);
    sessionStorage.setItem("CGroup4_blockReservation", true);
    
    window.location.href = "seeApart.html";
}

//function gets a reservationId and canceles the reservation
function cancelReservation(reservationId) {
    ajaxCall("PUT", `../api/Reservations/cancelReservation`, JSON.stringify(reservationId), cancelReservationSuccess, cancelReservationError);

}

function cancelReservationSuccess(result) {
    console.log(result);

    getMyFutureReservations(); //update desplay

    Swal.fire({
        icon: 'success',
        title: 'success',
        text: 'Reservation canceled'
    })
}

function cancelReservationError(err) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "couldn't cancel reservation"
    })
}

function getMyFutureReservations() {
    ajaxCall("GET", `../api/Users/getUsersReservations?email=${user.Email}&isFutureReservations=true`, "", getMyFutureReservationsSuccess, getMyFutureReservationsError);
}

function getMyFutureReservationsSuccess(usersReservationsData) {
    let reservationsData = JSON.parse(usersReservationsData)
    console.log(reservationsData);

    let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    let currentDate = new Date();
    //currentDate.setHours(0, 0, 0, 0);
    console.log("curent date: ", currentDate)

    $("#futureReservationsContainer").html(""); //empty the div from reservation- for when the method is called after info update (when a reservation is canceled)

    for (let i = 0; i < reservationsData.length; i++) {

        let startDate = new Date(reservationsData[i].StartDate);
        let endDate = new Date(reservationsData[i].EndDate);

        const diffDays = Math.round(Math.abs((currentDate - startDate) / oneDay));
        let allowCancelReservation = (diffDays >= 2) && (reservationsData[i].IsCanceled==0);
        //console.log(startDate.toLocaleDateString());
        console.log("diff: ", diffDays);
        console.log("app id: ", reservationsData[i].ApartmentId);
        $("#futureReservationsContainer").append(`
            <div class="card m-auto mt-5" style="width: 18rem;">
                ${reservationsData[i].IsCanceled ? '<span style="color:red"> RESERVATION CANCELED</span>' : ""}
                <img src="${reservationsData[i].ApartmentImg}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${reservationsData[i].ApartmentName}</h5>
                        <p class="card-text">${formatDate(startDate)} - ${formatDate(endDate)}</p>
                        <input type="button" onclick="seeApart(${reservationsData[i].ApartmentId})" class="btn btn-primary" value="Apartment Details">
                        ${allowCancelReservation ? `<input type="button" onclick="cancelReservation(${reservationsData[i].ReservationId})" class="btn btn-primary" value="Cancel">` : ""}
                    </div>
            </div> `)
    }
    //<span style="color:red"> RESERVATION CANCELED</span>
}

function getMyFutureReservationsError(err) {
    alert(err);
}

function getMyPastReservations() {
    ajaxCall("GET", `../api/Users/getUsersReservations?email=${user.Email}&isFutureReservations=false`, "", getMyPastReservationsSuccess, getMyPastReservationsError);
}

function getMyPastReservationsSuccess(usersReservationsData) {

    let reservationsData = JSON.parse(usersReservationsData)
    console.log(reservationsData);

    for (let i = 0; i < reservationsData.length; i++) {

        let startDate = new Date(reservationsData[i].StartDate);
        let endDate = new Date(reservationsData[i].EndDate);

        $("#pastReservationsContainer").append(`
            <div class="card m-auto mt-5" style="width: 18rem;">
                <img src="${reservationsData[i].ApartmentImg}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${reservationsData[i].ApartmentName}</h5>
                        <p class="card-text">${formatDate(startDate)} - ${formatDate(endDate)}</p>
                        <input type="button" onclick="seeApart(${reservationsData[i].ApartmentId})" class="btn btn-primary" value="Apartment Details">
                    </div>
            </div> `)
    }
}

function getMyPastReservationsError(err) {
    alert(err);
}