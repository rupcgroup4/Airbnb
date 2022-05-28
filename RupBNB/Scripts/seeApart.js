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

$(document).ready(function () {
    let apartmentId = sessionStorage.getItem("apartmentId");
    let qs = "apartmentId=" + apartmentId;
    
    ajaxCall("GET", `../api/Apartments/${apartmentId}`, "", SCBGetApartment, ECBGetApartment);

});
function SCBGetApartment(apartment) {

    initMap(Number(apartment.Latitude), Number(apartment.Longtitude));
    

    $("#image").attr("src", apartment.Img);
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
                <h4>${apartment.ReviewClean}</h4>
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
}
function ECBGetApartment(error) {
    console.log(error);
}
// Initialize and add the map
function initMap(Latitude, Longtitude) {
    // The location of Uluru
    const location = { lat: Latitude, lng: Longtitude };
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