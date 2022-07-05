using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication1.Models.DAL;

namespace WebApplication1.Controllers
{
    public class DBController : ApiController
    {

        // POST api/<controller>
        public int Post([FromBody] string value)
        {
            if (value == "host")
            {
                UploadDBServices db = new UploadDBServices();
                db.Host();

                return 1;
            }
            if (value == "listing")
            {
                UploadDBServices db = new UploadDBServices();
                return db.Listing();
            }
            if (value == "reviews")
            {
                UploadDBServices db = new UploadDBServices();
                return db.Review2();
            }

            return 0;
        }


    }
}