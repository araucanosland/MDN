jQuery.support.cors = true;
var appCallBackTam = new Vue({
    el: '#contCallBackTam',
    data: {
        filtros: {
            estado: [],
            subEstado: [],
            tipo: [],
        },
        modelos: {
            estado: '',
            subEstado: '',
            tipo: '',
        }
    },
    mounted() {
        this.obtenerEstados();
        this.obtenerTipo();
    },
    methods: {

        obtenerEstados() {
            let padre = 0;
            fetch(`http://${motor_api_server}:4002/callBackTam/lista-estados/${padre}`, {
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
            fetch(`http://${motor_api_server}:4002/callBackTam/lista-estados/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadoSubJSON => {
                    this.filtros.subEstado = estadoSubJSON;
                });
        },

        eventoCambiaEstadoCall() {
            this.obtenerSubEstados(this.modelos.estado)
        },

        obtenerTipo() {
            fetch(`http://${motor_api_server}:4002/callBackTam/lista-tipo`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(tipoSubJSON => {
                    this.filtros.tipo = tipoSubJSON;
                });
        },

        cargaLeadFiltroCall() {
            var fechaHoy = new Date();
            var periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
            let estado = $('select[name="dllEstado"] option:selected').text()
            let subEstado = $('select[name="dllSubEstado"] option:selected').text()
            if (estado == 'Todos...') {
                estado = ""
            }
            if (subEstado == 'Todos...') {
                subEstado = ""
            }

            $("#tblCallBackTam").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/callBackTam/lead-callback-tam`,
                query: {
                    estado: estado,
                    subEstado: subEstado,
                    rut: $('#txtRutFiltro').val(),
                    tipo: $('#dllTipo').val(),
                    oficina: getCookie('Oficina'),
                    periodo: periodo,
                }
            });
        },
    }
});

function formaterRut(value, row, index) {
    //let estado = "";
    //if (row.ultimaGestion != null) {
    //    estado = row.ultimaGestion.estado
    //}
    return `<a href="${value}" class="btn-link" data-rut="${row.rut}"  data-toggle="modal" data-target="#modal_callback_tam" data-backdrop="static" data-keyboard="false">${value}</a>`;
}


var appCallBackModal = new Vue({
    el: '#modal_callback_tam',
    data: {
        filtrosM: {
            estadoM: [],
            subEstadoM: [],
        },
        modelosM: {
            estadoM: '',
            subEstadoM: '',
        },
        dataModalHist: {},
        dataModal: {},
    },
    mounted() {

    },
    methods: {

        obtenerLead(rut) {
            fetch(`http://${motor_api_server}:4002/callBackTam/lista-lead-detalle/${rut}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.dataModal = datos;
                    return datos
                });
        },

        obtenerEstados() {
            let padre = 0;
            fetch(`http://${motor_api_server}:4002/callBackTam/lista-estados/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtrosM.estadoM = estadosJSON;
                });
        },

        obtenerSubEstados(padre) {
            fetch(`http://${motor_api_server}:4002/callBackTam/lista-estados/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosSubJSON => {
                    this.filtrosM.subEstadoM = estadosSubJSON;
                });
        },

        eventoCambiaEstado() {
            this.obtenerSubEstados(this.modelosM.estadoM)
        },

        obtenerHistorial(rut) {
            fetch(`http://${motor_api_server}:4002/callBackTam/lista-historial/${rut}`, {
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

            let tipo = $('#txtTipo').val();
            let estado = '';
            let sub_estado = '';
            let fechaHoy = new Date();
            let periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');


            if ($('#dllEstadoCallTamModal').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe seleccionar un estado.',
                    container: '#msjCallTam',
                    timer: 3000
                });
                return false;
            }

            if ($('#dllSubEstadoCallTamModal').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe seleccionar un Sub-Estado.',
                    container: '#msjCallTam',
                    timer: 3000
                });
                return false;
            }
            
            if ($('#txtObservacion').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar una observación.',
                    container: '#msjCallTam',
                    timer: 3000
                });
                return false;
            }

            const formData = {
                rut: $('#txtRutClie').val(),
                nombre: $('#txtNombreClie').val(),
                estado: $('select[name="dllEstadoCallTamModal"] option:selected').text(),
                subEstado: $('select[name="dllSubEstadoCallTamModal"] option:selected').text(),
                observacion: $('#txtObservacion').val(),
                fecha_compromiso: $('#ges_prox_compromiso').val(),
                rut_ejecutivo: getCookie('Rut'),
                oficina: parseInt(getCookie('Oficina')),
                periodo: periodo,
            };

            fetch(`http://${motor_api_server}:4002/callBackTam/guarda-gestion-call-tam`, {
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
                        container: '#msjCallTam',
                        timer: 3000
                    });
                    return false;
                }
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Guardada Correctamente.',
                    container: '#msjCallTam',
                    timer: 3000
                });

            });
            //setTimeout(function () {
            //    this.appCallBackModal.setDefaultsModalData();
            //}, 300);
            setTimeout(function () {
                this.appCallBackModal.obtenerHistorial($('#txtRutClie').val())
            }, 300);
            setTimeout(function () {
                this.appCallBackTam.cargaLeadFiltroCall();
            }, 300);
        },
        setDefaultsModalData() {
            this.modelosM = {
                estadoM: '',
                subEstadoM: ''
            }
            this.dataModal = {}
            $('#ges_prox_compromiso').val('');
        }
    },
});


