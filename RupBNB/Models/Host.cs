using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class Host
    {
        int id;
        string firstName;
        string lastName;
        string email;
        string password;
        DateTime birthDate;
        DateTime hostSince;
        string location;
        string about;
        string responseTime;
        string responseRate;
        bool isSuperHost;
        string smallPicture;
        string bigPicture;
        bool isVerified;

        public Host(int id, string firstName, string lastName, string email, string password, DateTime birthDate, DateTime hostSince, string location, string about, string responseTime, string responseRate, bool isSuperHost, string smallPicture, string bigPicture, bool isVerified)
        {
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.password = password;
            this.birthDate = birthDate;
            this.hostSince = hostSince;
            this.location = location;
            this.about = about;
            this.responseTime = responseTime;
            this.responseRate = responseRate;
            this.isSuperHost = isSuperHost;
            this.smallPicture = smallPicture;
            this.bigPicture = bigPicture;
            this.isVerified = isVerified;
        }

        public Host() { }

        public int Id { get => id; set => id = value; }
        public string FirstName { get => firstName; set => firstName = value; }
        public string LastName { get => lastName; set => lastName = value; }
        public string Email { get => email; set => email = value; }
        public string Password { get => password; set => password = value; }
        public DateTime BirthDate { get => birthDate; set => birthDate = value; }
        public DateTime HostSince { get => hostSince; set => hostSince = value; }
        public string Location { get => location; set => location = value; }
        public string About { get => about; set => about = value; }
        public string ResponseTime { get => responseTime; set => responseTime = value; }
        public string ResponseRate { get => responseRate; set => responseRate = value; }
        public bool IsSuperHost { get => isSuperHost; set => isSuperHost = value; }
        public string SmallPicture { get => smallPicture; set => smallPicture = value; }
        public string BigPicture { get => bigPicture; set => bigPicture = value; }
        public bool IsVerified { get => isVerified; set => isVerified = value; }
    }
}