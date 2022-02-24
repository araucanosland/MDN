window.Tipo_accion;
function ValidaEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}


var Fn = {
    validaRut: function (rut) {
       
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



function formatFecha(value, row, index) {


    if (value != null) {
        return value.toFecha();
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
                    RutUsuario : rut,

                }
                $.SecPostJSON(BASE_URL + "/motor/api/mantenedores/Eliminar-Usuario", WebUsuarioIngreso, function (respuesta) {

                   
                    if (respuesta.Estado == 'OK') {
                       
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


function eliminarGalvarino(rut) {
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
                    RutEjecutivo: getCookie("Rut")
                }
               
                $.SecPostJSON(BASE_URL + "/motor/api/mantenedores/Eliminar-Usuario-Galvarino", WebUsuarioIngreso, function (respuesta) {

                   
                    if (respuesta.Estado == 'OK') {
                       
                        $.niftyNoty({
                            type: 'success',
                            message: '<strong>Usuario Eliminado Correctamente!!!</strong>',
                            container: 'floating',
                            icon: 'pli-like-2 icon-2x',
                            timer: 2000,
                            onHidden: function () {
                                $("#txtrutGalvarino").val('');
                                metodos.CargaGrillaGalvarino($("#txtrutGalvarino").val().replace(".", "").replace(".", ""));
                            }

                        });

                    }
                });

            }
        }
    });
}


var metodos = {
    //*******************Metodos Galvarino
    CargaGrillaGalvarino: function (Rut) {
        $("#tblUsuariosGalvarino").bootstrapTable('refresh', {
            url: '/motor/api/mantenedores/listar-Usuarios-galvarino',
            query: {
                Rut: Rut,
                RutEjecutivo: getCookie("Rut")
            }
        });
    },
    CargacomboOficinaGalavarino: function () {
        $.SecGetJSON(BASE_URL + "/motor/api/mantenedores/listar-Oficinas-galvarino", function (datos) {
            $("#ddloficinasgalvarino").html("");
            $("#ddloficinasgalvarino").append($("<option>").val("0").html("Seleccione").data("id", "0").data("nombre", "Seleccione"));
            $.each(datos, function (i, oficina) {

                $("#ddloficinasgalvarino").append($("<option>").val(oficina.cod_oficina).html(oficina.DescOficina).data("id", oficina.cod_oficina).data("nombre", oficina.DescOficina));
            });

        });
    },
    CargaComboCargosGalvarino: function () {
        $.SecGetJSON(BASE_URL + "/motor/api/mantenedores/listar-Cargos-galvarino", function (datos) {
            $("#ddlcargosgalvarino").html("");
            $("#ddlcargosgalvarino").append($("<option>").val("Seleccione").html("Seleccione").data("id", "Seleccione").data("nombre", "Seleccione"));
            $.each(datos, function (i, cargo) {

                $("#ddlcargosgalvarino").append($("<option>").val(cargo.Nombre).html(cargo.Nombre).data("id", cargo.Nombre).data("nombre", cargo.Nombre));
            });

        });
    }, ValidaExsiteUsuarioGalvarino: function (Rut) {
       
        $.SecGetJSON(BASE_URL + "/motor/api/mantenedores/listar-Usuarios-galvarino", { Rut: Rut, RutEjecutivo: getCookie("Rut") }, function (datos) {

            if (datos.length > 0) {
                $.niftyNoty({
                    type: 'danger',
                    message: '<strong>Error !!!</strong> <li>Usuario ya está ingresado en el sistema!!!</li>',
                    container: '#msjerrorGalvarino',
                    icon: 'pli-unlike-2 icon-2x',
                    timer: 3000
                });
                $('#btn-guardar-galvarino').prop("disabled", true);
                $("#ddloficinasgalvarino").prop("disabled", true);
                $("#ddlcargosgalvarino").prop("disabled", true);
                $("#txtrutUsuariogalvarino").focus();
                return false;
            }
            else {
                $('#btn-guardar-galvarino').prop("disabled", false);
                $("#ddloficinasgalvarino").prop("disabled", false);
                $("#ddlcargosgalvarino").prop("disabled", false);
            }
        });
    },

    //****************Metodos Motor
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
    },
    //****************Metodos Log MDN
    CargaGrillaLogMDN: function (FechaDesde, FechaHasta, Tipo) {
       
         $("#tblLogMDN").bootstrapTable('refresh', {
            url: '/motor/api/mantenedores/listar-log-MDN',
            query: {
                FechaDesde: FechaDesde,
                FechaHasta: FechaHasta,
                Tipo: Tipo

            }
        });
    },
     //****************Metodos Log Galvarino
    CargaGrillaLogGalvarino: function (FechaDesde, FechaHasta, Tipo) {
       
        $("#tblLogGalvarino").bootstrapTable('refresh', {
            url: '/motor/api/mantenedores/listar-log-Galvarino',
            query: {
                FechaDesde: FechaDesde,
                FechaHasta: FechaHasta,
                Tipo: Tipo

            }
        });
    },
}


