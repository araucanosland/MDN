using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using CRM.Business.Entity;
using CRM.Business.Entity.Clases;
using CRM.Business.Entity.Contracts;
using CRM.Business.Data;
using CRM.ActionFilters;
using CRM.Filters;

namespace CRM.Controllers
{
    [RoutePrefix("api/Informes")]
    public class InformesController : ApiController
    {
        [AuthorizationRequired]
        [HttpGet]
        [Route("Lista-Traking")]
        public IEnumerable<TrackingEntity> ObtenerTrackingInforme(int Periodo)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return InformesDataAccess.ListarTrackingBySucursal(token, Periodo);
        }
        //perfil zonal tracking
        [AuthorizationRequired]
        [HttpGet]
        [Route("traking-perfil-zonal")]
        public IEnumerable<TrackingEntity> ObtTrackPerfZonal(int CodOficina, int Periodo)
        {
            return InformesDataAccess.ListarTrackingBySucursalPerfZonal(CodOficina, Periodo);
        }
        //end perfil zonal tracking
        [AuthorizationRequired]
        [HttpGet]
        [Route("Lista-Traking-Normalizacion")]
        public IEnumerable<TrackingEntity> ObtenerTrackingNormalizacionInforme(int Periodo,string CargoAT,string OficinaAT)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return InformesDataAccess.ListarTrackingNormalizacionBySucursal(token, Periodo, CargoAT, OficinaAT);
        }
        [AuthorizationRequired]
        [HttpGet]
        [Route("Lista-Traking-Normalizacion-perfzonal")]
        public IEnumerable<TrackingEntity> ObtenerTrackNormPerfZonal(int CodOficina, int Periodo)
        {
            return InformesDataAccess.ListarTrackNormBySucursalPerfZonal(CodOficina, Periodo);
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-trackNorm-perf-zonal")]
        public TrackingWidgetsSucursal ObtTrackNormalizacionPerfZonal(int CodOficina, int Periodo)
        {
            return InformesDataAccess.ListTrackNormPerfZonal(CodOficina, Periodo);
        }
        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-traking-detalle")]
        public List<TrackingDetalleEjecutivo> ObtenerDetalle(int RutEjecutivo, int Periodo)
        {
            return InformesDataAccess.Obtener(RutEjecutivo, Periodo);
        }
        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-traking-detalle-normalizacion")]
        public List<TrackingDetalleEjecutivoNormalizacion> ObtenerDetalleNormalizacion(int RutEjecutivo, int Periodo)
        {
            return InformesDataAccess.ObtenerEjecutivoNormalizacion(RutEjecutivo, Periodo);
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-traking-total")]
        public TrackingWidgetsSucursal ObtenerTrackingInformeTotal(int Periodo)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return InformesDataAccess.ListarTotales(token, Periodo);
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-traking-total-perfil-zonal")]
        public TrackingWidgetsSucursal ObtTrackPerfilZonal(int CodOficina, int Periodo)
        {

            return InformesDataAccess.ListarTotalesPerfZonal(CodOficina, Periodo);
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-traking-total-normalizacion")]
        public TrackingWidgetsSucursal ObtenerTrackingInformeTotalNormalizacion(int Periodo)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return InformesDataAccess.ListarTotalesNormalizacion(token, Periodo);
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-traking-totalEjecutivo")]
        public TrackingWidgetsEjecutivo ObtenerTrackingInformeTotalEjecutivo(int RutEjecutivo, int Periodo)
        {
            return InformesDataAccess.ListarTotalesEjecutivoWid(RutEjecutivo, Periodo);
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-traking-totalEjecutivo2")]
        public TrackingWidgetsEjecutivo ObtenerTrackingInformeTotalEjecutivo2(int Periodo)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return InformesDataAccess.ListarTotalesEjecutivoWid(token, Periodo);
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-traking-total-pais")]
        public TrackingWidgetsPais ObtenerWidPais(int Periodo)
        {
            return InformesDataAccess.ListarTotalesPais(Periodo);
        }
        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-traking-total-pais-normalizacion")]
        public TrackingWidgetsPaisNormalizacion ObtenerWidPaisNormalizacion(int Periodo)
        {
            return InformesDataAccess.ListarTotalesPaisNormalizacion(Periodo);
        }




        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-traking-total-zonal")]
        public IEnumerable<TrackingWidgetsZonal> ObtenerWidZonal(int Periodo)
        {
            return InformesDataAccess.ListarTotalesZonal(Periodo);
        }
        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-traking-total-zonal-normalizacion")]
        public IEnumerable<TrackingWidgetsZonalNormalizacion> ObtenerWidZonalNormalizacion(int Periodo)
        {
            return InformesDataAccess.ListarTotalesZonalNormalizaicon(Periodo);
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-traking-sucursal-zonal")]
        public IEnumerable<TrackingSucursalZonal> ListarSucursalZonal(int Periodo, int CodZona)
        {
            return InformesDataAccess.ListarSucursalZonal(Periodo, CodZona);
        }
        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-traking-sucursal-zonal-normalizacion")]
        public IEnumerable<TrackingSucursalZonalNormalizacion> ListarSucursalZonalNormalizacion(int Periodo, int CodZona)
        {
            return InformesDataAccess.ListarSucursalZonalNormalizacion(Periodo, CodZona);
        }
        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-traking-total-zona")]
        public TrackingSucursalZonal ObtenerWidZona(int Periodo, int Zona)
        {
            return InformesDataAccess.ListarTotalesZona(Periodo, Zona);
        }
        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-traking-total-zona-normalizacion")]
        public TrackingSucursalZonalNormalizacion ObtenerWidZonaNormalizacion(int Periodo, int Zona)
        {
            return InformesDataAccess.ListarTotalesZonaNormalizaicon(Periodo, Zona);
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-traking-totalEjecutivo-normalizacion")]
        public TrackingWidgetsEjecutivoNormalizacion ObtenerTrackingInformeTotalEjecutivoNormalizacion(int RutEjecutivo, int Periodo)
        {
            return InformesDataAccess.ListarTotalesEjecutivoWidNormalizacion(RutEjecutivo, Periodo);
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-traking-combobox")]
        public IEnumerable<TrackingComboCargo> ObtenerComboCargo(int Periodo)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return InformesDataAccess.ObtenerCombo(token, Periodo);
        }
        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-traking-combobox-perfZonal")]
        public IEnumerable<TrackingComboCargo> ObtenerComboCargoPerfZonal(int CodOficina, int Periodo)
        {

            return InformesDataAccess.ObtenerComboPerfZonal(CodOficina, Periodo);
        }
        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-traking-combobox-perfZonal-Normalizacion")]
        public IEnumerable<TrackingComboCargo> ObtenerComboCargoPerfZonalNormalizacion(int CodOficina, int Periodo)
        {

            return InformesDataAccess.ObtenerComboPerfZonalNormalizacion(CodOficina, Periodo);
        }
        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-traking-combobox-normalizacion")]
        public IEnumerable<TrackingComboCargoNormalizacion> ObtenerComboCargoNormalizacion(int Periodo)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return InformesDataAccess.ObtenerComboNormalizacion(token, Periodo);
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-ffvv-resumen")]
        public IEnumerable<FFVVBaseEntity> ObtenerFFVVInforme(int Periodo)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return FFVVBaseDataAccess.ListarResumenFFVVEjecutivo(token, Periodo);
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-ffvv-detalle-ejecutivo")]
        public IEnumerable<DetalleFFVVBase> ObtenerDetalleFFVVEjecutivo(int Periodo)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return FFVVBaseDataAccess.ListarDetalleFFVVEjecutivo(token, Periodo);
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-ffvv-comision-historico")]
        public IEnumerable<PagoComisionesHistorico> ObtenerComisionesHistorico(int Periodo)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return FFVVBaseDataAccess.ListarComisionHitorica(token, Periodo);
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("lista-ffvv-pago-comision")]
        public IEnumerable<PagoComision> ObtenerPagoComision(int Periodo)
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return FFVVBaseDataAccess.ListarPagoComision(token, Periodo);
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("listar-incentivo-ffvv")]
        public IEnumerable<IncentivoFFVV> ListaIncentivoFFVV()
        {
            return FFVVBaseDataAccess.ListarIncentivoFFVV();
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("listar-comisionesffvv")]
        public IEnumerable<ComisionesColocacionesFFVV> ListaComisionesFFVV()
        {
            return FFVVBaseDataAccess.ListarComisionesFFVV();
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("listar-periodos-tracking")]
        public List<PeriodoEntity> listarPeriodosTracking()
        {
            return PeriodoDataAccess.ListarPeriodosTracking();
        }

        [AuthorizationRequired]
        [HttpGet]
        [Route("listar-periodos-ffvv")]
        public List<PeriodoEntity> listarPeriodosFVV()
        {
            return PeriodoDataAccess.ListarPeriodosFFVV();
        }



      //  [AuthorizationRequired]
        [HttpGet]
        [Route("obtener-gestion-comercial")]
        public TrackingEjecutivoGestion ObtenerTrackingInformeEjecutivoGestion()
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return InformesDataAccess.ObtenerTotalesEjecutivoGestion(token);
        }

      //  [AuthorizationRequired]
        [HttpGet]
        [Route("obtener-gestion-comercial-vencidas")]
        public TrackinVencimientosGestiones ObtenerTrackingVencimientoGestion()
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return InformesDataAccess.ObtenerVencidosGestiones(token);
        }

       // [AuthorizationRequired]
        [HttpGet]
        [Route("obtener-gestion-normalizacion")]
        public TrackEjecutivoGestionNormalizacion ObtenerInformeEjecutivoNormalizacion()
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return InformesDataAccess.ObtenerGestionNormalizacion(token);
        }

       // [AuthorizationRequired]
        [HttpGet]
        [Route("obtener-gestion-normalizacion-vencidas")]
        public TrackVencimientosGesNormalizacion ObtenerInfoVencidosGesNormalizacion()
        {
            string token = ActionContext.Request.Headers.GetValues("Token").First();
            return InformesDataAccess.ObtenerVencidosGesNormalizacion(token);
        }


    }
}