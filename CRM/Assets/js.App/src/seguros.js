jQuery.support.cors = true;
var appSeguro = new Vue({
    el: '#MDL_Primario',

    mounted() {
    },
    methods: {

        cargalistaSeguros() {
            let oficina = getCookie('Oficina')
            fetch(`http://${motor_api_server}:4002/seguros/lead-seguros/${oficina}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    if (datos.length > 0) {
                        $("#tblSeguros").bootstrapTable('load', datos);
                    }
                });
        },

        cargaDetalleSeguros() {
            let oficina = getCookie('Oficina')
            let fechaHoy = new Date();
            let periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
            let fecha = $('#dp-fecha-detalle-seguros').val()

            fetch(`http://${motor_api_server}:4002/seguros/lead-detalle-seguros/${oficina}/${periodo}/${fecha}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    if (datos.length > 0) {
                        $("#tblDetalleSeguros").bootstrapTable('load', datos);
                    }
                });
        },

        loadTablaSeguros() {
            $("#tblSeguros").bootstrapTable();
        },
        buscaSeguroFechaRut() {
            let oficina = getCookie('Oficina')
            let rut = $('#seguro_rut_busc').val()
            if (rut == "") {
                rut = "0"
            }

            let fecha = $('#dp-fecha-seguros').val()
            fetch(`http://${motor_api_server}:4002/seguros/busca-seguros/${oficina}/${rut}/${fecha}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    if (datos.length > 0) {
                        $("#tblSeguros").bootstrapTable('load', datos);
                    }
                    else {
                        $("#tblSeguros").bootstrapTable('load', []);
                    }
                });
        },

    }
});


function sDesgravamenFormatter(value, row, index) {

    if (row.sDesgravamen > 0) {
        return `<span class="pull-center  badge badge-success">${row.sDesgravamen}</span>`
    }
    else {
        return `<span class="pull-center  badge badge-success" style="background-color: #607D8B;">${row.sDesgravamen}</span>`
    }
}

function sAccidentePersonalesFormatter(value, row, index) {

    if (row.sAccidentePersonales > 0) {
        return `<span class="pull-center  badge badge-success">${row.sAccidentePersonales}</span>`
    }
    else {
        return `<span class="pull-center  badge badge-success" style="background-color: #607D8B;">${row.sAccidentePersonales}</span>`
    }
}

function sCesantianFormatter(value, row, index) {

    if (row.sCesantia > 0) {
        return `<span class="pull-center  badge badge-success">${row.sCesantia}</span>`
    }
    else {
        return `<span class="pull-center  badge badge-success" style="background-color: #607D8B;">${row.sCesantia}</span>`
    }
}

function sVidaFormatter(value, row, index) {

    if (row.sVida > 0) {
        return `<span class="pull-center  badge badge-success">${row.sVida}</span>`
    }
    else {
        return `<span class="pull-center  badge badge-success" style="background-color: #607D8B;">${row.sVida}</span>`
    }
}

function sHogarFormatter(value, row, index) {

    if (row.sHogar > 0) {
        return `<span class="pull-center  badge badge-success">${row.sHogar}</span>`
    }
    else {
        return `<span class="pull-center  badge badge-success" style="background-color: #607D8B;">${row.sHogar}</span>`
    }
}



$(function () {
    $('#btNewContato').on('click', function (event) {
        $('#newContacto').css('display', 'block')
    });

    $(function () {



        $('#dp-fecha-detalle-seguros').datepicker({
            format: 'yyyy-mm-dd',
            autoclose: true,
            language: "es",
            daysOfWeekDisabled: [6, 0],
        });
        $('#dp-fecha-detalle-seguros').datepicker("setDate", new Date());

        $('#txtFechaModalSeguro').datepicker({
            format: 'yyyy-mm-dd',
            autoclose: true,
            language: "es",
            daysOfWeekDisabled: [6, 0],
        });
        $('#txtFechaModalSeguro').datepicker("setDate", new Date());

        $('#dp-fecha-seguros').datepicker({
            format: 'yyyy-mm-dd',
            autoclose: true,
            language: "es",
            daysOfWeekDisabled: [6, 0],
        });
        $('#dp-fecha-seguros').datepicker("setDate", new Date());


        //$('#dp-fecha-seguros .input-group.date').datepicker(
        //    {
        //        autoclose: true,
        //        format: 'dd-mm-yyyy',
        //        language: "es",
        //        daysOfWeekDisabled: [6, 0],
        //        todayHighlight: true
        //    }
        //)
    });

});


var appModalSeguro = new Vue({
    el: '#modal-seguros',

    mounted() {

    },
    methods: {

        handleGuardaSeguro() {

            const formData = {
                rut: $('#modal_seguro_rut_busc').val(),
                fecha_venta: $('#txtFechaModalSeguro').val(),
                ejecutivo_ingreso: getCookie('Rut'),
                oficina: getCookie('Oficina'),
                s_desgravamen: $('#txtDesgravamen').val(),
                s_cesantia: $('#txtCesantia').val(),
                s_vida: $('#txtVida').val(),
                s_hogar: $('#txtHogar').val(),
                s_accidente_personales: $('#txtAccidentes').val(),
                tipo_afiliado: $('select[name="slTipoAsegurado"] option:selected').text(),
            };

            if ($('#slTipoAsegurado').val() == 0) {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe seleccionar un tipo de Asegurado.',
                    container: '#msjMantSeguros',
                    timer: 3000
                });
                return false;
            }


            if ($('#modal_seguro_rut_busc').val() == "") {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar un Rut valido antes de guardar.',
                    container: '#msjMantSeguros',
                    timer: 3000
                });
                return false;
            }

            if ($('#txtFechaModalSeguro').val() == "") {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar una fecha antes de guardar.',
                    container: '#msjMantSeguros',
                    timer: 3000
                });
                return false;
            }

            fetch(`http://${motor_api_server}:4002/seguros`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'Token': getCookie('Token')
                }
            }).then(async (response) => {
                if (!response.ok) {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Error al intentar guardar seguros.',
                        container: '#msjMantSeguros',
                        timer: 3000
                    });
                    return false;
                }
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Seguro Guardado correctamente.',
                    container: '#msjMantSeguros',
                    timer: 3000
                });
                appSeguro.cargalistaSeguros();
                appSeguro.cargaDetalleSeguros();
            });
        }
    }
});


