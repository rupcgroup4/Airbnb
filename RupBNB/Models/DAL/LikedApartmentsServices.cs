using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using WebApplication1.Models;

namespace RupBNB.Models.DAL
{
    public class LikedApartmentsServices
    {
        //general procedure for likedApartments
        //method gets a likedApartment and a string representing a stored procedure name to execute
        //the stored procedure options are:
        //SP_DeleteLikedApartment : delete an already liked apartment
        //SP_Insert_Liked_Apartments : like an apartments
        //SP_Is_Liked_Apartments_Exist : check if an apartment is liked (used in users profilePrage when rendering likedApartment)
        public bool LikedApartmentGeneralProcedure(LikedApartment la, string storedProcedure)
        {
            SqlConnection con = SqlConnect.Connect();

            SqlCommand command = CreateLikedApartmentGeneralProcedure(con, la, storedProcedure);

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


        //invoke store procedure according to the storedProcedure string inputed 
        //(SP_DeleteLikedApartment / SP_Insert_Liked_Apartments / SP_Is_Liked_Apartments_Exist)
        private SqlCommand CreateLikedApartmentGeneralProcedure(SqlConnection con, LikedApartment la, string storedProcedure)
        {
            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@email", la.User.Email);
            command.Parameters.AddWithValue("@apartmentId", la.Apartment.Id);
            

            command.CommandText = storedProcedure;
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }

        //method gets user email and returns an liked apartment list, else null
        public List<LikedApartment> GetLikedApartmentsByEmail(string email)
        {
            SqlConnection con = SqlConnect.Connect();

            // Create Command
            SqlCommand command = CreateGetLikedApartmentsByEmail(con, email);

            SqlDataReader dr = command.ExecuteReader();

            List<LikedApartment> la = null;
            if (dr.HasRows)
                la = new List<LikedApartment>();
                User user = new User(email);
            while (dr.Read())
            {
                int apartmentId = Convert.ToInt32(dr["apartmentId"]);
                string apartmentName = dr["apartmentName"].ToString();
                string apartmentImg = dr["apartmentImg"].ToString();
                Apartment apartment = new Apartment(apartmentId, apartmentName, apartmentImg);

                la.Add(new LikedApartment(user, apartment));

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