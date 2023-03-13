jQuery.support.cors = true;
var appAcuerdoPagosFiltros = new Vue({
    el: '#demo-lft-tab-8',
    data: {
        filtros: {
            causas: [],
            estados: [],
            subEstados: [],
            prioridad: [],
            vencimiento: [],
            estadoCliente: [],
            tipoCampana: [],
            derivacion: [],
            prioridad: []
        },
        modelos: {
            estado: '',
            subEstado: '',
            causa: '',
            prioridad: '',
            estadoCliente: '',
            tipoCampana: '',
            derivacion: '',
            prioridad: ''
        }
    },
    mounted() {
        this.obtenerCausasAcuerdoPago();
        this.obtenerEstadosAcuerdoPago();
        this.obtenerEstadoCliente();
        this.obtenerTipoCamapana();
        this.loadTablaAcuerdoPago();
        this.obtenerDerivacion();
        this.obtenerPrioridad();
    },
    updated() {
        // console.log('cambió')
    },
    methods: {
        obtenerCausasAcuerdoPago() {
            fetch(`http://${motor_api_server}:4002/acuerdopago/causas`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(causasJSON => {
                    this.filtros.causas = causasJSON;
                });
        },
        obtenerEstadosAcuerdoPago() {
            fetch(`http://${motor_api_server}:4002/acuerdopago/estados`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.estados = estadosJSON;
                });
        },
        obtenerEstadoCliente() {
            fetch(`http://${motor_api_server}:4002/acuerdopago/estadoCliente`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.estadoCliente = estadosJSON;
                });
        },

        obtenerTipoCamapana() {
            fetch(`http://${motor_api_server}:4002/acuerdopago/tipocampana`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.tipoCampana = estadosJSON;
                });
        },

        obtenerDerivacion() {
            fetch(`http://${motor_api_server}:4002/acuerdopago/derivacion`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.derivacion = estadosJSON;
                });
        },

        obtenerPrioridad() {
            fetch(`http://${motor_api_server}:4002/acuerdopago/Prioridad`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.prioridad = estadosJSON;
                });
        },

        obtenerSubEstados(padre) {
            fetch(`http://${motor_api_server}:4002/acuerdopago/estados?padre=${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosSubJSON => {
                    this.filtros.subEstados = estadosSubJSON;
                });
        },
        eventoCambiaEstado() {

            this.obtenerSubEstados(this.modelos.estado)

        },
        handleEventoClickFiltrar() {
           
            var fechaHoy = new Date();
            var periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
            $("#tabla_recuperaciones_acuerdo").bootstrapTable('refresh', {                
                url: `http://${motor_api_server}:4002/acuerdopago/leads`,
                query: {
                    periodo: periodo,
                    asignado: getCookie('Rut'),
                    causa: this.modelos.causa,
                    estado: this.modelos.estado,
                    subEstado: this.modelos.subEstado,
                    prioridad: this.modelos.prioridad,
                    estadoCliente: this.modelos.estadoCliente,
                    tipoCampana: this.modelos.tipoCampana,
                    derivacion: this.modelos.derivacion,
                    fechaCompromiso: $("#vencidos_acuerdo_pago").val(),
                    oficina: getCookie('Oficina'),
                    cargo: getCookie('Cargo'),
                    oficinasAgenteterritotial: $("#ddloatacuerdopago").val()
                }
            });
        },
        loadTablaAcuerdoPago() {
            $("#tabla_recuperaciones_acuerdo").bootstrapTable();
        }
    },
    computed: {

    }
});


function AcuerdoPagoLinkFormatter(value, row, index) {
    return `<a href="#" class="btn-link" data-target="#mdl_data_acuerdo_pago" data-toggle="modal" data-lead="${row.id}" data-periodo="${row.periodo}" data-rut="${value}" >${value}</a>`;
}

function AcuerdoPagoNombresFormatter(value, row, index) {
   
    return value + ' ' + row.afiliado.apellidos;
}

