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
    /// Clase Dominio EstadogestionEntity
    /// </summary>
    /// <author>@Charly</author>
    /// <created>05-09-2017 23:39:38</created>
    /// <remarks>
    /// Esta clase fué generada automáticamente por una herramienta.
    /// Para modificarla, debes modificar su correspondiente tabla en la Base de Datos y luego generar nuevamente esta clase usando la herramienta
    /// </remarks>
    public class EstadogestionEntity
    {

        /// <summary>
        /// CodEstado
        /// </summary>
        public int CodEstado { get; set; }

        /// <summary>
        /// Nombre
        /// </summary>
        public string Nombre { get; set; }

        /// <summary>
        /// CodEstPadre
        /// </summary>
        public int CodEstPadre { get; set; }

        /// <summary>
        /// EsTerminal
        /// </summary>
        public bool EsTerminal { get; set; }


        /// <summary>
        /// CodCamp
        /// </summary>
        public int CodCamp { get; set; }


        /// <summary>
        /// Inicializa una nueva instancia de la clase <see cref="EstadogestionEntity"/>.
        /// </summary>
        public EstadogestionEntity()
        {
            CodEstado = 0;
            Nombre = string.Empty;
            CodEstPadre = 0;
            EsTerminal = false;
            CodCamp = 0;
        }
    }
}
