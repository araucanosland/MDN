jQuery.support.cors = true;


$(function () {
    if (getCookie('Cargo') == 'Agente') {
        $('#flt_ejecutivo').css('display', 'block')
    }
    else {
        $('#flt_ejecutivo').css('display', 'none')
    }

});

var appPex = new Vue({
    el: '#contPex',
    data: {
        filtros: {
            estados: [],
            subEstados: [],
        },
        modelos: {
            estados: '',
            subEstados: '',
        },
        data: {}
    },

    mounted() {
        this.obEstadoPex();
        this.CargaEjecutivo();
    },
    methods: {

        cargalistaPex() {

            let rut = "";
            let segmento = $('#dllSegmentoPex').val();
            if (getCookie('Cargo') == "Agente") {
                rut = $('#slEjecutivoPex').val();
            }
            else {
                rut = getCookie('Rut')
            }

            $("#tblPex").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/campana-pex/lead-pex`,
                query: {
                    oficina: getCookie('Oficina'),
                    cargo: getCookie('Cargo'),
                    rutEjecutivo: rut,
                    estado: this.modelos.estados,
                    subEstado: this.modelos.subEstados,
                    segmento: segmento,
                }
            });
        },
        loadTablaAcuerdoPago() {
            $("#tblPex").bootstrapTable();
        },


        obEstadoPex() {
            fetch(`http://${motor_api_server}:4002/campana-pex/estados`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.estados = estadosJSON;
                });
        },
        obSubEstados(padre) {
            fetch(`http://${motor_api_server}:4002/campana-pex/sub-estado/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(subEstadosSubJSON => {
                    this.filtros.subEstados = subEstadosSubJSON;
                });
        },
        eventoCambSubEstadoPex() {
            this.obSubEstados(this.modelos.estados)
        },
        CargaEjecutivo() {

            let oficina = getCookie("Oficina");
            let fechaHoy = new Date();
            let periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');

            fetch(`http://${motor_api_server}:4002/campana-pex/lista-ejecutivo/${oficina}/${periodo}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    $("#slEjecutivoPex").html("");
                    $("#slEjecutivoPex").append($("<option>").attr("value", "").html("Seleccione..."));
                    $.each(datos, function (i, e) {
                        $("#slEjecutivoPex").append($("<option>").attr("value", e.Rut).html(e.Nombre))

                    });
                });
        },
    }
});

function formatoMoneyFormatterign(value, row, index) {
    return '$ ' + value.toMoney(0);
}

function idFormatterMoldalIgn(value, row, index) {
    return `<a href="${value}" class="btn-link" data-rut="${value}"  data-toggle="modal" data-target="#modal_pex" data-backdrop="static" data-keyboard="false">${value}</a>`;
}


