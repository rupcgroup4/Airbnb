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
                a.getReservationById(id);
                if (a != null)
                    return Request.CreateResponse(HttpStatusCode.OK, a);
                else
                    return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
          
        }

        //create new reservation
        public HttpResponseMessage Post([FromBody] Reservation res)
        {
            try
            {
                if (res.InsertReservation())
                {
                    return Request.CreateResponse(HttpStatusCode.Created, res.Id);
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
    }
}