jQuery.support.cors = true;
var appWapp = new Vue({
    el: '#contWapp',
    data: {
        filtros: {
            empresa: [],
            anexo: [],
            listaDis: [],
        },
        modelos: {
            empresa: '',
            anexo: '',
            listaDis: '',
        }
    },
    mounted() {
        this.cargalistaWapp();
        this.obtenerEmpresa();
        this.obtenerListaDistribucion();
    },
    methods: {
        obtenerEmpresa() {
            let oficina = parseInt(getCookie('Oficina'))
            fetch(`http://${motor_api_server}:4002/wapp/lista-empresa/${oficina}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(empresaJSON => {
                    this.filtros.empresa = empresaJSON;

                });
        },

        obtenerListaDistribucion() {
            let oficina = parseInt(getCookie('Oficina'))
            fetch(`http://${motor_api_server}:4002/wapp/lista-distribucion/${oficina}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(listaJSON => {
                    this.filtros.listaDis = listaJSON;

                });
        },

        obtenerAnexo(rutEmpresa) {

        },
        eventoAnexo() {
            this.obtenerAnexo(this.modelos.empresa)
        },

        cargalistaWapp() {
            let oficina = getCookie('Oficina');
            $("#tblWapp").bootstrapTable({
                url: `http://${motor_api_server}:4002/wapp/lista-wapp/${oficina}`
            });
        },
        loadTablaListaWapp() {
            let oficina = getCookie('Oficina');
            $("#tblWapp").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/wapp/lista-wapp/${oficina}`
            });
        },

        handleSubmitfiltroWapp() {
            $("#tblWapp").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/wapp/filtro-wapp`,
                query: {
                    oficina: getCookie('Oficina'),
                    rut: $('#txtRutBuscar').val(),
                    estamento: $('#slEstamentoWapp').val(),
                }
            });
        },

        handleSubmitGuadarWapp() {


            let lista;
            if (changeCheckbox.checked == true) {
                lista = $('#txtListDifusion').val()
            }
            else {
                lista = $('#lista-distribucion').val()
            }

            if (changeCheckbox.checked == true && $('#txtListDifusion').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe Ingresar una lista de difusión.',
                    container: '#msjIgn',
                    timer: 3000
                });
                return false;
            }

            if (changeCheckbox.checked == false && $('#lista-distribucion').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe seleccionar una lista de difusión.',
                    container: '#msjIgn',
                    timer: 3000
                });
                return false;
            }

            if ($('#slEmpresa').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe seleccionar una empresa.',
                    container: '#msjIgn',
                    timer: 3000
                });
                return false;
            }
            if ($('#slPuntoAtencion').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe seleccionar un punto de atención.',
                    container: '#msjIgn',
                    timer: 3000
                });
                return false;
            }
            if ($('#txtRutIng').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe Ingresar un Rut.',
                    container: '#msjIgn',
                    timer: 3000
                });
                return false;
            }
            if ($('#txtDvIng').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe Ingresar un Dv.',
                    container: '#msjIgn',
                    timer: 3000
                });
                return false;
            }
            if ($('#txtNomContIng').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe Ingresar un Nombre de Contacto.',
                    container: '#msjIgn',
                    timer: 3000
                });
                return false;
            }
            //if ($('#txtPuntotIng').val() == '') {
            //    $.niftyNoty({
            //        type: 'danger',
            //        message: 'Debe Ingresar un Punto de Atención.',
            //        container: '#msjIgn',
            //        timer: 3000
            //    });
            //    return false;
            //}
            if ($('#txtEstamentotIng').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe Ingresar un Estamento.',
                    container: '#msjIgn',
                    timer: 3000
                });
                return false;
            }
            if ($('#txtCelulartIng').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe Ingresar un Numero de Celular.',
                    container: '#msjIgn',
                    timer: 3000
                });
                return false;
            }

            const formData = {
                rut: $('#txtRutIng').val(),
                dv: $('#txtDvIng').val(),
                nombre_contacto: $('#txtNomContIng').val(),
                //punto_atencion: $('#txtPuntotIng').val(),
                estamento: $('#txtEstamentotIng').val(),
                n_celular: '+56 9 ' + $('#txtCelulartIng').val(),
                oficina: parseInt(getCookie('Oficina')),
                rutEjecutivo: getCookie('Rut'),
                idAnexo: $('#slPuntoAtencion').val(),
                nombreAnexo: $('select[name="slPuntoAtencion"] option:selected').text(),
                rutEmpresa: $('#slEmpresa').val(),
                nombreEmpresa: $('select[name="slEmpresa"] option:selected').text(),
                listaDifusion: lista,
            };

            fetch(`http://${motor_api_server}:4002/wapp`, {
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
                        container: '#msjIgn',
                        timer: 3000
                    });
                    return false;
                }
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Guardada Correctamente.',
                    container: '#msjIgn',
                    timer: 3000
                });
                appWapp.setDefaultsModal();
                appWapp.loadTablaListaWapp();
            });
        },
        setDefaultsModal() {
            // $('#slPuntoAtencion').val('');
            // $('#slEmpresa').val('');
            //$('#txtListDifusion').val('');
            $('#txtRutIng').val('');
            $('#txtDvIng').val('');
            $("#txtNomContIng").val('');
            $('#txtPuntotIng').val('');
            $('#txtEstamentotIng').val('');
            $("#txtCelulartIng").val('');
        },
        handleSubmitActualizaWapp() {
            if ($('#txtListDifusion').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe Ingresar una lista de difusión.',
                    container: '#msjIgn',
                    timer: 3000
                });
                return false;
            }
            if ($('#slEmpresa').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe seleccionar una empresa.',
                    container: '#msjIgn',
                    timer: 3000
                });
                return false;
            }
            if ($('#slPuntoAtencion').val() == '' || $('#slPuntoAtencion').val() == null) {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe seleccionar un punto de atención.',
                    container: '#msjIgn',
                    timer: 3000
                });
                return false;
            }
            if ($('#txtRutIng').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe Ingresar un Rut.',
                    container: '#msjIgn',
                    timer: 3000
                });
                return false;
            }
            if ($('#txtDvIng').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe Ingresar un Dv.',
                    container: '#msjIgn',
                    timer: 3000
                });
                return false;
            }
            if ($('#txtNomContIng').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe Ingresar un Nombre de Contacto.',
                    container: '#msjIgn',
                    timer: 3000
                });
                return false;
            }
            //if ($('#txtPuntotIng').val() == '') {
            //    $.niftyNoty({
            //        type: 'danger',
            //        message: 'Debe Ingresar un Punto de Atención.',
            //        container: '#msjIgn',
            //        timer: 3000
            //    });
            //    return false;
            //}
            if ($('#txtEstamentotIng').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe Ingresar un Estamento.',
                    container: '#msjIgn',
                    timer: 3000
                });
                return false;
            }
            if ($('#txtCelulartIng').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe Ingresar un Numero de Celular.',
                    container: '#msjIgn',
                    timer: 3000
                });
                return false;
            }

            const formData = {
                id: $('#txtId').val(),
                rut: $('#txtRutIng').val(),
                dv: $('#txtDvIng').val(),
                nombre_contacto: $('#txtNomContIng').val(),
                // punto_atencion: $('#txtPuntotIng').val(),
                estamento: $('#txtEstamentotIng').val(),
                n_celular: '+56 9 ' + $('#txtCelulartIng').val(),
                oficina: parseInt(getCookie('Oficina')),
                rutEjecutivo: getCookie('Rut'),
                idAnexo: $('#slPuntoAtencion').val(),
                nombreAnexo: $('select[name="slPuntoAtencion"] option:selected').text(),
                rutEmpresa: $('#slEmpresa').val(),
                nombreEmpresa: $('select[name="slEmpresa"] option:selected').text(),
                listaDifusion: $('#txtListDifusion').val(),
            };

            fetch(`http://${motor_api_server}:4002/wapp/actualiza-lista-wapp`, {
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
                        container: '#msjIgn',
                        timer: 3000
                    });
                    return false;
                }
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Actualizada Correctamente.',
                    container: '#msjIgn',
                    timer: 3000
                });
                $('#btActualiza').css('display', 'none');
                $('#btGuardar').css('display', 'block');
                appWapp.setDefaultsModal();
                appWapp.loadTablaListaWapp();
            });
        }
    }
});

