using System;

namespace CRM.Business.Entity
{

    public class WebGestionDigitalizacion
    {

        public long Id_lead { get; set; }
        public int Id_Estado { get; set; }
        public long Id_Gestion { get; set; }
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
        public int RutAfiliado { get; set; }
        public int Cargo { get; set; }
        public int TipoEjecutivo { get; set; }
        public int ObsLiquidacionSueldo { get; set; }
        public int ObsInformeCuotas { get; set; }
        public int ObsSolicitudCredito { get; set; }
        public int ObsCertificacion { get; set; }
        public int ObsHojaResumen { get; set; }
        public int ObsCompobanteDinero { get; set; }
        public int ObsCheckListDigitalizacion { get; set; }
        public int ObsInformacionAval { get; set; }
        public int ObsAfecto15 { get; set; }
        public int ObsSeguroDesgravamen { get; set; }
        public int ObsSeguroCesantia { get; set; }
        public int ObsPagare { get; set; }
        public int ObsCI { get; set; }

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
        public string Zona { get; set; }
        public int Pagare { get; set; }
        public int Cedula { get; set; }
        public string OficinaPagadora { get; set; }
        public string OficinaVenta { get; set; }
        public string OficinaAuditora { get; set; }
        public int ObsLiquidacionSueldo { get; set; }
        public int ObsInformeCuotas { get; set; }
        public int ObsSolicitudCredito { get; set; }
        public int ObsCertificacion { get; set; }
        public int ObsHojaResumen { get; set; }
        public int ObsCompobanteDinero { get; set; }
        public int ObsCheckListDigitalizacion { get; set; }
        public int ObsInformacionAval { get; set; }
        public int ObsAfecto15 { get; set; }
        public int ObsSeguroDesgravamen { get; set; }
        public int ObsSeguroCesantia { get; set; }
        public int ObsPagare { get; set; }
        public int ObsCI { get; set; }
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

        public string NombreEjecutivo { get; set; }

        public string RutejecutivoAgente { get; set; }

        public string Grilla { get; set; }

        public string OficinaPagadora { get; set; }

        public string OficinaVenta { get; set; }

        public string zona { get; set; }

        public string descripcionOficina { get; set; }

        public string FechaVentaString { get; set; }

        public string FechaGestionString { get; set; }

        public string TipoDocumento { get; set; }

        public string descripcionOficinaPagadora { get; set; }

        public string descripcionOficinaCurse { get; set; }

        public string descripcionOficinaAuditora { get; set; }
    }

    public class DigitalizacionEntityXLS
    {
                    

        public string RutAfiliado { get; set; }

        public string NombreAfiliado { get; set; }

        public string Oferta { get; set; }

        public string Folio { get; set; }

       
        public string RutEjecutivo { get; set; }

       
        public string EstadoGestion { get; set; }

      

        public string nombreEjecutivoGestion { get; set; }

        public string nombreEjecutivoAsignado { get; set; }

       


        public string FechaVentaString { get; set; }

        public string FechaGestionString { get; set; }

        public string TipoDocumento { get; set; }


        public string descripcionZonaOficinaPagadora { get; set; }

        public string descripcionOficinaPagadora { get; set; }

        public string descripcionZonaOficinaCurse { get; set; }

        public string descripcionOficinaCurse { get; set; }

        public string descripcionZonaOficinaAuditora { get; set; }

        public string descripcionOficinaAuditora { get; set; }

      

       

       

        public string Responsable { get; set; }
    }
}