function AcuerdoPagoPrioridadFormatter(value, row, index) {
    return value.toString().toEtiquetaPrioridad();
}

function formatoMoneyFormatterAcuerdo(value, row, index) {
    return value.toMoney(0);
}

function AcuerdoPagoEstadoAfiliadoFormatter(value, row, index) {

    if (row.gestiones.length > 0) {
        const maximo = Math.max.apply(Math, row.gestiones.map(function (o) { return o.estadoCliente.id; }));
        const objetoFinal = row.gestiones.find((e) => {
            return e.estadoCliente.id === maximo;
        });
        return `<span class="${objetoFinal.estadoCliente.color}">${objetoFinal.estadoCliente.estado}</span>`
    }
    return 'Sin Gestion';
}

function AcuerdoPagoFechaCompromisoAfiliadoFormatter(value, row, index) {

    if (row.gestiones.length > 0) {
        let n = row.gestiones.length - 1
        const maximo = row.gestiones[n]
        if (maximo.fechaCompromiso != null && maximo.fechaCompromiso != "") {
            return maximo.fechaCompromiso.toFecha();
        }
        else {
            return 'Sin Compromiso.'
        }
    }
    return '------';
}





function NombreEmpresaFormatter(value, row, index) {
    return row.empresa.nombre;
}

var appAcuerdoPagoModal = new Vue({
    el: '#mdl_data_acuerdo_pago',
    data: {
        filtrosModal: {
            causasModal: [],
            estadosModal: [],
            subEstadosModal: [],
            estadoCliente: []
        },
        modelosModal: {
            estado: '',
            subEstado: '',
            causaBasal: '',
            fechaCompromiso: '',
            comentarios: ''
        },
        comportamientos: {
            mostrarProximaGestion: false
        },
        dataModal: {}
    },
    mounted() {
        this.obtenerCausasModal();
        this.obtenerEstadosModal();
        this.obtenerEstadoClienteModal();
    },
    updated() {
        //console.log('cambió', {
        //    form: this.modelosModal
        //})
    },
    methods: {
        obtenerCausasModal() {
            fetch(`http://${motor_api_server}:4002/acuerdopago/causas`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(causasJSON => {
                    this.filtrosModal.causasModal = causasJSON;
                });
        },
        obtenerEstadoCliente(datos) {
            if (datos.gestiones.length > 0) {
                const maximo = Math.max.apply(Math, datos.gestiones.map(function (o) { return o.estadoCliente.id; }));
                const objetoFinal = datos.gestiones.find((e) => {
                    return e.estadoCliente.id === maximo;
                });
                $("#estadoClieModal").html(`<span class="${objetoFinal.estadoCliente.color}">${objetoFinal.estadoCliente.estado}</span>`);
            } else {
                $("#estadoClieModal").html('Sin Gestion');
            }
        },
        obtenerEstadosModal() {
            fetch(`http://${motor_api_server}:4002/acuerdopago/estados`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtrosModal.estadosModal = estadosJSON;
                });
        },
        obtenerSubEstadosModal(padre) {
            fetch(`http://${motor_api_server}:4002/acuerdopago/estados?padre=${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosSubJSON => {
                    this.filtrosModal.subEstadosModal = estadosSubJSON;
                });
        },
        obtenerEstadoClienteModal() {
            fetch(`http://${motor_api_server}:4002/acuerdopago/estadoCliente`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtrosModal.estadoCliente = estadosJSON;
                });
        },
        eventoCambiaEstadoModal() {
            this.obtenerSubEstadosModal(this.modelosModal.estado)
        },
        manejarVisibilidadCalendario() {
            const sbestado = this.filtrosModal.subEstadosModal.find(est => est.id == this.modelosModal.subEstado);
            this.comportamientos.mostrarProximaGestion = (new RegExp('--compromiso')).test(sbestado.opciones);
        },
        obtenerLead(rut) {
            fetch(`http://${motor_api_server}:4002/acuerdopago/leads/${rut}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.dataModal = datos;
                    return datos
                }).then(x => {
                    this.obtenerEstadoCliente(x);
                });
        },
        handleSubmitAcuerdoPago() {

            let valContact = $('#slEstadoAcuerdoPago').val();

            const formData = {
                lead: this.dataModal.id,
                ...this.modelosModal,
                rutEjecutivo: getCookie('Rut'),
                nombreEjecutivo: getCookie('Usuario'),
                oficina: parseInt(getCookie('Oficina')),
                rutAfiliado: $('#txtRutAfiAcuerdo').val()
            };
            fetch(`http://${motor_api_server}:4002/acuerdopago`, {
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
                        container: '.msjAcuerdo_pago',
                        timer: 3000
                    });
                    return false;
                }
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Gestión Guardada correctamente.',
                    container: '.msjAcuerdo_pago',
                    timer: 3000
                });
                appAcuerdoPagoModal.obtenerLead($('#txtRutAfiAcuerdo').val());
                appAcuerdoPagosFiltros.handleEventoClickFiltrar();
                $('#new_datos-gestion_acuerdo_pago').trigger("reset");

                if ($('#slSubEstadoAcuerdoP').val() == 21 || $('#slSubEstadoAcuerdoP').val() == 23) {
                    $("#tabContacAcuerdo").tab('show');
                    $("#msjContactAcuerdoP").css('display', 'block')
                }

            });
            //    .catch(reasons => {
            //    console.log({ reasons });
            //    $.niftyNoty({
            //        type: 'danger',
            //        message: 'Error al intentar guardar gestión.',
            //        container: '.msjAcuerdo_pago',
            //        timer: 3000
            //    });
            //});
        },
        setDefaultsModal() {
            this.modelosModal = {
                estado: '',
                subEstado: '',
                causaBasal: '',
                fechaCompromiso: '',
                comentarios: '',
                folioCredito: '',
            }
        }
    },
});

