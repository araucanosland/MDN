using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRM.Areas.AppPage.Controllers
{
    public class DatosAfiliadosController : Controller
    {
        // GET: AppPage/DatosAfiliados
        public ActionResult Index(string RutBuscar)
        {
            return View();
        }

        public ActionResult EncuestaEnfermedadesCall(string RutBuscar)
        {
            return View("Encuesta/EncuestaEnfermedadesCall");
        }


    }
}