using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace RupBNB.Models.DAL
{
    public class ReservationServices
    {
        public int InsertReservation(Reservation reservation)
        {
            SqlConnection con = SqlConnect.Connect();

            // Create Command
            SqlCommand command = CreateInsertReservation(con, reservation);

            // Execute
            int numAffected = command.ExecuteNonQuery();

            // Close Connection
            con.Close();

            return numAffected;

        }

        private SqlCommand CreateInsertReservation(SqlConnection con, Reservation reservation)
        {

            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@id", reservation.Id);
            command.Parameters.AddWithValue("@startDate", reservation.StartDate);
            command.Parameters.AddWithValue("@endDate", reservation.EndDate);
            command.Parameters.AddWithValue("@apartmentId", reservation.ApartmentId);
            command.Parameters.AddWithValue("@userEmail", reservation.UserEmail);

            command.CommandText = "SP_InsertReservation";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }


        public bool ReservationExists(int id)
        {
            SqlConnection con = SqlConnect.Connect();

            // Create Command
            SqlCommand command = CreateReservationExists(con, id);

            SqlDataReader dr = command.ExecuteReader();

            bool flag = dr.HasRows;
            con.Close();

            return flag;


        }

        private SqlCommand CreateReservationExists(SqlConnection con, int id)
        {
            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@id", id);

            command.CommandText = "SP_GetReservationById";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }
    }
}