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
    /// Clase Dominio EntidadEntity
    /// </summary>
    /// <author>@Charly</author>
    /// <created>05-09-2017 23:38:51</created>
    /// <remarks>
    /// Esta clase fué generada automáticamente por una herramienta.
    /// Para modificarla, debes modificar su correspondiente tabla en la Base de Datos y luego generar nuevamente esta clase usando la herramienta
    /// </remarks>
    public class EntidadEntity
    {

        /// <summary>
        /// RutEntidad
        /// </summary>
        public int RutEntidad { get; set; }

        /// <summary>
        /// DvEntidad
        /// </summary>
        public string DvEntidad { get; set; }

        /// <summary>
        /// NombreEntidad
        /// </summary>
        public string NombreEntidad { get; set; }

        /// <summary>
        /// EsPersonalidadJuridica
        /// </summary>
        public bool EsPersonalidadJuridica { get; set; }


        /// <summary>
        /// Inicializa una nueva instancia de la clase <see cref="EntidadEntity"/>.
        /// </summary>
        public EntidadEntity()
        {
            RutEntidad = 0;
            DvEntidad = string.Empty;
            NombreEntidad = string.Empty;
            EsPersonalidadJuridica = false;

        }
    }
}
