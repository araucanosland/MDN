jQuery.support.cors = true;
var appBeneficiosFiltros = new Vue({
    el: '#contBeneficios',
    data: {
        filtros: {
            estados: [],
            foco: [],
        },
        modelos: {
            estados: '',
            foco: '',
        }
    },
    mounted() {
        this.obtenerEstados();
        this.obtenerFoco();
        this.CargaEjecutivoPensionados();
    },
    updated() {

    },
    methods: {

        obtenerEstados() {
            fetch(`http://${motor_api_server}:4002/beneficios/lista-estados`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.estados = estadosJSON;
                });
        },
        obtenerFoco() {
            fetch(`http://${motor_api_server}:4002/beneficios/lista-foco`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(focoJSON => {
                    this.filtros.foco = focoJSON;
                });
        },

        CargaEjecutivoPensionados() {

            let oficina = getCookie("Oficina");
            let fechaHoy = new Date();
            let periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');

            fetch(`http://${motor_api_server}:4002/beneficios/lista-ejecutivo-beneficio/${oficina}/${periodo}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    $("#dllEjecutivoBenf").html("");
                    $("#dllEjecutivoBenf").append($("<option>").attr("value", "").html("Todos"));
                    $.each(datos, function (i, e) {
                        $("#dllEjecutivoBenf").append($("<option>").attr("value", e.rut).html(e.Nombre))
                    });
                });
        },
        handleEventoClickFiltrar() {
            let rut;
            let fechaHoy = new Date();
            let periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
            if (getCookie('Cargo') != 'Agente' && getCookie('Cargo') != 'Jefe Servicio al Cliente' && getCookie('Cargo') != 'Jefe Plataforma') {
                rut = getCookie('Rut')
            }
            else {
                rut = $('#dllEjecutivoBenf').val();
            }

            $("#tblAsigBenf").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/beneficios/lead-beneficios`,
                query: {
                    rut_completo: $('#txtRutBenf').val(),
                    prioridad: $('#dllPrioBenf').val(),
                    estado: $('#dllEstadoBenf').val(),
                    foco: $('#dllFocoBenf').val(),//$('select[name="dllFocoBenf"] option:selected').text(),
                    segmento: $('#dllSegmentoBenf').val(),
                    periodo: periodo,
                    oficina: getCookie('Oficina'),
                    ejecutivo_asignado: rut,
                    cargo: getCookie('Cargo'),
                }
            });
        },
    }
});


function formatoMoney(value, row, index) {
    return '$ ' + value.toMoney(0);
}

function rutFormatter(value, row, index) {
    return `<a href="${row.rut_completo}" class="btn-link" data-rutBnf="${row.rut_completo}"  data-nombreBnf="${row.nombre}" data-ofertabnf="${row.oferta}" data-toggle="modal" data-target="#modal_beneficios" data-backdrop="static" data-keyboard="false" data-origen="Beneficios"  ">${row.rut_completo}</a>`;
    // return '<a href="#" class="btn-link" data-target="#modal_beneficios" data-toggle="modal" data-rutBnf="' + value + '-' + row.Seguimiento.Afiliado_Dv + '" data-nombreBnf="' + row.Seguimiento.Nombre + ' ' + row.Seguimiento.Apellido + '"data-origen="' + 'Comercial' + '">' + value.toMoney(0).toString() + '-' + row.Seguimiento.Afiliado_Dv + '</a>';
}

