using System.Collections.Generic;

namespace CRM.Business.Entity.Clases
{
    public class WebLicenciaRecepcion
    {
        public string wRutEmpresa { get; set; }
        public string wFechaRecepcion { get; set; }
        public int wLMRecibida { get; set; }
        public int wLMDigitada { get; set; }
        public int wLMNoDigitada { get; set; }
        public int wLMNoRecepcion { get; set; }
        public int wCodOficina { get; set; }
        public int wLMRecepcionada { get; set; }

    }

    public class WebIngresoAuditoria
    {
        public long CodIngreso { get; set; }
        public long estadoRevision { get; set; }
        public int lmincompleta { get; set; }
        public int lmnolegible { get; set; }
        public int lmnodiagnostico { get; set; }
        public int lmnoautirizada { get; set; }
        public string Comentarios { get; set; }
        public string rutAuditor { get; set; }
        public int Folionovalido { get; set; }
        public int Otromotivo { get; set; }
    }

    public class WebLicenciaEnvio
    {
        public string wFechaEnvio { get; set; }
        public int wLMEnviada { get; set; }
        public int wCodOficina { get; set; }

    }

    public class WebParametro
    {
        public string Fecha { get; set; }
        public string RutEmpresa { get; set; }
    }

    public class WebIngresoLicenciaReparosAuditoria
    {
        public int CodIngreso { get; set; }
        public int CodOficina { get; set; }
        //Los Documentos
        public int LiqMes1 { get; set; }
        public int LiqMes2 { get; set; }
        public int LiqMes3 { get; set; }
        public int LiqMes4 { get; set; }
        public int LiqMes5 { get; set; }
        public int LiqMes6 { get; set; }
        public int CertificadoRenta { get; set; }
        public int Acredita90 { get; set; }
        public int CertificadoAfiliacionAFP { get; set; }
        public int CertPagPensiones { get; set; }
        public int Otros { get; set; }
        public string Comentarios { get; set; }
        public int FaltaDocumentacion { get; set; }
        public string tipoSeleccion { get; set; }
        public int Imagen { get; set; }
        public int diagnostico { get; set; }
        public int sinfirma { get; set; }
        public int contrato { get; set; }
        public int cedular_identidad { get; set; }
        public int seccion_c { get; set; }
        public int certificado_nacimiento { get; set; }
        public int mutual { get; set; }
        public int isapre { get; set; }
        public string fechaliquidacion1 { get; set; }
        public string fechaliquidacion2 { get; set; }
        public string fechaliquidacion3 { get; set; }
        public string fechaliquidacion4 { get; set; }
        public string fechaliquidacion5 { get; set; }
        public string fechaliquidacion6 { get; set; }
        public int rutusuario { get; set; }
        public int cartaAutorizacion { get; set; }
        public int FaltaFirmaempleador { get; set; }
        public int mediconoexiste { get; set; }
    }




    public class WebIngresoLicencia
    {
        public long CodIngreso { get; set; }
        public string RutAfiliado { get; set; }
        public string NombreAfiliado { get; set; }
        public bool SinDatosEnSistema { get; set; }
        public string FormatoLM { get; set; }
        public string FolioLc { get; set; }
        public int CodOficina { get; set; }
        public int CantidadDiasLM { get; set; }
        public string FechaInicioLM { get; set; }
        public string FechaHastaLM { get; set; }
        public int TipoLM { get; set; }
        public int OfiDerivacion { get; set; }

        /*Documentación Faltante*/
        public int LiqMes1 { get; set; }
        public int LiqMes2 { get; set; }
        public int LiqMes3 { get; set; }
        public int LiqMes4 { get; set; }
        public int LiqMes5 { get; set; }
        public int LiqMes6 { get; set; }
        public int CertificadoRenta { get; set; }
        public int Acredita90 { get; set; }
        public int Acredita180 { get; set; }
        public int Otros { get; set; }
        public string Comentarios { get; set; }
        public string tipoSeleccion { get; set; }
        public int FaltaDocumentacion { get; set; }
        public int CertificadoAfiliacionAFP { get; set; }
        public int CertPagPensiones { get; set; }
        public int Imagen { get; set; }
        public int diagnostico { get; set; }
        public int sinfirma { get; set; }
        public int contrato { get; set; }
        public int cedular_identidad { get; set; }
        public int seccion_c { get; set; }
        public int certificado_nacimiento { get; set; }
        public int mutual { get; set; }
        public int isapre { get; set; }

        public string FechaLiquidacion1 { get; set; }
        public string FechaLiquidacion2 { get; set; }
        public string FechaLiquidacion3 { get; set; }
        public string FechaLiquidacion4 { get; set; }
        public string FechaLiquidacion5 { get; set; }
        public string FechaLiquidacion6 { get; set; }
        public string rutusuario { get; set; }
        public int cartaAutorizacion { get; set; }
        public int faltaFirmaempleador { get; set; }
        public int ViaIngresoLicenica { get; set; }
        public int QuienEnvia { get; set; }
        public string Email { get; set; }
        public string Telefono { get; set; }
        public int EsBanner { get; set; }
        public int firmaEmpleador { get; set; }
        public int mediconoexiste { get; set; }
        public List<WebDocumentacion> DocumentacionLM { get; set; }
        // 

        public bool CompletitudDocumentos()
        {
            int cnt = 0;
            DocumentacionLM.ForEach(dclm =>
            {
                if (dclm.Recepcionado)
                {
                    cnt++;
                }
            });

            return (TipoLM == 3) ? ((CantidadDiasLM >= 50 ? cnt == 7 : cnt == 6)) : (cnt == 3);
        }

        public int DeterminateStatus()
        {
            int retorno = 0;
            bool diasvacios = CantidadDiasLM == 0;
            bool iniciovacio = FechaInicioLM == null || FechaInicioLM.Length == 0;
            bool tipolmvacio = TipoLM == 0;

            if (diasvacios || iniciovacio || tipolmvacio)
            {
                retorno = 1;
            }
            else
            {
                if (CompletitudDocumentos())
                {
                    retorno = 3;
                }
                else
                {
                    retorno = 2;
                }
            }
            return retorno;
        }
    }


    public class WebDocumentacion
    {
        public int Periodo { get; set; }
        public bool Recepcionado { get; set; }
        public int TipoDoc { get; set; }
    }


}
