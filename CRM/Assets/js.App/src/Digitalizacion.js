window.responseoficinas = [];
window.responseoficinasLegalizado = [];
function digitalLinkFormatter(value, row, index) {

    return `<a class="btn btn-primary mar-lft btn-rounded" title="Seguimiento" href="/motor/App/digitalizacion/gestion?ci=${row.Id}&aud=none"><i class="ion-search btn-rounded"></i></a>`;
}

function digitalLegaLinkFormatter(value, row, index) {

    return `<a class="btn btn-primary mar-lft btn-rounded" title="Seguimiento" href="/motor/App/digitalizacion/gestionlegalizados?ci=${row.Id}&aud=none"><i class="ion-search btn-rounded"></i></a>`;
}

function digitalLinkFormatterauditoria(value, row, index) {

    return `<a class="btn btn-primary mar-lft btn-rounded" title="Seguimiento" href="/motor/App/digitalizacion/GestionAuditoria?ci=${row.Id}&aud=none"><i class="ion-search btn-rounded"></i></a>`;
}
function digitalLinkFormatterauditoriaLegalizado(value, row, index) {

    return `<a class="btn btn-primary mar-lft btn-rounded" title="Seguimiento" href="/motor/App/digitalizacion/GestionAuditoriaLegalizado?ci=${row.Id}&aud=none"><i class="ion-search btn-rounded"></i></a>`;
}

function digitalLinkFormatterEspecialista(value, row, index) {
     if (row.Tipo == 1)// mostrar Legalizados
         return `<a class="btn btn-primary mar-lft btn-rounded" title="Seguimiento" href="/motor/App/digitalizacion/Gestion?ci=${row.Id}&aud=3sp3c1l1st4"><i class="ion-search btn-rounded"></i></a>`;
    else
         return `<a class="btn btn-primary mar-lft btn-rounded" title="Seguimiento" href="/motor/App/digitalizacion/gestionlegalizados?ci=${row.Id}&aud=3sp3c1l1st4"><i class="ion-search btn-rounded"></i></a>`;

   }


function digitalMisReparosLinkFormatter(value, row, index) {

    if (row.Tipo == 1)// mostrar Legalizados
        return `<a class="btn btn-primary mar-lft btn-rounded" title="Seguimiento" href="/motor/App/digitalizacion/gestion?ci=${row.Id}&aud=4ud1t"><i class="ion-search btn-rounded"></i></a>`;
    else
        return `<a class="btn btn-primary mar-lft btn-rounded" title="Seguimiento" href="/motor/App/digitalizacion/gestionlegalizados?ci=${row.Id}&aud=4ud1t"><i class="ion-search btn-rounded"></i></a>`;

}

$.fn.datepicker.dates['es'] = {
    days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    daysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    daysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"],
    months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    today: "Hoy",
    clear: "Borrar",
    format: "dd/mm/yyyy",
    titleFormat: "MM yyyy", /* Leverages same syntax as 'format' */
    weekStart: 1
};

function asaignaDatos() {
    sessionStorage.setItem('txtrut', $("#txtrut").val());
    sessionStorage.setItem('txtcredito', $("#txtcredito").val());
    sessionStorage.setItem('ddlEstados', $("#ddlEstados").val());
    sessionStorage.setItem('dt_fecha_venta_desde', $("#dt_fecha_venta_desde").val());
    sessionStorage.setItem('dt_fecha_venta_hasta', $("#dt_fecha_venta_hasta").val());
    sessionStorage.setItem('txtrutlegal', $("#txtrutlegal").val());
    sessionStorage.setItem('txtcreditoLegal', $("#txtcreditoLegal").val());
    sessionStorage.setItem('ddlEstadosLegal', $("#ddlEstadosLegal").val());
    sessionStorage.setItem('dt_fecha_venta_desdeLegal', $("#dt_fecha_venta_desdeLegal").val());
    sessionStorage.setItem('dt_fecha_venta_hasta_Legal', $("#dt_fecha_venta_hasta_Legal").val());
    sessionStorage.setItem('ddlejecutivoAsignacion', $("#ddlejecutivoAsignacion").val());
    sessionStorage.setItem('ddlTipo_asignacion', $("#ddlTipo_asignacion").val());
    sessionStorage.setItem('dt_fecha_asignacion_desde', $("#dt_fecha_asignacion_desde").val());
    sessionStorage.setItem('dt_fecha_asignacion_hasta', $("#dt_fecha_asignacion_hasta").val());
    sessionStorage.setItem('dt_fecha_asignacion_desdeLegalizado', $("#dt_fecha_asignacion_desdeLegalizado").val());
    sessionStorage.setItem('dt_fecha_asignacion_hastaLegalizado', $("#dt_fecha_asignacion_hastaLegalizado").val());
    sessionStorage.setItem('ddlejecutivoAsignacionLegalizado', $("#ddlejecutivoAsignacionLegalizado").val());





}

