jQuery.support.cors = true;
var appAtencion = new Vue({
    el: '#contAtencion',
    data: {
        filtros: {
            estado: [],
        },
        modelos: {
            estado: '',
        }
    },
    mounted() {
        this.obtenerEstados();
    },
    methods: {
        obtenerLead() {
            $("#tblAtencion").bootstrapTable({
                url: `http://${motor_api_server}:4002/atencion-cliente/lead-atencion`
            });
        },

        obtenerEstados() {
            let oficina = getCookie("Oficina");
            fetch(`http://${motor_api_server}:4002/atencion-cliente/lista-estados/${oficina}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadoJSON => {
                    this.filtros.estado = estadoJSON;
                });
        },

        cargaLeadFiltroCliente() {
            $("#tblAtencion").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/atencion-cliente/leads-filtro`,
                query: {
                    estado: $('#dllEstadoCliente').val(),
                    requerimiento: $('#slRequerimiento').val(),
                    rut: $('#txtRutFiltro').val(),
                    rut_ejecutivo: getCookie('Rut'),
                    oficina: getCookie('Oficina'),
                }
            });
        },
    }
});

function formaterMes(value, row, index) {
    return `<div class="label label-table label-warning" style="border-radius: 7px;">${value}</div>`
}

function formaterRut(value, row, index) {
    let estado = "";
    if (row.ultimaGestion != null) {
        estado = row.ultimaGestion.estado
    }
    return `<a href="${value}" class="btn-link" data-estado="${estado}" data-rutcompleto="${row.rut}-${row.dv}" data-rut="${row.rut}" data-nombre="${row.nombre}"  data-toggle="modal" data-target="#modal_atencion_cliente" data-backdrop="static" data-keyboard="false">${value}</a>`;
}

