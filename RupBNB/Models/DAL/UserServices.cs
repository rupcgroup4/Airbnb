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
            SqlConnection con = Connect();

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
            SqlConnection con = Connect();

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

        private SqlConnection Connect()
        {
            // read the connection string from the web.config file
            string connectionString = WebConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;

            // create the connection to the db
            SqlConnection con = new SqlConnection(connectionString);

            // open the database connection
            con.Open();

            return con;

        }
    }
}