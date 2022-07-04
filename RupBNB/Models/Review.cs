using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using RupBNB.Models.DAL;

namespace RupBNB.Models
{
    public class Review
    {
        int id;
        int apartmentId;
        string userName;
        DateTime reviewDate;
        string comments;

        //host default constructor
        public Review() { }

        //review constructor
        public Review(int id, int apartmentId, string userName, DateTime reviewDate, string comments)
        {
            this.Id = id;
            this.ApartmentId = apartmentId;
            this.UserName = userName;
            this.ReviewDate = reviewDate;
            this.Comments = comments;
        }

        //reservation getters and setters
        public int Id { get => id; set => id = value; }
        public int ApartmentId { get => apartmentId; set => apartmentId = value; }
        public string UserName { get => userName; set => userName = value; }
        public DateTime ReviewDate { get => reviewDate; set => reviewDate = value; }
        public string Comments { get => comments; set => comments = value; }

        //method to get list of reviews by apartment id
        //return list of reviews
        public List<Review> GetReviewsByApartmentId(int apartmentId, int numOfPageReview)
        {
            ReviewServices rs = new ReviewServices();
            return rs.GetReviewsByApartmentId(apartmentId, numOfPageReview);
        }

        //method gets apartmentId and returns int with the apartments total reviews
        public int getTotalReviews(int apartmentId)
        {
            ReviewServices rs = new ReviewServices();
            return rs.getTotalReviews(apartmentId);
        }
    }
}