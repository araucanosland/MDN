using CRM.ActionFilters;
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
    [RoutePrefix("api/mantenedores")]
    public class MantenedoresController : ApiController
    {
        //[AuthorizationRequired]
        [HttpGet]
        [Route("listar-Usuarios")]
        public IEnumerable<UsuarioEntity> Lista_usuario(string Rut, int Oficina,  string RutEjecutivo)
        {
           // string token = ActionContext.Request.Headers.GetValues("Token").First();
            CookieHeaderValue cookie = Request.Headers.GetCookies("Oficina").FirstOrDefault();
       
            List<UsuarioEntity> usu = MantenedoresDataAccess.ListarUsuarios(Rut);

            return usu;
        }

        [HttpPost]
        [Route("Eliminar-Usuario")]
        public ResultadoBase Eliminar(WebIngreso web)
        {
            try
            {
                MantenedoresDataAccess.EliminarUsuario(web.RutUsuario);
                return new ResultadoBase() { Estado = "OK", Mensaje = "Datos OK", Objeto = "entrada" };
            }
            catch (Exception ex)
            {

                var x = ex.Message.Split(';');
                return new ResultadoBase() { Estado = "ERR", Mensaje = x[1], Objeto = x[0] };
            }
        }


        [AuthorizationRequired]
        [HttpGet]
        [Route("listar-Cargos")]
        public IEnumerable<CargoEntity> Lista_Cargos()
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            CookieHeaderValue cookie = Request.Headers.GetCookies("Oficina").FirstOrDefault();

            List<CargoEntity> usu = MantenedoresDataAccess.ListarCargos();

            return usu;
        }


        [AuthorizationRequired]
        [HttpGet]
        [Route("listar-Oficinas")]
        public List<OficinaDerivacionEntity> listaOficina()
        {
            return MantenedoresDataAccess.ListarOficina();
        }


        [HttpPost]
        [Route("Ingreso-Usuario")]
        public ResultadoBase IngresoUsuario(WebIngreso web)
        {
            try
            {
                MantenedoresDataAccess.InsertarUsuario(web);
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
