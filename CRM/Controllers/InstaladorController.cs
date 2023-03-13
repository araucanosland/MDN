using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Collections;
using System.Net.Http;
using System.Web.Http;
using CRM.Business.Entity;
using CRM.Business.Entity.Clases;
using CRM.Business.Data;
using CRM.ActionFilters;

namespace CRM.Controllers
{
    [RoutePrefix("api/instalador-actualizacion")]
    public class InstaladorController : ApiController
    {
        [AuthorizationRequired]
        [HttpGet]
        [Route("obtener-actualizacion")]
        public IEnumerable<InstaladorEntity> ObtenerDatosInstalacion(int instalacion)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return InstalacionDataAccess.ObInstalacion(instalacion);
        }

        [AuthorizationRequired]
        [HttpPost]
        [Route("update-intalador")]
        public ResultadoBase ActualizaEstadoIntalador()
        {
            try
            {
                string token = ActionContext.Request.Headers.GetValues("Token").First();
                InstalacionDataAccess.UpdateInstalacion(token);
                return new ResultadoBase() { Estado = "OK", Mensaje = "Exito" };
            }
            catch (Exception ex)
            {
                return new ResultadoBase() { Estado = "ERR", Mensaje = "Error", Objeto = ex };
            }

        }
    }
}
