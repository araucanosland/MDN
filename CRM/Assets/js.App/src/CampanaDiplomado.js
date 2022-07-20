window.cluster_;
window.rutEjecutivo;
window.NOMBRE_Resolutor;
var metodos = {
    CargaCookie: function () {
      
        $.SecGetJSON(BASE_URL + "/motor/api/campanadiplomado/Recuperar_Cookie", {}, function (respuesta) {
           
            rutEjecutivo = respuesta.Mensaje;
           
        });
    },
    CargaGrilla: function (rut, nombreempresa, nombrepunto) {
        //console.log(rut, nombreempresa, nombrepunto)
        $("#tblcampdiplomado").bootstrapTable('refresh', {
            url: '/motor/api/campanadiplomado/listar_campana_diplomado',
            query: {
                rut: rut,
                nombreempresa: nombreempresa,
                nombrepunto: nombrepunto
            }
        });
    },
    CargaEstadoGestion: function () {
        $.SecGetJSON(BASE_URL + "/motor/api/campanadiplomado/listar_estados_gestion_null", {}, function (response) {
            $("#ModaldllEstadoGestion").html("");
            $("#ModaldllEstadoGestion").append($("<option>").attr("value", "0").html("Seleccione"));
            $.each(response, function (i, datos) {
                $("#ModaldllEstadoGestion").append($("<option>").val(datos.eg_id).html(datos.eg_nombre).data("id", datos.eg_id).data("Nombre", datos.eg_nombre));
            });

        });
    },
    CargaSubEstadoGestion: function (padre) {
        $.SecGetJSON(BASE_URL + "/motor/api/campanadiplomado/listar_sub_estados_gestion", { padre: padre }, function (response) {
            $("#ModaldllSubEstadoGestion").html("");
            $("#ModaldllSubEstadoGestion").append($("<option>").attr("value", "0").html("Seleccione"));
            $.each(response, function (i, datos) {
                $("#ModaldllSubEstadoGestion").append($("<option>").val(datos.eg_id).html(datos.eg_nombre).data("id", datos.eg_id).data("Nombre", datos.eg_nombre));
            });
        });
    },
};

function formatoFecha(value, row, index) {


    if (value != null) {
        return value.toFecha();
    }

}

function idFormatter(value, row, index) {

    return `<a href="${value}" class="btn-link" data-id="${value}" data-cluster="${row.Cluster}" data-rut="${row.Rut_Empresa}" data-empresa="${row.Nombre_Empresa}" data-punto="${row.Nombre_Punto}" data-oficina="${row.Oficina}" data-zona="${row.Zona}" data-estamento="${row.Estamento}" data-cargo="${row.Cargo}" data-nombre="${row.Nombre_Contacto}" data-fono="${row.Fono}" data-mail="${row.Mail}" data-toggle="modal" data-target="#mdl_data_gestion_diplomado" data-backdrop="static" data-keyboard="false"  >${value}</a>`;
}

