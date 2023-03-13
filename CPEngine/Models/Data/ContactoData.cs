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
    /// Clase Acceso de Datos ContactoData
    /// </summary>
    /// <author>@Charly</author>
    /// <created>05-09-2017 23:35:48</created>
    /// <remarks>
    /// Esta clase fué generada automáticamente por una herramienta.
    /// </remarks>
    public class ContactoData
    {
        #region metodos base

        /// <summary>
        /// Guarda la entidad de dominio <see cref="ContactoEntity"/> en la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:35:48</created>
        /// <param name="contacto">Referencia a una clase <see cref="ContactoEntity"/>.</param>
        /// <returns>Clave primaria resultante de la operación</returns>
        public static long Guardar(ContactoEntity contacto)
        {
            Parametros parametros = new Parametros
            {
                new Parametro("@CodTipoEntidad", contacto.CodTipoEntidad),
                new Parametro("@RutEntidad", contacto.RutEntidad),
                new Parametro("@CodCategoria", contacto.CodCategoria),
                new Parametro("@CodTipo", contacto.CodTipo),
                new Parametro("@ValorContacto", contacto.ValorContacto),
                new Parametro("@CodContacto", contacto.CodContacto),

            };

            return DBHelper.InstanceEngine.ObtenerEscalar<long>("engine.sp_Contacto_Guardar", parametros);
        }

        /// <summary>
        /// Recupera una entidad <see cref="ContactoEntity"/> de la Base de Datos dado un ID de ContactoEntity
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:35:48</created>
        /// <param name="CodContacto">ID de ContactoEntity.</param>
        /// <returns>Referencia a una clase <see cref="ContactoEntity"/>.</returns>
        public static ContactoEntity ObtenerPorID(long CodContacto)
        {
            Parametro parametro = new Parametro("@CodContacto", CodContacto);

            return DBHelper.InstanceEngine.ObtenerEntidad("engine.sp_Contacto_ObtenerPorID", parametro, ConstructorEntidad);
        }

        /// <summary>
        /// Lista todas las entidades <see cref="ContactoEntity"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:35:48</created>
        /// <returns><see cref="DataTable"/> con todos los objetos.</returns>
        public static DataTable Listar()
        {
            return DBHelper.InstanceEngine.ObtenerDataTable("engine.sp_Contacto_Listar");
        }

        /// <summary>
        /// Recupera todas las entidades <see cref="ContactoEntity"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:35:48</created>
        /// <returns>Lista con todas las entidades <see cref="ContactoEntity"/>.</returns>
        public static List<ContactoEntity> ObtenerEntidades()
        {
            return DBHelper.InstanceEngine.ObtenerColeccion("engine.sp_Contacto_Listar", ConstructorEntidad);
        }

        #endregion

        #region metodos adicionales
        #endregion

        #region constructor
        private static ContactoEntity ConstructorEntidad(DataRow row)
        {
            return new ContactoEntity
            {
                CodTipoEntidad = row["CodTipoEntidad"] != DBNull.Value ? Convert.ToInt32(row["CodTipoEntidad"]) : 0,
                RutEntidad = row["RutEntidad"] != DBNull.Value ? Convert.ToInt32(row["RutEntidad"]) : 0,
                CodCategoria = row["CodCategoria"] != DBNull.Value ? Convert.ToInt32(row["CodCategoria"]) : 0,
                CodTipo = row["CodTipo"] != DBNull.Value ? Convert.ToInt32(row["CodTipo"]) : 0,
                ValorContacto = row["ValorContacto"] != DBNull.Value ? row["ValorContacto"].ToString() : string.Empty,
                CodContacto = row["CodContacto"] != DBNull.Value ? Convert.ToInt64(row["CodContacto"]) : 0,

            };
        }
        #endregion
    }
}
