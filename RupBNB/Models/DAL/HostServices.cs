using Newtonsoft.Json;
using RupBNB.Models.DAL;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace WebApplication1.Models.DAL
{
    public class HostServices : UserServices
    {

        public int InsertHost(Host host)
        {
            SqlConnection con = SqlConnect.Connect();

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

            command.Parameters.AddWithValue("@email", host.Email);
            command.Parameters.AddWithValue("@hostSince", host.HostSince);
            command.Parameters.AddWithValue("@location", host.Location);
            command.Parameters.AddWithValue("@about", host.About);
            command.Parameters.AddWithValue("@responseTime", host.ResponseTime);
            command.Parameters.AddWithValue("@responseRate", host.ResponseRate);
            command.Parameters.AddWithValue("@isSuperHost", host.IsSuperHost);
            command.Parameters.AddWithValue("@img", host.Img);
            command.Parameters.AddWithValue("@isVerified", host.IsVerified);

            command.CommandText = "SP_InsertHost";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }


        public bool HostExists(string email)
        {
            SqlConnection con = SqlConnect.Connect();

            // Create Command
            SqlCommand command = CreateGetHostByEmail(con, email);

            SqlDataReader dr = command.ExecuteReader();

            bool flag = dr.HasRows;
            con.Close();

            return flag;


        }

        private SqlCommand CreateGetHostByEmail(SqlConnection con, string email)
        {
            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@email", email);

            command.CommandText = "SP_GetHostByEmail";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }

        public Host GetHost(string email)
        {
            SqlConnection con = SqlConnect.Connect();

            // Create Command
            SqlCommand command = CreateGetHostByEmail(con, email);

            SqlDataReader dr = command.ExecuteReader();

            Host h = null;
            while (dr.Read())
            {
                string hostEmail = dr["email"].ToString();
                DateTime hostSince = Convert.ToDateTime(dr["hostSince"]);
                string location = dr["location"].ToString();
                string about = dr["about"].ToString();
                string responseTime = dr["responseTime"].ToString();
                string responseRate = dr["responseRate"].ToString();
                bool isSuperHost = dr["responseRate"].ToString() == "t" ? true : false;
                string img = dr["img"].ToString();
                bool isVerified = dr["isVerified"].ToString() == "t" ? true : false;
                h = new Host(hostEmail, null, null, null, null,
            new DateTime(),new DateTime(), hostSince, location, about, responseTime, responseRate, isSuperHost, img, isVerified);
  

            }

            con.Close();

            return h;

        }
    }
}