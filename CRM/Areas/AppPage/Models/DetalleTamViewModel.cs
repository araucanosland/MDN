using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Net.Http.Headers;
using System.Web.Http.Description;
using CRM.Areas.AppPage.ModelDescriptions;

namespace CRM.Areas.AppPage.Models
{
    public class DetalleTamViewModel
    {
        public int IdGestion { get; set; }
        public string Rut { get; set; }
    }
}