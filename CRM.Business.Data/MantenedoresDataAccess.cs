using CDK.Data;
using CDK.Integration;
using CRM.Business.Entity;
using System;
using System.Collections.Generic;
using System.Data;

namespace CRM.Business.Data
{
    public class MantenedoresDataAccess
    {

        private static OficinaDerivacionEntity ConstructorOficina(DataRow row)
        {
            return new OficinaDerivacionEntity
            {
                codOficina = row["Cod_Oficina"] != DBNull.Value ? Convert.ToInt32(row["Cod_Oficina"]) : 0,
                DescOficina = row["Oficina"] != DBNull.Value ? row["Oficina"].ToString() : string.Empty,

            };
        }

        public static List<OficinaDerivacionEntity> ListarOficina()
        {
            //return DBHelper.InstanceReportes.ObtenerColeccion("negocios.spReporte_ListaPeriodos", ConstructorEntidad);
            return DBHelper.InstanceCRM.ObtenerColeccion("spMotor_Mantenedor_Lista_Oficinas", ConstructorOficina);
        }



        public static long InsertarUsuario(WebIngreso web)
        {
     

            Parametros parametros = new Parametros
            {
                new Parametro("@RutUusario", web.RutUsuario),
                new Parametro("@NombreUsuario", web.NombreUsuario),
                new Parametro("@oficina", web.oficina),
                new Parametro("@Cargo", web.Cargo),
                new Parametro("@Correo", web.Correo),

            };

            return DBHelper.InstanceCRM.ObtenerEscalar<long>("dbo.spMotor_Mantenedor_Ingreso", parametros);

        }

        public static long EliminarUsuario(string Rut)
        {


            Parametros parametros = new Parametros
            {
                new Parametro("@Rut",Rut),
            };

            return DBHelper.InstanceCRM.ObtenerEscalar<long>("dbo.spMotor_Mantenedor_Eliminar_Usuario", parametros);

        }





        private static UsuarioEntity ConstructorUsuario(DataRow row)
        {
            return new UsuarioEntity
            {
                Periodo = row["Periodo"] != DBNull.Value ? row["Periodo"].ToString() : string.Empty,
                Rut = row["Rut"] != DBNull.Value ? row["Rut"].ToString() : string.Empty,
                Ejec_Rut = row["Ejec_Rut"] != DBNull.Value ? Convert.ToInt32(row["Ejec_Rut"].ToString()) : 0,
                Ejec_Dv = row["Ejec_Dv"] != DBNull.Value ? row["Ejec_Dv"].ToString() : string.Empty,
                Nombre = row["Nombre"] != DBNull.Value ? row["Nombre"].ToString() : string.Empty,
                Cod_Sucursal = row["Cod_Sucursal"] != DBNull.Value ? Convert.ToInt32(row["Cod_Sucursal"].ToString()) : 0,
                Sucursal = row["Sucursal"] != DBNull.Value ? row["Sucursal"].ToString() : string.Empty,
                Correo = row["Correo"] != DBNull.Value ? row["Correo"].ToString() : string.Empty,
                Telefono = row["Telefono"] != DBNull.Value ? row["Telefono"].ToString() : string.Empty,
                Anexo = row["Anexo"] != DBNull.Value ? row["Anexo"].ToString() : string.Empty,
                TipoAusencia = row["TipoAusencia"] != DBNull.Value ? row["TipoAusencia"].ToString() : string.Empty,
                Cargo = row["Cargo"] != DBNull.Value ? row["Cargo"].ToString() : string.Empty,
                //  Ausencia_FechaIni = row["Ausencia_FechaIni"] != DBNull.Value ? Convert.ToDateTime(row["Ausencia_FechaIni"]) : new DateTime(1900, 1, 1),
                //  Ausencia_FechaFin = row["Ausencia_FechaFin"] != DBNull.Value ? Convert.ToDateTime(row["Ausencia_FechaFin"]) : new DateTime(1900, 1, 1),
                HabilesMes = row["HabilesMes"] != DBNull.Value ? Convert.ToInt32(row["HabilesMes"].ToString()) : 0,
                DiasAusentes = row["DiasAusentes"] != DBNull.Value ? Convert.ToInt32(row["DiasAusentes"].ToString()) : 0,
                DiasLaborables = row["DiasLaborables"] != DBNull.Value ? Convert.ToInt32(row["DiasLaborables"].ToString()) : 0,
                NReg_Asignacion = row["NReg_Asignacion"] != DBNull.Value ? Convert.ToInt32(row["NReg_Asignacion"].ToString()) : 0,
                TipoAsignacion = row["TipoAsignacion"] != DBNull.Value ? Convert.ToInt32(row["TipoAsignacion"].ToString()) : 0,
                AsignacionObs = row["AsignacionObs"] != DBNull.Value ? row["AsignacionObs"].ToString() : string.Empty,
                EsAsignable = row["NReg_Asignacion"] != DBNull.Value ? Convert.ToInt32(row["NReg_Asignacion"].ToString()) : 0,
                Canal = row["Canal"] != DBNull.Value ? row["Canal"].ToString() : string.Empty,
                FechaIngreso = row["FechaIngreso"] != DBNull.Value ? Convert.ToDateTime(row["FechaIngreso"]) : new DateTime(1900, 1, 1),
                FechaFinalizacion = row["FechaFinalizacion"] != DBNull.Value ? Convert.ToDateTime(row["FechaFinalizacion"]) : new DateTime(1900, 1, 1),
                TipoContrato = row["TipoContrato"] != DBNull.Value ? row["TipoContrato"].ToString() : string.Empty,
                CargoOriginal = row["CargoOriginal"] != DBNull.Value ? row["CargoOriginal"].ToString() : string.Empty,
                Sexo = row["Sexo"] != DBNull.Value ? row["Sexo"].ToString() : string.Empty,
            };

        }
        public static List<UsuarioEntity> ListarUsuarios(string Rut)
        {
            Parametros parametros = new Parametros
            {
               new Parametro("@Rut",Rut),

            };
            return DBHelper.InstanceCRM.ObtenerColeccion("dbo.spMotor_Mantenedor_Lista_usuarios", parametros, ConstructorUsuario);

        }

        private static CargoEntity ConstructorCargo(DataRow row)
        {
            return new CargoEntity
            {
                Nombre = row["descripcion"] != DBNull.Value ? row["descripcion"].ToString() : string.Empty,
                Codigo = row["Id"] != DBNull.Value ? Convert.ToInt32(row["Id"].ToString()) : 0,

            };
        }

        public static List<CargoEntity> ListarCargos()
        {

            return DBHelper.InstanceCRM.ObtenerColeccion("dbo.spMotor_Mantenedor_Lista_Cargos", ConstructorCargo);

        }

    }
}
