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

            command.Parameters.AddWithValue("@PropertyType", apartment.PropertyType);
            command.Parameters.AddWithValue("@HostId", apartment.HostId);
            command.Parameters.AddWithValue("@Name", apartment.Name);
            command.Parameters.AddWithValue("@Description", apartment.Description);
            command.Parameters.AddWithValue("@Picture", apartment.Picture);
            command.Parameters.AddWithValue("@Neighborhood", apartment.Neighborhood);
            command.Parameters.AddWithValue("@Latitude", apartment.Latitude);
            command.Parameters.AddWithValue("@Longtitude", apartment.Longitude);
            command.Parameters.AddWithValue("@RoomType", apartment.RoomType);
            command.Parameters.AddWithValue("@Bathrooms", apartment.Bathrooms);
            command.Parameters.AddWithValue("@Bedrooms", apartment.Bedrooms);
            command.Parameters.AddWithValue("@Beds", apartment.Beds);
            command.Parameters.AddWithValue("@Accommodates", apartment.Accommodates);
            command.Parameters.AddWithValue("@Amenities", apartment.Amenities);
            command.Parameters.AddWithValue("@Price", apartment.Price);
            command.Parameters.AddWithValue("@MinNights", apartment.MinNight);
            command.Parameters.AddWithValue("@MaxNights", apartment.MaxNight);
            command.Parameters.AddWithValue("@Rating", apartment.Rating);
            command.Parameters.AddWithValue("@ReviewAccuracy", apartment.ReviewAccuracy);
            command.Parameters.AddWithValue("@ReviewsClean", apartment.ReviewsClean);
            command.Parameters.AddWithValue("@ReviewLocation", apartment.ReviewLocation);


            command.CommandText = "SPInsertApartment";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }

    }
}