let rut_;
let nombre_;
let origen_;
var appBnfModal = new Vue({
    el: '#modal_beneficios',
    data: {
        filtrosModal: {
            estados: [],
        },
        modelosModal: {
            estados: '',
        },
        dataModalBnf: {}

    },
    mounted() {
        this.ModalCargaEstadoBnf();
        this.ModalCargaComodinBnf();
    },
    updated() {
        //console.log('cambió', {
        //    form: this.modelosModal
        //})
    },
    methods: {
        ModalCargaEstadoBnf() {
            $("#dvRbEstadoBnf").html("");
            fetch(`http://${motor_api_server}:4002/beneficios/estado-gestion-beneficos-modal`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    $.each(datos, function (i, e) {
                        var lb = $('<label>').addClass('titulo_r').prop('for', `estado-rd-${e.id}`).text(e.nombre);
                        var inp = $('<input>').addClass('magic-radio').prop({ type: 'radio', name: 'rbestadoBnf', id: `estado-rd-${e.id}` }).val(e.id)
                        var dv = $('<div>').addClass('radio').css('margin-top', '-2px').append(inp).append(lb)
                        $("#dvRbEstadoBnf").append(dv)
                    });
                });

        },

        ModalCargaComodinBnf() {
            $("#dvComodin").html("");
            fetch(`http://${motor_api_server}:4002/beneficios/lista-comodin`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {

                    //<label for="demo-form-inline-checkbox">Option 1 (pre-checked)</label>
                    $.each(datos, function (i, e) {
                        var lb = $('<label>').addClass('titulo_r').prop('for', `comodin-bn-${e.id}`).text(e.nombre_comodin);
                        var inp = $('<input>').addClass('magic-checkbox').prop({ type: 'checkbox', id: `comodin-bn-${e.id}` }).val(e.id)
                        //var dv = $('<div>').addClass('radio').css('margin-top', '-2px').append(inp).append(lb)
                        $("#dvComodin").append(inp).append(lb)
                    });
                });

        },

        handleSubmitGestionBnf() {

            let salud = '';
            let educacion = '';
            let turismo = '';
            let hogar = '';
            let telefono = '';
            let fechaHoy = new Date();
            let periodo_ = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');

            if ($('#checkbox_salud:checked').val() == 'on') {
                salud = 'SI'
            }
            else { salud = 'NO' }

            if ($('#checkbox_educacion:checked').val() == 'on') {
                educacion = 'SI'
            }
            else { educacion = 'NO' }

            if ($('#checkbox_turismo:checked').val() == 'on') {
                turismo = 'SI'
            }
            else { turismo = 'NO' }

            if ($('#checkbox_hogar:checked').val() == 'on') {
                hogar = 'SI'
            }
            else { hogar = 'NO' }

            if ($('#checkbox_telefonia:checked').val() == 'on') {
                telefono = 'SI'
            }
            else { telefono = 'NO' }

            if ($('input:radio[name=rbestadoBnf]:checked').val() == undefined) {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe Seleccionar un Estado',
                    container: '#msjBnf',
                    timer: 4000
                });
                return false;
            }
            if ($('input:radio[name=rbSubestadoBnf]:checked').val() == undefined) {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe Seleccionar un Sub-Estado',
                    container: '#msjBnf',
                    timer: 4000
                });
                return false;
            }

            var webSaveGestionBeneficio = {
                rut: rut_,
                nombre: nombre_,
                estado: $('input:radio[name=rbestadoBnf]:checked').parent().find(".titulo_r").text(),
                sub_estado: $('input:radio[name=rbSubestadoBnf]:checked').parent().find(".titulo_sub").text(),
                area_salud: salud,
                area_educacion: educacion,
                area_turismo: turismo,
                area_hogar: hogar,
                area_telefonia: telefono,
                observacion: $('#txtObservacionBnf').val(),
                sugerencia: $('#txtSugenrenciaBnf').val(),
                rut_ejecutivo: getCookie("Rut"),
                oficina: getCookie("Oficina"),
                origen: origen_,
                periodo: periodo_,
            }

            fetch(`http://${motor_api_server}:4002/beneficios/guarda-gestion-beneficios`, {
                method: 'POST',
                body: JSON.stringify(webSaveGestionBeneficio),
                headers: {
                    'Content-Type': 'application/json',
                    'Token': getCookie('Token')
                }
            }).then(async (response) => {
                if (!response.ok) {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Error al Guardar Gestion...',
                        container: '#msjBnf',
                        timer: 4000
                    });
                    return false;
                }
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Se guardo Gestion Correctamente...',
                    container: '#msjBnf',
                    timer: 4000
                });

                if (origen_ == 'Comercial') {
                    $('#btn_comercial_bnf').attr('disabled', false);
                }
                appBnfModal.obtenerHistorialBnf(rut_);
                appBeneficiosFiltros.handleEventoClickFiltrar();
            });
        },
        obtenerHistorialBnf(rut) {
            fetch(`http://${motor_api_server}:4002/beneficios/historial-bnf/${rut}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.dataModalBnf = datos;
                    return datos
                })
        },
    },
});

$('#modal_beneficios').on('show.bs.modal', async (event) => {

    rut_ = $(event.relatedTarget).data('rutbnf')
    nombre_ = $(event.relatedTarget).data('nombrebnf')
    origen_ = $(event.relatedTarget).data('origen')
    oferta_ = $(event.relatedTarget).data('ofertabnf')

    // console.log('Nombre : ' + nombre_ + '  -----  ' + 'Rut : ' + rut_ + ' -------  ' + origen_)
    $('#txtRutBnf').val(rut_)
    $('#txtNombreBnf').val(nombre_)
    $('#txtOfertaBnf').val(oferta_.toMoney(0))

    $('#btn_comercial_bnf').attr('disabled', true);

    if (origen_ == 'Comercial') {
        $('#btComercialBnf').html('');
        let tipo = $(event.relatedTarget).data('tipo')
        let rutc = $(event.relatedTarget).data('rut')
        let rutafipsu = $(event.relatedTarget).data('rutafipsu')
        let periodo = $(event.relatedTarget).data('periodo')
        let tieneEncuesta = $(event.relatedTarget).data('tieneEncuesta')
        var button = '<button class="btn btn-success" style="border-radius: 8px;" id="btn_comercial_bnf" disabled data-target="#mdl_data" data-toggle="modal" data-tieneEncuesta="' + tieneEncuesta + '" data-periodo="' + periodo + '" data-rutafipsu="' + rutafipsu + '" data-rut="' + rutc + '" data-tipo="' + tipo + '">Ir a gestión comercial</button>';
        $('#btComercialBnf').append(button);
        //consolo.log('paso comercial')
    }
    appBnfModal.obtenerHistorialBnf(rut_);
    cargaDatosDeContacto(rut_)
});

$('#modal_beneficios').on('hidden.bs.modal', function (e) {
    $('input[name="rbestadoBnf"]').prop('checked', false);
    $('input[name="rbSubestadoBnf"]').prop('checked', false);
    $("#dvRbSubEstadoBnf").html("");
    $('input[type="checkbox"]').prop('checked', false);
    $("#txtObservacionBnf").val('');
    $("#txtSugenrenciaBnf").val('');

})


$(function () {

    if (getCookie('Cargo') == 'Agente' || getCookie('Cargo') == 'Jefe Servicio al Cliente' || getCookie('Cargo') == 'Jefe Plataforma' || getCookie('Cargo') == 'Ejecutivo Empresas y Trabajadores' || getCookie('Cargo') == 'Ejecutivo Incorporaciones') {
        $('#divAgenteBnf').css('display', 'block')
        //$('#mdAsigEjePen').css('display', 'block');
    }
    else {
        $('#divAgenteBnf').css('display', 'none')
        //$('#mdAsigEjePen').css('display', 'none');
    }

    var result = [];
    $('#tblAsigBenf').on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function (e, row) {
        result.length = 0;
        var i = 0;
        $("input[type=checkbox]:checked").each(function () {
            if ($(this).parent().parent().find('td').eq(1).text() != "") {
                result[i] = $(this).parent().parent().find('td').eq(1).text();
                ++i;
            }
        });
    });

    $('#btPrintBeneficio').click(function () {
        if (result['length'] != 0) {
            var openEnderContent = $('#tblPrinBeneficio').html()
            var numero = 1;

            $('#prinTblBenf').css('display', 'block')
            $('#tblPrinBeneficio').css('display', 'block')

            $.each(result, function (i, e) {
                fetch(`http://${motor_api_server}:4002/beneficios/printBeneficios/${result[i]}`, {
                    method: 'GET',
                    mode: 'cors',
                    cache: 'default'
                })
                    .then(response => response.json())
                    .then(datos => {
                        var newTable = $('#base-table-bnf').clone();
                        newTable.show().appendTo('#tblPrinBeneficio')

                        newTable.find(`td:contains('([rut])')`).text('RUT : ' + datos.rut_completo);
                        newTable.find(`td:contains('([email])')`).text('EMAIL : ' + datos.email);
                        newTable.find(`td:contains('([nombre])')`).text('NOMBRE : ' + datos.nombre);
                        newTable.find(`td:contains('([fono])')`).text('CELULAR : ' + datos.celular);
                        newTable.find(`td:contains('([sucursal])')`).text('SUCURSAL : ' + datos.oficina_txt);
                        newTable.find(`td:contains('([fono1_2])')`).text('FONO 1 : ' + datos.fono_1 + '  ----   FONO 2 : ' + datos.fono_2);
                        newTable.find(`td:contains('([oferta])')`).text('OFERTA : ' + datos.oferta.toMoney());
                        newTable.find(`td:contains('([comuna])')`).text('COMUNA : ' + datos.comuna);
                        newTable.find(`td:contains('([foco])')`).text('FOCO : ' + datos.foco);

                        if (numero !== 1 && numero % 2 !== 0) {
                            //if (numero !== 1) {
                            newTable.css('page-break-before', 'always').css('margin-top', '50px');
                        }
                        numero++;
                        //console.log({ newTable });

                        return datos;
                    })
            });

            setTimeout(function () {
                $('#prinTblBenf').printThis();
            }, 2000);

            setTimeout(function () {
                $('#prinTblBenf').css('display', 'none')
                $('#tblPrinBeneficio').css('display', 'none')
                $('input[type="checkbox"]').prop('checked', false);
                $('#tblPrinBeneficio').html(openEnderContent)
                result = []
            }, 3000);
        }
        else {
            $.niftyNoty({
                type: 'warning',
                container: 'floating',
                html: '<strong>Error..</strong> Debe Seleccionar antes de Imprimir!',
                focus: false,
                timer: 5000
            });
        }
        $('.cancel-button').click(function () {
            $('#printPensionado').hide()
            $('#tblPrinBeneficio').css('display', 'none')
        });
    });

});

