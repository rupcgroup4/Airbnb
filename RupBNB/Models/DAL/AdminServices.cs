using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace RupBNB.Models.DAL
{
    public class AdminServices
    {
        //Admin view users information
        private struct User_And_Host_Data
        {
            public User_And_Host_Data(string email, DateTime register_date, int total_rentals
                , int total_cancels, int total_income)
            {
                Email = email;
                Register_date = register_date;
                Total_rentals = total_rentals;
                Total_income = total_income;
                Total_cancels = total_cancels;
            }
            public string Email { get; private set; }
            public DateTime Register_date { get; private set; }
            public int Total_rentals { get; private set; }
            public int Total_income { get; private set; }
            public int Total_cancels { get; private set; }
        }

        public string GetUsersInfo()
        {
            SqlConnection con = SqlConnect.Connect();

            // Create Command
            SqlCommand command = CreateGetUsersInfo(con);

            SqlDataReader dr = command.ExecuteReader();

            List<User_And_Host_Data> usersData = new List<User_And_Host_Data>();

            while (dr.Read())
            {
                string userEmail = dr["email"].ToString();
                DateTime userRegisteredSince = Convert.ToDateTime(dr["userRegisteredSince"]);
                int totalRents = Convert.ToInt32(dr["TotalRents"]);
                int totalCanceled = Convert.ToInt32(dr["TotalCanceled"]);
                int totalPrice = Convert.ToInt32(dr["TotalPrice"]);

                usersData.Add(new User_And_Host_Data(userEmail, userRegisteredSince, totalRents, totalCanceled, totalPrice));
            }

            con.Close();

            return JsonConvert.SerializeObject(usersData);

        }

        private SqlCommand CreateGetUsersInfo(SqlConnection con)
        {
            SqlCommand command = new SqlCommand();

            command.CommandText = "SP_AdminViewUsersInfo";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }
        public string GetHostsInfo()
        {
            SqlConnection con = SqlConnect.Connect();

            // Create Command
            SqlCommand command = CreateGetHostsInfo(con);

            SqlDataReader dr = command.ExecuteReader();

            List<User_And_Host_Data> hostsData = new List<User_And_Host_Data>();

            while (dr.Read())
            {
                string hostEmail = dr["email"].ToString();
                DateTime hostSince = Convert.ToDateTime(dr["hostSince"]);
                int totalRents = Convert.ToInt32(dr["TotalRents"]);
                int totalCanceled = Convert.ToInt32(dr["TotalCanceled"]);
                int totalPrice = Convert.ToInt32(dr["TotalPrice"]);

                hostsData.Add(new User_And_Host_Data(hostEmail, hostSince, totalRents, totalCanceled, totalPrice));

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

        //Admin view apartments information
        private struct apartmentData
        {
            public apartmentData(int apartment_id, string apartment_name, int total_rentals, int total_cancels)
            {
                Apartment_id = apartment_id;
                Apartment_name = apartment_name;
                Total_rentals = total_rentals;
                Total_cancels = total_cancels;

            }
            public int Apartment_id { get; private set; }
            public string Apartment_name { get; private set; }
            public int Total_rentals { get; private set; }
            public int Total_cancels { get; private set; }
        }

        public string GetApartmentsInfo()
        {
            SqlConnection con = SqlConnect.Connect();

            // Create Command
            SqlCommand command = CreateGetApartmentsInfo(con);

            SqlDataReader dr = command.ExecuteReader();

            List<apartmentData> apartmentData = new List<apartmentData>();

            while (dr.Read())
            {
                int id = Convert.ToInt32(dr["id"]);
                string name = dr["name"].ToString();
                int TotalRentDays = Convert.ToInt32(dr["TotalRentDays"]);
                int TotalCancelations = Convert.ToInt32(dr["TotalCancelations"]);

                apartmentData.Add(new apartmentData(id, name, TotalRentDays, TotalCancelations));

            }
            con.Close();

            return JsonConvert.SerializeObject(apartmentData);

        }

        private SqlCommand CreateGetApartmentsInfo(SqlConnection con)
        {
            SqlCommand command = new SqlCommand();

            command.CommandText = "SP_AdminViewApartmentsInfo";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }
    }
}