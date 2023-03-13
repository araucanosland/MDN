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
    /// Clase Acceso de Datos EntidadData
    /// </summary>
    /// <author>@Charly</author>
    /// <created>05-09-2017 23:39:10</created>
    /// <remarks>
    /// Esta clase fué generada automáticamente por una herramienta.
    /// </remarks>
    public class EntidadData
    {
        #region metodos base

        /// <summary>
        /// Guarda la entidad de dominio <see cref="EntidadEntity"/> en la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:39:10</created>
        /// <param name="entidad">Referencia a una clase <see cref="EntidadEntity"/>.</param>
        /// <returns>Clave primaria resultante de la operación</returns>
        public static int Guardar(EntidadEntity entidad)
        {
            Parametros parametros = new Parametros
            {
                new Parametro("@RutEntidad", entidad.RutEntidad),
                new Parametro("@DvEntidad", entidad.DvEntidad),
                new Parametro("@NombreEntidad", entidad.NombreEntidad),
                new Parametro("@EsPersonalidadJuridica", entidad.EsPersonalidadJuridica),

            };

            return DBHelper.InstanceEngine.ObtenerEscalar<int>("engine.sp_Entidad_Guardar", parametros);
        }

        /// <summary>
        /// Recupera una entidad <see cref="EntidadEntity"/> de la Base de Datos dado un ID de EntidadEntity
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:39:10</created>
        /// <param name="RutEntidad">ID de EntidadEntity.</param>
        /// <returns>Referencia a una clase <see cref="EntidadEntity"/>.</returns>
        public static EntidadEntity ObtenerPorID(int RutEntidad)
        {
            Parametro parametro = new Parametro("@RutEntidad", RutEntidad);

            return DBHelper.InstanceEngine.ObtenerEntidad("engine.sp_Entidad_ObtenerPorID", parametro, ConstructorEntidad);
        }

        /// <summary>
        /// Lista todas las entidades <see cref="EntidadEntity"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:39:10</created>
        /// <returns><see cref="DataTable"/> con todos los objetos.</returns>
        public static DataTable Listar()
        {
            return DBHelper.InstanceEngine.ObtenerDataTable("engine.sp_Entidad_Listar");
        }

        /// <summary>
        /// Recupera todas las entidades <see cref="EntidadEntity"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:39:10</created>
        /// <returns>Lista con todas las entidades <see cref="EntidadEntity"/>.</returns>
        public static List<EntidadEntity> ObtenerEntidades()
        {
            return DBHelper.InstanceEngine.ObtenerColeccion("engine.sp_Entidad_Listar", ConstructorEntidad);
        }

        #endregion

        #region metodos adicionales
        #endregion

        #region constructor
        private static EntidadEntity ConstructorEntidad(DataRow row)
        {
            return new EntidadEntity
            {
                RutEntidad = row["RutEntidad"] != DBNull.Value ? Convert.ToInt32(row["RutEntidad"]) : 0,
                DvEntidad = row["DvEntidad"] != DBNull.Value ? row["DvEntidad"].ToString() : string.Empty,
                NombreEntidad = row["NombreEntidad"] != DBNull.Value ? row["NombreEntidad"].ToString() : string.Empty,
                EsPersonalidadJuridica = row["EsPersonalidadJuridica"] != DBNull.Value && Convert.ToBoolean(row["EsPersonalidadJuridica"]),

            };
        }
        #endregion
    }
}
