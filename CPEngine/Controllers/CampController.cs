using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CPEngine.Models.Data;
using CPEngine.Models.Entity;
using CPEngine.Models.Base;
using CPEngine.Models.Web;
using System.Dynamic;
using CDK.Excel;
using CPEngine.Models.Excel;
using System.IO;
using System.Net.Http.Headers;
using System.Data;


namespace CPEngine.Controllers
{
    [RoutePrefix("api/camp")]
    public class CampController : ApiController
    {
        [HttpGet]
        [Route("lista-camps")]
        public IEnumerable<CampanaEntity> listarCamps()
        {
            return CampanaData.ObtenerEntidades();
        }

        [HttpGet]
        [Route("lista-camps-ejecutivo")]
        public IEnumerable<CampanaEntity> listarCampsEjec(string re)
        {
            return CampanaData.ObtenerEntidadesByEjecutivo(re);
        }

        [HttpGet]
        [Route("lista-asignaciones")]
        public IEnumerable<AsignacionEntity> listarAsigEjec(string re, int cc)
        {
            return AsignacionData.ObtenerEntidadesByEjecutivo(re, cc);
        }

        [HttpGet]
        [Route("data-asignacion")]
        public AsignacionBase dataAsignacion(long ca)
        {

            AsignacionEntity asg = AsignacionData.ObtenerPorID(ca);
            EntidadEntity ent = EntidadData.ObtenerPorID(asg.RutEntidad);
            List<GestionBase> gests = gestBase(ca);

            return new AsignacionBase()
            {
                Asignacion = asg,
                Entidad = ent,
                Gestiones = gests
            };
        }

        [HttpGet]
        [Route("lista-attrs-camp")]
        public IEnumerable<AtributoEntity> listarAttrsCamp(int cc)
        {
            return AtributoData.ObtenerEntidadesByCamp(cc);
        }


        [HttpGet]
        [Route("lista-attrval-camp")]
        public IEnumerable<dynamic> listarAsgLlenita(int cc, string re)
        {
            var salida = new List<dynamic>();
            List<AsignacionEntity> asigs = AsignacionData.ObtenerEntidadesByEjecutivo(re, cc);
            
            asigs.ForEach(asg => {
                EntidadEntity ent = EntidadData.ObtenerPorID(asg.RutEntidad);
                GestionEntity UltimaGestion = GestionData.ObtenerEntidades().FindAll(d => d.CodAsignacion == asg.CodAsignacion).OrderByDescending(f => f.FechaAccion).FirstOrDefault();
                int codEstado_UltimaGestion = (UltimaGestion != null) ? UltimaGestion.CodEstadoGestion : 0;
                dynamic x = new ExpandoObject();
                x.RutEntidad = asg.RutEntidad;
                x.DvEntidad = ent.DvEntidad;
                x.Nombre = ent.NombreEntidad;
                x.CodAsignacion = asg.CodAsignacion;
                
                if(codEstado_UltimaGestion > 0)
                {
                    EstadogestionEntity gst = EstadogestionData.ObtenerEntidades().Find(y => y.CodCamp == cc && y.CodEstado == codEstado_UltimaGestion);
                    x.SubEstado = gst.Nombre;
                    x.Estado = EstadogestionData.ObtenerEntidades().Find(y => y.CodCamp == cc && y.CodEstado == gst.CodEstPadre).Nombre;
                    x.FechaProximaGestion = UltimaGestion.FechaCompromiso;
                }
                else
                {
                    x.SubEstado = "Sin Gestión";
                    x.Estado = "Sin Gestión";
                    x.FechaProximaGestion = "N/A";
                }

                


                AttrvaloresData.ObtenerEntidadesByAsig(asg.CodAsignacion).ForEach(attrv => {
                    AddProperty(x, attrv.CodAttr, attrv.ValorAttr);
                });
                
                salida.Add(x);
            });

            return salida;

        }


        [HttpGet]
        [Route("lista-atributos-asig")]
        public IEnumerable<AtributoBase> dataAsg(int cc, int ca)
        {
            List<AtributoBase> salida = new List<AtributoBase>();
            
            AtributoData.ObtenerEntidadesByCamp(cc).ForEach(atr => {
                AtributoBase attret = new AtributoBase();
                attret.Atributo = atr;
                attret.Valor = AttrvaloresData.ObtenerEntidadesByAsig(ca).Find(z=>z.CodAttr==atr.CodAttr);
                salida.Add(attret);
            });

            return salida;

        }

        [HttpGet]
        [Route("lista-estges-camp")]
        public IEnumerable<EstadogestionEntity> estadosGestionCamp(int cc, int cp)
        {
           return EstadogestionData.ObtenerEntidades().FindAll(x => x.CodCamp == cc && x.CodEstPadre == cp);
        }


