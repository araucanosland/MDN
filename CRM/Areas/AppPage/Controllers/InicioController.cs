using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CRM.Filters;

namespace CRM.Areas.AppPage.Controllers
{
    
    public class InicioController : Controller
    {
        [PermisosAppFilter]
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
    }
}