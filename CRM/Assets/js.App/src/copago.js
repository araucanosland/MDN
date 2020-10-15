jQuery.support.cors = true;
var appCopago = new Vue({
    el: '#divCopago',
    data: {
        filtros: {
            estados: [],
            subEstados: [],
        },
        modelos: {
            estados: '',
            subEstados: '',
        }
    },
    mounted() {
        // this.obtenerLead();
        this.obtenerEstados();
    },
    methods: {

        obtenerEstados() {
            let padre = 0;
            fetch(`http://${motor_api_server}:4002/copago/lista-estados/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.estados = estadosJSON;
                });
        },
        obtenerSubEstados(padre) {
            fetch(`http://${motor_api_server}:4002/copago/lista-estados/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosSubJSON => {
                    this.filtros.subEstados = estadosSubJSON;
                });
        },

        eventoCambiaEstadoCopago() {
            this.obtenerSubEstados(this.modelos.estados)
        },

        cargaLeadFiltroCall() {

            var fechaHoy = new Date();
            var periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
            let estado = $('select[name="dllEstadoCopago"] option:selected').text()
            let subEstado = $('select[name="dllSubEstadoCopago"] option:selected').text()
            if (estado == 'Todos...') {
                estado = ""
            }
            if (subEstado == 'Todos...') {
                subEstado = ""
            }

            $("#tblCopago").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/copago/lead-copago`,
                query: {
                    estado: estado,
                    sub_estado: subEstado,
                    rut_completo: $('#txtRutFiltroCopago').val(),
                    periodo: periodo,
                    rut_ejecutivo: getCookie('Rut'),
                    oficina: getCookie('Oficina'),
                }
            });
        },
    }
});

function formaterRut(value, row, index) {
    return `<a href="#" class="btn-link" data-target="#modal_copago" data-toggle="modal" data-rutempresa="${row.rut_empresa}" data-dvempresa="${row.dv_empresa}" data-promedio="${row.promedio_renta}" data-promedioanterior="${row.promedio_renta_anterior}" data-empresa="${row.empresa}" data-lead="${row.id}" data-nombre="${row.nombre}" data-rut="${row.rut_completo}" >${row.rut_completo}</a>`;
}

function formatoRutEmpresa(value, row, index) {
    return row.rut_empresa + '-' + row.dv_empresa
}

var appConsultaCopago = new Vue({
    el: '#tab-consulta',
    mounted() {

    },
    methods: {

        consultaReasignacion() {
            let rut = $('#txtIngRutSearch').val();
            var fechaHoy = new Date();
            var periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
            $('#tituloAfiliado').html('')
            $('#ejecutivoTitulo').html('')

            fetch(`http://${motor_api_server}:4002/copago/lead-copago-consulta/${rut}/${periodo}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    if (datos.length > 0) {
                        if (datos[0].ejecutivo != '') {
                            $('#tituloAfiliado').html(datos[0].nombre + '  Rut: ' + datos[0].rut_completo)
                            $('#ejecutivoTitulo').html('Asignado a Ejecutivo : ' + datos[0].nom_ejecutivo + '  -------    Oficina : ' + datos[0].oficina)
                            $('#tituloBotones').css('display', 'none')
                            $('#divIngreso').css('display', 'none')
                            $('#txtIngRutSearch').val('')
                            $('#alertSearchTitulo').css('display', 'block')
                        }
                        else if (datos[0].ejecutivo == '') {
                            $('#tituloBotones').css('display', 'none')
                            $('#tituloAfiliado').html(datos[0].nombre + '  Rut: ' + datos[0].rut_completo)
                            $('#ejecutivoTitulo').html('RUT no se encuentra asignado. Se reasignara a la brevedad..')
                            $('#txtIngRutSearch').val('')
                            $('#alertSearchTitulo').css('display', 'block')

                            const formData = {
                                rut: datos[0].rut_completo,
                                nombre: datos[0].nombre,
                                oficina_ingreso: parseInt(getCookie('Oficina')),
                                ejecutivo_ingreso: getCookie('Rut'),
                            }

                            fetch(`http://${motor_api_server}:4002/copago/reasignacion-log-copago`, {
                                method: 'POST',
                                body: JSON.stringify(formData),
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Token': getCookie('Token')
                                }
                            });
                        }
                    }
                    else if ($('#txtIngRutSearch').val() != '') {
                        $('#alertSearchTitulo').css('display', 'block')
                        $('#tituloBotones').css('display', 'block')
                        $('#tituloAfiliado').html('RUT NO SE ENCUENTRA EN BASE. DESEA AGREGAR AL REGISTRO ?..')
                    }
                });
        },
        guardaRegistro() {


            if ($('#txtIngRut').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar el rut',
                    container: '#msjregsitro',
                    timer: 4000
                });
                return false;
            }
            if ($('#txtIngNombre').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar nombre',
                    container: '#msjregsitro',
                    timer: 4000
                });
                return false;
            }
            if ($('#txtIngFono').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar telefono',
                    container: '#msjregsitro',
                    timer: 4000
                });
                return false;
            }
            if ($('#txtCorreo').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar correo',
                    container: '#msjregsitro',
                    timer: 4000
                });
                return false;
            }
            if ($('#txtIngObs').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar una observación',
                    container: '#msjregsitro',
                    timer: 4000
                });
                return false;
            }

            const formData = {
                rut: $('#txtIngRut').val(),
                nombre: $('#txtIngNombre').val(),
                telefono: $('#txtIngFono').val(),
                correo: $('#txtCorreo').val(),
                observacion: $('#txtIngObs').val(),
                ejecutivo_ingreso: getCookie('Rut'),
                oficina: parseInt(getCookie('Oficina')),
            }

            fetch(`http://${motor_api_server}:4002/copago/guarda-ingreso-copago`, {
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
                        message: 'Error al Guardar Registro...',
                        container: '#msjregsitro',
                        timer: 4000
                    });
                    return false;
                }
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Se guardo Regsitro Correctamente...',
                    container: '#msjregsitro',
                    timer: 4000
                });
                appConsultaCopago.limpiezaCampos();
            });
        },
        limpiezaCampos() {

            $('#divIngreso').css('display', 'none')
            $('#txtIngRut').val('')
            $('#txtIngNombre').val('')
            $('#txtIngFono').val('')
            $('#txtCorreo').val('')
            $('#txtIngObs').val('')

            $('#alertSearchTitulo').css('display', 'none')
            $('#tituloAfiliado').html('')
            $('#ejecutivoTitulo').html('')
            $('#tituloBotones').css('display', 'none')
            $('#txtIngRutSearch').val('')
        }
    }
});

