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
            this.password = password;
            this.firstName = firstName;
            this.lastName = lastName;
            this.birthDate = birthDate;
            this.userName = userName;
            this.UserRegisteredSince = userRegisteredSince;
        }

        public string Email { get => email; set => email = value; }
        public string Password { get => password; set => password = value; }
        public string FirstName { get => firstName; set => firstName = value; }
        public string LastName { get => lastName; set => lastName = value; }
        public DateTime BirthDate { get => birthDate; set => birthDate = value; }
        public string UserName { get => userName; set => userName = value; }
        public DateTime UserRegisteredSince { get => userRegisteredSince; set => userRegisteredSince = value; }

        public User Insert()
        {
            UserServices ds = new UserServices();
            return ds.InsertUser(this); ;
        }


    }

    
}