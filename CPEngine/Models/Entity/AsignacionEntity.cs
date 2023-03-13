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
    /// Clase Dominio AsignacionEntity
    /// </summary>
    /// <author>@Charly</author>
    /// <created>05-09-2017 15:43:38</created>
    /// <remarks>
    /// Esta clase fué generada automáticamente por una herramienta.
    /// Para modificarla, debes modificar su correspondiente tabla en la Base de Datos y luego generar nuevamente esta clase usando la herramienta
    /// </remarks>
    public class AsignacionEntity
    {

        /// <summary>
        /// CodAsignacion
        /// </summary>
        public long CodAsignacion { get; set; }

        /// <summary>
        /// CodCamp
        /// </summary>
        public int CodCamp { get; set; }

        /// <summary>
        /// RutEntidad
        /// </summary>
        public int RutEntidad { get; set; }

        /// <summary>
        /// RutEjecutivo
        /// </summary>
        public string RutEjecutivo { get; set; }


        /// <summary>
        /// Inicializa una nueva instancia de la clase <see cref="AsignacionEntity"/>.
        /// </summary>
        public AsignacionEntity()
        {
            CodAsignacion = 0;
            CodCamp = 0;
            RutEntidad = 0;
            RutEjecutivo = string.Empty;

        }
    }
}
