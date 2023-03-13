using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Collections;
using System.Net.Http;
using System.Web.Http;
using CRM.Business.Entity;
using CRM.Business.Data;
using CRM.Business.Data.Mail;
using CRM.ActionFilters;

namespace CRM.Controllers
{
    [RoutePrefix("api/Contrasena")]
    public class ContrasenaController : ApiController
    {
        [HttpGet]
        [Route("restablece-contrasena")]
        public EstadoMailEntity RestableceContrasena(string rutEjecutivo)
        {
            return DbMailDataAccess.EnviaMail(rutEjecutivo);
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("consulta-estado-pass")]
        public ContrasenaEntity EstadoContrasena()
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return DbMailDataAccess.EstadoContrasena(token);
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("actualiza-contrasena")]
        public int ActualizaContrasena(string passs)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return DbMailDataAccess.ActualizaContrasena(token, passs);
        }
    }
}
