using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using RupBNB.Models;

namespace RupBNB.Controllers
{
    public class ReservationsController : ApiController
    {
        //Route to get an reservation by id
        [HttpGet]
        [Route("api/Reservations/{id}")]
        public HttpResponseMessage Get(int id)
        {
            try
            {
                Reservation a = new Reservation();
                Reservation t = a.getReservationById(id);
                if (t != null)
                    return Request.CreateResponse(HttpStatusCode.OK, t);
                else
                    return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
          
        }


        //Post request to insert new reservation to database
        //get reservation object and create the object in the SQl table
        //return the reservation and status code 201 if success
        //else return error code
        public HttpResponseMessage Post([FromBody] Reservation res)
        {
            try
            {
                int reservationId = res.InsertReservation();
                //if id is 0, the resevation is failed to create
                if (reservationId != 0)
                {
                    return Request.CreateResponse(HttpStatusCode.Created, reservationId);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest);
                }
            } catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
            
        }

        //Route to cancel reservstion
        [HttpPut]
        [Route("api/Reservations/cancelReservation")]
        public HttpResponseMessage Put([FromBody] int reservationId)
        {
            try
            {
                Reservation r = new Reservation();
                if (r.cancelReservation(reservationId))
                {
                    return Request.CreateResponse(HttpStatusCode.OK, "");
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        //Route to apartment has review by user
        [HttpPut]
        [Route("api/Reservations/ApartmentHasReview")]
        public HttpResponseMessage PutReview([FromBody] int reservationId)
        {
            try
            {
                Reservation r = new Reservation();
                if (r.apartmentHasReview(reservationId))
                {
                    return Request.CreateResponse(HttpStatusCode.OK, "");
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}