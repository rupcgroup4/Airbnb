using System.Collections.Generic;
using RupBNB.Models.DAL;
using WebApplication1.Models;

namespace RupBNB.Models
{
    public class LikedApartment
    {
        //fields
        User user;
        Apartment apartment;

        //deafult constructor
        public LikedApartment()
        {
        }

        //Constructor
        public LikedApartment(User user, Apartment apartment)
        {
            User = user;
            Apartment = apartment;
        }

        //Getters and Setters
        public User User { get => user; set => user = value; }
        public Apartment Apartment { get => apartment; set => apartment = value; }

        //Method to add or remove likeApartment 
        //get string - "stroredProcedure" that represents a storedprocedure (insert or delete)
        public bool LikedApartmentProcedure(string stroredProcedure)
        {
            LikedApartmentsServices lAS = new LikedApartmentsServices();
            return lAS.LikedApartmentProcedure(this, stroredProcedure);
        }

        //this method get user email and return a list with all his likeApartment
        public List<LikedApartment> GetLikedApartmentsByEmail(string email)
        {
            LikedApartmentsServices lAS = new LikedApartmentsServices();
            return lAS.GetLikedApartmentsByEmail(email);
        }

    }
}