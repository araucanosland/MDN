$(document).ready(function () {
    $('#demo-bv-wz').bootstrapWizard({
        tabClass: 'wz-steps',
        nextSelector: '.next',
        previousSelector: '.previous',
        onTabClick: function (tab, navigation, index) {
            return false;
        },
        onInit: function () {
            $('#demo-bv-wz').find('.finish').hide().prop('disabled', true);
        },
        onTabShow: function (tab, navigation, index) {
            var $total = navigation.find('li').length;
            var $current = index + 1;
            var $percent = ($current / $total) * 100;
            var wdt = 100 / $total;
            var lft = wdt * index;

            $('#demo-bv-wz').find('.progress-bar').css({ width: wdt + '%', left: lft + "%", 'position': 'relative', 'transition': 'all .5s' });

            // If it's the last tab then hide the last button and show the finish instead
            if ($current >= $total) {
                $('#demo-bv-wz').find('.next').hide();
                $('#demo-bv-wz').find('.finish').show();
                $('#demo-bv-wz').find('.finish').prop('disabled', false);
            } else {
                $('#demo-bv-wz').find('.next').show();
                $('#demo-bv-wz').find('.finish').hide().prop('disabled', true);
            }
        }
    });
});

jQuery.support.cors = true;
var appValidacionPortabilidad = new Vue({
    el: '#page-content',
    data: {
        filtros: {
            estados: [],
            subEstados: [],
            estados_auditor: [],
            subEstados_auditor: [],
        },
        modelos: {
            estados: '',
            subEstados: '',
            estados_auditor: '',
            subEstados_auditor: '',
        },
        preguntas: {},
        score: 0,
        scoreArray: [],
        instArray: [],
        autArray: [],
        oferta: '',
        ofertaAu: '',
        dataValidacion: {},
        dataAuditor: {},
        dataHist: {},
        dataInstitucion: {},
    },
    mounted() {
        this.obtenerEstados();
        this.obtenerEstadosAuditor();
        this.listaInstitucion();
    },
    methods: {
        listaPreguntas(rut) {
            fetch(`http://${motor_api_server}:4002/portabilidad/lista-preguntas/${rut}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.preguntas = datos;
                    return datos
                })
        },
        onAuthenticationItemChange(event, event2) {
            this.score = 0;
            if ($('input:radio[name=' + event + ']:checked').val() == 'Califica') {
                this.scoreArray.push(event2)
                this.score = this.scoreArray.length
            }
            else {

                this.scoreArray = this.scoreArray.filter((i) => i !== event2);
                this.score = this.scoreArray.length
            }
        },
        obtenerEstados() {
            let padre = 0;
            fetch(`http://${motor_api_server}:4002/portabilidad/lista-validacion-estados/${padre}`, {
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
            fetch(`http://${motor_api_server}:4002/portabilidad/lista-validacion-estados/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosSubJSON => {
                    let indice = estadosSubJSON.indexOf(2);
                    estadosSubJSON.splice(indice, 1);
                    indice = estadosSubJSON.indexOf(2);
                    estadosSubJSON.splice(indice, 1);
                    this.filtros.subEstados = estadosSubJSON;
                });
        },
        eventoCambiaValidacionEstados() {
            this.obtenerSubEstados(this.modelos.estados)
        },
        obtenerLeadValidacion() {
            rut = $('#txtrutValidacion').val();
            var rutCont = rut
            rutCont = rutCont.substring(0, rutCont.length - 2)
            if (rut == "") {
                $(Swal.fire({
                    title: 'Debe ingresar un rut..',
                    icon: 'error',
                    confirmButtonText: 'OK'
                }));
                return false;
            }
            fetch(`http://${motor_api_server}:4002/portabilidad/lista-lead-validacion/${rut}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.oferta = '$ ' + datos.oferta.toMoney(0)
                    this.dataValidacion = datos;
                    return datos
                })
            appValidacionPortabilidad.listaPreguntas(rutCont)
            appValidacionPortabilidad.obtenerHistorialValidacion(rut);
            appValidacionPortabilidad.listaDicom(rutCont)
        },
        obtenerLeadAuditor() {
            rut = $('#txtRutAuditor').val();
            if (rut == "") {
                $(Swal.fire({
                    title: 'Debe ingresar un rut..',
                    icon: 'error',
                    confirmButtonText: 'OK'
                }));
                return false;
            }
            fetch(`http://${motor_api_server}:4002/portabilidad/lista-lead-validacion/${rut}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.ofertaAu = '$ ' + datos.oferta.toMoney(0)
                    this.dataAuditor = datos;
                    return datos
                })
        },
        obtenerEstadosAuditor() {
            fetch(`http://${motor_api_server}:4002/portabilidad/lista-validacion-estados-auditor`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.estados_auditor = estadosJSON;
                });
        },
        eventoCambiaValidacionEstadosAuditor() {
            fetch(`http://${motor_api_server}:4002/portabilidad/lista-validacion-subEstados-auditor`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.subEstados_auditor = estadosJSON;
                });
        },
        saveGestion() {
            let rut_ = $('#txtrutValidacion').val();
            let scr = '';

            if (this.score >= 3) {
                scr = 'CALIFICA'
            }
            else {
                scr = 'NO CALIFICA'
            }

            if ($('#txtrutValidacion').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar un rut...',
                    container: '#msj-ing-val',
                    timer: 4000
                });
                return false;
            }
            if ($('#slEstadoVal').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar un estado...',
                    container: '#msj-ing-val',
                    timer: 4000
                });
                return false;
            }
            if ($('#slSubEstadoVal').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar un sub-estado...',
                    container: '#msj-ing-val',
                    timer: 4000
                });
                return false;
            }
            if ($('#txtobservacionPort').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar una observación...',
                    container: '#msj-ing-val',
                    timer: 4000
                });
                return false;
            }
            if ($('#txtDireccion').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar una dirección...',
                    container: '#msj-ing-val',
                    timer: 4000
                });
                return false;
            }
            if ($('#txtNumero').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar un numero de dirección...',
                    container: '#msj-ing-val',
                    timer: 4000
                });
                return false;
            }
            if ($('#txtfono').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar un telefono...',
                    container: '#msj-ing-val',
                    timer: 4000
                });
                return false;
            }
            if ($('#txtmail').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar un email...',
                    container: '#msj-ing-val',
                    timer: 4000
                });
                return false;
            }
            if ($('#txtComuna').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar una comuna...',
                    container: '#msj-ing-val',
                    timer: 4000
                });
                return false;
            }

            fromGestion = {
                rut: rut_,
                nombre: $('#nom').html(),
                estado: $('select[name="slEstadoVal"] option:selected').text(),
                sub_estado: $('select[name="slSubEstadoVal"] option:selected').text(),
                observacion: $('#txtobservacionPort').val(),
                validacion: scr,
                direccion: $('#txtDireccion').val(),
                numero: $('#txtNumero').val(),
                dpto: $('#txtDpto').val(),
                telefono: $('#txtfono').val(),
                email: $('#txtmail').val(),
                comuna: $('#txtComuna').val(),
                oficina: getCookie('Oficina'),
                ejecutivo: getCookie('Rut'),
            }

            fetch(`http://${motor_api_server}:4002/portabilidad/ingreso-gestion-validacion`, {
                method: 'POST',
                body: JSON.stringify(fromGestion),
                headers: {
                    'Content-Type': 'application/json',
                    'Token': getCookie('Token')
                }
            }).then(async (response) => {
                if (!response.ok) {
                    $(Swal.fire({
                        title: 'Error al grabar Gestión...',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    }));
                    return false;
                }

                await fetch(`http://${motor_api_server}:4002/portabilidad/lista-id-gestion/${rut_}`, {
                    method: 'GET',
                    mode: 'cors',
                    cache: 'default'
                })
                    .then(response => response.json())
                    .then(datos => {
                        setTimeout(function () {
                            appValidacionPortabilidad.saveGestionInstitucion(datos[0].id_gestion, $('#nom').html());
                            appValidacionPortabilidad.saveGestionAutorizacion(datos[0].id_gestion, $('#nom').html());
                        }, 600);
                    })

                Swal.fire({
                    title: 'Gestion OK!',
                    text: 'Se ingreso correctamente.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                setTimeout(function () {
                    appValidacionPortabilidad.obtenerHistorialValidacion($('#txtrutValidacion').val());
                    appValidacionPortabilidad.setDefaultsModalData();
                    $('#demo-bv-wz a[href="#demo-bv-tab1"]').tab('show');
                }, 1400);
            });
        },
        obtenerHistorialValidacion(rut) {
            fetch(`http://${motor_api_server}:4002/portabilidad/historial-validacion/${rut}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.dataHist = datos;
                    return datos
                })
        },
        saveGestionAuditor() {

            if ($('#txtRutAuditor').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar un rut...',
                    container: '#msj_au',
                    timer: 4000
                });
                return false;
            }
            if ($('#slEstadoAu').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar un estado...',
                    container: '#msj_au',
                    timer: 4000
                });
                return false;
            }
            if ($('#slSubEstadoAu').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar un sub-estado...',
                    container: '#msj_au',
                    timer: 4000
                });
                return false;
            }
            if ($('#txtobservacionAu').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar una observación...',
                    container: '#msj_au',
                    timer: 4000
                });
                return false;
            }

            fromGestionAuditor = {
                rut: $('#txtRutAuditor').val(),
                nombre: $('#nom_au').html(),
                estado: $('select[name="slEstadoAu"] option:selected').text(),
                sub_estado: $('select[name="slSubEstadoAu"] option:selected').text(),
                observacion: $('#txtobservacionAu').val(),
                oficina: getCookie('Oficina'),
                ejecutivo: getCookie('Rut'),
            }

            fetch(`http://${motor_api_server}:4002/portabilidad/ingreso-gestion-validacion-auditor`, {
                method: 'POST',
                body: JSON.stringify(fromGestionAuditor),
                headers: {
                    'Content-Type': 'application/json',
                    'Token': getCookie('Token')
                }
            }).then(async (response) => {
                if (!response.ok) {
                    $(Swal.fire({
                        title: 'Error al grabar Gestión...',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    }));
                    return false;
                }
                Swal.fire({
                    title: 'Gestion OK!',
                    text: 'Se ingreso correctamente.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                appValidacionPortabilidad.setDefaultsModalData();
            });
        },
        setDefaultsModalData() {
            this.modelos = {
                estados: '',
                subEstados: '',
                estados_auditor: '',
                subEstados_auditor: '',
            }
            this.preguntas = {}
            this.scoreArray = []
            this.score = 0
            this.oferta = ''
            this.ofertaAu = ''
            this.dataValidacion = {}
            this.dataAuditor = {}
            $('.limpia').val('')
            $('.limpia2').val('0')
            $('.clear_ck').prop("checked", '');
            $('#panelAut').css('display', 'none');

        },
        listaInstitucion() {
            fetch(`http://${motor_api_server}:4002/portabilidad/lista-institucion`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.dataInstitucion = datos;
                    return datos
                })
        },
        listaDicom(rut_) {
            $("#tblDicom").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/portabilidad/lista-dicom`,
                query: {
                    rut: rut_,
                }
            });
        },
        onInstitucionItemChange(event) {
            this.instArray = this.instArray.filter((i) => i !== event);
            this.instArray.push(event)
            if ($('#otra' + event).prop('checked') == true) {
                $('.tarjOtra').css('display', 'block')
                $('.tdOtra').css('display', 'block')
            }
        },
        onTieneItemChange(event) {

            if ($('#tiene' + event).prop('checked') == true) {
                $("input[name=" + event + "]").attr("disabled", false);
            }
            else {
                $("input[name=" + event + "]").attr("disabled", true);
                $("input[name=" + event + "]").prop('checked', false);
            }
        },
        saveGestionInstitucion(idGestion, nombre_) {
            
            $.each(this.instArray, function (i, e) {
                let tarjeta = "";
                let tiene_ = ""

                if ($('#visa' + e).prop('checked') == true) {
                    tarjeta = tarjeta + 'visa/'
                }
                if ($('#master' + e).prop('checked') == true) {
                    tarjeta = tarjeta + 'master/'
                }
                if ($('#otra' + e).prop('checked') == true) {
                    tarjeta = tarjeta + $('#tarjOtra' + e).val() + '/'
                }

                if ($('#tiene' + e).prop('checked') == true) {
                    tiene_ = 'SI'
                }
                else {
                    tiene_ = 'NO'
                }

                fromGestInst = {
                    id_gestion: idGestion,
                    rut: $('#txtrutValidacion').val(),
                    nombre: nombre_,
                    institucion: e,
                    tiene_tarjeta: tiene_,
                    monto_tarjetas: $('#montTarj' + e).val(),
                    tarjetas: tarjeta,// $('input:radio[name=' + e + ']:checked').val(),
                    linea_credito: $('#linea' + e).val(),
                    credito_consumo: $('#consumo' + e).val(),
                    ejecutivo: getCookie('Rut'),
                    oficina: getCookie('Oficina'),
                }

                fetch(`http://${motor_api_server}:4002/portabilidad/ingreso-gestion-institucion`, {
                    method: 'POST',
                    body: JSON.stringify(fromGestInst),
                    headers: {
                        'Content-Type': 'application/json',
                        'Token': getCookie('Token')
                    }
                }).then(async (response) => {
                    if (!response.ok) {
                        $(Swal.fire({
                            title: 'Error al grabar Gestión Institución...',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        }));
                        return false;
                    }
                });
            });
        },
        onAutorizacionItemChange(event) {
            this.autArray = this.autArray.filter((i) => i !== event);
            this.autArray.push(event)
        },
        saveGestionAutorizacion(idGestion, nombre_) {
            let certificadoD = "";
            let pagoDeuda = "";
            let comp_uso = "";

            if ($('#ckCertificadoDeuda').prop('checked') == true) {
                certificadoD = 'SI'
            }
            else {
                certificadoD = 'NO'
            }
            if ($('#ckpagoDeuda').prop('checked') == true) {
                pagoDeuda = 'SI'
            }
            else {
                pagoDeuda = 'NO'
            }
            if ($('input[name=radioAut]:checked').val() != undefined) {
                comp_uso = $('input[name=radioAut]:checked').val()
            }
            else {
                comp_uso = 'NO'
            }

            $.each(this.autArray, function (i, e) {
                let tar = $('#tarjeta-si' + e).prop('checked')
                let lin = $('#linea-si' + e).prop('checked')
                if (tar == true) {
                    tar = 'SI'
                }
                else {
                    tar = 'NO'
                }
                if (lin == true) {
                    lin = 'SI'
                }
                else {
                    lin = 'NO'
                }

                fromGestAut = {
                    id_gestion: idGestion,
                    rut: $('#txtrutValidacion').val(),
                    nombre: nombre_,
                    certificado_deuda: certificadoD,
                    pago_deuda: pagoDeuda,
                    compromiso_uso: comp_uso,
                    institucion: e,
                    tarjeta: tar,
                    linea: lin,
                    ejecutivo: getCookie('Rut'),
                    oficina: getCookie('Oficina'),
                }

                fetch(`http://${motor_api_server}:4002/portabilidad/ingreso-gestion-autorizacion`, {
                    method: 'POST',
                    body: JSON.stringify(fromGestAut),
                    headers: {
                        'Content-Type': 'application/json',
                        'Token': getCookie('Token')
                    }
                }).then(async (response) => {
                    if (!response.ok) {
                        $(Swal.fire({
                            title: 'Error al grabar Gestión Autorización...',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        }));
                        return false;
                    }
                });
            });
        },

    }
});

function formatoMoney(value, row, index) {
    return '$ ' + value.toMoney2();
}
$(document).on('click', 'input:radio[name=radioAut]', function () {
    switch (this.value) {
        case "SI":
            $('#panelAut').css('display', 'block');
            break;

        case "NO":
            $('#panelAut').css('display', 'none');
            break;
    }
});
