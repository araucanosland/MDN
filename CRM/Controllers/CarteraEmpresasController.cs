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
using CRM.Business.Entity.Empresas;
using System.Net.Http.Headers;

namespace CRM.Controllers
{

    [RoutePrefix("api/CarteraEmpresas")]
    public class CarteraEmpresasController : ApiController
    {

        // GET: CarteraEmpresas
        [AuthorizationRequired]
        [HttpGet]
        [Route("obtener-incorporaciones")]
        public IEnumerable<IncorporacionesaEmpresaEntity> ObtEmpresaIncorporaciones(string estado)
        {
            CookieHeaderValue cookie = Request.Headers.GetCookies("Oficina").FirstOrDefault();
            int codOficina = Convert.ToInt32(cookie.Cookies.FirstOrDefault(s => s.Name == "Oficina").Value);
            if (estado == null)
                estado = "Todos";
            return CarteraEmpresaDataAccess.ObtenerEmpresaIncorporacion(codOficina, estado);
        }

        // GET: CarteraEmpresas
        [AuthorizationRequired] 
        [HttpGet]
        [Route("obtener-nombre")]
        public CarteraEmpresaEntity ObtEmpresaNombres(string RutEmpresa)
        {
            return CarteraEmpresaDataAccess.ObtenerDatoEmpresa(RutEmpresa);
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-ejecutivo-cargo")]
        public List<EjecutivoCarteraEntity> ListarEjecutivoCargo(int CodTipo)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return CarteraEmpresaDataAccess.ListarEjecutivoCargo(token, CodTipo);
        }
        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-ejecutivo-admin")]
        public List<EjecutivoCarteraEntity> ListarEjecutivoAdmin()
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return CarteraEmpresaDataAccess.ListarEjecutivoAdmin(token);
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-empresa-ejecutivo")]
        public IEnumerable<CarteraEmpresaEntity> ListarEmpresaEjecutivo()
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return CarteraEmpresaDataAccess.ListaEmpresaEjecutivo(token);
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-empresa-total")]
        public BootstrapTableResult<CarteraEmpresaTotal> ListarEmpresaEjecutivoTotal(int offset, int limit, string search = "")
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            var resultado = new BootstrapTableResult<CarteraEmpresaTotal>();
            resultado.rows = CarteraEmpresaDataAccess.ListarEmpresaTotal(limit, offset, search,token);
            resultado.total = CarteraEmpresaDataAccess.CountEmpresaTotal(search,token);
            
            return resultado;
        }

