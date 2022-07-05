using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using WebApplication1.Models;

namespace RupBNB.Controllers
{
    public class ApartmentsController : ApiController
    {
        //GET method- gets apartment id and return HttpResponseMessage accordingly,
        //when apartment matching the id found, returns also the apartment
        [HttpGet]
        [Route("api/Apartments/{id}")] //Route to get an apartment by id
        public HttpResponseMessage Get(int id)
        {
            try
            {
                Apartment a = new Apartment();
                a = a.getApartmentById(id);

                if(a==null) //apartment matching the id not found 
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                else
                    return Request.CreateResponse(HttpStatusCode.OK, a); //return status code 200 and apartment
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
        //POST method- gets list of apartments return HttpResponseMessage accordingly,
        //List of apartments that have passed the filter
        [HttpPost]
        [Route("api/apartmentsSearch")] //Route to get apartment by query
        public HttpResponseMessage Post([FromBody] JObject data)
        {
            Apartment a = new Apartment();
            try
            {
                List<Apartment> apartments = a.getApartmentsBySearchFilter(data);
                if (apartments.Count == 0)
                {
                    return Request.CreateResponse(HttpStatusCode.NoContent);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.OK, apartments);
                }
            } 
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}