$('#btSiRegistro').click(function () {
    $('#divIngreso').css('display', 'block')
    let rutInput = $('#txtIngRutSearch').val()
    $('#txtIngRut').val(rutInput)
});

$('#btNoRegistro').click(function () {
    $('#divIngreso').css('display', 'none')
    $('#alertSearchTitulo').css('display', 'none')
    $('#tituloAfiliado').html('')
    $('#ejecutivoTitulo').html('')
    $('#tituloBotones').css('display', 'none')
    $('#txtIngRutSearch').val('')

});


var appModalCopago = new Vue({
    el: '#modal_copago',
    data: {
        filtros: {
            estadosModal: [],
            subEstadosModal: [],
        },
        modelos: {
            estadosModal: '',
            subEstadosModal: '',
        },
        dataModalHist: {},
    },
    mounted() {
        this.obtenerEstados();
    },
    methods: {

        obtenerEstados() {
            let padre = 0;
            fetch(`http://${motor_api_server}:4002/copago/lista-estados/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.estadosModal = estadosJSON;
                });
        },

        obtenerSubEstados(padre) {
            fetch(`http://${motor_api_server}:4002/copago/lista-estados/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosSubJSON => {
                    this.filtros.subEstadosModal = estadosSubJSON;
                });
        },

        eventoCambiaEstadoCopagoModal() {
            this.obtenerSubEstados(this.modelos.estadosModal)
        },

        cargaDetalleCopago(rut_) {

            var fechaHoy = new Date();
            var periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');

            $("#tblDetalleCopago").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/copago/lead-copago-detalle/${rut_}`,
            });
        },

        obtenerHistorial(rut) {
            fetch(`http://${motor_api_server}:4002/copago/historial-copago/${rut}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.dataModalHist = datos;
                    return datos
                })
        },

        handleSubmitGestionCopago() {

            let afiliado_act_cmr_ = '';
            let afiliado_renta_imp_act_ = '';
            let empresa_acogida_ley_prot_ = '';
            let afiliado_renta_impo_ = '';
            let salud_ = '';
            let educacion_ = '';
            let gastos_servicios_ = '';
            let turismo_recreacion_ = '';
            let otros_ = '';
            let renta_actual_ = '';
            let documentacion_sistema_ = '';
            let afiliado_recibe_trans_ = '';
            let afiliado_recibe_sucursal_ = '';

            let afiliado_mes_1_ = 0;
            let afiliado_mes_2_ = 0;
            let afiliado_mes_3_ = 0;
            let afiliado_renta_promedio_ = 0;
            let renta_actual_monto_ = 0;
            let renta_variacion_ = 0;


            if ($('#afiliado_mes_1').val() != '') {
                afiliado_mes_1_ = $('#afiliado_mes_1').val()
            }
            if ($('#afiliado_mes_2').val() != '') {
                afiliado_mes_2_ = $('#afiliado_mes_2').val()
            }
            if ($('#afiliado_mes_3').val() != '') {
                afiliado_mes_3_ = $('#afiliado_mes_3').val()
            }
            if ($('#afiliado_renta_promedio').val() != '') {
                afiliado_renta_promedio_ = $('#afiliado_renta_promedio').val()
            }
            if ($('#renta_actual_monto').val() != '') {
                renta_actual_monto_ = $('#renta_actual_monto').val()
            }
            if ($('#renta_variacion').val() != '') {
                renta_variacion_ = $('#renta_variacion').val()
            }



            if ($('#afiliado_act_cmr').is(':checked') == true) {
                afiliado_act_cmr_ = 'SI'
            }
            else {
                afiliado_act_cmr_ = 'NO'
            }

            if ($('#afiliado_renta_imp_act').is(':checked') == true) {
                afiliado_renta_imp_act_ = 'SI'
            }
            else {
                afiliado_renta_imp_act_ = 'NO'
            }

            if ($('#empresa_acogida_ley_prot').is(':checked') == true) {
                empresa_acogida_ley_prot_ = 'SI'
            }
            else {
                empresa_acogida_ley_prot_ = 'NO'
            }

            if ($('#afiliado_renta_impo').is(':checked') == true) {
                afiliado_renta_impo_ = 'SI'
            }
            else {
                afiliado_renta_impo_ = 'NO'
            }

            if ($('#salud').is(':checked') == true) {
                salud_ = 'SI'
            }
            else {
                salud_ = 'NO'
            }

            if ($('#educacion').is(':checked') == true) {
                educacion_ = 'SI'
            }
            else {
                educacion_ = 'NO'
            }

            if ($('#gastos_servicios').is(':checked') == true) {
                gastos_servicios_ = 'SI'
            }
            else {
                gastos_servicios_ = 'NO'
            }

            if ($('#turismo_recreacion').is(':checked') == true) {
                turismo_recreacion_ = 'SI'
            }
            else {
                turismo_recreacion_ = 'NO'
            }

            if ($('#otros').is(':checked') == true) {
                otros_ = 'SI'
            }
            else {
                otros_ = 'NO'
            }

            if ($('#renta_actual').is(':checked') == true) {
                renta_actual_ = 'SI'
            }
            else {
                renta_actual_ = 'NO'
            }

            if ($('#documentacion_sistema').is(':checked') == true) {
                documentacion_sistema_ = 'SI'
            }
            else {
                documentacion_sistema_ = 'NO'
            }

            if ($('#afiliado_recibe_trans').is(':checked') == true) {
                afiliado_recibe_trans_ = 'SI'
            }
            else {
                afiliado_recibe_trans_ = 'NO'
            }
            if ($('#afiliado_recibe_sucursal').is(':checked') == true) {
                afiliado_recibe_sucursal_ = 'SI'
            }
            else {
                afiliado_recibe_sucursal_ = 'NO'
            }

            if ($('#dllEstadoModal').val() == "") {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar un estado.',
                    container: '#msCopagoGest',
                    timer: 3000
                });
                return false;
            }

            if ($('#dllSubEstadoModal').val() == "") {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar un sub-estado.',
                    container: '#msCopagoGest',
                    timer: 3000
                });
                return false;
            }

            const formData = {
                nombre: $('#txtNombreCopago').val(),
                rut: $('#txtRutLeadCopago').val(),
                id_lead: $('#txtidLeadCopago').val(),
                estado: $('select[name="dllEstadoModal"] option:selected').text(),
                sub_estado: $('select[name="dllSubEstadoModal"] option:selected').text(),
                respuesta: $('#txtRespuestaCopago').val(),
                afiliado_act_cmr: afiliado_act_cmr_,
                afiliado_renta_imp_act: afiliado_renta_imp_act_,
                empresa_acogida_ley_prot: empresa_acogida_ley_prot_,
                afiliado_renta_impo: afiliado_renta_impo_,
                afiliado_mes_1: afiliado_mes_1_,
                afiliado_mes_2: afiliado_mes_2_,
                afiliado_mes_3: afiliado_mes_3_,
                afiliado_renta_promedio: afiliado_renta_promedio_,
                salud: salud_,
                educacion: educacion_,
                gastos_servicios: gastos_servicios_,
                turismo_recreacion: turismo_recreacion_,
                otros: otros_,
                observacion_salud: $('#observacion_salud').val(),
                renta_actual: renta_actual_,
                renta_actual_monto: renta_actual_monto_,
                renta_variacion: renta_variacion_,
                documentacion_sistema: documentacion_sistema_,
                afiliado_recibe_trans: afiliado_recibe_trans_,
                afiliado_recibe_sucursal: afiliado_recibe_sucursal_,
                rut_ejecutivo: getCookie('Rut'),
                oficina: parseInt(getCookie('Oficina')),
            };
            fetch(`http://${motor_api_server}:4002/copago/guarda-gestion-copago`, {
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
                        message: 'Error al intentar guardar gestión.',
                        container: '#msCopagoGesto',
                        timer: 3000
                    });
                    return false;
                }
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Gestión Guardada correctamente.',
                    container: '#msCopagoGest',
                    timer: 3000
                });
                appCopago.cargaLeadFiltroCall();
                appModalCopago.obtenerHistorial($('#txtRutLeadCopago').val());
            });
        },

        setDefaultsModalData() {
            this.modelos = {
                estadosModal: '',
                subEstadosModal: '',
            }
            $('input[type="checkbox"]').prop('checked', false);
            $('input[type="text"]').val('');
            $("#observacion_salud").val('');
            $("#txtRespuestaCopago").val('');
            $('#checkListCopago').css('display', 'none');
        }
    }
});

