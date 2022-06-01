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
        public HttpResponseMessage Get()
        {
            Host h = new Host();
            string hostsData = h.AdminViewHostsInfo();

            if (hostsData != null)
            {
                return Request.CreateResponse(HttpStatusCode.OK, hostsData);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
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