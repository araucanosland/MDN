using System;

namespace CRM.Business.Entity
{
    public class NormalizacionEntity
    {
        public long lead_id { get; set; }
        public string lead_rut { get; set; }
        public int periodo { get; set; }
        public long lead_monto_adeudado { get; set; }
        public string lead_ejecutivo_asignado { get; set; }
        public int lead_oficina { get; set; }
        public int lead_prioridad { get; set; }
        public int lead_tipo_campaña { get; set; }
        public int lead_focos { get; set; }
        public string lead_rut_empresa { get; set; }
        public string lead_segmento { get; set; }
        public string lead_folio_credito { get; set; }
        public int lead_derivacion { get; set; }
        public string afiliado_rut { get; set; }
        public string afiliado_nombres { get; set; }
        public string afiliado_apellidos { get; set; }
        public DateTime afiliado_fecha_nacimiento { get; set; }
        public string afiliado_nacionalidad { get; set; }
        public string afiliado_sexo { get; set; }
        public string company_RutEmpresa { get; set; }
        public string company_NombreEmpresa { get; set; }
        public long lgestiones_id { get; set; }
        public string cgestiones_comentarios { get; set; }
        public DateTime gestiones_fecha_compromiso { get; set; }
        public string gestiones_rut_ejecutivo { get; set; }
        public string gestiones_nombre_ejecutivo { get; set; }
        public int gestiones_oficina { get; set; }
        public DateTime gestiones_fecha_gestion { get; set; }
        public string gestiones_rut_afiliado { get; set; }
        public long gestiones_lead_id { get; set; }
        public int gestiones_estado_id { get; set; }
        public int gestiones_causa_basal_id { get; set; }
        public string gestiones_estado_cliente_id { get; set; }
        public int estadoCliente_id { get; set; }
        public string estadoCliente_estado { get; set; }
        public string estadoCliente_descripcion { get; set; }
        public string estadoCliente_color { get; set; }
        public string estadoCliente_opciones { get; set; }
        public int causaBasal_id { get; set; }
        public string causaBasal_nombre { get; set; }
        public int estado_id { get; set; }
        public string estado_nombre { get; set; }
        public string estado_opciones { get; set; }
        public int estado_padreId { get; set; }
        public int estadopadre_id { get; set; }
        public string estadopadre_nombre { get; set; }
        public string estadopadre_opciones { get; set; }
        public int estadopadre_padreId { get; set; }
        public string ultimages_comentarios { get; set; }
        public DateTime ultimages_fecha_compromiso { get; set; }
        public string ultimages_rut_ejecutivo { get; set; }
        public string ultimages_nombre_ejecutivo { get; set; }
        public string ultimages_oficina { get; set; }
        public DateTime ultimages_fecha_gestion { get; set; }
        public string ultimages_rut_afiliado { get; set; }
        public long ultimages_lead_id { get; set; }
        public int ultimages_estado_id { get; set; }
        public int ultimages_causa_basal_id { get; set; }
        public int ultimages_estado_cliente_id { get; set; }
    }
}
