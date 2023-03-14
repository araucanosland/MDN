using CDK.Data;
using CDK.Integration;
using CRM.Business.Entity;
using System;
using System.Collections.Generic;
using System.Data;

namespace CRM.Business.Data
{
    public class CargasFamiliaresDataAccess
    {
        #region constructor
        private static CargasFamiliaresEntity ConstructorEntidad(DataRow row)
        {
            return new CargasFamiliaresEntity
            {
                //Id = row["Id"] != DBNull.Value ? Convert.ToInt32(row["Id"]) : 0,
                NombresAfiliado = row["NombreAfiliado"] != DBNull.Value ? row["NombreAfiliado"].ToString() : string.Empty,
                RutAfiliado = row["RutAfiliado"] != DBNull.Value ? row["RutAfiliado"].ToString() : string.Empty,
                ApellidosAfiliado = row["ApellidoAfiliado"] != DBNull.Value ? row["ApellidoAfiliado"].ToString() : string.Empty,
                CodOficina = row["CodOficina"] != DBNull.Value ? Convert.ToInt32(row["CodOficina"]) : 0,
                cantidadCarga = row["NCargas"] != DBNull.Value ? Convert.ToInt32(row["NCargas"]) : 0,
                Estadogestion = row["Estadogestion"] != DBNull.Value ? row["Estadogestion"].ToString() : string.Empty,
                 RutEmpresa = row["RutEmpresa"] != DBNull.Value ? row["RutEmpresa"].ToString() : string.Empty,
                 NombreEmpresa = row["NombreEmpresa"] != DBNull.Value ? row["NombreEmpresa"].ToString() : string.Empty
                //RutCarga = row["RutCarga"] != DBNull.Value ? row["RutCarga"].ToString() : string.Empty,
                //NombreCarga = row["NombreCarga"] != DBNull.Value ? row["NombreCarga"].ToString() : string.Empty,
                //ApellidoCarga = row["ApellidoCarga"] != DBNull.Value ? row["ApellidoCarga"].ToString() : string.Empty,
                //EstadoCarga = row["EstadoCarga"] != DBNull.Value ? row["EstadoCarga"].ToString() : string.Empty,
                //EstadoPagoCarga = row["EstadoPagoCarga"] != DBNull.Value ? row["EstadoPagoCarga"].ToString() : string.Empty,
                //NumeroCarga = row["NumeroCarga"] != DBNull.Value ? Convert.ToInt32(row["NumeroCarga"]) : 0,
                //FechaNacimientoCarga = row["FechaNacimientoCarga"] != DBNull.Value ? Convert.ToDateTime(row["FechaNacimientoCarga"]) : new DateTime(1900, 1, 1),
                //FechaVencimientoCarga = row["FechaVencimientoCarga"] != DBNull.Value ? Convert.ToDateTime(row["FechaVencimientoCarga"]) : new DateTime(1900, 1, 1),
                //FechaPrimeraAutorizacion = row["FechaPrimeraAutorizacion"] != DBNull.Value ? Convert.ToDateTime(row["FechaPrimeraAutorizacion"]) : new DateTime(1900, 1, 1),
                //FechaUltimaAutorizacion = row["FechaUltimaAutorizacion"] != DBNull.Value ? Convert.ToDateTime(row["FechaUltimaAutorizacion"]) : new DateTime(1900, 1, 1),

            };
        }
        #endregion

