using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRM.Areas.AppPage.Controllers
{
    public class MantenedoresController : Controller
    {
        // GET: AppPage/Mantenedores
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult IngresoUsuario()
        {
            return View();
        }


        public ActionResult ListarUsuarios()
        {
            return View();
        }



        [HttpPost]
        public ActionResult Upload()
        {
            var file = Request.Files[0];
            var fileName = Path.GetFileName(file.FileName);
            string extension = Path.GetExtension(file.FileName);
            if (extension.Equals(".jpeg") || extension.Equals(".jpg"))
            {
                if (Request.Files.Count > 0)
                {
                    if (file != null && file.ContentLength > 0)
                    {
                        var nombreFinal = "imagen_popup" + extension;
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


        [HttpPost]
        public ActionResult Upload_Image()
        {
            var file = Request.Files[0];
            var fileName = Path.GetFileName(file.FileName);
            string extension = Path.GetExtension(file.FileName);
            if (extension.Equals(".jpeg") || extension.Equals(".jpg"))
            {
                if (Request.Files.Count > 0)
                {
                    if (file != null && file.ContentLength > 0)
                    {
                        var nombreFinal = "imagen_popup" + extension;
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
