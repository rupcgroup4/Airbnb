using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RupBNB.Models
{
    public class User
    {
        int id;
        string email;
        string password;
        string firstName;
        string lastName;
        DateTime birthdate;
        //List<> likedApartments;

        public User(int id, string email, string password, string firstName, string lastName, DateTime birthdate)
        {
            this.Id = id;
            this.Email = email;
            this.Password = password;
            this.FirstName = firstName;
            this.LastName = lastName;
            this.Birthdate = birthdate;
        }
        public User() { }

        public int Id { get => id; set => id = value; }
        public string Email { get => email; set => email = value; }
        public string Password { get => password; set => password = value; }
        public string FirstName { get => firstName; set => firstName = value; }
        public string LastName { get => lastName; set => lastName = value; }
        public DateTime Birthdate { get => birthdate; set => birthdate = value; }
     
    }
}