        [AuthorizationRequired]
        [HttpPost]
        [Route("guardar-cartera-empresa")]
        public ResultadoBase GuardarCartera(WebCarteraEmpresa entrada)
        {

            try
            {
                string token = ActionContext.Request.Headers.GetValues("Token").First();
                IngresoCarteraEmpresa ing = new IngresoCarteraEmpresa();

                ing.CodIngresoEmpresa = entrada.webCodIngreso;
                ing.RutEmpresa = entrada.webRutEmpresa.Replace(".", "");
                ing.NombreEmpresa = entrada.webNombreEmpresa;
                ing.TipoEjectEmpresa = entrada.webTipoEjecutivo;
                ing.RutEjecutivo = entrada.webRutEjecutivo.Replace(".", "");
                ing.NombreEjecutivo = entrada.webNombreEjecutivo;
                

                IngresoCarteraEmpresaDataAccess.Guardar(ing, token);
                return new ResultadoBase() { Estado = "OK", Mensaje = "Ingreso Correcto", Objeto = entrada };
            }
            catch (Exception ex)
            {
                return new ResultadoBase() { Estado = "ERR", Mensaje = "Error en el ingreso: " + ex.Message, Objeto = ex };
            }
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("cartera-data")]
        public IngresoCarteraEmpresa DatoCarteraEmpresa(int codIngreso)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return IngresoCarteraEmpresaDataAccess.ObtenerPorID(codIngreso);
            
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("eliminar-cartera-empresa")]
        public ResultadoBase EliminarCarteraEmpresa(int CodIngreso)
        {
            try
            {
                IngresoCarteraEmpresaDataAccess.Eliminar(CodIngreso);
                return new ResultadoBase() { Estado = "OK", Mensaje = "Registro Eliminado con éxito", Objeto = CodIngreso };
            }
            catch (Exception ex)
            {
                return new ResultadoBase() { Estado = "ERR", Mensaje = "Error al eliminar " + ex.Message, Objeto = ex };
            }
        }

        ///Admin
        [AuthorizationRequired]
        [HttpGet]
        [Route("listar-empresa-admin")]
        public IEnumerable<CarteraEmpresaAdmin> ListarEmpresaAdmin()
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return CarteraEmpresaDataAccess.ListarEmpresaAdmin(token);
        }

        [AuthorizationRequired]
        [HttpPost]
        [Route("guardar-cartera-empresa-admin")]
        public ResultadoBase GuardarCarteraAdmin([FromBody] IngresoCarteraEmpresaAdmin entrada)
        {
            try
            {
                string token = ActionContext.Request.Headers.GetValues("Token").First();
                long id = IngresoCarteraEmpresaAdminDataAccess.Guardar(entrada, token);

                foreach (var item in entrada.EjecAsignado)
                {
                    IngresoCarteraEmpresaAdminDataAccess.GuardarAsignacion(item, id);
                } 
                return new ResultadoBase() { Estado = "OK", Mensaje = "Ingreso Correcto", Objeto = entrada };
            }
            catch (Exception ex)
            {
                return new ResultadoBase() { Estado = "ERR", Mensaje = "Error en el ingreso: " + ex.Message, Objeto = ex };
            }
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("eliminar-cartera-empresa-admin")]
        public ResultadoBase EliminarCarteraEmpresaAdmin(int CodIngreso)
        {
            try
            {
                IngresoCarteraEmpresaAdminDataAccess.Eliminar(CodIngreso);
                return new ResultadoBase() { Estado = "OK", Mensaje = "Registro Eliminado con éxito", Objeto = CodIngreso };
            }
            catch (Exception ex)
            {
                return new ResultadoBase() { Estado = "ERR", Mensaje = "Error al eliminar " + ex.Message, Objeto = ex };
            }
        }
        [AuthorizationRequired]
        [HttpGet]
        [Route("actualiza-validacion")]
        public ResultadoBase ActualizaValidacion(int CodIngreso)
        {
            try
            {
                IngresoCarteraEmpresaAdminDataAccess.Actualizar(CodIngreso);
                return new ResultadoBase() { Estado = "OK", Mensaje = "Registro Actualizado con éxito", Objeto = CodIngreso };
            }
            catch (Exception ex)
            {
                return new ResultadoBase() { Estado = "ERR", Mensaje = "Error al Actualizar " + ex.Message, Objeto = ex };
            }
        }


        [AuthorizationRequired]
        [HttpGet]
        [Route("cartera-data-admin")]
        public IngresoCarteraEmpresaAdmin DatoCarteraEmpresaAdmin(int codIngreso)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return IngresoCarteraEmpresaAdminDataAccess.ObtenerPorID(codIngreso);

        }


        /*Nuevos metodos para Empresas
         *
         */



        [AuthorizationRequired]
        [HttpGet]
        [Route("buscar-empresa")]
        public IHttpActionResult BuscarEmpresa(string query)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();


            return Ok(CarteraEmpresaDataAccess.ObtenerEmpresaPorNombreRutOHolding(query));
            
        }

        [AuthorizationRequired]
        [HttpPost]
        [Route("validar-ingreso-empresa")]
        public IHttpActionResult ValidarIngresoEmpresaOPunto(DireccionEmpresa empresa)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();

            try
            {
                CarteraEmpresaDataAccess.ValidarIngresoPunto(empresa);

                return Ok("Passing");
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}