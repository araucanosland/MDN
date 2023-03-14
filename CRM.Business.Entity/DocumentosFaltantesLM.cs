using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Business.Entity
{
    public class DocumentosFaltantesLM
    {
        public string FolioLicencia { get; set; }
        public string RutAfiliado { get; set; }
        public long CodigoIngresoLM { get; set; }
        public int CodigoSucursalIngreso { get; set; }
        public string RutEjecutivoIngreso { get; set; }
        public DateTime FechaIngreso { get; set; }
        public bool Liquidacion1 { get; set; }
        public bool Liquidacion2 { get; set; }
        public bool Liquidacion3 { get; set; }
        public bool Liquidacion4 { get; set; }
        public bool Liquidacion5 { get; set; }
        public bool Liquidacion6 { get; set; }
        public bool CertificadoRenta { get; set; }
        public bool Acredita90 { get; set; }
        public bool Acredita180 { get; set; }
        public bool Otros { get; set; }
        public string Comentarios { get; set; }
        public bool FaltaDocumentacion { get; set; }
        public bool CertificadoAfiliacionAFP { get; set; }
        public bool CertPagPensiones { get; set; }
        public string tipoSeleccion { get; set; }
        public bool Imagen { get; set; }
        public bool diagnostico { get; set; }
        public bool sinfirma { get; set; }
        public bool contrato { get; set; }
        public bool cedular_identidad { get; set; }
        public bool seccion_c { get; set; }
        public bool certificado_nacimiento { get; set; }
        public bool mutual { get; set; }
        public bool isapre { get; set; }
        public string fechaliquidacion1 { get; set; }
        public string fechaliquidacion2 { get; set; }
        public string fechaliquidacion3 { get; set; }
        public string fechaliquidacion4 { get; set; }
        public string fechaliquidacion5 { get; set; }
        public string fechaliquidacion6 { get; set; }
        public string rutusuario { get; set; }
        public bool cartaAutorizacion { get; set; }
        public bool Faltafirmaempleador { get; set; }
        public int EtapaId { get; set; }
        public bool Mediconoexiste { get; set; }

        public DocumentosFaltantesLM()
        {
            FolioLicencia = string.Empty;
            RutAfiliado = string.Empty;
            CodigoIngresoLM = 0;
            CodigoSucursalIngreso = 0;
            RutEjecutivoIngreso = string.Empty;
            FechaIngreso = new DateTime(1900, 1, 1);
            Liquidacion1 = false;
            Liquidacion2 = false;
            Liquidacion3 = false;
            Liquidacion4 = false;
            Liquidacion5 = false;
            Liquidacion6 = false;
            CertificadoRenta = false;
            Otros = false;
            Comentarios = string.Empty;
            Acredita90 = false;
            Acredita180 = false;
            CertificadoAfiliacionAFP = false;
            CertPagPensiones = false;
            tipoSeleccion = string.Empty;
            FaltaDocumentacion = false;
            Imagen = false;
            diagnostico = false;
            sinfirma = false;
            contrato = false;
            cedular_identidad = false;
            seccion_c = false;
            certificado_nacimiento = false;
            mutual = false;
            isapre = false;
            fechaliquidacion1 = string.Empty;
            fechaliquidacion2 = string.Empty;
            fechaliquidacion3 = string.Empty;
            fechaliquidacion4 = string.Empty;
            fechaliquidacion5 = string.Empty;
            fechaliquidacion6 = string.Empty;
            rutusuario = string.Empty;
            cartaAutorizacion = false;
            Faltafirmaempleador = false;
            Mediconoexiste = false;
        }

        public DocumentosFaltantesLM(string folioLicencia, string rutAfiliado, long codigoIngresoLM, bool liquidacion1, bool liquidacion2, bool liquidacion3, bool liquidacion4, bool liquidacion5, bool liquidacion6, bool certificadoRenta, bool acredita90, bool acredita180, bool otros, string comentarios, bool faltaDocumentacion, bool certificadoAfiliacionAFP, bool certPagPensiones, string TipoSeleccion, bool imagen, bool Diagnostico, bool sinFirma, bool Contrato, bool cedular_Identidad, bool seccion_C, bool certificado_Nacimiento, bool Mutual, bool Isapre, string Fechaliquidacion1, string Fechaliquidacion2, string Fechaliquidacion3, string Fechaliquidacion4, string Fechaliquidacion5, string Fechaliquidacion6, string rutUsuario, bool CartaAutorizacion, bool faltaFirmaempleador, bool mediconoexiste)
        {
            FolioLicencia = folioLicencia;
            RutAfiliado = rutAfiliado;
            CodigoIngresoLM = codigoIngresoLM;
            Liquidacion1 = liquidacion1;
            Liquidacion2 = liquidacion2;
            Liquidacion3 = liquidacion3;
            Liquidacion4 = liquidacion4;
            Liquidacion5 = liquidacion5;
            Liquidacion6 = liquidacion6;
            CertificadoRenta = certificadoRenta;
            Acredita90 = acredita90;
            Acredita180 = acredita180;
            Otros = otros;
            Comentarios = comentarios;
            FaltaDocumentacion = faltaDocumentacion;
            CertificadoAfiliacionAFP = certificadoAfiliacionAFP;
            CertPagPensiones = certPagPensiones;
            tipoSeleccion = TipoSeleccion;
            Imagen = imagen;
            diagnostico = Diagnostico;
            sinfirma = sinFirma;
            contrato = Contrato;
            cedular_identidad = cedular_Identidad;
            seccion_c = seccion_C;
            certificado_nacimiento = certificado_Nacimiento;
            mutual = Mutual;
            isapre = Isapre;
            fechaliquidacion1 = Fechaliquidacion1;
            fechaliquidacion2 = Fechaliquidacion2;
            fechaliquidacion3 = Fechaliquidacion3;
            fechaliquidacion4 = Fechaliquidacion4;
            fechaliquidacion5 = Fechaliquidacion5;
            fechaliquidacion6 = Fechaliquidacion6;
            rutusuario = rutUsuario;
            cartaAutorizacion = CartaAutorizacion;
            Faltafirmaempleador = faltaFirmaempleador;
            mediconoexiste = Mediconoexiste;


        }
    }
}
