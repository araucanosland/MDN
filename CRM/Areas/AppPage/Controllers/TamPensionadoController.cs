using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CRM.Areas.AppPage.Models;

namespace CRM.Areas.AppPage.Controllers
{
    public class TamPensionadoController : Controller
    {
        // GET: AppPage/TamPensionado
        public ActionResult Index()
        {
            return View();
        }

        //[Route("{rut}/resume/{id}")]
        public ActionResult Resume(string rut, string id)
        {
            ViewBag.rut = rut;
            ViewBag.id = id;
            return View("Index");
        }

        //[Route("query/{rut}/detail/{gestion}")]
        public ActionResult Detail(string rut, int id)
        {
            ViewBag.id = id;
            ViewBag.rut = rut;
            return View();
        }
    }
}