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
    /// Clase Dominio ContactoEntity
    /// </summary>
    /// <author>@Charly</author>
    /// <created>05-09-2017 23:35:26</created>
    /// <remarks>
    /// Esta clase fué generada automáticamente por una herramienta.
    /// Para modificarla, debes modificar su correspondiente tabla en la Base de Datos y luego generar nuevamente esta clase usando la herramienta
    /// </remarks>
    public class ContactoEntity
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
        /// CodCategoria
        /// </summary>
        public int CodCategoria { get; set; }

        /// <summary>
        /// CodTipo
        /// </summary>
        public int CodTipo { get; set; }

        /// <summary>
        /// ValorContacto
        /// </summary>
        public string ValorContacto { get; set; }

        /// <summary>
        /// CodContacto
        /// </summary>
        public long CodContacto { get; set; }


        /// <summary>
        /// Inicializa una nueva instancia de la clase <see cref="ContactoEntity"/>.
        /// </summary>
        public ContactoEntity()
        {
            CodTipoEntidad = 0;
            RutEntidad = 0;
            CodCategoria = 0;
            CodTipo = 0;
            ValorContacto = string.Empty;
            CodContacto = 0;

        }
    }
}
