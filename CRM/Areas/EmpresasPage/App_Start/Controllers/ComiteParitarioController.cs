using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRM.Areas.EmpresasPage.Controllers
{
    public class ComiteParitarioController : Controller
    {
        // GET: Emp/ComiteParitario/SeleccionElector
        public ActionResult SeleccionElector()
        {
            return View();
        }
    }
}