$(function () {
    //*******Page load*******
    metodos.CargaCookie();
    metodos.CargaGrilla($("#txtRutEmp").val(), $("#txtNomEmp").val(), $("#txtNomPun").val());
    metodos.CargaEstadoGestion();


    $("#ModaldllEstadoGestion").on("change", function (e) {
        if ($('#ModaldllEstadoGestion').val() == 0 || $('#ModaldllEstadoGestion').val() == '3') {
            $('#ModaldllSubEstadoGestion').prop('disabled', true);
            $('#ModaldllSubEstadoGestion').val('');
        }
        else {
            metodos.CargaSubEstadoGestion($('#ModaldllEstadoGestion').val());
            $('#ModaldllSubEstadoGestion').prop('disabled', false);
            $('#ModaldllSubEstadoGestion').val(0);
        }

    });

    $("#ModaldllSubEstadoGestion").on("change", function (e) { });

    $('#btn_buscar_cargadiplomado').on("click", function () {


        metodos.CargaGrilla($("#txtRutEmp").val(), $("#txtNomEmp").val(), $("#txtNomPun").val());

    });

    //******Modal *****

    $('#mdl_data_gestion_diplomado').on('hidden.bs.modal', async (event) => {

        metodos.CargaGrilla($("#txtRutEmp").val(), $("#txtNomEmp").val(), $("#txtNomPun").val());
    });

    $('#mdl_data_gestion_diplomado').on('show.bs.modal', async (event) => {

        $('#mdl_Estamento_R').val("");
        $('#mdl_Cargo_R').val("");
        $('#mdl_Nombre_R').val("");
        $('#mdl_Fono_R').val("");
        $('#mdl_Mail_R').val("");

        $('#btn_Guardar').prop('disabled', false);

        $('#txtId').val($(event.relatedTarget).data('id'));
        $('#rutejecutivo').val(getCookie('Rut'));

        $('#ModaldllEstadoGestion').val(0);
        $('#ModaldllSubEstadoGestion').prop('disabled', true);
        $('#ModaldllSubEstadoGestion').val('');

        $("#tab_informacion").tab('show');
        var rut = $(event.relatedTarget).data('rut');
        //console.log(rut);
        $('#mdl_Rut_Empresa').val($(event.relatedTarget).data('rut'));
        $('#mdl_Nombre_Empresa').val($(event.relatedTarget).data('empresa'));
        $('#mdl_Nombre_Punto').val($(event.relatedTarget).data('punto'));
        $('#mdl_Oficina').val($(event.relatedTarget).data('oficina'));
        $('#mdl_Zona').val($(event.relatedTarget).data('zona'));
        $('#mdl_Estamento').val($(event.relatedTarget).data('estamento'));
        $('#mdl_Cargo').val($(event.relatedTarget).data('cargo'));
        $('#mdl_Nombre').val($(event.relatedTarget).data('nombre'));
        //var NOMBRE_Resolutor = $(event.relatedTarget).data('nombre');
        $('#mdl_Fono').val($(event.relatedTarget).data('fono'));
        $('#mdl_Mail').val($(event.relatedTarget).data('mail'));

        cluster_ = $(event.relatedTarget).data('cluster').replace(/\s+/g, '');
        $('#tab_script1').css("display", "none");
        $('#tab_script2').css("display", "none");

        $('#mdl_Estamento_R').prop('disabled', false);
        $('#mdl_Cargo_R').prop('disabled', false);
        $('#mdl_Nombre_R').prop('disabled', false);
        $('#mdl_Fono_R').prop('disabled', false);
        $('#mdl_Mail_R').prop('disabled', false);

        if (cluster_ == "Trabajador") {
            $('#nombre_t').val($(event.relatedTarget).data('nombre'));
            $('#ejecutivo_t').val(rutEjecutivo);
            $("#contactollamado").css("display", "none");
            $("#scriptresolutor").css("display", "none");
            $("#scripttrabajador").css("display", "block");
            $("#Hoja3").css("display", "block");
            $("#Hoja4").css("display", "none");
            $("#btn_Anterior").css("display", "none");
            $("#btn_Siguiente").css("display", "none");
            //$("#tab_script2").tab('show');
            //$('#tab_script2').css("display", "block");
            //$('#tab_script1').prop('disabled', true);

            //guardar datos resolutor
        }
        else { //resolutor
            $('#nombre_r').val($(event.relatedTarget).data('nombre'));
            $('#ejecutivo_r').val(rutEjecutivo);
            $("#contactollamado").css("display", "block");
            $("#scriptresolutor").css("display", "block");
            $("#scripttrabajador").css("display", "none");
            $("#Hoja1").css("display", "block");
            $("#Hoja2").css("display", "none");
            $("#btn_Anterior_t").css("display", "none");
            $("#btn_Siguiente_t").css("display", "none");
            //$("#tab_script1").tab('show');
            //$('#tab_script1').css("display", "block");
            $('#mdl_Estamento_R').val($(event.relatedTarget).data('estamento'));
            $('#mdl_Cargo_R').val($(event.relatedTarget).data('cargo'));
            $('#mdl_Nombre_R').val($(event.relatedTarget).data('nombre'));
            $('#mdl_Fono_R').val($(event.relatedTarget).data('fono'));
            $('#mdl_Mail_R').val($(event.relatedTarget).data('mail'));
        }
    });

    $('#btn_Guardar').on("click", function () {

        if ($('#mdl_Estamento_R').val() == '') {
            $.niftyNoty({
                type: 'warning',
                message: '<strong>Advertencia, Debe ingresar Estamento Resolutor</strong>',
                container: '#msj',
                timer: 3000
            });
            $("#mdl_Estamento_R").focus();
            return false;
        }

        if ($('#mdl_Cargo_R').val() == '') {
            $.niftyNoty({
                type: 'warning',
                message: '<strong>Advertencia, Debe ingresar Cargo Resolutor</strong>',
                container: '#msj',
                timer: 3000
            });
            $("#mdl_Cargo_R").focus();
            return false;
        }

        if ($('#mdl_Nombre_R').val() == '') {
            $.niftyNoty({
                type: 'warning',
                message: '<strong>Advertencia, Debe ingresar Nombre Resolutor</strong>',
                container: '#msj',
                timer: 3000
            });
            $("#mdl_Nombre_R").focus();
            return false;
        }

        if ($('#mdl_Fono_R').val() == '') {
            $.niftyNoty({
                type: 'warning',
                message: '<strong>Advertencia, Debe ingresar Fono Resolutor</strong>',
                container: '#msj',
                timer: 3000
            });
            $("#mdl_Fono_R").focus();
            return false;
        }

        if (isNaN($('#mdl_Fono_R').val())) {
            $.niftyNoty({
                type: 'warning',
                message: '<strong>Advertencia, Formato de Fono Resolutor no válido</strong>',
                container: '#msj',
                timer: 3000
            });
            $("#mdl_Fono_R").focus();
            return false;
        }

        if ($('#mdl_Fono_R').val() != '') {
            if ($('#mdl_Fono_R').val().length != 9) {
                $.niftyNoty({
                    type: 'warning',
                    message: '<strong>Advertencia, Largo de Fono Resolutor no válido</strong>',
                    container: '#msj',
                    timer: 3000
                });
                $('#mdl_Fono_R').focus();
                return false;
            }
        }

        if ($('#mdl_Mail_R').val() == '') {
            $.niftyNoty({
                type: 'warning',
                message: '<strong>Advertencia, Debe ingresar Mail</strong>',
                container: '#msj',
                timer: 3000
            });
            $("#mdl_Mail_R").focus();
            return false;
        }

        if ($('#mdl_Mail_R').val() != '') {
            var regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
            if (!regex.test($('#mdl_Mail_R').val().trim())) {
                $.niftyNoty({
                    type: 'warning',
                    message: '<strong>Formato de Email no válido, favor revisar</strong>',
                    container: '#msj',
                    timer: 3000
                });
                $("#mdl_Mail_R").focus();
                return false;
            }
        }

        if (cluster_ == "Resolutor") {
            if ($('#mdl_llamado').val() == '0') {
                $.niftyNoty({
                    type: 'warning',
                    message: '<strong>Advertencia, Debe seleccionar Contacto realizado</strong>',
                    container: '#msj',
                    timer: 3000
                });
                return false;
            }
        }
        if ($('#ModaldllEstadoGestion').val() == '0') {
            $.niftyNoty({
                type: 'warning',
                message: '<strong>Advertencia, Debe seleccionar Estado</strong>',
                container: '#msj',
                timer: 3000
            });
            return false;
        }

        if ($('#ModaldllSubEstadoGestion').is(':disabled') == false) {
            if ($('#ModaldllSubEstadoGestion').val() == '0') {
                $.niftyNoty({
                    type: 'warning',
                    message: '<strong>Advertencia, Debe seleccionar SubEstado</strong>',
                    container: '#msj',
                    timer: 3000
                });
                return false;
            }
        }

        debugger;
        var LLamado_ = null;

        if ($('#mdl_llamado').val() != '0') {
            LLamado_ = $('#mdl_llamado').val();
        }


        var webGestion = {
            Id_lead: $('#txtId').val(),
            Estamento: $('#mdl_Estamento_R').val(),
            Cargo: $('#mdl_Cargo_R').val(),
            Nombre: $('#mdl_Nombre_R').val(),
            Fono: $('#mdl_Fono_R').val(),
            Cargo: $('#mdl_Cargo_R').val(),
            Mail: $('#mdl_Mail_R').val(),
            Llamado: LLamado_,
            Estado_id: $('#ModaldllEstadoGestion').val(),
            SubEstado_id: $('#ModaldllSubEstadoGestion').val(),
            RutEjecutivo: $('#rutejecutivo').val()
        }
        debugger;
        $.SecPostJSON(BASE_URL + "/motor/api/campanadiplomado/Guardar_Gestion_Diplomado", webGestion, function (respuesta) {
            debugger;
            if (respuesta.Estado == 'OK') {
                $.niftyNoty({
                    type: 'success',
                    container: '#msj',
                    message: '<strong>Correcto, Datos Guardados Correctamente!!! </strong>',
                    timer: 5000
                });
                $('#btn_Guardar').prop('disabled', true);

            }
            else {
                $.niftyNoty({
                    type: 'danger',
                    message: '<strong>Error al guardar </strong>',
                    container: '#msj',
                    timer: 5000
                });
            }
        });
        return false;
    });

    $('#btn_Anterior').on("click", function () {
        $("#Hoja1").css("display", "block");
        $("#Hoja2").css("display", "none");
        return false;
    });
    $('#btn_Siguiente').on("click", function () {
        $("#Hoja1").css("display", "none");
        $("#Hoja2").css("display", "block");
        return false;
    });
    $('#btn_Anterior_t').on("click", function () {
        $("#Hoja3").css("display", "block");
        $("#Hoja4").css("display", "none");
        return false;
    });
    $('#btn_Siguiente_t').on("click", function () {
        $("#Hoja3").css("display", "none");
        $("#Hoja4").css("display", "block");
        return false;
    });
});