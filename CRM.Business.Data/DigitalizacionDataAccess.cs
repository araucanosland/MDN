using CDK.Data;
using CDK.Integration;
using CRM.Business.Entity;
using System;
using System.Collections.Generic;
using System.Data;

namespace CRM.Business.Data
{
    public class DigitalizacionDataAccess
    {

        public static List<DigitalizacionEntity> ListaLeadEspecialista(string CodOficina, string Oferta, string Estado, DateTime FechaDesde, DateTime FechaHasta, string tipo, string rut, string Zona, string OficinaCurse, string ZonaCurse, string OficinaPagadora, string ZonaPagadora)
        {
            int CodOficina_aux;
            int tipo_aux;
            int OficinaCurse_aux;
            int OficinaPagadora_aux;
            string Zona_aux;
            string Zona_pagadora_aux;
            string Zona_curse_aux;
            string Estado_aux;


            if (ZonaCurse == null)
                Zona_curse_aux = "-2";
            else
                Zona_curse_aux = ZonaCurse;

            if (ZonaPagadora == null)
                Zona_pagadora_aux = "-2";
            else
                Zona_pagadora_aux = ZonaPagadora;

            if (Zona == null)
                Zona_aux = "-2";
            else
                Zona_aux = Zona;



            if (Estado == null)
                Estado_aux = "-2";
            else
                Estado_aux = Estado;

            if (OficinaPagadora == null)
                OficinaPagadora_aux = -1;
            else
                OficinaPagadora_aux = int.Parse(OficinaPagadora);

            if (OficinaCurse == null)
                OficinaCurse_aux = -1;
            else
                OficinaCurse_aux = int.Parse(OficinaCurse);


            if (tipo == null)
                tipo_aux = -1;
            else
                tipo_aux = int.Parse(tipo);

            if (CodOficina == null)
                CodOficina_aux = -1;
            else
                CodOficina_aux = int.Parse(CodOficina);


            Parametros parametros = new Parametros()
            {

                new Parametro("@CodOficina", CodOficina_aux),
                new Parametro("@Oferta", Oferta),
                new Parametro("@Estado",Estado_aux),
                new Parametro("@FechaDesde",FechaDesde),
                new Parametro("@FechaHasta",FechaHasta),
                new Parametro("@tipo",tipo_aux),
                new Parametro("@rut",rut),
                new Parametro("@Zona",Zona_aux),
                new Parametro("@OficinaCurse",OficinaCurse_aux),
                new Parametro("@ZonaCurse",Zona_curse_aux),
                new Parametro("@OficinaPagadora",OficinaPagadora_aux),
                new Parametro("@ZonaPagadora",Zona_pagadora_aux)
            };

            return DBHelper.InstanceNegocio.ObtenerColeccion("digit.Listar_lead_Especialista", parametros, ConstructorEspecialista);
        }


        public static List<DigitalizacionEntityXLS> ListaLeadEspecialistaxls(int CodOficina, string Oferta, string Estado, DateTime FechaDesde, DateTime FechaHasta, int tipo, string rut, string Zona, int OficinaCurse, string ZonaCurse, int OficinaPagadora, string ZonaPagadora)
        {
            Parametros parametros = new Parametros()
            {

                new Parametro("@CodOficina", CodOficina),
                new Parametro("@Oferta", Oferta),
                new Parametro("@Estado",Estado),
                new Parametro("@FechaDesde",FechaDesde),
                new Parametro("@FechaHasta",FechaHasta),
                new Parametro("@tipo",tipo),
                new Parametro("@rut",rut),
                new Parametro("@Zona",Zona),
                new Parametro("@OficinaCurse",OficinaCurse),
                new Parametro("@ZonaCurse",ZonaCurse),
                new Parametro("@OficinaPagadora",OficinaPagadora),
                new Parametro("@ZonaPagadora",ZonaPagadora)
            };




            return DBHelper.InstanceNegocio.ObtenerColeccion("digit.Listar_lead_Especialista_xls", parametros, ConstructorEspecialistaXLS);
        }

