using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace RupBNB.Models.DAL
{
    public class ReservationServices
    {   
        //Insert new reservation to Reservation Table
        public bool InsertReservation(Reservation res)
        {
            
            //check if apartement is already booked on dates
            if(IsApartmentBookedOnDates(res))
            {   
                return false;
            }

            SqlConnection con = SqlConnect.Connect();

            // Create Command
            SqlCommand command = CreateInsertReservation(con, res);

            // Execute
            command.ExecuteNonQuery();

            // Close Connection
            con.Close();

            return true; 

        }

        private SqlCommand CreateInsertReservation(SqlConnection con, Reservation res)
        {

            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@startDate", res.StartDate);
            command.Parameters.AddWithValue("@endDate", res.EndDate);
            command.Parameters.AddWithValue("@apartmentId", res.ApartmentId);
            command.Parameters.AddWithValue("@userEmail", res.UserEmail);

            command.CommandText = "SP_InsertReservation";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }

        //
        public bool IsApartmentBookedOnDates(Reservation res)
        {
            SqlConnection con = SqlConnect.Connect();

            // Create Command
            SqlCommand command = CreateIsApartmentBookedOnDates(con, res);

            SqlDataReader dr = command.ExecuteReader();

            bool flag = dr.HasRows;
            con.Close();

            return flag;


        }

        private SqlCommand CreateIsApartmentBookedOnDates(SqlConnection con, Reservation res)
        {
            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@start", res.StartDate);
            command.Parameters.AddWithValue("@end", res.EndDate);
            command.Parameters.AddWithValue("@apartmentId", res.ApartmentId);


            command.CommandText = "SP_IsApartmentBookedOnDates";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }
    }
}