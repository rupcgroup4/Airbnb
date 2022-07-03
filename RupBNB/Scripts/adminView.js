
let flag_apartmentView = true;
let flag_hostView = true;

//render the users table when document ready
$(document).ready(function () {
    renderUsersTables();
});

//create ajax call to get users details for the table
function renderUsersTables() {
    let qs = "type=usersView";
    ajaxCall("GET", `../api/Admin?${qs}`, "", SCBReadUsers, ECBgeneral);
}

//create ajax call to get hosts details for the table
function renderHostsTables() {
    if (flag_hostView) {
        $('#spinner').css('display', 'block');

        let qs = "type=hostsView";
        ajaxCall("GET", `../api/Admin?${qs}`, "", SCBReadHosts, ECBgeneral);

        flag_hostView = false;
        $("#nav-host-tab").prop('onclick', null);
    }
}

//create ajax call to get apartments details for the table
function renderApartmentsTables() {
    if (flag_apartmentView) {
        $('#spinner').css('display', 'block');

        let qs = "type=apartmentsView";
        ajaxCall("GET", `../api/Admin?${qs}`, "", SCBReadApartments, ECBgeneral);
        flag_apartmentView = false;

        $("#nav-apartment-tab").prop('onclick', null);
        $(document).on("click", ".apartmentIdView", function () {
            let dataApartmentId = this.getAttribute('data-ApartmentId');
            sessionStorage.setItem("apartmentId", `${dataApartmentId}`);
            window.location.href = "seeApart.html";

        });
    }
}

// Read users success call back
//populate the table with the users details
function SCBReadUsers(usersData) {
    let users = JSON.parse(usersData);
    const fileName = 'Users data export';
    try {
        tbl = $('#UserTable').DataTable({
            data: users,
            pageLength: 10,
            responsive: true,
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: 'copyHtml5',
                    title: fileName
                },
                {
                    extend: 'csvHtml5',
                    title: fileName
                },
                {
                    extend: 'excelHtml5',
                    title: fileName
                },
                {
                    extend: 'pdfHtml5',
                    title: fileName
                },
                {
                    extend: 'print',
                    title: fileName
                },
            ],
  
            columns: [
                { data: "Email" },
                {
                    data: "Register_date",
                    render: function (data, type, row, meta) {
                        let dateStr = new Date(data);
                        return dateStr.toLocaleDateString();
                   }
                },
                { data: "Total_rentals" },
                { data: "Total_cancels"  },
                { data: "Total_income" }
            ]
        });

        $('#spinner').css('display', 'none');
    }
    catch (err) {
        alert(err);
    }
}

// Read hosts success call back
//populate the table with the users details
function SCBReadHosts(hostsData) {
    let hosts = JSON.parse(hostsData);
    const fileName = 'Hosts data export';
    try {
        tbl = $('#HostTable').DataTable({
            data: hosts,
            pageLength: 10,
            responsive: true,
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: 'copyHtml5',
                    title: fileName
                },
                {
                    extend: 'csvHtml5',
                    title: fileName
                },
                {
                    extend: 'excelHtml5',
                    title: fileName
                },
                {
                    extend: 'pdfHtml5',
                    title: fileName
                },
                {
                    extend: 'print',
                    title: fileName
                },
                
            ],
            columns: [
                { data: "Email" },
                {
                    data: "Register_date",
                    render: function (data, type, row, meta) {
                        let dateStr = new Date(data);
                        return dateStr.toLocaleDateString();

                    }

                },
                { data: "Total_rentals" },
                { data: "Total_cancels" },
                { data: "Total_income" }
            ]
        });
        $('#spinner').css('display', 'none');
    }
    catch (err) {
        alert(err);
    }
}

