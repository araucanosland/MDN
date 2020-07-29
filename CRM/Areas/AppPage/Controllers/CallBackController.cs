using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CRM.Areas.AppPage.Controllers
{
    public class CallBackController : Controller
    {
        // GET: AppPage/CallBack
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult DiferimientoCall()
        {
            return View("DiferimientoCall");
        }
    }
}