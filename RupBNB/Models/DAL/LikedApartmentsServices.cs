using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace RupBNB.Models.DAL
{
    public class LikedApartmentsServices
    {
        //Insert Liked Apartment
        public bool LikedApartmentProcedure(LikedApartment la, string storedProcedure)
        {
            SqlConnection con = SqlConnect.Connect();

            SqlCommand command = CreateLikeApartmentCommand(con, la, storedProcedure);
            
            if (storedProcedure == "SP_Is_Liked_Apartments_Exist")
            {
                SqlDataReader dr = command.ExecuteReader();
                con.Close();
                return dr.HasRows;
            }
            else{
                command.ExecuteNonQuery();
            }

            con.Close();
            return true;

        }


        //invoke store procedure SP_Insert_Liked_Apartments
        private SqlCommand CreateLikeApartmentCommand(SqlConnection con, LikedApartment la, string storedProcedure)
        {
            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@email", la.UserEmail1);
            command.Parameters.AddWithValue("@apartmentId", la.ApartmentId);
            

            command.CommandText = storedProcedure;
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }


    }
}