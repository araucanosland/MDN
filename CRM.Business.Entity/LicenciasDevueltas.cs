using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Business.Entity
{
    public class LicenciasDevueltas
    {

        public long CodIngreso { get; set; }

        public string RutAfiliado { get; set; }

        public string NombreAfiliado { get; set; }

        public DateTime FechaDevolucion { get; set; }

        public string FolioLicencia { get; set; }

        public string Motivodevolucion { get; set; }


        public string Gestion { get; set; }

        public string Responsable { get; set; }

        public int Devueltas { get; set; }

        public string FechaDevolucionString { get; set; }

        public string FechagestionString { get; set; }
        public string Gestion_xls { get; set; }
        public string descripcionOficina { get; set; }
        public string subcomision { get; set; }
    }
}
