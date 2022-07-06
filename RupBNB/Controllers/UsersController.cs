using Newtonsoft.Json.Linq;
using RupBNB.Models;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
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
                int status = user.Insert();
                //status == 0 user doesnt exists, add was added to Database
                if (status == 0)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, "");
                }
                //status == 1 user email is already exists
                else if (status == 1)
                {
                    return Request.CreateResponse(HttpStatusCode.Unauthorized, 1);
                }
                //status == 2 username is already exists
                else
                {
                    return Request.CreateResponse(HttpStatusCode.Unauthorized, 2);
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
        //GET request to get user reservations
        //return future/past reservation depending on the boolean "isFutureReservations"
        [HttpGet]
        [Route("api/Users/getUsersReservations")]
        public HttpResponseMessage getUsersReservations(string email, bool isFutureReservations)
        {
            User u = new User(email);
            try
            {   
                u.Reservations = u.UserReservations(isFutureReservations);
                if (u.Reservations.Count != 0)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, u.Reservations);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.NoContent);
                }
            } catch(Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);

            }
        }
        //GET request - profilePage.html gets the liked apartments
        //return the apartments list and status code 200 if success
        //else return error code (no content if null or internal error if was and exception)
        [HttpGet]
        [Route("api/likedApartmentsByEmail")]
        public HttpResponseMessage Get(string email)
        {
            try
            {
                User user = new User(email);
                List<LikedApartment> l = user.getUserLikedApartments();

                if (l != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, l);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.NoContent);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

    }
}