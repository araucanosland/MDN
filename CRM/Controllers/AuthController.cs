using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Configuration;
using System.Net.Http;
using System.Web.Http;
using CRM.Security.Data;
using CRM.Security.Entity;
using CRM.Business.Data;
using CRM.Filters;
using CRM.ActionFilters;
using CRM.Providers;
using System.Security.Cryptography;
using System.Text;
using System.IO;
using System.Threading.Tasks;
using System.Net.Http.Headers;
using Newtonsoft.Json;

namespace IA.Security.Api.Controllers
{
    [RoutePrefix("api/Auth")]
    public class AuthController : ApiController
    {
        private readonly TokenService _tokenServices;
        private string baseUrl = ConfigurationManager.AppSettings["ServidorApi"];
        private string redirectUrl = ConfigurationManager.AppSettings["UrlInicio"];
        public AuthController()
        {
            _tokenServices = new TokenService();
        }


        [ApiAuthenticationFilter(false)]
        [HttpGet]
        [Route("authenticate")]
        public HttpResponseMessage Authenticate(string re)
        {
            Usuario usr = UsuarioDataAccess.UsuarioData(re);
            if (usr.IdUsuario != 0)
            {
                var x = GetAuthToken(usr);
                x.Headers.Location = new Uri(baseUrl + redirectUrl);
                return x;
            }
            return null;
        }


        [ApiAuthenticationFilter(false)]
        [HttpPost]
        [Route("v2/authenticate")]
        public HttpResponseMessage Authenticate2(UsuarioAccesoWeb acceso)
        {
            Usuario usr = UsuarioDataAccess.UsuarioData(acceso.Cuenta);
            if (usr.IdUsuario != 0)
            {
                using (MD5 md5Hash = MD5.Create())
                {
                    var enkpas = GetMd5Hash(md5Hash, acceso.Clave);
                    if (usr.ClaveAcceso.Equals(enkpas.ToUpper()))
                    {
                        var x = GetAuthToken(usr);
                        x.Headers.Location = new Uri(baseUrl + redirectUrl);
                        return x;
                    }
                }
            }
            return null;
        }



        [ApiAuthenticationFilter(false)]
        [HttpPost, HttpOptions]
        [Route("call/authenticate")]
        public HttpResponseMessage AuthenticateCall(UsuarioAccesoWeb acceso)
        {

            if (acceso == null)
            {
                return Request.CreateResponse(HttpStatusCode.OK, "Authorized");
            }
            else
            {
                Usuario usr = UsuarioDataAccess.UsuarioData(acceso.Cuenta);
                if (usr.IdUsuario != 0)
                {
                    using (MD5 md5Hash = MD5.Create())
                    {
                        var enkpas = GetMd5Hash(md5Hash, acceso.Clave);
                        if (usr.ClaveAcceso.Equals(enkpas.ToUpper()))
                        {
                            var x = GetAuthToken(usr);
                            x.Headers.Location = new Uri(baseUrl + redirectUrl);
                            return x;
                        }
                    }
                }
                return null;
            }

        }




        private static string GetMd5Hash(MD5 md5Hash, string input)
        {

            // Convert the input string to a byte array and compute the hash.
            byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));

            // Create a new Stringbuilder to collect the bytes
            // and create a string.
            StringBuilder sBuilder = new StringBuilder();

            // Loop through each byte of the hashed data 
            // and format each one as a hexadecimal string.
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }

            // Return the hexadecimal string.
            return sBuilder.ToString();
        }


        [ApiAuthenticationFilter(false)]
        [AuthorizationRequired]
        [HttpGet]
        [Route("kill")]
        public HttpResponseMessage killAuth()
        {
            return KillToken(ActionContext.Request.Headers.GetValues("Token").First());
        }


        /// <summary>
        /// Dibuja el menu de usuarios en el sistema
        /// </summary>
        /// <returns>IEnumerable<CategoriaMenu></returns>
        [ApiAuthenticationFilter(false)]
        [AuthorizationRequired]
        [HttpGet]
        [Route("menu")]
        public IEnumerable<CategoriaMenu> listaMenu()
        {
            var tkn = ActionContext.Request.Headers.GetValues("Token").First();
            return MenuDataAccess.ListarCategorias(tkn);
        }


        private HttpResponseMessage GetAuthToken(Usuario user)
        {
            //si en algun momento se necesita validar con ldap de araucana, vamos a ocupar este metodo para trabajarlo
            Token token = _tokenServices.GenerateToken(user.IdUsuario);
            //Recurso r = this.PaginaInicio(token.AuthToken);
            var response = Request.CreateResponse(HttpStatusCode.OK, "Authorized");

            response.Headers.Add("Token", token.AuthToken);
            response.Headers.Add("TokenExpiry", ConfigurationManager.AppSettings["AuthTokenExpiry"]);
            //response.Headers.Add("Uname", user.Nombres);
            //response.Headers.Add("Cargo", CargoDataAccess.obtener(token.AuthToken));
            //response.Headers.Add("Noticia", user.NoticiInicio.ToString());
            //response.Headers.Add("Oficina", DotacionDataAccess.ObtenerByRut(user.RutUsuario).IdSucursal.ToString());
            //response.Headers.Add("Multi", DotacionDataAccess.MultiLoginByRut(user.RutUsuario).Count.ToString());
            //response.Headers.Add("Instalar", user.Instalacion.ToString());
            //,Uname,Cargo,Noticia,Oficina,Multi,Instalar
            response.Headers.Add("Access-Control-Expose-Headers", "Token,TokenExpiry");
            var obj = new
            {
                Rut = user.RutUsuario,
                Usuario = user.Nombres,
                Cargo = CargoDataAccess.obtener(token.AuthToken),
                Noticia = user.NoticiInicio.ToString(),
                Instalar = user.Instalacion.ToString(),
                Multi = DotacionDataAccess.MultiLoginByRut(user.RutUsuario).Count.ToString(),
                Oficina = DotacionDataAccess.ObtenerByRut(user.RutUsuario).IdSucursal.ToString()
            };

            response.Content = new JsonContent(obj);
            return response;
        }


        private HttpResponseMessage KillToken(string Token)
        {
            _tokenServices.Kill(Token);
            var response = Request.CreateResponse(HttpStatusCode.OK, "Authorized");
            return response;
        }


        private bool TienePermiso(string token, string url)
        {


            return true;
        }


    }

    public class JsonContent : HttpContent
    {

        private readonly MemoryStream _Stream = new MemoryStream();
        public JsonContent(object value)
        {

            Headers.ContentType = new MediaTypeHeaderValue("application/json");
            var jw = new JsonTextWriter(new StreamWriter(_Stream));
            jw.Formatting = Formatting.Indented;
            var serializer = new JsonSerializer();
            serializer.Serialize(jw, value);
            jw.Flush();
            _Stream.Position = 0;

        }

        protected override Task SerializeToStreamAsync(Stream stream, TransportContext context)
        {
            return _Stream.CopyToAsync(stream);
        }

        protected override bool TryComputeLength(out long length)
        {
            length = _Stream.Length;
            return true;
        }
    }

    public class UsuarioAccesoWeb
    {
        public string Cuenta { get; set; }
        public string Clave { get; set; }
    }



}