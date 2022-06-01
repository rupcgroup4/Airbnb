using RupBNB.Models;
using RupBNB.Models.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication1.Models.DAL;

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
        string img;
        bool isVerified;

        public Host(string email, string userName, string firstName, string lastName, string password,
            DateTime birthDate, DateTime userRegisteredSince, DateTime hostSince, string location, string about,
            string responseTime, string responseRate, bool isSuperHost, string img,
            bool isVerified) : base(email, userName, firstName, lastName, password, birthDate, userRegisteredSince)
        {
            this.hostSince = hostSince;
            this.location = location;
            this.about = about;
            this.responseTime = responseTime;
            this.responseRate = responseRate;
            this.isSuperHost = isSuperHost;
            this.img = img;
            this.isVerified = isVerified;
        }

        public Host() { }
        public DateTime HostSince { get => hostSince; set => hostSince = value; }
        public string Location { get => location; set => location = value; }
        public string About { get => about; set => about = value; }
        public string ResponseTime { get => responseTime; set => responseTime = value; }
        public string ResponseRate { get => responseRate; set => responseRate = value; }
        public bool IsSuperHost { get => isSuperHost; set => isSuperHost = value; }
        public string Img { get => img; set => img = value; }
        public bool IsVerified { get => isVerified; set => isVerified = value; }

        public string AdminViewHostsInfo()
        {
            HostServices ds = new HostServices();
            return ds.GetHostsInfo();
        }
    }
}