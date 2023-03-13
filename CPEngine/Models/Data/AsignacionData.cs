using System;
using System.Collections.Generic;
using System.Data;
using CPEngine.Models.Entity;
using CDK.Integration;
using CDK.Data;

//------------------------------------------------------------------------------
// <generado automáticamente>
//     Este código fue generado por una herramienta.
//
//     Los cambios en este archivo podrían causar un comportamiento incorrecto y se perderán si
//     se vuelve a generar el código.
// </generado automáticamente>
//------------------------------------------------------------------------------

namespace CPEngine.Models.Data
{
    /// <summary>
    /// Clase Acceso de Datos AsignacionData
    /// </summary>
    /// <author>@Charly</author>
    /// <created>05-09-2017 15:44:07</created>
    /// <remarks>
    /// Esta clase fué generada automáticamente por una herramienta.
    /// </remarks>
    public class AsignacionData
    {
        #region metodos base

        /// <summary>
        /// Guarda la entidad de dominio <see cref="AsignacionEntity"/> en la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 15:44:07</created>
        /// <param name="asignacion">Referencia a una clase <see cref="AsignacionEntity"/>.</param>
        /// <returns>Clave primaria resultante de la operación</returns>
        public static long Guardar(AsignacionEntity asignacion)
        {
            Parametros parametros = new Parametros
            {
                new Parametro("@CodAsignacion", asignacion.CodAsignacion),
                new Parametro("@CodCamp", asignacion.CodCamp),
                new Parametro("@RutEntidad", asignacion.RutEntidad),
                new Parametro("@RutEjecutivo", asignacion.RutEjecutivo),

            };

            return DBHelper.InstanceEngine.ObtenerEscalar<long>("engine.sp_Asignacion_Guardar", parametros);
        }

        /// <summary>
        /// Recupera una entidad <see cref="AsignacionEntity"/> de la Base de Datos dado un ID de AsignacionEntity
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 15:44:07</created>
        /// <param name="CodAsignacion">ID de AsignacionEntity.</param>
        /// <returns>Referencia a una clase <see cref="AsignacionEntity"/>.</returns>
        public static AsignacionEntity ObtenerPorID(long CodAsignacion)
        {
            Parametro parametro = new Parametro("@CodAsignacion", CodAsignacion);
            return DBHelper.InstanceEngine.ObtenerEntidad("engine.sp_Asignacion_ObtenerPorID", parametro, ConstructorEntidad);
        }

        /// <summary>
        /// Lista todas las entidades <see cref="AsignacionEntity"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 15:44:07</created>
        /// <returns><see cref="DataTable"/> con todos los objetos.</returns>
        public static DataTable Listar()
        {
            return DBHelper.InstanceEngine.ObtenerDataTable("engine.sp_Asignacion_Listar");
        }

        /// <summary>
        /// Recupera todas las entidades <see cref="AsignacionEntity"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 15:44:07</created>
        /// <returns>Lista con todas las entidades <see cref="AsignacionEntity"/>.</returns>
        public static List<AsignacionEntity> ObtenerEntidades()
        {
            return DBHelper.InstanceEngine.ObtenerColeccion("engine.sp_Asignacion_Listar", ConstructorEntidad);
        }

        #endregion

        #region metodos adicionales


        /// <summary>
        /// Recupera todas las entidades <see cref="AsignacionEntity"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 15:44:07</created>
        /// <returns>Lista con todas las entidades <see cref="AsignacionEntity"/>.</returns>
        public static List<AsignacionEntity> ObtenerEntidadesByEjecutivo(string rutEjecutivo, int codCamp)
        {
            Parametros parametros = new Parametros
            {
                new Parametro("@CodCamp", codCamp),
                new Parametro("@RutEjecutivo", rutEjecutivo),
            };

            return DBHelper.InstanceEngine.ObtenerColeccion("engine.sp_Asignacion_ListarByEjecutivo", parametros, ConstructorEntidad);
        }


        /// <summary>
        /// Recupera todas las entidades <see cref="AsignacionEntity"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 15:44:07</created>
        /// <returns>Lista con todas las entidades <see cref="AsignacionEntity"/>.</returns>
        public static List<AsignacionEntity> ObtenerEntidadesByEjecutivoE(string rutEjecutivo, int codCamp, string rutEmpresa)
        {
            Parametros parametros = new Parametros
            {
                new Parametro("@CodCamp", codCamp),
                new Parametro("@RutEjecutivo", rutEjecutivo),
                new Parametro("@RutEmpresa", rutEmpresa)
            };

            return DBHelper.InstanceEngine.ObtenerColeccion("engine.sp_Asignacion_ListarByEjecutivoEmpresa", parametros, ConstructorEntidad);
        }


        public static long EnvioStackEmpresa(string rutEmpresa, int Oficina, string nombreEmpresa)
        {
            Parametros parametros = new Parametros
            {
                new Parametro("@EmpresaRut",rutEmpresa ),
                new Parametro("@Oficina",Oficina ),
                new Parametro("@EmpresaNombre",nombreEmpresa ),
            };

            return DBHelper.InstanceEngine.ObtenerEscalar<long>("engine.sp_Envio_EnviarStackEmpresa", parametros);
        }
        

        #endregion

        #region constructor
        private static AsignacionEntity ConstructorEntidad(DataRow row)
        {
            return new AsignacionEntity
            {
                CodAsignacion = row["CodAsignacion"] != DBNull.Value ? Convert.ToInt64(row["CodAsignacion"]) : 0,
                CodCamp = row["CodCamp"] != DBNull.Value ? Convert.ToInt32(row["CodCamp"]) : 0,
                RutEntidad = row["RutEntidad"] != DBNull.Value ? Convert.ToInt32(row["RutEntidad"]) : 0,
                RutEjecutivo = row["RutEjecutivo"] != DBNull.Value ? row["RutEjecutivo"].ToString() : string.Empty,

            };
        }
        #endregion
    }
}
