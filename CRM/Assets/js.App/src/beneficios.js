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
    return `<a href="${row.rut_completo}" class="btn-link" data-campana="${row.campana}" data-fecha_nac="${row.fecha_nacimiento}" data-cargas="${row.cargas}" data-rutBnf="${row.rut_completo}"  data-nombreBnf="${row.nombre}" data-ofertabnf="${row.oferta}" data-toggle="modal" data-target="#modal_beneficios" data-backdrop="static" data-keyboard="false" data-origen="Beneficios"  ">${row.rut_completo}</a>`;
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
                    $.each(datos, function (i, e) {
                        var lb = $('<label>').addClass('titulo_r').prop('for', `comodin-bn-${e.id}`).text(e.nombre_comodin);
                        var inp = $('<input>').addClass('magic-checkbox').prop({ type: 'checkbox', id: `comodin-bn-${e.id}` }).val(e.id)
                        $("#dvComodin").append(inp).append(lb)
                    });
                });

        },
        handleSubmitGestionBnf() {

            let valContact = $('input:radio[name=rbestadoBnf]:checked').val();
            let telemedicina_ = '';
            let alimentos_ = '';
            let farmacias_ = '';
            let convenios_ = '';//otros

            let uno_salud_ = '';
            let despacho_m_ = '';
            let reembolso_m_ = '';


            let fechaHoy = new Date();
            let periodo_ = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');

            if ($('#comodin_Telemedicina:checked').val() == 'on') {
                telemedicina_ = 'SI'
            }
            else { telemedicina_ = 'NO' }

            if ($('#comodin_Alimentos:checked').val() == 'on') {
                alimentos_ = 'SI'
            }
            else { alimentos_ = 'NO' }

            if ($('#comodin_Farmacias:checked').val() == 'on') {
                farmacias_ = 'SI'
            }
            else { farmacias_ = 'NO' }

            if ($('#convenios_c:checked').val() == 'on') {
                convenios_ = 'SI'
            }
            else { convenios_ = 'NO' }


            if ($('#uno_salud:checked').val() == 'on') {
                uno_salud_ = 'SI'
            }
            else { uno_salud_ = 'NO' }

            if ($('#despacho_m:checked').val() == 'on') {
                despacho_m_ = 'SI'
            }
            else { despacho_m_ = 'NO' }

            if ($('#reembolso_m:checked').val() == 'on') {
                reembolso_m_ = 'SI'
            }
            else { reembolso_m_ = 'NO' }


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

                segmento: $('#dllSegmentoBenf').val(),
                uso_rem_medico: $('#txtRemMedicoBnf').val(),
                uso_farmacia: $('#txtUsoFarmBnf').val(),
                fecha_casado: $('#dpFechaAniversario').val(),
                postulacion_beca: $("input[name='rbBecas']:checked").val(),
                uso_gas: $("input[name='rbGas']:checked").val(),
                compania_telef: $("input[name='rbentel']:checked").val(),
                tipo_plan: $("input[name='rbentelTipo']:checked").val(),

                telemedicina: telemedicina_,
                alimentos: alimentos_,
                farmacias: farmacias_,
                uno_salud: uno_salud_,
                despacho_m: despacho_m_,
                reembolso_m: reembolso_m_,
                convenios: convenios_,


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

                //if (origen_ == 'Comercial') {
                //    $('#btn_comercial_bnf').attr('disabled', false);
                //}
                appBnfModal.obtenerHistorialBnf(rut_);
                appBeneficiosFiltros.handleEventoClickFiltrar();
                if (valContact == 3) {
                    $("#tabContacBeneficio").tab('show');
                    $("#msjContactBeneficio").css('display', 'block')

                }
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
        obtenerUltimaGest(rut) {

            let fechaHoy = new Date();
            let periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
            fetch(`http://${motor_api_server}:4002/beneficios/lista-ultima-gestion/${rut}/${periodo}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {

                    $('#dllSegmentoBenf').val(datos[0].segmento);
                    $('#txtRemMedicoBnf').val(datos[0].uso_rem_medico);
                    $('#txtUsoFarmBnf').val(datos[0].uso_farmacia);

                    $('#dpFechaAniversario').val(datos[0].fecha_casado)
                   // $('#btn_comercial_bnf').attr('disabled', false);
                    if (datos[0].postulacion_beca == 'SI') {
                        $("#ckbox_beca_si").prop("checked", true);
                    }
                    else if (datos[0].postulacion_beca == 'NO') {
                        $("#ckbox_beca_no").prop("checked", true);
                    }

                    if (datos[0].uso_gas == 'CAÑERIA') {
                        $("#ckbox_beca_caneria").prop("checked", true);
                    }
                    else if (datos[0].uso_gas == 'CILINDRO') {
                        $("#ckbox_beca_cilindro").prop("checked", true);
                    }



                    if (datos[0].telemedicina == 'SI') {
                        $("#comodin_Telemedicina").prop("checked", true);
                    }
                    if (datos[0].caja_alimentos == 'SI') {
                        $("#comodin_Alimentos").prop("checked", true);
                    }
                    if (datos[0].c_uso_farmacias == 'SI') {
                        $("#comodin_Farmacias").prop("checked", true);
                    }
                    if (datos[0].convenios == 'SI') {
                        $("#convenios_c").prop("checked", true);
                    }



                    if (datos[0].uno_salud == 'SI') {
                        $("#uno_salud").prop("checked", true);
                    }
                    if (datos[0].despacho_m == 'SI') {
                        $("#despacho_m").prop("checked", true);
                    }
                    if (datos[0].reembolso_m == 'SI') {
                        $("#reembolso_m").prop("checked", true);
                    }
                    if (datos[0].compania_telef == 'ENTEL') {
                        $("#ckbox_entel").prop("checked", true);
                    }
                    if (datos[0].compania_telef == 'OTRO') {
                        $("#ckbox_celular_otro").prop("checked", true);
                    }

                    if (datos[0].tipo_plan == 'CONTRATO') {
                        $("#rbentelTipo").prop("checked", true);
                    }

                    if (datos[0].tipo_plan == 'PRE-PAGO') {
                        $("#ckbox_entel_prepago").prop("checked", true);
                    }

                    $('#txtObservacionBnf').val(datos[0].observacion);
                    $('#txtSugenrenciaBnf').val(datos[0].sugerencia);


                });
        },
    },
});

$('#modal_beneficios').on('show.bs.modal', async (event) => {

    rut_ = $(event.relatedTarget).data('rutbnf')
    nombre_ = $(event.relatedTarget).data('nombrebnf')
    origen_ = $(event.relatedTarget).data('origen')
    oferta_ = $(event.relatedTarget).data('ofertabnf')

    campana_ = $(event.relatedTarget).data('campana')
    cargas_ = $(event.relatedTarget).data('cargas')
    fecha_nacimiento_ = $(event.relatedTarget).data('fecha_nacimiento')

    $('#txtRutBnf').val(rut_)
    $('#txtNombreBnf').val(nombre_)
    $('#txtOfertaBnf').val(oferta_.toMoney(0))
    $('#txtCampBenf').val(campana_)
    $('#txtFechaNacBenf').val(fecha_nacimiento_)
    $('#txtCargasBnf').val(cargas_)
   // $('#btn_comercial_bnf').attr('disabled', true);

    if (origen_ == 'Comercial') {
        $('#btComercialBnf').html('');
        let tipo = $(event.relatedTarget).data('tipo')
        let rutc = $(event.relatedTarget).data('rut')
        let rutafipsu = $(event.relatedTarget).data('rutafipsu')
        let periodo = $(event.relatedTarget).data('periodo')
        let tieneEncuesta = $(event.relatedTarget).data('tieneEncuesta')
        var button = '<button class="btn btn-success" style="border-radius: 8px;" id="btn_comercial_bnf"  data-target="#mdl_data" data-toggle="modal" data-tieneEncuesta="' + tieneEncuesta + '" data-periodo="' + periodo + '" data-rutafipsu="' + rutafipsu + '" data-rut="' + rutc + '" data-tipo="' + tipo + '">Ir a gestión comercial</button>';
        $('#btComercialBnf').append(button);
    }

    $('#dp-component-fecha-ani .input-group.date').datepicker(
        { autoclose: true, format: 'dd-mm-yyyy', language: "es", daysOfWeekDisabled: [6, 0], todayHighlight: true }
    ).on('changeDate', function (event) {
        event.stopPropagation();
    }).on('show.bs.modal hide.bs.modal', function (event) {
        event.stopPropagation();
    });

    appBnfModal.obtenerUltimaGest(rut_);
    appBnfModal.obtenerHistorialBnf(rut_);


    var rutCont = rut_;
    rutCont = rutCont.substring(0, rutCont.length - 2)

    cargaDatosDeContactoBnf(rutCont)
    $("#msjContactBeneficio").css('display', 'none')
});

$('#modal_beneficios').on('hidden.bs.modal', function (e) {
   // $('#btn_comercial_bnf').attr('disabled', true);
    $('input[name="rbestadoBnf"]').prop('checked', false);
    $('input[name="rbSubestadoBnf"]').prop('checked', false);
    $("#dvRbSubEstadoBnf").html("");
    $('input[type="checkbox"]').prop('checked', false);
    $('input[type="radio"]').prop('checked', false);
    $("#txtObservacionBnf").val('');
    $("#txtSugenrenciaBnf").val('');
    $("#txtRemMedicoBnf").val('');
    $("#txtUsoFarmBnf").val('');
    $("#dllSegmentoBenf").val();
    $('#dpFechaAniversario').val('');
    $('#tipo_plan_entel').css('display', 'none')
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

$('#form-registro-bnf').bootstrapValidator({
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
        cargaDatosDeContactoBnf(rutCont, '#bdy_datos_contactos_beneficio');
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

function cargaDatosDeContactoBnf(rutAf, destino = null) {

    var rutCont = rutAf;
    //rutCont = rutCont.substring(0, rutCont.length - 2)
    if (destino != null) {
        $("#bdy_datos_contactos_beneficio > tr").remove();
        $("#bdy_datos_contactos_beneficio").html("");
        //$(`${destino} > tr`).remove();
        //$(destino).html("");
    }
    else {
        $("#bdy_datos_contactos_beneficio > tr").remove();
        $("#bdy_datos_contactos_beneficio").html("");
    }
    $.SecGetJSON(BASE_URL + "/motor/api/Contactos/lista-contactos-afi", { RutAfiliado: rutCont }, function (contac) {
        $.each(contac, function (i, e) {
            var colorPorc = '';
            var alertFecha = '';
            var icon = '--';

            if (e.PorcIndice > 70) {
                colorPorc = 'badge-success'
                icon = '<i class="ion-checkmark">';
            }
            if (e.PorcIndice > 40 && e.PorcIndice < 69) {
                colorPorc = 'badge-warning'
            }
            if (e.PorcIndice < 39) {
                colorPorc = 'badge-danger'
                icon = '!';
            }
            if (e.FechaContacto.toFecha() === "01-01-1900") {
                alertFecha = e.FechaContacto.toFecha() + '<i class="badge badge-danger badge-stat badge-icon pull-right add-tooltip" style="position: static; data-toggle="tooltip" data-container="body" data-placement="top" data-original-title="Se debe Actualizar Contacto"><i class="ion-close"></i></i>'
                $("#afiContac").css({ 'display': 'block' })
            }
            else {
                alertFecha = e.FechaContacto.toFecha() + '<i class="badge ' + colorPorc + ' badge-stat badge-icon pull-right add-tooltip" style="position: static; data-toggle="tooltip" data-container="body" data-placement="top" data-original-title="Se debe Actualizar Contacto">' + icon + '</i></i>'
            }

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
                                $.SecGetJSON(BASE_URL + "/motor/api/Contactos/actualiza-indice-contacto", { Indice: indice, RutAfi: rutCont, ValorDato: valorD, Oficina: ofici }, function (datos) {

                                    cargaDatosDeContactoBnf(rutCont);


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


$(document).on('click', 'input:radio[name=rbentel]', function () {
    switch (this.value) {
        case "ENTEL":
            $('#tipo_plan_entel').css('display', 'block')
            break;

        case "OTRO":
            $('#tipo_plan_entel').css('display', 'none')
            break;
    }
});

