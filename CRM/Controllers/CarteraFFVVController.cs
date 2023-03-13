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
    [RoutePrefix("api/CarteraFFVV")]
    public class CarteraFFVVController : ApiController
    {
        [HttpGet]
        [Route("lista-ejecutivo-ffvv")]
        public List<EjecutivoFFVVEntity> ListarEjecutivoFFVV()
        {
            string Token = ActionContext.Request.Headers.GetValues("Token").First();
            return CarteraFFVVDataAccess.ObtenerEjecutivoFFVV(Token);
        }

        [HttpGet]
        [Route("lista-cartera-ffvv")]
        public List<CarteraFFVVEntity> ListarCarteraFFVV(string rut_ejecutivo)
        {
            string Token = ActionContext.Request.Headers.GetValues("Token").First();
            return CarteraFFVVDataAccess.ObtenerCarteraFFVV(Token, rut_ejecutivo);
        }

        [HttpGet]
        [Route("eliminar-cartera-ffvv")]
        public ResultadoBase EliminarCarteraFFVV(int CodIngreso)
        {
            try
            {
                CarteraFFVVDataAccess.Eliminar(CodIngreso);
                return new ResultadoBase() { Estado = "OK", Mensaje = "Registro Eliminado con éxito", Objeto = CodIngreso };
            }
            catch (Exception ex)
            {
                return new ResultadoBase() { Estado = "ERR", Mensaje = "Error al eliminar " + ex.Message, Objeto = ex };
            }
        }

  
        [HttpPost]
        [Route("asigna-cartera-ffvv")]
        public IHttpActionResult AsignaCarteraFFVV(CarteraFFVVEntity empresa)
        {
            try
            {
                CarteraFFVVDataAccess.AsignaCarteraFFVV(empresa);
                return Ok("OK");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message + "Error");
            }
        }

    }
}
