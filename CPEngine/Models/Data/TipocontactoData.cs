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
    /// Clase Acceso de Datos TipocontactoData
    /// </summary>
    /// <author>@Charly</author>
    /// <created>05-09-2017 23:42:49</created>
    /// <remarks>
    /// Esta clase fué generada automáticamente por una herramienta.
    /// </remarks>
    public class TipocontactoData
    {
        #region metodos base

        /// <summary>
        /// Guarda la entidad de dominio <see cref="TipocontactoEntity"/> en la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:42:49</created>
        /// <param name="tipocontacto">Referencia a una clase <see cref="TipocontactoEntity"/>.</param>
        /// <returns>Clave primaria resultante de la operación</returns>
        public static int Guardar(TipocontactoEntity tipocontacto)
        {
            Parametros parametros = new Parametros
            {
                new Parametro("@CodTipo", tipocontacto.CodTipo),
                new Parametro("@NombreTipo", tipocontacto.NombreTipo),

            };

            return DBHelper.InstanceEngine.ObtenerEscalar<int>("engine.sp_Tipocontacto_Guardar", parametros);
        }

        /// <summary>
        /// Recupera una entidad <see cref="TipocontactoEntity"/> de la Base de Datos dado un ID de TipocontactoEntity
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:42:49</created>
        /// <param name="CodTipo">ID de TipocontactoEntity.</param>
        /// <returns>Referencia a una clase <see cref="TipocontactoEntity"/>.</returns>
        public static TipocontactoEntity ObtenerPorID(int CodTipo)
        {
            Parametro parametro = new Parametro("@CodTipo", CodTipo);

            return DBHelper.InstanceEngine.ObtenerEntidad("engine.sp_Tipocontacto_ObtenerPorID", parametro, ConstructorEntidad);
        }

        /// <summary>
        /// Lista todas las entidades <see cref="TipocontactoEntity"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:42:49</created>
        /// <returns><see cref="DataTable"/> con todos los objetos.</returns>
        public static DataTable Listar()
        {
            return DBHelper.InstanceEngine.ObtenerDataTable("engine.sp_Tipocontacto_Listar");
        }

        /// <summary>
        /// Recupera todas las entidades <see cref="TipocontactoEntity"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:42:49</created>
        /// <returns>Lista con todas las entidades <see cref="TipocontactoEntity"/>.</returns>
        public static List<TipocontactoEntity> ObtenerEntidades()
        {
            return DBHelper.InstanceEngine.ObtenerColeccion("engine.sp_Tipocontacto_Listar", ConstructorEntidad);
        }

        #endregion

        #region metodos adicionales
        #endregion

        #region constructor
        private static TipocontactoEntity ConstructorEntidad(DataRow row)
        {
            return new TipocontactoEntity
            {
                CodTipo = row["CodTipo"] != DBNull.Value ? Convert.ToInt32(row["CodTipo"]) : 0,
                NombreTipo = row["NombreTipo"] != DBNull.Value ? row["NombreTipo"].ToString() : string.Empty,

            };
        }
        #endregion
    }
}
