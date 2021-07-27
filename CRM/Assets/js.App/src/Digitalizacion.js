function digitalLinkFormatter(value, row, index) {

    return `<a class="btn btn-primary mar-lft btn-rounded" title="Seguimiento" href="/motor/App/digitalizacion/gestion?ci=${row.Id}&aud=none"><i class="ion-search btn-rounded"></i></a>`;
}

function digitalLegaLinkFormatter(value, row, index) {

    return `<a class="btn btn-primary mar-lft btn-rounded" title="Seguimiento" href="/motor/App/digitalizacion/gestionlegalizados?ci=${row.Id}&aud=none"><i class="ion-search btn-rounded"></i></a>`;
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
    CargaGrillaAsginacionMisReparos: function (FechaVentaDesde, FechaVentaHasta, Filtro, Ejecutivo, Tipo) {

        $("#tblDigitalizacionAsignacion").bootstrapTable('refresh', {
            url: '/motor/api/digitalizacion/listar-digitalizacion-Agente',
            query: {
                RutEjecutivo: Ejecutivo,
                FechaVentaDesde: FechaVentaDesde,
                FechaVentaHasta: FechaVentaHasta,
                Oficina: getCookie("Oficina"),
                Tipo: Tipo,
                Filtro: Filtro,

            }
        });

    },
    CargaGrillaAsginacion: function (FechaVentaDesde, FechaVentaHasta, Filtro, Ejecutivo, Tipo) {

        $("#tblDigitalizacionAsignacion").bootstrapTable('refresh', {
            url: '/motor/api/digitalizacion/listar-digitalizacion-Agente',
            query: {
                RutEjecutivo: Ejecutivo,
                FechaVentaDesde: FechaVentaDesde,
                FechaVentaHasta: FechaVentaHasta,
                Oficina: getCookie("Oficina"),
                Tipo: Tipo,
                Filtro: Filtro,

            }
        });
        $.SecGetJSON(BASE_URL + "/motor/api/digitalizacion/listar-digitalizacion-Agente", { RutEjecutivo: Ejecutivo, FechaVentaDesde: FechaVentaDesde, FechaVentaHasta: FechaVentaHasta, Oficina: getCookie("Oficina"), Tipo: Tipo, Filtro: Filtro }, function (response) {

            $("#conteoAgenteDigit").text(response.length);

        });

    },
    CargaGrillaAsginacionLeaglizacion: function (FechaVentaDesde, FechaVentaHasta, Filtro, Ejecutivo, Tipo) {

        $("#tblDigitalizacionAsignacionLegalizado").bootstrapTable('refresh', {
            url: '/motor/api/digitalizacion/listar-digitalizacion-Agente',
            query: {
                RutEjecutivo: Ejecutivo,
                FechaVentaDesde: FechaVentaDesde,
                FechaVentaHasta: FechaVentaHasta,
                Oficina: getCookie("Oficina"),
                Tipo: Tipo,
                Filtro: Filtro,

            }
        });
        $.SecGetJSON(BASE_URL + "/motor/api/digitalizacion/listar-digitalizacion-Agente", { RutEjecutivo: Ejecutivo, FechaVentaDesde: FechaVentaDesde, FechaVentaHasta: FechaVentaHasta, Oficina: getCookie("Oficina"), Tipo: Tipo, Filtro: Filtro }, function (response) {

            $("#conteoAgenteLegalizadoDigit").text(response.length);

        });

    },
    CargaGrillaReparoAgente: function (FechaVentaDesde, FechaVentaHasta, Filtro, Ejecutivo, Tipo) {

        $("#tblDigitalizacionAsignacionReparo").bootstrapTable('refresh', {
            url: '/motor/api/digitalizacion/listar-digitalizacion-Reparo-Agente',
            query: {
                RutEjecutivo: Ejecutivo,
                FechaVentaDesde: FechaVentaDesde,
                FechaVentaHasta: FechaVentaHasta,
                Oficina: getCookie("Oficina"),
                Tipo: Tipo,
                Filtro: Filtro,

            }
        });
        $.SecGetJSON(BASE_URL + "/motor/api/digitalizacion/listar-digitalizacion-Reparo-Agente", { RutEjecutivo: Ejecutivo, FechaVentaDesde: FechaVentaDesde, FechaVentaHasta: FechaVentaHasta, Oficina: getCookie("Oficina"), Tipo: Tipo, Filtro: Filtro }, function (response) {

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
                debugger;
                $("#ddlejecutivo_modal_Legalizacion").append($("<option>").val(datos.Rut).html(datos.Nombre).data("rut", datos.Rut).data("nombre", datos.Nombre));
            });

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
    else {
        $('#tab_Agente').css('display', 'none')
        $('#tab_Agente').css('display', 'none')
        $('#tab_misreparos').css('display', 'block')
        $('#tab_ingreso').css('display', 'block')
        $('#tab_documentos').css('display', 'block')
        $('#tab_misreparos_Agente').css('display', 'none')
        $('#tab_Agente_Legalizados').css('display', 'none')

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



    //*************************Modal Ejecutvo Asignacion ***********************

    $('#modal_asigna_digitalizacion').on('show.bs.modal', function (event) {

        let fechaHoy = new Date();
        let periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
        metodos.CargaGrillaejecutvo(periodo);

    });



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
        debugger;
        result.length = 0;
        var i = 0;
        $("input[type=checkbox]:checked").each(function () {
            debugger;

            if ($(this).parent().parent().find('td').eq(1).text() != "") {
                debugger;
                if ($(this).parent().parent().find('td').eq(4).text() == "Documentos Iniciales") {
                    debugger;
                    result[i] = $(this).parent().parent().find('td').eq(1).text();
                    ++i;
                }

            }
        });
        $("#cantPensScheck").html(result['length'])

    });

    $('#tblDigitalizacionAsignacionLegalizado').on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function (e, row) {
        debugger;
        result_legalizados.length = 0;
        var i = 0;
        $("input[type=checkbox]:checked").each(function () {

            if ($(this).parent().parent().find('td').eq(1).text() != "") {
                debugger;
                if ($(this).parent().parent().find('td').eq(4).text() == "Documentos Legalizados") {
                    debugger;
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
    });

    asaignaDatos();
    metodos.CargaGrillaMisReparos(sessionStorage.getItem('txtrut'), sessionStorage.getItem('txtcredito'));
    metodos.CargaGrillaConteoMisReparos();


    //----------------------conteo de Badge 

    metodos.CargaGrillaConteoGestonGeneral(1);

    metodos.CargaGrillaConteoGestonLeaglizados(2);


    //************************* Carga Grilla Agente*****************


    $('#btn_buscar_asignacion').on("click", function () {

        metodos.CargaGrillaAsginacion($("#dt_fecha_asignacion_desde").val(), $("#dt_fecha_asignacion_hasta").val(), 'Filtro', $("#ddlejecutivoAsignacion").val(), 1)
        asaignaDatos();
    });
    asaignaDatos();

    metodos.CargaGrillaAsginacion('01-01-2021', $("#dt_fecha_asignacion_hasta").val(), 'Filtro', $("#ddlejecutivoAsignacion").val(), 1)


    $('#btn_buscar_asignacionLegalizado').on("click", function () {

        metodos.CargaGrillaAsginacionLeaglizacion($("#dt_fecha_asignacion_desdeLegalizado").val(), $("#dt_fecha_asignacion_hastaLegalizado").val(), 'Filtro', $("#ddlejecutivoAsignacionLegalizado").val(), 2)
        asaignaDatos();
    });
    asaignaDatos();

    metodos.CargaGrillaAsginacionLeaglizacion('01-01-2021', $("#dt_fecha_asignacion_hastaLegalizado").val(), 'Filtro', $("#ddlejecutivoAsignacionLegalizado").val(), 2)




    //***********************Carga Grilla Reparo Agente**************************

    $('#btnmodalAsignacionEjecutivoReparo').on("click", function () {
        $('#modal_asigna_Reparos').modal('show');
    });


    $('#btn_buscar_asignacion_reparo').on("click", function () {

        metodos.CargaGrillaReparoAgente($("#dt_fecha_asignacion_reparo_desde").val(), $("#dt_fecha_asignacion_reparo_hasta").val(), 'Filtro', $("#ddlejecutivoAsignacionReparo").val(), $("#ddlTipo_asignacionReparo").val())
        asaignaDatos();
    });
    asaignaDatos();

    metodos.CargaGrillaReparoAgente('01-01-2021', $("#dt_fecha_asignacion_reparo_hasta").val(), 'Filtro', $("#ddlejecutivoAsignacionReparo").val(), $("#ddlTipo_asignacionReparo").val())



    $('#tblDigitalizacionAsignacionReparo').on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function (e, row) {



        debugger;
        result_reparos.length = 0;
        var i = 0;
        $("input[type=checkbox]:checked").each(function () {

            if ($(this).parent().parent().find('td').eq(1).text() != "") {
                debugger;
                if ($(this).parent().parent().find('td').eq(7).text() == "Reparado") {
                    debugger;
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
        debugger;
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

                 
                    metodos.CargaGrillaReparoAgente($("#dt_fecha_asignacion_reparo_desde").val(), $("#dt_fecha_asignacion_reparo_hasta").val(), 'Filtro', $("#ddlejecutivoAsignacionReparo").val(), $("#ddlTipo_asignacionReparo").val())

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

                    metodos.CargaGrillaAsginacion("01-01-2021", sessionStorage.getItem('dt_fecha_asignacion_hasta'), 'Filtro', sessionStorage.getItem('ddlejecutivoAsignacion'), (sessionStorage.getItem('ddlTipo_asignacion')));

                    if (result['length'] - 1 == i + 1) {

                        $.niftyNoty({
                            type: 'success',
                            message: '<strong>Exito<strong><li>Ejecutivo Asignado Correctamente</li>',
                            container: '#panelejecutivo',
                            timer: 3000
                        });

                    }

                }

            })

        })
    });

    //*********************************** Agente Digitalizacion Legles

    $('#btAsignarDigitalizacionLegalizados').on("click", function () {

        debugger;
        if ($("#ddlejecutivo_modal_Legalizacion").val() == "0") {
            $.niftyNoty({
                type: 'danger',
                message: '<strong>Error , Debe seleccionar ejecutivo de asignación</strong>',
                container: '#panelejecutivoLegallizacion',
                timer: 3000
            });
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

                    metodos.CargaGrillaAsginacionLeaglizacion("01-01-2021", $("#dt_fecha_asignacion_hastaLegalizado").val(), 'Filtro', $("#ddlejecutivoAsignacionLegalizado").val(), 2)


                    $.niftyNoty({
                        type: 'success',
                        message: '<strong>Exito<strong><li>Ejecutivo Asignado Correctamente</li>',
                        container: '#panelejecutivoLegallizacion',
                        timer: 3000
                    });
                  

                }

            })

        })
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