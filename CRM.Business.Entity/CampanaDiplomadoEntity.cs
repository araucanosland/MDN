using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Business.Entity
{
    public class CampanaDiplomadoEntity
    {
        public long Id { get; set; }
        public string Rut_Empresa { get; set; }
        public string Nombre_Empresa { get; set; }
        public string Nombre_Punto { get; set; }
        public string Oficina { get; set; }
        public string Zona { get; set; }
        public string Estamento { get; set; }
        public string Cargo { get; set; }
        public string Cluster { get; set; }
        public string Nombre_Contacto { get; set; }
        public long Fono { get; set; }
        public string Mail { get; set; }
        public DateTime Fecha_Ingreso { get; set; }
        public string Estado_Encuesta { get; set; }
        public string SubEstado { get; set; }

    }

    public class EstadoGestionEntity
    {
        public int eg_id { get; set; }
        public string eg_nombre { get; set; }
        public int eg_id_padre { get; set; }
    }

    public class GestionDiplomadoEntity
    {
        public int Id_lead { get; set; }
        public string Estamento { get; set; }
        public string Cargo { get; set; }
        public string Nombre { get; set; }
        public string Fono { get; set; }
        public string Mail { get; set; }
        public string Llamado { get; set; }
        public int Estado_id { get; set; }
        public int SubEstado_id { get; set; }
        public string RutEjecutivo { get; set; }

    }

}
