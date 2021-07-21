using CRM.ActionFilters;
using CRM.Business.Data;
using CRM.Business.Entity;
using CRM.Business.Entity.Clases;
using CRM.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace CRM.Controllers
{
    [RoutePrefix("api/digitalizacion")]

    public class DigitalizacionController : ApiController
    {


        [HttpGet]
        [Route("listar-digitalizacion-Agente")]
        public IEnumerable<DigitalizacionEntity> Lista_lead_Agente(string RutEjecutivo, string FechaVentaDesde, string FechaVentaHasta, int Oficina, int Tipo, string Filtro)
        {
            //  string token = ActionContext.Request.Headers.GetValues("Token").First();
            CookieHeaderValue cookie = Request.Headers.GetCookies("Oficina").FirstOrDefault();
            DateTime elDiaDesde = Convert.ToDateTime(FechaVentaDesde);
            DateTime elDiahasta = Convert.ToDateTime(FechaVentaHasta);
            //string RutAsignacion;
            //if (RutEjecutivo==null)
            //    RutAsignacion = "0";
            //else
            //    RutAsignacion = RutEjecutivo;
            //string token = ActionContext.Request.Headers.GetValues("Token").First();
            List<DigitalizacionEntity> digi = DigitalizacionDataAccess.ListaDigitalizacionAgente(RutEjecutivo, elDiaDesde, elDiahasta, Oficina, Tipo, Filtro);

            return digi;
        }



        [HttpPost]
        [Route("Actualizar-Gestion-Ejecutivo")]
        public ResultadoBase ActualizarEjecutvo(WebGestionDigitalizacion web)
        {
            try
            {
                DigitalizacionDataAccess.ActualizarGestionEJecutvo(web);
                return new ResultadoBase() { Estado = "OK", Mensaje = "Datos OK", Objeto = "entrada" };
            }
            catch (Exception ex)
            {

                var x = ex.Message.Split(';');
                return new ResultadoBase() { Estado = "ERR", Mensaje = x[1], Objeto = x[0] };
            }

        }





        [HttpGet]
        [Route("listar-Lead-General-conteo")]
        public long LeadGeneralConteo(int tipo, string RutEjecutivo)
        {
            CookieHeaderValue cookie = Request.Headers.GetCookies("Oficina").FirstOrDefault();
            int codOficina = Convert.ToInt32(cookie.Cookies.FirstOrDefault(s => s.Name == "Oficina").Value);
            return DigitalizacionDataAccess.ListaConteoLeadGeneal(tipo, RutEjecutivo);
        }


        [HttpGet]
        [Route("listar-misReparos_conteo")]
        public long MisReparosConteo(string RutEjecutivo,string Reparo)
        {
            CookieHeaderValue cookie = Request.Headers.GetCookies("Oficina").FirstOrDefault();
            int codOficina = Convert.ToInt32(cookie.Cookies.FirstOrDefault(s => s.Name == "Oficina").Value);
            return DigitalizacionDataAccess.ListaConteoMisReparos(codOficina,RutEjecutivo,Reparo);
        }
        //[AuthorizationRequired]
        [HttpGet]
        [Route("listar-gestion")]
        public DigitalizacionGestionEntity Listar_Gestion(long Id)
        {
            //DateTime elDiaDesde = Convert.ToDateTime(dia_desde);
            //DateTime elDiahasta = Convert.ToDateTime(dia_hasta);
            //string token = ActionContext.Request.Headers.GetValues("Token").First();
            DigitalizacionGestionEntity digi = DigitalizacionDataAccess.ListaDigitalizacionGestion(Id);

            return digi;
        }


      //  [AuthorizationRequired]
        [HttpGet]
        [Route("listar-digitalizacion")]
        public IEnumerable<DigitalizacionEntity> Lista_lead(long Id, string Rut, string Credito, string Estado, string FechaVentaDesde, string FechaVentaHasta, int Oficina, int Tipo, string Filtro,string Ejecutivo)
        {
           //  string token = ActionContext.Request.Headers.GetValues("Token").First();
            CookieHeaderValue cookie = Request.Headers.GetCookies("Oficina").FirstOrDefault();
            DateTime elDiaDesde = Convert.ToDateTime(FechaVentaDesde);
            DateTime elDiahasta = Convert.ToDateTime(FechaVentaHasta);
            //string token = ActionContext.Request.Headers.GetValues("Token").First();
            List<DigitalizacionEntity> digi = DigitalizacionDataAccess.ListaDigitalizacion(Id, Credito, Estado, elDiaDesde, elDiahasta, Oficina, Tipo, Rut, Filtro,Ejecutivo);

            return digi;
        }

  

        //[AuthorizationRequired]
        [HttpPost]
        [Route("guardar-gestion")]
        public ResultadoBase Ingresar_Digitalizacion(WebGestionDigitalizacion web)
        {
            try
            {
                DigitalizacionDataAccess.Ingresar_Digitalizacion(web);
                return new ResultadoBase() { Estado = "OK", Mensaje = "Datos OK", Objeto = "entrada" };
            }
            catch (Exception ex)
            {

                var x = ex.Message.Split(';');
                return new ResultadoBase() { Estado = "ERR", Mensaje = x[1], Objeto = x[0] };
            }

        }
        //[AuthorizationRequired]
        [HttpPost]
        [Route("guardar-gestion-Pagare")]
        public ResultadoBase Ingresar_Digitalizacion_Pagare(WebGestionDigitalizacion web)
        {
            try
            {
                DigitalizacionDataAccess.Ingresar_Digitalizacion_Pagare(web);
                return new ResultadoBase() { Estado = "OK", Mensaje = "Datos OK", Objeto = "entrada" };
            }
            catch (Exception ex)
            {

                var x = ex.Message.Split(';');
                return new ResultadoBase() { Estado = "ERR", Mensaje = x[1], Objeto = x[0] };
            }

        }

        //[AuthorizationRequired]
        [HttpGet]
        [Route("listar-digitalizacion-misReparos")]
        public IEnumerable<DigitalizacionEntity> Lista_lead_MisReparos(long Id, string Rut, string Credito, int Oficina,string RutEjecutivo,string Reparo)
        {
            //DateTime elDiaDesde = Convert.ToDateTime(FechaVentaDesde);
            //DateTime elDiahasta = Convert.ToDateTime(FechaVentaHasta);
            //string token = ActionContext.Request.Headers.GetValues("Token").First();
            List<DigitalizacionEntity> digi = DigitalizacionDataAccess.ListaDigitalizacionMisReparos(Id, Rut, Credito, Oficina, RutEjecutivo,Reparo);

            return digi;
        }


        [HttpGet]
        [Route("listar-digitalizacion-Reparo-Agente")]
        public IEnumerable<DigitalizacionEntity> Lista_lead_Reparos_Agente(string RutEjecutivo, string FechaVentaDesde, string FechaVentaHasta, int Oficina, int Tipo, string Filtro)
        {
            DateTime elDiaDesde = Convert.ToDateTime(FechaVentaDesde);
            DateTime elDiahasta = Convert.ToDateTime(FechaVentaHasta);
            //string token = ActionContext.Request.Headers.GetValues("Token").First();
            List<DigitalizacionEntity> digi = DigitalizacionDataAccess.ListaDigitalizacionReparoAgente(RutEjecutivo, elDiaDesde, elDiahasta, Oficina, Tipo,  Filtro);

            return digi;
        }


        [HttpGet]
        [Route("listar-ejecutivo_asignacion")]
        public IEnumerable<EjecutivoEntity> EjecutivoAsignacion(int Periodo, int CodOficina )
        {
            //DateTime elDiaDesde = Convert.ToDateTime(FechaVentaDesde);
            //DateTime elDiahasta = Convert.ToDateTime(FechaVentaHasta);
            //string token = ActionContext.Request.Headers.GetValues("Token").First();
            List<EjecutivoEntity> digi = DigitalizacionDataAccess.Listar_Ejecutivo_Asignacion(Periodo, CodOficina);

            return digi;
        }

        //[AuthorizationRequired]
        [HttpPost]
        [Route("guardar-gestion-misreparos")]
        public ResultadoBase Ingresar_Digitalizacion_MisReparos(WebGestionDigitalizacion web)
        {
            try
            {
                CookieHeaderValue cookie = Request.Headers.GetCookies("Oficina").FirstOrDefault();
                int codOficina = Convert.ToInt32(cookie.Cookies.FirstOrDefault(s => s.Name == "Oficina").Value);
                DigitalizacionDataAccess.Ingresar_Digitalizacion_Audtoria(web.Id_lead, web.Tipo_Gestion, codOficina, web.RutEjecutivo);
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
