using System;

namespace CRM.Business.Entity
{
    public class GestionOficinaEntity
    {

        public long CodIngreso { get; set; }
        public string FolioLicencia { get; set; }
        public DateTime Fechagestion { get; set; }
        public int NGestion { get; set; }
        public int Tipodevuelta { get; set; }
        public string Comentarios { get; set; }
        public int idRegion { get; set; }
        public int idcomuna { get; set; }
        public string region { get; set; }
        public string comuna { get; set; }
        public string direccion { get; set; }
        public string ejecutivo { get; set; }
        public string tipoContacto { get; set; }
        public string contacto { get; set; }
        public int TelefonoContacto { get; set; }
        public string numero { get; set; }
        public string correo { get; set; }
        public int idGestion { get; set; }

    }
    public class RegionEntity
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public int Secuencia { get; set; }
    }

    public class ComunaEntity
    {
        public int Id { get; set; }
        public string Nombre { get; set; }

    }

    public class WebGestionOficinas
    {
        public long codIngreso { get; set; }
        public int nGestion { get; set; }
        public int tipoDevuelta { get; set; }
        public int IdGestion { get; set; }
        public int IdRegion { get; set; }
        public int IdComuna { get; set; }
        public string direccion { get; set; }
        public string comentarios { get; set; }
        public string tipo { get; set; }
        public string nombre_contacto { get; set; }
        public int telefono_contacto { get; set; }
        public string email { get; set; }
        public string numero { get; set; }

    }






}
