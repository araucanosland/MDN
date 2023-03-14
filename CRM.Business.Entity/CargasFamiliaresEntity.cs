using System;

namespace CRM.Business.Entity
{
    public class CargasFamiliaresEntity
    {
        public int Id { get; set; }
        public string RutAfiliado { get; set; }
        public string NombresAfiliado { get; set; }
        public string ApellidosAfiliado { get; set; }
        public int CodOficina { get; set; }
        public string RutCarga { get; set; }
        public string NombreCarga { get; set; }
        public string ApellidoCarga { get; set; }
        public string EstadoCarga { get; set; }
        public string EstadoPagoCarga { get; set; }
        public int NumeroCarga { get; set; }
        public DateTime FechaNacimientoCarga { get; set; }
        public DateTime FechaVencimientoCarga { get; set; }
        public DateTime FechaPrimeraAutorizacion { get; set; }
        public DateTime FechaUltimaAutorizacion { get; set; }
        public int cantidadCarga { get; set; }
        public int TotalRegistros { get; set; }
        public string Estadogestion { get; set; }
        public string RutEmpresa { get; set; }
        public string NombreEmpresa { get; set; }
        public string CodigoCausante { get; set; }
        public string IdEstadoGestion { get; set; }
        
    }
}
