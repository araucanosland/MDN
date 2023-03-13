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
    /// Clase Acceso de Datos EstadogestionData
    /// </summary>
    /// <author>@Charly</author>
    /// <created>05-09-2017 23:39:58</created>
    /// <remarks>
    /// Esta clase fué generada automáticamente por una herramienta.
    /// </remarks>
    public class EstadogestionData
    {
        #region metodos base

        /// <summary>
        /// Guarda la entidad de dominio <see cref="EstadogestionEntity"/> en la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:39:58</created>
        /// <param name="estadogestion">Referencia a una clase <see cref="EstadogestionEntity"/>.</param>
        /// <returns>Clave primaria resultante de la operación</returns>
        public static int Guardar(EstadogestionEntity estadogestion)
        {
            Parametros parametros = new Parametros
            {
                new Parametro("@CodEstado", estadogestion.CodEstado),
                new Parametro("@Nombre", estadogestion.Nombre),
                new Parametro("@CodEstPadre", estadogestion.CodEstPadre),
                new Parametro("@EsTerminal", estadogestion.EsTerminal),

            };

            return DBHelper.InstanceEngine.ObtenerEscalar<int>("engine.sp_Estadogestion_Guardar", parametros);
        }

        /// <summary>
        /// Recupera una entidad <see cref="EstadogestionEntity"/> de la Base de Datos dado un ID de EstadogestionEntity
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:39:58</created>
        /// <param name="CodEstado">ID de EstadogestionEntity.</param>
        /// <returns>Referencia a una clase <see cref="EstadogestionEntity"/>.</returns>
        public static EstadogestionEntity ObtenerPorID(int CodEstado)
        {
            Parametro parametro = new Parametro("@CodEstado", CodEstado);

            return DBHelper.InstanceEngine.ObtenerEntidad("engine.sp_Estadogestion_ObtenerPorID", parametro, ConstructorEntidad);
        }

        /// <summary>
        /// Lista todas las entidades <see cref="EstadogestionEntity"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:39:58</created>
        /// <returns><see cref="DataTable"/> con todos los objetos.</returns>
        public static DataTable Listar()
        {
            return DBHelper.InstanceEngine.ObtenerDataTable("engine.sp_Estadogestion_Listar");
        }

        /// <summary>
        /// Recupera todas las entidades <see cref="EstadogestionEntity"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:39:58</created>
        /// <returns>Lista con todas las entidades <see cref="EstadogestionEntity"/>.</returns>
        public static List<EstadogestionEntity> ObtenerEntidades()
        {
            return DBHelper.InstanceEngine.ObtenerColeccion("engine.sp_Estadogestion_Listar", ConstructorEntidad);
        }

        #endregion

        #region metodos adicionales
        #endregion

        #region constructor
        private static EstadogestionEntity ConstructorEntidad(DataRow row)
        {
            return new EstadogestionEntity
            {
                CodEstado = row["CodEstado"] != DBNull.Value ? Convert.ToInt32(row["CodEstado"]) : 0,
                Nombre = row["Nombre"] != DBNull.Value ? row["Nombre"].ToString() : string.Empty,
                CodEstPadre = row["CodEstPadre"] != DBNull.Value ? Convert.ToInt32(row["CodEstPadre"]) : 0,
                EsTerminal = row["EsTerminal"] != DBNull.Value && Convert.ToBoolean(row["EsTerminal"]),
                CodCamp = row["CodCamp"] != DBNull.Value ? Convert.ToInt32(row["CodCamp"]) : 0,
            };
        }
        #endregion
    }
}
