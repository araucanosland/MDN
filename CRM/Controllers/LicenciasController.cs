using CDK.Excel;
using CRM.ActionFilters;
using CRM.Business.Data;
using CRM.Business.Entity;
using CRM.Business.Entity.Clases;
using iTextSharp.text;
using iTextSharp.text.pdf;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Http;

using static CRM.Business.Entity.BusquedaLicenciasEntity;

namespace CRM.Controllers
{
    [RoutePrefix("api/Licencias")]
    public class LicenciasController : ApiController
    {




        // [AuthorizationRequired]
        [HttpGet]
        [Route("exportar-Visualizacion-Auditoria")]
        public HttpResponseMessage ListaLicenciasIngresadasAuditoriaXLS(string folioLic, string diadesde, string diahasta, int codOficina, int tipoSeleccion, int estadoRecepcion, string responsable)
        {
            try
            {
                List<AuditoriaLicenciasEntity> ingLc = IngresolicenciaDataAccess.ObtenerLicenciasAuditoriaXLS(folioLic, diadesde, diahasta, codOficina, tipoSeleccion, estadoRecepcion, responsable);

                DateTime elDia = Convert.ToDateTime(diadesde);
                DateTime elDiahasta = Convert.ToDateTime(diahasta);

                string hoy = DateTime.Now.ToString("dd/MM/yyyy");
                Columna[] columns = {
                                    new Columna("FolioLicencia", "Folio LM"),
                                    new Columna("RutAfiliado","Rut Afiliado"),
                                    new Columna("NombreAfiliado","Nombre Afiliado"),
                                    new Columna("FechaDato", "Fecha Ingreso"),
                                    new Columna("FechadocumentosString", "Fecha Estado Oficina"),
                                    new Columna("Fechaauditoria", "Fecha Estado Auditoría"),
                                    new Columna("OficinaDescripcion", "Sucursal"),
                                    new Columna("FormatoLM", "FormatoLM"),
                                    new Columna("DescripcionesBanner", "Banner"),
                                    new Columna("descripcionviaIngreso", "Vía Ingreso"),
                                    new Columna("descripcionquienEnvia", "Quién Envía"),
                                    new Columna("Responsable", "Responsable"),
                                    new Columna("estadoLicencia", "Estado Oficina"),
                                    new Columna("descripcionEstadoRevision", "Estado Aduitoría"),
                                    new Columna("OrdenaNombre", "Usuario Modificación"),
                                    new Columna("FormatoLmIncompleta", "Licencia Médica Incompleta"),
                                    new Columna("Formatolmnolegible", "Licencia Médica No Legible"),
                                    new Columna("Formatolmsindiagnostico", "Licencia Médica Sin Diagnóstico a la Vista"),
                                    new Columna("Formatolmsoncarta", "Sin Carta de Autorización para Abrir Licencia Médica"),
                                    new Columna("FormatoFolionovalido", "Folio no Válido"),
                                    new Columna("FormatoOtromotivo", "Otro Motivo")


            };

                byte[] filecontent = ExcelExportHelper.ExportExcel(ingLc, "Reporte LM Auditoría desde el " + diadesde + " hasta el " + diahasta, true, columns);
                HttpResponseMessage response = new HttpResponseMessage();


                Stream stri = new MemoryStream(filecontent);
                response.Content = new StreamContent(stri);
                response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
                response.Content.Headers.ContentDisposition.FileName = "LM_Reporte_" + hoy.Replace("-", "_").Replace("/", "_") + ".xls";
                response.Content.Headers.ContentType = new MediaTypeHeaderValue(ExcelExportHelper.ExcelContentType);
                response.Content.Headers.ContentLength = stri.Length;

                return response;
            }
            catch (Exception ex)
            {

                throw ex;
            }



        }


