using Newtonsoft.Json.Linq;
using RupBNB.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Configuration;
using System.Web.Http;

namespace RupBNB.Controllers
{
    public class UsersController : ApiController
    {

        //Post request to insert new user to database
        //get user object and create the object in the SQl table
        //return the user and status code 200 if success
        //else return error code (unautorized if already in the system or internal error if was and exception)
        // POST api/<controller>
        public HttpResponseMessage Post([FromBody] User user)
        {
            try
            {
                User signedUser = user.Insert();

                if (signedUser != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, signedUser);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.Unauthorized);
                }

            } catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }

        }

        //post request when user login
        //get email and password of the user
        //get the user from the data base and check if the passwords are match
        //return the user and status code 200 if success
        //else return error code (unautorized if already in the system or internal error if was and exception)
        [HttpPost]
        [Route("api/Users/userlogin")]
        public HttpResponseMessage userlogin([FromBody] JObject emailAndPassword)
        {
            try
            {
                string email = emailAndPassword.First.First.ToString();
                string password = emailAndPassword.Last.First.ToString();

                User user = new User();
                user = user.getUserByEmail(email);

                if (user != null)   //user matching the inputed email found
                {
                    if (user.Password == password)//password is correct
                    {
                        return Request.CreateResponse(HttpStatusCode.OK, user);
                    }
                    else //password isn't correct
                    {
                        return Request.CreateResponse(HttpStatusCode.Unauthorized);
                    }
                }
                else //user matching the inputed email not found
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }
            } catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
            
        }

        //get request to get user reservations
        //return future/past reservation depending on the boolean "isFutureReservations"
        [HttpGet]
        [Route("api/Users/getUsersReservations")]
        public HttpResponseMessage getUsersReservations(string email, bool isFutureReservations)
        {
            User u = new User();
            try
            {   
                //userReservationData is JObject (reservation and apartment fields)
                string usersReservationsData = u.getUsersReservations(email, isFutureReservations);
                if (usersReservationsData != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, usersReservationsData);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }
            } catch(Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }

        }

    }
}