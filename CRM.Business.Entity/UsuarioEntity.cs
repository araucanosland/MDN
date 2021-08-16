using System;

namespace CRM.Business.Entity
{
    public class WebIngreso
    {
        public string RutUsuario { get; set; }
        public string NombreUsuario { get; set; }
        public int oficina { get; set; }
        public string Cargo { get; set; }
        public string Correo { get; set; }
        public string OficinaGalvarino { get; set; }
    }


    public class UsuarioEntity
    {
        public string Id { get; set; }
        public string Periodo { get; set; }
        public string Rut { get; set; }
        public int Ejec_Rut { get; set; }
        public string Ejec_Dv { get; set; }
        public string Nombre { get; set; }
        public int Cod_Sucursal { get; set; }
        public string Sucursal { get; set; }
        public string Cargo { get; set; }
        public string Correo { get; set; }
        public string Telefono { get; set; }
        public string Anexo { get; set; }
        public string Cod_of_galvarino { get; set; }
        public string TipoAusencia { get; set; }
        public DateTime Ausencia_FechaIni { get; set; }
        public DateTime Ausencia_FechaFin { get; set; }
        public int HabilesMes { get; set; }
        public int DiasAusentes { get; set; }
        public int DiasLaborables { get; set; }
        public int NReg_Asignacion { get; set; }
        public int TipoAsignacion { get; set; }
        public string AsignacionObs { get; set; }
        public int EsAsignable { get; set; }
        public string Canal { get; set; }
        public DateTime FechaIngreso { get; set; }
        public DateTime FechaFinalizacion { get; set; }
        public string TipoContrato { get; set; }
        public string CargoOriginal { get; set; }
        public string Sexo { get; set; }



    }
}
