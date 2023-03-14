using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Business.Entity.Empresas
{
    public class DireccionEmpresa
    {
        public string Rut { get; set; }
        public string Calle { get; set; }
        public string Numero { get; set; }
        public string DeptoLocal { get; set; }
        public string Region { get; set; }
        public string Comuna { get; set; }
    }
}
