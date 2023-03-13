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
    /// Clase Acceso de Datos GestionData
    /// </summary>
    /// <author>@Charly</author>
    /// <created>05-09-2017 23:41:26</created>
    /// <remarks>
    /// Esta clase fué generada automáticamente por una herramienta.
    /// </remarks>
    public class GestionData
    {
        #region metodos base

        /// <summary>
        /// Guarda la entidad de dominio <see cref="GestionEntity"/> en la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:41:26</created>
        /// <param name="gestion">Referencia a una clase <see cref="GestionEntity"/>.</param>
        /// <returns>Clave primaria resultante de la operación</returns>
        public static long Guardar(GestionEntity gestion)
        {
            Parametros parametros = new Parametros
            {
                new Parametro("@CodGestion", gestion.CodGestion),
                new Parametro("@CodAsignacion", gestion.CodAsignacion),
                new Parametro("@FechaAccion", gestion.FechaAccion),
                new Parametro("@FechaCompromiso", gestion.FechaCompromiso),
                new Parametro("@CodEstadoGestion", gestion.CodEstadoGestion),
                new Parametro("@NotaGestion", gestion.NotaGestion),
                new Parametro("@RutEjecutivo", gestion.RutEjecutivo),
                new Parametro("@CodOficina", gestion.CodOficina),

            };

            return DBHelper.InstanceEngine.ObtenerEscalar<long>("engine.sp_Gestion_Guardar", parametros);
        }

        /// <summary>
        /// Recupera una entidad <see cref="GestionEntity"/> de la Base de Datos dado un ID de GestionEntity
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:41:26</created>
        /// <param name="CodGestion">ID de GestionEntity.</param>
        /// <returns>Referencia a una clase <see cref="GestionEntity"/>.</returns>
        public static GestionEntity ObtenerPorID(long CodGestion)
        {
            Parametro parametro = new Parametro("@CodGestion", CodGestion);

            return DBHelper.InstanceEngine.ObtenerEntidad("engine.sp_Gestion_ObtenerPorID", parametro, ConstructorEntidad);
        }

        /// <summary>
        /// Lista todas las entidades <see cref="GestionEntity"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:41:26</created>
        /// <returns><see cref="DataTable"/> con todos los objetos.</returns>
        public static DataTable Listar()
        {
            return DBHelper.InstanceEngine.ObtenerDataTable("engine.sp_Gestion_Listar");
        }

        /// <summary>
        /// Recupera todas las entidades <see cref="GestionEntity"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:41:26</created>
        /// <returns>Lista con todas las entidades <see cref="GestionEntity"/>.</returns>
        public static List<GestionEntity> ObtenerEntidades()
        {
            return DBHelper.InstanceEngine.ObtenerColeccion("engine.sp_Gestion_Listar", ConstructorEntidad);
        }

        #endregion

        #region metodos adicionales
        #endregion

        #region constructor
        private static GestionEntity ConstructorEntidad(DataRow row)
        {
            return new GestionEntity
            {
                CodGestion = row["CodGestion"] != DBNull.Value ? Convert.ToInt64(row["CodGestion"]) : 0,
                CodAsignacion = row["CodAsignacion"] != DBNull.Value ? Convert.ToInt64(row["CodAsignacion"]) : 0,
                FechaAccion = row["FechaAccion"] != DBNull.Value ? Convert.ToDateTime(row["FechaAccion"]) : new DateTime(1900, 1, 1),
                FechaCompromiso = row["FechaCompromiso"] != DBNull.Value ? Convert.ToDateTime(row["FechaCompromiso"]) : new DateTime(1900, 1, 1),
                CodEstadoGestion = row["CodEstadoGestion"] != DBNull.Value ? Convert.ToInt32(row["CodEstadoGestion"]) : 0,
                NotaGestion = row["NotaGestion"] != DBNull.Value ? row["NotaGestion"].ToString() : string.Empty,
                RutEjecutivo = row["RutEjecutivo"] != DBNull.Value ? row["RutEjecutivo"].ToString() : string.Empty,
            };
        }
        #endregion
    }
}