var appAtencionModal = new Vue({
    el: '#modal_atencion_cliente',
    data: {
        filtros: {
            estado: [],
            subEstado: [],
            sucursal: [],
        },
        modelos: {
            estado: '',
            subEstado: '',
            sucursal: '',
        },
        dataModal: {},
        dataModalHist: {},
        dataModalDif: {},
        dataModaPop: {},
    },
    mounted() {
        this.obtenerEstadosModal();
        this.obtenerSucursal();
    },
    methods: {
        obtenerLeadAtencion(rut) {
            fetch(`http://${motor_api_server}:4002/atencion-cliente/lead/${rut}`, {
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

        obtenerHistorial(rut) {
            fetch(`http://${motor_api_server}:4002/atencion-cliente/historial/${rut}`, {
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
        obtenerDiferimiento(rut) {
            fetch(`http://${motor_api_server}:4002/atencion-cliente/lista-diferimiento/${rut}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    if (datos != "") {
                        this.dataModalDif = datos[0];

                        if (datos[0].validacion_mail == true) {
                            $("#checkMail").prop("checked", true);
                        }
                        else {
                            $("#checkMail").prop("checked", false);
                        }
                        if (datos[0].validacion_web == true) {
                            $("#checkWeb").prop("checked", true);
                        }
                        else {
                            $("#checkWeb").prop("checked", false);
                        }
                        if (datos[0].validacion_call == true) {
                            $("#checkCall").prop("checked", true);
                        }
                        else {
                            $("#checkCall").prop("checked", false);
                        }
                    }
                    return datos
                })
        },

        obtenerEstadosModal() {
            let oficina = getCookie("Oficina");
            fetch(`http://${motor_api_server}:4002/atencion-cliente/lista-estados/${oficina}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadoJSON => {
                    this.filtros.estado = estadoJSON;
                });
        },

        obtenerSubEstadosModal(id) {
            fetch(`http://${motor_api_server}:4002/atencion-cliente/lista-subEstado/${id}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(subEstadoJSON => {
                    this.filtros.subEstado = subEstadoJSON;
                });
        },

        obtenerSucursal() {
            fetch(`http://${motor_api_server}:4002/atencion-cliente/lista-oficina`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(sucursalJSON => {
                    this.filtros.sucursal = sucursalJSON;
                });
        },
        obtenerEstadoPop(rut, estado) {
            fetch(`http://${motor_api_server}:4002/atencion-cliente/lista-estado-pop-up/${rut}/${estado}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    if (datos != '') {
                        this.dataModaPop = datos[0];
                        setTimeout(function () {
                            $("#dllEstadoClienteModal option:contains(" + datos[0].estado + ")").attr('selected', true);
                        }, 1800);
                        setTimeout(function () {
                            if (datos[0].estado == 'Volver a llamar') {
                                $("#divFechaCompromiso").css('display', 'block')
                                $("#ges_prox_compromiso").val(datos[0].fechaCompromiso)
                            }
                            else {
                                $("#divFechaCompromiso").css('display', 'none')
                            }
                            if (datos[0].estado == 'Diferimiento Aprobado') {
                                $("#divCovid").css('display', 'block')
                            }
                            else {
                                $("#divCovid").css('display', 'none')
                            }
                            if (datos[0].estado == 'Derivado a Sucursal' && getCookie("Oficina") == 888) {
                                appAtencionModal.obtenerSubEstadosModal(2)
                                $("#divSucursalDerivacion").css('display', 'block')
                                $("#divSubEstadoSucursalDerivacion").css('display', 'block')
                                setTimeout(function () {
                                    $("#slSubEstadoSuc option:contains(" + datos[0].subEstado + ")").attr('selected', true);
                                }, 800);
                            }
                            else {
                                $("#divSucursalDerivacion").css('display', 'none')
                                $("#divSubEstadoSucursalDerivacion").css('display', 'none')
                            }

                            if (datos[0].estado == 'No Califica') {
                                appAtencionModal.obtenerSubEstadosModal(5)
                                $("#divSubEstadoSucursalDerivacion").css('display', 'block')
                                setTimeout(function () {
                                    $("#slSubEstadoSuc option:contains(" + datos[0].subEstado + ")").attr('selected', true);
                                }, 800);
                            }
                            else {
                                $("#divSubEstadoSucursalDerivacion").css('display', 'none')
                            }

                        }, 1200);
                    }

                    return datos
                })
        },
        handleSubmitActualizaLeadContacto() {

            let fono = null;
            let fonoFijo = null;
            let email = null;

            if ($('#txtFonoClie').val() != "") {
                fono = $('#txtFonoClie').val();
            }
            if ($('#txtFonoClieFijo').val() != "") {
                fonoFijo = $('#txtFonoClieFijo').val();
            }

            if ($('#txtMailClie').val() != "") {
                email = $('#txtMailClie').val();
            }

            const formData = {
                rut: $('#txtRutClie').val(),
                fono: fono,
                fonoFijo: fonoFijo,
                email: email,
                rut_correcto: $('#txtRutClieCorrecto').val(),
                dv_correcto: $('#txtdvClieCorrecto').val(),
            };

            fetch(`http://${motor_api_server}:4002/atencion-cliente/actualiza-datos-lead`, {
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
                        container: '#msjAtencion',
                        timer: 3000
                    });
                    return false;
                }
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Guardada Correctamente.',
                    container: '#msjAtencion',
                    timer: 3000
                });

            });

        },
        handleSubmitGuadarGestion() {
            let v_comite_sucursal = $('#dllEstadoClienteModal').val()

            if ($('#dllEstadoClienteModal').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe seleccionar un estado.',
                    container: '#msjAtencion',
                    timer: 3000
                });
                return false;
            }

            if ($('#dllEstadoClienteModal').val() == 2 && $('#slSucursal').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe seleccionar una sucursal.',
                    container: '#msjAtencion',
                    timer: 3000
                });
                return false;
            }

            if ($('#dllEstadoClienteModal').val() == 2 && $('#slSubEstadoSuc').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe seleccionar una sub-estado.',
                    container: '#msjAtencion',
                    timer: 3000
                });
                return false;
            }

            if ($('#dllEstadoClienteModal').val() == 5 && $('#slSubEstadoSuc').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe seleccionar una sub-estado.',
                    container: '#msjAtencion',
                    timer: 3000
                });
                return false;
            }

            if ($('#dllEstadoClienteModal').val() == 14 && $('#slSubEstadoSuc').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe seleccionar una sub-estado.',
                    container: '#msjAtencion',
                    timer: 3000
                });
                return false;
            }

            if ($('#dllEstadoClienteModal').val() == 3) {
                if ($('#txtFolio').val() == '') {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Debe ingresar un folio.',
                        container: '#msjAtencion',
                        timer: 3000
                    });
                    return false;
                }
                if ($('#txtCuotaDiferir').val() == '') {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Debe ingresar una cuota a diferir.',
                        container: '#msjAtencion',
                        timer: 3000
                    });
                    return false;
                }
                if ($('#txtMontoCuota').val() == '') {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Debe ingresar un monto cuota.',
                        container: '#msjAtencion',
                        timer: 3000
                    });
                    return false;
                }
                if ($('#txtPriCuotadif').val() == '') {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Debe ingresar una primera cuota a diferir.',
                        container: '#msjAtencion',
                        timer: 3000
                    });
                    return false;
                }
                if ($('#ges_fecha_ven').val() == '') {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Debe ingresar una primera fecha vencimiento actual.',
                        container: '#msjAtencion',
                        timer: 3000
                    });
                    return false;
                }
                if ($('#ges_new_fecha_ven').val() == '') {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Debe ingresar una primera nueva fecha vencimiento.',
                        container: '#msjAtencion',
                        timer: 3000
                    });
                    return false;
                }
            }
            if ($('#dllEstadoClienteModal').val() == 4 || $('#dllEstadoClienteModal').val() == 13) {
                if ($('#ges_prox_compromiso').val() == '') {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Debe ingresar una fecha de compromiso.',
                        container: '#msjAtencion',
                        timer: 3000
                    });
                    return false;
                }
            }

            if ($('#txtRespuesta').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar una respuesta.',
                    container: '#msjAtencion',
                    timer: 3000
                });
                return false;
            }
            let sub_estado;
            if ($('select[name="slSubEstadoSuc"] option:selected').text() != 'Seleccione...') {
                sub_estado = $('select[name="slSubEstadoSuc"] option:selected').text()
            }
            else {
                sub_estado = ""
            }


            const formData = {
                rut_afiliado: $('#txtRutClie').val(),
                dv_afiliado: $('#txtdvClie').val(),
                nombre_afiliado: $('#txtNombreClie').val(),
                estado: $('select[name="dllEstadoClienteModal"] option:selected').text(),
                subEstado: sub_estado,
                respuesta: $('#txtRespuesta').val(),
                rut_ejecutivo: getCookie('Rut'),
                oficina: parseInt(getCookie('Oficina')),
                fecha_compromiso: $('#ges_prox_compromiso').val(),
                fono: $('#txtFonoClie').val(),
            };

            let mailCheck;
            if ($('#checkMail').prop('checked') == true) {
                mailCheck = 1;
            }
            else {
                mailCheck = 0;
            }
            const formDataDiferimiento = {
                rut_afiliado: $('#txtRutClie').val(),
                dv_afiliado: $('#txtdvClie').val(),
                folio: $('#txtFolio').val(),
                cuota_diferir: $('#txtCuotaDiferir').val(),
                monto_cuota: $('#txtMontoCuota').val(),
                primera_cuota_diferir: $('#txtPriCuotadif').val(),
                fecha_vencimiento: $('#ges_fecha_ven').val(),
                nueva_fecha_vencimiento: $('#ges_new_fecha_ven').val(),
                validacion_mail: mailCheck,
                validacion_web: 0,
                validacion_call: 0,
                rut_ejecutivo: getCookie('Rut'),
                oficina: parseInt(getCookie('Oficina')),
            };

            const formDataSucursal = {
                rut_afiliado: $('#txtRutClie').val(),
                oficina: $('#slSucursal').val(),
            };

            const formDataComite = {
                rut_afiliado: $('#txtRutClie').val(),
                oficina: 888,
            };


            if ($('#dllEstadoClienteModal').val() == 9) {
                fetch(`http://${motor_api_server}:4002/atencion-cliente/derivacion-sucursal`, {
                    method: 'POST',
                    body: JSON.stringify(formDataComite),
                    headers: {
                        'Content-Type': 'application/json',
                        'Token': getCookie('Token')
                    }
                }).then(async (response) => {
                    if (!response.ok) {
                        $.niftyNoty({
                            type: 'danger',
                            message: 'Error al intentar guardar.',
                            container: '#msjAtencion',
                            timer: 3000
                        });
                        return false;
                    }
                    $.niftyNoty({
                        type: 'success',
                        icon: 'pli-like-2 icon-2x',
                        message: 'Devuelta a Comite.',
                        container: '#msjAtencion',
                        timer: 3000
                    });
                });
            }

            if ($('#dllEstadoClienteModal').val() == 2) {
                fetch(`http://${motor_api_server}:4002/atencion-cliente/derivacion-sucursal`, {
                    method: 'POST',
                    body: JSON.stringify(formDataSucursal),
                    headers: {
                        'Content-Type': 'application/json',
                        'Token': getCookie('Token')
                    }
                }).then(async (response) => {
                    if (!response.ok) {
                        $.niftyNoty({
                            type: 'danger',
                            message: 'Error al intentar guardar.',
                            container: '#msjAtencion',
                            timer: 3000
                        });
                        return false;
                    }
                    $.niftyNoty({
                        type: 'success',
                        icon: 'pli-like-2 icon-2x',
                        message: 'Derivada a Sucursal.',
                        container: '#msjAtencion',
                        timer: 3000
                    });
                });
            }

            fetch(`http://${motor_api_server}:4002/atencion-cliente`, {
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
                        container: '#msjAtencion',
                        timer: 3000
                    });
                    return false;
                }
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Guardada Correctamente.',
                    container: '#msjAtencion',
                    timer: 3000
                });

            });

            if ($('#dllEstadoClienteModal').val() == 3) {
                fetch(`http://${motor_api_server}:4002/atencion-cliente/diferimiento`, {
                    method: 'POST',
                    body: JSON.stringify(formDataDiferimiento),
                    headers: {
                        'Content-Type': 'application/json',
                        'Token': getCookie('Token')
                    }
                }).then(async (response) => {
                    if (!response.ok) {
                        $.niftyNoty({
                            type: 'danger',
                            message: 'Error al intentar guardar.',
                            container: '#msjDif',
                            timer: 3000
                        });
                        return false;
                    }
                    $.niftyNoty({
                        type: 'success',
                        icon: 'pli-like-2 icon-2x',
                        message: 'Guardada Correctamente.',
                        container: '#msjDif',
                        timer: 3000
                    });
                });
            }
            setTimeout(function () {
                appAtencionModal.setDefaultsModal();
            }, 300);
            setTimeout(function () {
                appAtencionModal.obtenerHistorial($('#txtRutClie').val())
            }, 300);
            setTimeout(function () {
                appAtencion.cargaLeadFiltroCliente();
            }, 300);
        },
        setDefaultsModal() {
            //$('#txtFolio').val('')
            //$('#txtCuotaDiferir').val('')
            //$('#txtMontoCuota').val('')
            //$('#txtPriCuotadif').val('')
            //$('#ges_fecha_ven').val('')
            //$('#ges_new_fecha_ven').val('')
            $('#ges_prox_compromiso').val('')
            $('#slSucursal').val('').trigger('chosen:updated')
            $('#slSubEstadoSuc').val('')
            $('#dllEstadoClienteModal').val('')
            $('#txtRespuesta').val('')
        },
        setDefaultsModalData() {
            this.dataModalDif = {}
            this.dataModaPop = {}
            this.modelos = {
                estado: '',
                subEstado: ''
            }
        }
    }
});


