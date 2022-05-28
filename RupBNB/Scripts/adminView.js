$(document).ready(function () {
    renderUsersTables();
});
var flag_apartmentView = true;
var flag_hostView = true;

function renderUsersTables() {
    ajaxCall("GET", "../api/Products/ReadUsers", "", SCBReadUsers, ECBReadUsers);
}
function renderHostsTables() {
    if (flag_hostView) {
        ajaxCall("GET", "../api/Products/ReadHosts", "", SCBReadHosts, ECBReadHosts);
        flag_hostView = false;
        $("#nav-host-tab").prop('onclick', null);
    }
}
function renderApartmentsTables() {
    if (flag_apartmentView) {
        ajaxCall("GET", "../api/Products/ReadApartments", "", SCBReadApartments, ECBReadApartments);
        flag_apartmentView = false;
        $("#nav-apartment-tab").prop('onclick', null);
    }
}
// Read users success call back
function SCBReadUsers(users) {
    try {
        tbl = $('#UserTable').DataTable({
            data: users,
            pageLength: 5,
            columns: [
                { data: "Register date" },
                { data: "Total rentals" },
                { data: "Total income" },
                { data: "Total cancels" }
            ],
        });
    }
    catch (err) {
        alert(err);
    }
}
// Read hosts success call back
function SCBReadHosts() {
    try {
        tbl = $('#HostTable').DataTable({
            data: users,
            pageLength: 5,
            columns: [
                { data: "Register date" },
                { data: "Number of apartments" },
                { data: "Total income" },
                { data: "Total cancels" }
            ],
        });
    }
    catch (err) {
        alert(err);
    }
}
// Read apartments success call back
function SCBReadApartments() {
    try {
        tbl = $('#ApartmentTable').DataTable({
            data: users,
            pageLength: 5,
            columns: [
                { data: "Days rented" },
                { data: "Total cancels" }
            ],
        });
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