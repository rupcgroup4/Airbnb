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

        // GET api/<controller>
        public HttpResponseMessage Get()
        {
            Apartment a = new Apartment();

            string ApartmentsData = a.AdminViewApartmentsInfo();
            if (ApartmentsData != null)
            {
                return Request.CreateResponse(HttpStatusCode.OK, ApartmentsData);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
        }

        //Route to get an apartment by id
        [HttpGet]
        [Route("api/Apartments/{id}")]
        public Apartment Get(int id)
        {
            Apartment a = new Apartment();
            return a.getApartmentById(id);
        }

        //**************This will be Deleted***************Ask Yoav
        [HttpPost]
        // api/apartmentsRating
        [Route("api/apartmentsRating")]
        public HttpResponseMessage Post([FromBody] int[] rows)
        {
            Apartment a = new Apartment();
            try
            {
                List<Apartment> apartments = a.getXNumberOfApartmentsSortedByRating(rows[0], rows[1]);

               
                
                return Request.CreateResponse(HttpStatusCode.OK, apartments);

               
                
            } catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message);

            }

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

                if (apartments.Count == 1 && apartments[0].Id == -1)
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
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message);
            }
           
        }




    }
}