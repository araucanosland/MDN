var cargador = {
    CargaDatosTablaTab2Busequda: function () {

        $("#bdy_datos").html("");
        $.SecGetJSON(BASE_URL + "/motor/api/Gestion/v3/lista-afiliados", {}, function (result) {
            console.log(result);
            $.each(result, function (i, e) {

                $("#bdy_datos").append(

                    $("<tr>")
                        .append($("<td>").append($('<a class="btn-link" data-target="#modal-cargas" data-toggle="modal" data-cargas="' + e.RutAfiliado + '">').prop({ "href": "#" }).html(e.RutAfiliado)))

                        .append($("<td>").html(e.NombresAfiliado))
                        .append($("<td>").html(e.ApellidosAfiliado))
                        .append($("<td>").html(e.cantidadCarga))
                        .append($("<td>").html(e.RutEmpresa))
                        .append($("<td>").html(e.NombreEmpresa))
                        .append($("<td>").html(e.Estadogestion))
                )

            });
        });
    },

    CargasFamiliares: function () {

        $.SecGetJSON(BASE_URL + "/motor/api/Gestion/v3/lista-cargas-familiares", { rutAfiliado: $("#hdRutEjec").val() }, function (result) {
            console.log(result);
            $.each(result, function (i, e) {




                $("input").prop('disabled', true);
                $("input").prop('disabled', false);
                $("#lblafiliado").text(e.NombresAfiliado);
                $("#lblrutAfiliado").text(e.RutAfiliado);
                $("#lblrutempresa").text(e.RutEmpresa);
                $("#lblempresa").text(e.NombreEmpresa);
                $("#bdy_datos_busqueda_cargas").append(
                    $("<tr>").append($("<td>").html(e.RutCarga))
                        //.append($("<td>").html(e.NombresAfiliado))
                        //.append($("<td>").html(e.RutEmpresa))
                        //.append($("<td>").html(e.NombreEmpresa))
                        //.append($("<td>").html(e.RutCarga))
                        .append($("<td>").html(e.NombreCarga))
                        .append($("<td>").html(e.ApellidoCarga))
                        .append($("<td>").html(e.FechaNacimientoCarga.toFecha("dd/mm/yyyy")))

                        .append($("<td>").html(e.CodigoCausante))
                        .append($("<td>").html(e.Estadogestion))

                        //.append('< some html >' +
                        //    item.quality > 0 ? 'a possibility' : 'another possibility' +
                        //    '</some html>');

                        .append(e.IdEstadoGestion == '6' ? $("<td>").append(
                            $("<select>").addClass('dropdown-caret').css('width', '150px').css('border-radius', '6px').append(
                                $('<option data-icon="fa fa-paint-brush">').val('Seleccione').text("Regularizado"))) : $("<td>").append(
                                    $("<select>").addClass('dropdown-caret').css('width', '150px').css('border-radius', '6px').append(
                                        $('<option data-icon="fa fa-paint-brush">').val('Seleccione').text("Seleccione..."),
                                        $('<option>').val(1).text("Sin Contacto"),
                                        $('<option>').val(2).text("Informado a RRHH Empresa"),
                                        $('<option>').val(3).text("Informado Afiliado directo"),
                                        $('<option>').val(4).text("Carga ya no continua estudios"),
                                        $('<option>').val(5).text("Carga ya acreditada")

                                    ).on('change', function () {

                                        var indice = $(this).val();
                                        var descripcion = $(this).text();
                                        var oficina = getCookie("Oficina");
                                        $.SecGetJSON(BASE_URL + "/motor/api/gestion/v3/actualiza-estados-carga-familiares", { rutAfiliado: $("#hdRutEjec").val(), codOficina: oficina, rutCarga: e.RutCarga, Indice: indice }, function (datos) {

                                            $.niftyNoty({
                                                type: 'success',
                                                icon: 'pli-like-2 icon-2x',
                                                message: 'Gestión Guardada correctamente.',
                                                container: '#tab-gestion-1',
                                                timer: 3000
                                            });
                                            //------------
                                            $("#bdy_datos_busqueda_cargas").html("");
                                            cargador.CargasFamiliares();

                                            //------




                                        });



                                    })
                                )))
               
                if (e.IdEstadoGestion == '7') {
                    $("#bdy_datos_busqueda_cargas").find("select").attr("disabled", "disabled");
                }

                else
                    $("select").prop('disabled', false);

            });
        });


    }

}


