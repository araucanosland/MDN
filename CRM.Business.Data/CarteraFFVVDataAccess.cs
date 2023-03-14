using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CRM.Business.Entity;
using System.Data;
using CDK.Data;
using CDK.Integration;

namespace CRM.Business.Data
{
    public class CarteraFFVVDataAccess
    {
        public static List<EjecutivoFFVVEntity> ObtenerEjecutivoFFVV(string Token)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@Token", Token)
            };
            return DBHelper.InstanceCRM.ObtenerColeccion("dbo.spMotor_EjecutivosCarteraFFVV", pram, ConEjeFFVV);
        }

        private static EjecutivoFFVVEntity ConEjeFFVV(DataRow row)
        {
            return new EjecutivoFFVVEntity
            {
                Rut = row["Rut"] != DBNull.Value ? row["Rut"].ToString() : string.Empty,
                Nombre = row["Nombre"] != DBNull.Value ? row["Nombre"].ToString() : string.Empty,
                Cod_Sucursal = row["Cod_Sucursal"] != DBNull.Value ? Convert.ToInt32(row["Cod_Sucursal"]) : 0,
            };
        }

        public static List<CarteraFFVVEntity> ObtenerCarteraFFVV(string Token, string rut_ejecutivo)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@Token", Token),
                new Parametro("@Rut_ejecutivo", rut_ejecutivo)
            };
            return DBHelper.InstanceCRM.ObtenerColeccion("dbo.spMotor_CarteraFFVV", pram, CarteraEjeFFVV);
        }

        private static CarteraFFVVEntity CarteraEjeFFVV(DataRow row)
        {
            return new CarteraFFVVEntity
            {
                id = row["id"] != DBNull.Value ? Convert.ToInt32(row["id"]) : 0,
                rut_ejecutivo = row["rut_ejecutivo"] != DBNull.Value ? row["rut_ejecutivo"].ToString() : string.Empty,
                rut_empresa = row["rut_empresa"] != DBNull.Value ? row["rut_empresa"].ToString() : string.Empty,
                oficina = row["oficina"] != DBNull.Value ? Convert.ToInt32(row["oficina"]) : 0,
                nombre_empresa = row["nombre_empresa"] != DBNull.Value ? row["nombre_empresa"].ToString() : string.Empty,
            };
        }

        public static int Eliminar(int CodIngreso)
        {
            Parametros parametros = new Parametros
            {

                new Parametro("@CodIngreso", CodIngreso)
            };
            return DBHelper.InstanceCRM.ObtenerEscalar<int>("dbo.spMotor_EliminaCarteraFFVV", parametros);
        }

        public static void AsignaCarteraFFVV(CarteraFFVVEntity data)
        {

            Parametros pr = new Parametros
            {
                new Parametro("@Rut_ejecutivo",data.rut_ejecutivo),
                new Parametro("@Rut_empresa", data.rut_empresa),
                new Parametro("@Oficina",data.oficina),
                new Parametro("@Nombre_empresa", data.nombre_empresa),
            };

            DBHelper.InstanceCRM.EjecutarProcedimiento("dbo.spMotor_AsignaCarteraFFVV", pr);

        }


    }
}
