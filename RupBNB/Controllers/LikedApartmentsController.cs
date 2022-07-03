using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using RupBNB.Models;

namespace RupBNB.Controllers
{
    public class LikedApartmentsController : ApiController
    {
        
        public bool get(string email, int id)
        {
            LikedApartment la = new LikedApartment(email, id);
            return la.LikedApartmentProcedure("SP_Is_Liked_Apartments_Exist");
        }

        // POST api/<controller>
        public void Post([FromBody] LikedApartment la)
        {
            la.LikedApartmentProcedure("SP_Insert_Liked_Apartments");
        }

        

        [HttpDelete]
        [Route("api/deleteLikedApartment")]
        public void Delete([FromBody] LikedApartment la)
        {
            la.LikedApartmentProcedure("SP_DeleteLikedApartment");
        }
    }
}