function formatoMoneyCopago(value, row, index) {
    return value.toMoney(0);
}

$('#modal_copago').on('show.bs.modal', async (event) => {
    let rut = $(event.relatedTarget).data('rut')
    let nombre = $(event.relatedTarget).data('nombre')
    let id = $(event.relatedTarget).data('lead')
    let empresa = $(event.relatedTarget).data('empresa')
    let promedio = $(event.relatedTarget).data('promedio')
    let promedioanterior = $(event.relatedTarget).data('promedioanterior')
    let rutempresa = $(event.relatedTarget).data('rutempresa')
    let dvempresa = $(event.relatedTarget).data('dvempresa')

    $('#txtRutLeadCopago').val(rut);
    $('#txtidLeadCopago').val(id);
    $('#txtNombreCopago').val(nombre);
    $('#txtEmpresaCopago').val(rutempresa + '-' + dvempresa);
    $('#txtPromedioRentaCopago').val(promedio);
    $('#txtPromedioAnteriorCopago').val(promedioanterior);

    appModalCopago.cargaDetalleCopago(rut);
    appModalCopago.obtenerHistorial(rut);
    cargaDatosDeContacto(rut, '#bdy_datos_contactos_copago')
});

$('#modal_copago').on('hidden.bs.modal', function (e) {

    // $("#dllEstadoModal").val('');
    // $("#dllSubEstadoModal").val('');
    appModalCopago.setDefaultsModalData();

})