        private static DigitalizacionEntity ConstructorEspecialista(DataRow row)
        {

            return new DigitalizacionEntity
            {
                Id = row["Id"] != DBNull.Value ? Convert.ToInt64(row["Id"]) : 0,
                RutAfiliado = row["RutAfiliado"] != DBNull.Value ? row["RutAfiliado"].ToString() : string.Empty,
                NombreAfiliado = row["NombreAfiliado"] != DBNull.Value ? row["NombreAfiliado"].ToString() : string.Empty,
                Oferta = row["Oferta"] != DBNull.Value ? row["Oferta"].ToString() : string.Empty,
                Folio = row["Folio"] != DBNull.Value ? row["Folio"].ToString() : string.Empty,
                EstadoGestion = row["EstadoGestion"] != DBNull.Value ? row["EstadoGestion"].ToString() : string.Empty,
                FechaVenta = row["FechaVenta"] != DBNull.Value ? Convert.ToDateTime(row["FechaVenta"]) : new DateTime(1900, 1, 1),
                Tipo = row["Tipo"] != DBNull.Value ? Convert.ToInt32(row["Tipo"].ToString()) : 0,
                Oficina = row["Oficina"] != DBNull.Value ? Convert.ToInt32(row["Oficina"].ToString()) : 0,
                RutEjecutivo = row["RutEjecutivo"] != DBNull.Value ? row["RutEjecutivo"].ToString() : string.Empty,
                FechaRegistro = row["FechaRegistro"] != DBNull.Value ? Convert.ToDateTime(row["FechaRegistro"]) : new DateTime(1900, 1, 1),
                TipoDescripcion = row["TipoDocumento"] != DBNull.Value ? row["TipoDocumento"].ToString() : string.Empty,
                FechaVentaString = row["FechaVentaString"] != DBNull.Value ? row["FechaVentaString"].ToString() : string.Empty,
                FechaGestionString = row["FechaGestionString"] != DBNull.Value ? row["FechaGestionString"].ToString() : string.Empty,
                NombreEjecutivo = row["NombreEjecutivo"] != DBNull.Value ? row["NombreEjecutivo"].ToString() : string.Empty,
                zona = row["zona"] != DBNull.Value ? row["zona"].ToString() : string.Empty,

                TipoDocumento = row["TipoDocumento"] != DBNull.Value ? row["TipoDocumento"].ToString() : string.Empty,
                descripcionOficinaPagadora = row["OficinaPagadora"] != DBNull.Value ? row["OficinaPagadora"].ToString() : string.Empty,
                descripcionOficinaCurse = row["OficinaCurse"] != DBNull.Value ? row["OficinaCurse"].ToString() : string.Empty,
                descripcionOficinaAuditora = row["OficinaAuditora"] != DBNull.Value ? row["OficinaAuditora"].ToString() : string.Empty,

            };


        }

        private static DigitalizacionEntityXLS ConstructorEspecialistaXLS(DataRow row)
        {

            return new DigitalizacionEntityXLS
            {
                RutAfiliado = row["RutAfiliado"] != DBNull.Value ? row["RutAfiliado"].ToString() : string.Empty,
                NombreAfiliado = row["NombreAfiliado"] != DBNull.Value ? row["NombreAfiliado"].ToString() : string.Empty,
                Oferta = row["Oferta"] != DBNull.Value ? row["Oferta"].ToString() : string.Empty,
                Folio = row["Folio"] != DBNull.Value ? row["Folio"].ToString() : string.Empty,
                EstadoGestion = row["EstadoGestion"] != DBNull.Value ? row["EstadoGestion"].ToString() : string.Empty,
                RutEjecutivo = row["RutEjecutivo"] != DBNull.Value ? row["RutEjecutivo"].ToString() : string.Empty,
                FechaVentaString = row["FechaVentaString"] != DBNull.Value ? row["FechaVentaString"].ToString() : string.Empty,
                FechaGestionString = row["FechaGestionString"] != DBNull.Value ? row["FechaGestionString"].ToString() : string.Empty,
                nombreEjecutivoAsignado = row["nombreEjecutivoAsignado"] != DBNull.Value ? row["nombreEjecutivoAsignado"].ToString() : string.Empty,
                TipoDocumento = row["TipoDocumento"] != DBNull.Value ? row["TipoDocumento"].ToString() : string.Empty,
                nombreEjecutivoGestion = row["nombreEjecutivoGestion"] != DBNull.Value ? row["nombreEjecutivoGestion"].ToString() : string.Empty,
                descripcionOficinaPagadora = row["OficinaPagadora"] != DBNull.Value ? row["OficinaPagadora"].ToString() : string.Empty,
                descripcionOficinaCurse = row["OficinaCurse"] != DBNull.Value ? row["OficinaCurse"].ToString() : string.Empty,
                descripcionOficinaAuditora = row["OficinaAuditora"] != DBNull.Value ? row["OficinaAuditora"].ToString() : string.Empty,
                descripcionZonaOficinaPagadora = row["ZonaPagadora"] != DBNull.Value ? row["ZonaPagadora"].ToString() : string.Empty,
                descripcionZonaOficinaCurse = row["ZonaCurse"] != DBNull.Value ? row["ZonaCurse"].ToString() : string.Empty,
                descripcionZonaOficinaAuditora = row["ZonaAuditora"] != DBNull.Value ? row["ZonaAuditora"].ToString() : string.Empty,
                Responsable = row["Responsable"] != DBNull.Value ? row["Responsable"].ToString() : string.Empty,



            };


        }



