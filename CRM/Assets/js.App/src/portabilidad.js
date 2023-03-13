jQuery.support.cors = true;
var appPortabilidad = new Vue({
    el: '#divPortabilidad',
    data: {
        filtros: {
            estados: [],
        },
        modelos: {
            estados: '',
        }
    },
    mounted() {
        this.obtenerEstados();
    },
    methods: {
        obtenerEstados() {
            let padre = 0;
            fetch(`http://${motor_api_server}:4002/portabilidad/lista-estados/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.estados = estadosJSON;
                });
        },

        cargaLeadFiltroPortabilidad() {
            var fechaHoy = new Date();
            var periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
            $("#tblPortabilidad").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/portabilidad/lead-portabilidad`,
                query: {
                    rut: $('#txtRutPortabilidad').val(),
                    dicom: $('#dllDicomPortabilidad').val(),
                    preaprobado: $('#dllPreAprobadoPortabilidad').val(),
                    compra_cartera: $('#dllCompraCarteraPortabilidad').val(),
                    estado: this.modelos.estados,
                    ejecutivo: getCookie('Rut'),
                    oficina: getCookie('Oficina'),
                    periodo: periodo,
                }
            });
        },
    }
});

function formaterRut(value, row, index) {
    return `<a href="#" class="btn-link" data-target="#modal_portabilidad" data-toggle="modal" data-rutnum="${row.rut_num}"  data-rut="${row.rut}" >${row.rut}</a>`;
}


var appModalPortabilidad = new Vue({
    el: '#modal_portabilidad',
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
        dataModalHist: {},
    },
    mounted() {
        this.obtenerEstados();
    },
    methods: {
        obtenerEstados() {
            let padre = 0;
            fetch(`http://${motor_api_server}:4002/portabilidad/lista-estados/${padre}`, {
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
            fetch(`http://${motor_api_server}:4002/portabilidad/lista-estados/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosSubJSON => {
                    this.filtros.subEstadosModal = estadosSubJSON;
                });
        },
        eventoCambiaEstadoPortModal() {
            this.obtenerSubEstados(this.modelos.estadosModal)
        },
        obtenerLeadDetalle(rut) {
            fetch(`http://${motor_api_server}:4002/portabilidad/detalle-lead-portabilidad/${rut}`, {
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
        obtenerHistorialPortabilidad(rut) {
            fetch(`http://${motor_api_server}:4002/portabilidad/historial-portabilidad/${rut}`, {
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
            if ($('#dllEstadoModal').val() == '') {
                $(Swal.fire({
                    title: 'Gestion',
                    html: `<ul><li class="msg-part">Debe seleccionar un estado</li></ul>`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                }));
                return false;
            }

            if ($('#dllSubEstadoModal').val() == '') {
                $(Swal.fire({
                    title: 'Gestion',
                    html: `<ul><li class="msg-part">Debe seleccionar un sub-estado</li></ul>`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                }));
                return false;
            }

            if ($('#txtobservacion').val() == '') {
                $(Swal.fire({
                    title: 'Gestion',
                    html: `<ul><li class="msg-part">Debe ingresar una observación</li></ul>`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                }));
                return false;
            }

            const formData = {
                rut: this.dataModal.rut,
                nombre: this.dataModal.nombre,
                estado: $('select[name="dllEstadoModal"] option:selected').text(),
                subEstado: $('select[name="dllSubEstadoModal"] option:selected').text(),
                observacion: $('#txtobservacionPort').val(),
                rut_ejecutivo: getCookie('Rut'),
                oficina: parseInt(getCookie('Oficina')),
            };

            fetch(`http://${motor_api_server}:4002/portabilidad/guarda-gestion-portabilidad`, {
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
                        container: '#msjPort',
                        timer: 3000
                    });
                    return false;
                }
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Guardada Correctamente.',
                    container: '#msjPort',
                    timer: 3000
                });

            });

            setTimeout(function () {
                appModalPortabilidad.obtenerHistorialPortabilidad($('#txtRutModalPort').val())
            }, 300);
            setTimeout(function () {
                appPortabilidad.cargaLeadFiltroPortabilidad();
            }, 300);

            appModalPortabilidad.setDefaultsModalData()
        },
        setDefaultsModalData() {
            this.modelos = {
                estadosModal: '',
                subEstadosModal: '',
            }
            $('#txtobservacionPort').val("");
        }
    }
});

