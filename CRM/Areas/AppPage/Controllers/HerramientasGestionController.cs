using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CRM.Business.Data;

namespace CRM.Areas.AppPage.Controllers
{
    public class HerramientasGestionController : Controller
    {
        // GET: AppPage/HerramientasGestion
        public ActionResult Index()
        {
            return View();
        }


        // GET: AppPage/HerramientasGestion/CalculadoraCredito
        public ActionResult CalculadoraCredito()
        {
            return View();
        }

        public ActionResult Falabella()
        {
            return View();
        }

        public ActionResult DetalleFalabella()
        {
            int oficina = Convert.ToInt32(Request.Cookies["Oficina"].Value);
            ViewBag.ListaGestiones  = AfiliadoDataAccess.ListarGestionFalabella(oficina);
            return View();
        }

        public ActionResult EncuestaEmpresa()
        {
            return View();
        }

        public ActionResult RolVerificador()
        {
            return View();
        }

    }
}