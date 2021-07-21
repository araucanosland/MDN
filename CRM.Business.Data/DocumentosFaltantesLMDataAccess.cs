using CDK.Data;
using CDK.Integration;
using CRM.Business.Entity;
using System;
using System.Data;

namespace CRM.Business.Data
{
    public static class DocumentosFaltantesLMDataAccess
    {
        public static void GuardarEntrada(DocumentosFaltantesLM documentosFaltantesLM, string token)
        {
            Parametros prm = new Parametros()
            {
                new Parametro("@FolioLicencia",documentosFaltantesLM.FolioLicencia),
                new Parametro("@RutAfiliado",documentosFaltantesLM.RutAfiliado),
                new Parametro("@CodigoIngresoLM",documentosFaltantesLM.CodigoIngresoLM),
                new Parametro("@Liquidacion1",documentosFaltantesLM.Liquidacion1),
                new Parametro("@Liquidacion2",documentosFaltantesLM.Liquidacion2),
                new Parametro("@Liquidacion3",documentosFaltantesLM.Liquidacion3),
                new Parametro("@Liquidacion4",documentosFaltantesLM.Liquidacion4),
                new Parametro("@Liquidacion5",documentosFaltantesLM.Liquidacion5),
                new Parametro("@Liquidacion6",documentosFaltantesLM.Liquidacion6),
                new Parametro("@CertificadoRenta",documentosFaltantesLM.CertificadoRenta),
                new Parametro("@Otros",documentosFaltantesLM.Otros),
                new Parametro("@Comentarios",documentosFaltantesLM.Comentarios),
                new Parametro("@Acredita90",documentosFaltantesLM.Acredita90),
                new Parametro("@Acredita180",documentosFaltantesLM.Acredita180),
                new Parametro("@Token", token),
                new Parametro("@FaltaDocumentacion", documentosFaltantesLM.FaltaDocumentacion),
                new Parametro("@CertificadoAfiliacionAFP", documentosFaltantesLM.CertificadoAfiliacionAFP),
                new Parametro("@CertPagPensiones", documentosFaltantesLM.CertPagPensiones),
                new Parametro("@tipoSeleccion", documentosFaltantesLM.tipoSeleccion),
                new Parametro("@Imagen",documentosFaltantesLM.Imagen),
                new Parametro("@diagnostico",documentosFaltantesLM.diagnostico),
                new Parametro("@sinfirma",documentosFaltantesLM.sinfirma),
                new Parametro("@contrato",documentosFaltantesLM.contrato),
                new Parametro("@cedular_identidad",documentosFaltantesLM.cedular_identidad),
                new Parametro("@seccion_c",documentosFaltantesLM.seccion_c),
                new Parametro("@certificado_nacimiento",documentosFaltantesLM.certificado_nacimiento),
                new Parametro("@mutual",documentosFaltantesLM.mutual),
                new Parametro("@isapre",documentosFaltantesLM.isapre),
                new Parametro("@fechaliquidacion1",documentosFaltantesLM.fechaliquidacion1),
                new Parametro("@fechaliquidacion2",documentosFaltantesLM.fechaliquidacion2),
                new Parametro("@fechaliquidacion3",documentosFaltantesLM.fechaliquidacion3),
                new Parametro("@fechaliquidacion4",documentosFaltantesLM.fechaliquidacion4),
                new Parametro("@fechaliquidacion5",documentosFaltantesLM.fechaliquidacion5),
                new Parametro("@fechaliquidacion6",documentosFaltantesLM.fechaliquidacion6),
                new Parametro("@rutusuario",documentosFaltantesLM.rutusuario),
                new Parametro("@cartaAutorizacion",documentosFaltantesLM.cartaAutorizacion),
                new Parametro("@FaltaFirmaempleador",documentosFaltantesLM.Faltafirmaempleador)


    };
            try
            {
                DBHelper.InstanceCRM.EjecutarProcedimiento("licencias.sp_Lic_DocumentosFaltantes_Guardar_Nuevo_Flujo", prm);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public static DocumentosFaltantesLM ObtenerByCodIngresoLM(long codIngreso)
        {
            var param = new Parametro("@CodIngreso", codIngreso);
            return DBHelper.InstanceCRM.ObtenerEntidad("licencias.sp_Lic_DocumentosFaltantes_Obtener", param, ConstructorEntidad);
        }

        private static DocumentosFaltantesLM ConstructorEntidad(DataRow row)
        {
            return new DocumentosFaltantesLM
            {
                Acredita180 = row["Acredita180"] != DBNull.Value ? Convert.ToBoolean(row["Acredita180"]) : false,
                Acredita90 = row["Acredita90"] != DBNull.Value ? Convert.ToBoolean(row["Acredita90"]) : false,
                CertificadoRenta = row["CertificadoRenta"] != DBNull.Value ? Convert.ToBoolean(row["CertificadoRenta"]) : false,
                CodigoIngresoLM = row["CodigoIngresoLM"] != DBNull.Value ? Convert.ToInt64(row["CodigoIngresoLM"]) : 0,
                CodigoSucursalIngreso = row["CodigoSucursalIngreso"] != DBNull.Value ? Convert.ToInt32(row["CodigoSucursalIngreso"]) : 0,
                Comentarios = row["Comentarios"] != DBNull.Value ? Convert.ToString(row["Comentarios"]) : string.Empty,
                FaltaDocumentacion = row["Acredita90"] != DBNull.Value ? Convert.ToBoolean(row["Acredita90"]) : false,
                FechaIngreso = row["FechaIngreso"] != DBNull.Value ? Convert.ToDateTime(row["FechaIngreso"]) : new DateTime(1900, 1, 1),
                FolioLicencia = row["FolioLicencia"] != DBNull.Value ? Convert.ToString(row["FolioLicencia"]) : string.Empty,
                Liquidacion1 = row["Liquidacion1"] != DBNull.Value ? Convert.ToBoolean(row["Liquidacion1"]) : false,
                Liquidacion2 = row["Liquidacion2"] != DBNull.Value ? Convert.ToBoolean(row["Liquidacion2"]) : false,
                Liquidacion3 = row["Liquidacion3"] != DBNull.Value ? Convert.ToBoolean(row["Liquidacion3"]) : false,
                Liquidacion4 = row["Liquidacion4"] != DBNull.Value ? Convert.ToBoolean(row["Liquidacion4"]) : false,
                Liquidacion5 = row["Liquidacion5"] != DBNull.Value ? Convert.ToBoolean(row["Liquidacion5"]) : false,
                Liquidacion6 = row["Liquidacion6"] != DBNull.Value ? Convert.ToBoolean(row["Liquidacion6"]) : false,
                Otros = row["Otros"] != DBNull.Value ? Convert.ToBoolean(row["Otros"]) : false,
                RutAfiliado = row["RutAfiliado"] != DBNull.Value ? Convert.ToString(row["RutAfiliado"]) : string.Empty,
                RutEjecutivoIngreso = row["RutEjecutivoIngreso"] != DBNull.Value ? Convert.ToString(row["RutEjecutivoIngreso"]) : string.Empty,
                CertificadoAfiliacionAFP = row["CertificadoAfiliacionAFP"] != DBNull.Value ? Convert.ToBoolean(row["CertificadoAfiliacionAFP"]) : false,
                CertPagPensiones = row["CertPagPensiones"] != DBNull.Value ? Convert.ToBoolean(row["CertPagPensiones"]) : false,
                Imagen = row["Imagen"] != DBNull.Value ? Convert.ToBoolean(row["Imagen"]) : false,
                diagnostico = row["diagnostico"] != DBNull.Value ? Convert.ToBoolean(row["diagnostico"]) : false,
                sinfirma = row["sinfirma"] != DBNull.Value ? Convert.ToBoolean(row["sinfirma"]) : false,
                contrato = row["contrato"] != DBNull.Value ? Convert.ToBoolean(row["contrato"]) : false,
                cedular_identidad = row["cedular_identidad"] != DBNull.Value ? Convert.ToBoolean(row["cedular_identidad"]) : false,
                seccion_c = row["seccion_c"] != DBNull.Value ? Convert.ToBoolean(row["seccion_c"]) : false,
                certificado_nacimiento = row["certificado_nacimiento"] != DBNull.Value ? Convert.ToBoolean(row["certificado_nacimiento"]) : false,
                tipoSeleccion = row["tipoSeleccion"] != DBNull.Value ? Convert.ToString(row["tipoSeleccion"]) : string.Empty,
                mutual = row["mutual"] != DBNull.Value ? Convert.ToBoolean(row["mutual"]) : false,
                isapre = row["isapre"] != DBNull.Value ? Convert.ToBoolean(row["isapre"]) : false,
                fechaliquidacion1 = row["fechaliquidacion1"] != DBNull.Value ? Convert.ToString(row["fechaliquidacion1"]) : string.Empty,
                fechaliquidacion2 = row["fechaliquidacion2"] != DBNull.Value ? Convert.ToString(row["fechaliquidacion2"]) : string.Empty,
                fechaliquidacion3 = row["fechaliquidacion3"] != DBNull.Value ? Convert.ToString(row["fechaliquidacion3"]) : string.Empty,
                fechaliquidacion4 = row["fechaliquidacion4"] != DBNull.Value ? Convert.ToString(row["fechaliquidacion4"]) : string.Empty,
                fechaliquidacion5 = row["fechaliquidacion5"] != DBNull.Value ? Convert.ToString(row["fechaliquidacion5"]) : string.Empty,
                fechaliquidacion6 = row["fechaliquidacion6"] != DBNull.Value ? Convert.ToString(row["fechaliquidacion6"]) : string.Empty,
                cartaAutorizacion = row["cartaAutorizacion"] != DBNull.Value ? Convert.ToBoolean(row["cartaAutorizacion"]) : false,
                Faltafirmaempleador = row["faltaFirma"] != DBNull.Value ? Convert.ToBoolean(row["faltaFirma"]) : false
            };
        }


        public static void GuardarEntradaAudtoriaReparos(DocumentosFaltantesLM documentosFaltantesLM, string token)
        {
            Parametros prm = new Parametros()
            {
            new Parametro("@CodigoIngresoLM",documentosFaltantesLM.CodigoIngresoLM),
            new Parametro("@Liquidacion1", documentosFaltantesLM.Liquidacion1),
            new Parametro("@Liquidacion2", documentosFaltantesLM.Liquidacion2),
            new Parametro("@Liquidacion3", documentosFaltantesLM.Liquidacion3),
            new Parametro("@Liquidacion4", documentosFaltantesLM.Liquidacion4),
            new Parametro("@Liquidacion5", documentosFaltantesLM.Liquidacion5),
            new Parametro("@Liquidacion6", documentosFaltantesLM.Liquidacion6),
            new Parametro("@CertificadoRenta",documentosFaltantesLM.CertificadoRenta),
            new Parametro("@Otros",documentosFaltantesLM.Otros),
            new Parametro("@Comentarios",documentosFaltantesLM.Comentarios),
            new Parametro("@Acredita90",documentosFaltantesLM.Acredita90),
            new Parametro("@FaltaDocumentacion",1),
            new Parametro("@Token",token),
            new Parametro("@CertificadoAfiliacionAFP",documentosFaltantesLM.CertificadoAfiliacionAFP),
            new Parametro("@CertPagPensiones",documentosFaltantesLM.CertPagPensiones),
            new Parametro("@tipoSeleccion",documentosFaltantesLM.tipoSeleccion),
            new Parametro("@fechaliquidacion1",documentosFaltantesLM.fechaliquidacion1),
            new Parametro("@fechaliquidacion2",documentosFaltantesLM.fechaliquidacion2),
            new Parametro("@fechaliquidacion3",documentosFaltantesLM.fechaliquidacion3),
            new Parametro("@fechaliquidacion4",documentosFaltantesLM.fechaliquidacion4),
            new Parametro("@fechaliquidacion5",documentosFaltantesLM.fechaliquidacion5),
            new Parametro("@fechaliquidacion6",documentosFaltantesLM.fechaliquidacion6),
            new Parametro("@Imagen",documentosFaltantesLM.Imagen),
            new Parametro("@diagnostico",documentosFaltantesLM.diagnostico),
            new Parametro("@sinfirma",documentosFaltantesLM.sinfirma),
            new Parametro("@contrato",documentosFaltantesLM.contrato),
            new Parametro("@cedular_identidad",documentosFaltantesLM.cedular_identidad),
            new Parametro("@seccion_c",documentosFaltantesLM.seccion_c),
            new Parametro("@certificado_nacimiento",documentosFaltantesLM.certificado_nacimiento)

    };

            DBHelper.InstanceCRM.EjecutarProcedimiento("licencias.sp_Lic_DocumentosFaltantes_Guardar_Auditoria_RRLL", prm);
        }



        public static void GuardarEntradaAudtoriaReparosTATA(DocumentosFaltantesLM documentosFaltantesLM, string token)
        {
            Parametros prm = new Parametros()
            {
            new Parametro("@CodigoIngresoLM",documentosFaltantesLM.CodigoIngresoLM),
            new Parametro("@Token",token),
            new Parametro("@tipoSeleccion",documentosFaltantesLM.tipoSeleccion),
            new Parametro("@Imagen",documentosFaltantesLM.Imagen),
            new Parametro("@diagnostico",documentosFaltantesLM.diagnostico),
            new Parametro("@sinfirma",documentosFaltantesLM.sinfirma),
            new Parametro("@contrato",documentosFaltantesLM.contrato),
            new Parametro("@cedular_identidad",documentosFaltantesLM.cedular_identidad),
            new Parametro("@seccion_c",documentosFaltantesLM.seccion_c),
            new Parametro("@certificado_nacimiento",documentosFaltantesLM.certificado_nacimiento),
            new Parametro("@mutual",documentosFaltantesLM.mutual),
            new Parametro("@isapre",documentosFaltantesLM.isapre),
            new Parametro("@cartaAutorizacion",documentosFaltantesLM.cartaAutorizacion),
            new Parametro("@FaltaDocumentacion",documentosFaltantesLM.FaltaDocumentacion),


    };
            try
            {
                DBHelper.InstanceCRM.EjecutarProcedimiento("licencias.sp_Lic_DocumentosFaltantes_Guardar_Reparos_TATA_Nuevo_Flujo", prm);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


        public static void GuardarEntradaAudtoriaReparosCOMPIN(DocumentosFaltantesLM documentosFaltantesLM, string token)
        {
            Parametros prm = new Parametros()
            {
            new Parametro("@CodigoIngresoLM",documentosFaltantesLM.CodigoIngresoLM),
            new Parametro("@Token",token),
            new Parametro("@tipoSeleccion",documentosFaltantesLM.tipoSeleccion),
            new Parametro("@Imagen",documentosFaltantesLM.Imagen),
            new Parametro("@diagnostico",documentosFaltantesLM.diagnostico),
            new Parametro("@sinfirma",documentosFaltantesLM.sinfirma),
            new Parametro("@contrato",documentosFaltantesLM.contrato),
            new Parametro("@cedular_identidad",documentosFaltantesLM.cedular_identidad),
            new Parametro("@seccion_c",documentosFaltantesLM.seccion_c),
            new Parametro("@certificado_nacimiento",documentosFaltantesLM.certificado_nacimiento),
            new Parametro("@mutual",documentosFaltantesLM.mutual),
            new Parametro("@isapre",documentosFaltantesLM.isapre),
            new Parametro("@cartaAutorizacion",documentosFaltantesLM.cartaAutorizacion),
            new Parametro("@FaltaDocumentacion",documentosFaltantesLM.FaltaDocumentacion),
            new Parametro("@mediconiexiste",documentosFaltantesLM.Mediconoexiste),

    };
            try
            {
                DBHelper.InstanceCRM.EjecutarProcedimiento("licencias.sp_Lic_DocumentosFaltantes_Guardar_Reparos_COMPIN_Nuevo_Flujo_v2", prm);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}
