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
        //Get request - get liked apartment by user email and apartment id
        //return the apartment and status code 200 if success
        //else return error code (no content if null or internal error if was and exception)
        [HttpGet]
        [Route("api/likedApartments")]
        public HttpResponseMessage Get(string email, int id)
        {
            bool status = false;
            try
            {
                LikedApartment la = new LikedApartment(new User(email), new Apartment(id));
                status = la.LikedApartmentProcedure("SP_Is_Liked_Apartments_Exist");

                if (status)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, status);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.NoContent, "Not Found"); //
                }
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
       
        //Post request to insert new liked apartment to database
        //get LikedApartment object and create the object in the SQl table
        //return status code 200 if success
        //else return error code (internal error if was and exception)
        [HttpPost]
        [Route("api/likedApartments")]
        public HttpResponseMessage Post([FromBody] LikedApartment la)
        {
            try
            {
                la.LikedApartmentProcedure("SP_Insert_Liked_Apartments");
                //
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
         
        }


        //Delete request to delete an existing apartment from database
        //get LikedApartment object and delete the object from the SQl table
        //return status code 200 if success
        //else return error code (internal error if was and exception)
        [HttpDelete]
        [Route("api/deleteLikedApartment")]
        public HttpResponseMessage Delete([FromBody] LikedApartment la)
        {
            try
            {
                la.LikedApartmentProcedure("SP_DeleteLikedApartment");
                //
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}