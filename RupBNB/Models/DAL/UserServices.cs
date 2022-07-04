using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;


namespace RupBNB.Models.DAL
{
    public class UserServices
    {
        //this function create new user
        //get a User object and invoke stored procedure to save the user in the data base
        //return the status :
        //0 = if user added successfully
        //1 = if user email is already exist
        //2 = if username is already exist
        public int InsertUser(User user)
        {
            SqlConnection con = SqlConnect.Connect();

            //check if the user email already exist in UsersDB
            if (userEmailExists(user.Email) != null)
            {
                return 1;
            }
            //check if the username already exist in UsersDB
            if (userNameExists(user.UserName))
            {
                return 2;
            }

            SqlCommand command = CreateInsertUserCommand(con, user);    
            command.ExecuteNonQuery();
            con.Close();

            //user added successfully
            return 0;

        }

        //this function check if user exsist in data base
        //get user email and return a user if usere found
        //else return null
        public User userEmailExists(String email)
        {
            SqlConnection con = SqlConnect.Connect();

            SqlCommand command = CreateGetUserByEmail(con, email);
            SqlDataReader dr = command.ExecuteReader();

            User u = null;
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
        //this function check if user name exsist in data base
        //get user name and return a boolean representing if user found
        public bool userNameExists(String username)
        {
            SqlConnection con = SqlConnect.Connect();

            SqlCommand command = CreateGetUserByUserName(con, username);
            SqlDataReader dr = command.ExecuteReader();

            bool status = dr.HasRows;

            con.Close();

            return status;

        }

        //invoke stored procedure SP_getUserByEmail
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
        //invoke stored procedure SP_getUserByUserName
        private SqlCommand CreateGetUserByUserName(SqlConnection con, string username)
        {
            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@username", username);

            command.CommandText = "SP_getUserByUserName";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }

        //invoke store procedure SP_InsertUser
        private SqlCommand CreateInsertUserCommand(SqlConnection con, User user)
        {
            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@email", user.Email);
            command.Parameters.AddWithValue("@userName", user.UserName);
            command.Parameters.AddWithValue("@password", user.Password);
            command.Parameters.AddWithValue("@firstName", user.FirstName);
            command.Parameters.AddWithValue("@lastName", user.LastName);
            command.Parameters.AddWithValue("@birthDate", user.BirthDate);

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

        //invoke SP_GetUsersFutureReservations or SP_GetUsersPastReservations stored procedure
        //depends on the "isFutureReservations" boolean
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