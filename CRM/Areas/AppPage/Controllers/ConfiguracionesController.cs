using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CRM.Filters;

namespace CRM.Areas.AppPage.Controllers
{
    //[PermisosAppFilter]
    public class ConfiguracionesController : Controller
    {
        // GET: AppPage/Configuraciones
        public ActionResult Index()
        {
            return View();
        }

        // GET: AppPage/Configuraciones/Dotacion
        
        public ActionResult Dotacion()
        {
            return View();
        }


        public ActionResult DotacionAsignable()
        {
            return View();
        }


        // GET: AppPage/Configuraciones/DotacionMes
        public ActionResult DotacionMes()
        {
            return View();
        }


        // GET: AppPage/Configuraciones/DotacionMes
    

        // GET: AppPage/Configuraciones/Reasignacion
        public ActionResult Reasignacion()
        {
            return View();
        }


        // GET: AppPage/Configuraciones/Noticias
        public ActionResult Noticias()
        {
            return View();
        }


        // GET: AppPage/Configuraciones/Articulos
        public ActionResult Articulos()
        {
            return View();
        }

        public ActionResult FugaEmpresas()
        {
            return View();
        }

        // GET: AppPage/Configuraciones/SucursalAdmin
        public ActionResult SucursalAdmin()
        {
            return View();
        }
        public ActionResult DotacionMesAdmin(int CodOficina)
        {
            return View();
        }
    }
}