var bandera_bloqueo_elementos = false;


if (getCookie('Cargo') == 'Ejecutivos Incorporación y Prospección Pensionados' || getCookie('Cargo') == 'Ejecutivo Pensionado') {
    $('#tab_derivaciones').css('display', 'none')
    $('#tab_segcesantia').css('display', 'none')
    $('#tab_recuperaciones').css('display', 'none')
    $('#tab_preaprobados').css('display', 'none')
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

$(function () {

    var faIcon = {
        valid: 'fa fa-check-circle fa-lg text-success',
        invalid: 'fa fa-times-circle fa-lg',
        validating: 'fa fa-refresh'
    }

    var entorno = {
        Periodo: function () {
            var hoy = new Date();
            return hoy.getFullYear().toString() + (hoy.getMonth() + 1).toString().paddingLeft("00");
        }
    }

    var render = {
        PreaProbadosTableBody: (data, elm) => {
            $.each(data, function (i, e) {

                e.Seguimiento.Empresa = e.Seguimiento.Empresa.addSlashes();
                e.Seguimiento.Nombre = e.Seguimiento.Nombre.addSlashes();
                e.Seguimiento.Apellido = e.Seguimiento.Apellido.addSlashes();
                e.Seguimiento.Holding = e.Seguimiento.Holding.addSlashes();

                //data-target="#mdl_data" data-toggle="modal" data-periodo="' + row.Seguimiento.Periodo + '" data-rut="' + value + '-' + row.Seguimiento.Afiliado_Dv + '" data-tipo="' + row.Seguimiento.TipoAsignacion + '"
                ///motor/App/Gestion/Oferta/' + e.Seguimiento.Periodo + '/' + e.Seguimiento.Afiliado_Rut + '-' + e.Seguimiento.Afiliado_Dv + '/' + e.Seguimiento.TipoAsignacion + '
                elm.append(
                    $("<tr>")
                        .append($("<td>").append('<a href="#" data-target="#mdl_data" data-toggle="modal" data-periodo="' + e.Seguimiento.Periodo + '" data-rut="' + e.Seguimiento.Afiliado_Rut + '-' + e.Seguimiento.Afiliado_Dv + '" data-tipo="' + e.Seguimiento.TipoAsignacion + '" class="btn-link" >' + e.Seguimiento.Afiliado_Rut.toMoney(0) + '-' + e.Seguimiento.Afiliado_Dv + '</a>'))
                        .append($("<td>").append(e.Seguimiento.Nombre + ' ' + e.Seguimiento.Apellido))
                        .append($("<td>").append(e.Seguimiento.Empresa))
                        .append($("<td>").append(e.Seguimiento.Segmento))
                        .append($("<td>").append((e.UltimaGestion.GestionBase.IdBaseCampagna > 0 && e.UltimaGestion.GestionBase.FechaCompromete.toFecha() != '01-01-1753') ? e.UltimaGestion.GestionBase.FechaCompromete.toFecha() : 'N/A'))
                        .append($("<td>").append('$' + e.Seguimiento.PreAprobadoFinal.toMoney(0)))
                        .append($("<td>").append(e.Seguimiento.Prioridad.toString().toEtiquetaPrioridad() + (e.Notificaciones.length > 0 ? '    <span class="badge badge-info">!</span>' : '')))
                        .append($("<td>").append(e.Seguimiento.TipoCampania))
                        .append($("<td>").append((e.UltimaGestion.GestionBase.IdBaseCampagna > 0) ? e.UltimaGestion.EstadoGestion.eges_nombre : 'Sin Gestión'))
                        .append($("<td>").append((e.UltimaGestion.GestionBase.IdBaseCampagna > 0) ? e.UltimaGestion.SubEstadoGestion.eges_nombre : 'Sin Gestión'))
                );
            });
        },
        RecuperacionesTableBody: (data) => {
            $.each(data, function (i, e) {

                e.Seguimiento.Empresa = e.Seguimiento.Empresa.addSlashes();
                e.Seguimiento.Nombre = e.Seguimiento.Nombre.addSlashes();
                e.Seguimiento.Apellido = e.Seguimiento.Apellido.addSlashes();
                e.Seguimiento.Holding = e.Seguimiento.Holding.addSlashes();

                $("#bdy_datos_recu")
                    .append(
                        $("<tr>")
                            .append($("<td>").append('<a href="#" data-target="#mdl_data" data-toggle="modal" data-periodo="' + e.Seguimiento.Periodo + '" data-rut="' + e.Seguimiento.Afiliado_Rut + '-' + e.Seguimiento.Afiliado_Dv + '" data-tipo="' + e.Seguimiento.TipoAsignacion + '" class="btn-link" >' + e.Seguimiento.Afiliado_Rut.toMoney(0) + '-' + e.Seguimiento.Afiliado_Dv + '</a>'))
                            .append($("<td>").append(e.Seguimiento.Nombre + ' ' + e.Seguimiento.Apellido))
                            .append($("<td>").append(e.Seguimiento.Empresa))
                            .append($("<td>").append(e.Seguimiento.Segmento))
                            .append($("<td>").append((e.UltimaGestion.GestionBase.IdBaseCampagna > 0 && e.UltimaGestion.GestionBase.FechaCompromete.toFecha() != '01-01-1753') ? e.UltimaGestion.GestionBase.FechaCompromete.toFecha() : 'N/A'))
                            .append($("<td>").append('$' + e.Seguimiento.PreAprobadoFinal.toMoney(0)))
                            .append($("<td>").append(e.Seguimiento.Prioridad.toString().toEtiquetaPloma() + (e.Notificaciones.length > 0 ? '    <span class="badge badge-info">!</span>' : '')))
                            .append($("<td>").append((e.UltimaGestion.GestionBase.IdBaseCampagna > 0) ? e.UltimaGestion.CausaBasalGestion.eges_nombre : 'Sin Causa'))
                            .append($("<td>").append((e.UltimaGestion.GestionBase.IdBaseCampagna > 0) ? e.UltimaGestion.ConsecuenciaGestion.eges_nombre : 'Sin Consecuencia'))
                            .append($("<td>").append((e.UltimaGestion.GestionBase.IdBaseCampagna > 0) ? e.UltimaGestion.EstadoGestion.eges_nombre : 'Sin Gestión'))
                    );

            });
        },
        SegCesantiaTableBody: (data, elm) => {
            $.each(data, function (i, e) {

                e.Seguimiento.Empresa = e.Seguimiento.Empresa.addSlashes();
                e.Seguimiento.Nombre = e.Seguimiento.Nombre.addSlashes();
                e.Seguimiento.Apellido = e.Seguimiento.Apellido.addSlashes();
                e.Seguimiento.Holding = e.Seguimiento.Holding.addSlashes();


                elm.append(
                    $("<tr>")
                        .append($("<td>").append('<a href="#" data-target="#mdl_data" data-toggle="modal" data-periodo="' + e.Seguimiento.Periodo + '" data-rut="' + e.Seguimiento.Afiliado_Rut + '-' + e.Seguimiento.Afiliado_Dv + '" data-tipo="' + e.Seguimiento.TipoAsignacion + '" class="btn-link" >' + e.Seguimiento.Afiliado_Rut.toMoney(0) + '-' + e.Seguimiento.Afiliado_Dv + '</a>'))
                        .append($("<td>").append(e.Seguimiento.Nombre + ' ' + e.Seguimiento.Apellido))
                        .append($("<td>").append(e.Seguimiento.PensionadoFFAA))
                        .append($("<td>").append(e.Seguimiento.Prioridad))
                        .append($("<td>").append((e.UltimaGestion.GestionBase.IdBaseCampagna > 0 && e.UltimaGestion.GestionBase.FechaCompromete.toFecha() != '01-01-1753') ? e.UltimaGestion.GestionBase.FechaCompromete.toFecha() : 'N/A'))
                        .append($("<td>").append((e.UltimaGestion.GestionBase.IdBaseCampagna > 0) ? e.UltimaGestion.EstadoGestion.eges_nombre : 'Sin Gestión'))
                        .append($("<td>").append((e.UltimaGestion.GestionBase.IdBaseCampagna > 0) ? e.UltimaGestion.SubEstadoGestion.eges_nombre : 'Sin Gestión'))
                );
            });
        },
        HistorialGestion: function (gesList) {
            //Gestiones Realizadas
            $("#gestiones_realizadas").html("");
            $.each(gesList, function (i, e) {
                $("#gestiones_realizadas").append($("<a>").attr("href", '#')
                    .append($("<h4>").addClass("list-group-item-heading").html("<strong>Gestor:</strong> " + e.Gestor.EjecutivoData.Nombres))
                    .append($("<p>").addClass("list-group-item-text").html("<strong>Fecha Gestión:</strong>" + e.GestionBase.FechaAccion.toFechaHora() + ", <strong>Fecha Prox. Gestión:</strong> " + e.GestionBase.FechaCompromete.toFecha()))
                    .append($("<p>").addClass("list-group-item-text").html("<strong>Estado:</strong> " + e.EstadoGestion.eges_nombre + ",  <strong>Sub Estado:</strong> " + e.SubEstadoGestion.eges_nombre))
                    .append($("<p>").addClass("list-group-item-text").html("<strong>Comentario:</strong> " + e.GestionBase.Descripcion))
                );
            });

            if (gesList.length > 0 && gesList[0].EstadoGestion.ejes_terminal === "CERRADOS") {
                $(".esconder").hide();
            } else {
                $(".esconder").show();
            }

            $("#morfeable_monto").text("Monto Pre Aprobado");

        },
        HistorialGestionRecuperaciones: function (gesList) {
            $("#gestiones_realizadas").html("");
            $.each(gesList, function (i, e) {
                var consecuencia = (e.ConsecuenciaGestion !== null) ? ", <strong>Consecuencia:</strong> " + e.ConsecuenciaGestion.eges_nombre : "";
                var estatus = (e.EstadoGestion !== null) ? ", <strong>Estado:</strong> " + e.EstadoGestion.eges_nombre : "";
                $("#gestiones_realizadas").append($("<a>").attr("href", '#')
                    .append($("<h4>").addClass("list-group-item-heading").html("<strong>Gestor:</strong> " + e.Gestor.EjecutivoData.Nombres))
                    .append($("<p>").addClass("list-group-item-text").html("<strong>Fecha Gestión:</strong>" + e.GestionBase.FechaAccion.toFechaHora() + ", <strong>Fecha Prox. Gestión:</strong> " + e.GestionBase.FechaCompromete.toFecha()))
                    .append($("<p>").addClass("list-group-item-text").html("<strong>Causa basal:</strong> " + e.CausaBasalGestion.eges_nombre + consecuencia + estatus))
                    .append($("<p>").addClass("list-group-item-text").html("<strong>Comentario:</strong> " + e.GestionBase.Descripcion))
                );
            });

            if (gesList.length > 0 && gesList[0].EstadoGestion.ejes_terminal === "CERRADOS") {
                $(".esconder").hide();
            } else {
                $(".esconder").show();
            }
        },
        //CargaEstadosGestion: function () {
        //    $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estado-gestion", function (datos) {
        //        $("#dllEstadoGestionPadre").html("");
        //        $("#dllEstadoGestionPadre").append($("<option>").attr("value", "0").html("Todos"));
        //        $.each(datos, function (i, e) {
        //            $("#dllEstadoGestionPadre").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre))
        //        });
        //    });
        //},
        /* CargaEjecutivoPensionados: function () {
             $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-ejecutivo-pensionados", { Token: getCookie('Token') }, function (datos) {
                 $("#dllEjePensiondos").html("");
                 $("#dllEjecutivo").html("");
                 $("#dllEjePensiondos").append($("<option>").attr("value", "0").html("Seleccione..."));
                 $("#dllEjecutivo").append($("<option>").attr("value", "").html("Todos"));
                 $.each(datos, function (i, e) {
                     $("#dllEjePensiondos").append($("<option>").attr("value", e.Rut).html(e.Nombre))
                     $("#dllEjecutivo").append($("<option>").attr("value", e.Rut).html(e.Nombre))
                 });
             });
         },
         CargaHistorialGestPensionados: function (id) {
             $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-historial-gestion-pensionados", { ges_bcam_uid: id }, function (datos) {
                 $("#gestiones_realizadas_pensionados").html("");
                 $.each(datos, function (i, e) {
                     $("#gestiones_realizadas_pensionados").append($("<a>").attr("href", '#')
                         .append($("<h4>").addClass("list-group-item-heading").html("<strong>Gestor:</strong> " + e.Ejecutivo.OrdenaNombreCompleto()))
                         .append($("<p>").addClass("list-group-item-text").html("<strong>Fecha Gestión:</strong>" + e.ges_fecha_accion.toFechaHora() + ", <strong>Fecha Prox. Gestión:</strong> " + e.ges_fecha_compromete.toFechaHora()))
                         .append($("<p>").addClass("list-group-item-text").html("<strong>Estado:</strong> " + e.estado + ",  <strong>Sub Estado:</strong> " + e.subEstado))
                         .append($("<p>").addClass("list-group-item-text").html("<strong>Comentario:</strong> " + e.ges_descripcion_gst))
                     );
                 });
             });
         },*/
        //ModalUltimaGestion: function (id) {
        //    $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-ultima-gestion-contacto", { Id: id, Cod_oficina: getCookie("Oficina") }, function (respuesta) {
        //        //console.log({
        //        //    respuesta
        //        //})

        //        if (respuesta['eges_nombre'] != null) {

        //            if (respuesta['ges_estado_gst'] == 1) {
        //                $('#msjBloqueo').css('display', 'none');
        //                $('#lbTitulo').html(respuesta['eges_nombre'])
        //                // $('#Interes_Si').css('display', 'block');
        //                // $('#txt_interes_comentarios_pen').val(respuesta['ges_descripcion_gst']);
        //                //  $('#txtFechacita').val(respuesta['ges_fecha_compromete'].toFecha())
        //                // $("#contacto-rdInteres-" + respuesta['ges_estado_gst']).prop('checked', true);
        //                // $("#contacto-rdInteresSi-" + respuesta['ges_sub_estado_gst']).prop('checked', true);
        //                $("#txt_interes_comentarios_pen").removeAttr("disabled");
        //                $('#txt_interes_comentarios_pen').val("");
        //                $("input[name=inline-form-radioInteres]").prop('checked', false);
        //                $("input[name=inline-form-radioInteres]").removeAttr("disabled");
        //                $('#btn_interes_guardar').attr('disabled', true);
        //            }
        //            else if (respuesta['ges_estado_gst'] == 3) {
        //                $("#contacto-rdInteres-" + respuesta['ges_estado_gst']).prop('checked', true);
        //                $("#contacto-rdInteres-" + respuesta['ges_estado_gst']).trigger("click");
        //                $('#divInteresNoInteresado').css('display', 'none');
        //                $('#Interes_Terminada').css('display', 'none');
        //                $('#Interes_Si').css('display', 'none');
        //                $('#divInteresNO').css('display', 'block');
        //                $('#Interes_NO').css('display', 'block');
        //                //$("#contacto-rdInteres-" + respuesta['ges_estado_gst']).prop('checked', true);

        //                $('#msjBlockPen').html(' Se encuentra en estado de ' + respuesta['eges_nombre'] + ', gestionado en la fecha: ' + respuesta['ges_fecha_accion'].toFecha())
        //                $('#lbTitulo').html(respuesta['eges_nombre'])
        //                $('#msjBloqueo').css('display', 'block');
        //                $('#txt_interes_comentarios_pen').val(respuesta['ges_descripcion_gst']);

        //                $("#txt_interes_comentarios_pen").attr("disabled", "disabled");
        //                $("#contacto-rdInteresNo-" + respuesta['ges_sub_estado_gst']).prop('checked', true);
        //                $("input[name=inline-form-radioInteres]").attr("disabled", "disabled");
        //                $("#contacto-rdInteres-" + respuesta['ges_estado_gst']).prop('checked', true);
        //                //$("input[name=gRbInteresNO]").attr("disabled", "disabled");

        //                $('#btn_interes_guardar').attr('disabled', true);

        //                if (respuesta['ges_sub_estado_gst'] != 301 && respuesta['ges_sub_estado_gst'] != 302) {
        //                    $("#contacto-rdInteres-" + respuesta['ges_estado_gst']).prop('checked', true);
        //                    $("#interes-rdInteresNoInteresado-" + respuesta['ges_sub_estado_gst']).prop('checked', true);
        //                    $('#divInteresNO').css('display', 'none');
        //                    $('#divInteresNoInteresado').css('display', 'block');


        //                    var tags = respuesta['tags'];
        //                    var arrayTags = []
        //                    if (respuesta['ges_sub_estado_gst'] == 303) {
        //                        $("#interes-rdInteresNoInteresado-303").trigger("click");
        //                        arrayTags.length = 0;
        //                        $.each(tags, function (i, ex) {
        //                            arrayTags[i] = ex.id
        //                            $("#selectNoInteresadoConforme").append($("<option>").attr("value", ex.id).html(ex.nombre))
        //                        });
        //                        $('#selectNoInteresadoConforme').val(arrayTags).trigger('chosen:updated');
        //                        $('#selectNoInteresadoConforme').prop('disabled', true).trigger("chosen:updated");

        //                    }
        //                    else if (respuesta['ges_sub_estado_gst'] == 307) {
        //                        $("#interes-rdInteresNoInteresado-307").trigger("click");
        //                        arrayTags.length = 0;
        //                        $.each(tags, function (i, ee) {
        //                            arrayTags[i] = ee.id
        //                            $("#selectNoQuiereEstar").append($("<option>").attr("value", ee.id).html(ee.nombre))
        //                        });
        //                        $('#selectNoQuiereEstar').val(arrayTags).trigger('chosen:updated');
        //                        $('#selectNoQuiereEstar').prop('disabled', true).trigger("chosen:updated");
        //                    }
        //                    $("input[name=gRbInteresNoInteresado]").attr("disabled", "disabled");
        //                    bandera_bloqueo_elementos = true;
        //                }
        //                //sergio
        //            }
        //            else if (respuesta['ges_estado_gst'] == 2) {
        //                $("#contacto-rdInteres-" + respuesta['ges_estado_gst']).trigger("click");
        //                $("#contacto-rdInteres-" + respuesta['ges_estado_gst']).prop('checked', true);
        //                $('#msjBlockPen').html(' Se encuentra en estado de ' + respuesta['eges_nombre'] + ', gestionado en la fecha: ' + respuesta['ges_fecha_accion'].toFecha())
        //                $('#lbTitulo').html(respuesta['eges_nombre'])
        //                $('#msjBloqueo').css('display', 'block');
        //                $('#Interes_Si').css('display', 'none');
        //                $('#Interes_NO').css('display', 'none');


        //                $('#txt_interes_comentarios_pen').val(respuesta['ges_descripcion_gst']);
        //                $("input[name=inline-form-radioInteres]").attr("disabled", "disabled");
        //                $("input[name=gRbInteresTerminada]").attr("disabled", "disabled");
        //                $("#txt_interes_comentarios_pen").attr("disabled", "disabled");
        //                $("#contacto-rdInteresTerminada-" + respuesta['ges_sub_estado_gst']).prop('checked', true);


        //                // $("#contacto-rdInteres-" + respuesta['ges_estado_gst']).prop('checked', true);
        //                $('#Interes_Terminada').css('display', 'block');
        //                $('#btn_interes_guardar').attr('disabled', true);
        //            }
        //            $('#etapaContacto').css('display', 'none');
        //            $('#etapaInteres').css('display', 'block');


        //        }
        //        else {
        //            $('#msjBloqueo').css('display', 'none');
        //            $('#etapaInteres').css('display', 'none');
        //            //$('#lbTitulo').html('Contacto')
        //            $("input[name=inline-form-radioInteres]").removeAttr("disabled");
        //            $("#txt_interes_comentarios_pen").removeAttr("disabled");
        //            $('#etapaContacto').css('display', 'block');
        //        }
        //    });
        //},
        //ModalUltimoContacto: function (id) {
        //    $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-ultima-contacto-pensionado", { Id: id, Cod_oficina: getCookie("Oficina") }, function (respuesta) {
        //        if (respuesta['con_contacto'] == 'SI') {
        //            //render.ModalCargaRBContactoSI();
        //            $('#lbTitulo').html(respuesta['nomContatoSi']);
        //            $("#rdkContactoNO").prop('checked', false);
        //            $("#rdkContactoSi").prop('checked', true);
        //            $("#contacto-rd-" + respuesta['con_forma_contacto']).prop('checked', true);
        //            $('#txtObservacionContacto').val(respuesta['con_no_observacion_contacto'])
        //            $('#btn_contacto').attr('disabled', true);
        //            $('#btn_contacto').attr('disabled', false);
        //            $('#paso1_No').css('display', 'none');
        //            $('#paso1_Si').css('display', 'block');
        //        }
        //        else if (respuesta['con_contacto'] == 'NO') {
        //            // render.ModalCargaRBContactoNO();
        //            $('#lbTitulo').html(respuesta['nomConFono'] + ' ... ' + respuesta['nomConDom']);
        //            $("#rdkContactoSi").prop('checked', false);
        //            $("#rdkContactoNO").prop('checked', true);

        //            if (respuesta['con_no_contacto_fono'] != '0') {
        //                $("#contacto-rdFonoNO-" + respuesta['con_no_contacto_fono']).prop('checked', true);
        //            }
        //            if (respuesta['con_no_contacto_domicilo'] != '0') {
        //                $("#contacto-rdDomNo-" + respuesta['con_no_contacto_domicilo']).prop('checked', true);
        //            }

        //            $('#txtObservacionContacto').val(respuesta['con_no_observacion_contacto'])
        //            $('#btn_contacto').attr('disabled', true);
        //            $('#paso1_Si').css('display', 'none');
        //            $('#paso1_No').css('display', 'block');
        //        }
        //    });
        //},
        //ModalCargaRB_ANGT: function () {
        //    $("#divInteresNoInteresado").html("");
        //    $("#divInteresSI").html("");
        //    $("#divInteresTerminada").html("");

        //    $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-subestado-gestion-pensionados", { Id_ges: 3 }, function (datos) {
        //        $.each(datos, function (i, e) {
        //            if (e.eges_id != '301' && e.eges_id != '302') {
        //                var lb = $('<label>').prop('for', `interes-rdInteresNoInteresado-${e.eges_id}`).text(e.eges_nombre);
        //                var inp = $('<input>').addClass('magic-radio').prop({ type: 'radio', name: 'gRbInteresNoInteresado', id: `interes-rdInteresNoInteresado-${e.eges_id}` }).val(e.eges_id)
        //                var dv = $('<div>').addClass('radio').css('margin-top', '9px').append(inp).append(lb).append($('<div>').prop({ id: `divInteresNoInteresadoSub-${e.eges_id}` }).addClass('activarSub' + e.eges_id).css('display', 'none').css('margin-left', '40px'))
        //                $("#divInteresNoInteresado").append(dv)
        //            }
        //        });
        //    });

        //    $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-subestado-gestion-pensionados", { Id_ges: 1 }, function (datos) {
        //        $.each(datos, function (i, e) {
        //            var lb = $('<label>').prop('for', `contacto-rdInteresSi-${e.eges_id}`).text(e.eges_nombre);
        //            var inp = $('<input>').addClass('magic-radio').prop({ type: 'radio', name: 'gRbInteresSI', id: `contacto-rdInteresSi-${e.eges_id}` }).val(e.eges_id)
        //            var dv = $('<div>').addClass('radio').css('margin-top', '-2px').append(inp).append(lb)
        //            $("#divInteresSI").append(dv)
        //        });
        //    });
        //    $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-subestado-gestion-pensionados", { Id_ges: 2 }, function (datos) {
        //        $.each(datos, function (i, e) {
        //            var lb = $('<label>').prop('for', `contacto-rdInteresTerminada-${e.eges_id}`).text(e.eges_nombre);
        //            var inp = $('<input>').addClass('magic-radio').prop({ type: 'radio', name: 'gRbInteresTerminada', id: `contacto-rdInteresTerminada-${e.eges_id}` }).val(e.eges_id)
        //            var dv = $('<div>').addClass('radio').css('margin-top', '-2px').append(inp).append(lb)
        //            $("#divInteresTerminada").append(dv)
        //        });
        //    });
        //},
        //ModalCargaRB_ANGT: function () {
        //    $("#divInteresNoInteresado").html("");
        //    $("#divInteresSI").html("");
        //    $("#divInteresTerminada").html("");

        //    $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-subestado-gestion-pensionados", { Id_ges: 3 }, function (datos) {
        //        $.each(datos, function (i, e) {
        //            if (e.eges_id != '301' && e.eges_id != '302') {
        //                var lb = $('<label>').prop('for', `interes-rdInteresNoInteresado-${e.eges_id}`).text(e.eges_nombre);
        //                var inp = $('<input>').addClass('magic-radio').prop({ type: 'radio', name: 'gRbInteresNoInteresado', id: `interes-rdInteresNoInteresado-${e.eges_id}` }).val(e.eges_id)
        //                var dv = $('<div>').addClass('radio').css('margin-top', '9px').append(inp).append(lb).append($('<div>').prop({ id: `divInteresNoInteresadoSub-${e.eges_id}` }).addClass('activarSub' + e.eges_id).css('display', 'none').css('margin-left', '40px'))
        //                $("#divInteresNoInteresado").append(dv)
        //            }
        //        });
        //    });

        //    $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-subestado-gestion-pensionados", { Id_ges: 1 }, function (datos) {
        //        $.each(datos, function (i, e) {
        //            var lb = $('<label>').prop('for', `contacto-rdInteresSi-${e.eges_id}`).text(e.eges_nombre);
        //            var inp = $('<input>').addClass('magic-radio').prop({ type: 'radio', name: 'gRbInteresSI', id: `contacto-rdInteresSi-${e.eges_id}` }).val(e.eges_id)
        //            var dv = $('<div>').addClass('radio').css('margin-top', '-2px').append(inp).append(lb)
        //            $("#divInteresSI").append(dv)
        //        });
        //    });
        //    $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-subestado-gestion-pensionados", { Id_ges: 2 }, function (datos) {
        //        $.each(datos, function (i, e) {
        //            var lb = $('<label>').prop('for', `contacto-rdInteresTerminada-${e.eges_id}`).text(e.eges_nombre);
        //            var inp = $('<input>').addClass('magic-radio').prop({ type: 'radio', name: 'gRbInteresTerminada', id: `contacto-rdInteresTerminada-${e.eges_id}` }).val(e.eges_id)
        //            var dv = $('<div>').addClass('radio').css('margin-top', '-2px').append(inp).append(lb)
        //            $("#divInteresTerminada").append(dv)
        //        });
        //    });
        //},
        //ModalCargaRBContactoSI: function () {
        //    $("#dvRbMedioSi").html("");
        //    $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estado-gestion-pensionados", { Padre: 6 }, function (datos) {
        //        $.each(datos, function (i, e) {
        //            var lb = $('<label>').prop('for', `contacto-rd-${e.eges_id}`).text(e.eges_nombre);
        //            var inp = $('<input>').addClass('magic-radio').prop({ type: 'radio', name: 'rbContactoSIMedio', id: `contacto-rd-${e.eges_id}` }).val(e.eges_id)
        //            var dv = $('<div>').addClass('radio').css('margin-top', '-2px').append(inp).append(lb)
        //            $("#dvRbMedioSi").append(dv)
        //        });
        //    });
        //},
        //ModalCargaRBContactoNO: function () {

        //    $("#dvRbMedioNoFono").html("");
        //    $("#dvRbMedioNoDomi").html("");
        //    $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estado-gestion-pensionados", { Padre: 7 }, function (datos) {
        //        // $("#slNOContactoPensionadoFono").html("");
        //        //$("#slNOContactoPensionadoFono").append($("<option>").attr("value", "").html("Seleccione"));
        //        $.each(datos, function (i, e) {
        //            var lb = $('<label>').prop('for', `contacto-rdFonoNO-${e.eges_id}`).text(e.eges_nombre);
        //            var inp = $('<input>').addClass('magic-radio').prop({ type: 'radio', name: 'rbContactoNoFono', id: `contacto-rdFonoNO-${e.eges_id}` }).val(e.eges_id)
        //            var dv = $('<div>').addClass('radio').css('margin-top', '-2px').append(inp).append(lb)
        //            $("#dvRbMedioNoFono").append(dv)
        //        });
        //    });
        //    $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estado-gestion-pensionados", { Padre: 8 }, function (datos) {
        //        $.each(datos, function (i, e) {
        //            var lb = $('<label>').prop('for', `contacto-rdDomNo-${e.eges_id}`).text(e.eges_nombre);
        //            var inp = $('<input>').addClass('magic-radio').prop({ type: 'radio', name: 'rbContactoNoDomi', id: `contacto-rdDomNo-${e.eges_id}` }).val(e.eges_id)
        //            var dv = $('<div>').addClass('radio').css('margin-top', '-2px').append(inp).append(lb)
        //            $("#dvRbMedioNoDomi").append(dv)
        //        });
        //    });
        //},
        ListaProspectoPensionados: function () {
            $("#tblLisprospecto").bootstrapTable('refresh', {
                url: BASE_URL + "/motor/api/Gestion/lista-prospecto-pensionado",
                query: {
                    Cod_oficina: getCookie('Oficina')
                }
            });
        }
    }

    // Estados de Gestion
    $('#demo-foo-filter-status').change(function (e) {
        e.preventDefault();

        if ($(this).val() != '') {
            $("#demo-foo-filter-statusSub").attr("disabled", false);
            $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estados-gestion", { tipoCampagna: 1, padre: $(this).val() }, function (datos) {
                $("#demo-foo-filter-statusSub").html("");
                $("#demo-foo-filter-statusSub").append($("<option>").attr("value", "").html("Seleccione"));
                $("#demo-foo-filter-statusSub").append($("<option>").attr("value", "-1").html("Sin Gestión"));
                $.each(datos, function (i, e) {
                    $("#demo-foo-filter-statusSub").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre))
                });
            });
        }
        else {
            $("#demo-foo-filter-statusSub").html("");
            $("#demo-foo-filter-statusSub").attr("disabled", true);
        }
    });


    // Filter status
    $('#demo-foo-filter-statusDR').change(function (e) {
        e.preventDefault();

        if ($(this).val() != '') {
            $("#demo-foo-filter-statusSubDR").attr("disabled", false);
            $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estados-gestion", { tipoCampagna: 5, padre: $(this).val() }, function (datos) {
                $("#demo-foo-filter-statusSubDR").html("");
                $("#demo-foo-filter-statusSubDR").append($("<option>").attr("value", "").html("Seleccione"));

                $.each(datos, function (i, e) {
                    $("#demo-foo-filter-statusSubDR").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre))
                });
            });
        }
        else {
            $("#demo-foo-filter-statusSubDR").html("");
            $("#demo-foo-filter-statusSubDR").attr("disabled", true);
        }
    });

    $('#flt_estado_sc').change(function (e) {
        e.preventDefault();

        if ($(this).val() != '') {
            $("#flt_sub_estado_sc").attr("disabled", false);
            $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estados-gestion", { tipoCampagna: 4, padre: $(this).val() }, function (datos) {
                $("#flt_sub_estado_sc").html("");
                $("#flt_sub_estado_sc").append($("<option>").attr("value", "").html("Seleccione"));
                $("#flt_sub_estado_sc").append($("<option>").attr("value", "-1").html("Sin Gestión"));

                $.each(datos, function (i, e) {
                    $("#flt_sub_estado_sc").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre))
                });
            });
        }
        else {
            $("#flt_sub_estado_sc").html("");
            $("#flt_sub_estado_sc").attr("disabled", true);
        }
    });


    //Evento de busqueda de cualquier gestión    
    $("#btn_buscar_otr").on("click", function () {

        var rutAfilado = $("#afi_rut_busc").val().replace(/\./g, '')
        var tpcmp = $("#PrincipalTabActivo").val();

        if (tpcmp == 2) {
            $("#demo-lg-modal-search").modal('hide')
            $("#mdl_data_normalizacion").modal("show");
            $("#afi_rut_busc").val("");
        }

        if (tpcmp == 8) {
            $("#demo-lg-modal-search").modal('hide')
            $("#mdl_data_acuerdo_pago").modal("show");
            $("#afi_rut_busc").val("");
        }

        else {
            $.SecGetJSON(BASE_URL + "/motor/api/Gestion/obtener-seguimiento", { periodo: entorno.Periodo, afiRut: rutAfilado.trim(), tipoCampagna: tpcmp }, function (datos) {

                if (datos.Estado === "OK") {
                    location.href = BASE_URL + '/motor/App/Gestion/Oferta/' + datos.Objeto.Seguimiento.Periodo.toString() + '/' + rutAfilado + '/' + tpcmp
                } else {
                    $.niftyNoty({
                        type: 'primary',
                        container: '#bdy_busqueda',
                        html: '<strong>!</strong> No se encontro Rut para el periodo actual.',
                        focus: false,
                        timer: 3000
                    });
                }
            });
        }
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


    //Evento de Estado maestro Pre Aprobados Derivados
    $("#ges_estadoDR").on("change", function () {

        if ($(this).val() != '') {
            $("#ges_subestadoDR").attr("disabled", false);
            $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estados-gestion", { tipoCampagna: $(this).data("TipoAsignacion"), padre: $(this).val() }, function (datos) {
                $("#ges_subestadoDR").html("");
                $("#ges_subestadoDR").append($("<option>").attr("value", "").html("Seleccione"));
                $('#datos-gestionDR').bootstrapValidator('updateStatus', 'ges_subestado', 'NOT_VALIDATED').bootstrapValidator('validateField', 'ges_subestado');
                $.each(datos, function (i, e) {
                    $("#ges_subestadoDR").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre))
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
            $("#ges_subestadoDR").html("");
            $("#ges_subestadoDR").attr("disabled", true);
        }
    });

    //Evento de estado maestro tmc
    $("#ges_estadoSC").on("change", function () {

        if ($(this).val() != '') {
            $("#ges_subestadoSC").attr("disabled", false);
            $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estados-gestion", { tipoCampagna: $(this).data("TipoAsignacion"), padre: $(this).val() }, function (datos) {
                $("#ges_subestadoSC").html("");
                $("#ges_subestadoSC").append($("<option>").attr("value", "").html("Seleccione"));
                $('#datos-ges_subestadoSC').bootstrapValidator('updateStatus', 'ges_subestadoSC', 'NOT_VALIDATED').bootstrapValidator('validateField', 'ges_subestadoSC');
                $.each(datos, function (i, e) {
                    if (e.ejes_terminal != "SISTEMA") {
                        $("#ges_subestadoSC").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre))
                    }

                });
            });


            if ($(this).find("option:selected").data("terminal") == "CERRADOS" || $(this).find("option:selected").data("terminal") == "PENDIENTESNOCAL") {
                $("#fpgSC").hide();
            }
            else {
                $("#fpgSC").show();
            }

        }
        else {
            $("#ges_subestadoTMC").html("");
            $("#ges_subestadoTMC").attr("disabled", true);
        }
    });


    //EVENTOS TABS
    $("#tab_recuperaciones").on("shown.bs.tab", function () {
        sessionStorage.setItem('GST_PESTANA_ACTIVA', '2');
        $("#PrincipalTabActivo").val("2");


        //Carga de selects Filtros de Normalizaciones
        $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estados-gestion", { tipoCampagna: 2, padre: 10 }, function (datos) {

            $("#flt_consecuencia_normalizacion").html("");
            $("#flt_consecuencia_normalizacion").append($("<option>").attr("value", "").html("Todos"));

            $.each(datos, function (i, e) {
                $("#flt_consecuencia_normalizacion").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre).data("terminal", e.ejes_terminal))
            });
        });
        //Carga de selects Filtros de Normalizaciones

    })

    $("#tab_preaprobados").on("shown.bs.tab", function () {
        sessionStorage.setItem('GST_PESTANA_ACTIVA', '1');
        $("#PrincipalTabActivo").val("1")

        $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estados-gestion", { tipoCampagna: 1, padre: 0 }, function (datos) {

            $("#demo-foo-filter-status").html("");
            $("#demo-foo-filter-status").append($("<option>").attr("value", "").html("Seleccione"));
            $("#demo-foo-filter-status").append($("<option>").attr("value", "-1").html("Sin Gestion"));
            $.each(datos, function (i, e) {
                $("#demo-foo-filter-status").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre).data("terminal", e.ejes_terminal))
            });


            $("#demo-foo-filter-statusDR").html("");
            $("#demo-foo-filter-statusDR").append($("<option>").attr("value", "").html("Seleccione"));
            $.each(datos, function (i, e) {
                $("#demo-foo-filter-statusDR").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre).data("terminal", e.ejes_terminal))
            });

        });

    })

    $("#tab_segcesantia").on("shown.bs.tab", function () {
        sessionStorage.setItem('GST_PESTANA_ACTIVA', '4');
        $("#PrincipalTabActivo").val("4")

        //Carga de selects Filtros de Normalizaciones
        $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estados-gestion", { tipoCampagna: 4, padre: 0 }, function (datos) {

            $("#flt_estado_sc").html("");
            $("#flt_estado_sc").append($("<option>").attr("value", "").html("Todos"));
            $("#flt_estado_sc").append($("<option>").attr("value", "-1").html("Sin Gestión"));

            $.each(datos, function (i, e) {
                $("#flt_estado_sc").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre).data("terminal", e.ejes_terminal))
            });
        });
    })

    $("#tab_derivaciones").on("shown.bs.tab", function () {
        sessionStorage.setItem('GST_PESTANA_ACTIVA', '5');
        $("#PrincipalTabActivo").val("5");

        //Carga de selects Filtros de Pre Aprobados
        $("#demo-foo-filter-statusDR").html("");

        $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estados-gestion", { tipoCampagna: 5, padre: 0 }, function (datos) {

            $("#demo-foo-filter-statusDR").append($("<option>").attr("value", "").html("Seleccione"));
            $("#demo-foo-filter-statusDR").append($("<option>").attr("value", "-1").html("Sin Gestión"));
            $.each(datos, function (i, e) {
                $("#demo-foo-filter-statusDR").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre).data("terminal", e.ejes_terminal))
            });

        });
    })


    //DERIVACIONES
    $('#btn_derivaciones').click(function () {
        $("#tabla_derivaciones").bootstrapTable('refresh', {
            url: BASE_URL + "/motor/api/Gestion/v3/lista-seguimientos",
            query: {
                tipoCampagna: 5,
                periodo: entorno.Periodo,
                estado: $('#demo-foo-filter-statusDR').val(),
                subestado: $('#demo-foo-filter-statusSubDR').val(),
                prioridad: $('#slPrioridadDR').val(),
                segmento: $('#slSegmentoDR').val(),
                tipo: $('#slTipoDR').val(),
                rut: $('#demo-foo-searchDR').val(),
                vencimiento: $('#flt_vencidos_dr').val()
            }
        });

    });

    $("#tabla_derivaciones").bootstrapTable({
        //url: BASE_URL + "/motor/api/Gestion/v3/lista-seguimientos",
        pagination: true,
        sidePagination: 'server',
        ajaxOptions: {
            headers: {
                "Token": getCookie("Token"),
                "TokenExpiry": "900",
                "Access-Control-Expose-Headers": "Token,TokenExpiry"
            }
        },
        queryParams: function (params) {

            params.periodo = entorno.Periodo;
            params.tipoCampagna = 5;
            params.estado = $('#demo-foo-filter-statusDR').val();
            params.subestado = $('#demo-foo-filter-statusSubDR').val();
            params.prioridad = $('#slPrioridadDR').val();
            params.segmento = $('#slSegmentoDR').val();
            params.tipo = $('#slTipoDR').val();
            params.vencimiento = $('#flt_vencidos_dr').val()
            return params;
        },
        locale: 'es-ES',
        striped: true,
        pageSize: 30,
        pageList: [],
        search: false,
        showColumns: false,
        showRefresh: false,
        sortName: 'Seguimiento.Afiliado_Rut',
        columns: [
            {
                field: 'Seguimiento.Afiliado_Rut',
                title: 'Rut',
                sortable: true,
                formatter: function (value, row, index) {
                    return '<a href="#" class="btn-link" data-target="#mdl_data" data-toggle="modal" data-periodo="' + row.Seguimiento.Periodo + '" data-rut="' + value + '-' + row.Seguimiento.Afiliado_Dv + '" data-tipo="' + row.Seguimiento.TipoAsignacion + '">' + value.toMoney(0).toString() + '-' + row.Seguimiento.Afiliado_Dv + '</a>';
                    //  return '<a href="#" class="btn-link" data-target="#modal_beneficios" data-toggle="modal" data-periodo="' + row.Seguimiento.Periodo + '" data-rut="' + value + '-' + row.Seguimiento.Afiliado_Dv + '" data-tipo="' + row.Seguimiento.TipoAsignacion + '">' + value.toMoney(0).toString() + '-' + row.Seguimiento.Afiliado_Dv + '</a>';
                }
            },
            {
                field: 'Seguimiento.Nombre',
                title: 'Nombre',
                sortable: false,
                formatter: function (value, row, index) {
                    return value + ' ' + row.Seguimiento.Apellido
                }
            },
            {
                field: 'Seguimiento.Empresa',
                title: 'Empresa',
                sortable: true
            },
            {
                field: 'Seguimiento.Segmento',
                title: 'Segmento',
                sortable: false
            },
            {
                field: 'UltimaGestion.GestionBase.IdBaseCampagna',
                title: 'Prox. Gestión',
                sortable: true,
                formatter: function (value, row, index) {
                    return value > 0 ? row.UltimaGestion.GestionBase.FechaCompromete.toFecha() === '01-01-1753' ? '-' : row.UltimaGestion.GestionBase.FechaCompromete.toFecha() : 'N/A';
                }
            },
            {
                field: 'Seguimiento.PreAprobadoFinal',
                title: 'Pre Aprobado',
                sortable: true,
                align: 'right',
                formatter: function (value, row, index) {
                    return value.toMoney(0);
                }
            },
            {
                field: 'Seguimiento.Prioridad',
                title: 'Prioridad',
                sortable: false,
                formatter: function (value, row, index) {
                    return value.toString().toEtiquetaPrioridad() + (row.Notificaciones.length > 0 ? '    <span class="badge badge-info">!</span>' : '')
                }
            },

            {
                field: 'Seguimiento.TipoCampania',
                title: 'Tipo',
                sortable: false
            },

            {
                field: 'UltimaGestion.EstadoGestion.eges_id',
                title: 'Estado',
                sortable: false,
                formatter: function (value, row, index) {
                    return value > 0 ? row.UltimaGestion.EstadoGestion.eges_nombre : 'Sin Gestión';
                }
            },

            {
                field: 'UltimaGestion.SubEstadoGestion.eges_id',
                title: 'Sub Estado',
                sortable: false,
                formatter: function (value, row, index) {
                    var mostrar = ''
                    switch (row.UltimaGestion.SubEstadoGestion.eges_id) {
                        case 202:
                            mostrar = '<div class="label label-table label-success">' + row.UltimaGestion.SubEstadoGestion.eges_nombre + '</div>';
                            break;
                        case 201:
                        case 203:
                        case 204:
                        case 205:
                        case 206:
                            mostrar = '<div class="label label-table label-danger">' + row.UltimaGestion.SubEstadoGestion.eges_nombre + '</div>';
                            break;
                        default:
                            mostrar = '<div class="label label-table label-warning">' + row.UltimaGestion.SubEstadoGestion.eges_nombre + '</div>';

                    }

                    return value > 0 ? mostrar : '<div class="label label-table label-default">Sin Gestión</div>';
                }
            },


        ]
    });


    //COMERCIAL 
    $('#button').click(function () {
        $("#tabla_comercial").bootstrapTable('refresh', {
            url: BASE_URL + "/motor/api/Gestion/v3/lista-seguimientos",
            query: {
                tipoCampagna: 1,
                periodo: entorno.Periodo,
                estado: $('#demo-foo-filter-status').val(),
                subestado: $('#demo-foo-filter-statusSub').val(),
                marca: $('#demo-foo-filter-statusMarca').val(),
                prioridad: $('#slPrioridad').val(),
                segmento: $('#slSegmento').val(),
                tipo: $('#slTipo').val(),
                busEmpresa: $('#demo-chosen-select').val(),
                rut: $('#demo-foo-search').val(),
                vencimiento: $('#flt_vencidos').val()
            }
        });
        $("#tabla_comercial > tbody").addClass("buscar")
    });

    $("#tabla_comercial").bootstrapTable({
        //url: BASE_URL + "/motor/api/Gestion/v3/lista-seguimientos",
        pagination: true,
        sidePagination: 'server',
        ajaxOptions: {
            headers: {
                "Token": getCookie("Token"),
                "TokenExpiry": "900",
                "Access-Control-Expose-Headers": "Token,TokenExpiry"
            }
        },
        queryParams: function (params) {
            params.periodo = entorno.Periodo;
            params.tipoCampagna = 1;
            params.estado = $('#demo-foo-filter-status').val();
            params.subestado = $('#demo-foo-filter-statusSub').val();
            params.prioridad = $('#slPrioridad').val();
            params.segmento = $('#slSegmento').val();
            params.tipo = $('#slTipo').val();
            params.vencimiento = $('#flt_vencidos').val();
            return params;
        },
        locale: 'es-ES',
        striped: true,
        pagination: true,
        pageSize: 30,
        pageList: [],
        search: false,
        showColumns: false,
        showRefresh: false,
        sortName: 'Seguimiento.Afiliado_Rut',
        columns: [
            {
                field: 'Seguimiento.Afiliado_Rut',
                title: 'Rut',
                sortable: true,
                formatter: function (value, row, index) {
                    //sergio
                    //return '<a href="#" class="btn-link" data-target="#mdl_data" data-toggle="modal" data-tieneEncuesta="' + row.TieneEncuesta + '" data-periodo="' + row.Seguimiento.Periodo + '" data-rutafipsu="' + value + '" data-rut="' + value + '-' + row.Seguimiento.Afiliado_Dv + '" data-tipo="' + row.Seguimiento.TipoAsignacion + '">' + value.toMoney(0).toString() + '-' + row.Seguimiento.Afiliado_Dv + '</a>';
                    return '<a href="#" class="btn-link" data-target="#modal_beneficios" data-toggle="modal" data-rutBnf="' + value + '-' + row.Seguimiento.Afiliado_Dv + '" data-nombreBnf="' + row.Seguimiento.Nombre + ' ' + row.Seguimiento.Apellido + '"data-origen="' + 'Comercial' + '" data-tieneEncuesta="' + row.TieneEncuesta + '" data-ofertabnf="' + row.Seguimiento.OFERTA_FINAL_TOTAL + '" data-periodo="' + row.Seguimiento.Periodo + '" data-rutafipsu="' + value + '" data-rut="' + value + '-' + row.Seguimiento.Afiliado_Dv + '" data-tipo="' + row.Seguimiento.TipoAsignacion + '">' + value.toMoney(0).toString() + '-' + row.Seguimiento.Afiliado_Dv + '</a>';
                }
            },
            {
                field: 'Seguimiento.Nombre',
                title: 'Nombre',
                sortable: false,
                formatter: function (value, row, index) {
                    //return value + ' ' + row.Seguimiento.Apellido
                    if (row.Seguimiento.Telefono1 != "") {
                        return value + ' ' + row.Seguimiento.Apellido + " " + ' <span class="badge badge-danger">Dif.</span>'
                    }
                    else {
                        return value + ' ' + row.Seguimiento.Apellido
                    }
                }
            },
            {
                field: 'Seguimiento.Empresa',
                title: 'Empresa',
                sortable: true,
                formatter: function (value, row, index) {
                    if (row.Seguimiento.Telefono2 != "") {
                        return value + " " + '<span class="badge badge-danger">LE.</span>'
                    }
                    else {
                        return value
                    }
                }
            },
            {
                field: 'Seguimiento.Segmento',
                title: 'Segmento',
                sortable: false
            },
            {
                field: 'UltimaGestion.GestionBase.IdBaseCampagna',
                title: 'Prox. Gestión',
                sortable: true,
                formatter: function (value, row, index) {
                    return value > 0 ? row.UltimaGestion.GestionBase.FechaCompromete.toFecha() === '01-01-1753' ? '-' : row.UltimaGestion.GestionBase.FechaCompromete.toFecha() : 'N/A';
                }
            },
            {
                field: 'Seguimiento.PreAprobadoFinal',
                title: 'Pre Aprobado',
                sortable: true,
                align: 'right',
                formatter: function (value, row, index) {
                    //return value.toMoney(0);
                    return row.Seguimiento.MARCA_CC === 1 ? value.toMoney(0) + '/' + (!isNaN(row.Seguimiento.OFERTA_FINAL_TOTAL) ? row.Seguimiento.OFERTA_FINAL_TOTAL : row.Seguimiento.OFERTA_FINAL_TOTAL.toMoney(0)) : value.toMoney(0)
                }
            },
            {
                field: 'Seguimiento.Prioridad',
                title: 'Prioridad',
                sortable: false,
                formatter: function (value, row, index) {
                    //var prioPens = row.Notificaciones.findIndex(function (x) {
                    //    return x.Tipo === 'PRIOPENS';
                    //});
                    jQuery.ajaxSetup({ async: false });

                    let descripcion = "";
                    $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-comercial-beneficios", { Rut_: row.Seguimiento.Afiliado_Rut }, function (datos) {
                        $.each(datos, function (i, e) {

                            if (e.color != '') {
                                if (e.Color == 'azul') {
                                    descripcion = descripcion + ' ' + '<span class="badge badge-primary">' + e.Descripcion + '</span>';
                                }
                                else if (e.Color == 'amarillo') {
                                    descripcion = descripcion + ' ' + '<span class="badge badge-warning">' + e.Descripcion + '</span>';
                                }

                                else if (e.Color == 'gris') {
                                    descripcion = descripcion + ' ' + '<span class="badge badge-warning" style="background-color: #999;">' + e.Descripcion + '</span>';
                                }

                                else if (e.Color == 'rojo') {
                                    descripcion = descripcion + ' ' + '<span class="badge badge-danger">' + e.Descripcion + '</span>';
                                }

                                else if (e.Color == 'verde') {
                                    descripcion = descripcion + ' ' + '<span class="badge badge-success">' + e.Descripcion + '</span>';
                                }

                                else if (e.Color == 'celeste') {
                                    descripcion = descripcion + ' ' + '<span class="badge badge-info">' + e.Descripcion + '</span>';
                                }


                            }
                            else {
                                descripcion = descripcion + ' ' + '<span class="badge badge-info">' + e.Descripcion + '</span>';
                            }
                        });
                    });

                    let contingencia = "";
                    $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-contingencia-motor", { Rut_Empresa: row.Seguimiento.Empresa_Rut }, function (datos) {
                        $.each(datos, function (i, e) {
                            contingencia = contingencia + ' ' + '<span class="badge badge-danger">CN</span>';
                        });
                    });

                    //return value.toString().toEtiquetaPrioridad() + (prioPens >= 0 ? '    <span class="badge badge-warning">!</span>' : (row.Notificaciones.length > 0 ? '    <span class="badge badge-info">!</span>' : '')) //+ (row.TieneEncuesta === 0 ? '    <span class="badge badge-purple">E</span>' : '') 
                    //eturn value.toString().toEtiquetaPrioridad() + (row.Notificaciones.length > 0 ? '    <span class="badge badge-info">!</span>' : '') + (row.Seguimiento.MARCA_CC === 1 ? '    <span class="badge badge-purple">C.C</span>' : '') + (row.Seguimiento.MarcaPsu === 1 ? '    <span class="badge badge-primary">PSU</span>' : '') //+ (row.TieneEncuesta === 0 ? '    <span class="badge badge-purple">E</span>' : '') 
                    jQuery.ajaxSetup({ async: true });
                    //turn value.toString().toEtiquetaPrioridad() + ' ' + descripcion;
                    return value.toString().toEtiquetaPrioridad() + (row.Notificaciones.length > 0 ? '    <span class="badge badge-info">!</span>' : '') + (row.Seguimiento.MARCA_CC === 1 ? '    <span class="badge badge-purple">CC_ESI</span>' : '') + (row.Seguimiento.MARCA_CC === 2 ? '    <span class="badge badge-purple">CC_ENO</span>' : '') + (row.Seguimiento.MARCA_CC === 3 ? '    <span class="badge badge-purple">CC_NE</span>' : '') + (row.Seguimiento.MarcaPsu === 1 ? '    <span class="badge badge-primary">PSU</span>' : '') + ' ' + descripcion + ' ' + contingencia; //+ (row.TieneEncuesta === 0 ? '    <span class="badge badge-purple">E</span>' : '') 
                }
            },

            {
                field: 'Seguimiento.TipoCampania',
                title: 'Tipo',
                sortable: false
            },

            {
                field: 'UltimaGestion.EstadoGestion.eges_id',
                title: 'Estado',
                sortable: false,
                formatter: function (value, row, index) {
                    return value > 0 ? row.UltimaGestion.EstadoGestion.eges_nombre : 'Sin Gestión';
                }
            },

            {
                field: 'UltimaGestion.SubEstadoGestion.eges_id',
                title: 'Sub Estado',
                sortable: false,
                formatter: function (value, row, index) {
                    var mostrar = ''
                    switch (row.UltimaGestion.SubEstadoGestion.eges_id) {
                        case 202:
                            mostrar = '<div class="label label-table label-success" style="border-radius: 9px">' + row.UltimaGestion.SubEstadoGestion.eges_nombre + '</div>';
                            break;
                        case 201:
                        case 203:
                        case 204:
                        case 205:
                        case 206:
                            mostrar = '<div class="label label-table label-danger" style="border-radius: 9px">' + row.UltimaGestion.SubEstadoGestion.eges_nombre + '</div>';
                            break;
                        default:
                            mostrar = '<div class="label label-table label-warning" style="border-radius: 9px">' + row.UltimaGestion.SubEstadoGestion.eges_nombre + '</div>';

                    }

                    return value > 0 ? mostrar : '<div class="label label-table label-default" style="border-radius: 9px">Sin Gestión</div>';
                }
            },
        ]
    });


    //SEGURO CESANTIA
    //$('#btn_seguro_cesantia').click(function () {
    //    $("#tabla_seguro_cesantia").bootstrapTable('refresh', {
    //        url: BASE_URL + "/motor/api/Gestion/v3/lista-seguimientos",
    //        query: {
    //            tipoCampagna: 4,
    //            periodo: entorno.Periodo,
    //            estado: $('#flt_estado_sc').val(),
    //            subestado: $('#flt_sub_estado_sc').val(),
    //            rut: $('#flt_rut_sc').val(),
    //            vencimiento: $('#flt_vencidos_sc').val()
    //        }
    //    });
    //});


    $("#tabla_seguro_cesantia").bootstrapTable({
        pagination: true,
        sidePagination: 'server',
        ajaxOptions: {
            headers: {
                "Token": getCookie("Token"),
                "TokenExpiry": "900",
                "Access-Control-Expose-Headers": "Token,TokenExpiry"
            }
        },
        queryParams: function (params) {
            params.tipoCampagna = 4;
            params.periodo = entorno.Periodo;
            params.estado = $('#flt_estado_sc').val();
            params.subestado = $('#flt_sub_estado_sc').val();
            params.rut = $('#flt_rut_sc').val();
            params.vencimiento = $('#flt_vencidos_sc').val();

            return params;
        },
        locale: 'es-ES',
        striped: true,
        pagination: true,
        pageSize: 30,
        pageList: [],
        search: false,
        showColumns: false,
        showRefresh: false,
        sortName: 'Seguimiento.Afiliado_Rut',
        columns: [
            {
                field: 'Seguimiento.Afiliado_Rut',
                title: 'Rut',
                sortable: true,
                formatter: function (value, row, index) {
                    return '<a href="#" class="btn-link" data-target="#mdl_data" data-toggle="modal" data-periodo="' + row.Seguimiento.Periodo + '" data-rut="' + value + '-' + row.Seguimiento.Afiliado_Dv + '" data-tipo="' + row.Seguimiento.TipoAsignacion + '">' + value.toMoney(0).toString() + '-' + row.Seguimiento.Afiliado_Dv + '</a>';
                }
            },
            {
                field: 'Seguimiento.Nombre',
                title: 'Nombre',
                sortable: false,
                formatter: function (value, row, index) {
                    return value + ' ' + row.Seguimiento.Apellido
                }
            },
            {
                field: 'Seguimiento.PensionadoFFAA',
                title: 'Número de Créditos',
                sortable: true
            },
            {
                field: 'Seguimiento.Prioridad',
                title: 'Prioridad',
                sortable: true,
                formatter: function (value, row, index) {
                    return value.toString().toEtiquetaPloma() + (row.Notificaciones.length > 0 ? '    <span class="badge badge-info">!</span>' : '')
                }
            },
            {
                field: 'UltimaGestion.GestionBase.IdBaseCampagna',
                title: 'Prox. Gestión',
                sortable: true,
                formatter: function (value, row, index) {
                    return value > 0 ? row.UltimaGestion.GestionBase.FechaCompromete.toFecha() === '01-01-1753' ? '-' : row.UltimaGestion.GestionBase.FechaCompromete.toFecha() : 'N/A';
                }
            },
            {
                field: 'UltimaGestion.EstadoGestion.eges_id',
                title: 'Estado',
                sortable: false,
                formatter: function (value, row, index) {
                    return value > 0 ? row.UltimaGestion.EstadoGestion.eges_nombre : 'Sin Gestión';
                }
            },
            {
                field: 'UltimaGestion.SubEstadoGestion.eges_id',
                title: 'Sub Estado',
                sortable: false,
                formatter: function (value, row, index) {
                    return value > 0 ? row.UltimaGestion.SubEstadoGestion.eges_nombre : 'Sin Gestión';
                }
            },
        ]
    });

    //GENERALES
    $.SecGetJSON(BASE_URL + "/motor/api/Gestion/listar-oficinas", function (datos) {

        $("#afi_oficina_preferencia").html("");
        $("#afi_oficina_preferencia").append($("<option>").attr("value", "").html("Seleccione"));
        $("#afi_oficina_preferenciaNormalizacion").html("");
        $("#afi_oficina_preferenciaNormalizacion").append($("<option>").attr("value", "").html("Seleccione"));
        $.each(datos, function (i, e) {
            $("#afi_oficina_preferencia").append($("<option>").attr("value", e.Id).html(e.Nombre))
            $("#afi_oficina_preferenciaNormalizacion").append($("<option>").attr("value", e.Id).html(e.Nombre))
        });
        $('.search > .form-control').attr('placeholder', 'Buscar por Rut')
    });


    $('#mdl_data').on('show.bs.modal', function (e) {

        $('#modal_beneficios').modal('hide')


        var rut_tam = $('#txtRutComercial').val()

        if (rut_tam != undefined) {
            var fechaHoy = new Date();
            var periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
            // var rutPSU = '3982961-4'
            var rutPSU = rut_tam
            var trutAfiliado = rut_tam
            var tperiodo = periodo
            var tipoCamp = 1
            var idEncuesta = $(e.relatedTarget).data("tieneencuesta")
            $('#afi_rut_busc_b').val(trutAfiliado)

        }
        else {

            var rutPSU = $(e.relatedTarget).data("rutafipsu") // TEMPORAL BORRAR AL TERMINAR CAMPAÑA
            var trutAfiliado = $(e.relatedTarget).data("rut")

            var tperiodo = $(e.relatedTarget).data("periodo")
            var tipoCamp = $(e.relatedTarget).data("tipo")
            var idEncuesta = $(e.relatedTarget).data("tieneencuesta")
            $('#afi_rut_busc_b').val(trutAfiliado)

        }





        //console.log('rut 1 :' + trutAfiliado + 'Rut 2 : ' + rutPSU)


        // appVentaRemota.obtenerBanco()


        $('#linkencuesta').prop('href', '/motor/App/DatosAfiliados?RutBuscar=' + trutAfiliado)
        $.SecGetJSON(BASE_URL + "/motor/api/Gestion/obtener-seguimiento", { periodo: tperiodo, afiRut: trutAfiliado, tipoCampagna: tipoCamp }, function (datos) {

            if (datos.Estado === "OK") {
                const Asignacion = datos.Objeto;
                const afiData = Asignacion.Seguimiento;
                const gesList = Asignacion.HistorialGestion;
                console.log({ prueba_x: afiData })

                if (idEncuesta == 0) {
                    $("#lbMensajeEncuesta").css('display', 'block');
                }
                else {
                    $("#lbMensajeEncuesta").css('display', 'none');
                }

                //DATOS AFILIADO
                rutPSU = afiData.Afiliado_Rut; // TEMPORAL BORRAR AL TERMINAR CAMPAÑA
                $('#afi_rut').val(afiData.Afiliado_Rut.toMoney(0) + '-' + afiData.Afiliado_Dv);
                $('#afi_nombres').val(afiData.Nombre + ' ' + afiData.Apellido);
                $('#afi_segmento').val(afiData.Segmento);
                $('#afi_empresa_nombre').val(afiData.Empresa);
                $('#afi_empresa_rut').val(parseInt(afiData.Empresa_Rut).toMoney(0) + '-' + afiData.Empresa_Dv);
                if (afiData.MARCA_CC === 1) {
                    $('#afi_preaprobado').val(afiData.OfertaTexto.length === 0 ? '$' + afiData.PreAprobadoFinal.toMoney(0) + '/' + (!isNaN(afiData.OFERTA_FINAL_TOTAL) ? afiData.OFERTA_FINAL_TOTAL : afiData.OFERTA_FINAL_TOTAL.toMoney(0)) : afiData.OfertaTexto);

                }
                else {
                    $('#afi_preaprobado').val(afiData.OfertaTexto.length === 0 ? '$' + afiData.PreAprobadoFinal.toMoney(0) : afiData.OfertaTexto);
                    $(".charlyNTF").hide();
                }
                $('#ges_id_asignacion').val(afiData.id_Asign);
                $('#ges_id_asignacion_normalizacion').val(afiData.id_Asign);
                $('#ges_id_asignacion_Acuerdo_pago').val(afiData.id_Asign);
                $('#ges_id_asignacionTMC').val(afiData.id_Asign);
                $('#ges_id_asignacionSC').val(afiData.id_Asign);
                $('#afi_oficina_preferencia').val(Asignacion.OficinaPreferencia.Valor_preferencia);
                $('#afi_horario_preferencia').val(Asignacion.HorarioPreferencia.Valor_preferencia);
                $("#OficinaAsig").val(Asignacion.NombreOficina)


                //CONTACTO
                ///////////////////////////////////////////////////////
                $("#afi_telefonos").html("");
                $.each(Asignacion.Telefonos, function (i, telefono) {

                    var n = '+' + telefono.Valor_contacto + ((telefono.Valido === 0) ? ' (malo)' : '');
                    var c = (telefono.Valido === 0) ? $("<option>").html(n).data("malo", "true") : $("<option>").html(n);
                    $("#afi_telefonos").append(c)

                });

                if (Asignacion.Telefonos.length == 0) {
                    $(".desaparecible, .forma-uno").hide();
                }

                ///////////////////////////////////////////////////////
                $("#afi_celulares").html("");
                $.each(Asignacion.Celulares, function (i, celular) {

                    var n = '+' + celular.Valor_contacto + ((celular.Valido === 0) ? ' (malo)' : '');
                    var c = (celular.Valido === 0) ? $("<option>").html(n).data("malo", "true") : $("<option>").html(n);
                    $("#afi_celulares").append(c)

                });

                if (Asignacion.Celulares.length == 0) {
                    $(".desaparecible-cel, .forma-uno-cel").hide();
                }

                ///////////////////////////////////////////////////////
                $("#afi_correos").html("");
                $.each(Asignacion.Correos, function (i, correo) {

                    var n = correo.Valor_contacto + ((correo.Valido === 0) ? ' (malo)' : '');
                    var c = (correo.Valido === 0) ? $("<option>").html(n).data("malo", "true") : $("<option>").html(n);
                    $("#afi_correos").append(c)

                });

                if (Asignacion.Correos.length == 0) {
                    $(".desaparecible-mail, .forma-uno-mail").hide();
                }

                //NOTIFICACIONES
                var sx = false;

                $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-comercial-beneficios", { Rut_: afiData.Afiliado_Rut }, function (datos) {
                    $(".NotfGenericaContainer").html("");
                    let text = "";
                    var type = "success";
                    $.each(datos, function (i, e) {
                        $(".NotfGenerica").show();
                        text = e.Glosa;
                        $.niftyNoty({
                            type: type,
                            container: '.NotfGenericaContainer',
                            html: text,
                            focus: false,
                            closeBtn: false
                        });
                    });
                });

                // CONTINGENCIA
                $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-contingencia-motor", { Rut_Empresa: afiData.Empresa_Rut }, function (datos) {
                    $(".contingenciaNTFContainer").html("");
                    let text = "";
                    var type = "danger";
                    $.each(datos, function (i, e) {
                        $(".contingenciaNTF").show();
                        text = e.Motivo;
                        $.niftyNoty({
                            type: type,
                            container: '.contingenciaNTFContainer',
                            html: text,
                            focus: false,
                            closeBtn: false
                        });
                    });
                });




                //BORRADO POR NUEVA NOTIFICACNES --SERGIO
                if (typeof Asignacion.Notificaciones != "undefined" && Asignacion.Notificaciones != null && Asignacion.Notificaciones.length > 0) {
                    var text = "";
                    var type = "success";
                    $(".charlyNTFContainer").html("");
                    $.each(Asignacion.Notificaciones, function (i, e) {

                        if (e.Tipo == "LICENCIA") {
                            text += "<strong>Licencias: </strong> Tiene " + e.Cantidad + " <strong>Licencia(s)</strong> pendiente(s) de pago por $" + Number(e.Valor).toMoney()
                        }

                        if (e.Tipo == "PAGEXCESO") {
                            text += "<strong>PEX: </strong> Tiene " + e.Cantidad + " <strong>Pagos en Exceso</strong> pendiente(s) de pago por $" + Number(e.Valor).toMoney()
                        }

                        if (e.Tipo == "SEGCESAN") {
                            text += "<strong>Seguros: </strong> Afiliado cuenta con <strong>Seguro de Cesantía</strong>"
                        }

                        if (e.Tipo == "MUNICIP") {
                            text += "<strong>Afiliado Municipal, </strong> debe ser evaluado por comité de créditos."
                            type = "warning";
                        }

                        if (e.Tipo == "PRIOPENS") {
                            text += "<strong>Afiliado Prioridad </strong> " + e.Valor;
                            type = "warning";
                        }

                        if (e.Tipo == "ACUERPAG") {
                            sx = true;
                        }
                        else {
                            $.niftyNoty({
                                type: type,
                                container: '.charlyNTFContainer',
                                html: text,
                                focus: false,
                                closeBtn: false
                            });
                        }
                    });

                    /*TO DO: Revisar la logica*/
                    if (!sx) {
                        $(".charlyNTF").show();
                    }
                }
                else {
                    $(".charlyNTF").hide();
                }


                /// FIN COMENTARIO POR NUEVO METODO NOTIFICACIONES -- SERGIO

                var info_xxx = "";

                if (Asignacion.FiltrosRSG.length > 0) {
                    info_xxx = ("Filtros Riesgo " + Asignacion.FiltrosRSG).toEtiquetaSuperior('x');
                }

                if (tipoCamp === 1 || tipoCamp === 5) {
                    //BORRADO POR NUEVA NOTIFICACNES ---SERGIO
                    if (afiData.MARCA_CC === 1) {
                        $(".sergioNTF").show();
                        $(".sergioNTFContainer").html("");

                        $.niftyNoty({
                            type: "purple",
                            container: '.sergioNTFContainer',
                            html: "<strong>Oferta Compra de Cartera - Emplanillado donde SI estamos Recuperando la Nómina (estamos enviando la nómina y la Empresa está pagando.)</strong>",
                            focus: false,
                            closeBtn: false
                        });
                    }
                    else if (afiData.MARCA_CC === 2) {
                        $(".sergioNTF").show();
                        $(".sergioNTFContainer").html("");

                        $.niftyNoty({
                            type: "purple",
                            container: '.sergioNTFContainer',
                            html: "<strong>Oferta Compra de Cartera - Emplanillado donde NO estamos Recuperando la Nómina (estamos enviando la nómina y la Empresa no está pagando.</strong>",
                            focus: false,
                            closeBtn: false
                        });
                    }
                    else if (afiData.MARCA_CC === 3) {
                        $(".sergioNTF").show();
                        $(".sergioNTFContainer").html("");

                        $.niftyNoty({
                            type: "purple",
                            container: '.sergioNTFContainer',
                            html: "<strong>Oferta Compra de Cartera - No está siendo Emplanillada (no estamos enviando nómina a una Empresa)</strong>",
                            focus: false,
                            closeBtn: false
                        });
                    }
                    else {
                        $(".sergioNTF").hide();
                    }



                    if (afiData.Telefono1 != "") {
                        $(".msjCovid").show();
                        $(".covidNTFContainer").html("");

                        $.niftyNoty({
                            type: "danger",
                            container: '.covidNTFContainer',
                            html: "<strong>" + afiData.Telefono1 + "</strong>",
                            focus: false,
                            closeBtn: false
                        });
                    }
                    else {
                        $(".msjCovid").hide();
                    }


                    if (afiData.Telefono2 != "") {
                        $(".msjCovidEmp").show();
                        $(".covidEmpNTFContainer").html("");

                        $.niftyNoty({
                            type: "danger",
                            container: '.covidEmpNTFContainer',
                            html: "<strong>" + afiData.Telefono2 + "</strong>",
                            focus: false,
                            closeBtn: false,
                            font: 11,

                        });
                    }
                    else {
                        $(".msjCovidEmp").hide();
                    }


                    render.HistorialGestion(gesList);
                    $("#myLargeModalLabel").html("Gestión Comercial " + afiData.Prioridad.toString().toEtiquetaPrioridad() + " " + info_xxx);

                    $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-rechazos-rsg", { Periodo: tperiodo, RutEmpresa: afiData.Empresa_Rut, RutAfiliado: afiData.Afiliado_Rut }, function (datos) {
                        $("#letable").html("");
                        $.each(datos, function (i, e) {
                            $("#letable").append($("<tr>").append("<td>").html(e.MotivoRechazo))
                        });
                    });
                }

                if (tipoCamp === 2) {
                    render.HistorialGestionRecuperaciones(gesList);
                    $("#morfeable_monto").text("Monto Adeudado");
                    $("#myLargeModalLabel").text("Gestión de Normalización, Folio Crédito: " + afiData.RiesgoPerfil);
                }

                if (tipoCamp === 4) {
                    render.HistorialGestion(gesList);
                    $("#myLargeModalLabel").html('Gestión Seg Cesantía ' + afiData.Prioridad.toString().toEtiquetaPrioridad() + " Folios:" + afiData.RiesgoPerfil);// + afiData.Prioridad.toString().toEtiquetaPrioridad() + " " + info_xxx);
                    $("#morfeable_monto").text("Monto Adeudado");
                    $("#afi_preaprobado").val('$' + afiData.PreAprobadoFinal.toMoney(0))
                    $("#morf_cnvs").removeClass("col-sm-6").addClass("col-sm-3")

                    $(".segmento_texto").text("Fecha Colocación");
                    $("#afi_segmento").val(afiData.TipoCampania);

                    $("#labelempresa").text("N° Cuotas morosas");
                    $("#afi_empresa_nombre").val(afiData.EmpresaEsPensionado)

                    $("#labelrutempresa").text("Monto Cuota");
                    $("#afi_empresa_rut").val(afiData.Cuadrante.toMoney(0))

                    $(".charlyNTF").show();
                    $.niftyNoty({
                        type: 'warning',
                        container: '.charlyNTFContainer',
                        html: "<strong>Nota: </strong> Ver detalle de los creditos en sistema</strong>",
                        focus: false,
                        closeBtn: false
                    });

                }
                let lerut = $('#afi_empresa_rut').val().replace(/\./g, '')
                lerut = lerut.substring(0, 8);

                console.log('Sergio:' + lerut)
                // appInfoEmpresa.obtenerInfoEmpresa(lerut);


            }
            else {
                $.niftyNoty({
                    type: 'primary',
                    container: '#bdy_busqueda',
                    html: '<strong>!</strong> No se encontro Rut para el periodo actual.',
                    focus: false,
                    timer: 3000
                });

                if (rut_tam != undefined) {
                    $.niftyNoty({
                        type: 'danger',
                        container: '#bdy_busqueda_tam',
                        html: '<strong>!</strong> No se encontro Rut para el periodo actual.',
                        focus: false,
                        timer: 5000
                    });
                    $("#mdl_data").modal('hide')
                }
            }
        });


        /// TEMPORAL BORRA CAMPAÑA PARA PSU SERGIO

        // console.log(rutPSU)

        $.SecGetJSON(BASE_URL + "/motor/api/Gestion/obtener-afi-psu", { Afiliado_Rut: rutPSU }, function (datos) {
            $(".psuNTF").show();
            $(".psuNTFContainer").html("");
            if (datos.N_Cargas > 0) {
                $.niftyNoty({
                    type: "primary",
                    container: '.psuNTFContainer',
                    html: "<strong>Difusión Preuniversitario Online UC - 70% Dcto   (" + datos.N_Cargas + " hijo(s) entre 17 y 20 años).....</strong>",
                    focus: false,
                    closeBtn: false
                });
            }
        });


        //Evento de Estado maestro Pre Aprobados
        $("#ges_estado").on("change", function () {

            if ($(this).val() != '') {
                $("#ges_subestado").attr("disabled", false);
                $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estados-gestion", { tipoCampagna: tipoCamp, padre: $(this).val() }, function (datos) {
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

        //Evento de Estado maestro Pre Aprobados Derivados
        $("#ges_estadoDR").on("change", function () {

            if ($(this).val() != '') {
                $("#ges_subestadoDR").attr("disabled", false);
                $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estados-gestion", { tipoCampagna: $(this).data("TipoAsignacion"), padre: $(this).val() }, function (datos) {
                    $("#ges_subestadoDR").html("");
                    $("#ges_subestadoDR").append($("<option>").attr("value", "").html("Seleccione"));
                    $('#datos-gestionDR').bootstrapValidator('updateStatus', 'ges_subestado', 'NOT_VALIDATED').bootstrapValidator('validateField', 'ges_subestado');
                    $.each(datos, function (i, e) {
                        $("#ges_subestadoDR").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre))
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
                $("#ges_subestadoDR").html("");
                $("#ges_subestadoDR").attr("disabled", true);
            }


        });

        //Evento de estado maestro tmc
        $("#ges_estadoSC").on("change", function () {

            if ($(this).val() != '') {
                $("#ges_subestadoSC").attr("disabled", false);
                $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estados-gestion", { tipoCampagna: tipoCamp, padre: $(this).val() }, function (datos) {
                    $("#ges_subestadoSC").html("");
                    $("#ges_subestadoSC").append($("<option>").attr("value", "").html("Seleccione"));
                    $('#datos-ges_subestadoSC').bootstrapValidator('updateStatus', 'ges_subestadoSC', 'NOT_VALIDATED').bootstrapValidator('validateField', 'ges_subestadoSC');
                    $.each(datos, function (i, e) {
                        if (e.ejes_terminal != "SISTEMA") {
                            $("#ges_subestadoSC").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre))
                        }

                    });
                });


                if ($(this).find("option:selected").data("terminal") == "CERRADOS" || $(this).find("option:selected").data("terminal") == "PENDIENTESNOCAL") {
                    $("#fpgSC").hide();
                }
                else {
                    $("#fpgSC").show();
                }

            }
            else {
                $("#ges_subestadoTMC").html("");
                $("#ges_subestadoTMC").attr("disabled", true);
            }
        });

        //COMERCIAL
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
                feedbackIcons: faIcon,
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

                var valContacto = $('#ges_estado').val();
                var valSubContacto = $('#ges_subestado').val();

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

                        if ($('#ges_subestado').val() == '307' || $('#ges_subestado').val() == '308') {
                            appVentaRemota.guardaRegistroBancario();
                        }

                        if (respuesta.Objeto != null && respuesta.Objeto.length > 0 && respuesta.Objeto[0].EstadoGestion.ejes_terminal === "CERRADOS") {
                            $(".esconder").hide();
                        }

                        $("#datos-gestion").bootstrapValidator('resetForm', true);

                        if (valContacto == 3) {
                            $("#tabContacComercial").tab('show');
                            $("#msjContactComercial").css('display', 'block');
                        }
                        else if (valContacto == 2) {
                            if (valSubContacto == 201 || valSubContacto == 202 || valSubContacto == 203 || valSubContacto == 204 || valSubContacto == 205) {

                                $("#tabContacComercial").tab('show');
                                $("#msjContactComercial").css('display', 'block');
                            }
                        }

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

        //RECUPERACIONES
        if (tipoCamp === 2) {

            $('#datos-gestion_normalizacion').show();

            $('#demo-dp-component_normalizacion .input-group.date').datepicker({ autoclose: true, format: 'dd-mm-yyyy', startDate: "0d", language: "es", daysOfWeekDisabled: [6, 0], todayHighlight: true }).on('show.bs.modal hide.bs.modal', function (event) {
                // prevent datepicker from firing bootstrap modal "show.bs.modal"
                event.stopPropagation();
            });

            //Carga de selects

            $('#datos-gestion_normalizacion').bootstrapValidator({
                excluded: [':disabled', ':not(:visible)'],
                feedbackIcons: faIcon,
                fields: {
                    ges_causa_basal_normalizacion: {
                        validators: {
                            notEmpty: {
                                message: 'Debe seleccionar una causa'
                            }
                        }
                    },
                    ges_consecuencia_normalizacion: {
                        validators: {
                            notEmpty: {
                                message: 'Debe seleccionar una consecuencia'
                            }
                        }
                    },
                    ges_estado_normalizacion: {
                        validators: {
                            notEmpty: {
                                message: 'Debe seleccionar un estado'
                            }
                        }
                    },
                    /*ges_prox_gestion_normalizacion: {
                        validators: {
                            notEmpty: {
                                message: 'La fecha de próxima gestión no puede ser vacía'
                            },
                            date: {
                                format: 'DD-MM-YYYY',
                                message: 'Formato de fecha incorrecto'
                            }
                        }
                    },*/
                    ges_comentarios_normalizacion: {
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

                $.SecPostJSON(BASE_URL + "/motor/api/Gestion/guardar-gestion-normalizacion", $form.serialize(), function (respuesta) {

                    if (respuesta.Estado === 'OK') {
                        render.HistorialGestionRecuperaciones(respuesta.Objeto);

                        if (respuesta.Objeto.length > 0 && respuesta.Objeto[0].EstadoGestion.ejes_terminal === "CERRADOS") {
                            $(".esconder").hide();
                        }

                        $("#datos-gestion_normalizacion").bootstrapValidator('resetForm', true);


                        $.niftyNoty({
                            type: 'success',
                            container: 'floating',
                            html: '<strong>OK</strong> Gestion guardada exitosamente.',
                            focus: false,
                            timer: 3000
                        });
                    }
                    else {
                        $.niftyNoty({
                            type: 'danger',
                            container: 'floating',
                            html: '<strong>Error</strong> ' + respuesta.Mensaje,
                            focus: false,
                            timer: 3000
                        });
                    }
                });
            });


        }

        //SEGURO CESANTIA
        if (tipoCamp === 4) {
            $('#datos-gestion-sc').show();


            $('#demo-dp-componentSC .input-group.date').datepicker({
                autoclose: true, format: 'dd-mm-yyyy', startDate: "0d", language: "es", daysOfWeekDisabled: [6, 0], todayHighlight: true
            }).on('changeDate', function (e) {
                $('#datos-gestion-sc').bootstrapValidator('updateStatus', 'ges_prox_gestionSC', 'NOT_VALIDATED').bootstrapValidator('validateField', 'ges_prox_gestionSC');
            }).on('show.bs.modal hide.bs.modal', function (event) {
                // prevent datepicker from firing bootstrap modal "show.bs.modal"
                event.stopPropagation();
            });

            //Carga de selects
            $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estados-gestion", { tipoCampagna: tipoCamp, padre: 0 }, function (datos) {
                $("#ges_estadoSC").data("TipoAsignacion", tipoCamp);
                $("#ges_estadoSC").html("");
                $("#ges_estadoSC").append($("<option>").attr("value", "").html("Seleccione"));

                $.each(datos, function (i, e) {
                    $("#ges_estadoSC").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre).data("terminal", e.ejes_terminal))
                });
            });


            $('#datos-gestion-sc').bootstrapValidator({
                excluded: [':disabled', ':not(:visible)'],
                feedbackIcons: faIcon,
                fields: {
                    ges_estadoSC: {
                        validators: {
                            notEmpty: {
                                message: 'Debe seleccionar un estado'
                            }
                        }
                    },
                    ges_subestadoSC: {
                        validators: {
                            notEmpty: {
                                message: 'Debe seleccionar un sub estado'
                            }
                        }
                    },
                    ges_prox_gestionSC: {
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
                    ges_comentariosSC: {
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
                $.SecPostJSON(BASE_URL + "/motor/api/Gestion/guardar-gestion-normalizacionSC", $form.serialize(), function (respuesta) {

                    if (respuesta.Estado === 'OK') {
                        render.HistorialGestion(respuesta.Objeto);

                        $("#datos-gestion-sc").bootstrapValidator('resetForm', true);
                        //$("#mensaje_guardar").fadeIn();

                        $.niftyNoty({
                            type: 'success',
                            container: 'floating',
                            html: '<strong>OK</strong> Gestion guardada exitosamente.',
                            focus: false,
                            timer: 3000
                        });
                    }
                    else {
                        $.niftyNoty({
                            type: 'danger',
                            container: 'floating',
                            html: '<strong>Error</strong> ' + respuesta.Mensaje,
                            focus: false,
                            timer: 3000
                        });
                    }
                });
            });
        }


        //Contactabilidad
        var rutAf = trutAfiliado.replace(/\./g, '');
        rutAf = rutAf.substring(0, rutAf.indexOf('-'));
        cargaDatosDeContacto(rutAf);

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

            var rutClie = $('#afi_rut').val()
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
                cargaDatosDeContacto(rutAf, '#bdy_datos_contactos');
                $("#btn-add-contac").trigger("click");
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Contacto Guardado correctamente.',
                    container: '#tab-gestion-3',
                });
            });

        });

        appVentaRemota.cargaLeadFiltroCall(trutAfiliado)
        $("#msjContactComercial").css('display', 'none');
    });




    $('#form-registro-contacto_acuerdo_pago').bootstrapValidator({
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
        // Prevén que se mande el formulario
        e.preventDefault();
        var $form = $(e.target);
        var rutCont = $('#txtRutAfiAcuerdo').val()
        rutCont = rutCont.substring(0, rutCont.length - 2)
        var objeto_envio_contacto = {
            RutAfiliado: rutCont,
            IdTipoContac: $('#cbtippContac_acuerdo_pago').val(),
            GlosaTipoContac: $('select[name="cbtippContac_acuerdo_pago"] option:selected').text(),
            IdClasifContac: $('#cbClasificacionConctac_acuerdo_pago').val(),
            GlosaClasifContac: $('select[name="cbClasificacionConctac_acuerdo_pago"] option:selected').text(),
            DatosContac: $('#afi_NewContacto_acuerdo_pago').val()
        }
        $.SecGetJSON(BASE_URL + "/motor/api/Contactos/ingresa-nuevo-contacto", objeto_envio_contacto, function (datos) {
            $("#form-registro-contacto_acuerdo_pago").bootstrapValidator('resetForm', true);
            // $('#demo-lg-modal-new').modal('hide');
            cargaDatosDeContacto(rutCont, 'bdy_datos_contactos_acuerdo_pago');
            $("#btn-add-contac_acuerdo_pago").trigger("click");
            $.niftyNoty({
                type: 'success',
                icon: 'pli-like-2 icon-2x',
                message: 'Contacto Guardado correctamente.',
                container: '#tab-gestion-3',
                timer: 5000
            });
        });

    });

    $('#form-registro-contacto_seguro-cesantia').bootstrapValidator({
        excluded: [':disabled', ':not(:visible)'],
        feedbackIcons: [],
        fields: {
            cbtippContac_seg: {
                validators: {
                    notEmpty: {
                        message: 'Debe seleccionar un tipo de Contacto'
                    }
                }
            },
            cbClasificacionConctac_seg: {
                validators: {
                    notEmpty: {
                        message: 'Debe seleccionar una clasificación de contacto'
                    }
                }
            },
            afi_NewContacto_seg: {
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
        var rutCont = $('#txtRutAfiSegC').val()
        rutCont = rutCont.substring(0, rutCont.length - 2)
        var objeto_envio_contacto = {
            RutAfiliado: rutCont,
            IdTipoContac: $('#cbtippContac_seg').val(),
            GlosaTipoContac: $('select[name="cbtippContac_seg"] option:selected').text(),
            IdClasifContac: $('#cbClasificacionConctac_seg').val(),
            GlosaClasifContac: $('select[name="cbClasificacionConctac_seg"] option:selected').text(),
            DatosContac: $('#afi_NewContacto_seg').val()
        }
        $.SecGetJSON(BASE_URL + "/motor/api/Contactos/ingresa-nuevo-contacto", objeto_envio_contacto, function (datos) {
            $("#form-registro-contacto_seguro-cesantia").bootstrapValidator('resetForm', true);
            // $('#demo-lg-modal-new').modal('hide');
            cargaDatosDeContactoSeguro(rutCont, '#bdy_datos_contactos_seguro_cesantia');
            $("#btn-add-contac-seguro_cesantia").trigger("click");
            $.niftyNoty({
                type: 'success',
                icon: 'pli-like-2 icon-2x',
                message: 'Contacto Guardado correctamente.',
                container: '#tab-gestion-3',
                timer: 5000
            });
        });

    });




    $('#mdl_data').on('hide.bs.modal', function (e) {

        $('#tab_contacti').tab('show');

        $(".desaparecible, .forma-uno").show();
        $(".desaparecible-cel, .forma-uno-cel").show();
        $(".desaparecible-mail, .forma-uno-mail").show();
        $(".charlyNTFContainer").html("");

        const pestana = sessionStorage.getItem('GST_PESTANA_ACTIVA');
        switch (pestana) {
            case '1':
            case '5':
                $("#datos-gestion").bootstrapValidator('resetForm', true);
                $('#datos-gestion').bootstrapValidator('destroy')
                $('#datos-gestion').hide();
                break;
            case '2':
                $("#datos-gestion_normalizacion").bootstrapValidator('resetForm', true);
                $('#datos-gestion_normalizacion').bootstrapValidator('destroy')
                $('#datos-gestion_normalizacion').hide();
                break;
            case '4':
                $("#datos-gestion-sc").bootstrapValidator('resetForm', true);
                $('#datos-gestion-sc').bootstrapValidator('destroy')
                $('#datos-gestion-sc').hide();

                $("#morf_cnvs").removeClass("col-sm-3").addClass("col-sm-6")
                $("#labelempresa").text("Empresa");
                $("#labelrutempresa").text("Rut Empresa");
                break;
        }
        appVentaRemota.setDefaultsModalData();
    });

    //PREFERENCIAS AFILIADO
    $("#afi_oficina_preferencia").on("change", function () {

        if ($(this).val() != "") {
            var WebPreferencia = {
                afiliado_Rut: $("#afi_rut").val().replace(/\./g, ''),
                tipo_preferencia: "OFICINA",
                valor_preferencia: $(this).val(),
                valido: true
            }
            WebPreferencia.afiliado_Rut = WebPreferencia.afiliado_Rut.substring(0, WebPreferencia.afiliado_Rut.length - 2);

            $.SecPostJSON(BASE_URL + "/motor/api/Gestion/guardar-preferencia-afiliado", WebPreferencia, function (respuesta) {
                if (respuesta.Estado === "OK") {
                    $.niftyNoty({
                        type: 'success',
                        container: 'floating',
                        html: '<strong>OK</strong> Oficina asignada con éxito!',
                        focus: false,
                        timer: 3000
                    });
                }
            });
        }
    });

    $("#afi_oficina_preferenciaNormalizacion").on("change", function () {

        if ($(this).val() != "") {
            var WebPreferencia = {
                afiliado_Rut: $("#afi_rut").val().replace(/\./g, ''),
                tipo_preferencia: "OFICINA",
                valor_preferencia: $(this).val(),
                valido: true
            }
            WebPreferencia.afiliado_Rut = WebPreferencia.afiliado_Rut.substring(0, WebPreferencia.afiliado_Rut.length - 2);

            $.SecPostJSON(BASE_URL + "/motor/api/Gestion/guardar-preferencia-afiliado", WebPreferencia, function (respuesta) {
                if (respuesta.Estado === "OK") {
                    $.niftyNoty({
                        type: 'success',
                        container: 'floating',
                        html: '<strong>OK</strong> Oficina asignada con éxito!',
                        focus: false,
                        timer: 3000
                    });
                }
            });
        }
    });

    $("#afi_horario_preferencia").on("change", function () {

        if ($(this).val() != "") {

            var WebPreferencia = {
                afiliado_Rut: $("#afi_rut").val().replace(/\./g, ''),
                tipo_preferencia: "HORARIO",
                valor_preferencia: $(this).val(),
                valido: true
            }

            WebPreferencia.afiliado_Rut = WebPreferencia.afiliado_Rut.substring(0, WebPreferencia.afiliado_Rut.length - 2);

            $.SecPostJSON(BASE_URL + "/motor/api/Gestion/guardar-preferencia-afiliado", WebPreferencia, function (respuesta) {
                if (respuesta.Estado === "OK") {
                    ///Variables.Afiliado_Current.data("afiliado").HorarioPreferencia = respuesta.Objeto;
                    ///console.log(Variables.Afiliado_Current.data("afiliado"))
                }
            });
        }


    });


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

    const pestana = sessionStorage.getItem('GST_PESTANA_ACTIVA');
    if (pestana != null) {
        switch (pestana) {
            case '1':
                $('#tab_preaprobados').tab('show');
                $("#tab_preaprobados").trigger("shown.bs.tab");
                break;
            case '2':
                $('#tab_recuperaciones').tab('show');
                //$("#tab_recuperaciones").trigger("shown.bs.tab");
                break;
            case '3':
                $('#tab_normalizacionTMC').tab('show');
                //$("#tab_normalizacionTMC").trigger("shown.bs.tab");
                break;
            case '4':
                $('#tab_segcesantia').tab('show');
                //$("#tab_segcesantia").trigger("shown.bs.tab");
                break;
            case '5':
                $('#tab_derivaciones').tab('show');
                //$("#tab_derivaciones").trigger("shown.bs.tab");
                break;
        }
    } else {
        $("#tab_preaprobados").trigger("shown.bs.tab");
    }

    $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-empresas", function (datos) {
        $("#demo-chosen-select").html("");
        $("#demo-chosen-select").append($("<option>").text("Seleccione").val(""));
        $.each(datos, function (i, e) {
            $("#demo-chosen-select").append($("<option>").val(e.NonEmpresa).html(e.NonEmpresa));
        });
        $('#demo-chosen-select').chosen();
    });

    $('#btn-add-contac-normalizacion').on('click', function () {

        // console.log('Visibiliadad', $('#formulario-contac').is(':visible'));
        if ($('#formulario-contac_normalizacion').is(':visible')) {
            $('#formulario-contac_normalizacion').hide('slow');
        }
        else {
            $('#formulario-contac_normalizacion').show('slow');
        }

    });

    $('#btn-add-contac_acuerdo_pago').on('click', function () {

        // console.log('Visibiliadad', $('#formulario-contac').is(':visible'));
        if ($('#formulario-contac_acuerdo_pago').is(':visible')) {
            $('#formulario-contac_acuerdo_pago').hide('slow');
        }
        else {
            $('#formulario-contac_acuerdo_pago').show('slow');
        }

    });

    $('#btn-add-contac-seguro_cesantia').on('click', function () {

        // console.log('Visibiliadad', $('#formulario-contac').is(':visible'));
        if ($('#formulario-contac_seguro_cesantia').is(':visible')) {
            $('#formulario-contac_seguro_cesantia').hide('slow');
        }
        else {
            $('#formulario-contac_seguro_cesantia').show('slow');
        }

    });

    $('#btn-add-contac').on('click', function () {

        // console.log('Visibiliadad', $('#formulario-contac').is(':visible'));
        if ($('#formulario-contac').is(':visible')) {
            $('#formulario-contac').hide('slow');
        }
        else {
            $('#formulario-contac').show('slow');
        }

    });


    if (getCookie('Cargo') == 'Agente' || getCookie('Cargo') == 'Jefe Servicio al Cliente') {
        $('#divAgente').css('display', 'block')
        $('#mdAsigEjePen').css('display', 'block');
    }
    else {
        $('#divAgente').css('display', 'none')
        $('#mdAsigEjePen').css('display', 'none');
    }

    //PARCHE PENSIONADO
    if (getCookie('Cargo') == 'Ejecutivos Incorporación y Prospección Pensionados' || getCookie('Cargo') == 'Ejecutivo Pensionado') {
        $('#tab_derivaciones').css('display', 'none')
        $('#tab_segcesantia').css('display', 'none')
        $('#tab_recuperaciones').css('display', 'none')
        $('#tab_preaprobados').css('display', 'none')
        $('#demo-lft-tab-5').css('display', 'none')

        $('[href="#demo-lft-tab-6"]').tab('show');
        $('[href="#demo-lft-tab-5"]').tab('hide');
    }

    $("#ges_subestado").on("change", function () {
        switch (this.value) {
            case "307":
                $('#divBancos').css('display', 'block');
                break;
            case "308":
                $('#divBancos').css('display', 'block');
                break;
        }
        if (this.value != '307' && this.value != '308') {
            $('#divBancos').css('display', 'none');
        }
    });


    //Ejecutivos Incorporación y Prospección Pensionados
    //Ejecutivo Pensiona
    // render.CargaEjecutivoPensionados();
    //render.CargaEstadosGestion();
    //GUARDA CONTACTO


    //nuevo medelo sergio
    /*
    $('#btn_contacto').on('click', function () {
        var estado;
        var con_form_Contacto = $('input:radio[name=rbContactoSIMedio]:checked').val()
        if (con_form_Contacto == undefined) {
            con_form_Contacto = 0
        }
        var con_no_fono = $('input:radio[name=rbContactoNoFono]:checked').val()
        if (con_no_fono == undefined) {
            con_no_fono = 0
        }
        var con_no_domi = $('input:radio[name=rbContactoNoDomi]:checked').val()
        if (con_no_domi == undefined) {
            con_no_domi = 0
        }
        if (con_form_Contacto != 0) {
            estado = con_form_Contacto;
        }
        else if (con_no_domi != 0) {
            estado = con_no_domi;
        }
        else if (con_no_fono != 0) {
            estado = con_no_fono;
        }

        var webSaveGestionPensionado = {
            con_contacto_uid: $('#txtId').val(),
            con_contacto: $('input:radio[name=inline-form-radioContacto]:checked').val(),
            con_forma_contacto: con_form_Contacto,
            con_no_contacto_fono: con_no_fono,
            con_no_contacto_domicilo: con_no_domi,
            con_no_observacion_contacto: $('#txtObservacionContacto').val(),
            con_ejecutivo_rut: getCookie('Rut'),
            con_oficina: getCookie("Oficina"),
            estado_gestion: estado,
        }

        if ($('input:radio[name=inline-form-radioContacto]:checked').val() == 'SI' && $('input:radio[name=rbContactoSIMedio]:checked').val() == undefined) {
            $.niftyNoty({
                type: 'danger',
                message: 'Debe Seleccionar una opción y observación',
                container: '#msjMantPensionado',
                timer: 4000
            });
            return false;
        }
        else if ($('input:radio[name=inline-form-radioContacto]:checked').val() == 'NO' && $('input:radio[name=rbContactoNoFono]:checked').val() == undefined && $('input:radio[name=rbContactoNoDomi]:checked').val() == undefined) {
            $.niftyNoty({
                type: 'danger',
                message: 'Debe Seleccionar las 2 opciones y observación',
                container: '#msjMantPensionado',
                timer: 4000
            });
            return false;
        }

        $.SecPostJSON(BASE_URL + "/motor/api/Gestion/guardar-contacto-pensionados", webSaveGestionPensionado, function (respuesta) {
            if (respuesta.Estado === "OK") {
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Se guardo Contacto Correctamente...',
                    container: '#msjMantPensionado',
                    timer: 4000
                });
                $('#txtObservacionContacto').val("");
                $('#btn_contacto').attr('disabled', true);
                if ($('input:radio[name=inline-form-radioContacto]:checked').val() == 'SI') {
                    //$('#btn_contacto').attr('disabled', false);
                    $('#etapaContacto').css('display', 'none');
                    $('#etapaDomicilio').css('display', 'none');
                    $('#etapaSucursal').css('display', 'none');
                    $('#etapaInteres').css('display', 'block');

                    $('#lbTitulo').html("Interes")
                }
                else {
                    $('#btn_contacto').attr('disabled', true);
                }
                render.ModalUltimoContacto($('#txtId').val());

                var RutEjec;
                if (getCookie('Cargo') != 'Agente' && getCookie('Cargo') != 'Jefe Servicio al Cliente') {
                    RutEjec = getCookie('Rut')
                }
                else {
                    RutEjec = $('#dllEjecutivo').val();
                }


                $("#tblAsigPen").bootstrapTable('refresh', {
                    url: BASE_URL + "/motor/api/Gestion/lista-pensionado",
                    query: {
                        Token: getCookie('Token'),
                        Nombre: $('#txtNombrePen').val(),
                        Comuna: $('#dllComunaPen').val(),
                        Prioridad: $('#dllPriorodadPen').val(),
                        EstadoGestion: $('#dllEstadoGestion').val(),
                        rutEjecutivo: RutEjec,
                    }
                });
            }
            else {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Error al Guardar Contacto...',
                    container: '#msjMantPensionado',
                    timer: 4000
                });
                $('#btn_contacto').attr('disabled', true);
            }
        });
    });

   /* $('#btn_interes_guardar').on('click', function () {
        var fecha;
        var fechaCompromete = $('#txtFechacita').val() + ' ' + $('#slHoraInteres').val();
        if (fechaCompromete == " " || fechaCompromete == "") {
            fechaCompromete = '01-01-1900';
        }

        var ges_subEstado_interes;
        var ges_estado_interes = $('input:radio[name=inline-form-radioInteres]:checked').val()
        if (ges_estado_interes == '1') {
            ges_subEstado_interes = $('input:radio[name=gRbInteresSI]:checked').val()
        }
        else if (ges_estado_interes == '2') {
            ges_subEstado_interes = $('input:radio[name=gRbInteresTerminada]:checked').val()
        }
        else if (ges_estado_interes == '3') {

            ges_subEstado_interes = $('input:radio[name=gRbInteresNoInteresado]:checked').val()

            //if ($('input:radio[name=gRbInteresNO]:checked').val() == 301) { //&& $('input:radio[name=gRbInteresNO]:checked').val() != 302) {

            //    ges_subEstado_interes = $('input:radio[name=gRbInteresNoInteresado]:checked').val()
            //}
            //else {
            //    ges_subEstado_interes = $('input:radio[name=gRbInteresNO]:checked').val()
            //}
        }

        var webSaveGestionContPensionado = {
            ges_bcam_uid: $('#txtId').val(),
            ges_fecha_compromete: fechaCompromete,
            ges_estado_gst: ges_estado_interes,
            ges_sub_estado_gst: ges_subEstado_interes,
            ges_descripcion_gst: $('#txt_interes_comentarios_pen').val(),
            ges_ejecutivo_rut: getCookie('Rut'),
            ges_oficina: getCookie("Oficina"),
            estado_gestion: ges_subEstado_interes,
            tags_conforme: [],
            tags_noQuiere: []
        }

        if (ges_estado_interes == '3' && $('input:radio[name=gRbInteresNoInteresado]:checked').val() == '303' && $('#selectNoInteresadoConforme').val().length == 0) {

            $.niftyNoty({
                type: 'danger',
                message: 'Debe seleccionar una opción',
                container: '#msjMantPensionado',
                timer: 4000
            });
            return false;
        }
        else {
            webSaveGestionContPensionado.tags_conforme = $('#selectNoInteresadoConforme').val();
        }

        if (ges_estado_interes == '3' && $('input:radio[name=gRbInteresNoInteresado]:checked').val() == '303' && $('#selectNoInteresadoConforme').val().length == 0) {

            $.niftyNoty({
                type: 'danger',
                message: 'Debe seleccionar una opción',
                container: '#msjMantPensionado',
                timer: 4000
            });
            return false;
        }
        else {
            webSaveGestionContPensionado.tags_conforme = $('#selectNoInteresadoConforme').val();
        }

        if (ges_estado_interes == '3' && $('input:radio[name=gRbInteresNoInteresado]:checked').val() == '307' && $('#selectNoQuiereEstar').val().length == 0) {
            $.niftyNoty({
                type: 'danger',
                message: 'Debe seleccionar una opción',
                container: '#msjMantPensionado',
                timer: 4000
            });
            return false;
        }
        else {
            webSaveGestionContPensionado.tags_noQuiere = $('#selectNoQuiereEstar').val();
        }


        if (ges_estado_interes == '1') {
            if ($('#txtFechacita').val() == "" || $('#slHoraInteres').val() == "" || $('input:radio[name=gRbInteresSI]:checked').val() == undefined) {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe seleccionar una opción e indicar fecha y hora',
                    container: '#msjMantPensionado',
                    timer: 4000
                });
                return false;
            }
        }
        if (ges_estado_interes == '2') {
            if ($('input:radio[name=gRbInteresTerminada]:checked').val() == undefined) {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe seleccionar una opción',
                    container: '#msjMantPensionado',
                    timer: 4000
                });
                return false;
            }
        }
        //if (ges_estado_interes == '3') {
        //    if ($('input:radio[name=gRbInteresNO]:checked').val() == undefined) {
        //        $.niftyNoty({
        //            type: 'danger',
        //            message: 'Debe seleccionar una opción',
        //            container: '#msjMantPensionado',
        //            timer: 4000
        //        });
        //        return false;
        //    }
        //}
        if (ges_estado_interes == '3') {
            if ($('input:radio[name=gRbInteresNoInteresado]:checked').val() == undefined) {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe seleccionar una opción',
                    container: '#msjMantPensionado',
                    timer: 4000
                });
                return false;
            }
        }

        $.SecPostJSON(BASE_URL + "/motor/api/Gestion/guardar-gestion-pensionados", webSaveGestionContPensionado, function (respuesta) {
            if (respuesta.Estado === "OK") {
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Gestión se guardo Correctamente...',
                    container: '#msjMantPensionado',
                    timer: 4000
                });
                render.CargaHistorialGestPensionados($('#txtId').val());
                render.ModalUltimaGestion($('#txtId').val());
                $('#txt_interes_comentarios_pen').val("");
                $('#txtFechacita').val("");
                $('#slHoraInteres').val("");
                $('#btn_interes').attr('disabled', false);
                $('#btn_interes_guardar').attr('disabled', true);
                limpiaModal();
                $("#tblAsigPen").bootstrapTable('refresh', {
                    url: BASE_URL + "/motor/api/Gestion/lista-pensionado",
                    query: {
                        Token: getCookie('Token'),
                        Nombre: $('#txtNombrePen').val(),
                        Comuna: $('#dllComunaPen').val(),
                        Prioridad: $('#dllPriorodadPen').val(),
                        EstadoGestion: $('#dllEstadoGestion').val(),
                        rutEjecutivo: getCookie('Rut'),
                    }
                });
            }
            else {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Error al Guardar Gestión...',
                    container: '#msjMantGestionPen',
                    timer: 4000
                });
                $('#btn_interes').attr('disabled', true);
                $('#btn_interes_guardar').attr('disabled', false);
            }
        });
    });

*/

    //NUEVO MODELO SERGIO

    /*

    $('#btn_interes').on('click', function () {
        if ($('#btn_interes').html() == 'Finalizar') {
            limpiaModal();
            $("#mdl_data_gestion_pensionado").modal('hide');
        }
    });


    $("input:radio[name=inline-form-radioContacto]").click(function () {
        switch (this.value) {
            case "SI":
                $("#paso1_No").css('display', 'none')
                $("#paso1_Si").css('display', 'block')
                $('input:radio[name=rbContactoNoFono]:checked').prop('checked', false)
                $('input:radio[name=rbContactoNoDomi]:checked').prop('checked', false)
                $('#btn_contacto').attr('disabled', false);
                render.ModalCargaRBContactoSI();
                break;
            case "NO":
                $("#paso1_Si").css('display', 'none')
                $("#paso1_No").css('display', 'block')
                //$('#btn_contacto_guardar').attr('disabled', false);
                $('#btn_contacto').attr('disabled', false);
                $('input:radio[name=rbContactoSIMedio]:checked').prop('checked', false);
                render.ModalCargaRBContactoNO();
                break;
        }
    });

    $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estado-gestion-contacto-pensionados", function (datos) {
        $("#divInteres").html("");
        var titulo;
        var posicion;

        var elUltimo = datos.find(function (dato) {
            return dato.eges_id == 2;
        })

        var lasFiltradas = datos.filter(function (dato) {
            return dato.eges_id != 2;
        })
        var elFinal = lasFiltradas;
        elFinal.push(elUltimo);

        $.each(elFinal, function (i, e) {
            if (e.eges_id == 1) {
                titulo = 'SI'
            }
            else if (e.eges_id == 3) {
                titulo = 'NO'
            }
            else {
                titulo = 'Gestión Terminada'
            }
            var lb = $('<label>').prop('for', `contacto-rdInteres-${e.eges_id}`).text(titulo);
            var inp = $('<input>').addClass('magic-radio').prop({ type: 'radio', name: 'inline-form-radioInteres', id: `contacto-rdInteres-${e.eges_id}` }).val(e.eges_id)
            $("#divInteres").append(inp).append(lb)
        });
        $("#divInteres").append(posicion)
    });


    $(document).on('click', 'input:radio[name=inline-form-radioInteres]', function () {
        switch (this.value) {
            case "1":
                $("#Interes_NO").css('display', 'none')
                $("#Interes_Terminada").css('display', 'none')
                $("#Interes_Si").css('display', 'block')
                $('#btn_interes').html("Finalizar")
                $('#txt_interes_comentarios_pen').val("");
                $('#txtFechacita').val("");
                $('#slHoraInteres').val("");
                $("#divInteresSI").html("");
                $('#btn_interes_guardar').attr('disabled', false);

                $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-subestado-gestion-pensionados", { Id_ges: 1 }, function (datos) {
                    $.each(datos, function (i, e) {
                        var lb = $('<label>').prop('for', `contacto-rdInteresSi-${e.eges_id}`).text(e.eges_nombre);
                        var inp = $('<input>').addClass('magic-radio').prop({ type: 'radio', name: 'gRbInteresSI', id: `contacto-rdInteresSi-${e.eges_id}` }).val(e.eges_id)
                        var dv = $('<div>').addClass('radio').css('margin-top', '-2px').append(inp).append(lb)
                        $("#divInteresSI").append(dv)
                    });
                });
                break;


            case "2":
                $("#Interes_Si").css('display', 'none')
                $("#Interes_NO").css('display', 'none')
                $("#Interes_Terminada").css('display', 'block')
                $('#btn_interes').html("Finalizar")
                $('#txt_interes_comentarios_pen').val("");
                $('#txtFechacita').val("");
                $('#slHoraInteres').val("");
                $("#divInteresTerminada").html("");
                $('#btn_interes_guardar').attr('disabled', false);
                $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-subestado-gestion-pensionados", { Id_ges: 2 }, function (datos) {
                    $.each(datos, function (i, e) {
                        var lb = $('<label>').prop('for', `contacto-rdInteresTerminada-${e.eges_id}`).text(e.eges_nombre);
                        var inp = $('<input>').addClass('magic-radio').prop({ type: 'radio', name: 'gRbInteresTerminada', id: `contacto-rdInteresTerminada-${e.eges_id}` }).val(e.eges_id)
                        var dv = $('<div>').addClass('radio').css('margin-top', '-2px').append(inp).append(lb)
                        $("#divInteresTerminada").append(dv)
                    });
                });
                break;
            case "3":
                $("#Interes_Si").css('display', 'none');
                $("#Interes_Terminada").css('display', 'none');
                $("#Interes_NO").css('display', 'block')
                //$('#divInteresNoInteresado').css('display', 'block');
                $('#btn_interes').html("Finalizar")
                $('#txt_interes_comentarios_pen').val("");
                $('#txtFechacita').val("");
                $('#slHoraInteres').val("");
                $("#divInteresNO").html("");
                $('#btn_interes_guardar').attr('disabled', false);


                $("#divInteresNoInteresado").html("");
                $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-subestado-gestion-pensionados", { Id_ges: 3 }, function (datos) {
                    $.each(datos, function (i, e) {
                        if (e.eges_id != '301' && e.eges_id != '302') {
                            var lb = $('<label>').prop('for', `interes-rdInteresNoInteresado-${e.eges_id}`).text(e.eges_nombre);
                            var inp = $('<input>').addClass('magic-radio').prop({ type: 'radio', name: 'gRbInteresNoInteresado', id: `interes-rdInteresNoInteresado-${e.eges_id}` }).val(e.eges_id)
                            var dv = $('<div>').addClass('radio').css('margin-top', '9px').append(inp).append(lb).append($('<div>').prop({ id: `divInteresNoInteresadoSub-${e.eges_id}` }).addClass('activarSub' + e.eges_id).css('display', 'none').css('margin-left', '40px'))
                            $("#divInteresNoInteresado").append(dv)
                        }
                    });

                });
                $('#divInteresNO').css('display', 'none');
                $('#divInteresNoInteresado').css('display', 'block');
                //  $('.activar').toggle();



                //$.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-subestado-gestion-pensionados", { Id_ges: 3 }, function (datos) {
                //    $.each(datos, function (i, e) {

                //        if (e.eges_id == '301' || e.eges_id == '302') {
                //            var lb = $('<label>').prop('for', `contacto-rdInteresNo-${e.eges_id}`).text(e.eges_nombre);
                //            var inp = $('<input>').addClass('magic-radio').prop({ type: 'radio', name: 'gRbInteresNO', id: `contacto-rdInteresNo-${e.eges_id}` }).val(e.eges_id);
                //            var dv = $('<div>').addClass('radio').css('margin-top', '-2px').append(inp).append(lb)
                //            $("#divInteresNO").append(dv)
                //        }
                //    });
                //    $("#divInteresNoInteresado").addClass('activar')
                //});
                break;
        }
    })


    $("input:radio[name=inline-form-radioDomicilio]").click(function () {
        switch (this.value) {
            case "SI":
                $("#DomicilioVisita_NO").css('display', 'none')
                $("#preguntaInteresDom").css('display', 'block')
                break;
            case "NO":
                $("#preguntaInteresDom").css('display', 'none')
                $("#DomicilioVisita_NO").css('display', 'block')
                $("#Domicilio_NO").css('display', 'none')
                $("#Domicilio_Si").css('display', 'none')
                $('#btn_domicilio').html("Siguiente")
                break;
        }
    });

    $("input:radio[name=inline-form-radioDomicilioInteresado]").click(function () {
        switch (this.value) {
            case "SI":
                $("#Domicilio_NO").css('display', 'none')
                $("#Domicilio_Si").css('display', 'block')
                $('#btn_domicilio').html("Siguiente")
                break;
            case "NO":
                $("#Domicilio_Si").css('display', 'none')
                $("#Domicilio_NO").css('display', 'block')
                $('#btn_domicilio').html("Finalizar")
                break;
        }
    });

    $("input:radio[name=inline-form-radioSucursal]").click(function () {
        switch (this.value) {
            case "SI":
                $("#SucursalVisita_NO").css('display', 'none')
                $("#preguntaInteresSurc").css('display', 'block')
                break;
            case "NO":
                $("#preguntaInteresSurc").css('display', 'none')
                $("#SucursalVisita_NO").css('display', 'block')
                $("#Sucursal_NO").css('display', 'none')
                $("#Sucursal_Si").css('display', 'none')
                break;
        }
    });

    $("input:radio[name=inline-form-radiordkSucursalInteresado]").click(function () {
        switch (this.value) {
            case "SI":
                $("#Sucursal_NO").css('display', 'none')
                $("#Sucursal_Si").css('display', 'block')
                break;
            case "NO":
                $("#Sucursal_Si").css('display', 'none')
                $("#Sucursal_NO").css('display', 'block')
                break;
        }
    });

    var result = [];
    $('#btAsignarPensionado').click(function () {

        if ($("#dllEjecutivo").val() != "") {
            var malos = []
            var buenos = 0;
            $.each(result, function (i, e) {
                var webPensionado = {
                    Token: getCookie('Token'),
                    Rut_Ejecutivo: $("#dllEjecutivo").val(),
                    id_Asign: result[i],
                }
                $.SecPostJSON(BASE_URL + "/motor/api/Gestion/asigna-ejecutivo-pensionado", webPensionado, function (respuesta) {
                    if (respuesta.Estado === "OK") {
                        $('input[type="checkbox"]').prop('checked', false);
                        result = []
                        buenos++;
                    }
                    else {
                        malos.push(e)
                    }
                });
            });
            setTimeout(function () {
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: '<strong>OK..</strong>Se Asignaron ' + buenos + ' Pensionados  Correctamente...!',
                    container: '#msjAsigPensionado',
                    timer: 4000
                });
            }, 100);
            $('#dllEjecutivo').val('0')
        }
        else {
            $.niftyNoty({
                type: 'danger',
                message: '<strong>Error..</strong> Debe Seleccionar un Ejecutivo!',
                container: '#msjAsigPensionado',
                timer: 4000
            });
        }
    });

    $('#tblAsigPen').on('check.bs.table uncheck.bs.table check-all.bs.table uncheck-all.bs.table', function (e, row) {
        result.length = 0;
        var i = 0;
        $("input[type=checkbox]:checked").each(function () {
            if ($(this).parent().parent().find('td').eq(1).text() != "") {
                result[i] = $(this).parent().parent().find('td').eq(1).text();
                ++i;
            }
        });
        $("#cantPensScheck").html(result['length'])
        console.log(result);
    });

    $('#btn_filtroPen').click(function () {
        var RutEjec;
        if (getCookie('Cargo') != 'Agente' && getCookie('Cargo') != 'Jefe Servicio al Cliente') {
            RutEjec = getCookie('Rut')
        }
        else {
            RutEjec = $('#dllEjecutivo').val();
        }

        $("#tblAsigPen").bootstrapTable('refresh', {
            url: BASE_URL + "/motor/api/Gestion/lista-pensionado",
            query: {
                Token: getCookie('Token'),
                Nombre: $('#txtNombrePen').val(),
                Comuna: $('#dllComunaPen').val(),
                Prioridad: $('#dllPriorodadPen').val(),
                EstadoGestion: $('#dllEstadoGestionPadre').val(),
                //EstadoSubGestion: $('#dllEstadoGestion').val(),Araucana.08
                rutEjecutivo: RutEjec,
            }
        });
    });

    $('#modalAsignacion').click(function () {
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

    */

    /* NUEVO MEDELO SERGIO
    $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-comuna-oficina-pensionados", { Token: getCookie('Token') }, function (menus) {
        $("#dllComunaPen").html("");
        $("#dllComunaPen").append($("<option>").attr("value", "").html("Todos"));

        $.each(menus, function (i, e) {
            $("#dllComunaPen").append($("<option>").attr("value", e.COMUNA).html(e.COMUNA))
        });
        $('#dllComunaPen').chosen({
            width: '100%'
        });
    });*/

    //NUEVO MEDELO SERGIO
    /*
    $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-comuna-pensionados", function (menus) {
        $("#pen_comuna").html("");
        $("#pen_comuna").append($("<option>").attr("value", "").html("Seleccione..."));

        $.each(menus, function (i, e) {
            $("#pen_comuna").append($("<option>").attr("value", e.COMUNA).html(e.COMUNA))
        });
        $('#pen_comuna').chosen({
            width: '100%'
        });
    });
    */

    // NUEVO MODELO SERGIO
    /*
    $('#PrintPensionados').click(function () {
        if (result['length'] != 0) {
            var openEnderContent = $('#tblPrinPensionado').html()
            var numero = 1;
            $('#printPensionado').css('display', 'block')
            $('#tblPrinPensionado').css('display', 'block')
            $.each(result, function (i, e) {
                $.SecGetJSON(BASE_URL + "/motor/api/Gestion/print-pensionados", { id_Asign: result[i] }, function (respuesta) {
                    var newTable = $('#base-table').clone();
                    newTable.show().appendTo('#tblPrinPensionado')
                    newTable.find(`td:contains('([id])')`).text('ID: ' + result[i] + ' / CODIGO: ' + respuesta[0].codigo);
                    newTable.find(`td:contains('([email])')`).text('Email: ' + respuesta[0].Mail);
                    newTable.find(`td:contains('([name])')`).text(respuesta[0].NombrePensionado);
                    newTable.find(`td:contains('([phone])')`).text(respuesta[0].FonoParticular + ' / ' + respuesta[0].FonoCelular);
                    newTable.find(`td:contains('([address])')`).text(respuesta[0].Direccion);
                    newTable.find(`td:contains('([city])')`).text(respuesta[0].Comuna);
                    if (numero !== 1 && numero % 2 !== 0) {
                        newTable.css('page-break-before', 'always').css('margin-top', '50px');
                    }
                    numero++;
                });
            });

            $('#printPensionado').printThis();
            setTimeout(function () {
                $('#printPensionado').css('display', 'none')
                $('#tblPrinPensionado').css('display', 'none')
                $('input[type="checkbox"]').prop('checked', false);
                $('#tblPrinPensionado').html(openEnderContent)
                result = []
            }, 3000);
        }
        else {
            $.niftyNoty({
                type: 'warning',
                container: 'floating',
                html: '<strong>Error..</strong> Debe Seleccionar Pensionados antes de Imprimir!',
                focus: false,
                timer: 5000
            });
        }
        $('.cancel-button').click(function () {
            $('#printPensionado').hide()
            $('#tblPrinPensionado').css('display', 'none')
        });
    });

    $('#btn_edit_contact_pensionado').click(function () {
        $('#pen_comuna').prop('disabled', false).trigger("chosen:updated");
        $('#pen_direccion').removeAttr("disabled");
        $('#pen_fono_1').removeAttr("disabled");
        $('#pen_fono_2').removeAttr("disabled");
        $('#pen_correo').removeAttr("disabled");
        $('#pen_N_direccion').removeAttr("disabled");
        $('#btn_save_contact_pensionado').attr('disabled', false);
    });

    $('#form-info-pensionado').bootstrapValidator({
        excluded: [':disabled', ':not(:visible)'],
        feedbackIcons: [],
        excluded: [':disabled'],
        fields: {
            pen_fono_2: {
                validators: {
                    notEmpty: {
                        message: 'Ingrese un fono particular'
                    },
                    integer: {
                        message: 'Debe ingresar solo numeros'
                    }
                }
            },
            pen_fono_1: {
                validators: {
                    notEmpty: {
                        message: 'Ingrese un celular'
                    },
                    integer: {
                        message: 'Debe ingresar solo numeros'
                    }
                }
            },
            pen_direccion: {
                validators: {
                    notEmpty: {
                        message: 'Ingrese dirección'
                    }
                }
            },
            pen_N_direccion: {
                validators: {
                    notEmpty: {
                        message: 'Ingrese numero de dirección'
                    },
                    integer: {
                        message: 'Debe ingresar solo numeros'
                    }
                }
            },
            pen_comuna: {
                validators: {
                    notEmpty: {
                        message: 'Ingrese una comuna'
                    }
                }
            },
            pen_correo: {
                validators: {
                    notEmpty: {
                        message: 'Ingresar un correo electronico'
                    },
                    regexp: {
                        regexp: '^[^@\\s]+@([^@\\s]+\\.)+[^@\\s]+$',
                        message: 'Ingrese un correo valido'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        var $form = $(e.target);
        var webUpdateContactPensionado = {
            id_Asign: $('#txtId').val(),
            FonoParticular: $('#pen_fono_2').val(),
            FonoCelular: $('#pen_fono_1').val(),
            Direccion: $('#pen_direccion').val(),
            N_direccion: $('#pen_N_direccion').val(),
            Comuna: $('#pen_comuna option:selected').text(),
            Mail: $('#pen_correo').val(),
        }
        $.SecPostJSON(BASE_URL + "/motor/api/Gestion/update-contacto-pensionados", webUpdateContactPensionado, function (respuesta) {
            if (respuesta.Estado === "OK") {
                $('#btn_save_contact_pensionado').attr('disabled', true);
                $('#pen_comuna').prop('disabled', true).trigger("chosen:updated");
                $('#pen_direccion').attr("disabled", true);
                $('#pen_fono_1').attr("disabled", true);
                $('#pen_fono_2').attr("disabled", true);
                $('#pen_correo').attr("disabled", true);
                $('#pen_N_direccion').attr("disabled", true);

                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Datos de Contacto Actualizado Correctamente...',
                    container: '#msjMantPensionadoContacto',
                    timer: 4000
                });
            }
            else {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Error al Actualizar Contacto...',
                    container: '#msjMantPensionadoContacto',
                    timer: 4000
                });
            }
        });
    });

    $("#mdl_data_gestion_pensionado").on("show.bs.modal", function (event) {
        var id = $(event.relatedTarget).data("id")
        $("#form-info-pensionado").bootstrapValidator('resetForm', true);
        $('#txtId').attr("disabled", true);
        $('#pen_estado').attr("disabled", true);
        $('#pen_nombre').attr("disabled", true);
        $('#btn_save_contact_pensionado').attr('disabled', true);

        $.SecGetJSON(BASE_URL + "/motor/api/Gestion/print-pensionados", { id_Asign: id }, function (respuesta) {
            $('#txtId').val(id)
            $('#pen_nombre').val(respuesta[0].NombrePensionado)
            $('#pen_comuna ').val(respuesta[0].Comuna).trigger('chosen:updated');
            $('#pen_direccion').val(respuesta[0].Direccion)
            $('#pen_N_direccion').val(respuesta[0].N_direccion)
            $('#pen_estado').val($(event.relatedTarget).data("estado"))
            $('#pen_fono_1').val(respuesta[0].FonoCelular)
            $('#pen_fono_2').val(respuesta[0].FonoParticular)
            $('#pen_correo').val(respuesta[0].Mail)
            $('#codPensionado').html(respuesta[0].codigo)

            $('#pen_comuna ').prop('disabled', true).trigger("chosen:updated");
            $('#pen_direccion').attr("disabled", true);
            $('#pen_N_direccion').attr("disabled", true);
            $('#pen_fono_1').attr("disabled", true);
            $('#pen_fono_2').attr("disabled", true);
            $('#pen_correo').attr("disabled", true);
        });
        render.ModalCargaRB_ANGT();
        render.ModalCargaRBContactoSI();
        render.ModalCargaRBContactoNO();
        render.CargaHistorialGestPensionados(id);
        render.ModalUltimoContacto(id);
        render.ModalUltimaGestion(id);
    });

    $("#mdl_data_gestion_pensionado").on("shown.bs.modal", function (event) {
        console.log({ bandera_bloqueo_elementos })
        if (bandera_bloqueo_elementos) {
            $("input[name=gRbInteresNoInteresado]").attr("disabled", "disabled");
            bandera_bloqueo_elementos = false;
        }
    });

    $("#mdl_data_gestion_pensionado").on("hidden.bs.modal", function () {
        limpiaModal();
    });

    function limpiaModal() {
        $('#btn_save_contact_pensionado').attr('disabled', true);
        $('#pen_comuna').prop('disabled', true).trigger("chosen:updated");
        $('#pen_direccion').attr("disabled", true);
        $('#pen_fono_1').attr("disabled", true);
        $('#pen_fono_2').attr("disabled", true);
        $('#pen_correo').attr("disabled", true);
        $('#pen_N_direccion').attr("disabled", true);


        $('#paso1_Si').css('display', 'none');
        $('#paso1_No').css('display', 'none');
        $("input[name=inline-form-radioContacto]").prop('checked', false);
        $("input[name=rbContactoSIMedio]").prop('checked', false);
        $("input[name=rbContactoNoFono]").prop('checked', false);
        $("input[name=rbContactoNoDomi]").prop('checked', false);
        $('#txtObservacionContacto').val("")
        //$('#btn_contacto_guardar').attr('disabled', true);
        $('#btn_contacto').attr('disabled', true);
        $('#lbTitulo').html('Contacto')

        $('#Interes_Si').css('display', 'none');
        $('#Interes_Terminada').css('display', 'none');
        $('#Interes_NO').css('display', 'none');
        $("input[name=inline-form-radioInteres]").prop('checked', false);
        $("input[name=gRbInteresSI]").prop('checked', false);
        $("input[name=gRbInteresTerminada]").prop('checked', false);
        //$("input[name=gRbInteresNO]").prop('checked', false);
        $('#txt_interes_comentarios_pen').val("")
        $('#txtFechacita').val("")
        $('#slHoraInteres').val("")
        $('#btn_interes_guardar').attr('disabled', true);
    }

    $('#mdl_data_gestion_pensionado').on('show.bs.modal', function () {
        $('#dp-component-pensionados-interes .input-group.date').datepicker(
            { autoclose: true, format: 'dd-mm-yyyy', language: "es", daysOfWeekDisabled: [6, 0], todayHighlight: true }
        ).on('changeDate', function (event) {
            event.stopPropagation();
        }).on('show.bs.modal hide.bs.modal', function (event) {
            event.stopPropagation();
        });
    });

    $("#btn_savearPensionado").click(function (ev) {
        // mouse click on button
        ev.stopPropagation();
    });


    /// NUEVOS CAMBIO DE GESTION PENSIONADOS


    //$(document).on('click', 'input:radio[name=gRbInteresNO]', function () {
    //    switch (this.value) {
    //        case "301":
    //            $("#divInteresNoInteresado").html("");
    //            $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-subestado-gestion-pensionados", { Id_ges: 3 }, function (datos) {
    //                $.each(datos, function (i, e) {
    //                    if (e.eges_id != '301' && e.eges_id != '302') {
    //                        var lb = $('<label>').prop('for', `interes-rdInteresNoInteresado-${e.eges_id}`).text(e.eges_nombre);
    //                        var inp = $('<input>').addClass('magic-radio').prop({ type: 'radio', name: 'gRbInteresNoInteresado', id: `interes-rdInteresNoInteresado-${e.eges_id}` }).val(e.eges_id)
    //                        var dv = $('<div>').addClass('radio').css('margin-top', '9px').append(inp).append(lb).append($('<div>').prop({ id: `divInteresNoInteresadoSub-${e.eges_id}` }).addClass('activarSub' + e.eges_id).css('display', 'none').css('margin-left', '40px'))
    //                        $("#divInteresNoInteresado").append(dv)
    //                    }
    //                });

    //            });
    //            $('#divInteresNO').css('display', 'none');
    //            $('#divInteresNoInteresado').css('display', 'block');
    //            //  $('.activar').toggle();
    //            break;
    //        case "302":
    //            $('.activar').hide();
    //            $("input[name=gRbInteresNoInteresado]").prop('checked', false);
    //            break;
    //    }

    //})

    $(document).on('click', 'input:radio[name=gRbInteresNoInteresado]', function () {
        switch (this.value) {
            case "303":
                $("#divInteresNoInteresadoSub-303").html("");
                $("#divInteresNoInteresadoSub-307").html("");
                var lb = $('<label>').prop('for', `selectNoInteresadoConforme`).addClass('sr-only').text('Conforme en su Caja');
                var inp = $('<select>').prop({ id: 'selectNoInteresadoConforme', tabindex: '4', 'multiple': true }).data('placeholder', 'Seleccione..')                //.prop({ type: 'radio', name: 'gRbInteresNoInteresadoSalud', id: `interes-rdInteresNoInteresadoSalud-${e.egesNo_id}` }).val(e.egesNo_id)
                var dv = $('<div>').addClass('radio').css('margin-top', '9px').append(inp).append(lb)
                $('#divInteresNoInteresadoSub-303').append(dv)
                $("#selectNoInteresadoConforme").html("");

                $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-subestado-gestion-pensionados", { Id_ges: 303 }, function (datos) {
                    $.each(datos, function (i, e) {
                        $.each(datos, function (i, e) {
                            $("#selectNoInteresadoConforme").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre))
                        });
                        $('#selectNoInteresadoConforme').chosen({
                            width: '100%'
                        });
                    });
                });
                $('.activarSub303').toggle();
                break;
            case "304":
                $("#divInteresNoInteresadoSub-303").html("");
                $("#divInteresNoInteresadoSub-307").html("");
                break;
            case "305":
                $("#divInteresNoInteresadoSub-303").html("");
                $("#divInteresNoInteresadoSub-307").html("");
                break;
            case "306":
                $("#divInteresNoInteresadoSub-303").html("");
                $("#divInteresNoInteresadoSub-307").html("");
                break;

            case "307":
                $("#divInteresNoInteresadoSub-307").html("");
                $("#divInteresNoInteresadoSub-303").html("");
                var lb = $('<label>').prop('for', `selectNoQuiereEstar`).addClass('sr-only').text('No Quiere estar en La Araucana');
                var inp = $('<select>').prop({ id: 'selectNoQuiereEstar', tabindex: '4', 'multiple': true }).data('placeholder', 'Seleccione..')                //.prop({ type: 'radio', name: 'gRbInteresNoInteresadoSalud', id: `interes-rdInteresNoInteresadoSalud-${e.egesNo_id}` }).val(e.egesNo_id)
                var dv = $('<div>').addClass('radio').css('margin-top', '9px').append(inp).append(lb)
                $('#divInteresNoInteresadoSub-307').append(dv)
                $("#selectNoQuiereEstar").html("");

                $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-subestado-gestion-pensionados", { Id_ges: 307 }, function (datos) {
                    $.each(datos, function (i, e) {
                        $.each(datos, function (i, e) {
                            $("#selectNoQuiereEstar").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre))
                        });
                        $('#selectNoQuiereEstar').chosen({
                            width: '100%'
                        });
                    });
                });
                $('.activarSub307').toggle();
                break;
            case "308":
                $("#divInteresNoInteresadoSub-303").html("");
                $("#divInteresNoInteresadoSub-307").html("");
                break;
        }

    })


    $('#dllEstadoGestionPadre').change(function (e) {
        e.preventDefault();
        $("#dllEstadoGestion").html("");
        if ($(this).val() != 0) {
            $.SecGetJSON(BASE_URL + "/motor/api/Gestion/lista-estado-sub-gestion", { padre: $(this).val() }, function (datos) {

                $("#dllEstadoGestion").append($("<option>").attr("value", "0").html("Todos"));
                $.each(datos, function (i, e) {
                    $("#dllEstadoGestion").append($("<option>").attr("value", e.eges_id).html(e.eges_nombre))
                });
            });
        }
        else {
            $("#dllEstadoGestion").append($("<option>").attr("value", "0").html("Todos"));
        }

    });

*/

    //-----------------PROSPECTOS-------PESNIONADOS------------------------------------------------------

    render.ListaProspectoPensionados();

    $.SecGetJSON(BASE_URL + "/motor/api/perfil-empresas/lista-comunas-empresa", function (menus) {
        $("#slpropComuna").html("");
        $("#slpropComuna").append($("<option>").attr("value", "").html("Seleccione"));
        $.each(menus, function (i, e) {
            $("#slpropComuna").append($("<option>").attr("value", e.IdComuna).html(e.NombreComuna))
        });
        $('#slpropComuna').chosen({
            width: '100%'
        });
    });


    $('#frm_prospecto').bootstrapValidator({
        excluded: [':disabled', ':not(:visible)'],
        feedbackIcons: [],
        excluded: [':disabled'],
        fields: {
            propRut: {
                validators: {
                    notEmpty: {
                        message: 'Debe ingresar un Rut'
                    }
                }
            },
            propNombres: {
                validators: {
                    notEmpty: {
                        message: 'Debe ingresar nombres'
                    }
                }
            },
            propEdad: {
                validators: {
                    notEmpty: {
                        message: 'Debe ingresar una edad'
                    },
                    integer: {
                        message: 'Debe ingresar solo numeros'
                    }
                }
            },
            slpropCajaOrigen: {
                validators: {
                    notEmpty: {
                        message: 'Debe seleccionar una caja de origen'
                    }
                }
            },
            propRenta: {
                validators: {
                    notEmpty: {
                        message: 'Debe ingresar una renta aprox.'
                    },
                    integer: {
                        message: 'Debe ingresar solo numeros'
                    }
                }
            },
            propCelular: {
                validators: {
                    notEmpty: {
                        message: 'Debe ingresar un N° de celular'
                    },
                    integer: {
                        message: 'Debe ingresar solo numeros'
                    }
                }
            },
            //propFono: {
            //    validators: {
            //        notEmpty: {
            //            message: 'Debe ingresar un Fono Fijo'
            //        },
            //        integer: {
            //            message: 'Debe ingresar solo numeros'
            //        }
            //    }
            //},
            //propEmail: {
            //    validators: {
            //        notEmpty: {
            //            message: 'Debe ingresar un electronico'
            //        },
            //        regexp: {
            //            regexp: '^[^@\\s]+@([^@\\s]+\\.)+[^@\\s]+$',
            //            message: 'Ingrese un correo valido'
            //        }
            //    }
            //},
            propCalle: {
                validators: {
                    notEmpty: {
                        message: 'Debe ingresar nombre de calle'
                    }
                }
            },
            propDirNumero: {
                validators: {
                    notEmpty: {
                        message: 'Debe ingresar un N° de dirección'
                    },
                    integer: {
                        message: 'Debe ingresar solo numeros'
                    }
                }
            },
            slpropComuna: {
                validators: {
                    notEmpty: {
                        message: 'Debe seleccionar una comuna'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        var $form = $(e.target);

        var objeto_envio_prospecto = {
            Rut_Pensionado: $('#propRut').val(),
            Nombre: $('#propNombres').val(),
            Edad: $('#propEdad').val(),
            Caja_Origen: $('select[name="slpropCajaOrigen"] option:selected').text(),
            Renta_Aproximada: $('#propRenta').val(),
            Celular: $('#propCelular').val(),
            Fono_Fijo: $('#propFono').val(),
            Email: $('#propEmail').val(),
            Direccion_Calle: $('#propCalle').val(),
            Direccion_Numero: $('#propDirNumero').val(),
            Direccion_Dpto: $('#propDirDpto').val(),
            Comuna: $('select[name="slpropComuna"] option:selected').text(),
            Rut_Ejecutivo: getCookie('Rut'),
            Cod_Sucursal: getCookie("Oficina")
        }
        $.SecPostJSON(BASE_URL + "/motor/api/Gestion/ingresa-pensionado-prospecto", objeto_envio_prospecto, function (datos) {

            if (datos.Estado === "OK") {
                $("#frm_prospecto").bootstrapValidator('resetForm', true);
                $('#propDirDpto').val("");
                $('#slpropComuna').val('').trigger('chosen:updated');
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Datos Guardado correctamente.',
                    container: '#msjSaveProspecto',
                    timer: 3000
                });
                render.ListaProspectoPensionados();
            }
            else if (datos.Estado === "ERROR") {
                $.niftyNoty({
                    type: 'danger',
                    message: datos.Mensaje,
                    container: '#msjSaveProspecto',
                    timer: 6000
                });
            }
        });

    });
});

function formateaRenta(val) {
    return val.toMoney(0);
}


$(function () {



    // $('#mdl_data').on('show.bs.modal', function (e) {
    $('#bTam3').on('click', function (e) {


        //var rt = $(e.relatedTarget).data("sergio")
        //alert(rt)
        $("#mdl_data").modal("show");


        //let fechaHoy = new Date();
        //let periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');

        ////  alert(rutM)

        //$.SecGetJSON(BASE_URL + "/motor/api/Gestion/obtener-seguimiento", { periodo: periodo, afiRut: '3982961-4', tipoCampagna: 1 }, function (datos) {

        //    // console.log('datos afi: ' + { sergio: datos })
        //});







        //$.SecPostJSON(BASE_URL + "/motor/api/Gestion/v3/lista-seguimientos", {
        //    tipoCampagna: 1,
        //    periodo: 202009,
        //    estado: '',
        //    subestado: '',
        //    marca: '',
        //    prioridad: '',
        //    segmento: '',
        //    tipo: '',
        //    busEmpresa: '',
        //    rut: '3982961-4',
        //    vencimiento: ''
        //}, function (datos) {
        //    console.log('datos afi: ' + datos)

        //});
    });

})