$(function () {


    if (getCookie("Cargo") == "Agente Territorial") {
        $("#oficina_acuerdopago").css("display", "block");
      
    }


    $('#mdl_data_acuerdo_pago').on('show.bs.modal', async (event) => {

        const rut = event.relatedTarget != undefined ? $(event.relatedTarget).data('rut') : $('#afi_rut_busc').val();
        console.log({ rut })
        var rutCont = rut
        rutCont = rutCont.substring(0, rutCont.length - 2)
        await appAcuerdoPagoModal.obtenerLead(rut);
        cargaDatosDeContactoAcuerdoPago(rutCont, '#bdy_datos_contactos_acuerdo_pago')
        $('#new_datos-gestion_acuerdo_pago').trigger("reset");
        $('#fpg_acuerdo').css('display', 'none');
        appAcuerdoPagoModal.setDefaultsModal();
        $('#btGestAcuerdoPago').attr("disabled", false);
        $("#msjContactAcuerdoP").css('display', 'none');
    });


    $('#mdl_data_acuerdo_pago').on('hidden.bs.modal', async (event) => {
        appNormalizacionModal.setDefaultsModal();
        $('#slBasalAcuerdoPago').attr("disabled", true);
    });

    $('#slEstadoAcuerdoPago').change(function (e) {
        e.preventDefault();
        if ($(this).val() == 1) {
            $('#slBasalAcuerdoPago').attr("disabled", false);
        }
        else {
            $('#slBasalAcuerdoPago').attr("disabled", true);
            $('#fpg_acuerdo').css('display', 'none');
            $('#slBasalAcuerdoPago').val("");
        }

    });


    function cargaDatosDeContactoAcuerdoPago(rutAf, destino = null) {

        if (destino != null) {
            $(`${destino} > tr`).remove();
            $(destino).html("");
        }
        else {
            $("#bdy_datos_contactos_acuerdo_pago > tr").remove();
            $("#bdy_datos_contactos_acuerdo_pago").html("");
        }


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

                var destinoDefault = destino == null ? "#bdy_datos_contactos_acuerdo_pago" : destino;
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

                                        cargaDatosDeContactoAcuerdoPago(rutAf);

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




});