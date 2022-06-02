using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace RupBNB.Models.DAL
{
    public static class SqlConnect
    {
        public static SqlConnection Connect()
        {
            // read the connection string from the web.config file
            string connectionString = WebConfigurationManager.ConnectionStrings["DBConnectionString"].ConnectionString;

            // create the connection to the db
            SqlConnection con = new SqlConnection(connectionString);
            try
            {
                con.Open();

            } catch (Exception ex)
            {
                return null; //Need to fix
            }
            // open the database connection
            

            return con;

        }
    }
}