function digitalLinkFormatter(value, row, index) {

    let Nombre = row.Nombre.replace(" ", "%").replace(" ", "%").replace(" ", "%").replace(" ", "%").replace(" ", "%").replace(" ", "%")
    let Cargo = row.Cargo.replace(" ", "%").replace(" ", "%").replace(" ", "%").replace(" ", "%").replace(" ", "%").replace(" ", "%")
    return `<a class="btn btn-primary mar-lft btn-rounded" title="Datos usuario" data-target="#modal-usuarios" data-toggle="modal" data-Rut=${row.Rut} data-Nombre=${Nombre} data-suc=${row.Cod_Sucursal} data-correo=${row.Correo} data-cargo=${Cargo} data-tipo="editar"><i class="ion-edit btn-rounded"></i></a>
            <a class="btn btn-danger float-right btn-rounded" title="Eliminar" href="javascript:eliminar(${row.Rut.replace('-', '')})"><i class="ion-trash-a"></i></a>
            `;

}

function digitalLinkFormatterGalvarino(value, row, index) {

    let Nombre = row.Nombre.replace(" ", "%").replace(" ", "%").replace(" ", "%").replace(" ", "%").replace(" ", "%").replace(" ", "%")
    let Cargo = row.Cargo.replace(" ", "%").replace(" ", "%").replace(" ", "%").replace(" ", "%").replace(" ", "%").replace(" ", "%")
    let Sucursal = row.Sucursal.replace(" ", "%").replace(" ", "%").replace(" ", "%").replace(" ", "%")
    return `<a class="btn btn-primary mar-lft btn-rounded" title="Datos usuario" data-target="#modal-usuarios-galvarino" data-toggle="modal" data-Rut=${row.Rut} data-Nombre=${Nombre} data-suc=${row.Cod_of_galvarino} data-correo=${row.Correo} data-cargo=${Cargo} data-tipo="editarGalvarino"><i class="ion-edit btn-rounded"></i></a>
            <a class="btn btn-danger float-right btn-rounded" title="Eliminar" href="javascript:eliminarGalvarino(${row.Rut.replace('-', '')})"><i class="ion-trash-a"></i></a>
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


    $('#index-dp-component .input-group.date').datepicker({
        autoclose: true,
        format: 'dd-mm-yyyy',
        language: "es",
        // daysOfWeekDisabled: [6, 0],
        todayHighlight: true,
        //startDate: '-7d'
    }
    ).on('changeDate', function (e) {
        //cargador.CargaDatosTabla($("#fechahoy").val());
        //cargador.CargaDatosEncabezado($("#fechahoy").val());
    });

    //******************** Load js***************
    metodos.CargaComboOficinas();
    metodos.CargaGrillaListaUsuario($("#txtrut").val().replace(".", "").replace(".", ""));
    metodos.CargaComboCargos();
    metodos.CargacomboOficinaGalavarino();
    metodos.CargaComboCargosGalvarino();

    var hoy = new Date();
    var d = hoy.getDate().toString().paddingLeft("00") + "-" + (hoy.getMonth() + 1).toString().paddingLeft("00") + "-" + hoy.getFullYear().toString();
    $("#dt_fecha_log_Mdn_desde").val(d)
    $("#dt_fecha_log_Mdn_hasta").val(d)
    $("#dt_fecha_log_galvarino_desde").val(d)
    $("#dt_fecha_log_galvarino_hasta").val(d)


    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

        sessionStorage.setItem('activeTab', $(e.target).attr('href'));
    });
    var activeTab = sessionStorage.getItem('activeTab');
    if (activeTab) {
        $('#myTab a[href="' + activeTab + '"]').tab('show');
    } else {
        $('#myTab a[href="#demo-lft-tab-1"]').tab('show');

    }


    //**********************tab Mantenedor Galvarino***************
    $("#txtrutGalvarino").inputmask({ mask: "9[9.999.999]-[9|A]", });

    metodos.CargaGrillaGalvarino($("#txtrutGalvarino").val().replace(".", "").replace(".", ""))

    $("#txtrutUsuariogalvarino").on("blur", function (e) {


        if (Fn.validaRut($("#txtrutUsuariogalvarino").val())) {
           
            e.preventDefault();
            metodos.ValidaExsiteUsuarioGalvarino($("#txtrutUsuariogalvarino").val().replace(".", "").replace(".", ""));
        }
        else {
           
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

    $('#btn_buscar_galvarino').on("click", function () {
        metodos.CargaGrillaGalvarino($("#txtrutGalvarino").val().replace(".", "").replace(".", ""))
    });


    $('#modal-usuarios-galvarino').on('show.bs.modal', async (event) => {
        Tipo_accion = $(event.relatedTarget).data('tipo')
        if (Tipo_accion == "editarGalvarino") {
           
            $("#txtrutUsuariogalvarino").unmask()
            let Rut = $(event.relatedTarget).data('rut')
            let Nombre = $(event.relatedTarget).data('nombre')
            let sucursal = $(event.relatedTarget).data('suc')
            let Cargo = $(event.relatedTarget).data('cargo')
            let Correo = $(event.relatedTarget).data('correo')
            $("#txtrutUsuariogalvarino").val(Rut);
            $("#txtNombreUsuariogalvarino").val(Nombre.replace("%", " ").replace("%", " ").replace("%", " ").replace("%", " ").replace("%", " ").replace("%", " "));
            $("#ddlcargosgalvarino").val(Cargo.replace("%", " ").replace("%", " ").replace("%", " ").replace("%", " ").replace("%", " ").replace("%", " "));
            $("#txtCorreogalvarino").val(Correo);
            $('#ddloficinasgalvarino').val(sucursal)
            $("#txtrutUsuariogalvarino").prop("disabled", true)
            $("#txtNombreUsuariogalvarino").prop("disabled", true)
            $("#txtCorreogalvarino").prop("disabled", true)
        }
        if (Tipo_accion == "nuevogalvarino") {

            $("#txtrutUsuariogalvarino").focus();
            $("#txtrutUsuariogalvarino").inputmask({ mask: "9[9.999.999]-[9|A]", });
            $("#txtrutUsuariogalvarino").val('');
            $("#txtNombreUsuariogalvarino").val('');
            $("#ddlcargosgalvarino").val("Seleccione");
            $("#txtCorreogalvarino").val('');
            $('#ddloficinasgalvarino').val(0)

            $("#txtrutUsuariogalvarino").prop("disabled", false)
            $("#txtNombreUsuariogalvarino").prop("disabled", false)
            $("#txtCorreogalvarino").prop("disabled", false)

        }


    });

    $('#btn-guardar-galvarino').on("click", function () {

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
        if (Tipo_accion == "nuevogalvarino") {


            if ($("#txtrutUsuariogalvarino").val() == "") {
                mensajes = "<li>Debe Ingresar Rut Usuario</li>" + mensajes
            }

            if ($("#txtNombreUsuariogalvarino").val() == "") {
                mensajes = "<li>Debe Ingresar Nombre Usuario</li>" + mensajes
            }

            if ($("#ddloficinasgalvarino").val() == "0") {
                mensajes = "<li>Debe Seleccionar Oficina</li>" + mensajes
            }
            if ($("#ddlcargosgalvarino").val() == "Seleccione") {
                mensajes = "<li>Debe Seleccionar Cargo</li>" + mensajes
            }
            if ($("#txtCorreogalvarino").val() == "") {
                mensajes = "<li>Debe Ingresar Correo de Usuario</li>" + mensajes
            }

            //if ($('#txtCorreo').val() != '') {
            //    var regex = /[\w-\.]{2,}@@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
            //    if (!regex.test($('#txtCorreo').val().trim())) {
            //        mensajes = "<li>Formato de Correo no es válido</li>" + mensajes
            //   }

            //}
            if (ValidaEmail($("#txtCorreogalvarino").val()) == false) {
                mensajes = "<li>Formato de Correo no es válido</li>" + mensajes
            }

            if (mensajes != "") {
                $.niftyNoty({
                    type: 'danger',
                    message: '<strong>Error !!!</strong>' + mensajes,
                    container: '#msjerrorGalvarino',
                    icon: 'pli-unlike-2 icon-2x',
                    timer: 3000
                });
                return false;
            }

        }
       
        var WebUsuarioIngreso = {
            RutUsuario: $("#txtrutUsuariogalvarino").val().replace(".", "").replace(".", ""),
            NombreUsuario: $("#txtNombreUsuariogalvarino").val(),
            OficinaGalvarino: $("#ddloficinasgalvarino").val(),
            Cargo: $("#ddlcargosgalvarino").val(),
            Correo: $("#txtCorreogalvarino").val(),
        }


        $.SecPostJSON(BASE_URL + "/motor/api/mantenedores/Ingreso-Usuario-galvarino", WebUsuarioIngreso, function (respuesta) {

            if (respuesta.estado = 'OK') {

                $.niftyNoty({
                    type: 'success',
                    message: '<strong>Datos Guardados Correctamente!!!</strong>',
                    container: '#msjerrorGalvarino',
                    icon: 'pli-like-2 icon-2x',
                    timer: 3000

                });
            }
        });



    });

    //************************ Tab Mantenedor Motor***************+
    $("#txtrut").inputmask({ mask: "9[9.999.999]-[9|A]", });



    $("#txtrutUsuario").on("blur", function (e) {


        if (Fn.validaRut($("#txtrutUsuario").val())) {
           
            e.preventDefault();
            metodos.ValiaExsiteUsuario($("#txtrutUsuario").val().replace(".", "").replace(".", ""));
        }
        else {
           
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
            $("#txtrutUsuario").inputmask({ mask: "9[9.999.999]-[9|A]", });
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

    //************************ MODAL LOG MDN******************************

    $('#btn-buscar-log-mdn').on("click", function () {
        metodos.CargaGrillaLogMDN($("#dt_fecha_log_Mdn_desde").val(), $("#dt_fecha_log_Mdn_hasta").val(), "Query");
      
    });

    $('#exportar-log-mdn').click(function () {
        
        location.href = BASE_URL + "/motor/api/mantenedores/exportar-log-MDN?FechaDesde=" + $("#dt_fecha_log_Mdn_desde").val() + "&FechaHasta=" + $("#dt_fecha_log_Mdn_hasta").val() + "&Tipo=EXPORTAR";

    });


    $('#btn-buscar-log-galvarino').on("click", function () {
       
        metodos.CargaGrillaLogGalvarino($("#dt_fecha_log_galvarino_desde").val(), $("#dt_fecha_log_galvarino_hasta").val(), "Query");

    });


    $('#exportar-log-galvarino').click(function () {

        location.href = BASE_URL + "/motor/api/mantenedores/exportar-log-galvarino?FechaDesde=" + $("#dt_fecha_log_Mdn_desde").val() + "&FechaHasta=" + $("#dt_fecha_log_Mdn_hasta").val() + "&Tipo=EXPORTAR";

    });



});