﻿using RupBNB.Models.DAL;
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

            command.Parameters.AddWithValue("@propertyType", apartment.PropertyType);
            command.Parameters.AddWithValue("@name", apartment.Name);
            command.Parameters.AddWithValue("@description", apartment.Description);
            command.Parameters.AddWithValue("@img", apartment.Img);
            command.Parameters.AddWithValue("@neighborhood", apartment.Neighborhood);
            command.Parameters.AddWithValue("@latitude", apartment.Latitude);
            command.Parameters.AddWithValue("@longtitude", apartment.Longitude);
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

        public int get12ApartmentSortedByRating(int rowStart, int rowEnd)
        {
            SqlConnection con = SqlConnect.Connect();

            // Create Command
            SqlCommand command = CreateGet12ApartmentSortedByRating(con, rowStart, rowEnd);

            // Execute
            SqlDataReader dr = command.ExecuteReader();

            List<Apartment> apartments = new List<Apartment>();
            while (dr.Read())
            {
                int id = Convert.ToInt32(dr["id"]);
                string propertyType = Convert.ToString(dr["propertyType"]);
                string name = Convert.ToString(dr["name"]);
                string img = Convert.ToString(dr["img"]);
                string neighborhood = Convert.ToString(dr["neighborhood"]);



                "@propertyType", apartment.PropertyType);
                command.Parameters.AddWithValue("@name", apartment.Name);
                command.Parameters.AddWithValue("@description", apartment.Description);
                command.Parameters.AddWithValue("@img", apartment.Img);
                command.Parameters.AddWithValue("@neighborhood", apartment.Neighborhood);
                command.Parameters.AddWithValue("@latitude", apartment.Latitude);
                command.Parameters.AddWithValue("@longtitude", apartment.Longitude);
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
            }
            // Close Connection
            con.Close();

            return 0;

        }

        private SqlCommand CreateGet12ApartmentSortedByRating(SqlConnection con, int rowStart, int rowEnd)
        {

            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@fromRow", rowStart);
            command.Parameters.AddWithValue("@toRow", rowEnd);
           
            command.CommandText = "SP_get12ApartmentsSortedByRating";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }

    }
}