$('#dllEstadoModal').change(function (e) {
    switch (this.value) {
        case "3":
            $.niftyNoty({
                type: 'warning',
                icon: 'pli-like-2 icon-2x',
                message: 'Recuerde completar cuestionario CHECKLIST para guardar gestion!...',
                container: '#msjCopagoCheck',
                timer: 30000
            });
            $('#checkListCopago').css('display', 'block');
            break;
        case "4":
            $.niftyNoty({
                type: 'warning',
                icon: 'pli-like-2 icon-2x',
                message: 'Recuerde completar cuestionario CHECKLIST para guardar gestion!...',
                container: '#msjCopagoCheck',
                timer: 30000
            });
            $('#checkListCopago').css('display', 'block');
            break;
    }
    if (this.value != '3' && this.value != '4') {
        $('#checkListCopago').css('display', 'none');
    }
});


$("#afiliado_mes_3").keyup(function (event) {

    let promedio = (parseInt($('#afiliado_mes_1').val(), 10) + parseInt($('#afiliado_mes_2').val(), 10) + parseInt($('#afiliado_mes_3').val(), 10)) / 3
    $('#afiliado_renta_promedio').val(Math.round(promedio))
});


$("#renta_actual_monto").keyup(function (event) {
    let promedio = 0;

    if (parseInt($('#afiliado_renta_promedio').val(), 10) > parseInt($('#renta_actual_monto').val(), 10)) {

        promedio = (parseInt($('#afiliado_renta_promedio').val(), 10) - parseInt($('#renta_actual_monto').val(), 10))
        promedio = (promedio / parseInt($('#afiliado_renta_promedio').val(), 10)) * 100
    }
    else {
        promedio = (parseInt($('#renta_actual_monto').val(), 10) - parseInt($('#afiliado_renta_promedio').val(), 10))
        promedio = (promedio / parseInt($('#renta_actual_monto').val(), 10)) * 100
    }

    $('#renta_variacion').val(Math.round(promedio))
});


