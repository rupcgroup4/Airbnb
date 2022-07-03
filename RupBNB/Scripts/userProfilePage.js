var user; //global paramater
//boolean paramater that changes when the past reservation are shown (to prevent multiple ajax calls unneceserily to show the same thing)
var wasPastReservationsUsed = false; 

//when document ready get the user from local storage
//get the future reservations of the user
//load the firebase chat
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


//This function is called when "Reservation Details" button is clicked
function seeReservation(reservationId) {
    sessionStorage.setItem("CGroup4_reservationId", reservationId);
    sessionStorage.setItem("CGroup4_blockReservation", true);

    window.location.href = "invoice.html";
}

//function gets a reservationId and canceles the reservation
function cancelReservation(reservationId) {
    ajaxCall("PUT", `../api/Reservations/cancelReservation`, JSON.stringify(reservationId), cancelReservationSuccess, cancelReservationError);

}

//cancel reservation SCB function
//update the page with the canceled order
function cancelReservationSuccess(result) {

    getMyFutureReservations(); //update desplay
    Swal.fire({
        icon: 'success',
        title: 'success',
        text: 'Reservation canceled'
    })
}

//cancel reservation error call back
function cancelReservationError(err) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "couldn't cancel reservation"
    })
}

//this function make ajax call to get future 
function getMyFutureReservations() {
    ajaxCall("GET", `../api/Users/getUsersReservations?email=${user.Email}&isFutureReservations=true`, "", getMyFutureReservationsSuccess, getMyFutureReservationsError);
}

//SCB for get future reservations
//get the reservations and render to the screen
function getMyFutureReservationsSuccess(usersReservationsData) {
    reservationsData = JSON.parse(usersReservationsData)
    console.log(reservationsData);

    let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    let currentDate = new Date();
    //currentDate.setHours(0, 0, 0, 0);
    console.log("curent date: ", currentDate)

    $("#futureReservationsContainer").html(""); //empty the div from reservation- for when the method is called after info update (when a reservation is canceled)

    for (let i = 0; i < reservationsData.length; i++) {
        let allowCancelReservation = "";
        let startDate = new Date(reservationsData[i].StartDate);
        let endDate = new Date(reservationsData[i].EndDate);

        const diffDays = Math.round(Math.abs((currentDate - startDate) / oneDay));
        //if reservations date is more than 2 days from today, reservation will have cancel button
        if( (diffDays >= 2) && (reservationsData[i].IsCanceled==0)) {
            allowCancelReservation =`<input type="button" onclick="cancelReservation(${reservationsData[i].ReservationId})" class="btn btn-danger m-auto" value="Cancel">`
        }
        
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
                                <input type="button" onclick="seeApart(${reservationsData[i].ReservationId})" class="btn btn-primary m-auto" value="Reservation Details">
                                ${allowCancelReservation}
                            </div>
                        </div>
                    </div>
                </div>
            </div> `)
    }
}

//error callback of future reservation 
function getMyFutureReservationsError(err) {
    if(err.status == 500) {
        sessionStorage.setItem("CGroup4_errorMessage", err.responseText);
        window.location.replace("notFound.html");
    } 
}

//this function get called when press on past reservation tab in the page
//called only once
function getMyPastReservations() {
    if (!wasPastReservationsUsed) {
        ajaxCall("GET", `../api/Users/getUsersReservations?email=${user.Email}&isFutureReservations=false`, "", getMyPastReservationsSuccess, getMyPastReservationsError);
        wasPastReservationsUsed = true;
    }
}

//get past reservation success call back
//render past reservation to the page
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
            </div>
        `)
    }
}

//error callback of past reservation 
function getMyPastReservationsError(err) {
    if(err.status == 500) {
        sessionStorage.setItem("CGroup4_errorMessage", err.responseText);
        window.location.replace("notFound.html");
    } 
    console.log("no past reservation");
}



//**********************Chat***************************

//this function get called when press on send message button
//get the the text from the input and push it to firebase
function sendMessage() {

    let message = $("#newMessage").val();
    $("#newMessage").val("");

    firebase.database().ref(user.UserName).push().set({
        "sender": user.FirstName,
        "message": message
    })

    return false
}

//this function get called when document is ready
//listen to the user message data base in fire base
//and render new message to the screen
//(on the frst load return all the user messages)
function loadUserChat(user) {
    firebase.database().ref(user.UserName).on("child_added", snapshot => {
        message = {
            sender: snapshot.val().sender,
            message: snapshot.val().message,
        }

        let text_right = "";
        let float_right = "";
        let managerImg = "";

        //messages from the manager get different properties
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

