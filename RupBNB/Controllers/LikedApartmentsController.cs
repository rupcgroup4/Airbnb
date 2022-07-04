using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using RupBNB.Models;
using WebApplication1.Models;

namespace RupBNB.Controllers
{
    public class LikedApartmentsController : ApiController
    {
        [HttpGet]
        [Route("api/likedApartments")]
        public bool Get(string email, int id)
        {
            LikedApartment la = new LikedApartment(email, id);
            return la.LikedApartmentProcedure("SP_Is_Liked_Apartments_Exist");
        }
        //User profile gets liked apartments
        [HttpGet]
        [Route("api/likedApartmentsByEmail")]
        public HttpResponseMessage Get(string email)
        {
            try
            {
                LikedApartment la = new LikedApartment();
                List<Apartment> l = new List<Apartment>();

                l = la.GetLikedApartmentsByEmail(email);

                if (l != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, l);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.NoContent);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("api/likedApartments")]
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