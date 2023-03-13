using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CRM.Filters;

namespace CRM.Areas.AppPage.Controllers
{
    [PermisosAppFilter]
    public class InformesController : Controller
    {
        // GET: AppPage/Informes
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult DetalleEjecutivoTracking(int RutEjecutivo)
        {
            return View();
        }

        public ActionResult Comisiones()
        {
            return View();
        }

        public ActionResult DetalleEjecutivoNormalizacion(int RutEjecutivo)
        {
            return View();
        }

        public ActionResult TrackingPais()
        {
            return View();
        }
        public ActionResult TrackingZonal (int Periodo, int CodZona)
        {
            return View();
        }

        public ActionResult TrackingZonalNormalizacion(int Periodo, int CodZona)
        {
            return View();
        }

        public ActionResult SeguimientoGP()
        {
            return View();
        }
        public ActionResult Tracking(int CodOficina,int Periodo)
        {
            return View();
        }
        public ActionResult TrackingNormalizacion (int CodOficina,int Periodo)
        {
            return View();
        }

        public ActionResult ArchivoGP()
        {
            return View();
        }


    }
}