﻿window.Tipo_accion;
function ValidaEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

var Fn = {
    validaRut: function (rut) {
        debugger;
        var rutCompleto = rut.replace(".", "").replace(".", "");
        if (!/^[0-9]+-[0-9kK]{1}$/.test(rutCompleto))
            return false;
        var tmp = rutCompleto.split('-');
        var digv = tmp[1];
        var rut = tmp[0];
        if (digv == 'K') digv = 'k';
        return (Fn.dv(rut) == digv);
    },
    dv: function (T) {
        var M = 0,
            S = 1;
        for (; T; T = Math.floor(T / 10))
            S = (S + T % 10 * (9 - M++ % 6)) % 11;
        return S ? S - 1 : 'k';
    }
}


function eliminar(rut) {
    bootbox.confirm({
        size: "medium",
        title: "Este Usuario se borrará definitivamente del sistema",
        message: "¿Desea hacerlo?",
        
        buttons: {
            confirm: {
                label: 'Si, eliminar',
                className: 'btn-warning'
            },
            cancel: {
                label: 'No, no estoy seguro/a',
                className: 'btn-danger'
            }
        },
        callback: function (result) {

            if (result) {
                var WebUsuarioIngreso = {
                    RutUsuario: rut,

                }
                $.SecPostJSON(BASE_URL + "/motor/api/mantenedores/Eliminar-Usuario", WebUsuarioIngreso, function (respuesta) {

                    debugger;
                    if (respuesta.Estado == 'OK') {
                        debugger;
                        $.niftyNoty({
                            type: 'success',
                            message: '<strong>Usuario Eliminado Correctamente!!!</strong>',
                            container: 'floating',
                            icon: 'pli-like-2 icon-2x',
                            timer: 2000,
                            onHidden: function () {
                                $("#txtrut").val('');
                                metodos.CargaGrillaListaUsuario($("#txtrut").val().replace(".", "").replace(".", ""));
                            }

                        });

                    }
                });

            }
        }
    });
}