var appPexModal = new Vue({
    el: '#modal_pex',
    data: {
        filtrosModal: {
            estadosModal: [],
            subEstadosModal: [],

        },
        modelosModal: {
            estadosModal: '',
            subEstadosModal: '',

        },
        dataModal: {}
    },
    mounted() {
        this.obEstadoPexModal();
    },
    methods: {
        handleEventoClickBuscaBasePotenciada(rut_) {
            let rut = rut_;
            fetch(`http://${motor_api_server}:4002/pensionados/base-potenciada/${rut}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    if (datos.length > 0) {
                        $("#tblPenPotenciadaPex").bootstrapTable('load', datos);
                    }
                    else {
                        $.niftyNoty({
                            type: 'danger',
                            message: 'Contacto no existe en Base Potenciada...',
                            container: '#NotfGenericaDBPotenciado',
                            timer: 5000
                        });
                        $("#tblPenPotenciadaPex").bootstrapTable('load', []);
                    }
                });
        },
        setDefaultsModalPotenciada() {
            this.dataModal = {}
            $("#tblPenPotenciadaPex").bootstrapTable('load', []);
        },


        obEstadoPexModal() {
            fetch(`http://${motor_api_server}:4002/campana-pex/estados`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtrosModal.estadosModal = estadosJSON;
                });
        },
        obSubEstadosModal(padre) {
            fetch(`http://${motor_api_server}:4002/campana-pex/sub-estado/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(subEstadosSubJSON => {
                    this.filtrosModal.subEstadosModal = subEstadosSubJSON;
                });
        },
        eventoCambSubEstadoPexModal() {
            this.obSubEstadosModal(this.modelosModal.estadosModal)
        },

        obtenerLeadRut(rut_) {

            fetch(`http://${motor_api_server}:4002/campana-pex/busca-lead-pex/${rut_}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.dataModal = datos;
                    return datos
                })
        },
        handleEventoClickGuardaPex() {

            let Subestado = $('#slSubEstadoModal').val();

            let fechaCompromiso = $('#ges_prox_compromiso_pex').val();
            if (fechaCompromiso == " " || fechaCompromiso == "") {
                fechaCompromiso = null;
            }


            if ($('#slEstadoModal').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe Ingresar un Estado.',
                    container: '#msjIgn',
                    timer: 3000
                });
                return false;
            }

            if ($('#slSubEstadoModal').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe Ingresar un Sub-Estado.',
                    container: '#msjIgn',
                    timer: 3000
                });
                return false;
            }

            if ($('#txtObservacionPex').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe Ingresar un Comentario.',
                    container: '#msjIgn',
                    timer: 3000
                });
                return false;
            }


            if ($('#slSubEstadoModal').val() == 101 && $('#ges_prox_compromiso_pex').val() == "") {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe Ingresar una fecha de Compromiso.',
                    container: '#msjIgn',
                    timer: 3000
                });
                return false;
            }

            const formData = {
                id_lead: $('#txtIdLeadPex').val(),
                rut: $('#txtRutPex').val(),
                estado: $('#slEstadoModal').val(),
                subestado: Subestado,
                fecha_compromiso: fechaCompromiso,
                comentario: $('#txtObservacionPex').val(),
                rut_ejecutivo: getCookie('Rut'),
                oficina: parseInt(getCookie('Oficina')),
            };

            fetch(`http://${motor_api_server}:4002/campana-pex`, {
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
                        container: '#msjIgn',
                        timer: 3000
                    });
                    return false;
                }
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Gestión Guardada correctamente.',
                    container: '#msjIgn',
                    timer: 3000
                });
                // appIgnModal.obtenerLeadIDIgn($('#txtIdIng').val())

                // appPexModal.setDefaultsModal();
                $('#slEstadoModal').val("")
                $('#slSubEstadoModal').val("")
                appPex.cargalistaPex();


            });
        },
        setDefaultsModal() {
            this.modelos = {
                estadosModal: '',
                subEstadosModal: '',
            }

            $('#ges_prox_compromiso_pex').val('');
            $('#txtObservacionPex').val('');
            $("#divFechaComp").css('display', 'none')
        },
    }
});


$('#slSubEstadoModal').change(function (e) {

    switch (this.value) {
        case "101":
            $("#divFechaComp").css('display', 'block')
            break;
    }
    if (this.value != 101) {
        $("#divFechaComp").css('display', 'none')
    }
});

$('#slEstadoModal').change(function (e) {
    if (this.value != 1) {
        $("#divFechaComp").css('display', 'none')
    }
})

$('#modal_pex').on('hidden.bs.modal', async (event) => {
    appPexModal.setDefaultsModal();
    $('#newContactoPex').css('display', 'none')
    $('#txtTelfConPot').val('');
    $('#txtRelacConPot').val('');
});

$('#modal_pex').on('show.bs.modal', async (event) => {
    const rutPen = $(event.relatedTarget).data('rut');

    $('#dp-component-pex .input-group.date').datepicker(
        { autoclose: true, format: 'dd-mm-yyyy', language: "es", daysOfWeekDisabled: [6, 0], todayHighlight: true }
    ).on('changeDate', function (event) {
        event.stopPropagation();
    }).on('show.bs.modal hide.bs.modal', function (event) {
        event.stopPropagation();
    });
    appPexModal.obtenerLeadRut(rutPen);
    //appPexModal.handleEventoClickBuscaBasePotenciada(rutPen);

    var rutCont = rutPen
    rutCont = rutCont.substring(0, rutCont.length - 2)
    cargaDatosDeContacto(rutCont);



});

