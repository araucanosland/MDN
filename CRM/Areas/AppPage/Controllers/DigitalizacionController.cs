using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRM.Areas.AppPage.Controllers
{
    public class DigitalizacionController : Controller
    {
        // GET: AppPage/Digitalizacion

      
        public ActionResult Index()
        {

            return View();
        }
        public ActionResult Gestion()
        {
            return View();
        }
        public ActionResult Gestionlegalizados()
        {
            return View();
        }
        public ActionResult GestionAuditoria()
        {
            return View();
        }
        public ActionResult GestionAuditoriaLegalizado()
        {
            return View();
        }
 

    }
}