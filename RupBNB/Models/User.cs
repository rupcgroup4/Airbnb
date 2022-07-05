using RupBNB.Models.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication1.Models;

namespace RupBNB.Models
{
    public class User
    {   
        //Fields
        string email;
        string userName;
        string password;
        string firstName;
        string lastName;
        DateTime birthDate;
        DateTime userRegisteredSince;
        List<Reservation> reservations;
        List<LikedApartment> likedApartments;

        //default constructor
        public User() { }

        //consturctor with only email
        public User(string email) 
        { 
            Email = email; 
            Reservations = new List<Reservation>();
            likedApartments = new List<LikedApartment>();
        }

        //all fields constructor
        public User(string email, string userName,  string password, string firstName, string lastName, DateTime birthDate, DateTime userRegisteredSince)
        {
            this.email = email;
            this.userName = userName;
            this.password = password;
            this.firstName = firstName;
            this.lastName = lastName;
            this.birthDate = birthDate;
            this.UserRegisteredSince = userRegisteredSince;
            Reservations = new List<Reservation>();
            likedApartments = new List<LikedApartment>();
        }

        //Getters ans Setters
        public string Email { get => email; set => email = value; }
        public string UserName { get => userName; set => userName = value; }
        public string Password { get => password; set => password = value; }
        public string FirstName { get => firstName; set => firstName = value; }
        public string LastName { get => lastName; set => lastName = value; }
        public DateTime BirthDate { get => birthDate; set => birthDate = value; }
        public DateTime UserRegisteredSince { get => userRegisteredSince; set => userRegisteredSince = value; }
        public List<Reservation> Reservations { get => reservations; set => reservations = value; }

        //Insert new user function
        //send the user details to inser user stored procedure
        public int Insert()
        {
            UserServices ds = new UserServices();
            return ds.InsertUser(this); 
        }

        //this function used when user logged in
        //get the user by the email
        public User getUserByEmail(String email)
        {
            UserServices ds = new UserServices();
            return ds.userEmailExists(email); //userEmailExists return matching the inputed email
        }

        //Admin view users information
        public string AdminViewUsersInfo()
        {
            AdminServices ds = new AdminServices();
            return ds.GetUsersInfo();
        }

        //method gets a users email and bool that determends if method will get 
        //users future or past reservations.
        //returns a string with users reservations info to view
        public List<Reservation> UserReservations(bool isFutureReservations)
        {
            this.reservations = new Reservation().getReservationsByUserEmail(this.email, isFutureReservations);
            return this.reservations;
        }


        public List<LikedApartment> getUserLikedApartments()
        {
            LikedApartment la = new LikedApartment();
            return la.GetLikedApartmentsByEmail(this.email);
        }


    }

    
}