﻿using System;
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
    public static class PensionadosDataAccess
    {
        public static List<Entity.PensionadosEntity> ListaPensionados(string Token, string Nombre, string Comuna, string Prioridad, int EstadoGestion, string rutEjecutivo)
        {
            Parametros param = new Parametros
            {
                new Parametro("@TOKEN",Token),
                new Parametro("@NOMBRE",Nombre),
                new Parametro("@COMUNA",Comuna),
                new Parametro("@PRIORIDAD",Prioridad),
                new Parametro("@RUT_EJECUTIVO",rutEjecutivo),
                new Parametro("@ESTADO_GES",EstadoGestion),
                
            };
            return DBHelper.InstanceCRM.ObtenerColeccion("dbo.spMotor_ListaPensionados", param, ProyePensionado);
        }

        private static Entity.PensionadosEntity ProyePensionado(DataRow row)
        {
            return new Entity.PensionadosEntity
            {
                RUTPEN = row["RUTPEN"] != DBNull.Value ? row["RUTPEN"].ToString() : string.Empty,
                NOMBREPEN = row["NOMBREPEN"] != DBNull.Value ? row["NOMBREPEN"].ToString() : string.Empty,
                FECNAC = row["FECNAC"] != DBNull.Value ? Convert.ToInt32(row["FECNAC"]) : 0,

                CALLE = row["CALLE"] != DBNull.Value ? row["CALLE"].ToString() : string.Empty,
                NUMERO = row["NUMERO"] != DBNull.Value ? Convert.ToInt32(row["NUMERO"]) : 0,
                RESTO_DIRECCION = row["RESTO_DIRECCION"] != DBNull.Value ? row["RESTO_DIRECCION"].ToString() : string.Empty,
                COMUNA = row["COMUNA"] != DBNull.Value ? row["COMUNA"].ToString() : string.Empty,
                CIUDAD = row["CIUDAD"] != DBNull.Value ? row["CIUDAD"].ToString() : string.Empty,
                REGION = row["REGION"] != DBNull.Value ? row["REGION"].ToString() : string.Empty,

                FONOPARTICULAR = row["FONOPARTICULAR"] != DBNull.Value ? Convert.ToInt32(row["FONOPARTICULAR"]) : 0,
                FONOCELULAR = row["FONOCELULAR"] != DBNull.Value ? Convert.ToInt32(row["FONOCELULAR"]) : 0,
                EMAIL = row["EMAIL"] != DBNull.Value ? row["EMAIL"].ToString() : string.Empty,
                PRIORIDAD = row["PRIORIDAD"] != DBNull.Value ? row["PRIORIDAD"].ToString() : string.Empty,
                PREAPROBADO = row["PREAPROBADO"] != DBNull.Value ? Convert.ToInt32(row["PREAPROBADO"]) : 0,
                CODOFICINA = row["CODOFICINA"] != DBNull.Value ? row["CODOFICINA"].ToString() : string.Empty,
                RUTEJECUTIVO = row["RUTEJECUTIVO"] != DBNull.Value ? row["RUTEJECUTIVO"].ToString() : string.Empty,
                PERCAMPAÑA = row["PERCAMPAÑA"] != DBNull.Value ? row["PERCAMPAÑA"].ToString() : string.Empty,
                id_Asign = row["id_Asign"] != DBNull.Value ? Convert.ToInt32(row["id_Asign"]) : 0,
                ESTADO_GESTION = row["ESTADO_GESTION"] != DBNull.Value ? Convert.ToInt32(row["ESTADO_GESTION"]) : 0,
                NOM_GESTION = row["NOM_GESTION"] != DBNull.Value ? row["NOM_GESTION"].ToString() : string.Empty,

            };
        }

        public static List<Entity.EjecutivoPensionadosEntity> ListaEjecutivoPensionados(string Token)
        {
            Parametros param = new Parametros
            {
                new Parametro("@TOKEN",Token),
            };
            return DBHelper.InstanceCRM.ObtenerColeccion("dbo.spMotor_EjecutivosPensionados", param, EjePensionado);
        }

        private static Entity.EjecutivoPensionadosEntity EjePensionado(DataRow row)
        {
            return new Entity.EjecutivoPensionadosEntity
            {
                Rut = row["Rut"] != DBNull.Value ? row["Rut"].ToString() : string.Empty,
                Nombre = row["Nombre"] != DBNull.Value ? row["Nombre"].ToString() : string.Empty,
                Cod_Sucursal = row["Cod_Sucursal"] != DBNull.Value ? Convert.ToInt32(row["Cod_Sucursal"]) : 0,
            };
        }


        public static int AsignaEjecutivo(AsigPensionadosEntity rdata)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@TOKEN", rdata.Token),
                new Parametro("@RUT_EJECUTIVO",rdata.Rut_Ejecutivo),
                new Parametro("@ID_PENSIONADO",rdata.id_Asign),
            };

            return DBHelper.InstanceCRM.EjecutarProcedimiento("dbo.spMotor_AsignaPensionados", pram);
        }

        public static int ActualizaContactoPensionado(BuscaPensionadosEntity rdata)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@ID_ASIGN", rdata.id_Asign),
                new Parametro("@FONOPARTICULAR",rdata.FonoParticular),
                new Parametro("@FONOCELULAR",rdata.FonoCelular),
                new Parametro("@CALLE", rdata.Direccion),
                new Parametro("@NUMERO",rdata.N_direccion),
                new Parametro("@COMUNA",rdata.Comuna),
                new Parametro("@EMAIL",rdata.Mail),
            };

            return DBHelper.InstanceCRM.EjecutarProcedimiento("dbo.spMotor_Actualiza_Contacto_pensionado", pram);
        }

        public static List<Entity.BuscaPensionadosEntity> obtinePensionados(int id_Asign)
        {
            Parametros param = new Parametros
            {
                new Parametro("@ID_PENSIONADO",id_Asign),
            };
            return DBHelper.InstanceCRM.ObtenerColeccion("dbo.spMotor_buscaPensionados", param, SearchPensionado);
        }

        private static Entity.BuscaPensionadosEntity SearchPensionado(DataRow row)
        {
            return new Entity.BuscaPensionadosEntity
            {
                NombrePensionado = row["NOMBREPEN"] != DBNull.Value ? row["NOMBREPEN"].ToString() : string.Empty,
                FonoParticular = row["FONOPARTICULAR"] != DBNull.Value ? Convert.ToInt32(row["FONOPARTICULAR"]) : 0,
                FonoCelular = row["FONOCELULAR"] != DBNull.Value ? Convert.ToInt32(row["FONOCELULAR"]) : 0,
                Direccion = row["DIRECCION"] != DBNull.Value ? row["DIRECCION"].ToString() : string.Empty,
                Comuna = row["COMUNA"] != DBNull.Value ? row["COMUNA"].ToString() : string.Empty,
                Mail = row["EMAIL"] != DBNull.Value ? row["EMAIL"].ToString() : string.Empty,
                N_direccion = row["NUMERO"] != DBNull.Value ? Convert.ToInt32(row["NUMERO"]) : 0,
            };
        }


        public static List<Entity.PensionadosEntity> ListaComunaPensionados(string Token)
        {
            Parametros param = new Parametros
            {
                new Parametro("@TOKEN",Token),
            };
            return DBHelper.InstanceCRM.ObtenerColeccion("dbo.spMotor_Lista_Comuna_Oficina_Pensionados", param, ComunaOficinaPensionado);
        }

        public static List<Entity.PensionadosEntity> ListaComunaPen()
        {
            return DBHelper.InstanceCRM.ObtenerColeccion("dbo.spMotor_Lista_Comuna_Pensionados", ComunaOficinaPensionado);
        }

        private static Entity.PensionadosEntity ComunaOficinaPensionado(DataRow row)
        {
            return new Entity.PensionadosEntity
            {
                COMUNA = row["COMUNA"] != DBNull.Value ? row["COMUNA"].ToString() : string.Empty,
            };
        }

        public static List<Entity.EstadoGestionPensionadoEntity> ListaEstadoGestPensionado(int Padre)
        {
            Parametros param = new Parametros
            {
                new Parametro("@PADRE", Padre),
            };

            return DBHelper.InstanceCRM.ObtenerColeccion("dbo.spMotor_Estado_Gestion_pensionado", param, EstadoGestPensionado);
        }

        public static List<Entity.EstadoGestionPensionadoEntity> ListaSubEstadoGestPensionado(int Id_ges)
        {
            Parametros param = new Parametros
            {
                new Parametro("@ID_GEST", Id_ges),
            };

            return DBHelper.InstanceCRM.ObtenerColeccion("dbo.spMotor_SubEstado_Gestion_pensionado", param, EstadoGestPensionado);
        }

        public static List<Entity.EstadoGestionPensionadoEntity> ListaEstadoGestConPensionado()
        {

            return DBHelper.InstanceCRM.ObtenerColeccion("dbo.spMotor_Estado_Gestion_Contacto_pensionado", EstadoGestPensionado);
        }

        private static Entity.EstadoGestionPensionadoEntity EstadoGestPensionado(DataRow row)
        {
            return new Entity.EstadoGestionPensionadoEntity
            {
                eges_id = row["eges_id"] != DBNull.Value ? Convert.ToInt32(row["eges_id"]) : 0,
                eges_nombre = row["eges_nombre"] != DBNull.Value ? row["eges_nombre"].ToString() : string.Empty,
                ejes_id_padre = row["ejes_id_padre"] != DBNull.Value ? Convert.ToInt32(row["ejes_id_padre"]) : 0,
                ejes_terminal = row["ejes_terminal"] != DBNull.Value ? row["ejes_terminal"].ToString() : string.Empty,
                ejes_tipo_campagna = row["ejes_tipo_campagna"] != DBNull.Value ? Convert.ToInt32(row["ejes_tipo_campagna"]) : 0,
            };
        }


        public static int GuardaContactoPensionado(WebContactoPensionados entrada)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@con_contacto_uid", entrada.con_contacto_uid),
                new Parametro("@con_contacto",entrada.con_contacto),
                new Parametro("@con_forma_contacto",entrada.con_forma_contacto),
                new Parametro("@con_no_contacto_fono", entrada.con_no_contacto_fono),
                new Parametro("@con_no_contacto_domicilo",entrada.con_no_contacto_domicilo),
                new Parametro("@con_no_observacion_contacto",entrada.con_no_observacion_contacto),
                new Parametro("@con_ejecutivo_rut",entrada.con_ejecutivo_rut),
                new Parametro("@con_oficina",entrada.con_oficina),
                new Parametro("@estado_gestion",entrada.estado_gestion),
            };
            return DBHelper.InstanceCRM.EjecutarProcedimiento("dbo.spMotor_Guarda_Contacto_pensionado", pram);
        }

        public static int GuardaGestionPensionado(GestionPensionados entrada)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@ges_bcam_uid", entrada.ges_bcam_uid),
                new Parametro("@ges_fecha_compromete",entrada.ges_fecha_compromete),
                new Parametro("@ges_estado_gst", entrada.ges_estado_gst),
                new Parametro("@ges_sub_estado_gst", entrada.ges_sub_estado_gst),
                new Parametro("@ges_descripcion_gst",entrada.ges_descripcion_gst),
                new Parametro("@ges_ejecutivo_rut",entrada.ges_ejecutivo_rut),
                new Parametro("@ges_oficina",entrada.ges_oficina),
                new Parametro("@estado_gestion",entrada.estado_gestion),
                
            };
            return DBHelper.InstanceCRM.EjecutarProcedimiento("dbo.spMotor_Guarda_Gestion_pensionado", pram);
        }

        public static List<Entity.WebHistorialGesPensionados> ListaHistGestPensionado(int ges_bcam_uid)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@ID_PENSIONADO", ges_bcam_uid),
     
            };
            return DBHelper.InstanceCRM.ObtenerColeccion("dbo.spMotor_Lista_historial_Gestion_pensionado", pram, EstadoHistPensionado);
        }

        private static Entity.WebHistorialGesPensionados EstadoHistPensionado(DataRow row)
        {
            return new Entity.WebHistorialGesPensionados
            {
                ges_bcam_uid = row["ges_bcam_uid"] != DBNull.Value ? Convert.ToInt32(row["ges_bcam_uid"]) : 0,
                ges_fecha_accion = row["ges_fecha_accion"] != DBNull.Value ? Convert.ToDateTime(row["ges_fecha_accion"]) : new DateTime(1900, 1, 1),
                ges_fecha_compromete = row["ges_fecha_compromete"] != DBNull.Value ? Convert.ToDateTime(row["ges_fecha_compromete"]) : new DateTime(1900, 1, 1),
                ges_descripcion_gst = row["ges_descripcion_gst"] != DBNull.Value ? row["ges_descripcion_gst"].ToString() : string.Empty,
                estado = row["estado"] != DBNull.Value ? row["estado"].ToString() : string.Empty,
                subEstado = row["subEstado"] != DBNull.Value ? row["subEstado"].ToString() : string.Empty,
                Ejecutivo = row["Ejecutivo"] != DBNull.Value ? row["Ejecutivo"].ToString() : string.Empty,
            };
        }

        public static Entity.WebUltimaGesPensionados ObtieneUtimaGetionContacto(int Id, int Cod_oficina)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@ID", Id),
                new Parametro("@COD_OFICINA", Cod_oficina),

            };
            return DBHelper.InstanceCRM.ObtenerEntidad("dbo.spMotor_Lista_ultima_Gestion_Contato", pram, ultimaGestionContacto);
        }

        private static Entity.WebUltimaGesPensionados ultimaGestionContacto(DataRow row)
        {
            return new Entity.WebUltimaGesPensionados
            {
                ges_estado_gst = row["ges_estado_gst"] != DBNull.Value ? Convert.ToInt32(row["ges_estado_gst"]) : 0,
                ges_sub_estado_gst = row["ges_sub_estado_gst"] != DBNull.Value ? Convert.ToInt32(row["ges_sub_estado_gst"]) : 0,
                eges_nombre = row["eges_nombre"] != DBNull.Value ? row["eges_nombre"].ToString() : string.Empty,
                ges_fecha_compromete = row["ges_fecha_compromete"] != DBNull.Value ? Convert.ToDateTime(row["ges_fecha_compromete"]) : new DateTime(1900, 1, 1),
                ges_descripcion_gst = row["ges_descripcion_gst"] != DBNull.Value ? row["ges_descripcion_gst"].ToString() : string.Empty,
                ges_fecha_accion = row["ges_fecha_accion"] != DBNull.Value ? Convert.ToDateTime(row["ges_fecha_accion"]) : new DateTime(1900, 1, 1),

            };
        }


        public static Entity.UltimoContactoPensionados ObtieneUtimaContactoPen(int Id, int Cod_oficina)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@ID", Id),
                new Parametro("@COD_OFICINA", Cod_oficina),

            };
            return DBHelper.InstanceCRM.ObtenerEntidad("dbo.spMotor_Lista_ultima_Contato", pram, ultimaContactoPensionado);
        }

        private static Entity.UltimoContactoPensionados ultimaContactoPensionado(DataRow row)
        {
            return new Entity.UltimoContactoPensionados
            {
                con_contacto = row["con_contacto"] != DBNull.Value ? row["con_contacto"].ToString() : string.Empty,
                con_forma_contacto = row["con_forma_contacto"] != DBNull.Value ? Convert.ToInt32(row["con_forma_contacto"]) : 0,
                con_no_contacto_fono = row["con_no_contacto_fono"] != DBNull.Value ? Convert.ToInt32(row["con_no_contacto_fono"]) : 0,
                con_no_contacto_domicilo = row["con_no_contacto_domicilo"] != DBNull.Value ? Convert.ToInt32(row["con_no_contacto_domicilo"]) : 0,
                con_no_observacion_contacto = row["con_no_observacion_contacto"] != DBNull.Value ? row["con_no_observacion_contacto"].ToString() : string.Empty,
                nomContatoSi = row["nomContatoSi"] != DBNull.Value ? row["nomContatoSi"].ToString() : string.Empty,
                nomConFono = row["nomConFono"] != DBNull.Value ? row["nomConFono"].ToString() : string.Empty,
                nomConDom = row["nomConDom"] != DBNull.Value ? row["nomConDom"].ToString() : string.Empty,
            };
        }


        public static List<Entity.EstadoGestionPensionadoEntity> ListaEstadoGest()
        {

            return DBHelper.InstanceCRM.ObtenerColeccion("dbo.spMotor_Lista_Estado_Gestion", EstadoGest);
        }

        private static Entity.EstadoGestionPensionadoEntity EstadoGest(DataRow row)
        {
            return new Entity.EstadoGestionPensionadoEntity
            {
                eges_id = row["eges_id"] != DBNull.Value ? Convert.ToInt32(row["eges_id"]) : 0,
                eges_nombre = row["eges_nombre"] != DBNull.Value ? row["eges_nombre"].ToString() : string.Empty,
                ejes_id_padre = row["ejes_id_padre"] != DBNull.Value ? Convert.ToInt32(row["ejes_id_padre"]) : 0,
                ejes_terminal = row["ejes_terminal"] != DBNull.Value ? row["ejes_terminal"].ToString() : string.Empty,
                ejes_tipo_campagna = row["ejes_tipo_campagna"] != DBNull.Value ? Convert.ToInt32(row["ejes_tipo_campagna"]) : 0,
            };
        }



    }
}
