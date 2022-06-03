using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
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
        [HttpGet]
       [Route("api/Apartments/{id}")]
        public Apartment Get(int id)
        {
            Apartment a = new Apartment();
            return a.getApartmentById(id);
        }

        [HttpPost]
        // api/companylogin
        [Route("api/apartmentsRating")]
        public HttpResponseMessage Post([FromBody] int[] rows)
        {
            Apartment a = new Apartment();
            List<Apartment> apartments = a.getXNumberOfApartmentsSortedByRating(rows[0], rows[1]);

            if(apartments.Count > 0)
            {
                return Request.CreateResponse(HttpStatusCode.OK, apartments);

            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
        }



        // POST api/<controller>
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}