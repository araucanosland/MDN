jQuery.support.cors = true;
var appPortabilidad = new Vue({
    el: '#page-content',
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
        this.obtenerEstados();
    },
    methods: {
        obtenerEstados() {
            let padre = 0;
            fetch(`http://${motor_api_server}:4002/retiro/lista-estados/${padre}`, {
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
            fetch(`http://${motor_api_server}:4002/retiro/lista-estados/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(subEstadosSubJSON => {
                    this.filtros.subEstados = subEstadosSubJSON;
                });
        },
        eventoCambSubEstado() {
            this.obtenerSubEstados(this.modelos.estados)
        },
        cargaLeadFiltroRetiro() {
            let estado_ = $('select[name="dllEstadoRetiro"] option:selected').text()
            let sub_estado_ = $('select[name="dllSubEstadoRetiro"] option:selected').text()
            if (estado_ == 'Todos...') {
                estado_ = ""
            }
            if (sub_estado_ == 'Todos...') {
                sub_estado_ = ""
            }

            $("#tblRetiro").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/retiro/lead-retiro`,
                query: {
                    rut: $('#txtRutFiltro').val(),
                    estado: estado_,
                    subEstado: sub_estado_,
                    prioridad: $('#slPrioridad').val(),
                    ejecutivo_asignado: getCookie('Rut'),
                    oficina: getCookie('Oficina'),
                }
            });
        },
    }
});
function formaterRut(value, row, index) {
    return `<a href="#" class="btn-link" data-target="#modal-search-retiro" data-toggle="modal" data-rutnum="${row.rutnum}"  data-rut="${row.rut}" >${row.rut}</a>`;
}
function formatoMoneyRetiro(value, row, index) {
    return value.toMoney(0);
}
var appModalRetiro = new Vue({
    el: '#modal-search-retiro',
    data: {
        filtrosM: {
            estadosM: [],
            subEstadosM: [],
            oficina: [],
            ejecutivos: [],
        },
        modelosM: {
            estadosM: '',
            subEstadosM: '',
            oficina: '',
            ejecutivos: '',
        },
        dataModal: {},
        dataEjecutivo: {},
        dataModalHist: {},

    },
    mounted() {
        this.obtenerOficina();
    },
    methods: {
        obtenerOficina() {
            fetch(`http://${motor_api_server}:4002/retiro/lista-oficina-retiro`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(oficinaJSON => {
                    this.filtrosM.oficina = oficinaJSON;
                });
        },
        eventoCambOficinaM() {
            this.obtenerEjecutivosOficina(this.modelosM.oficina)
        },
        obtenerEjecutivosOficina(oficina) {
            var fechaHoy = new Date();
            var periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
            fetch(`http://${motor_api_server}:4002/retiro/lista-ejecutivo-oficina/${periodo}/${oficina}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(ejecutivosSubJSON => {
                    this.filtrosM.ejecutivos = ejecutivosSubJSON;
                });
        },
        obtenerEstadosM() {
            let padre = 0;
            fetch(`http://${motor_api_server}:4002/retiro/lista-estados/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtrosM.estadosM = estadosJSON;
                });
        },
        obtenerSubEstados(padre) {
            fetch(`http://${motor_api_server}:4002/retiro/lista-estados/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(subEstadosSubJSON => {
                    this.filtrosM.subEstadosM = subEstadosSubJSON;
                });
        },
        eventoCambSubEstadoM() {
            this.obtenerSubEstados(this.modelosM.estadosM)
        },
        cargaAfiliadoRetiro(rut_) {
            var fechaHoy = new Date();
            var periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
            fetch(`http://${motor_api_server}:4002/retiro/busca-afiliado-retiro/${rut_}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.dataModal = datos;
                    if (datos.ejecutivo_asignado != '') {
                        fetch(`http://${motor_api_server}:4002/retiro/lista-ejecutivo-asignado/${periodo}/${datos.ejecutivo_asignado}`, {
                            method: 'GET',
                            mode: 'cors',
                            cache: 'default'
                        })
                            .then(response => response.json())
                            .then(datos => {
                                this.dataEjecutivo = datos[0];
                                return datos
                            })
                        $('#divNoAsignado').css('display', 'none');
                        $('#divAsignado').css('display', 'block');

                    }
                    else {
                        $('#divAsignado').css('display', 'none');
                        $('#divNoAsignado').css('display', 'block');
                    }
                    return datos
                })

        },
        cargaAfiliadoRetiroSearch() {
            var fechaHoy = new Date();
            var periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
            let rut_ = $('#afi_rut_retiro').val()
            fetch(`http://${motor_api_server}:4002/retiro/busca-afiliado-retiro/${rut_}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.dataModal = datos;
                    if (datos.ejecutivo_asignado != '') {
                        fetch(`http://${motor_api_server}:4002/retiro/lista-ejecutivo-asignado/${periodo}/${datos.ejecutivo_asignado}`, {
                            method: 'GET',
                            mode: 'cors',
                            cache: 'default'
                        })
                            .then(response => response.json())
                            .then(datos => {
                                this.dataEjecutivo = datos[0];
                                return datos
                            })

                        appModalRetiro.obtenerHistorialRetiro(rut_);
                        var rutClie = rut_
                        rutClie = rutClie.substring(0, rutClie.length - 2)
                        cargaDatosDeContactoretiro(rutClie)

                        $('#divNoAsignado').css('display', 'none');
                        $('#divAsignado').css('display', 'block');

                    }
                    else {
                        $('#divAsignado').css('display', 'none');
                        $('#divNoAsignado').css('display', 'block');
                    }
                    return datos
                })
        },
        handleSubmitGestionRetiro() {

            if ($('#slEstadoMRetiro').val() == "") {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar un estado...',
                    container: '#msjRetiro',
                    timer: 3000
                });
                return false;
            }
            if ($('#slSubEstadoMRetiro').val() == "") {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar un sub-estado...',
                    container: '#msjRetiro',
                    timer: 3000
                });
                return false;
            }
            if ($('#txtCometariosRetiro').val() == "") {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar un comentario...',
                    container: '#msjRetiro',
                    timer: 3000
                });
                return false;
            }

            const formData = {

                rut: $('#txtRutAfiAcuerdo').val(),
                nombre: $('#txtNombAfiAcuerdo').val(),
                estado: $('select[name="slEstadoMRetiro"] option:selected').text(),
                sub_estado: $('select[name="slSubEstadoMRetiro"] option:selected').text(),
                fecha_agendamiento: $('#dpfechaAgenRetiro').val(),
                comentarios: $('#txtCometariosRetiro').val(),
                oficina: parseInt(getCookie('Oficina')),
                rut_ejecutivo: getCookie('Rut'),
                nom_ejecutivo: getCookie('Usuario'),
            };
            fetch(`http://${motor_api_server}:4002/retiro/guarda-gestion-retiro`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'Token': getCookie('Token')
                }
            }).then(async (response) => {
                if (!response.ok) {
                    $(Swal.fire({
                        title: 'Error al guardar gestion',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    }));
                    return false;
                }
                Swal.fire({
                    title: 'Gestion ingresada correctamente!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                appModalRetiro.obtenerHistorialRetiro($('#txtRutAfiAcuerdo').val());
                appPortabilidad.cargaLeadFiltroRetiro();

            });
        },
        handleSubmitAsignaEjecutivoRetiro() {
            if ($('#dllOfinaRetiro').val() == "") {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar una sucursal...',
                    container: '#msjRetiro',
                    timer: 3000
                });
                return false;
            }
            if ($('#dllEjecutivosR').val() == "") {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar un ejecutivo...',
                    container: '#msjRetiro',
                    timer: 3000
                });
                return false;
            }

            const formDataAsigna = {
                rut: $('#txtRutAfiAcuerdo').val(),
                rutEjecutivo: $('#dllEjecutivosR').val(),
                oficina: $('#dllOfinaRetiro').val(),
            };
            fetch(`http://${motor_api_server}:4002/retiro/asigna-ejecutivo-retiro`, {
                method: 'POST',
                body: JSON.stringify(formDataAsigna),
                headers: {
                    'Content-Type': 'application/json',
                    'Token': getCookie('Token')
                }
            }).then(async (response) => {
                if (!response.ok) {
                    $(Swal.fire({
                        title: 'Error al asignar ejecutivo',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    }));
                    return false;
                }
                Swal.fire({
                    title: 'Se asigno correctamente!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                appModalRetiro.cargaAfiliadoRetiro($('#txtRutAfiAcuerdo').val())
            });
        },
        obtenerHistorialRetiro(rut) {
            fetch(`http://${motor_api_server}:4002/retiro/historial-retiro/${rut}`, {
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
        setDefaultsModal() {
            this.modelosM = {
                estadosM: '',
                subEstadosM: '',
                oficina: '',
                ejecutivos: '',
            }
            this.dataModal = {}
            this.dataEjecutivo = {}
            $('#txtCometariosRetiro').val('');
            $('#afi_rut_retiro').val('');
            //$('.limpiarUni').html('');
            $('#dpfechaAgenRetiro').val('');
            $('#dpFechaAgen').css('display', 'none')
        },
    }
});

$('#modal-search-retiro').on('show.bs.modal', async (event) => {
    if ($(event.relatedTarget).data('evento') == 1) {
        $('#dvDatosAfiliado').css('display', 'block');
    }
    else {
        $('#dvDatosAfiliado').css('display', 'none');
    }

    let rutNum = $(event.relatedTarget).data('rutnum')
    let rut = $(event.relatedTarget).data('rut')

    $('#demo-dp-component_retiro .input-group.date').datepicker(
        { autoclose: true, format: 'dd-mm-yyyy', language: "es", daysOfWeekDisabled: [6, 0], todayHighlight: true }
    ).on('changeDate', function (event) {
        event.stopPropagation();
    }).on('show.bs.modal hide.bs.modal', function (event) {
        event.stopPropagation();
    });
    
    appModalRetiro.obtenerEstadosM();
    appModalRetiro.cargaAfiliadoRetiro(rut);
    appModalRetiro.obtenerHistorialRetiro(rut);
    cargaDatosDeContactoretiro(rutNum)

});
$('#modal-search-retiro').on('hidden.bs.modal', function (e) {
    appModalRetiro.setDefaultsModal();
})
function formatMoneyPort() {
    setTimeout(function () {
        $('.money').each(function () {
            num = $(this).val()
            $(this).val(num.toMoney2());
        });
    }, 1000);
}
$('#slSubEstadoMRetiro').change(function (e) {
    switch (this.value) {
        case "101":
            $('#dpFechaAgen').css('display', 'block')
            break;
        case "103":
            $('#dpFechaAgen').css('display', 'block')
            break;
        case "104":
            $('#dpFechaAgen').css('display', 'block')
            break;
        case "105":
            $('#dpFechaAgen').css('display', 'block')
            break;
        case "109":
            $('#dpFechaAgen').css('display', 'block')
            break;
        case "201":
            $('#dpFechaAgen').css('display', 'block')
            break;
    }
    if (this.value != 101 && this.value != 103 && this.value != 104 && this.value != 105 && this.value != 109 && this.value != 201) {
        $('#dpFechaAgen').css('display', 'none')
    }
});
$('#slEstadoMRetiro').change(function (e) {
    $('#dpFechaAgen').css('display', 'none')
});
//contactabilidad
$('#btn-add-contac_retiro').on('click', function () {
    if ($('#formulario-contac_retiro').is(':visible')) {
        $('#formulario-contac_retiro').hide('slow');
    }
    else {
        $('#formulario-contac_retiro').show('slow');
    }
});
$('#form-registro-contacto_retiro').bootstrapValidator({
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

    var rutClie = $('#txtRutAfiAcuerdo').val()
    rutClie = rutClie.substring(0, rutClie.length - 2)

    var objeto_envio_contacto = {
        RutAfiliado: rutClie,
        IdTipoContac: $('#cbtippContac_retiro').val(),
        GlosaTipoContac: $('select[name="cbtippContac_retiro"] option:selected').text(),
        IdClasifContac: $('#cbClasificacionConctac_retiro').val(),
        GlosaClasifContac: $('select[name="cbClasificacionConctac_retiro"] option:selected').text(),
        DatosContac: $('#afi_NewContacto_retiro').val()
    }
    $.SecGetJSON(BASE_URL + "/motor/api/Contactos/ingresa-nuevo-contacto", objeto_envio_contacto, function (datos) {
        $("#form-registro-contacto_retiro").bootstrapValidator('resetForm', true);
        cargaDatosDeContactoretiro(rutClie);
        $("#btn-add-contac_retiro").trigger("click");
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
function cargaDatosDeContactoretiro(rutAf) {

    $("#bdy_datos_contactos_retiro > tr").remove();
    $("#bdy_datos_contactos_retiro").html("");

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

            $("#bdy_datos_contactos_retiro")
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
$('.numero').keyup(function () {
    var val = $(this).val();
    if (isNaN(val)) {
        val = val.replace(/[^0-9\.]/g, '');
        if (val.split('.').length > 2)
            val = val.replace(/\.+$/, "");
    }
    $(this).val(val);
});










