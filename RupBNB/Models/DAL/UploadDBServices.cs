using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace WebApplication1.Models.DAL
{
    public class UploadDBServices
    {


        
        public void Host()
        {
            string file = HttpContext.Current.Server.MapPath("~/Models/DAL/hostDB.csv");

            StreamReader reader = null;
            if (File.Exists(file))
            {
                int flag = 0;
                reader = new StreamReader(File.OpenRead(file));
                List<string> listA = new List<string>();
                while (!reader.EndOfStream)
                {
                    var line = reader.ReadLine();

                    if (flag != 0)
                    {

                        var values = line.Split(',');

                        if(values.Length == 15)
                        {
                            try
                            {
                                DateTime birthDate = Convert.ToDateTime(values[5]);
                                DateTime hostSince = Convert.ToDateTime(values[6]);


                                bool isSuperHost = values[10] == "t" ? true : false;
                                bool isVerified = values[13] == "t" ? true : false;

                                InsertHost(new Host(
                                    Convert.ToInt32(values[0]),
                                    values[1],
                                    values[2],
                                    values[3],
                                    values[4],
                                    birthDate,
                                    hostSince,
                                    values[7],
                                    values[8],
                                    values[9],
                                    values[10],
                                    isSuperHost,
                                    values[12],
                                    values[13],
                                    isVerified
                                    ));
                            }
                            catch (Exception ex)
                            {

                            }

                            
                        }


                    }
                    else
                    {
                        flag = 1;
                    }

                }
            }
            else
            {
                Console.WriteLine("File doesn't exist");
            }


        }




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



        public int Listing()
        {
            int count = 0;
            string file = HttpContext.Current.Server.MapPath("~/Models/DAL/listingDB4.csv");

            StreamReader reader = null;
            if (File.Exists(file))
            {
               
                int flag = 0;
                reader = new StreamReader(File.OpenRead(file));
                List<string> listA = new List<string>();
                while (!reader.EndOfStream)
                {
                    var line = reader.ReadLine();

                    if (flag != 0)
                    {

                        var values = line.Split(',');

                        if (values.Length == 22)
                        {
                            if(HostExists(Convert.ToInt32(values[2])))
                            {
                                try
                                {

                                    InsertAppartment(new Apartment(
                                        Convert.ToInt32(values[0]),
                                        values[1],
                                        Convert.ToInt32(values[2]),
                                        values[3],
                                        values[4],
                                        values[5],
                                        values[6],
                                        values[7],
                                        values[8],
                                        values[9],
                                        values[10],
                                        Convert.ToInt32(values[11]),
                                        Convert.ToInt32(values[12]),
                                        Convert.ToInt32(values[13]),
                                        values[14],
                                        Convert.ToInt32(values[15]),
                                        Convert.ToInt32(values[16]),
                                        Convert.ToInt32(values[17]),
                                        Convert.ToDouble(values[18]),
                                        Convert.ToDouble(values[19]),
                                        Convert.ToDouble(values[20]),
                                        Convert.ToDouble(values[21])
                                        ));
                                    count++;
                                }
                                catch (Exception ex)
                                {

                                }


                            }

                        }

                    }
                    else
                    {
                        flag = 1;
                    }
                }
            }
            else
            {
                Console.WriteLine("File doesn't exist");
            }

            return count;
        }



        public int InsertAppartment(Apartment apartment)
        {
            SqlConnection con = Connect();

            // Create Command
            SqlCommand command = CreateInsertAppartment(con, apartment);

            // Execute
            int numAffected = command.ExecuteNonQuery();

            // Close Connection
            con.Close();

            return numAffected;

        }

        private SqlCommand CreateInsertAppartment(SqlConnection con, Apartment apartment)
        {

            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@PropertyType", apartment.PropertyType);
            command.Parameters.AddWithValue("@HostId", apartment.HostId);
            command.Parameters.AddWithValue("@Name", apartment.Name);
            command.Parameters.AddWithValue("@Description", apartment.Description);
            command.Parameters.AddWithValue("@Picture", apartment.Picture);
            command.Parameters.AddWithValue("@Neighborhood", apartment.Neighborhood);
            command.Parameters.AddWithValue("@Latitude", apartment.Latitude);
            command.Parameters.AddWithValue("@Longtitude", apartment.Longitude);
            command.Parameters.AddWithValue("@RoomType", apartment.RoomType);
            command.Parameters.AddWithValue("@Bathrooms", apartment.Bathrooms);
            command.Parameters.AddWithValue("@Bedrooms", apartment.Bedrooms);
            command.Parameters.AddWithValue("@Beds", apartment.Beds);
            command.Parameters.AddWithValue("@Accommodates", apartment.Accommodates);
            command.Parameters.AddWithValue("@Amenities", apartment.Amenities);
            command.Parameters.AddWithValue("@Price", apartment.Price);
            command.Parameters.AddWithValue("@MinNights", apartment.MinNight);
            command.Parameters.AddWithValue("@MaxNights", apartment.MaxNight);
            command.Parameters.AddWithValue("@Rating", apartment.Rating);
            command.Parameters.AddWithValue("@ReviewAccuracy", apartment.ReviewAccuracy);
            command.Parameters.AddWithValue("@ReviewsClean", apartment.ReviewsClean);
            command.Parameters.AddWithValue("@ReviewLocation", apartment.ReviewLocation);


            command.CommandText = "SPInsertApartment";
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