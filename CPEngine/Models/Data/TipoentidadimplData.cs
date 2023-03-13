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
    /// Clase Acceso de Datos TipoentidadimplData
    /// </summary>
    /// <author>@Charly</author>
    /// <created>05-09-2017 23:48:32</created>
    /// <remarks>
    /// Esta clase fué generada automáticamente por una herramienta.
    /// </remarks>
    public class TipoentidadimplData
    {
        #region metodos base

        /// <summary>
        /// Guarda la entidad de dominio <see cref="TipoentidadimplEntity"/> en la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:48:32</created>
        /// <param name="tipoentidadimpl">Referencia a una clase <see cref="TipoentidadimplEntity"/>.</param>
        /// <returns>Clave primaria resultante de la operación</returns>
        public static int Guardar(TipoentidadimplEntity tipoentidadimpl)
        {
            Parametros parametros = new Parametros
            {
                new Parametro("@CodTipoEntidad", tipoentidadimpl.CodTipoEntidad),
                new Parametro("@RutEntidad", tipoentidadimpl.RutEntidad),
                new Parametro("@RutPersonalidadJuridica", tipoentidadimpl.RutPersonalidadJuridica),

            };

            return DBHelper.InstanceEngine.ObtenerEscalar<int>("engine.sp_Tipoentidadimpl_Guardar", parametros);
        }

        /// <summary>
        /// Recupera una entidad <see cref="TipoentidadimplEntity"/> de la Base de Datos dado un ID de TipoentidadimplEntity
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:48:32</created>
        /// <param name="CodTipoEntidad">ID de TipoentidadimplEntity.</param>
        /// <returns>Referencia a una clase <see cref="TipoentidadimplEntity"/>.</returns>
        public static TipoentidadimplEntity ObtenerPorID(int CodTipoEntidad)
        {
            Parametro parametro = new Parametro("@CodTipoEntidad", CodTipoEntidad);

            return DBHelper.InstanceEngine.ObtenerEntidad("engine.sp_Tipoentidadimpl_ObtenerPorID", parametro, ConstructorEntidad);
        }

        /// <summary>
        /// Lista todas las entidades <see cref="TipoentidadimplEntity"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:48:32</created>
        /// <returns><see cref="DataTable"/> con todos los objetos.</returns>
        public static DataTable Listar()
        {
            return DBHelper.InstanceEngine.ObtenerDataTable("engine.sp_Tipoentidadimpl_Listar");
        }

        /// <summary>
        /// Recupera todas las entidades <see cref="TipoentidadimplEntity"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:48:32</created>
        /// <returns>Lista con todas las entidades <see cref="TipoentidadimplEntity"/>.</returns>
        public static List<TipoentidadimplEntity> ObtenerEntidades()
        {
            return DBHelper.InstanceEngine.ObtenerColeccion("engine.sp_Tipoentidadimpl_Listar", ConstructorEntidad);
        }

        #endregion

        #region metodos adicionales
        #endregion

        #region constructor
        private static TipoentidadimplEntity ConstructorEntidad(DataRow row)
        {
            return new TipoentidadimplEntity
            {
                CodTipoEntidad = row["CodTipoEntidad"] != DBNull.Value ? Convert.ToInt32(row["CodTipoEntidad"]) : 0,
                RutEntidad = row["RutEntidad"] != DBNull.Value ? Convert.ToInt32(row["RutEntidad"]) : 0,
                RutPersonalidadJuridica = row["RutPersonalidadJuridica"] != DBNull.Value ? Convert.ToInt32(row["RutPersonalidadJuridica"]) : 0,

            };
        }
        #endregion
    }
}
