using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using RupBNB.Models;

namespace RupBNB.Controllers
{
    public class ReviewsController : ApiController
    {
        //Route to get an reviews by apartment by id
        [HttpGet]
        [Route("api/Reviews/{id}")]
        public HttpResponseMessage Get(int id)
        {
            Review r = new Review();
            try
            {
                List<Review> reviews = r.GetReviewsByApartmentId(id);
                return Request.CreateResponse(HttpStatusCode.OK, reviews);

            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message);

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