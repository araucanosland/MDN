jQuery.support.cors = true;
var appCallBack = new Vue({
    el: '#callBack',
    data: {
        filtros: {
            estados: [],
            subEstados: [],
            estadosDsp: [],
        },
        modelos: {
            estados: '',
            subEstados: '',
            estadosDsp: '',
        }
    },
    mounted() {
        this.obtenerLead();
        this.obtenerEstados();
    },
    methods: {

        obtenerEstados() {
            let padre = 0;
            fetch(`http://${motor_api_server}:4002/atencion-cliente/estados-call-back/${padre}`, {
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
            fetch(`http://${motor_api_server}:4002/atencion-cliente/estados-call-back/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosSubJSON => {
                    this.filtros.subEstados = estadosSubJSON;
                });
        },

        eventoCambiaEstadoCall() {
            this.obtenerSubEstados(this.modelos.estados)
        },

        obtenerLead() {
            let oficina = getCookie("Oficina");
            $("#tblCall").bootstrapTable({
                url: `http://${motor_api_server}:4002/atencion-cliente/lead-call/${oficina}`
            });
        },

        cargaLeadCall() {
            let oficina = getCookie("Oficina");
            $("#tblCall").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/atencion-cliente/lead-call/${oficina}`,
            });
        },

        cargaLeadFiltroCall() {
            let estado = $('select[name="dllEstadoCall"] option:selected').text()
            let subEstado = $('select[name="dllSubEstadoCall"] option:selected').text()
            if (estado == 'Todos...') {
                estado = ""
            }
            if (subEstado == 'Todos...') {
                subEstado = ""
            }

            $("#tblCall").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/atencion-cliente/leads-filtro-call`,
                query: {
                    estado: estado,
                    sub_estado: subEstado,
                    rut: $('#txtRutFiltroCall').val(),
                    tipo: $('#dllTipo').val(),
                    rut_ejecutivo: getCookie('Rut'),
                    oficina: getCookie('Oficina'),
                }
            });
        },
    }
});

function formaterRut(value, row, index) {
    let estado = "";
    if (row.ultimaGestion != null) {
        estado = row.ultimaGestion.estado
    }
    return `<a href="${value}" class="btn-link" data-tipo="${row.tipo}" data-motivonoresuelto="${row.motivoNoResuelto}" data-comentarios="${row.comentarios}" data-idlead="${row.id}" data-flujo="${row.flujo}" data-nombre="${row.nombre}" data-rut="${row.rut}" data-fono="${row.telefonoContacto}"  data-toggle="modal" data-target="#modal_atencion_call" data-backdrop="static" data-keyboard="false">${value}</a>`;
}

