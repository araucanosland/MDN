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


        public static long ListaConteoMisReparos(int CodOficina,string RutEjecutivo,string Reparo)
        {
            Parametros parametros = new Parametros
            {
               new Parametro("@CodOficina",CodOficina),
               new Parametro("@RutEjecutivo",RutEjecutivo),
               new Parametro("@Reparo",Reparo),
            };

            try
            {
                return DBHelper.InstanceNegocio.ObtenerEscalar<long>("digit.Listar_MisReparos_Conteo", parametros);

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
                return DBHelper.InstanceNegocio.ObtenerColeccion("digit.Listar_ejecutivo_Asignacion", parametros,ConstructorEjecutivo);

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





        public static List<DigitalizacionEntity> ListaDigitalizacion(long Id, string Credito, string Estado, DateTime FechaVentaDesde, DateTime FechaVentaHasta, int Oficina, int Tipo, string Rut, string Filtro,string ejecutivo)
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


        public static List<DigitalizacionEntity> ListaDigitalizacionAgente(string RutEjecutivo, DateTime FechaVentaDesde, DateTime FechaVentaHasta, int Oficina, int Tipo, string Filtro)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@RutEjecutivo",RutEjecutivo),
                new Parametro("@FechaVentaDesde", FechaVentaDesde),
                new Parametro("@FechaVentaHasta", FechaVentaHasta),
                new Parametro("@CodOficina", Oficina),
                new Parametro("@Tipo", Tipo),
                new Parametro("@Filtro", Filtro)
            };


            return DBHelper.InstanceNegocio.ObtenerColeccion("digit.Listar_lead_Agente", parametros, ConstructorDigitalizacionAgente);
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
                NombreEjecutivo= row["NombreEjecutivo"] != DBNull.Value ? row["NombreEjecutivo"].ToString() : string.Empty,
            };


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

        public static DigitalizacionGestionEntity ListaDigitalizacionGestion(long Id)
        {
            Parametros parametros = new Parametros()
            {
               new Parametro("@Id",Id),


            };


            return DBHelper.InstanceNegocio.ObtenerEntidad("digit.Listar_gestion", parametros, ConstructorDigitalizacionGestion);
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
                OficinaAuditora= row["OficinaAuditora"] != DBNull.Value ? row["OficinaAuditora"].ToString() : string.Empty
            };


        }

        public static List<DigitalizacionEntity> ListaDigitalizacionReparoAgente(string RutEjecutivo, DateTime FechaVentaDesde, DateTime FechaVentaHasta, int Oficina, int Tipo, string Filtro)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@RutEjecutivo",RutEjecutivo),
                new Parametro("@FechaVentaDesde", FechaVentaDesde),
                new Parametro("@FechaVentaHasta", FechaVentaHasta),
                new Parametro("@CodOficina", Oficina),
                new Parametro("@Tipo", Tipo),
                new Parametro("@Filtro", Filtro)
            };


            return DBHelper.InstanceNegocio.ObtenerColeccion("digit.Listar_Reparos_Agente", parametros, ConstructorDigitalizacionAgente);
        }

        public static List<DigitalizacionEntity> ListaDigitalizacionMisReparos(long Id, string Rut, string Credito, int Oficina,string RutEjecutivo,string Reparo)
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


            return DBHelper.InstanceNegocio.ObtenerColeccion("digit.Listar_MisReparos", parametros, ConstructorDigitalizacion);
        }

        public static long Ingresar_Digitalizacion_Audtoria(long Id, int Tipo, int CodOficina, string RutEjecutivo)
        {


            Parametros parametros = new Parametros
            {
                new Parametro("@Id_lead", Id),
                new Parametro("@Tipo",Tipo ),
                new Parametro("@CodOficina",CodOficina),
                new Parametro("@RutEjecutivo",RutEjecutivo)
            };
            try
            {
                return DBHelper.InstanceNegocio.ObtenerEscalar<long>("digit.Ingresar_Gestion_MisReparos", parametros);

            }
            catch (Exception ex)
            {

                throw ex;
            }


        }

    }
}
