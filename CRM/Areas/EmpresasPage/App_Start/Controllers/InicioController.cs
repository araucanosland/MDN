using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CRM.Filters;

namespace CRM.Areas.EmpresasPage.Controllers
{
    
    public class InicioController : Controller
    {
       
        // GET: AppPage/Inicio
        public ActionResult Index()
        {
            return View();
        }


        // GET: AppPage/Inicio
        public ActionResult SinPermiso()
        {
            return View();
        }

        public ActionResult DirectoresLaborales()
        {
            return View();
        }


        public ActionResult Campanias()
        {
            return View();
        }
    }
}