using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Collections;
using System.Net.Http;
using System.Web.Http;
using CRM.Business.Entity;
using CRM.Business.Data;
using System.Net.Http.Headers;
namespace CRM.Controllers
{
    [RoutePrefix("api/busqueda-dotacion")]
    public class BuscarController : ApiController
    {
        [HttpGet]
        [Route("listar-ejecutivos")]
        public IEnumerable<DotacionEntity> obtenerDotacion()
        {
            DateTime hoy = DateTime.Now;
            CookieHeaderValue cookie = Request.Headers.GetCookies("Cargo").FirstOrDefault();
            string cargo = cookie.Cookies.FirstOrDefault(s => s.Name == "Cargo").Value;
            int codOficina = Convert.ToInt32(cookie.Cookies.FirstOrDefault(s => s.Name == "Oficina").Value);
            int periodo = Convert.ToInt32(hoy.Year.ToString() + hoy.Month.ToString().PadLeft(2,'0'));
            return DotacionDataAccess.ListarEntidades(periodo,cargo, codOficina);
        }

        [HttpGet]
        [Route("listar-ejecutivos-especial")]
        public IEnumerable<DotacionEntity> obtenerDotacionEspecial()
        {
            DateTime hoy = DateTime.Now;
            int periodo = Convert.ToInt32(hoy.Year.ToString() + hoy.Month.ToString().PadLeft(2, '0'));
            return DotacionDataAccess.ListarEntidadesEspecial(periodo);
        }
    }
}
