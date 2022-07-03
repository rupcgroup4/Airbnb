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
            try
            {
                Review r = new Review();
                List<Review> reviews = r.GetReviewsByApartmentId(id);
                if (reviews.Count == 0)
                {
                    return Request.CreateResponse(HttpStatusCode.NoContent);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.OK, reviews);

                }
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }
    }
}