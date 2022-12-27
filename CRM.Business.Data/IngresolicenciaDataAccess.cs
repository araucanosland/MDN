using CDK.Data;
using CDK.Integration;
using CRM.Business.Entity;
using System;
using System.Collections.Generic;
using System.Data;

//------------------------------------------------------------------------------
// <generado automáticamente>
//     Este código fue generado por una herramienta.
//
//     Los cambios en este archivo podrían causar un comportamiento incorrecto y se perderán si
//     se vuelve a generar el código.
// </generado automáticamente>
//------------------------------------------------------------------------------

namespace CRM.Business.Data
{

    /// <summary>
    /// Clase Acceso de Datos IngresolicenciaDataAccess
    /// </summary>
    /// <author>@Charly</author>
    /// <created>28-09-2017 16:35:13</created>
    /// <remarks>
    /// Esta clase fué generada automáticamente por una herramienta.
    /// </remarks>
    public class IngresolicenciaDataAccess
    {
        #region metodos base

        /// <summary>
        /// Guarda la entidad de dominio <see cref="Ingresolicencia"/> en la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>28-09-2017 16:35:13</created>
        /// <param name="ingresolicencia">Referencia a una clase <see cref="Ingresolicencia"/>.</param>
        /// <returns>Clave primaria resultante de la operación</returns>
        /// 
        private static LicenciasLMTimeLine ConstructorBitacora(DataRow row)
        {
            return new LicenciasLMTimeLine
            {

                CodIngreso = row["CodIngreso"] != DBNull.Value ? Convert.ToInt64(row["CodIngreso"]) : 0,
                RutAfiliado = row["RutAfiliado"] != DBNull.Value ? row["RutAfiliado"].ToString() : string.Empty,
                FolioLicencia = row["FolioLicencia"] != DBNull.Value ? row["FolioLicencia"].ToString() : string.Empty,
                FechaIngreso = row["fechaingreso"] != DBNull.Value ? Convert.ToDateTime(row["fechaingreso"]) : new DateTime(1900, 1, 1),
                NombreAfiliado = row["NombreAfiliado"] != DBNull.Value ? row["NombreAfiliado"].ToString() : string.Empty,
                Ejecutado = row["Responsable"] != DBNull.Value ? row["Responsable"].ToString() : string.Empty,
                FormatoLM = row["FormatoLM"] != DBNull.Value ? row["FormatoLM"].ToString() : string.Empty,
                Oficina = row["Oficina"] != DBNull.Value ? row["Oficina"].ToString() : string.Empty,
                Quienenvia = row["Quienenvia"] != DBNull.Value ? row["Quienenvia"].ToString() : string.Empty,
                Telefono = row["Telefono"] != DBNull.Value ? row["Telefono"].ToString() : string.Empty,
                Email = row["Email"] != DBNull.Value ? row["Email"].ToString() : string.Empty,
                DiasAutorizados = row["DiasAutorizados"] != DBNull.Value ? Convert.ToInt32(row["DiasAutorizados"]) : 0,
                CantidadDiasLM = row["CantidadDiasLM"] != DBNull.Value ? Convert.ToInt32(row["CantidadDiasLM"]) : 0,
                FechaInicioLM = row["FechaInicioLM"] != DBNull.Value ? Convert.ToDateTime(row["FechaInicioLM"]) : new DateTime(1900, 1, 1),
                FechaHastaLM = row["FechaHastaLM"] != DBNull.Value ? Convert.ToDateTime(row["FechaHastaLM"]) : new DateTime(1900, 1, 1),
                TipoLM = row["TipoLM"] != DBNull.Value ? row["TipoLM"].ToString() : string.Empty,
                FechaEtapa = row["FechaEtapa"] != DBNull.Value ? Convert.ToDateTime(row["FechaEtapa"]) : new DateTime(1900, 1, 1),
                Etapa = row["Etapa"] != DBNull.Value ? row["Etapa"].ToString() : string.Empty,
                EtapaId = row["EtapaId"] != DBNull.Value ? Convert.ToInt32(row["EtapaId"]) : 0,
                Estado = row["Estado"] != DBNull.Value ? row["Estado"].ToString() : string.Empty,
                Responsable = row["Responsable"] != DBNull.Value ? row["Responsable"].ToString() : string.Empty,
                Mandato = row["Mandato"] != DBNull.Value ? row["Mandato"].ToString() : string.Empty,
            };



        }
        private static LicenciasLMTimeLine ConstructorTimeLine(DataRow row)
        {
            return new LicenciasLMTimeLine
            {

                CodIngreso = row["CodIngreso"] != DBNull.Value ? Convert.ToInt64(row["CodIngreso"]) : 0,
                RutAfiliado = row["RutAfiliado"] != DBNull.Value ? row["RutAfiliado"].ToString() : string.Empty,
                FolioLicencia = row["FolioLicencia"] != DBNull.Value ? row["FolioLicencia"].ToString() : string.Empty,
                FechaIngreso = row["fechaingreso"] != DBNull.Value ? Convert.ToDateTime(row["fechaingreso"]) : new DateTime(1900, 1, 1),
                NombreAfiliado = row["NombreAfiliado"] != DBNull.Value ? row["NombreAfiliado"].ToString() : string.Empty,
                Ejecutado = row["Responsable"] != DBNull.Value ? row["Responsable"].ToString() : string.Empty,
                FechaInicio = row["FechaInicio"] != DBNull.Value ? Convert.ToDateTime(row["FechaInicio"]) : new DateTime(1900, 1, 1),
                FechaTermino = row["FechaTermino"] != DBNull.Value ? Convert.ToDateTime(row["FechaTermino"]) : new DateTime(1900, 1, 1),
                Estado = row["estado"] != DBNull.Value ? row["estado"].ToString() : string.Empty,
                Etapa = row["NombreEtapa"] != DBNull.Value ? row["NombreEtapa"].ToString() : string.Empty,
                EtapaId = row["EtapaId"] != DBNull.Value ? Convert.ToInt32(row["EtapaId"]) : 0,
                Siguienteetapa = row["Siguienteetapa"] != DBNull.Value ? row["Siguienteetapa"].ToString() : string.Empty,
                FormatoLM = row["FormatoLM"] != DBNull.Value ? row["FormatoLM"].ToString() : string.Empty,
                Oficina = row["Oficina"] != DBNull.Value ? row["Oficina"].ToString() : string.Empty,
                Quienenvia = row["Quienenvia"] != DBNull.Value ? row["Quienenvia"].ToString() : string.Empty,
                Telefono = row["Telefono"] != DBNull.Value ? row["Telefono"].ToString() : string.Empty,
                Email = row["Email"] != DBNull.Value ? row["Email"].ToString() : string.Empty,
                IdEtapaSiguiente = row["IdEtapaSiguiente"] != DBNull.Value ? Convert.ToInt32(row["IdEtapaSiguiente"]) : 0,
                EstadoPronunciamiento = row["EstadoPronunciamiento"] != DBNull.Value ? row["EstadoPronunciamiento"].ToString() : string.Empty,
                SubComision = row["SubComision"] != DBNull.Value ? row["SubComision"].ToString() : string.Empty,
                DiasAutorizados = row["DiasAutorizados"] != DBNull.Value ? Convert.ToInt32(row["DiasAutorizados"]) : 0,
                CantidadDiasLM = row["CantidadDiasLM"] != DBNull.Value ? Convert.ToInt32(row["CantidadDiasLM"]) : 0,
                FechaInicioLM = row["FechaInicioLM"] != DBNull.Value ? Convert.ToDateTime(row["FechaInicioLM"]) : new DateTime(1900, 1, 1),
                FechaHastaLM = row["FechaHastaLM"] != DBNull.Value ? Convert.ToDateTime(row["FechaHastaLM"]) : new DateTime(1900, 1, 1),
                FechaPronunciamiento = row["FechaPronunciamiento"] != DBNull.Value ? Convert.ToDateTime(row["FechaPronunciamiento"]) : new DateTime(1900, 1, 1),
                EntidadPago = row["EntidadPago"] != DBNull.Value ? row["EntidadPago"].ToString() : string.Empty,
                TipoPago = row["TipoPago"] != DBNull.Value ? row["TipoPago"].ToString() : string.Empty,
                MontoPago = row["MontoPago"] != DBNull.Value ? row["MontoPago"].ToString() : string.Empty,
                EstadoPago = row["EstadoPago"] != DBNull.Value ? row["EstadoPago"].ToString() : string.Empty,
                TipoLM = row["TipoLM"] != DBNull.Value ? row["TipoLM"].ToString() : string.Empty,
                MotivoDevolucion = row["MotivoDevolucion"] != DBNull.Value ? row["MotivoDevolucion"].ToString() : string.Empty,
                SubComisionTarea = row["SubComisionTarea"] != DBNull.Value ? row["SubComisionTarea"].ToString() : string.Empty,
                MotivoDevolucionCompin = row["MotivodevueltaCompin"] != DBNull.Value ? row["MotivodevueltaCompin"].ToString() : string.Empty,
                MotivoDevueltaOficina = row["MotivoDevueltaOficina"] != DBNull.Value ? row["MotivoDevueltaOficina"].ToString() : string.Empty,
                GestionOficina = row["GestionOficina"] != DBNull.Value ? row["GestionOficina"].ToString() : string.Empty,
                GestionOficina2 = row["GestionOficina2"] != DBNull.Value ? row["GestionOficina2"].ToString() : string.Empty,
                GestionOficina3 = row["GestionOficina3"] != DBNull.Value ? row["GestionOficina3"].ToString() : string.Empty,
                PagoPronunciamiento = row["PagoPronunciamiento"] != DBNull.Value ? row["PagoPronunciamiento"].ToString() : string.Empty,
                Mandato = row["Mandato"] != DBNull.Value ? row["Mandato"].ToString() : string.Empty

            };



        }
        private static CargaExcelRRLLEntity ConstructorSubcomision(DataRow row)
        {
            return new CargaExcelRRLLEntity
            {

                Subcomision = row["Subcomision"] != DBNull.Value ? row["Subcomision"].ToString() : string.Empty,
            };

        }

        private static CargaExcelRRLLEntity ConstructorCargaCompin(DataRow row)
        {
            return new CargaExcelRRLLEntity
            {


                FolioLicencia = row["FolioLicencia"] != DBNull.Value ? row["FolioLicencia"].ToString() : string.Empty,
                FechaCompin = row["FechasubidaCompin"] != DBNull.Value ? Convert.ToDateTime(row["FechasubidaCompin"]) : new DateTime(1900, 1, 1),
                Subcomision = row["Subcomision"] != DBNull.Value ? row["Subcomision"].ToString() : string.Empty,
                RutAfiliado = row["RutAfiliado"] != DBNull.Value ? row["RutAfiliado"].ToString() : string.Empty,
                Oficina = row["OficinaDescripcion"] != DBNull.Value ? row["OficinaDescripcion"].ToString() : string.Empty,
                FechaIngreso = row["FechaIngreso"] != DBNull.Value ? Convert.ToDateTime(row["FechaIngreso"]) : new DateTime(1900, 1, 1),
                FechaAuditoria = row["FechaAuditoria"] != DBNull.Value ? Convert.ToDateTime(row["FechaAuditoria"]) : new DateTime(1900, 1, 1),
                FechaIngresoString = row["FechaIngresoString"] != DBNull.Value ? row["FechaIngresoString"].ToString() : string.Empty,
                FechaAuditoriaString = row["FechaAuditoriaString"] != DBNull.Value ? row["FechaAuditoriaString"].ToString() : string.Empty,
                FechaSubidaCompinString = row["FechaSubidaCompinString"] != DBNull.Value ? row["FechaSubidaCompinString"].ToString() : string.Empty,
            };

        }
        public static List<LicenciasLMTimeLine> ObtenerLicenciaTimeLine(long CodIngreso)
        {
            Parametro parametro = new Parametro("@CodIngreso", CodIngreso);
            {

            };
            try
            {
                return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_ingresoLicencia_TimeLine", parametro, ConstructorTimeLine);

            }
            catch (Exception ex)
            {

                throw ex;
            }


        }
        public static List<LicenciasLMTimeLine> ObtenerBitacoraLM(long CodIngreso)
        {
            Parametro parametro = new Parametro("@CodIngreso", CodIngreso);
            {

            };
            try
            {
                return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_ingresoLicencia_Bitacora", parametro, ConstructorTimeLine);

            }
            catch (Exception ex)
            {

                throw ex;
            }


        }
        public static List<LicenciasLMTimeLine> ObtenerBitacora(long CodIngreso)
        {
            Parametro parametro = new Parametro("@CodIngreso", CodIngreso);
            {

            };
            try
            {
                return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_ingresoLicencia_TimeLine", parametro, ConstructorBitacora);

            }
            catch (Exception ex)
            {

                throw ex;
            }


        }

