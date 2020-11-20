jQuery.support.cors = true;
var appAcuenta = new Vue({
    el: '#divAcuenta',
    data: {
        filtros: {
            estados: [],
            subEstados: [],
            campana: [],
        },
        modelos: {
            estados: '',
            subEstados: '',
            campana: '',
        }
    },
    mounted() {
        this.obtenerEstados();
        this.obtenerCampanaRetencion();
    },
    methods: {
        obtenerCampanaRetencion() {
            fetch(`http://${motor_api_server}:4002/acuenta/lista-campana-retencion`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(campanaJSON => {
                    this.filtros.campana = campanaJSON;
                });
        },
        obtenerEstados() {
            let padre = 0;
            fetch(`http://${motor_api_server}:4002/acuenta/lista-estados/${padre}`, {
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
            fetch(`http://${motor_api_server}:4002/acuenta/lista-estados/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosSubJSON => {
                    this.filtros.subEstados = estadosSubJSON;
                });
        },

        eventoCambiaEstadoAcuenta() {
            this.obtenerSubEstados(this.modelos.estados)
        },

        cargaLeadFiltroAcuenta() {
            let camp = $('#dllCampana').val();
            if (camp == "") {
                $(Swal.fire({
                    title: 'Campaña',
                    html: `<ul><li class="msg-part">Debe seleccionar una campaña</li></ul>`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                }));
                return false;
            }

            $("#tblAcuenta").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/acuenta/lead-acuenta`,
                query: {
                    campana: $('#dllCampana').val(),
                    rut: $('#txtRutAcuenta').val(),
                    credito_vigente: $('#dllCreditoVigente').val(),
                    oferta: $('#dllOferta').val(),
                    estado: this.modelos.estado,
                    subEstado: this.modelos.subEstados,
                    rut_ejecutivo: getCookie('Rut'),
                    oficina: getCookie('Oficina'),
                }
            });
        },
    }
});

function formaterRut(value, row, index) {
    return `<a href="#" class="btn-link" data-target="#modal_acuenta" data-toggle="modal" data-rutnum="${row.rut_num}"  data-rut="${row.rut}" >${row.rut}</a>`;
}


var appModalAcuenta = new Vue({
    el: '#modal_acuenta',
    data: {
        filtros: {
            estadosModal: [],
            subEstadosModal: [],
        },
        modelos: {
            estadosModal: '',
            subEstadosModal: '',
        },
        dataModal: {},
        dataModalBnfVig: {},
        dataModalHist: {},
    },
    mounted() {
        this.obtenerEstados();
    },
    methods: {

        obtenerEstados() {
            let padre = 0;
            fetch(`http://${motor_api_server}:4002/acuenta/lista-estados/${padre}`, {
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
            fetch(`http://${motor_api_server}:4002/acuenta/lista-estados/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosSubJSON => {
                    this.filtros.subEstadosModal = estadosSubJSON;
                });
        },

        eventoCambiaEstadoAcuentaModal() {
            this.obtenerSubEstados(this.modelos.estadosModal)
        },

        obtenerLeadDetalle(rut) {
            fetch(`http://${motor_api_server}:4002/acuenta/detalle-lead-acuenta/${rut}`, {
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

        obtenerBeneficiosVigentes() {
            $("#tblBnfVig").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/acuenta/lista-beneficios-vigentes`,
            });
        },

        obtenerBeneficiosUsados(rut) {
            $("#tblBnfUsados").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/acuenta/beneficio-acuenta/${rut}`,
            });
        },

        cargaDetalleAcuenta(rut) {
            $("#tblDetalleAcuenta").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/acuenta/detalle-credito-vigente/${rut}`,
            });
        },

        obtenerHistorialAcuenta(rut) {
            fetch(`http://${motor_api_server}:4002/acuenta/historial-acuenta/${rut}`, {
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

        handleSubmitGuadarGestion() {

            let contador = 0;
            let beneficio_1 = "";
            let beneficio_2 = "";
            let beneficio_3 = "";
            let beneficio_4 = "";
            let beneficio_5 = "";
            let beneficio_6 = "";
            let beneficio_7 = "";
            let beneficio_8 = "";


            if ($('#dllSubEstadoModal').val() == 101 || $('#dllSubEstadoModal').val() == 102) {


                if ($('#beneficio_1:checked').val() == 'on') {
                    beneficio_1 = $('#lbBeneficio_1').html();
                    contador = contador + 1;


                }

                if ($('#beneficio_2:checked').val() == 'on') {
                    beneficio_2 = $('#lbBeneficio_2').html();
                    contador = contador + 1;


                }

                if ($('#beneficio_3:checked').val() == 'on') {
                    beneficio_3 = $('#lbBeneficio_3').html();
                    contador = contador + 1;


                }

                if ($('#beneficio_4:checked').val() == 'on') {
                    beneficio_4 = $('#lbBeneficio_4').html();
                    contador = contador + 1;


                }

                if ($('#beneficio_5:checked').val() == 'on') {
                    beneficio_5 = $('#lbBeneficio_5').html();
                    contador = contador + 1;


                }

                if ($('#beneficio_6:checked').val() == 'on') {
                    beneficio_6 = $('#lbBeneficio_6').html();
                    contador = contador + 1;


                }

                if ($('#beneficio_7:checked').val() == 'on') {
                    beneficio_7 = $('#lbBeneficio_7').html();
                    contador = contador + 1;


                }

                if ($('#beneficio_8:checked').val() == 'on') {
                    beneficio_8 = $('#lbBeneficio_8').html();
                    contador = contador + 1;


                }
                if (contador == 0) {
                    $(Swal.fire({
                        title: 'Beneficios',
                        html: `<ul><li class="msg-part">Debe seleccionar uno o mas beneficios</li></ul>`,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    }));
                    return false;
                }
            }

            if ($('#dllEstadoModal').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe seleccionar un estado.',
                    container: '#msjCallTam',
                    timer: 3000
                });
                return false;
            }

            if ($('#dllSubEstadoModal').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe seleccionar un Sub-Estado.',
                    container: '#msjCallTam',
                    timer: 3000
                });
                return false;
            }

            if ($('#txtobservacion').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar una observación.',
                    container: '#msjCallTam',
                    timer: 3000
                });
                return false;
            }

            const formData = {
                rut: $('#txtRutModalAcuenta').val(),
                nombre: $('#txtNombreModalAcuenta').val(),
                estado: $('select[name="dllEstadoModal"] option:selected').text(),
                subEstado: $('select[name="dllSubEstadoModal"] option:selected').text(),
                observacion: $('#txtobservacion').val(),
                rut_ejecutivo: getCookie('Rut'),
                oficina: parseInt(getCookie('Oficina')),
                beneficio_1: beneficio_1,
                beneficio_2: beneficio_2,
                beneficio_3: beneficio_3,
                beneficio_4: beneficio_4,
                beneficio_5: beneficio_5,
                beneficio_6: beneficio_6,
                beneficio_7: beneficio_7,
                beneficio_8: beneficio_8,
            };

            fetch(`http://${motor_api_server}:4002/acuenta/guarda-gestion-acuenta`, {
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
                        message: 'Error al intentar guardar.',
                        container: '#msjAcuenta',
                        timer: 3000
                    });
                    return false;
                }
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Guardada Correctamente.',
                    container: '#msjAcuenta',
                    timer: 3000
                });

                });

            if (bnf.length > 0) {
                var rut = $('#txtRutModalAcuenta').val();
                rut = rut.substring(0, rut.length - 2)
                $.each(bnf, function (i, e) {
                    const formDataBnf = {
                        rut: rut,
                        beneficio: bnf[i],
                    }
                    fetch(`http://${motor_api_server}:4002/acuenta/guarda-beneficio`, {
                        method: 'POST',
                        body: JSON.stringify(formDataBnf),
                        headers: {
                            'Content-Type': 'application/json',
                            'Token': getCookie('Token')
                        }
                    }).then(async (response) => {
                        if (!response.ok) {
                            return false;
                        }
                        appModalAcuenta.obtenerBeneficiosUsados(rut);
                    });
                });
            }

            setTimeout(function () {
                appModalAcuenta.obtenerHistorialAcuenta($('#txtRutModalAcuenta').val())
            }, 300);
            setTimeout(function () {
                appAcuenta.cargaLeadFiltroAcuenta();
            }, 300);

            appModalAcuenta.setDefaultsModalData()
        },

        setDefaultsModalData() {
            this.modelos = {
                estadosModal: '',
                subEstadosModal: '',
            }
            $('#txtobservacion').val("");
            $("#dvBeneficiosG").html("");
            $("#checkBeneficios").css('display', 'none');
        }
    }
});

