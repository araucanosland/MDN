using CRM.Business.Data;
using CRM.Business.Entity;
using CRM.Business.Entity.Clases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;

namespace CRM.Controllers
{
    [RoutePrefix("api/pensionados")]
    public class PensionadosController : ApiController
    {
        [HttpGet]
        [Route("listar-Usuarios")]
        public IEnumerable<UsuarioEntity> Lista_usuario()
        {
            // string token = ActionContext.Request.Headers.GetValues("Token").First();
            CookieHeaderValue cookie = Request.Headers.GetCookies("Oficina").FirstOrDefault();

            List<UsuarioEntity> usu = MantenedoresDataAccess.ListarUsuarios("");

            return usu;
        }

        #region prioridad
        //[HttpGet]
        //[Route("listar-pensionados_prioridad")]
        //public IEnumerable<PensionadosUnoPorcientoPrioridadEntity> Listar_Prioridad(int idprioridad)
        //{
        //    List<PensionadosUnoPorcientoPrioridadEntity> prioridad = PensionadosDataAccess.ListaPensionadosPrioridad(idprioridad);
        //    return prioridad;
        //}
        #endregion

        #region comunas
        //[HttpGet]
        //[Route("listar-pensionados_comunas")]
        //public IEnumerable<PensionadosUnoPorcientoComunasEntity> Listar_Comunas(int idcomuna)
        //{
        //    List<PensionadosUnoPorcientoComunasEntity> comunas = PensionadosDataAccess.ListaPensionadosComunas(idcomuna);
        //    return comunas;
        //}
        #endregion



        [HttpGet]
        [Route("listar-pensionados_estadosgestionnull")]
        public IEnumerable<EstadoGestionPensionadoEntity> Listar_EstadosGestionNull()
        {
            List<EstadoGestionPensionadoEntity> estadosgestion = PensionadosDataAccess.ListaPensionadosEstadosGestionNull();
            return estadosgestion;
        }

        #region estadogestionid
        //[HttpGet]
        //[Route("listar-pensionados_estadosgestion")]
        //public IEnumerable<EstadoGestionPensionadoEntity> Listar_EstadosGestion(int id)
        //{
        //    List<EstadoGestionPensionadoEntity> estadosgestion = PensionadosDataAccess.ListaPensionadosEstadosGestion(id);
        //    return estadosgestion;
        //}

        #endregion



        [HttpGet]
        [Route("listar-pensionados_subestadosgestion")]
        public IEnumerable<EstadoGestionPensionadoEntity> Listar_SubEstadosGestion(int padre)
        {
            List<EstadoGestionPensionadoEntity> estadosgestion = PensionadosDataAccess.ListaPensionadosSubEstadosGestion(padre);
            return estadosgestion;
        }

        #region listarpensionadoid
        //[HttpGet]
        //[Route("listar-pensionados_uno_Porciento")]
        //public IEnumerable<PensionadosUnoPorcientoEntity> Listar_Lead(string nombre, string comuna, int prioridad, int estadoGestion, string rutEjecutivo, string marca, int oficina, int periodo, string pex, string fecha_compromiso)
        //{
        //    List<PensionadosUnoPorcientoEntity> pensio = PensionadosDataAccess.ListaPensionadosUnoPorciento(nombre,comuna,prioridad,estadoGestion,rutEjecutivo,marca,oficina,periodo,pex,fecha_compromiso);
        //    return pensio;
        //}

        //[HttpGet]
        //[Route("listar-pensionados_uno_Porciento_Id")]
        //public IEnumerable<PensionadosUnoPorcientoEntity> Listar_Lead(int id)
        //{
        //    List<PensionadosUnoPorcientoEntity> pensio = PensionadosDataAccess.ListaPensionadosUnoPorcientoId(id);
        //    return pensio;
        //}
        #endregion

        [HttpGet]
        [Route("listar-pensionados_uno_Porciento")]
        public IEnumerable<PensionadosUnoPorcientoEntity> Listar_Lead(string rut,string epp,int estado_id)
        {
            List<PensionadosUnoPorcientoEntity> pensio = PensionadosDataAccess.ListaPensionadosUnoPorciento(rut,epp,estado_id);
            return pensio;
        }