var appCallBackModal = new Vue({
    el: '#modal_atencion_call',
    data: {
        filtrosM: {
            estadosM: [],
            subEstadosM: [],
            estadosDspM: [],
        },
        modelosM: {
            estadosM: '',
            subEstadosM: '',
            estadosDspM: '',
        },
        dataModalHist: {},
    },
    mounted() {

    },
    methods: {

        obtenerEstados() {
            let padre = 0;
            fetch(`http://${motor_api_server}:4002/atencion-cliente/estados-call-back/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtrosM.estadosM = estadosJSON;
                    console.log({
                    })
                });
        },
        obtenerSubEstados(padre) {
            fetch(`http://${motor_api_server}:4002/atencion-cliente/estados-call-back/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosSubJSON => {
                    this.filtrosM.subEstadosM = estadosSubJSON;
                });
        },

        obtenerEstadosMDsp() {
            let padre = 0;
            fetch(`http://${motor_api_server}:4002/atencion-cliente/estados-dsp/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosDspMJSON => {
                    this.filtrosM.estadosDspM = estadosDspMJSON;
                });
        },

        eventoCambiaEstado() {
            this.obtenerSubEstados(this.modelosM.estadosM)
        },

        eventoCambiaEstadoDsp() {
            this.obtenerSubEstados(this.modelosM.estadosDspM)
        },

        obtenerHistorial(rut) {
            fetch(`http://${motor_api_server}:4002/atencion-cliente/historial-call-back/${rut}`, {
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
            if (tipo == 'CallBack') {

                if ($('#dllEstadoCallModal').val() == '') {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Debe seleccionar un estado.',
                        container: '#msjCall',
                        timer: 3000
                    });
                    return false;
                }

                if ($('#dllEstadoCallModal').val() != 3) {
                    if ($('#dllSubEstadoCallModal').val() == '') {
                        $.niftyNoty({
                            type: 'danger',
                            message: 'Debe seleccionar un sub-estado.',
                            container: '#msjCall',
                            timer: 3000
                        });
                        return false;
                    }
                    else {
                        sub_estado = $('select[name="dllSubEstadoCallModal"] option:selected').text()
                    }
                }
                else {
                    sub_estado = "";
                }

                estado = $('select[name="dllEstadoCallModal"] option:selected').text()
            }
            else {

                if ($('#dllEstadoCallModalSinResp').val() == '') {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Debe seleccionar un estado.',
                        container: '#msjCall',
                        timer: 3000
                    });
                    return false;
                }
                if ($('#dllEstadoCallModal').val() != 3) {
                    if ($('#dllSubEstadoCallModal').val() == '') {
                        $.niftyNoty({
                            type: 'danger',
                            message: 'Debe seleccionar un sub-estado.',
                            container: '#msjCall',
                            timer: 3000
                        });
                        return false;
                    }
                    else {
                        sub_estado = $('select[name="dllSubEstadoCallModal"] option:selected').text()
                    }
                }
                else {
                    sub_estado = "";
                }
                estado = $('select[name="dllEstadoCallModalSinResp"] option:selected').text()
            }


            if ($('#txtRespuestaCall').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar una respuesta.',
                    container: '#msjCall',
                    timer: 3000
                });
                return false;
            }

            const formData = {
                id_lead: $('#txtidLeadCall').val(),
                rut: $('#txtRutCall').val(),
                nombre: $('#txtNombreCall').val(),
                estado: estado,
                sub_estado: sub_estado,
                respuesta: $('#txtRespuestaCall').val(),
                rut_ejecutivo: getCookie('Rut'),
                oficina: parseInt(getCookie('Oficina')),
                fono: $('#txtFonoCall').val(),
            };

            fetch(`http://${motor_api_server}:4002/atencion-cliente/guardar-gestion-call-back`, {
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
                        container: '#msjCall',
                        timer: 3000
                    });
                    return false;
                }
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Guardada Correctamente.',
                    container: '#msjCall',
                    timer: 3000
                });

            });
            setTimeout(function () {
                this.appCallBackModal.setDefaultsModalData();
            }, 300);
            setTimeout(function () {
                this.appCallBackModal.obtenerHistorial($('#txtRutCall').val())
            }, 300);
            setTimeout(function () {
                this.appCallBack.cargaLeadCall();
            }, 300);




            //this.appCallBack.obtenerLead();
        },
        setDefaultsModalData() {
            this.modelosM = {
                estadosM: '',
                subEstadosM: ''
            }
            $('#dllEstadoCallModal').val('')
            $('#dllSubEstadoCallModal').val('')
            $('#txtRespuestaCall').val('')
        }
    },
});


$('#modal_atencion_call').on('show.bs.modal', async (event) => {
    let rut = $(event.relatedTarget).data('rut')
    let fono = $(event.relatedTarget).data('fono')
    let nombre = $(event.relatedTarget).data('nombre')
    let flujo = $(event.relatedTarget).data('flujo')
    let idlead = $(event.relatedTarget).data('idlead')

    let tipo = $(event.relatedTarget).data('tipo')
    let motivoNoResuelto = $(event.relatedTarget).data('motivonoresuelto')
    let comentarios = $(event.relatedTarget).data('comentarios')

    $('#txtidLeadCall').val(idlead);
    $('#txtRutCall').val(rut);
    $('#txtNombreCall').val(nombre);
    $('#txtFonoCall').val(fono);
    $('#txtFlujoCall').val(flujo);
    $('#txtTipo').val(tipo);
    $('#txtMotivoNResuelto').val(motivoNoResuelto);
    $('#txtComentario').val(comentarios);

    if (tipo == "CallBack") {
        appCallBackModal.obtenerEstados();
        $('#dllEstadoCallModalSinResp').css('display', 'none')
        $('#dllEstadoCallModal').css('display', 'block')
        $('#dllSubEstadoCallModal').css('display', 'block')

    }
    else {
        appCallBackModal.obtenerEstadosMDsp()
        $('#dllEstadoCallModal').css('display', 'none')
        //$('#dllSubEstadoCallModal').css('display', 'none')
        $('#dllEstadoCallModalSinResp').css('display', 'block')
    }

    appCallBackModal.obtenerHistorial(rut);

    let rutAf = rut.substring(0, rut.indexOf('-'));
    cargaDatosDeContacto(rutAf, '#bdy_datos_contactos_normalizacion')
});

$('#modal_atencion_call').on('hidden.bs.modal', async (event) => {
    $('#txtRutCall').val("");
    $('#txtFonoCall').val("");
    $('#txtRespuestaCall').val("");
});

$('#dllEstadoCallModal').change(function (e) {

    switch (this.value) {

        case "3":
            $("#dllSubEstadoCallModal").prop("disabled", true);
            setTimeout(function () {
                $("#dllSubEstadoCallModal").val("")
            }, 800);

            break;
    }
    if (this.value != 3) {
        $("#dllSubEstadoCallModal").prop("disabled", false);
    }
});

$('.input-number').on('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
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




















