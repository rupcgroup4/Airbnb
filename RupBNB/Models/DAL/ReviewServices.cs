using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using WebApplication1.Models;

namespace RupBNB.Models.DAL
{
    public class ReviewServices
    {

        //this function create new review
        //get a Review object and execute stored procedure to save the review in the data base
        //return the true if added successfully, false otherwise 
        public bool InsertReview(Review review)
        {
            SqlConnection con = SqlConnect.Connect();

            // Create Command
            SqlCommand command = CreateInsertReview(con, review);

            // Execute
            int numAffected = command.ExecuteNonQuery();

            // Close Connection
            con.Close();

            return numAffected == 1 ? true : false;

        }
        //This function get Review and execute store procedure to insert new review
        private SqlCommand CreateInsertReview(SqlConnection con, Review review)
        {

            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@apartmentId", review.Apartment.Id);
            command.Parameters.AddWithValue("@userName", review.UserName);
            command.Parameters.AddWithValue("@reviewDate", review.ReviewDate);
            command.Parameters.AddWithValue("@comments", review.Comments);

            command.CommandText = "SP_InsertReview";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }

        //this function check if review exsist in data base
        //get review id and return a review if review is found
        //else return null
        public bool ReviewExists(int id)
        {
            SqlConnection con = SqlConnect.Connect();

            // Create Command
            SqlCommand command = CreateReviewExists(con, id);

            SqlDataReader dr = command.ExecuteReader();

            bool flag = dr.HasRows;
            con.Close();

            return flag;


        }
        //This function get review id and execute store procedure to get review
        private SqlCommand CreateReviewExists(SqlConnection con, int id)
        {
            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@id", id);

            command.CommandText = "SP_GetReviewById";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }
        //method to get list of reviews by apartment id
        public List<Review> GetReviewsByApartmentId(int apartmentId, int numOfPageReview)
        {
            SqlConnection con = SqlConnect.Connect();

            // Create Command
            SqlCommand command = CreateGetReviewsByApartmentId(con, apartmentId, numOfPageReview);

            SqlDataReader dr = command.ExecuteReader();

            List<Review> reviews = new List<Review>();
            while(dr.Read())
            {
                int reviewId = Convert.ToInt32(dr["id"]);
                int apartment_Id = Convert.ToInt32(dr["apartmentId"]);
                Apartment apartment = new Apartment(apartment_Id);
                string userName = Convert.ToString(dr["userName"]);
                DateTime reviewDate = Convert.ToDateTime(dr["reviewDate"]);
                string comment = Convert.ToString(dr["comments"]);

                reviews.Add(new Review(reviewId, apartment, userName, reviewDate, comment));
            }

            con.Close();

            return reviews;
        }

        //This function get review id and execute store procedure to get list of reviews by apartment id
        private SqlCommand CreateGetReviewsByApartmentId(SqlConnection con, int apartmentId, int numOfPageReview)
        {
            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@apartmentId", apartmentId);
            command.Parameters.AddWithValue("@NumOfPage", numOfPageReview);


            command.CommandText = "SP_GetReviewsByApartmentId";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }

       //method gets apartment id and return the number of total reviews
        public int getTotalReviews(int apartmentId)
        {
            SqlConnection con = SqlConnect.Connect();

            // Create Command
            SqlCommand command = CreateGetTotalReviews(con, apartmentId);

            SqlDataReader dr = command.ExecuteReader();

            int totalReviews = 0;
            while (dr.Read())
            {
                totalReviews= Convert.ToInt32(dr["totalReviews"]); //totalReviews is the paramater name selected in the SP    
            }

            con.Close();

            return totalReviews;
        }

        //CreateGetTotalReviews command
        private SqlCommand CreateGetTotalReviews(SqlConnection con, int apartmentId)
        {
            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@apartmentId", apartmentId);

            command.CommandText = "SP_GetTotalReviewsByApartmentId‏";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }
    }
}