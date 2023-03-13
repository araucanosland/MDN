using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRM.Areas.AppPage.Controllers
{
    public class PensionadosController : Controller
    {
        // GET: AppPage/Pensionados
        public ActionResult RetencionPensionados()
        {
            return View();
        }

        public ActionResult IngresoPensionadoWeb()
        {
            return View();
        }
        public ActionResult PensionadoWeb()
        {
            return View();
        }
    }
}