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
    /// Clase Acceso de Datos TipoendidadData
    /// </summary>
    /// <author>@Charly</author>
    /// <created>05-09-2017 23:47:37</created>
    /// <remarks>
    /// Esta clase fué generada automáticamente por una herramienta.
    /// </remarks>
    public class TipoendidadData
    {
        #region metodos base

        /// <summary>
        /// Guarda la entidad de dominio <see cref="TipoendidadEntity"/> en la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:47:37</created>
        /// <param name="tipoendidad">Referencia a una clase <see cref="TipoendidadEntity"/>.</param>
        /// <returns>Clave primaria resultante de la operación</returns>
        public static int Guardar(TipoendidadEntity tipoendidad)
        {
            Parametros parametros = new Parametros
            {
                new Parametro("@CodTipoEntidad", tipoendidad.CodTipoEntidad),
                new Parametro("@NombreTipoEntidad", tipoendidad.NombreTipoEntidad),

            };

            return DBHelper.InstanceEngine.ObtenerEscalar<int>("engine.sp_Tipoendidad_Guardar", parametros);
        }

        /// <summary>
        /// Recupera una entidad <see cref="TipoendidadEntity"/> de la Base de Datos dado un ID de TipoendidadEntity
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:47:37</created>
        /// <param name="CodTipoEntidad">ID de TipoendidadEntity.</param>
        /// <returns>Referencia a una clase <see cref="TipoendidadEntity"/>.</returns>
        public static TipoendidadEntity ObtenerPorID(int CodTipoEntidad)
        {
            Parametro parametro = new Parametro("@CodTipoEntidad", CodTipoEntidad);

            return DBHelper.InstanceEngine.ObtenerEntidad("engine.sp_Tipoendidad_ObtenerPorID", parametro, ConstructorEntidad);
        }

        /// <summary>
        /// Lista todas las entidades <see cref="TipoendidadEntity"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:47:37</created>
        /// <returns><see cref="DataTable"/> con todos los objetos.</returns>
        public static DataTable Listar()
        {
            return DBHelper.InstanceEngine.ObtenerDataTable("engine.sp_Tipoendidad_Listar");
        }

        /// <summary>
        /// Recupera todas las entidades <see cref="TipoendidadEntity"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:47:37</created>
        /// <returns>Lista con todas las entidades <see cref="TipoendidadEntity"/>.</returns>
        public static List<TipoendidadEntity> ObtenerEntidades()
        {
            return DBHelper.InstanceEngine.ObtenerColeccion("engine.sp_Tipoendidad_Listar", ConstructorEntidad);
        }

        #endregion

        #region metodos adicionales
        #endregion

        #region constructor
        private static TipoendidadEntity ConstructorEntidad(DataRow row)
        {
            return new TipoendidadEntity
            {
                CodTipoEntidad = row["CodTipoEntidad"] != DBNull.Value ? Convert.ToInt32(row["CodTipoEntidad"]) : 0,
                NombreTipoEntidad = row["NombreTipoEntidad"] != DBNull.Value ? row["NombreTipoEntidad"].ToString() : string.Empty,

            };
        }
        #endregion
    }
}