function formatoFecha(value, row, index) {


    if (value != null) {
        return value.toFecha();
    }

}
var metodos = {

    CargaGrilla: function (Rut, Credito, Estado, FechaVentaDesde, FechaVentaHasta, Filtro) {

        $("#tblDigitalizacion").bootstrapTable('refresh', {
            url: '/motor/api/digitalizacion/listar-digitalizacion',
            query: {
                Id: 0,
                Rut: Rut,
                Credito: Credito,
                Estado: Estado,
                FechaVentaDesde: FechaVentaDesde,
                FechaVentaHasta: FechaVentaHasta,
                Oficina: getCookie("Oficina"),
                Tipo: 1,
                Filtro: Filtro,
                Ejecutivo: getCookie("Rut")
            }
        });
    },
    CargaGrillaAsginacionMisReparos: function (FechaVentaDesde, FechaVentaHasta, Filtro, Ejecutivo, Tipo, Rut, Credito, Oferta, Estado, tipo) {

        $("#tblDigitalizacionAsignacion").bootstrapTable('refresh', {
            url: '/motor/api/digitalizacion/listar-digitalizacion-Agente',
            query: {
                RutEjecutivo: Ejecutivo,
                FechaVentaDesde: FechaVentaDesde,
                FechaVentaHasta: FechaVentaHasta,
                Oficina: getCookie("Oficina"),
                Tipo: Tipo,
                Filtro: Filtro,
                Rut: Rut,
                Credito: Credito,
                Oferta: Oferta,
                Estado: Estado
            }
        });

    },
    CargaGrillaAsginacion: function (FechaVentaDesde, FechaVentaHasta, Filtro, Ejecutivo, Tipo, Rut, Credito, Oferta, Estado, tipo) {

        $("#tblDigitalizacionAsignacion").bootstrapTable('refresh', {
            url: '/motor/api/digitalizacion/listar-digitalizacion-Agente',
            query: {
                RutEjecutivo: Ejecutivo,
                FechaVentaDesde: FechaVentaDesde,
                FechaVentaHasta: FechaVentaHasta,
                Oficina: getCookie("Oficina"),
                Tipo: Tipo,
                Filtro: Filtro,
                Rut: Rut,
                Credito: Credito,
                Oferta: Oferta,
                Estado: Estado

            }
        });
        $.SecGetJSON(BASE_URL + "/motor/api/digitalizacion/listar-digitalizacion-Agente", { RutEjecutivo: Ejecutivo, FechaVentaDesde: FechaVentaDesde, FechaVentaHasta: FechaVentaHasta, Oficina: getCookie("Oficina"), Tipo: Tipo, Filtro: Filtro, Rut: $("#txtrutagenteDI").val(), Credito: $("#txtcreditoagenteDI").val(), Oferta: $("#txtofertaagenteDI").val(), Estado: $("#ddlEstadosagenteDI").val() }, function (response) {

            $("#conteoAgenteDigit").text(response.length);

        });

    },
    CargaGrillaAsginacionLeaglizacion: function (FechaVentaDesde, FechaVentaHasta, Filtro, Ejecutivo, Tipo, Rut, Credito, Oferta, Estado, tipo) {

        $("#tblDigitalizacionAsignacionLegalizado").bootstrapTable('refresh', {
            url: '/motor/api/digitalizacion/listar-digitalizacion-Agente',
            query: {
                RutEjecutivo: Ejecutivo,
                FechaVentaDesde: FechaVentaDesde,
                FechaVentaHasta: FechaVentaHasta,
                Oficina: getCookie("Oficina"),
                Tipo: Tipo,
                Filtro: Filtro,
                Rut: Rut,
                Credito: Credito,
                Oferta: Oferta,
                Estado: Estado

            }
        });
        $.SecGetJSON(BASE_URL + "/motor/api/digitalizacion/listar-digitalizacion-Agente", { RutEjecutivo: Ejecutivo, FechaVentaDesde: FechaVentaDesde, FechaVentaHasta: FechaVentaHasta, Oficina: getCookie("Oficina"), Tipo: Tipo, Filtro: Filtro, Rut: $("#txtrutagenteDL").val(), Credito: $("#txtcreditoagenteDL").val(), Oferta: $("#txtofertaagenteDL").val(), Estado: $("#ddlEstadosagenteDL").val() }, function (response) {

            $("#conteoAgenteLegalizadoDigit").text(response.length);

        });

    },
    CargaGrillaReparoAgente: function (FechaVentaDesde, FechaVentaHasta, Filtro, Ejecutivo, Tipo, Rut, Credito, Oferta, Estado) {

        $("#tblDigitalizacionAsignacionReparo").bootstrapTable('refresh', {
            url: '/motor/api/digitalizacion/listar-digitalizacion-Reparo-Agente',
            query: {
                RutEjecutivo: Ejecutivo,
                FechaVentaDesde: FechaVentaDesde,
                FechaVentaHasta: FechaVentaHasta,
                Oficina: getCookie("Oficina"),
                Tipo: Tipo,
                Filtro: Filtro,
                Rut: Rut,
                Credito: Credito,
                Oferta: Oferta,
                Estado: Estado
            }
        });
        $.SecGetJSON(BASE_URL + "/motor/api/digitalizacion/listar-digitalizacion-Reparo-Agente", { RutEjecutivo: Ejecutivo, FechaVentaDesde: FechaVentaDesde, FechaVentaHasta: FechaVentaHasta, Oficina: getCookie("Oficina"), Tipo: Tipo, Filtro: Filtro, Rut: $("#txtrutagenteRep").val(), Credito: $("#txtcreditoagenteRep").val(), Oferta: $("#txtofertaagenteRep").val(), Estado: $("#ddlEstadosagenteRep").val() }, function (response) {

            $("#conteoAgenteReparo").text(response.length);

        });
    },
    CargaGrillaLegalizados: function (Rut, Credito, Estado, FechaVentaDesde, FechaVentaHasta, Filtro) {

        $("#tblDigitalizacionLegal").bootstrapTable('refresh', {
            url: `/motor/api/digitalizacion/listar-digitalizacion`,
            query: {
                Id: 0,
                Rut: Rut,
                Credito: Credito,
                Estado: Estado,
                FechaVentaDesde: FechaVentaDesde,
                FechaVentaHasta: FechaVentaHasta,
                Oficina: getCookie("Oficina"),
                Tipo: 2,
                Filtro: Filtro,
                Ejecutivo: getCookie("Rut")

            }
        });
    },
    CargaGrillaMisReparos: function (Rut, Credito) {

        $("#tblDigitalizacionMisReparos").bootstrapTable('refresh', {
            url: `/motor/api/digitalizacion/listar-digitalizacion-misReparos`,
            query: {
                Id: 0,
                Rut: Rut,
                Credito: Credito,
                Oficina: getCookie("Oficina"),
                RutEjecutivo: getCookie("Rut"),
                Reparo: 'Ejecutivo'
            }
        });
    },
    CargaGrillaConteoMisReparos: function () {

        $.SecGetJSON(BASE_URL + "/motor/api/digitalizacion/listar-misReparos_conteo", { RutEjecutivo: getCookie("Rut"), Reparo: "Ejecutivo" }, function (response) {
            $("#conteoMisreparos").text(response);

        });
    },
    CargaGrillaConteoGestonLeaglizados: function (Tipo) {

        $.SecGetJSON(BASE_URL + "/motor/api/digitalizacion/listar-Lead-General-conteo", { Tipo: Tipo, RutEjecutivo: getCookie("Rut") }, function (response) {

            $("#conteoDocLegalizado").text(response);

        });
    },
    CargaGrillaConteoGestonGeneral: function (Tipo) {

        $.SecGetJSON(BASE_URL + "/motor/api/digitalizacion/listar-Lead-General-conteo", { Tipo: Tipo, RutEjecutivo: getCookie("Rut") }, function (response) {

            $("#conteoDocGeneral").text(response);

        });
    },
    CargaGrillaejecutvo: function (Periodo) {

        $.SecGetJSON(BASE_URL + "/motor/api/digitalizacion/listar-ejecutivo_asignacion", { Periodo: Periodo, CodOficina: getCookie("Oficina") }, function (response) {

            $("#ddlejecutivo").html("");
            $("#ddlejecutivoReparo").html("");
            $.each(response, function (i, datos) {
                $("#ddlejecutivoReparo").append($("<option>").val(datos.Rut).html(datos.Nombre).data("rut", datos.Rut).data("nombre", datos.Nombre));

                $("#ddlejecutivo").append($("<option>").val(datos.Rut).html(datos.Nombre).data("rut", datos.Rut).data("nombre", datos.Nombre));
            });

        });
    },
    CargaGrillaejecutvoAsignacion: function (Periodo) {

        $.SecGetJSON(BASE_URL + "/motor/api/digitalizacion/listar-ejecutivo_asignacion", { Periodo: Periodo, CodOficina: getCookie("Oficina") }, function (response) {

            $("#ddlejecutivoAsignacion").html("");
            $("#ddlejecutivoAsignacionReparo").html("");
            $("#ddlejecutivoAsignacionLegalizado").html("");
            $.each(response, function (i, datos) {

                $("#ddlejecutivoAsignacion").append($("<option>").val(datos.Rut).html(datos.Nombre).data("rut", datos.Rut).data("nombre", datos.Nombre));
                $("#ddlejecutivoAsignacionReparo").append($("<option>").val(datos.Rut).html(datos.Nombre).data("rut", datos.Rut).data("nombre", datos.Nombre));
                $("#ddlejecutivoAsignacionLegalizado").append($("<option>").val(datos.Rut).html(datos.Nombre).data("rut", datos.Rut).data("nombre", datos.Nombre));

            });

        });
    },
    CargaGrillaejecutvoAsignacionLegalizacion: function (Periodo) {

        $.SecGetJSON(BASE_URL + "/motor/api/digitalizacion/listar-ejecutivo_asignacion", { Periodo: Periodo, CodOficina: getCookie("Oficina") }, function (response) {


            $("#ddlejecutivo_modal_Legalizacion").html("");
            $.each(response, function (i, datos) {

                $("#ddlejecutivo_modal_Legalizacion").append($("<option>").val(datos.Rut).html(datos.Nombre).data("rut", datos.Rut).data("nombre", datos.Nombre));
            });

        });
    },
    CargaGrillaAuditor: function (RutEjecutivo, Oficina, FechaVentaDesde, FechaVentaHasta, Filtro, Tipo) {

        var Of = "";
        if (Oficina == null)
            Of = -1
        else
            Of = Oficina
        $("#tblDigitalizacionAuditor").bootstrapTable('refresh', {
            url: '/motor/api/digitalizacion/listar-digitalizacion-auditor',
            query: {
                Id: 0,
                FechaVentaDesde: FechaVentaDesde,
                FechaVentaHasta: FechaVentaHasta,
                Oficina: Of,
                Tipo: Tipo,
                Filtro: Filtro,
                Ejecutivo: RutEjecutivo
            }
        });
    },
    CargaGrillaAuditorLegalizados: function (RutEjecutivo, Oficina, FechaVentaDesde, FechaVentaHasta, Filtro, Tipo) {
        var Of = "";
        if (Oficina == null)
            Of = -1
        else
            Of = Oficina
        $("#tblDigitalizacionAuditorLegalizados").bootstrapTable('refresh', {
            url: '/motor/api/digitalizacion/listar-digitalizacion-auditor',
            query: {
                Id: 0,
                FechaVentaDesde: FechaVentaDesde,
                FechaVentaHasta: FechaVentaHasta,
                Oficina: Of,
                Tipo: Tipo,
                Filtro: Filtro,
                Ejecutivo: RutEjecutivo
            }
        });
    },
    CargaComboOficinas: function () {

        $.SecGetJSON(BASE_URL + "/motor/api/digitalizacion/listar-oficina-auditor", function (response) {

            if (responseoficinas.length == 0) {
                $("#ddlOficina_Auditoria").html("");
                $("#ddlOficina_Auditoria").append($("<option>").val(-1).html("Seleccione").data("id", -1).data("nombre", "Seleccione"));
                $.each(response, function (i, oficina) {
                    var selected = (oficina.codOficina == sessionStorage.getItem('ddlOficina_Auditoria'))
                    $("#ddlOficina_Auditoria").append($("<option>").val(oficina.codOficina).html(oficina.DescOficina).prop("selected", selected));
                    $("#ddlOficina_Auditoria").trigger("change")
                });


                responseoficinas = response;
            }
        });
    },
    CargaComboOficinaslegalizado: function () {

        $.SecGetJSON(BASE_URL + "/motor/api/digitalizacion/listar-oficina-auditor", function (response) {

            if (responseoficinasLegalizado.length == 0) {

                $("#ddlOficina_Auditoria_legalizado").html("");
                $("#ddlOficina_Auditoria_legalizado").append($("<option>").val(-1).html("Seleccione").data("id", -1).data("nombre", "Seleccione"));
                $.each(response, function (i, oficina) {

                    var selected = (oficina.codOficina == sessionStorage.getItem('ddlOficina_Auditoria_Legalizado'))
                    $("#ddlOficina_Auditoria_legalizado").append($("<option>").val(oficina.codOficina).html(oficina.DescOficina).prop("selected", selected));
                    $("#ddlOficina_Auditoria_legalizado").trigger("change")
                });


                responseoficinasLegalizado = response;
            }
        });
    },
    CargaComboejecutvoAuditoria: function (Periodo, Oficina) {

        $.SecGetJSON(BASE_URL + "/motor/api/digitalizacion/listar-ejecutivo_asignacion", { Periodo: Periodo, CodOficina: Oficina }, function (response) {

            $("#ddlEjecutivo_Auditoria").html("");
            $("#ddlEjecutivo_Auditoria").append($("<option>").val("-1").html("Todos").data("rut", "-1").data("nombre", "Todos"));

            $.each(response, function (i, datos) {

                var selected = (datos.Rut == sessionStorage.getItem('ddlEjecutivo_Auditoria'))

                $("#ddlEjecutivo_Auditoria").append($("<option>").val(datos.Rut).html(datos.Nombre).data("rut", datos.Rut).data("nombre", datos.Nombre).prop("selected", selected));
            });

        });
    },
    CargaComboejecutvoAuditoriaLegalizado: function (Periodo, Oficina) {

        $.SecGetJSON(BASE_URL + "/motor/api/digitalizacion/listar-ejecutivo_asignacion", { Periodo: Periodo, CodOficina: Oficina }, function (response) {

            $("#ddlEjecutivo_Auditoria_legalizado").html("");
            $("#ddlEjecutivo_Auditoria_legalizado").append($("<option>").val("-1").html("Todos").data("rut", "-1").data("nombre", "Todos"));

            $.each(response, function (i, datos) {

                var selected = (datos.Rut == sessionStorage.getItem('ddlEjecutivo_Auditoria_legalizado'))

                $("#ddlEjecutivo_Auditoria_legalizado").append($("<option>").val(datos.Rut).html(datos.Nombre).data("rut", datos.Rut).data("nombre", datos.Nombre).prop("selected", selected));
            });

        });
    },
    CargaGrillaGestionMC: function (FechaVentaDesde, FechaVentaHasta, Oferta) {
     
        $("#tblDigitalizacionAsignacionMC").bootstrapTable('refresh', {
            url: '/motor/api/digitalizacion/listar-digitalizacion-MC',
            query: {
                FechaVentaDesde: FechaVentaDesde,
                FechaVentaHasta: FechaVentaHasta,
                RutEjecutivo: getCookie("Rut"),
                Oferta: Oferta
            }
        });
    },
    CargarcomboZona: function () {
        $.SecGetJSON(BASE_URL + "/motor/api/digitalizacion/listar-zona", function (response) {


            $("#ddlZonaEspecialista").html("");
            $("#ddlZonaEspecialista").append($("<option>").val(-1).html("Seleccione").data("id", "Seleccione").data("nombre", "Seleccione"));
            $("#ddlZonaEspecialistaPagadora").html("");
            $("#ddlZonaEspecialistaPagadora").append($("<option>").val(-1).html("Seleccione").data("id", "Seleccione").data("nombre", "Seleccione"));
            $("#ddlZonaEspecialistaCurse").html("");
            $("#ddlZonaEspecialistaCurse").append($("<option>").val(-1).html("Seleccione").data("id", "Seleccione").data("nombre", "Seleccione"));

            $.each(response, function (i, oficina) {

                $("#ddlZonaEspecialista").append($("<option>").val(oficina.Zona).html(oficina.Zona));
                $("#ddlZonaEspecialistaPagadora").append($("<option>").val(oficina.Zona).html(oficina.Zona));
                $("#ddlZonaEspecialistaCurse").append($("<option>").val(oficina.Zona).html(oficina.Zona));
            });

            responseoficinas = response;

        });
    },
    CargarComboOficinaZona: function (Zona) {
        $.SecGetJSON(BASE_URL + "/motor/api/digitalizacion/listar-oficina-zona", { Zona: Zona }, function (response) {
           
            $("#ddllOficinaEspecialista").html("");
            $("#ddllOficinaEspecialista").append($("<option>").val(-1).html("Todos").data("id", -1).data("nombre", "Todos"));
            
            $.each(response, function (i, oficina) {
               // var selected = (oficina.codOficina == sessionStorage.getItem('ddlOficina_Auditoria'))
                $("#ddllOficinaEspecialista").append($("<option>").val(oficina.codOficina).html(oficina.DescOficina));


            });
           
            //if (sessionStorage.getItem('ddlZonaEspecialista') != null)
            //    $("#ddlZonaEspecialista").val(sessionStorage.getItem('ddlZonaEspecialista'));

           // $("#ddlZonaEspecialista").trigger("change")
            responseoficinas = response;


        });
    },
    CargarComboOficinaZonaPagadora: function (Zona) {
        $.SecGetJSON(BASE_URL + "/motor/api/digitalizacion/listar-oficina-zona", { Zona: Zona }, function (response) {

            $("#ddllOficinaEspecialistaPagadora").html("");
            $("#ddllOficinaEspecialistaPagadora").append($("<option>").val(-1).html("Todos").data("id", -1).data("nombre", "Todos"));

            $.each(response, function (i, oficina) {
                // var selected = (oficina.codOficina == sessionStorage.getItem('ddlOficina_Auditoria'))
                $("#ddllOficinaEspecialistaPagadora").append($("<option>").val(oficina.codOficina).html(oficina.DescOficina));


            });

            //if (sessionStorage.getItem('ddlZonaEspecialista') != null)
            //    $("#ddlZonaEspecialista").val(sessionStorage.getItem('ddlZonaEspecialista'));

            // $("#ddlZonaEspecialista").trigger("change")
            responseoficinas = response;


        });
    },
    CargarComboOficinaZonaCurse: function (Zona) {
        $.SecGetJSON(BASE_URL + "/motor/api/digitalizacion/listar-oficina-zona", { Zona: Zona }, function (response) {

            $("#ddllOficinaEspecialistaCurse").html("");
            $("#ddllOficinaEspecialistaCurse").append($("<option>").val(-1).html("Todos").data("id", -1).data("nombre", "Todos"));

            $.each(response, function (i, oficina) {
                // var selected = (oficina.codOficina == sessionStorage.getItem('ddlOficina_Auditoria'))
                $("#ddllOficinaEspecialistaCurse").append($("<option>").val(oficina.codOficina).html(oficina.DescOficina));


            });

            //if (sessionStorage.getItem('ddlZonaEspecialista') != null)
            //    $("#ddlZonaEspecialista").val(sessionStorage.getItem('ddlZonaEspecialista'));

            // $("#ddlZonaEspecialista").trigger("change")
            responseoficinas = response;


        });
    },
    CargaGrillaEspecialista: function (OficinaAuditora, Oferta, Estado, FechaVentaDesde, FechaVentaHasta, Tipo, Rut, ZonaAuditora,OficinaCurse,ZonaCurse,OficinaPagadora,ZonaPagadora) {

        $("#tblDigitalizacionAsignacionEspecialista").bootstrapTable('refresh', {
            url: '/motor/api/digitalizacion/listar-Lead-Especialista',
            query: {
                CodOficina: OficinaAuditora,
                Oferta: Oferta,
                Estado: Estado,
                FechaDesde: FechaVentaDesde,
                FechaHasta: FechaVentaHasta,
                tipo: Tipo,
                rut: Rut,
                Zona: ZonaAuditora,
                OficinaCurse: OficinaCurse,
                ZonaCurse: ZonaCurse,
                OficinaPagadora: OficinaPagadora,
                ZonaPagadora: ZonaPagadora

            }
        });
    },

}






