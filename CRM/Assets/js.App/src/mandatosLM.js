jQuery.support.cors = true;
var appMandato = new Vue({
    el: '#contMandato',
    data: {
        filtros: {
            empresas: [],
            estado: [],
        },
        modelos: {
            empresas: '',
            estado: '',
        },
        data: {}
    },

    mounted() {
        this.obtenerEmpresas();
        this.obtenerEstados();
    },
    methods: {
        obtenerEmpresas() {
            fetch(`http://${motor_api_server}:4002/mandatos/lista-empresas`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(empresasJSON => {
                    this.filtros.empresas = empresasJSON;
                });
            setTimeout(function () {
                $('#slEmpMandatos').chosen();
            }, 500);
        },

        obtenerEstados() {
            let padre = 0;
            fetch(`http://${motor_api_server}:4002/mandatos/lista-estados/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadoJSON => {
                    this.filtros.estado = estadoJSON;
                });
        },

        cargalistaMandatos() {
            $("#tblMandatos").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/mandatos/leads`,
                query: {
                    mandato: $('#dllTienMandatos').val(),
                    calidad_mandato: $('#slCalidadMandato').val(),
                    //grupo: $('#').val(),
                    campana: $('#slCampana').val(),
                    empresa: $('#slEmpMandatos').val(),
                    oficina: getCookie('Oficina'),
                    estado: $('#slEstadoFil').val(),
                }
            });
        },
    }
});
function idFormatterRut(value, row, index) {
    return `<a href="${value}" class="btn-link"  data-id="${row.id}" data-rut="${row.rut}"  data-toggle="modal" data-target="#modal_mandato" data-backdrop="static" data-keyboard="false">${value}</a>`;
}
function idFormatterEstado(value, row, index) {
    if (value != null) {
        return `<div class="label label-table label-success" style="border-radius: 5px;">${value}</div>`
    }
    else {
        return `----`
    }
}
var appMandatoModal = new Vue({
    el: '#modal_mandato',
    data: {
        filtros: {
            estado: [],
            subEstado: [],

        },
        modelos: {
            estado: '',
            subEstado: '',

        },
        dataModal: {},
        dataModalMan: {}
    },
    mounted() {

    },
    methods: {
        obtenerEstado() {
            let padre = 0
            fetch(`http://${motor_api_server}:4002/mandatos/lista-estados/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadoJSON => {
                    this.filtros.estado = estadoJSON;
                });
        },
        obtenerSubEstados(padre) {
            fetch(`http://${motor_api_server}:4002/mandatos/lista-estados/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(subEstadoSubJSON => {
                    this.filtros.subEstado = subEstadoSubJSON;
                });
        },
        eventoCambiaSubEstado() {
            this.obtenerSubEstados(this.modelos.estado)
        },
        obtenerLeadMandato(id) {
            fetch(`http://${motor_api_server}:4002/mandatos/lead-mandato/${id}`, {
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
        handleSubmitGestionMandatos() {

            if ($('#dllEstadoMandato').val() == '' || $('#dllEstadoMandato').val() == null) {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe Ingresar un Estado.',
                    container: '#msjMan',
                    timer: 3000
                });
                return false;
            }

            if ($('#slSubEstadoMandato').val() == '' || $('#slSubEstadoMandato').val() == null) {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe Ingresar un Sub-Estado.',
                    container: '#msjMan',
                    timer: 3000
                });
                return false;
            }

            if ($('#txtObservacion').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe Ingresar una Observación.',
                    container: '#msjMan',
                    timer: 3000
                });
                return false;
            }


            const formData = {
                rut: $('#txtRut').val(),
                nombre: $('#txtNombre').val(),
                rut_empresa: $('#txtRutEmp').val(),
                nombre_empresa: $('#txtEmpresa').val(),
                estado: $('select[name="dllEstadoMandato"] option:selected').text(),
                sub_estado: $('select[name="slSubEstadoMandato"] option:selected').text(),
                observacion: $('#txtObservacion').val(),
                rut_ejecutivo: getCookie('Rut'),
                oficina: parseInt(getCookie('Oficina')),
                id_lead: $('#txtid').val(),
            };

            fetch(`http://${motor_api_server}:4002/mandatos/guarda-gestion-mandatos`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'Token': getCookie('Token')
                }
            }).then(async (response) => {
                if (!response.ok) {
                    $(Swal.fire({
                        title: 'Error al grabar gestión',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    }));
                    return false;
                }
                $(Swal.fire({
                    title: 'Gestión grabada correctamente!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }));
                appMandatoModal.obtenerHistorialMandato($('#txtid').val())
                appMandato.cargalistaMandatos();

            });
        },
        obtenerHistorialMandato(id) {
            fetch(`http://${motor_api_server}:4002/mandatos/historial-mandato/${id}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.dataModalMan = datos;
                    return datos
                })
        },

        setDefaultsModal() {
            this.modelos = {
                estado: '',
                subEstado: '',
            }
            this.datos_evaM = {}
            $('#txtObservacion').val('');
        },
    }
});

$('#modal_mandato').on('show.bs.modal', async (event) => {
    let id = $(event.relatedTarget).data('id')
    let rut = $(event.relatedTarget).data('rut')
    appMandatoModal.obtenerLeadMandato(id)
    appMandatoModal.obtenerEstado()
    appMandatoModal.obtenerHistorialMandato(id)

    var rutClie = rut
    rutClie = rutClie.substring(0, rutClie.length - 2)
    cargaDatosDeContactoMandato(rutClie)
});

$('#modal_mandato').on('hidden.bs.modal', async (event) => {
    appMandatoModal.setDefaultsModal();
});
//contactabilidad
$('#btn-add-contac_mandato').on('click', function () {
    if ($('#formulario-contac_mandato').is(':visible')) {
        $('#formulario-contac_mandato').hide('slow');
    }
    else {
        $('#formulario-contac_mandato').show('slow');
    }
});
$('#form-registro-contacto_mandato').bootstrapValidator({
    excluded: [':disabled', ':not(:visible)'],
    feedbackIcons: [],
    fields: {
        cbtippContac_retiro: {
            validators: {
                notEmpty: {
                    message: 'Debe seleccionar un tipo de Contacto'
                }
            }
        },
        cbClasificacionConctac_retiro: {
            validators: {
                notEmpty: {
                    message: 'Debe seleccionar una clasificación de contacto'
                }
            }
        },
        afi_NewContacto_retiro: {
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

    var rutClie = $('#txtRut').val()
    rutClie = rutClie.substring(0, rutClie.length - 2)
    var objeto_envio_contacto = {
        RutAfiliado: rutClie,
        IdTipoContac: $('#cbtippContac_mandato').val(),
        GlosaTipoContac: $('select[name="cbtippContac_mandato"] option:selected').text(),
        IdClasifContac: $('#cbClasificacionConctac_mandato').val(),
        GlosaClasifContac: $('select[name="cbClasificacionConctac_mandato"] option:selected').text(),
        DatosContac: $('#afi_NewContacto_mandato').val()
    }
    $.SecGetJSON(BASE_URL + "/motor/api/Contactos/ingresa-nuevo-contacto", objeto_envio_contacto, function (datos) {
        $("#form-registro-contacto_mandato").bootstrapValidator('resetForm', true);
        cargaDatosDeContactoMandato(rutClie);
        $("#btn-add-contac_mandato").trigger("click");
        $.niftyNoty({
            type: 'success',
            icon: 'pli-like-2 icon-2x',
            message: 'Contacto Guardado correctamente.',
            container: '#tab-gestion-3',
            timer: 5000
        });
    });
    return false;

});
function cargaDatosDeContactoMandato(rutAf) {

    $("#bdy_datos_contactos_mandato > tr").remove();
    $("#bdy_datos_contactos_mandato").html("");

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
                //$("#afiContac").css({ 'display': 'block' })
            }
            else {
                alertFecha = e.FechaContacto.toFecha() + '<i class="badge ' + colorPorc + ' badge-stat badge-icon pull-right add-tooltip" style="position: static; data-toggle="tooltip" data-container="body" data-placement="top" data-original-title="Se debe Actualizar Contacto">' + icon + '</i></i>'
            }

            $("#bdy_datos_contactos_mandato")
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
                                    cargaDatosDeContactoretiro(rutAf);
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

