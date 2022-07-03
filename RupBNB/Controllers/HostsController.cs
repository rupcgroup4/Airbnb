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

        [HttpGet]
        [Route("api/Hosts")]
        public HttpResponseMessage Get(string email)
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