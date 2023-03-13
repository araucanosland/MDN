using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CPEngine.Models.Entity;

namespace CPEngine.Engine
{
    public interface ICampEngine
    {
        string getAsigAttrValue(int asign, string attr);
        List<AtributoEntity> listAttrCamp(string camp);
         
    }
}