$('#dllSubEstadoModal').change(function (e) {
    e.preventDefault();
    $("#dvBeneficiosG").html("");

    if ($(this).val() == 101 || $(this).val() == 102) {

        fetch(`http://${motor_api_server}:4002/acuenta/lista-beneficios-vigentes`, {
            method: 'GET',
            mode: 'cors',
            cache: 'default'
        })
            .then(response => response.json())
            .then(datos => {
                $.each(datos, function (i, e) {
                    var inp = $('<input>').addClass('magic-checkbox').prop({ type: 'checkbox', id: `beneficio_${i + 1}` })//.val(e.beneficio)
                    var lb = $('<label>').addClass('titulo_r').prop('for', `beneficio_${i + 1}`).prop({ id: `lbBeneficio_${i + 1}` }).css('font-weight', 'bold').text(e.beneficio);
                    var dv = $('<div>').addClass('checkbox').append(inp).append(lb)
                    $("#dvBeneficiosG").append(dv)
                });
            });
        $("#checkBeneficios").css('display', 'block');
    }
    else {
        $("#dvBeneficiosG").html("");
        $("#checkBeneficios").css('display', 'none');
    }
});

function formatoBnfVig(value, row, index) {
    return '<div class="label label-table label-success" style="border-radius: 5px; min-width: 40ex;">' + value + '</div>'
}

