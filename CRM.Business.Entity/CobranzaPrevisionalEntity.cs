using System;

namespace CRM.Business.Entity
{

    public class WebProceso
    {
        public int Codigo { get; set; }
        public string Token { get; set; }
        public string TipoProceso { get; set; }
    }

    public class CargaInforme
    {
        public string tipoProceso { get; set; }
    }

    public class CobranzaPrevisionalEntity
    {
        public int Proceso { get; set; }
        public int Oficina { get; set; }
        public int Rut { get; set; }
        public string Dv { get; set; }
        public int Sucursal { get; set; }
        public string RazonSocial { get; set; }
        public int Periodo { get; set; }
        public string AsfamAutorizada { get; set; }
        public string AsfamInformada { get; set; }
        public string AsfamAceptado { get; set; }
        public string AsfamDiferencia { get; set; }
        public string CotizacionInformada { get; set; }
        public string CotizacionCalculada { get; set; }
        public string CotizacionDiferencia { get; set; }
        public string SaldoaFavorCaja { get; set; }
        public string DeudaGenerada { get; set; }

        public string NombreOficina { get; set; }
        public string UltimaCotizacion { get; set; }
        public int NroTrabajadores { get; set; }
        public string MontoCotizacion { get; set; }
        public string MesesImpagos { get; set; }

        public string Caratula { get; set; }
        public string CodigoBarra { get; set; }
        public string Fecha { get; set; }
        public string RentaFonasa { get; set; }
        public string RentaIsapre { get; set; }
        public string TotalRentas { get; set; }
        public string Cotizacion { get; set; }
        public string AsignacionFamiliar { get; set; }
        public string MontoDeclarado { get; set; }
        public string TotalTrabajadores { get; set; }
        public string Estado { get; set; }

        public string EstadoPlanilla { get; set; }
    }

    public class CobranzaPrevisionalFallasEntity
    {
        public int Codigo { get; set; }
        public string Proceso { get; set; }
        public string Linea { get; set; }
        public string Falla { get; set; }
        public string NombreEjecutivo { get; set; }
        public DateTime FechaCarga { get; set; }
        public int Periodo { get; set; }

    }


    public class CobranzaSubMenu2Entity
    {
        public int Id { get; set; }
        public string Nombre { get; set; }

    }

    public class FormData
    {
        public string Rut { get; set; }
        public string Dv { get; set; }
        public string Razon_social { get; set; }
        public string Estado { get; set; }
        public string SubEstado { get; set; }
        public string Observacion { get; set; }
        public string Rut_ejecutivo { get; set; }
        public int Oficina { get; set; }
        public string Subestado2 { get; set; }
    }

}
