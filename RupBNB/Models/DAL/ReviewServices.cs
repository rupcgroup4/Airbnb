using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace RupBNB.Models.DAL
{
    public class ReviewServices
    {

        //Insert new review to Reviews Table
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
        //This function get Review and execute store procedure to insert new review
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

        //check if review is already exist
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
        public List<Review> GetReviewsByApartmentId(int id)
        {
            SqlConnection con = SqlConnect.Connect();

            // Create Command
            SqlCommand command = CreateGetReviewsByApartmentId(con, id);

            SqlDataReader dr = command.ExecuteReader();

            List<Review> reviews = new List<Review>();
            while(dr.Read())
            {
                int reviewId = Convert.ToInt32(dr["id"]);
                int apartmentId = Convert.ToInt32(dr["apartmentId"]);
                string userName = Convert.ToString(dr["userName"]);
                DateTime reviewDate = Convert.ToDateTime(dr["reviewDate"]);
                string comment = Convert.ToString(dr["comments"]);

                reviews.Add(new Review(reviewId, apartmentId, userName, reviewDate, comment));
            }

            con.Close();

            return reviews;


        }
        //This function get review id and execute store procedure to get list of reviews by apartment id
        private SqlCommand CreateGetReviewsByApartmentId(SqlConnection con, int id)
        {
            SqlCommand command = new SqlCommand();

            command.Parameters.AddWithValue("@apartmentID", id);

            command.CommandText = "SP_GetReviewsByApartmentId";
            command.Connection = con;
            command.CommandType = System.Data.CommandType.StoredProcedure;
            command.CommandTimeout = 10; // in seconds

            return command;
        }

    }
}