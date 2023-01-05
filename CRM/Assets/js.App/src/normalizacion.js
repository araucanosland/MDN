jQuery.support.cors = true;
var appNormalizacionFiltros = new Vue({
    el: '#demo-lft-tab-2',
    data: {
        filtros: {
            causas: [],
            estados: [],
            subEstados: [],
            prioridad: [],
            vencimiento: [],
            estadoCliente: [],
            tipoCampana: [],
            derivacion: [],
        },
        modelos: {
            estado: '',
            subEstado: '',
            causa: '',
            prioridad: '',
            estadoCliente: '',
            tipoCampana: '',
            derivacion: '',
        }
    },
    mounted() {
        this.obtenerCausas();
        this.obtenerEstados();
        this.loadTablaNormalizacion();
        this.obtenerPrioridad();
        this.obtenerEstadoCliente();
        this.obtenerTipoCamapana();
        this.obtenerDerivacion();
    },
    updated() {
        // console.log('cambió')
    },
    methods: {
        obtenerCausas() {
            fetch(`http://${motor_api_server}:4002/normalizacion/causas`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(causasJSON => {
                    this.filtros.causas = causasJSON;
                });
        },
        obtenerEstados() {
            fetch(`http://${motor_api_server}:4002/normalizacion/estados`, {
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
            fetch(`http://${motor_api_server}:4002/normalizacion/estados?padre=${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosSubJSON => {
                    this.filtros.subEstados = estadosSubJSON;
                });
        },
        obtenerEstadoCliente() {
            fetch(`http://${motor_api_server}:4002/normalizacion/estadoCliente`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.estadoCliente = estadosJSON;
                });
        },
        obtenerPrioridad() {
            fetch(`http://${motor_api_server}:4002/normalizacion/Prioridad`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.prioridad = estadosJSON;
                });
        },
        obtenerTipoCamapana() {
            fetch(`http://${motor_api_server}:4002/normalizacion/tipocampana`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.tipoCampana = estadosJSON;
                });
        },
        obtenerDerivacion() {
            fetch(`http://${motor_api_server}:4002/normalizacion/derivacion`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.derivacion = estadosJSON;
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
            $("#tabla_recuperaciones").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/normalizacion/leads`,
                query: {
                    periodo: periodo,
                    asignado: getCookie('Rut'),
                    causa: this.modelos.causa,
                    estado: this.modelos.estado,
                    subEstado: this.modelos.subEstado,
                    prioridad: this.modelos.prioridad,
                    estadoCliente: this.modelos.estadoCliente,
                    tipoCampana: this.modelos.tipoCampana,
                    derivacion: this.modelos.derivacion,
                    oficina: getCookie('Oficina'),
                    cargo: getCookie('Cargo'),
                    oficinasAgenteterritotial: $("#ddloatnormalizacion").val()
                }
            });
        },
        loadTablaNormalizacion() {
            $("#tabla_recuperaciones").bootstrapTable();
        }
    }
});


function normalizacionLinkFormatter(value, row, index) {
    return `<a href="#" class="btn-link" data-target="#mdl_data_normalizacion" data-toggle="modal" data-lead="${row.id}" data-periodo="${row.periodo}" data-rut="${value}" >${value}</a>`;
}



function normalizacionNombresFormatter(value, row, index) {
    try {
        return value + ' ' + row.afiliado.apellidos;
    }
    catch
    {
        return 'No tenemos el dato Registrado';
        console.log({ row })
    }
}

function normalizacionPrioridadFormatter(value, row, index) {
    return value.toString().toEtiquetaPrioridad();
}

function normalizacionFormaterBasal(value, row, index) {

    try {
        if (row.gestiones[row.gestiones.length - 1] != undefined) {
            return row.gestiones[row.gestiones.length - 1].causaBasal.nombre
        } else {
            return '-';
        }
    }
    catch
    {
        return '-';
    }
}

function normalizacionFormaterEstado(value, row, index) {
    if (row.gestiones.length > 0) {
        const maximo = Math.max.apply(Math, row.gestiones.map(function (o) { return o.estadoCliente.id; }));
        const objetoFinal = row.gestiones.find((e) => {
            return e.estadoCliente.id === maximo;
        });
        return `<span class="${objetoFinal.estadoCliente.color}">${objetoFinal.estadoCliente.estado}</span>`
    }
    return '-';
}


function formatoMoneyFormatter(value, row, index) {
    return value.toMoney(0);
}

function estadoAfiliadoFormatter(value, row, index) {

    if (row.gestiones.length > 0) {
        const maximo = Math.max.apply(Math, row.gestiones.map(function (o) { return o.estadoCliente.id; }));
        const objetoFinal = row.gestiones.find((e) => {
            return e.estadoCliente.id === maximo;
        });
        return `<span class="${objetoFinal.estadoCliente.color}">${objetoFinal.estadoCliente.estado}</span>`
    }
    return 'Sin Gestion';
}


var appNormalizacionModal = new Vue({
    el: '#mdl_data_normalizacion',
    data: {
        filtrosModal: {
            causasModal: [],
            estadosModal: [],
            subEstadosModal: [],
            estadoCliente: []
        },
        modelosModal: {
            estado: '',
            subEstado: '',
            causaBasal: '',
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
        this.obtenerCausasModal();
        this.obtenerEstadosModal();
        this.obtenerEstadoClienteModal();
    },
    updated() {
        //console.log('cambió', {
        //    form: this.modelosModal
        //})
    },
    methods: {
        obtenerCausasModal() {
            fetch(`http://${motor_api_server}:4002/normalizacion/causas`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(causasJSON => {
                    this.filtrosModal.causasModal = causasJSON;
                });
        },
        obtenerEstadosModal() {
            fetch(`http://${motor_api_server}:4002/normalizacion/estados`, {
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
           
            fetch(`http://${motor_api_server}:4002/normalizacion/estados?padre=${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosSubJSON => {
                    this.filtrosModal.subEstadosModal = estadosSubJSON;
                });
        },
        obtenerEstadoCliente(datos) {
            if (datos.gestiones.length > 0) {
                const maximo = Math.max.apply(Math, datos.gestiones.map(function (o) {
                    //console.log({ o })
                    //return o.estadoCliente.id;
                    return o.estado.id;
                }));
                const objetoFinal = datos.gestiones.find((e) => {
                    return e.estadoCliente.id === maximo;

                    console.log({ objetoFinal });
                });
                $("#estadoClieModalNorm").html(`<span class="${objetoFinal.estadoCliente.color}">${objetoFinal.estadoCliente.estado}</span>`);
            } else {
                $("#estadoClieModalNorm").html('Sin Gestion');
            }
        },
        obtenerEstadoClienteModal() {
            fetch(`http://${motor_api_server}:4002/normalizacion/estadoCliente`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtrosModal.estadoCliente = estadosJSON;
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
            fetch(`http://${motor_api_server}:4002/normalizacion/leads/${rut}/${periodo}`, {
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
        handleSubmitNormalizacion() {

            let valContact = $('#slEstadoModNormalizacion').val();

            const formData = {
                lead: this.dataModal.id,
                ...this.modelosModal,
                rutEjecutivo: getCookie('Rut'),
                oficina: parseInt(getCookie('Oficina')),
                nombreEjecutivo: getCookie('Usuario'),
                rutAfiliado: $('#txtRutAfiNorm').val(),
            };

            fetch(`http://${motor_api_server}:4002/normalizacion`, {
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
                        container: '.msjNormalizacion',
                        timer: 3000
                    });
                    return false;
                }
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Gestión Guardada correctamente.',
                    container: '.msjNormalizacion',
                    timer: 3000
                });
                $('#btGestNormalizacion').attr("disabled", true);
                $('#fpg_normalizacion').css('display', 'none');
                appNormalizacionModal.setDefaultsModal();
                appNormalizacionFiltros.handleEventoClickFiltrar();

                //if (valContact == 1 || valContact == 2) {
                //    $("#tabNormContact").tab('show');
                //    $("#msjContactNormalizacion").css('display', 'block')
                //}

                if ($('.subEstado').val() == 21 || $('.subEstado').val() == 23) {
                    $("#tabNormContact").tab('show');
                    $("#msjContactNormalizacion").css('display', 'block');
                }


            });
            //.catch(reasons => {
            //    console.log({ reasons });
            //    $.niftyNoty({
            //        type: 'danger',
            //        message: 'Error al intentar guardar gestión.',
            //        container: '.msjNormalizacion',
            //        timer: 3000
            //    });
            //});
        },
        setDefaultsModal() {
            this.modelosModal = {
                estado: '',
                subEstado: '',
                causaBasal: '',
                fechaCompromiso: '',
                comentarios: '',
                folioCredito: '',
            }
        }
    },
});