function formaterEdita(value, row, index) {
    return `<button class="btn btn-primary btn-icon btn-circle editaWapp" data-id="${row.id}"><i class="demo-psi-pen-5 icon-xs add-tooltip" data-toggle="tooltip" data-original-title="Actualiza datos"></i></button>`;
}

function formaterElimina(value, row, index) {
    return `<a class="btn btn-danger btn-icon btn-circle eliminaWapp" onclick="eliminaDatosWapp()" data-id="${row.id}" title="Eliminar" href="#"><i class="ion-trash-a"></i></a>`;
}

$(document).on('click', '.editaWapp', function () {
    let id = $(this).data("id");
    $('#btGuardar').css('display', 'none');
    $('#btActualiza').css('display', 'block');
    $('#slSearchList').css('display', 'none');
    $('#slNewList').css('display', 'block');
    document.getElementById('demo-sw-checkstate').checked = true
    fetch(`http://${motor_api_server}:4002/wapp/lista-wapp-edicion/${id}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    })
        .then(response => response.json())
        .then(datos => {
            $('#txtId').val(datos[0].id);
            $('#slEmpresa').val(datos[0].rutEmpresa);
            $('#slEmpresa').change();
            $('#txtListDifusion').val(datos[0].listaDifusion);
            $('#txtRutIng').val(datos[0].rut);
            $('#txtDvIng').val(datos[0].dv);
            $("#txtNomContIng").val(datos[0].nombreContacto);
            // $('#txtPuntotIng').val(datos[0].puntoAtencion);
            $('#txtEstamentotIng').val(datos[0].estamento);
            let celular = datos[0].nCelular.replace('+56 9 ', '')
            $("#txtCelulartIng").val(celular);
            setTimeout(function () {
                $('#slPuntoAtencion').val(datos[0].idAnexo);
            }, 800);
            $(".slEmpresa").trigger("chosen:updated");
            //$(".lista-distribucion").trigger("chosen:updated");


        });
});

$(document).on('click', '.eliminaWapp', function () {
    let id = $(this).data("id");
    fetch(`http://${motor_api_server}:4002/wapp/elimina-datos-wapp/${id}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }).then(async (response) => {
        if (!response.ok) {
            $.niftyNoty({
                type: 'danger',
                message: 'Error al eliminar.',
                container: '#msjIgn',
                timer: 3000
            });
            return false;
        }
        $.niftyNoty({
            type: 'success',
            icon: 'pli-like-2 icon-2x',
            message: 'Se elimino correctamente.',
            container: '#msjIgn',
            timer: 3000
        });
        appWapp.loadTablaListaWapp();
    });
});

