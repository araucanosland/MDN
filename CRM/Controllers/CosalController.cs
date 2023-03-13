using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Collections;
using CRM.Business.Entity;
using CRM.Business.Entity.Clases;
using CRM.Business.Data;
using CRM.ActionFilters;


namespace CRM.Controllers
{
    [RoutePrefix("api/cosal")]
    public class CosalController : ApiController
    {

        [HttpPost]
        [Route("guardar-cosal")]
        public ResultadoBase GuardarInfoCosal(CosalEntity entrada)
        {
            try
            {
                CosalDataAccess.GuardaCosal(entrada.Rut_Afiliado, entrada.Oficina, entrada.Ejecutivo_ingreso);
                return new ResultadoBase()
                {
                    Estado = "OK",
                    Mensaje = "Pruebas ok",
                };
            }
            catch (Exception ex)
            {
                return new ResultadoBase()
                {
                    Estado = "ERROR",
                    Mensaje = ex.Message,
                    Objeto = ex
                };
            }
        }

    }
}
