using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CPEngine.Models.Entity;

namespace CPEngine.Models.Base
{
    public class GestionBase
    {
        public string  NombreEjecutivo { get; set; }
        public string RutEjecutivo { get; set; }
        public GestionEntity Gestion { get; set; }
        public EstadogestionEntity EstadoGestion { get; set; }
        public EstadogestionEntity SubEstadoGestion { get; set; }
    }
}