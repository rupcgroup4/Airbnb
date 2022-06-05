using RupBNB.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models;

namespace RupBNB.Controllers
{
    public class AdminController : ApiController
    {
        public HttpResponseMessage Get(string type)
        {
            string data = "";
            try
            {
                switch (type)
                {
                    case "usersView":
                        User u = new User();
                        data = u.AdminViewUsersInfo();
                        break;
                    case "hostsView":
                        Host h = new Host();
                        data = h.AdminViewHostsInfo();
                        break;
                    case "apartmentsView":
                        Apartment a = new Apartment();
                        data = a.AdminViewApartmentsInfo();
                        break;
                }
                if (data == "")
                    return Request.CreateResponse(HttpStatusCode.NoContent);
                else
                    return Request.CreateResponse(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, ex.Message);
            }
        }
    }
}