using System;

namespace CRM.Business.Entity
{
    public class LicenciasLMTimeLine
    {

        public long CodIngreso { get; set; }

        public string RutAfiliado { get; set; }

        public string NombreAfiliado { get; set; }

        public DateTime FechaIngreso { get; set; }

        public DateTime FechaInicio { get; set; }

        public DateTime FechaTermino { get; set; }


        public string FolioLicencia { get; set; }

        public string Estado { get; set; }


        public string Ejecutado { get; set; }

        public string Asignado { get; set; }

        public string Etapa { get; set; }

        public string EtapaActualLicencia { get; set; }

        public int EstadoId { get; set; }
        public string Siguienteetapa { get; set; }

        public int EtapaId { get; set; }


        public string FormatoLM { get; set; }
        public string Quienenvia { get; set; }
        public string Telefono { get; set; }
        public string Email { get; set; }
        public string Oficina { get; set; }
        public int IdEtapaSiguiente { get; set; }


        public string EstadoPronunciamiento { get; set; }
        public string SubComision { get; set; }
        public int DiasAutorizados { get; set; }
        public int CantidadDiasLM { get; set; }
        public DateTime FechaInicioLM { get; set; }
        public DateTime FechaHastaLM { get; set; }






    }
}