$('#modal_callback_tam').on('show.bs.modal', async (event) => {
    let rut = $(event.relatedTarget).data('rut')
    appCallBackModal.obtenerLead(rut);
    appCallBackModal.obtenerEstados();
    appCallBackModal.obtenerHistorial(rut);

    let rutAf = rut.substring(0, rut.indexOf('-'));
    cargaDatosDeContacto(rutAf, '#bdy_datos_contactos_normalizacion')

    $('#dp-component-atencion .input-group.date').datepicker(
        { autoclose: true, format: 'dd-mm-yyyy', language: "es", daysOfWeekDisabled: [6, 0], todayHighlight: true }
    ).on('changeDate', function (event) {
        event.stopPropagation();
    }).on('show.bs.modal hide.bs.modal', function (event) {
        event.stopPropagation();
    });
});


$('#modal_callback_tam').on('hidden.bs.modal', async (event) => {
    appCallBackModal.setDefaultsModalData();
});


$('#btn-add-contac-normalizacion').on('click', function () {
    // console.log('Visibiliadad', $('#formulario-contac').is(':visible'));
    if ($('#formulario-contac_normalizacion').is(':visible')) {
        $('#formulario-contac_normalizacion').hide('slow');
    }
    else {
        $('#formulario-contac_normalizacion').show('slow');
    }

});


$('#form-registro-contacto_norm').bootstrapValidator({
    excluded: [':disabled', ':not(:visible)'],
    feedbackIcons: [],
    fields: {
        cbtippContac_norm: {
            validators: {
                notEmpty: {
                    message: 'Debe seleccionar un tipo de Contacto'
                }
            }
        },
        cbClasificacionConctac_norm: {
            validators: {
                notEmpty: {
                    message: 'Debe seleccionar una clasificación de contacto'
                }
            }
        },
        afi_NewContacto_norm: {
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

    var rutClie = $('#txtRutClie').val()
    // rutClie = rutClie.substring(0, rutClie.length - 2)

    var objeto_envio_contacto = {
        RutAfiliado: rutClie,
        IdTipoContac: $('#cbtippContac_norm').val(),
        GlosaTipoContac: $('select[name="cbtippContac_norm"] option:selected').text(),
        IdClasifContac: $('#cbClasificacionConctac_norm').val(),
        GlosaClasifContac: $('select[name="cbClasificacionConctac_norm"] option:selected').text(),
        DatosContac: $('#afi_NewContacto_norm').val()
    }
    $.SecGetJSON(BASE_URL + "/motor/api/Contactos/ingresa-nuevo-contacto", objeto_envio_contacto, function (datos) {
        $("#form-registro-contacto_norm").bootstrapValidator('resetForm', true);
        // $('#demo-lg-modal-new').modal('hide');
        cargaDatosDeContacto($('#txtRutClie').val(), '#bdy_datos_contactos_normalizacion');
        $("#btn-add-contac-normalizacion").trigger("click");
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

function cargaDatosDeContacto(rutAf, destino = null) {

    if (destino != null) {
        //$(`${destino} > tr`).remove();
        //$(destino).html("");
        $("#bdy_datos_contactos_normalizacion > tr").remove();
        $("#bdy_datos_contactos_normalizacion").html("");
    }
    else {
        $("#bdy_datos_contactos_normalizacion > tr").remove();
        $("#bdy_datos_contactos_normalizacion").html("");
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

            var destinoDefault = destino == null ? "#bdy_datos_contactos_normalizacion" : destino;
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




