function formatoBnfVigUso(value, row, index) {
    return '<span class="pull-left badge badge-warning">' + value + '</span>'
}


function formatoMoneyCopago(value, row, index) {
    return value.toMoney(0);
}

$('#modal_acuenta').on('show.bs.modal', async (event) => {
    let rutNum = $(event.relatedTarget).data('rutnum')
    let rut = $(event.relatedTarget).data('rut')

    appModalAcuenta.obtenerLeadDetalle(rut);
    appModalAcuenta.cargaDetalleAcuenta(rutNum);
    appModalAcuenta.obtenerHistorialAcuenta(rut);
    appModalAcuenta.obtenerBeneficiosUsados(rutNum);
    appModalAcuenta.obtenerBeneficiosVigentes();
    cargaDatosDeContacto(rutNum);
    formatMoneyPort();
});

$('#modal_acuenta').on('hidden.bs.modal', function (e) {
    appModalAcuenta.setDefaultsModalData();
})


//contactabilidad
$('#btn-add-contac_acuenta').on('click', function () {
    if ($('#formulario-contac_acuenta').is(':visible')) {
        $('#formulario-contac_acuenta').hide('slow');
    }
    else {
        $('#formulario-contac_acuenta').show('slow');
    }
});

$('#form-registro-contacto_acuenta').bootstrapValidator({
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
        cbClasificacionConctac_acuenta: {
            validators: {
                notEmpty: {
                    message: 'Debe seleccionar una clasificación de contacto'
                }
            }
        },
        afi_NewContacto_acuenta: {
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
    var rutCont = $('#txtRutModalAcuenta').val();
    rutCont = rutCont.substring(0, rutCont.length - 2)
    var objeto_envio_contacto = {
        RutAfiliado: rutCont,
        IdTipoContac: $('#cbtippContac_acuenta').val(),
        GlosaTipoContac: $('select[name="cbtippContac_acuenta"] option:selected').text(),
        IdClasifContac: $('#cbClasificacionConctac_acuenta').val(),
        GlosaClasifContac: $('select[name="cbClasificacionConctac_acuenta"] option:selected').text(),
        DatosContac: $('#afi_NewContacto_acuenta').val()
    }
    $.SecGetJSON(BASE_URL + "/motor/api/Contactos/ingresa-nuevo-contacto", objeto_envio_contacto, function (datos) {
        $("#form-registro-contacto_acuenta").bootstrapValidator('resetForm', true);
        cargaDatosDeContacto(rutCont);
        $("#btn-add-contac_acuenta").trigger("click");
        $.niftyNoty({
            type: 'success',
            icon: 'pli-like-2 icon-2x',
            message: 'Contacto Guardado correctamente.',
            container: '#tab-gestion-3',
            timer: 5000
        });
    });

    });

function cargaDatosDeContacto(rutAf) {

    $("#bdy_datos_contactos_acuenta > tr").remove();
    $("#bdy_datos_contactos_acuenta").html("");

});

    $.SecGetJSON(BASE_URL + "/motor/api/Contactos/lista-contactos-afi", { RutAfiliado: rutAf }, function (contac) {
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

            $("#bdy_datos_contactos_acuenta")
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

function formatMoneyPort() {
    setTimeout(function () {
        $('.money').each(function () {
            num = $(this).val()
            $(this).val(num.toMoney2());
        });
    }, 1000);
}