        public static List<DigitalizacionEntity> ListaDigitalizacionMc(DateTime FechaVentaDesde, DateTime FechaVentaHasta, string RutEjecutivo, string Oferta)
        {
            Parametros parametros = new Parametros()
            {

                new Parametro("@FechaVentaDesde", FechaVentaDesde),
                new Parametro("@FechaVentaHasta", FechaVentaHasta),
                new Parametro("@RutEjecutivo",RutEjecutivo),
                 new Parametro("@Oferta",Oferta),
            };


            return DBHelper.InstanceNegocio.ObtenerColeccion("digit.Listar_lead_Mesa_Control", parametros, ConstructorDigitalizacion);
        }


        private static OficinaDerivacionEntity ConstructorZona(DataRow row)
        {
            return new OficinaDerivacionEntity
            {

                Zona = row["zona"] != DBNull.Value ? row["zona"].ToString() : string.Empty,
            };
        }

        private static OficinaDerivacionEntity ConstructorOfiDerivacion(DataRow row)
        {
            return new OficinaDerivacionEntity
            {
                codOficina = row["Cod_Oficina"] != DBNull.Value ? Convert.ToInt32(row["Cod_Oficina"]) : 0,
                DescOficina = row["Oficina"] != DBNull.Value ? row["Oficina"].ToString() : string.Empty,

            };
        }

        public static List<OficinaDerivacionEntity> ListarOficinaAuditor()
        {
            //return DBHelper.InstanceReportes.ObtenerColeccion("negocios.spReporte_ListaPeriodos", ConstructorEntidad);
            return DBHelper.InstanceNegocio.ObtenerColeccion("digit.Listar_Oficina_auditoria", ConstructorOfiDerivacion);
        }

        public static List<OficinaDerivacionEntity> ListarOficinaZona(string Zona)
        {
            Parametros parametros = new Parametros
            {
               new Parametro("@Zona",Zona),

            };
            //return DBHelper.InstanceReportes.ObtenerColeccion("negocios.spReporte_ListaPeriodos", ConstructorEntidad);
            return DBHelper.InstanceNegocio.ObtenerColeccion("digit.Listar_Oficina_Especialista", parametros, ConstructorOfiDerivacion);
        }

        public static List<OficinaDerivacionEntity> ListarZona()
        {
            //return DBHelper.InstanceReportes.ObtenerColeccion("negocios.spReporte_ListaPeriodos", ConstructorEntidad);
            return DBHelper.InstanceNegocio.ObtenerColeccion("digit.Listar_Zona", ConstructorZona);
        }



