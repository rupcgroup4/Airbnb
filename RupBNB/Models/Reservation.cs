using System;
using System.Collections.Generic;
using RupBNB.Models.DAL;
using WebApplication1.Models;

namespace RupBNB.Models
{
    public class Reservation
    {
        int id;
        DateTime startDate;
        DateTime endDate;
        Apartment apartment;
        User user;
        bool isCanceled;

       

        //reservation default constructor
        public Reservation() { }


        //reservation constructor
        public Reservation(int id, DateTime startDate, DateTime endDate, Apartment apartment, User user, bool isCanceled)
        {
            this.id = id;
            this.startDate = startDate;
            this.endDate = endDate;
            this.apartment = apartment;
            this.user = user;
            this.isCanceled = isCanceled;
        }

        //reservation getters and setters
        public int Id { get => id; set => id = value; }
        public DateTime StartDate { get => startDate; set => startDate = value; }
        public DateTime EndDate { get => endDate; set => endDate = value; }
        public Apartment Apartment { get => apartment; set => apartment = value; }
        public User User { get => user; set => user = value; }
        public bool IsCanceled { get => isCanceled; set => isCanceled = value; }

        //method to insert new reservation 
        //returns true if reservations was successfully added, false otherwise
        public int InsertReservation()
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

        public List<Reservation> getReservationsByUserEmail(string email, bool isFutureReservations)
        {
            ReservationServices rs = new ReservationServices();
            return rs.getUsersReservations(email, isFutureReservations);
        }
    }
}