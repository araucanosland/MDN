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
    /// Clase Acceso de Datos CampanaData
    /// </summary>
    /// <author>@Charly</author>
    /// <created>05-09-2017 23:31:29</created>
    /// <remarks>
    /// Esta clase fué generada automáticamente por una herramienta.
    /// </remarks>
    public class CampanaData
    {
        #region metodos base

        /// <summary>
        /// Guarda la entidad de dominio <see cref="CampanaEntity"/> en la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:31:29</created>
        /// <param name="campana">Referencia a una clase <see cref="CampanaEntity"/>.</param>
        /// <returns>Clave primaria resultante de la operación</returns>
        public static int Guardar(CampanaEntity campana)
        {
            Parametros parametros = new Parametros
            {
                new Parametro("@CodCamp", campana.CodCamp),
                new Parametro("@IdentidadCamp", campana.IdentidadCamp),
                new Parametro("@Activa", campana.Activa),

            };

            return DBHelper.InstanceEngine.ObtenerEscalar<int>("engine.sp_Campana_Guardar", parametros);
        }

        /// <summary>
        /// Recupera una entidad <see cref="CampanaEntity"/> de la Base de Datos dado un ID de CampanaEntity
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:31:29</created>
        /// <param name="CodCamp">ID de CampanaEntity.</param>
        /// <returns>Referencia a una clase <see cref="CampanaEntity"/>.</returns>
        public static CampanaEntity ObtenerPorID(int CodCamp)
        {
            Parametro parametro = new Parametro("@CodCamp", CodCamp);

            return DBHelper.InstanceEngine.ObtenerEntidad("engine.sp_Campana_ObtenerPorID", parametro, ConstructorEntidad);
        }

        /// <summary>
        /// Lista todas las entidades <see cref="CampanaEntity"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:31:29</created>
        /// <returns><see cref="DataTable"/> con todos los objetos.</returns>
        public static DataTable Listar()
        {
            return DBHelper.InstanceEngine.ObtenerDataTable("engine.sp_Campana_Listar");
        }

        /// <summary>
        /// Recupera todas las entidades <see cref="CampanaEntity"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:31:29</created>
        /// <returns>Lista con todas las entidades <see cref="CampanaEntity"/>.</returns>
        public static List<CampanaEntity> ObtenerEntidades()
        {
            return DBHelper.InstanceEngine.ObtenerColeccion("engine.sp_Campana_Listar", ConstructorEntidad);
        }

        #endregion

        #region metodos adicionales

        /// <summary>
        /// Recupera todas las entidades <see cref="CampanaEntity"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:31:29</created>
        /// <returns>Lista con todas las entidades <see cref="CampanaEntity"/>.</returns>
        public static List<CampanaEntity> ObtenerEntidadesByEjecutivo(string rutEjecutivo)
        {
            Parametro p = new Parametro("@RutEjecutivo", rutEjecutivo);
            return DBHelper.InstanceEngine.ObtenerColeccion("engine.sp_Campana_ListarByEjecutivo", p,  ConstructorEntidad);
        }

        #endregion

        #region constructor
        private static CampanaEntity ConstructorEntidad(DataRow row)
        {
            return new CampanaEntity
            {
                CodCamp = row["CodCamp"] != DBNull.Value ? Convert.ToInt32(row["CodCamp"]) : 0,
                IdentidadCamp = row["IdentidadCamp"] != DBNull.Value ? row["IdentidadCamp"].ToString() : string.Empty,
                Activa = row["Activa"] != DBNull.Value && Convert.ToBoolean(row["Activa"]),

            };
        }
        #endregion
    }
}
