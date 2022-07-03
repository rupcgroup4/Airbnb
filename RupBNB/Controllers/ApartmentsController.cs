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
        //Route to get an apartment by id
        [HttpGet]
        [Route("api/Apartments/{id}")]
        public Apartment Get(int id)
        {
            Apartment a = new Apartment();
            return a.getApartmentById(id);
        }

     
        //Route to get apartment by query
        [HttpPost]
        // api/apartmentsSearch
        [Route("api/apartmentsSearch")]
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