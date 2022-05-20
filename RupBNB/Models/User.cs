using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication1.Models;

namespace RupBNB.Models
{
    public class User
    {
        int id;
        string email;
        string password;
        string firstName;
        string lastName;
        DateTime birthDate;
     //   List<Apartment> likedApartments;


        public User() { }

        public User(int id, string email, string password, string firstName, string lastName, DateTime birthDate)
        {
            this.id = id;
            this.email = email;
            this.password = password;
            this.firstName = firstName;
            this.lastName = lastName;
            this.birthDate = birthDate;
        }

        public int Id { get => id; set => id = value; }
        public string Email { get => email; set => email = value; }
        public string Password { get => password; set => password = value; }
        public string FirstName { get => firstName; set => firstName = value; }
        public string LastName { get => lastName; set => lastName = value; }
        public DateTime BirthDate { get => birthDate; set => birthDate = value; }
    }
}