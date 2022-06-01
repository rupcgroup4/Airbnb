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
            SqlCommand command = CreateHostExists(con, email);

            SqlDataReader dr = command.ExecuteReader();

            bool flag = dr.HasRows;
            con.Close();

            return flag;


        }

        private SqlCommand CreateHostExists(SqlConnection con, string email)
        {
            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@email", email);

            command.CommandText = "SP_GetHostByEmail";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }

        //Admin view users information
        private struct hostData
        {
            public hostData(string hostEmail, DateTime hostSince, int total_rentals,
                int total_income, int total_cancels)
            {
                HostEmail = hostEmail;
                HostSince = hostSince;
                Total_rentals = total_rentals;
                Total_income = total_income;
                Total_cancels = total_cancels;
            }
            public string HostEmail { get; private set; }
            public DateTime HostSince { get; private set; }
            public int Total_rentals { get; private set; }
            public int Total_income { get; private set; }
            public int Total_cancels { get; private set; }
        }

        public string GetHostsInfo()
        {
            SqlConnection con = SqlConnect.Connect();

            // Create Command
            SqlCommand command = CreateGetHostsInfo(con);

            SqlDataReader dr = command.ExecuteReader();

            List<hostData> hostsData = new List<hostData>();

            while (dr.Read())
            {
                string hostEmail = dr["email"].ToString();
                DateTime hostSince = Convert.ToDateTime(dr["hostSince"]);
                int totalRents = Convert.ToInt32(dr["TotalRents"]);
                int totalCanceled = Convert.ToInt32(dr["TotalCanceled"]);
                int totalPrice = Convert.ToInt32(dr["TotalPrice"]);

                hostsData.Add(new hostData(hostEmail, hostSince, totalRents, totalCanceled, totalPrice));

            }

            con.Close();

            return JsonConvert.SerializeObject(hostsData);

        }

        private SqlCommand CreateGetHostsInfo(SqlConnection con)
        {
            SqlCommand command = new SqlCommand();

            command.CommandText = "SP_AdminViewHostsInfo";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }

    }
}