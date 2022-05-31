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
        private struct userData
        {
            public userData(string user_Email, DateTime register_date,int total_rentals,
                int total_income, int total_cancels)
            {
                User_Email = user_Email;
                Register_date = register_date;
                Total_rentals = total_rentals;
                Total_income = total_income;
                Total_cancels = total_cancels;
            }
            public string User_Email { get; private set; }
            public DateTime Register_date { get; private set; }
            public int Total_rentals { get; private set; }
            public int Total_income { get; private set; }
            public int Total_cancels { get; private set; }
        }


        public void UsersInfo(String email)
        {
            SqlConnection con = SqlConnect.Connect();

            // Create Command
            SqlCommand command = CreateGetUsersInfo(con, email);

            SqlDataReader dr = command.ExecuteReader();

            List<userData> usersData = new List<userData>();

            while (dr.Read())
            {
                string userEmail = dr["email"].ToString();
                DateTime userRegisteredSince = Convert.ToDateTime(dr["userRegisteredSince"]);
                int totalRents = Convert.ToInt32(dr["TotalRents"]);
                int totalCanceled = Convert.ToInt32(dr["TotalCanceled"]);
                int totalPrice = Convert.ToInt32(dr["TotalPrice"]);

                usersData.Add(new userData(userEmail, userRegisteredSince, totalRents, totalCanceled, totalPrice));

            }

            con.Close();

           // return usersData;

        }

        private SqlCommand CreateGetUsersInfo(SqlConnection con, string email)
        {
            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@userEmail", email);

            command.CommandText = "SP_AdminViewUsersInfo";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }
    }
}