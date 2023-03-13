using System.Web.Http;
using System.Web.Mvc;

namespace CRM.Areas.AppPage
{
    public class AppPageAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "AppPage";
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
                "AppPage_ListaOfertas",
                "App/{controller}/{action}",
                new { controller = "Gestion", action = "Index"});

            context.MapRoute(
                "AppPage_Oferta",
                "App/{controller}/{action}/{periodo}/{rut}/{tipo}",
                new { controller = "Gestion", action = "Oferta", periodo = 0, rut = '0', tipo=0 });


            context.MapRoute(
                "AppPage_Default",
                "App/{controller}/{action}/{apiId}",
                new { controller = "Help", action = "Index", apiId = UrlParameter.Optional });
            

            AppPageConfig.Register(GlobalConfiguration.Configuration);
        }
    }
}