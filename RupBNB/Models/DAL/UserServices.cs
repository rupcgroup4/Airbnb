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

            //check if the movie already exist in movie DB
            if (userExists(user))
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

        public bool userExists(User user)
        {
            SqlConnection con = Connect();

            // Create Command
            SqlCommand command = CreateGetUserByEmail(con, user.Email);

            SqlDataReader dr = command.ExecuteReader();

            bool flag = dr.HasRows;
            con.Close();

            return flag;

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