$(document).on('click', 'input:radio[name=rbestadoBnf]', function () {
    switch (this.value) {
        case "3":
            $("#dvRbSubEstadoBnf").html("");
            fetch(`http://${motor_api_server}:4002/beneficios/lista-sub-estado-modal/${this.value}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    $.each(datos, function (i, e) {
                        var lb = $('<label>').addClass('titulo_sub').prop('for', `sub-estado-rd-${e.id}`).text(e.nombre);
                        var inp = $('<input>').addClass('magic-radio').prop({ type: 'radio', name: 'rbSubestadoBnf', id: `sub-estado-rd-${e.id}` }).val(e.id)
                        var dv = $('<div>').addClass('radio').css('margin-top', '-2px').append(inp).append(lb)
                        $("#dvRbSubEstadoBnf").append(dv)
                    });
                });
            $("#checkbox_salud").removeAttr("disabled");
            $("#checkbox_educacion").removeAttr("disabled");
            $("#checkbox_turismo").removeAttr("disabled");
            $("#checkbox_hogar").removeAttr("disabled");
            $("#checkbox_telefonia").removeAttr("disabled");

            break;
        case "2":
            $("#dvRbSubEstadoBnf").html("");
            fetch(`http://${motor_api_server}:4002/beneficios/lista-sub-estado-modal/${this.value}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    $.each(datos, function (i, e) {
                        var lb = $('<label>').addClass('titulo_sub').prop('for', `sub-estado-rd-${e.id}`).text(e.nombre);
                        var inp = $('<input>').addClass('magic-radio').prop({ type: 'radio', name: 'rbSubestadoBnf', id: `sub-estado-rd-${e.id}` }).val(e.id)
                        var dv = $('<div>').addClass('radio').css('margin-top', '-2px').append(inp).append(lb)
                        $("#dvRbSubEstadoBnf").append(dv)
                    });

                });

            $("#checkbox_salud").attr("disabled", true);
            $("#checkbox_educacion").attr("disabled", true);
            $("#checkbox_turismo").attr("disabled", true);
            $("#checkbox_hogar").attr("disabled", true);
            $("#checkbox_telefonia").attr("disabled", true);

            break;
    }

})