        [HttpPost]
        [Route("guardar-gestion-cmp")]
        public ResultadoPostWeb guardaGestion(GestionWeb entrada)
        {
            ResultadoPostWeb resolucion = new ResultadoPostWeb();

            try
            {
                GestionEntity GesSave = GestionEntity.ParseWeb(entrada);
                GestionData.Guardar(GesSave);

                resolucion.Codigo = 1;
                resolucion.Descripcion = "Gestión guardada con éxito";
                resolucion.Objeto = gestBase(GesSave.CodAsignacion);

            }
            catch(Exception ex)
            {
                resolucion.Codigo = 0;
                resolucion.Descripcion = "Gestión no guardada por errores " + ex.Message;
            }

            return resolucion;
        }


        [HttpGet]
        [Route("lista-gestiones-cmp")]
        public IEnumerable<GestionBase> listaGestionesCmp(long ca)
        {
            return gestBase(ca);
        }

        

        [HttpGet]
        [Route("5doc-pendiente")]
        public HttpResponseMessage descargarExcel5docPendiente(int re, int of)
        {
            var dataExp = GeneralesData.ListarObjetosDocPendiente(re, of);
            Columna[] columns = {   new Columna("Afiliado_Rut","Rut Afiliado"),
                                    new Columna("Afiliado_Dv", "Dv Afiliado"),
                                    new Columna("Afiliado_Nombre", "Nombre Afiliado"),
                                    //new Columna("Empresa_Rut", "Rut Empresa"),
                                    //new Columna("Empresa_Dv", "Dv Empresa"),
                                    //new Columna("Empresa_Nombre", "Nombre Empresa"),
                                    //new Columna("Licencia_Numero", "Folio LM"),
                                    new Columna("Licencia_Finicio", "Fecha Inicio"),
                                    new Columna("Licencia_FTermino", "Fecha Término"),
                                    new Columna("Mes_Prescripcion", "Mes Prescripción"),
                                    new Columna("Obs", "Observaciones"),
                                    //new Columna("Licencia_FResolucion", "Fecha Resolución"),
                                    //new Columna("Licencia_PeriodoResolucion", "Perdiodo Resolución"),
                                    //new Columna("Licencia_Resolucion", "Resolución"),
                                    //new Columna("Licencia_Dias", "Dias LM"),
                                    //new Columna("Licencia_DiasPago", "Dias a Pago"),
                                    new Columna("SolicitarDato1", "Solicitar Dato#1"),
                                    new Columna("SolicitarDato2", "Solicitar Dato#2"),
                                    new Columna("SolicitarDato3", "Solicitar Dato#3"),
                                    new Columna("SolicitarDato4", "Solicitar Dato#4"),
                                    new Columna("SolicitarDato5", "Solicitar Dato#5"),
                                    new Columna("SolicitarDato6", "Solicitar Dato#6"),
            };

           
            byte[] filecontent = ExcelExportHelper.ExportExcel(dataExp, "Documentación Pendiente.", false, columns);
            HttpResponseMessage response = new HttpResponseMessage();

            Stream stri = new MemoryStream(filecontent);
            response.Content = new StreamContent(stri);
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            response.Content.Headers.ContentDisposition.FileName = "Documentacion_pendiente_SIL_" + re + ".xlsx";
            response.Content.Headers.ContentType = new MediaTypeHeaderValue(ExcelExportHelper.ExcelContentType);
            response.Content.Headers.ContentLength = stri.Length;

            return response;
        }


        [HttpGet]
        [Route("5disponibles-apago")]
        public HttpResponseMessage descargarExcel5disponiblesAPago(int re, int of)
        {
            var dataExp = GeneralesData.ListarObjetosDisponibleApago(re, of);
            
            Columna[] columns = {   
                                    new Columna("Afiliado_Rut", "Rut Afiliado"),
                                    new Columna("Afiliado_Dv", "Dv Afiliado"),
                                    new Columna("Afiliado_Nombre", "Nombre Afiliado"),
                                    new Columna("Licencia_Folio", "Folio LM"),
                                    new Columna("Fecha_Inicio", "Fecha Inicio"),
                                    new Columna("Fecha_Termino", "Fecha Término"),
                                    new Columna("Licencia_Dias", "Dias LM"),
                                    new Columna("Dias_Pago", "Dias a Pago"),
                                    new Columna("Monto_Pago", "Monto a Pago"),
                                    new Columna("Mes_Prescripcion", "Periodo Expira"),
            };



            byte[] filecontent = ExcelExportHelper.ExportExcel(dataExp, "Disponibles a Pago.", false, columns);


            HttpResponseMessage response = new HttpResponseMessage();
            Stream stri = new MemoryStream(filecontent);
            response.Content = new StreamContent(stri);
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            response.Content.Headers.ContentDisposition.FileName = "Disponibles_a_pago_SIL_" + re + ".xlsx";
            response.Content.Headers.ContentType = new MediaTypeHeaderValue(ExcelExportHelper.ExcelContentType);
            response.Content.Headers.ContentLength = stri.Length;

            return response;
        }


