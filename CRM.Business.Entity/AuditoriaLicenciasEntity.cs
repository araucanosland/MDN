using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Business.Entity
{
    /// <summary>

    public class AuditoriaLicenciasEntity
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
        public int viaIngresoLicenica { get; set; }
        public int quienEnvia { get; set; }
        public string email { get; set; }
        public string telefono { get; set; }

        public string EtapaActual { get; set; }

        public int Folionovalido { get; set; }
        public int Otromotivo { get; set; }

        public long EstadoRevision { get; set; }
        public int LmIncompleta { get; set; }
        public int Lmnolegible { get; set; }
        public int Lmsindiagnostico { get; set; }
        public int Lmsoncarta { get; set; }
        public string Observacion { get; set; }
        public string RutAuditor { get; set; }
        public string DescripcionEstadoRevision { get; set; }
        public string OficinaDescripcion { get; set; }
        public string estadoLicencia { get; set; }
        public string descripcionquienEnvia { get; set; }
        public int esBanner { get; set; }
        public string DescripcionesBanner { get; set; }
        public DateTime fechaAuditoria { get; set; }
        public DateTime FechaDf { get; set; }
        public string DescripcionOficina { get; set; }
        public string Responsable { get; set; }
        public string EstadoOficina { get; set; }
        public string FechaDato { get; set; }
        public string FechadocumentosString { get; set; }
        public string Fechaauditoria { get; set; }
        public string FormatoLmIncompleta { get; set; }
        public string Formatolmnolegible { get; set; }
        public string Formatolmsindiagnostico { get; set; }
        public string Formatolmsoncarta { get; set; }
        public string FormatoFolionovalido { get; set; }
        public string FormatoOtromotivo { get; set; }
        public string OrdenaNombre { get; set; }
        public string descripcionviaIngreso { get; set; }
        public string compincentralizado { get; set; }
        public string FolioCompin { get; set; }
        public string Subcomision { get; set; }
        public DateTime Subido_a_plataforma_compin { get; set; }
        /// <summary>
        /// Inicializa una nueva instancia de la clase <see cref="AuditoriaLicenciasEntity"/>.
        /// </summary>
        public AuditoriaLicenciasEntity()
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
            EtapaActual = string.Empty;
            FlagLM = string.Empty;
            OficinaDerivacion = 0;
            viaIngresoLicenica = 0;
            quienEnvia = 0;
            email = string.Empty;
            telefono = string.Empty;
            EstadoRevision = 0;
            LmIncompleta = 0;
            Lmnolegible = 0;
            Lmsindiagnostico = 0;
            Lmsoncarta = 0;
            Observacion = string.Empty;
            RutAuditor = string.Empty;
            DescripcionEstadoRevision = string.Empty;
            OficinaDescripcion = string.Empty;
            estadoLicencia = string.Empty;
            descripcionquienEnvia = string.Empty;
            Folionovalido = 0;
            Otromotivo = 0;
            esBanner = 0;
            DescripcionesBanner = string.Empty;
            fechaAuditoria = new DateTime(1900, 1, 1);
            FechaDf = new DateTime(1900, 1, 1);
            DescripcionOficina = string.Empty;
            Responsable = string.Empty;
            EstadoOficina = string.Empty;
            FechaDato = string.Empty;
            FechadocumentosString = string.Empty;
            Fechaauditoria = string.Empty;
            FormatoLmIncompleta = string.Empty;
            Formatolmnolegible = string.Empty;
            Formatolmsindiagnostico = string.Empty;
            Formatolmsoncarta = string.Empty;
            FormatoFolionovalido = string.Empty;
            FormatoOtromotivo = string.Empty;
            OrdenaNombre = string.Empty;
            descripcionviaIngreso = string.Empty;
            compincentralizado = string.Empty;
            FolioCompin = string.Empty;
            Subcomision = string.Empty;
            Subido_a_plataforma_compin = new DateTime(1900, 1, 1);
            /// <summary>
        }

    }
}
