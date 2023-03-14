using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Business.Entity
{
    public class CargaExcelRRLLEntity
    {
        public string FolioLicencia { get; set; }
        public string Estado { get; set; }
        public string FechaSubidaTATA { get; set; }
        public string FechasubidaCompin { get; set; }
        public string Subcomision { get; set; }
        public string CargaExcel { get; set; }
        public DateTime FechaCompin { get; set; }
        public string Oficina { get; set; }
        public string RutAfiliado { get; set; }
        public DateTime FechaAuditoria { get; set; }
        public DateTime FechaIngreso { get; set; }
        public DateTime diarecepcion { get; set; }
        public string observacion { get; set; }
        public string FechaIngresoString { get; set; }
        public string FechaAuditoriaString { get; set; }
        public string FechaSubidaCompinString { get; set; }

    }
}
