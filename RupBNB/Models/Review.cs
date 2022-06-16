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

        public Review() { }

        public Review(int id, int apartmentId, string userName, DateTime reviewDate, string comments)
        {
            this.Id = id;
            this.ApartmentId = apartmentId;
            this.UserName = userName;
            this.ReviewDate = reviewDate;
            this.Comments = comments;
        }

        public int Id { get => id; set => id = value; }
        public int ApartmentId { get => apartmentId; set => apartmentId = value; }
        public string UserName { get => userName; set => userName = value; }
        public DateTime ReviewDate { get => reviewDate; set => reviewDate = value; }
        public string Comments { get => comments; set => comments = value; }

        public List<Review> GetReviewsByApartmentId(int id)
        {
            ReviewServices rs = new ReviewServices();
            return rs.GetReviewsByApartmentId(id);
        }
    }
}