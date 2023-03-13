using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using CRM.Filters;
using System.Security.Cryptography;
using System.Text;

namespace CRM.Areas.AppPage.Controllers
{
    public class CosalController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}