        #region constructor
        private static CargasFamiliaresEntity ConstructorCargas(DataRow row)
        {
            try
            {
                return new CargasFamiliaresEntity
                {
                    //Id = row["Id"] != DBNull.Value ? Convert.ToInt32(row["Id"]) : 0,
                    NombresAfiliado = row["NombreAfiliado"] != DBNull.Value ? row["NombreAfiliado"].ToString() : string.Empty,
                    RutAfiliado = row["RutAfiliado"] != DBNull.Value ? row["RutAfiliado"].ToString() : string.Empty,
                    ApellidosAfiliado = row["ApellidoAfiliado"] != DBNull.Value ? row["ApellidoAfiliado"].ToString() : string.Empty,
                    CodOficina = row["CodOficina"] != DBNull.Value ? Convert.ToInt32(row["CodOficina"]) : 0,
                    cantidadCarga = row["NCargas"] != DBNull.Value ? Convert.ToInt32(row["NCargas"]) : 0,
                    RutCarga = row["RutCarga"] != DBNull.Value ? row["RutCarga"].ToString() : string.Empty,
                    NombreCarga = row["NombreCarga"] != DBNull.Value ? row["NombreCarga"].ToString() : string.Empty,
                    ApellidoCarga = row["ApellidoCarga"] != DBNull.Value ? row["ApellidoCarga"].ToString() : string.Empty,
                    EstadoCarga = row["EstadoCarga"] != DBNull.Value ? row["EstadoCarga"].ToString() : string.Empty,
                    EstadoPagoCarga = row["EstadoPagoCarga"] != DBNull.Value ? row["EstadoPagoCarga"].ToString() : string.Empty,
                    NumeroCarga = row["NumeroCarga"] != DBNull.Value ? Convert.ToInt32(row["NumeroCarga"]) : 0,
                    FechaNacimientoCarga = row["FechaNacimientoCarga"] != DBNull.Value ? Convert.ToDateTime(row["FechaNacimientoCarga"]) : new DateTime(1900, 1, 1),
                    FechaVencimientoCarga = row["FechaVencimientoCarga"] != DBNull.Value ? Convert.ToDateTime(row["FechaVencimientoCarga"]) : new DateTime(1900, 1, 1),
                    FechaPrimeraAutorizacion = row["FechaPrimeraAutorizacion"] != DBNull.Value ? Convert.ToDateTime(row["FechaPrimeraAutorizacion"]) : new DateTime(1900, 1, 1),
                    FechaUltimaAutorizacion = row["FechaUltimaAutorizacion"] != DBNull.Value ? Convert.ToDateTime(row["FechaUltimaAutorizacion"]) : new DateTime(1900, 1, 1),
                    NombreEmpresa= row["NombreEmpresa"] != DBNull.Value ? row["NombreEmpresa"].ToString() : string.Empty,
                 //   RutEmpresa = row["RutEmpresa"] != DBNull.Value ? row["RutEmpresa"].ToString() : string.Empty,
                    CodigoCausante = row["CodigoCausante"] != DBNull.Value ? row["CodigoCausante"].ToString() : string.Empty,
                    IdEstadoGestion= row["IdEstadoGestion"] != DBNull.Value ? row["IdEstadoGestion"].ToString() : string.Empty,
                    Estadogestion = row["Estadogestion"] != DBNull.Value ? row["Estadogestion"].ToString() : string.Empty
                };
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }
        #endregion
        public static List<CargasFamiliaresEntity> obtenerCargasFamiliaresByOficina(int codOficina)
        {

            Parametros pram = new Parametros
            {
                new Parametro("@p_codigoOficina", codOficina)
            };
            return DBHelper.InstanceCRM.ObtenerColeccion("dbo.spMotor_Listar_Cargas_FamiliaresByOficina", pram, ConstructorEntidad);




        }

        public static List<CargasFamiliaresEntity> obtenerCargasFamiliaresByAfiliado(string rutAfiliado)
        {

            Parametros pram = new Parametros
            {
                new Parametro("@p_RutAfiliado", rutAfiliado)
            };
            return DBHelper.InstanceCRM.ObtenerColeccion("dbo.spMotor_Listar_Cargas_FamiliaresByrutAfiliado", pram, ConstructorCargas);




        }


        public static int ActualizarCargasEstados (string rutAfiliado, string codOficina, string rutCarga, int Indice)
        {
            try
            {
             Parametros pram = new Parametros
            {
                new Parametro("@p_RutAfiliado", rutAfiliado),
                new Parametro("@p_codOficina", codOficina),
                new Parametro("@p_rutCarga", rutCarga),
                new Parametro("@p_Indice", Indice)
            };
                return DBHelper.InstanceCRM.EjecutarProcedimiento("dbo.spMotor_actulizar_estado_cargas_familiares", pram);
            }
            catch (Exception ex )
            {

                throw ex ;
            }
   




        }
    }
}
