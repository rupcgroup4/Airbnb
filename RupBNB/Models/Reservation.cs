using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RupBNB.Models
{
    public class Reservation
    {
        int id;
        DateTime startDate;
        DateTime endDate;
        int apartmentId;
        string userEmail;
        Boolean isCanceled;

        public Reservation() { }

        public Reservation(int id, DateTime startDate, DateTime endDate, int apartmentId, string userEmail, bool isCanceled)
        {
            this.Id = id;
            this.StartDate = startDate;
            this.EndDate = endDate;
            this.ApartmentId = apartmentId;
            this.UserEmail = userEmail;
            this.IsCanceled = isCanceled;
        }

        public int Id { get => id; set => id = value; }
        public DateTime StartDate { get => startDate; set => startDate = value; }
        public DateTime EndDate { get => endDate; set => endDate = value; }
        public int ApartmentId { get => apartmentId; set => apartmentId = value; }
        public string UserEmail { get => userEmail; set => userEmail = value; }
        public bool IsCanceled { get => isCanceled; set => isCanceled = value; }
    }
}