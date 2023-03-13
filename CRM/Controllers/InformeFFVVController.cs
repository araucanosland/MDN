using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CRM.Business.Entity;
using CRM.Business.Entity.Clases;
using CRM.Business.Entity.Contracts;
using CRM.Business.Data;
using CRM.ActionFilters;
using CRM.Filters;
namespace CRM.Controllers
{
    public class InformeFFVVController : ApiController
    {
        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-ffvv-resumen")]
        public IEnumerable<FFVVBaseEntity> ObtenerFFVVInforme(int Periodo)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return FFVVBaseDataAccess.ListarResumenFFVVEjecutivo(token, Periodo);
        }
    }
}