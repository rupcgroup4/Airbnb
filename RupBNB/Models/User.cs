﻿using RupBNB.Models.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication1.Models;

namespace RupBNB.Models
{
    public class User
    {
        string email;
        string userName;
        string password;
        string firstName;
        string lastName;
        DateTime birthDate;
        DateTime userRegisteredSince;

        public User() { }

        public User(string email, string userName,  string password, string firstName, string lastName, DateTime birthDate, DateTime userRegisteredSince)
        {
            this.email = email;
            this.userName = userName;
            this.password = password;
            this.firstName = firstName;
            this.lastName = lastName;
            this.birthDate = birthDate;
            this.UserRegisteredSince = userRegisteredSince;
        }

        public string Email { get => email; set => email = value; }
        public string UserName { get => userName; set => userName = value; }
        public string Password { get => password; set => password = value; }
        public string FirstName { get => firstName; set => firstName = value; }
        public string LastName { get => lastName; set => lastName = value; }
        public DateTime BirthDate { get => birthDate; set => birthDate = value; }
        public DateTime UserRegisteredSince { get => userRegisteredSince; set => userRegisteredSince = value; }

        public User Insert()
        {
            UserServices ds = new UserServices();
            return ds.InsertUser(this); 
        }

        public User getUserByEmailAndPassword(String email, String password)
        {
            UserServices ds = new UserServices();
            return ds.userExists(email);
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
        public string getUsersReservations(string email, bool isFutureReservations)
        {
            UserServices ds = new UserServices();
            return ds.getUsersReservations(email, isFutureReservations);
        }


    }

    
}