$("#btnExport").click(function (e) {
    let oficina = getCookie('Oficina')
    let fechaHoy = new Date();
    let periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
    $("#bdy_detalleSeguroDatos").html("");
    let fecha = $('#dp-fecha-detalle-seguros').val()

    fetch(`http://${motor_api_server}:4002/seguros/lead-detalle-seguros/${oficina}/${periodo}/${fecha}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    })
        .then(response => response.json())
        .then(datos => {
            if (datos.length > 0) {

                var data = [];
                $.each(datos, function (i, e) {
                    data.push([e.ejecutivo_ingreso, e.nombreEjecutivo, e.sDesgravamen, e.sCesantia, e.sVida, e.sHogar, e.sAccidentePersonales]);
                });

                let fechaPdf = new Date()
                let fPdf = fechaPdf.getDate().toString() + (fechaPdf.getMonth() + 1).toString().padStart(2, '0') + fechaPdf.getFullYear().toString();

                var pdf = new jsPDF();
                pdf.text(15, 15, "Detalle venta seguros por ejecutivos");
                var columns = ["Rut Ejecutivo", "Nombre Ejecutivo", "S. Desgravamen", "S. Cesantía", "S. Vida", "S. Hogar", "S. Accidentes Personales"];

                pdf.autoTable(columns, data,
                    { margin: { top: 25 } }
                );

                pdf.save('Detalle_seguro_' + fPdf + '.pdf');
            }
        });
});


$('#slTipoAsegurado').change(function (e) {
    e.preventDefault();
    if ($(this).val() == 1) {
        $("#modal_seguro_rut_busc").prop("disabled", false);
        $("#txtFechaModalSeguro").prop("disabled", false);
        $("#checkbox-cesantia").prop("checked", false);
        $("#checkbox-cesantia").prop("disabled", false);
        $('#txtCesantia').val("0")

        // HabilitaBotonesMasMenos()
        habilitaCheckSeguros();
    }
    else if ($(this).val() == 2) {
        $("#modal_seguro_rut_busc").prop("disabled", false);
        $("#txtFechaModalSeguro").prop("disabled", false);

        $("#checkbox-cesantia").prop("checked", false);
        $("#checkbox-cesantia").prop("disabled", true);
        $('#txtCesantia').val("0")
        //  HabilitaBotonesMasMenos();

        $("#btMasCesantia").prop('disabled', true);
        $("#btMenosCesantia").prop('disabled', true);


        habilitaCheckSeguros();
        $("#checkbox-cesantia").prop("disabled", true);

    }
    else if ($(this).val() == 0) {
        $("#modal_seguro_rut_busc").prop("disabled", true);
        $("#txtFechaModalSeguro").prop("disabled", true);
        $("#checkbox-cesantia").prop("disabled", false);
        $("#checkbox-cesantia").prop("checked", false);
        $('#txtCesantia').val("0")

        desabilitaCheckSeguros();
        desabilitaBotonesMasMenos();

        $('#txtDesgravamen').val('0');
        $('#txtCesantia').val('0');
        $('#txtVida').val('0');
        $('#txtHogar').val('0');
        $('#txtAccidentes').val('0');

    }
});

function habilitaCheckSeguros() {
    $("#checkbox-desgravamen").prop("disabled", false);
    $("#checkbox-cesantia").prop("disabled", false);
    $("#checkbox-vida").prop("disabled", false);
    $("#checkbox-hogar").prop("disabled", false);
    $("#checkbox-accidentes").prop("disabled", false);
}

function desabilitaCheckSeguros() {
    $("#checkbox-desgravamen").prop("disabled", true);
    $("#checkbox-cesantia").prop("disabled", true);
    $("#checkbox-vida").prop("disabled", true);
    $("#checkbox-hogar").prop("disabled", true);
    $("#checkbox-accidentes").prop("disabled", true);

    $("#checkbox-desgravamen").prop("checked", false);
    $("#checkbox-cesantia").prop("checked", false);
    $("#checkbox-vida").prop("checked", false);
    $("#checkbox-hogar").prop("checked", false);
    $("#checkbox-accidentes").prop("checked", false);
}

function desabilitaBotonesMasMenos() {
    $("#btMenosDesgravamen").prop('disabled', true);
    $("#btMasDesgravamen").prop('disabled', true);

    $("#btMasCesantia").prop('disabled', true);
    $("#btMenosCesantia").prop('disabled', true);

    $("#btMenosVida").prop('disabled', true);
    $("#btMasVida").prop('disabled', true);

    $("#btMenosHogar").prop('disabled', true);
    $("#btMasHogar").prop('disabled', true);

    $("#btMenosAccidentes").prop('disabled', true);
    $("#btMasAccidentes").prop('disabled', true);
}

function HabilitaBotonesMasMenos() {
    $("#btMenosDesgravamen").prop('disabled', false);
    $("#btMasDesgravamen").prop('disabled', false);

    $("#btMasCesantia").prop('disabled', false);
    $("#btMenosCesantia").prop('disabled', false);

    $("#btMenosVida").prop('disabled', false);
    $("#btMasVida").prop('disabled', false);

    $("#btMenosHogar").prop('disabled', false);
    $("#btMasHogar").prop('disabled', false);

    $("#btMenosAccidentes").prop('disabled', false);
    $("#btMasAccidentes").prop('disabled', false);
}




$('#btMasDesgravamen').click(function () {
    let valor = parseInt($('#txtDesgravamen').val());
    valor = valor + 1
    $('#txtDesgravamen').val(valor);
});
$('#btMenosDesgravamen').click(function () {
    let valor = parseInt($('#txtDesgravamen').val());
    if (valor > 0) {
        valor = valor - 1
        $('#txtDesgravamen').val(valor);
    }
    else {
        $('#txtDesgravamen').val('0');
    }
});

$('#btMenosCesantia').click(function () {
    let valor = parseInt($('#txtCesantia').val());
    if (valor > 0) {
        valor = valor - 1
        $('#txtCesantia').val(valor);
    }
    else {
        $('#txtCesantia').val('0');
    }
});

$('#btMasVida').click(function () {
    let valor = parseInt($('#txtVida').val());
    valor = valor + 1
    $('#txtVida').val(valor);
});
$('#btMenosVida').click(function () {
    let valor = parseInt($('#txtVida').val());
    if (valor > 0) {
        valor = valor - 1
        $('#txtVida').val(valor);
    }
    else {
        $('#txtVida').val('0');
    }
});

$('#btMasHogar').click(function () {
    let valor = parseInt($('#txtHogar').val());
    valor = valor + 1
    $('#txtHogar').val(valor);
});
$('#btMenosHogar').click(function () {
    let valor = parseInt($('#txtHogar').val());
    if (valor > 0) {
        valor = valor - 1
        $('#txtHogar').val(valor);
    }
    else {
        $('#txtHogar').val('0');
    }
});

$('#btMasAccidentes').click(function () {
    let valor = parseInt($('#txtAccidentes').val());
    valor = valor + 1
    $('#txtAccidentes').val(valor);
});
$('#btMenosAccidentes').click(function () {
    let valor = parseInt($('#txtAccidentes').val());
    if (valor > 0) {
        valor = valor - 1
        $('#txtAccidentes').val(valor);
    }
    else {
        $('#txtAccidentes').val('0');
    }
});

$('#checkbox-desgravamen').on('click', function () {
    if ($(this).is(':checked')) {
        $('#txtDesgravamen').val('1');
        $("#btMasDesgravamen").prop('disabled', false);
        $("#btMenosDesgravamen").prop('disabled', false);
    } else {
        $('#txtDesgravamen').val('0');
        $("#btMasDesgravamen").prop('disabled', true);
        $("#btMenosDesgravamen").prop('disabled', true);
    }
});

$('#checkbox-cesantia').on('click', function () {
    if ($(this).is(':checked')) {
        $('#txtCesantia').val('1');
        $("#btMasCesantia").prop('disabled', false);
        $("#btMenosCesantia").prop('disabled', false);
    } else {
        $('#txtCesantia').val('0');
        $("#btMasCesantia").prop('disabled', true);
        $("#btMenosCesantia").prop('disabled', true);
    }
});

$('#checkbox-vida').on('click', function () {
    if ($(this).is(':checked')) {
        $('#txtVida').val('1');
        $("#btMenosVida").prop('disabled', false);
        $("#btMasVida").prop('disabled', false);
    } else {
        $('#txtVida').val('0');
        $("#btMenosVida").prop('disabled', true);
        $("#btMasVida").prop('disabled', true);
    }
});

$('#checkbox-hogar').on('click', function () {
    if ($(this).is(':checked')) {
        $('#txtHogar').val('1');
        $("#btMenosHogar").prop('disabled', false);
        $("#btMasHogar").prop('disabled', false);
    } else {
        $('#txtHogar').val('0');
        $("#btMenosHogar").prop('disabled', true);
        $("#btMasHogar").prop('disabled', true);
    }
});

$('#checkbox-accidentes').on('click', function () {
    if ($(this).is(':checked')) {
        $('#txtAccidentes').val('1');

        $("#btMenosAccidentes").prop('disabled', false);
        $("#btMasAccidentes").prop('disabled', false);
    } else {
        $('#txtAccidentes').val('0');

        $("#btMenosAccidentes").prop('disabled', true);
        $("#btMasAccidentes").prop('disabled', true);
    }
});

$("#modal-seguros").on("hidden.bs.modal", function () {
    $("#checkbox-cesantia").prop("checked", false);
    $("#checkbox-vida").prop("checked", false);
    $("#checkbox-hogar").prop("checked", false);
    $("#checkbox-accidentes").prop("checked", false);

    $('#txtDesgravamen').val('0');
    $('#txtCesantia').val('0');
    $('#txtVida').val('0');
    $('#txtHogar').val('0');
    $('#txtAccidentes').val('0');
    $('#modal_seguro_rut_busc').val("");
    $('#txtFechaModalSeguro').datepicker("setDate", new Date());
    $('#slTipoAsegurado').val("0")
    desabilitaBotonesMasMenos();
    desabilitaCheckSeguros();

});








