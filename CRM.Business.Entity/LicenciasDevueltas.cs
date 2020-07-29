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
        



    }
}
