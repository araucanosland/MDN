jQuery.support.cors = true;
var appSeguroCesantiaFiltros = new Vue({
    el: '#demo-lft-tab-4',
    data: {
        filtros: {
            estados: [],
            subEstados: [],
            listatrabajo: [],
        },
        modelos: {
            estado: '',
            subEstado: '',
            listatrabajo: '',
            prioridad: '',

        }
    },
    mounted() {
        this.obtenerEstados();
        this.loadTablaSeguroCesantia();
        this.obtenerListaTrabajo();
    },
    updated() {
        //console.log('cambió')
    },
    methods: {

        obtenerListaTrabajo() {
            fetch(`http://${motor_api_server}:4002/segurocesantia/listaTrabajo`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(listatrabajoJSON => {
                    this.filtros.listatrabajo = listatrabajoJSON;
                });
        },
        obtenerEstados() {
            fetch(`http://${motor_api_server}:4002/segurocesantia/estados`, {
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

            fetch(`http://${motor_api_server}:4002/segurocesantia/estados?padre=${padre}`, {
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

            console.log({
                modelo: this.modelos
            })
            $("#tabla_seguro_cesantia").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/segurocesantia/leads`,
                query: {
                    periodo: periodo,
                    asignado: getCookie('Rut'),
                    estado: this.modelos.estado,
                    subEstado: this.modelos.subEstado,
                    listaTrabajo: this.modelos.listatrabajo,
                    oficina: getCookie('Oficina'),
                }
            });
        },
        loadTablaSeguroCesantia() {
            $("#tabla_seguro_cesantia").bootstrapTable();
        }
    }
});

function seguroCesantiaLinkFormatter(value, row, index) {
    return `<a href="#" class="btn-link" data-target="#mdl_data_seguro_cesantia" data-toggle="modal" data-lead="${row.id}" data-periodo="${row.periodo}" data-rut="${value}" >${value}</a>`;
}

function seguroCesantiaNombresFormatter(value, row, index) {
    try {
        return value + ' ' + row.afiliado.apellidos;
    }
    catch
    {
        return 'No tenemos el dato Registrado';
        console.log({ row })
    }
}

function seguroCesantiaPrioridadFormatter(value, row, index) {
    return value.toString().toEtiquetaPrioridad();
}

function formatoMoneyFormatter(value, row, index) {
    return value.toMoney(0);
}

function estadoAfiliadoFormatterSeguroC(value, row, index) {

    if (row.gestiones.length > 0) {
        const maximo = Math.max.apply(Math, row.gestiones.map(function (o) { return o.id; }));
        const objetoFinal = row.gestiones.find((e) => {
            return e.id === maximo;
        });
       // return `<span class="${objetoFinal.estado}">${objetoFinal.estado.padre.nombre}</span>`
        try { return `<span class="${objetoFinal.estado}">${objetoFinal.estado.nombre}</span>` } catch{ }
    }
    return 'Sin Gestion';
}

function subEstadoAfiliadoFormatterSeguroC(value, row, index) {

    if (row.gestiones.length > 0) {
        const maximo = Math.max.apply(Math, row.gestiones.map(function (o) { return o.id; }));
        const objetoFinal = row.gestiones.find((e) => {
            return e.id === maximo;
        });
        try { return `<span class="${objetoFinal.estado}">${objetoFinal.estado.padre.nombre}</span>` } catch{ }

    }
    return 'Sin Gestion';
}



var appSeguroCesantiaModal = new Vue({
    el: '#mdl_data_seguro_cesantia',
    data: {
        filtrosModal: {
            estadosModal: [],
            subEstadosModal: [],
        },
        modelosModal: {
            estado: '',
            subEstado: '',
            fechaCompromiso: '',
            comentarios: '',
            folioCredito: '',
        },
        comportamientos: {
            mostrarProximaGestion: false
        },
        dataModal: {}

    },
    mounted() {
        this.obtenerEstadosModal();
    },
    updated() {
        //console.log('cambió', {
        //    form: this.modelosModal
        //})
    },
    methods: {

        obtenerEstadosModal() {
            fetch(`http://${motor_api_server}:4002/segurocesantia/estados`, {
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
            fetch(`http://${motor_api_server}:4002/segurocesantia/estados?padre=${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosSubJSON => {
                    this.filtrosModal.subEstadosModal = estadosSubJSON;
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
            var fechaHoy = new Date();
            var periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
            fetch(`http://${motor_api_server}:4002/segurocesantia/leads/${rut}/${periodo}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {

                    console.log({
                        dep: datos
                    })
                    this.dataModal = datos;
                    return datos
                }).then(x => {
                    //this.obtenerEstadoCliente(x);
                });
        },
        handleSubmitSeguroCesantia() {

            let valContact = $('#slEstadoAcuerdoPago').val();

            const formData = {
                lead: this.dataModal.id,
                ...this.modelosModal,
                rutEjecutivo: getCookie('Rut'),
                oficina: parseInt(getCookie('Oficina')),
                nombreEjecutivo: getCookie('Usuario'),
                rutAfiliado: $('#txtRutAfiSegC').val(),
            };

            fetch(`http://${motor_api_server}:4002/segurocesantia`, {
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
                        container: '.msjSeguroCesantia',
                        timer: 3000
                    });
                    return false;
                }
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Gestión Guardada correctamente.',
                    container: '.msjSeguroCesantia',
                    timer: 3000
                });
                $('#btGestSeguroCesantia').attr("disabled", true);
                $('#fpg_seguroCesantia').css('display', 'none');
                appSeguroCesantiaModal.setDefaultsModal();
                appSeguroCesantiaFiltros.handleEventoClickFiltrar();

                if ($('#slSubEstadoScesantia').val() == 114) {
                    $("#tabContacSeguro").tab('show');
                    $("#msjContactSeguro").css('display', 'block')
                }
            });
        },
        setDefaultsModal() {
            this.modelosModal = {
                estado: '',
                subEstado: '',
                fechaCompromiso: '',
                comentarios: '',
                folioCredito: '',
            }
        }
    },
});

