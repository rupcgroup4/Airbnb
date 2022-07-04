using System.Collections.Generic;
using RupBNB.Models.DAL;
using WebApplication1.Models;

namespace RupBNB.Models
{
    public class LikedApartment
    {
        string userEmail;
        int apartmentId;

        public string UserEmail { get => userEmail; set => userEmail = value; }
        public int ApartmentId { get => apartmentId; set => apartmentId = value; }

        public LikedApartment()
        {
        }

        public LikedApartment(string userEmail, int apartmentId)
        {
            this.UserEmail = userEmail;
            this.ApartmentId = apartmentId;
        }

        public bool LikedApartmentProcedure(string stroredProcedure)
        {
            LikedApartmentsServices lAS = new LikedApartmentsServices();
            return lAS.LikedApartmentProcedure(this, stroredProcedure);
        }
        public List<Apartment> GetLikedApartmentsByEmail(string email)
        {
            LikedApartmentsServices lAS = new LikedApartmentsServices();
            return lAS.GetLikedApartmentsByEmail(email);
        }

    }
}