using System;

//------------------------------------------------------------------------------
// <generado automáticamente>
//     Este código fue generado por una herramienta.
//
//     Los cambios en este archivo podrían causar un comportamiento incorrecto y se perderán si
//     se vuelve a generar el código.
// </generado automáticamente>
//------------------------------------------------------------------------------

namespace CPEngine.Models.Entity
{
    /// <summary>
    /// Clase Dominio CategoriacontactoEntity
    /// </summary>
    /// <author>@Charly</author>
    /// <created>05-09-2017 23:33:55</created>
    /// <remarks>
    /// Esta clase fué generada automáticamente por una herramienta.
    /// Para modificarla, debes modificar su correspondiente tabla en la Base de Datos y luego generar nuevamente esta clase usando la herramienta
    /// </remarks>
    public class CategoriacontactoEntity
    {

        /// <summary>
        /// CodCategoria
        /// </summary>
        public int CodCategoria { get; set; }

        /// <summary>
        /// NombreCategoria
        /// </summary>
        public string NombreCategoria { get; set; }


        /// <summary>
        /// Inicializa una nueva instancia de la clase <see cref="CategoriacontactoEntity"/>.
        /// </summary>
        public CategoriacontactoEntity()
        {
            CodCategoria = 0;
            NombreCategoria = string.Empty;

        }
    }
}
