months = {0: "Jan", 1: "Feb", 2: "Mar", 3: "Apr", 4: "May", 5: "Jun",
            6: "July", 7: "Aug", 8: "Sep", 9: "Oct", 10: "Nov", 11: "Dec"};

days = {0: "Sunday", 1: "Monday", 2: "Tuesday", 3: "Wednesday", 4: "Thursaday", 5: "Friday", 6: "Saturday"};

let apartment;

data = [
    {
        Id: 1, 
        PropertyType: "Private room in rental unit" , 
        HostEmail: "Daniel1@gmail.com" , 
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

//before window unload clear CGroup4_blockReservation from session storage
window.onbeforeunload = function () {
    sessionStorage.removeItem("CGroup4_blockReservation");
}

$(document).ready(function () {

    let apartmentId = sessionStorage.getItem("CGroup4_apartmentId");
    if (apartmentId == undefined) {
        window.location.replace("index.html");
    }

   
    if (sessionStorage.getItem("CGroup4_blockReservation") != undefined) {
        $("#reserve").removeClass("d-flex");
        $("#reserve").css("display", "none");
    }

    
    ajaxCall("GET", `../api/Apartments/${apartmentId}`, "", SCBGetApartment, ECBGetApartment);


    //when user press on confirm reservation
    $(document).on("click", "#makeReservation", () => {
        makeReservation();
    })

    //event to change date in modal when checkIn datePicker change
    $("#checkInDatePicker").change(function() {
        let checkInDate = new Date($(this).val());
        writeDateInModal("checkIn", checkInDate);
    });

    //event to change date in modal when checkOut datePicker change
    $("#checkOutDatePicker").change(function() {
        let checkOutDate = new Date($(this).val());
        let checkInDate = new Date($("#checkInDatePicker").val());

        //check if check out is bigger than check out date
        if (checkOutDate <= checkInDate) {
            alert("err");
            //set check out date to be 1 day after check in
            checkOutDate = new Date(checkInDate);
            checkOutDate.setDate(checkOutDate.getDate() + 1);
            //conver check out date to string format for date input
            checkOutDateString = checkOutDate.toISOString().split('T')[0];
            $(this).val(checkOutDateString)
        } 

        writeDateInModal("checkOut", checkOutDate);
        
    });


    // Temporary, will get the date from search filter later
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    $("#checkInDatePicker").val(todayString);
    writeDateInModal("checkIn", today);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowString = tomorrow.toISOString().split('T')[0];
    $("#checkOutDatePicker").val(tomorrowString);
    writeDateInModal("checkOut", tomorrow);
    

});

function SCBGetApartment(returnApartment) {

    apartment = returnApartment;

    myMap(Number(apartment.Latitude), Number(apartment.Longitude));
    

    $("#image").attr("src", apartment.Img);
    $("#modalImage").attr("src", apartment.Img);
    $("#name").append(apartment.Name);
    $("#description").prepend(apartment.Description.substring(0, 200));
    $("#more").append(apartment.Description.substring(201))
    $("#price").prepend("$" + apartment.Price);

    $("#details").append(
        `
            <div class="col text-center">
                <i class="fas fa-bed fa-2x"></i>
                <h4>${apartment.NumBeds}</h4>
            </div>

            <div class="col text-center">
                <i class="fa-solid fa-person fa-2x"></i>
                <h4>${apartment.NumBeds}</h4>
            </div>

            <div class="col text-center">
                <i class="fa-solid fa-star fa-2x"></i>
                <h4>${apartment.Rating}</h4>
            </div>

            <div class="col text-center">
                <i class="fa-solid fa-broom fa-2x"></i>
                <h4>${apartment.ReviewClean != undefined ? apartment.ReviewClean : 0}</h4>
            </div>
            <div class="col text-center">
                <i class="fa-solid fa-location-pin fa-2x"></i>
                <h4>${apartment.ReviewLocation}</h4>
            </div>
        `
    )
    let am = JSON.parse(apartment.Amenities);

    for (let i = 0; i < am.length; i++) {
        $("#ameneties")
            .append(
                `
                <div class="col">
                    <h6>
                        <span class="badge bg-secondary">${am[i]}</span>
                    </h6>
                </div>
            `
            );
    }

    //calculate total price of current dates with apartment price
    calculatePrice();
}

function ECBGetApartment(error) {
    console.log(error);
}


function makeReservation() {
    let startDate = new Date($("#checkInDatePicker").val());
    let endDate = new Date($("#checkOutDatePicker").val());
    let apartmentId = sessionStorage.getItem("apartmentId");

    //**********Need to be real email of the user from local storage*************
    let userEmail = "Abhishek72@gmail.com";

    let res = {
        Id: 0,
        StartDate: startDate,
        EndDate: endDate,
        ApartmentId: apartmentId,
        UserEmail: userEmail,
        IsCanceled: 0
    }


    ajaxCall("POST", "../api/Reservations", JSON.stringify(res), makeReservationSCB, makeReservationECB);

}


function makeReservationSCB(response) {
    console.log(response)
}

function makeReservationECB(err) {
    console.log(err)
}


// Initialize and add the map
function myMap(lat, lon) {
    // The location of Uluru
    const location = { lat: lat, lng: lon};
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

function initMap(){
    console.log("connect to google map");
}

//Expand Appartment Description
function expandText() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("readBTN");
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less";
      moreText.style.display = "inline";
    }
}


//This function get inOrOut = ["checkIn" or "checkOut"] and a date
//then set the date in the modal accordingly to inOrOut
function writeDateInModal(inOrOut, date) {

    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = days[date.getDay()];

    $(`#${inOrOut}Date`).html(date.getDate())
    $(`#${inOrOut}MonthAndYear`).html(month + " " + year);
    $(`#${inOrOut}Day`).html(day);


    calculatePrice();
}


//This function calculate the total price based on the check in and check out dates
// and the price per night of the apartment
function calculatePrice() {

    if(apartment === undefined) {
        return;
    }
    const price = apartment.Price;

    
    const checkIn = new Date($("#checkInDatePicker").val());
    const checkOut = new Date($("#checkOutDatePicker").val());

    const diffTime = Math.abs(checkOut - checkIn);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    $("#priceXnight").html(`$${price} x ${diffDays} nights`);
    $("#totalprice").html(`$${price * diffDays}`);

}