$(function () {
    var result = [];
    var result_reparos = [];
    var result_legalizados = [];
    //*********************Validacion de perfiles**************************



    if (getCookie('Cargo') == 'Agente' || getCookie('Cargo') == 'Jefe Servicio al Cliente' || getCookie('Cargo') == 'Jefe Plataforma') {
        $('#tab_Agente').css('display', 'block')
        $('#tab_misreparos').css('display', 'none')
        $('#tab_ingreso').css('display', 'none')
        $('#tab_documentos').css('display', 'none')
        $('#tab_misreparos_Agente').css('display', 'block')
        $('#tab_Agente_Legalizados').css('display', 'block')
        $('#tab_auditor').css('display', 'none')
        $('#tab_auditor_legalizados').css('display', 'none')
        $('#tab_gestion_MC').css('display', 'none')
        $('#tab_gestion_Especialistas').css('display', 'none')
        $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

            sessionStorage.setItem('activeTab', $(e.target).attr('href'));
        });
        var activeTab = sessionStorage.getItem('activeTab');
        if (activeTab) {
            $('#myTab a[href="' + activeTab + '"]').tab('show');
        } else {
            $('#myTab a[href="#demo-lft-tab-4"]').tab('show');

        }

    }
    else if (getCookie('Oficina') == "457") {
        $('#tab_Agente').css('display', 'none')
        $('#tab_misreparos').css('display', 'none')
        $('#tab_ingreso').css('display', 'none')
        $('#tab_documentos').css('display', 'none')
        $('#tab_misreparos_Agente').css('display', 'none')
        $('#tab_Agente_Legalizados').css('display', 'none')
        $('#tab_auditor').css('display', 'none')
        $('#tab_auditor_legalizados').css('display', 'none')
        $('#tab_gestion_MC').css('display', 'none')
        $('#tab_gestion_Especialistas').css('display', 'block')
        $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

            sessionStorage.setItem('activeTab', $(e.target).attr('href'));
        });

        $('#myTab a[href="#demo-lft-tab-10"]').tab('show');


    }
    else if (getCookie('Oficina') == "888") {
        $('#tab_Agente').css('display', 'none')
        $('#tab_misreparos').css('display', 'none')
        $('#tab_ingreso').css('display', 'none')
        $('#tab_documentos').css('display', 'none')
        $('#tab_misreparos_Agente').css('display', 'none')
        $('#tab_Agente_Legalizados').css('display', 'none')
        $('#tab_auditor').css('display', 'block')
        $('#tab_auditor_legalizados').css('display', 'block')
        $('#tab_gestion_MC').css('display', 'none')
        $('#tab_gestion_Especialistas').css('display', 'none')
        $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

            sessionStorage.setItem('activeTab', $(e.target).attr('href'));
        });

        $('#myTab a[href="#demo-lft-tab-7"]').tab('show');


    }
    else if (getCookie('Oficina') == "881") {
        $('#tab_Agente').css('display', 'none')
        $('#tab_misreparos').css('display', 'none')
        $('#tab_ingreso').css('display', 'none')
        $('#tab_documentos').css('display', 'none')
        $('#tab_misreparos_Agente').css('display', 'none')
        $('#tab_Agente_Legalizados').css('display', 'none')
        $('#tab_auditor').css('display', 'none')
        $('#tab_auditor_legalizados').css('display', 'none')
        $('#tab_gestion_MC').css('display', 'none')
        $('#tab_gestion_MC').css('display', 'block')
        $('#tab_gestion_Especialistas').css('display', 'none')

        $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

            sessionStorage.setItem('activeTab', $(e.target).attr('href'));
        });

        $('#myTab a[href="#demo-lft-tab-9"]').tab('show');


    }

    else {
        $('#tab_Agente').css('display', 'none')
        $('#tab_misreparos').css('display', 'block')
        $('#tab_ingreso').css('display', 'block')
        $('#tab_documentos').css('display', 'block')
        $('#tab_misreparos_Agente').css('display', 'none')
        $('#tab_Agente_Legalizados').css('display', 'none')
        $('#tab_auditor').css('display', 'none')
        $('#tab_gestion_MC').css('display', 'none')
        $('#tab_auditor_legalizados').css('display', 'none')
        $('#tab_gestion_Especialistas').css('display', 'none')
        $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

            sessionStorage.setItem('activeTab', $(e.target).attr('href'));
        });
        var activeTab = sessionStorage.getItem('activeTab');
        if (activeTab) {
            $('#myTab a[href="' + activeTab + '"]').tab('show');
        } else {
            $('#myTab a[href="#demo-lft-tab-1"]').tab('show');

        }
    }






    //******************************************* Carga JS**************
    var hoy = new Date();
    var d = hoy.getDate().toString().paddingLeft("00") + "-" + (hoy.getMonth() + 1).toString().paddingLeft("00") + "-" + hoy.getFullYear().toString();
    $("#dt_fecha_venta_desde").val(d)
    $("#dt_fecha_venta_hasta").val(d)
    $("#dt_fecha_venta_desdeLegal").val(d)
    $("#dt_fecha_venta_hasta_Legal").val(d)
    $("#dt_fecha_asignacion_desde").val(d)
    $("#dt_fecha_asignacion_hasta").val(d)
    $("#dt_fecha_asignacion_reparo_desde").val(d)
    $("#dt_fecha_asignacion_reparo_hasta").val(d)
    $("#dt_fecha_asignacion_desdeLegalizado").val(d)
    $("#dt_fecha_asignacion_hastaLegalizado").val(d)
    $("#dt_fecha_venta_hasta_auditor").val(d)
    $("#dt_fecha_venta_desde_auditor").val(d)
    $("#dt_fecha_venta_hasta_auditor_legalizado").val(d)
    $("#dt_fecha_venta_desde_auditor_legalizado").val(d)
    $("#dt_fecha_asignacion_mc_desde").val(d)
    $("#dt_fecha_asignacion_mc_hasta").val(d)

    $("#dt_fecha_asignacion_especialista_desde").val(d)
    $("#dt_fecha_asignacion_especialista_hasta").val(d)
    //*************************Modal Ejecutvo Asignacion ***********************

    $('#modal_asigna_digitalizacion').on('show.bs.modal', function (event) {

        let fechaHoy = new Date();
        let periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
        metodos.CargaGrillaejecutvo(periodo);

    });

    //*************************  MESA DE CONTROl*********************
    if (getCookie('Oficina') == "881") {
        $('#btn_buscar_asignacion_mc').on("click", function () {
            metodos.CargaGrillaGestionMC($("#dt_fecha_asignacion_mc_desde").val(), $("#dt_fecha_asignacion_mc_hasta").val(), $("#txtOfertaMc").val())

        });

        metodos.CargaGrillaGestionMC("01-01-2021", $("#dt_fecha_asignacion_mc_hasta").val(), $("#txtOfertaMc").val())

    }
    //*****************************Tab documentación Geneal

    if (sessionStorage.getItem('txtrut') != null)
        $("#txtrut").val(sessionStorage.getItem('txtrut'));


    if (sessionStorage.getItem('txtcredito') != null)
        $("#txtcredito").val(sessionStorage.getItem('txtcredito'));

    if (sessionStorage.getItem('ddlEstados') != null)
        $("#ddlEstados").val(sessionStorage.getItem('ddlEstados'));

    if (sessionStorage.getItem('dt_fecha_venta_desde') != null)
        $("#dt_fecha_venta_desde").val(sessionStorage.getItem('dt_fecha_venta_desde'));

    if (sessionStorage.getItem('dt_fecha_venta_hasta') != null)
        $("#dt_fecha_venta_hasta").val(sessionStorage.getItem('dt_fecha_venta_hasta'));

    //*****************************************************************

    //*********************Documentos Legalizados

    if (sessionStorage.getItem('txtrutlegal') != null)
        $("#txtrutlegal").val(sessionStorage.getItem('txtrutlegal'));


    if (sessionStorage.getItem('txtcreditoLegal') != null)
        $("#txtcreditoLegal").val(sessionStorage.getItem('txtcreditoLegal'));

    if (sessionStorage.getItem('ddlEstadosLegal') != null)
        $("#ddlEstadosLegal").val(sessionStorage.getItem('ddlEstadosLegal'));

    if (sessionStorage.getItem('dt_fecha_venta_desdeLegal') != null)
        $("#dt_fecha_venta_desdeLegal").val(sessionStorage.getItem('dt_fecha_venta_desdeLegal'));

    if (sessionStorage.getItem('dt_fecha_venta_hasta_Legal') != null)
        $("#dt_fecha_venta_hasta_Legal").val(sessionStorage.getItem('dt_fecha_venta_hasta_Legal'));

    //*********************Asignacion Ejecutivo********************************************
    if (sessionStorage.getItem('ddlejecutivoAsignacion') != null)
        $("#ddlejecutivoAsignacion").val(sessionStorage.getItem('ddlejecutivoAsignacion'));
    if (sessionStorage.getItem('ddlTipo_asignacion') != null)
        $("#ddlTipo_asignacion").val(sessionStorage.getItem('ddlTipo_asignacion'));

    if (sessionStorage.getItem('dt_fecha_asignacion_desde') != null)
        $("#dt_fecha_asignacion_desde").val(sessionStorage.getItem('dt_fecha_asignacion_desde'));

    if (sessionStorage.getItem('dt_fecha_asignacion_hasta') != null)
        $("#dt_fecha_asignacion_hasta").val(sessionStorage.getItem('dt_fecha_asignacion_hasta'));


    if (sessionStorage.getItem('ddlejecutivoAsignacionLegalizado') != null)
        $("#ddlejecutivoAsignacionLegalizado").val(sessionStorage.getItem('ddlejecutivoAsignacion'));
    if (sessionStorage.getItem('dt_fecha_asignacion_desdeLegalizado') != null)
        $("#dt_fecha_asignacion_desdeLegalizado").val(sessionStorage.getItem('dt_fecha_asignacion_desdeLegalizado'));

    if (sessionStorage.getItem('dt_fecha_asignacion_hastaLegalizado') != null)
        $("#dt_fecha_asignacion_hastaLegalizado").val(sessionStorage.getItem('dt_fecha_asignacion_hastaLegalizado'));

    //*******************************************************

    $('#btnmodalAsignacionEjecutivo').on("click", function () {
        $('#modal_asigna_digitalizacion').modal('show');
    });
    $('#btnmodalAsignacionEjecutivoLegalizado').on("click", function () {
        $('#modal_asigna_digitalizacion_Legalizacion').modal('show');
    });





    $('#tblDigitalizacionAsignacion').on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function (e, row) {

        result.length = 0;
        var i = 0;
        $("input[type=checkbox]:checked").each(function () {


            if ($(this).parent().parent().find('td').eq(1).text() != "") {

                if ($(this).parent().parent().find('td').eq(4).text() == "Documentos Iniciales") {

                    result[i] = $(this).parent().parent().find('td').eq(1).text();
                    ++i;
                }

            }
        });
        $("#cantPensScheck").html(result['length'])

    });

    $('#tblDigitalizacionAsignacionLegalizado').on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function (e, row) {

        result_legalizados.length = 0;
        var i = 0;
        $("input[type=checkbox]:checked").each(function () {

            if ($(this).parent().parent().find('td').eq(1).text() != "") {

                if ($(this).parent().parent().find('td').eq(4).text() == "Documentos Legalizados") {

                    result_legalizados[i] = $(this).parent().parent().find('td').eq(1).text();
                    ++i;
                }

            }
        });
        $("#cantChecklegalizado").html(result_legalizados['length'])

    });




    $('#btn_buscar_legal').on("click", function () {
        asaignaDatos();

        metodos.CargaGrillaLegalizados(sessionStorage.getItem('txtrutLegal'), sessionStorage.getItem('txtcreditoLegal'), sessionStorage.getItem('ddlEstadosLegal'), sessionStorage.getItem('dt_fecha_venta_desdeLegal'), sessionStorage.getItem('dt_fecha_venta_hasta_Legal'), 'Todos');
        metodos.CargaGrillaConteoGestonLeaglizados(2);
        $("#conteoDocGeneral").text(0)
    });

    asaignaDatos();
    metodos.CargaGrillaLegalizados(sessionStorage.getItem('txtrutLegal'), sessionStorage.getItem('txtcreditoLegal'), sessionStorage.getItem('ddlEstadosLegal'), sessionStorage.getItem('dt_fecha_venta_desdeLegal'), sessionStorage.getItem('dt_fecha_venta_hasta_Legal'), 'Filtro');


    $('#btn_buscar').on("click", function () {

        asaignaDatos();

        metodos.CargaGrilla(sessionStorage.getItem('txtrut'), sessionStorage.getItem('txtcredito'), sessionStorage.getItem('ddlEstados'), sessionStorage.getItem('dt_fecha_venta_desde'), sessionStorage.getItem('dt_fecha_venta_hasta'), 'Todos');
        metodos.CargaGrillaConteoGestonGeneral(1);




    });

    metodos.CargaGrilla(sessionStorage.getItem('txtrut'), sessionStorage.getItem('txtcredito'), sessionStorage.getItem('ddlEstados'), sessionStorage.getItem('dt_fecha_venta_desde'), sessionStorage.getItem('dt_fecha_venta_hasta'), 'Filtro');

    //-------------------Tab Mis Reparos-----------------------------

    $('#btn_buscar_reparos').on("click", function () {

        asaignaDatos();

        metodos.CargaGrillaMisReparos(sessionStorage.getItem('txtrut'), sessionStorage.getItem('txtcredito'));
        metodos.CargaGrillaConteoMisReparos();
    });

    asaignaDatos();
    metodos.CargaGrillaMisReparos(sessionStorage.getItem('txtrut'), sessionStorage.getItem('txtcredito'));
    metodos.CargaGrillaConteoMisReparos();


    //----------------------conteo de Badge 

    metodos.CargaGrillaConteoGestonGeneral(1);

    metodos.CargaGrillaConteoGestonLeaglizados(2);


    //************************* Carga Grilla Agente*****************


    $('#btn_buscar_asignacion').on("click", function () {

        metodos.CargaGrillaAsginacion($("#dt_fecha_asignacion_desde").val(), $("#dt_fecha_asignacion_hasta").val(), 'Filtro', $("#ddlejecutivoAsignacion").val(), 1, $("#txtrutagenteDI").val(), $("#txtcreditoagenteDI").val(), $("#txtofertaagenteDI").val(), $("#ddlEstadosagenteDI").val(), 3)
        asaignaDatos();
    });
    asaignaDatos();
   
    metodos.CargaGrillaAsginacion('01-01-2021', $("#dt_fecha_asignacion_hasta").val(), 'Todos', $("#ddlejecutivoAsignacion").val(), 1, $("#ddlejecutivoAsignacion").val(), 1, $("#txtrutagenteDI").val(), $("#txtcreditoagenteDI").val(), $("#txtofertaagenteDI").val(), $("#ddlEstadosagenteDI").val(), 1)


    $('#btn_buscar_asignacionLegalizado').on("click", function () {

        metodos.CargaGrillaAsginacionLeaglizacion($("#dt_fecha_asignacion_desdeLegalizado").val(), $("#dt_fecha_asignacion_hastaLegalizado").val(), 'Filtro', $("#ddlejecutivoAsignacionLegalizado").val(), 2, $("#txtrutagenteDL").val(), $("#txtcreditoagenteDL").val(), $("#txtofertaagenteDL").val(), $("#ddlEstadosagenteDL").val())
        asaignaDatos();
    });
    asaignaDatos();

    metodos.CargaGrillaAsginacionLeaglizacion('01-01-2021', $("#dt_fecha_asignacion_hastaLegalizado").val(), 'Filtro', $("#ddlejecutivoAsignacionLegalizado").val(), 2, $("#txtrutagenteDL").val(), $("#txtcreditoagenteDL").val(), $("#txtofertaagenteDL").val(), $("#ddlEstadosagenteDL").val(), 5)




    //***********************Carga Grilla Reparo Agente**************************

    $('#btnmodalAsignacionEjecutivoReparo').on("click", function () {
        $('#modal_asigna_Reparos').modal('show');
    });


    $('#btn_buscar_asignacion_reparo').on("click", function () {

        metodos.CargaGrillaReparoAgente($("#dt_fecha_asignacion_reparo_desde").val(), $("#dt_fecha_asignacion_reparo_hasta").val(), 'Filtro', $("#ddlejecutivoAsignacionReparo").val(), $("#ddlTipo_asignacionReparo").val(), $("#txtrutagenteRep").val(), $("#txtcreditoagenteRep").val(), $("#txtofertaagenteRep").val(), $("#ddlEstadosagenteRep").val())
        asaignaDatos();
    });
    asaignaDatos();

    metodos.CargaGrillaReparoAgente('01-01-2021', $("#dt_fecha_asignacion_reparo_hasta").val(), 'Filtro', $("#ddlejecutivoAsignacionReparo").val(), $("#ddlTipo_asignacionReparo").val(), $("#txtrutagenteRep").val(), $("#txtcreditoagenteRep").val(), $("#txtofertaagenteRep").val(), $("#ddlEstadosagenteRep").val())



    $('#tblDigitalizacionAsignacionReparo').on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function (e, row) {




        result_reparos.length = 0;
        var i = 0;
        $("input[type=checkbox]:checked").each(function () {

            if ($(this).parent().parent().find('td').eq(1).text() != "") {

                if ($(this).parent().parent().find('td').eq(7).text() == "Reparado") {

                    result_reparos[i] = $(this).parent().parent().find('td').eq(1).text();
                    ++i;
                }

            }
        });
        $("#cantPensScheckReparo").html(result_reparos['length'])

    });

    $('#modal_asigna_Reparos').on('show.bs.modal', function (event) {

        let fechaHoy = new Date();
        let periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
        metodos.CargaGrillaejecutvo(periodo);

    });

    $('#modal_asigna_digitalizacion_Legalizacion').on('show.bs.modal', function (event) {

        let fechaHoy = new Date();
        let periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
        metodos.CargaGrillaejecutvoAsignacionLegalizacion(periodo);

    });


    $('#btAsignarAgenteReparo').on("click", function () {

        if ($("#ddlejecutivoReparo").val() == "0") {
            $.niftyNoty({
                type: 'danger',
                message: '<strong>Error , Debe seleccionar ejecutivo reparo</strong>',
                container: '#panelejecutivoReparo',
                timer: 3000
            });
            return false;
        }
        $.each(result_reparos, function (i, e) {

            var WebGestionDigitalizacion = {
                RutEjecutivo: $("#ddlejecutivoReparo").val(),
                Id_lead: result_reparos[i],
                oficina: getCookie("Oficina"),
                Tipo_Gestion: 1,
                Cargo: getCookie("Cargo"),
                TipoEjecutivo: 'EjecutivoReparo'
            }
            $.SecPostJSON(BASE_URL + "/motor/api/digitalizacion/Actualizar-Gestion-Ejecutivo", WebGestionDigitalizacion, function (respuesta) {

                if (respuesta.estado = 'OK') {

                    // $('#modal_asigna_Reparos').modal('hide');


                    metodos.CargaGrillaReparoAgente($("#dt_fecha_asignacion_reparo_desde").val(), $("#dt_fecha_asignacion_reparo_hasta").val(), 'Filtro', $("#ddlejecutivoAsignacionReparo").val(), $("#ddlTipo_asignacionReparo").val(), $("#txtrutagenteRep").val(), $("#txtcreditoagenteRep").val(), $("#txtofertaagenteRep").val(), $("#ddlEstadosagenteRep").val())

                    $.niftyNoty({
                        type: 'success',
                        message: '<strong>Exito<strong><li>Ejecutivo Asignado Correctamente</li>',
                        container: '#panelejecutivoReparo',
                        timer: 3000
                    });



                }

            })

        })
    });

    //******************Combo Ejecutvo*************
    let fechaHoy = new Date();
    let periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');

    metodos.CargaGrillaejecutvoAsignacion(periodo)

    //*************************** Click Digitalizacion************
    $('#btAsignarDigitalizacion').on("click", function () {


        if ($("#ddlejecutivo").val() == "0") {
            $.niftyNoty({
                type: 'danger',
                message: '<strong>Error , Debe seleccionar ejecutivo de asignación</strong>',
                container: '#panelejecutivo',
                timer: 3000
            });
            return false;
        }
        $.each(result, function (i, e) {

            var WebGestionDigitalizacion = {
                RutEjecutivo: $("#ddlejecutivo").val(),
                Id_lead: result[i],
                oficina: getCookie("Oficina"),
                Tipo_Gestion: 1,
                Cargo: getCookie("Cargo"),
                TipoEjecutivo: 'EjecutivoAsignado'
            }
       
            $.SecPostJSON(BASE_URL + "/motor/api/digitalizacion/Actualizar-Gestion-Ejecutivo", WebGestionDigitalizacion, function (respuesta) {

                if (respuesta.estado = 'OK') {

                    metodos.CargaGrillaAsginacion("01-01-2021", sessionStorage.getItem('dt_fecha_asignacion_hasta'), 'Filtro', $("#ddlejecutivoAsignacion").val(), 1, $("#txtrutagenteDI").val(), $("#txtcreditoagenteDI").val(), $("#txtofertaagenteDI").val(), $("#ddlEstadosagenteDI").val(), 2);
                    
                    

                }

            })

        })
        $("#modal_asigna_digitalizacion").modal('hide');
        $.niftyNoty({
            type: 'success',
            message: '<strong>Exito<strong><li>Ejecutivo Asignado Correctamente</li>',
            container: 'floating',
            timer: 3000
        });

    });

    //*********************************** Agente Digitalizacion Legles

    $('#btAsignarDigitalizacionLegalizados').on("click", function () {


        if ($("#ddlejecutivo_modal_Legalizacion").val() == "0") {
            $.niftyNoty({
                type: 'danger',
                message: '<strong>Error , Debe seleccionar ejecutivo de asignación</strong>',
                container: '#panelejecutivoLegallizacion',
                timer: 3000
            });
            return false;
        }
        $.each(result_legalizados, function (i, e) {

            var WebGestionDigitalizacion = {
                RutEjecutivo: $("#ddlejecutivo_modal_Legalizacion").val(),
                Id_lead: result_legalizados[i],
                oficina: getCookie("Oficina"),
                Tipo_Gestion: 2,
                Cargo: getCookie("Cargo"),
                TipoEjecutivo: 'EjecutivoAsignado'
            }
            
            $.SecPostJSON(BASE_URL + "/motor/api/digitalizacion/Actualizar-Gestion-Ejecutivo", WebGestionDigitalizacion, function (respuesta) {
                
                if (respuesta.estado = 'OK') {
                 
                    metodos.CargaGrillaAsginacionLeaglizacion("01-01-2021", $("#dt_fecha_asignacion_hastaLegalizado").val(), 'Filtro', $("#ddlejecutivoAsignacionLegalizado").val(), 2, $("#txtrutagenteDL").val(), $("#txtcreditoagenteDL").val(), $("#txtofertaagenteDL").val(), $("#ddlEstadosagenteDL").val(), 6)

               
                }

            })

        })
        $("#modal_asigna_digitalizacion_Legalizacion").modal('hide');
        $.niftyNoty({
            type: 'success',
            message: '<strong>Exito<strong><li>Ejecutivo Asignado Correctamente</li>',
            container: 'floating',
            timer: 3000
        });
    });



    //***************************** Auditor documentacion Inicial***************

    $('#btn_buscar_auditor').on("click", function () {

        if ($("#ddlOficina_Auditoria").val() == "-1") {
            $.niftyNoty({
                type: 'danger',
                message: '<strong>Debe Seleccionar una Oficina!!!<strong>',
                container: 'floating',
                timer: 3000
            });
            return false;
        }
        let fechaHoy = new Date();
        let periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
        // metodos.CargaComboOficinas();
        sessionStorage.setItem('ddlOficina_Auditoria', $("#ddlOficina_Auditoria").val());
        sessionStorage.setItem('ddlEjecutivo_Auditoria', $("#ddlEjecutivo_Auditoria").val());
        sessionStorage.setItem('dt_fecha_venta_desde_auditor', $("#dt_fecha_venta_desde_auditor").val());
        sessionStorage.setItem('dt_fecha_venta_hasta_auditor', $("#dt_fecha_venta_hasta_auditor").val());

        metodos.CargaGrillaAuditor($("#ddlEjecutivo_Auditoria").val(), $("#ddlOficina_Auditoria").val(), $("#dt_fecha_venta_desde_auditor").val(), $("#dt_fecha_venta_hasta_auditor").val(), 'Filtro', '1')
        // metodos.CargaComboejecutvoAuditoria(periodo, $("#ddlOficina_Auditoria").val());
    });




    $("#ddlEjecutivo_Auditoria").prop("disabled", true);
    metodos.CargaComboOficinas();


    if (sessionStorage.getItem('ddlEjecutivo_Auditoria') != null) {
        $("#ddlEjecutivo_Auditoria").val(sessionStorage.getItem('ddlEjecutivo_Auditoria'));
        $("#ddlEjecutivo_Auditoria").trigger("change")
    }

    if (sessionStorage.getItem('dt_fecha_venta_desde_auditor') != null)
        $("#dt_fecha_venta_desde_auditor").val(sessionStorage.getItem('dt_fecha_venta_desde_auditor'));


    if (sessionStorage.getItem('dt_fecha_venta_hasta_auditor') != null)
        $("#dt_fecha_venta_hasta_auditor").val(sessionStorage.getItem('dt_fecha_venta_hasta_auditor'));

    metodos.CargaGrillaAuditor(sessionStorage.getItem('ddlEjecutivo_Auditoria'), sessionStorage.getItem('ddlOficina_Auditoria'), $("#dt_fecha_venta_desde_auditor").val(), $("#dt_fecha_venta_hasta_auditor").val(), 'Todos', '1')

    $("#ddlOficina_Auditoria").on("change", function (e) {

        if ($("#ddlOficina_Auditoria").val() == "-1") {
            $("#ddlEjecutivo_Auditoria").prop("disabled", true);
            $("#ddlEjecutivo_Auditoria").html("")
        }
        else {
            metodos.CargaComboejecutvoAuditoria(periodo, $("#ddlOficina_Auditoria").val());
            $("#ddlEjecutivo_Auditoria").prop("disabled", false);
        }

    });

    //*********************Auditoria Documentos legalizados Set Varibales ********************************************


    $('#btn_buscar_auditor_legalizado').on("click", function () {

        if ($("#ddlOficina_Auditoria_legalizado").val() == "-1") {
            $.niftyNoty({
                type: 'danger',
                message: '<strong>Debe Seleccionar una Oficina!!!<strong>',
                container: 'floating',
                timer: 3000
            });
            return false;
        }
        let fechaHoy = new Date();
        let periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
        // metodos.CargaComboOficinas();
        sessionStorage.setItem('ddlOficina_Auditoria_Legalizado', $("#ddlOficina_Auditoria_legalizado").val());
        sessionStorage.setItem('ddlEjecutivo_Auditoria_Legalizado', $("#ddlEjecutivo_Auditoria_legalizado").val());
        sessionStorage.setItem('dt_fecha_venta_desde_auditor_Legalizado', $("#dt_fecha_venta_desde_auditor_legalizado").val());
        sessionStorage.setItem('dt_fecha_venta_hasta_auditor_legalizado', $("#dt_fecha_venta_hasta_auditor_legalizado").val());
        metodos.CargaGrillaAuditorLegalizados($("#ddlEjecutivo_Auditoria_legalizado").val(), $("#ddlOficina_Auditoria_legalizado").val(), $("#dt_fecha_venta_desde_auditor_legalizado").val(), $("#dt_fecha_venta_hasta_auditor_legalizado").val(), 'Filtro', '2')
        // metodos.CargaComboejecutvoAuditoria(periodo, $("#ddlOficina_Auditoria").val());
    });

    $("#ddlEjecutivo_Auditoria_legalizado").prop("disabled", true);
    metodos.CargaComboOficinaslegalizado();


    if (sessionStorage.getItem('ddlEjecutivo_Auditoria_Legalizado') != null) {
        $("#ddlEjecutivo_Auditoria_Legalizado").val(sessionStorage.getItem('ddlEjecutivo_Auditoria_Legalizado'));
        $("#ddlEjecutivo_Auditoria_Legalizado").trigger("change")
    }

    if (sessionStorage.getItem('dt_fecha_venta_desde_auditor_Legalizado') != null)
        $("#dt_fecha_venta_desde_auditor_legalizado").val(sessionStorage.getItem('dt_fecha_venta_desde_auditor_Legalizado'));
    if (sessionStorage.getItem('dt_fecha_venta_hasta_auditor_legalizado') != null)
        $("#dt_fecha_venta_hasta_auditor_legalizado").val(sessionStorage.getItem('dt_fecha_venta_hasta_auditor_legalizado'));
    if (sessionStorage.getItem('ddlEjecutivo_Auditoria_Legalizado') != null)
        metodos.CargaGrillaAuditorLegalizados(sessionStorage.getItem('ddlEjecutivo_Auditoria_Legalizado'), sessionStorage.getItem('ddlOficina_Auditoria_Legalizado'), sessionStorage.getItem('dt_fecha_venta_desde_auditor_Legalizado'), sessionStorage.getItem('dt_fecha_venta_hasta_auditor_legalizado'), 'Todos', '2')

    $("#ddlOficina_Auditoria_legalizado").on("change", function (e) {

        if ($("#ddlOficina_Auditoria_legalizado").val() == "-1") {
            $("#ddlEjecutivo_Auditoria_legalizado").prop("disabled", true);
            $("#ddlEjecutivo_Auditoria_legalizado").html("")
        }
        else {
            metodos.CargaComboejecutvoAuditoriaLegalizado(periodo, $("#ddlOficina_Auditoria_legalizado").val());
            $("#ddlEjecutivo_Auditoria_legalizado").prop("disabled", false);
        }

    });




    //*************************Tab Especialista***********************
    if (getCookie('Oficina') == "457") {




        if (sessionStorage.getItem('ddllOficinaEspecialista') != null)
            $("#ddllOficinaEspecialista").val(sessionStorage.getItem('ddllOficinaEspecialista'));

        if (sessionStorage.getItem('txtOfertaMcEspecialista') != null)
            $("#txtOfertaMcEspecialista").val(sessionStorage.getItem('txtOfertaMcEspecialista'));

        if (sessionStorage.getItem('ddlEstadosEspecialista') != null)
            $("#ddlEstadosEspecialista").val(sessionStorage.getItem('ddlEstadosEspecialista'));

        if (sessionStorage.getItem('dt_fecha_asignacion_especialista_desde') != null)
            $("#dt_fecha_asignacion_especialista_desde").val(sessionStorage.getItem('dt_fecha_asignacion_especialista_desde'));

        if (sessionStorage.getItem('dt_fecha_asignacion_especialista_hasta') != null)
            $("#dt_fecha_asignacion_especialista_hasta").val(sessionStorage.getItem('dt_fecha_asignacion_especialista_hasta'));


        if (sessionStorage.getItem('ddltipoDocEspecialista') != null)
            $("#ddltipoDocEspecialista").val(sessionStorage.getItem('ddltipoDocEspecialista'));


        if (sessionStorage.getItem('txtrutAfilEspecialista') != null)
            $("#txtrutAfilEspecialista").val(sessionStorage.getItem('txtrutAfilEspecialista'));

        if (sessionStorage.getItem('ddlZonaEspecialistaCurse') != null)
            $("#ddlZonaEspecialistaCurse").val(sessionStorage.getItem('ddlZonaEspecialistaCurse'));
        
        if (sessionStorage.getItem('ddllOficinaEspecialistaCurse') != null)
            $("#ddllOficinaEspecialistaCurse").val(sessionStorage.getItem('ddllOficinaEspecialistaCurse'));
        
        if (sessionStorage.getItem('ddlZonaEspecialistaPagadora') != null)
            $("#ddlZonaEspecialistaPagadora").val(sessionStorage.getItem('ddlZonaEspecialistaPagadora'));

        if (sessionStorage.getItem('ddllOficinaEspecialistaPagadora') != null)
            $("#ddllOficinaEspecialistaPagadora").val(sessionStorage.getItem('ddllOficinaEspecialistaPagadora'));

        metodos.CargarcomboZona();

        $("#ddlZonaEspecialista").on("change", function (e) {
          
            if ($("#ddlZonaEspecialista").val() == "-1") {
                $("#ddllOficinaEspecialista").prop("disabled", true);
                $("#ddllOficinaEspecialista").html("")
            }
            else {
                metodos.CargarComboOficinaZona($("#ddlZonaEspecialista").val());
                $("#ddllOficinaEspecialista").prop("disabled", false);
            }

        });
        $("#ddlZonaEspecialistaCurse").on("change", function (e) {

            if ($("#ddlZonaEspecialistaCurse").val() == "-1") {
                $("#ddllOficinaEspecialistaCurse").prop("disabled", true);
                $("#ddllOficinaEspecialistaCurse").html("")
            }
            else {
                metodos.CargarComboOficinaZonaCurse($("#ddlZonaEspecialistaCurse").val());
                $("#ddllOficinaEspecialistaCurse").prop("disabled", false);
            }

        });
        $("#ddlZonaEspecialistaPagadora").on("change", function (e) {

            if ($("#ddlZonaEspecialistaPagadora").val() == "-1") {
                $("#ddllOficinaEspecialistaPagadora").prop("disabled", true);
                $("#ddllOficinaEspecialistaPagadora").html("")
            }
            else {
                metodos.CargarComboOficinaZonaPagadora($("#ddlZonaEspecialistaPagadora").val());
                $("#ddllOficinaEspecialistaPagadora").prop("disabled", false);
            }

        });
    }


    $('#btn_buscar_asignacion_especialista').on("click", function () {
       
        //if ($("#ddlZonaEspecialista").val() == "-1") {
        //    $.niftyNoty({
        //        type: 'danger',
        //        message: '<strong>Error !!!</strong><li> Debe seleccionar Zona</li> ',
        //        container: 'floating',
        //        timer: 3000
        //    });
        //    return false;
        //}
       
        sessionStorage.setItem('ddllOficinaEspecialista', $("#ddllOficinaEspecialista").val());
        sessionStorage.setItem('txtOfertaMcEspecialista', $("#txtOfertaMcEspecialista").val());
        sessionStorage.setItem('ddlEstadosEspecialista', $("#ddlEstadosEspecialista").val());
        sessionStorage.setItem('dt_fecha_asignacion_especialista_desde', $("#dt_fecha_asignacion_especialista_desde").val());
        sessionStorage.setItem('dt_fecha_asignacion_especialista_hasta', $("#dt_fecha_asignacion_especialista_hasta").val());
        sessionStorage.setItem('ddltipoDocEspecialista', $("#ddltipoDocEspecialista").val());
        sessionStorage.setItem('txtrutAfilEspecialista', $("#txtrutAfilEspecialista").val());
        sessionStorage.setItem('ddlZonaEspecialista', $("#ddlZonaEspecialista").val());
        sessionStorage.setItem('ddlZonaEspecialistaCurse', $("#ddlZonaEspecialistaCurse").val());
        sessionStorage.setItem('ddllOficinaEspecialistaCurse', $("#ddllOficinaEspecialistaCurse").val());
        sessionStorage.setItem('ddlZonaEspecialistaPagadora', $("#ddlZonaEspecialistaPagadora").val());
        sessionStorage.setItem('ddllOficinaEspecialistaPagadora', $("#ddllOficinaEspecialistaPagadora").val());

       
        var Oficina;
        var OficinaCurse;
        var OficinaPagadora;
        if ($("#ddllOficinaEspecialista").val() == null)
            Oficina = "-1"
        else
            Oficina = $("#ddllOficinaEspecialista").val()

        if ($("#ddllOficinaEspecialistaCurse").val() == null)
            OficinaCurse = "-1"
        else
            OficinaCurse = $("#ddllOficinaEspecialistaCurse").val()


        if ($("#ddllOficinaEspecialistaPagadora").val() == null)
            OficinaPagadora = "-1"
        else
            OficinaPagadora = $("#ddllOficinaEspecialistaPagadora").val()

        sessionStorage.setItem('Oficina', Oficina);
        sessionStorage.setItem('OficinaCurse', OficinaCurse);
        sessionStorage.setItem('OficinaPagadora', OficinaPagadora);

        metodos.CargaGrillaEspecialista(Oficina, $("#txtOfertaMcEspecialista").val(), $("#ddlEstadosEspecialista").val(), $("#dt_fecha_asignacion_especialista_desde").val(), $("#dt_fecha_asignacion_especialista_hasta").val(), $("#ddltipoDocEspecialista").val(), $("#txtrutAfilEspecialista").val(), $("#ddlZonaEspecialista").val(), OficinaCurse, $("#ddlZonaEspecialistaCurse").val(), OficinaPagadora, $("#ddlZonaEspecialistaPagadora").val())
    });

    metodos.CargaGrillaEspecialista(sessionStorage.getItem("Oficina"), sessionStorage.getItem("txtOfertaMcEspecialista"), sessionStorage.getItem("ddlEstadosEspecialista"), sessionStorage.getItem("dt_fecha_asignacion_especialista_desde"), sessionStorage.getItem("dt_fecha_asignacion_especialista_hasta"), sessionStorage.getItem("ddltipoDocEspecialista"), sessionStorage.getItem("txtrutAfilEspecialista"), sessionStorage.getItem("ddlZonaEspecialista"), sessionStorage.getItem("OficinaCurse"), sessionStorage.getItem("ddlZonaEspecialistaCurse"), sessionStorage.getItem("OficinaPagadora"), sessionStorage.getItem("ddlZonaEspecialistaPagadora"))

   
    $('#btn-exportar-especialistas').click(function () {
        var Oficina;
        var OficinaCurse;
        var OficinaPagadora;
        if ($("#ddllOficinaEspecialista").val() == null)
            Oficina = "-1"
        else
            Oficina = $("#ddllOficinaEspecialista").val()

        if ($("#ddllOficinaEspecialistaCurse").val() == null)
            OficinaCurse = "-1"
        else
            OficinaCurse = $("#ddllOficinaEspecialistaCurse").val()


        if ($("#ddllOficinaEspecialistaPagadora").val() == null)
            OficinaPagadora = "-1"
        else
            OficinaPagadora = $("#ddllOficinaEspecialistaPagadora").val()


        location.href = BASE_URL + "/motor/api/digitalizacion/exportar-especialistas?CodOficina=" + Oficina + "&Oferta=" + $("#txtOfertaMcEspecialista").val() + "&Estado=" + $("#ddlEstadosEspecialista").val() + "&FechaDesde=" + $("#dt_fecha_asignacion_especialista_desde").val() + "&FechaHasta=" + $("#dt_fecha_asignacion_especialista_hasta").val() + "&tipo=" + $("#ddltipoDocEspecialista").val() + "&rut=" + $("#txtrutAfilEspecialista").val() + "&zona=" + $("#ddlZonaEspecialista").val() + "&OficinaCurse=" + OficinaCurse + "&ZonaCurse=" + $("#ddlZonaEspecialistaCurse").val() + "&OficinaPagadora=" + OficinaPagadora + "&ZonaPagadora=" + $("#ddlZonaEspecialistaPagadora").val()+" ";

    });


    $('#index-dp-component .input-group.date').datepicker({
        autoclose: true,
        format: 'dd-mm-yyyy',
        language: "es",
        // daysOfWeekDisabled: [6, 0],
        todayHighlight: true,
        //startDate: '-7d'
    }
    ).on('changeDate', function (e) {
        //cargador.CargaDatosTabla($("#fechahoy").val());
        //cargador.CargaDatosEncabezado($("#fechahoy").val());
    });




});