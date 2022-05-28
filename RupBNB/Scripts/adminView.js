$(document).ready(function () {
    
    renderUsersTables();

});
var flag_apartmentView = true;
var flag_hostView = true;


USERdata = [{
    User_Email: "moshe@gmail.com",
    Register_date: "12/12/2002",
    Total_rentals: 10,
    Total_income: 3000,
    Total_cancels: 6
}]
HOSTdata = [{
    Host_Email: "moshe@gmail.com",
    Register_date: "12/12/2002",
    Number_of_apartments: 12,
    Total_income: 2000,
    Total_cancels: 6
}]
APARTMENTdata = [{
    Apartment_id: 2,
    Apartment_name: "Eilat",
    Days_rented:5,
    Total_cancels: 6,
  //  Link_to_apartment: "seeApart.html"
}]
function renderUsersTables() {
    $('#spinner').css('display', 'none');

    SCBReadUsers(USERdata);
   // ajaxCall("GET", "../api/User/ReadUsers", "", SCBReadUsers, ECBReadUsers);
}
function renderHostsTables() {
    if (flag_hostView) {
        $('#spinner').css('display', 'none');

        SCBReadHosts(HOSTdata);
     //   ajaxCall("GET", "../api/Host/ReadHosts", "", SCBReadHosts, ECBReadHosts);

        flag_hostView = false;
        $("#nav-host-tab").prop('onclick', null);
    }
}
function renderApartmentsTables() {
    if (flag_apartmentView) {
        $('#spinner').css('display', 'none');

        SCBReadApartments(APARTMENTdata);
   //     ajaxCall("GET", "../api/Apartment/ReadApartments", "", SCBReadApartments, ECBReadApartments);


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
function SCBReadUsers(users) {
    try {
        tbl = $('#UserTable').DataTable({
            data: users,
            pageLength: 5,
            columns: [
                { data: "User_Email" },
                { data: "Register_date" },
                { data: "Total_rentals" },
                { data: "Total_income" },
                { data: "Total_cancels" }
            ],
        });

        $('#spinner').css('display', 'block');
    }
    catch (err) {
        alert(err);
    }
}
// Read hosts success call back
function SCBReadHosts(hosts) {
    try {
        tbl = $('#HostTable').DataTable({
            data: hosts,
            pageLength: 5,
            columns: [
                { data: "Host_Email" },
                { data: "Register_date" },
                { data: "Number_of_apartments" },
                { data: "Total_income" },
                { data: "Total_cancels" }
            ],
        });
        $('#spinner').css('display', 'block');
    }
    catch (err) {
        alert(err);
    }
}
// Read apartments success call back
function SCBReadApartments(apartments) {
    let apartmentId;
    try {
        tbl = $('#ApartmentTable').DataTable({
            data: apartments,
            pageLength: 5,
            columns: [

                { data: "Apartment_id"},
                { data: "Apartment_name" },
                { data: "Days_rented" },
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
        $('#spinner').css('display', 'block');
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