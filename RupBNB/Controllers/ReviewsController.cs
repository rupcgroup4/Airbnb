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
    public class ReviewsController : ApiController
    {
        // [Route("Employee/Gender/{Gender}/City/{CityId}"

        //Route to get an reviews by apartment by id
        [HttpGet]
        [Route("api/Reviews/apartmentId/{apartmentId}/numOfPageReview/{numOfPageReview}")]
        public HttpResponseMessage Get(int apartmentId, int numOfPageReview)
        {
            try
            {
                Review r = new Review();    
                List<Review> reviews = r.GetReviewsByApartmentId(apartmentId, numOfPageReview);
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

        //GEt- method gets apartmentId and returns the number of reviews it has
        [HttpGet]
        [Route("api/Apartments/getTotalReviews/{apartmentId}")]
        public HttpResponseMessage getTotalReviews(int apartmentId)
        {
            try
            {
                Review r = new Review();
                int totalReviews = r.getTotalReviews(apartmentId);
                if (totalReviews == 0)
                {
                    return Request.CreateResponse(HttpStatusCode.NoContent);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.OK, totalReviews);

                }
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }
    }
  
}
