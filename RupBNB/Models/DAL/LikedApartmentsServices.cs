using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using WebApplication1.Models;

namespace RupBNB.Models.DAL
{
    public class LikedApartmentsServices
    {
        //Insert Liked Apartment
        public bool LikedApartmentProcedure(LikedApartment la, string storedProcedure)
        {
            SqlConnection con = SqlConnect.Connect();

            SqlCommand command = CreateLikeApartmentCommand(con, la, storedProcedure);

            Boolean result = false;
            if (storedProcedure == "SP_Is_Liked_Apartments_Exist")
            {
                SqlDataReader dr = command.ExecuteReader();
                
                result = dr.HasRows;
            }
            else{
                command.ExecuteNonQuery();
                result = true;
            }

            con.Close();
            return result;

        }


        //invoke store procedure SP_Insert_Liked_Apartments
        private SqlCommand CreateLikeApartmentCommand(SqlConnection con, LikedApartment la, string storedProcedure)
        {
            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@email", la.UserEmail);
            command.Parameters.AddWithValue("@apartmentId", la.ApartmentId);
            

            command.CommandText = storedProcedure;
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }

        //method gets user email and returns an liked apartment list, else null
        public List<Apartment> GetLikedApartmentsByEmail(string email)
        {
            SqlConnection con = SqlConnect.Connect();

            // Create Command
            SqlCommand command = CreateGetLikedApartmentsByEmail(con, email);

            SqlDataReader dr = command.ExecuteReader();

            List<Apartment> la = null;
            if (dr.HasRows)
                la = new List<Apartment>();
            while (dr.Read())
            {
                int apartmentId = Convert.ToInt32(dr["apartmentId"]);
                string apartmentName = dr["apartmentName"].ToString();
                string apartmentImg = dr["apartmentImg"].ToString();
  
                la.Add(new Apartment(apartmentId, apartmentName, apartmentImg));

            }
            con.Close();

            return la;

        }
        //This function get user email and execute store procedure to get all liked apartments
        private SqlCommand CreateGetLikedApartmentsByEmail(SqlConnection con, string email)
        {
            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@email", email);

            command.CommandText = "SP_GetLikedApartmentsByUserEmail";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }

    }
}