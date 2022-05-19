using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class Apartment
    {
        int id;
        string propertyType;
        int hostId;
        string name;
        string description;
        string picture;
        string neighborhood;
        string latitude;
        string longitude;
        string roomType;
        string bathrooms;
        int bedrooms;
        int beds;
        int accommodates;
        string amenities;
        int price;
        int minNight;
        int maxNight;
        double rating;
        double reviewAccuracy;
        double reviewsClean;
        double reviewLocation;

        public Apartment(int id, string propertyType, int hostId, string name, string description, string picture, string neighborhood, string latitude, string longitude, string roomType, string bathrooms, int bedrooms, int beds, int accommodates, string amenities, int price, int minNight, int maxNight, double rating, double reviewAccuracy, double reviewsClean, double reviewLocation)
        {
            this.Id = id;
            this.PropertyType = propertyType;
            this.HostId = hostId;
            this.Name = name;
            this.Description = description;
            this.Picture = picture;
            this.Neighborhood = neighborhood;
            this.Latitude = latitude;
            this.Longitude = longitude;
            this.RoomType = roomType;
            this.Bathrooms = bathrooms;
            this.Bedrooms = bedrooms;
            this.Beds = beds;
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

        public Apartment() { }

        public int Id { get => id; set => id = value; }
        public string PropertyType { get => propertyType; set => propertyType = value; }
        public int HostId { get => hostId; set => hostId = value; }
        public string Name { get => name; set => name = value; }
        public string Description { get => description; set => description = value; }
        public string Picture { get => picture; set => picture = value; }
        public string Neighborhood { get => neighborhood; set => neighborhood = value; }
        public string Latitude { get => latitude; set => latitude = value; }
        public string Longitude { get => longitude; set => longitude = value; }
        public string RoomType { get => roomType; set => roomType = value; }
        public string Bathrooms { get => bathrooms; set => bathrooms = value; }
        public int Bedrooms { get => bedrooms; set => bedrooms = value; }
        public int Beds { get => beds; set => beds = value; }
        public int Accommodates { get => accommodates; set => accommodates = value; }
        public string Amenities { get => amenities; set => amenities = value; }
        public int Price { get => price; set => price = value; }
        public int MinNight { get => minNight; set => minNight = value; }
        public int MaxNight { get => maxNight; set => maxNight = value; }
        public double Rating { get => rating; set => rating = value; }
        public double ReviewAccuracy { get => reviewAccuracy; set => reviewAccuracy = value; }
        public double ReviewsClean { get => reviewsClean; set => reviewsClean = value; }
        public double ReviewLocation { get => reviewLocation; set => reviewLocation = value; }
    }
}