$('#btn-add-contac_beneficio').on('click', function () {
    if ($('#formulario-contac_beneficio').is(':visible')) {
        $('#formulario-contac_beneficio').hide('slow');
    }
    else {
        $('#formulario-contac_beneficio').show('slow');
    }
});

$('#form-registro-contacto_beneficio').bootstrapValidator({
    excluded: [':disabled', ':not(:visible)'],
    feedbackIcons: [],
    fields: {
        cbtippContac_acuerdo_pago: {
            validators: {
                notEmpty: {
                    message: 'Debe seleccionar un tipo de Contacto'
                }
            }
        },
        cbClasificacionConctac_acuerdo_pago: {
            validators: {
                notEmpty: {
                    message: 'Debe seleccionar una clasificación de contacto'
                }
            }
        },
        afi_NewContacto_acuerdo_pago: {
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
    e.preventDefault();
    var $form = $(e.target);
    var rutCont = rut_;
    rutCont = rutCont.substring(0, rutCont.length - 2)
    var objeto_envio_contacto = {
        RutAfiliado: rutCont,
        IdTipoContac: $('#cbtippContac_beneficio').val(),
        GlosaTipoContac: $('select[name="cbtippContac_beneficio"] option:selected').text(),
        IdClasifContac: $('#cbClasificacionConctac_beneficio').val(),
        GlosaClasifContac: $('select[name="cbClasificacionConctac_beneficio"] option:selected').text(),
        DatosContac: $('#afi_NewContacto_beneficio').val()
    }
    $.SecGetJSON(BASE_URL + "/motor/api/Contactos/ingresa-nuevo-contacto", objeto_envio_contacto, function (datos) {
        $("#form-registro-bnf").bootstrapValidator('resetForm', true);
        cargaDatosDeContacto(rutCont, 'bdy_datos_contactos_beneficio');
        $("#btn-add-contac_beneficio").trigger("click");
        $.niftyNoty({
            type: 'success',
            icon: 'pli-like-2 icon-2x',
            message: 'Contacto Guardado correctamente.',
            container: '#tab-gestion-3',
            timer: 5000
        });
    });

});

function cargaDatosDeContacto(rutAf, destino = null) {

    var rutCont = rutAf;
    rutCont = rutCont.substring(0, rutCont.length - 2)
    if (destino != null) {
        $(`${destino} > tr`).remove();
        $(destino).html("");
    }
    else {
        $("#bdy_datos_contactos_beneficio > tr").remove();
        $("#bdy_datos_contactos_beneficio").html("");
    }
    $.SecGetJSON(BASE_URL + "/motor/api/Contactos/lista-contactos-afi", { RutAfiliado: rutCont }, function (contac) {
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

            var destinoDefault = destino == null ? "#bdy_datos_contactos_beneficio" : destino;
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

