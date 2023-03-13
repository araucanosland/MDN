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
    /// Clase Dominio AttrvaloresEntity
    /// </summary>
    /// <author>@Charly</author>
    /// <created>05-09-2017 23:27:29</created>
    /// <remarks>
    /// Esta clase fué generada automáticamente por una herramienta.
    /// Para modificarla, debes modificar su correspondiente tabla en la Base de Datos y luego generar nuevamente esta clase usando la herramienta
    /// </remarks>
    public class AttrvaloresEntity
    {

        /// <summary>
        /// CodAttr
        /// </summary>
        public string CodAttr { get; set; }

        /// <summary>
        /// IdentidadCmp
        /// </summary>
        public int CodCamp { get; set; }

        /// <summary>
        /// CodAsignacion
        /// </summary>
        public int CodAsignacion { get; set; }

        /// <summary>
        /// ValorAttr
        /// </summary>
        public string ValorAttr { get; set; }


        /// <summary>
        /// Inicializa una nueva instancia de la clase <see cref="AttrvaloresEntity"/>.
        /// </summary>
        public AttrvaloresEntity()
        {
            CodAttr = string.Empty;
            CodCamp = 0;
            CodAsignacion = 0;
            ValorAttr = string.Empty;

        }
    }
}
