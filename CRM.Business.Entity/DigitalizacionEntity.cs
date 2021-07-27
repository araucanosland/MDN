using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Business.Entity
{

    public class WebGestionDigitalizacion
    {

        public long Id_lead { get; set; }
        public int Id_Estado { get; set; }
        public int Auditor { get; set; }
        public string RutEjecutivo { get; set; }
        public int Tipo_Gestion { get; set; }
        public int LiquidacionSueldo { get; set; }
        public int InformeCuotas { get; set; }
        public int SolicitudCredito { get; set; }
        public int Certificacion { get; set; }
        public int HojaResumen { get; set; }
        public int CompobanteDinero { get; set; }
        public int CheckListDigitalizacion { get; set; }
        public int InformacionAval { get; set; }
        public int Afecto15 { get; set; }
        public int SeguroDesgravamen { get; set; }
        public int SeguroCesantia { get; set; }
        public int Pagare { get; set; }
        public int Cedula { get; set; }
        public int Oficina { get; set; }
        public string RutAfiliado { get; set; }
        public string Cargo { get; set; }
        public string TipoEjecutivo { get; set; }

    }


    public class DigitalizacionGestionEntity
    {
        public long Id { get; set; }
        public string RutAfiliado { get; set; }
        public string NombreAfiliado { get; set; }
        public string Oferta { get; set; }
        public string Folio { get; set; }
        public int Estado { get; set; }
        public long Id_lead { get; set; }
        public DateTime FechaGestion { get; set; }
        public int Id_Estado { get; set; }
        public int Auditor { get; set; }
        public string RutEjecutivo { get; set; }
        public int Tipo { get; set; }
        public int LiquidacionSueldo { get; set; }
        public int InformeCuotas { get; set; }
        public int SolicitudCredito { get; set; }
        public int Certificacion { get; set; }
        public int HojaResumen { get; set; }
        public int ComprobanteDinero { get; set; }
        public int CheckListDigitalizacion { get; set; }
        public int InformacionAval { get; set; }
        public int Afecto15 { get; set; }
        public int SeguroDesgravamen { get; set; }
        public int SeguroCesantia { get; set; }
        public string EstadoGestion { get; set; }
        public int Pagare { get; set; }
        public int Cedula { get; set; }
        public string OficinaPagadora { get; set; }
        public string OficinaVenta { get; set; }
        public string OficinaAuditora { get; set; }
    }

    public class EjecutivoEntity
    {
     
        public string Rut { get; set; }

        public string Nombre { get; set; }

        public int cod_sucursal { get; set; }

    }
    public class DigitalizacionEntity
    {


        public long Id { get; set; }

        public string RutAfiliado { get; set; }

        public string NombreAfiliado { get; set; }

        public string Oferta { get; set; }

        public string Folio { get; set; }

        public int Estado { get; set; }

        public DateTime FechaVenta { get; set; }

        public int Tipo { get; set; }

        public int Oficina { get; set; }

        public string RutEjecutivo { get; set; }

        public DateTime FechaRegistro { get; set; }

        public string EstadoGestion { get; set; }

        public string TipoDescripcion { get; set; }

        public string NombreEjecutivo  { get; set; }

        public string RutejecutivoAgente { get; set; }

        public string Grilla { get; set; }
    }
}
