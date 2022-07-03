using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace RupBNB.Controllers
{
    public class HostsController : ApiController
    {
        //Route to get an host by email
        [HttpGet]
        [Route("api/Hosts")]
        public HttpResponseMessage Get(string email)
        {
            try
            {
                Host h = new Host();
                h = h.GetHostByEmail(email);

                if (h != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, h);
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