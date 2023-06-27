using CDK.Data;
using CDK.Integration;
using CRM.Business.Entity;
using System;
using System.Collections.Generic;
using System.Data;


namespace CRM.Business.Data
{
    public class CobranzaPrevisionalDataAccess
    {

        public static string ActualizarResumen(Int32 Codigo, string Proceso, string Linea, string Falla)
        {

            Parametros parametros = new Parametros()
            {
                new Parametro("@Codigo", Codigo),
                new Parametro("@Proceso", Proceso),
                new Parametro("@Linea", Linea),
                new Parametro("@Falla", Falla)
            };
            return DBHelper.InstanceCRM.ObtenerEscalar<string>("previsional.sp_Update_Resumen", parametros);
        }



        public static int ValidaUsuarioCarga(string Rutejecutivo)
        {
            try
            {
                Parametros parametros = new Parametros()
            {
                new Parametro("@RutEjecutivo", Rutejecutivo),
         
            };
                return DBHelper.InstanceCRM.ObtenerEscalar<int>("previsional.sp_Valida_Usuario_Carga", parametros);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public static string ValidaListaResumen(int Codigo, string Estado, int Periodo)
        {
            try
            {
                Parametros parametros = new Parametros()
            {
                new Parametro("@Codigo", Codigo),
                new Parametro("@Estado", Estado),
                new Parametro("@Periodo", Periodo)

            };
                return DBHelper.InstanceCRM.ObtenerEscalar<string>("previsional.sp_Valida_Lista_Resumen", parametros);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public static string EliminarResumen(Int32 Codigo)
        {
            try
            {
                Parametros parametros = new Parametros()
            {
                new Parametro("@Codigo", Codigo),

            };
                return DBHelper.InstanceCRM.ObtenerEscalar<string>("Previsional.sp_eliminar_Resumen", parametros);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }


        public static List<CobranzaPrevisionalFallasEntity> ProcesoCargaNoDeclaradas(WebProceso proceso)
        {
            try
            {
                Parametros parametros = new Parametros()
            {
                new Parametro("@Id_Proceso", proceso.Codigo),
                new Parametro("@Token", proceso.Token),
                 new Parametro("@TipoProceso", proceso.TipoProceso),


            };
                return DBHelper.InstanceCRM.ObtenerColeccion("Previsional.sp_proceso_carga_no_declaradas", parametros, ConstructorListaResumen);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }


        public static List<CobranzaPrevisionalFallasEntity> ProcesoCargaDiferencias(WebProceso proceso)
        {
            try
            {
                Parametros parametros = new Parametros()
            {
                new Parametro("@Id_Proceso", proceso.Codigo),
                new Parametro("@Token", proceso.Token),
                 new Parametro("@TipoProceso", proceso.TipoProceso),


            };
                return DBHelper.InstanceCRM.ObtenerColeccion("Previsional.sp_proceso_carga_diferencias", parametros, ConstructorListaResumen);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public static List<CobranzaPrevisionalFallasEntity> ProcesoCargaCotImpagas(WebProceso proceso)
        {
            try
            {
                Parametros parametros = new Parametros()
            {
                new Parametro("@Id_Proceso", proceso.Codigo),
                new Parametro("@Token", proceso.Token),
                new Parametro("@TipoProceso", proceso.TipoProceso)

            };
                return DBHelper.InstanceCRM.ObtenerColeccion("Previsional.sp_proceso_carga_cot_Impagas", parametros, ConstructorListaResumen);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }



        public static string IngresoResumen(Int32 Codigo, string Proceso, string Linea, string Falla)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@Codigo", Codigo),
                new Parametro("@Proceso", Proceso),
                new Parametro("@Linea", Linea),
                new Parametro("@Falla", Falla)
            };
            return DBHelper.InstanceCRM.ObtenerEscalar<string>("Previsional.sp_Ingreso_Resumen", parametros);
        }

        public static List<CobranzaPrevisionalFallasEntity> ListaResumen(int Codigo, string estado)
        {

            Parametros parametros = new Parametros()
            {
                new Parametro("@Codigo",Codigo),
                new Parametro("@estado",estado)
            };

            return DBHelper.InstanceCRM.ObtenerColeccion("Previsional.sp_Lista_Resumen", parametros, ConstructorListaResumen);

        }

        public static List<CobranzaSubMenu2Entity> ListarSubMenu2(int IdSubPadre)
        {

            Parametros parametros = new Parametros()
            {
                new Parametro("@IdSubPadre",IdSubPadre)

            };

            return DBHelper.InstanceCRM.ObtenerColeccion("previsional.sp_Lista_SubMenu2", parametros, ConstructorListaSubMenu2);

        }


        public static string GuardGgestionDiferenciaCotizacion(FormData formData)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@Rut",formData.Rut)
                , new Parametro("@Dv",formData.Dv)
                , new Parametro("@Razon_social",formData.Razon_social)
                , new Parametro("@Estado",formData.Estado)
                , new Parametro("@SubEstado",formData.SubEstado)
                , new Parametro("@Observacion",formData.Observacion)
                , new Parametro("@Rut_ejecutivo",formData.Rut_ejecutivo)
                , new Parametro("@Oficina",formData.Oficina)
                , new Parametro("@Subestado2",formData.Subestado2)
            };
            return DBHelper.InstanceCRM.ObtenerEscalar<string>("Previsional.sp_GuardGgestionDiferenciaCotizacion", parametros);
        }



        public static string GuardGgestionCotizacionesImpagas(FormData formData)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@Rut",formData.Rut)
                , new Parametro("@Dv",formData.Dv)
                , new Parametro("@Razon_social",formData.Razon_social)
                , new Parametro("@Estado",formData.Estado)
                , new Parametro("@SubEstado",formData.SubEstado)
                , new Parametro("@Observacion",formData.Observacion)
                , new Parametro("@Rut_ejecutivo",formData.Rut_ejecutivo)
                , new Parametro("@Oficina",formData.Oficina)
                , new Parametro("@Subestado2",formData.Subestado2)
            };
            return DBHelper.InstanceCRM.ObtenerEscalar<string>("Previsional.sp_GuardGgestionCotizacionesImpagas", parametros);
        }


        public static string GuardGgestionCotizacionesNoPagadas(FormData formData)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@Rut",formData.Rut)
                , new Parametro("@Dv",formData.Dv)
                , new Parametro("@Razon_social",formData.Razon_social)
                , new Parametro("@Estado",formData.Estado)
                , new Parametro("@SubEstado",formData.SubEstado)
                , new Parametro("@Observacion",formData.Observacion)
                , new Parametro("@Rut_ejecutivo",formData.Rut_ejecutivo)
                , new Parametro("@Oficina",formData.Oficina)
                , new Parametro("@Subestado2",formData.Subestado2)
            };
            return DBHelper.InstanceCRM.ObtenerEscalar<string>("Previsional.sp_GuardGgestionCotizacionesNoPagadas", parametros);
        }






        private static CobranzaSubMenu2Entity ConstructorListaSubMenu2(DataRow row)
        {
            return new CobranzaSubMenu2Entity
            {

                Id = row["Id"] != DBNull.Value ? Convert.ToInt32(row["Id"]) : 0,
                Nombre = row["Nombre"] != DBNull.Value ? row["Nombre"].ToString() : string.Empty,

            };
        }





        private static CobranzaPrevisionalFallasEntity ConstructorListaResumen(DataRow row)
        {
            return new CobranzaPrevisionalFallasEntity
            {

                Codigo = row["Codigo"] != DBNull.Value ? Convert.ToInt32(row["Codigo"]) : 0,
                Proceso = row["Proceso"] != DBNull.Value ? row["Proceso"].ToString() : string.Empty,
                Linea = row["Linea"] != DBNull.Value ? row["Linea"].ToString() : string.Empty,
                Falla = row["Falla"] != DBNull.Value ? row["Falla"].ToString() : string.Empty,
                Periodo = row["Periodo"] != DBNull.Value ? Convert.ToInt32(row["Periodo"]) : 0,
                NombreEjecutivo = row["NombreEjecutivo"] != DBNull.Value ? row["NombreEjecutivo"].ToString() : string.Empty,
                FechaCarga = row["FechaCarga"] != DBNull.Value ? Convert.ToDateTime(row["FechaCarga"]) : new DateTime(1900, 1, 1),

            };
        }

        public static string IngresoLead(CobranzaPrevisionalEntity data)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@Id_Proceso",data.Proceso),
                new Parametro("@Oficina",data.Oficina),
                new Parametro("@Rut",data.Rut),
                new Parametro("@Dv",data.Dv),
                new Parametro("@Sucursal",data.Sucursal),
                new Parametro("@Razon",data.RazonSocial),
                new Parametro("@Periodo",data.Periodo),
                new Parametro("@AsfamAutorizada",data.AsfamAutorizada),
                new Parametro("@AsfamInformada",data.AsfamInformada),
                new Parametro("@AsfamAceptado",data.AsfamAceptado),
                new Parametro("@AsfamDiferencia",data.AsfamDiferencia),
                new Parametro("@CotizacionInformada",data.CotizacionInformada),
                new Parametro("@CotizacionCalculada",data.CotizacionCalculada),
                new Parametro("@CotizacionDiferencia",data.CotizacionDiferencia),
                new Parametro("@SaldoPagadoEmpresa",data.SaldoaFavorCaja),
                new Parametro("@DeudaGenerada",data.DeudaGenerada),

                new Parametro("@NombreOficina",data.NombreOficina),
                new Parametro("@UltimaCotizacion",data.UltimaCotizacion),
                new Parametro("@NroTrabajadores",data.NroTrabajadores),
                new Parametro("@MontoCotizacion",data.MontoCotizacion),
                new Parametro("@MesesImpagos",data.MesesImpagos),

                new Parametro("@Caratula",data.Caratula),
                new Parametro("@CodigoBarra",data.CodigoBarra),
                new Parametro("@Fecha",data.Fecha),
                new Parametro("@RentaFonasa",data.RentaFonasa),
                new Parametro("@RentaIsapre",data.RentaIsapre),
                new Parametro("@TotalRentas",data.TotalRentas),
                new Parametro("@Cotizacion",data.Cotizacion),
                new Parametro("@AsignacionFamiliar",data.AsignacionFamiliar),
                new Parametro("@MontoDeclarado",data.MontoDeclarado),
                new Parametro("@TotalTrabajadores",data.TotalTrabajadores),
                new Parametro("@EstadoPlanilla",data.EstadoPlanilla),
                new Parametro("@Estado",data.Estado)

        };
            return DBHelper.InstanceCRM.ObtenerEscalar<string>("Previsional.sp_Ingreso_carga_Temp", parametros);
        }

        public static string BorrarLead(int proceso)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@Id_Proceso",proceso)
            };
            return DBHelper.InstanceCRM.ObtenerEscalar<string>("Previsional.sp_Borrar_Cobranza_Previsional_temp", parametros);
        }




    }

}
