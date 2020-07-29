﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
        public string EtapaAuditoria { get; set; }

        public int IDetapaAuditoria { get; set; }



       }
}