$('#modal_atencion_cliente').on('show.bs.modal', async (event) => {
    let rut = $(event.relatedTarget).data('rut')
    let rutCompleto = $(event.relatedTarget).data('rutcompleto')
    let estado = $(event.relatedTarget).data('estado')
    if (estado === "") {
        estado = 'null'
    }


    $('#dp-component-atencion .input-group.date').datepicker(
        { autoclose: true, format: 'dd-mm-yyyy', language: "es", daysOfWeekDisabled: [6, 0], todayHighlight: true }
    ).on('changeDate', function (event) {
        event.stopPropagation();
    }).on('show.bs.modal hide.bs.modal', function (event) {
        event.stopPropagation();
    });

    $('#dp-component-fecha-vencimiento .input-group.date').datepicker(
        { autoclose: true, format: 'dd-mm-yyyy', language: "es", daysOfWeekDisabled: [6, 0], todayHighlight: true }
    ).on('changeDate', function (event) {
        event.stopPropagation();
    }).on('show.bs.modal hide.bs.modal', function (event) {
        event.stopPropagation();
    });

    $('#dp-component-nueva-fecha .input-group.date').datepicker(
        { autoclose: true, format: 'dd-mm-yyyy', language: "es", daysOfWeekDisabled: [6, 0], todayHighlight: true }
    ).on('changeDate', function (event) {
        event.stopPropagation();
    }).on('show.bs.modal hide.bs.modal', function (event) {
        event.stopPropagation();
    });

    appAtencionModal.obtenerLeadAtencion(rut)
    appAtencionModal.obtenerHistorial(rut)
    appAtencionModal.setDefaultsModal();
    appAtencionModal.obtenerDiferimiento(rutCompleto)
    appAtencionModal.obtenerEstadoPop(rut, estado)
    cargaDatosDeContacto(rut, '#bdy_datos_contactos_normalizacion')

    setTimeout(function () {
        $('.slSucursal').chosen({ width: '100%' });
    }, 800);
});

