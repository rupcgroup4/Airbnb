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
        int hostId;
        int userId;

        public Reservation() { }

        public Reservation(int id, DateTime startDate, DateTime endDate, int apartmentId, int hostId, int userId)
        {
            this.Id = id;
            this.StartDate = startDate;
            this.EndDate = endDate;
            this.ApartmentId = apartmentId;
            this.HostId = hostId;
            this.UserId = userId;
        }

        public int Id { get => id; set => id = value; }
        public DateTime StartDate { get => startDate; set => startDate = value; }
        public DateTime EndDate { get => endDate; set => endDate = value; }
        public int ApartmentId { get => apartmentId; set => apartmentId = value; }
        public int HostId { get => hostId; set => hostId = value; }
        public int UserId { get => userId; set => userId = value; }
    }
}