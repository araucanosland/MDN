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
    /// Clase Dominio AtributoEntity
    /// </summary>
    /// <author>@Charly</author>
    /// <created>05-09-2017 15:45:49</created>
    /// <remarks>
    /// Esta clase fué generada automáticamente por una herramienta.
    /// Para modificarla, debes modificar su correspondiente tabla en la Base de Datos y luego generar nuevamente esta clase usando la herramienta
    /// </remarks>
    public class AtributoEntity
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
        /// Etiqueta
        /// </summary>
        public string Etiqueta { get; set; }

        /// <summary>
        /// TipoDato
        /// </summary>
        public string TipoDato { get; set; }

        /// <summary>
        /// MostrarEnLista
        /// </summary>
        public bool MostrarEnLista { get; set; }


        /// <summary>
        /// Inicializa una nueva instancia de la clase <see cref="AtributoEntity"/>.
        /// </summary>
        public AtributoEntity()
        {
            CodAttr = string.Empty;
            CodCamp = 0;
            Etiqueta = string.Empty;
            TipoDato = string.Empty;
            MostrarEnLista = false;
        }
    }
}