        #region atualizalead
        //[HttpPost]
        //[Route("Actualiza-Contacto-Pensionado")]
        //public ResultadoBase ActualizarContacto(PensionadosUnoPorcientoLeadEntity web)
        //{
        //    try
        //    {
        //        PensionadosDataAccess.ActualizaContactoPensionadoUnoPorciento(web);
        //        return new ResultadoBase() { Estado = "OK", Mensaje = "Datos OK", Objeto = "entrada" };
        //    }
        //    catch (Exception ex)
        //    {
        //        var x = ex.Message.Split(';');
        //        return new ResultadoBase() { Estado = "ERR", Mensaje = x[1], Objeto = x[0] };
        //    }
        //}
        #endregion

        #region guardacontacto
        //[HttpPost]
        //[Route("Guardar-Contacto-Pensionados")]
        //public ResultadoBase GuardarContactoPensionadoUnoPorciento(WebContactoPensionados web)
        //{
        //    try
        //    {
        //        PensionadosDataAccess.GuardaContactoPensionadoUnoPorciento(web);
        //        return new ResultadoBase() { Estado = "OK", Mensaje = "Datos OK", Objeto = "entrada" };
        //    }
        //    catch (Exception ex)
        //    {
        //        var x = ex.Message.Split(';');
        //        return new ResultadoBase() { Estado = "ERR", Mensaje = x[1], Objeto = x[0] };
        //    }
        //}
        #endregion

        #region estadogestioncontacto
        //[HttpGet]
        //[Route("listar-pensionados_estadogestincontacto")]
        //public IEnumerable<UltimoContactoPensionados> ListaEstadoGestionContacto(int id, int oficina)
        //{
        //    List<UltimoContactoPensionados> estadogestion = PensionadosDataAccess.ListaEstadoGestionContacto(id, oficina);
        //    return estadogestion;
        //}
        #endregion



        [HttpGet]
        [Route("listar-historial_gestion_pensionado")]
        public IEnumerable<WebPensionadosUnoPorcientoGestionEntity> ListaHistorialGestion(string rut, int periodo)
        {
            List<WebPensionadosUnoPorcientoGestionEntity> estadogestion = PensionadosDataAccess.ListaHistorialGestionPensionados(rut, periodo);
            return estadogestion;
        }

        #region estadocontacto
        //[HttpGet]
        //[Route("listar-gestion-estado_contacto_pensionado")]
        //public IEnumerable<EstadoGestionPensionadoEntity> ListaEstadoContactoPensionado()
        //{
        //    List<EstadoGestionPensionadoEntity> estadogestion = PensionadosDataAccess.ListaEstadoContactoPensionado();
        //    return estadogestion;
        //}
        #endregion


        [HttpPost]
        [Route("Guardar-Gestion-Pensionados")]
        public ResultadoBase GuardarGestionPensionadoUnoPorciento(PensionadosUnoPorcientoGestionEntity web)
        {
            try
            {
                CookieHeaderValue cookie = Request.Headers.GetCookies("Rut").FirstOrDefault();
                string Rutejecutivo = cookie.Cookies.FirstOrDefault(s => s.Name == "Rut").Value;
                web.EjecutivoRut = Rutejecutivo;
                PensionadosDataAccess.GuardarGestionPensionadoUnoPorciento(web);
                return new ResultadoBase() { Estado = "OK", Mensaje = "Datos OK", Objeto = "entrada" };
            }
            catch (Exception ex)
            {
                var x = ex.Message.Split(';');
                return new ResultadoBase() { Estado = "ERR", Mensaje = x[1], Objeto = x[0] };
            }
        }

        [HttpGet]
        [Route("listar-pensionados_epp")]
        public IEnumerable<PensionadosUnoPorcientoEppEntity> ListarEpp(int idepp)
        {
            List<PensionadosUnoPorcientoEppEntity> epp = PensionadosDataAccess.ListarEpp(idepp);
            return epp;
        }

        [HttpGet]
        [Route("listar-pensionados_beneficios")]
        public IEnumerable<PensionadosUnoPorcientoBeneficiosEntity> Listar_Beneficios(int idbeneficio)
        {
            List<PensionadosUnoPorcientoBeneficiosEntity> beneficio = PensionadosDataAccess.Listar_Beneficios(idbeneficio);
            return beneficio;
        }

        [HttpGet]
        [Route("busca_prospecto")]
        public LeadPensionados Busca_Prospecto(string rut, int periodo)
        {
            LeadPensionados prospecto = PensionadosDataAccess.Busca_Prospecto(rut, periodo);
            return prospecto;
        }
        

    }
}
