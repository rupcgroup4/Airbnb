
let flag_apartmentView = true;
let flag_hostView = true;

//if a user that is not the admin tries to see adminView.html
if (localStorage.getItem("CGroup4_user") != undefined) {
    admin = JSON.parse(localStorage.getItem("CGroup4_user"));
    if (admin.Email != "admin@gmail.com") {

        sessionStorage.setItem("CGroup4_errorMessage", "405 Not Allowed"); //Ask Stav and Yoav
        window.location.replace("notFound.html");
    }
}

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
            order: [[4, 'desc']],
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
        sessionStorage.setItem("CGroup4_errorMessage", err.responseText);
        window.location.replace("notFound.html");
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
            order: [[4, 'desc']],
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
        sessionStorage.setItem("CGroup4_errorMessage", err.responseText);
        window.location.replace("notFound.html");
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
            order: [[2, 'desc']], 
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
        sessionStorage.setItem("CGroup4_errorMessage", err.responseText);
        window.location.replace("notFound.html");
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
//  {userName1: {unReadMessagesCounter: unReadMessagesCounter, 
//               messages: [{ messagesObject1 }, { messagesObject2 }] }
//  }
//  {userName2: {unReadMessagesCounter: unReadMessagesCounter, 
//               messages: [{ messagesObject1 }, { messagesObject2 }] }
//  }
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

    //create date for currrent message
    currentDate = new Date();
    currentDateStr = `${currentDate.getDate()}/${currentDate.getMonth()+1}/${currentDate.getFullYear()}`;
    currentTimeStr = `${currentDate.getHours()}:${currentDate.getMinutes()}` ;
    //add the message to data base under the specific user
    firebase.database().ref(activeUserInChat).push().set({
        "sender": "manager",
        "message": message,
        "messageDate": currentDateStr, 
        "messageTime": currentTimeStr,
        "isRead": false,  //???
    })

}

//listen for new users that was added to DB (in first loading this function automaticly return all the users)
firebase.database().ref().on("child_added", snapshot => {
    //populate the chat array the array
    const user = snapshot.key;
    chatArr[user]=new Object()
    chatArr[user].unReadMessagesCounter = 0;
    chatArr[user].messages = new Array();
    //create new line in the chat for the user and render to the screen 
    createListForEachUser(user);
    //listen to the user messages and render to the screen
    listenToUser(user);
    if (chatArr[user].unReadMessagesCounter > 0) { //unread messages of the specific user
        updateUserUnreadNotification(user);
    }

});

//this function update the amount of unread messages each user have
//been called everytime a new message arrive (unread: true)
function updateUserUnreadNotification(user) {

    //clear user notifications
    $(`#${user}NotificationSpan`).remove(); //clear users notifications

    if (chatArr[user].unReadMessagesCounter > 0) { //unread messages of the specific user
        $(`#${user}Notification`).append(
            `
                <span id="${user}NotificationSpan" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    ${chatArr[user].unReadMessagesCounter}
                    <span class="visually-hidden">unread messages</span>
                </span>
            `);
    }
}


//add user as a line to the chat window with the users chat seen on the left
function createListForEachUser(user) {

    //random avatar to each user
    //let avatarNum = Math.floor(Math.random() * 8) + 1;
    $("#usersContainer").append(
        `
            <li id="${user}" class="clearfix users" onclick="renderUserMessages(this.id)">
                <div id="${user}Notification" class="position-relative">
                    <img src="../images/user-avatar.png" alt="avatar">
                </div>
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
    unReadMessagesCounter = 0;
    firebase.database().ref(user).on("child_added", snapshot => {

        const message = {
            messageKey: snapshot.key, 
            sender: snapshot.val().sender,
            message: snapshot.val().message,
            messageDate: snapshot.val().messageDate,
            messageTime: snapshot.val().messageTime,
            isRead: snapshot.val().isRead,
        }

        chatArr[user].messages.push(message);

        //if a message from the user currently open on screen has arrived update the chat
        //view to to display the message- purpose is to show real time change in open chat 
        if ($("#activeUserChat").text() == user) {
            addMessage(message);
        }
        else if (message.sender != "manager" && !message.isRead) {
            chatArr[user].unReadMessagesCounter++;
            updateUserUnreadNotification(user);
        }

    });
}

//get user name and render his message to the chat window
function renderUserMessages(user) {
    //set this user to be the active user in the chat
    activeUserInChat = user;

    $("#activeUserChatDetails").removeClass("hide");
    $("#adminMessageBox").removeClass("hide");

    $(".chat-list li").removeClass("active"); //remove class that colors currently active user from all users

    $(`#${user}`).addClass("active");         //add class that colors currently active user to recieved user

    $("#activeChat").html("");       //clear div that displays the chat messages before rendering the users messages to it
    $("#activeUserChat").html(user); //display users name in #activeUserChat div

    //render all users messages to screen
    for (let i = 0; i < chatArr[user].messages.length; i++) {
        addMessage(chatArr[user].messages[i])
    }

    changeAllUserMessagesToseen(user);

    chatArr[user].unReadMessagesCounter = 0; //update users number of unread messages
    updateUserUnreadNotification(user);

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

//function gets a username and changes the isRead field of all the users 
//messgaes to true
function changeAllUserMessagesToseen(username) {
    
    for (let i = 0; i < chatArr[username].messages.length; i++) {
        firebase.database().ref(username).child(chatArr[username].messages[i].messageKey).update({ isRead: true });
    }
}

//Search user by username
function searchUser() {
    let input = document.getElementById('searchText').value
    input = input.toLowerCase();
    let chatUsers = document.getElementsByClassName('users');

    for (i = 0; i < chatUsers.length; i++) {

        //the inputed substring does not match user-hide user
        if (!(chatUsers[i].id.toLowerCase().substring(0, input.length) == input)) {
            chatUsers[i].style.display = "none";
        }
        else { //show user
            chatUsers[i].style.display = "list-item";
        }
    }
}