var metodos = {

    CargaGrillaListaUsuario: function (Rut) {

        $("#tblUsuarios").bootstrapTable('refresh', {
            url: '/motor/api/mantenedores/listar-Usuarios',
            query: {
                Rut: Rut,
                Oficina: getCookie("Oficina"),
                RutEjecutivo: getCookie("Rut")
            }
        });
    },
    CargaComboOficinas: function () {
        $.SecGetJSON(BASE_URL + "/motor/api/mantenedores/listar-Oficinas", function (datos) {
            $("#ddloficina").html("");
            $("#ddloficina").append($("<option>").val(0).html("Seleccione").data("id", 0).data("nombre", "Seleccione"));
            $.each(datos, function (i, oficina) {
               $("#ddloficina").append($("<option>").val(oficina.codOficina).html(oficina.DescOficina).data("id", oficina.codOficina).data("nombre", oficina.DescOficina));
            });

        });
    },
    CargaComboCargos: function () {
        $.SecGetJSON(BASE_URL + "/motor/api/mantenedores/listar-Cargos", function (datos) {
            $("#ddlcargos").html("");
            $("#ddlcargos").append($("<option>").val("Seleccione").html("Seleccione").data("id", "Seleccione").data("nombre", "Seleccione"));
            $.each(datos, function (i, cargo) {

                $("#ddlcargos").append($("<option>").val(cargo.Nombre).html(cargo.Nombre).data("id", cargo.Nombre).data("nombre", cargo.Nombre));
            });

        });
    },
    ValiaExsiteUsuario: function (Rut) {
        $.SecGetJSON(BASE_URL + "/motor/api/mantenedores/listar-Usuarios", { Rut: Rut, Oficina: getCookie("Oficina"), RutEjecutivo: getCookie("Rut") }, function (datos) {
           
            if (datos.length > 0) {
                $.niftyNoty({
                    type: 'danger',
                    message: '<strong>Error !!!</strong> <li>Usuario ya está ingresado en el sistema!!!</li>',
                    container: '#msjerror',
                    icon: 'pli-unlike-2 icon-2x',
                    timer: 3000
                });
                $('#btn-guardar').prop("disabled", true);
                $("#ddloficina").prop("disabled", true);
                $("#ddlcargos").prop("disabled", true);
                $("#txtrutUsuario").focus();
                return false;
            }
            else {
                $('#btn-guardar').prop("disabled", false);
                $("#ddloficina").prop("disabled", false);
                $("#ddlcargos").prop("disabled", false);
            }
        });
    }
}
function digitalLinkFormatter(value, row, index) {

    let Nombre = row.Nombre.replace(" ", "%").replace(" ", "%").replace(" ", "%").replace(" ", "%").replace(" ", "%").replace(" ", "%")
    let Cargo = row.Cargo.replace(" ", "%").replace(" ", "%").replace(" ", "%").replace(" ", "%").replace(" ", "%").replace(" ", "%")
    return `<a class="btn btn-primary mar-lft btn-rounded" title="Datos usuario" data-target="#modal-usuarios" data-toggle="modal" data-Rut=${row.Rut} data-Nombre=${Nombre} data-suc=${row.Cod_Sucursal} data-correo=${row.Correo} data-cargo=${Cargo} data-tipo="editar"><i class="ion-edit btn-rounded"></i></a>
            <a class="btn btn-danger float-right btn-rounded" title="Eliminar" href="javascript:eliminar(${row.Rut.replace('-', '')})"><i class="ion-trash-a"></i></a>
`;



}
$.fn.datepicker.dates['es'] = {
    days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
    daysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    daysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"],
    months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
    monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    today: "Hoy",
    clear: "Borrar",
    format: "dd/mm/yyyy",
    titleFormat: "MM yyyy", /* Leverages same syntax as 'format' */
    weekStart: 1
};
$(function () {


    //******************** Load js***************
    metodos.CargaComboOficinas();
    metodos.CargaGrillaListaUsuario($("#txtrut").val().replace(".", "").replace(".", ""));
    metodos.CargaComboCargos();
   
    $("#txtrut").inputmask({ mask: "9[9.999.999]-[9|A]", });


    $("#txtrutUsuario").on("blur", function (e) {


        if (Fn.validaRut($("#txtrutUsuario").val())) {
            debugger;
            e.preventDefault();
            metodos.ValiaExsiteUsuario($("#txtrutUsuario").val().replace(".", "").replace(".", ""));
        }
        else {
            debugger;
            e.preventDefault();
            $.niftyNoty({
                type: 'danger',
                message: '<strong>Error !!!</strong><li>Rut Ingresado no es Válido</li>',
                container: '#msjerror',
                icon: 'pli-unlike-2 icon-2x',
                timer: 3000
            });
            $("#txtrutUsuario").focus();
            $('#btn-guardar').prop("disabled", true);
            $("#ddloficina").prop("disabled", true);
            $("#ddlcargos").prop("disabled", true);
            return false;
           
        }
    });



    $('#btn_buscar').on("click", function () {

        metodos.CargaGrillaListaUsuario($("#txtrut").val().replace(".", "").replace(".", ""));
    });



    $('#btn-guardar').on("click", function () {

        var mensajes = '';
        if (Tipo_accion == "editar") {
            if ($('#ddloficina').val() == "0") {
                mensajes = "<li>Debe seleccionar sucursal</li>" + mensajes
            }
            if ($('#ddlcargos').val() == "Seleccione") {
                mensajes = "<li>Debe seleccionar cargo</li>" + mensajes
            }


            if (mensajes != "") {
                $.niftyNoty({
                    type: 'danger',
                    message: '<strong>Error !!!</strong>' + mensajes,
                    container: '#msjerror',
                    icon: 'pli-unlike-2 icon-2x',
                    timer: 3000
                });
                return false;
            }
        }
        if (Tipo_accion == "nuevo") {


            if ($("#txtrutUsuario").val() == "") {
                mensajes = "<li>Debe Ingresar Rut Usuario</li>" + mensajes
            }

            if ($("#txtNombreUsuario").val() == "") {
                mensajes = "<li>Debe Ingresar Nombre Usuario</li>" + mensajes
            }

            if ($('#ddloficina').val() == "0") {
                mensajes = "<li>Debe Seleccionar Oficina</li>" + mensajes
            }
            if ($('#ddlcargos').val() == "Seleccione") {
                mensajes = "<li>Debe Seleccionar Cargo</li>" + mensajes
            }
            if ($("#txtCorreo").val() == "") {
                mensajes = "<li>Debe Ingresar Correo de Usuario</li>" + mensajes
            }

            //if ($('#txtCorreo').val() != '') {
            //    var regex = /[\w-\.]{2,}@@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
            //    if (!regex.test($('#txtCorreo').val().trim())) {
            //        mensajes = "<li>Formato de Correo no es válido</li>" + mensajes
            //   }

            //}
            if (ValidaEmail($("#txtCorreo").val()) == false) {
                mensajes = "<li>Formato de Correo no es válido</li>" + mensajes
            }

            if (mensajes != "") {
                $.niftyNoty({
                    type: 'danger',
                    message: '<strong>Error !!!</strong>' + mensajes,
                    container: '#msjerror',
                    icon: 'pli-unlike-2 icon-2x',
                    timer: 3000
                });
                return false;
            }

        }

        var WebUsuarioIngreso = {
            RutUsuario: $("#txtrutUsuario").val().replace(".", "").replace(".", ""),
            NombreUsuario: $("#txtNombreUsuario").val(),
            oficina: $("#ddloficina").val(),
            Cargo: $("#ddlcargos").val(),
            Correo: $("#txtCorreo").val(),
        }


        $.SecPostJSON(BASE_URL + "/motor/api/mantenedores/Ingreso-Usuario", WebUsuarioIngreso, function (respuesta) {

            if (respuesta.estado = 'OK') {

                $.niftyNoty({
                    type: 'success',
                    message: '<strong>Datos Guardados Correctamente!!!</strong>',
                    container: '#msjerror',
                    icon: 'pli-like-2 icon-2x',
                    timer: 3000

                });
            }
        });



    });

    //*************************Modal Usuarios ***********************

    $('#modal-usuarios').on('hidden.bs.modal', async (event) => {
     
        metodos.CargaGrillaListaUsuario($("#txtrut").val());
    });



   




    $('#modal-usuarios').on('show.bs.modal', async (event) => {
     

        Tipo_accion = $(event.relatedTarget).data('tipo')
        if (Tipo_accion == "editar") {
            $("#txtrutUsuario").unmask()
            let Rut = $(event.relatedTarget).data('rut')
            let Nombre = $(event.relatedTarget).data('nombre')
            let sucursal = $(event.relatedTarget).data('suc')
            let Cargo = $(event.relatedTarget).data('cargo')
            let Correo = $(event.relatedTarget).data('correo')
            $("#txtrutUsuario").val(Rut);
            $("#txtNombreUsuario").val(Nombre.replace("%", " ").replace("%", " ").replace("%", " ").replace("%", " ").replace("%", " ").replace("%", " "));
            $("#ddlcargos").val(Cargo.replace("%", " ").replace("%", " ").replace("%", " ").replace("%", " ").replace("%", " ").replace("%", " "));
            $("#txtCorreo").val(Correo);
            $('#ddloficina').val(sucursal)
            $("#txtrutUsuario").prop("disabled", true)
            $("#txtNombreUsuario").prop("disabled", true)
            $("#txtCorreo").prop("disabled", true)
        }
        if (Tipo_accion == "nuevo") {
            $("#txtrutUsuario").focus();
            //$("#txtrutUsuario").mask('9[9.999.999]-[9|A]')
            $("#txtrutUsuario").inputmask({ mask: "9[9.999.999]-[9|A]",});
            $("#txtrutUsuario").val('');
            $("#txtNombreUsuario").val('');
            $("#ddlcargos").val("Seleccione");
            $("#txtCorreo").val('');
            $('#ddloficina').val(0)

            $("#txtrutUsuario").prop("disabled", false)
            $("#txtNombreUsuario").prop("disabled", false)
            $("#txtCorreo").prop("disabled", false)
           
        }



    });



});