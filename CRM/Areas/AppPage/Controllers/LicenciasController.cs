using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CRM.Filters;

namespace CRM.Areas.AppPage.Controllers
{
    //[PermisosAppFilter]
    public class LicenciasController : Controller
    {
        // GET: AppPage/Licencias
        public ActionResult Index()
        {
            return View();
        }

        // GET: AppPage/Licencias/Ingreso
        public ActionResult Ingreso()
        {
            return View();
        }

        public ActionResult PagosDisponibles()
        {
            return View();
        }

        public ActionResult BusquedaLicencia()
        {
            return View();
        }

        public ActionResult AuditoriaLicencia()
        {
            return View();
        }

        public ActionResult ListarAuditoriaLicencia()
        {
            return View();
        }

        public ActionResult VistaCallMultiOficina()
        {
            return View();
        }



        public ActionResult LineaTiempoLM()
        {
            return View();
        }


        public ActionResult CargaArchivosLM()
        {
            return View();
        }

        public ActionResult ListarRRLL()
        {
            return View();
        }



        [HttpPost]
        public ActionResult Upload()
        {
            var file = Request.Files[0];
            var fileName = Path.GetFileName(file.FileName);
            string extension = Path.GetExtension(file.FileName);
            if (extension.Equals(".xlsx") || extension.Equals(".xls"))
            {
                if (Request.Files.Count > 0)
                {
                    if (file != null && file.ContentLength > 0)
                    {
                        var nombreFinal = "Seguimiento GrandPrix" + extension;
                        var path = Path.Combine(Server.MapPath("~/Assets/data"), nombreFinal);
                        file.SaveAs(path);
                    }
                }
            }
            else
            {
                return Json(new { message = "Archivo no compatible..." });
            }
            return Json(new { message = "OK" });
        }
    }
}