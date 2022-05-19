using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace WebApplication1.Models.DAL
{
    public class HostServices
    {

        public int InsertHost(Host host)
        {
            SqlConnection con = Connect();

            // Create Command
            SqlCommand command = CreateInsertHost(con, host);

            // Execute
            int numAffected = command.ExecuteNonQuery();

            // Close Connection
            con.Close();

            return numAffected;

        }

        private SqlCommand CreateInsertHost(SqlConnection con, Host host)
        {

            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@FirstName", host.FirstName);
            command.Parameters.AddWithValue("@LastName", host.LastName);
            command.Parameters.AddWithValue("@Email", host.Email);
            command.Parameters.AddWithValue("@Password", host.Password);
            command.Parameters.AddWithValue("@BirthDate", host.BirthDate);
            command.Parameters.AddWithValue("@HostSince", host.HostSince);
            command.Parameters.AddWithValue("@Location", host.Location);
            command.Parameters.AddWithValue("@About", host.About);
            command.Parameters.AddWithValue("@ResponseTime", host.ResponseTime);
            command.Parameters.AddWithValue("@ResponseRate", host.ResponseRate);
            command.Parameters.AddWithValue("@IsSuperHost", host.IsSuperHost);
            command.Parameters.AddWithValue("@SmallPicture", host.SmallPicture);
            command.Parameters.AddWithValue("@BigPicture", host.BigPicture);
            command.Parameters.AddWithValue("@IsVerified", host.IsVerified);

            command.CommandText = "SPInsertHost";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }


        public bool HostExists(int id)
        {
            SqlConnection con = Connect();

            // Create Command
            SqlCommand command = CreateHostExists(con, id);

            SqlDataReader dr = command.ExecuteReader();

            bool flag = dr.HasRows;
            con.Close();

            return flag;


        }

        private SqlCommand CreateHostExists(SqlConnection con, int id)
        {
            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@id", id);

            command.CommandText = "SPGetHostByID";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }




        //Connect to DB
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