        public static long ListaConteoMisReparos(int CodOficina, string RutEjecutivo, string Reparo)
        {
            Parametros parametros = new Parametros
            {
               new Parametro("@CodOficina",CodOficina),
               new Parametro("@RutEjecutivo",RutEjecutivo),
               new Parametro("@Reparo",Reparo),
            };

            try
            {
                return DBHelper.InstanceNegocio.ObtenerEscalar<long>("digit.Listar_lead_MisReparos_Conteo", parametros);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


        public static long ListaConteoLeadGeneal(int tipo, string Rutejecutivo)
        {
            Parametros parametros = new Parametros
            {
               new Parametro("@Rutejecutivo",Rutejecutivo),
               new Parametro("@tipo",tipo)

            };

            try
            {
                return DBHelper.InstanceNegocio.ObtenerEscalar<long>("digit.Listar_lead_Conteo", parametros);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public static List<EjecutivoEntity> Listar_Ejecutivo_Asignacion(int Periodo, int CodOficina)
        {
            Parametros parametros = new Parametros
            {
               new Parametro("@periodo",Periodo),
               new Parametro("@CodOficina",CodOficina)
            };

            try
            {
                return DBHelper.InstanceNegocio.ObtenerColeccion("digit.Listar_ejecutivo_Asignacion", parametros, ConstructorEjecutivo);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public static List<EjecutivoEntity> Listar_Ejecutivo_Auditoria(int Periodo, int CodOficina)
        {
            Parametros parametros = new Parametros
            {
               new Parametro("@periodo",Periodo),
               new Parametro("@CodOficina",CodOficina)
            };

            try
            {
                return DBHelper.InstanceNegocio.ObtenerColeccion("digit.Listar_ejecutivo_Asignacion", parametros, ConstructorEjecutivo);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        private static EjecutivoEntity ConstructorEjecutivo(DataRow row)
        {

            return new EjecutivoEntity
            {
                Rut = row["Rut"] != DBNull.Value ? row["Rut"].ToString() : string.Empty,
                Nombre = row["Nombre"] != DBNull.Value ? row["Nombre"].ToString() : string.Empty

            };
        }





        public static List<DigitalizacionEntity> ListaDigitalizacion(long Id, string Credito, string Estado, DateTime FechaVentaDesde, DateTime FechaVentaHasta, int Oficina, int Tipo, string Rut, string Filtro, string ejecutivo)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@Id",Id),
                new Parametro("@CodOficina", Oficina),
                new Parametro("@Credito", Credito),
                new Parametro("@Estado", Estado),
                new Parametro("@FechaVentaDesde", FechaVentaDesde),
                new Parametro("@FechaVentaHasta", FechaVentaHasta),
                new Parametro("@Tipo", Tipo),
                new Parametro("@Rut", Rut),
                new Parametro("@Filtro", Filtro),
                new Parametro("@RutEjecutivo", ejecutivo)
            };


            return DBHelper.InstanceNegocio.ObtenerColeccion("digit.Listar_lead", parametros, ConstructorDigitalizacion);
        }


        public static List<DigitalizacionEntity> ListarAuditorDocInicial(DateTime FechaVentaDesde, DateTime FechaVentaHasta, int Oficina, int Tipo, string Filtro, string Ejecutivo)
        {

            Parametros parametros = new Parametros()
            {
                new Parametro("@CodOficina", Oficina),
                new Parametro("@FechaVentaDesde", FechaVentaDesde),
                new Parametro("@FechaVentaHasta", FechaVentaHasta),
                new Parametro("@Tipo", Tipo),
                new Parametro("@Filtro", Filtro),
                new Parametro("@RutEjecutivo", Ejecutivo)
            };

            try
            {
                return DBHelper.InstanceNegocio.ObtenerColeccion("digit.Listar_lead_Auditor", parametros, ConstructorDigitalizacionAgente);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


        public static List<DigitalizacionEntity> ListaDigitalizacionAgente(string RutEjecutivo, DateTime FechaVentaDesde, DateTime FechaVentaHasta, int Oficina, int Tipo, string Filtro, string Rut, string Credito, string Oferta, string Estado)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@RutEjecutivo",RutEjecutivo),
                new Parametro("@FechaVentaDesde", FechaVentaDesde),
                new Parametro("@FechaVentaHasta", FechaVentaHasta),
                new Parametro("@CodOficina", Oficina),
                new Parametro("@Tipo", Tipo),
                new Parametro("@Filtro", Filtro),
                new Parametro("@Rut",Rut),
                new Parametro("@Credito",Credito),
                new Parametro("@Oferta",Oferta),
                new Parametro("@Estado",Estado)


            };
            try
            {
                return DBHelper.InstanceNegocio.ObtenerColeccion("digit.Listar_lead_Agente_Nuevo", parametros, ConstructorDigitalizacionAgente);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }


        private static DigitalizacionEntity ConstructorDigitalizacion(DataRow row)
        {

            return new DigitalizacionEntity
            {
                Id = row["Id"] != DBNull.Value ? Convert.ToInt64(row["Id"]) : 0,
                RutAfiliado = row["RutAfiliado"] != DBNull.Value ? row["RutAfiliado"].ToString() : string.Empty,
                NombreAfiliado = row["NombreAfiliado"] != DBNull.Value ? row["NombreAfiliado"].ToString() : string.Empty,
                Oferta = row["Oferta"] != DBNull.Value ? row["Oferta"].ToString() : string.Empty,
                Folio = row["Folio"] != DBNull.Value ? row["Folio"].ToString() : string.Empty,
                EstadoGestion = row["EstadoGestion"] != DBNull.Value ? row["EstadoGestion"].ToString() : string.Empty,
                FechaVenta = row["FechaVenta"] != DBNull.Value ? Convert.ToDateTime(row["FechaVenta"]) : new DateTime(1900, 1, 1),
                Tipo = row["Tipo"] != DBNull.Value ? Convert.ToInt32(row["Tipo"].ToString()) : 0,
                Oficina = row["Oficina"] != DBNull.Value ? Convert.ToInt32(row["Oficina"].ToString()) : 0,
                RutEjecutivo = row["RutEjecutivo"] != DBNull.Value ? row["RutEjecutivo"].ToString() : string.Empty,
                FechaRegistro = row["FechaRegistro"] != DBNull.Value ? Convert.ToDateTime(row["FechaRegistro"]) : new DateTime(1900, 1, 1),
                TipoDescripcion = row["TipoDocumento"] != DBNull.Value ? row["TipoDocumento"].ToString() : string.Empty,

            };


        }

        private static DigitalizacionEntity ConstructorDigitalizacionAgente(DataRow row)
        {
            try
            {
                return new DigitalizacionEntity
                {
                    Id = row["Id"] != DBNull.Value ? Convert.ToInt64(row["Id"]) : 0,
                    RutAfiliado = row["RutAfiliado"] != DBNull.Value ? row["RutAfiliado"].ToString() : string.Empty,
                    NombreAfiliado = row["NombreAfiliado"] != DBNull.Value ? row["NombreAfiliado"].ToString() : string.Empty,
                    Oferta = row["Oferta"] != DBNull.Value ? row["Oferta"].ToString() : string.Empty,
                    Folio = row["Folio"] != DBNull.Value ? row["Folio"].ToString() : string.Empty,
                    EstadoGestion = row["EstadoGestion"] != DBNull.Value ? row["EstadoGestion"].ToString() : string.Empty,
                    FechaVenta = row["FechaVenta"] != DBNull.Value ? Convert.ToDateTime(row["FechaVenta"]) : new DateTime(1900, 1, 1),
                    Tipo = row["Tipo"] != DBNull.Value ? Convert.ToInt32(row["Tipo"].ToString()) : 0,
                    Oficina = row["Oficina"] != DBNull.Value ? Convert.ToInt32(row["Oficina"].ToString()) : 0,
                    RutEjecutivo = row["RutEjecutivo"] != DBNull.Value ? row["RutEjecutivo"].ToString() : string.Empty,
                    FechaRegistro = row["FechaRegistro"] != DBNull.Value ? Convert.ToDateTime(row["FechaRegistro"]) : new DateTime(1900, 1, 1),
                    TipoDescripcion = row["TipoDocumento"] != DBNull.Value ? row["TipoDocumento"].ToString() : string.Empty,
                    RutejecutivoAgente = row["RutEjecutivoAsignacion"] != DBNull.Value ? row["RutEjecutivoAsignacion"].ToString() : string.Empty,
                    NombreEjecutivo = row["NombreEjecutivo"] != DBNull.Value ? row["NombreEjecutivo"].ToString() : string.Empty,

                };
            }
            catch (Exception ex)
            {

                throw ex ;
            }
            


        }


        public static long Ingresar_Digitalizacion(WebGestionDigitalizacion web)
        {


            Parametros parametros = new Parametros
            {
                new Parametro("@Id_lead", web.Id_lead),
                new Parametro("@Id_Estado", web.Id_Estado),
                new Parametro("@Auditor", web.Auditor),
                new Parametro("@RutEjecutivo", web.RutEjecutivo),
                new Parametro("@Tipo_Gestion",web.Tipo_Gestion),
                new Parametro("@LiquidacionSueldo",web.LiquidacionSueldo),
                new Parametro("@InformeCuotas", web.InformeCuotas),
                new Parametro("@SolicitudCredito", web.SolicitudCredito),
                new Parametro("@Certificacion", web.Certificacion),
                new Parametro("@HojaResumen", web.HojaResumen),
                new Parametro("@CompobanteDinero", web.CompobanteDinero),
                new Parametro("@CheckListDigitalizacion", web.CheckListDigitalizacion),
                new Parametro("@InformacionAval",web.InformacionAval),
                new Parametro("@Afecto15", web.Afecto15),
                new Parametro("@SeguroDesgravamen", web.SeguroDesgravamen),
                new Parametro("@SeguroCesantia", web.SeguroCesantia),
            };

            try
            {
                return DBHelper.InstanceNegocio.ObtenerEscalar<long>("digit.Ingresar_Gestion", parametros);

            }
            catch (Exception ex)
            {

                throw ex;
            }


        }

        public static long Ingresar_DigitalizacionAuditoria(WebGestionDigitalizacion web)
        {


            Parametros parametros = new Parametros
            {
                new Parametro("@Id_lead", web.Id_lead),
                new Parametro("@Id_Estado", web.Id_Estado),
                new Parametro("@Auditor", web.Auditor),
                new Parametro("@RutEjecutivo", web.RutEjecutivo),
                new Parametro("@Tipo_Gestion",web.Tipo_Gestion),
                new Parametro("@LiquidacionSueldo",web.LiquidacionSueldo),
                new Parametro("@InformeCuotas", web.InformeCuotas),
                new Parametro("@SolicitudCredito", web.SolicitudCredito),
                new Parametro("@Certificacion", web.Certificacion),
                new Parametro("@HojaResumen", web.HojaResumen),
                new Parametro("@CompobanteDinero", web.CompobanteDinero),
                new Parametro("@CheckListDigitalizacion", web.CheckListDigitalizacion),
                new Parametro("@InformacionAval",web.InformacionAval),
                new Parametro("@Afecto15", web.Afecto15),
                new Parametro("@SeguroDesgravamen", web.SeguroDesgravamen),
                new Parametro("@SeguroCesantia", web.SeguroCesantia),
            };

            try
            {
                return DBHelper.InstanceNegocio.ObtenerEscalar<long>("digit.Ingresar_Gestion_Auditoria", parametros);

            }
            catch (Exception ex)
            {

                throw ex;
            }


        }

        public static long ActualizarGestionEJecutvo(WebGestionDigitalizacion web)
        {


            Parametros parametros = new Parametros
            {
                new Parametro("@Id_Lead", web.Id_lead),
                new Parametro("@Tipo", web.Tipo_Gestion),
                new Parametro("@RutEjecutivo", web.RutEjecutivo),
                new Parametro("@CodOficina", web.Oficina),
                new Parametro("@TipoUpdate", web.TipoEjecutivo),


            };

            try
            {
                return DBHelper.InstanceNegocio.ObtenerEscalar<long>("digit.Actualizar_Gestion_Ejecutivo", parametros);

            }
            catch (Exception ex)
            {

                throw ex;
            }


        }

        public static long Ingresar_Digitalizacion_Pagare(WebGestionDigitalizacion web)
        {


            Parametros parametros = new Parametros
            {
                new Parametro("@Id_lead", web.Id_lead),
                new Parametro("@Id_Estado", web.Id_Estado),
                new Parametro("@Auditor", web.Auditor),
                new Parametro("@RutEjecutivo", web.RutEjecutivo),
                new Parametro("@Tipo_Gestion",web.Tipo_Gestion),
                new Parametro("@Pagare",web.Pagare),
                new Parametro("@Cedula", web.Cedula),

            };

            try
            {
                return DBHelper.InstanceNegocio.ObtenerEscalar<long>("digit.Ingresar_Gestion_Pagare", parametros);

            }
            catch (Exception ex)
            {

                throw ex;
            }


        }

        public static DigitalizacionGestionEntity ListaDigitalizacionGestionAuditoria(long Id)
        {
            Parametros parametros = new Parametros()
            {
               new Parametro("@Id",Id),


            };


            return DBHelper.InstanceNegocio.ObtenerEntidad("digit.Listar_Gestion_auditoria", parametros, ConstructorDigitalizacionGestion);
        }

        public static DigitalizacionGestionEntity ListaDigitalizacionGestion(long Id)
        {
            Parametros parametros = new Parametros()
            {
               new Parametro("@Id",Id),


            };


            return DBHelper.InstanceNegocio.ObtenerEntidad("digit.Listar_gestion_Nuevo", parametros, ConstructorDigitalizacionGestion);
        }




        private static DigitalizacionGestionEntity ConstructorDigitalizacionGestion(DataRow row)
        {

            return new DigitalizacionGestionEntity
            {
                Id = row["Id"] != DBNull.Value ? Convert.ToInt64(row["Id"]) : 0,
                RutAfiliado = row["RutAfiliado"] != DBNull.Value ? row["RutAfiliado"].ToString() : string.Empty,
                NombreAfiliado = row["NombreAfiliado"] != DBNull.Value ? row["NombreAfiliado"].ToString() : string.Empty,
                Oferta = row["Oferta"] != DBNull.Value ? row["Oferta"].ToString() : string.Empty,
                Folio = row["Folio"] != DBNull.Value ? row["Folio"].ToString() : string.Empty,
                Id_Estado = row["Id_Estado"] != DBNull.Value ? Convert.ToInt32(row["Id_Estado"].ToString()) : 0,
                Id_lead = row["Id_lead"] != DBNull.Value ? Convert.ToInt64(row["Id_lead"]) : 0,
                FechaGestion = row["FechaGestion"] != DBNull.Value ? Convert.ToDateTime(row["FechaGestion"]) : new DateTime(1900, 1, 1),
                Tipo = row["Tipo"] != DBNull.Value ? Convert.ToInt32(row["Tipo"].ToString()) : 0,
                RutEjecutivo = row["RutEjecutivo"] != DBNull.Value ? row["RutEjecutivo"].ToString() : string.Empty,
                Auditor = row["Auditor"] != DBNull.Value ? Convert.ToInt32(row["Auditor"].ToString()) : 0,
                Afecto15 = row["Afecto15"] != DBNull.Value ? Convert.ToInt32(row["Afecto15"].ToString()) : 0,
                Certificacion = row["Certificacion"] != DBNull.Value ? Convert.ToInt32(row["Certificacion"].ToString()) : 0,
                HojaResumen = row["HojaResumen"] != DBNull.Value ? Convert.ToInt32(row["HojaResumen"].ToString()) : 0,
                InformacionAval = row["InformacionAval"] != DBNull.Value ? Convert.ToInt32(row["InformacionAval"].ToString()) : 0,
                InformeCuotas = row["InformeCuotas"] != DBNull.Value ? Convert.ToInt32(row["InformeCuotas"].ToString()) : 0,
                LiquidacionSueldo = row["LiquidacionSueldo"] != DBNull.Value ? Convert.ToInt32(row["LiquidacionSueldo"].ToString()) : 0,
                SeguroCesantia = row["SeguroCesantia"] != DBNull.Value ? Convert.ToInt32(row["SeguroCesantia"].ToString()) : 0,
                SeguroDesgravamen = row["SeguroDesgravamen"] != DBNull.Value ? Convert.ToInt32(row["SeguroDesgravamen"].ToString()) : 0,
                EstadoGestion = row["EstadoGestion"] != DBNull.Value ? row["EstadoGestion"].ToString() : string.Empty,
                SolicitudCredito = row["SolicitudCredito"] != DBNull.Value ? Convert.ToInt32(row["SolicitudCredito"].ToString()) : 0,
                CheckListDigitalizacion = row["CheckListDigitalizacion"] != DBNull.Value ? Convert.ToInt32(row["CheckListDigitalizacion"].ToString()) : 0,
                ComprobanteDinero = row["ComprobanteDinero"] != DBNull.Value ? Convert.ToInt32(row["ComprobanteDinero"].ToString()) : 0,
                Pagare = row["RevisionPagare"] != DBNull.Value ? Convert.ToInt32(row["RevisionPagare"].ToString()) : 0,
                Cedula = row["RevisionCI"] != DBNull.Value ? Convert.ToInt32(row["RevisionCI"].ToString()) : 0,
                OficinaPagadora = row["OficinaPagadora"] != DBNull.Value ? row["OficinaPagadora"].ToString() : string.Empty,
                OficinaVenta = row["OficinaVenta"] != DBNull.Value ? row["OficinaVenta"].ToString() : string.Empty,
                OficinaAuditora = row["OficinaAuditora"] != DBNull.Value ? row["OficinaAuditora"].ToString() : string.Empty,
                ObsLiquidacionSueldo = row["ObsLiquidacionSueldo"] != DBNull.Value ? Convert.ToInt32(row["ObsLiquidacionSueldo"].ToString()) : 0,
                ObsInformeCuotas = row["ObsInformeCuotas"] != DBNull.Value ? Convert.ToInt32(row["ObsInformeCuotas"].ToString()) : 0,
                ObsSolicitudCredito = row["ObsSolicitudCredito"] != DBNull.Value ? Convert.ToInt32(row["ObsSolicitudCredito"].ToString()) : 0,
                ObsCertificacion = row["ObsCertificacion"] != DBNull.Value ? Convert.ToInt32(row["ObsCertificacion"].ToString()) : 0,
                ObsHojaResumen = row["ObsHojaResumen"] != DBNull.Value ? Convert.ToInt32(row["ObsHojaResumen"].ToString()) : 0,
                ObsCompobanteDinero = row["ObsCompobanteDinero"] != DBNull.Value ? Convert.ToInt32(row["ObsCompobanteDinero"].ToString()) : 0,
                ObsCheckListDigitalizacion = row["ObsCheckListDigitalizacion"] != DBNull.Value ? Convert.ToInt32(row["ObsCheckListDigitalizacion"].ToString()) : 0,
                ObsInformacionAval = row["ObsInformacionAval"] != DBNull.Value ? Convert.ToInt32(row["ObsInformacionAval"].ToString()) : 0,
                ObsAfecto15 = row["ObsAfecto15"] != DBNull.Value ? Convert.ToInt32(row["ObsAfecto15"].ToString()) : 0,
                ObsSeguroDesgravamen = row["ObsSeguroDesgravamen"] != DBNull.Value ? Convert.ToInt32(row["ObsSeguroDesgravamen"].ToString()) : 0,
                ObsSeguroCesantia = row["ObsSeguroCesantia"] != DBNull.Value ? Convert.ToInt32(row["ObsSeguroCesantia"].ToString()) : 0,
                ObsPagare = row["ObsPagare"] != DBNull.Value ? Convert.ToInt32(row["ObsPagare"].ToString()) : 0,
                ObsCI = row["ObsCI"] != DBNull.Value ? Convert.ToInt32(row["ObsCI"].ToString()) : 0,
                Zona = row["Zona"] != DBNull.Value ? row["Zona"].ToString() : string.Empty,

            };


        }

        public static List<DigitalizacionEntity> ListaDigitalizacionReparoAgente(string RutEjecutivo, DateTime FechaVentaDesde, DateTime FechaVentaHasta, int Oficina, int Tipo, string Filtro, string Rut, string Credito, string Oferta, string Estado)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@RutEjecutivo",RutEjecutivo),
                new Parametro("@FechaVentaDesde", FechaVentaDesde),
                new Parametro("@FechaVentaHasta", FechaVentaHasta),
                new Parametro("@CodOficina", Oficina),
                new Parametro("@Tipo", Tipo),
                new Parametro("@Filtro", Filtro),
                new Parametro("@Rut",Rut),
                new Parametro("@Credito",Credito),
                new Parametro("@Oferta",Oferta),
                new Parametro("@Estado",Estado)
            };


            return DBHelper.InstanceNegocio.ObtenerColeccion("digit.Listar_Reparos_Agente_Nuevo", parametros, ConstructorDigitalizacionAgente);
        }

        public static List<DigitalizacionEntity> ListaDigitalizacionMisReparos(long Id, string Rut, string Credito, int Oficina, string RutEjecutivo, string Reparo)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@Id",Id),
                new Parametro("@CodOficina", Oficina),
                new Parametro("@Credito", Credito),
                new Parametro("@Rut", Rut),
                new Parametro("@RutEjecutivo", RutEjecutivo),
                new Parametro("@Reparo", Reparo)
            };


            return DBHelper.InstanceNegocio.ObtenerColeccion("digit.Listar_lead_MisReparos", parametros, ConstructorDigitalizacion);
        }

        public static long Ingresar_Digitalizacion_Audtoria(long Id, int Tipo, int CodOficina, string RutEjecutivo, int auditor)
        {


            Parametros parametros = new Parametros
            {
                new Parametro("@Id_lead", Id),
                new Parametro("@Tipo",Tipo ),
                new Parametro("@CodOficina",CodOficina),
                new Parametro("@RutEjecutivo",RutEjecutivo),
                 new Parametro("@Auditor",auditor)
            };

            return DBHelper.InstanceNegocio.ObtenerEscalar<long>("digit.Ingresar_Lead_Gestion_MisReparos", parametros);
        }

        public static long Ingresar_Digitalizacion_Observaciones(WebGestionDigitalizacion web)
        {


            Parametros parametros = new Parametros
            {
              new Parametro("@Id_gestion", web.Id_Gestion),
              new Parametro("@ObsLiquidacionSueldo", web.ObsLiquidacionSueldo),
              new Parametro("@ObsInformeCuotas", web.ObsInformeCuotas),
              new Parametro("@ObsSolicitudCredito", web.ObsSolicitudCredito),
              new Parametro("@ObsCertificacion", web.ObsCertificacion),
              new Parametro("@ObsHojaResumen", web.ObsHojaResumen),
              new Parametro("@ObsCompobanteDinero", web.ObsCompobanteDinero),
              new Parametro("@ObsCheckListDigitalizacion", web.ObsCheckListDigitalizacion),
              new Parametro("@ObsInformacionAval", web.ObsInformacionAval),
              new Parametro("@ObsAfecto15", web.ObsAfecto15),
              new Parametro("@ObsSeguroDesgravamen", web.ObsSeguroDesgravamen),
              new Parametro("@ObsSeguroCesantia", web.ObsSeguroCesantia),
              new Parametro("@ObsPagare", web.ObsPagare),
              new Parametro("@ObsCI", web.ObsCI)


            };

            return DBHelper.InstanceNegocio.ObtenerEscalar<long>("digit.Ingresar_Lead_Gestion_Obervaciones", parametros);
        }


    }
}
