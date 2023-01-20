window.idLead;
window.result = [];
window.rutPensionado;

var metodos = {
    CargaGrilla: function () {
        let fechaHoy = new Date();
        let periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');

        $("#tbencuestaPensionados").bootstrapTable('refresh', {
            url: '/motor/api/pensionados/Listar-encuesta-pensionados',
            query: {
                Token: getCookie("Token")
                , Periodo: periodo
                , Estado: $("#ddlEstado").val()
                , Ejecutivo: $("#ddlejecutivoBusqueda").val()
                , OficinasAgenteterritorial: $("#ddloATEencuesta").val(),
            }
        });


    },
    CargaddlEstados: function (IdPadre) {

        $.SecGetJSON(BASE_URL + "/motor/api/pensionados/encuesta-pensionados-estados", { Token: getCookie("Token"), IdPadre: IdPadre }, function (response) {

            $("#ddlrespuestaPregunta4").html("");
            $("#ddlrespuestaPregunta4").append($("<option>").val('-1').html("Seleccione...").data("id", '-1').data("descripcion", "Seleccione..."));
            $.each(response, function (i, datos) {
                $("#ddlrespuestaPregunta4").append($("<option>").val(datos.Id).html(datos.Descripcion).data("id", datos.Id).data("descripcion", datos.Descripcion));

            });

        });
    },
    CargaddlejecutivodAsignacion: function () {
        let fechaHoy = new Date();
        let periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');

        $.SecGetJSON(BASE_URL + "/motor/api/pensionados/lista-ejecutivo-asigna-pensionado", { Periodo: periodo, codOficina: getCookie('Oficina') }, function (response) {

            $("#dllEjePensiondos").html("");
            $("#dllEjePensiondos").append($("<option>").val('-1').html("Seleccione...").data("id", '-1').data("descripcion", "Seleccione..."));
            $.each(response, function (i, datos) {
                $("#dllEjePensiondos").append($("<option>").val(datos.Rut).html(datos.Nombre).data("id", datos.Rut).data("descripcion", datos.Nombre));

            });

        });
    },
    CargaddlEstadosBusqueda: function (IdPadre) {

        $.SecGetJSON(BASE_URL + "/motor/api/pensionados/encuesta-pensionados-estados", { Token: getCookie("Token"), IdPadre: IdPadre }, function (response) {

            $("#ddlEstado").html("");
            $("#ddlEstado").append($("<option>").val('-2').html("Todos").data("id", '-2').data("descripcion", "Todos"));
            $("#ddlEstado").append($("<option>").val('-1').html("Sin Gestión").data("id", '-1').data("descripcion", "Todos"));

            $.each(response, function (i, datos) {
                $("#ddlEstado").append($("<option>").val(datos.Id).html(datos.Descripcion).data("id", datos.Id).data("descripcion", datos.Descripcion));

            });

        });
    },
    CargaddlejecutivoBusqueda: function () {
        let fechaHoy = new Date();
        let periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');

        $.SecGetJSON(BASE_URL + "/motor/api/pensionados/lista-ejecutivo-asigna-pensionado", { Periodo: periodo, codOficina: getCookie('Oficina') }, function (response) {

            $("#ddlejecutivoBusqueda").html("");
            $("#ddlejecutivoBusqueda").append($("<option>").val('-1').html("Seleccione...").data("id", '-1').data("descripcion", "Seleccione..."));
            $.each(response, function (i, datos) {
                $("#ddlejecutivoBusqueda").append($("<option>").val(datos.Rut).html(datos.Nombre).data("id", datos.Rut).data("descripcion", datos.Nombre));

            });

        });
    },
    CargaGrillaContacto: function (rutAf, destino = null) {

        if (destino != null) {
            $(`${destino} > tr`).remove();
            $(destino).html("");
        }
        else {
            $("#bdy_datos_contactos > tr").remove();
            $("#bdy_datos_contactos").html("");
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

                var destinoDefault = destino == null ? "#bdy_datos_contactos" : destino;
                $(destinoDefault)
                    .append(
                        $("<tr>")

                            .append($("<td>").append(e.ValorDato))
                            .append($("<td>").append(e.TipoDato))
                            .append($("<td>").append(e.PorcIndice))
                            .append($("<td>").append(alertFecha))
                    );
            });
        });

    },
    CargaHistorialGestiones: function (Id) {

        $.SecGetJSON(BASE_URL + "/motor/api/pensionados/lista-gestion-historial-encuesta", { IdPensionado: Id }, function (gestiones) {

            $('.contenedor-folios').html("");
            let html = `<h4 class="list-group-item-heading">Gestiones Realizadas</h4>`;
            $.each(gestiones, function (i, e) {
                debugger;
                html = `<h4 class="list-group-item-heading"></h4>
                            <p class="list-group-item-text">
                                <strong>Fecha Gestión: ${e.FechaGestion} </strong> 
                               
                            </p>
                            <p class="list-group-item-text">
                                                             
                                <strong>Estado:  ${e.Estado} </strong>

                            </p>
                    <hr class="solid">`;

                $('.contenedor-folios').append(html);
            });

        });


    }


}


