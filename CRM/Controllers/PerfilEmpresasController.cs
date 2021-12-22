using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Collections;
using System.Net.Http;
using System.Web.Http;
using CRM.Business.Entity;
using CRM.Business.Entity.Clases;
using CRM.Business.Data;
using CRM.ActionFilters;
using System.IO;
using Interop = Microsoft.Office.Interop;
using Microsoft.Office.Interop.Excel;
using System.Runtime.InteropServices;
using System.Web;
using System.Threading.Tasks;

namespace CRM.Controllers
{
    [RoutePrefix("api/perfil-empresas")]
    public class PerfilEmpresasController : ApiController
    {
        [AuthorizationRequired]
        [HttpPost]
        [Route("guardar-gestion-vidaSana")]
        public ResultadoBase GuardarGestionVidaSana(GestionVidaSana gestionVidaSana)
        {
            try
            {
                DateTime ProxGesDt = new DateTime();
                if (gestionVidaSana.ProxGestion==null)
                    ProxGesDt = Convert.ToDateTime("01-01-1900");
                else
                    ProxGesDt = Convert.ToDateTime(gestionVidaSana.ProxGestion);
                gestionVidaSana.ProxGestionDt = ProxGesDt;
                PerfilEmpresasDataAccess.IngresoGestionVidaSana(gestionVidaSana);
                return new ResultadoBase() { Estado = "OK", Mensaje = "Se creo gestión Correctamente" };
            }
            catch (Exception ex)
            {
                return new ResultadoBase() { Estado = "ERR", Mensaje = "Error al gestionar: " + ex.Message, Objeto = ex };
            }
        }

        [HttpGet]
        [Route("obtener-gestion-vidaSana")]
        public ICollection<GestionVidaSana> ObtenerGestionVidaSana(int idEmpresaAnexo)
        {
            
            return PerfilEmpresasDataAccess.ObtenerGestionVidaSana(idEmpresaAnexo);
        }

        [HttpGet]
        [Route("obtener-estadogestion-vidaSanaID")]
        public List<GestionVidaSana> ObtenerEstadoGestionVidaSanaID(int idestado)
        {

            return PerfilEmpresasDataAccess.ObtenerEstadoGestionVidaSanaID(idestado);
        }





        //[AuthorizationRequired]
        [HttpGet]
        [Route("obtener-cartera-empresa")]
        public ICollection<CarteraEmpresasEntity> ObtenerCarteraEmpresa(int Afiliado)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return PerfilEmpresasDataAccess.ObtieneCarteraEmp(token,Afiliado);
        }

