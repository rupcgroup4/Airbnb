using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace RupBNB.Models.DAL
{
    public class UserServices
    {
        public User InsertUser(User user)
        {
            SqlConnection con = SqlConnect.Connect();

            //check if the user already exist in UsersDB
            if (userExists(user.Email)!=null)
            {
                return null;
            }

            // Create Command
            SqlCommand command = CreateInsertUserCommand(con, user);

            // Execute
            int numAffected = command.ExecuteNonQuery();

            // Close Connection
            con.Close();

            return user;

        }

        public User userExists(String email)
        {
            SqlConnection con = SqlConnect.Connect();

            // Create Command
            SqlCommand command = CreateGetUserByEmail(con, email);

            SqlDataReader dr = command.ExecuteReader();

            User u= null;
            while (dr.Read())
            {
                string userEmail = dr["email"].ToString();
                string userName = dr["userName"].ToString();
                string password = dr["Password"].ToString();
                string firstName = dr["firstName"].ToString();
                string lastName = dr["lastName"].ToString();
                DateTime birthDate = Convert.ToDateTime(dr["birthDate"]);
                DateTime userRegisteredSince = Convert.ToDateTime(dr["userRegisteredSince"]);

                u = new User(userEmail, userName, password, firstName, lastName, birthDate, userRegisteredSince);
            }

            con.Close();

            return u;

        }

        private SqlCommand CreateGetUserByEmail(SqlConnection con, string email)
        {
            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@email", email);

            command.CommandText = "SP_getUserByEmail";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }

        private SqlCommand CreateInsertUserCommand(SqlConnection con, User user)
        {
            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@email", user.Email);
            command.Parameters.AddWithValue("@userName", user.UserName);
            command.Parameters.AddWithValue("@password", user.Password);
            command.Parameters.AddWithValue("@firstName", user.FirstName);
            command.Parameters.AddWithValue("@lastName", user.LastName);
            command.Parameters.AddWithValue("@birthDate", user.BirthDate);
           // command.Parameters.AddWithValue("@userRegisteredSince", user.UserRegisteredSince);


            command.CommandText = "SP_InsertUser";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }
        //for user profile page
        //struct that contains data from reservation and apartment
        private struct reservationData
        {
            public reservationData(int reservationId, int apartmentId,string apartmentImg, 
                string apartmentName, DateTime startDate, DateTime endDate, 
                bool isCanceled)
            {
                ReservationId = reservationId;
                ApartmentId = apartmentId;
                ApartmentImg = apartmentImg;
                ApartmentName = apartmentName;
                StartDate = startDate;
                EndDate = endDate;
                IsCanceled = isCanceled;
            }
            public int ReservationId { get; private set; }
            public int ApartmentId { get; private set; }
            public string ApartmentImg { get; private set; }
            public string ApartmentName { get; private set; }
            public DateTime StartDate { get; private set; }
            public DateTime EndDate { get; private set; }
            public bool IsCanceled { get; private set; }

        }

        //method gets a bool parameter isFutureReservations
        //if isFutureReservations is true method returns a string with the data of 
        //the users future reservations
        //else method returns a string with the data of the users past reservations
        public string getUsersReservations(string email, bool isFutureReservations)
        {
            SqlConnection con = SqlConnect.Connect();

            // Create Command
            SqlCommand command = CreateGetUsersReservations(con, email, isFutureReservations);

            SqlDataReader dr = command.ExecuteReader();

            List<reservationData> reservationsData = new List<reservationData>();

            while (dr.Read())
            {
                int reservationId = Convert.ToInt32(dr["reservationId"]);
                int apartmentId = Convert.ToInt32(dr["apartmentId"]);
                string apartmentImg = dr["apartmentImg"].ToString();
                string apartmentName = dr["apartmentName"].ToString();
                DateTime startDate = Convert.ToDateTime(dr["startDate"]);
                DateTime endDate = Convert.ToDateTime(dr["endDate"]);
                bool isCanceled = Convert.ToBoolean(dr["isCanceled"]);

                reservationsData.Add(new reservationData(reservationId, apartmentId, apartmentImg, apartmentName, startDate, endDate, isCanceled));
            }

            con.Close();

            return JsonConvert.SerializeObject(reservationsData);
        }

        private SqlCommand CreateGetUsersReservations(SqlConnection con, string email, bool isFutureReservations)
        {
            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@email", email);
            if(isFutureReservations)
                 command.CommandText = "SP_GetUsersFutureReservations";
            else
                command.CommandText = "SP_GetUsersPastReservations";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }


    }
}