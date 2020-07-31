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
                EtapaId= row["EtapaId"] != DBNull.Value ? Convert.ToInt32(row["EtapaId"]) : 0,
                Siguienteetapa = row["Siguienteetapa"] != DBNull.Value ? row["Siguienteetapa"].ToString() : string.Empty,
                FormatoLM = row["FormatoLM"] != DBNull.Value ? row["FormatoLM"].ToString() : string.Empty,
                Oficina = row["Oficina"] != DBNull.Value ? row["Oficina"].ToString() : string.Empty,
                Quienenvia = row["Quienenvia"] != DBNull.Value ? row["Quienenvia"].ToString() : string.Empty,
                Telefono = row["Telefono"] != DBNull.Value ? row["Telefono"].ToString() : string.Empty,
                Email = row["Email"] != DBNull.Value ? row["Email"].ToString() : string.Empty
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

            return DBHelper.InstanceCRM.ObtenerEscalar<long>("licencias.sp_Lic_Ingresolicencia_Actualizar_CierreResponsable", parametros);
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

            return DBHelper.InstanceCRM.ObtenerEscalar<long>("licencias.sp_Lic_devolucion_Compin_Guardar", parametros);
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

            return DBHelper.InstanceCRM.ObtenerEscalar<long>("licencias.sp_Lic_Ingresolicencia_ListarLMAuditoria_Oficina_Conteo", parametros);
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
                return DBHelper.InstanceCRM.ObtenerEscalar<long>("licencias.sp_Lic_Auditoria_Guardar", parametros);
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

        public static List<LicenciasDevueltas> ListaLMConsolidadodevueltasCompin(string folio, DateTime diadesde, DateTime diahasta, int codOficina, string responsable)
        {
            Parametros parametros = new Parametros
            {

                new Parametro("@folio_LM", folio),
                //new Parametro("@CodOficina", codOficina),
                new Parametro("@DiaDesde", diadesde),
                new Parametro("@DiaHasta", diahasta),
                new Parametro("@responsable", responsable)

          };
            try
            {
                return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_Ingresolicencia_Listar_reproceso_DevueltasCompin", parametros, ConstructorLicenciasConsolidadoDevueltasCompin);

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

            return DBHelper.InstanceCRM.ObtenerDataTable("licencias.sp_Lic_Ingresolicencia_ListarCierreResponsable_filtros", parametros);


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




        public static List<Ingresolicencia> ListaLMresponsableCierre(string folio, string diadesde, string diahasta, int codOficina, string responsable, string fechaenviodesde, string fechaenviohasta)
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
                return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_Ingresolicencia_ListarCierreResponsable_filtros", parametros, ConstructorResponsableCierreLM);

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
                    Flagas400 = row["flagas400"] != DBNull.Value ? Convert.ToInt32(row["flagas400"]) : 0

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
            catch (Exception ex ) 
            {

                throw ex ;
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


            return DBHelper.InstanceCRM.ObtenerColeccion("licencias.sp_Lic_Ingresolicencia_ListarLMAuditoria_oficina", parametros, ConstructorEntidadAuditoriaListar);




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
                Gestion = row["gestion"] != DBNull.Value ? row["gestion"].ToString() : string.Empty
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



    }
}