// Read apartments success call back
//populate the table with the users details
function SCBReadApartments(apartmentsData) {
    let apartments = JSON.parse(apartmentsData);
    const fileName = 'Apartments data export';
    try {
        tbl = $('#ApartmentTable').DataTable({
            data: apartments,
            pageLength: 10,
            responsive: true,
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: 'copy',
                    title: fileName,
                   
                },
                {
                    extend: 'csv',
                    title: fileName,
                   
                },
                {
                    extend: 'excel',
                    title: fileName,
                   
                },
                {
                    extend: 'pdf',
                    title: fileName,
                   
                },
                {
                    extend: 'print',
                    title: fileName,
                  
                }
            ],

            columns: [
                { data: "Apartment_id"},
                { data: "Apartment_name" },
                { data: "Total_rentals" },
                { data: "Total_cancels" }
             
            ],

        });
        $('#spinner').css('display', 'none');
    }
    catch (err) {
       alert(err);
    }
}

// error call back
function ECBgeneral(err) {
    if(err.status == 500) {
        sessionStorage.setItem("CGroup4_errorMessage", err.responseText);
        window.location.replace("notFound.html");
    }
    
}



//**********************Chat********************************

//hold the current user that open in the chat
let activeUserInChat;

//asscoiative array of users and their messages
//[
//  {userName1: [{messagesObject1},{messagesObject2}]}]
//  {userName2: [{messagesObject1},{messagesObject2}]}
//]
let chatArr = [];

//this function send message from the manager to user (by activeUserInChat)
function sendMessage() {

    let message = $("#newMessage").val();
    $("#newMessage").val("");

    //check that there is active user in the chat
    if (activeUserInChat == undefined) {
        return;
    }

    currentDate = new Date();
    currentDateStr = `${currentDate.getDay()}/${currentDate.getMonth()}/${currentDate.getFullYear()}`;
    currentTimeStr = `${currentDate.getHour}:${currentDate.getMinutes()}` ;
    //add the message to data base under the specific user
    firebase.database().ref(activeUserInChat).push().set({
        "sender": "manager",
        "message": message,
        "messageDate": currentDateStr, 
        "messageTime": currentTimeStr
    })

}

//listen for new users that was added to DB (in first loading this function automaticly return all the users)
firebase.database().ref().on("child_added", snapshot => {
    const user = snapshot.key;
    chatArr[user] = new Array();
    //create new line in the chat for the user and render to the screen 
    createListForEachUser(user);
    //listen to the user messages and render to the screen
    listenToUser(user);

});


//add user as a line to the chat window with the users chat seen on the left
function createListForEachUser(user) {

    $("#usersContainer").append(

        `
            <li id="${user}" class="clearfix" onclick="renderUserMessages(this.id)">
                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar">
                <div class="about">
                    <div class="name">${user}</div>
                </div>
            </li>
        `
    )

}

//listen to a specific user and add his messages to the messages array
//if the user is now active in the chat, add the message also to the chat
function listenToUser(user) {

    firebase.database().ref(user).on("child_added", snapshot => {

        const message = {
            sender: snapshot.val().sender,
            message: snapshot.val().message,
            messageDate: snapshot.val().messageDate,
            messageTime: snapshot.val().messageTime

        }

        chatArr[user].push(message);

        //if a message from the user currently open on screen has arrived update the chat
        //view to to display the message- purpose is to show real time change in open chat 
        if ($("#activeUserChat").text() == user) {
            addMessage(message);
        }

    });
}

//get user name and render his message to the chat window
function renderUserMessages(user) {
    //set this user to be the active user in the chat
    activeUserInChat = user;

    $(".chat-list li").removeClass("active"); //remove class that colors currently active user from all users

    $(`#${user}`).addClass("active");         //add class that colors currently active user to recieved user

    $("#activeChat").html("");       //clear div that displays the chat messages before rendering the users messages to it
    $("#activeUserChat").html(user); //display users name in #activeUserChat div

    //render all users messages to screen
    for (let i = 0; i < chatArr[user].length; i++) {
        addMessage(chatArr[user][i])
    }

}

//get a message and render the message to the chat 
function addMessage(message) {

    let text_right = "";
    let float_right = "";
    let managerImg = "";

    //give different properties to manager messages
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
}