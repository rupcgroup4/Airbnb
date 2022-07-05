using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WebApplication1.Models;

namespace RupBNB.Models.DAL
{
    public class ReservationServices
    {
        //this function create new reservation
        //get a Reservation object and execute stored procedure to save the reservation in the data base
        //return the true if added successfully, false otherwise 
        public int InsertReservation(Reservation res)
        {
            
            //check if apartement is already booked on dates
            if(IsApartmentBookedOnDates(res))
            {   
                return 0;
            }

            SqlConnection con = SqlConnect.Connect();

            // Create Command
            SqlCommand command = CreateInsertReservation(con, res);

            // Execute
            SqlDataReader dr = command.ExecuteReader();

            int num = 0;
            while (dr.Read())
            {
                num = Convert.ToInt32(dr["id"]);
            }

            // Close Connection
            con.Close();

            return num; 

        }

        //This function get Reservation and execute store procedure to insert new reservation
        private SqlCommand CreateInsertReservation(SqlConnection con, Reservation res)
        {

            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@startDate", res.StartDate);
            command.Parameters.AddWithValue("@endDate", res.EndDate);
            command.Parameters.AddWithValue("@apartmentId", res.Apartment.Id);
            command.Parameters.AddWithValue("@userEmail", res.User.Email);

            command.CommandText = "SP_InsertReservation";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }

        //check if apartement is already booked on dates
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

        //This function get Reservation Id and execute store procedure to check if apartement is already booked on dates
        private SqlCommand CreateIsApartmentBookedOnDates(SqlConnection con, Reservation res)
        {
            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@start", res.StartDate);
            command.Parameters.AddWithValue("@end", res.EndDate);
            command.Parameters.AddWithValue("@apartmentId", res.Apartment.Id);


            command.CommandText = "SP_IsApartmentBookedOnDates";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }

        //method gets reservationId and cancels the reservation
        //returns true if reservations was successfully cancel, false otherwise
        public bool cancelReservation(int reservationId)
        {
            SqlConnection con = SqlConnect.Connect();

            // Create Command
            SqlCommand command = CreateCancelReservation(con, reservationId);

            // Execute
            int numAffected = command.ExecuteNonQuery();

            // Close Connection
            con.Close();

            return numAffected == 1 ? true : false;
        }

        //This function get Reservation Id and execute store procedure to cancel the reservation
        private SqlCommand CreateCancelReservation(SqlConnection con, int reservationId)
        {
            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@reservationId", reservationId);

            command.CommandText = "SP_cancelReservation";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }

        //method gets reservationId and return back reservation matching the inputed reservation id
        //if not found return null
        public Reservation getReservationById(int reservationId)
        {
            SqlConnection con = SqlConnect.Connect();

            // Create Command
            SqlCommand command = CreateGetReservationById(con, reservationId);

            // Execute
            SqlDataReader dr = command.ExecuteReader();

            Reservation reservation = null;
            while (dr.Read())
            {
    
                int apartmentId = Convert.ToInt32(dr["apartmentId"]);
                Apartment apartment = new Apartment(apartmentId);
                DateTime startDate = Convert.ToDateTime(dr["startDate"]);
                DateTime endDate = Convert.ToDateTime(dr["endDate"]);
                string userEmail = dr["userEmail"].ToString();
                User user = new User(userEmail);
                bool isCanceled = Convert.ToBoolean(dr["isCanceled"]);
                bool hasReview = Convert.ToBoolean(dr["hasReview"]);


                reservation = new Reservation(reservationId, startDate , endDate, apartment, user, isCanceled, hasReview);

            }
            // Close Connection
            con.Close();

            return reservation;

        }

        //This function get Reservation Id and execute store procedure to get the reservation
        private SqlCommand CreateGetReservationById(SqlConnection con, int reservationId)
        {

            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@id", reservationId);

            command.CommandText = "SP_getReservationById";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;

        }


        //method gets user email and a bool parameter isFutureReservations
        //if isFutureReservations is true method returns a string with the data of 
        //the users future reservations
        //else method returns a string with the data of the users past reservations
        public List<Reservation> getUsersReservations(string email, bool isFutureReservations)
        {
            SqlConnection con = SqlConnect.Connect();

            // Create Command
            SqlCommand command = CreateGetUsersReservations(con, email, isFutureReservations);

            SqlDataReader dr = command.ExecuteReader();

            List<Reservation> userReservations = new List<Reservation>();
            User user = new User(email);
            while (dr.Read())
            {
                int reservationId = Convert.ToInt32(dr["reservationId"]);
                int apartmentId = Convert.ToInt32(dr["apartmentId"]);
                string apartmentImg = dr["apartmentImg"].ToString();
                string apartmentName = dr["apartmentName"].ToString();
                Apartment apartment = new Apartment(apartmentId, apartmentName, apartmentImg);
                DateTime startDate = Convert.ToDateTime(dr["startDate"]);
                DateTime endDate = Convert.ToDateTime(dr["endDate"]);
                bool isCanceled = Convert.ToBoolean(dr["isCanceled"]);
                bool hasReview = Convert.ToBoolean(dr["hasReview"]);

                userReservations.Add(new Reservation(reservationId, startDate, endDate, apartment, user, isCanceled, hasReview));
            }

            con.Close();

            return userReservations;
        }

        //invoke SP_GetUsersFutureReservations or SP_GetUsersPastReservations stored procedure
        //depends on the "isFutureReservations" boolean
        private SqlCommand CreateGetUsersReservations(SqlConnection con, string email, bool isFutureReservations)
        {
            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@email", email);
            if (isFutureReservations)
                command.CommandText = "SP_GetUsersFutureReservations";
            else
                command.CommandText = "SP_GetUsersPastReservations";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }

        //method gets reservationId and updates the DB that a review was made to this reservation,
        //(updates reservation field "hasReview" to 1 (true))
        //returns true if successfully, false otherwise
        public bool apartmentHasReview(int reservationId)
        {
            SqlConnection con = SqlConnect.Connect();

            // Create Command
            SqlCommand command = CreateApartmentHasReview(con, reservationId);

            // Execute
            int numAffected = command.ExecuteNonQuery();

            // Close Connection
            con.Close();

            return numAffected == 1 ? true : false;
        }

        //This function get Reservation Id and execute store procedure update bool field
        //representing tha reservation has a review
        private SqlCommand CreateApartmentHasReview(SqlConnection con, int reservationId)
        {
            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@reservationId", reservationId);

            command.CommandText = "SP_ApartmentHasReview";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }
    }
}