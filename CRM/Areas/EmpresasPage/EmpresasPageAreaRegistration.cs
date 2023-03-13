using System.Web.Http;
using System.Web.Mvc;

namespace CRM.Areas.EmpresasPage
{
    public class EmpresasPageAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "EmpresasPage";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {




            /*context.MapRoute(
               "AppPage_CampsEngineL",
               "App/Engine/{action}/{cc}",
               new { controller = "Engine", action = "Index", cc = UrlParameter.Optional }
               );


            context.MapRoute(
               "AppPage_CampsEngineD",
               "App/Engine/{action}/{ca}/{cc}",
               new { controller= "Engine", action = "Detalle", ca = UrlParameter.Optional, cc = UrlParameter.Optional }
               );
               */



            context.MapRoute(
                "EmpresasPage_ListaOfertas",
                "Emp/{controller}/{action}",
                new { controller = "Gestion", action = "Index"});


            context.MapRoute(
                "EmpresasPage_Default",
                "Emp/{controller}/{action}/{apiId}",
                new { controller = "Help", action = "Index", apiId = UrlParameter.Optional });
            

            EmpresasPageConfig.Register(GlobalConfiguration.Configuration);
        }
    }
}