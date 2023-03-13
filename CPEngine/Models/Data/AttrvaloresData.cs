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
    /// Clase Acceso de Datos AttrvaloresData
    /// </summary>
    /// <author>@Charly</author>
    /// <created>05-09-2017 23:28:59</created>
    /// <remarks>
    /// Esta clase fué generada automáticamente por una herramienta.
    /// </remarks>
    public class AttrvaloresData
    {
        #region metodos base

        /// <summary>
        /// Guarda la entidad de dominio <see cref="AttrvaloresEntity"/> en la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:28:59</created>
        /// <param name="attrvalores">Referencia a una clase <see cref="AttrvaloresEntity"/>.</param>
        /// <returns>Clave primaria resultante de la operación</returns>
        public static string Guardar(AttrvaloresEntity attrvalores)
        {
            Parametros parametros = new Parametros
            {
                new Parametro("@CodAttr", attrvalores.CodAttr),
                new Parametro("@CodCamp", attrvalores.CodCamp),
                new Parametro("@CodAsignacion", attrvalores.CodAsignacion),
                new Parametro("@ValorAttr", attrvalores.ValorAttr),

            };

            return DBHelper.InstanceEngine.ObtenerEscalar<string>("engine.sp_Attrvalores_Guardar", parametros);
        }

        /// <summary>
        /// Recupera una entidad <see cref="AttrvaloresEntity"/> de la Base de Datos dado un ID de AttrvaloresEntity
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:28:59</created>
        /// <param name="CodAttr">ID de AttrvaloresEntity.</param>
        /// <returns>Referencia a una clase <see cref="AttrvaloresEntity"/>.</returns>
        public static AttrvaloresEntity ObtenerPorID(string CodAttr)
        {
            Parametro parametro = new Parametro("@CodAttr", CodAttr);

            return DBHelper.InstanceEngine.ObtenerEntidad("engine.sp_Attrvalores_ObtenerPorID", parametro, ConstructorEntidad);
        }

        /// <summary>
        /// Lista todas las entidades <see cref="AttrvaloresEntity"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:28:59</created>
        /// <returns><see cref="DataTable"/> con todos los objetos.</returns>
        public static DataTable Listar()
        {
            return DBHelper.InstanceEngine.ObtenerDataTable("engine.sp_Attrvalores_Listar");
        }

        /// <summary>
        /// Recupera todas las entidades <see cref="AttrvaloresEntity"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:28:59</created>
        /// <returns>Lista con todas las entidades <see cref="AttrvaloresEntity"/>.</returns>
        public static List<AttrvaloresEntity> ObtenerEntidades()
        {
            return DBHelper.InstanceEngine.ObtenerColeccion("engine.sp_Attrvalores_Listar", ConstructorEntidad);
        }

        #endregion

        #region metodos adicionales
        /// <summary>
        /// Recupera todas las entidades <see cref="AttrvaloresEntity"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>        /// <created>05-09-2017 23:28:59</created>
        /// <returns>Lista con todas las entidades <see cref="AttrvaloresEntity"/>.</returns>
        public static List<AttrvaloresEntity> ObtenerEntidadesByCamp(int codCamp)
        {
            Parametro parametro = new Parametro("@codCamp", codCamp);
            return DBHelper.InstanceEngine.ObtenerColeccion("engine.sp_Attrvalores_ListarByCamp", parametro, ConstructorEntidad);
        }


        /// <summary>
        /// Recupera todas las entidades <see cref="AttrvaloresEntity"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>        /// <created>05-09-2017 23:28:59</created>
        /// <returns>Lista con todas las entidades <see cref="AttrvaloresEntity"/>.</returns>
        public static List<AttrvaloresEntity> ObtenerEntidadesByAsig(long codAsig)
        {
            Parametro parametro = new Parametro("@CodAsignacion", codAsig);
            return DBHelper.InstanceEngine.ObtenerColeccion("engine.sp_Attrvalores_ListarByAsig", parametro, ConstructorEntidad);
        }


        #endregion

        #region constructor
        private static AttrvaloresEntity ConstructorEntidad(DataRow row)
        {
            return new AttrvaloresEntity
            {
                CodAttr = row["CodAttr"] != DBNull.Value ? row["CodAttr"].ToString() : string.Empty,
                CodCamp = row["CodCamp"] != DBNull.Value ? Convert.ToInt32(row["CodCamp"]) : 0,
                CodAsignacion = row["CodAsignacion"] != DBNull.Value ? Convert.ToInt32(row["CodAsignacion"]) : 0,
                ValorAttr = row["ValorAttr"] != DBNull.Value ? row["ValorAttr"].ToString() : string.Empty,

            };
        }
        #endregion
    }
}