$(function () {
  
    if (getCookie("Cargo") == "Agente Territorial") {
               
        $("#oficina_normalizacion").css("display", "block");

        var fechaHoy = new Date();
        var Periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');

        $.SecGetJSON(BASE_URL + "/motor/api/Gestion/v3/listar-agente-territorial", { Periodo: Periodo, Rut: getCookie("Rut") }, function (response) {


            $("#ddloatnormalizacion").html("");
            $("#ddloatacuerdopago").html("");
            $("#ddloatsrgurocesantia").html("");
            $("#ddloatderivaciones").html("");
            $("#ddloatign").html("");
            $("#ddloatpensionado").html("");                                
            $("#ddloatcomercial").html("");     
            

            $("#ddloatnormalizacion").append($("<option>").val('').html("Todas").data("id", '').data("nombre", "Todas"));
            $("#ddloatacuerdopago").append($("<option>").val('').html("Todas").data("id", '').data("nombre", "Todas"));
            $("#ddloatsrgurocesantia").append($("<option>").val('').html("Todas").data("id", '').data("nombre", "Todas"));
            $("#ddloatderivaciones").append($("<option>").val('').html("Todas").data("id", '').data("nombre", "Todas"));
            $("#ddloatign").append($("<option>").val('').html("Todas").data("id", '').data("nombre", "Todas"));
            $("#ddloatpensionado").append($("<option>").val('').html("Todas").data("id", '').data("nombre", "Todas"));
            $("#ddloatcomercial").append($("<option>").val('').html("Todas").data("id", '').data("nombre", "Todas"));
            $.each(response, function (i, datos) {
               
                $("#ddloatnormalizacion").append($("<option>").val(datos.Cod_Oficina).html(datos.Oficina).data("Cod_Oficina", datos.Cod_Oficina).data("Oficina", datos.Oficina));
                $("#ddloatacuerdopago").append($("<option>").val(datos.Cod_Oficina).html(datos.Oficina).data("Cod_Oficina", datos.Cod_Oficina).data("Oficina", datos.Oficina));
                $("#ddloatsrgurocesantia").append($("<option>").val(datos.Cod_Oficina).html(datos.Oficina).data("Cod_Oficina", datos.Cod_Oficina).data("Oficina", datos.Oficina));
                $("#ddloatderivaciones").append($("<option>").val(datos.Cod_Oficina).html(datos.Oficina).data("Cod_Oficina", datos.Cod_Oficina).data("Oficina", datos.Oficina));
                $("#ddloatign").append($("<option>").val(datos.Cod_Oficina).html(datos.Oficina).data("Cod_Oficina", datos.Cod_Oficina).data("Oficina", datos.Oficina));
                $("#ddloatpensionado").append($("<option>").val(datos.Cod_Oficina).html(datos.Oficina).data("Cod_Oficina", datos.Cod_Oficina).data("Oficina", datos.Oficina));
                $("#ddloatcomercial").append($("<option>").val(datos.Cod_Oficina).html(datos.Oficina).data("Cod_Oficina", datos.Cod_Oficina).data("Oficina", datos.Oficina));

            });

        });

    }





    $('#mdl_data_normalizacion').on('show.bs.modal', async (event) => {

        const rut = event.relatedTarget != undefined ? $(event.relatedTarget).data('rut') : $('#afi_rut_busc').val();
        console.log({ rut })
        var rutCont = rut
        rutCont = rutCont.substring(0, rutCont.length - 2)
        await appNormalizacionModal.obtenerLead(rut);
        cargaDatosDeContactoNorm(rutCont)
        appNormalizacionModal.setDefaultsModal();
        $('#fpg_normalizacion').css('display', 'none');
        $('#btGestNormalizacion').attr("disabled", false);


        setInterval(function () {
            $('#demo-dp-component_normalizacion .input-group.date').datepicker({
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
        $("#msjContactNormalizacion").css('display', 'none')

    });


    $('#mdl_data_normalizacion').on('hidden.bs.modal', async (event) => {
        appNormalizacionModal.setDefaultsModal();

        $('#slBasalModNormalizacion').attr("disabled", true);
    });

    $('#slEstadoModNormalizacion').change(function (e) {
       
        e.preventDefault();
        if ($(this).val() == 1) {
            $('#slBasalModNormalizacion').attr("disabled", false);
        }
        else {
            $('#slBasalModNormalizacion').attr("disabled", true);
            $('#fpg_normalizacion').css('display', 'none');
            $('#slBasalModNormalizacion').val("");
        }
    });

    $('.subEstado').change(function (e) {
        appNormalizacionModal.manejarVisibilidadCalendario();
        $('#datos-gestion_normalizacion').show();
        /*$('#demo-dp-component_normalizacion .input-group.date').datepicker({
            autoclose: true,
            format: 'dd-mm-yyyy',
            startDate: "0d",
            language: "es",
            daysOfWeekDisabled: [6, 0],
            todayHighlight: true

        }).on('show.bs.modal hide.bs.modal', function (event) {
            // prevent datepicker from firing bootstrap modal "show.bs.modal"
            event.stopPropagation();
            });*/
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

        var rutClie = $('#txtRutAfiNorm').val()
        rutClie = rutClie.substring(0, rutClie.length - 2)

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
            cargaDatosDeContactoNorm(rutClie);
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




    function cargaDatosDeContactoNorm(rutAf) {

        $("#bdy_datos_contactos_normalizacion > tr").remove();
        $("#bdy_datos_contactos_normalizacion").html("");

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

                $("#bdy_datos_contactos_normalizacion")
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

                                        cargaDatosDeContactoNorm(rutAf);

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



});