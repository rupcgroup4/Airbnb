using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using RupBNB.Models.DAL;

namespace RupBNB.Models
{
    public class LikedApartment
    {
        string UserEmail;
        int apartmentId;

        public LikedApartment(string userEmail, int apartmentId)
        {
            UserEmail1 = userEmail;
            this.ApartmentId = apartmentId;
        }

        public string UserEmail1 { get => UserEmail; set => UserEmail = value; }
        public int ApartmentId { get => apartmentId; set => apartmentId = value; }

        public bool LikedApartmentProcedure(string stroredProcedure)
        {
            LikedApartmentsServices lAS = new LikedApartmentsServices();
            return lAS.LikedApartmentProcedure(this, stroredProcedure);
        }

    }
}