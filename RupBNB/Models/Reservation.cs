using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using RupBNB.Models.DAL;

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

        //reservation default constructor
        public Reservation() { }

        //reservation constructor
        public Reservation(int id, DateTime startDate, DateTime endDate, int apartmentId, string userEmail, bool isCanceled)
        {
            this.Id = id;
            this.StartDate = startDate;
            this.EndDate = endDate;
            this.ApartmentId = apartmentId;
            this.UserEmail = userEmail;
            this.IsCanceled = isCanceled;
        }

        //reservation getters and setters
        public int Id { get => id; set => id = value; }
        public DateTime StartDate { get => startDate; set => startDate = value; }
        public DateTime EndDate { get => endDate; set => endDate = value; }
        public int ApartmentId { get => apartmentId; set => apartmentId = value; }
        public string UserEmail { get => userEmail; set => userEmail = value; }
        public bool IsCanceled { get => isCanceled; set => isCanceled = value; }


        //method to insert new reservation 
        //returns true if reservations was successfully added, false otherwise
        public bool InsertReservation()
        {
            ReservationServices rs = new ReservationServices();
            return rs.InsertReservation(this);
        }
        //method to cancel existing reservation 
        //returns true if reservations was successfully cancel, false otherwise
        public bool cancelReservation(int reservationId)
        {
            ReservationServices rs = new ReservationServices();
            return rs.cancelReservation(reservationId);
        }
        //method to get existing reservation object
        //return reservation object by id
        public Reservation getReservationById(int id)
        {
            ReservationServices ds = new ReservationServices();
            return ds.getReservationById(id);
        }
    }
}