$('#afiliado_renta_impo').on('click', function () {
    if ($(this).is(':checked')) {
        $("#afiliado_mes_1").prop('disabled', false);
        $("#afiliado_mes_2").prop('disabled', false);
        $("#afiliado_mes_3").prop('disabled', false);
        // $("#afiliado_renta_promedio").prop('disabled', false);
    } else {
        $("#afiliado_mes_1").prop('disabled', true);
        $("#afiliado_mes_2").prop('disabled', true);
        $("#afiliado_mes_3").prop('disabled', true);
        // $("#afiliado_renta_promedio").prop('disabled', true);
    }
});


$('#renta_actual').on('click', function () {
    if ($(this).is(':checked')) {
        $("#renta_actual_monto").prop('disabled', false);
        // $("#renta_variacion").prop('disabled', false);
    } else {
        $("#renta_actual_monto").prop('disabled', true);
        // $("#renta_variacion").prop('disabled', true);
    }
});


//contactabilidad
$('#btn-add-contac_copago').on('click', function () {
    if ($('#formulario-contac_copago').is(':visible')) {
        $('#formulario-contac_copago').hide('slow');
    }
    else {
        $('#formulario-contac_copago').show('slow');
    }
});

$('#form-registro-contacto_copago').bootstrapValidator({
    excluded: [':disabled', ':not(:visible)'],
    feedbackIcons: [],
    fields: {
        cbtippContac_copago: {
            validators: {
                notEmpty: {
                    message: 'Debe seleccionar un tipo de Contacto'
                }
            }
        },
        cbClasificacionConctac_copago: {
            validators: {
                notEmpty: {
                    message: 'Debe seleccionar una clasificación de contacto'
                }
            }
        },
        afi_NewContacto_copago: {
            validators: {
                notEmpty: {
                    message: 'Debe ingresar un contacto'
                },
                stringLength: {
                    message: 'No pueden ser mas de 100 caracteres',
                    max: function (value, validator, $field) {
                        return 150 - (value.match(/\r/g) || []).length;
                    }
                }
            }
        }
    }
}).on('success.form.bv', function (e) {
    e.preventDefault();
    var $form = $(e.target);
    var rutCont = rut_;
    rutCont = rutCont.substring(0, rutCont.length - 2)
    var objeto_envio_contacto = {
        RutAfiliado: rutCont,
        IdTipoContac: $('#cbtippContac_copago').val(),
        GlosaTipoContac: $('select[name="cbtippContac_copago"] option:selected').text(),
        IdClasifContac: $('#cbClasificacionConctac_copago').val(),
        GlosaClasifContac: $('select[name="cbClasificacionConctac_copago"] option:selected').text(),
        DatosContac: $('#afi_NewContacto_copago').val()
    }
    $.SecGetJSON(BASE_URL + "/motor/api/Contactos/ingresa-nuevo-contacto", objeto_envio_contacto, function (datos) {
        $("#form-registro-bnf").bootstrapValidator('resetForm', true);
        cargaDatosDeContacto(rutCont, 'bdy_datos_contactos_copago');
        $("#btn-add-contac_copago").trigger("click");
        $.niftyNoty({
            type: 'success',
            icon: 'pli-like-2 icon-2x',
            message: 'Contacto Guardado correctamente.',
            container: '#tab-gestion-3',
            timer: 5000
        });
    });

});

