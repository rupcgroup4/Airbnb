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
}
// Read hosts success call back
function SCBReadHosts() {

}
// Read apartments success call back
function SCBReadApartments() {

}