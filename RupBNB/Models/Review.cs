using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RupBNB.Models
{
    public class Review
    {
        int id;
        int apartmentId;
        int reviewerId;
        string reviewerName;
        DateTime reviewDate;
        string comments;

        public Review(int id, int apartmentId, int reviewerId, string reviewerName, DateTime reviewDate, string comments)
        {
            this.id = id;
            this.apartmentId = apartmentId;
            this.reviewerId = reviewerId;
            this.reviewerName = reviewerName;
            this.reviewDate = reviewDate;
            this.comments = comments;
        }
        public Review() { }

        public int Id { get => id; set => id = value; }
        public int ApartmentId { get => apartmentId; set => apartmentId = value; }
        public int ReviewerId { get => reviewerId; set => reviewerId = value; }
        public string ReviewerName { get => reviewerName; set => reviewerName = value; }
        public DateTime ReviewDate { get => reviewDate; set => reviewDate = value; }
        public string Comments { get => comments; set => comments = value; }
    }
}