using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CRM.Business.Entity;
using CRM.Business.Entity.Empresas;
using System.Data;
using CDK.Data;
using CDK.Integration;

namespace CRM.Business.Data
{
    public class CosalDataAccess
    {
        public static int GuardaCosal(string Rut_Afiliado, int Oficina, string Ejecutivo_ingreso)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@Rut_Afiliado", Rut_Afiliado),
                new Parametro("@Oficina", Oficina ),
                new Parametro("@Ejecutivo_ingreso", Ejecutivo_ingreso),
            };
            return DBHelper.InstanceCRM.EjecutarProcedimiento("dbo.spMotor_Guardar_Afiliado_Cosal", pram);
        }

    }
}
