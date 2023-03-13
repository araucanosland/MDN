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
    /// Clase Acceso de Datos AtributoData
    /// </summary>
    /// <author>@Charly</author>
    /// <created>05-09-2017 23:25:19</created>
    /// <remarks>
    /// Esta clase fué generada automáticamente por una herramienta.
    /// </remarks>
    public class AtributoData
    {
        #region metodos base

        /// <summary>
        /// Guarda la entidad de dominio <see cref="AtributoEntity"/> en la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:25:19</created>
        /// <param name="atributo">Referencia a una clase <see cref="AtributoEntity"/>.</param>
        /// <returns>Clave primaria resultante de la operación</returns>
        public static string Guardar(AtributoEntity atributo)
        {
            Parametros parametros = new Parametros
            {
                new Parametro("@CodAttr", atributo.CodAttr),
                new Parametro("@CodCamp", atributo.CodCamp),
                new Parametro("@Etiqueta", atributo.Etiqueta),
                new Parametro("@TipoDato", atributo.TipoDato),

            };

            return DBHelper.InstanceEngine.ObtenerEscalar<string>("engine.sp_Atributo_Guardar", parametros);
        }

        /// <summary>
        /// Recupera una entidad <see cref="AtributoEntity"/> de la Base de Datos dado un ID de AtributoEntity
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:25:19</created>
        /// <param name="CodAttr">ID de AtributoEntity.</param>
        /// <returns>Referencia a una clase <see cref="AtributoEntity"/>.</returns>
        public static AtributoEntity ObtenerPorID(string CodAttr)
        {
            Parametro parametro = new Parametro("@CodAttr", CodAttr);

            return DBHelper.InstanceEngine.ObtenerEntidad("engine.sp_Atributo_ObtenerPorID", parametro, ConstructorEntidad);
        }

        /// <summary>
        /// Lista todas las entidades <see cref="AtributoEntity"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:25:19</created>
        /// <returns><see cref="DataTable"/> con todos los objetos.</returns>
        public static DataTable Listar()
        {
            return DBHelper.InstanceEngine.ObtenerDataTable("engine.sp_Atributo_Listar");
        }

        /// <summary>
        /// Recupera todas las entidades <see cref="AtributoEntity"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:25:19</created>
        /// <returns>Lista con todas las entidades <see cref="AtributoEntity"/>.</returns>
        public static List<AtributoEntity> ObtenerEntidades()
        {
            return DBHelper.InstanceEngine.ObtenerColeccion("engine.sp_Atributo_Listar", ConstructorEntidad);
        }

        #endregion

        #region metodos adicionales

        /// <summary>
        /// Recupera todas las entidades <see cref="AtributoEntity"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:25:19</created>
        /// <returns>Lista con todas las entidades <see cref="AtributoEntity"/>.</returns>
        public static List<AtributoEntity> ObtenerEntidadesByCamp(int codCamp)
        {
            Parametro p = new Parametro("@codCamp", codCamp);
            return DBHelper.InstanceEngine.ObtenerColeccion("engine.sp_Atributo_ListarByCamp", p,  ConstructorEntidad);
        }

        #endregion

        #region constructor
        private static AtributoEntity ConstructorEntidad(DataRow row)
        {
            return new AtributoEntity
            {
                CodAttr = row["CodAttr"] != DBNull.Value ? row["CodAttr"].ToString() : string.Empty,
                CodCamp = row["CodCamp"] != DBNull.Value ? Convert.ToInt32(row["CodCamp"]) : 0,
                Etiqueta = row["Etiqueta"] != DBNull.Value ? row["Etiqueta"].ToString() : string.Empty,
                TipoDato = row["TipoDato"] != DBNull.Value ? row["TipoDato"].ToString() : string.Empty,
                MostrarEnLista = row["MostrarEnLista"] != DBNull.Value ? Convert.ToBoolean(row["MostrarEnLista"]) : false,

            };
        }
        #endregion
    }
}
