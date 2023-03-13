using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CRM.Business.Entity.Clases;
using CRM.Business.Data;

namespace CRM.Business.Controller.Call
{
    public class CallBaseController
    {
        public AsignacionCallBase AffiliateData(string rut)
        {
            var AsgDataBrut = AsignacionDataAccess.ObtenerEntidades().Where(asg => asg.Afiliado_Rut + "-" + asg.Afiliado_Dv == rut && asg.Periodo == "201711" && asg.TipoAsignacion == 5).FirstOrDefault();

            return new AsignacionCallBase
            {
                Asignacion = AsgDataBrut.id_Asign,
                Afiliado = new AfiliadoCallBase
                {
                    Rut = AsgDataBrut.Afiliado_Rut + "-" + AsgDataBrut.Afiliado_Dv,
                    Nombres = AsgDataBrut.Nombre + " " + AsgDataBrut.Apellido,
                    Segmento = AsgDataBrut.Segmento
                },
                Empresa = new EmpresaCallBase
                {
                    Rut = AsgDataBrut.Empresa_Rut + "-" + AsgDataBrut.Empresa_Dv,
                    RazonSocial = AsgDataBrut.Empresa
                },
                OficinaAsinacion = SucursalDataAccess.ObtenerSucursal(AsgDataBrut.Oficina).Nombre,
                PreAprobado = AsgDataBrut.PreAprobadoFinal
            };


        }
    }
}
