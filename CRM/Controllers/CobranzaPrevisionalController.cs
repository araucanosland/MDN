using CRM.Business.Data;
using CRM.Business.Entity;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace CRM.Controllers
{
    [RoutePrefix("api/CobranzaPrevisional")]
    public class CobranzaPrevisionalController : ApiController
    {

        [HttpGet]
        [Route("valida-usuario-carga")]
        public int UsuarioValidoTab(string Rut)
        {
            int retorno = CobranzaPrevisionalDataAccess.ValidaUsuarioCarga(Rut);
            return retorno;
        }


        [HttpPost]
        [Route("update-lista-resumen")]
        public async Task<IHttpActionResult> ActualizarDatosReumen(WebProceso proceso)
        {
            CobranzaPrevisionalDataAccess.EliminarResumen(proceso.Codigo);
            return Ok();
        }


        [HttpPost]
        [Route("proceso-carga-diferencias")]
        public IEnumerable<CobranzaPrevisionalFallasEntity> procesocargadiferencias(WebProceso proceso)
        {

            List<CobranzaPrevisionalFallasEntity> Lista = CobranzaPrevisionalDataAccess.ProcesoCargaDiferencias(proceso);

            return Lista;
        }


        [HttpPost]
        [Route("proceso-carga-no-declaradas")]
        public IEnumerable<CobranzaPrevisionalFallasEntity> procesoCargaNoDeclaradas(WebProceso proceso)
        {

            List<CobranzaPrevisionalFallasEntity> Lista = CobranzaPrevisionalDataAccess.ProcesoCargaNoDeclaradas(proceso);

            return Lista;
        }


        [HttpPost]
        [Route("proceso-carga-datos-cot-impagas")]
        public IEnumerable<CobranzaPrevisionalFallasEntity> procesocargaCotImpagas(WebProceso proceso)
        {

            List<CobranzaPrevisionalFallasEntity> Lista = CobranzaPrevisionalDataAccess.ProcesoCargaCotImpagas(proceso);

            return Lista;
        }



        [HttpPost]
        [Route("carga-datos-dropzone-cot-impagas/{tipoProceso}")]
        public async Task<IHttpActionResult> CargaDatosCotImpagas([FromUri] string tipoProceso = "")
        {
            if (!Request.Content.IsMimeMultipartContent())
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            try
            {
                int periodo = Convert.ToInt32(DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString().PadLeft(2, '0'));
                string validacion = CobranzaPrevisionalDataAccess.ValidaListaResumen(2, "En Proceso", periodo);

                if (validacion != "0")
                {
                    return BadRequest("No se puede realizar carga, ya existe una en progreso");
                }


                CobranzaPrevisionalDataAccess.BorrarLead(2);

                if (tipoProceso == "Nueva")
                {
                    CobranzaPrevisionalDataAccess.IngresoResumen(2, "Cotizaciones Impagas", "0  Registros", "En Proceso");

                }
                string line; int i = 0;
                Int64 ExisteFalla = 0;
                string Oficina = "";
                string Rut = "";
                string Dv = "";
                string Sucursal = "";
                string Razon = "";
                string Periodo = "";
                string AsfamAutorizada = "";
                string AsfamInformada = "";
                string AsfamAceptado = "";
                string AsfamDiferencia = "";
                string CotizacionInformada = "";
                string CotizacionCalculada = "";
                string CotizacionDiferencia = "";
                string SaldoaFavorCaja = "";
                string DeudaGenerada = "";
                string NombreOficina = "";
                string UltimaCotizacion = "";
                string NroTrabajadores = "";
                string MontoCotizacion = "";
                string MesesImpagos = "";
                string Caratula = "";
                string CodigoBarra = "";
                string Fecha = "";
                string RentaFonasa = "";
                string RentaIsapre = "";
                string TotalRentas = "";
                string Cotizacion = "";
                string AsignacionFamiliar = "";
                string MontoDeclarado = "";
                string TotalTrabajadores = "";
                string Estado = "";
                var nombreFinal = "";
                var filePath = "";

                var lista = new List<string>();

                var provider = new MultipartMemoryStreamProvider();
                await Request.Content.ReadAsMultipartAsync(provider);

                CobranzaPrevisionalEntity CobPre = new CobranzaPrevisionalEntity();
                List<CobranzaPrevisionalEntity> CobPrevisional = new List<CobranzaPrevisionalEntity>();

                List<CobranzaPrevisionalFallasEntity> cobranzaPrevisionalFallas = new List<CobranzaPrevisionalFallasEntity>();
                CobranzaPrevisionalFallasEntity CadaFalla = new CobranzaPrevisionalFallasEntity();



                foreach (var file in provider.Contents)
                {
                    if (file.Headers.ContentLength > 0)
                    {
                        var fileName = file.Headers.ContentDisposition.FileName.Trim('\"');
                        if (fileName.EndsWith("csv") || fileName.EndsWith("CSV"))
                        {
                            nombreFinal = "EmpImp" + DateTime.Now.ToString("yyyyMMdd") + ".csv";
                            filePath = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~/Assets/CobranzaPrevisional/CotImp"), nombreFinal);
                        }
                        else
                        {
                            return BadRequest("El archivo debe ser csv");
                        }


                        var buffer = await file.ReadAsByteArrayAsync();
                        File.WriteAllBytes(filePath, buffer);

                        using (var files = new StreamReader(filePath, System.Text.Encoding.Default, false))
                        {

                            //------------Insertar Datos
                            while ((line = files.ReadLine()) != null)
                            {

                                if (i == 0)
                                {
                                    int validaColumnas = line.Split(';').Length;
                                    if (validaColumnas != 10)
                                    {
                                        return BadRequest("El archivo no corresponde a Cotizaciones Impagas");
                                    }

                                    if (line.Split(';')[0] != "Rut" && line.Split(';')[1] != "Dv" && line.Split(';')[2] != "Razon" && line.Split(';')[3] != "Oficina" && line.Split(';')[4] != "Sucursal" && line.Split(';')[5] != "NombreOficina" && line.Split(';')[6] != "UltimaCotizacion" && line.Split(';')[7] != "NroTrabajadores" && line.Split(';')[8] != "MontoCotizacion" && line.Split(';')[9] != "MesesImpagos")
                                    {

                                        return BadRequest("El archivo no corresponde a Cotizaciones Impagas");
                                    }

                                }
                                if (i >= 1)
                                {
                                    if (line.Contains(";"))
                                    {
                                        Rut = line.Split(';')[0];
                                        Dv = line.Split(';')[1];
                                        Razon = line.Split(';')[2];
                                        Oficina = line.Split(';')[3];
                                        Sucursal = line.Split(';')[4];
                                        NombreOficina = line.Split(';')[5];
                                        UltimaCotizacion = line.Split(';')[6];
                                        NroTrabajadores = line.Split(';')[7];
                                        MontoCotizacion = line.Split(';')[8];
                                        MesesImpagos = line.Split(';')[9];


                                    }
                                    string Fallas = "";

                                    if (Rut == "0" || !Rut.All(char.IsDigit) || Rut == "")
                                    {
                                        Fallas = Fallas + "<li>Rut</li>";
                                    }

                                    if (Dv == "")
                                    {
                                        Fallas = Fallas + "<li>Dv</li>";
                                    }

                                    if (!UltimaCotizacion.All(char.IsDigit))
                                    {
                                        Fallas = Fallas + "<li>Ultima Cotizacion</li>";
                                    }
                                    if (!NroTrabajadores.All(char.IsDigit))
                                    {
                                        Fallas = Fallas + "<li>Nro Trabajadores</li>";
                                    }
                                    if (!MontoCotizacion.Replace(".", "").Replace("-", "").All(char.IsDigit))
                                    {
                                        Fallas = Fallas + "<li>Monto Cotizacion</li>";
                                    }
                                    if (!MesesImpagos.Replace(".", "").Replace("-", "").All(char.IsDigit)) // no se valida vienen numeros y string 
                                    {
                                        Fallas = Fallas + "<li>Meses Impagos</li>";
                                    }


                                    if (Fallas.Count() > 1)
                                    {
                                        return BadRequest("<br/> Por favor revise el informe ya que existe un error en el o los campo(s) " + Fallas);
                                    }

                                    CobPre.Proceso = 2;
                                    CobPre.Oficina = string.IsNullOrEmpty(Oficina) ? 0 : Convert.ToInt32(Oficina);
                                    CobPre.Rut = string.IsNullOrEmpty(Rut) ? 0 : Convert.ToInt32(Rut);
                                    CobPre.Dv = Dv;
                                    CobPre.Sucursal = string.IsNullOrEmpty(Sucursal) ? 0 : Convert.ToInt32(Sucursal);
                                    CobPre.RazonSocial = Razon;
                                    CobPre.Periodo = string.IsNullOrEmpty(Periodo) ? 0 : Convert.ToInt32(Periodo);
                                    CobPre.AsfamAutorizada = AsfamAutorizada;
                                    CobPre.AsfamInformada = AsfamInformada;
                                    CobPre.AsfamAceptado = AsfamAceptado;
                                    CobPre.AsfamDiferencia = AsfamDiferencia;
                                    CobPre.CotizacionInformada = CotizacionInformada;
                                    CobPre.CotizacionCalculada = CotizacionCalculada;
                                    CobPre.CotizacionDiferencia = CotizacionDiferencia;
                                    CobPre.SaldoaFavorCaja = SaldoaFavorCaja;
                                    CobPre.DeudaGenerada = DeudaGenerada;

                                    CobPre.NombreOficina = NombreOficina;
                                    CobPre.UltimaCotizacion = UltimaCotizacion;
                                    CobPre.NroTrabajadores = string.IsNullOrEmpty(NroTrabajadores) ? 0 : Convert.ToInt32(NroTrabajadores);
                                    CobPre.MontoCotizacion = MontoCotizacion;
                                    CobPre.MesesImpagos = MesesImpagos;

                                    CobPre.Caratula = Caratula;
                                    CobPre.CodigoBarra = CodigoBarra;
                                    //CobPre.Periodo = Convert.ToInt32(Periodo);
                                    CobPre.Fecha = Fecha;
                                    CobPre.RentaFonasa = RentaFonasa;
                                    CobPre.RentaIsapre = RentaIsapre;
                                    CobPre.TotalRentas = TotalRentas;
                                    CobPre.Cotizacion = Cotizacion;
                                    CobPre.AsignacionFamiliar = AsignacionFamiliar;
                                    CobPre.MontoDeclarado = MontoDeclarado;
                                    CobPre.TotalTrabajadores = TotalTrabajadores;
                                    CobPre.EstadoPlanilla = "";
                                    CobPre.Estado = "En Proceso";

                                    CobPrevisional.Add(CobPre);
                                    CobranzaPrevisionalDataAccess.IngresoLead(CobPre);


                                }
                                i++;
                            }

                        }
                    }
                }

                CobranzaPrevisionalDataAccess.ActualizarResumen(2, "Cotizaciones Impagas", (i - 1) + " Registros", "Validacion OK");
                File.Delete(filePath);

                return Ok();

            }
            catch (Exception ex)
            {
                var response = Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
                throw new HttpResponseException(response);


            }
        }

        [HttpGet]
        [Route("valida-mes-contable-cargado-activo")]
        public string CargaDatosDiferencias(int proceso, string estado)
        {
            int periodo = Convert.ToInt32(DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString().PadLeft(2, '0'));
            string validacion = CobranzaPrevisionalDataAccess.ValidaListaResumen(1, "En Proceso", periodo);

            return validacion;
        }



        [HttpPost]
        [Route("carga-datos-dropzone-no-declaradas/{tipoProceso}")]
        public async Task<IHttpActionResult> CargaDatosNoDeclaradas([FromUri] string tipoProceso = "")
        {

            if (!Request.Content.IsMimeMultipartContent())
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            try
            {
                int periodo = Convert.ToInt32(DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString().PadLeft(2, '0'));
                string validacion = CobranzaPrevisionalDataAccess.ValidaListaResumen(3, "En Proceso", periodo);

                if (validacion != "0")
                {
                    return BadRequest("No se puede realizar carga, ya existe una en progreso");
                }


                CobranzaPrevisionalDataAccess.BorrarLead(3);

                if (tipoProceso == "Nueva")
                {
                    CobranzaPrevisionalDataAccess.IngresoResumen(3, "Cotizaciones No Pagadas", "0  Registros", "En Proceso");

                }

                string line; int i = 0;
                Int64 ExisteFalla = 0;
                string Oficina = "";
                string Rut = "";
                string Dv = "";
                string Sucursal = "";
                string Razon = "";
                string Periodo = "";
                string AsfamAutorizada = "";
                string AsfamInformada = "";
                string AsfamAceptado = "";
                string AsfamDiferencia = "";
                string CotizacionInformada = "";
                string CotizacionCalculada = "";
                string CotizacionDiferencia = "";
                string SaldoaFavorCaja = "";
                string DeudaGenerada = "";
                string NombreOficina = "";
                string UltimaCotizacion = "";
                string NroTrabajadores = "";
                string MontoCotizacion = "";
                string MesesImpagos = "";
                string Caratula = "";
                string CodigoBarra = "";
                string Fecha = "";
                string RentaFonasa = "";
                string RentaIsapre = "";
                string TotalRentas = "";
                string Cotizacion = "";
                string AsignacionFamiliar = "";
                string MontoDeclarado = "";
                string TotalTrabajadores = "";
                string Estado = "";
                var nombreFinal = "";
                var filePath = "";

                var lista = new List<string>();

                var provider = new MultipartMemoryStreamProvider();
                await Request.Content.ReadAsMultipartAsync(provider);

                CobranzaPrevisionalEntity CobPre = new CobranzaPrevisionalEntity();
                List<CobranzaPrevisionalEntity> CobPrevisional = new List<CobranzaPrevisionalEntity>();

                List<CobranzaPrevisionalFallasEntity> cobranzaPrevisionalFallas = new List<CobranzaPrevisionalFallasEntity>();
                CobranzaPrevisionalFallasEntity CadaFalla = new CobranzaPrevisionalFallasEntity();



                foreach (var file in provider.Contents)
                {
                    if (file.Headers.ContentLength > 0)
                    {
                        var fileName = file.Headers.ContentDisposition.FileName.Trim('\"');
                        if (fileName.EndsWith("csv") || fileName.EndsWith("CSV"))
                        {
                            nombreFinal = "NoPagadas" + DateTime.Now.ToString("yyyyMMdd") + ".csv";
                            filePath = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~/Assets/CobranzaPrevisional/NoPagadas"), nombreFinal);

                        }
                        else
                        {
                            return BadRequest("El archivo debe ser csv");
                        }


                        var buffer = await file.ReadAsByteArrayAsync();
                        File.WriteAllBytes(filePath, buffer);

                        using (var files = new StreamReader(filePath, System.Text.Encoding.Default, false))
                        {

                            while ((line = files.ReadLine()) != null)
                            {
                                if (i == 1400)
                                {

                                }

                                if (i == 0)
                                {
                                    int validaColumnas = line.Split(';').Length;
                                    if (validaColumnas != 17)
                                    {
                                        return BadRequest("El archivo no corresponde a Cotizaciones Declaradas y No Pagadas");
                                    }

                                    if (line.Split(';')[0] != "OFIC" && line.Split(';')[1] != "RUT" && line.Split(';')[2] != "DV" && line.Split(';')[3] != "RAZON SOCIAL" && line.Split(';')[4] != "SUC" && line.Split(';')[5] != "N° CARATULA" && line.Split(';')[6] != "CODIGO BARRA" && line.Split(';')[7] != "PERIODO" && line.Split(';')[8] != "FECHA" && line.Split(';')[9] != "RENTA FONASA" && line.Split(';')[10] != "RENTA ISAPRE" && line.Split(';')[11] != "TOTAL RENTAS" && line.Split(';')[12] != "COTIZ." && line.Split(';')[13] != "ASIG. FAMILIAR" && line.Split(';')[14] != "MONTO DECLARADO" && line.Split(';')[15] != "TOT. TRABAJ." && line.Split(';')[16] != "ESTADO")
                                    {

                                        return BadRequest("El archivo no corresponde a Cotizaciones Declaradas y No Pagadas");
                                    }

                                }

                                if (i >= 1)
                                {
                                    if (line.Contains(";"))
                                    {
                                        Oficina = line.Split(';')[0];
                                        Rut = line.Split(';')[1];
                                        Dv = line.Split(';')[2];
                                        Razon = line.Split(';')[3];
                                        Sucursal = line.Split(';')[4];
                                        Caratula = line.Split(';')[5];
                                        CodigoBarra = line.Split(';')[6];
                                        Periodo = line.Split(';')[7];
                                        Fecha = line.Split(';')[8];
                                        RentaFonasa = line.Split(';')[9];
                                        RentaIsapre = line.Split(';')[10];
                                        TotalRentas = line.Split(';')[11];
                                        Cotizacion = line.Split(';')[12];
                                        AsignacionFamiliar = line.Split(';')[13];
                                        MontoDeclarado = line.Split(';')[14];
                                        TotalTrabajadores = line.Split(';')[15];
                                        Estado = line.Split(';')[16];


                                    }
                                    string Fallas = "";

                                    if (Rut == "0" || !Rut.All(char.IsDigit) || Rut == "")
                                    {
                                        Fallas = Fallas + "<li>Rut</li>";
                                    }

                                    if (Dv == "")
                                    {
                                        Fallas = Fallas + "<li>Dv</li>";
                                    }


                                    if (!Caratula.All(char.IsDigit))
                                    {
                                        Fallas = Fallas + "<li>Caratula</li>";
                                    }
                                    if (!CodigoBarra.All(char.IsDigit))
                                    {
                                        Fallas = Fallas + "<li>Codigo Barra</li>";
                                    }
                                    if (!Periodo.All(char.IsDigit))
                                    {
                                        Fallas = Fallas + "<li>Periodo</li>";
                                    }

                                    DateTime FechaValidada = DateTime.Parse(Fecha);

                                    if (!Fecha.Replace("-", "").All(char.IsDigit))
                                    {
                                        Fallas = Fallas + "<li>Fecha debe de tener Formato dd-mm-aaaa</li>";
                                    }

                                    if (FechaValidada.Year.ToString() == "1")
                                    {
                                        Fallas = Fallas + "<li>Fecha</li>";
                                    }


                                    if (!RentaFonasa.Replace(".", "").Replace("-", "").All(char.IsDigit))
                                    {
                                        Fallas = Fallas + "<li>Renta Fonasa</li>";
                                    }
                                    if (!RentaIsapre.Replace(".", "").Replace("-", "").All(char.IsDigit))
                                    {
                                        Fallas = Fallas + "<li>Renta Isapre</li>";
                                    }
                                    if (!TotalRentas.Replace(".", "").Replace("-", "").All(char.IsDigit))
                                    {
                                        Fallas = Fallas + "<li>Total Rentas</li>";
                                    }
                                    if (!Cotizacion.Replace(".", "").Replace("-", "").All(char.IsDigit))
                                    {
                                        Fallas = Fallas + "<li>Cotizacion</li>";
                                    }
                                    if (!AsignacionFamiliar.Replace(".", "").Replace("-", "").All(char.IsDigit))
                                    {
                                        Fallas = Fallas + "<li>Asignacion Familiar</li>";
                                    }
                                    if (!MontoDeclarado.Replace(".", "").Replace("-", "").All(char.IsDigit))
                                    {
                                        Fallas = Fallas + "<li>Monto Declarado</li>";
                                    }
                                    if (!TotalTrabajadores.Replace(".", "").Replace("-", "").All(char.IsDigit))
                                    {
                                        Fallas = Fallas + "<li>Total Trabajadores</li>";
                                    }
                                    if (Estado.All(char.IsDigit))
                                    {
                                        Fallas = Fallas + "<li>Estado</li>";
                                    }

                                    if (Fallas.Count() > 1)
                                    {
                                        return BadRequest("<br/> Por favor revise el informe ya que existe un error en el o los campo(s) " + Fallas);
                                    }




                                    CobPre.Proceso = 3;
                                    CobPre.Oficina = string.IsNullOrEmpty(Oficina) ? 0 : Convert.ToInt32(Oficina);
                                    CobPre.Rut = string.IsNullOrEmpty(Rut) ? 0 : Convert.ToInt32(Rut);
                                    CobPre.Dv = Dv;
                                    CobPre.Sucursal = string.IsNullOrEmpty(Sucursal) ? 0 : Convert.ToInt32(Sucursal);
                                    CobPre.RazonSocial = Razon;
                                    CobPre.Periodo = string.IsNullOrEmpty(Periodo) ? 0 : Convert.ToInt32(Periodo);
                                    CobPre.AsfamAutorizada = AsfamAutorizada;
                                    CobPre.AsfamInformada = AsfamInformada;
                                    CobPre.AsfamAceptado = AsfamAceptado;
                                    CobPre.AsfamDiferencia = AsfamDiferencia;
                                    CobPre.CotizacionInformada = CotizacionInformada;
                                    CobPre.CotizacionCalculada = CotizacionCalculada;
                                    CobPre.CotizacionDiferencia = CotizacionDiferencia;
                                    CobPre.SaldoaFavorCaja = SaldoaFavorCaja;
                                    CobPre.DeudaGenerada = DeudaGenerada;

                                    CobPre.NombreOficina = NombreOficina;
                                    CobPre.UltimaCotizacion = UltimaCotizacion;
                                    CobPre.NroTrabajadores = string.IsNullOrEmpty(NroTrabajadores) ? 0 : Convert.ToInt32(NroTrabajadores);
                                    CobPre.MontoCotizacion = MontoCotizacion;
                                    CobPre.MesesImpagos = MesesImpagos;

                                    CobPre.Caratula = Caratula;
                                    CobPre.CodigoBarra = CodigoBarra;
                                    //CobPre.Periodo = Convert.ToInt32(Periodo);//ya existe
                                    CobPre.Fecha = Fecha;
                                    CobPre.RentaFonasa = RentaFonasa;
                                    CobPre.RentaIsapre = RentaIsapre;
                                    CobPre.TotalRentas = TotalRentas;
                                    CobPre.Cotizacion = Cotizacion;
                                    CobPre.AsignacionFamiliar = AsignacionFamiliar;
                                    CobPre.MontoDeclarado = MontoDeclarado;
                                    CobPre.TotalTrabajadores = TotalTrabajadores.Replace(".", "");
                                    CobPre.EstadoPlanilla = Estado.Trim();
                                    CobPre.Estado = "En Proceso";

                                    CobPrevisional.Add(CobPre);
                                    CobranzaPrevisionalDataAccess.IngresoLead(CobPre);

                                }
                                i++;
                            }

                            CobranzaPrevisionalDataAccess.ActualizarResumen(3, "Cotizaciones No Pagadas", (i - 1) + " Registros", "Validacion OK");



                        }
                    }
                }
                File.Delete(filePath);

                return Ok();

            }
            catch (Exception ex)
            {
                var response = Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
                throw new HttpResponseException(response);


            }
        }




        [HttpPost]
        [Route("carga-datos-dropzone-diferencias/{tipoProceso}")]
        public async Task<IHttpActionResult> CargaDatosDiferencias([FromUri] string tipoProceso = "")
        {
            if (!Request.Content.IsMimeMultipartContent())
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            try
            {
                int periodo = Convert.ToInt32(DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString().PadLeft(2, '0'));
                string validacion = CobranzaPrevisionalDataAccess.ValidaListaResumen(1, "En Proceso", periodo);

                if (validacion != "0")
                {
                    return BadRequest("No se puede realizar carga, ya existe una en progreso");
                }


                CobranzaPrevisionalDataAccess.BorrarLead(1);

                if (tipoProceso == "Nueva")
                {
                    CobranzaPrevisionalDataAccess.IngresoResumen(1, "Diferencia Cotizaciones", "0  Registros", "En Proceso");

                }

                string line; int i = 0;
                Int64 ExisteFalla = 0;
                string Oficina = "";
                string Rut = "";
                string Dv = "";
                string Sucursal = "";
                string Razon = "";
                string Periodo = "";
                string AsfamAutorizada = "";
                string AsfamInformada = "";
                string AsfamAceptado = "";
                string AsfamDiferencia = "";
                string CotizacionInformada = "";
                string CotizacionCalculada = "";
                string CotizacionDiferencia = "";
                string SaldoaFavorCaja = "";
                string DeudaGenerada = "";
                string NombreOficina = "";
                string UltimaCotizacion = "";
                string NroTrabajadores = "";
                string MontoCotizacion = "";
                string MesesImpagos = "";
                string Caratula = "";
                string CodigoBarra = "";
                string Fecha = "";
                string RentaFonasa = "";
                string RentaIsapre = "";
                string TotalRentas = "";
                string Cotizacion = "";
                string AsignacionFamiliar = "";
                string MontoDeclarado = "";
                string TotalTrabajadores = "";
                string Estado = "";
                var nombreFinal = "";
                var filePath = "";

                var lista = new List<string>();

                var provider = new MultipartMemoryStreamProvider();
                await Request.Content.ReadAsMultipartAsync(provider);

                CobranzaPrevisionalEntity CobPre = new CobranzaPrevisionalEntity();
                List<CobranzaPrevisionalEntity> CobPrevisional = new List<CobranzaPrevisionalEntity>();

                List<CobranzaPrevisionalFallasEntity> cobranzaPrevisionalFallas = new List<CobranzaPrevisionalFallasEntity>();
                CobranzaPrevisionalFallasEntity CadaFalla = new CobranzaPrevisionalFallasEntity();



                foreach (var file in provider.Contents)
                {
                    if (file.Headers.ContentLength > 0)
                    {
                        var fileName = file.Headers.ContentDisposition.FileName.Trim('\"');
                        if (fileName.EndsWith("csv") || fileName.EndsWith("CSV"))
                        {
                            nombreFinal = "DifCot" + DateTime.Now.ToString("yyyyMMdd") + ".csv";
                            filePath = Path.Combine(System.Web.HttpContext.Current.Server.MapPath("~/Assets/CobranzaPrevisional/DifCot"), nombreFinal);

                        }
                        else
                        {
                            return BadRequest("El archivo debe ser csv");
                        }


                        var buffer = await file.ReadAsByteArrayAsync();
                        File.WriteAllBytes(filePath, buffer);

                        using (var files = new StreamReader(filePath, System.Text.Encoding.Default, false))
                        {

                            while ((line = files.ReadLine()) != null)
                            {

                                if (i == 0)
                                {
                                    int validaColumnas = line.Split(';').Length;
                                    if (validaColumnas != 15)
                                    {
                                        return BadRequest("El archivo no corresponde a Diferencias de Cotizaciones");
                                    }

                                    if (line.Split(';')[0] != "Oficina" && line.Split(';')[1] != "Rut" && line.Split(';')[2] != "Dv" && line.Split(';')[3] != "Sucursal" && line.Split(';')[4] != "Razón Social" && line.Split(';')[5] != "Periodo" && line.Split(';')[6] != "Asfam Autorizada Caja" && line.Split(';')[7] != "Asfam Informada Empresa(A)" && line.Split(';')[8] != "ASFAM Aceptado Liquidado Caja(B)" && line.Split(';')[9] != "Diferencia ASFAM(B-A)" && line.Split(';')[10] != "Cotización Informada Empresa ©" && line.Split(';')[11] != "Cotización Calculada Caja(D)" && line.Split(';')[12] != "Diferencia Cotización(C-D)" && line.Split(';')[13] != "Saldo a Favor Caja Pagado por empresa" && line.Split(';')[14] != "Deuda Generada(A-B)-(C-D)")
                                    {

                                        return BadRequest("El archivo no corresponde a Diferencias de Cotizaciones");
                                    }

                                }

                                if (i >= 1)
                                {
                                    if (line.Contains(";"))
                                    {
                                        Oficina = line.Split(';')[0];
                                        Rut = line.Split(';')[1];
                                        Dv = line.Split(';')[2];
                                        Sucursal = line.Split(';')[3];
                                        Razon = line.Split(';')[4];
                                        Periodo = line.Split(';')[5];
                                        AsfamAutorizada = line.Split(';')[6];
                                        AsfamInformada = line.Split(';')[7];
                                        AsfamAceptado = line.Split(';')[8];
                                        AsfamDiferencia = line.Split(';')[9];
                                        CotizacionInformada = line.Split(';')[10];
                                        CotizacionCalculada = line.Split(';')[11];
                                        CotizacionDiferencia = line.Split(';')[12];
                                        SaldoaFavorCaja = line.Split(';')[13];
                                        DeudaGenerada = line.Split(';')[14];


                                    }
                                    string Fallas = "";

                                    if (Rut == "0" || !Rut.All(char.IsDigit) || Rut == "")
                                    {
                                        Fallas = Fallas + "<li>Rut</li>";
                                    }

                                    if (Dv == "")
                                    {
                                        Fallas = Fallas + "<li>Dv</li>";
                                    }

                                    if (!Oficina.All(char.IsDigit))
                                    {
                                        Fallas = Fallas + "<li>Oficina</li>";
                                    }

                                    if (!Sucursal.All(char.IsDigit))
                                    {
                                        Fallas = Fallas + "<li>Sucursal</li>";
                                    }
                                    if (Razon.All(char.IsDigit))
                                    {
                                        Fallas = Fallas + "<li>Razon</li>";
                                    }

                                    if (!Periodo.All(char.IsDigit))
                                    {
                                        Fallas = Fallas + "<li>Periodo</li>";
                                    }
                                    if (!AsfamAutorizada.Replace(".", "").Replace("-", "").All(char.IsDigit))
                                    {
                                        Fallas = Fallas + "<li>Asfam Autorizada</li>";
                                    }
                                    if (!AsfamInformada.Replace(".", "").Replace("-", "").All(char.IsDigit))
                                    {
                                        Fallas = Fallas + "<li>Asfam Informada</li>";
                                    }
                                    if (!AsfamAceptado.Replace(".", "").Replace("-", "").All(char.IsDigit))
                                    {
                                        Fallas = Fallas + "<li>Asfam Aceptado</li>";
                                    }
                                    if (!AsfamDiferencia.Replace(".", "").Replace("-", "").All(char.IsDigit))
                                    {
                                        Fallas = Fallas + "<li>Asfam Diferencia</li>";
                                    }
                                    if (!CotizacionInformada.Replace(".", "").Replace("-", "").All(char.IsDigit))
                                    {
                                        Fallas = Fallas + "<li>Cotizacion Informada</li>";
                                    }
                                    if (!CotizacionCalculada.Replace(".", "").Replace("-", "").All(char.IsDigit))
                                    {
                                        Fallas = Fallas + "<li>Cotizacion Calculada</li>";
                                    }
                                    if (!CotizacionDiferencia.Replace(".", "").Replace("-", "").All(char.IsDigit))
                                    {
                                        Fallas = Fallas + "<li>Cotizacion Diferencia</li>";
                                    }
                                    if (!SaldoaFavorCaja.Replace(".", "").Replace("-", "").All(char.IsDigit))
                                    {
                                        Fallas = Fallas + "<li>Saldo Pagado Empresa</li>";
                                    }
                                    if (!DeudaGenerada.Replace(".", "").Replace("-", "").All(char.IsDigit))
                                    {
                                        Fallas = Fallas + "<li>Deuda Generada</li>";
                                    }

                                    if (Fallas.Count() > 1)
                                    {
                                        return BadRequest("<br/> Por favor revise el informe ya que existe un error en el o los campo(s) " + Fallas);
                                    }


                                    CobPre.Proceso = 1;
                                    CobPre.Oficina = string.IsNullOrEmpty(Oficina) ? 0 : Convert.ToInt32(Oficina);
                                    CobPre.Rut = string.IsNullOrEmpty(Rut) ? 0 : Convert.ToInt32(Rut);
                                    CobPre.Dv = Dv;
                                    CobPre.Sucursal = string.IsNullOrEmpty(Sucursal) ? 0 : Convert.ToInt32(Sucursal);
                                    CobPre.RazonSocial = Razon;
                                    CobPre.Periodo = string.IsNullOrEmpty(Periodo) ? 0 : Convert.ToInt32(Periodo);
                                    CobPre.AsfamAutorizada = AsfamAutorizada;
                                    CobPre.AsfamInformada = AsfamInformada;
                                    CobPre.AsfamAceptado = AsfamAceptado;
                                    CobPre.AsfamDiferencia = AsfamDiferencia;
                                    CobPre.CotizacionInformada = CotizacionInformada;
                                    CobPre.CotizacionCalculada = CotizacionCalculada;
                                    CobPre.CotizacionDiferencia = CotizacionDiferencia;
                                    CobPre.SaldoaFavorCaja = SaldoaFavorCaja;
                                    CobPre.DeudaGenerada = DeudaGenerada;

                                    CobPre.NombreOficina = NombreOficina;
                                    CobPre.UltimaCotizacion = UltimaCotizacion;
                                    CobPre.NroTrabajadores = string.IsNullOrEmpty(NroTrabajadores) ? 0 : Convert.ToInt32(NroTrabajadores);
                                    CobPre.MontoCotizacion = MontoCotizacion;
                                    CobPre.MesesImpagos = MesesImpagos;

                                    CobPre.Caratula = Caratula;
                                    CobPre.CodigoBarra = CodigoBarra;
                                    //CobPre.Periodo = Convert.ToInt32(Periodo);//ya existe
                                    CobPre.Fecha = Fecha;
                                    CobPre.RentaFonasa = RentaFonasa;
                                    CobPre.RentaIsapre = RentaIsapre;
                                    CobPre.TotalRentas = TotalRentas;
                                    CobPre.Cotizacion = Cotizacion;
                                    CobPre.AsignacionFamiliar = AsignacionFamiliar;
                                    CobPre.MontoDeclarado = MontoDeclarado;
                                    CobPre.TotalTrabajadores = TotalTrabajadores;
                                    CobPre.EstadoPlanilla = "";
                                    CobPre.Estado = "En Proceso";

                                    CobPrevisional.Add(CobPre);
                                    CobranzaPrevisionalDataAccess.IngresoLead(CobPre);

                                }
                                i++;
                            }

                            CobranzaPrevisionalDataAccess.ActualizarResumen(1, "Diferencia Cotizaciones", (i - 1) + " Registros", "Validacion OK");



                        }
                    }
                }
                File.Delete(filePath);

                return Ok();

            }
            catch (Exception ex)
            {
                var response = Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
                throw new HttpResponseException(response);


            }
        }


        [HttpGet]
        [Route("lista-Resumen")]
        public IEnumerable<CobranzaPrevisionalFallasEntity> ListaResumen(int codigo, string estado)
        {

            string token = ActionContext.Request.Headers.GetValues("Token").First();
            List<CobranzaPrevisionalFallasEntity> Lista = CobranzaPrevisionalDataAccess.ListaResumen(codigo, estado);

            return Lista;


        }

        [HttpGet]
        [Route("lista-subMenu-2")]
        public IEnumerable<CobranzaSubMenu2Entity> ListaSubMenu2(int IdSubPadre)
        {

            string token = ActionContext.Request.Headers.GetValues("Token").First();
            List<CobranzaSubMenu2Entity> Lista = CobranzaPrevisionalDataAccess.ListarSubMenu2(IdSubPadre);

            return Lista;

        }

        [HttpPost]
        [Route("guarda-gestion-diferencia-cotizacion")]
        public string GuardGgestionDiferenciaCotizacion(FormData formData)
        {

            string token = ActionContext.Request.Headers.GetValues("Token").First();
            string respuesta = CobranzaPrevisionalDataAccess.GuardGgestionDiferenciaCotizacion(formData);
            return respuesta;

        }

        [HttpPost]
        [Route("guarda-gestion-cotizaciones-impagas")]
        public string GuardGgestionCotizacionesImpagas(FormData formData)
        {

            string token = ActionContext.Request.Headers.GetValues("Token").First();
            string respuesta = CobranzaPrevisionalDataAccess.GuardGgestionCotizacionesImpagas(formData);
            return respuesta;

        }
        [HttpPost]
        [Route("guarda-gestion-cotizaciones-no-declaradas")]
        public string GuardGgestionCotizacionesNoDeclaradas(FormData formData)
        {

            string token = ActionContext.Request.Headers.GetValues("Token").First();
            string respuesta = CobranzaPrevisionalDataAccess.GuardGgestionCotizacionesNoPagadas(formData);
            return respuesta;

        }





    }
}