function cargaDatosDeContacto(rutAf, destino = null) {

    var rutCont = rutAf;
    rutCont = rutCont.substring(0, rutCont.length - 2)
    if (destino != null) {
        $(`${destino} > tr`).remove();
        $(destino).html("");
    }
    else {
        $("#bdy_datos_contactos_copago > tr").remove();
        $("#bdy_datos_contactos_copago").html("");
    }
    $.SecGetJSON(BASE_URL + "/motor/api/Contactos/lista-contactos-afi", { RutAfiliado: rutCont }, function (contac) {
        $.each(contac, function (i, e) {
            var colorPorc = '';
            var alertFecha = '';
            var icon = '--';

            if (e.PorcIndice > 70) {
                var colorPorc = 'badge-success'
                icon = '<i class="ion-checkmark">';
            }
            if (e.PorcIndice > 40 && e.PorcIndice < 69) {
                var colorPorc = 'badge-warning'
            }
            if (e.PorcIndice < 39) {
                var colorPorc = 'badge-danger'
                icon = '!';
            }
            if (e.FechaContacto.toFecha() === "01-01-1900") {
                alertFecha = e.FechaContacto.toFecha() + '<i class="badge badge-danger badge-stat badge-icon pull-right add-tooltip" style="position: static; data-toggle="tooltip" data-container="body" data-placement="top" data-original-title="Se debe Actualizar Contacto">!</i>'
                $("#afiContac").css({ 'display': 'block' })
            }
            else {
                alertFecha = e.FechaContacto.toFecha() + '<i class="badge ' + colorPorc + ' badge-stat badge-icon pull-right add-tooltip" style="position: static; data-toggle="tooltip" data-container="body" data-placement="top" data-original-title="Se debe Actualizar Contacto">' + icon + '</i></i>'
            }

            var destinoDefault = destino == null ? "#bdy_datos_contactos_copago" : destino;
            $(destinoDefault)
                .append(
                    $("<tr>")
                        .append($("<td>").append(
                            $("<select>").addClass('dropdown-caret').css('width', '88px').css('border-radius', '6px').append(
                                $('<option data-icon="fa fa-paint-brush">').val('Seleccione').text("Seleccione..."),
                                $('<option>').val(1).text("Valido Presencial"),
                                $('<option>').val(2).text("Contacto Valido"),
                                $('<option>').val(3).text("Tercero Valido"),
                                $('<option>').val(4).text("No Contesta"),
                                $('<option>').val(5).text("Buzon de voz"),
                                $('<option>').val(6).text("Apagado"),
                                $('<option>').val(7).text("Equivocado"),
                                $('<option>').val(8).text("No Existe")
                            ).on('change', function () {

                                var indice = $(this).val();
                                var valorD = e.ValorDato;
                                var ofici = getCookie("Oficina");
                                $.SecGetJSON(BASE_URL + "/motor/api/Contactos/actualiza-indice-contacto", { Indice: indice, RutAfi: rutCont, ValorDato: valorD, Oficina: ofici }, function (datos) {

                                    cargaDatosDeContacto(rutAf);

                                    $.niftyNoty({
                                        type: 'success',
                                        icon: 'pli-like-2 icon-2x',
                                        message: 'Gestión Guardada correctamente.',
                                        container: '#tab-gestion-3',
                                        timer: 5000
                                    });
                                });
                            })
                        ))
                        .append($("<td>").append(e.ValorDato))
                        .append($("<td>").append(e.TipoDato))
                        .append($("<td>").append(e.PorcIndice))
                        .append($("<td>").append(alertFecha))
                );
        });
    });

}


$('.numero').keyup(function () {
    var val = $(this).val();
    if (isNaN(val)) {
        val = val.replace(/[^0-9\.]/g, '');
        if (val.split('.').length > 2)
            val = val.replace(/\.+$/, "");
    }
    $(this).val(val);
});


