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
    /// Clase Dominio TipoentidadimplEntity
    /// </summary>
    /// <author>@Charly</author>
    /// <created>05-09-2017 23:48:13</created>
    /// <remarks>
    /// Esta clase fué generada automáticamente por una herramienta.
    /// Para modificarla, debes modificar su correspondiente tabla en la Base de Datos y luego generar nuevamente esta clase usando la herramienta
    /// </remarks>
    public class TipoentidadimplEntity
    {

        /// <summary>
        /// CodTipoEntidad
        /// </summary>
        public int CodTipoEntidad { get; set; }

        /// <summary>
        /// RutEntidad
        /// </summary>
        public int RutEntidad { get; set; }

        /// <summary>
        /// RutPersonalidadJuridica
        /// </summary>
        public int RutPersonalidadJuridica { get; set; }


        /// <summary>
        /// Inicializa una nueva instancia de la clase <see cref="TipoentidadimplEntity"/>.
        /// </summary>
        public TipoentidadimplEntity()
        {
            CodTipoEntidad = 0;
            RutEntidad = 0;
            RutPersonalidadJuridica = 0;

        }
    }
}
