
var user; //global paramater
var wasPastReservationsUsed = false; //boolean paramater that changes when the past reservation are shown (to prevent multiple ajax calls unneceserily to show the same thing)

$(document).ready(function () {

    user = JSON.parse(window.localStorage.getItem('CGroup4_user'))
    if (user == undefined) {
        window.location.replace("index.html");
    }
    $("#username").html(user.UserName);
    getMyFutureReservations();

    loadUserChat(user);

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
            <div class="col mt-2">
                <div class="card h-100">
                    ${reservationsData[i].IsCanceled ? '<span style="color:red"> RESERVATION CANCELED</span>' : '<span style="color:white">FILL THE BLANK</span>'}
                    <img src="${reservationsData[i].ApartmentImg}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">${reservationsData[i].ApartmentName}</h5>
                            <p class="card-text">${formatDate(startDate)} - ${formatDate(endDate)}</p>
                            <div class="bottom">
                               
                                <div class="d-flex justify-content-between">
                                    <input type="button" onclick="seeApart(${reservationsData[i].ApartmentId})" class="btn btn-primary m-auto" value="Apartment Details">
                                    ${allowCancelReservation ? `<input type="button" onclick="cancelReservation(${reservationsData[i].ReservationId})" class="btn btn-danger m-auto" value="Cancel">` : ""}
                                </div>
                            </div>
                        </div>
                </div>
            </div> `)
    }
    //<span style="color:red"> RESERVATION CANCELED</span>
}

function getMyFutureReservationsError(err) {
    alert(err);
}

function getMyPastReservations() {
    if (!wasPastReservationsUsed) {
        ajaxCall("GET", `../api/Users/getUsersReservations?email=${user.Email}&isFutureReservations=false`, "", getMyPastReservationsSuccess, getMyPastReservationsError);
        wasPastReservationsUsed = true;
    }
}

function getMyPastReservationsSuccess(usersReservationsData) {

    let reservationsData = JSON.parse(usersReservationsData)
    console.log(reservationsData);

    for (let i = 0; i < reservationsData.length; i++) {

        let startDate = new Date(reservationsData[i].StartDate);
        let endDate = new Date(reservationsData[i].EndDate);

        $("#pastReservationsContainer").append(`
            <div class="col mt-2">
                <div class="card h-100">
                    <img src="${reservationsData[i].ApartmentImg}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">${reservationsData[i].ApartmentName}</h5>
                            <p class="card-text">${formatDate(startDate)} - ${formatDate(endDate)}</p>
                            <div class="bottom">
                                <input type="button" onclick="seeApart(${reservationsData[i].ApartmentId})" class="btn btn-primary" value="Apartment Details">
                            </div>
                        </div>
                </div>
            </div>`)
    }
}

function getMyPastReservationsError(err) {
    alert(err);
}






//**********************Chat***************************


function sendMessage() {

    let message = $("#newMessage").val();

    firebase.database().ref(user.UserName).push().set({
        "sender": user.FirstName,
        "message": message
    })

    return false
}

function loadUserChat(user) {
    firebase.database().ref(user.UserName).on("child_added", snapshot => {
        message = {
            sender: snapshot.val().sender,
            message: snapshot.val().message,
        }


        let text_right = "";
        let float_right = "";
        let managerImg = "";

        if (message.sender == "manager") {
            text_right = "text-right";
            float_right = "float-right";
            managerImg = '<img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar">';
        }

        $("#activeChat").append(
            `
                    <li class="clearfix">
                            <div class="message-data ${text_right}">
                                <span class="message-data-time">10:10 AM, Today</span>
                                ${managerImg}
                            </div>
                        <div class="message other-message ${float_right}">${message.message}</div>
                    </li>
                `
        );

    });
}

