using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication1.Models.DAL;

namespace WebApplication1.Models
{
    public class Apartment
    {
        int id;
        string propertyType;
        string hostEmail;
        string name;
        string description;
        string img;
        string neighborhood;
        float latitude;
        float longitude;
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

        public Apartment() { }

        public Apartment(int id, string propertyType, string hostEmail, string name, 
            string description, string img, string neighborhood, float latitude,
            float longitude, string roomType, string numBathrooms, int numBedrooms,
            int numBeds, int accommodates, string amenities, int price, int minNight,
            int maxNight, float rating, float reviewAccuracy, float reviewsClean,
            float reviewLocation)
        {
            this.Id = id;
            this.PropertyType = propertyType;
            this.HostEmail = hostEmail;
            this.Name = name;
            this.Description = description;
            this.Img = img;
            this.Neighborhood = neighborhood;
            this.Latitude = latitude;
            this.Longitude = longitude;
            this.RoomType = roomType;
            this.NumBathrooms = numBathrooms;
            this.NumBedrooms = numBedrooms;
            this.NumBeds = numBeds;
            this.Accommodates = accommodates;
            this.Amenities = amenities;
            this.Price = price;
            this.MinNight = minNight;
            this.MaxNight = maxNight;
            this.Rating = rating;
            this.ReviewAccuracy = reviewAccuracy;
            this.ReviewsClean = reviewsClean;
            this.ReviewLocation = reviewLocation;
        }

        public int Id { get => id; set => id = value; }
        public string PropertyType { get => propertyType; set => propertyType = value; }
        public string HostEmail { get => hostEmail; set => hostEmail = value; }
        public string Name { get => name; set => name = value; }
        public string Description { get => description; set => description = value; }
        public string Img { get => img; set => img = value; }
        public string Neighborhood { get => neighborhood; set => neighborhood = value; }
        public float Latitude { get => latitude; set => latitude = value; }
        public float Longitude { get => longitude; set => longitude = value; }
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



        //return apartemtns object order by rating (from high to low) from start row to end row
        public List<Apartment> get12ApartmentSortedByRating(int rowStart, int rowEnd)
        {
            ApartmentServices ds = new ApartmentServices();
            return ds.get12ApartmentSortedByRating(rowStart, rowEnd);
        }
        public Apartment getApartmentById(int id)
        {
            ApartmentServices ds = new ApartmentServices();
            return ds.getApartmentById(id);
        }

        //Admin view apartments information
        public string AdminViewApartmentsInfo()
        {
            ApartmentServices ds = new ApartmentServices();
            return ds.GetApartmentsInfo();
        }
    }
}