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
    /// Clase Dominio TipocontactoEntity
    /// </summary>
    /// <author>@Charly</author>
    /// <created>05-09-2017 23:42:06</created>
    /// <remarks>
    /// Esta clase fué generada automáticamente por una herramienta.
    /// Para modificarla, debes modificar su correspondiente tabla en la Base de Datos y luego generar nuevamente esta clase usando la herramienta
    /// </remarks>
    public class TipocontactoEntity
    {

        /// <summary>
        /// CodTipo
        /// </summary>
        public int CodTipo { get; set; }

        /// <summary>
        /// NombreTipo
        /// </summary>
        public string NombreTipo { get; set; }


        /// <summary>
        /// Inicializa una nueva instancia de la clase <see cref="TipocontactoEntity"/>.
        /// </summary>
        public TipocontactoEntity()
        {
            CodTipo = 0;
            NombreTipo = string.Empty;

        }
    }
}
