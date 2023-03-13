using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CPEngine.Models.Web
{
    public class GestionWeb
    {
        public int ges_estado { get; set; }
        public int ges_subestado { get; set; }
        public string ges_prox_gestion { get; set; }
        public string ges_comentarios { get; set; }
        public int ges_id_asignacion { get; set; }
        public int ges_oficina { get; set; }
        public string ges_token { get; set; }
    }

    public class EnvioStackWeb
    {
        public string rut_empresa { get; set; }
        public int oficina { get; set; }
        public string nombre_empresa { get; set; }
    }
}