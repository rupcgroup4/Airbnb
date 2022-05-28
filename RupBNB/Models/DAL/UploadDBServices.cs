using Microsoft.VisualBasic.FileIO;
using RupBNB.Models;
using RupBNB.Models.DAL;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Configuration;

namespace WebApplication1.Models.DAL
{
    public class UploadDBServices
    {


        
        public void Host() { 


            var path = HttpContext.Current.Server.MapPath("~/Models/DAL/userHost.csv");
            using (TextFieldParser csvParser = new TextFieldParser(path))
            {
                csvParser.CommentTokens = new string[] { "#" };
                csvParser.SetDelimiters(new string[] { "," });
                csvParser.HasFieldsEnclosedInQuotes = true;

                // Skip the row with the column names
                csvParser.ReadLine();


                while (!csvParser.EndOfData)
                {

                    string[] values = csvParser.ReadFields();

                    if (values.Length == 15)
                    {
                        try
                        {

                            if (IsValid(values[0]))
                            {
                                DateTime hostSince = Convert.ToDateTime(values[7]);

                                bool isSuperHost = values[12] == "t" ? true : false;
                                bool isVerified = values[14] == "t" ? true : false;

                                InsertUser(new User(values[0], values[1], values[2], values[3], values[4], 
                                    Convert.ToDateTime(values[5]), Convert.ToDateTime(values[6])));

                                InsertHost(new Host(values[0], values[1], values[2], values[3], values[4],
                                    Convert.ToDateTime(values[5]), Convert.ToDateTime(values[6]),

                                    hostSince,
                                    values[8],
                                    values[9],
                                    values[10],
                                    values[11],
                                    isSuperHost,
                                    values[13],
                                    isVerified));
                            }
                        }

                        catch (Exception ex)
                        {

                        }

                    }

                }
            }
            
        }


        private static bool IsValid(string email)
        {
            string regex = @"^[^@\s]+@[^@\s]+\.(com|net|org|gov)$";

            return Regex.IsMatch(email, regex, RegexOptions.IgnoreCase);
        }

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
        public int InsertUser(User user)
        {
            SqlConnection con = SqlConnect.Connect();

            // Create Command
            SqlCommand command = CreateInsertUser(con, user);

            // Execute
            int numAffected = command.ExecuteNonQuery();

            // Close Connection
            con.Close();

            return numAffected;

        }
        private SqlCommand CreateInsertUser(SqlConnection con, User user)
        {

            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@email", user.Email);
            command.Parameters.AddWithValue("@userName", user.UserName);
            command.Parameters.AddWithValue("@firstName", user.FirstName);
            command.Parameters.AddWithValue("@lastName", user.LastName);
            command.Parameters.AddWithValue("@password", user.Password);
            command.Parameters.AddWithValue("@birthDate", user.BirthDate);
            command.Parameters.AddWithValue("@userRegisteredSince", user.UserRegisteredSince);

            command.CommandText = "SP_InsertUser";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }

        public bool UserExists(string email)
        {
            SqlConnection con = SqlConnect.Connect();

            // Create Command
            SqlCommand command = CreateUserExists(con, email);

            SqlDataReader dr = command.ExecuteReader();

            bool flag = dr.HasRows;
            con.Close();

            return flag;


        }
        private SqlCommand CreateUserExists(SqlConnection con, string email)
        {
            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@email", email);

            command.CommandText = "SP_GetUserByEmail";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }




        public int Listing()
        {
            int count = 0;
            var path = HttpContext.Current.Server.MapPath("~/Models/DAL/listingDB.csv");
            using (TextFieldParser csvParser = new TextFieldParser(path))
            {
                //csvParser.CommentTokens = new string[] { "#" };
                csvParser.SetDelimiters(new string[] { "," });
                csvParser.HasFieldsEnclosedInQuotes = true;

                // Skip the row with the column names
                csvParser.ReadLine();


                while (!csvParser.EndOfData)
                {

                    string[] values = csvParser.ReadFields();

                    if (values.Length == 22)
                    {
                        if (HostExists(values[2]))
                        {
                            try
                            {

                                InsertAppartment(new Apartment(
                                    Convert.ToInt32(values[0]),
                                    values[1],
                                    values[2],
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
                                    Convert.ToSingle(values[18]),
                                    Convert.ToSingle(values[19]),
                                    Convert.ToSingle(values[20]),
                                    Convert.ToSingle(values[21])
                                    ));
                                count++;
                            }
                            catch (Exception ex)
                            {

                            }


                        }

                    }



                }
            }
           

            return count;
        }