$('#modal_atencion_cliente').on('hidden.bs.modal', async (event) => {
    appAtencionModal.setDefaultsModalData();
    $("#divFechaCompromiso").css('display', 'none')
    $("#divCovid").css('display', 'none')
    $("#divSucursalDerivacion").css('display', 'none')
    $("#divSubEstadoSucursalDerivacion").css('display', 'none')
});

$('.input-number').on('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
});

$('#dllEstadoClienteModal').change(function (e) {
    let valor = this.value;
    console.log(valor)
    switch (this.value) {

        case "4":
            $("#divFechaCompromiso").css('display', 'block')
            break;

        case "13":
            $("#divFechaCompromiso").css('display', 'block')
            break;
        case "3":
            $("#divCovid").css('display', 'block')
            break;

        case "2":
            $("#divSucursalDerivacion").css('display', 'block')
            $("#divSubEstadoSucursalDerivacion").css('display', 'block')
            setTimeout(function () {
                appAtencionModal.obtenerSubEstadosModal(valor)
            }, 800);
            break;

        case "5":
            $("#divSubEstadoSucursalDerivacion").css('display', 'block')
            setTimeout(function () {
                appAtencionModal.obtenerSubEstadosModal(valor)
            }, 800);
            break;

        case "14":
            $("#divSubEstadoSucursalDerivacion").css('display', 'block')
            setTimeout(function () {
                appAtencionModal.obtenerSubEstadosModal(valor)
            }, 800);
            break;
    }
    if (this.value != 5 && this.value != 14 && this.value != 2) {
        $("#divSubEstadoSucursalDerivacion").css('display', 'none')
    }
    if (this.value != 4 && this.value != 13) {
        $("#divFechaCompromiso").css('display', 'none')
    }
    if (this.value != 3) {
        $("#divCovid").css('display', 'none')
    }
    if (this.value != 2 && this.value != 5 && this.value != 14) {
        $("#divSucursalDerivacion").css('display', 'none')
        $("#divSubEstadoSucursalDerivacion").css('display', 'none')
    }
});

