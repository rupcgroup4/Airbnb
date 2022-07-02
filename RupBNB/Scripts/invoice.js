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
    EndDate: "2022-07-02",
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

    myMap(Number(apartment.Latitude), Number(apartment.Longtitude));

    $("#image").attr("src", apartment.Img);
    $("#modalImage").attr("src", apartment.Img); 
    $("#name").append(apartment.Name);
    $("#reservaionNum").append(`Reservation number #${ReservationData.Id}`);

    if (apartment.Description.length > 200) {
        $("#description").prepend(apartment.Description.substring(0, 200));
        $("#more").append(apartment.Description.substring(201));
        $("#readBTN").css("display", "block");
    } else {
        $("#description").prepend(apartment.Description);
        $("#dots").css("display", "none");
        $("#more").css("display", "none");
        $("#readBTN").css("display", "none");
    }

    let difference = new Date(ReservationData.EndDate) - new Date(ReservationData.StartDate);
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    $("#TotalNights").append(TotalDays);
    $("#price").prepend("$" + apartment.Price);
    $("#TotalPrice").prepend("$" + (apartment.Price * TotalDays));
    

    $("#details").append(
        `
            <h3>Details:
            <div class="text-center">
                <h4>${ReservationData.StartDate} - ${ReservationData.EndDate}</h4>
            </div>
            </h3>
        `
    )
    //get host img and more details
    getHostDetails(apartment.HostEmail);
}

function getHostDetails(hostEmail) {

    SCBGetHostDetails(hostData);

    //let qs = "email=" + hostEmail;
    //ajaxCall("GET", `../api/Hosts?${qs}`, "", SCBGetHostDetails, ECBGetHostDetails);
}

function SCBGetHostDetails(host) {

    const isSuperHost = host[0].IsSuperHost != 0 ? '<img class="headerImg" src="../Pages/superHost.png" />' : ""
    const isVerified = host[0].IsVerified != 0 ? '<img class="headerImg" src="../Pages/verified.jpg" />' : ""


    $("#host").append(
        `
            <div class="col">
                <div class="d-flex justify-content-between">
                    <img class="headerImg" src="${host[0].Img}" />
                    <h4>${host[0].FirstName}</h4>
                    ${isSuperHost}
                    ${isVerified}
                </div>
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

//Expand Appartment Description
function expandText() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("readBTN");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Show more";
        moreText.style.display = "none";
    } else {
        dots.style.display = "none";
        btnText.innerHTML = "Show less";
        moreText.style.display = "inline";
    }
}
