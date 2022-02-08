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
                //new Parametro("@SUB_ESTADO_GES",EstadoSubGestion),
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

                FONOPARTICULAR = row["FONOPARTICULAR"] != DBNull.Value ? row["FONOPARTICULAR"].ToString() : string.Empty,
                FONOCELULAR = row["FONOCELULAR"] != DBNull.Value ? row["FONOCELULAR"].ToString() : string.Empty,
                EMAIL = row["EMAIL"] != DBNull.Value ? row["EMAIL"].ToString() : string.Empty,
                PRIORIDAD = row["PRIORIDAD"] != DBNull.Value ? row["PRIORIDAD"].ToString() : string.Empty,
                PREAPROBADO = row["PREAPROBADO"] != DBNull.Value ? Convert.ToInt32(row["PREAPROBADO"]) : 0,
                CODOFICINA = row["CODOFICINA"] != DBNull.Value ? row["CODOFICINA"].ToString() : string.Empty,
                RUTEJECUTIVO = row["RUTEJECUTIVO"] != DBNull.Value ? row["RUTEJECUTIVO"].ToString() : string.Empty,
                PERCAMPAÑA = row["PERCAMPAÑA"] != DBNull.Value ? row["PERCAMPAÑA"].ToString() : string.Empty,
                id_Asign = row["id_Asign"] != DBNull.Value ? Convert.ToInt32(row["id_Asign"]) : 0,
                ESTADO_GESTION = row["ESTADO_GESTION"] != DBNull.Value ? Convert.ToInt32(row["ESTADO_GESTION"]) : 0,
                NOM_GESTION = row["NOM_GESTION"] != DBNull.Value ? row["NOM_GESTION"].ToString() : string.Empty,
                codigo = row["codigo"] != DBNull.Value ? row["codigo"].ToString() : string.Empty,

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
                FonoParticular = row["FONOPARTICULAR"] != DBNull.Value ? row["FONOPARTICULAR"].ToString() : string.Empty,
                FonoCelular = row["FONOCELULAR"] != DBNull.Value ? row["FONOCELULAR"].ToString() : string.Empty,
                Direccion = row["DIRECCION"] != DBNull.Value ? row["DIRECCION"].ToString() : string.Empty,
                Comuna = row["COMUNA"] != DBNull.Value ? row["COMUNA"].ToString() : string.Empty,
                Mail = row["EMAIL"] != DBNull.Value ? row["EMAIL"].ToString() : string.Empty,
                N_direccion = row["NUMERO"] != DBNull.Value ? Convert.ToInt32(row["NUMERO"]) : 0,
                codigo = row["codigo"] != DBNull.Value ? row["codigo"].ToString() : string.Empty,
                id_Asign = row["id_Asign"] != DBNull.Value ? Convert.ToInt32(row["id_Asign"]) : 0,
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
            return DBHelper.InstanceCRM.ObtenerEscalar<int>("dbo.spMotor_Guarda_Gestion_pensionado", pram);
        }


        public static int GuardaGestionTagPensionado(TagGestionPensionados entrada)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@gesTag_id", entrada.gesTag_id),
                new Parametro("@gesTag_gestion",entrada.gesTag_gestion),


            };
            return DBHelper.InstanceCRM.EjecutarProcedimiento("dbo.spMotor_Guarda_GestionTag_pensionado", pram);
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


        public static List<Entity.TagDto> ObtieneTagsGetionContacto(int IdGestion)
        {
            Parametro param = new Parametro("@ID_GESTION", IdGestion);

            return DBHelper.InstanceCRM.ObtenerColeccion("dbo.spMotor_Lista_Tags_Gestion_Contato", param, constructorTags);
        }

        public static Entity.WebUltimaGesPensionados ultimaGestionContacto(DataRow row)
        {
            return new Entity.WebUltimaGesPensionados
            {
                ges_estado_gst = row["ges_estado_gst"] != DBNull.Value ? Convert.ToInt32(row["ges_estado_gst"]) : 0,
                ges_sub_estado_gst = row["ges_sub_estado_gst"] != DBNull.Value ? Convert.ToInt32(row["ges_sub_estado_gst"]) : 0,
                eges_nombre = row["eges_nombre"] != DBNull.Value ? row["eges_nombre"].ToString() : string.Empty,
                ges_fecha_compromete = row["ges_fecha_compromete"] != DBNull.Value ? Convert.ToDateTime(row["ges_fecha_compromete"]) : new DateTime(1900, 1, 1),
                ges_descripcion_gst = row["ges_descripcion_gst"] != DBNull.Value ? row["ges_descripcion_gst"].ToString() : string.Empty,
                ges_fecha_accion = row["ges_fecha_accion"] != DBNull.Value ? Convert.ToDateTime(row["ges_fecha_accion"]) : new DateTime(1900, 1, 1),
                ges_id = row["ges_id"] != DBNull.Value ? Convert.ToInt32(row["ges_id"]) : 0,
                tags = ObtieneTagsGetionContacto(Convert.ToInt32(row["ges_id"]))

            };
        }

        public static Entity.TagDto constructorTags(DataRow row)
        {
            return new Entity.TagDto
            {
                id = row["gesTagId"] != DBNull.Value ? Convert.ToInt32(row["gesTagId"]) : 0,
                nombre = row["gesTagNombre"] != DBNull.Value ? row["gesTagNombre"].ToString() : string.Empty,
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

        public static List<Entity.EstadoGestionPensionadoEntity> ListaSubEstadoGest(int padre)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@PADRE", padre),
            };
            return DBHelper.InstanceCRM.ObtenerColeccion("dbo.spMotor_Lista_Sub_Estado_Gestion", pram, EstadoGest);
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

        // PROSPECTOS PENSIONADOS

        public static int GuardaProspectoPensionado(ProspectosPensionados entrada)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@Rut_Pensionado", entrada.Rut_Pensionado),
                new Parametro("@Nombre",entrada.Nombre),
                new Parametro("@Edad", entrada.Edad),
                new Parametro("@Caja_Origen", entrada.Caja_Origen),
                new Parametro("@Renta_Aproximada", entrada.Renta_Aproximada),
                new Parametro("@Celular",entrada.Celular),
                new Parametro("@Fono_Fijo",entrada.Fono_Fijo),
                new Parametro("@Email",entrada.Email),
                new Parametro("@Direccion_Calle",entrada.Direccion_Calle),
                new Parametro("@Direccion_Numero", entrada.Direccion_Numero),
                new Parametro("@Direccion_Dpto",entrada.Direccion_Dpto),
                new Parametro("@Comuna",entrada.Comuna),
                new Parametro("@Rut_Ejecutivo",entrada.Rut_Ejecutivo),
                new Parametro("@Cod_Sucursal",entrada.Cod_Sucursal),

            };
            return DBHelper.InstanceCRM.EjecutarProcedimiento("dbo.spMotor_Guarda_pensionado_Prospectos", pram);
        }


        public static List<Entity.ProspectosPensionados> ListaProspecPensionados(int Cod_oficina)
        {
            Parametros param = new Parametros
            {
                new Parametro("@COD_SUCURSAL",Cod_oficina),
            };
            return DBHelper.InstanceCRM.ObtenerColeccion("dbo.spMotor_Lista_Pensionados_Prospectos", param, ListProspecPensionado);
        }

        private static Entity.ProspectosPensionados ListProspecPensionado(DataRow row)
        {
            return new Entity.ProspectosPensionados
            {
                Rut_Pensionado = row["Rut_Pensionado"] != DBNull.Value ? row["Rut_Pensionado"].ToString() : string.Empty,
                Nombre = row["Nombre"] != DBNull.Value ? row["Nombre"].ToString() : string.Empty,
                Edad = row["Edad"] != DBNull.Value ? Convert.ToInt32(row["Edad"]) : 0,
                Caja_Origen = row["Caja_Origen"] != DBNull.Value ? row["Caja_Origen"].ToString() : string.Empty,
                Renta_Aproximada = row["Renta_Aproximada"] != DBNull.Value ? Convert.ToInt32(row["Renta_Aproximada"]) : 0,
                Celular = row["Celular"] != DBNull.Value ? row["Celular"].ToString() : string.Empty,
                Fono_Fijo = row["Fono_Fijo"] != DBNull.Value ? row["Fono_Fijo"].ToString() : string.Empty,
                Email = row["Email"] != DBNull.Value ? row["Email"].ToString() : string.Empty,
                Direccion_Calle = row["Direccion_Calle"] != DBNull.Value ? row["Direccion_Calle"].ToString() : string.Empty,
                Direccion_Numero = row["Direccion_Numero"] != DBNull.Value ? Convert.ToInt32(row["Direccion_Numero"]) : 0,
                Direccion_Dpto = row["Direccion_Dpto"] != DBNull.Value ? row["Direccion_Dpto"].ToString() : string.Empty,
                Comuna = row["Comuna"] != DBNull.Value ? row["Comuna"].ToString() : string.Empty,
                Rut_Ejecutivo = row["Rut_Ejecutivo"] != DBNull.Value ? row["Rut_Ejecutivo"].ToString() : string.Empty,
                Cod_Sucursal = row["Cod_Sucursal"] != DBNull.Value ? Convert.ToInt32(row["Cod_Sucursal"]) : 0,
                Nombre_ejecutivo = row["Nombre_ejecutivo"] != DBNull.Value ? row["Nombre_ejecutivo"].ToString() : string.Empty,
            };
        }

        public static List<Entity.EstadoNOGestionPensionadoEntity> ListaSubEstadoNoGestPensionado(int egesNO_id)
        {
            Parametros param = new Parametros
            {
                new Parametro("@ID_NO_GEST", egesNO_id),
            };

            return DBHelper.InstanceCRM.ObtenerColeccion("dbo.spMotor_SubEstado_No_Gestion_pensionado", param, EstadoNoGestPensionado);
        }

        private static Entity.EstadoNOGestionPensionadoEntity EstadoNoGestPensionado(DataRow row)
        {
            return new Entity.EstadoNOGestionPensionadoEntity
            {
                egesNo_id = row["egesNo_id"] != DBNull.Value ? Convert.ToInt32(row["egesNo_id"]) : 0,
                egesNo_nombre = row["egesNo_nombre"] != DBNull.Value ? row["egesNo_nombre"].ToString() : string.Empty,
                ejesNo_id_padre = row["ejesNo_id_padre"] != DBNull.Value ? Convert.ToInt32(row["ejesNo_id_padre"]) : 0,
            };
        }

        public static List<EstadoGestionPensionadoEntity> ListaPensionadosEstadosGestionNull()
        {
            Parametros parametros = new Parametros()
            {
            };
            return DBHelper.InstanceNegocio.ObtenerColeccion("pensionados.Listar_Estado_Gestion_null", parametros, PensionadosEstadosGestion);
        }

        #region estadogestionid
        //public static List<EstadoGestionPensionadoEntity> ListaPensionadosEstadosGestion(int id)
        //{
        //    Parametros parametros = new Parametros()
        //    {
        //        new Parametro("@id",id),
        //    };
        //    return DBHelper.InstanceNegocio.ObtenerColeccion("pensionados.Listar_Estado_Gestion", parametros, PensionadosEstadosGestion);
        //}
        #endregion


        public static List<EstadoGestionPensionadoEntity> ListaPensionadosSubEstadosGestion(int padre)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@Padre",padre),
            };
            return DBHelper.InstanceNegocio.ObtenerColeccion("pensionados.Listar_Sub_Estado_Gestion", parametros, PensionadosEstadosGestion);
        }

        private static Entity.EstadoGestionPensionadoEntity PensionadosEstadosGestion(DataRow row)
        {
            return new Entity.EstadoGestionPensionadoEntity
            {
                eges_id = row["id"] != DBNull.Value ? Convert.ToInt32(row["id"]) : 0,
                eges_nombre = row["nombre"] != DBNull.Value ? row["nombre"].ToString() : string.Empty,
            };
        }



        #region Prioridad

        //public static List<PensionadosUnoPorcientoPrioridadEntity> ListaPensionadosPrioridad(int idprioridad)
        //{
        //    Parametros parametros = new Parametros()
        //    {
        //        new Parametro("@Idprioridad",idprioridad),
        //    };
        //    return DBHelper.InstanceNegocio.ObtenerColeccion("pensionados.Listar_Prioridad", parametros, PensionadosPrioridad);
        //}

        //private static Entity.PensionadosUnoPorcientoPrioridadEntity PensionadosPrioridad(DataRow row)
        //{
        //    return new Entity.PensionadosUnoPorcientoPrioridadEntity
        //    {
        //        Id = row["id"] != DBNull.Value ? Convert.ToInt32(row["id"]) : 0,
        //        Glosa = row["glosa"] != DBNull.Value ? row["glosa"].ToString() : string.Empty,
        //        Color = row["color"] != DBNull.Value ? row["color"].ToString() : string.Empty,
        //    };
        //}

        #endregion

        #region comunas
        //public static List<PensionadosUnoPorcientoComunasEntity> ListaPensionadosComunas(int idcomuna)
        //{
        //    Parametros parametros = new Parametros()
        //    {
        //        new Parametro("@Idcomuna",idcomuna),
        //    };
        //    return DBHelper.InstanceNegocio.ObtenerColeccion("pensionados.Listar_Comunas", parametros, PensionadosComunas);
        //}

        //private static Entity.PensionadosUnoPorcientoComunasEntity PensionadosComunas(DataRow row)
        //{
        //    return new Entity.PensionadosUnoPorcientoComunasEntity
        //    {
        //        Id = row["id"] != DBNull.Value ? Convert.ToInt32(row["id"]) : 0,
        //        Comuna = row["comuna"] != DBNull.Value ? row["comuna"].ToString() : string.Empty,
        //    };
        //}
        #endregion


        public static List<PensionadosUnoPorcientoEntity> ListaPensionadosUnoPorciento(string rut, string epp, int estado_id,string rutEjecutivo)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@RutAfiliado",rut),
                new Parametro("@Epp",epp),
                new Parametro("@Estado_id",estado_id),
                new Parametro("@rutEjecutivo",rutEjecutivo),
            };
            return DBHelper.InstanceNegocio.ObtenerColeccion("pensionados.Listar_Lead_Uno_Porciento_byRut", parametros, UnoPorciento);
        }

        #region listarpensionadoid
        //public static List<PensionadosUnoPorcientoEntity> ListaPensionadosUnoPorcientoId(int id)
        //{
        //    Parametros parametros = new Parametros()
        //    {
        //        new Parametro("@id",id),
        //    };
        //    return DBHelper.InstanceNegocio.ObtenerColeccion("pensionados.Obtener_Lead", parametros, UnoPorciento);
        //}
        #endregion

        private static Entity.PensionadosUnoPorcientoEntity UnoPorciento(DataRow row)
        {
            return new Entity.PensionadosUnoPorcientoEntity
            {
                Id = row["id"] != DBNull.Value ? Convert.ToInt32(row["id"]) : 0,
                Rut_Afiliado = row["rut"] != DBNull.Value ? row["rut"].ToString() : string.Empty,
                Nombre_Afiliado = row["nombre"] != DBNull.Value ? row["nombre"].ToString() : string.Empty,
                Epp_id = row["epp_id"] != DBNull.Value ? Convert.ToInt32(row["epp_id"]) : 0,
                Epp_text = row["epp_text"] != DBNull.Value ? row["epp_text"].ToString() : string.Empty,
                Fecha_Ultima_Pension = row["fechaultimapension"] != DBNull.Value ? Convert.ToDateTime(row["fechaultimapension"]) : new DateTime(1900, 1, 1),
                Beneficio_id = row["beneficio_id"] != DBNull.Value ? Convert.ToInt32(row["beneficio_id"]) : 0,
                beneficio_text = row["beneficio_text"] != DBNull.Value ? row["beneficio_text"].ToString() : string.Empty,
                Fecha_Ultimo_Beneficio = row["fechaultimobeneficio"] != DBNull.Value ? Convert.ToDateTime(row["fechaultimobeneficio"]) : new DateTime(1900, 1, 1),
                Oficina = row["oficina_id"] != DBNull.Value ? Convert.ToInt32(row["oficina_id"]) : 0,
                Rut_Ejecutivo = row["ejec_asignado"] != DBNull.Value ? row["ejec_asignado"].ToString() : string.Empty,
                Periodo = row["periodo"] != DBNull.Value ? Convert.ToInt32(row["periodo"]) : 0,
                Estado = row["estado"] != DBNull.Value ? row["estado"].ToString() : string.Empty,

            };
        }

        #region actualizalead
        //public static int ActualizaContactoPensionadoUnoPorciento(PensionadosUnoPorcientoLeadEntity rdata)
        //{
        //    Parametros pram = new Parametros
        //    {
        //        new Parametro("@ID_ASIGN", rdata.id_Asign),
        //        new Parametro("@EPPACTUAL",rdata.eppactual),
        //        new Parametro("@FECHAPENSION", Convert.ToDateTime( rdata.fechapension)),
        //        new Parametro("@BENEFICIO", rdata.beneficio),
        //        new Parametro("@FECHABENEFICIO",Convert.ToDateTime( rdata.fechabeneficio)),
        //    };

        //    return DBHelper.InstanceNegocio.EjecutarProcedimiento("pensionados.Actualiza_Contacto_pensionado_Uno_Porciento", pram);
        //}
        #endregion

        #region guardacontacto
        //public static int GuardaContactoPensionadoUnoPorciento(WebContactoPensionados rdata)
        //{
        //    Parametros pram = new Parametros
        //    {
        //        new Parametro("@con_contacto_uid", rdata.con_contacto_uid),
        //        new Parametro("@con_contacto", rdata.con_contacto),
        //        new Parametro("@con_forma_contacto", rdata.con_forma_contacto),
        //        new Parametro("@con_no_contacto_fono", rdata.con_no_contacto_fono),
        //        new Parametro("@con_fecha_cita_contacto", rdata.con_fecha_cita_contacto),
        //        new Parametro("@con_no_contacto_domicilo", rdata.con_no_contacto_domicilo),
        //        new Parametro("@con_no_observacion_contacto", rdata.con_no_observacion_contacto),
        //        new Parametro("@con_ejecutivo_rut", rdata.con_ejecutivo_rut),
        //        new Parametro("@con_oficina", rdata.con_oficina),
        //        new Parametro("@estado_gestion", rdata.estado_gestion),
        //        new Parametro("@rut_pensionado", rdata.rut_pensionado),
        //    };
        //    return DBHelper.InstanceNegocio.EjecutarProcedimiento("pensionados.Guardar_Contacto_Pensionado", pram);
        //}
        #endregion




        public static List<PensionadosUnoPorcientoEppEntity> ListarEpp(int idepp)
        {
            Parametros parametros = new Parametros()
            {
                 new Parametro("@Idepp",idepp),
            };
            return DBHelper.InstanceNegocio.ObtenerColeccion("pensionados.Listar_epp", parametros, ListaEpp);
        }

        private static Entity.PensionadosUnoPorcientoEppEntity ListaEpp(DataRow row)
        {
            return new Entity.PensionadosUnoPorcientoEppEntity
            {
                Id = row["id"] != DBNull.Value ? Convert.ToInt32(row["id"]) : 0,
                RazonSocial = row["razonsocial"] != DBNull.Value ? row["razonsocial"].ToString() : string.Empty,
            };
        }

        public static List<PensionadosUnoPorcientoBeneficiosEntity> Listar_Beneficios(int idbeneficio)
        {
            Parametros parametros = new Parametros()
            {
                 new Parametro("@Idbeneficio",idbeneficio),
            };
            return DBHelper.InstanceNegocio.ObtenerColeccion("pensionados.Listar_Beneficios", parametros, ListaBeneficio);
        }

        private static Entity.PensionadosUnoPorcientoBeneficiosEntity ListaBeneficio(DataRow row)
        {
            return new Entity.PensionadosUnoPorcientoBeneficiosEntity
            {
                Id = row["id"] != DBNull.Value ? Convert.ToInt32(row["id"]) : 0,
                Nombre = row["nombre"] != DBNull.Value ? row["nombre"].ToString() : string.Empty,
            };
        }

        #region estadogestioncontacto
        //public static List<UltimoContactoPensionados> ListaEstadoGestionContacto(int id, int oficina)
        //{
        //    Parametros parametros = new Parametros()
        //    {
        //        new Parametro("@Id",id),
        //        new Parametro("@Oficina",oficina),
        //    };
        //    return DBHelper.InstanceNegocio.ObtenerColeccion("pensionados.Lista_Estado_Gestion_Contacto", parametros, Gestioncontacto);
        //}

        //private static Entity.UltimoContactoPensionados Gestioncontacto(DataRow row)
        //{
        //    return new Entity.UltimoContactoPensionados
        //    {
        //        con_contacto = row["con_contacto"] != DBNull.Value ? row["con_contacto"].ToString() : string.Empty,
        //        con_forma_contacto = row["con_forma_contacto"] != DBNull.Value ? Convert.ToInt32(row["con_forma_contacto"]) : 0,
        //        con_no_contacto_fono = row["con_no_contacto_fono"] != DBNull.Value ? Convert.ToInt32(row["con_no_contacto_fono"]) : 0,
        //        con_no_contacto_domicilo = row["con_no_contacto_domicilo"] != DBNull.Value ? Convert.ToInt32(row["con_no_contacto_domicilo"]) : 0,
        //        con_no_observacion_contacto = row["con_no_observacion_contacto"] != DBNull.Value ? row["con_no_observacion_contacto"].ToString() : string.Empty,
        //        nomContatoSi = row["nomContatoSi"] != DBNull.Value ? row["nomContatoSi"].ToString() : string.Empty,
        //        nomConFono = row["nomConFono"] != DBNull.Value ? row["nomConFono"].ToString() : string.Empty,
        //        nomConDom = row["nomConDom"] != DBNull.Value ? row["nomConDom"].ToString() : string.Empty,
        //    };
        //}
        #endregion


        public static List<WebPensionadosUnoPorcientoGestionEntity> ListaHistorialGestionPensionados(string rut, int periodo)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@rut",rut),
                new Parametro("@periodo",periodo),
            };
            return DBHelper.InstanceNegocio.ObtenerColeccion("pensionados.Lista_Historial_Pensionado", parametros, Gestionhistorial);
        }

        private static Entity.WebPensionadosUnoPorcientoGestionEntity Gestionhistorial(DataRow row)
        {
            return new Entity.WebPensionadosUnoPorcientoGestionEntity
            {
                NombreEjecutivo = row["NombreEjecutivo"] != DBNull.Value ? row["NombreEjecutivo"].ToString() : string.Empty,
                FechaGestion = row["FechaGestion"] != DBNull.Value ? Convert.ToDateTime(row["FechaGestion"]) : new DateTime(1900, 1, 1),
                Estado = row["Estado"] != DBNull.Value ? row["Estado"].ToString() : string.Empty,
                SubEstado = row["SubEstado"] != DBNull.Value ? row["SubEstado"].ToString() : string.Empty,
                Epp = row["Epp"] != DBNull.Value ? row["Epp"].ToString() : string.Empty,

            };
        }
        #region estadocontacto
        //public static List<Entity.EstadoGestionPensionadoEntity> ListaEstadoContactoPensionado()
        //{

        //    return DBHelper.InstanceNegocio.ObtenerColeccion("pensionados.Listar_Estado_Contacto_Pensionado", EstadoGestPensionado);
        //}
        #endregion


        public static int GuardarGestionPensionadoUnoPorciento(PensionadosUnoPorcientoGestionEntity entrada)
        {
            Parametros pram = new Parametros
            {
                new Parametro("@Id_lead", entrada.Id_lead),
                new Parametro("@Epp_id",entrada.Epp_id),
                new Parametro("@Epp_Otro",entrada.Epp_Otro),
                new Parametro("@Estado_id", entrada.Estado_id),
                new Parametro("@SubEstado_id", entrada.SubEstado_id),
                new Parametro("@Periodo",entrada.Periodo),
                new Parametro("@EjecutivoRut",entrada.EjecutivoRut),
                new Parametro("@Observacion",entrada.Observacion),
            };
            return DBHelper.InstanceNegocio.EjecutarProcedimiento("pensionados.Guardar_Gestion_Pensionado", pram);
        }

        public static LeadPensionados Busca_Prospecto(string rut, int periodo)
        {
            Parametros parametros = new Parametros()
            {
                new Parametro("@rut",rut),
                new Parametro("@periodo",periodo),
            };
            return DBHelper.InstanceNegocio.ObtenerEntidad("pensionados.Busca_Prospectos", parametros, gestionprospecto);

        }
        private static Entity.LeadPensionados gestionprospecto(DataRow row)
        {
            return new Entity.LeadPensionados
            {
                id = row["id"] != DBNull.Value ? Convert.ToInt32(row["id"]) : 0,
                rut = row["rut"] != DBNull.Value ? row["rut"].ToString() : string.Empty,
                prioridad = row["prioridad"] != DBNull.Value ? Convert.ToInt32(row["prioridad"]) : 0,
            };
        }
        
    }
}
