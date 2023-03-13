using System;
using System.Collections.Generic;
using System.Data;
using CPEngine.Models.Excel;
using CDK.Integration;
using CDK.Data;

//------------------------------------------------------------------------------
// <generado automáticamente>
//     Este código fue generado por una herramienta.
//
//     Los cambios en este archivo podrían causar un comportamiento incorrecto y se perderán si
//     se vuelve a generar el código.
// </generado automáticamente>
//------------------------------------------------------------------------------

namespace CPEngine.Models.Data
{
    /// <summary>
    /// Clase Acceso de Datos EstadogestionData
    /// </summary>
    /// <author>@Charly</author>
    /// <created>05-09-2017 23:39:58</created>
    /// <remarks>
    /// Esta clase fué generada automáticamente por una herramienta.
    /// </remarks>
    public class GeneralesData
    {
       
        #region Datos para Documento de exportacion a Excel SIL 9K
        public static DataTable ListarObjetosAfiSIL9K(int RutEmpresa, int CodOficina)
        {
            Parametros prms = new Parametros()
            {
                new Parametro("@RutEmpresa",RutEmpresa),
                new Parametro("@CodOficina",CodOficina),
            };
            return DBHelper.InstanceEngine.ObtenerDataTable("documentos.spDoc_ExcelSIL9K", prms);
        }
        #endregion



        #region Datos para Documento de exportacion a Excel SIL 9K2
        public static DataTable ListarObjetosDocPendiente(int RutEmpresa, int CodOficina)
        {
            Parametros prms = new Parametros()
            {
                new Parametro("@RutEmpresa",RutEmpresa),
                new Parametro("@CodOficina",CodOficina),
            };
            return DBHelper.InstanceEngine.ObtenerDataTable("documentos.spDoc_ExcelSIL9K_DocPendiente", prms);
        }


        public static DataTable ListarObjetosDisponibleApago(int RutEmpresa, int CodOficina)
        {
            Parametros prms = new Parametros()
            {
                new Parametro("@RutEmpresa",RutEmpresa),
                new Parametro("@CodOficina",CodOficina),
            };
            return DBHelper.InstanceEngine.ObtenerDataTable("documentos.spDoc_ExcelSIL9K_DispApago", prms);
        }
        #endregion
        //spDoc_Excel5DocPendiente


    }
}
