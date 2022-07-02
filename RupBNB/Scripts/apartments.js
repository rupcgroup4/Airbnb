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

//hold apartments locations to show on the map
let locations = []
//indicate if the user make a query with distance parameter
let isDistanceFilter = false;

//boolean indicating wether the apartments on display where are only from the first search(only 12 first appartments)
let firstLoadApartments = true;

//scroll handler for web
const divScroll = () => {
    if ($("#cards").scrollTop() + 50 > $("#cardContainer").height() - $("#cards").height()) {

        ajaxCall("POST", "../api/apartmentsSearch", JSON.stringify(serachQuery), getApartmentsSCB, getApartmentsECB);
        serachQuery.FromRow += 8;
        serachQuery.ToRow += 8;
        console.log("from scroll web");

    }
}
//scroll handler for mobile
const windowScroll = () => {
    if ($(window).scrollTop() == $(document).height() - $(window).height()) {
        ajaxCall("POST", "../api/apartmentsSearch", JSON.stringify(serachQuery), getApartmentsSCB, getApartmentsECB);
        serachQuery.FromRow += 8;
        serachQuery.ToRow += 8;
        console.log("from scroll mobile");

    }
}

//default query to show apartments on load
let serachQuery = {
    MaxPrice: 32676,
    MinApartmentRating: 1,
    MinBedrooms: 0,
    MaxDistanceToCenter: 50,
    StartDate: "9999-1-1",
    EndDate: "9999-1-2", //default
    OrderByColumn: "price_D",
    FromRow: 1,
    ToRow: 12,
}
//when document is ready
$(document).ready(function () {

    


    //first api call to get the first 8 apartemnet to load to the page
    ajaxCall("POST", "../api/apartmentsSearch", JSON.stringify(serachQuery), getApartmentsSCB, getApartmentsECB);
    serachQuery.FromRow += 8;
    serachQuery.ToRow += 4

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
    sessionStorage.setItem("CGroup4_errorMessage", err.responseText);
    window.location.replace("notFound.html");

}

//get apartemnts from server SCB
//render the apartemnts to the screen
function getApartmentsSCB(apartments) {

    $('#spinner').css('display', 'none'); //display loading sign while waiting for apartments

    //no apartments matching the search filters found and it is not because of scroll
    if (!apartments && firstLoadApartments) {
        console.log("no apartments");
        $("#cardContainer")
            .append("<h3> NO APARTMENTS FOUND </h3>");
        return;
    }
    //no more apartments found after scroll
    else if (!apartments) { //for scroll
        console.log("no more..");
        $("#cards").off('scroll', divScroll);
        $(window).off('scroll', windowScroll);

        return;
    }
    //found apartments
    firstLoadApartments = false;
    console.log(apartments);
        for (let i = 0; i < apartments.length; i++) {

            let distanceRounded = Math.round(apartments[i].DistanceToCenterKM * 10) / 10

            $("#cardContainer")
                .append(
                    `
                <div class="col mt-3">
                    <div onclick="seeApart(${apartments[i].Id}, ${apartments[i].MinNight})" class="card h-100">
                        <div>
                            <img src="${apartments[i].Img}" class="card-img-top img-apartment">
                        </div>
                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <span><b><i class="fa-solid fa-star"></i> </b> ${apartments[i].Rating} </span>  
                                <span><b>$</b>${apartments[i].Price}<span style="font-weight: 300;"> night</span></span>
                            </div>
                            <div class="apartName">
                                <span>${ isDistanceFilter ? "Center: " + distanceRounded + "Km" : ""}</span>
                                <h6 class="card-title">${apartments[i].Name}</h6>
                            </div>
                           
                        </div>
                    </div>
                </div>
            `
                )

            locations.push({ lat: apartments[i].Latitude, lon: apartments[i].Longitude });
        }

        myMap(locations);
    
}


//search apartment
function search() {
    console.log("in search1");
    firstLoadApartments = true;

    //load more data on scroll for web
    $("#cards").scroll(divScroll);

    //load more data on scroll for mobile
    $(window).scroll(windowScroll);

    let accomodate = $("#accomodate").val();
    if (accomodate == "") { //accomadte is type number- handles case of keyboard interferce
        accomodate = 1; //default 
    }

    let checkIn;
    let checkOut;
    let date = $("#datepicker").val();
    if (date.length > 0) {
        let dates = date.split(" to: ");
        checkIn = dates[0].split(".");
        checkIn = checkIn[2] + "." + checkIn[1] + "." + checkIn[0]
        checkOut = dates[1].split(".");
        checkOut = checkOut[2] + "." + checkOut[1] + "." + checkOut[0]

    } else {    //no dates were picked
        checkIn = "9999-1-1";
        checkOut = "9999-1-2";
    }
    
    let maxPrice = $("#priceRange").val();
    if (maxPrice == 0) {
        maxPrice = 32676;   //default
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

    serachQuery = {
        MaxPrice: maxPrice,
        MinApartmentRating: minRating,
        MinBedrooms: minRoom,
        Accommodates: accomodate,
        MaxDistanceToCenter: distanceToCenter,
        StartDate: checkIn,
        EndDate: checkOut,
        OrderByColumn: sortBy,
        FromRow: 1,
        ToRow: 8,
    }


    ajaxCall("POST", "../api/apartmentsSearch", JSON.stringify(serachQuery), apartmentSearchSCB, getApartmentsECB);
    console.log("in search");
    $("#cardContainer").html("");
    $('#spinner').css('display', 'block');

}

function apartmentSearchSCB(apartments) {


    let isMobile = false; //initiate as false
    // device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
        isMobile = true;
    }

    // if its mobile device, the layout wont change after change
    //no show the map on search in mobile devices
    if (!isMobile) {
        //Change Layout
        $("#cardContainer").removeClass("row-cols-lg-4");
        $("#cardContainer").removeClass("row-cols-md-3");
        $("#cardContainer").addClass("row-cols-md-2");
        $("#mapContainer").css("display", "block");
    }


    locations = [];
    getApartmentsSCB(apartments);
    $('#spinner').css('display', 'none');

}


//This function called when press "See Details" on Apartment
function seeApart(apartmentId, minNight) {
    sessionStorage.setItem("CGroup4_apartmentId", apartmentId);
    sessionStorage.setItem("CGroup4_minNight", minNight);

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
        format: "DD.MM.YYYY",
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