        public int InsertAppartment(Apartment apartment)
        {
            SqlConnection con = SqlConnect.Connect();

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

            command.Parameters.AddWithValue("@propertyType", apartment.PropertyType);
            command.Parameters.AddWithValue("@name", apartment.Name);
            command.Parameters.AddWithValue("@hostEmail", apartment.HostEmail);
            command.Parameters.AddWithValue("@description", apartment.Description);
            command.Parameters.AddWithValue("@img", apartment.Img);
            command.Parameters.AddWithValue("@neighborhood", apartment.Neighborhood);
            command.Parameters.AddWithValue("@latitude", apartment.Latitude);
            command.Parameters.AddWithValue("@longtitude", apartment.Longitude);
            command.Parameters.AddWithValue("@roomType", apartment.RoomType);
            command.Parameters.AddWithValue("@numBathrooms", apartment.NumBathrooms);
            command.Parameters.AddWithValue("@numBedrooms", apartment.NumBedrooms);
            command.Parameters.AddWithValue("@numBeds", apartment.NumBeds);
            command.Parameters.AddWithValue("@accommodates", apartment.Accommodates);
            command.Parameters.AddWithValue("@amenities", apartment.Amenities);
            command.Parameters.AddWithValue("@price", apartment.Price);
            command.Parameters.AddWithValue("@minNights", apartment.MinNight);
            command.Parameters.AddWithValue("@maxNights", apartment.MaxNight);
            command.Parameters.AddWithValue("@rating", apartment.Rating);
            command.Parameters.AddWithValue("@reviewAccuracy", apartment.ReviewAccuracy);
            command.Parameters.AddWithValue("@reviewsClean", apartment.ReviewsClean);
            command.Parameters.AddWithValue("@reviewLocation", apartment.ReviewLocation);


            command.CommandText = "SP_InsertApartment";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }



        public int Review()
        {
            int count = 0;
            string file = HttpContext.Current.Server.MapPath("~/Models/DAL/reviewsDB.csv");

            StreamReader reader = null;
            if (File.Exists(file))
            {
                string email = "";
                bool host = false;
                int flag = 0;
                reader = new StreamReader(File.OpenRead(file));
                List<string> listA = new List<string>();
                while (!reader.EndOfStream)
                {
                    var line = reader.ReadLine();

                    if (flag != 0)
                    {

                        var values = line.Split(',');

                        if (values.Length == 6)
                        {
                            if (email != values[4])
                            {
                                host = HostExists(values[4]);
                                email = values[4];
                            }
                            if (host)
                            {
                                try
                                {

                                    DateTime reviewDate = Convert.ToDateTime(values[2]);


                                    InsertReview(new Review(
                                        Convert.ToInt32(values[1]),
                                        Convert.ToInt32(values[0]),
                                        values[3],
                                        reviewDate,
                                        values[5]
                                        ));


                                }
                                catch (Exception ex)
                                {

                                }


                            }

                        } else
                        {
                            count++;

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

        public int Review2()
        {
            int count = 0;

            var path = HttpContext.Current.Server.MapPath("~/Models/DAL/reviewsDB.csv");
            using (TextFieldParser csvParser = new TextFieldParser(path))
            {
                //csvParser.CommentTokens = new string[] { "#" };
                csvParser.SetDelimiters(new string[] { "," });
                csvParser.HasFieldsEnclosedInQuotes = true;

                // Skip the row with the column names
                csvParser.ReadLine();

                string email = "";
                bool host = false;

                while (!csvParser.EndOfData)
                {
                    // Read current line fields, pointer moves to the next line.

                    try
                    {
                        string[] values = csvParser.ReadFields();
                        if (values.Length == 5)
                        {

                            try
                            {

                                DateTime reviewDate = Convert.ToDateTime(values[2]);


                                InsertReview(new Review(
                                    Convert.ToInt32(values[1]),
                                    Convert.ToInt32(values[0]),
                                    values[3],
                                    reviewDate,
                                    values[4]
                                    ));

                                count++;

                            }
                            catch (Exception ex)
                            {

                            }
                        }
                       

                    }
                    catch (Exception ex)
                    {

                    }



                }
            }

            return count;
        }

        public int InsertReview(Review review)
        {
            SqlConnection con = SqlConnect.Connect();

            // Create Command
            SqlCommand command = CreateInsertReview(con, review);

            // Execute
            int numAffected = command.ExecuteNonQuery();

            // Close Connection
            con.Close();

            return numAffected;

        }

        private SqlCommand CreateInsertReview(SqlConnection con, Review review)
        {

            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@apartmentId", review.ApartmentId);
            command.Parameters.AddWithValue("@userName", review.UserName);
            command.Parameters.AddWithValue("@reviewDate", review.ReviewDate);
            command.Parameters.AddWithValue("@comments", review.Comments);

            command.CommandText = "SP_InsertReview";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }
    }
}