apartments = [
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
        MinNights: 28,
        Rating: 4.88,
        ReviewAccuracy: 4.93,
        ReviewClean: 5,
        ReviewLocation: 4.68
    },
    {
        Id: 1, 
        PropertyType: "Private room in rental unit" , 
        HostEmail: "Daniel1@gmail.com" , 
        Name: "Cozy apartment in de Pijp", 
        Description: "Quiet Garden View Room & Super Fast WiFi<br /><br /><b>The space</b><br />I'm renting a bedroom (room overlooking the garden) in my apartment in Amsterdam <br /><br />The room is located to the east of the city centre in a quiet typical Amsterdam neighbourhood the Indische Buurt. Amsterdamâ€™s historic centre is less than 15 minutes away by bike or tram.<br /><br /><br />The features of the room are:<br /><br />- Twin beds (80 x 200 cm down quilts and pillows) <br />- 2 pure cotton towels for each guest <br />- reading lamps<br />- bedside table<br />- wardrobe<br />- table with chairs<br />- tea and coffee making facilities<br />- mini bar<br />- alarm clock<br />- Hi-Fi system with cd player connection for mp3 player / phone<br />- map of Amsterdam and public transport<br />- Wi-Fi Internet connection <br /><br />Extra services:<br /><br />- Bike rental<br /><br /><b>License number</b><br />0363 5F3A 5684 6750 D14D", 
        Img: "https://a0.muscache.com/pictures/10272854/8dcca016_original.jpg", 
        Neighborhood: "Indische Buurt (Indies Neighborhood) is a neighbourhood in the eastern portion of the city of Amsterdam in the Dutch province of Noord-Holland. The name dates from the early 20th century and is derived from the fact that the neighbourhood's streets ar",
        Latitude: 52.4,
        Longtitude: 4.9,
        RoomType: "Private room",
        NumBathrooms: "1.5 shared baths",
        NumBedrooms: 1,
        NumBeds: 2,
        Accommodates: 2,
        Amenities: "Carbon monoxide alarm;Shampoo;Hot water;Wifi;Hair dryer;Extra pillows and blankets;Heating;Bed linens;Fire extinguisher;Long term stays allowed;Essentials;Iron;Smoke alarm;Paid parking on premises;Paid parking off premises;Hangers;Dedicated workspace;Coffe",
        Price: 59,
        MinNights: 3,
        MinNights: 28,
        Rating: 4.88,
        ReviewAccuracy: 4.93,
        ReviewClean: 5,
        ReviewLocation: 4.68
    }

]

let startRow = 1;
let endRow = 8;
let locations = []
let isDistanceFilter = false;

$(document).ready(function () {
    //getApartmentsSCB();
    ajaxCall("POST", "../api/apartmentsRating", JSON.stringify([startRow, endRow]), getApartmentsSCB, getApartmentsECB);
    startRow += 8;
    endRow += 4




    //load more data on scroll for web
    $("#cards").scroll( () => {
        if ($("#cards").scrollTop() + 50 > $("#cardContainer").height() - $("#cards").height()) {

            ajaxCall("POST", "../api/apartmentsRating", JSON.stringify([startRow, endRow]), getApartmentsSCB, getApartmentsECB);
            startRow += 4;
            endRow += 4
        
        }
    });


    //load more data on scroll for mobile
    $(window).scroll( () => {
        if ($(window).scrollTop() == $(document).height() - $(window).height()) {
            ajaxCall("POST", "../api/apartmentsRating", JSON.stringify([startRow, endRow]), getApartmentsSCB, getApartmentsECB);
            startRow += 4;
            endRow += 4
        }
    });

    
    $(document).on('input', "#priceRange", () => {
        if($("#priceRange").val() == 0) {

            $("#maxUSD").html("No Max");

        } else {
            
            $("#maxUSD").html("$" + $("#priceRange").val());
        }
        
    });


    $(document).on('input', "#distanceRange", () => {
        if ($("#distanceRange").val() == 0) {

            $("#maxDistance").html("No Max");
            isDistanceFilter = false;

        } else {

            $("#maxDistance").html($("#distanceRange").val() + "Km");
            isDistanceFilter = true;
        }

    });

});


function getApartmentsECB(err) {
    console.log("no more");
}

function getApartmentsSCB(apartments) {

    for (let i = 0; i < apartments.length; i++) {
        
        $("#cardContainer")
            .append(
                `
                <div class="col">
                    <div onclick="seeApart(${apartments[i].Id})" class="card h-100">
                        <div>
                            <img src="${apartments[i].Img}" class="card-img-top img-apartment">
                        </div>
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <span><b><i class="fa-solid fa-star"></i> </b> ${apartments[i].Rating} </span>  
                                <span><b>$</b>${apartments[i].Price}<span style="font-weight: 300;"> night</span></span>
                            </div>
                            <div class="apartName">
                                <span>${ isDistanceFilter ? "Center: " + apartments[i].DistanceToCenterKM + "Km": ""}</span>
                                <h6 class="card-title">${apartments[i].Name}</h6>
                            </div>
                           
                        </div>
                    </div>
                </div>
            `
        )

        locations.push({lat: apartments[i].Latitude , lon: apartments[i].Longitude});
    }

    myMap(locations);
  
}


//search apartment
function search() {


    let checkInDate = new Date ($("#checkIn").val());
    let checkOutDate = new Date ($("#checkOut").val());

    if (checkDates(checkInDate, checkOutDate)) {
        return;
    }

    $("#cardContainer").removeClass("row-cols-md-4");
    $("#cardContainer").addClass("row-cols-md-2");

    $("#mapContainer").css("display", "block");


    let maxPrice = $("#priceRange").val();
    let minRating = $("#minRating").val();
    let minRoom = $("#minRoom").val();
    let distanceToCenter = $("#distanceRange").val();
    let accomodate = $("#accomodate").val();
    let sortBy = $("#sortBy").val();

    if (maxPrice == 0) {
        maxPrice = 32767;
    }


}

function checkDates() {



    

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



//This function called when press "See Details" on Apartment
function seeApart(apartmentId) {
    sessionStorage.setItem("apartmentId", apartmentId);
    window.location.href = "seeApart.html";
}




// Initialize and add the map
function myMap(locations) {
    // The location of Uluru
    const location = { lat: apartments[0].Latitude, lng: apartments[0].Longtitude };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: location,
    });
    // The marker, positioned at Uluru
    for( let i = 0; i < locations.length; i++) {
        const marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i].lat, locations[i].lon),
            map: map,
        });
    }
    
}

//return function from google
//print to console when connect success
function initMap() { 
    console.log("connect to google map"); 
}




