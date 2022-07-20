using CRM.Business.Data;
using CRM.Business.Entity;
using CRM.Business.Entity.Clases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace CRM.Controllers
{
    [RoutePrefix("api/campanadiplomado")]
    public class CampanaDiplomadoController : ApiController
    {
        [HttpGet]
        [Route("Recuperar_Cookie")]
        public ResultadoBase GetCookie()
        {
            CookieHeaderValue cookie = Request.Headers.GetCookies("Usuario").FirstOrDefault();
            string NombreEjecutivo = cookie.Cookies.FirstOrDefault(s => s.Name == "Usuario").Value;
            return new ResultadoBase() { Estado = "", Mensaje = NombreEjecutivo, Objeto = "" };
        }

        [HttpGet]
        [Route("listar_campana_diplomado")]
        public IEnumerable<CampanaDiplomadoEntity> Listar_Lead(string rut, string nombreempresa, string nombrepunto)
        {
            List<CampanaDiplomadoEntity> diplo = CampanaDiplomadoDataAccess.ListaCampanaDiplomado(rut, nombreempresa, nombrepunto);
            return diplo;
        }

        [HttpGet]
        [Route("listar_estados_gestion_null")]
        public IEnumerable<EstadoGestionEntity> ListarEstadosGestionNull()
        {
            List<EstadoGestionEntity> estadosgestion = CampanaDiplomadoDataAccess.ListarEstadosGestionNull();
            return estadosgestion;
        }

        [HttpGet]
        [Route("listar_sub_estados_gestion")]
        public IEnumerable<EstadoGestionEntity> ListarSubEstadosGestion(int padre)
        {
            List<EstadoGestionEntity> estadosgestion = CampanaDiplomadoDataAccess.ListarSubEstadosGestion(padre);
            return estadosgestion;
        }
        
        [HttpPost]
        [Route("Guardar_Gestion_Diplomado")]
        public ResultadoBase GuardarGestionDiplomado(GestionDiplomadoEntity web)
        {
            try
            {
                CookieHeaderValue cookie = Request.Headers.GetCookies("Rut").FirstOrDefault();
                string Rutejecutivo = cookie.Cookies.FirstOrDefault(s => s.Name == "Rut").Value;
                web.RutEjecutivo = Rutejecutivo;
                CampanaDiplomadoDataAccess.GuardarGestionDiplomado(web);
                return new ResultadoBase() { Estado = "OK", Mensaje = "Datos OK", Objeto = "entrada" };
            }
            catch (Exception ex)
            {
                var x = ex.Message.Split(';');
                return new ResultadoBase() { Estado = "ERR", Mensaje = x[1], Objeto = x[0] };
            }
        }
    }
}
