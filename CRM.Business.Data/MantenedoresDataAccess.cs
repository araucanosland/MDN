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

        public static List<LogMantenedor> ListarLogMDN(DateTime FechaDesde, DateTime FechaHasta, string Tipo)
        {
            Parametros parametros = new Parametros
            {
               new Parametro("@FechaDesde",FechaDesde),
               new Parametro("@FechaHasta",FechaHasta),
               new Parametro("@tipoReporte",Tipo),
            };
            return DBHelper.InstanceCRM.ObtenerColeccion("dbo.spMotor_Mantenedor_Lista_log_MDN", parametros, ConstructorLog);
        }


        public static List<LogMantenedor> ListarLogGalvarino(DateTime FechaDesde, DateTime FechaHasta, string Tipo)
        {
            Parametros parametros = new Parametros
            {
               new Parametro("@FechaDesde",FechaDesde),
               new Parametro("@FechaHasta",FechaHasta),
               new Parametro("@tipoReporte",Tipo),
            };
            return DBHelper.InstanceCRM.ObtenerColeccion("dbo.spMotor_Mantenedor_Lista_log_Galvarino", parametros, ConstructorLog);
        }


        private static LogMantenedor ConstructorLog(DataRow row)
        {
            return new LogMantenedor
            {

                Id = row["Id"] != DBNull.Value ? Convert.ToInt64(row["Id"]) : 0,
                FechaRegistro = row["FechaRegistro"] != DBNull.Value ? Convert.ToDateTime(row["FechaRegistro"]) : new DateTime(1900, 1, 1),
                RutEjecutivo = row["RutEjecutivo"] != DBNull.Value ? row["RutEjecutivo"].ToString() : string.Empty,
                NombreEjecutivo = row["nombreEjecutivo"] != DBNull.Value ? row["nombreEjecutivo"].ToString() : string.Empty,
                RutUsuario = row["RutUsuario"] != DBNull.Value ? row["RutUsuario"].ToString() : string.Empty,
                NombreUsuario = row["NombreUsuario"] != DBNull.Value ? row["NombreUsuario"].ToString() : string.Empty,
                Accion = row["accion"] != DBNull.Value ? row["accion"].ToString() : string.Empty,
                FechaRegistroString = row["FechaRegistroString"] != DBNull.Value ? row["FechaRegistroString"].ToString() : string.Empty,
            };

        }






        private static OficinaDerivacionEntity ConstructorOficina(DataRow row)
        {
            return new OficinaDerivacionEntity
            {
                codOficina = row["Cod_Oficina"] != DBNull.Value ? Convert.ToInt32(row["Cod_Oficina"].ToString()) : 0,
                DescOficina = row["Oficina"] != DBNull.Value ? row["Oficina"].ToString() : string.Empty,

            };
        }


        private static OficinaDerivacionEntity ConstructorOficinaGalvarino(DataRow row)
        {
            return new OficinaDerivacionEntity
            {
                cod_oficina = row["Cod_Oficina"] != DBNull.Value ? row["Cod_Oficina"].ToString() : string.Empty,
                DescOficina = row["Oficina"] != DBNull.Value ? row["Oficina"].ToString() : string.Empty,

            };
        }
        public static List<OficinaDerivacionEntity> ListarOficina()
        {
            //return DBHelper.InstanceReportes.ObtenerColeccion("negocios.spReporte_ListaPeriodos", ConstructorEntidad);
            return DBHelper.InstanceCRM.ObtenerColeccion("spMotor_Mantenedor_Lista_Oficinas", ConstructorOficina);
        }


        public static List<OficinaDerivacionEntity> ListarOficinaGalvarino()
        {
            //return DBHelper.InstanceReportes.ObtenerColeccion("negocios.spReporte_ListaPeriodos", ConstructorEntidad);
            return DBHelper.InstanceCRM.ObtenerColeccion("spMotor_Mantenedor_Lista_Oficinas_galvarino", ConstructorOficinaGalvarino);
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
                new Parametro("@RutEjecutivo", web.RutEjecutivo),

            };

            return DBHelper.InstanceCRM.ObtenerEscalar<long>("dbo.spMotor_Mantenedor_Ingreso", parametros);

        }

        public static long InsertarUsuarioGalvarino(WebIngreso web)
        {


            Parametros parametros = new Parametros
            {
                new Parametro("@RutUusario", web.RutUsuario),
                new Parametro("@NombreUsuario", web.NombreUsuario),
                new Parametro("@oficina", web.OficinaGalvarino),
                new Parametro("@Role", web.Cargo),
                new Parametro("@Correo", web.Correo),
                new Parametro("@RutEjecutivo", web.RutEjecutivo),

            };

            return DBHelper.InstanceCRM.ObtenerEscalar<long>("dbo.spMotor_Mantenedor_Ingreso_Galvarino", parametros);

        }


        public static long EliminarUsuarioGalvarino(string Rut, string RutEjecutivo)
        {


            Parametros parametros = new Parametros
            {
                new Parametro("@Rut",Rut),
                 new Parametro("@RutEjecutivo",RutEjecutivo),
            };

            return DBHelper.InstanceCRM.ObtenerEscalar<long>("dbo.spMotor_Mantenedor_Eliminar_Usuario_Galvarino", parametros);

        }


        public static long EliminarUsuario(string Rut, string RutEjecutivo)
        {


            Parametros parametros = new Parametros
            {
                new Parametro("@Rut",Rut),
                new Parametro("@RutEjecutivo",RutEjecutivo)
            };

            return DBHelper.InstanceCRM.ObtenerEscalar<long>("dbo.spMotor_Mantenedor_Eliminar_Usuario", parametros);

        }



        public static List<UsuarioEntity> ListarUsuarios(string Rut)
        {
            Parametros parametros = new Parametros
            {
               new Parametro("@Rut",Rut),

            };
            return DBHelper.InstanceCRM.ObtenerColeccion("dbo.spMotor_Mantenedor_Lista_usuarios", parametros, ConstructorUsuario);

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


        private static UsuarioEntity ConstructorUsuarioGalvarino(DataRow row)
        {
            return new UsuarioEntity
            {
                Id = row["Id"] != DBNull.Value ? row["Id"].ToString() : string.Empty,
                Rut = row["identificador"] != DBNull.Value ? row["identificador"].ToString() : string.Empty,
                Nombre = row["Nombres"] != DBNull.Value ? row["Nombres"].ToString() : string.Empty,
                Cargo = row["rol"] != DBNull.Value ? row["rol"].ToString() : string.Empty,
                Correo = row["email"] != DBNull.Value ? row["email"].ToString() : string.Empty,
                Sucursal = row["oficina"] != DBNull.Value ? row["oficina"].ToString() : string.Empty,
                Cod_of_galvarino = row["Codificacion"] != DBNull.Value ? row["Codificacion"].ToString() : string.Empty,
            };

        }



        public static List<UsuarioEntity> ListarUsuariosGalvarino(string Rut, string RutEjecutivo)
        {
            Parametros parametros = new Parametros
            {
               new Parametro("@Rut",Rut),
                new Parametro("@Rutejecutivo",RutEjecutivo),
            };
            return DBHelper.InstanceCRM.ObtenerColeccion("dbo.spMotor_Mantenedor_Lista_usuarios_Galvarino_open", parametros, ConstructorUsuarioGalvarino);

        }

        private static CargoEntity ConstructorCargo(DataRow row)
        {
            return new CargoEntity
            {
                Nombre = row["descripcion"] != DBNull.Value ? row["descripcion"].ToString() : string.Empty,
                Codigo = row["Id"] != DBNull.Value ? Convert.ToInt32(row["Id"].ToString()) : 0,

            };
        }


        private static CargoEntity ConstructorCargoGalvarino(DataRow row)
        {
            return new CargoEntity
            {
                Nombre = row["descripcion"] != DBNull.Value ? row["descripcion"].ToString() : string.Empty,
                codigouid = row["Id"] != DBNull.Value ? row["Id"].ToString() : string.Empty,

            };
        }


        public static List<CargoEntity> ListarCargos()
        {

            return DBHelper.InstanceCRM.ObtenerColeccion("dbo.spMotor_Mantenedor_Lista_Cargos", ConstructorCargo);

        }

        public static List<CargoEntity> ListarCargosGalvarino()
        {

            return DBHelper.InstanceCRM.ObtenerColeccion("dbo.spMotor_Mantenedor_Lista_Cargos_galvarino", ConstructorCargoGalvarino);

        }

    }
}