function formatterSelect(val, row, index) {

    if (val == 'Sin Gestion' || val == 'No contesta' || val == 'Contactado con tercero, volver a llamar') {
        return `<select class="form-select"  onchange="ejecutarCambioEstado(${row.Id})"  id="ddlestados_${row.id}" style="border-radius: 6px; width: 130px;")">
                <option value="-1">Sin Gestión</option>
                <option value="22">Contactado, no responde encuesta</option>
                <option value="23">Contactado con tercero</option>
                <option value="24">Contactado con tercero, volver a llamar</option>
                <option value="25">No contesta</option>
                <option value="27">Teléfono no corresponde</option>
             </select>
             
`
    } else {
        return val;
    }

}

function ejecutarCambioEstado(Id) {
    estado = $(event.target).val();
    var IngresoEncuesta = {
        IdLead: Id,
        Estado: estado,
        Pregunta1: "",
        Pregunta2: "",
        Pregunta3: "",
        Pregunta4: "",
        RutEjecutivo: getCookie("Rut"),
        Observacion: ""
    }

    $.SecPostJSON(BASE_URL + "/motor/api/pensionados/Guardar-Encuesta-Pensionados", IngresoEncuesta, function (datos) {

        if (datos.Estado == "OK") {
            $.niftyNoty({
                type: 'success',
                icon: 'pli-like-2 icon-2x',
                message: 'Estado Modificado correctamente!!!.',
                container: 'floating',
                timer: 1000,
                onHidden: function () {
                    metodos.CargaGrilla();

                }
            });
        }

    });
}




function idFormatter(value, row, index) {

    if (row.Estado_encuesta == 'Sin Gestion' || row.Estado_encuesta == 'No contesta' || row.Estado_encuesta == 'Contactado con tercero, volver a llamar') {
        return `<a href="${value}"  class="btn-link" data-estadoId="${row.Estado_id}" data-nombre="${row.NombrePensionado}" data-estado="${row.Estado_encuesta}" data-toggle="modal" data-target="#modal_encusta_pensionado" data-backdrop="static" data-keyboard="false" data-lead="${row.Id}"  data-rut="${row.RutPensionadoDV}">${row.RutPensionadoDV}</a>`;
    }
    else {
        return row.RutPensionadoDV;
    }
}
function contactFormat(value, row, index) {
    return `<a href="${value}"  class="btn-link" data-Id=${row.Id}  data-rutPensionado=${row.RutPensionadoDV} data-toggle="modal" data-target="#modal-contactabilidad" data-backdrop="static" data-keyboard="false">${row.RutPensionadoDV}</a>`;

}



function formatoFecha(value, row, index) {

    if (value != null) {
        return value.toFecha();
    }

}
function limpiarEncuesta() {

    $("#respuestaPregunta1").val('');
    $("#ddlrespuestaPregunta2").val("0");
    $("#ddlrespuestaPregunta3").val("0");
    $("#ddlrespuestaPregunta4").val("-1");
    $("#txtObservaciones").val('');
}