var appContactoDiferimiento = new Vue({
    el: '#contactoDiferimiento',
    dataContacto: {},
    mounted() {

    },
    methods: {

        obtenerContactoDiferimiento() {
            let rut = $('#txtRutGlobal').val();
            fetch(`http://${motor_api_server}:4002/atencion-cliente/lista-contacto-diferimiento/${rut}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.dataContacto = datos;

                    $('#txtRutContacto').val(datos.rut);
                    $('#txtDvContacto').val(datos.dv);
                    $('#txtNombreContacto').val(datos.nombre);
                   // $('#txtEstadoContacto').val(datos.ultimaGestion.estado);
                    $('#txtFonoContacto').val(datos.telefono);
                    $('#txtMailContacto').val(datos.email);
                    $('#txtReqContacto').val(datos.requerimiento);
                    $('#txtDetalleContacto').val(datos.observacion);
                    $('#txtRutClieCoContacto').val(datos.rutCorrecto);
                    $('#txtdvClieCoContacto').val(datos.dvCorrecto);

                    $('#txtEstadoEstado').val(datos.estado);
                    $('#txtEstadoEjecutivo').val(datos.nombreEjecutivo);
                    $('#txtestadoObs').val(datos.observacionEstado);

                    return datos
                })
        },
        actualizaContactoDif() {
            if ($('#txtFonoContacto').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar un fono.',
                    container: '#msjContacto',
                    timer: 3000
                });
                return false;
            }

            if ($('#txtMailContacto').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar un email.',
                    container: '#msjContacto',
                    timer: 3000
                });
                return false;
            }

            const formData = {
                telefono: $('#txtFonoContacto').val(),
                email: $('#txtMailContacto').val(),
                rut: $('#txtRutContacto').val(),
                oficina: parseInt(getCookie('Oficina')),
                rut_ejecutivo: getCookie('Rut'),
                rut_correcto: $('#txtRutClieCoContacto').val(),
                dv_correcto: $('#txtdvClieCoContacto').val(),
            };

            fetch(`http://${motor_api_server}:4002/atencion-cliente/actualiza-contacto-diferimiento`, {
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
                        message: 'Error al intentar actualizar.',
                        container: '#msjContacto',
                        timer: 3000
                    });
                    return false;
                }
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Se actualizo Correctamente.',
                    container: '#msjContacto',
                    timer: 3000
                });

            });
        },
    }
});

$("#tab_diferimiento").on("click", function () {
    $('#txtRutGlobal').val('');
    $('#txtRutContacto').val('');
    $('#txtDvContacto').val('');
    $('#txtNombreContacto').val('');
    $('#txtEstadoContacto').val('');
    $('#txtFonoContacto').val('');
    $('#txtMailContacto').val('');
    $('#txtReqContacto').val('');
    $('#txtDetalleContacto').val('');
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

$('#checkbox_mail_validacion').on('click', function () {
    if ($(this).is(':checked')) {
        $("#txtMailClie").attr("disabled", "disabled"); 
        $("#txtMailClie").val(''); 
    } else {
        $("#txtMailClie").removeAttr("disabled"); 
    }
});










