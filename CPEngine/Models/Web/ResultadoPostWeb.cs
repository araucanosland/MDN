using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CPEngine.Models.Web
{
    public class ResultadoPostWeb
    {
        public int Codigo { get; set; }
        public string Descripcion { get; set; }
        public dynamic Objeto { get; set; }
    }
}