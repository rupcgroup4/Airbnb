using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RupBNB.Models.DAL;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace WebApplication1.Models.DAL
{
    public class ApartmentServices
    {

        //Get Apartment Object and insert it as a new row to SQL in Apartments Table
        public int InsertAppartment(Apartment apartment)
        {
            SqlConnection con = SqlConnect.Connect();

            // Create Command
            SqlCommand command = CreateInsertAppartment(con, apartment);

            // Execute
            int numAffected = command.ExecuteNonQuery();

            // Close Connection
            con.Close();

            return numAffected;

        }

        private SqlCommand CreateInsertAppartment(SqlConnection con, Apartment apartment)
        {

            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@propertyType", apartment.PropertyType);
            command.Parameters.AddWithValue("@name", apartment.Name);
            command.Parameters.AddWithValue("@description", apartment.Description);
            command.Parameters.AddWithValue("@img", apartment.Img);
            command.Parameters.AddWithValue("@neighborhood", apartment.Neighborhood);
            command.Parameters.AddWithValue("@latitude", apartment.Latitude);
            command.Parameters.AddWithValue("@longtitude", apartment.Longitude);
            command.Parameters.AddWithValue("@distanceToCenterKM", apartment.DistanceToCenterKM);
            command.Parameters.AddWithValue("@roomType", apartment.RoomType);
            command.Parameters.AddWithValue("@numBathrooms", apartment.NumBathrooms);
            command.Parameters.AddWithValue("@numBedrooms", apartment.NumBedrooms);
            command.Parameters.AddWithValue("@numBeds", apartment.NumBeds);
            command.Parameters.AddWithValue("@accommodates", apartment.Accommodates);
            command.Parameters.AddWithValue("@amenities", apartment.Amenities);
            command.Parameters.AddWithValue("@price", apartment.Price);
            command.Parameters.AddWithValue("@minNights", apartment.MinNight);
            command.Parameters.AddWithValue("@maxNights", apartment.MaxNight);
            command.Parameters.AddWithValue("@rating", apartment.Rating);
            command.Parameters.AddWithValue("@reviewAccuracy", apartment.ReviewAccuracy);
            command.Parameters.AddWithValue("@reviewsClean", apartment.ReviewsClean);
            command.Parameters.AddWithValue("@reviewLocation", apartment.ReviewLocation);


            command.CommandText = "SP_InsertApartment";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }


        //this function get start row and end row
        //use helper function CreateGet12ApartmentSortedByRating() which activated store procedure to get the data from DB
        //return apartemtns object order by rating (from high to low) from start row to end row
        public List<Apartment> getXNumberOfApartmentsSortedByRating(int rowStart, int rowEnd)
        {
            SqlConnection con = SqlConnect.Connect();

            // Create Command
            SqlCommand command = CreateGetXNumberOfApartmentsSortedByRating(con, rowStart, rowEnd);

            // Execute
            SqlDataReader dr = command.ExecuteReader();

            List<Apartment> apartments = new List<Apartment>();
            while (dr.Read())
            {
                int id = Convert.ToInt32(dr["id"]);
                string propertyType = Convert.ToString(dr["propertyType"]);
                string hostEmail = Convert.ToString(dr["hostEmail"]);
                string name = Convert.ToString(dr["name"]);
                string description = Convert.ToString(dr["description"]);
                string img = Convert.ToString(dr["img"]);
                string neighborhood = Convert.ToString(dr["neighborhood"]);
                float latitude = Convert.ToSingle(dr["latitude"]);
                float longtitude = Convert.ToSingle(dr["longtitude"]);
                float distanceToCenterKM = Convert.ToSingle(dr["distanceToCenterKM"]);
                string roomType = Convert.ToString(dr["roomType"]);
                string numBathrooms = Convert.ToString(dr["numBathrooms"]);
                int numBedrooms = Convert.ToInt32(dr["numBedrooms"]);
                int numBeds = Convert.ToInt32(dr["numBeds"]);
                int accommodates = Convert.ToInt32(dr["accommodates"]);
                string amenities = Convert.ToString(dr["amenities"]);
                int price = Convert.ToInt32(dr["price"]);
                int minNight = Convert.ToInt32(dr["minNights"]);
                int maxNight = Convert.ToInt32(dr["maxNights"]);
                float rating = Convert.ToSingle(dr["rating"]);
                float reviewAccuracy = Convert.ToSingle(dr["reviewAccuracy"]); ;
                float reviewsClean = Convert.ToSingle(dr["reviewsClean"]); ;
                float reviewLocation = Convert.ToSingle(dr["reviewLocation"]); ;

                apartments.Add(new Apartment(id, propertyType, hostEmail, name, description,
                    img, neighborhood, latitude, longtitude, distanceToCenterKM, roomType, numBathrooms, numBedrooms,
                    numBeds, accommodates, amenities, price, minNight, maxNight, rating, reviewAccuracy,
                    reviewsClean, reviewLocation));

            }
            // Close Connection
            con.Close();

            return apartments;

        }

        private SqlCommand CreateGetXNumberOfApartmentsSortedByRating(SqlConnection con, int rowStart, int rowEnd)
        {

            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@fromRow", rowStart);
            command.Parameters.AddWithValue("@toRow", rowEnd);
           
            command.CommandText = "SP_getXNumberOfApartmentsSortedByRating";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }

        public Apartment getApartmentById(int apartmentId)
        {
            SqlConnection con = SqlConnect.Connect();

            // Create Command
            SqlCommand command = CreateGetApartmentById(con, apartmentId);

            // Execute
            SqlDataReader dr = command.ExecuteReader();

            Apartment apartment = null;
            while (dr.Read())
            {
                int id = Convert.ToInt32(dr["id"]);
                string propertyType = Convert.ToString(dr["propertyType"]);
                string hostEmail = Convert.ToString(dr["hostEmail"]);
                string name = Convert.ToString(dr["name"]);
                string description = Convert.ToString(dr["description"]);
                string img = Convert.ToString(dr["img"]);
                string neighborhood = Convert.ToString(dr["neighborhood"]);
                float latitude = Convert.ToSingle(dr["latitude"]);
                float longtitude = Convert.ToSingle(dr["longtitude"]);
                float distanceToCenterKM = Convert.ToSingle(dr["distanceToCenterKM"]);
                string roomType = Convert.ToString(dr["roomType"]);
                string numBathrooms = Convert.ToString(dr["numBathrooms"]);
                int numBedrooms = Convert.ToInt32(dr["numBedrooms"]);
                int numBeds = Convert.ToInt32(dr["numBeds"]);
                int accommodates = Convert.ToInt32(dr["accommodates"]);
                string amenities = Convert.ToString(dr["amenities"]);
                int price = Convert.ToInt32(dr["price"]);
                int minNight = Convert.ToInt32(dr["minNights"]);
                int maxNight = Convert.ToInt32(dr["maxNights"]);
                float rating = Convert.ToSingle(dr["rating"]);
                float reviewAccuracy = Convert.ToSingle(dr["reviewAccuracy"]); ;
                float reviewsClean = Convert.ToSingle(dr["reviewsClean"]); ;
                float reviewLocation = Convert.ToSingle(dr["reviewLocation"]); ;

                apartment = new Apartment(id, propertyType, hostEmail, name, description,
                    img, neighborhood, latitude, longtitude, distanceToCenterKM, roomType, numBathrooms, numBedrooms,
                    numBeds, accommodates, amenities, price, minNight, maxNight, rating, reviewAccuracy,
                    reviewsClean, reviewLocation);

            }
            // Close Connection
            con.Close();

            return apartment;

        }

        //This function get Apartment Id and execute store procedure to get the apartment
        private SqlCommand CreateGetApartmentById(SqlConnection con, int apartmentId)
        {

            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@id", apartmentId);

            command.CommandText = "SP_getApartmentById";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }

        public List<Apartment> getApartmentsBySearchFilter(JObject data)
        {

            SqlConnection con = SqlConnect.Connect();

            // Create Command
            SqlCommand command = CreateGetApartmentsBySearchFilter(con, data);

            // Execute
            SqlDataReader dr = command.ExecuteReader();

            List<Apartment> apartments = new List<Apartment>();
            while (dr.Read())
            {
                int id = Convert.ToInt32(dr["id"]);
                string propertyType = Convert.ToString(dr["propertyType"]);
                string hostEmail = Convert.ToString(dr["hostEmail"]);
                string name = Convert.ToString(dr["name"]);
                string description = Convert.ToString(dr["description"]);
                string img = Convert.ToString(dr["img"]);
                string neighborhood = Convert.ToString(dr["neighborhood"]);
                float latitude = Convert.ToSingle(dr["latitude"]);
                float longtitude = Convert.ToSingle(dr["longtitude"]);
                float distanceToCenterKM = Convert.ToSingle(dr["distanceToCenterKM"]);
                string roomType = Convert.ToString(dr["roomType"]);
                string numBathrooms = Convert.ToString(dr["numBathrooms"]);
                int numBedrooms = Convert.ToInt32(dr["numBedrooms"]);
                int numBeds = Convert.ToInt32(dr["numBeds"]);
                int accommodates = Convert.ToInt32(dr["accommodates"]);
                string amenities = Convert.ToString(dr["amenities"]);
                int price = Convert.ToInt32(dr["price"]);
                int minNight = Convert.ToInt32(dr["minNights"]);
                int maxNight = Convert.ToInt32(dr["maxNights"]);
                float rating = Convert.ToSingle(dr["rating"]);
                float reviewAccuracy = Convert.ToSingle(dr["reviewAccuracy"]); ;
                float reviewsClean = Convert.ToSingle(dr["reviewsClean"]); ;
                float reviewLocation = Convert.ToSingle(dr["reviewLocation"]); ;

                apartments.Add(new Apartment(id, propertyType, hostEmail, name, description,
                    img, neighborhood, latitude, longtitude, distanceToCenterKM, roomType, numBathrooms, numBedrooms,
                    numBeds, accommodates, amenities, price, minNight, maxNight, rating, reviewAccuracy,
                    reviewsClean, reviewLocation));

            }
            // Close Connection
            con.Close();

            if (apartments.Count == 0)
            {
                apartments.Add(new Apartment(-1, "", "", "", "",
                    "", "", 0, 0, 0, "", "", 0,
                    0, 0, "", 0, 0, 0, 0, 0,
                    0, 0));
            }




            return apartments;

        }

        private SqlCommand CreateGetApartmentsBySearchFilter(SqlConnection con, JObject data)
        {

            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@maxPrice", Convert.ToInt32(data["MaxPrice"]));
            command.Parameters.AddWithValue("@minApartmentRating", Convert.ToInt32(data["MinApartmentRating"]));
            command.Parameters.AddWithValue("@minBedrooms", Convert.ToInt32(data["MinBedrooms"]));
            command.Parameters.AddWithValue("@maxDistanceToCenterKM", Convert.ToSingle(data["MaxDistanceToCenter"]));
            command.Parameters.AddWithValue("@startDate", Convert.ToDateTime(data["StartDate"]));
            command.Parameters.AddWithValue("@endDate", Convert.ToDateTime(data["EndDate"]));
            command.Parameters.AddWithValue("@orderByColumn", Convert.ToString(data["OrderByColumn"]));

            command.CommandText = "SP_getApartmentsBySearchFilter";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }


        //Admin view apartments information
        private struct apartmentData
        {
            public apartmentData(int apartment_id, string apartment_name, int total_rentals, int total_cancels)
            {
                Apartment_id = apartment_id;
                Apartment_name = apartment_name;
                Total_rentals = total_rentals;
                Total_cancels = total_cancels;

            }
            public int Apartment_id { get; private set; }
            public string Apartment_name { get; private set; }
            public int Total_rentals { get; private set; }
            public int Total_cancels { get; private set; }
        }

        public string GetApartmentsInfo()
        {
            SqlConnection con = SqlConnect.Connect();

            // Create Command
            SqlCommand command = CreateGetApartmentsInfo(con);

            SqlDataReader dr = command.ExecuteReader();

            List<apartmentData> apartmentData = new List<apartmentData>();

            while (dr.Read())
            {
                int id = Convert.ToInt32(dr["id"]); 
                string name = dr["name"].ToString();
                int TotalRentDays = Convert.ToInt32(dr["TotalRentDays"]);
                int TotalCancelations = Convert.ToInt32(dr["TotalCancelations"]);

                apartmentData.Add(new apartmentData(id, name, TotalRentDays, TotalCancelations));

            }
            con.Close();

            return JsonConvert.SerializeObject(apartmentData);

        }

        private SqlCommand CreateGetApartmentsInfo(SqlConnection con)
        {
            SqlCommand command = new SqlCommand();

            command.CommandText = "SP_AdminViewApartmentsInfo";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }

    }
}