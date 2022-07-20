using CDK.Data;
using CDK.Integration;
using CRM.Business.Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CRM.Business.Data
{
    public static class CampanaDiplomadoDataAccess
    {
        public static List<CampanaDiplomadoEntity> ListaCampanaDiplomado(string rut, string nombreempresa, string nombrepunto)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@RutEmpresa",rut),
                new Parametro("@NomEmpresa",nombreempresa),
                new Parametro("@NomPunto",nombrepunto),
            };
            return DBHelper.InstanceNegocio.ObtenerColeccion("diplomado.Listar_Lead_Diplomado", parametros, CampanaDiplomadoLead);
        }

        private static Entity.CampanaDiplomadoEntity CampanaDiplomadoLead(DataRow row)
        {
            return new Entity.CampanaDiplomadoEntity
            {
                Id = row["id"] != DBNull.Value ? Convert.ToInt32(row["id"]) : 0,
                Rut_Empresa = row["RutEmpresa"] != DBNull.Value ? row["RutEmpresa"].ToString() : string.Empty,
                Nombre_Empresa = row["NombreEmpresa"] != DBNull.Value ? row["NombreEmpresa"].ToString() : string.Empty,
                Nombre_Punto = row["NombrePunto"] != DBNull.Value ? row["NombrePunto"].ToString() : string.Empty,
                Oficina = row["Oficina"] != DBNull.Value ? row["Oficina"].ToString() : string.Empty,
                Zona = row["Zona"] != DBNull.Value ? row["Zona"].ToString() : string.Empty,
                Estamento = row["Estamento"] != DBNull.Value ? row["Estamento"].ToString() : string.Empty,
                Cargo = row["Cargo"] != DBNull.Value ? row["Cargo"].ToString() : string.Empty,
                Cluster = row["Cluster"] != DBNull.Value ? row["Cluster"].ToString() : string.Empty,
                Nombre_Contacto = row["NombreContacto"] != DBNull.Value ? row["NombreContacto"].ToString() : string.Empty,
                Fono = row["Fono"] != DBNull.Value ? Convert.ToInt32(row["Fono"]) : 0,
                Mail = row["Mail"] != DBNull.Value ? row["Mail"].ToString() : string.Empty,
                Fecha_Ingreso = row["FechaIngreso"] != DBNull.Value ? Convert.ToDateTime(row["FechaIngreso"]) : new DateTime(1900, 1, 1),
                Estado_Encuesta = row["egestion"] != DBNull.Value ? row["egestion"].ToString() : row["EstadoEncuesta"].ToString(),
                SubEstado = row["segestion"] != DBNull.Value ? row["segestion"].ToString() : string.Empty
            };
        }

        public static List<EstadoGestionEntity> ListarEstadosGestionNull()
        {
            Parametros parametros = new Parametros()
            {
            };
            return DBHelper.InstanceNegocio.ObtenerColeccion("diplomado.Listar_Estado_Gestion_null", parametros, EstadosGestionNull);
        }

        public static List<EstadoGestionEntity> ListarSubEstadosGestion(int padre)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@Padre",padre),
            };
            return DBHelper.InstanceNegocio.ObtenerColeccion("diplomado.Listar_Sub_Estado_Gestion", parametros, EstadosGestionNull);
        }

        private static Entity.EstadoGestionEntity EstadosGestionNull(DataRow row)
        {
            return new Entity.EstadoGestionEntity
            {
                eg_id = row["id"] != DBNull.Value ? Convert.ToInt32(row["id"]) : 0,
                eg_nombre = row["nombre"] != DBNull.Value ? row["nombre"].ToString() : string.Empty,
            };
        }

        public static int GuardarGestionDiplomado(GestionDiplomadoEntity entrada)
        {
            Parametros param = new Parametros
            {
                new Parametro("@Id_lead", entrada.Id_lead),
                new Parametro("@Estamento", entrada.Estamento),
                new Parametro("@Cargo", entrada.Cargo),
                new Parametro("@Nombre", entrada.Nombre),
                new Parametro("@Fono", entrada.Fono),
                new Parametro("@Mail", entrada.Mail),
                new Parametro("@Llamado", entrada.Llamado),
                new Parametro("@Estado_id", entrada.Estado_id),
                new Parametro("@SubEstado_id", entrada.SubEstado_id),
                new Parametro("@RutEjecutivo", entrada.RutEjecutivo),
            };
            return DBHelper.InstanceNegocio.EjecutarProcedimiento("diplomado.Guardar_Gestion_Diplomado", param);
        }
    }
}
