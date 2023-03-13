using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CPEngine.Models.Entity;

namespace CPEngine.Models.Base
{
    public class AtributoBase
    {
        public AtributoEntity Atributo { get; set; }
        public AttrvaloresEntity Valor { get; set; }
    }
}