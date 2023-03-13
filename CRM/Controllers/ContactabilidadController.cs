using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CRM.Business.Entity;
using CRM.Business.Entity.Clases;
using CRM.Business.Entity.Contracts;
using CRM.Business.Data;
using CRM.ActionFilters;
using CRM.Filters;
using CRM.Business.Entity.Contactibilidad;
using CRM.Business.Data.ContactabilidadDataAccess;

namespace CRM.Areas.AppPage.Controllers
{
    [RoutePrefix("api/Contactos")]
    public class ContactabilidadController : ApiController
    {

        [AuthorizationRequired]
        [HttpGet]
        [Route("obetener-compania-contacto-AT")]
        public IEnumerable<CompaniaAT> ObetenercompaniacontactoAT(int Oficina,string CargoAT,string OficinaAT)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();

            IEnumerable<CompaniaAT> compania= ContactabilidadDataAccess.ObtenerCompania(Oficina,CargoAT,OficinaAT);

            return compania;
        }





        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-contactos-afi")]
        public IEnumerable<Business.Entity.Contactibilidad.ContactabilidadEntity> ListarContactoAfiliado(int RutAfiliado)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return Business.Data.ContactabilidadDataAccess.ContactabilidadDataAccess.ListarContacto(RutAfiliado);
        }


        [AuthorizationRequired]
        [HttpGet]
        [Route("actualiza-indice-contacto")]
        public int ActualizaIndice(int Indice, int RutAfi, string ValorDato, int Oficina)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return Business.Data.ContactabilidadDataAccess.ContactabilidadDataAccess.ActualizarIndiceContacto(Indice, RutAfi, ValorDato, token, Oficina);
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("ingresa-nuevo-contacto")]
        public int NuevoContacto(int RutAfiliado, int idTipoContac, string GlosaTipoContac, int IdClasifContac, string GlosaClasifContac, string DatosContac)
        {
            return Business.Data.ContactabilidadDataAccess.ContactabilidadDataAccess.InsertaNuevoContacto(RutAfiliado, idTipoContac, GlosaTipoContac, IdClasifContac, GlosaClasifContac, DatosContac);
        }
    }

    //[AuthorizationRequired]
    //[HttpGet]
    //[Route("lista-indice-contacto")]
    //public IEnumerable<Business.Entity.Contactibilidad.IndiceContactabilidad> ListarIndiceContacto()
    //{
    //    return Business.Data.ContactabilidadDataAccess.ContactabilidadDataAccess.ListarIndice();
    //}
}