$(function () {
    $('#mdl_data_seguro_cesantia').on('show.bs.modal', async (event) => {

        const rut = event.relatedTarget != undefined ? $(event.relatedTarget).data('rut') : $('#afi_rut_busc').val();
        console.log({ rut })
        var rutCont = rut
        rutCont = rutCont.substring(0, rutCont.length - 2)
        await appSeguroCesantiaModal.obtenerLead(rut);
        cargaDatosDeContacto(rutCont, '#bdy_datos_contactos_seguro_cesantia')
        appSeguroCesantiaModal.setDefaultsModal();
        $('#fpg_seguroCesantia').css('display', 'none');
        $('#btGestSeguroCesantia').attr("disabled", false);


        setInterval(function () {
            $('#demo-dp-component_seguro-cesantia .input-group.date').datepicker({
                autoclose: true,
                format: 'dd-mm-yyyy',
                startdate: "0d",
                language: "es",
                daysofweekdisabled: [6, 0],
                todayhighlight: true
            }).on('show.bs.modal hide.bs.modal', function (event) {
                event.stoppropagation();
            });
        }, 1000);
        $("#msjContactSeguro").css('display', 'none')
    });

});






function cargaDatosDeContactoSeguro(rutAf, destino = null) {

    if (destino != null) {
        $(`${destino} > tr`).remove();
        $(destino).html("");
    }
    else {
        $("#bdy_datos_contactos_seguro_cesantia > tr").remove();
        $("#bdy_datos_contactos_seguro_cesantia").html("");
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

            var destinoDefault = destino == null ? "#bdy_datos_contactos_seguro_cesantia" : destino;
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

                                    cargaDatosDeContactoSeguro(rutAf);

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