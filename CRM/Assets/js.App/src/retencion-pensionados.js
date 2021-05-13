jQuery.support.cors = true;


function formatoRut(value, row, index) {



    var rut = row.rut.substring(0, (row.rut.length) - 2);
    // return '<a  title="Ingreso Pensionado Web" href="/motor/App/Pensionados/ingresopensionadoweb?rut='+rut.replace("#","")+'">' + row.rut +'</a>';
    return ' <a href="javascript:envioWeb(' + rut.replace("#", "") + ')" class="btn-link envio">' + row.rut.replace("#", "") + '</a>';
}

function formatoFecha(value, row, index) {


    if (value != null) {
        return value.toFecha();
    }

}


function cargaDatosDeContacto(rutAf) {

    $("#bdy_datos_contactos > tr").remove();
    $("#bdy_datos_contactos").html("");


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

            $("#bdy_datos_contactos")
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

function envioWeb(rut) {


    location.href = "/motor/App/Pensionados/ingresopensionadoweb?rut=" + rut
}


$(function () {

    var Rut = httpGet("rut");
    if (typeof Rut != "undefined") {
        var RutAfiliado = (typeof Rut.replace("#", "") != "undefined") ? Rut.replace("#", "") : ''
        //localStorage.clear();
        //sessionStorage.clear();
        //-----permite el ingreso de retencion web
        if (RutAfiliado != '') {
            appRetencionPensionado.obtenerAfiliadoPensionadoWeb(RutAfiliado);

            cargaDatosDeContacto(Rut.replace("#", ""));

        }

    }
    debugger;
    var volver = httpGet("side");
    if (typeof volver != "undefined") {

        $('#myTab a[href="#tab-solicitud-web"]').tab('show');
        appRetencionPensionado.cargaPesionadosWeb();
    }



    //--------------------Configuracion de TABS

    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

        sessionStorage.setItem('activeTab', $(e.target).attr('href'));
    });
    var activeTab = sessionStorage.getItem('activeTab');
    if (activeTab) {
        $('#myTab a[href="' + activeTab + '"]').tab('show');
    } else {
        $('#myTab a[href="#tab_ingreso_web"]').tab('show');

    }




    $("#bt-bolver").on("click", function () {
        // location.href = BASE_URL + "/motor/App/Licencias"
        location.href = "/motor/App/Pensionados/retencionpensionados?side=volver";
    });




    //contactabilidad
    $('#btn-add-contac').on('click', function () {

        if ($('#formulario-contacto').is(':visible')) {
            $('#formulario-contacto').hide('slow');
        }
        else {
            $('#formulario-contacto').show('slow');
        }
    });

    $('#btGuardaContacto').on('click', function () {

        var objeto_envio_contacto = {
            RutAfiliado: RutAfiliado,
            IdTipoContac: $('#cbtippContac').val(),
            GlosaTipoContac: $('select[name="cbtippContac"] option:selected').text(),
            IdClasifContac: $('#cbClasificacionConctac').val(),
            GlosaClasifContac: $('select[name="cbClasificacionConctac"] option:selected').text(),
            DatosContac: $('#afi_NewContacto').val()
        }
        $.SecGetJSON(BASE_URL + "/motor/api/Contactos/ingresa-nuevo-contacto", objeto_envio_contacto, function (datos) {
            $("#form-registro-contacto").bootstrapValidator('resetForm', true);
            cargaDatosDeContacto(rutCont);
            $("#btn-add-contac").trigger("click");
            $.niftyNoty({
                type: 'success',
                icon: 'pli-like-2 icon-2x',
                message: 'Contacto Guardado correctamente.',
                container: '#tab-gestion-3',
                timer: 5000
            });
        });
    });



    $('#dp-component-pen-retencion .input-group.date').datepicker(
        { autoclose: true, format: 'dd-mm-yyyy', language: "es", daysOfWeekDisabled: [6, 0], todayHighlight: true, useCurrent: true, },
    ).on('changeDate', function (event) {
        event.stopPropagation();
    })
    $("#ges_pen-retencion").datepicker({
        format: 'dd-mm-yyyy',
    }).datepicker("setDate", new Date());


    $("#ges_pen-retencion_web").datepicker({
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

        cargaMisCasosWeb(rutAfiliado) {

            $("#tblMiscasosWeb").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/retencion-pen/misCasosWeb`,
                query: {

                    rut: rutAfiliado,

                }
            });

        },
        cargaPesionadosWeb() {
            $("#tblretencionWeb").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/retencion-pen/retencion-pensionados-web`,
                query: {
                    rut: $("#txtRutFiltroSolicitudWeb").val(),
                    estado_gestion: $('#dllEstadoGestion').val(),
                    oficina: getCookie("Oficina")
                }
            });

        },
        obtenerAfiliadoPensionadoWeb(rut) {
            debugger;
            var oficina = getCookie("Oficina");
            fetch(`http://${motor_api_server}:4002/retencion-pen/retencion-pensionados-web?rut=${rut}&estado_gestion=&oficina=${oficina}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            }).then(response => response.json())
                .then(datos => {

                    if (datos.length > 0) {
                        this.data = datos;

                        $('#txtNombreretencionweb').val(datos[0].nombre)
                        $('#txtRutPensionadoWeb').val(datos[0].rut)
                        $('#txtSucursalretencionweb').val(datos[0].oficina)
                        $('#txtEmailretencionweb').val(datos[0].email)
                        $('#txtFonoretencionweb').val(datos[0].telefono)
                        $('#id_lead').val(datos[0].id)
                        debugger;

                        $("#txtNombreFiltro").val(datos[0].nombre);
                        $("#txtRutFiltro").val(datos[0].rut);

                        appRetencionPensionado.cargaMisCasosWeb(datos[0].rut.substring(0, (datos[0].rut.length) - 2))
                    } else {
                        $('#txtNombreretencionweb').val('')
                        $('#txtRutPensionadoWeb').val('')
                        $('#txtSucursalretencionweb').val('')
                        $('#txtNombreretencionweb').val('')
                        $('#txtEmailretencionweb').val('')
                    }
                })
        },
        guardaRegistroRetencionWeb() {
            if ($('#txtFonoretencionweb').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar un fono',
                    container: 'floating',
                    timer: 4000
                });
                return false;
            }
            var dato = $('#txtFonoretencionweb').val();
            if (isNaN(dato)) {
                $.niftyNoty({
                    type: 'danger',
                    container: 'floating',
                    html: '<strong>Error</strong> Formato de teléfono no válido!!',
                    focus: false,
                    timer: 3000
                });

                $('#txtFonoretencionweb').focus();
                return false;
            }

            if ($('#txtEmailretencionweb').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar un email',
                    container: 'floating',
                    timer: 4000
                });
                $("#txtEmailretencionweb").focus();
                return false;
            }
            if ($('#txtEmailretencionweb').val() != '') {
                var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
                if (!regex.test($('#txtEmailretencionweb').val().trim())) {

                    $.niftyNoty({
                        type: 'danger',
                        container: 'floating',
                        html: '<strong>Error</strong> Formato de Email no válido, favor revisar!!',
                        focus: false,
                        timer: 3000
                    });

                    $("#txtEmailretencionweb").focus();
                    return false;

                }

            }

            if ($('#txtDomicilioWeb').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar un domicilio',
                    container: 'floating',
                    timer: 4000
                });
                $("#txtDomicilioWeb").focus();
                return false;
            }
            if ($('#ges_pen-retencion_web').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar un fecha de atención',
                    container: 'floating',
                    timer: 4000
                });
                $("#ges_pen-retencion_web").focus();
                return false;
            }

            if ($('#dllEstadoFinalWeb').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar un estado final',
                    container: 'floating',
                    timer: 4000
                });
                return false;
            }
            if ($('#dllEstadoFinalWeb').val() == 'Retenido') {
                if ($('#dllMotivoDesafWeb').val() == '' || $('#dllMotivoDesafWeb').val() == null) {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Debe seleccionar motivo desafiliación',
                        container: 'floating',
                        timer: 4000
                    });
                    return false;
                }
                else {
                    if ($('select[name="dllMotivoDesafWeb"] option:selected').text() != 'SELECCIONE...') {
                        desafiliacion = $('select[name="dllMotivoDesafWeb"] option:selected').text();
                    }
                    else {
                        desafiliacion = "";
                    }
                }
            }

            if ($('#dllEstadoFinalWeb').val() == 'Retenido') {
                if ($('#dllMotivoRetencionWeb').val() == '' || $('#dllMotivoRetencionWeb').val() == null) {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Debe seleccionar motivo de retención',
                        container: 'floating',
                        timer: 4000
                    });
                    return false;
                }
                else {
                    if ($('select[name="dllMotivoRetencionWeb"] option:selected').text() != 'SELECCIONE...') {
                        retencion = $('select[name="dllMotivoRetencionWeb"] option:selected').text();
                    }
                    else {
                        retencion = "";
                    }
                }
            }

            if ($('#dllEstadoFinalWeb').val() == 'Desafiliado') {
                if ($('#dllMotivoDesafWeb').val() == '' || $('#dllMotivoDesafWeb').val() == null) {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Debe seleccionar motivo desafiliación',
                        container: 'floating',
                        timer: 4000
                    });
                    return false;
                }
                else {
                    if ($('select[name="dllMotivoDesafWeb"] option:selected').text() != 'SELECCIONE...') {
                        desafiliacion = $('select[name="dllMotivoDesafWeb"] option:selected').text();
                        retencion = "";
                    }
                    else {
                        desafiliacion = "";
                    }

                }
            }
            if ($('#txtComentariosWeb').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar un comentario',
                    container: 'floating',
                    timer: 4000
                });
                $("#txtComentariosWeb").focus();
                return false;
            }
            const formData = {
                id_lead: $('#id_lead').val(),
                rut: $('#txtRutPensionadoWeb').val(),
                telefon: $('#txtFonoretencionweb').val(),
                mail: $('#txtEmailretencionweb').val(),
                domicilio: $('#txtDomicilioWeb').val(),
                fecha_atencion: $('#ges_pen-retencion_web').val(),
                estado_final: $('#dllEstadoFinalWeb').val(),
                motivo_desafiliacion: desafiliacion,
                motivo_retencion: retencion,
                comentarios: $('#txtComentariosWeb').val(),
                ejecutivo_gestion: getCookie('Rut'),
            }
            fetch(`http://${motor_api_server}:4002/retencion-pen/guarda-ingreso-retencion-pensionado-web-gestion`, {
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
                debugger;
                var rut = $("#txtRutPensionadoWeb").val();
                appRetencionPensionado.cargaMisCasosWeb(rut.substring(0, (rut.length) - 2))
                appRetencionPensionado.setDefaultsModal()
                appRetencionPensionado.obtenerOficina()
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


$('#dllEstadoFinalWeb').change(function (e) {
    switch (this.value) {

        case "Retenido":

            //$("#dllMotivoDesaf").prop('disabled', 'disabled');
            //$("#dllMotivoDesaf").val('');
            //appRetencionPensionado.setDefaultDesafiliacion()
            $('#dllMotivoDesafWeb').removeAttr('disabled');
            $('#dllMotivoRetencionWeb').removeAttr('disabled');

            break;
        case "Desafiliado":

            $("#dllMotivoRetencionWeb").prop('disabled', 'disabled');
            $("#dllMotivoRetencionWeb").val('');
            appRetencionPensionado.setDefaultsRetencion()
            $('#dllMotivoDesafWeb').removeAttr('disabled');
            break;
    }
});

