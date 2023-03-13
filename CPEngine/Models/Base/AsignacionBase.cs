using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CPEngine.Models.Entity;

namespace CPEngine.Models.Base
{
    public class AsignacionBase
    {
        public AsignacionEntity Asignacion { get; set; }
        public EntidadEntity Entidad { get; set; }
        public List<GestionBase> Gestiones { get; set; }
    }
}