        [AuthorizationRequired]
        [HttpGet]
        [Route("licencia-data-auditoria-oficina-conteo")]
        public long IngresadasAuditoriaOficinaConteo()
        {
            CookieHeaderValue cookie = Request.Headers.GetCookies("Oficina").FirstOrDefault();
            int codOficina = Convert.ToInt32(cookie.Cookies.FirstOrDefault(s => s.Name == "Oficina").Value);
            return IngresolicenciaDataAccess.ListaAuditoriaOficinaConteo(codOficina);
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-licencias-derivada-oficina-conteo")]
        public long IngresadasDerivadaOficinaConteo()
        {
            CookieHeaderValue cookie = Request.Headers.GetCookies("Oficina").FirstOrDefault();
            int codOficina = Convert.ToInt32(cookie.Cookies.FirstOrDefault(s => s.Name == "Oficina").Value);
            return IngresolicenciaDataAccess.ListaDereivadaOficinaConteo(codOficina);
        }



        [AuthorizationRequired]
        [HttpGet]
        [Route("licencia-data-auditoria")]
        public AuditoriaLicenciasEntity IngresadasAuditoria(long codIngreso)
        {


            string token = ActionContext.Request.Headers.GetValues("Token").First();
            AuditoriaLicenciasEntity ingLc = IngresolicenciaDataAccess.ObtenerAuditoriaBycodIngreso(codIngreso);

            return ingLc;
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-licencias-devuelta-tata")]
        public IEnumerable<LicenciasDevueltas> ListaLMdevueltastata(string folioLM, string dia_desde, string dia_hasta, int codOficina)
        {

            string token = ActionContext.Request.Headers.GetValues("Token").First();
            List<LicenciasDevueltas> ingLc = IngresolicenciaDataAccess.ListaLMdevueltasTaTa(folioLM, dia_desde, dia_hasta, codOficina);

            return ingLc;


        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-licencias-devuelta-compin")]
        public IEnumerable<LicenciasDevueltas> ListaLMdevueltasCompin(string folioLM, string dia_desde, string dia_hasta, int codOficina)
        {

            string token = ActionContext.Request.Headers.GetValues("Token").First();
            List<LicenciasDevueltas> ingLc = IngresolicenciaDataAccess.ListaLMdevueltasCompin(folioLM, dia_desde, dia_hasta, codOficina);

            return ingLc;


        }
        //[AuthorizationRequired]
        [HttpGet]
        [Route("exportar-Visualizacion-RRLL")]
        public HttpResponseMessage ExportarXLSRRLL(string Folio, string diadesde, string diahasta, int codOficina, string responsable, string fechaenviodesde, string fechaenviohasta)
        {
            DateTime eldiadesde = Convert.ToDateTime(diadesde);
            DateTime eldiahasta = Convert.ToDateTime(diahasta);
            DateTime eldiadesdeEnvio = Convert.ToDateTime(fechaenviodesde);
            DateTime eldiahastaEnvio = Convert.ToDateTime(fechaenviohasta);
            var ingLc = IngresolicenciaDataAccess.ListaLMresponsableExcel(Folio, diadesde, diahasta, codOficina, responsable, fechaenviodesde, fechaenviohasta);

            Columna[] columns = {
                                    new Columna("FolioLicencia", "Folio LM"),
                                    new Columna("RutAfiliado","Rut Afiliado"),
                                    new Columna("NombreAfiliado","Nombre Afiliado"),
                                    new Columna("Oficina","Oficina"),
                                    new Columna("FechaIngreso", "Fecha Ingreso"),
                                    new Columna("fechaRegistro", "Fecha Auditoría"),
                                    new Columna("descripcionEstadoRevision", "Estado Auditoría"),
                                    new Columna("Responsable", "Estado"),
                                    new Columna("[Trab. Sin datos en Sistema]", "[Trab. Sin datos en Sistema]"),

            };

            byte[] filecontent = ExcelExportHelper.ExportExcel(ingLc, "LM RRLL desde el " + diadesde + " hasta el" + diahasta, true, columns);
            HttpResponseMessage response = new HttpResponseMessage();


            Stream stri = new MemoryStream(filecontent);
            response.Content = new StreamContent(stri);
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            response.Content.Headers.ContentDisposition.FileName = "LM_RRLL_" + diahasta.Replace("-", "_").Replace("/", "_") + ".xls";
            response.Content.Headers.ContentType = new MediaTypeHeaderValue(ExcelExportHelper.ExcelContentType);
            response.Content.Headers.ContentLength = stri.Length;

            return response;


        }



        [HttpGet]
        [Route("exportar-Visualizacion-RRLL-Carga-Tata")]
        public HttpResponseMessage ExportarXLSRRLLCargaTata()
        {

            var ingLc = IngresolicenciaDataAccess.ListaLMresponsableExcelCarga();

            Columna[] columns = {
                                    new Columna("Folio", "Folio LM"),
                                    new Columna("Estado","Estado Tata"),
                                    new Columna("fechaSubidaTATA","Fecha Subida Tata"),
                                    new Columna("fechaSubidaCompin","Fecha Subida Compínm"),
                                    new Columna("SubComision", "SubComosión"),
                                    new Columna("CargaFolio", "Valida Carga Folio"),

            };

            byte[] filecontent = ExcelExportHelper.ExportExcel(ingLc, "Excel validación proceso de carga", true, columns);
            HttpResponseMessage response = new HttpResponseMessage();


            Stream stri = new MemoryStream(filecontent);
            response.Content = new StreamContent(stri);
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            response.Content.Headers.ContentDisposition.FileName = "LM_proceso_carga_Tata.xls";
            response.Content.Headers.ContentType = new MediaTypeHeaderValue(ExcelExportHelper.ExcelContentType);
            response.Content.Headers.ContentLength = stri.Length;

            return response;


        }



        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-licencias-responsable-cierre")]
        public IEnumerable<Ingresolicencia> ListaLMcierreResponsable(string folioLM, string dia_desde, string dia_hasta, int codOficina, string responsable, string fechaEnviodesde, string fechaEnviohasta)
        {

            string token = ActionContext.Request.Headers.GetValues("Token").First();
            List<Ingresolicencia> ingLc = IngresolicenciaDataAccess.ListaLMresponsableCierre(folioLM, dia_desde, dia_hasta, codOficina, responsable, fechaEnviodesde, fechaEnviohasta);

            return ingLc;


        }


        [AuthorizationRequired]
        [HttpGet]
        [Route("licencia-devueltas-compin")]
        public long IngresadasdevueltasCompinConteo()
        {
            CookieHeaderValue cookie = Request.Headers.GetCookies("Oficina").FirstOrDefault();
            int codOficina = Convert.ToInt32(cookie.Cookies.FirstOrDefault(s => s.Name == "Oficina").Value);
            return IngresolicenciaDataAccess.ListadevueltasConteo(codOficina);
        }


        [AuthorizationRequired]
        [HttpGet]
        [Route("licencia-devueltas-tata-conteo")]
        public long IngresadasdevueltasTataConteo()
        {
            CookieHeaderValue cookie = Request.Headers.GetCookies("Oficina").FirstOrDefault();
            int codOficina = Convert.ToInt32(cookie.Cookies.FirstOrDefault(s => s.Name == "Oficina").Value);
            return IngresolicenciaDataAccess.ListadevueltasConteo(codOficina);
        }




        [AuthorizationRequired]
        [HttpGet]
        [Route("licencia-responsable-cierre-conteo")]
        public long IngresadasresponsablecierreConteo()
        {
            CookieHeaderValue cookie = Request.Headers.GetCookies("Oficina").FirstOrDefault();
            int codOficina = Convert.ToInt32(cookie.Cookies.FirstOrDefault(s => s.Name == "Oficina").Value);
            return IngresolicenciaDataAccess.ListaresponsablecierreConteo(codOficina);
        }


        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-licencias-derivada-oficina")]
        public IEnumerable<AuditoriaLicenciasEntity> ListaLMDerivadas(string folioLic, string diadesde, string diahasta, int codOficina)
        {


            string token = ActionContext.Request.Headers.GetValues("Token").First();
            List<AuditoriaLicenciasEntity> ingLc = IngresolicenciaDataAccess.ListaLMDerivadas(folioLic, diadesde, diahasta, codOficina);

            return ingLc;
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-licencias-auditoria-oficina")]
        public IEnumerable<AuditoriaLicenciasEntity> ListaLicenciasIngresadasAuditoriaOficina(string folioLic, string diadesde, string diahasta, int codOficina, int tipoSeleccion, int estadoRecepcion, string Responsable)
        {

            string token = ActionContext.Request.Headers.GetValues("Token").First();
            List<AuditoriaLicenciasEntity> ingLc = IngresolicenciaDataAccess.ObtenerLicenciasAuditoriaOficina(folioLic, diadesde, diahasta, codOficina, tipoSeleccion, estadoRecepcion, Responsable);

            return ingLc;


        }



        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-licencias-auditoria")]
        public IEnumerable<AuditoriaLicenciasEntity> ListaLicenciasIngresadasAuditoria(string folioLic, string diadesde, string diahasta, int codOficina, int tipoSeleccion, int estadoRecepcion, string responsable)
        {


            string token = ActionContext.Request.Headers.GetValues("Token").First();
            List<AuditoriaLicenciasEntity> ingLc = IngresolicenciaDataAccess.ObtenerLicenciasAuditoria(folioLic, diadesde, diahasta, codOficina, tipoSeleccion, estadoRecepcion, responsable);

            return ingLc;
        }


        //[AuthorizationRequired]
        [HttpGet]
        [Route("lista-licencias-rut")]
        public IEnumerable<BusquedaLicenciasEntity> ListaLicenciasIngresadasRut(string rut)
        {

            List<BaseLicencia> Retorno = new List<BaseLicencia>();
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            List<BusquedaLicenciasEntity> ingLc = IngresolicenciaDataAccess.ObtenerLicenciasByRut(rut.Replace(".", ""));

            return ingLc;


        }


        //[AuthorizationRequired]
        [HttpGet]
        [Route("lista-licencias-dia")]
        public IEnumerable<BaseLicencia> ListaLicenciasIngresadas(int codOficina, string dia)
        {

            try
            {
                DateTime elDia = Convert.ToDateTime(dia);

                string token = ActionContext.Request.Headers.GetValues("Token").First();
                List<Ingresolicencia> ingLc = IngresolicenciaDataAccess.ObtenerEntidadesByOficina(codOficina, elDia);
                List<BaseLicencia> Retorno = new List<BaseLicencia>();

                ingLc.ForEach(lc =>
                {
                    Retorno.Add(new BaseLicencia
                    {
                        IngresoData = lc,
                        EstadoData = EstadolicenciaDataAccess.ObtenerPorID(lc.CodEstado),
                        NombreEjecutivo = DotacionDataAccess.ObtenerByRut(lc.RutEjecutivo).Nombres
                    });
                });
                return Retorno;
            }
            catch (Exception ex)
            {

                throw;
            }

        }



        [HttpGet]
        [Route("lista-licencias-dia-index")]
        public IEnumerable<BaseLicencia> ListaLicenciasIngresadasIndex(string responsable, string estado, string folio, string diadesde, string diahasta, string formatoLM, int codOficina)
        {

            DateTime eldiadesde = Convert.ToDateTime(diadesde);
            DateTime eldiahasta = Convert.ToDateTime(diahasta);
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            List<Ingresolicencia> ingLc = IngresolicenciaDataAccess.ObtenerEntidadesByOficinaFiltro(responsable, estado, folio, eldiadesde, eldiahasta, formatoLM, codOficina);
            List<BaseLicencia> Retorno = new List<BaseLicencia>();

            ingLc.ForEach(lc =>
            {
                Retorno.Add(new BaseLicencia
                {
                    IngresoData = lc,
                    //EstadoData = EstadolicenciaDataAccess.ObtenerPorID(lc.CodEstado),
                    //NombreEjecutivo = DotacionDataAccess.ObtenerByRut(lc.RutEjecutivo).Nombres
                });
            });
            return Retorno;



        }




        [HttpGet]
        [Route("lista-licencias-manual-presencial")]
        public IEnumerable<BaseLicencia> ListaLicenciaManualPresencial(string diadesde, string diahasta, string formatoLM, int codOficina)
        {

            DateTime eldiadesde = Convert.ToDateTime(diadesde);
            DateTime eldiahasta = Convert.ToDateTime(diahasta);
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            List<Ingresolicencia> ingLc = IngresolicenciaDataAccess.ListaLicenciaManualPresencial(eldiadesde, eldiahasta, formatoLM, codOficina);
            List<BaseLicencia> Retorno = new List<BaseLicencia>();

            ingLc.ForEach(lc =>
            {
                Retorno.Add(new BaseLicencia
                {
                    IngresoData = lc,
                    //EstadoData = EstadolicenciaDataAccess.ObtenerPorID(lc.CodEstado),
                    //NombreEjecutivo = DotacionDataAccess.ObtenerByRut(lc.RutEjecutivo).Nombres
                });
            });

            return Retorno;



        }




        [AuthorizationRequired]
        [HttpGet]
        [Route("licencia-data")]
        public BaseLicencia DatoLicenciaIngresada(long codIngreso)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            Ingresolicencia ingLc = IngresolicenciaDataAccess.ObtenerPorID(codIngreso);
            return new BaseLicencia
            {
                IngresoData = ingLc,
                DocumentosFaltantes = DocumentosFaltantesLMDataAccess.ObtenerByCodIngresoLM(codIngreso),
                EstadoData = EstadolicenciaDataAccess.ObtenerPorID(ingLc.CodEstado),
                NombreEjecutivo = DotacionDataAccess.ObtenerByRut(ingLc.RutEjecutivo).Nombres
            };
        }



        [AuthorizationRequired]
        [HttpGet]
        [Route("guardar-responsable")]
        public ResultadoBase GuardarResponsable(string folioLM, string responsable, string codingreso)
        {
            try
            {
                string token = ActionContext.Request.Headers.GetValues("Token").First();
                WebIngresoLicencia entrada = new WebIngresoLicencia();
                entrada.FolioLc = folioLM;
                var codIngreso = IngresolicenciaDataAccess.GuardarResponsable(folioLM, responsable, codingreso, token);

                return new ResultadoBase() { Estado = "OK", Mensaje = "Responsable agregado con éxito", Objeto = entrada };

            }
            catch (Exception ex)
            {

                var x = ex.Message.Split(';');
                return new ResultadoBase() { Estado = "ERR", Mensaje = x[1], Objeto = x[0] };
            }
        }


        [AuthorizationRequired]
        [HttpGet]
        [Route("guardar-devolucion-compin")]
        public ResultadoBase GuardardevolucionCompin(string CodIngreso, string estadoDevuelta)
        {
            try
            {

                var codIngreso = IngresolicenciaDataAccess.GuardarDevolucionCompin(CodIngreso, estadoDevuelta);
                WebIngresoLicencia entrada = new WebIngresoLicencia();
                entrada.CodIngreso = codIngreso;

                return new ResultadoBase() { Estado = "OK", Mensaje = "Responsable agregado con éxito", Objeto = entrada };

            }
            catch (Exception ex)
            {

                var x = ex.Message.Split(';');
                return new ResultadoBase() { Estado = "ERR", Mensaje = x[1], Objeto = x[0] };
            }
        }
        [AuthorizationRequired]
        [HttpGet]
        [Route("guardar-devolucion-tata")]
        public ResultadoBase GuardardevolucionTATA(string CodIngreso, string estadoDevuelta)
        {
            try
            {
                string token = ActionContext.Request.Headers.GetValues("Token").First();
                var codIngreso = IngresolicenciaDataAccess.GuardarDevoluciontata(CodIngreso, estadoDevuelta, token);
                WebIngresoLicencia entrada = new WebIngresoLicencia();
                entrada.CodIngreso = codIngreso;

                return new ResultadoBase() { Estado = "OK", Mensaje = "Responsable agregado con éxito", Objeto = entrada };

            }
            catch (Exception ex)
            {

                var x = ex.Message.Split(';');
                return new ResultadoBase() { Estado = "ERR", Mensaje = x[1], Objeto = x[0] };
            }
        }


        [AuthorizationRequired]
        [HttpPost]
        [Route("guardar-licencia")]
        public ResultadoBase GuardarLicencia(WebIngresoLicencia entrada)
        {


            try
            {

                string token = ActionContext.Request.Headers.GetValues("Token").First();
                Ingresolicencia ing = new Ingresolicencia();

                ing.CodIngreso = entrada.CodIngreso;
                ing.CodEstado = entrada.DeterminateStatus();
                ing.FechaIngreso = DateTime.Now;
                ing.FolioLicencia = entrada.FolioLc;
                ing.Oficina = entrada.CodOficina;
                ing.RutAfiliado = entrada.RutAfiliado.Replace(".", "");
                ing.NombreAfiliado = entrada.NombreAfiliado;
                ing.SinDatosEnSistema = entrada.SinDatosEnSistema;
                ing.FormatoLM = entrada.FormatoLM;
                ing.OficinaDerivacion = entrada.OfiDerivacion;


                if (entrada.CantidadDiasLM > 0)
                {
                    ing.CantidadDiasLM = entrada.CantidadDiasLM;
                }
                else
                {
                    ing.CantidadDiasLM = null;
                }

                if (entrada.FechaInicioLM != null && entrada.FechaInicioLM.Length > 0)
                {
                    ing.FechaInicioLM = Convert.ToDateTime(entrada.FechaInicioLM);
                }
                else
                {
                    ing.FechaInicioLM = null;
                }

                if (entrada.FechaHastaLM != null && entrada.FechaHastaLM.Length > 0)
                {
                    ing.FechaHastaLM = Convert.ToDateTime(entrada.FechaHastaLM);
                }
                else
                {
                    ing.FechaHastaLM = null;
                }

                if (entrada.TipoLM > 0)
                {
                    ing.TipoLM = entrada.TipoLM;
                }
                else
                {
                    ing.TipoLM = null;
                }

                ing.viaIngresoLicenica = entrada.ViaIngresoLicenica;
                ing.quienEnvia = entrada.QuienEnvia;


                ing.email = entrada.Email;
                ing.telefono = entrada.Telefono;
                ing.esBanner = entrada.EsBanner;

                var codIngreso = IngresolicenciaDataAccess.Guardar(ing, token);
                var codFinal = entrada.CodIngreso > 0 ? entrada.CodIngreso : codIngreso;
                var tipo = entrada.tipoSeleccion;



                DocumentosFaltantesLM dcm = new DocumentosFaltantesLM(
                    entrada.FolioLc,
                    entrada.RutAfiliado.Replace(".", ""),
                    codFinal,
                    entrada.LiqMes1 == 1,
                    entrada.LiqMes2 == 1,
                    entrada.LiqMes3 == 1,
                    entrada.LiqMes4 == 1,
                    entrada.LiqMes5 == 1,
                    entrada.LiqMes6 == 1,
                    entrada.CertificadoRenta == 1,
                    entrada.Acredita90 == 1,
                    entrada.Acredita180 == 1,
                    entrada.Otros == 1,
                    entrada.Comentarios,
                    entrada.FaltaDocumentacion == 1,
                    entrada.CertificadoAfiliacionAFP == 1,
                    entrada.CertPagPensiones == 1,
                    tipo,
                    entrada.Imagen == 1,
                    entrada.diagnostico == 1,
                    entrada.sinfirma == 1,
                    entrada.contrato == 1,
                    entrada.cedular_identidad == 1,
                    entrada.seccion_c == 1,
                    entrada.certificado_nacimiento == 1,
                    entrada.mutual == 1,
                    entrada.isapre == 1,
                    entrada.FechaLiquidacion1,
                    entrada.FechaLiquidacion2,
                    entrada.FechaLiquidacion3,
                    entrada.FechaLiquidacion4,
                    entrada.FechaLiquidacion5,
                    entrada.FechaLiquidacion6,
                    entrada.rutusuario,
                    entrada.cartaAutorizacion == 1,
                    entrada.firmaEmpleador == 1


                );

                DocumentosFaltantesLMDataAccess.GuardarEntrada(dcm, token);





                return new ResultadoBase() { Estado = "OK", Mensaje = "Licencia ingresada con éxito", Objeto = entrada };


            }
            catch (Exception ex)
            {
                var x = ex.Message.Split(';');
                return new ResultadoBase() { Estado = "ERR", Mensaje = x[1], Objeto = x[0] };

                //if (base1.Estado.Equals("ERR"))
                //{
                //    return new ResultadoBase() { Estado = "ERR", Mensaje = x[0], Objeto = ex };
                //}
                //else
                //{
                //    return new ResultadoBase() { Estado = "ERR", Mensaje = x[1], Objeto = ex };
                //}


            }
        }





        [AuthorizationRequired]
        [HttpPost]
        [Route("guardar-licencia-Auditoria-Reparos")]
        public ResultadoBase GuardarLicenciaAudtoriaReparos(WebIngresoLicenciaReparosAuditoria entrada)
        {
            try
            {
                string token = ActionContext.Request.Headers.GetValues("Token").First();
                Ingresolicencia ing = new Ingresolicencia();

                var tipo = entrada.tipoSeleccion;
                var codFinal = entrada.CodIngreso;

                DocumentosFaltantesLM dcm = new DocumentosFaltantesLM(
                         "",
                         "",
                         codFinal,
                         entrada.LiqMes1 == 1,
                         entrada.LiqMes2 == 1,
                         entrada.LiqMes3 == 1,
                         entrada.LiqMes4 == 1,
                         entrada.LiqMes5 == 1,
                         entrada.LiqMes6 == 1,
                         entrada.CertificadoRenta == 1,
                         entrada.Acredita90 == 1,
                         false,
                         entrada.Otros == 1,
                         entrada.Comentarios,
                         entrada.FaltaDocumentacion == 1,
                         entrada.CertificadoAfiliacionAFP == 1,
                         entrada.CertPagPensiones == 1,
                         tipo,
                         entrada.Imagen == 1,
                         entrada.diagnostico == 1,
                         entrada.sinfirma == 1,
                         entrada.contrato == 1,
                         entrada.cedular_identidad == 1,
                         entrada.seccion_c == 1,
                         entrada.certificado_nacimiento == 1,
                         entrada.mutual == 1,
                         entrada.isapre == 1,
                         entrada.fechaliquidacion1,
                         entrada.fechaliquidacion2,
                         entrada.fechaliquidacion3,
                         entrada.fechaliquidacion4,
                         entrada.fechaliquidacion5,
                         entrada.fechaliquidacion6,
                         "",
                         entrada.cartaAutorizacion == 1,
                         entrada.FaltaFirmaempleador == 0

                     );
                DocumentosFaltantesLMDataAccess.GuardarEntradaAudtoriaReparos(dcm, token);





                return new ResultadoBase() { Estado = "OK", Mensaje = "Licencia ingresada con éxito", Objeto = entrada };


            }
            catch (Exception ex)
            {
                var x = ex.Message.Split(';');
                return new ResultadoBase() { Estado = "ERR", Mensaje = x[1], Objeto = x[0] };


            }
        }



        [Route("guardar-licencia-auditoria")]
        public ResultadoBase GuardarLicenciaAuditoria(WebIngresoAuditoria entrada)
        {


            try
            {

                string token = ActionContext.Request.Headers.GetValues("Token").First();
                Ingresolicencia ing = new Ingresolicencia();
                ing.CodIngreso = entrada.CodIngreso;
                ing.EstadoRevision = entrada.estadoRevision;
                ing.LmIncompleta = entrada.lmincompleta;
                ing.Lmnolegible = entrada.lmnolegible;
                ing.Lmsindiagnostico = entrada.lmnodiagnostico;
                ing.Lmsoncarta = entrada.lmnoautirizada;
                ing.Observacion = entrada.Comentarios;
                ing.Folionovalido = entrada.Folionovalido;
                ing.Otromotivo = entrada.Otromotivo;
                var codIngreso = IngresolicenciaDataAccess.GuardaAuditoria(ing, token);

                return new ResultadoBase() { Estado = "OK", Mensaje = "Licencia Modificada con éxito", Objeto = entrada };


            }
            catch (Exception ex)
            {
                var x = ex.Message.Split(';');
                return new ResultadoBase() { Estado = "ERR", Mensaje = x[1], Objeto = x[0] };
            }
        }

        [AuthorizationRequired]
        [HttpPost]
        [Route("guardar-licencia-derivacion")]
        public ResultadoBase GuardarLicenciaDerivacion(WebIngresoLicencia entrada)
        {


            try
            {
                string token = ActionContext.Request.Headers.GetValues("Token").First();

                Ingresolicencia ing = new Ingresolicencia();
                ing.RutAfiliado = entrada.RutAfiliado.Replace(".", ""); ;
                ing.FolioLicencia = entrada.FolioLc;
                // ing.Oficina = entrada.CodOficina;

                IngresolicenciaDataAccess.GuardaDerivacion(ing, token);
                return new ResultadoBase() { Estado = "OK", Mensaje = "Licencia derivada con éxito", };
            }
            catch (Exception ex)
            {
                return new ResultadoBase() { Estado = "ERR", Mensaje = ex.Message, Objeto = ex };
            }
        }


        [AuthorizationRequired]
        [HttpGet]
        [Route("eliminar-licencia")]
        public ResultadoBase EliminarLicencia(int CodIngreso)
        {
            try
            {
                string token = ActionContext.Request.Headers.GetValues("Token").First();
                IngresolicenciaDataAccess.Eliminar(CodIngreso, token);
                return new ResultadoBase() { Estado = "OK", Mensaje = "Licencia Eliminada con éxito", Objeto = CodIngreso };
            }
            catch (Exception ex)
            {
                return new ResultadoBase() { Estado = "ERR", Mensaje = "Error al eliminar licencia: " + ex.Message, Objeto = ex };
            }
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("eliminar-licencia-ingresada")]
        public ResultadoBase EliminarLicenciaIngresada(int CodIngreso)
        {
            try
            {
                string token = ActionContext.Request.Headers.GetValues("Token").First();
                IngresolicenciaDataAccess.Eliminar(CodIngreso, token);
                return new ResultadoBase() { Estado = "OK", Mensaje = "Licencia Eliminada con éxito", Objeto = CodIngreso };
            }
            catch (Exception ex)
            {
                return new ResultadoBase() { Estado = "ERR", Mensaje = "Error al eliminar licencia: " + ex.Message, Objeto = ex };
            }
        }




        //[AuthorizationRequired]
        [HttpGet]
        [Route("exportar-dia")]
        public HttpResponseMessage ExportarXLS(int codOficina, string dia)
        {
            DateTime elDia = Convert.ToDateTime(dia);
            var ingLc = IngresolicenciaDataAccess.ObtenerEntidadesByOficinaXLS(codOficina, elDia);

            Columna[] columns = {
                                    new Columna("FolioLicencia", "Folio LM"),
                                    new Columna("RutAfiliado","Rut Afiliado"),
                                    new Columna("NombreAfiliado","Nombre Afiliado"),
                                    new Columna("FechaIngreso", "Fecha Ingreso"),
                                    new Columna("RutEjecutivo", "Rut Ejecutivo"),
                                    new Columna("NombreEjecutivo", "Nombre Ejecutivo"),
                                    new Columna("SinDatosEnSistema", "Sin datos en sistema"),
                                    new Columna("SucursalDestino","Sucursal Destino")
            };

            byte[] filecontent = ExcelExportHelper.ExportExcel(ingLc, "LM Ingresadas al " + dia, true, columns);
            HttpResponseMessage response = new HttpResponseMessage();


            Stream stri = new MemoryStream(filecontent);
            response.Content = new StreamContent(stri);
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            response.Content.Headers.ContentDisposition.FileName = "LM_Ingresadas_" + dia.Replace("-", "_").Replace("/", "_") + ".xls";
            response.Content.Headers.ContentType = new MediaTypeHeaderValue(ExcelExportHelper.ExcelContentType);
            response.Content.Headers.ContentLength = stri.Length;

            return response;


        }
        [HttpGet]
        [Route("export-pdf")]
        public HttpResponseMessage ExportarPDF(int codOficina, string dia)
        {

            DateTime elDia = Convert.ToDateTime(dia);
            var ingLc = IngresolicenciaDataAccess.ObtenerEntidadesByOficinaPdf(codOficina, elDia);

            Columna[] columns = {
                                    new Columna("FolioLicencia", "Folio LM"),
                                    new Columna("RutAfiliado","Rut Afiliado"),
                                    new Columna("NombreAfiliado","Nombre Afiliado"),
                                    new Columna("FechaIngreso", "Fecha Ingreso"),
                                    new Columna("RutEjecutivo", "Rut Ejecutivo"),
                                    new Columna("NombreEjecutivo", "Nombre Ejecutivo"),
                                    new Columna("SinDatosEnSistema", "Sin datos en sistema"),
                                    new Columna("FormatoLM","Formato LM"),
                                    new Columna("LmFueradeArea","LM fuera de area"),
                                    new Columna("FormatoLM","Formato LM"),
                                    new Columna("SinDatosEnSistema", "Sin datos en sistema"),
                                    new Columna("SucursalDestino","Sucursal Destino"),
                                    new Columna("EstadoRecepcion","EstadoRecepcion"),
                                    new Columna("Responsable","Responsable")
            };

            byte[] filecontent = CreatePDF2("", ingLc, "LM Ingresadas al " + dia, true, columns);
            HttpResponseMessage response = new HttpResponseMessage();


            Stream stri = new MemoryStream(filecontent);
            response.Content = new StreamContent(stri);
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            response.Content.Headers.ContentDisposition.FileName = "LM_Ingresadas_Manual_" + dia.Replace("-", "_").Replace("/", "_") + ".pdf";
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
            response.Content.Headers.ContentLength = stri.Length;

            return response;


        }



        [HttpGet]
        [Route("export-pdf-manual-filtros")]
        public HttpResponseMessage ExportarPDFFitros(string responsable, string estado, string folio, string diadesde, string diahasta, string formatoLM, int codOficina)
        {

            DateTime elDiadesde = Convert.ToDateTime(diadesde);
            DateTime elDiahasta = Convert.ToDateTime(diahasta);
            String diahoy = DateTime.Now.ToString("dd/mm/yyyy");
            var ingLc = IngresolicenciaDataAccess.ObtenerEntidadesByOficinaPdf_Manual_filtro(responsable, estado, folio, diadesde, diahasta, formatoLM, codOficina);
            Columna[] columns = {
                                    new Columna("Folio LM", "Folio LM"),
                                    new Columna("RutAfiliado","Rut Afiliado"),
                                    new Columna("NombreAfiliado","Nombre Afiliado"),
                                    new Columna("FechaIngreso", "Fecha Ingreso"),
                                    new Columna("RutEjecutivo", "Rut Ejecutivo"),
                                    new Columna("NombreEjecutivo", "Nombre Ejecutivo"),
                                    new Columna("Oficina", "Sucursal"),
                                    new Columna("SinDatosEnSistema", "Sin datos en sistema"),
                                    new Columna("FormatoLM","Formato LM"),
                                    new Columna("LmFueradeArea","LM fuera de area"),
                                    new Columna("SucursalDestino","Sucursal Destino"),
                                    new Columna("EstadoRecepcion","EstadoRecepcion"),
                                    new Columna("Responsable","Responsable"),
                                    new Columna("descripcionEstadoRevision","Estado Auditoría"),
                                    new Columna("compincentralizado","Compín Centralizado"),
                                    new Columna("subcomision","SubComisión"),
                                    new Columna("subido_a_plataforma_compin","Subido a Plat. Compín")
            };

            byte[] filecontent = CreatePDF2(formatoLM, ingLc, "LM Ingresadas desde el " + elDiadesde + " al " + elDiahasta, true, columns);
            HttpResponseMessage response = new HttpResponseMessage();


            Stream stri = new MemoryStream(filecontent);
            response.Content = new StreamContent(stri);
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            response.Content.Headers.ContentDisposition.FileName = "LM_Ingresadas_" + formatoLM + "_ " + diahoy.Replace("-", "_").Replace("/", "_") + ".pdf";
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
            response.Content.Headers.ContentLength = stri.Length;

            return response;


        }


        public byte[] CreatePDF2(string formatoPdf, DataTable dataTable, string heading = "", bool showSrNo = false, params Columna[] columnsToTake)
        {
            string titulo;
            if (formatoPdf == "Todos")
                titulo = "";
            else
                titulo = formatoPdf;
            Document doc = new Document(PageSize.LETTER, 50, 50, 50, 50);
            string cantiadad = dataTable.Rows.Count.ToString();
            using (MemoryStream output = new MemoryStream())
            {
                PdfWriter wri = PdfWriter.GetInstance(doc, output);
                doc.Open();
                PdfPTable tblPrueba = new PdfPTable(dataTable.Columns.Count);
                PdfPRow row = null;
                float[] widths = new float[] { 4f, 4f, 4f, 4f, 4f, 4f, 4f, 4f, 4f, 4f, 4f, 4f, 4f, 4f, 4f, 4f, 4f };
                iTextSharp.text.Font font5 = new iTextSharp.text.Font(iTextSharp.text.Font.FontFamily.HELVETICA, 8, iTextSharp.text.Font.NORMAL, BaseColor.BLACK);
                iTextSharp.text.Font font6 = new iTextSharp.text.Font(iTextSharp.text.Font.FontFamily.HELVETICA, 8, iTextSharp.text.Font.BOLD, BaseColor.BLACK);
                Paragraph header = new Paragraph("Motor de Negocios: Recepción LM Sin Visar " + titulo.ToString()) { Alignment = Element.ALIGN_CENTER };


                tblPrueba.SetWidths(widths);

                tblPrueba.WidthPercentage = 100;
                int iCol = 0;
                string colname = "";
                PdfPCell cell = new PdfPCell(new Phrase("Products"));
                cell.BorderWidthBottom = 0.75f;
                cell.Colspan = dataTable.Columns.Count;

                foreach (DataColumn c in dataTable.Columns)
                {

                    tblPrueba.AddCell(new Phrase(c.ColumnName, font5));
                }

                foreach (DataRow r in dataTable.Rows)
                {
                    if (dataTable.Rows.Count > 0)
                    {
                        tblPrueba.AddCell(new Phrase(r[0].ToString(), font5));
                        tblPrueba.AddCell(new Phrase(r[1].ToString(), font5));
                        tblPrueba.AddCell(new Phrase(r[2].ToString(), font5));
                        tblPrueba.AddCell(new Phrase(r[3].ToString(), font5));
                        tblPrueba.AddCell(new Phrase(r[4].ToString(), font5));
                        tblPrueba.AddCell(new Phrase(r[5].ToString(), font5));
                        tblPrueba.AddCell(new Phrase(r[6].ToString(), font5));
                        tblPrueba.AddCell(new Phrase(r[7].ToString(), font5));
                        tblPrueba.AddCell(new Phrase(r[8].ToString(), font5));
                        tblPrueba.AddCell(new Phrase(r[9].ToString(), font5));
                        tblPrueba.AddCell(new Phrase(r[10].ToString(), font5));
                        tblPrueba.AddCell(new Phrase(r[11].ToString(), font5));
                        tblPrueba.AddCell(new Phrase(r[12].ToString(), font5));
                        tblPrueba.AddCell(new Phrase(r[13].ToString(), font5));
                        tblPrueba.AddCell(new Phrase(r[14].ToString(), font5));
                        tblPrueba.AddCell(new Phrase(r[15].ToString(), font5));
                        tblPrueba.AddCell(new Phrase(r[16].ToString(), font5));
                    }
                }



                iTextSharp.text.Font _standardFont = new iTextSharp.text.Font(iTextSharp.text.Font.FontFamily.HELVETICA, 8, iTextSharp.text.Font.NORMAL, BaseColor.BLACK);


                // agregamos titulo y adjuntamos tabla desde base
                doc.Add(header);
                doc.Add(Chunk.NEWLINE);
                doc.Add(Chunk.NEWLINE);
                doc.Add(tblPrueba);
                doc.Close();
                return output.ToArray();
            }

        }


        [HttpGet]
        [Route("export-pdf-mixta-filtros")]
        public HttpResponseMessage ExportarPDFMixtaFiltros(string responsable, string estado, string folio, string diadesde, string diahasta, string formatoLM, int codOficina)
        {

            DateTime elDiadesde = Convert.ToDateTime(diadesde);
            DateTime elDiahasta = Convert.ToDateTime(diahasta);
            String diahoy = DateTime.Now.ToString("dd/mm/yyyy");
            var ingLc = IngresolicenciaDataAccess.ObtenerEntidadesByOficinaPdf_Mixta_filtro(responsable, estado, folio, diadesde, diahasta, formatoLM, codOficina);

            Columna[] columns = {
                                    new Columna("FolioLicencia", "Folio LM"),
                                    new Columna("RutAfiliado","Rut Afiliado"),
                                    new Columna("NombreAfiliado","Nombre Afiliado"),
                                    new Columna("FechaIngreso", "Fecha Ingreso"),
                                    new Columna("RutEjecutivo", "Rut Ejecutivo"),
                                    new Columna("NombreEjecutivo", "Nombre Ejecutivo"),
                                    new Columna("SinDatosEnSistema", "Sin datos en sistema"),
                                    new Columna("FormatoLM","Formato LM"),
                                    new Columna("SinDatosEnSistema", "Sin datos en sistema"),
                                    new Columna("SucursalDestino","Sucursal Destino"),
                                    new Columna("EstadoRecepcion","EstadoRecepcion")
            };

            byte[] filecontent = CreatePDFMixta(ingLc, "LM Ingresadas desde el " + elDiadesde + " al " + elDiahasta, true, columns);
            HttpResponseMessage response = new HttpResponseMessage();


            Stream stri = new MemoryStream(filecontent);
            response.Content = new StreamContent(stri);
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            response.Content.Headers.ContentDisposition.FileName = "LM_Ingresadas_Mixta_" + diahoy.Replace("-", "_").Replace("/", "_") + ".pdf";
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
            response.Content.Headers.ContentLength = stri.Length;

            return response;


        }


        [HttpGet]
        [Route("export-pdf-mixta")]
        public HttpResponseMessage ExportarPDFMixta(int codOficina, string dia)
        {

            DateTime elDia = Convert.ToDateTime(dia);
            var ingLc = IngresolicenciaDataAccess.ObtenerEntidadesByOficinaPdf_Mixta(codOficina, elDia);

            Columna[] columns = {
                                    new Columna("FolioLicencia", "Folio LM"),
                                    new Columna("RutAfiliado","Rut Afiliado"),
                                    new Columna("NombreAfiliado","Nombre Afiliado"),
                                    new Columna("FechaIngreso", "Fecha Ingreso"),
                                    new Columna("RutEjecutivo", "Rut Ejecutivo"),
                                    new Columna("NombreEjecutivo", "Nombre Ejecutivo"),
                                    new Columna("SinDatosEnSistema", "Sin datos en sistema"),
                                    new Columna("FormatoLM","Formato LM"),
                                    new Columna("SinDatosEnSistema", "Sin datos en sistema"),
                                    new Columna("SucursalDestino","Sucursal Destino"),
                                    new Columna("EstadoRecepcion","EstadoRecepcion")
            };

            byte[] filecontent = CreatePDFMixta(ingLc, "LM Ingresadas al " + dia, true, columns);
            HttpResponseMessage response = new HttpResponseMessage();


            Stream stri = new MemoryStream(filecontent);
            response.Content = new StreamContent(stri);
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            response.Content.Headers.ContentDisposition.FileName = "LM_Ingresadas_Mixta_" + dia.Replace("-", "_").Replace("/", "_") + ".pdf";
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
            response.Content.Headers.ContentLength = stri.Length;

            return response;


        }

        public byte[] CreatePDFMixta(DataTable dataTable, string heading = "", bool showSrNo = false, params Columna[] columnsToTake)
        {
            Document doc = new Document(PageSize.LETTER, 50, 50, 50, 50);

            using (MemoryStream output = new MemoryStream())
            {
                PdfWriter wri = PdfWriter.GetInstance(doc, output);
                doc.Open();
                PdfPTable tblPrueba = new PdfPTable(dataTable.Columns.Count);
                PdfPRow row = null;
                float[] widths = new float[] { 4f, 4f, 4f, 4f, 4f, 4f, 4f, 4f, 4f, 4f, 4f };
                iTextSharp.text.Font font5 = new iTextSharp.text.Font(iTextSharp.text.Font.FontFamily.HELVETICA, 8, iTextSharp.text.Font.NORMAL, BaseColor.BLACK);
                iTextSharp.text.Font font6 = new iTextSharp.text.Font(iTextSharp.text.Font.FontFamily.HELVETICA, 8, iTextSharp.text.Font.BOLD, BaseColor.BLACK);
                Paragraph header = new Paragraph("Motor de Negocios: Recepción LM Sin Visar Mixta") { Alignment = Element.ALIGN_CENTER };


                tblPrueba.SetWidths(widths);

                tblPrueba.WidthPercentage = 100;
                int iCol = 0;
                string colname = "";
                PdfPCell cell = new PdfPCell(new Phrase("Products"));
                cell.BorderWidthBottom = 0.75f;
                cell.Colspan = dataTable.Columns.Count;

                foreach (DataColumn c in dataTable.Columns)
                {

                    tblPrueba.AddCell(new Phrase(c.ColumnName, font5));
                }

                foreach (DataRow r in dataTable.Rows)
                {
                    if (dataTable.Rows.Count > 0)
                    {
                        tblPrueba.AddCell(new Phrase(r[0].ToString(), font5));
                        tblPrueba.AddCell(new Phrase(r[1].ToString(), font5));
                        tblPrueba.AddCell(new Phrase(r[2].ToString(), font5));
                        tblPrueba.AddCell(new Phrase(r[3].ToString(), font5));
                        tblPrueba.AddCell(new Phrase(r[4].ToString(), font5));
                        tblPrueba.AddCell(new Phrase(r[5].ToString(), font5));
                        tblPrueba.AddCell(new Phrase(r[6].ToString(), font5));
                        tblPrueba.AddCell(new Phrase(r[7].ToString(), font5));
                        tblPrueba.AddCell(new Phrase(r[8].ToString(), font5));
                        tblPrueba.AddCell(new Phrase(r[9].ToString(), font5));
                        tblPrueba.AddCell(new Phrase(r[10].ToString(), font5));
                    }
                }



                iTextSharp.text.Font _standardFont = new iTextSharp.text.Font(iTextSharp.text.Font.FontFamily.HELVETICA, 8, iTextSharp.text.Font.NORMAL, BaseColor.BLACK);


                // agregamos titulo y adjuntamos tabla desde base
                doc.Add(header);
                doc.Add(Chunk.NEWLINE);
                doc.Add(Chunk.NEWLINE);
                doc.Add(tblPrueba);
                doc.Close();
                return output.ToArray();
            }

        }





        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-Temp-Excel-RRLL")]
        public IEnumerable<CargaExcelRRLLEntity> ListaLMExcelRRLL(string folioLM, string Estado)
        {

            string token = ActionContext.Request.Headers.GetValues("Token").First();
            List<CargaExcelRRLLEntity> ingLc = IngresolicenciaDataAccess.ListaLMExcelRRLL(folioLM, Estado);

            return ingLc;


        }





        //[AuthorizationRequired]
        [HttpGet]
        [Route("consulta-fonasa")]
        public ResultadoBase ConsultaWSFonasa(int FolioLM)
        {
            try
            {
                string token = ActionContext.Request.Headers.GetValues("Token").First();
                string codigoUsr = "Araucana", passUsr = "Rwg5B3Mz", oper = "10105";
                short aseg = 1, tipo = 1;
                WSFonasaCajas.WSFonaCajasSoapClient wsFonasa = new WSFonasaCajas.WSFonaCajasSoapClient();
                WSFonasaCajas.RespConFormLCC rsFonasa = wsFonasa.ConFormuLCC(codigoUsr, passUsr, aseg, oper, tipo, FolioLM);

                return new ResultadoBase() { Estado = "OK", Mensaje = "Servicio respondió respuesta valida", Objeto = rsFonasa };
            }
            catch (Exception ex)
            {
                return new ResultadoBase() { Estado = "ERR", Mensaje = "Error al consultar a Servicio Fonasa", Objeto = ex };
            }
        }


        //[AuthorizationRequired]
        [HttpGet]
        [Route("datos-afiliado")]
        public ResultadoBase ConsultaWSDatosAfiliado(string AfiliadoRut)
        {
            try
            {
                //string token = ActionContext.Request.Headers.GetValues("Token").First();

                ConsultaDatosAfiliadoService.ConsultaDatosAfiliadoDelegateClient wsAfidata = new ConsultaDatosAfiliadoService.ConsultaDatosAfiliadoDelegateClient();
                ConsultaDatosAfiliadoService.datosAfiliado AfiData = wsAfidata.obtenerDatosAfiliado(AfiliadoRut);


                return new ResultadoBase() { Estado = "OK", Mensaje = "Servicio respondió respuesta valida", Objeto = AfiData };
            }
            catch (Exception ex)
            {
                return new ResultadoBase() { Estado = "ERR", Mensaje = "Error al consultar a Servicio Fonasa", Objeto = ex };
            }
        }


        [AuthorizationRequired]
        [HttpGet]
        [Route("datos-encabezado-lic")]
        public Ingresolicencia ObtEncabezadoLicencia(int codOficina, string dia)
        {
            DateTime elDia = Convert.ToDateTime(dia);
            return IngresolicenciaDataAccess.ObtenerEncabezado(codOficina, elDia);

        }


        [AuthorizationRequired]
        [HttpGet]
        [Route("listar-suc-derivacion")]
        public List<OficinaDerivacionEntity> listaOfiDerivacion()
        {
            return LicenciaDataAccess.ListaOficinaDerivacion();
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("listar-LM-TimeLine")]
        public IEnumerable<LicenciasLMTimeLine> listaTimeLine(long codIngreso)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            List<LicenciasLMTimeLine> ingLc = IngresolicenciaDataAccess.ObtenerLicenciaTimeLine(codIngreso);

            return ingLc;
        }


        [AuthorizationRequired]
        [HttpGet]
        [Route("listar-estado-LM")]
        public List<EstadosLMEntity> listaestadoLM()
        {
            return LicenciaDataAccess.ListaEstadoLM();
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("listar-fecha-Lm")]
        public List<FechaLMEntity> ListarFechaLM()
        {
            return LicenciaDataAccess.ListaFechaLM();
        }


        [HttpPost]
        [Route("carga-TATA-dropzone")]
        public async Task<IHttpActionResult> SaveUploadedFile()
        {
            if (!Request.Content.IsMimeMultipartContent())
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            try
            {
                var lista = new List<string>();
                string imprimir = "";
                var provider = new MultipartMemoryStreamProvider();
                await Request.Content.ReadAsMultipartAsync(provider);

                IngresolicenciaDataAccess.EliminarTablaTempEXCEL();
                foreach (var file in provider.Contents)
                {
                    if (file.Headers.ContentLength > 0)
                    {
                        var fileName = file.Headers.ContentDisposition.FileName.Trim('\"');
                        if (fileName.EndsWith("csv") || fileName.EndsWith("CSV"))
                        {
                            var nombreFinal = "RRLL" + DateTime.Now.ToString("yyyyMMddHHmmssFFF") + ".csv";
                            var filePath = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~/Assets/CargaExcelRRLL/EnvioTaTa"), nombreFinal);


                            var buffer = await file.ReadAsByteArrayAsync();
                            File.WriteAllBytes(filePath, buffer);

                            using (var files = new StreamReader(filePath, System.Text.Encoding.Default, false))
                            {
                                string line; int i = 0;
                                while ((line = files.ReadLine()) != null)
                                {
                                    if (i >= 1)
                                    {
                                        if (line.Contains(";"))
                                        {

                                            string Folio = line.Split(';')[4];
                                            string Estado = line.Split(';')[5];
                                            string fechaSubidaTATA = line.Split(';')[6];
                                            string fechaSubidaCompin = line.Split(';')[7];
                                            string SubComision = line.Split(';')[8];
                                            // imprimir = imprimir + "ANEXO[" + anexo + "] RUT[" + final + "]";


                                            IngresolicenciaDataAccess.ValidaExcelRRLL(Folio, Estado, fechaSubidaTATA, fechaSubidaCompin, SubComision);

                                        }
                                        else if (line.Contains(","))
                                        {
                                            string Folio = line.Split(';')[4];
                                            string Estado = line.Split(';')[5];
                                            string fechaSubidaTATA = line.Split(';')[6];
                                            string fechaSubidaCompin = line.Split(';')[7];
                                            string SubComision = line.Split(';')[8];
                                            // imprimir = imprimir + "ANEXO[" + anexo + "] RUT[" + final + "]";


                                            IngresolicenciaDataAccess.ValidaExcelRRLL(Folio, Estado, fechaSubidaTATA, fechaSubidaCompin, SubComision);
                                        }
                                    }
                                    i++;
                                }
                            }
                            File.Delete(filePath);

                        }
                        else
                        {
                            return BadRequest("El archivo debe ser csv " + imprimir);
                        }
                    }
                }

                return Ok("Datos procesados " + imprimir);
            }
            catch (Exception ex)
            {


                // IngresolicenciaDataAccess.insertarLog(ex.Message.ToString());

                var response = Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
                throw new HttpResponseException(response);
                //return BadRequest("El archivo debe ser csv ");

            }
        }


        [AuthorizationRequired]
        [HttpPost]
        [Route("proceso-carga-devueltas-TATA")]
        public ResultadoBase GuardarProcesoDevueltasTATA()
        {
            try
            {
                string token = ActionContext.Request.Headers.GetValues("Token").First();
                WebIngresoLicencia entrada = new WebIngresoLicencia();

                IngresolicenciaDataAccess.GuardarProcesoDevueltasTATA(token);


                return new ResultadoBase() { Estado = "OK", Mensaje = "Proceso realizado con éxito", Objeto = entrada };

            }
            catch (Exception ex)
            {

                var x = ex.Message.Split(';');
                return new ResultadoBase() { Estado = "ERR", Mensaje = x[1], Objeto = x[0] };
            }
        }




        [AuthorizationRequired]
        [HttpGet]
        [Route("listar-cargas-compin")]
        public IEnumerable<CargaExcelRRLLEntity> ListarCargasCompin(string folioLM, string dia_desde, string dia_hasta)
        {
            DateTime desde = Convert.ToDateTime(dia_desde);
            DateTime hasta = Convert.ToDateTime(dia_hasta);
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            List<CargaExcelRRLLEntity> ingLc = IngresolicenciaDataAccess.CargaListaCompin(folioLM, desde, hasta);

            return ingLc;
        }





        [HttpGet]
        [Route("reporte-pdf-as400")]
        public HttpResponseMessage ExportarPDFAs400(int codOficina, string diadesde)
        {

            DateTime elDiadesde = Convert.ToDateTime(diadesde);

            DataTable dt = new DataTable();
            dt = IngresolicenciaDataAccess.DatosPdf(codOficina, elDiadesde);

            var oficina = dt.Rows[0]["Oficina"].ToString();
            var fechaCompin = dt.Rows[0]["fechaEntrega"].ToString();
            var ingLc = IngresolicenciaDataAccess.ExportarPDFAs400(codOficina, elDiadesde);

            Columna[] columns = {
                                    new Columna("FolioLicencia", "NUMERO LICENCIA MEDICA"),
                                    new Columna("NombreAfiliado","NOMBRE AFILIADO"),
                                    new Columna("RutAfiliado","RUT AFILIADO"),
                                    //new Columna("FechaIngreso", "Fecha Ingreso"),
                                    //new Columna("RutEjecutivo", "Rut Ejecutivo"),
                                    //new Columna("NombreEjecutivo", "Nombre Ejecutivo"),
                                    //new Columna("SinDatosEnSistema", "Sin datos en sistema"),
                                    //new Columna("FormatoLM","Formato LM"),
                                    //new Columna("LmFueradeArea","LM fuera de area"),
                                    //new Columna("FormatoLM","Formato LM"),
                                    //new Columna("SinDatosEnSistema", "Sin datos en sistema"),
                                    //new Columna("SucursalDestino","Sucursal Destino"),
                                    //new Columna("EstadoRecepcion","EstadoRecepcion"),
                                    //new Columna("Responsable","Responsable")
            };

            byte[] filecontent = CreatePDFManualPresencial(elDiadesde, oficina, fechaCompin, ingLc, "LM Manual Presencial", true, columns);
            HttpResponseMessage response = new HttpResponseMessage();


            Stream stri = new MemoryStream(filecontent);
            response.Content = new StreamContent(stri);
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            response.Content.Headers.ContentDisposition.FileName = "LM Manual Presencial.pdf";
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");
            response.Content.Headers.ContentLength = stri.Length;

            return response;


        }


        public byte[] CreatePDFManualPresencial(DateTime diadesde, string oficina, string fechaCompin, DataTable dataTable, string heading = "", bool showSrNo = false, params Columna[] columnsToTake)
        {
            Document doc = new Document(PageSize.LETTER, 50, 50, 50, 50);
            string cantiadad = dataTable.Rows.Count.ToString();
            using (MemoryStream output = new MemoryStream())
            {
                PdfWriter wri = PdfWriter.GetInstance(doc, output);
                doc.Open();
                PdfPTable tblPrueba = new PdfPTable(dataTable.Columns.Count);
                PdfPRow row = null;
                float[] widths = new float[] { 4f, 4f, 4f, 4f, 4f, 4f };

                Font font1 = new Font(iTextSharp.text.Font.FontFamily.HELVETICA, 8, Font.NORMAL, BaseColor.BLACK);
                Chunk chunk1 = new Chunk("LA ARAUCANA C.C.A.F ", font1);
                doc.Add(new Paragraph(chunk1));//con salto de linea

                Font font2 = new Font(iTextSharp.text.Font.FontFamily.HELVETICA, 8, Font.NORMAL, BaseColor.BLACK);
                Chunk chunk2 = new Chunk("SUCURSAL: " + oficina, font2);
                doc.Add(new Paragraph(chunk2) { Alignment = Element.ALIGN_RIGHT });
                //con salto de linea


                iTextSharp.text.Font font5 = new iTextSharp.text.Font(iTextSharp.text.Font.FontFamily.HELVETICA, 8, iTextSharp.text.Font.NORMAL, BaseColor.BLACK);
                iTextSharp.text.Font font6 = new iTextSharp.text.Font(iTextSharp.text.Font.FontFamily.HELVETICA, 8, iTextSharp.text.Font.BOLD, BaseColor.BLACK);
                Paragraph header = new Paragraph("NOMINA DE LICENCIAS MEDICAS " + fechaCompin.ToString()) { Alignment = Element.ALIGN_CENTER };


                tblPrueba.SetWidths(widths);




                tblPrueba.WidthPercentage = 100;
                int iCol = 0;
                string colname = "";
                PdfPCell cell = new PdfPCell(new Phrase("Products"));
                cell.BorderWidthBottom = 0.75f;
                cell.Colspan = dataTable.Columns.Count;

                foreach (DataColumn c in dataTable.Columns)
                {

                    tblPrueba.AddCell(new Phrase(c.ColumnName, font5));
                }



                foreach (DataRow r in dataTable.Rows)
                {
                    if (dataTable.Rows.Count > 0)
                    {
                        tblPrueba.AddCell(new Phrase(r[0].ToString(), font5));
                        tblPrueba.AddCell(new Phrase(r[1].ToString(), font5));
                        tblPrueba.AddCell(new Phrase(r[2].ToString(), font5));
                        tblPrueba.AddCell(new Phrase(r[3].ToString(), font5));
                        tblPrueba.AddCell(new Phrase(r[4].ToString(), font5));
                        tblPrueba.AddCell(new Phrase(r[5].ToString(), font5));
                        //tblPrueba.AddCell(new Phrase(r[6].ToString(), font5));
                        //tblPrueba.AddCell(new Phrase(r[7].ToString(), font5));
                        //tblPrueba.AddCell(new Phrase(r[8].ToString(), font5));
                        //tblPrueba.AddCell(new Phrase(r[9].ToString(), font5));
                        //tblPrueba.AddCell(new Phrase(r[10].ToString(), font5));
                        //tblPrueba.AddCell(new Phrase(r[11].ToString(), font5));
                        //tblPrueba.AddCell(new Phrase(r[12].ToString(), font5));
                        //tblPrueba.AddCell(new Phrase(r[13].ToString(), font5));
                        //tblPrueba.AddCell(new Phrase(r[14].ToString(), font5));
                        //tblPrueba.AddCell(new Phrase(r[15].ToString(), font5));
                        //tblPrueba.AddCell(new Phrase(r[16].ToString(), font5));
                    }
                }



                iTextSharp.text.Font _standardFont = new iTextSharp.text.Font(iTextSharp.text.Font.FontFamily.HELVETICA, 8, iTextSharp.text.Font.NORMAL, BaseColor.BLACK);


                // agregamos titulo y adjuntamos tabla desde base
                doc.Add(header);
                doc.Add(Chunk.NEWLINE);
                Font font3 = new Font(iTextSharp.text.Font.FontFamily.HELVETICA, 8, Font.NORMAL, BaseColor.BLACK);
                Chunk chunk3 = new Chunk("               FECHA ENTREGA COMPIN : " + diadesde.ToString("dd/MM/yyyy"), font3);
                doc.Add(new Paragraph(chunk3) { Alignment = Element.ALIGN_LEFT });
                doc.Add(Chunk.NEWLINE);
                doc.Add(Chunk.NEWLINE);
                doc.Add(tblPrueba);
                doc.Close();
                return output.ToArray();
            }

        }




    }
}
