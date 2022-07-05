var user; //global paramater
//boolean paramater that changes when the past reservation are shown (to prevent multiple ajax calls unneceserily to show the same thing)
var wasPastReservationsUsed = false; 
//boolean paramater that changes when the liked apartments are shown (to prevent multiple ajax calls unneceserily to show the same thing)
var wasLikedApartmentsUsed = false; 

//check if user is undefined or manager-redirect
user = JSON.parse(localStorage.getItem('CGroup4_user'));
if (user == undefined) {
    window.location.replace("index.html");
}
if (user.Email == "admin@gmail.com") {
    window.location.replace("adminView.html");
}

//when document ready get the user from local storage
//get the future reservations of the user
//load the firebase chat
$(document).ready(function () {

    $('#spinner').css('display', 'block');


    $("#username").html(user.UserName);
    getMyFutureReservations();

    loadUserChat(user);

    //when user press on add review
    $(document).on("click", "#addReview", addReview);

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
    window.location.href = "seeApart.html";
}
//This function is called when "Order Details" button is clicked
function seeInvoice(reservationId) {
    sessionStorage.setItem("CGroup4_reservationId", reservationId);
    window.location.href = "invoice.html";
}


//function gets a reservationId and canceles the reservation
function cancelReservation(reservationId) {
    ajaxCall("PUT", `../api/Reservations/cancelReservation`, JSON.stringify(reservationId), cancelReservationSuccess, cancelReservationError);

}
//cancel reservation SCB function
//update the page with the canceled order
function cancelReservationSuccess(result) {
    console.log(result);

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
function getMyFutureReservationsSuccess(reservationsData) {
    
    console.log(reservationsData);

    let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    let currentDate = new Date();

    $("#futureReservationsContainer").html(""); //empty the div from reservation- for when the method is called after info update (when a reservation is canceled)

    for (let i = 0; i < reservationsData.length; i++) {

        let startDate = new Date(reservationsData[i].StartDate);
        let endDate = new Date(reservationsData[i].EndDate);

        const diffDays = Math.round(Math.abs((currentDate - startDate) / oneDay));
        let allowCancelReservation = (diffDays >= 2) && (reservationsData[i].IsCanceled==0);
       
        $("#futureReservationsContainer").append(`
            <div class="col mt-2">
                <div class="card h-100">
                    ${reservationsData[i].IsCanceled ? '<span style="color:red"> RESERVATION CANCELED</span>' : '<span style="color:white">FILL THE BLANK</span>'}
                    <img src="${reservationsData[i].Apartment.Img}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">${reservationsData[i].Apartment.Name}</h5>
                            <p class="card-text">${formatDate(startDate)} - ${formatDate(endDate)}</p>
                            <div class="bottom">
                               
                                <div class="d-flex justify-content-between">
                                    <input type="button" onclick="seeInvoice(${reservationsData[i].Id})" class="btn btn-primary m-auto" value="Order Details">
                                    ${allowCancelReservation ? `<input type="button" onclick="cancelReservation(${reservationsData[i].Id})" class="btn btn-danger m-auto" value="Cancel">` : ""}
                                </div>
                            </div>
                        </div>
                </div>
            </div> `)
    }
    $('#spinner').css('display', 'none');
}
//error callback of future reservation 
function getMyFutureReservationsError(err) {
    if(err.status == 500) {
        sessionStorage.setItem("CGroup4_errorMessage", err.responseText);
        window.location.replace("notFound.html");
    } 
    $('#spinner').css('display', 'none');
    $("#futureReservationsContainer").append(`<h3 class='center'>There are no future reservation</h3>`);;
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
function getMyPastReservationsSuccess(reservationsData) {
    $("#pastReservationsContainer").html("");
    for (let i = 0; i < reservationsData.length; i++) {

        let startDate = new Date(reservationsData[i].StartDate);
        let endDate = new Date(reservationsData[i].EndDate);

        $("#pastReservationsContainer").append(`
            <div class="col mt-2">
                <div class="card h-100">
                    <img src="${reservationsData[i].Apartment.Img}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${reservationsData[i].Apartment.Name}</h5>
                        <p class="card-text">${formatDate(startDate)} - ${formatDate(endDate)}</p>
                        <div class="bottom">
                            <input type="button" onclick="seeApart(${reservationsData[i].Apartment.Id})" class="btn btn-primary" value="Apartment Details">
                            ${ !(reservationsData[i].HasReview) ? `<input type="button" class="btn btn-info" id="reviewBTN_${reservationsData[i].Id}" onclick="saveApart(${reservationsData[i].Apartment.Id},${reservationsData[i].Id})" data-bs-toggle="modal" data-bs-target="#reviewModal" value="Add review">` : "" }
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
    $('#spinner').css('display', 'none');
    $("#pastReservationsContainer").append(`<h3 class='center'>There are no past reservation</h3>`);
}

//this function get called when press on liked apartments tab in the page
//called only once
function getMyLikedApartments() {
    if (!wasLikedApartmentsUsed) {
        let userEmail = JSON.parse(localStorage.getItem("CGroup4_user")).Email;
        ajaxCall("GET", `../api/likedApartmentsByEmail?email=${userEmail}`, "", SCBGetLikedApartmentsByEmail, ECBGetLikedApartmentsByEmail);
        wasLikedApartmentsUsed = true;
    }
}
//get liked apartments success call back
//render liked apartments to the page
function SCBGetLikedApartmentsByEmail(LikedApartments) {
    if (LikedApartments == undefined) {
        ECBGetLikedApartmentsByEmail(`<h3 class='center'>There are no apartments you liked</h3>`);
        return;
    }
    for (let i = 0; i < LikedApartments.length; i++) {
        $("#likedApartmentsContainer").append(`
            <div class="col mt-2">
                <div class="card h-100">
                    <img src="${LikedApartments[i].Apartment.Img}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${LikedApartments[i].Apartment.Name}</h5>
                        <div class="bottom">
                            <input type="button" onclick="seeApart(${LikedApartments[i].Apartment.Id})" class="btn btn-primary" value="Apartment Details">
                        </div>
                    </div>
                </div>
            </div>
        `)
    }
}
//error callback of liked apartments 
function ECBGetLikedApartmentsByEmail(err) {
    if (err.status == 500) {
        sessionStorage.setItem("CGroup4_errorMessage", err.responseText);
        window.location.replace("notFound.html");
    }
    $('#spinner').css('display', 'none');
    $("#likedApartmentsContainer").append(err);
}
//hold apartment id and reservation id
function saveApart(apartmentId,reservationId) {
    reviewToApart = apartmentId;
    reviewToReser = reservationId;
}
//add new review to apartment
function addReview() {
    const comment = $("#reviewText").val();
    if (comment == "") {
        return;
    }
    const apartmentId = reviewToApart;
    const userName = JSON.parse(localStorage.getItem("CGroup4_user")).UserName;
    const reviewDate = new Date();

    //new review that will be sent to backend
    //review id is Identity in sql
    const review = {
        Id: 0,
        Apartment: { Id: apartmentId },
        UserName: userName,
        ReviewDate: reviewDate,
        Comments: comment
    }

    //ajax call to create new review 
    ajaxCall("POST", "../api/Reviews", JSON.stringify(review), SCBMakedReview, ECBMakedReview);

}
//review added successfully
function SCBMakedReview(status) {
    ajaxCall("PUT", `../api/Reservations/ApartmentHasReview`, JSON.stringify(reviewToReser), SCBHasReview, ECBHasReview);
}
//review added successfully (hasReview boolean change value to true)
function SCBHasReview() {
    $(`#reviewBTN_${reviewToReser}`).remove();
    $('#reviewModal').modal('hide');
    Swal.fire(
        'The review added successfully',
        'You clicked the button!',
        'success'
    )
}
//error callback, review not added
function ECBHasReview(error) {
    sessionStorage.setItem("CGroup4_errorMessage", err.responseText);
    window.location.replace("notFound.html");
}
//error callback, review not added
function ECBMakedReview(err) {
    sessionStorage.setItem("CGroup4_errorMessage", err.responseText);
    window.location.replace("notFound.html");
}


//**********************Chat***************************

//this function get called when press on send message button
//get the the text from the input and push it to firebase
function sendMessage() {

    let message = $("#newMessage").val();
    $("#newMessage").val("");

    //create date for currrent message
    currentDate = new Date();
    currentDateStr = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    currentTimeStr = `${currentDate.getHours()}:${currentDate.getMinutes()}`;

    firebase.database().ref(user.UserName).push().set({
        "sender": user.FirstName,
        "message": message,
        "messageDate": currentDateStr,
        "messageTime": currentTimeStr,
        "isRead": false, 
    })

    //return false
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
            messageDate: snapshot.val().messageDate,
            messageTime: snapshot.val().messageTime,
            isRead: snapshot.val().isRead,
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
                                <span class="message-data-time">${message.messageTime}, ${message.messageDate}</span>
                                ${managerImg}
                            </div>
                        <div class="message other-message ${float_right}">${message.message}</div>
                    </li>
                `
        );

    });
}

