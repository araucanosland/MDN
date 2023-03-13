using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Configuration;

//[AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, AllowMultiple = false, Inherited = true)]
namespace CRM.Filters
{
    public class TokenFilter : ActionFilterAttribute
    {
        private const string Token = "Token";
        private string BaseUrl = ConfigurationManager.AppSettings["ServidorApi"];

        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var provider = new CRM.Providers.TokenService();
            if (filterContext.HttpContext.Request.Cookies[Token] != null)
            {
                var tokenValue = filterContext.HttpContext.Request.Cookies[Token].Value;
                // Validate Token
                if (provider != null && !provider.ValidateToken(tokenValue))
                {
                    filterContext.Result = new RedirectResult(BaseUrl + "/motor/home/Acceso");
                }
            }
            else
            {
                filterContext.Result = new RedirectResult(BaseUrl + "/motor/home/Acceso");
            }

            base.OnActionExecuting(filterContext);
        }
    }
}