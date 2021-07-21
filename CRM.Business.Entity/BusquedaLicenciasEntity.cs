using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Business.Entity
{
   public  class BusquedaLicenciasEntity
    {

        /// <summary>
        /// CodIngreso
        /// </summary>
        public long CodIngreso { get; set; }

        /// <summary>
        /// RutAfiliado
        /// </summary>
        public string RutAfiliado { get; set; }

        /// <summary>
        /// NombreAfiliado 
        /// </summary>
        public string NombreAfiliado { get; set; }


        /// <summary>
        /// SinDatosEnSistema 
        /// </summary>
        public bool SinDatosEnSistema { get; set; }



        /// <summary>
        /// FolioLicencia
        /// </summary>
        public string FolioLicencia { get; set; }

        /// <summary>
        /// Oficina
        /// </summary>
        public int Oficina { get; set; }

        /// <summary>
        /// Oficina
        /// </summary>
        public string OficinaDescripcion { get; set; }

        /// <summary>
        /// RutEjecutivo
        /// </summary>
        public string RutEjecutivo { get; set; }

        /// <summary>
        /// CodEstado
        /// </summary>
        public int CodEstado { get; set; }

        /// <summary>
        /// FechaIngreso
        /// </summary>
        public DateTime FechaIngreso { get; set; }


        /// <summary>
        /// CantidadDiasLM
        /// </summary>
        public int? CantidadDiasLM { get; set; }

        /// <summary>
        /// FechaInicioLM
        /// </summary>
        public DateTime? FechaInicioLM { get; set; }

        // <summary>
        /// FechaHastaLM
        /// </summary>
        public DateTime? FechaHastaLM { get; set; }

        // <summary>
        /// FechaHastaLM
        /// </summary>
        public string NombreEjecutivo { get; set; }

        /// <summary>
        /// TipoLM
        /// </summary>
        public int? TipoLM { get; set; }
        public string FormatoLM { get; set; }
        public string FlagLM { get; set; }
        public int Lm_Total { get; set; }
        public int Lm_Verde { get; set; }
        public int Lm_Amarillo { get; set; }
        public int Lm_Rojo { get; set; }
        public int Lm_Naranjo { get; set; }
        public string Lm_Actualizacion { get; set; }

        public bool Editable { get; set; }
        public int OficinaDerivacion { get; set; }
        public string EstadoLicencia { get; set; }

        public string descripcionEstadoRevision { get; set; }

        public int  viaIngresoLicenica { get; set; }
        public string Responsable { get; set; }
        public string compincentralizado { get; set; }

        /// <summary>
        /// Inicializa una nueva instancia de la clase <see cref="BusquedaLicenciasEntity"/>.
        /// </summary>
        public BusquedaLicenciasEntity()
        {
            CodIngreso = 0;
            RutAfiliado = string.Empty;
            NombreAfiliado = string.Empty;
            FolioLicencia = string.Empty;
            Oficina = 0;
            RutEjecutivo = string.Empty;
            CodEstado = 0;
            FechaIngreso = new DateTime(1900, 1, 1);
            CantidadDiasLM = null;
            FechaInicioLM = null;
            FechaHastaLM = null;
            TipoLM = null;
            FormatoLM = string.Empty;
            Editable = true;
            FlagLM = string.Empty;
            OficinaDerivacion = 0;
            OficinaDescripcion = string.Empty;
            NombreEjecutivo = string.Empty;
            EstadoLicencia = string.Empty;
            descripcionEstadoRevision = string.Empty;
            Responsable = string.Empty;
            viaIngresoLicenica = 0;
            compincentralizado = string.Empty;
        }

        public class FechaLMEntity
        {
            public int Id { get; set; }
            public string Fecha { get; set; }

        }
    }
}
