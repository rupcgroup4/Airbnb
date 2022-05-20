using RupBNB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1.Models
{
    public class Host : User
    {
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
            //inheritance from constructor
            Id = id;
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Password = password;
            Birthdate = birthDate;
            //
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