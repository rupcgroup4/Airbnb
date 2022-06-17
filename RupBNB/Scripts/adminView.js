$(document).ready(function () {
    
    renderUsersTables();

});
var flag_apartmentView = true;
var flag_hostView = true;

function renderUsersTables() {
    let qs = "type=usersView";
    ajaxCall("GET", `../api/Admin?${qs}`, "", SCBReadUsers, ECBReadUsers);
}
function renderHostsTables() {
    if (flag_hostView) {
        $('#spinner').css('display', 'block');

        let qs = "type=hostsView";
        ajaxCall("GET", `../api/Admin?${qs}`, "", SCBReadHosts, ECBReadHosts);

        flag_hostView = false;
        $("#nav-host-tab").prop('onclick', null);
    }
}
function renderApartmentsTables() {
    if (flag_apartmentView) {
        $('#spinner').css('display', 'block');

        let qs = "type=apartmentsView";
        ajaxCall("GET", `../api/Admin?${qs}`, "", SCBReadApartments, ECBReadApartments);
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
                    //exportOptions: {
                    //    columns: 'th:not(:last-child)'
                    //}
                },
                {
                    extend: 'csv',
                    title: fileName,
                    //exportOptions: {
                    //    columns: 'th:not(:last-child)'
                    //}
                },
                {
                    extend: 'excel',
                    title: fileName,
                    //exportOptions: {
                    //    columns: 'th:not(:last-child)'
                    //}
                },
                {
                    extend: 'pdf',
                    title: fileName,
                    //exportOptions: {
                    //    columns: 'th:not(:last-child)'
                    //}
                },
                {
                    extend: 'print',
                    title: fileName,
                    //exportOptions: {
                    //    columns: 'th:not(:last-child)'
                    //}
                }
            ],

            columns: [
                { data: "Apartment_id"},
                { data: "Apartment_name" },
                { data: "Total_rentals" },
                { data: "Total_cancels" }
                //{
                //    render: function (data, type, row, meta) {
                //        let dataApartmentId = "data-apartmentId='" + row.Apartment_id + "'";
                //        return `<input type='button' ${dataApartmentId} class='apartmentIdView btn btn-outline-success' value="Watch">`;
                //    },
                //},
            ],

        });
        $('#spinner').css('display', 'none');
    }
    catch (err) {
       alert(err);
    }
}
// Read users error call back
function ECBReadUsers(err) {
    sessionStorage.setItem("CGroup4_errorMessage", err.responseText);
    window.location.replace("notFound.html");
}
// Read hosts error call back
function ECBReadHosts(err) {
    sessionStorage.setItem("CGroup4_errorMessage", err.responseText);
    window.location.replace("notFound.html");
}
// Read apartments error call back
function ECBReadApartments(err) {
    sessionStorage.setItem("CGroup4_errorMessage", err.responseText);
    window.location.replace("notFound.html");
}



//**********************Chat********************************

let activeUserInChat;

let chatArr = [];

function sendMessage() {

    let message = $("#newMessage").val();
    $("#newMessage").val("");

    if (activeUserInChat == undefined) {
        return;
    }

    firebase.database().ref(activeUserInChat).push().set({
        "sender": "manager",
        "message": message
    })

}

//listen to DB for all users
firebase.database().ref().on("child_added", snapshot => {
    const user = snapshot.key;
    chatArr[user] = new Array();
    //create new line in the accordion for the user and render to the screen
    createListForEachUser(user);
    //listen to the user messages and render to the screen
    listenToUser(user);

});


//create new accordion line for user
function createListForEachUser(user) {

    $("#usersContainer").append(

        `
             <li id="${user}" class="clearfix" onclick="renderUserMessages(this.id)">
                 <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar">
                 <div class="about">
                    <div class="name">${user}</div>
                    <div class="status"> <i class="fa fa-circle offline"></i>Offline</div>                                            
                </div>
            </li>
        `
    )

}

//listen to a specific user and add his mesages to the chat
function listenToUser(user) {

    firebase.database().ref(user).on("child_added", snapshot => {

        const message = {
            sender: snapshot.val().sender,
            message: snapshot.val().message
        }

        chatArr[user].push(message);

        if ($("#activeUserChat").text() == user) {
            addMessage(message);
        }

    });
}

function renderUserMessages(user) {

    activeUserInChat = user;

    $(".chat-list li").removeClass("active");

    $(`#${user}`).addClass("active");


    $("#activeChat").html("");
    $("#activeUserChat").html(user);

    for (let i = 0; i < chatArr[user].length; i++) {


        addMessage(chatArr[user][i])

    }

}

function addMessage(message) {

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
}