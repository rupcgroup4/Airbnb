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
        //Route to get an apartment by id
        [HttpGet]
        [Route("api/Reservations/{id}")]
        public Reservation Get(int id)
        {
            Reservation a = new Reservation();
            return a.getReservationById(id);
        }

        // POST api/<controller>
        public HttpResponseMessage Post([FromBody] Reservation res)
        {
            try
            {
                if (res.InsertReservation())
                {
                    return Request.CreateResponse(HttpStatusCode.Created, res);
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

        // PUT api/<controller>/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }

        [HttpPut]
        [Route("api/Reservations/cancelReservation")]
        public HttpResponseMessage Put([FromBody] int reservationId)
        {
            Reservation r = new Reservation();
            if (r.cancelReservation(reservationId)>0)
            {
                 return Request.CreateResponse(HttpStatusCode.OK,"");
                //return Request.CreateResponse(200);

            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
        }
    }
}