//function opcionContactabilidad(val, row, index) {
//    console.log({
//        val, row, index
//    })

//    return `<select class="form-contol" onchange="ejecutarAccion(${row.id})">
//                <option value="0">Seleccione</option>
//                <option value="1">Contactado</option>
//                <option value="2">No Contesta</option>
//                <option value="3">Equivocado</option>
//            </select>`
//}

//function ejecutarAccion(id) {
//    opt = $(event.target).val()
//    let marcaPotenciada = {
//        id: id,
//        marca: opt,
//    }

//    console.log(marcaPotenciada)

//    fetch(`http://${motor_api_server}:4002/pensionados/cambiaMarcaPotenciada`, {
//        method: 'POST',
//        body: JSON.stringify(marcaPotenciada),
//        headers: {
//            'Content-Type': 'application/json',
//            'Token': getCookie('Token')
//        }
//    }).then(async (response) => {
//        appPexModal.handleEventoClickBuscaBasePotenciada($('#txtRutPex').val())
//    });

//}

//function estadoImg(val, row, index) {
//    if (row.marca == 1) {
//        return `<i class="btn btn-success  btn-icon btn-circle"><i class="ion-checkmark icon-xs add-tooltip"></i></i>`
//    }
//    else if (row.marca == 2) {
//        return `<i class="btn btn-warning btn-icon btn-circle"><i class="ion-minus icon-xs add-tooltip"></i></i>`
//    }
//    else if (row.marca == 3) {
//        return `<i class="btn btn-danger btn-icon btn-circle"><i class="ion-close icon-xs add-tooltip"></i></i>`
//    }
//}

//$('#btNewContatoPex').on('click', function (event) {
//    $('#newContactoPex').css('display', 'block')
//});

//$('#btSaveContPontenciadaPex').on('click', function (event) {
//    if ($('#txtTelfConPot').val() == '') {

//        $.niftyNoty({
//            type: 'danger',
//            message: 'Debe ingresar un Telefono',
//            container: '#msj-contact-potenc',
//            timer: 4000
//        });
//        return false;
//    }

//    if ($('#txtRelacConPot').val() == '') {

//        $.niftyNoty({
//            type: 'danger',
//            message: 'Debe ingresar un Relacionado',
//            container: '#msj-contact-potenc',
//            timer: 4000
//        });
//        return false;
//    }

//    let contatoPotenciada = {
//        id_asign: 0,
//        rut: $('#txtRutPex').val(),
//        nombre: $('#txtNomPex').val(),
//        area: 9,
//        telefono: $('#txtTelfConPot').val(),
//        relacionado: $('#txtRelacConPot').val(),
//        oficina: getCookie('Oficina'),
//    }


//    fetch(`http://${motor_api_server}:4002/pensionados/guardaContatoPotenciada`, {
//        method: 'POST',
//        body: JSON.stringify(contatoPotenciada),
//        headers: {
//            'Content-Type': 'application/json',
//            'Token': getCookie('Token')
//        }
//    }).then(async (response) => {
//        if (!response.ok) {
//            $.niftyNoty({
//                type: 'danger',
//                message: 'Error al Guardar Contacto...',
//                container: '#msj-contact-potenc',
//                timer: 4000
//            });
//            $('#btn_contacto').attr('disabled', true);
//            return false;
//        }
//        $.niftyNoty({
//            type: 'success',
//            icon: 'pli-like-2 icon-2x',
//            message: 'Se guardo Contacto Correctamente...',
//            container: '#msj-contact-potenc',
//            timer: 4000
//        });

//        $('#txtTelfConPot').val("")
//        $('#txtRelacConPot').val("")
//        $('#newContacto').css('display', 'none')

//        appPexModal.handleEventoClickBuscaBasePotenciada($('#txtRutPex').val())
//    });
//});



