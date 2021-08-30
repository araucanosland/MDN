using CDK.Excel;
using CRM.ActionFilters;
using CRM.Business.Data;
using CRM.Business.Entity;
using CRM.Business.Entity.Clases;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace CRM.Controllers
{
    [RoutePrefix("api/mantenedores")]
    public class MantenedoresController : ApiController
    {

        [HttpGet]
        [Route("exportar-log-MDN")]
        public HttpResponseMessage ExportaLogMDN(string FechaDesde, string FechaHasta, string Tipo)
        {
            DateTime eldiadesde = Convert.ToDateTime(FechaDesde);
            DateTime eldiahasta = Convert.ToDateTime(FechaHasta);
          
            var ingLc = MantenedoresDataAccess.ListarLogMDN(eldiadesde, eldiahasta, Tipo);

            Columna[] columns = {
                                    new Columna("FechaRegistroString", "Fecha Registro"),
                                    new Columna("RutEjecutivo","Rut Ejecutivo"),
                                    new Columna("NombreEjecutivo","Nombre Ejecutivo"),
                                    new Columna("Accion","Tipo Acción"),
                                    new Columna("RutUsuario", "Rut Usuario"),
                                    new Columna("NombreUsuario", "Nombre Usuario"),
                         
            };

            byte[] filecontent = ExcelExportHelper.ExportExcel(ingLc, "Log MDN desde el " + FechaDesde + " hasta el" + FechaHasta, true, columns);
            HttpResponseMessage response = new HttpResponseMessage();


            Stream stri = new MemoryStream(filecontent);
            response.Content = new StreamContent(stri);
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            response.Content.Headers.ContentDisposition.FileName = "Log_MDN.xls";
            response.Content.Headers.ContentType = new MediaTypeHeaderValue(ExcelExportHelper.ExcelContentType);
            response.Content.Headers.ContentLength = stri.Length;

            return response;


        }


        [HttpGet]
        [Route("exportar-log-Galvarino")]
        public HttpResponseMessage ExportaLogGalvarino(string FechaDesde, string FechaHasta, string Tipo)
        {
            DateTime eldiadesde = Convert.ToDateTime(FechaDesde);
            DateTime eldiahasta = Convert.ToDateTime(FechaHasta);

            var ingLc = MantenedoresDataAccess.ListarLogGalvarino(eldiadesde, eldiahasta, Tipo);

            Columna[] columns = {
                                    new Columna("FechaRegistroString", "Fecha Registro"),
                                    new Columna("RutEjecutivo","Rut Ejecutivo"),
                                    new Columna("NombreEjecutivo","Nombre Ejecutivo"),
                                    new Columna("accion","Tipo Acción"),
                                    new Columna("RutUsuario", "Rut Usuario"),
                                    new Columna("NombreUsuario", "Nombre Usuario"),

            };

            byte[] filecontent = ExcelExportHelper.ExportExcel(ingLc, "Log Galvarino desde el " + FechaDesde + " hasta el" + FechaHasta, true, columns);
            HttpResponseMessage response = new HttpResponseMessage();


            Stream stri = new MemoryStream(filecontent);
            response.Content = new StreamContent(stri);
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            response.Content.Headers.ContentDisposition.FileName = "Log_Galvarino.xls";
            response.Content.Headers.ContentType = new MediaTypeHeaderValue(ExcelExportHelper.ExcelContentType);
            response.Content.Headers.ContentLength = stri.Length;

            return response;


        }


        //[AuthorizationRequired]
        [HttpGet]
        [Route("listar-log-MDN")]
        public IEnumerable<LogMantenedor> Lista_Log_MDN(string FechaDesde,string FechaHasta,string Tipo)
        {
            //string token = ActionContext.Request.Headers.GetValues("Token").First();
           // CookieHeaderValue cookie = Request.Headers.GetCookies("Oficina").FirstOrDefault();
            DateTime elDiaDesde = Convert.ToDateTime(FechaDesde);
            DateTime elDiahasta = Convert.ToDateTime(FechaHasta);
            List<LogMantenedor> usu = MantenedoresDataAccess.ListarLogMDN(elDiaDesde, elDiahasta, Tipo);

            return usu;
        }


        [HttpGet]
        [Route("listar-log-Galvarino")]
        public IEnumerable<LogMantenedor> Lista_Log_Galvarino(string FechaDesde, string FechaHasta, string Tipo)
        {
            //string token = ActionContext.Request.Headers.GetValues("Token").First();
            // CookieHeaderValue cookie = Request.Headers.GetCookies("Oficina").FirstOrDefault();
            DateTime elDiaDesde = Convert.ToDateTime(FechaDesde);
            DateTime elDiahasta = Convert.ToDateTime(FechaHasta);
            List<LogMantenedor> usu = MantenedoresDataAccess.ListarLogGalvarino(elDiaDesde, elDiahasta, Tipo);

            return usu;
        }




        // [AuthorizationRequired]
        [HttpGet]
        [Route("listar-Usuarios-galvarino")]
        public IEnumerable<UsuarioEntity> Lista_usuario_galvarino(string Rut, string RutEjecutivo)
        {
            // string token = ActionContext.Request.Headers.GetValues("Token").First();
            CookieHeaderValue cookie = Request.Headers.GetCookies("Oficina").FirstOrDefault();

            List<UsuarioEntity> usu = MantenedoresDataAccess.ListarUsuariosGalvarino(Rut, RutEjecutivo);

            return usu;
        }

        //[AuthorizationRequired]
        [HttpGet]
        [Route("listar-Usuarios")]
        public IEnumerable<UsuarioEntity> Lista_usuario(string Rut, int Oficina, string RutEjecutivo)
        {
            // string token = ActionContext.Request.Headers.GetValues("Token").First();
            CookieHeaderValue cookie = Request.Headers.GetCookies("Oficina").FirstOrDefault();

            List<UsuarioEntity> usu = MantenedoresDataAccess.ListarUsuarios(Rut);

            return usu;
        }
        [AuthorizationRequired]
        [HttpPost]
        [Route("Eliminar-Usuario")]
        public ResultadoBase Eliminar(WebIngreso web)
        {
            try
            {
                CookieHeaderValue cookie = Request.Headers.GetCookies("Rut").FirstOrDefault();
                string Rutejecutivo = cookie.Cookies.FirstOrDefault(s => s.Name == "Rut").Value;
                web.RutEjecutivo = Rutejecutivo;
                MantenedoresDataAccess.EliminarUsuario(web.RutUsuario,web.RutEjecutivo);
                return new ResultadoBase() { Estado = "OK", Mensaje = "Datos OK", Objeto = "entrada" };
            }
            catch (Exception ex)
            {

                var x = ex.Message.Split(';');
                return new ResultadoBase() { Estado = "ERR", Mensaje = x[1], Objeto = x[0] };
            }
        }

        [AuthorizationRequired]
        [HttpPost]
        [Route("Eliminar-Usuario-galvarino")]
        public ResultadoBase EliminarGalvarino(WebIngreso web)
        {
            try
            {
                CookieHeaderValue cookie = Request.Headers.GetCookies("Rut").FirstOrDefault();
                string Rutejecutivo = cookie.Cookies.FirstOrDefault(s => s.Name == "Rut").Value;
                web.RutEjecutivo = Rutejecutivo;
                MantenedoresDataAccess.EliminarUsuarioGalvarino(web.RutUsuario,web.RutEjecutivo);
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
        [Route("listar-Cargos-galvarino")]
        public IEnumerable<CargoEntity> Lista_Cargos_galvarino()
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            CookieHeaderValue cookie = Request.Headers.GetCookies("Oficina").FirstOrDefault();

            List<CargoEntity> usu = MantenedoresDataAccess.ListarCargosGalvarino();

            return usu;
        }




        [AuthorizationRequired]
        [HttpGet]
        [Route("listar-Oficinas")]
        public List<OficinaDerivacionEntity> listaOficina()
        {
            return MantenedoresDataAccess.ListarOficina();
        }

        //[AuthorizationRequired]
        [HttpGet]
        [Route("listar-Oficinas-galvarino")]
        public List<OficinaDerivacionEntity> listaOficinagalvarino()
        {
            return MantenedoresDataAccess.ListarOficinaGalvarino();
        }
        [AuthorizationRequired]
        [HttpPost]
        [Route("Ingreso-Usuario")]
        public ResultadoBase IngresoUsuario(WebIngreso web)
        {
            try
            {
                CookieHeaderValue cookie = Request.Headers.GetCookies("Rut").FirstOrDefault();
                string Rutejecutivo = cookie.Cookies.FirstOrDefault(s => s.Name == "Rut").Value;
                web.RutEjecutivo = Rutejecutivo;
                MantenedoresDataAccess.InsertarUsuario(web);
                return new ResultadoBase() { Estado = "OK", Mensaje = "Datos OK", Objeto = "entrada" };
            }
            catch (Exception ex)
            {

                var x = ex.Message.Split(';');
                return new ResultadoBase() { Estado = "ERR", Mensaje = x[1], Objeto = x[0] };
            }

        }
        [AuthorizationRequired]
        [HttpPost]
        [Route("Ingreso-Usuario-Galvarino")]
        public ResultadoBase IngresoUsuarioGalvarino(WebIngreso web)
        {
            try
            {
                CookieHeaderValue cookie = Request.Headers.GetCookies("Rut").FirstOrDefault();
                string Rutejecutivo = cookie.Cookies.FirstOrDefault(s => s.Name == "Rut").Value;
                web.RutEjecutivo = Rutejecutivo;
                MantenedoresDataAccess.InsertarUsuarioGalvarino(web);
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
