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

//when first load the page, we load the first 8 row from the table
let startRow = 1;
let endRow = 8;
//hold apartments locations to show on the map
let locations = []
//indicate if the user make a query with distance parameter
let isDistanceFilter = false;

//scroll handler for web
const divScroll = () => {
    if ($("#cards").scrollTop() + 50 > $("#cardContainer").height() - $("#cards").height()) {

        ajaxCall("POST", "../api/apartmentsRating", JSON.stringify([startRow, endRow]), getApartmentsSCB, getApartmentsECB);
        startRow += 4;
        endRow += 4

    }
}
//scroll handler for mobile
const windowScroll = () => {
    if ($(window).scrollTop() == $(document).height() - $(window).height()) {
        ajaxCall("POST", "../api/apartmentsRating", JSON.stringify([startRow, endRow]), getApartmentsSCB, getApartmentsECB);
        startRow += 4;
        endRow += 4
    }
}

//when document is ready
$(document).ready(function () {

    //first api call to get the first 8 apartemnet to load to the page
    ajaxCall("POST", "../api/apartmentsRating", JSON.stringify([startRow, endRow]), getApartmentsSCB, getApartmentsECB);
    startRow += 8;
    endRow += 4

    //load more data on scroll for web
    $("#cards").scroll(divScroll);

    //load more data on scroll for mobile
    $(window).scroll(windowScroll);


    //update maxUSD span when user move price slider
    $(document).on('input', "#priceRange", () => {
        if($("#priceRange").val() == 0) {

            $("#maxUSD").html("No Max");

        } else {
            
            $("#maxUSD").html("$" + $("#priceRange").val());
        }
        
    });

    //update maxDistance span when user move price slider
    $(document).on('input', "#distanceRange", () => {
        if ($("#distanceRange").val() == 0) {

            $("#maxDistance").html("No Max");
            isDistanceFilter = false;

        } else {

            $("#maxDistance").html($("#distanceRange").val() + "Km");
            isDistanceFilter = true;
        }

    });

    //this function create the date range in the search filter
    createCalander();

});

//failed to get apartment from server
function getApartmentsECB(err) {
    console.log("no more");
}

//get apartemnts from server SCB
//render the apartemnts to the screen
function getApartmentsSCB(apartments) {

    $('#spinner').css('display', 'none');


    for (let i = 0; i < apartments.length; i++) {

        let distanceRounded = Math.round(apartments[i].DistanceToCenterKM * 10) / 10

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
                                <span>${ isDistanceFilter ? "Center: " + distanceRounded + "Km": ""}</span>
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

    let accomodate = $("#accomodate").val();
    if (accomodate == "") {
        alert("not num");
        return;
    }

    let checkIn;
    let checkOut;
    let date = $("#datepicker").val();
    if (date.length > 0) {
        let dates = date.split(" to: ");
        checkIn = new Date(dates[0]);
        checkOut = new Date(dates[1]);

    } else {
        checkIn = new Date("9999-1-1");
        checkOut = new Date("9999-1-1");
    }
    
    let maxPrice = $("#priceRange").val();
    if (maxPrice == 0) {
        maxPrice = 32676;
    }

    let minRating = $("#minRating").val();
    let minRoom = $("#minRoom").val();

    let distanceToCenter = $("#distanceRange").val();
    if (distanceToCenter == 0) {
        distanceToCenter = 50;
    }

    
    let sortBy = $("#sortBy").val();

    if (sortBy == "distanceToCenterKM_D" || sortBy == "distanceToCenterKM_A") {
        isDistanceFilter = true;
    }


    let serachQuery = {
        MaxPrice: maxPrice,
        MinApartmentRating: minRating,
        MinBedrooms: minRoom,
        MaxDistanceToCenter: distanceToCenter,
        StartDate: checkIn,
        EndDate: checkOut,
        OrderByColumn: sortBy
    }


    ajaxCall("POST", "../api/apartmentsSearch", JSON.stringify(serachQuery), apartmentSearchSCB, getApartmentsECB);

    $("#cardContainer").html("");
    $('#spinner').css('display', 'block');

}

function apartmentSearchSCB(apartments) {

    //Should be removed after fix search store procedure to be able to get fromRow and toRow
    $("#cards").off("scroll", divScroll);
    $(window).off("scroll", windowScroll);


    //Change Layout
    $("#cardContainer").removeClass("row-cols-md-4");
    $("#cardContainer").addClass("row-cols-md-2");
    $("#mapContainer").css("display", "block");

    locations = [];
    getApartmentsSCB(apartments);
    $('#spinner').css('display', 'none');

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


function createCalander() {
    //Create date range picker
    const picker = new easepick.create({
        element: "#datepicker",
        css: [
            "https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.0/dist/index.css"
        ],
        zIndex: 10,
        autoApply: false,
        format: "YYYY.MM.DD",
        AmpPlugin: {
            darkMode: false
        },
        RangePlugin: {
            delimiter: " to: ",
            tooltipNumber(num) {
                return num - 1;
            },
            locale: {
                one: 'night',
                other: 'nights',
            },
        },
        LockPlugin: {
            minDate: new Date(),
            minDays: 2,
            selectForward: true
        },
        plugins: [
            "AmpPlugin",
            "RangePlugin",
            "LockPlugin"
        ]
    })
}



