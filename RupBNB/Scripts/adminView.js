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