var changeCheckbox = document.getElementById('demo-sw-checkstate'), changeField = document.getElementById('demo-sw-checkstate-field');
new Switchery(changeCheckbox)
changeField.innerHTML = 'SI'//changeCheckbox.checked;
changeCheckbox.onchange = function () {
    let valor;
    if (changeCheckbox.checked == true) {
        valor = "SI"
        $('#slSearchList').css('display', 'none');
        $('#slNewList').css('display', 'block');
    }
    else {
        valor = 'NO'
        $('#slNewList').css('display', 'none');
        $('#slSearchList').css('display', 'block');
    }
    changeField.innerHTML = valor;// changeCheckbox.checked;
};

setTimeout(function () {
    $('.lista-distribucion').chosen({ width: '100%' });
    $('.slEmpresa').chosen({ width: '100%' });

}, 800);


$("#slEmpresa").on("change", function () {
    $("#slPuntoAtencion").html("");
    let rutEmpresa = $('#slEmpresa').val();
    let oficina = parseInt(getCookie('Oficina'))
    fetch(`http://${motor_api_server}:4002/wapp/lista-anexo/${rutEmpresa}/${oficina}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    })
        .then(response => response.json())
        .then(datos => {
            $("#slPuntoAtencion").append($("<option>").attr("value", "").html("Seleccione..."));
            $.each(datos, function (i, e) {
                $("#slPuntoAtencion").append($("<option>").attr("value", e.IdEmpresaAnexo).html(e.Anexo))
            });
        });
});
