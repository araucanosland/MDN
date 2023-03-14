using System;

//------------------------------------------------------------------------------
// <generado automáticamente>
//     Este código fue generado por una herramienta.
//
//     Los cambios en este archivo podrían causar un comportamiento incorrecto y se perderán si
//     se vuelve a generar el código.
// </generado automáticamente>
//------------------------------------------------------------------------------

namespace CRM.Business.Entity
{
    /// <summary>
    /// Clase Dominio Ingresolicencia
    /// </summary>
    /// <author>@Charly</author>
    /// <created>28-09-2017 16:33:09</created>
    /// <remarks>
    /// Esta clase fué generada automáticamente por una herramienta.
    /// Para modificarla, debes modificar su correspondiente tabla en la Base de Datos y luego generar nuevamente esta clase usando la herramienta
    /// </remarks>
    public class Ingresolicencia
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
        public string Responsable { get; set; }
        public string EstadoCarga { get; set; }
        public string compincentralizado { get; set; }
        public string FolioCompin { get; set; }
        public string Subcomision { get; set; }
        public DateTime Subido_a_plataforma_compin { get; set; }
        public string EstadoActivo { get; set; }
        public DateTime FechaGestion { get; set; }
        public string EjecutadoPor { get; set; }
        public int Flagas400 { get; set; }
        public int DiasLicencia { get; set; }
        public DateTime FechaLicenciaDesde { get; set; }
        public DateTime FechaLicenciaHasta { get; set; }
        public string Glosa { get; set; }


        public string EntidadPAgo { get; set; }
        public string TipoPAgo { get; set; }
        public string MontoPago { get; set; }
        public string EstadoPago { get; set; }
        public string Fechapago { get; set; }
        public string TipoLicencia { get; set; }
        public string TipoSubLicencia { get; set; }
        public string TipoConvenio { get; set; }
        public string FechaPrescribeString { get; set; }
        public string RutEmpresa { get; set; }
        public string NombreEmpresa { get; set; }
        public string FechaActulizacionString { get; set; }
        public string AnexoEstamento { get; set; }

        /// <summary>
        /// Inicializa una nueva instancia de la clase <see cref="Ingresolicencia"/>.
        /// </summary>
        public Ingresolicencia()
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
            Responsable = string.Empty;
            EstadoCarga = string.Empty;
            compincentralizado = string.Empty;
            Subcomision = string.Empty;
            Subido_a_plataforma_compin = new DateTime(1900, 1, 1);
            FolioCompin = string.Empty;
            EstadoActivo = string.Empty;
            FechaGestion = new DateTime(1900, 1, 1);
            EjecutadoPor = string.Empty;
            Flagas400 = 0;
            DiasLicencia = 0;
            FechaLicenciaDesde = new DateTime(1900, 1, 1);
            FechaLicenciaHasta = new DateTime(1900, 1, 1);


        }

    }
}