$('#form-registro-contacto_seguro-cesantia').bootstrapValidator({
    excluded: [':disabled', ':not(:visible)'],
    feedbackIcons: [],
    fields: {
        cbtippContac_seg: {
            validators: {
                notEmpty: {
                    message: 'Debe seleccionar un tipo de Contacto'
                }
            }
        },
        cbClasificacionConctac_seg: {
            validators: {
                notEmpty: {
                    message: 'Debe seleccionar una clasificación de contacto'
                }
            }
        },
        afi_NewContacto_seg: {
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
    // Prevén que se mande el formulario
    e.preventDefault();
    var $form = $(e.target);
    var rutCont = $('#txtRutPex').val()
    rutCont = rutCont.substring(0, rutCont.length - 2)
    var objeto_envio_contacto = {
        RutAfiliado: rutCont,
        IdTipoContac: $('#cbtippContac_seg').val(),
        GlosaTipoContac: $('select[name="cbtippContac_seg"] option:selected').text(),
        IdClasifContac: $('#cbClasificacionConctac_seg').val(),
        GlosaClasifContac: $('select[name="cbClasificacionConctac_seg"] option:selected').text(),
        DatosContac: $('#afi_NewContacto_seg').val()
    }
    $.SecGetJSON(BASE_URL + "/motor/api/Contactos/ingresa-nuevo-contacto", objeto_envio_contacto, function (datos) {
        $("#form-registro-contacto_seguro-cesantia").bootstrapValidator('resetForm', true);
        // $('#demo-lg-modal-new').modal('hide');
        cargaDatosDeContacto(rutCont, 'bdy_datos_contactos');
        $("#btn-add-contac-seguro_cesantia").trigger("click");
        $.niftyNoty({
            type: 'success',
            icon: 'pli-like-2 icon-2x',
            message: 'Contacto Guardado correctamente.',
            container: '#msjIgn',
            timer: 5000
        });
    });

});


function cargaDatosDeContacto(rutAf, destino = null) {

    if (destino != null) {
        $(`${destino} > tr`).remove();
        $(destino).html("");
    }
    else {
        $("#bdy_datos_contactos > tr").remove();
        $("#bdy_datos_contactos").html("");
    }


    $.SecGetJSON(BASE_URL + "/motor/api/Contactos/lista-contactos-afi", { RutAfiliado: rutAf }, function (contac) {
        $.each(contac, function (i, e) {
            var colorPorc = '';
            var alertFecha = '';

            if (e.PorcIndice > 70) {
                var colorPorc = 'pull-left badge badge-success'
            }
            if (e.PorcIndice > 40 && e.PorcIndice < 69) {
                var colorPorc = 'pull-left badge badge-warning'
            }
            if (e.PorcIndice < 39) {
                var colorPorc = 'pull-left badge badge-danger'
            }
            if (e.FechaContacto.toFecha() === "01-01-1900") {
                alertFecha = e.FechaContacto.toFecha() + '<i class="badge badge-danger badge-stat badge-icon pull-right add-tooltip" style="position: static; data-toggle="tooltip" data-container="body" data-placement="top" data-original-title="Se debe Actualizar Contacto">!</i>'
                $("#afiContac").css({ 'display': 'block' })
            }
            else { alertFecha = e.FechaContacto.toFecha() }

            var destinoDefault = destino == null ? "#bdy_datos_contactos" : destino;
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
                                $.SecGetJSON(BASE_URL + "/motor/api/Contactos/actualiza-indice-contacto", { Indice: indice, RutAfi: rutAf, ValorDato: valorD, Oficina: ofici }, function (datos) {

                                    cargaDatosDeContacto(rutAf);

                                    $.niftyNoty({
                                        type: 'success',
                                        icon: 'pli-like-2 icon-2x',
                                        message: 'Gestión Guardada correctamente.',
                                        container: '#msjIgn',
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

$('#btn-add-contac-seguro_cesantia').on('click', function () {

    // console.log('Visibiliadad', $('#formulario-contac').is(':visible'));
    if ($('#formulario-contac_seguro_cesantia').is(':visible')) {
        $('#formulario-contac_seguro_cesantia').hide('slow');
    }
    else {
        $('#formulario-contac_seguro_cesantia').show('slow');
    }

});



