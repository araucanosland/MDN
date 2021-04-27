jQuery.support.cors = true;
$(function () {
    $('#dp-component-pen-retencion .input-group.date').datepicker(
        { autoclose: true, format: 'dd-mm-yyyy', language: "es", daysOfWeekDisabled: [6, 0], todayHighlight: true, useCurrent: true, },
    ).on('changeDate', function (event) {
        event.stopPropagation();
    })
    $("#ges_pen-retencion").datepicker({
        format: 'dd-mm-yyyy',
    }).datepicker("setDate", new Date());

    $('#dp-component-pen-atencion-filtro .input-group.date').datepicker(
        { autoclose: true, format: 'dd-mm-yyyy', language: "es", daysOfWeekDisabled: [6, 0], todayHighlight: true, useCurrent: true, },
    ).on('changeDate', function (event) {
        event.stopPropagation();
    })
});
var appRetencionPensionado = new Vue({
    el: '#contRetencionPen',
    data: {
        filtros: {
            motivoAfi: [],
            motivoRet: [],
            oficina: [],
        },
        modelos: {
            motivoAfi: '',
            motivoRet: '',
            oficina: '',
        },
        data: {},
        dataExt: {},
    },
    mounted() {
        this.obtenerEstadosDesaf();
        this.EstadosRetencion();
        this.obtenerOficina();
    },
    methods: {
        obtenerEstadosDesaf() {
            fetch(`http://${motor_api_server}:4002/retencion-pen/estado-desafiliacion`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.motivoAfi = estadosJSON;
                });
        },
        EstadosRetencion() {
            fetch(`http://${motor_api_server}:4002/retencion-pen/estado-retencion`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadoRetencionSubJSON => {
                    this.filtros.motivoRet = estadoRetencionSubJSON;
                });
        },
        obtenerAfiliado(rut) {
            fetch(`http://${motor_api_server}:4002/retencion-pen/busca-pensionado/${rut}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    if (datos.length > 0) {
                        this.data = datos;
                        $('#txtNombre').val(datos[0].nombres)
                        $('#txtFechaAfiliacion').val(datos[0].fecha_afiliacion.toFecha())
                        $('#lbRtuAfi').css('display', 'none')
                        return datos
                    } else {
                        $('#txtNombre').val('')
                        $('#txtFechaAfiliacion').val('')
                        $('#lbRtuAfi').css('display', 'block')
                    }
                })

            fetch(`http://${motor_api_server}:4002/retencion-pen/deuda-ext/${rut}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    if (datos.length > 0) {
                        $('#divFormularioPen').removeClass()
                        $('#divFormularioPen').addClass('col-sm-7')
                        this.dataExt = datos;
                        $('#divExt').css('display', 'block')
                    }
                    else {
                        $('#divExt').css('display', 'none')
                        $('#divFormularioPen').removeClass()
                        $('#divFormularioPen').addClass('col-sm-12')
                    }
                    return datos
                })
        },
        obtenerOficina() {
            let id = getCookie('Oficina')
            fetch(`http://${motor_api_server}:4002/retencion-pen/oficina/${id}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    $('#txtSucursal').val(datos[0].Oficina)
                    return datos
                })
        },
        cargaMisCasos() {
            $("#tblMiscasos").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/retencion-pen/misCasos`,
                query: {
                    ejecutivo_gestion: getCookie('Rut'),
                    rut: $("#txtRutFiltro").val(),
                    nombres: $("#txtNombreFiltro").val(),
                    estado_final: $("#dllEstadoFinalFiltro").val(),
                    fecha_atencion: $("#ges_pen-atencionFiltro").val(),
                }
            });
        },
        guardaRegistro() {
            let desafiliacion;
            let retencion;
            if ($('#txtRut').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar el rut',
                    container: '#msjregsitro',
                    timer: 4000
                });
                return false;
            }
            if ($('#txtFono').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar un fono',
                    container: '#msjregsitro',
                    timer: 4000
                });
                return false;
            }
            if ($('#txtEmail').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar un email',
                    container: '#msjregsitro',
                    timer: 4000
                });
                return false;
            }
            if ($('#txtDomicilio').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar una dirección',
                    container: '#msjregsitro',
                    timer: 4000
                });
                return false;
            }
            if ($('#ges_pen-retencion').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar una fecha de atención',
                    container: '#msjregsitro',
                    timer: 4000
                });
                return false;
            }
            if ($('#dllEstadoFinal').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar un estado final',
                    container: '#msjregsitro',
                    timer: 4000
                });
                return false;
            }
            if ($('#dllEstadoFinal').val() == 'Retenido') {
                if ($('#dllMotivoRetencion').val() == '' || $('#dllMotivoRetencion').val() == null) {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Debe seleccionar motivo de retención',
                        container: '#msjregsitro',
                        timer: 4000
                    });
                    return false;
                }
                else {
                    if ($('select[name="dllMotivoRetencion"] option:selected').text() != 'SELECCIONE...') {
                        retencion = $('select[name="dllMotivoRetencion"] option:selected').text();
                    }
                    else {
                        retencion = "";
                    }
                }
            }
            if ($('#dllEstadoFinal').val() == 'Retenido') {
                if ($('#dllMotivoDesaf').val() == '' || $('#dllMotivoDesaf').val() == null) {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Debe seleccionar motivo desafiliación',
                        container: '#msjregsitro',
                        timer: 4000
                    });
                    return false;
                }
                else {
                    if ($('select[name="dllMotivoDesaf"] option:selected').text() != 'SELECCIONE...') {
                        desafiliacion = $('select[name="dllMotivoDesaf"] option:selected').text();
                    }
                    else {
                        desafiliacion = "";
                    }
                }
            }

            if ($('#dllEstadoFinal').val() == 'Desafiliado') {
                if ($('#dllMotivoDesaf').val() == '' || $('#dllMotivoDesaf').val() == null) {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Debe seleccionar motivo desafiliación',
                        container: '#msjregsitro',
                        timer: 4000
                    });
                    return false;
                }
                else {
                    if ($('select[name="dllMotivoDesaf"] option:selected').text() != 'SELECCIONE...') {
                        desafiliacion = $('select[name="dllMotivoDesaf"] option:selected').text();
                        retencion = "";
                    }
                    else {
                        desafiliacion = "";
                    }

                }
            }
            if ($('#txtComentarios').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar un comentario',
                    container: '#msjregsitro',
                    timer: 4000
                });
                return false;
            }

            if ($('#txtNombre').val() == '' && $('#txtFechaAfiliacion').val() == '') {
                $(Swal.fire({
                    title: 'Afiliado no se encuntra en base',
                    html: `<ul><li class="msg-part">Verifique si rut esta correcto.</li></ul>`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                }));
                return false;
            }


            const formData = {
                rut: $('#txtRut').val(),
                nombres: $('#txtNombre').val(),
                fono: $('#txtFono').val(),
                mail: $('#txtEmail').val(),
                domicilio: $('#txtDomicilio').val(),
                fecha_afiliacion: $('#txtFechaAfiliacion').val(),
                fecha_atencion: $('#ges_pen-retencion').val(),
                sucursal: $('#txtSucursal').val(),
                estado_final: $('#dllEstadoFinal').val(),
                motivo_desafiliacion: desafiliacion,
                motivo_retencion: retencion,
                comentarios: $('#txtComentarios').val(),
                ejecutivo_gestion: getCookie('Rut'),
            }
            fetch(`http://${motor_api_server}:4002/retencion-pen/guarda-ingreso-retencion-pensionado`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'Token': getCookie('Token')
                }
            }).then(async (response) => {
                if (!response.ok) {
                    $(Swal.fire({
                        title: 'Error al grabar registros',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    }));
                    return false;
                }
                Swal.fire({
                    title: 'Registro grabada correctamente!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                appRetencionPensionado.setDefaultsModal()
                appRetencionPensionado.obtenerOficina()
            });
        },
        setDefaultsModal() {
            this.modelos = {
                motivoAfi: '',
                motivoRet: '',
            }
            this.data = {}
            $('.limpiar').val('');
        },
        setDefaultDesafiliacion() {
            this.modelos = {
                motivoAfi: '',
            }
        },
        setDefaultsRetencion() {
            this.modelos = {
                motivoRet: '',
            }
        },
    }
});
$("#txtRut").change(function () {
    appRetencionPensionado.obtenerAfiliado($(this).val())
});
$('.numero').keyup(function () {
    var val = $(this).val();
    if (isNaN(val)) {
        val = val.replace(/[^0-9\.]/g, '');
        if (val.split('.').length > 2)
            val = val.replace(/\.+$/, "");
    }
    $(this).val(val);
});
$('#dllEstadoFinal').change(function (e) {
    switch (this.value) {
        case "Retenido":
            //$("#dllMotivoDesaf").prop('disabled', 'disabled');
            //$("#dllMotivoDesaf").val('');
            //appRetencionPensionado.setDefaultDesafiliacion()
            $('#dllMotivoDesaf').removeAttr('disabled');
            $('#dllMotivoRetencion').removeAttr('disabled');

            break;
        case "Desafiliado":
            $("#dllMotivoRetencion").prop('disabled', 'disabled');
            $("#dllMotivoRetencion").val('');
            appRetencionPensionado.setDefaultsRetencion()
            $('#dllMotivoDesaf').removeAttr('disabled');
            break;
    }
});