        [HttpGet]
        [Route("obtener-cartera-empresa-todos")]
        public ICollection<CarteraEmpresasEntity> ObtenerCarteraEmpresa()
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return PerfilEmpresasDataAccess.ObtieneCarteraEmpTodos(token);
        }


        [HttpGet]
        [Route("obtener-cartera-agente")]
        public ICollection<CarteraEmpresasEntity> ObtenerCarteraAgente(int Afiliado)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return PerfilEmpresasDataAccess.ObtieneCarteraAgen(token,Afiliado);
        }

        [HttpGet]
        [Route("lista-perfil-empresa")]
        public Business.Entity.GestionEmpresasEntity ListaPerfilEmpresa(string RutEmpresa)
        {
            return PerfilEmpresasDataAccess.ObtienePerfilEmp(RutEmpresa);
        }

        [HttpGet]
        [Route("lista-perfil-empresaAnexo")]
        public Business.Entity.GestionEmpresasEntity ListaPerfilEmpresaAnexo(int IdEmpresaA)
        {
            return PerfilEmpresasDataAccess.ObtienePerfilEmpAnexo(IdEmpresaA);
        }

        [HttpGet]
        [Route("lista-asignados-empresa")]
        public ICollection<AsigandosEjecutivoEmpresaEntity> ObtenerAsignadosEjeEmpresa(string RutEmpresa)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return PerfilEmpresasDataAccess.ObtieneAsignacionEjeEmp(token, RutEmpresa);
        }

        [AuthorizationRequired]
        [HttpPost]
        [Route("ingresa-nuevo-anexo")]
        public int NuevoAnexo(AnexoEmpresaEntity ingreso)
        {
            string Token = ActionContext.Request.Headers.GetValues("Token").First();
            return Business.Data.PerfilEmpresasDataAccess.InsertaNuevoAnexo(Token, ingreso.RutEmpresa, ingreso.NombreEmpresa, ingreso.Anexo, ingreso.NumTrabajadores, ingreso.IdComuna, ingreso.NombreComuna, ingreso.Direccion,ingreso.EsMatriz);
        }

        [HttpGet]
        [Route("lista-comunas-empresa")]
        public ICollection<ComunasEmpresaEntity> ObtenerComunasEmpresas()
        {
            return PerfilEmpresasDataAccess.ObtieneComunaEmp();
        }

        [AuthorizationRequired]
        [HttpPost]
        [Route("guardar-asignacion-empresa-anexo")]
        public ResultadoBase GuardarCarteraEmpAnexo(AsignacionAnexoEmpresa asignacionEmpresa)
        {
            try
            {
                PerfilEmpresasDataAccess.GuardarAsignacionEmpAnexo(asignacionEmpresa.Tipo, asignacionEmpresa.EjecAsignado, asignacionEmpresa.Id);
                return new ResultadoBase() { Estado = "OK", Mensaje = "Ingreso Correcto" };
            }
            catch (Exception ex)
            {
                return new ResultadoBase() { Estado = "ERR", Mensaje = "Error en el ingreso: " + ex.Message, Objeto = ex };
            }
        }

        [AuthorizationRequired]
        [HttpPost]
        [Route("elimina-asignacion-empresa-anexo")]
        public ResultadoBase EliminaCarteraEmpAnexo(AsignacionAnexoEmpresa asignacionEmpresa)
        {
            try
            {
                PerfilEmpresasDataAccess.EliminaAsignacionEmpAnexo(asignacionEmpresa.Tipo, asignacionEmpresa.EjecAsignado, asignacionEmpresa.Id);
                return new ResultadoBase() { Estado = "OK", Mensaje = "Se desasigno Correctamente" };
            }
            catch (Exception ex)
            {
                return new ResultadoBase() { Estado = "ERR", Mensaje = "Error al desasignar: " + ex.Message, Objeto = ex };
            }
        }


        [HttpGet]
        [Route("lista-ejecutivo-asignado")]
        public ICollection<EjecutivosAsignadosEntity> ObtenerEjesAsig(int IdEmpresa)
        {
            return PerfilEmpresasDataAccess.ObtieneEjeAsignados(IdEmpresa);
        }

        [HttpGet]
        [Route("lista-cartera-anexo")]
        public ICollection<AnexoEmpresaEntity> ObtenerAnexos(string RutEmpresa)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return PerfilEmpresasDataAccess.ObtieneAnexoEmp(RutEmpresa, token);
        }

        [HttpGet]
        [Route("lista-datos-anexo")]
        public Business.Entity.AnexoEmpresaEntity ListadatosAnexos(int IdEmpresa)
        {
            return PerfilEmpresasDataAccess.ObtieneDatosAnexo(IdEmpresa);
        }

        [AuthorizationRequired]
        [HttpPost]
        [Route("actualiza-nuevo-anexo")]
        public int ActualizaAnexoEmp(AnexoEmpresaEntity actualiza)
        {
            return Business.Data.PerfilEmpresasDataAccess.ActualizaAnexo(actualiza.IdEmpresaAnexo, actualiza.Anexo, actualiza.NumTrabajadores, actualiza.IdComuna, actualiza.NombreComuna, actualiza.Direccion,actualiza.EsMatriz);
        }

        [HttpGet]
        [Route("lista-contador-anexos")]
        public Business.Entity.ContadorAnexoEntity ContadorAnexos(string RutEmpresa)
        {
            return PerfilEmpresasDataAccess.ObtieneContadorAnexo(RutEmpresa);
        }

        [HttpPost]
        [Route("carga-afiliados-dropzone/{anexo}")]
        public async Task<IHttpActionResult> SaveUploadedFile([FromUri] string anexo = "")
        {
            if (!Request.Content.IsMimeMultipartContent())
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            try
            {
                var lista = new List<string>();
                string imprimir = "";
                var provider = new MultipartMemoryStreamProvider();
                await Request.Content.ReadAsMultipartAsync(provider);

                var baseUploadPath = @"C:\uploads\excel\";
                foreach (var file in provider.Contents)
                {
                    if (file.Headers.ContentLength > 0)
                    {
                        var fileName = file.Headers.ContentDisposition.FileName.Trim('\"');
                        if (fileName.EndsWith("csv") || fileName.EndsWith("CSV"))
                        {
                            var nombreFinal = "R" + anexo + DateTime.Now.ToString("yyyyMMddHHmmssFFF") + ".csv";
                            var filePath = Path.Combine(baseUploadPath, nombreFinal);
                            var buffer = await file.ReadAsByteArrayAsync();
                            File.WriteAllBytes(filePath, buffer);

                            using (var files = new StreamReader(filePath))
                            {
                                string line; int i = 0;
                                while ((line = files.ReadLine()) != null)
                                {
                                    if (i >= 0)
                                    {
                                        if (line.Contains(";"))
                                        {
                                            string rut = line.Split(';')[0];
                                            string dv = line.Split(';')[1];
                                            string final = rut + "-" + dv;
                                            imprimir = imprimir + "ANEXO[" + anexo + "] RUT[" + final + "]";
                                            PerfilEmpresasDataAccess.InsertaAfiliadoAnexo(Convert.ToInt32(anexo), final);
                                        }
                                        else if (line.Contains(","))
                                        {
                                            string rut = line.Split(',')[0];
                                            string dv = line.Split(',')[1];
                                            string final = rut + "-" + dv;
                                            imprimir = imprimir + "ANEXO[" + anexo + "] RUT[" + final + "]";
                                            PerfilEmpresasDataAccess.InsertaAfiliadoAnexo(Convert.ToInt32(anexo), final);
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
                var response = Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
                throw new HttpResponseException(response);
            }
        }

        [HttpGet]
        [Route("lista-preaprobado-anexo")]
        public ICollection<AsigandosEjecutivoEmpresaEntity> ObtenerPreAprobadosAnexo(int idAnexo, string RutEmpresa)
        {
            return PerfilEmpresasDataAccess.ObtienePreAprobasoAnex(idAnexo, RutEmpresa);
        }

        [HttpGet]
        [Route("dotacion-oficina")]
        public IEnumerable<EjecutivosOficina> DatosDotacionOficina()
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return PerfilEmpresasDataAccess.ListarDotacionOficina(token);
        }

        [HttpGet]
        [Route("lista-entrevista")]
        public ICollection<EntrevistaEntity> ObtenerEntrevistas(string RutEmpresa, int Anexo)
        {
            string Token = ActionContext.Request.Headers.GetValues("Token").First();
            return PerfilEmpresasDataAccess.ObtieneEntrevista(Token, RutEmpresa, Anexo);
        }

        //[AuthorizationRequired]
        //[HttpPost]
        //[Route("ingresa-cabecera-entrevista")]
        //public int NuevaCabeceraEntrevista(EntrevistaEntity cabecera)
        //{
        //    string Token = ActionContext.Request.Headers.GetValues("Token").First();
        //    return Business.Data.PerfilEmpresasDataAccess.InsertaNuevoCabEntrevista(Token, cabecera.RutEmpresa, cabecera.FechaEntrevista, cabecera.NombreContacto, cabecera.Estamento, cabecera.Cargo, cabecera.Comentarios);
        //}


        [AuthorizationRequired]
        [HttpPost]
        [Route("ingresa-cabecera-entrevista")]
        public Business.Entity.EntrevistaEntity NuevaCabeceraEntrevista(EntrevistaEntity cabecera)
        {
            string Token = ActionContext.Request.Headers.GetValues("Token").First();
            return Business.Data.PerfilEmpresasDataAccess.InsertaNuevoCabEntrevista(Token, cabecera.RutEmpresa, cabecera.FechaEntrevista, cabecera.NombreContacto, cabecera.Estamento, cabecera.Cargo, cabecera.Comentarios, cabecera.TelefonoContacto, cabecera.CorreoContacto, cabecera.IdAnexo);
        }

        [AuthorizationRequired]
        [HttpPost]
        [Route("ingresa-detalle-entrevista")]
        public int NuevaDetalleEntrevista(DetalleEntrevistaEntity detalleEntrevista)
        {
            string Token = ActionContext.Request.Headers.GetValues("Token").First();
            return Business.Data.PerfilEmpresasDataAccess.InsertaDetalleEntrevista(Token, detalleEntrevista.IdEntrevista, detalleEntrevista.Tema, detalleEntrevista.SubTema, detalleEntrevista.Semaforo, detalleEntrevista.Alerta, detalleEntrevista.FechaResolucion, detalleEntrevista.Comentarios, detalleEntrevista.Compromiso);
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-cabecera-vista")]
        public ICollection<EntrevistaEntity> VistaCabeceraEntrevista(int IdEntrevista)
        {
            return Business.Data.PerfilEmpresasDataAccess.ObtieneVistaEntrevista(IdEntrevista);
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-detalle-cabecera-vista")]
        public ICollection<DetalleEntrevistaEntity> VistaDetalleEntrevista(int IdEntrevista)
        {
            return Business.Data.PerfilEmpresasDataAccess.ObtieneDetalleVistaEntrevista(IdEntrevista);
        }


        [HttpGet]
        [Route("obtiene-detalle-entrev")]
        public Business.Entity.DetalleEntrevistaEntity ListaDetalleEnt(int idDetalleEntrevista)
        {
            return PerfilEmpresasDataAccess.ObtieneDetalleEntr(idDetalleEntrevista);
        }

        //SE CAMBIA POR NUEVO DETALLE DE GESTION 
        //[AuthorizationRequired]
        //[HttpPost]
        //[Route("ingresa-gestion-mantencion")]
        //public int NuevaGestionMantencion(GestionMantencionEntity GestionMant)
        //{
        //    string Token = ActionContext.Request.Headers.GetValues("Token").First();
        //    return Business.Data.PerfilEmpresasDataAccess.InsertaGestionMantencion(Token, GestionMant.RutEmpresa, GestionMant.Tema, GestionMant.SubTema, GestionMant.Tipo, GestionMant.RutAfiliado, GestionMant.Comentarios, GestionMant.Alerta);
        //}

        [AuthorizationRequired]
        [HttpPost]
        [Route("ingresa-gestion-mantencion")]
        public int NuevaGestionMantencion(GestionMantencionEntity GestionMant)
        {
            string Token = ActionContext.Request.Headers.GetValues("Token").First();
            return Business.Data.PerfilEmpresasDataAccess.InsertaGestionMantencion(Token, GestionMant.IdCabGesMantencion, GestionMant.RutEmpresa, GestionMant.Tema, GestionMant.SubTema, GestionMant.RutAfiliado, GestionMant.Comentarios, GestionMant.Alerta);
        }



        [AuthorizationRequired]
        [HttpPost]
        [Route("actualiza-detalle-entrevista")]
        public int ActualizaDetalleEntrevista(DetalleEntrevistaEntity detalleEntrevista)
        {
            string Token = ActionContext.Request.Headers.GetValues("Token").First();
            return Business.Data.PerfilEmpresasDataAccess.ActualizaDetalleEntrevista(Token, detalleEntrevista.IdDetalleEntrevista, detalleEntrevista.IdEntrevista, detalleEntrevista.Tema, detalleEntrevista.SubTema, detalleEntrevista.Semaforo, detalleEntrevista.Alerta, detalleEntrevista.FechaResolucion, detalleEntrevista.Comentarios, detalleEntrevista.Compromiso);
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-tipologia-gestion")]
        public ICollection<TipologiaGestionEntity> ObtieneTipologiaGestion()
        {
            return Business.Data.PerfilEmpresasDataAccess.ObtieneTipoGestion();
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-tipologia-Subgestion")]
        public ICollection<TipologiaSubGestionEntity> ObtieneTipologiaSubGestion(int IdTema)
        {
            return Business.Data.PerfilEmpresasDataAccess.ObtieneSubTemaoGestion(IdTema);
        }

        //SE CAMBIA POR VISTA CABECERA MANTENCION
        //[HttpGet]
        //[Route("lista-mantencion-gestion")]
        //public ICollection<GestionMantencionEntity> ObtenerMantencionGestion(string RutEmpresa)
        //{
        //    return PerfilEmpresasDataAccess.ObtenerMantencionGest(RutEmpresa);
        //}


        //SE CAMBIA POR VISTA CABECERA  detalle MANTENCION
        //[AuthorizationRequired]
        //[HttpGet]
        //[Route("lista-detalle-mantencion-gestion")]
        //public ICollection<GestionMantencionEntity> VistaDetalleGestion(int IdGesMantencion)
        //{
        //    return Business.Data.PerfilEmpresasDataAccess.ObtieneDetalleMantGestion(IdGesMantencion);
        //}



        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-afiliado-oficina")]
        public ICollection<AfiliadoOficinaEntity> ObtieneAfiliadoOficina(string RutEmpresa)
        {
            return Business.Data.PerfilEmpresasDataAccess.ObtieneAfiliadoSuc(RutEmpresa);
        }

        [HttpGet]
        [Route("lista-detalle-mantencion-gestion-update")]
        public Business.Entity.GestionMantencionEntity VistaDetalleGestionUpdate(int IdGesMantencion)
        {
            return PerfilEmpresasDataAccess.ObtieneDetalleMantUp(IdGesMantencion);
        }

        [AuthorizationRequired]
        [HttpPost]
        [Route("actualiza-detalle-mantencion-gestion")]
        public int ActualizaDetalleMantencionGestion(GestionMantencionEntity GestionMantUp)
        {
            string Token = ActionContext.Request.Headers.GetValues("Token").First();
            return Business.Data.PerfilEmpresasDataAccess.ModificaGestionMantencion(Token, GestionMantUp.IdGesMantencion, GestionMantUp.RutEmpresa, GestionMantUp.Tema, GestionMantUp.SubTema, GestionMantUp.RutAfiliado, GestionMantUp.Comentarios);
        }

        [HttpGet]
        [Route("lista-mantencion-gestion-historial")]
        public ICollection<GestionMantencionEntity> ObtenerMantencionGestionHistorial(int IdGesMantencion)
        {
            return PerfilEmpresasDataAccess.ObtenerMantencionGestHistorial(IdGesMantencion);
        }

        [AuthorizationRequired]
        [HttpPost]
        [Route("ingresa-cabecera-mant-gestion")]
        public Business.Entity.CabGestionMantencionEntity NuevaCabeceraGestionMan(CabGestionMantencionEntity cabecera)
        {
            string Token = ActionContext.Request.Headers.GetValues("Token").First();
            return Business.Data.PerfilEmpresasDataAccess.InsertaNuevoCabDetalleGestion(Token, cabecera.RutEmpresa, cabecera.FechaIngreso, cabecera.Tipo, cabecera.Comentarios, cabecera.Anexo);
        }


        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-cabecera-gestion-mant")]
        public Business.Entity.CabGestionMantencionEntity ObtieneCabeceraGestion(int IdCabGesMantencion)
        {
            return PerfilEmpresasDataAccess.ObtieneCabGestionMantenedor(IdCabGesMantencion);
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-mantencion-gestion")]
        public ICollection<CabGestionMantencionEntity> ObtenerMantencionGestion(string RutEmpresa, int idAnexo)
        {
            string Token = ActionContext.Request.Headers.GetValues("Token").First();
            return PerfilEmpresasDataAccess.ObtenerMantencionGest(Token, RutEmpresa, idAnexo);
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-detalle-mantencion-gestion")]
        public ICollection<GestionMantencionEntity> VistaDetalleGestion(int IdCabGesMantencion)
        {
            return Business.Data.PerfilEmpresasDataAccess.ObtieneDetalleMantGestion(IdCabGesMantencion);
        }

        [HttpGet]
        [Route("lista-detalle-entrevista-historial")]
        public ICollection<DetalleEntrevistaEntity> ObtenerDetalleEntreviHistorial(int IdDetalleEntrevista)
        {
            return PerfilEmpresasDataAccess.ObtenerDetalleEntrevistaHistorial(IdDetalleEntrevista);
        }

        [AuthorizationRequired]
        [HttpPost]
        [Route("ingresa-cita-agenda-empresa")]
        public int GuardaCitaAgendaEmp(AgendaEmpresaEntity AgendaCita)
        {
            string Token = ActionContext.Request.Headers.GetValues("Token").First();
            return Business.Data.PerfilEmpresasDataAccess.IngresaCitaAgenda(Token, AgendaCita.RutEmpresa, AgendaCita.NombreEmpresa, AgendaCita.Glosa,
                                                                                    AgendaCita.FechaInico, AgendaCita.FechaFin, AgendaCita.HoraInicio, AgendaCita.HoraFin,
                                                                                    AgendaCita.Frecuencia, AgendaCita.Dias, AgendaCita.TipoVisita,
                                                                                    AgendaCita.IdAnexo, AgendaCita.DiasSucede);
        }

        [AuthorizationRequired]
        [HttpPost]
        [Route("ingresa-cita-agenda-empresa-agente")]
        public int GuardaCitaAgendaEmpAgente(AgendaEmpresaEntity AgendaCita)
        {
            string Token = ActionContext.Request.Headers.GetValues("Token").First();
            return Business.Data.PerfilEmpresasDataAccess.IngresaCitaAgendaAgente(Token, AgendaCita.RutEmpresa, AgendaCita.RutEjecutivo, AgendaCita.NombreEmpresa, AgendaCita.Glosa,
                                                                                    AgendaCita.FechaInico, AgendaCita.FechaFin, AgendaCita.HoraInicio, AgendaCita.HoraFin,
                                                                                    AgendaCita.Frecuencia, AgendaCita.Dias, AgendaCita.TipoVisita,
                                                                                    AgendaCita.IdAnexo, AgendaCita.DiasSucede);
        }


        // [AuthorizationRequired]
        [HttpGet]
        [Route("lista-cita-agenda-cartera/{RutEmpresa}/{RutEjecutivo}/{IdAnexo}")]
        public IHttpActionResult ListarMisEventosFC(string RutEmpresa, string RutEjecutivo, int IdAnexo)
        {
            string Token = ActionContext.Request.Headers.GetValues("Token").First();
            var data = PerfilEmpresasDataAccess.ObtenerCitaCartera(RutEmpresa, RutEjecutivo, IdAnexo, Token);
            var salida = new List<dynamic>();

            data.ForEach(cita =>
            {
                var clase = "warning";
                switch (cita.TipoVisita)
                {
                    case "Terreno":
                        clase = "primary";
                        break;
                    case "Telefono":
                        clase = "warning";
                        break;
                    case "Mail":
                        clase = "success";
                        break;
                }
                var evt = new
                {
                    title = cita.NombreEmpresa,
                    start = cita.FechaInico,
                    end = cita.FechaFin,
                    IdAgenda = cita.IdAgenda,
                    IdRegistro = cita.IdRegistro,
                    RutEmpresa = cita.RutEmpresa,
                    NombreEmpresa = cita.NombreEmpresa,
                    Frecuencia = cita.Frecuencia,
                    Dias = cita.Dias,
                    DiasSucede = cita.DiasSucede,
                    TipoVisita = cita.TipoVisita,
                    IdAnexo = cita.IdAnexo,
                    HoraInicio = cita.HoraInicio,
                    HoraFin =cita.HoraFin,
                    Ncitas = cita.NCitas,
                    Glosa = cita.Glosa,
                    className = clase
                };
                salida.Add(evt);
            });

            return Json(salida);
        }

        [HttpGet]
        [Route("lista-cita-agenda-cartera-anexo/{RutEmpresa}/{RutEjecutivo}/{IdAnexo}")]
        public IHttpActionResult ListarMisEventosFC(string RutEmpresa, int IdAnexo)
        {
            var data = PerfilEmpresasDataAccess.ObtenerCitaCarteraAnexo(RutEmpresa, IdAnexo);

            var salida = new List<dynamic>();

            data.ForEach(cita =>
            {
                var clase = "warning";
                switch (cita.TipoVisita)
                {
                    case "Terreno":
                        clase = "primary";
                        break;
                    case "Telefono":
                        clase = "warning";
                        break;
                    case "Mail":
                        clase = "success";
                        break;
                }
                var evt = new
                {
                    title = cita.NombreEmpresa,
                    start = cita.FechaInico,
                    end = cita.FechaFin,
                    IdAgenda = cita.IdAgenda,
                    IdRegistro = cita.IdRegistro,
                    RutEmpresa = cita.RutEmpresa,
                    NombreEmpresa = cita.NombreEmpresa,
                    Frecuencia = cita.Frecuencia,
                    Dias = cita.Dias,
                    DiasSucede = cita.DiasSucede,
                    TipoVisita = cita.TipoVisita,
                    IdAnexo = cita.IdAnexo,
                    HoraInicio = cita.HoraInicio,
                    HoraFin = cita.HoraFin,
                    Ncitas = cita.NCitas,
                    Glosa = cita.Glosa,
                    className = clase
                };

                salida.Add(evt);
            });

            return Json(salida);
        }


        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-cita-agenda-cartera-ejecutivo/{RutEmpresa}/{IdAnexo}")]
        public IHttpActionResult ListarMisEventosFCejecutivo(string RutEmpresa, int IdAnexo)
        {
            string Token = ActionContext.Request.Headers.GetValues("Token").First();
            var data = PerfilEmpresasDataAccess.ObtenerCitaCarteraEjecutivo(RutEmpresa, Token, IdAnexo);

            var salida = new List<dynamic>();

            data.ForEach(cita =>
            {
                var clase = "warning";
                switch (cita.TipoVisita)
                {
                    case "Terreno":
                        clase = "primary";
                        break;
                    case "Telefono":
                        clase = "warning";
                        break;
                    case "Mail":
                        clase = "success";
                        break;
                }
                var evt = new
                {
                    title = cita.NombreEmpresa,
                    start = cita.FechaInico,
                    end = cita.FechaFin,
                    IdAgenda = cita.IdAgenda,
                    IdRegistro = cita.IdRegistro,
                    RutEmpresa = cita.RutEmpresa,
                    NombreEmpresa = cita.NombreEmpresa,
                    Frecuencia = cita.Frecuencia,
                    Dias = cita.Dias,
                    DiasSucede = cita.DiasSucede,
                    TipoVisita = cita.TipoVisita,
                    IdAnexo = cita.IdAnexo,
                    HoraInicio = cita.HoraInicio,
                    HoraFin = cita.HoraFin,
                    Ncitas = cita.NCitas,
                    Glosa = cita.Glosa,
                    className = clase
                };

                salida.Add(evt);
            });

            return Json(salida);
        }


        [AuthorizationRequired]
        [HttpPost]
        [Route("actualiza-cita-agenda-empresa")]
        public int ActualizaCitaAgendaEmp(AgendaEmpresaEntity AgendaCita)
        {
            string Token = ActionContext.Request.Headers.GetValues("Token").First();
            return Business.Data.PerfilEmpresasDataAccess.ActulizaCitaAgenda(Token, AgendaCita.IdAgenda, AgendaCita.RutEmpresa, AgendaCita.Glosa,
                                                                                    AgendaCita.FechaInico, AgendaCita.FechaFin, AgendaCita.HoraInicio, AgendaCita.HoraFin, AgendaCita.TipoVisita );
        }

        [AuthorizationRequired]
        [HttpPost]
        [Route("elimina-cita-agenda-empresa")]
        public int EliminaCitaAgendaEmp(AgendaEmpresaEntity AgendaCita)
        {
            string Token = ActionContext.Request.Headers.GetValues("Token").First();
            return Business.Data.PerfilEmpresasDataAccess.EliminaCitaAgenda(Token, AgendaCita.IdAgenda, AgendaCita.IdRegistro, AgendaCita.RutEmpresa);
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-empresa-ejecutivo")]
        public ICollection<CarteraEmpresasEntity> ObtieneEmpresaEjecutivo(string RutEjecutivo)
        {
            return Business.Data.PerfilEmpresasDataAccess.ObtieneEmpEjecutivoAsignado(RutEjecutivo);
        }


        [AuthorizationRequired]
        [HttpGet]
        [Route("elimina-empresa-asignada/{IdEmpresa}/{RutEmpresa}")]
        public int EliminaEmpresaAsignada([FromUri] int IdEmpresa, [FromUri] string RutEmpresa)
        {
            string Token = ActionContext.Request.Headers.GetValues("Token").First();
            return Business.Data.PerfilEmpresasDataAccess.EliminaEmpAsignada(Token, IdEmpresa, RutEmpresa);
        }


        [AuthorizationRequired]
        [HttpGet]
        [Route("elimina-anexo-asignada/{RutEmpresa}")]
        public int EliminaAnexoAsignada([FromUri] string RutEmpresa, [FromUri] int IdAnexo)
        {
            string Token = ActionContext.Request.Headers.GetValues("Token").First();
            return Business.Data.PerfilEmpresasDataAccess.EliminaAnexoAsignada(Token, RutEmpresa, IdAnexo);
        }


        [HttpGet]
        [Route("lista-region-empresa")]
        public ICollection<RegionEmpresaEntity> ObtieneRegionEmpresa()
        {
            return Business.Data.PerfilEmpresasDataAccess.ObtieneRegionEmpresa();
        }


        [HttpGet]
        [Route("lista-comuna-empresa")]
        public ICollection<ComunaEmpresaEntity> ObtieneComunaEmpresa(int ComunaCodigo)
        {
            return Business.Data.PerfilEmpresasDataAccess.ObtieneComunaEmpresa(ComunaCodigo);
        }
    }

}
