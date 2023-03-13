using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Configuration;
using CRM.Security.Data;

namespace CRM.Filters
{
    public class PermisosAppFilter : ActionFilterAttribute
    {
        private const string Token = "Token";
        private string BaseUrl = ConfigurationManager.AppSettings["ServidorApi"];
        private const string urlExpired =  "/motor/Home/Acceso";
        private const string urlSinPermiso = "/motor/App/Inicio/SinPermiso";


        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            Providers.TokenService provider = new Providers.TokenService();
            
            if (filterContext.HttpContext.Request.Cookies[Token] != null)
            {
                string tokenValue = filterContext.HttpContext.Request.Cookies[Token].Value;
                string nmbAccion = filterContext.ActionDescriptor.ActionName;
                string nmbControlador = filterContext.ActionDescriptor.ControllerDescriptor.ControllerName;
                // Validate Token
                if (provider != null && !provider.ValidateToken(tokenValue))
                {
                    filterContext.Result = new RedirectResult(BaseUrl + urlExpired);
                }
                else
                {
                    bool permitido = PermisodetalleDataAccess.VerificarPermiso(tokenValue, nmbControlador, nmbAccion);
                    if (!permitido)
                    {
                        filterContext.Result = new RedirectResult(BaseUrl + urlSinPermiso);
                    }
                    /*else
                    {
                        //limpiar cache si viene en true de la base
                        filterContext.HttpContext.Response.Cache.SetExpires(DateTime.UtcNow.AddDays(-1));
                        filterContext.HttpContext.Response.Cache.SetValidUntilExpires(false);
                        filterContext.HttpContext.Response.Cache.SetRevalidation(HttpCacheRevalidation.AllCaches);
                        filterContext.HttpContext.Response.Cache.SetCacheability(HttpCacheability.NoCache);
                        filterContext.HttpContext.Response.Cache.SetNoStore();
                    }*/

                    
                    
                }
            }
            else
            {
                filterContext.Result = new RedirectResult(BaseUrl + urlExpired);
            }

            base.OnActionExecuting(filterContext);
        }
    }
}