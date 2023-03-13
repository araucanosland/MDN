using System;
using CPEngine.Models.Web;

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
    /// Clase Dominio GestionEntity
    /// </summary>
    /// <author>@Charly</author>
    /// <created>05-09-2017 23:41:09</created>
    /// <remarks>
    /// Esta clase fué generada automáticamente por una herramienta.
    /// Para modificarla, debes modificar su correspondiente tabla en la Base de Datos y luego generar nuevamente esta clase usando la herramienta
    /// </remarks>
    public class GestionEntity
    {

        /// <summary>
        /// CodGestion
        /// </summary>
        public long CodGestion { get; set; }

        /// <summary>
        /// CodAsignacion
        /// </summary>
        public long CodAsignacion { get; set; }

        /// <summary>
        /// FechaAccion
        /// </summary>
        public DateTime FechaAccion { get; set; }

        /// <summary>
        /// FechaCompromiso
        /// </summary>
        public DateTime FechaCompromiso { get; set; }

        /// <summary>
        /// CodEstadoGestion
        /// </summary>
        public int CodEstadoGestion { get; set; }

        /// <summary>
        /// NotaGestion
        /// </summary>
        public string NotaGestion { get; set; }


        /// <summary>
        /// NotaGestion
        /// </summary>
        public string RutEjecutivo { get; set; }


        /// <summary>
        /// NotaGestion
        /// </summary>
        public int CodOficina { get; set; }

        /// <summary>
        /// Inicializa una nueva instancia de la clase <see cref="GestionEntity"/>.
        /// </summary>
        public GestionEntity()
        {
            CodGestion = 0;
            CodAsignacion = 0;
            FechaAccion = new DateTime(1900, 1, 1);
            FechaCompromiso = new DateTime(1900, 1, 1);
            CodEstadoGestion = 0;
            NotaGestion = string.Empty;
            CodOficina = 0;
            RutEjecutivo = string.Empty;
        }
        

        public static GestionEntity ParseWeb(GestionWeb parsear)
        {
            return new GestionEntity
            {
                CodEstadoGestion = parsear.ges_subestado,
                CodAsignacion = parsear.ges_id_asignacion,
                FechaAccion = DateTime.Now,
                FechaCompromiso = parsear.ges_prox_gestion != null ? Convert.ToDateTime(parsear.ges_prox_gestion) : Convert.ToDateTime("1/1/1753 12:00:00"),
                NotaGestion = parsear.ges_comentarios,
                CodOficina = parsear.ges_oficina,
                RutEjecutivo = parsear.ges_token
            };
        }
    }
}