$(function () {

    if (getCookie('Cargo') == 'Agente' || getCookie('Cargo') == 'Agente Territorial' || getCookie('Cargo') == 'Jefe Servicio al Cliente' || getCookie('Cargo') == 'Jefe Plataforma') {
        $('#divejecutivoBusqueda').css('display', 'block')
        $('#mdAsigEjePen').css('display', 'block');
    }
    else {
        $('#divejecutivoBusqueda').css('display', 'none')
        $('#mdAsigEjePen').css('display', 'none');
    }



    $('#btn-add-contac').on('click', function () {

        // console.log('Visibiliadad', $('#formulario-contac').is(':visible'));
        if ($('#formulario-contac').is(':visible')) {
            $('#formulario-contac').hide('slow');
        }
        else {
            $('#formulario-contac').show('slow');
        }

    });




    if (getCookie("Cargo") == "Agente Territorial") {

        $("#oficina_pensionado").css("display", "block");

        var fechaHoy = new Date();
        var Periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');

        $.SecGetJSON(BASE_URL + "/motor/api/Gestion/v3/listar-agente-territorial", { Periodo: Periodo, Rut: getCookie("Rut") }, function (response) {


            $("#ddloATEencuesta").html("");

            $("#ddloATEencuesta").append($("<option>").val('').html("Todas").data("id", '').data("nombre", "Todas"));

            $.each(response, function (i, datos) {
                $("#ddloATEencuesta").append($("<option>").val(datos.Cod_Oficina).html(datos.Oficina).data("Cod_Oficina", datos.Cod_Oficina).data("Oficina", datos.Oficina));

            });

        });

    }



    metodos.CargaddlEstadosBusqueda(2);
    metodos.CargaddlejecutivoBusqueda();

    $('#btAsignarPensionado').click(function () {
        debugger;
        if ($("#dllEjePensiondos").val() != "" && $("#dllEjePensiondos").val() != "-1") {
            var malos = []
            var buenos = 0;
            $.each(result, function (i, e) {
                debugger;
                var PensioandoAsignacionWeb = {
                    Ejecutivo_Asignado: $("#dllEjePensiondos").val(),
                    RutPensionado: result[i],
                    Oficina: getCookie("Oficina"),
                }


                $.SecPostJSON(BASE_URL + "/motor/api/pensionados/Asignar-Pensionado-Encuesta", PensioandoAsignacionWeb, function (datos) {
                    debugger;
                    if (datos.Estado == "OK") {
                    }
                });



            });

            $.niftyNoty({
                type: 'success',
                icon: 'pli-like-2 icon-2x',
                message: '<strong>OK..</strong>Se Asignaron ' + result.length + ' Pensionados  Correctamente...!',
                container: '#msjEjecuAsig',
                timer: 2000,
                onHidden: function () {
                    $('input[type="checkbox"]').prop('checked', false);
                    metodos.CargaGrilla();
                    result = []
                    $('#dllEjePensiondos').val('0');
                    $('#modal_asigna_pensionado').modal('hide');
                }
            });

        }
        else {
            $.niftyNoty({
                type: 'danger',
                message: '<strong>Error..</strong><li>Debe Seleccionar un Ejecutivo!</li>',
                container: '#msjEjecuAsig',
                timer: 4000
            });
        }
    });

    $('#modal_encusta_pensionado').on('show.bs.modal', async (event) => {
        limpiarEncuesta();
        metodos.CargaddlEstados(1);
        var link = $(event.relatedTarget);
        $("#nombrepensionado").html(link.data('nombre'));
        idLead = link.data('lead');
        //iniciar de la pregunta 1
        $('#demo-bv-wz a[href="#demo-bv-tab1"]').tab('show')

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
                var wdt = 80 / $total;
                var lft = wdt * index;

                $('#demo-bv-wz').find('.progress-bar').css({ width: wdt + '%', left: lft + "%", 'position': 'relative', 'transition': 'all .5s' });



                //Pregunta 1


                // If it's the last tab then hide the last button and show the finish instead
                if ($current >= $total) {
                    $('#demo-bv-wz').find('.next').hide();
                    $('#demo-bv-wz').find('.finish').show();
                    $('#demo-bv-wz').find('.finish').prop('disabled', false);
                } else {
                    $('#demo-bv-wz').find('.next').show();
                    $('#demo-bv-wz').find('.finish').hide().prop('disabled', true);
                }



            },
            onNext: function () {

                if ($("#respuestaPregunta1").is(":visible")) {
                    if ($("#respuestaPregunta1").val() == "") {
                        $.niftyNoty({
                            type: 'danger',
                            container: '#msjAsigPensionado',
                            html: '<strong>Error</strong><li>Debe ingresar respuesta para pregunta1 !!!</li>',
                            focus: false,
                            timer: 3000
                        });
                        $("#respuestaPregunta1").focus();
                        return false;
                    }
                    else {
                        return true;
                    }

                }

                if ($("#ddlrespuestaPregunta2").is(":visible")) {
                    if ($("#ddlrespuestaPregunta2").val() == 0) {
                        $.niftyNoty({
                            type: 'danger',
                            container: '#msjAsigPensionado',
                            html: '<strong>Error</strong><li>Debe seleccionar respuesta para pregunta 2!!!</li>',
                            focus: false,
                            timer: 3000
                        });
                        $("#ddlrespuestaPregunta2").focus();
                        return false;
                    }
                    else {
                        return true;
                    }

                }

                if ($("#ddlrespuestaPregunta3").is(":visible")) {
                    if ($("#ddlrespuestaPregunta3").val() == 0) {
                        $.niftyNoty({
                            type: 'danger',
                            container: '#msjAsigPensionado',
                            html: '<strong>Error</strong><li>Debe seleccionar respuesta para pregunta 3!!!</li>',
                            focus: false,
                            timer: 3000
                        });
                        $("#ddlrespuestaPregunta3").focus();
                        return false;
                    }
                    else {
                        return true;
                    }

                }

                if ($("#ddlrespuestaPregunta4").is(":visible")) {
                    if ($("#ddlrespuestaPregunta4").val() == "-1") {
                        $.niftyNoty({
                            type: 'danger',
                            container: '#msjAsigPensionado',
                            html: '<strong>Error</strong><li>Debe seleccionar respuesta para pregunta 4!!!</li>',
                            focus: false,
                            timer: 3000
                        });
                        $("#ddlrespuestaPregunta4").focus();
                        return false;
                    }
                    else {

                        return true;
                    }

                }


            }
        });
    });


    $('#modal_asigna_pensionado').on('show.bs.modal', async (event) => {

        metodos.CargaddlejecutivodAsignacion();
    });



    $('#tbencuestaPensionados').on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function (e, row) {

        result.length = 0;
        var i = 0;
        $("input[type=checkbox]:checked").each(function () {
            if ($(this).parent().parent().find('td').eq(1).text() != "") {
                result[i] = $(this).parent().parent().find('td').eq(1).text();
                ++i;
            }
        });
        $("#cantPensScheck").html(result['length'])

    });


    $('#demo-bv-wz').find('.finish').on("click", function () {

        var IngresoEncuesta = {
            IdLead: idLead,
            Estado: 21,
            Pregunta1: $("#respuestaPregunta1").val(),
            Pregunta2: $("#ddlrespuestaPregunta2").val(),
            Pregunta3: $("#ddlrespuestaPregunta3").val(),
            Pregunta4: $("#ddlrespuestaPregunta4").val(),
            RutEjecutivo: getCookie("Rut"),
            Observaciones: $("#txtObservaciones").val(),

        }

        $.SecPostJSON(BASE_URL + "/motor/api/pensionados/Guardar-Encuesta-Pensionados", IngresoEncuesta, function (datos) {
            debugger;
            if (datos.Estado == "OK") {
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Encuesta Guardada correctamente!!!.',
                    container: '#msjAsigPensionado',
                    timer: 2000,
                    onHidden: function () {
                        metodos.CargaGrilla();
                        $('#modal_encusta_pensionado').modal('hide');
                    }
                });


            }

        });


    });


    $("#modalAsignacion").on("click", function () {
        if (getCookie("Cargo") == "Agente Territorial") {

            if ($("#ddloATEencuesta").val() == "") {
                $.niftyNoty({
                    type: 'danger',
                    container: 'floating',
                    html: '<strong>Error</strong><li>Debe Seleccionar una oficina para Asginar!</li>',
                    focus: false,
                    timer: 5000
                });
                $("#ddloATEencuesta").focus();
                return false;
            }

        }


        if (result['length'] != 0) {
            $('#modal_asigna_pensionado').modal('show')
        }
        else {
            $.niftyNoty({
                type: 'danger',
                container: 'floating',
                html: '<strong>Error..</strong> Debe Seleccionar Pensionados antes de Asignar!',
                focus: false,
                timer: 5000
            });
        }
    });

    $("#btnFiltrar").on("click", function () {

        metodos.CargaGrilla();
    });


    $('#modal-contactabilidad').on('show.bs.modal', function (event) {




        $("#cbtippContac").val("");
        $("#cbClasificacionConctac").val("");
        $("#afi_NewContacto").val("");
        var link = $(event.relatedTarget);
        if (typeof $(link).data("rutpensionado") != 'undefined') {
            var rutPensionado = $(link).data("rutpensionado")
            var Id = $(link).data("id")
            $("#hdRutEjec").val($(link).data("rutpensionado"))

            //Contactabilidad

            var rutAf = rutPensionado.replace(/\./g, '');
            rutAf = rutAf.substring(0, rutAf.indexOf('-'));

            metodos.CargaGrillaContacto(rutAf, '#bdy_datos_contactos');
            debugger;
            metodos.CargaHistorialGestiones(Id);
        }
    })


    $('#form-registro-contacto').bootstrapValidator({
        excluded: [':disabled', ':not(:visible)'],
        feedbackIcons: [],
        fields: {
            cbtippContac: {
                validators: {
                    notEmpty: {
                        message: 'Debe seleccionar un tipo de Contacto'
                    }
                }
            },
            cbClasificacionConctac: {
                validators: {
                    notEmpty: {
                        message: 'Debe seleccionar una clasificación de contacto'
                    }
                }
            },
            afi_NewContacto: {
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
        debugger;
        var rutClie = $('#hdRutEjec').val()
        rutClie = rutClie.split('.').join('')
        rutClie = rutClie.substring(0, rutClie.length - 2)

        var objeto_envio_contacto = {
            RutAfiliado: rutClie,
            IdTipoContac: $('#cbtippContac').val(),
            GlosaTipoContac: $('select[name="cbtippContac"] option:selected').text(),
            IdClasifContac: $('#cbClasificacionConctac').val(),
            GlosaClasifContac: $('select[name="cbClasificacionConctac"] option:selected').text(),
            DatosContac: $('#afi_NewContacto').val()
        }
        $.SecGetJSON(BASE_URL + "/motor/api/Contactos/ingresa-nuevo-contacto", objeto_envio_contacto, function (datos) {
            $("#form-registro-contacto").bootstrapValidator('resetForm', true);
            $('#demo-lg-modal-new').modal('hide');
            metodos.CargaGrillaContacto(rutClie, '#bdy_datos_contactos');
            $("#btn-add-contac").trigger("click");
            $.niftyNoty({
                type: 'success',
                icon: 'pli-like-2 icon-2x',
                message: 'Contacto Guardado correctamente.',
                container: '#tab-gestion-3',
            });
        });

    });



    $("#cbtippContac").on("change", function (e) {
        e.preventDefault();

        $("#divDatoContacto").css("display", "block")

        if ($(this).val() == 1) {
            $("#lblDatoContacto").html("Ingrese Celular");
        }
        if ($(this).val() == 2) {
            $("#lblDatoContacto").html("Ingrese Teléfono");
        }
        if ($(this).val() == 3) {
            $("#lblDatoContacto").html("Ingrese Email");
        }
    });


});