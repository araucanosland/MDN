jQuery.support.cors = true;
$(function () {

    if (getCookie('Oficina') == 881) {
        $('#btNewIngreso').css('display', 'none')
        $('#btCancelarUpdate').css('display', 'none')
        $('#btIngUpdate').attr("disabled", true);
        $('#formulario-ingreso_dig').show('slow');
        $('#btUpdates').css('display', 'block');
        $('#btSeves').css('display', 'none');
        $("#txtRutAfi").attr("disabled", "disabled");
        $("#txtNfolio").attr("disabled", "disabled");
        $("#dllTipoVenta").attr("disabled", "disabled");
    }

});

var appVentasDiarias = new Vue({
    el: '#page-content',
    data: {
        filtros: {
            tipo_venta: [],
        },
        modelos: {
            tipo_venta: '',
        },
        data: {},
        dataCD: {},
        dataLista: {}
    },

    mounted() {
        this.tipoVenta();
    },
    methods: {
        tipoVenta() {
            fetch(`http://${motor_api_server}:4002/ingreso-ventas/lista-tipo-venta`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(tipo_ventaJSON => {
                    this.filtros.tipo_venta = tipo_ventaJSON;
                });
        },
        obtenerListaDocumentos(id_venta) {
            fetch(`http://${motor_api_server}:4002/ingreso-ventas/lista-documentos/${id_venta}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.data = datos;
                    return datos
                })
        },
        obtenerListaDocumentosCD(id_venta) {
            fetch(`http://${motor_api_server}:4002/ingreso-ventas/lista-documentos-cd/${id_venta}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.dataCD = datos;
                    return datos
                })
        },
        cargalistaVentas() {
            $("#tblVentaDiarias").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/ingreso-ventas/lead-ventas`,
                query: {
                    folio_venta: $('#txtNFolioSearch').val(),
                    rut_afiliado: $('#txtRutAfiSearch').val(),
                    oficina: getCookie('Oficina'),
                    rut_ejecutivo: getCookie('Rut'),
                }
            });
        },
        cargaListaUpdateId(id) {
            fetch(`http://${motor_api_server}:4002/ingreso-ventas/lista-ventas-update/${id}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.dataLista = datos;
                    let id_venta;
                    if (datos.tipo_venta == 'Venta Presencial') {
                        id_venta = 1
                    } else if (datos.tipo_venta == 'Venta con firma en terreno') {
                        id_venta = 2
                    }
                    else if (datos.tipo_venta == 'Reprogramación') {
                        id_venta = 3
                    }
                    else if (datos.tipo_venta == 'Acuerdo de Pago') {
                        id_venta = 4
                    }

                    $('#txtIdUpdate').val(datos.id)
                    $('#txtRutAfi').val(datos.rut_afiliado)
                    $('#txtNfolio').val(datos.folio_venta)
                    $('#dllTipoVenta').val(id_venta)
                    $("#txtRutAfi").attr("disabled", "disabled");
                    $("#txtNfolio").attr("disabled", "disabled");
                    $("#dllTipoVenta").attr("disabled", "disabled");

                    if (datos.digitalizacion == 'SI') {
                        $("#rbDgSi").prop('checked', true);
                    }
                    else if (datos.digitalizacion == 'NO') {
                        $("#rbDgNo").prop('checked', true);
                    }
                })

        },
        handleSubmitIngresoVentas() {

            if ($('#txtRutAfi').val() == "") {
                $(Swal.fire({
                    title: 'Debe ingresar un rut de afiliado...',
                    icon: 'error',
                    confirmButtonText: 'OK'
                }));
                return false;
            }
            if ($('#txtNfolio').val() == "") {
                $(Swal.fire({
                    title: 'Debe ingresar un N° de folio de venta...',
                    icon: 'error',
                    confirmButtonText: 'OK'
                }));
                return false;
            }
            if ($('#dllTipoVenta').val() == "") {
                $(Swal.fire({
                    title: 'Debe seleccionar un tipo de venta...',
                    icon: 'error',
                    confirmButtonText: 'OK'
                }));
                return false;
            }

            if ($('input:radio[name=rbDgDigitalizacion]:checked').val() == undefined) {
                $(Swal.fire({
                    title: 'Debe selecionar si documentos estan digitalizados..',
                    icon: 'error',
                    confirmButtonText: 'OK'
                }));
                return false;
            }


            const formDataIngreso = {
                rut_afiliado: $('#txtRutAfi').val(),
                folio_venta: $('#txtNfolio').val(),
                tipo_venta: $('select[name="dllTipoVenta"] option:selected').text(),
                digitalizacion: $('input:radio[name=rbDgDigitalizacion]:checked').val(),
                rut_ejecutivo: getCookie('Rut'),
                oficina: getCookie('Oficina'),
            };
            fetch(`http://${motor_api_server}:4002/ingreso-ventas/ingreso-venta-diaria`, {
                method: 'POST',
                body: JSON.stringify(formDataIngreso),
                headers: {
                    'Content-Type': 'application/json',
                    'Token': getCookie('Token')
                }
            }).then(async (response) => {
                if (!response.ok) {
                    $(Swal.fire({
                        title: 'Error al ingresar venta',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    }));
                    return false;
                }
                Swal.fire({
                    title: 'Se Ingreso Correctamente!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                appVentasDiarias.cargalistaVentas();
                appVentasDiarias.setDefaultsModal();
                $('#formulario-ingreso_dig').hide('slow');
            });
        },
        handleSubmitUpdateVentas() {

            if ($('input:radio[name=rbDgDigitalizacion]:checked').val() == undefined) {
                $(Swal.fire({
                    title: 'Debe selecionar si documentos estan digitalizados..',
                    icon: 'error',
                    confirmButtonText: 'OK'
                }));
                return false;
            }


            const formDataIngreso = {
                id: $('#txtIdUpdate').val(),
                rut_afiliado: $('#txtRutAfi').val(),
                folio_venta: $('#txtNfolio').val(),
                tipo_venta: $('select[name="dllTipoVenta"] option:selected').text(),
                digitalizacion: $('input:radio[name=rbDgDigitalizacion]:checked').val(),
                rut_ejecutivo: getCookie('Rut'),
                oficina: getCookie('Oficina'),
            };
            fetch(`http://${motor_api_server}:4002/ingreso-ventas/update-venta-diaria`, {
                method: 'POST',
                body: JSON.stringify(formDataIngreso),
                headers: {
                    'Content-Type': 'application/json',
                    'Token': getCookie('Token')
                }
            }).then(async (response) => {
                if (!response.ok) {
                    $(Swal.fire({
                        title: 'Error al actualizar venta',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    }));
                    return false;
                }
                Swal.fire({
                    title: 'Se Actualizo Correctamente!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                appVentasDiarias.cargalistaVentas();
                appVentasDiarias.setDefaultsModal();
                if (getCookie('Oficina') != 881) {
                    $('#formulario-ingreso_dig').hide('slow');
                }
            });
        },
        setDefaultsModal() {
            this.modelos = {
                tipo_venta: '',
            }
            this.data = {}
            this.dataCD = {}
            $('#txtRutAfi').val('');
            $('#txtNfolio').val('');
            // $(".ckbTipoV").prop("checked", false);
            $('input[type="radio"]').prop('checked', false);
            $("#txtRutAfi").removeAttr("disabled");
            $("#txtNfolio").removeAttr("disabled");
            $("#dllTipoVenta").removeAttr("disabled");
        },
    }
});

function formatoUpdate(value, row, index) {
    return `<i class="btn btn-default btn-rounded btn-labeled demo-psi-pen-5" onclick="updateVenta(${value}` + ',' + `'${row.tipo_venta}')">MODIFICAR</i>`
}
function formatoFecha(value, row, index) {
    return value.toFecha();
}
$('#dllTipoVenta').change(function (e) {
    if (this.value != '') {
        //appVentasDiarias.obtenerListaDocumentos(this.value);
        //appVentasDiarias.obtenerListaDocumentosCD(this.value);
    }
    else {
        //$('#groupCheck').html('')
    }
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
$('#btNewIngreso').on('click', function () {
    $('#btUpdates').css('display', 'none');
    $('#btSeves').css('display', 'block');
    appVentasDiarias.setDefaultsModal();
    $('#formulario-ingreso_dig').show('slow');
});
$('.btCancelar').on('click', function () {
    if (getCookie('Oficina') != 881) {
        appVentasDiarias.setDefaultsModal();
        $('#formulario-ingreso_dig').hide('slow');
        $('#btUpdates').css('display', 'none');
        $('#btSeves').css('display', 'block');
    }
    else if (getCookie('Oficina') == 881) {
        appVentasDiarias.setDefaultsModal();
        $('#btUpdates').css('display', 'block');
        $('#btSeves').css('display', 'block');
    }

});
function updateVenta(id, tipo_venta) {
    $('#btSeves').css('display', 'none');
    $('#btUpdates').css('display', 'block');
    if (getCookie('Oficina') == 881) {
        $('#btIngUpdate').attr("disabled", false);
    }

    let id_venta;
    if (tipo_venta == 'Venta Presencial') {
        id_venta = 1
    } else if (tipo_venta == 'Venta con firma en terreno') {
        id_venta = 2
    }
    else if (tipo_venta == 'Reprogramación') {
        id_venta = 3
    }
    else if (tipo_venta == 'Acuerdo de Pago') {
        id_venta = 4
    }

    appVentasDiarias.setDefaultsModal();
    //appVentasDiarias.obtenerListaDocumentos(id_venta)
    //appVentasDiarias.obtenerListaDocumentosCD(id_venta)
    setTimeout(function () {
        appVentasDiarias.cargaListaUpdateId(id);
    }, 400);
    $('#formulario-ingreso_dig').show('slow');
}