        public static int ValidaFolio(string FolioLicencia, string Rut)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@FolioLicencia", FolioLicencia),
                new Parametro("@Rut", Rut),

            };
            try
            {

                return DBHelper.InstanceCRM.ObtenerEscalar<int>("licencias.sp_Lic_Ingresolicencia_Valida_Folio", parametros);

            }
            catch (Exception ex)
            {

                throw ex;
            }


        }



        public static long HitoricoBitacora(long CodIngreso)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@pcodingreso", CodIngreso)

            };
            try
            {
                return DBHelper.InstanceCRM.ObtenerEscalar<long>("licencias.sp_Lic_proceso_bitacora_historico", parametros);

            }
            catch (Exception ex)
            {

                throw ex;
            }


        }


        public static List<CargaExcelRRLLEntity> CargaListaCompinCentralizada(string FolioLicencia, DateTime desde, DateTime hasta, string subcomision)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@foliolicencia", FolioLicencia),
                new Parametro("@fecha_desde", desde),
                new Parametro("@fecha_hasta", hasta),
                 new Parametro("@subcomision", subcomision)

            };
            try
            {
                return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_Ingresolicencia_Compin_Listar", parametros, ConstructorCargaCompin);

            }
            catch (Exception ex)
            {

                throw ex;
            }


        }

        public static List<CargaExcelRRLLEntity> CargaListaCompin(string FolioLicencia, DateTime desde, DateTime hasta)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@foliolicencia", FolioLicencia),
                new Parametro("@fecha_desde", desde),
                new Parametro("@fecha_hasta", hasta)
            };
            try
            {
                return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_Compin_Cargas", parametros, ConstructorCargaCompin);

            }
            catch (Exception ex)
            {

                throw ex;
            }


        }



        public static long Guardar(Ingresolicencia ingresolicencia, string Token)
        {


            Parametros parametros = new Parametros
            {
                new Parametro("@CodIngreso", ingresolicencia.CodIngreso),
                new Parametro("@RutAfiliado", ingresolicencia.RutAfiliado),
                new Parametro("@NombreAfiliado", ingresolicencia.NombreAfiliado),
                new Parametro("@SinDatosEnSistema", ingresolicencia.SinDatosEnSistema),
                new Parametro("@FormatoLM",ingresolicencia.FormatoLM),
                new Parametro("@FolioLicencia", ingresolicencia.FolioLicencia),
                new Parametro("@Oficina", ingresolicencia.Oficina),
                new Parametro("@Token", Token),
                new Parametro("@CodEstado", ingresolicencia.CodEstado),
                new Parametro("@FechaIngreso", ingresolicencia.FechaIngreso),
                new Parametro("@OficinaDerivacion", ingresolicencia.OficinaDerivacion),
                new Parametro("@viaIngresoLicenica", ingresolicencia.viaIngresoLicenica),
                new Parametro("@quienEnvia", ingresolicencia.quienEnvia),
                new Parametro("@email", ingresolicencia.email),
                new Parametro("@p_telefono", ingresolicencia.telefono),
                new Parametro("@p_esbanner", ingresolicencia.esBanner),


                
                //

            };

            try
            {
                return DBHelper.InstanceCRM.ObtenerEscalar<long>("licencias.sp_Lic_Ingresolicencia_Guardar", parametros);

            }
            catch (Exception ex)
            {

                throw;
            }


        }



        public static long GuardaDerivacion(Ingresolicencia derivacion, string token)
        {
            Parametros parametros = new Parametros
            {

                new Parametro("@Token",token),
                new Parametro("@RutAfiliado",derivacion.RutAfiliado),
                new Parametro("@FolioLicencia",derivacion.FolioLicencia)
            };

            return DBHelper.InstanceCRM.ObtenerEscalar<long>("licencias.sp_Lic_Ingresolicencia_ActualizarDerivacion", parametros);
        }

        public static long GuardarResponsable(string folioLM, string responsable, string codingreso, string token)
        {
            Parametros parametros = new Parametros
            {

                new Parametro("@folio_LM",folioLM),
                new Parametro("@responsable",responsable),
                new Parametro("@codingreso",codingreso),
                new Parametro("@token",token)


            };

            return DBHelper.InstanceCRM.ObtenerEscalar<long>("licencias.sp_Lic_Ingresolicencia_Actualizar_EnvioTATA", parametros);
        }


        public static long GuardarDevolucionCompin(string CodIngreso, string estadoDevuelta, string token, string responsable)
        {

            Parametros parametros = new Parametros
            {

                new Parametro("@CodIngreso",CodIngreso),
                new Parametro("@estadoDevuelta",estadoDevuelta),
                 new Parametro("@token",token),
                  new Parametro("@responsable",responsable)

            };

            try
            {
                return DBHelper.InstanceCRM.ObtenerEscalar<long>("licencias.sp_Lic_devolucion_Compin_Guardar", parametros);

            }
            catch (Exception ex)
            {

                throw ex;
            }




        }
        public static long GuardarDevoluciontata(string CodIngreso, string estadoDevuelta, string token)
        {

            Parametros parametros = new Parametros
            {

                new Parametro("@CodIngreso",CodIngreso),
                new Parametro("@estadoDevuelta",estadoDevuelta),
                new Parametro("@token",token),
            };

            return DBHelper.InstanceCRM.ObtenerEscalar<long>("licencias.sp_Lic_devolucion_tata_Guardar", parametros);
        }

        public static long GuardarLMReemplazadaPorOtra(string CodIngreso, string token, int tiposeleccion)
        {

            Parametros parametros = new Parametros
            {

                new Parametro("@CodigoIngresoLM",CodIngreso),
                new Parametro("@token",token),
                new Parametro("@tiposeleccion",tiposeleccion)
            };

            return DBHelper.InstanceCRM.ObtenerEscalar<long>("licencias.sp_Lic_DocumentosFaltantes_LM_Cambio_TipoSeleccion_Nuevo_Flujo", parametros);
        }





        public static long ListaresponsablecierreConteo(int CodOficina)
        {
            Parametros parametros = new Parametros
            {
               new Parametro("@CodOficina",CodOficina),
            };

            return DBHelper.InstanceCRM.ObtenerEscalar<long>("licencias.sp_Lic_Ingresolicencia_ListarCierreResponsable_Conteo", parametros);
        }


        public static long ListadevueltasTATAConteo(int CodOficina)
        {
            Parametros parametros = new Parametros
            {
               new Parametro("@CodOficina",CodOficina)
            };

            return DBHelper.InstanceCRM.ObtenerEscalar<long>("licencias.sp_Lic_Ingresolicencia_ListarDevueltasTATA_Conteo", parametros);
        }


        public static List<CargaExcelRRLLEntity> ListarSubcomisionRRLL(string token)
        {
            Parametros parametros = new Parametros
            {

               new Parametro("@token",token)

            };

            return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_Ingresolicencia_Subcomision_Listar", parametros, ConstructorSubcomision);
        }

        public static List<CargaExcelRRLLEntity> ListarSubcomisionRRLLCompin(string token, string fecha_desde, string fecha_hasta)
        {
            Parametros parametros = new Parametros
            {

               new Parametro("@token",token),
               new Parametro("@fecha_desde",fecha_desde),
               new Parametro("@fecha_hasta",fecha_hasta)

            };

            return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_Ingresolicencia_Subcomision_Listar_Compin", parametros, ConstructorSubcomision);
        }

        public static List<CargaExcelRRLLEntity> ListarSubcomisionRRLLDevueltas(string token)
        {
            Parametros parametros = new Parametros
            {

               new Parametro("@token",token)

            };

            return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_Ingresolicencia_Subcomision_Listar_Devueltas", parametros, ConstructorSubcomision);
        }

        public static long ListadevueltasCompinConteo(int CodOficina, string responsable)
        {
            Parametros parametros = new Parametros
            {
               new Parametro("@CodOficina",CodOficina),
                new Parametro("@responsable",responsable)
            };

            return DBHelper.InstanceCRM.ObtenerEscalar<long>("licencias.sp_Lic_Ingresolicencia_ListarDevueltasCompin_Conteo", parametros);
        }


        public static long ListaAuditoriaOficinaConteo(int CodOficina)
        {
            Parametros parametros = new Parametros
            {
               new Parametro("@CodOficina",CodOficina),
            };

            try
            {
                return DBHelper.InstanceCRM.ObtenerEscalar<long>("licencias.sp_Lic_Ingresolicencia_ListarLMAuditoria_RRLL_Conteo", parametros);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        public static long IngresadasGestionOficinaConteo(int CodOficina)
        {
            Parametros parametros = new Parametros
            {
               new Parametro("@CodOficina",CodOficina),
            };

            return DBHelper.InstanceCRM.ObtenerEscalar<long>("licencias.sp_Lic_Ingresolicencia_ListarDevueltasOficinas_Conteo", parametros);
        }

        public static long ListaDereivadaOficinaConteo(int CodOficina)
        {
            Parametros parametros = new Parametros
            {
               new Parametro("@CodOficina",CodOficina),
            };

            return DBHelper.InstanceCRM.ObtenerEscalar<long>("licencias.sp_Lic_Ingresolicencia_ListarLMderivada_Conteo", parametros);
        }


        public static long GuardaAuditoria(Ingresolicencia auditoria, string token)
        {
            Parametros parametros = new Parametros
            {
                new Parametro("@CodIngreso",auditoria.CodIngreso),
                new Parametro("@estadoRevision",auditoria.EstadoRevision),
                new Parametro("@lmIncompleta",auditoria.LmIncompleta),
                new Parametro("@lmnolegible",auditoria.Lmnolegible),
                new Parametro("@lmsindiagnostico",auditoria.Lmsindiagnostico),
                new Parametro("@lmsoncarta",auditoria.Lmsoncarta),
                new Parametro("@observacion",auditoria.Observacion),
                new Parametro("@rutAuditor",auditoria.RutAuditor),
                new Parametro("@Token",token),
                new Parametro("@Folionovalido",auditoria.Folionovalido),
                new Parametro("@Otromotivo",auditoria.Otromotivo)

        };
            try
            {
                return DBHelper.InstanceCRM.ObtenerEscalar<long>("licencias.sp_Lic_RRLL_Gestion_Devueltas", parametros);
            }
            catch (Exception ex)
            {

                throw;
            }

        }


        /// <summary>
        /// Guarda la entidad de dominio <see cref="Ingresolicencia"/> en la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>28-09-2017 16:35:13</created>
        /// <param name="ingresolicencia">Referencia a una clase <see cref="Ingresolicencia"/>.</param>
        /// <returns>Clave primaria resultante de la operación</returns>
        public static long Eliminar(int CodIngreso, string Token)
        {
            Parametros parametros = new Parametros
            {
                new Parametro("@Token", Token),
                new Parametro("@CodIngreso", CodIngreso)
            };

            return DBHelper.InstanceCRM.ObtenerEscalar<long>("licencias.sp_Lic_Ingresolicencia_Eliminar_ingresada", parametros);
        }


        public static long ValidaTabRRLL(string Token)
        {
            Parametros parametros = new Parametros
            {
                new Parametro("@Token", Token),

            };

            return DBHelper.InstanceCRM.ObtenerEscalar<long>("licencias.sp_Lic_Valida_Tab_RRLL", parametros);
        }


        public static long EliminarTablaTempEXCEL()
        {


            return DBHelper.InstanceCRM.EjecutarSql("delete from licencias.TabLic_Temp_CargaRRLL");
        }


        public static long EliminarTablaTempEXCELCompin()
        {


            return DBHelper.InstanceCRM.EjecutarSql("delete from licencias.TabLic_Temp_CargaRRLL_Compin");
        }



        public static long insertarLog(string error)
        {
            string sql = @"INSERT INTO [licencias].[Log] (observacion) VALUES ('" + error.Replace("'", "") + "')";
            try
            {
                return DBHelper.InstanceCRM.EjecutarSql(sql);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// Recupera una entidad <see cref="Ingresolicencia"/> de la Base de Datos dado un ID de Ingresolicencia
        /// </summary>
        /// <author>@Charly</author>
        /// <created>28-09-2017 16:35:13</created>
        /// <param name="CodIngreso">ID de Ingresolicencia.</param>
        /// <returns>Referencia a una clase <see cref="Ingresolicencia"/>.</returns>
        public static Ingresolicencia ObtenerPorID(long CodIngreso)
        {
            Parametro parametro = new Parametro("@CodIngreso", CodIngreso);

            return DBHelper.InstanceCRM.ObtenerEntidad("licencias.sp_Lic_Ingresolicencia_ObtenerPorID", parametro, ConstructorEntidad);

        }


        public static List<AuditoriaLicenciasEntity> ListaLMDerivadas(string folioLic, string diadesde, string diahasta, int codOficina)
        {
            Parametros parametros = new Parametros
            {
                new Parametro("@folio_LM", folioLic),
                new Parametro("@CodOficina", codOficina),
                new Parametro("@DiaDesde", diadesde),
                new Parametro("@DiaHasta", diahasta)

            };

            return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_Ingresolicencia_ListarLMderivada", parametros, ConstructorDerivadasLM);



        }

        public static List<LicenciasDevueltas> ListaLMdevueltasTaTa(string folio, DateTime diadesde, DateTime diahasta, int codOficina)
        {
            Parametros parametros = new Parametros
            {

                new Parametro("@folio_LM", folio),
                new Parametro("@CodOficina", codOficina),
                new Parametro("@DiaDesde", diadesde),
                new Parametro("@DiaHasta", diahasta),

          };
            try
            {
                return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_Ingresolicencia_ListarDevueltasTATA", parametros, ConstructorLicenciasDevueltas);

            }
            catch (Exception ex)
            {

                throw ex;
            }


        }


        public static long ListaLMConsolidadodevueltasCompinConteo()
        {
            Parametros parametros = new Parametros
            {

            };

            return DBHelper.InstanceCRM.ObtenerEscalar<long>("licencias.sp_Lic_Ingresolicencia_Listar_Reproceso_DevueltasCompin_conteo", parametros);
        }

        public static List<LicenciasDevueltas> ListaLMConsolidadodevueltasCompin(string folio, DateTime diadesde, DateTime diahasta, string responsable, int codOficina, string subcomision)
        {
            Parametros parametros = new Parametros
            {

                new Parametro("@folio_LM", folio),
                //new Parametro("@CodOficina", codOficina),
                new Parametro("@DiaDesde", diadesde),
                new Parametro("@DiaHasta", diahasta),
                new Parametro("@responsable", responsable),
                new Parametro("@Oficina",codOficina),
                new Parametro("@subcomision",subcomision)
          };
            try
            {
                return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_Ingresolicencia_Listar_reproceso_DevueltasCompin_Filtro", parametros, ConstructorLicenciasConsolidadoDevueltasCompin);

            }
            catch (Exception ex)
            {

                throw ex;
            }


        }







        public static List<LicenciasDevueltas> ListaLMdevueltasCompin(string folio, DateTime diadesde, DateTime diahasta, int codOficina, string responsable)
        {
            Parametros parametros = new Parametros
            {

                new Parametro("@folio_LM", folio),
                new Parametro("@CodOficina", codOficina),
                new Parametro("@DiaDesde", diadesde),
                new Parametro("@DiaHasta", diahasta),
                new Parametro("@responsable", responsable)

          };
            try
            {
                return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_Ingresolicencia_ListarDevueltasCompin", parametros, ConstructorLicenciasDevueltasCompin);

            }
            catch (Exception ex)
            {

                throw ex;
            }


        }





        public static List<LicenciasDevueltas> ListaLMdevueltasCompinRRLL(string folio, DateTime diadesde, DateTime diahasta, int codOficina, string responsable, string subcomision)
        {
            Parametros parametros = new Parametros
            {

                new Parametro("@folio_LM", folio),
                new Parametro("@CodOficina", codOficina),
                new Parametro("@DiaDesde", diadesde),
                new Parametro("@DiaHasta", diahasta),
                new Parametro("@responsable", responsable),
                new Parametro("@subcomision", subcomision)

          };
            try
            {
                return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_Ingresolicencia_ListarDevueltasCompin_RRLL", parametros, ConstructorLicenciasDevueltasCompinRRLL);

            }
            catch (Exception ex)
            {

                throw ex;
            }


        }

        public static DataTable ListaLMresponsableExcel(string folio, string diadesde, string diahasta, int codOficina, string responsable, string fechaenviodesde, string fechaenviohasta)
        {
            Parametros parametros = new Parametros
            {


                new Parametro("@folio_LM", folio),
                new Parametro("@CodOficina", codOficina),
                new Parametro("@DiaDesde", diadesde),
                new Parametro("@DiaHasta", diahasta),
                new Parametro("@estadoEnviado", responsable),
                new Parametro("@fechaenviodesde",fechaenviodesde),
                new Parametro("@fechaenviohasta",fechaenviohasta)

            };

            // return DBHelper.InstanceCRM.ObtenerDataTable("licencias.sp_Lic_Ingresolicencia_ListarCierreResponsable_filtros", parametros);
            return DBHelper.InstanceCRM.ObtenerDataTable("licencias.sp_Lic_Ingresolicencia_ListarCierreResponsable_Nuevo_Flujo", parametros);

        }


        public static DataTable ListaLMresponsableExcelCargaCompin()
        {
            Parametros parametros = new Parametros
            {

                new Parametro("@folio_LM", ""),
                new Parametro("@estado", "")


            };
            try
            {
                return DBHelper.InstanceCRM.ObtenerDataTable("licencias.sp_Lic_temp_RRLL_Excel_Compin", parametros);

            }
            catch (Exception ex)
            {

                throw ex;
            }


        }


        public static DataTable ListaLMresponsableExcelCarga()
        {
            Parametros parametros = new Parametros
            {

                new Parametro("@folio_LM", ""),
                new Parametro("@estado", "")

            };

            return DBHelper.InstanceCRM.ObtenerDataTable("licencias.sp_Lic_temp_RRLL_Excel_Export", parametros);


        }

        public static List<CargaExcelRRLLEntity> ListaLMExcelRRLL(string folio, string estado)
        {
            Parametros parametros = new Parametros
            {

                new Parametro("@folio_LM", folio),
                new Parametro("@estado", estado)


            };
            try
            {
                return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_temp_RRLL_Excel", parametros, ConstructorCargaExcelRRLL);

            }
            catch (Exception ex)
            {

                throw ex;
            }


        }






        public static List<CargaExcelRRLLEntity> ListaLMExcelRRLLCompin(string folio, string estado)
        {
            Parametros parametros = new Parametros
            {

                new Parametro("@folio_LM", folio),
                new Parametro("@estado", estado)


            };
            try
            {
                return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_temp_RRLL_Excel_Compin", parametros, ConstructorCargaExcelRRLLCompin);

            }
            catch (Exception ex)
            {

                throw ex;
            }


        }

        public static List<Ingresolicencia> ListaLMresponsableCierre(string folio, DateTime diadesde, DateTime diahasta, int codOficina, string responsable, string fechaenviodesde, string fechaenviohasta)
        {
            Parametros parametros = new Parametros
            {

                new Parametro("@folio_LM", folio),
                new Parametro("@CodOficina", codOficina),
                new Parametro("@DiaDesde", diadesde),
                new Parametro("@DiaHasta", diahasta),
                new Parametro("@estadoEnviado", responsable),
                new Parametro("@fechaenviodesde",fechaenviodesde),
                new Parametro("@fechaenviohasta",fechaenviohasta)

            };
            try
            {
                return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_Ingresolicencia_ListarCierreResponsable_Nuevo_Flujo", parametros, ConstructorResponsableCierreLM);

            }
            catch (Exception ex)
            {

                throw;
            }


        }

        public static List<Oficinas> ListarOficinas()
        {

            try
            {
                return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_listar_Oficinas", ConstructorOficina);

            }
            catch (Exception ex)
            {

                throw;
            }


        }



        public static List<Ingresolicencia> ListaLMresponsableCierrexb(string folio, DateTime diadesde, DateTime diahasta, int codOficina, string responsable, string fechaenviodesde, string fechaenviohasta)
        {
            Parametros parametros = new Parametros
            {

                new Parametro("@folio_LM", folio),
                new Parametro("@CodOficina", codOficina),
                new Parametro("@DiaDesde", diadesde),
                new Parametro("@DiaHasta", diahasta),
                new Parametro("@estadoEnviado", responsable),
                new Parametro("@fechaenviodesde",fechaenviodesde),
                new Parametro("@fechaenviohasta",fechaenviohasta)

            };
            try
            {
                return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_Ingresolicencia_ListarCierreResponsable_Nuevo_Flujo", parametros, ConstructorResponsableCierreLM);

            }
            catch (Exception ex)
            {

                throw;
            }


        }

        public static AuditoriaLicenciasEntity ObtenerAuditoriaBycodIngreso(long CodIngreso)
        {
            Parametro parametro = new Parametro("@CodIngreso", CodIngreso);
            {
                return DBHelper.InstanceCRM.ObtenerEntidad("licencias.sp_Lic_Auditoria_Obtener", parametro, ConstructorEntidadAuditoria);


            }

        }
        /// <summary>
        /// Lista todas las entidades <see cref="Ingresolicencia"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>28-09-2017 16:35:13</created>
        /// <returns><see cref="DataTable"/> con todos los objetos.</returns>
        public static DataTable Listar()
        {
            return DBHelper.InstanceCRM.ObtenerDataTable("licencias.sp_Lic_Ingresolicencia_Listar");
        }

        /// <summary>
        /// Recupera todas las entidades <see cref="Ingresolicencia"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>28-09-2017 16:35:13</created>
        /// <returns>Lista con todas las entidades <see cref="Ingresolicencia"/>.</returns>
        public static List<Ingresolicencia> ObtenerEntidades()
        {
            return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_Ingresolicencia_Listar", ConstructorEntidad);
        }


        /// <summary>
        /// Recupera todas las entidades <see cref="Ingresolicencia"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>28-09-2017 16:35:13</created>
        /// <returns>Lista con todas las entidades <see cref="Ingresolicencia"/>.</returns>
        public static List<Ingresolicencia> ObtenerEntidadesByOficina(int CodOficina, DateTime Dia)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@CodOficina", CodOficina),
                new Parametro("@Dia", Dia),
            };


            return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_Ingresolicencia_ListarByOficina", parametros, ConstructorEntidad);


        }



        public static List<Ingresolicencia> ListaLicenciaManualPresencial(DateTime diadesde, DateTime diahasta, string formatoLM, int codOficina)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@CodOficina", codOficina),
                new Parametro("@Diadesde", diadesde),
                new Parametro("@Diahasta", diahasta),
                new Parametro("@formatoLM", formatoLM)
            };

            try
            {
                return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_Ingresolicencia_Manual_Presencial", parametros, ConstructorEntidadManualPresencial);

            }
            catch (Exception ex)
            {

                throw ex;
            }


        }


        public static DataTable ListaLmDocumentoPendientePf(string Folio, int codOficina, string Tipo_LM, string Tipo_Convenio, string TipoReporte)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@CodOficina", codOficina),
                new Parametro("@FolioLM", Folio),
                new Parametro("@tipoLM", Tipo_LM),
                new Parametro("@tipoCovenio", Tipo_Convenio),
                 new Parametro("@tipoReporte", TipoReporte)
            };
            return DBHelper.InstanceCRM.ObtenerDataTable("licencias.sp_Lic_Ingresolicencia_LM_Documentos_Pendientes", parametros);
        }


        public static List<Ingresolicencia> ListaLmDocumentoPendiente(string Folio, int codOficina, string Tipo_LM, string Tipo_Convenio, string TipoReporte)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@CodOficina", codOficina),
                new Parametro("@FolioLM", Folio),
                new Parametro("@tipoLM", Tipo_LM),
                new Parametro("@tipoCovenio", Tipo_Convenio),
                new Parametro("@tipoReporte", TipoReporte),
            };

            try
            {
                return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_Ingresolicencia_LM_Documentos_Pendientes", parametros, ContructorLMDocumentoPendiente);

            }
            catch (Exception ex)
            {

                throw ex;
            }


        }





        public static List<Ingresolicencia> ListaLMPronunciadaNoAs400(string Folio, int codOficina, string Tipo_LM, string Tipo_Convenio, string Tipo_Reporte)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@CodOficina", codOficina),
                new Parametro("@FolioLM", Folio),
                new Parametro("@tipoLM", Tipo_LM),
                new Parametro("@tipoCovenio", Tipo_Convenio),
                new Parametro("@tipoReporte", Tipo_Reporte)
            };

            try
            {
                return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_Ingresolicencia_LM_Pronunciadas_No_Procesadas_AS400", parametros, ContructorLMPronunciadasNoAs400);

            }
            catch (Exception ex)
            {

                throw ex;
            }


        }


        public static DataTable ListaLMPronunciadaNoAs400Pdf(string Folio, int codOficina, string Tipo_LM, string Tipo_Convenio, string TipoReporte)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@CodOficina", codOficina),
                new Parametro("@FolioLM", Folio),
                new Parametro("@tipoLM", Tipo_LM),
                new Parametro("@tipoCovenio", Tipo_Convenio),
                 new Parametro("@tipoReporte", TipoReporte)
            };
            return DBHelper.InstanceCRM.ObtenerDataTable("licencias.sp_Lic_Ingresolicencia_LM_Pronunciadas_No_Procesadas_AS400", parametros);
        }


        public static DataTable ReportependientecobroPdf(string Folio, int codOficina, string Tipo_LM, string Tipo_Convenio, string TipoReporte)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@CodOficina", codOficina),
                new Parametro("@FolioLM", Folio),
                new Parametro("@tipoLM", Tipo_LM),
                new Parametro("@tipoCovenio", Tipo_Convenio),
                 new Parametro("@tipoReporte", TipoReporte)
            };
            try
            {
                return DBHelper.InstanceCRM.ObtenerDataTable("licencias.sp_Lic_Ingresolicencia_LM_Pendiente_Cobro", parametros);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }




        public static List<Ingresolicencia> ListaLMPendienteCobro(string Folio, int codOficina, string tipoLM, string tipoCovenio, string tipoReporte)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@CodOficina", codOficina),
                new Parametro("@FolioLM", Folio),
                new Parametro("@tipoLM", tipoLM),
                new Parametro("@tipoCovenio", tipoCovenio),
                new Parametro("@tipoReporte", tipoReporte),

            };

            try
            {
                return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_Ingresolicencia_LM_Pendiente_Cobro", parametros, ContructorLMPendienteCobro);

            }
            catch (Exception ex)
            {

                throw ex;
            }


        }



        public static DataTable ListaLMPendienteConvenioPdf(int codOficina, string Empresa, string tipo)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@CodOficina", codOficina),
                new Parametro("@Empresa", Empresa),
                new Parametro("@tipo", tipo)
            };
            return DBHelper.InstanceCRM.ObtenerDataTable("licencias.sp_Lic_Reporte_Pendiente_Convenio", parametros);
        }


        public static DataTable ListaLMPendienteConvenioPdfDatosExtra(int codOficina, string Empresa)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@CodOficina", codOficina),
                new Parametro("@Empresa", Empresa),

            };
            return DBHelper.InstanceCRM.ObtenerDataTable("licencias.sp_Lic_Reporte_Pendiente_Convenio_DatosExtra", parametros);
        }


        public static List<Ingresolicencia> ListaLMPendienteConvenio(int codOficina, string Empresa, string tipo)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@CodOficina", codOficina),
                new Parametro("@Empresa", Empresa),
                new Parametro("@tipo", tipo)

            };

            try
            {
                return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_Reporte_Pendiente_Convenio", parametros, ContructorLMPendienteConvenio);

            }
            catch (Exception ex)
            {

                throw ex;
            }


        }


        public static List<Ingresolicencia> ListaLMPendienteConvenioEmpresa(int codOficina)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@CodOficina", codOficina)

            };

            try
            {
                return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_Reporte_Pendiente_Convenio_Empresas", parametros, ContructorLMPendienteConvenioEmpresa);

            }
            catch (Exception ex)
            {

                throw ex;
            }


        }




        public static List<Ingresolicencia> ObtenerEntidadesByOficinaFiltro(string responsable, string estado, string folio, DateTime diadesde, DateTime diahasta, string formatoLM, int codOficina)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@CodOficina", codOficina),
                new Parametro("@Diadesde", diadesde),
                new Parametro("@Diahasta", diahasta),
                new Parametro("@formatoLM", formatoLM),
                new Parametro("@responsable", responsable),
                new Parametro("@folioLM", folio),
                new Parametro("@p_estado", estado)
            };

            try
            {
                return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_Ingresolicencia_ListarByOficina_Filtros_FlasgAs400", parametros, ConstructorEntidad);

            }
            catch (Exception ex)
            {

                throw ex;
            }


        }




        public static Ingresolicencia ObtenerEncabezado(int CodOficina, DateTime Dia)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@CodOficina", CodOficina),
                new Parametro("@Dia", Dia),
            };
            return DBHelper.InstanceCRM.ObtenerEntidad("licencias.sp_Lic_Ingresolicencia_ListarResumenEncabezado_As400", parametros, EntidadEncabezado);
        }



        /// <summary>
        /// Recupera todas las entidades <see cref="Ingresolicencia"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>28-09-2017 16:35:13</created>
        /// <returns>Lista con todas las entidades <see cref="Ingresolicencia"/>.</returns>
        public static DataTable ObtenerEntidadesByOficinaXLS(int CodOficina, DateTime Dia)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@CodOficina", CodOficina),
                new Parametro("@Dia", Dia),
            };
            return DBHelper.InstanceCRM.ObtenerDataTable("licencias.sp_Lic_Ingresolicencia_OficinaXLS", parametros);
        }

        public static DataTable ObtenerEntidadesByOficinaPdf(int CodOficina, DateTime Dia)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@CodOficina", CodOficina),
                new Parametro("@Dia", Dia),
            };
            return DBHelper.InstanceCRM.ObtenerDataTable("licencias.sp_Lic_Ingresolicencia_OficinaPDF_nuevo", parametros);
        }


        public static DataTable ObtenerEntidadesByOficinaPdf_Mixta(int CodOficina, DateTime Dia)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@CodOficina", CodOficina),
                new Parametro("@Dia", Dia),
            };
            return DBHelper.InstanceCRM.ObtenerDataTable("licencias.sp_Lic_Ingresolicencia_Oficina_MixtaPDF", parametros);
        }

        public static DataTable ObtenerEntidadesByOficinaPdf_Mixta_filtro(string responsable, string estado, string folio, string diadesde, string diahasta, string formatoLM, int codOficina)
        {
            Parametros parametros = new Parametros()
            {
                 new Parametro("@CodOficina", codOficina),
                new Parametro("@Diadesde", diadesde),
                new Parametro("@Diahasta", diahasta),
                new Parametro("@formatoLM", formatoLM),
                new Parametro("@responsable", responsable),
                new Parametro("@folioLM", folio),
                new Parametro("@p_estado", estado)
            };
            return DBHelper.InstanceCRM.ObtenerDataTable("licencias.sp_Lic_Ingresolicencia_Oficina_MixtaPDF_filtros", parametros);
        }

        public static DataTable ObtenerEntidadesByOficinaPdf_Manual_filtro(string responsable, string estado, string folio, string diadesde, string diahasta, string formatoLM, int codOficina)
        {
            Parametros parametros = new Parametros()
            {
                 new Parametro("@CodOficina", codOficina),
                new Parametro("@Diadesde", diadesde),
                new Parametro("@Diahasta", diahasta),
                new Parametro("@formatoLM", formatoLM),
                new Parametro("@responsable", responsable),
                new Parametro("@folioLM", folio),
                new Parametro("@p_estado", estado)
            };
            return DBHelper.InstanceCRM.ObtenerDataTable("licencias.sp_Lic_Ingresolicencia_Oficina_ManualPDF_As400", parametros);
        }

        #endregion

        #region metodos adicionales
        #endregion

        #region constructor
        private static Ingresolicencia ConstructorEntidadManualPresencial(DataRow row)
        {
            return new Ingresolicencia
            {
                CodIngreso = row["CodIngreso"] != DBNull.Value ? Convert.ToInt64(row["CodIngreso"]) : 0,
                RutAfiliado = row["RutAfiliado"] != DBNull.Value ? row["RutAfiliado"].ToString() : string.Empty,
                NombreAfiliado = row["NombreAfiliado"] != DBNull.Value ? row["NombreAfiliado"].ToString() : string.Empty,
                FolioLicencia = row["FolioLicencia"] != DBNull.Value ? row["FolioLicencia"].ToString() : string.Empty,
                OficinaDescripcion = row["OficinaDescripcion"] != DBNull.Value ? row["OficinaDescripcion"].ToString() : string.Empty,
                RutEjecutivo = row["RutEjecutivo"] != DBNull.Value ? row["RutEjecutivo"].ToString() : string.Empty,
                CodEstado = row["CodEstado"] != DBNull.Value ? Convert.ToInt32(row["CodEstado"]) : 0,
                FechaIngreso = row["FechaIngreso"] != DBNull.Value ? Convert.ToDateTime(row["FechaIngreso"]) : new DateTime(1900, 1, 1),
                FormatoLM = row["FormatoLM"] != DBNull.Value ? row["FormatoLM"].ToString() : string.Empty,
                FlagLM = row["FlagLM"] != DBNull.Value ? row["FlagLM"].ToString() : string.Empty,
                OficinaDerivacion = row["OficinaDerivada"] != DBNull.Value ? Convert.ToInt32(row["OficinaDerivada"]) : 0,
                email = row["email"] != DBNull.Value ? row["email"].ToString() : string.Empty,
                telefono = row["telefono"] != DBNull.Value ? row["telefono"].ToString() : string.Empty,
                viaIngresoLicenica = row["viaIngresoLicenica"] != DBNull.Value ? Convert.ToInt32(row["viaIngresoLicenica"]) : 0,
                quienEnvia = row["quienEnvia"] != DBNull.Value ? Convert.ToInt32(row["quienEnvia"]) : 0,
                EtapaActual = row["EtapaActual"] != DBNull.Value ? row["EtapaActual"].ToString() : string.Empty,
                esBanner = row["esBanner"] != DBNull.Value ? Convert.ToInt32(row["esBanner"]) : 0,
                DescripcionEstadoRevision = row["EstadoRevision"] != DBNull.Value ? row["EstadoRevision"].ToString() : string.Empty,
                Responsable = row["Responsable"] != DBNull.Value ? row["Responsable"].ToString() : string.Empty,
                EstadoCarga = row["EstadoCarga"] != DBNull.Value ? row["EstadoCarga"].ToString() : string.Empty,
                compincentralizado = row["compincentralizado"] != DBNull.Value ? row["compincentralizado"].ToString() : string.Empty,
                Subcomision = row["Subcomision"] != DBNull.Value ? row["Subcomision"].ToString() : string.Empty,
                Subido_a_plataforma_compin = row["subido_a_plataforma_compin"] != DBNull.Value ? Convert.ToDateTime(row["subido_a_plataforma_compin"]) : new DateTime(1900, 1, 1),
                FolioCompin = row["folioCompin"] != DBNull.Value ? row["folioCompin"].ToString() : string.Empty,
                Flagas400 = row["flagas400"] != DBNull.Value ? Convert.ToInt32(row["flagas400"]) : 0,
                DiasLicencia = row["diasLicencia"] != DBNull.Value ? Convert.ToInt32(row["diasLicencia"]) : 0,
                FechaLicenciaDesde = row["licenciadesde"] != DBNull.Value ? Convert.ToDateTime(row["licenciadesde"]) : new DateTime(1900, 1, 1),
                FechaLicenciaHasta = row["licenciahasta"] != DBNull.Value ? Convert.ToDateTime(row["licenciahasta"]) : new DateTime(1900, 1, 1),
            };
        }


        private static Ingresolicencia ConstructorEntidad(DataRow row)
        {
            try
            {


                return new Ingresolicencia
                {
                    CodIngreso = row["CodIngreso"] != DBNull.Value ? Convert.ToInt64(row["CodIngreso"]) : 0,
                    RutAfiliado = row["RutAfiliado"] != DBNull.Value ? row["RutAfiliado"].ToString() : string.Empty,
                    NombreAfiliado = row["NombreAfiliado"] != DBNull.Value ? row["NombreAfiliado"].ToString() : string.Empty,
                    FolioLicencia = row["FolioLicencia"] != DBNull.Value ? row["FolioLicencia"].ToString() : string.Empty,
                    Oficina = row["Oficina"] != DBNull.Value ? Convert.ToInt32(row["Oficina"]) : 0,
                    RutEjecutivo = row["RutEjecutivo"] != DBNull.Value ? row["RutEjecutivo"].ToString() : string.Empty,
                    CodEstado = row["CodEstado"] != DBNull.Value ? Convert.ToInt32(row["CodEstado"]) : 0,
                    FechaIngreso = row["FechaIngreso"] != DBNull.Value ? Convert.ToDateTime(row["FechaIngreso"]) : new DateTime(1900, 1, 1),
                    FormatoLM = row["FormatoLM"] != DBNull.Value ? row["FormatoLM"].ToString() : string.Empty,
                    FlagLM = row["FlagEstado"] != DBNull.Value ? row["FlagEstado"].ToString() : string.Empty,
                    OficinaDerivacion = row["OficinaDerivada"] != DBNull.Value ? Convert.ToInt32(row["OficinaDerivada"]) : 0,
                    email = row["email"] != DBNull.Value ? row["email"].ToString() : string.Empty,
                    telefono = row["telefono"] != DBNull.Value ? row["telefono"].ToString() : string.Empty,
                    viaIngresoLicenica = row["viaIngresoLicenica"] != DBNull.Value ? Convert.ToInt32(row["viaIngresoLicenica"]) : 0,
                    quienEnvia = row["quienEnvia"] != DBNull.Value ? Convert.ToInt32(row["quienEnvia"]) : 0,
                    EtapaActual = row["EtapaActual"] != DBNull.Value ? row["EtapaActual"].ToString() : string.Empty,
                    esBanner = row["esBanner"] != DBNull.Value ? Convert.ToInt32(row["esBanner"]) : 0,
                    DescripcionEstadoRevision = row["EstadoRevision"] != DBNull.Value ? row["EstadoRevision"].ToString() : string.Empty,
                    Responsable = row["Responsable"] != DBNull.Value ? row["Responsable"].ToString() : string.Empty,
                    EstadoCarga = row["EstadoCarga"] != DBNull.Value ? row["EstadoCarga"].ToString() : string.Empty,
                    compincentralizado = row["compincentralizado"] != DBNull.Value ? row["compincentralizado"].ToString() : string.Empty,
                    Subcomision = row["Subcomision"] != DBNull.Value ? row["Subcomision"].ToString() : string.Empty,
                    Subido_a_plataforma_compin = row["subido_a_plataforma_compin"] != DBNull.Value ? Convert.ToDateTime(row["subido_a_plataforma_compin"]) : new DateTime(1900, 1, 1),
                    FolioCompin = row["folioCompin"] != DBNull.Value ? row["folioCompin"].ToString() : string.Empty,
                    Flagas400 = row["flagas400"] != DBNull.Value ? Convert.ToInt32(row["flagas400"]) : 0

                };
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        private static Ingresolicencia ContructorLMDocumentoPendiente(DataRow row)
        {
            try
            {


                return new Ingresolicencia
                {
                    CodIngreso = row["CodIngreso"] != DBNull.Value ? Convert.ToInt64(row["CodIngreso"]) : 0,
                    RutAfiliado = row["RutAfiliado"] != DBNull.Value ? row["RutAfiliado"].ToString() : string.Empty,
                    NombreAfiliado = row["NombreAfiliado"] != DBNull.Value ? row["NombreAfiliado"].ToString() : string.Empty,
                    FolioLicencia = row["FolioLicencia"] != DBNull.Value ? row["FolioLicencia"].ToString() : string.Empty,
                    TipoLicencia = row["TipoLicencia"] != DBNull.Value ? row["TipoLicencia"].ToString() : string.Empty,
                    TipoConvenio = row["TipoConvenio"] != DBNull.Value ? row["TipoConvenio"].ToString() : string.Empty,
                    FechaGestion = row["fechAct"] != DBNull.Value ? Convert.ToDateTime(row["fechAct"]) : new DateTime(1900, 1, 1),
                    FechaIngreso = row["mespreescribe"] != DBNull.Value ? Convert.ToDateTime(row["mespreescribe"]) : new DateTime(1900, 1, 1),
                    FechaPrescribeString = row["mespreescribeString"] != DBNull.Value ? row["mespreescribeString"].ToString() : string.Empty,
                    TipoSubLicencia = row["tiposublicencia"] != DBNull.Value ? row["tiposublicencia"].ToString() : string.Empty,
                    NombreEmpresa = row["nombreempresa"] != DBNull.Value ? row["nombreempresa"].ToString() : string.Empty,
                    RutEmpresa = row["RutEmpresa"] != DBNull.Value ? row["RutEmpresa"].ToString() : string.Empty,
                    Observacion = row["Observacion"] != DBNull.Value ? row["Observacion"].ToString() : string.Empty,
                    AnexoEstamento = row["AnexoEstamento"] != DBNull.Value ? row["AnexoEstamento"].ToString() : string.Empty,
                };

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


        private static Ingresolicencia ContructorLMPronunciadasNoAs400(DataRow row)
        {
            try
            {


                return new Ingresolicencia
                {
                    CodIngreso = row["CodIngreso"] != DBNull.Value ? Convert.ToInt64(row["CodIngreso"]) : 0,
                    RutAfiliado = row["RutAfiliado"] != DBNull.Value ? row["RutAfiliado"].ToString() : string.Empty,
                    NombreAfiliado = row["NombreAfiliado"] != DBNull.Value ? row["NombreAfiliado"].ToString() : string.Empty,
                    FolioLicencia = row["FolioLicencia"] != DBNull.Value ? row["FolioLicencia"].ToString() : string.Empty,
                    TipoSubLicencia = row["TipoLM"] != DBNull.Value ? row["TipoLM"].ToString() : string.Empty,
                    FechaIngreso = row["fecresol"] != DBNull.Value ? Convert.ToDateTime(row["fecresol"]) : new DateTime(1900, 1, 1),
                    FechaGestion = row["fechaact"] != DBNull.Value ? Convert.ToDateTime(row["fechaact"]) : new DateTime(1900, 1, 1),

                };
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


        private static Ingresolicencia ContructorLMPendienteCobro(DataRow row)
        {
            try
            {


                return new Ingresolicencia
                {
                    CodIngreso = row["CodIngreso"] != DBNull.Value ? Convert.ToInt64(row["CodIngreso"]) : 0,
                    RutAfiliado = row["RutAfiliado"] != DBNull.Value ? row["RutAfiliado"].ToString() : string.Empty,
                    NombreAfiliado = row["NombreAfiliado"] != DBNull.Value ? row["NombreAfiliado"].ToString() : string.Empty,
                    FolioLicencia = row["folioreal"] != DBNull.Value ? row["folioreal"].ToString() : string.Empty,
                    TipoSubLicencia = row["tip_sub"] != DBNull.Value ? row["tip_sub"].ToString() : string.Empty,
                    TipoConvenio = row["tip_com"] != DBNull.Value ? row["tip_com"].ToString() : string.Empty,
                    TipoLicencia = row["lmm"] != DBNull.Value ? row["lmm"].ToString() : string.Empty,
                    FechaGestion = row["fechapagodisponibledesde"] != DBNull.Value ? Convert.ToDateTime(row["fechapagodisponibledesde"]) : new DateTime(1900, 1, 1),
                    FechaPrescribeString = row["PagodesdeString"] != DBNull.Value ? row["PagodesdeString"].ToString() : string.Empty,
                    RutEmpresa = row["rutEmpresa"] != DBNull.Value ? row["rutEmpresa"].ToString() : string.Empty,
                    NombreEmpresa = row["raz_soc"] != DBNull.Value ? row["raz_soc"].ToString() : string.Empty,

                };
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        private static Ingresolicencia ContructorLMPendienteConvenio(DataRow row)
        {
            try
            {

                return new Ingresolicencia
                {
                    RutEmpresa = row["RutEmpresa"] != DBNull.Value ? row["RutEmpresa"].ToString() : string.Empty,
                    NombreEmpresa = row["NombreEmpresa"] != DBNull.Value ? row["NombreEmpresa"].ToString() : string.Empty,
                    RutAfiliado = row["RutAfiliado"] != DBNull.Value ? row["RutAfiliado"].ToString() : string.Empty,
                    NombreAfiliado = row["NombreAfiliado"] != DBNull.Value ? row["NombreAfiliado"].ToString() : string.Empty,
                    FolioLicencia = row["folioreal"] != DBNull.Value ? row["folioreal"].ToString() : string.Empty,
                    TipoLicencia = row["TipoLicencia"] != DBNull.Value ? row["TipoLicencia"].ToString() : string.Empty,
                    TipoSubLicencia = row["tiposublicencia"] != DBNull.Value ? row["tiposublicencia"].ToString() : string.Empty,
                    DiasLicencia = row["DiasLicencia"] != DBNull.Value ? Convert.ToInt32(row["DiasLicencia"]) : 0,
                    FechaPrescribeString = row["fechaResolucionCompin"] != DBNull.Value ? row["fechaResolucionCompin"].ToString() : string.Empty,
                    estadoLicencia = row["Estado"] != DBNull.Value ? row["Estado"].ToString() : string.Empty,
                    Observacion = row["Motivo"] != DBNull.Value ? row["Motivo"].ToString() : string.Empty,
                    Subcomision = row["sucursal"] != DBNull.Value ? row["sucursal"].ToString() : string.Empty,
                    FechaActulizacionString = row["sucursal"] != DBNull.Value ? row["sucursal"].ToString() : string.Empty

                };
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


        private static Ingresolicencia ContructorLMPendienteConvenioEmpresa(DataRow row)
        {
            try
            {

                return new Ingresolicencia
                {
                    RutEmpresa = row["RutEmpresa"] != DBNull.Value ? row["RutEmpresa"].ToString() : string.Empty,
                    NombreEmpresa = row["NombreEmpresa"] != DBNull.Value ? row["NombreEmpresa"].ToString() : string.Empty,

                };
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        private static Ingresolicencia EntidadEncabezado(DataRow row)
        {
            return new Ingresolicencia
            {
                //Lm_Total = row["FolioMotor"] != DBNull.Value ? Convert.ToInt32(row["FolioMotor"]) : 0,
                Lm_Verde = row["As400"] != DBNull.Value ? Convert.ToInt32(row["As400"]) : 0,
                //Lm_Amarillo = row["2"] != DBNull.Value ? Convert.ToInt32(row["2"]) : 0,
                Lm_Rojo = row["noAs400"] != DBNull.Value ? Convert.ToInt32(row["noAs400"]) : 0,
                // Lm_Naranjo = row["noAs400"] != DBNull.Value ? Convert.ToInt32(row["noAs400"]) : 0,
                Lm_Actualizacion = row["actulizacion"] != DBNull.Value ? row["actulizacion"].ToString() : string.Empty

            };
        }
        #endregion





        /// <summary>
        /// Recupera todas las entidades <see cref="Ingresolicencia"/> de la Base de Datos
        /// </summary>
        /// <author>@Victor</author>
        /// <created>06-03-2020 16:35:13</created>
        /// <returns>Lista con todas las entidades <see cref="Ingresolicencia"/>.</returns>
        public static List<BusquedaLicenciasEntity> ObtenerLicenciasByRut(string Rut)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@Rut", Rut),

            };
            try
            {
                return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_Ingresolicencia_Multioficina_ListarByRut", parametros, ConstructorEntidadBusqueda);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }




        public static List<AuditoriaLicenciasEntity> ObtenerLicenciasAuditoriaXLS(string folioLic, string diadesde, string dia_hasta, int codOficina, int tipoSeleccion, int estadoRecepcion, string responsable)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@folio_LM", folioLic),
                new Parametro("@CodOficina", codOficina),
                new Parametro("@DiaDesde", diadesde),
                new Parametro("@DiaHasta", dia_hasta),
                new Parametro("@tipoSeleccion",tipoSeleccion),
                new Parametro("@estadoRevision",estadoRecepcion),
                new Parametro("@responsable",responsable),
            };

            try
            {
                return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_Ingresolicencia_ListarLMAuditoriaXLS", parametros, ConstructorEntidadAuditoriaListarXLS);

            }
            catch (Exception ex)
            {

                throw ex;
            }


        }
        public static List<AuditoriaLicenciasEntity> ObtenerLicenciasAuditoria(string folioLic, DateTime diadesde, DateTime dia_hasta, int codOficina, int tipoSeleccion, int estadoRecepcion, string responsable)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@folio_LM", folioLic),
                new Parametro("@CodOficina", codOficina),
                new Parametro("@DiaDesde", diadesde),
                new Parametro("@DiaHasta", dia_hasta),
                new Parametro("@tipoSeleccion",tipoSeleccion),
                new Parametro("@estadoRevision",estadoRecepcion),
                new Parametro("@responsable",responsable),
            };

            try
            {
                return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_Ingresolicencia_ListarLMAuditoria", parametros, ConstructorEntidadAuditoriaListar);
            }
            catch (Exception ex)
            {

                throw ex;
            }




        }


        public static List<AuditoriaLicenciasEntity> ObtenerLicenciasAuditoriaOficina(string folioLic, DateTime diadesde, DateTime dia_hasta, int codOficina, int tipoSeleccion, int estadoRecepcion, string responsable)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@folio_LM", folioLic),
                new Parametro("@CodOficina", codOficina),
                new Parametro("@DiaDesde", diadesde),
                new Parametro("@DiaHasta", dia_hasta),
                new Parametro("@tipoSeleccion",tipoSeleccion),
                new Parametro("@estadoRevision",estadoRecepcion),
                new Parametro("@responsable",responsable),
            };


            return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_Ingresolicencia_ListarLMAuditoria_RRLL", parametros, ConstructorEntidadAuditoriaListar);




        }

        private static BusquedaLicenciasEntity ConstructorEntidadBusqueda(DataRow row)
        {
            return new BusquedaLicenciasEntity
            {
                CodIngreso = row["CodIngreso"] != DBNull.Value ? Convert.ToInt64(row["CodIngreso"]) : 0,
                RutAfiliado = row["RutAfiliado"] != DBNull.Value ? row["RutAfiliado"].ToString() : string.Empty,
                NombreAfiliado = row["NombreAfiliado"] != DBNull.Value ? row["NombreAfiliado"].ToString() : string.Empty,
                FolioLicencia = row["FolioLicencia"] != DBNull.Value ? row["FolioLicencia"].ToString() : string.Empty,
                Oficina = row["Oficina"] != DBNull.Value ? Convert.ToInt32(row["Oficina"]) : 0,
                RutEjecutivo = row["RutEjecutivo"] != DBNull.Value ? row["RutEjecutivo"].ToString() : string.Empty,
                CodEstado = row["CodEstado"] != DBNull.Value ? Convert.ToInt32(row["CodEstado"]) : 0,
                FechaIngreso = row["FechaIngreso"] != DBNull.Value ? Convert.ToDateTime(row["FechaIngreso"]) : new DateTime(1900, 1, 1),
                FormatoLM = row["FormatoLM"] != DBNull.Value ? row["FormatoLM"].ToString() : string.Empty,
                FlagLM = row["FlagLM"] != DBNull.Value ? row["FlagLM"].ToString() : string.Empty,
                OficinaDerivacion = row["OficinaDerivada"] != DBNull.Value ? Convert.ToInt32(row["OficinaDerivada"]) : 0,
                OficinaDescripcion = row["OficinaDescripcion"] != DBNull.Value ? row["OficinaDescripcion"].ToString() : string.Empty,
                NombreEjecutivo = row["OrdenaNombre"] != DBNull.Value ? row["OrdenaNombre"].ToString() : string.Empty,
                EstadoLicencia = row["estadoLicencia"] != DBNull.Value ? row["estadoLicencia"].ToString() : string.Empty,
                descripcionEstadoRevision = row["descripcionEstadoRevision"] != DBNull.Value ? row["descripcionEstadoRevision"].ToString() : string.Empty,
                viaIngresoLicenica = row["viaIngresoLicenica"] != DBNull.Value ? Convert.ToInt32(row["viaIngresoLicenica"]) : 0,
                Responsable = row["Responsable"] != DBNull.Value ? row["Responsable"].ToString() : string.Empty,
                compincentralizado = row["compincentralizado"] != DBNull.Value ? row["compincentralizado"].ToString() : string.Empty,
            };
        }


        private static AuditoriaLicenciasEntity ConstructorDerivadasLM(DataRow row)
        {
            return new AuditoriaLicenciasEntity
            {


                CodIngreso = row["CodIngreso"] != DBNull.Value ? Convert.ToInt64(row["CodIngreso"]) : 0,
                RutAfiliado = row["RutAfiliado"] != DBNull.Value ? row["RutAfiliado"].ToString() : string.Empty,
                NombreAfiliado = row["NombreAfiliado"] != DBNull.Value ? row["NombreAfiliado"].ToString() : string.Empty,
                FolioLicencia = row["FolioLicencia"] != DBNull.Value ? row["FolioLicencia"].ToString() : string.Empty,
                Oficina = row["Oficina"] != DBNull.Value ? Convert.ToInt32(row["Oficina"]) : 0,
                RutEjecutivo = row["RutEjecutivo"] != DBNull.Value ? row["RutEjecutivo"].ToString() : string.Empty,
                CodEstado = row["CodEstado"] != DBNull.Value ? Convert.ToInt32(row["CodEstado"]) : 0,
                FechaIngreso = row["FechaIngreso"] != DBNull.Value ? Convert.ToDateTime(row["FechaIngreso"]) : new DateTime(1900, 1, 1),
                FormatoLM = row["FormatoLM"] != DBNull.Value ? row["FormatoLM"].ToString() : string.Empty,
                FlagLM = row["FlagLM"] != DBNull.Value ? row["FlagLM"].ToString() : string.Empty,
                OficinaDescripcion = row["OficinaDescripcion"] != DBNull.Value ? row["OficinaDescripcion"].ToString() : string.Empty,
                estadoLicencia = row["estadoLicencia"] != DBNull.Value ? row["estadoLicencia"].ToString() : string.Empty,

            };
        }


        private static CargaExcelRRLLEntity ConstructorCargaExcelRRLL(DataRow row)
        {
            return new CargaExcelRRLLEntity
            {


                FolioLicencia = row["Folio"] != DBNull.Value ? row["Folio"].ToString() : string.Empty,
                Estado = row["Estado"] != DBNull.Value ? row["Estado"].ToString() : string.Empty,
                FechaSubidaTATA = row["FechaSubidaTATA"] != DBNull.Value ? row["FechaSubidaTATA"].ToString() : string.Empty,
                FechasubidaCompin = row["FechasubidaCompin"] != DBNull.Value ? row["FechasubidaCompin"].ToString() : string.Empty,
                Subcomision = row["Subcomision"] != DBNull.Value ? row["Subcomision"].ToString() : string.Empty,
                CargaExcel = row["CargaFolio"] != DBNull.Value ? row["CargaFolio"].ToString() : string.Empty,
            };
        }





        private static CargaExcelRRLLEntity ConstructorCargaExcelRRLLCompin(DataRow row)
        {
            return new CargaExcelRRLLEntity
            {


                FolioLicencia = row["Folio"] != DBNull.Value ? row["Folio"].ToString() : string.Empty,
                diarecepcion = row["diarecepcion"] != DBNull.Value ? Convert.ToDateTime(row["diarecepcion"]) : new DateTime(1900, 1, 1),
                Subcomision = row["comision"] != DBNull.Value ? row["comision"].ToString() : string.Empty,
                Estado = row["estadodesdecompin"] != DBNull.Value ? row["estadodesdecompin"].ToString() : string.Empty,
                observacion = row["observacion"] != DBNull.Value ? row["observacion"].ToString() : string.Empty,
                CargaExcel = row["CargaFolio"] != DBNull.Value ? row["CargaFolio"].ToString() : string.Empty,
            };
        }


        private static Ingresolicencia ConstructorResponsableCierreLM(DataRow row)
        {
            return new Ingresolicencia
            {


                CodIngreso = row["CodIngreso"] != DBNull.Value ? Convert.ToInt64(row["CodIngreso"]) : 0,
                RutAfiliado = row["RutAfiliado"] != DBNull.Value ? row["RutAfiliado"].ToString() : string.Empty,
                NombreAfiliado = row["NombreAfiliado"] != DBNull.Value ? row["NombreAfiliado"].ToString() : string.Empty,
                FolioLicencia = row["FolioLicencia"] != DBNull.Value ? row["FolioLicencia"].ToString() : string.Empty,
                OficinaDescripcion = row["Oficina"] != DBNull.Value ? row["Oficina"].ToString() : string.Empty,
                // RutEjecutivo = row["RutEjecutivo"] != DBNull.Value ? row["RutEjecutivo"].ToString() : string.Empty,
                FechaIngreso = row["FechaIngreso"] != DBNull.Value ? Convert.ToDateTime(row["FechaIngreso"]) : new DateTime(1900, 1, 1),
                FechaGestion = row["fechaRegistro"] != DBNull.Value ? Convert.ToDateTime(row["fechaRegistro"]) : new DateTime(1900, 1, 1),
                estadoLicencia = row["estadoLicencia"] != DBNull.Value ? row["estadoLicencia"].ToString() : string.Empty,
                Responsable = row["Responsable"] != DBNull.Value ? row["Responsable"].ToString() : string.Empty,
                DescripcionEstadoRevision = row["descripcionEstadoRevision"] != DBNull.Value ? row["descripcionEstadoRevision"].ToString() : string.Empty,
                EstadoActivo = row["EstadoEnviado"] != DBNull.Value ? row["EstadoEnviado"].ToString() : string.Empty
            };
        }


        private static Oficinas ConstructorOficina(DataRow row)
        {
            return new Oficinas
            {
                 Cod_Oficina = row["Cod_Oficina"] != DBNull.Value ? Convert.ToInt32(row["Cod_Oficina"]) : 0,
                Oficina = row["Oficina"] != DBNull.Value ? row["Oficina"].ToString() : string.Empty,
            };
        }


        private static AuditoriaLicenciasEntity ConstructorEntidadAuditoria(DataRow row)
        {
            return new AuditoriaLicenciasEntity
            {
                CodIngreso = row["CodIngreso"] != DBNull.Value ? Convert.ToInt64(row["CodIngreso"]) : 0,
                RutAfiliado = row["RutAfiliado"] != DBNull.Value ? row["RutAfiliado"].ToString() : string.Empty,
                NombreAfiliado = row["NombreAfiliado"] != DBNull.Value ? row["NombreAfiliado"].ToString() : string.Empty,
                FolioLicencia = row["FolioLicencia"] != DBNull.Value ? row["FolioLicencia"].ToString() : string.Empty,
                Oficina = row["Oficina"] != DBNull.Value ? Convert.ToInt32(row["Oficina"]) : 0,
                RutEjecutivo = row["RutEjecutivo"] != DBNull.Value ? row["RutEjecutivo"].ToString() : string.Empty,
                CodEstado = row["CodEstado"] != DBNull.Value ? Convert.ToInt32(row["CodEstado"]) : 0,
                FechaIngreso = row["FechaIngreso"] != DBNull.Value ? Convert.ToDateTime(row["FechaIngreso"]) : new DateTime(1900, 1, 1),
                FormatoLM = row["FormatoLM"] != DBNull.Value ? row["FormatoLM"].ToString() : string.Empty,
                FlagLM = row["FlagLM"] != DBNull.Value ? row["FlagLM"].ToString() : string.Empty,
                OficinaDerivacion = row["OficinaDerivada"] != DBNull.Value ? Convert.ToInt32(row["OficinaDerivada"]) : 0,
                email = row["email"] != DBNull.Value ? row["email"].ToString() : string.Empty,
                telefono = row["telefono"] != DBNull.Value ? row["telefono"].ToString() : string.Empty,
                viaIngresoLicenica = row["viaIngresoLicenica"] != DBNull.Value ? Convert.ToInt32(row["viaIngresoLicenica"]) : 0,
                quienEnvia = row["quienEnvia"] != DBNull.Value ? Convert.ToInt32(row["quienEnvia"]) : 0,

                EstadoRevision = row["estadoRevision"] != DBNull.Value ? Convert.ToInt32(row["estadoRevision"]) : -1,
                LmIncompleta = row["lmIncompleta"] != DBNull.Value ? Convert.ToInt32(row["lmIncompleta"]) : 0,
                Lmnolegible = row["lmnolegible"] != DBNull.Value ? Convert.ToInt32(row["lmnolegible"]) : 0,
                Lmsindiagnostico = row["lmsindiagnostico"] != DBNull.Value ? Convert.ToInt32(row["lmsindiagnostico"]) : 0,
                Lmsoncarta = row["lmsoncarta"] != DBNull.Value ? Convert.ToInt32(row["lmsoncarta"]) : 0,
                Observacion = row["observacion"] != DBNull.Value ? row["observacion"].ToString() : string.Empty,
                RutAuditor = row["rutAuditor"] != DBNull.Value ? row["rutAuditor"].ToString() : string.Empty,
                DescripcionEstadoRevision = row["descripcionEstadoRevision"] != DBNull.Value ? row["descripcionEstadoRevision"].ToString() : string.Empty,
                descripcionquienEnvia = row["descripcionquienEnvia"] != DBNull.Value ? row["descripcionquienEnvia"].ToString() : string.Empty,
                Folionovalido = row["folionovalido"] != DBNull.Value ? Convert.ToInt32(row["folionovalido"]) : 0,
                Otromotivo = row["otromotivo"] != DBNull.Value ? Convert.ToInt32(row["otromotivo"]) : 0,
                DescripcionesBanner = row["DescripcionesBanner"] != DBNull.Value ? row["DescripcionesBanner"].ToString() : string.Empty,
                fechaAuditoria = row["FechaRegistro"] != DBNull.Value ? Convert.ToDateTime(row["FechaRegistro"]) : new DateTime(1900, 1, 1),
                DescripcionOficina = row["descripcionOficina"] != DBNull.Value ? row["descripcionOficina"].ToString() : string.Empty,
                Responsable = row["Responsable"] != DBNull.Value ? row["Responsable"].ToString() : string.Empty,
                EstadoOficina = row["EstadoOficina"] != DBNull.Value ? row["EstadoOficina"].ToString() : string.Empty,
                compincentralizado = row["compincentralizado"] != DBNull.Value ? row["compincentralizado"].ToString() : string.Empty,
                Subcomision = row["Subcomision"] != DBNull.Value ? row["Subcomision"].ToString() : string.Empty,
                Subido_a_plataforma_compin = row["subido_a_plataforma_compin"] != DBNull.Value ? Convert.ToDateTime(row["subido_a_plataforma_compin"]) : new DateTime(1900, 1, 1),
                FolioCompin = row["folioCompin"] != DBNull.Value ? row["folioCompin"].ToString() : string.Empty,
            };
        }

        private static AuditoriaLicenciasEntity ConstructorEntidadAuditoriaListar(DataRow row)
        {
            return new AuditoriaLicenciasEntity
            {
                CodIngreso = row["CodIngreso"] != DBNull.Value ? Convert.ToInt64(row["CodIngreso"]) : 0,
                RutAfiliado = row["RutAfiliado"] != DBNull.Value ? row["RutAfiliado"].ToString() : string.Empty,
                NombreAfiliado = row["NombreAfiliado"] != DBNull.Value ? row["NombreAfiliado"].ToString() : string.Empty,
                FolioLicencia = row["FolioLicencia"] != DBNull.Value ? row["FolioLicencia"].ToString() : string.Empty,
                Oficina = row["Oficina"] != DBNull.Value ? Convert.ToInt32(row["Oficina"]) : 0,
                RutEjecutivo = row["RutEjecutivo"] != DBNull.Value ? row["RutEjecutivo"].ToString() : string.Empty,
                CodEstado = row["CodEstado"] != DBNull.Value ? Convert.ToInt32(row["CodEstado"]) : 0,
                FechaIngreso = row["FechaIngreso"] != DBNull.Value ? Convert.ToDateTime(row["FechaIngreso"]) : new DateTime(1900, 1, 1),
                FormatoLM = row["FormatoLM"] != DBNull.Value ? row["FormatoLM"].ToString() : string.Empty,
                FlagLM = row["FlagLM"] != DBNull.Value ? row["FlagLM"].ToString() : string.Empty,
                OficinaDerivacion = row["OficinaDerivada"] != DBNull.Value ? Convert.ToInt32(row["OficinaDerivada"]) : 0,
                EstadoRevision = row["estadoRevision"] != DBNull.Value ? Convert.ToInt32(row["estadoRevision"]) : -1,
                DescripcionEstadoRevision = row["descripcionEstadoRevision"] != DBNull.Value ? row["descripcionEstadoRevision"].ToString() : string.Empty,
                OficinaDescripcion = row["OficinaDescripcion"] != DBNull.Value ? row["OficinaDescripcion"].ToString() : string.Empty,
                estadoLicencia = row["estadoLicencia"] != DBNull.Value ? row["estadoLicencia"].ToString() : string.Empty,
                descripcionquienEnvia = row["descripcionquienEnvia"] != DBNull.Value ? row["descripcionquienEnvia"].ToString() : string.Empty,
                DescripcionesBanner = row["DescripcionesBanner"] != DBNull.Value ? row["DescripcionesBanner"].ToString() : string.Empty,
                Responsable = row["Responsable"] != DBNull.Value ? row["Responsable"].ToString() : string.Empty,
                FechaDf = row["FechaDf"] != DBNull.Value ? Convert.ToDateTime(row["FechaDf"]) : new DateTime(1900, 1, 1)




            };
        }



        private static LicenciasDevueltas ConstructorLicenciasDevueltas(DataRow row)
        {

            return new LicenciasDevueltas
            {
                CodIngreso = row["CodIngreso"] != DBNull.Value ? Convert.ToInt64(row["CodIngreso"]) : 0,
                RutAfiliado = row["RutAfiliado"] != DBNull.Value ? row["RutAfiliado"].ToString() : string.Empty,
                NombreAfiliado = row["NombreAfiliado"] != DBNull.Value ? row["NombreAfiliado"].ToString() : string.Empty,
                FolioLicencia = row["FolioLicencia"] != DBNull.Value ? row["FolioLicencia"].ToString() : string.Empty,
                FechaDevolucion = row["FechaDevolucion"] != DBNull.Value ? Convert.ToDateTime(row["FechaDevolucion"]) : new DateTime(1900, 1, 1),
                Motivodevolucion = row["Motivodevolucion"] != DBNull.Value ? row["Motivodevolucion"].ToString() : string.Empty,
                Gestion = row["Gestion"] != DBNull.Value ? row["Gestion"].ToString() : string.Empty
            };


        }
        private static LicenciasDevueltas ConstructorLicenciasDevueltasCompinRRLL(DataRow row)
        {

            return new LicenciasDevueltas
            {
                CodIngreso = row["CodIngreso"] != DBNull.Value ? Convert.ToInt64(row["CodIngreso"]) : 0,
                RutAfiliado = row["RutAfiliado"] != DBNull.Value ? row["RutAfiliado"].ToString() : string.Empty,
                NombreAfiliado = row["NombreAfiliado"] != DBNull.Value ? row["NombreAfiliado"].ToString() : string.Empty,
                FolioLicencia = row["FolioLicencia"] != DBNull.Value ? row["FolioLicencia"].ToString() : string.Empty,
                FechaDevolucion = row["FechaDevolucion"] != DBNull.Value ? Convert.ToDateTime(row["FechaDevolucion"]) : new DateTime(1900, 1, 1),
                Motivodevolucion = row["Motivodevolucion"] != DBNull.Value ? row["Motivodevolucion"].ToString() : string.Empty,
                Gestion = row["gestion"] != DBNull.Value ? row["gestion"].ToString() : string.Empty,
                Devueltas = row["devuelta"] != DBNull.Value ? Convert.ToInt32(row["devuelta"]) : 0,
                FechaDevolucionString = row["FechaDevolucionString"] != DBNull.Value ? row["FechaDevolucionString"].ToString() : string.Empty,
                Gestion_xls = row["Gestion_xls"] != DBNull.Value ? row["Gestion_xls"].ToString() : string.Empty,
                subcomision = row["subcomision"] != DBNull.Value ? row["subcomision"].ToString() : string.Empty,
                descripcionOficina = row["descripcionOficina"] != DBNull.Value ? row["descripcionOficina"].ToString() : string.Empty,
            };


        }
        private static LicenciasDevueltas ConstructorLicenciasDevueltasCompin(DataRow row)
        {

            return new LicenciasDevueltas
            {
                CodIngreso = row["CodIngreso"] != DBNull.Value ? Convert.ToInt64(row["CodIngreso"]) : 0,
                RutAfiliado = row["RutAfiliado"] != DBNull.Value ? row["RutAfiliado"].ToString() : string.Empty,
                NombreAfiliado = row["NombreAfiliado"] != DBNull.Value ? row["NombreAfiliado"].ToString() : string.Empty,
                FolioLicencia = row["FolioLicencia"] != DBNull.Value ? row["FolioLicencia"].ToString() : string.Empty,
                FechaDevolucion = row["FechaDevolucion"] != DBNull.Value ? Convert.ToDateTime(row["FechaDevolucion"]) : new DateTime(1900, 1, 1),
                Motivodevolucion = row["Motivodevolucion"] != DBNull.Value ? row["Motivodevolucion"].ToString() : string.Empty,
                Gestion = row["gestion"] != DBNull.Value ? row["gestion"].ToString() : string.Empty,
                Devueltas = row["devuelta"] != DBNull.Value ? Convert.ToInt32(row["devuelta"]) : 0,
                FechaDevolucionString = row["FechaDevolucionString"] != DBNull.Value ? row["FechaDevolucionString"].ToString() : string.Empty,
                Gestion_xls = row["Gestion_xls"] != DBNull.Value ? row["Gestion_xls"].ToString() : string.Empty,
            };


        }

        private static LicenciasDevueltas ConstructorLicenciasConsolidadoDevueltasCompin(DataRow row)
        {

            return new LicenciasDevueltas
            {
                CodIngreso = row["CodIngreso"] != DBNull.Value ? Convert.ToInt64(row["CodIngreso"]) : 0,
                RutAfiliado = row["RutAfiliado"] != DBNull.Value ? row["RutAfiliado"].ToString() : string.Empty,
                NombreAfiliado = row["NombreAfiliado"] != DBNull.Value ? row["NombreAfiliado"].ToString() : string.Empty,
                FolioLicencia = row["FolioLicencia"] != DBNull.Value ? row["FolioLicencia"].ToString() : string.Empty,
                FechaDevolucion = row["FechaDevolucion"] != DBNull.Value ? Convert.ToDateTime(row["FechaDevolucion"]) : new DateTime(1900, 1, 1),
                Motivodevolucion = row["Motivodevolucion"] != DBNull.Value ? row["Motivodevolucion"].ToString() : string.Empty,
                Gestion = row["gestion"] != DBNull.Value ? row["gestion"].ToString() : string.Empty,
                Responsable = row["Responsable"] != DBNull.Value ? row["Responsable"].ToString() : string.Empty,
                FechaDevolucionString = row["FechaDevolucionString"] != DBNull.Value ? row["FechaDevolucionString"].ToString() : string.Empty,
                FechagestionString = row["FechagestionString"] != DBNull.Value ? row["FechagestionString"].ToString() : string.Empty,
                descripcionOficina = row["descripcionOficina"] != DBNull.Value ? row["descripcionOficina"].ToString() : string.Empty,
                subcomision = row["subcomision"] != DBNull.Value ? row["subcomision"].ToString() : string.Empty,
            };


        }

        private static AuditoriaLicenciasEntity ConstructorEntidadAuditoriaListarXLS(DataRow row)
        {
            return new AuditoriaLicenciasEntity
            {
                CodIngreso = row["CodIngreso"] != DBNull.Value ? Convert.ToInt64(row["CodIngreso"]) : 0,
                RutAfiliado = row["RutAfiliado"] != DBNull.Value ? row["RutAfiliado"].ToString() : string.Empty,
                NombreAfiliado = row["NombreAfiliado"] != DBNull.Value ? row["NombreAfiliado"].ToString() : string.Empty,
                FolioLicencia = row["FolioLicencia"] != DBNull.Value ? row["FolioLicencia"].ToString() : string.Empty,
                FechaIngreso = row["FechaIngreso"] != DBNull.Value ? Convert.ToDateTime(row["FechaIngreso"]) : new DateTime(1900, 1, 1),
                FechaDf = row["FechaDf"] != DBNull.Value ? Convert.ToDateTime(row["FechaDf"]) : new DateTime(1900, 1, 1),
                FechaDato = row["FechaIngresoString"] != DBNull.Value ? row["FechaIngresoString"].ToString() : string.Empty,
                RutEjecutivo = row["RutEjecutivo"] != DBNull.Value ? row["RutEjecutivo"].ToString() : string.Empty,
                CodEstado = row["CodEstado"] != DBNull.Value ? Convert.ToInt32(row["CodEstado"]) : 0,
                FormatoLM = row["FormatoLM"] != DBNull.Value ? row["FormatoLM"].ToString() : string.Empty,
                FlagLM = row["FlagLM"] != DBNull.Value ? row["FlagLM"].ToString() : string.Empty,
                EstadoRevision = row["estadoRevision"] != DBNull.Value ? Convert.ToInt32(row["estadoRevision"]) : -1,
                DescripcionEstadoRevision = row["descripcionEstadoRevision"] != DBNull.Value ? row["descripcionEstadoRevision"].ToString() : string.Empty,
                OficinaDescripcion = row["OficinaDescripcion"] != DBNull.Value ? row["OficinaDescripcion"].ToString() : string.Empty,
                estadoLicencia = row["estadoLicencia"] != DBNull.Value ? row["estadoLicencia"].ToString() : string.Empty,
                descripcionquienEnvia = row["descripcionquienEnvia"] != DBNull.Value ? row["descripcionquienEnvia"].ToString() : string.Empty,
                DescripcionesBanner = row["DescripcionesBanner"] != DBNull.Value ? row["DescripcionesBanner"].ToString() : string.Empty,
                Responsable = row["Responsable"] != DBNull.Value ? row["Responsable"].ToString() : string.Empty,
                FechadocumentosString = row["FechadocumentosString"] != DBNull.Value ? row["FechadocumentosString"].ToString() : string.Empty,
                Fechaauditoria = row["Fechaauditoria"] != DBNull.Value ? row["Fechaauditoria"].ToString() : string.Empty,
                FormatoLmIncompleta = row["lmincompleta"] != DBNull.Value ? row["lmincompleta"].ToString() : string.Empty,
                Formatolmnolegible = row["lmnolegible"] != DBNull.Value ? row["lmnolegible"].ToString() : string.Empty,
                Formatolmsindiagnostico = row["lmsindiagnostico"] != DBNull.Value ? row["lmsindiagnostico"].ToString() : string.Empty,
                Formatolmsoncarta = row["lmsoncarta"] != DBNull.Value ? row["lmsoncarta"].ToString() : string.Empty,
                FormatoFolionovalido = row["Folionovalido"] != DBNull.Value ? row["Folionovalido"].ToString() : string.Empty,
                FormatoOtromotivo = row["Otromotivo"] != DBNull.Value ? row["Otromotivo"].ToString() : string.Empty,
                OrdenaNombre = row["OrdenaNombre"] != DBNull.Value ? row["OrdenaNombre"].ToString() : string.Empty,
                descripcionviaIngreso = row["descripcionviaIngreso"] != DBNull.Value ? row["descripcionviaIngreso"].ToString() : string.Empty
            };
        }





        public static void ValidarCargaExcel(string folioLic, string Estado)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@folio_LM", folioLic),
                new Parametro("@Estado", Estado),

            };

            DBHelper.InstanceCRM.EjecutarProcedimiento("licencias.sp_Lic_", parametros);

        }


        public static string ValidaExcelRRLLCompin(string diarecepcion, string comision, string folio, string estadodesdecompin, string observacion, string fecha)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@folio_LM", folio),
                new Parametro("@Diarecepcion", diarecepcion),
                new Parametro("@comision", comision),
                new Parametro("@estadodesdecompin", estadodesdecompin),
                new Parametro("@observacion", observacion),
                new Parametro("@fecha", fecha)

            };
            return DBHelper.InstanceCRM.ObtenerEscalar<string>("licencias.sp_Lic_Validacion_RRLL_Excel_COMPIN", parametros);
        }


        public static string ValidaExcelRRLL(string folio_LM, string Estado, string fechaSubidaTATA, string fechaSubidaCompin, string SubComision)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@folio_LM", folio_LM),
                new Parametro("@Estado", Estado),
                new Parametro("@fechaSubidaTATA", fechaSubidaTATA),
                new Parametro("@fechaSubidaCompin", fechaSubidaCompin),
                new Parametro("@SubComision", SubComision)
            };
            return DBHelper.InstanceCRM.ObtenerEscalar<string>("licencias.sp_Lic_Validacion_RRLL_Excel", parametros);
        }

        public static void GuardarProcesoDevueltasTATA(string token)
        {
            Parametros parametros = new Parametros
            {

               new Parametro("@token",token)

            };
            try
            {
                DBHelper.InstanceCRM.EjecutarProcedimiento("licencias.sp_Lic_Devueltas_Cargas", parametros);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }





        public static void GuardarProcesoReenvioDevueltasCompin(int CodIngreso, string estadoDevuelta, string token)

        {
            Parametros parametros = new Parametros
            {
                 new Parametro("@CodIngreso",CodIngreso)
                ,new Parametro("@estadoDevuelta",estadoDevuelta)
                ,new Parametro("@token",token)
            };

            try
            {
                DBHelper.InstanceCRM.EjecutarProcedimiento("licencias.sp_Lic_Reproceso_DevueltasCompin_RRLL", parametros);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public static void GuardarProcesoDevueltasCompin(string token)
        {
            Parametros parametros = new Parametros
            {

               new Parametro("@token",token)

            };
            try
            {
                DBHelper.InstanceCRM.EjecutarProcedimiento("licencias.sp_Lic_Devueltas_Cargas_COMPIN", parametros);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public static DataTable ExportarPDFAs400(int codOficina, DateTime diadesde)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@CodOficina", codOficina),
                new Parametro("@Diadesde", diadesde)
            };
            return DBHelper.InstanceCRM.ObtenerDataTable("licencias.sp_Lic_Ingresolicencia_Manual_Presencial_Pdf", parametros);
        }
        public static DataTable DatosPdf(int codOficina, DateTime diadesde)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@CodOficina", codOficina),
                new Parametro("@Diadesde", diadesde)
            };
            return DBHelper.InstanceCRM.ObtenerDataTable("licencias.sp_Lic_Ingresolicencia_Manual_datos_extra_Pdf", parametros);
        }



        public static List<GestionOficinaEntity> listagestionoficina(long CodIngreso, int tipodevuelta)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@CodIngreso", CodIngreso),
                new Parametro("@tipodevuelta", tipodevuelta)


            };
            try
            {
                return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_Gestion_Oficina_Listar", parametros, ConstructorGestionOficina);

            }
            catch (Exception ex)
            {

                throw ex;
            }


        }

        public static List<ComunaEntity> listarComuna(int regionId)
        {
            Parametro parametros = new Parametro("@regionId", regionId)
            {

            };
            try
            {
                return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_listar_comuna", parametros, ConstructorComuna);
            }
            catch (Exception ex)
            {

                throw ex;
            }



        }


        public static List<RegionEntity> listaregiones()
        {
            try
            {
                return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_listar_region", ConstructorRegion);
            }
            catch (Exception ex)
            {

                throw ex;
            }



        }

        private static GestionOficinaEntity ConstructorGestionOficina(DataRow row)
        {
            return new GestionOficinaEntity
            {

                CodIngreso = row["CodIngreso"] != DBNull.Value ? Convert.ToInt64(row["CodIngreso"]) : 0,
                FolioLicencia = row["FolioLicencia"] != DBNull.Value ? row["FolioLicencia"].ToString() : string.Empty,
                Fechagestion = row["fechagestion"] != DBNull.Value ? Convert.ToDateTime(row["fechagestion"]) : new DateTime(1900, 1, 1),
                Comentarios = row["comentarios"] != DBNull.Value ? row["comentarios"].ToString() : string.Empty,
                NGestion = row["ngestion"] != DBNull.Value ? Convert.ToInt32(row["ngestion"]) : 0,
                Tipodevuelta = row["tipodevuelta"] != DBNull.Value ? Convert.ToInt32(row["tipodevuelta"]) : 0,
                direccion = row["direccion"] != DBNull.Value ? row["direccion"].ToString() : string.Empty,
                region = row["region"] != DBNull.Value ? row["region"].ToString() : string.Empty,
                comuna = row["comuna"] != DBNull.Value ? row["comuna"].ToString() : string.Empty,
                idRegion = row["regionid"] != DBNull.Value ? Convert.ToInt32(row["regionid"]) : 0,
                idcomuna = row["comunaid"] != DBNull.Value ? Convert.ToInt32(row["comunaid"]) : 0,
                tipoContacto = row["tipoContacto"] != DBNull.Value ? row["tipoContacto"].ToString() : string.Empty,
                contacto = row["contacto"] != DBNull.Value ? row["contacto"].ToString() : string.Empty,
                TelefonoContacto = row["TelefonoContacto"] != DBNull.Value ? Convert.ToInt32(row["TelefonoContacto"]) : 0,
                numero = row["numero"] != DBNull.Value ? row["numero"].ToString() : string.Empty,
                correo = row["correo"] != DBNull.Value ? row["correo"].ToString() : string.Empty,
                idGestion = row["idGestion"] != DBNull.Value ? Convert.ToInt32(row["idGestion"]) : 0,
            };
        }

        private static RegionEntity ConstructorRegion(DataRow row)
        {
            return new RegionEntity
            {

                Id = row["Id"] != DBNull.Value ? Convert.ToInt32(row["Id"]) : 0,
                Nombre = row["Nombre"] != DBNull.Value ? row["Nombre"].ToString() : string.Empty,
                Secuencia = row["Secuencia"] != DBNull.Value ? Convert.ToInt32(row["Secuencia"]) : 0,

            };
        }

        private static ComunaEntity ConstructorComuna(DataRow row)
        {
            return new ComunaEntity
            {

                Id = row["Id"] != DBNull.Value ? Convert.ToInt32(row["Id"]) : 0,
                Nombre = row["Nombre"] != DBNull.Value ? row["Nombre"].ToString() : string.Empty,


            };
        }


        public static int Guardar_Gestion_Oficina(WebGestionOficinas web, string Token)
        {
            Parametros parametros = new Parametros
            {
                new Parametro("@CodIngreso", web.codIngreso),
                new Parametro("@NGestion", web.nGestion),
                new Parametro("@TipoDevuelta", web.tipoDevuelta),
                new Parametro("@IdGestion", web.IdGestion),
                new Parametro("@IdRegion",web.IdRegion),
                new Parametro("@IdComuna", web.IdComuna),
                new Parametro("@direccion", web.direccion),
                new Parametro("@Token", Token),
                new Parametro("@Comentarios", web.comentarios),
                new Parametro("@tipo", web.tipo),
                new Parametro("@nombre_contacto", web.nombre_contacto),
                new Parametro("@telefono_contacto", web.telefono_contacto),
                new Parametro("@email", web.email),
                new Parametro("@numero", web.numero)
            };
            try
            {
                return DBHelper.InstanceCRM.ObtenerEscalar<int>("licencias.sp_Lic_guardar_gestion_oficina", parametros);

            }
            catch (Exception ex)
            {

                throw ex;
            }


        }




        private static Ingresolicencia ConstructorDevueltaOficina(DataRow row)
        {
            return new Ingresolicencia
            {

                CodIngreso = row["CodIngreso"] != DBNull.Value ? Convert.ToInt64(row["CodIngreso"]) : 0,
                RutAfiliado = row["RutAfiliado"] != DBNull.Value ? row["RutAfiliado"].ToString() : string.Empty,
                NombreAfiliado = row["NombreAfiliado"] != DBNull.Value ? row["NombreAfiliado"].ToString() : string.Empty,
                FolioLicencia = row["FolioLicencia"] != DBNull.Value ? row["FolioLicencia"].ToString() : string.Empty,
                FechaIngreso = row["FechaIngreso"] != DBNull.Value ? Convert.ToDateTime(row["FechaIngreso"]) : new DateTime(1900, 1, 1),

            };
        }


        public static List<Ingresolicencia> listar_devueltas_oficinas(string folioLM, int codOficina, DateTime diadesde, DateTime diahasta)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@folio_LM", folioLM),
                new Parametro("@CodOficina", codOficina),
                new Parametro("@DiaDesde", diadesde),
                new Parametro("@DiaHasta", diahasta)

            };

            try
            {
                return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_Ingresolicencia_ListarDevueltasOficinas", parametros, ConstructorDevueltaOficina);
            }
            catch (Exception ex)
            {

                throw ex;
            }



        }

        public static List<LicenciasDevueltas> ExportLMdevueltasCompinxls(string folioLM, int codOficina, DateTime diadesde, DateTime diahasta)
        {

            Parametros parametros = new Parametros
            {

                new Parametro("@folio_LM", folioLM),
                new Parametro("@CodOficina", codOficina),
                new Parametro("@DiaDesde", diadesde),
                new Parametro("@DiaHasta", diahasta),


          };
            try
            {
                return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_Ingresolicencia_ListarDevueltasCompin", parametros, ConstructorLicenciasDevueltasCompin);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
