
months = {
    0: "Jan", 1: "Feb", 2: "Mar", 3: "Apr", 4: "May", 5: "Jun",
    6: "Jul", 7: "Aug", 8: "Sep", 9: "Oct", 10: "Nov", 11: "Dec"
};

days = { 0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursaday", 5: "Friday", 6: "Saturday" };

let apartment;

data = [
    {
        Id: 1,
        PropertyType: "Private room in rental unit",
        HostEmail: "Daniel1@gmail.com",
        Name: "Quiet Garden View Room & Super Fast WiFi",
        Description: "Quiet Garden View Room & Super Fast WiFi<br /><br /><b>The space</b><br />I'm renting a bedroom (room overlooking the garden) in my apartment in Amsterdam <br /><br />The room is located to the east of the city centre in a quiet typical Amsterdam neighbourhood the Indische Buurt. Amsterdamâ€™s historic centre is less than 15 minutes away by bike or tram.<br /><br /><br />The features of the room are:<br /><br />- Twin beds (80 x 200 cm down quilts and pillows) <br />- 2 pure cotton towels for each guest <br />- reading lamps<br />- bedside table<br />- wardrobe<br />- table with chairs<br />- tea and coffee making facilities<br />- mini bar<br />- alarm clock<br />- Hi-Fi system with cd player connection for mp3 player / phone<br />- map of Amsterdam and public transport<br />- Wi-Fi Internet connection <br /><br />Extra services:<br /><br />- Bike rental<br /><br /><b>License number</b><br />0363 5F3A 5684 6750 D14D",
        Img: "https://a0.muscache.com/pictures/10272854/8dcca016_original.jpg",
        Neighborhood: "Indische Buurt (Indies Neighborhood) is a neighbourhood in the eastern portion of the city of Amsterdam in the Dutch province of Noord-Holland. The name dates from the early 20th century and is derived from the fact that the neighbourhood's streets ar",
        Latitude: 52.36575,
        Longtitude: 4.94142,
        RoomType: "Private room",
        NumBathrooms: "1.5 shared baths",
        NumBedrooms: 1,
        NumBeds: 2,
        Accommodates: 2,
        Amenities: "Carbon monoxide alarm;Shampoo;Hot water;Wifi;Hair dryer;Extra pillows and blankets;Heating;Bed linens;Fire extinguisher;Long term stays allowed;Essentials;Iron;Smoke alarm;Paid parking on premises;Paid parking off premises;Hangers;Dedicated workspace;Coffe",
        Price: 59,
        MinNights: 3,
        MaxNights: 28,
        Rating: 4.88,
        ReviewAccuracy: 4.93,
        ReviewClean: 5,
        ReviewLocation: 4.68
    }
]
hostData = [
    {
        Email: "Abhishek72@gmail.com",
        UserName: "Abhishek72",
        FirstName: "Abhishek",
        LastName: "Abhishek",
        Password: 12345678,
        BirthDate: "1961-12-01",
        UserRegisteredSince: "2015-08-21",
        HostSince: "2015-08-21",
        Location: "Amsterdam North Holland Netherlands",
        About: "My wife and I are travelers. We travel for work or for vacations. If I can recall correctly we have been to almost 20+ countries till now and lucky to meet people from different cultures and nationalities.",
        ResponseTime: "a few days or more",
        ResponseRate: "25%",
        IsSuperHost: 1,
        Img: "https://a0.muscache.com/im/users/42104065/profile_pic/1440162676/original.jpg?aki_policy=profile_x_medium",
        IsVerified: 1
    }
]
ReservationData = {
    Id: 3,
    StartDate: "2022-07-01",
    EndDate: "2022-07-03",
    ApartmentId: 15,
    UserEmail: "Aafje5@gmail.com",
    IsCanceled: 0
}

$(document).ready(function () {
    //let apartmentId = sessionStorage.getItem("CGroup4_apartmentId");
    //if (apartmentId == undefined) {
    //    window.location.replace("index.html");
    //}
    //ajaxCall("GET", `../api/Apartments/${apartmentId}`, "", SCBGetApartment, ECBGetApartment);
    SCBGetApartment(data[0]);
});


//this function is the success call back of GetApartment
//the response is apartment details that will be render to the screen
function SCBGetApartment(returnApartment) {

    //save apartment in global variable to be able to access to the detials again if needed
    apartment = returnApartment;

    const checkIn = new Date(ReservationData.StartDate);
    const checkOut = new Date(ReservationData.EndDate);

    myMap(Number(apartment.Latitude), Number(apartment.Longtitude));

    $("#image").attr("src", apartment.Img);
    $("#modalImage").attr("src", apartment.Img); 
    $("#name").append(apartment.Name);
    $("#reservaionNum").append(
        `Booking confirmation
        <small>CONFIRMATION NUMBER: #${ReservationData.Id}</small>

    `);


    let difference = checkOut - checkIn;
    const TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    $("#TotalNights").append(TotalDays);
    $("#price").prepend("$" + apartment.Price);
    $("#TotalPrice").prepend("$" + (apartment.Price * TotalDays));




    $("#details").append(
        `
            
             <div class="col">
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="check-in">
                                            <div class="d-flex flex-row align-items-center">
                                                <h1 id="checkInDate">24</h1>
                                                <div class="d-flex flex-column ml-2 date">
                                                    <span id="checkInMonthAndYear">July 20</span>
                                                    <span id="checkInDay">Friday</span>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-column ml-2 date">
                                                <span>Check in</span>
                                                <span>Anytime after 3PM</span>
                                            </div>
                                        </div>


                                        <div class="check-out">
                                            <div class="d-flex flex-row align-items-center">
                                                <h1 id="checkOutDate">25</h1>
                                                <div class="d-flex flex-column ml-2 date">
                                                    <span id="checkOutMonthAndYear">July 20</span>
                                                    <span id="checkOutDay">Friday</span>
                                                </div>
                                            </div>
                                            <div class="d-flex flex-column ml-2 date">
                                                <span>Check out</span>
                                                <span>11AM</span>
                                            </div>

                                        </div>
                                    </div>

                                </div>


        `
    )
    //render date to Modal
    writeDate("checkIn", checkIn);
    writeDate("checkOut", checkOut);
    //get host img and more details
    getHostDetails(apartment.HostEmail);
}
//This function get inOrOut = ["checkIn" or "checkOut"] and a date
//then set the date in the modal accordingly to inOrOut
function writeDate(inOrOut, date) {

    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = days[date.getDay()];

    $(`#${inOrOut}Date`).html(date.getDate())
    $(`#${inOrOut}MonthAndYear`).html(month + " " + year);
    $(`#${inOrOut}Day`).html(day);
}

function getHostDetails(hostEmail) {
    SCBGetHostDetails(hostData);
    //let qs = "email=" + hostEmail;
    //ajaxCall("GET", `../api/Hosts?${qs}`, "", SCBGetHostDetails, ECBGetHostDetails);
}

function SCBGetHostDetails(host) {
    $("#host").append(
        `
            <div class="col">
                <h4>Contact info</h4>
                    <h4>${host[0].UserName} - ${host[0].Email}</h4>
            </div>
        `
    )
}

function ECBGetHostDetails(error) {
    console.log(error);
}

function ECBGetApartment(error) {
    console.log(error);
}


// Initialize and add the map
function myMap(lat, lon) {
    // The location of Uluru
    const location = { lat: lat, lng: lon };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 11,
        center: location,
    });
    // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
        position: location,
        map: map,
    });
}

function initMap() {
    console.log("connect to google map");
}

