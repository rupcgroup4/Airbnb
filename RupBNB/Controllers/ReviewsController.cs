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
        //GET method - gets apartment id and numOfPageReview,
        //numOfPageReview represent an indication of which pagination page we are on,
        //and makes a SQL query for the amount of 6 reviews
        [HttpGet]
        [Route("api/Reviews/apartmentId/{apartmentId}/numOfPageReview/{numOfPageReview}")] //Route to get an reviews by apartment by id
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

        //GET - method gets apartmentId and returns the number of reviews it has
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
        //Post request to insert new review to database
        //get review object and create the object in the SQl table
        //return true and status code 201 if success
        //else return error code
        public HttpResponseMessage Post([FromBody] Review rev)
        {
            try
            {
                bool status = rev.InsertReview();
                if (status)
                {
                    return Request.CreateResponse(HttpStatusCode.Created, status);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }

        }
    }
  
}