        private List<GestionBase> gestBase(long ca)
        {
            List<GestionBase> res = new List<GestionBase>();
            GestionData.ObtenerEntidades().FindAll(x => x.CodAsignacion == ca).ForEach(gst => {

                EstadogestionEntity SubEstadoGst = EstadogestionData.ObtenerPorID(gst.CodEstadoGestion);
                EstadogestionEntity EstadoGst = EstadogestionData.ObtenerPorID(SubEstadoGst.CodEstPadre);
                AsignacionEntity Asignacion = AsignacionData.ObtenerPorID(ca);

                string eRut = Asignacion.RutEjecutivo != "0" ? Asignacion.RutEjecutivo : (string.IsNullOrEmpty(gst.RutEjecutivo) ? "N/A" : gst.RutEjecutivo);

                res.Add(new GestionBase
                {
                    Gestion = gst,
                    SubEstadoGestion = SubEstadoGst,
                    EstadoGestion = EstadoGst,
                    RutEjecutivo = eRut,
                    NombreEjecutivo = CRM.Security.Data.UsuarioDataAccess.UsuarioData(eRut).Nombres
                });

                
            });
            return res;
        }
        private static void AddProperty(ExpandoObject expando, string propertyName, object propertyValue)
        {
            // ExpandoObject supports IDictionary so we can extend it like this
            var expandoDict = expando as IDictionary<string, object>;
            if (expandoDict.ContainsKey(propertyName))
                expandoDict[propertyName] = propertyValue;
            else
                expandoDict.Add(propertyName, propertyValue);
        }



        //rutas para campañas de licencias especiales

        [HttpPost]
        [Route("enviar-empresa-gestionada")]
        public ResultadoPostWeb EnviaEmpresaGestion(EnvioStackWeb entrada)
        {
            ResultadoPostWeb resolucion = new ResultadoPostWeb();

            try
            {
                AsignacionData.EnvioStackEmpresa(entrada.rut_empresa, entrada.oficina,entrada.nombre_empresa);
                resolucion.Codigo = 1;
                resolucion.Descripcion = "Empresa enviada satisfactoriamente";
                resolucion.Objeto = entrada;
            }
            catch (Exception ex)
            {
                resolucion.Codigo = 0;
                resolucion.Descripcion = ex.Message;
                resolucion.Objeto = ex;
            }

            return resolucion;
        }


        [HttpGet]
        [Route("generar-excel-tabla")]
        public HttpResponseMessage XLS_TABLA(int cc, string re, string em)
        {
            var salida = new List<dynamic>();
            List<AsignacionEntity> asigs = AsignacionData.ObtenerEntidadesByEjecutivoE(re, cc, em);

            DataTable dt = new DataTable();
            dt.Columns.Add("RutAfiliado", typeof(string));
            dt.Columns.Add("DvAfiliado", typeof(string));
            dt.Columns.Add("NombreAfiliado", typeof(string));

            List<Columna> columns = new List<Columna>();
            columns.Add(new Columna("RutAfiliado", "Rut Afiliado"));
            columns.Add(new Columna("DvAfiliado", "Dv Afiliado"));
            columns.Add(new Columna("NombreAfiliado", "Nombre Afiliado"));

            
            asigs.ForEach(asg => {
                EntidadEntity ent = EntidadData.ObtenerPorID(asg.RutEntidad);
                GestionEntity UltimaGestion = GestionData.ObtenerEntidades().FindAll(d => d.CodAsignacion == asg.CodAsignacion).OrderByDescending(f => f.FechaAccion).FirstOrDefault();
                

                DataRow dr = dt.NewRow();
                dr["RutAfiliado"] = asg.RutEntidad;
                dr["DvAfiliado"] = ent.DvEntidad;
                dr["NombreAfiliado"] = ent.NombreEntidad;


                AttrvaloresData.ObtenerEntidadesByAsig(asg.CodAsignacion).ForEach(attrv => {

                    if (attrv.CodAttr != "FechaResolucion" && attrv.CodAttr != "Prioridad" && attrv.CodAttr != "Observacion")
                    {
                        if (!dt.Columns.Contains(attrv.CodAttr))
                        {
                            dt.Columns.Add(attrv.CodAttr, typeof(string));
                            columns.Add(new Columna(attrv.CodAttr, AtributoData.ObtenerPorID(attrv.CodAttr).Etiqueta));
                        }
                        dr[attrv.CodAttr] = attrv.ValorAttr;
                    }
                });

                if (!dt.Columns.Contains("NotaEjecutivo"))
                {
                    dt.Columns.Add("NotaEjecutivo", typeof(string));
                    columns.Add(new Columna("NotaEjecutivo", "Documentación Faltante"));
                }
                dr["NotaEjecutivo"] = (UltimaGestion != null) ? UltimaGestion.NotaGestion.Replace("\n",";").Replace("\t"," ").Replace("\r",";") : "Sin Gestión";
                
                dt.Rows.Add(dr);
            });

            byte[] filecontent = ExcelExportHelper.ExportExcel(dt, "Documentación Faltante.", false, columns.ToArray());


            HttpResponseMessage response = new HttpResponseMessage();
            Stream stri = new MemoryStream(filecontent);
            response.Content = new StreamContent(stri);
            response.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
            response.Content.Headers.ContentDisposition.FileName = "Documentacion_Pendiente_SIL.xlsx";
            response.Content.Headers.ContentType = new MediaTypeHeaderValue(ExcelExportHelper.ExcelContentType);
            response.Content.Headers.ContentLength = stri.Length;

            return response;



        }


    }

}
