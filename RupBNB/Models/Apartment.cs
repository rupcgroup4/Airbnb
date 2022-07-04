using System.Collections.Generic;
using Newtonsoft.Json.Linq;
using RupBNB.Models.DAL;
using WebApplication1.Models.DAL;

namespace WebApplication1.Models
{
    public class Apartment
    {
        //fields
        int id;
        string propertyType;
        Host host;
        string name;
        string description;
        string img;
        string neighborhood;
        float latitude;
        float longitude;
        float distanceToCenterKM;
        string roomType;
        string numBathrooms;
        int numBedrooms;
        int numBeds;
        int accommodates;
        string amenities;
        int price;
        int minNight;
        int maxNight;
        float rating;
        float reviewAccuracy;
        float reviewsClean;
        float reviewLocation;

        //default constructor
        public Apartment() { }

        //constructor only with id
        public Apartment(int id) { Id = id; }

       
        //constructor with all fields
        public Apartment(int id, string propertyType, Host host, string name, string description, string img,
                string neighborhood, float latitude, float longitude, float distanceToCenterKM,
                string roomType, string numBathrooms, int numBedrooms, int numBeds, int accommodates,
                string amenities, int price, int minNight, int maxNight, float rating, float reviewAccuracy,
                float reviewsClean, float reviewLocation)
        {
            this.id = id;
            this.propertyType = propertyType;
            this.host = host;
            this.name = name;
            this.description = description;
            this.img = img;
            this.neighborhood = neighborhood;
            this.latitude = latitude;
            this.longitude = longitude;
            this.distanceToCenterKM = distanceToCenterKM;
            this.roomType = roomType;
            this.numBathrooms = numBathrooms;
            this.numBedrooms = numBedrooms;
            this.numBeds = numBeds;
            this.accommodates = accommodates;
            this.amenities = amenities;
            this.price = price;
            this.minNight = minNight;
            this.maxNight = maxNight;
            this.rating = rating;
            this.reviewAccuracy = reviewAccuracy;
            this.reviewsClean = reviewsClean;
            this.reviewLocation = reviewLocation;
        }

        //constructor for apartments view in index.html
        public Apartment(int id, string name, string img, float latitude,
            float longitude, float distanceToCenterKM, int price, int minNight, float rating)
        {
            this.Id = id;
            this.Name = name;
            this.Img = img;
            this.Latitude = latitude;
            this.Longitude = longitude;
            this.DistanceToCenterKM = distanceToCenterKM;
            this.Price = price;
            this.MinNight = minNight;
            this.Rating = rating;
        }
        //constructor for apartments view in profiePage.html
        public Apartment(int id, string name, string img)
        {
            this.Id = id;
            this.Name = name;
            this.Img = img;
        }

        

        //properties
        public int Id { get => id; set => id = value; }
        public string PropertyType { get => propertyType; set => propertyType = value; }
        public string Name { get => name; set => name = value; }
        public string Description { get => description; set => description = value; }
        public string Img { get => img; set => img = value; }
        public string Neighborhood { get => neighborhood; set => neighborhood = value; }
        public float Latitude { get => latitude; set => latitude = value; }
        public float Longitude { get => longitude; set => longitude = value; }
        public float DistanceToCenterKM { get => distanceToCenterKM; set => distanceToCenterKM = value; }
        public string RoomType { get => roomType; set => roomType = value; }
        public string NumBathrooms { get => numBathrooms; set => numBathrooms = value; }
        public int NumBedrooms { get => numBedrooms; set => numBedrooms = value; }
        public int NumBeds { get => numBeds; set => numBeds = value; }
        public int Accommodates { get => accommodates; set => accommodates = value; }
        public string Amenities { get => amenities; set => amenities = value; }
        public int Price { get => price; set => price = value; }
        public int MinNight { get => minNight; set => minNight = value; }
        public int MaxNight { get => maxNight; set => maxNight = value; }
        public float Rating { get => rating; set => rating = value; }
        public float ReviewAccuracy { get => reviewAccuracy; set => reviewAccuracy = value; }
        public float ReviewsClean { get => reviewsClean; set => reviewsClean = value; }
        public float ReviewLocation { get => reviewLocation; set => reviewLocation = value; }
        public Host Host { get => host; set => host = value; }


        //return Apartments object order by rating (from high to low) from start row to end row
        public List<Apartment> getXNumberOfApartmentsSortedByRating(int rowStart, int rowEnd)
        {
            ApartmentServices ds = new ApartmentServices();
            return ds.getXNumberOfApartmentsSortedByRating(rowStart, rowEnd);
        }

        //method gets apartments id and returns an apartment matching the id if found, else null
        public Apartment getApartmentById(int id)
        {
            ApartmentServices ds = new ApartmentServices();
            return ds.getApartmentById(id);
        }

        //method gets a JObject with the search filters data
        //method return a list of apartments (with only the relavent fields having meaningful values) after filtering 
        public List<Apartment> getApartmentsBySearchFilter(JObject data)
        {
            ApartmentServices ds = new ApartmentServices();
            return ds.getApartmentsBySearchFilter(data);
        }

        //Admin view apartments information
        public string AdminViewApartmentsInfo()
        {
            AdminServices ds = new AdminServices();
            return ds.GetApartmentsInfo();
        }
    }
}