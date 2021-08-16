
var metodos = {
    cargaGestion: function (Id) {
        $.SecGetJSON(BASE_URL + "/motor/api/digitalizacion/listar-gestion-auditoria", { Id: Id }, function (response) {
            debugger;
            $("#AfiliadoRut").val(response.RutAfiliado);
            $("#AfiNombres").val(response.NombreAfiliado)
            $("#folio").val(response.Folio)
            $("#oferta").val(response.Oferta)
            $("#ddPagare").val(response.Pagare)
            $("#ddlcedula").val(response.Cedula)
            $("#OficinaPagadora").val(response.OficinaPagadora)
            $("#OficinaVenta").val(response.OficinaVenta)
            $("#OficinaAuditora").val(response.OficinaAuditora)
            if (response.Id_Estado == 1) {
                $("#lblEstado").text("Aprobado").css("color", "green")
            }
            else {
                $("#lblEstado").text("Reparado").css("color", "red")
            }

            var Audit = httpGet("aud");
            if (Audit == "4ud1t") {

                if ($('#ddPagare').val() == 1 || $('#ddPagare').val() == 4) {
                    $("#divpagare").hide();
                }
                if ($('#ddlcedula').val() == 1 || $('#ddlcedula').val() == 4) {
                    $("#divCI").hide();
                }
            }

        })

    }

}




function DeshabilitarCombos() {
    $('#ddPagare').prop('disabled', true);
    $("#ddlcedula").prop('disabled', true);
}

function validaEstados() {


    var estadoPagare = '';
    if ($("#ddPagare").val() == 1 || $("#ddPagare").val() == 4)
        estadoPagare = "OK"
    else
        estadoPagare = 'Reparado'

    var estadoCI = '';
    if ($("#ddlcedula").val() == 1 || $("#ddlcedula").val() == 4)
        estadoCI = "OK"
    else
        estadoCI = 'Reparado'

    if (estadoPagare == 'OK' && estadoCI == 'OK') {

        $("#lblEstado").text("Aprobado").css("color", "green")
    }
    else {
        $("#lblEstado").text("Reparado").css("color", "red")
    }


}

$(function () {

    var Id_Lead = httpGet("ci");

    var Id_Lead = httpGet("ci");
    var Audit = httpGet("aud");


    if (Audit == "4ud1t") {
        DeshabilitarCombos();
        $("#btn-guardar").html('Reparar');
    }

    if (Audit == "") {
        location.href = BASE_URL + "/motor/App/digitalizacion";
    }

    if (Audit == "none") {
        $("#btn-guardar").html('Guardar');

    }



    metodos.cargaGestion(Id_Lead);


    $('#btn-bolver').on("click", function () {
        location.href = BASE_URL + "/motor/App/digitalizacion"
    });


    $("#lblEstado").text("Reparado").css("color", "red")

    $('#btn-guardar').on("click", function () {

        var estadoAprobado = 0;
        if ($("#lblEstado").text() == "Aprobado") {
            estadoAprobado = 1;
        }
        else {
            estadoAprobado = 0;
        }
        if (httpGet("aud") == "none") {



            if ($('#ddPagare').val() == "0" || $("#ddlcedula").val() == "0") {
                $.niftyNoty({
                    type: 'danger',
                    message: '<strong>Error </strong> <li>Debe seleccionar estado de documento</l>i',
                    container: 'floating',
                    timer: 5000
                });
                return false;
            }



            var WebGestionDigitalizacion = {
                Id_lead: Id_Lead,
                Id_Estado: estadoAprobado,
                Auditor: 1,
                RutEjecutivo: getCookie("Rut"),
                Tipo_Gestion: 1,
                Pagare: $("#ddPagare").val(),
                Cedula: $("#ddlcedula").val(),

            }

            $.SecPostJSON(BASE_URL + "/motor/api/digitalizacion/guardar-gestion-auditoria", WebGestionDigitalizacion, function (respuesta) {

                if (respuesta.estado = 'OK') {
                    $.niftyNoty({
                        type: 'success',
                        container: 'floating',
                        html: '<strong>Correcto</strong><li>Datos Guardados Correctamente!!!</li>',
                        focus: false,
                        timer: 5000
                    });
                }
                else {
                    $.niftyNoty({
                        type: 'danger',
                        message: '<strong>Error al guardar </strong>',
                        container: 'floating',
                        timer: 5000
                    });
                }


            });

        }

        if (httpGet("aud") == "4ud1t") {




            var WebGestionDigitalizacion = {
                Id_lead: Id_Lead,
                Id_Estado: -3,
                Auditor: 1,
                RutEjecutivo: getCookie("Rut"),
                Tipo_Gestion: 2,
                LiquidacionSueldo: $("#ddlLiquidacion").val(),
                InformeCuotas: $("#ddlinformecuotas").val(),
                SolicitudCredito: $("#ddlsolicitudcredito").val(),
                Certificacion: $("#ddlcertificacion").val(),
                HojaResumen: $("#ddlhojaresumen").val(),
                CompobanteDinero: $("#ddlcomprobante").val(),
                CheckListDigitalizacion: $("#ddlcheckdigitalizacion").val(),
                InformacionAval: $("#ddlInformacionval").val(),
                Afecto15: $("#ddlafecto15").val(),
                SeguroDesgravamen: $("#ddlsegurodesgravamen").val(),
                SeguroCesantia: $("#ddlsegurocesantia").val()
            }
            $.SecPostJSON(BASE_URL + "/motor/api/digitalizacion/guardar-gestion-misreparos", WebGestionDigitalizacion, function (respuesta) {

                if (respuesta.estado = 'OK') {
                    $.niftyNoty({
                        type: 'success',
                        container: 'floating',
                        html: '<strong>Correcto</strong><li>Datos Guardados Correctamente!!!</li>',
                        focus: false,
                        timer: 1000,
                        onHidden: function () {
                            location.href = '/motor/App/Digitalizacion';
                        }
                    });
                }
                else {
                    $.niftyNoty({
                        type: 'danger',
                        message: '<strong>Error al guardar </strong>',
                        container: 'floating',
                        timer: 5000
                    });
                }


            });

        }

    })



    $('#ddPagare').on('change', function (event) {
        validaEstados();
    });


    $("#ddlcedula").on('change', function (event) {
        validaEstados();
    });



});