function formatoMoneyCopago(value, row, index) {
    return value.toMoney(0);
}

$('#modal_portabilidad').on('show.bs.modal', async (event) => {
    let rutNum = $(event.relatedTarget).data('rutnum')
    let rut = $(event.relatedTarget).data('rut')
    await appModalPortabilidad.obtenerLeadDetalle(rut);
    appModalPortabilidad.obtenerHistorialPortabilidad(rut);
    cargaDatosDeContacto(rutNum)
    formatMoneyPort();
});

$('#modal_portabilidad').on('hidden.bs.modal', function (e) {
    appModalPortabilidad.setDefaultsModalData();
})

function formatMoneyPort() {
    setTimeout(function () {
        $('.money').each(function () {
            num = $(this).val()
            $(this).val(num.toMoney2());
        });
    }, 1000);
}


//contactabilidad
$('#btn-add-contac_portabilidad').on('click', function () {
    if ($('#formulario-contac_portabilidad').is(':visible')) {
        $('#formulario-contac_portabilidad').hide('slow');
    }
    else {
        $('#formulario-contac_portabilidad').show('slow');
    }
});

$('#form-registro-contacto_portabilidad').bootstrapValidator({
    excluded: [':disabled', ':not(:visible)'],
    feedbackIcons: [],
    fields: {
        cbtippContac_portabilidad: {
            validators: {
                notEmpty: {
                    message: 'Debe seleccionar un tipo de Contacto'
                }
            }
        },
        cbClasificacionConctac_portabilidad: {
            validators: {
                notEmpty: {
                    message: 'Debe seleccionar una clasificación de contacto'
                }
            }
        },
        afi_NewContacto_portabilidad: {
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
    var rutCont = $('#txtRutModalPort').val();
    rutCont = rutCont.substring(0, rutCont.length - 2)
    var objeto_envio_contacto = {
        RutAfiliado: rutCont,
        IdTipoContac: $('#cbtippContac_portabilidad').val(),
        GlosaTipoContac: $('select[name="cbtippContac_portabilidad"] option:selected').text(),
        IdClasifContac: $('#cbClasificacionConctac_portabilidad').val(),
        GlosaClasifContac: $('select[name="cbClasificacionConctac_portabilidad"] option:selected').text(),
        DatosContac: $('#afi_NewContacto_portabilidad').val()
    }
    $.SecGetJSON(BASE_URL + "/motor/api/Contactos/ingresa-nuevo-contacto", objeto_envio_contacto, function (datos) {
        $("#form-registro-contacto_portabilidad").bootstrapValidator('resetForm', true);
        cargaDatosDeContacto(rutCont);
        $("#btn-add-contac_portabilidad").trigger("click");
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
    $("#bdy_datos_contactos_portabilidad > tr").remove();
    $("#bdy_datos_contactos_portabilidad").html("");

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
                // $("#afiContac").css({ 'display': 'block' })
            }
            else {
                alertFecha = e.FechaContacto.toFecha() + '<i class="badge ' + colorPorc + ' badge-stat badge-icon pull-right add-tooltip" style="position: static; data-toggle="tooltip" data-container="body" data-placement="top" data-original-title="Se debe Actualizar Contacto">' + icon + '</i></i>'
            }

            // var destinoDefault = destino == null ? "#bdy_datos_contactos_portabilidad" : destino;
            $('#bdy_datos_contactos_portabilidad')
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