function cargaDatosDeContacto(rutAf, destino = null) {

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



                                    $.niftyNoty({
                                        type: 'success',
                                        icon: 'pli-like-2 icon-2x',
                                        message: 'Gestión Guardada correctamente.',
                                        container: '#tab-gestion-3',
                                        timer: 5000
                                    });
                                });

                                cargaDatosDeContacto(rutAf);

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






$(function () {
    $('#button').click(function () {


        cargador.CargaDatosTablaTab2Busequda();
        $('#demo-foo-filtering').footable().on('footable_filtering', function (e) {

            e.clear = !e.filter;
        });


        // Search input
        $('#flt_general').on('input', function (e) {
            e.preventDefault();
            if ($(this).val().length >= 3 || $(this).val().length == 0) {
                $('#demo-foo-filtering').footable().trigger('footable_filter', { filter: $(this).val() });
            }
        });



    });

    //Evento de Estado maestro Pre Aprobados
    $("#ges_estado").on("change", function () {

    });






    //Evento de Estado maestro Pre Aprobados
    $("#ges_estado").on("change", function () {

        if ($(this).val() != '') {
            $("#ges_subestado").attr("disabled", false);
            $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estados-gestion", { tipoCampagna: $(this).data("TipoAsignacion"), padre: $(this).val() }, function (datos) {
                $("#ges_subestado").html("");
                $("#ges_subestado").append($("<option>").attr("value", "").html("Seleccione"));
                $('#datos-gestion').bootstrapValidator('updateStatus', 'ges_subestado', 'NOT_VALIDATED').bootstrapValidator('validateField', 'ges_subestado');
                $.each(datos, function (i, e) {
                    $("#ges_subestado").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre))
                });
            });


            if ($(this).find("option:selected").data("terminal") == "CERRADOS" || $(this).find("option:selected").data("terminal") == "PENDIENTESNOCAL") {
                $("#fpg").hide();
            }
            else {
                $("#fpg").show();
            }

        }
        else {
            $("#ges_subestado").html("");
            $("#ges_subestado").attr("disabled", true);
        }
    });



    //Carga de selects

    //COMERCIAL
    var tipoCamp = 1;

    if (tipoCamp === 1 || tipoCamp === 5) {
        $('#datos-gestion').show();

        //Datepicker de Pre Aprobados
        $('#demo-dp-component .input-group.date').datepicker(
            { autoclose: true, format: 'dd-mm-yyyy', startDate: "0d", language: "es", daysOfWeekDisabled: [6, 0], todayHighlight: true }
        ).on('changeDate', function (e) {
            e.stopPropagation();
            $('#datos-gestion').bootstrapValidator('updateStatus', 'ges_prox_gestion', 'NOT_VALIDATED').bootstrapValidator('validateField', 'ges_prox_gestion');
        }).on('show.bs.modal hide.bs.modal', function (event) {
            // prevent datepicker from firing bootstrap modal "show.bs.modal"
            event.stopPropagation();
        });


        //Carga de selects
        $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estados-gestion", { tipoCampagna: 1, padre: 0 }, function (datos) {

            $("#ges_estado").data("TipoAsignacion", tipoCamp);
            $("#ges_estado").html("");
            $("#ges_estado").append($("<option>").attr("value", "").html("Seleccione"));

            $.each(datos, function (i, e) {
                $("#ges_estado").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre).data("terminal", e.ejes_terminal))
            });
        });


        // Validacion de formulario de Pre Aprobados
        // =================================================================
        $('#datos-gestion').bootstrapValidator({
            excluded: [':disabled', ':not(:visible)'],
            //feedbackIcons: faIcon,
            fields: {
                ges_estado: {
                    validators: {
                        notEmpty: {
                            message: 'Debe seleccionar un estado'
                        }
                    }
                },
                ges_subestado: {
                    validators: {
                        notEmpty: {
                            message: 'Debe seleccionar un sub estado'
                        }
                    }
                },
                ges_prox_gestion: {
                    validators: {
                        notEmpty: {
                            message: 'La fecha de próxima gestión no puede ser vacía'
                        },
                        date: {
                            format: 'DD-MM-YYYY',
                            message: 'Formato de fecha incorrecto'
                        }
                    }
                },
                ges_comentarios: {
                    validators: {
                        notEmpty: {
                            message: 'Debe agregar algún comentario'
                        },
                        stringLength: {
                            message: 'No pueden ser mas de 150 caracteres',
                            max: function (value, validator, $field) {
                                return 150 - (value.match(/\r/g) || []).length;
                            }
                        }
                    }
                },



            }
        }).on('success.form.bv', function (e) {
            // Prevén que se mande el formulario
            e.preventDefault();
            var $form = $(e.target);

            $.SecPostJSON(BASE_URL + "/motor/api/Gestion/guardar-gestion", $form.serialize(), function (respuesta) {

                if (respuesta.Estado === 'OK') {

                    $.niftyNoty({
                        type: 'success',
                        container: '#mensahes-must',
                        html: '<strong>OK</strong> Gestion guardada exitosamente.',
                        focus: false,
                        timer: 3000
                    });


                    render.HistorialGestion(respuesta.Objeto);

                    if (respuesta.Objeto != null && respuesta.Objeto.length > 0 && respuesta.Objeto[0].EstadoGestion.ejes_terminal === "CERRADOS") {
                        $(".esconder").hide();
                    }

                    $("#datos-gestion").bootstrapValidator('resetForm', true);


                } else {
                    $.niftyNoty({
                        type: 'danger',
                        container: '#mensahes-must',
                        html: '<strong>Error</strong> ' + respuesta.Mensaje,
                        focus: false,
                        timer: 3000
                    });
                }

            });

        });

    }

    //CONTACTABILIDAD AFILIADOS
    $("#afi_telefonos").on("change", function (e) {

        $(".desaparecible, .forma-uno").show();
        if ($("#afi_telefonos :selected").data("malo") !== "undefined" && $("#afi_telefonos :selected").data("malo") === "true") {
            $(".desaparecible, .forma-uno").hide();
        }
    })
    $("#telefonos_Malo").on("click", function (e) {


        var WebDatoContacto = {
            afiliado_Rut: $("#afi_rut").val().replace('.', '').replace('.', ''),
            tipo: "telefonos",
            valor_contacto: $("#afi_telefonos :selected").html().replace("+", ""),
            valido: 0
        }
        WebDatoContacto.afiliado_Rut = WebDatoContacto.afiliado_Rut.substring(0, WebDatoContacto.afiliado_Rut.length - 2);

        $.SecPostJSON(BASE_URL + "/motor/api/Gestion/guardar-nuevo-contacto", WebDatoContacto, function (respuesta) {

            if (respuesta.Estado === "OK") {

                /*$.each(Variables.Afiliado_Current.data("afiliado").Telefonos, function (i, el) {
                    if (el.Valor_contacto == respuesta.Objeto.Valor_contacto) {
                        Variables.Afiliado_Current.data("afiliado").Telefonos.splice(i, 1);
                        return false;
                    }
                });
                Variables.Afiliado_Current.data("afiliado").Telefonos.push(respuesta.Objeto);*/

                $("#afi_telefonos :selected").html($("#afi_telefonos :selected").html() + ' (malo)').data("malo", "true");
                $(".desaparecible, .forma-uno").hide();
            }

        });
    });
    $("#telefonos_Nuevo").on("click", function (e) {

        var that = $(this);
        $("#afi_telefonos, .desaparecible, .forma-dos").hide();

        $(".multicontrol").append(
            $("<form>").attr({ "id": "miForm", "name": "miForm", "method": "post" }).append($("<input>").attr({ "type": "hidden", "id": "afiliado_Rut", "name": "afiliado_Rut", "value": $("#afi_rut").val() })).append($("<input>").attr({ "type": "hidden", "id": "tipo", "name": "tipo", "value": "telefonos" })).append(
                $("<input>").attr({ "type": "text", "id": "tmp_telefono", "name": "tmp_telefono", "maxlength": "12" }).val("+56").addClass("form-control").on({
                    "keypress blur": function (e) {
                        if (e.type === "blur" || (e.type === "keypress" && e.which === 13)) {
                            e.preventDefault();

                            if (typeof $("#miForm").data("bootstrapValidator") === "undefined") {
                                $("#miForm").bootstrapValidator({
                                    fields: {
                                        tmp_telefono: {
                                            validators: {
                                                notEmpty: {
                                                    message: 'no puede guardar numero vacio',
                                                },
                                                stringLength: {
                                                    min: 12,
                                                    max: 12,
                                                    message: 'formato de numero incorrecto'
                                                },
                                            }
                                        },
                                    }
                                }).on('success.form.bv', function (e) {
                                    e.preventDefault();
                                    var $form = $(e.target);
                                    var funcion = {
                                        existeValorEnSelect: function (arrayOptions, valorBuscado) {
                                            $.each(arrayOptions, function (i, e) {

                                                if ($(e).val() === valorBuscado) {
                                                    return true;
                                                }
                                            });
                                            return false;
                                        }
                                    }
                                    if (!funcion.existeValorEnSelect($("#afi_telefonos option"), $form.find("#tmp_telefono").val())) {

                                        var WebDatoContacto = {
                                            afiliado_Rut: $form.find("#afiliado_Rut").val().replace('.', '').replace('.', ''),
                                            tipo: $form.find("#tipo").val(),
                                            valor_contacto: $form.find("#tmp_telefono").val().replace("+", ""),
                                            valido: 1
                                        }
                                        WebDatoContacto.afiliado_Rut = WebDatoContacto.afiliado_Rut.substring(0, WebDatoContacto.afiliado_Rut.length - 2);

                                        $.SecPostJSON(BASE_URL + "/motor/api/Gestion/guardar-nuevo-contacto", WebDatoContacto, function (respuesta) {
                                            if (respuesta.Estado === "OK") {

                                                $("#afi_telefonos").prepend($("<option>").html($form.find("#tmp_telefono").val()));
                                                $("#afi_telefonos option:eq(0)").prop('selected', true)
                                                $("#afi_telefonos, .desaparecible, .forma-dos, .forma-uno").show();
                                                $("#miForm").remove();
                                            }
                                        });
                                    }
                                });
                            }
                            $("#miForm").submit();
                        }
                    },
                })
            ));
    });
    $("#afi_celulares").on("change", function (e) {

        $(".desaparecible-cel, .forma-uno-cel").show();
        if ($("#afi_celulares :selected").data("malo") !== "undefined" && $("#afi_celulares :selected").data("malo") === "true") {
            $(".desaparecible-cel, .forma-uno-cel").hide();
        }
    })
    $("#celulares_Malo").on("click", function (e) {
        var WebDatoContacto = {
            afiliado_Rut: $("#afi_rut").val().replace('.', '').replace('.', ''),
            tipo: "celulares",
            valor_contacto: $("#afi_celulares :selected").html().replace("+", ""),
            valido: 0
        }
        WebDatoContacto.afiliado_Rut = WebDatoContacto.afiliado_Rut.substring(0, WebDatoContacto.afiliado_Rut.length - 2);

        $.SecPostJSON(BASE_URL + "/motor/api/Gestion/guardar-nuevo-contacto", WebDatoContacto, function (respuesta) {

            if (respuesta.Estado === "OK") {

                /*$.each(Variables.Afiliado_Current.data("afiliado").Celulares, function (i, el) {
                    if (el.Valor_contacto == respuesta.Objeto.Valor_contacto) {
                        Variables.Afiliado_Current.data("afiliado").Celulares.splice(i, 1);
                        return false;
                    }
                });
                Variables.Afiliado_Current.data("afiliado").Celulares.push(respuesta.Objeto);
                */

                $("#afi_celulares :selected").html($("#afi_celulares :selected").html() + ' (malo)').data("malo", "true");
                $(".desaparecible-cel, .forma-uno-cel").hide();
            }

        });


    });
    $("#celulares_Nuevo").on("click", function (e) {

        var that = $(this);
        $("#afi_celulares, .desaparecible-cel, .forma-dos-cel").hide();



        $(".multicontrol-cel").append(
            $("<form>").attr({ "id": "miFormCel", "name": "miFormCel", "method": "post" }).append($("<input>").attr({ "type": "hidden", "id": "afiliado_Rut", "name": "afiliado_Rut", "value": $("#afi_rut").val() })).append($("<input>").attr({ "type": "hidden", "id": "tipo", "name": "tipo", "value": "celulares" })).append(
                $("<input>").attr({ "type": "text", "id": "tmp_celular", "name": "tmp_celular", "maxlength": "12" }).val("+56").addClass("form-control").on({
                    "keypress blur": function (e) {


                        if (e.type === "blur" || (e.type === "keypress" && e.which === 13)) {
                            e.preventDefault();

                            if (typeof $("#miFormCel").data("bootstrapValidator") === "undefined") {
                                $("#miFormCel").bootstrapValidator({
                                    fields: {
                                        tmp_celular: {
                                            validators: {
                                                notEmpty: {
                                                    message: 'no puede guardar numero vacio',
                                                },
                                                stringLength: {
                                                    min: 12,
                                                    max: 12,
                                                    message: 'formato de numero incorrecto'
                                                },
                                            }
                                        },
                                    }
                                }).on('success.form.bv', function (e) {
                                    e.preventDefault();
                                    var $form = $(e.target);
                                    var funcion = {
                                        existeValorEnSelect: function (arrayOptions, valorBuscado) {
                                            $.each(arrayOptions, function (i, e) {

                                                if ($(e).val() === valorBuscado) {
                                                    return true;
                                                }
                                            });
                                            return false;
                                        }
                                    }
                                    if (!funcion.existeValorEnSelect($("#afi_celulares option"), $form.find("#tmp_celular").val())) {

                                        var WebDatoContacto = {
                                            afiliado_Rut: $form.find("#afiliado_Rut").val().replace('.', '').replace('.', ''),
                                            tipo: $form.find("#tipo").val(),
                                            valor_contacto: $form.find("#tmp_celular").val().replace("+", ""),
                                            valido: 1
                                        }
                                        WebDatoContacto.afiliado_Rut = WebDatoContacto.afiliado_Rut.substring(0, WebDatoContacto.afiliado_Rut.length - 2);

                                        $.SecPostJSON(BASE_URL + "/motor/api/Gestion/guardar-nuevo-contacto", WebDatoContacto, function (respuesta) {
                                            if (respuesta.Estado === "OK") {
                                                //Variables.Afiliado_Current.data("afiliado").Celulares.push(respuesta.Objeto)
                                                $("#afi_celulares").prepend($("<option>").html($form.find("#tmp_celular").val()));
                                                $("#afi_celulares option:eq(0)").prop('selected', true)
                                                $("#afi_celulares, .desaparecible-cel, .forma-dos-cel, .forma-uno-cel").show();
                                                $("#miFormCel").remove();
                                            }

                                        });

                                    }
                                });
                            }


                            $("#miFormCel").submit();
                        }

                    },

                })

            ));

    });
    $("#afi_correos").on("change", function (e) {

        $(".desaparecible-mail, .forma-uno-mail").show();
        if ($("#afi_correos :selected").data("malo") !== "undefined" && $("#afi_correos :selected").data("malo") === "true") {
            $(".desaparecible-mail, .forma-uno-mail").hide();
        }
    })
    $("#correos_Malo").on("click", function (e) {


        var WebDatoContacto = {
            afiliado_Rut: $("#afi_rut").val().replace('.', '').replace('.', ''),
            tipo: "correos",
            valor_contacto: $("#afi_correos :selected").html(),
            valido: 0
        }
        WebDatoContacto.afiliado_Rut = WebDatoContacto.afiliado_Rut.substring(0, WebDatoContacto.afiliado_Rut.length - 2);

        $.SecPostJSON(BASE_URL + "/motor/api/Gestion/guardar-nuevo-contacto", WebDatoContacto, function (respuesta) {

            if (respuesta.Estado === "OK") {

                /*$.each(Variables.Afiliado_Current.data("afiliado").Correos, function (i, el) {
                    if (el.Valor_contacto == respuesta.Objeto.Valor_contacto) {
                        Variables.Afiliado_Current.data("afiliado").Correos.splice(i, 1);
                        return false;
                    }
                });
                Variables.Afiliado_Current.data("afiliado").Correos.push(respuesta.Objeto);
                console.log(Variables.Afiliado_Current.data("afiliado"))*/

                $("#afi_correos :selected").html($("#afi_correos :selected").html() + ' (malo)').data("malo", "true");
                $(".desaparecible-mail, .forma-uno-mail").hide();
            }

        });


    });
    $("#correos_Nuevo").on("click", function (e) {

        var that = $(this);
        $("#afi_correos, .desaparecible-mail, .forma-dos-mail").hide();



        $(".multicontrol-mail").append(
            $("<form>").attr({ "id": "miFormMail", "name": "miFormMail", "method": "post" }).append($("<input>").attr({ "type": "hidden", "id": "afiliado_Rut", "name": "afiliado_Rut", "value": $("#afi_rut").val() })).append($("<input>").attr({ "type": "hidden", "id": "tipo", "name": "tipo", "value": "correos" })).append(
                $("<input>").attr({ "type": "text", "id": "tmp_correo", "name": "tmp_correo" }).addClass("form-control").on({
                    "keypress blur": function (e) {


                        if (e.type === "blur" || (e.type === "keypress" && e.which === 13)) {
                            e.preventDefault();

                            if (typeof $("#miFormMail").data("bootstrapValidator") === "undefined") {
                                $("#miFormMail").bootstrapValidator({
                                    fields: {
                                        tmp_correo: {
                                            validators: {
                                                notEmpty: {
                                                    message: 'No puede guardar correo vacio',
                                                },
                                                stringLength: {
                                                    max: 512,
                                                    message: 'No puede Exceder los 512 caracteres'
                                                },
                                                emailAddress: {
                                                    message: 'No es un formato de correo válido'
                                                },
                                            }
                                        },
                                    }
                                }).on('success.form.bv', function (e) {
                                    e.preventDefault();
                                    var $form = $(e.target);
                                    var funcion = {
                                        existeValorEnSelect: function (arrayOptions, valorBuscado) {
                                            $.each(arrayOptions, function (i, e) {

                                                if ($(e).val() === valorBuscado) {
                                                    return true;
                                                }
                                            });
                                            return false;
                                        }
                                    }
                                    if (!funcion.existeValorEnSelect($("#afi_correos option"), $form.find("#tmp_correo").val())) {

                                        var WebDatoContacto = {
                                            afiliado_Rut: $form.find("#afiliado_Rut").val().replace('.', '').replace('.', ''),
                                            tipo: $form.find("#tipo").val(),
                                            valor_contacto: $form.find("#tmp_correo").val(),
                                            valido: 1
                                        }
                                        WebDatoContacto.afiliado_Rut = WebDatoContacto.afiliado_Rut.substring(0, WebDatoContacto.afiliado_Rut.length - 2);

                                        $.SecPostJSON(BASE_URL + "/motor/api/Gestion/guardar-nuevo-contacto", WebDatoContacto, function (respuesta) {
                                            if (respuesta.Estado === "OK") {
                                                //console.log(Variables.Afiliado_Current.data("afiliado"))
                                                //Variables.Afiliado_Current.data("afiliado").Correos.push(respuesta.Objeto)
                                                $("#afi_correos").prepend($("<option>").html($form.find("#tmp_correo").val()));
                                                $("#afi_correos option:eq(0)").prop('selected', true)
                                                $("#afi_correos, .desaparecible-mail, .forma-dos-mail, .forma-uno-mail").show();
                                                $("#miFormMail").remove();
                                            }
                                        });
                                    }
                                });
                            }
                            $("#miFormMail").submit();
                        }
                    },
                })
            ));
    });

    $('#modal-cargas').on('show.bs.modal', function (event) {

        var link = $(event.relatedTarget);
        if (typeof $(link).data("cargas") != 'undefined') {
            $("#hdRutEjec").val($(link).data("cargas"))
            $("#bdy_datos_busqueda_cargas").html("");
            cargador.CargasFamiliares();
            /*

            $.SecGetJSON(BASE_URL + "/motor/api/Gestion/v3/lista-cargas-familiares", { rutAfiliado: $("#hdRutEjec").val() }, function (result) {
                console.log(result);
                $.each(result, function (i, e) {
                  
                    $("#lblafiliado").text(e.NombresAfiliado);
                    $("#lblrutAfiliado").text(e.RutAfiliado);
                    $("#lblrutempresa").text(e.RutEmpresa);
                    $("#lblempresa").text(e.NombreEmpresa);
                    $("#bdy_datos_busqueda_cargas").append(
                        $("<tr>").append($("<td>").html(e.RutCarga))
                            //.append($("<td>").html(e.NombresAfiliado))
                            //.append($("<td>").html(e.RutEmpresa))
                            //.append($("<td>").html(e.NombreEmpresa))
                            //.append($("<td>").html(e.RutCarga))
                            .append($("<td>").html(e.NombreCarga))
                            .append($("<td>").html(e.ApellidoCarga))
                            .append($("<td>").html(e.FechaNacimientoCarga.toFecha("dd/mm/yyyy")))
                          
                            .append($("<td>").html(e.CodigoCausante))
                            .append($("<td>").html(e.Estadogestion))
                            .append($("<td>").append(
                                $("<select>").addClass('dropdown-caret').css('width', '150px').css('border-radius', '6px').append(
                                    $('<option data-icon="fa fa-paint-brush">').val('Seleccione').text("Seleccione..."),
                                    $('<option>').val(1).text("Sin Contacto"),
                                    $('<option>').val(2).text("Informado a RRHH Empresa"),
                                    $('<option>').val(3).text("Informado Afiliado directo"),
                                    $('<option>').val(4).text("Carga ya no continua estudios"),
                                    $('<option>').val(5).text("Carga ya acreditada")
                                   
                                ).on('change', function () {
                           
                                    var indice = $(this).val();
                                   var descripcion = $(this).text();
                                       var oficina = getCookie("Oficina");
                                    $.SecGetJSON(BASE_URL + "/motor/api/gestion/v3/actualiza-estados-carga-familiares", { rutAfiliado: $("#hdRutEjec").val(), codOficina: oficina, rutCarga: e.RutCarga, Indice: indice }, function (datos) {
                                                                            
                                        $.niftyNoty({
                                            type: 'success',
                                            icon: 'pli-like-2 icon-2x',
                                            message: 'Gestión Guardada correctamente.',
                                            container: '#tab-gestion-1',
                                            timer: 5000
                                        });
                                        //------------

                                     
                                        //------




                                    });
                                    
                                  

                                })
                            )))
                   
                });
            });


*/



            //Contactabilidad

            var rutAf = $('#hdRutEjec').val().replace(/\./g, '');
            rutAf = rutAf.substring(0, rutAf.indexOf('-'));
           

            cargaDatosDeContacto(rutAf, '#bdy_datos_contactos');
        }
    })


    $('#btn-add-contac').on('click', function () {

        // console.log('Visibiliadad', $('#formulario-contac').is(':visible'));
        if ($('#formulario-contac').is(':visible')) {
            $('#formulario-contac').hide('slow');
        }
        else {
            $('#formulario-contac').show('slow');
        }

    });
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
            cargaDatosDeContacto(rutClie, '#bdy_datos_contactos');
            $("#btn-add-contac").trigger("click");
            $.niftyNoty({
                type: 'success',
                icon: 'pli-like-2 icon-2x',
                message: 'Contacto Guardado correctamente.',
                container: '#tab-gestion-3',
            });
        });

    });

});