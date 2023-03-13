using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CPEngine.Models.Excel
{
    public class AfiliadosSIL9K
    {
        public int Empresa_Rut { get; set; }
        public string Empresa_Dv { get; set; }
        public string Empresa_Nombre { get; set; }
        public int Afiliado_Rut { get; set; }
        public string Afiliado_Dv { get; set; }
        public string Afiliado_Nombre { get; set; }
        public string NumeroLicencia { get; set; }
        public int DiasLicencia { get; set; }
        public int DiasAPago { get; set; }

        public string FechaInicio { get; set; }
        public string FechaTermino { get; set; }
        public string FechaResolucion { get; set; }
        public string MesPrescripcion { get; set; }
        public string SolicitarDato1 { get; set; }
        public string SolicitarDato2 { get; set; }
        public string SolicitarDato3 { get; set; }

    }
}