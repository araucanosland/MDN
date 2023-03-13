jQuery.support.cors = true;
let veces_renta = 8;
let carga_máxina = 40;
let tasa = 1 / 100;
let plazo_max = 60;
let rut = '15473876-2'
let nombre = 'Sergio Pizarro'
$('#rut_clie').html('RUT: ' + rut)
$('#nombre_clie').html('NOMBRE: ' + nombre)


let deuda_aportar = 0;
let monto_credito = 0;
let monto_riego_cliente = 0;
let carga_interna = 0;
let valor_cuota = 0;
let carga_final_paralelo = 0;
let credito_vig_no = 0;
let credito_tarj_si = 0;

let valor_cuota_vig_act = 0;
let valor_cuota_act = 0;
let valor_monto_tarj = 0;

let valor_cred_vig = 0;
let valor_tarj_lin = 0;
let valor_cred_actual = 0;


var appPortabilidad_ingreso = new Vue({
    el: '#dvContenedor',
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
    },
    mounted() {
        this.cargaDetalleCreditoVigente();
        this.cargaCredVigente();
        this.cargaTajetaLinea();
        this.obtenerEstados();
        this.listaGestion();
    },
    methods: {
        obtenerEstados() {
            let padre = 0;
            fetch(`http://${motor_api_server}:4002/portabilidad/lista-ingreso-estados-port/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.estado = estadosJSON;
                });
        },
        obtenerSubEstados(padre) {
            fetch(`http://${motor_api_server}:4002/portabilidad/lista-ingreso-estados-port/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosSubJSON => {
                    this.filtros.subEstado = estadosSubJSON;
                });
        },
        eventoCambiaEstadoPort() {
            this.obtenerSubEstados(this.modelos.estado)
        },
        cargaDetalleCreditoVigente() {
            valor_cred_actual = 0
            monto_riego_cliente = 0
            valor_cuota_act = 0;
            carga_final_paralelo = 0;
            carga_interna = 0;

            fetch(`http://${motor_api_server}:4002/portabilidad/detalle-credito-actual/${rut}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    if (datos.length > 0) {
                        $("#tblPortabilidadCredVigActual").bootstrapTable('load', datos);
                        $.each(datos, function (i, e) {
                            if (e.accion == 'RENEGOCIA') {
                                valor_cred_actual = parseInt(valor_cred_actual) + parseInt(e.montoCredito)
                                monto_credito = valor_cred_actual;
                            }
                            else if (e.accion == 'PARALELO') {
                                monto_riego_cliente = parseInt(monto_riego_cliente) + parseInt(e.montoCredito)
                                carga_interna = carga_interna + parseInt(e.valorCuota)
                                carga_final_paralelo = carga_final_paralelo + parseInt(e.valorCuota)
                            }
                            $("#slAcCredAct_" + e.id).val(e.accion)
                            valor_cuota_act = valor_cuota_act + parseInt(e.valorCuota)
                        });
                        $('#txtRenegociaciones').val(valor_cred_actual.toMoney(0))
                        valorMontoCredito();
                        valorCuota(deuda_aportar + valor_cred_actual + parseInt($('#txtEfectivo').val()))
                        vecesRenta(monto_riego_cliente + parseInt($('#txtEfectivo').val()) + deuda_aportar + valor_cred_actual)
                        cargaInicial();
                        cargaFinal();
                    }
                    else {
                        $("#tblPortabilidadCredVigActual").bootstrapTable('load', []);
                        $('#txtRenegociaciones').val('0')
                    }
                });
        },
        cargaCredVigente() {
            valor_cred_vig = 0;
            valor_cuota_vig_act = 0;
            //deuda_aportar = 0;
            credito_vig_no = 0;
            fetch(`http://${motor_api_server}:4002/portabilidad/lista-credito-vigente/${rut}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    if (datos.length > 0) {
                        $("#tblPortabilidadCredVigente").bootstrapTable('load', datos);
                        $.each(datos, function (i, e) {
                            if (e.portabilidad == 'SI') {
                                valor_cred_vig = valor_cred_vig + e.saldo_capital
                                deuda_aportar = valor_cred_vig + valor_tarj_lin;
                                monto_credito = monto_credito + deuda_aportar;
                            }
                            else if (e.portabilidad == 'NO') {
                                credito_vig_no = credito_vig_no + parseInt(e.valor_cuota)
                            }
                            deuda_aportar = valor_cred_vig + valor_tarj_lin;
                            valor_cuota_vig_act = valor_cuota_vig_act + parseInt(e.valor_cuota)
                            $("#slAcCredActVig_" + e.id).val(e.portabilidad)
                        });
                        $('#txtDeudaPortar').val(deuda_aportar.toMoney(0))
                        valorMontoCredito();
                        vecesRenta(monto_riego_cliente + parseInt($('#txtEfectivo').val()) + deuda_aportar + valor_cred_actual)
                        cargaInicial();
                        cargaFinal();
                    }
                    else {
                        $("#tblPortabilidadCredVigente").bootstrapTable('load', []);
                    }
                });
        },
        cargaTajetaLinea() {
            // credito_vig_no = 0;
            valor_monto_tarj = 0;
            credito_tarj_si = 0;
            deuda_aportar = 0;
            valor_tarj_lin = 0;
            valor_monto_tarj = 0;

            fetch(`http://${motor_api_server}:4002/portabilidad/lista-tarjeta-credito/${rut}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    if (datos.length > 0) {
                        $("#tblPorTarjLiniaCred").bootstrapTable('load', datos);
                        $.each(datos, function (i, e) {
                            if (e.portabilidad == 'SI') {
                                valor_tarj_lin = valor_tarj_lin + e.cupo_utilizado
                               
                                monto_credito = monto_credito + deuda_aportar;
                                credito_tarj_si = credito_tarj_si + parseInt(e.cupo_utilizado)
                            }
                            deuda_aportar = valor_cred_vig + valor_tarj_lin;
                            valor_monto_tarj = valor_monto_tarj + parseInt(e.cupo_utilizado)
                            $("#slAcCredTarjeta_" + e.id).val(e.portabilidad)
                        });
                        $('#txtDeudaPortar').val(deuda_aportar.toMoney(0))
                        valorMontoCredito();
                        vecesRenta(monto_riego_cliente + parseInt($('#txtEfectivo').val()) + deuda_aportar + valor_cred_actual)
                        cargaInicial();
                        cargaFinal();
                    }
                    else {
                        $("#tblPorTarjLiniaCred").bootstrapTable('load', []);
                    }
                });
        },
        ingresaCredVigente() {

            if ($('#slIntitucionModalCredVig').val() == "") {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar una institución...',
                    container: '#msjCredVig',
                    timer: 3000
                });
                return false;
            }
            if ($('#txtModalValorCuotaCredVig').val() == "") {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar valor de la cuota..',
                    container: '#msjCredVig',
                    timer: 3000
                });
                return false;
            }
            if ($('#txtModalPlazoOriginalCredVig').val() == "") {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar plazo original del credito...',
                    container: '#msjCredVig',
                    timer: 3000
                });
                return false;
            }
            if ($('#txtModalCuotasCanceladasCredVig').val() == "") {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe las ingresar cuotas canceladas...',
                    container: '#msjCredVig',
                    timer: 3000
                });
                return false;
            }
            if ($('#txtModalTasaAppCredVig').val() == "") {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar tasa App...',
                    container: '#msjCredVig',
                    timer: 3000
                });
                return false;
            }
            if ($('#slModalPortabilidadCredVig').val() == "") {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar portabilidad...',
                    container: '#msjCredVig',
                    timer: 3000
                });
                return false;
            }

            let capital;
            let tasaApp = $('#txtModalTasaAppCredVig').val();
            let cuota = $('#txtModalValorCuotaCredVig').val();
            let plz_original = $('#txtModalPlazoOriginalCredVig').val()
            let cuotas_canc = $('#txtModalCuotasCanceladasCredVig').val()
            tasaApp = tasaApp / 100;
            capital = cuota * (((Math.pow((1 + tasaApp), parseInt(plz_original - cuotas_canc)) - 1) / (tasaApp * (Math.pow((1 + tasaApp), parseInt(plz_original - cuotas_canc)))))) * (1 + tasaApp)
            let ingCredVigente = {
                rut: rut,
                institucion: $('#slIntitucionModalCredVig').val(),
                valor_cuota: $('#txtModalValorCuotaCredVig').val(),
                plazo_original: $('#txtModalPlazoOriginalCredVig').val(),
                cuotas_canceladas: $('#txtModalCuotasCanceladasCredVig').val(),
                tasa_app: $('#txtModalTasaAppCredVig').val(),
                saldo_capital: Math.round(capital),
                portabilidad: $('#slModalPortabilidadCredVig').val(),
                oficina: getCookie('Oficina'),
                ejecutivo: getCookie('Rut'),
            }

            fetch(`http://${motor_api_server}:4002/portabilidad/guarda-credito-vigente`, {
                method: 'POST',
                body: JSON.stringify(ingCredVigente),
                headers: {
                    'Content-Type': 'application/json',
                    'Token': getCookie('Token')
                }
            }).then(async (response) => {
                if (!response.ok) {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Error al Guardar Contacto...',
                        container: '#msj-contact-potenc',
                        timer: 4000
                    });
                    return false;
                }
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Ingresado Correctamente...',
                    container: '#msjCredVig',
                    timer: 4000
                });
                appPortabilidad_ingreso.cargaCredVigente();//refreshCredVigente();
                limpiaCampModal();
            });
        },
        ingresaTarjetaLinea() {

            if ($('#slModalInstitucionTarjLinea').val() == "") {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar una institución...',
                    container: '#msjCredTarj',
                    timer: 3000
                });
                return false;
            }

            if ($('#txtModalCupoUtilizadoTarjLinea').val() == "") {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar el cupo utilizado...',
                    container: '#msjCredTarj',
                    timer: 3000
                });
                return false;
            }

            if ($('#txtModalPortabilidadTarjLinea').val() == "") {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar portabilidad...',
                    container: '#msjCredTarj',
                    timer: 3000
                });
                return false;
            }


            let ingTarjetaLinea = {
                rut: rut,
                institucion: $('#slModalInstitucionTarjLinea').val(),
                cupo_utilizado: $('#txtModalCupoUtilizadoTarjLinea').val(),
                portabilidad: $('#txtModalPortabilidadTarjLinea').val(),
                oficina: getCookie('Oficina'),
                ejecutivo: getCookie('Rut'),
            }

            fetch(`http://${motor_api_server}:4002/portabilidad/guarda-tarjeta-linea`, {
                method: 'POST',
                body: JSON.stringify(ingTarjetaLinea),
                headers: {
                    'Content-Type': 'application/json',
                    'Token': getCookie('Token')
                }
            }).then(async (response) => {
                if (!response.ok) {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Error al Guardar Contacto...',
                        container: '#msj-contact-potenc',
                        timer: 4000
                    });
                    return false;
                }
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Ingresado Correctamente...',
                    container: '#msjCredTarj',
                    timer: 4000
                });
                appPortabilidad_ingreso.cargaTajetaLinea();//.refreshTarjetaLinea();
                limpiaCampModal();
            });
        },
        ingresoGestionPortabilidad() {
            if ($('#txtNumOferta').val() == '') {
                $(Swal.fire({
                    title: 'Gestion',
                    html: `<ul><li class="msg-part">Debe ingresar un N° de Oferta</li></ul>`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                }));
                return false;
            }
            if ($('#slSucursal').val() == '') {
                $(Swal.fire({
                    title: 'Gestion',
                    html: `<ul><li class="msg-part">Debe seleccionar una oficina</li></ul>`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                }));
                return false;
            }
            if ($('#txtRenta').val() == '') {
                $(Swal.fire({
                    title: 'Gestion',
                    html: `<ul><li class="msg-part">Debe ingresar la renta</li></ul>`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                }));
                return false;
            }
            if ($('#txtEfectivo').val() == '') {
                $(Swal.fire({
                    title: 'Gestion',
                    html: `<ul><li class="msg-part">Debe ingresar efectivo</li></ul>`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                }));
                return false;
            }
            if ($('#txtPlazo').val() == '' || $('#txtPlazo').val() == '0') {
                $(Swal.fire({
                    title: 'Gestion',
                    html: `<ul><li class="msg-part">Debe ingresar plazo</li></ul>`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                }));
                return false;
            }
            if ($('#slEstado').val() == '') {
                $(Swal.fire({
                    title: 'Gestion',
                    html: `<ul><li class="msg-part">Debe seleccionar un estado</li></ul>`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                }));
                return false;
            }
            if ($('#slSubEstado').val() == '') {
                $(Swal.fire({
                    title: 'Gestion',
                    html: `<ul><li class="msg-part">Debe seleccionar un sub-estado</li></ul>`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                }));
                return false;
            }
            if ($('#txtobservacionPort').val() == '') {
                $(Swal.fire({
                    title: 'Gestion',

                    html: `<ul><li class="msg-part">Debe ingresar una observación</li></ul>`,

                    icon: 'error',
                    confirmButtonText: 'OK'
                }));
                return false;
            }


            let ingGestionPort = {
                rut: rut,
                nombre: nombre,
                n_oferta: $('#txtNumOferta').val(),
                renta: $('#txtRenta').val(),
                limite_endeudamiento: $('#txtLiminteEndeudamiento').val().replace(/\./g, ''),
                deuda_portar: $('#txtDeudaPortar').val().replace(/\./g, ''),
                renegociacion: $('#txtRenegociaciones').val().replace(/\./g, ''),
                monto_credito: $('#txtMontoCredito').val().replace(/\./g, ''),
                plazo: $('#txtPlazo').val(),
                efectivo: $('#txtEfectivo').val(),
                total_riesgo: $('#txtTotalRiegoClie').val().replace(/\./g, ''),
                valor_cuota: $('#txtValorCuota').val().replace(/\./g, ''),
                carga_interna: $('#txtCargaInterna').val().replace('%', ''),
                veces_renta_interna: $('#txtVecesRentaInt').val(),
                carga_inicial: $('#txtCargaInicial').val().replace(/\./g, ''),
                carga_final: $('#txtCargaFinal').val().replace(/\./g, ''),
                estado: $('select[name="slEstado"] option:selected').text(),
                sub_estado: $('select[name="slSubEstado"] option:selected').text(),
                observacion: $('#txtobservacionPort').val(),
                oficina: getCookie('Oficina'),
                ejecutivo: getCookie('Rut'),
            }

            fetch(`http://${motor_api_server}:4002/portabilidad/ingreso-gestion-portabilidad`, {
                method: 'POST',
                body: JSON.stringify(ingGestionPort),
                headers: {
                    'Content-Type': 'application/json',
                    'Token': getCookie('Token')
                }
            }).then(async (response) => {
                if (!response.ok) {
                    $(Swal.fire({
                        title: 'Gestion',
                        html: `<ul><li class="msg-part">Error al ingresar gestion</li></ul>`,
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

            });
        },
        listaGestion() {
            fetch(`http://${motor_api_server}:4002/portabilidad/detalle-ingreso-gestion-port/${rut}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    try {
                        $('#txtNumOferta').val(datos[0].n_oferta)
                        $('#slSucursal').val(datos[0].oficina)
                        $('#txtRenta').val(datos[0].renta)
                        $('#txtLiminteEndeudamiento').val(datos[0].limite_endeudamiento)
                        $('#txtDeudaPortar').val(datos[0].deuda_portar)
                        $('#txtRenegociaciones').val(datos[0].renegociacion)
                        $('#txtEfectivo').val(datos[0].efectivo)
                        $('#txtTotalRiegoClie').val(datos[0].total_riesgo)
                        $('#txtMontoCredito').val(datos[0].monto_credito)
                        $('#txtPlazo').val(datos[0].plazo)
                        $('#txtValorCuota').val(datos[0].valor_cuota)
                        $('#txtCargaInterna').val(datos[0].carga_interna)
                        $('#txtVecesRentaInt').val(datos[0].veces_renta)
                        $('#txtCargaInicial').val(datos[0].carga_inicial)
                        $('#txtCargaFinal').val(datos[0].carga_final)
                        $('#slEstado').val(datos[0].estado)
                        $('#slSubEstado').val(datos[0].sub_estado)
                        $('#txtobservacionPort').val(datos[0].observacion)
                    }
                    catch{ }

                    setTimeout(function () {
                        $('.numero').keyup()
                    }, 100)
                    return datos
                })
        },
    }
});
function valorCuota(valor_final_cred_) {
    valor_cuota = 0;
    let cuota = $('#txtPlazo').val();
    valor_cuota = valor_final_cred_ * (Math.pow((1 + tasa), -1)) * tasa / (1 - Math.pow((1 + tasa), - parseInt(cuota)))
    $('#txtValorCuota').val(valor_cuota.toMoney(0))

}
function valorMontoCredito() {
    let montoEfectivo = ''
    montoEfectivo = $("#txtEfectivo").val();
    let valor_1 = deuda_aportar
    let valor_2 = valor_cred_actual
    let valor_final_cred = valor_1 + valor_2 + parseInt(montoEfectivo)
    let total_riesgo_clie = monto_riego_cliente + valor_final_cred

    $('#txtMontoCredito').val(valor_final_cred.toMoney(0))
    $('#txtTotalRiegoClie').val(total_riesgo_clie.toMoney(0))

    valorCuota(valor_final_cred);
}
function accionCredVig(val, row, index) {
    return `<select class="form-contol" id="slAcCredAct_${row.id}" style="border-radius: 6px; width: 130px;" onchange="ejecutarAccionCredAct(${row.id})">
                <option value="">SELECCIONE...</option>
                <option value="RENEGOCIA">RENEGOCIA</option>
                <option value="PARALELO">PARALELO</option>
            </select>`
}
function ejecutarAccionCredAct(id) {
    let accion = $('#slAcCredAct_' + id).val();
    fetch(`http://${motor_api_server}:4002/portabilidad/actualiza-accion/${id}/${accion}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    })
        .then(response => response.json())
        .then(datos => {

        });
    appPortabilidad_ingreso.cargaDetalleCreditoVigente()

}
function ejecutarAccionCredActVig(id) {
    let portabilidad = $('#slAcCredActVig_' + id).val();
    fetch(`http://${motor_api_server}:4002/portabilidad/actualiza-accion-cred-act/${id}/${portabilidad}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    })
        .then(response => response.json())
        .then(datos => {

        });
    appPortabilidad_ingreso.cargaCredVigente()
}
function ejecutarAccionTarjeta(id) {
    let portabilidad = $('#slAcCredTarjeta_' + id).val();
    fetch(`http://${motor_api_server}:4002/portabilidad/actualiza-accion-tarjeta/${id}/${portabilidad}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    })
        .then(response => response.json())
        .then(datos => {

        });
    appPortabilidad_ingreso.cargaTajetaLinea()
}
function accionCredVigActual(val, row, index) {
    return `<select class="form-contol" id="slAcCredActVig_${row.id}" style="border-radius: 6px; width: 130px;" onchange="ejecutarAccionCredActVig(${row.id})">
                <option value="">SELECCIONE...</option>
                <option value="SI">SI</option>
                <option value="NO">NO</oOption>
            </select>`
}
function accionCredTarjeta(val, row, index) {
    return `<select class="form-contol" id="slAcCredTarjeta_${row.id}" style="border-radius: 6px; width: 130px;" onchange="ejecutarAccionTarjeta(${row.id})">
                <option value="">SELECCIONE...</option>
                <option value="SI">SI</option>
                <option value="NO">NO</oOption>
            </select>`
}
$('#txtPlazo').keyup(function (e) {

    let montoEfectivo = $("#txtEfectivo").val()
    let a = deuda_aportar + valor_cred_actual + parseInt(montoEfectivo)
    let cuota = $(this).val();
    valor_cuota = a * (Math.pow((1 + tasa), -1)) * tasa / (1 - Math.pow((1 + tasa), - parseInt(cuota)))
    $('#txtValorCuota').val(valor_cuota.toMoney(0))

    let renta = $('#txtRenta').val()
    let carga_interna_ = ((parseInt(valor_cuota) + parseInt(carga_interna)) / parseInt(renta)) * 100
    $('#txtCargaInterna').val(Math.round(carga_interna_) + '%')
    cargaInicial();
    cargaFinal();
});
$('#txtEfectivo').keyup(function (e) {
    if ($(this).val() != "") {
        let valor_1 = $(this).val();
        let valor_2 = parseInt(valor_1) + deuda_aportar + valor_cred_actual
        $('#txtMontoCredito').val(valor_2.toMoney(0))
        let valorRie = parseInt(monto_riego_cliente) + parseInt(valor_2)
        $('#txtTotalRiegoClie').val(valorRie.toMoney(0))
        valorCuota(valor_2);
        vecesRenta(valorRie)
        cargaInicial();
        cargaFinal();
    }
    else {
        let valor_2 = 0 + deuda_aportar + valor_cred_actual
        $('#txtMontoCredito').val(valor_2.toMoney(0))
        let valorRie = parseInt(monto_riego_cliente) + parseInt(valor_2)
        $('#txtTotalRiegoClie').val(valorRie.toMoney(0))
        valorCuota(valor_2);
        vecesRenta(valorRie)
        cargaInicial();
        cargaFinal();
    }
});
$('#txtRenta').keyup(function (e) {
    let valor_1 = $(this).val();
    let valor_2 = valor_1 * veces_renta;
    $('#txtLiminteEndeudamiento').val(valor_2.toMoney(0))
    let valor_vr = deuda_aportar + valor_cred_actual
    let valorRie = parseInt(monto_riego_cliente) + parseInt(valor_vr) + parseInt($('#txtEfectivo').val())
    vecesRenta(valorRie)
    cargaInterna();
    cargaInicial();
    cargaFinal();
});
function cargaInterna() {
    let renta = $('#txtRenta').val()
    let cuota = $("#txtPlazo").val()
    let montoEfectivo = $("#txtEfectivo").val()
    let a = deuda_aportar + valor_cred_actual + parseInt(montoEfectivo)
    valor_cuota = a * (Math.pow((1 + tasa), -1)) * tasa / (1 - Math.pow((1 + tasa), - parseInt(cuota)))
    let carga_interna_ = ((parseInt(valor_cuota) + parseInt(carga_interna)) / parseInt(renta)) * 100
    $('#txtCargaInterna').val(Math.round(carga_interna_) + '%')
}
function vecesRenta(valor) {
    let renta = $('#txtRenta').val()
    let veces_ = parseInt(valor) / parseInt(renta)
    $('#txtVecesRentaInt').val(Math.round(veces_))
}
function cargaInicial() {
    $("#txtCargaInicial").val('');
    let cargaInicial = valor_cuota_act + valor_cuota_vig_act + (valor_monto_tarj * 0.1)
    $("#txtCargaInicial").val(Math.round(cargaInicial).toMoney(0))
}
function cargaFinal() {
    $("#txtCargaFinal").val('')
    let cargaFinal = ((valor_cuota + carga_final_paralelo + credito_vig_no) + ((valor_monto_tarj - credito_tarj_si) * 0.1)) + 1
    $("#txtCargaFinal").val(parseInt(cargaFinal).toMoney(0))
}
function deleteCredVigente(id) {
    fetch(`http://${motor_api_server}:4002/portabilidad/elimina-registro-cred-vig/${id}/${rut}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    })
        .then(response => response.json())
        .then(datos => {
            this.appPortabilidad_ingreso.cargaCredVigente();//.refreshCredVigente();
            return datos;
        })
}
function deletTarjetaVigente(id) {
    fetch(`http://${motor_api_server}:4002/portabilidad/elimina-registro-tarj-linea/${id}/${rut}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    })
        .then(response => response.json())
        .then(datos => {
            appPortabilidad_ingreso.cargaTajetaLinea();//.refreshTarjetaLinea();
            return datos;
        })
}
function formatoMoneyFormatter(value, row, index) {
    return `<div class="label label-table label-success" style="border-radius: 4px;">` + value.toMoney2() + `</div>`
}
function formatoMoneyFormatter2(value, row, index) {
    return `<div class="label label-table label-success" style="border-radius: 4px;">` + value.toMoney(0) + `</div>`
}
function formatoFormatterLabel(value, row, index) {
    if (value == 'SI') {
        return `<div class="label label-table label-success" style="border-radius: 4px;">` + value + `</div>`
    }
    else if (value == 'NO') {
        return `<div class="label label-table label-warning" style="border-radius: 4px;">` + value + `</div>`
    }
    else {
        return `<div class="label label-table label-warning" style="border-radius: 4px;">` + value + `</div>`
    }
}
function formatoDeleteCred(value, row, index) {
    return `<a class="btn btn-default btn-icon btn-circle" onclick="deleteCredVigente(${row.id})"><i class="ion-trash-a icon-xs"></i></a>`
}
function formatoDeleteTarj(value, row, index) {
    return `<a class="btn btn-default btn-icon btn-circle" onclick="deletTarjetaVigente(${row.id})"><i class="ion-trash-a icon-xs"></i></a>`
}
function limpiaCampModal() {
    $('.limpia').val('')
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






