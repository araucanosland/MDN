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
    /// Clase Acceso de Datos CategoriacontactoData
    /// </summary>
    /// <author>@Charly</author>
    /// <created>05-09-2017 23:34:22</created>
    /// <remarks>
    /// Esta clase fué generada automáticamente por una herramienta.
    /// </remarks>
    public class CategoriacontactoData
    {
        #region metodos base

        /// <summary>
        /// Guarda la entidad de dominio <see cref="CategoriacontactoEntity"/> en la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:34:22</created>
        /// <param name="categoriacontacto">Referencia a una clase <see cref="CategoriacontactoEntity"/>.</param>
        /// <returns>Clave primaria resultante de la operación</returns>
        public static int Guardar(CategoriacontactoEntity categoriacontacto)
        {
            Parametros parametros = new Parametros
            {
                new Parametro("@CodCategoria", categoriacontacto.CodCategoria),
                new Parametro("@NombreCategoria", categoriacontacto.NombreCategoria),

            };

            return DBHelper.InstanceEngine.ObtenerEscalar<int>("engine.sp_Categoriacontacto_Guardar", parametros);
        }

        /// <summary>
        /// Recupera una entidad <see cref="CategoriacontactoEntity"/> de la Base de Datos dado un ID de CategoriacontactoEntity
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:34:22</created>
        /// <param name="CodCategoria">ID de CategoriacontactoEntity.</param>
        /// <returns>Referencia a una clase <see cref="CategoriacontactoEntity"/>.</returns>
        public static CategoriacontactoEntity ObtenerPorID(int CodCategoria)
        {
            Parametro parametro = new Parametro("@CodCategoria", CodCategoria);

            return DBHelper.InstanceEngine.ObtenerEntidad("engine.sp_Categoriacontacto_ObtenerPorID", parametro, ConstructorEntidad);
        }

        /// <summary>
        /// Lista todas las entidades <see cref="CategoriacontactoEntity"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:34:22</created>
        /// <returns><see cref="DataTable"/> con todos los objetos.</returns>
        public static DataTable Listar()
        {
            return DBHelper.InstanceEngine.ObtenerDataTable("engine.sp_Categoriacontacto_Listar");
        }

        /// <summary>
        /// Recupera todas las entidades <see cref="CategoriacontactoEntity"/> de la Base de Datos
        /// </summary>
        /// <author>@Charly</author>
        /// <created>05-09-2017 23:34:22</created>
        /// <returns>Lista con todas las entidades <see cref="CategoriacontactoEntity"/>.</returns>
        public static List<CategoriacontactoEntity> ObtenerEntidades()
        {
            return DBHelper.InstanceEngine.ObtenerColeccion("engine.sp_Categoriacontacto_Listar", ConstructorEntidad);
        }

        #endregion

        #region metodos adicionales
        #endregion

        #region constructor
        private static CategoriacontactoEntity ConstructorEntidad(DataRow row)
        {
            return new CategoriacontactoEntity
            {
                CodCategoria = row["CodCategoria"] != DBNull.Value ? Convert.ToInt32(row["CodCategoria"]) : 0,
                NombreCategoria = row["NombreCategoria"] != DBNull.Value ? row["NombreCategoria"].ToString() : string.Empty,

            };
        }
        #endregion
    }
}
