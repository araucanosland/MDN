using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Business.Entity
{
    public class EjecutivoFFVVEntity
    {
        public string Rut { get; set; }
        public string Nombre { get; set; }
        public int Cod_Sucursal { get; set; }
    }

    public class CarteraFFVVEntity
    {
        public int id { get; set; }
        public string rut_ejecutivo { get; set; }
        public string rut_empresa { get; set; }
        public int oficina { get; set; }
        public string nombre_empresa { get; set; }
    }
}
