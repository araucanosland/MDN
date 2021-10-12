using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Business.Entity
{
    public class PensionadosEntity
    {
        public string RUTPEN { get; set; }
        public string NOMBREPEN { get; set; }
        public int FECNAC { get; set; }
        public string CALLE { get; set; }
        public int NUMERO { get; set; }
        public string RESTO_DIRECCION { get; set; }
        public string COMUNA { get; set; }
        public string CIUDAD { get; set; }
        public string REGION { get; set; }
        public string FONOPARTICULAR { get; set; }
        public string FONOCELULAR { get; set; }
        public string EMAIL { get; set; }
        public string PRIORIDAD { get; set; }
        public int PREAPROBADO { get; set; }
        public string CODOFICINA { get; set; }
        public string RUTEJECUTIVO { get; set; }
        public string PERCAMPAÑA { get; set; }
        public int id_Asign { get; set; }
        public int ESTADO_GESTION { get; set; }
        public string NOM_GESTION { get; set; }
        public string codigo { get; set; }
    }

    public class EjecutivoPensionadosEntity
    {
        public string Rut { get; set; }
        public string Nombre { get; set; }
        public int Cod_Sucursal { get; set; }
    }


    public class AsigPensionadosEntity
    {
        public string Token { get; set; }
        public string Rut_Ejecutivo { get; set; }
        public int id_Asign { get; set; }
    }

    public class BuscaPensionadosEntity
    {
        public string NombrePensionado { get; set; }
        public string FonoParticular { get; set; }
        public string FonoCelular { get; set; }
        public string Direccion { get; set; }
        public int N_direccion { get; set; }
        public string Comuna { get; set; }
        public int id_Asign { get; set; }
        public string Mail { get; set; }
        public string codigo { get; set; }
    }

    public class EstadoGestionPensionadoEntity
    {
        public int eges_id { get; set; }
        public string eges_nombre { get; set; }
        public int ejes_id_padre { get; set; }
        public string ejes_terminal { get; set; }
        public int ejes_tipo_campagna { get; set; }
    }

    public class WebContactoPensionados
    {
        public int con_contacto_uid { get; set; }
        public string con_contacto { get; set; }
        public int con_forma_contacto { get; set; }
        public int con_no_contacto_fono { get; set; }
        public string con_fecha_cita_contacto { get; set; }
        public int con_no_contacto_domicilo { get; set; }
        public string con_no_observacion_contacto { get; set; }
        public string con_ejecutivo_rut { get; set; }
        public string con_oficina { get; set; }
        public int estado_gestion { get; set; }
        public string rut_pensionado { get; set; }
    }

    public class WebGestionPensionados
    {
        public int ges_bcam_uid { get; set; }
        public string ges_estado_gst { get; set; }
        public string ges_sub_estado_gst { get; set; }
        public string ges_fecha_compromete { get; set; }
        public string ges_descripcion_gst { get; set; }
        public string ges_ejecutivo_rut { get; set; }
        public string ges_oficina { get; set; }
        public string[] tags_conforme { get; set; }
        public string[] tags_noQuiere { get; set; }
        public string rut_pensionado { get; set; }

    }

    public class TagGestionPensionados
    {
        public int gesTag_id { get; set; }
        public int gesTag_gestion { get; set; }
    }

    public class GestionPensionados
    {
        public int ges_bcam_uid { get; set; }
        public string ges_estado_gst { get; set; }
        public string ges_sub_estado_gst { get; set; }
        public DateTime ges_fecha_compromete { get; set; }
        public string ges_descripcion_gst { get; set; }
        public string ges_ejecutivo_rut { get; set; }
        public string ges_oficina { get; set; }
        public int estado_gestion { get; set; }

    }

    //public class WebBasePensionadosContacto
    //{
    //    public WebContactoPensionados contacto { get; set; }
    //    public WebGestionPensionados gestion { get; set; }
    //}

    public class WebHistorialGesPensionados
    {
        public int ges_bcam_uid { get; set; }
        public DateTime ges_fecha_accion { get; set; }
        public DateTime ges_fecha_compromete { get; set; }
        public string ges_descripcion_gst { get; set; }
        public string estado { get; set; }
        public string subEstado { get; set; }
        public string Ejecutivo { get; set; }
    }


    public class WebUltimaGesPensionados
    {
        public int ges_estado_gst { get; set; }
        public int ges_sub_estado_gst { get; set; }
        public string eges_nombre { get; set; }
        public DateTime ges_fecha_compromete { get; set; }
        public string ges_descripcion_gst { get; set; }
        public DateTime ges_fecha_accion { get; set; }
        public int ges_id { get; set; }
        public IEnumerable<TagDto> tags { get; set; }

    }

    public class TagDto
    {
        public int id { get; set; }
        public string nombre { get; set; }

    }

    public class UltimoContactoPensionados
    {
        public string con_contacto { get; set; }
        public int con_forma_contacto { get; set; }
        public int con_no_contacto_fono { get; set; }
        public int con_no_contacto_domicilo { get; set; }
        public string con_no_observacion_contacto { get; set; }
        public string nomContatoSi { get; set; }
        public string nomConFono { get; set; }
        public string nomConDom { get; set; }
    }



    //public class EstadoGestionPensionadoEntity
    //{
    //    public int eges_id { get; set; }
    //    public string eges_nombre { get; set; }
    //    public int ejes_id_padre { get; set; }
    //    public string ejes_terminal { get; set; }
    //    public int ejes_tipo_campagna { get; set; }
    //}



    public class WebPensionadosProspectos
    {
        public string Rut_Pensionado { get; set; }
        public string Nombre { get; set; }
        public int Edad { get; set; }
        public string Caja_Origen { get; set; }
        public int Renta_Aproximada { get; set; }
        public string Celular { get; set; }
        public string Fono_Fijo { get; set; }
        public string Email { get; set; }
        public string Direccion_Calle { get; set; }
        public int Direccion_Numero { get; set; }
        public string Direccion_Dpto { get; set; }
        public string Comuna { get; set; }
        public string Rut_Ejecutivo { get; set; }
        public int Cod_Sucursal { get; set; }

    }

    public class ProspectosPensionados
    {
        public string Rut_Pensionado { get; set; }
        public string Nombre { get; set; }
        public int Edad { get; set; }
        public string Caja_Origen { get; set; }
        public int Renta_Aproximada { get; set; }
        public string Celular { get; set; }
        public string Fono_Fijo { get; set; }
        public string Email { get; set; }
        public string Direccion_Calle { get; set; }
        public int Direccion_Numero { get; set; }
        public string Direccion_Dpto { get; set; }
        public string Comuna { get; set; }
        public string Rut_Ejecutivo { get; set; }
        public int Cod_Sucursal { get; set; }
        public string Nombre_ejecutivo { get; set; }

    }

    public class EstadoNOGestionPensionadoEntity
    {
        public int egesNo_id { get; set; }
        public string egesNo_nombre { get; set; }
        public int ejesNo_id_padre { get; set; }

    }

    public class PensionadosUnoPorcientoEntity
    {
        public long Id { get; set; }
        public string Rut_Afiliado { get; set; }
        public string Nombre_Afiliado { get; set; }
        public int Epp_id { get; set; }
        public string Epp_text { get; set; }
        public DateTime Fecha_Ultima_Pension { get; set; }
        public int Beneficio_id { get; set; }
        public string beneficio_text { get; set; }
        public DateTime Fecha_Ultimo_Beneficio { get; set; }
        public int Oficina { get; set; }
        public string Rut_Ejecutivo { get; set; }
        public int Periodo { get; set; }
        public string Estado { get; set; }
    }

    #region comunas
    //public class PensionadosUnoPorcientoComunasEntity
    //{
    //    public long Id { get; set; }
    //    public string Comuna { get; set; }

    //}
    #endregion



    #region prioridad
    //public class PensionadosUnoPorcientoPrioridadEntity
    //{
    //    public long Id { get; set; }
    //    public string Glosa { get; set; }
    //    public string Color { get; set; }
    //}
    #endregion



    public class PensionadosUnoPorcientoEppEntity
    {
        public long Id { get; set; }
        public string RazonSocial { get; set; }
    }

    public class PensionadosUnoPorcientoBeneficiosEntity
    {
        public long Id { get; set; }
        public string Nombre { get; set; }
    }

    #region actualizalead
    //public class PensionadosUnoPorcientoLeadEntity
    //{
    //    public int id_Asign { get; set; }
    //    public int eppactual { get; set; }
    //    public string fechapension { get; set; }
    //    public int beneficio { get; set; }
    //    public string fechabeneficio { get; set; }

    //}
    #endregion



    public class PensionadosUnoPorcientoGestionEntity
    {
        public int Id_lead { get; set; }
        public int Epp_id { get; set; }
        public string Epp_Otro { get; set; }
        public int Estado_id { get; set; }
        public int SubEstado_id { get; set; }
        public int Periodo { get; set; }
        public string EjecutivoRut { get; set; }
        public string Observacion { get; set; }

    }

    public class WebPensionadosUnoPorcientoGestionEntity
    {
        public string NombreEjecutivo { get; set; }
        public DateTime FechaGestion { get; set; }
        public string Estado { get; set; }
        public string SubEstado { get; set; }
        public string Epp { get; set; }

    }

    public class LeadPensionados
    {
        public int id { get; set; }
        public string rut { get; set; }
        public int prioridad { get; set; }
        public string comuna { get; set; }
        public string celular { get; set; }
        public string fonoParticular { get; set; }
        public string ejecutivoAsignado { get; set; }
        public int oficina { get; set; }
        public string direccion { get; set; }
        public int numeroDireccion { get; set; }
        public string correo { get; set; }
        public string codigo { get; set; }
        public string region { get; set; }
        public string nombre { get; set; }
        public int estadoGestion { get; set; }
        public string marca { get; set; }
        public int periodo { get; set; }
    }
}
