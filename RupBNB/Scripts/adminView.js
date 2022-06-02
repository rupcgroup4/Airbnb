$(document).ready(function () {
    
    renderUsersTables();

});
var flag_apartmentView = true;
var flag_hostView = true;

function renderUsersTables() {
    ajaxCall("GET", "../api/Users", "", SCBReadUsers, ECBReadUsers);
}
function renderHostsTables() {
    if (flag_hostView) {
        $('#spinner').css('display', 'block');
        ajaxCall("GET", "../api/Hosts", "", SCBReadHosts, ECBReadHosts);
        flag_hostView = false;
        $("#nav-host-tab").prop('onclick', null);
    }
}
function renderApartmentsTables() {
    if (flag_apartmentView) {
        $('#spinner').css('display', 'block');
        ajaxCall("GET", "../api/Apartments", "", SCBReadApartments, ECBReadApartments);
        flag_apartmentView = false;
        $("#nav-apartment-tab").prop('onclick', null);
        $(document).on("click", ".apartmentIdView", function () {
            let dataApartmentId = this.getAttribute('data-ApartmentId');
            sessionStorage.setItem("apartmentId", `${dataApartmentId}`);
            window.location.replace("seeApart.html");

        });
    }
}
function viewApartment() {

}
// Read users success call back
function SCBReadUsers(usersData) {
    let users = JSON.parse(usersData);
    try {
        tbl = $('#UserTable').DataTable({
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            data: users,
            pageLength: 10,
            columns: [
                { data: "User_Email" },
                {
                    data: "Register_date",
                    render: function (data, type, row, meta) {
                        let dateStr = new Date(data);

                        return dateStr.toLocaleDateString();

                    }

                },
                { data: "Total_rentals" },
                { data: "Total_income" },
                { data: "Total_cancels" }
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
    try {
        tbl = $('#HostTable').DataTable({
            dom: 'Bfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            data: hosts,
            pageLength: 10,
            columns: [
                { data: "HostEmail" },
                {
                    data: "HostSince",
                    render: function (data, type, row, meta) {
                        let dateStr = new Date(data);

                        return dateStr.toLocaleDateString();

                    }

                },
                { data: "Total_rentals" },
                { data: "Total_income" },
                { data: "Total_cancels" }
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
    try {
        tbl = $('#ApartmentTable').DataTable({
            dom: 'Bfrtip',
            buttons: [
                {
                    extend: 'copy',
                    exportOptions: {
                        columns: 'th:not(:last-child)'
                    }
                },
                {
                    extend: 'csv',
                    exportOptions: {
                        columns: 'th:not(:last-child)'
                    }
                },
                {
                    extend: 'excel',
                    exportOptions: {
                        columns: 'th:not(:last-child)'
                    }
                },
                {
                    extend: 'pdf',
                    exportOptions: {
                        columns: 'th:not(:last-child)'
                    }
                },
                {
                    extend: 'print',
                    exportOptions: {
                        columns: 'th:not(:last-child)'
                    }
                }
            ],
            data: apartments,
            pageLength: 10,
            columns: [

                { data: "Apartment_id"},
                { data: "Apartment_name" },
                { data: "Total_rentals" },
                { data: "Total_cancels" },
                {
                    data: "Link_to_apartment",
                    render: function (data, type, row, meta) {
                        let dataApartmentId = "data-apartmentId='" + row.Apartment_id + "'";
                        return `<input type="button" ${dataApartmentId} class="apartmentIdView btn btn-info" value="Watch">`;
                    }
                },
            ],
        });
        $('#spinner').css('display', 'none');
    }
    catch (err) {
        alert(err);
    }
}
// Read users error call back
function ECBReadUsers(error) {
    console.log(error);
}
// Read hosts error call back
function ECBReadHosts(error) {
    console.log(error);
}
// Read apartments error call back
function ECBReadApartments(error) {
    console.log(error);
}