using CDK.Excel;
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
    [RoutePrefix("api/digitalizacion")]

    public class DigitalizacionController : ApiController
    {


        [HttpGet]
        [Route("exportar-especialistas")]
        public HttpResponseMessage ExportarMDN(int CodOficina, string Oferta, string Estado, string FechaDesde, string FechaHasta, int tipo, string rut, string Zona, int OficinaCurse, string ZonaCurse, int OficinaPagadora, string ZonaPagadora)
        {
            DateTime eldiadesde = Convert.ToDateTime(FechaDesde);
            DateTime eldiahasta = Convert.ToDateTime(FechaHasta);


            var ingLc = DigitalizacionDataAccess.ListaLeadEspecialistaxls(CodOficina, Oferta, Estado, eldiadesde, eldiahasta, tipo, rut, Zona, OficinaCurse, ZonaCurse, OficinaPagadora, ZonaPagadora);


            Columna[] columns = {
                                    new Columna("RutAfiliado", "Rut Afiliado"),
                                    new Columna("NombreAfiliado","Nombre Afiliado"),
                                    new Columna("Oferta","Oferta"),
                                    new Columna("Folio","Folio"),
                                    new Columna("FechaVentaString","Fecha Venta"),
                                    new Columna("TipoDocumento","Tipo Documento"),
                                    new Columna("EstadoGestion","Estado Gestión"),
                                    new Columna("FechaGestionString","Fecha Gestión"),
                                    new Columna("nombreEjecutivoAsignado","Ejecutivo Asginado"),
                                    new Columna("nombreEjecutivoGestion","Ejecutivo Gestión"),
                                    new Columna("descripcionZonaOficinaCurse","Zona Curse"),
                                    new Columna("descripcionOficinaCurse","Oficina Curse"),
                                    new Columna("descripcionZonaOficinaPagadora","Zona Pagadora"),
                                    new Columna("descripcionOficinaPagadora","Oficina Pagadora"),
                                    new Columna("descripcionZonaOficinaAuditora","Zona Auditora"),
                                    new Columna("descripcionOficinaAuditora","Oficina Auditora"),                             
                                    new Columna("Responsable","Responsable")

            };

            byte[] filecontent = ExcelExportHelper.ExportExcel(ingLc, "Digitalizaciones desde el " + FechaDesde + " hasta el " + FechaHasta, true, columns);
            HttpResponseMessage response = new HttpResponseMessage();


            Stream stri = new MemoryStream(filecontent);
            response.Content = new StreamContent(stri);
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            response.Content.Headers.ContentDisposition.FileName = "Digitalizaciones_" + FechaDesde + ".xls";
            response.Content.Headers.ContentType = new MediaTypeHeaderValue(ExcelExportHelper.ExcelContentType);
            response.Content.Headers.ContentLength = stri.Length;

            return response;


        }


        [HttpGet]
        [Route("listar-Lead-Especialista")]
        public List<DigitalizacionEntity> ListaLeadEspecialista(int CodOficina, string Oferta, string Estado, string FechaDesde, string FechaHasta, int tipo, string rut, string Zona, int OficinaCurse, string ZonaCurse, int OficinaPagadora, string ZonaPagadora)
        {
            DateTime elDiaDesde = Convert.ToDateTime(FechaDesde);
            DateTime elDiahasta = Convert.ToDateTime(FechaHasta);
            return DigitalizacionDataAccess.ListaLeadEspecialista(CodOficina, Oferta, Estado, elDiaDesde, elDiahasta, tipo, rut, Zona, OficinaCurse, ZonaCurse, OficinaPagadora, ZonaPagadora);

        }


        [HttpGet]
        [Route("listar-oficina-zona")]
        public List<OficinaDerivacionEntity> ListarOficinaZona(string Zona)
        {
            return DigitalizacionDataAccess.ListarOficinaZona(Zona);

        }


        [HttpGet]
        [Route("listar-zona")]
        public List<OficinaDerivacionEntity> ListaZona()
        {
            return DigitalizacionDataAccess.ListarZona();

        }


        [HttpGet]
        [Route("listar-digitalizacion-MC")]
        public IEnumerable<DigitalizacionEntity> Lista_lead_MC(string FechaVentaDesde, string FechaVentaHasta, string RutEjecutivo, string Oferta)
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
            List<DigitalizacionEntity> digi = DigitalizacionDataAccess.ListaDigitalizacionMc(elDiaDesde, elDiahasta, RutEjecutivo, Oferta);

            return digi;
        }


        [HttpGet]
        [Route("listar-digitalizacion-Agente")]
        public IEnumerable<DigitalizacionEntity> Lista_lead_Agente(string RutEjecutivo, string FechaVentaDesde, string FechaVentaHasta, int Oficina, int Tipo, string Filtro, string Rut, string Credito, string Oferta, string Estado)
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
            List<DigitalizacionEntity> digi = DigitalizacionDataAccess.ListaDigitalizacionAgente(RutEjecutivo, elDiaDesde, elDiahasta, Oficina, Tipo, Filtro, Rut, Credito, Oferta, Estado);

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
        //// [AuthorizationRequired]
        [HttpGet]
        [Route("listar-oficina-auditor")]
        public List<OficinaDerivacionEntity> listaOficinaAuditor()
        {
            return DigitalizacionDataAccess.ListarOficinaAuditor();

        }


        [HttpGet]
        [Route("listar-misReparos_conteo")]
        public long MisReparosConteo(string RutEjecutivo, string Reparo)
        {
            CookieHeaderValue cookie = Request.Headers.GetCookies("Oficina").FirstOrDefault();
            int codOficina = Convert.ToInt32(cookie.Cookies.FirstOrDefault(s => s.Name == "Oficina").Value);
            return DigitalizacionDataAccess.ListaConteoMisReparos(codOficina, RutEjecutivo, Reparo);
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

        [HttpGet]
        [Route("listar-gestion-auditoria")]
        public DigitalizacionGestionEntity Listar_Gestion_auditoria(long Id)
        {
            //DateTime elDiaDesde = Convert.ToDateTime(dia_desde);
            //DateTime elDiahasta = Convert.ToDateTime(dia_hasta);
            //string token = ActionContext.Request.Headers.GetValues("Token").First();
            DigitalizacionGestionEntity digi = DigitalizacionDataAccess.ListaDigitalizacionGestionAuditoria(Id);

            return digi;
        }


        //  [AuthorizationRequired]
        [HttpGet]
        [Route("listar-digitalizacion")]
        public IEnumerable<DigitalizacionEntity> Lista_lead(long Id, string Rut, string Credito, string Estado, string FechaVentaDesde, string FechaVentaHasta, int Oficina, int Tipo, string Filtro, string Ejecutivo)
        {
            //  string token = ActionContext.Request.Headers.GetValues("Token").First();
            CookieHeaderValue cookie = Request.Headers.GetCookies("Oficina").FirstOrDefault();
            DateTime elDiaDesde = Convert.ToDateTime(FechaVentaDesde);
            DateTime elDiahasta = Convert.ToDateTime(FechaVentaHasta);
            //string token = ActionContext.Request.Headers.GetValues("Token").First();
            List<DigitalizacionEntity> digi = DigitalizacionDataAccess.ListaDigitalizacion(Id, Credito, Estado, elDiaDesde, elDiahasta, Oficina, Tipo, Rut, Filtro, Ejecutivo);

            return digi;
        }


        [HttpGet]
        [Route("listar-digitalizacion-auditor")]
        public IEnumerable<DigitalizacionEntity> Lista_lead_Auditor(long Id, string FechaVentaDesde, string FechaVentaHasta, int Oficina, int Tipo, string Filtro, string Ejecutivo)
        {
            //  string token = ActionContext.Request.Headers.GetValues("Token").First();
            CookieHeaderValue cookie = Request.Headers.GetCookies("Oficina").FirstOrDefault();
            DateTime elDiaDesde = Convert.ToDateTime(FechaVentaDesde);
            DateTime elDiahasta = Convert.ToDateTime(FechaVentaHasta);
            //string token = ActionContext.Request.Headers.GetValues("Token").First();
            List<DigitalizacionEntity> digi = DigitalizacionDataAccess.ListarAuditorDocInicial(elDiaDesde, elDiahasta, Oficina, Tipo, Filtro, Ejecutivo);

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


        [HttpPost]
        [Route("guardar-gestion-auditoria")]
        public ResultadoBase Ingresar_DigitalizacionAuditoria(WebGestionDigitalizacion web)
        {
            try
            {
                DigitalizacionDataAccess.Ingresar_DigitalizacionAuditoria(web);
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
        public IEnumerable<DigitalizacionEntity> Lista_lead_MisReparos(long Id, string Rut, string Credito, int Oficina, string RutEjecutivo, string Reparo)
        {
            //DateTime elDiaDesde = Convert.ToDateTime(FechaVentaDesde);
            //DateTime elDiahasta = Convert.ToDateTime(FechaVentaHasta);
            //string token = ActionContext.Request.Headers.GetValues("Token").First();
            List<DigitalizacionEntity> digi = DigitalizacionDataAccess.ListaDigitalizacionMisReparos(Id, Rut, Credito, Oficina, RutEjecutivo, Reparo);

            return digi;
        }


        [HttpGet]
        [Route("listar-digitalizacion-Reparo-Agente")]
        public IEnumerable<DigitalizacionEntity> Lista_lead_Reparos_Agente(string RutEjecutivo, string FechaVentaDesde, string FechaVentaHasta, int Oficina, int Tipo, string Filtro, string Rut, string Credito, string Oferta, string Estado)
        {
            DateTime elDiaDesde = Convert.ToDateTime(FechaVentaDesde);
            DateTime elDiahasta = Convert.ToDateTime(FechaVentaHasta);
            //string token = ActionContext.Request.Headers.GetValues("Token").First();
            List<DigitalizacionEntity> digi = DigitalizacionDataAccess.ListaDigitalizacionReparoAgente(RutEjecutivo, elDiaDesde, elDiahasta, Oficina, Tipo, Filtro, Rut, Credito, Oferta, Estado);

            return digi;
        }


        [HttpGet]
        [Route("listar-ejecutivo_asignacion")]
        public IEnumerable<EjecutivoEntity> EjecutivoAsignacion(int Periodo, int CodOficina)
        {
            //DateTime elDiaDesde = Convert.ToDateTime(FechaVentaDesde);
            //DateTime elDiahasta = Convert.ToDateTime(FechaVentaHasta);
            //string token = ActionContext.Request.Headers.GetValues("Token").First();
            List<EjecutivoEntity> digi = DigitalizacionDataAccess.Listar_Ejecutivo_Asignacion(Periodo, CodOficina);

            return digi;
        }

        [HttpGet]
        [Route("listar-ejecutivo-auditoria")]
        public IEnumerable<EjecutivoEntity> EjecutivoAuditoria(int Periodo, int CodOficina)
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
                long id_gestion = DigitalizacionDataAccess.Ingresar_Digitalizacion_Audtoria(web.Id_lead, web.Tipo_Gestion, codOficina, web.RutEjecutivo, web.Auditor);
                web.Id_Gestion = id_gestion;
                DigitalizacionDataAccess.Ingresar_Digitalizacion_Observaciones(web);
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
