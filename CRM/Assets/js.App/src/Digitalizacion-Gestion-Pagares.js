window.Auditor = ""
window.EstadoEsp = ""
var metodos = {
    cargaGestion: function (Id) {
        $.SecGetJSON(BASE_URL + "/motor/api/digitalizacion/listar-gestion", { Id: Id }, function (response) {

            $("#AfiliadoRut").val(response.RutAfiliado);
            $("#AfiNombres").val(response.NombreAfiliado)
            $("#folio").val(response.Folio)
            $("#oferta").val(response.Oferta)
            $("#ddPagare").val(response.Pagare)
            $("#ddlcedula").val(response.Cedula)
            $("#OficinaPagadora").val(response.OficinaPagadora)
            $("#OficinaVenta").val(response.OficinaVenta)
            $("#OficinaAuditora").val(response.OficinaAuditora)
            Auditor = response.Auditor;
            if (response.Id_Estado == 1) {
                $("#lblEstado").text("Aprobado").css("color", "green")
            }
            else {
                $("#lblEstado").text("Reparado").css("color", "red")
            }

            var Audit = httpGet("aud");

            if (Audit == "none") {
                if (response.Id_Estado == 0) { //Sin gestión
                    $("#divddlPagareObs").css("display", "none");
                    $("#divddlcedulaObs").css("display", "none");

                }
                if (response.Id_Estado == -1) { // Corregido
                    $("#divddlcedulaObs").css("display", "block")
                    $("#ddlcedulaObs").prop("disabled", true)
                    $("#ddlcedulaObs").val(response.ObsCI)

                    $("#divpagare").css("display", "block")
                    $("#ddlPagareObs").prop("disabled", true)
                    $("#ddlPagareObs").val(response.ObsPagare)

                }
                if (response.Id_Estado == -1) { // Corregido
                    $("#divddlcedulaObs").css("display", "block")
                    $("#ddlcedulaObs").prop("disabled", true)
                    $("#ddlcedulaObs").val(response.ObsCI)

                    $("#divpagare").css("display", "block")
                    $("#ddlPagareObs").prop("disabled", true)
                    $("#ddlPagareObs").val(response.ObsPagare)
                }
                if (response.Id_Estado == 1) { // Aprobado
                    $("#divddlcedulaObs").css("display", "block")
                    $("#ddlcedulaObs").prop("disabled", true)
                    $("#ddlcedula").prop("disabled", true)
                    $("#ddlcedulaObs").val(response.ObsCI)

                    $("#divpagare").css("display", "block")
                    $("#ddlPagareObs").prop("disabled", true)
                    $("#ddlPagare").prop("disabled", true)
                    $("#ddlPagareObs").val(response.ObsLiquidacionSueldo)
                    $('#btn-guardar').css('display', 'none')
                }
            }

            if (Audit == "4ud1t") {
                if (Auditor == 2) {
                    $("#OficinaAuditora").val("División Riesgo Crédito")
                }

                $("#divZonaOficinaPagadora").css("display", "block")

                $("#ZonaOficinaPagadora").val(response.Zona);

                if ($('#ddPagare').val() == 1 || $('#ddPagare').val() == 4) {
                    $("#divpagare").hide();
                }
                if ($('#ddlcedula').val() == 1 || $('#ddlcedula').val() == 4) {
                    $("#divCI").hide();
                }

                $("#ddlPagareObs").val(response.ObsPagare)
                $("#ddlcedulaObs").val(response.ObsCI)
            }

            if (Audit == "3sp3c1l1st4") {
                
                $("#ddPagare").prop("disabled", false)
                $("#ddlcedula").prop("disabled", false)
                $("#ddlPagareObs").css("display", "none");
                $("#ddlcedulaObs").css("display", "none");
                $("#ddlPagareObs").prop("disabled", true)
                $("#ddlcedulaObs").prop("disabled", true)
                $("#ddlcedulaObs").val(response.ObsCI);
                $("#ddlPagareObs").val(response.ObsPagare);
                if (Auditor == 2) {
                    $("#OficinaAuditora").val("División Riesgo Crédito")
                }


                if (response.EstadoGestion == "Sin gestión") { //Sin gestión
                    EstadoEsp = "Sin gestión";
                    $("#divLiquidacionObs").css("display", "none");
                    $("#divinformecuotasObs").css("display", "none");
                    $("#divsolicitudcreditoObs").css("display", "none");
                    $("#divcertificacionObs").css("display", "none");
                    $("#divhojaresumenObs").css("display", "none");
                    $("#divcomprobanteObs").css("display", "none");
                    $("#divcheckdigitalizacionObs").css("display", "none");
                    $("#divInformacionvalObs").css("display", "none");
                    $("#divafecto15Obs").css("display", "none");
                    $("#divsegurodesgravamenObs").css("display", "none");
                    $("#divsegurocesantiaObs").css("display", "none");
                    $('#ddlLiquidacion').prop("disabled", true);
                    $('#ddlinformecuotas').prop("disabled", true);
                    $('#ddlsolicitudcredito').prop("disabled", true);
                    $('#ddlcertificacion').prop("disabled", true);
                    $('#ddlhojaresumen').prop("disabled", true);
                    $('#ddlcomprobante').prop("disabled", true);
                    $('#ddlcheckdigitalizacion').prop("disabled", true);
                    $('#ddlInformacionval').prop("disabled", true);
                    $('#ddlafecto15').prop("disabled", true);
                    $('#ddlsegurodesgravamen').prop("disabled", true);
                    $('#ddlsegurocesantia').prop("disabled", true);
                    $("#ddlsegurocesantiaObs").prop("disabled", true);
                }


                if (response.EstadoGestion == "Reparado") {
                    EstadoEsp = "Reparado";
                    $("#divLiquidacionObs").css("display", "none")
                    $("#ddlLiquidacionObs").prop("disabled", true)
                    $("#ddlLiquidacionObs").val(response.ObsLiquidacionSueldo)

                    $("#divinformecuotasObs").css("display", "none");
                    $("#ddlinformecuotasObs").prop("disabled", true)
                    $("#ddlinformecuotasObs").val(response.ObsInformeCuotas)

                    $("#divsolicitudcreditoObs").css("display", "none");
                    $("#ddlsolicitudcreditoObs").prop("disabled", true)
                    $("#ddlsolicitudcreditoObs").val(response.ObsSolicitudCredito)

                    $("#divcertificacionObs").css("display", "none");
                    $("#ddlcertificacionObs").prop("disabled", true)
                    $("#ddlcertificacionObs").val(response.ObsCertificacion)

                    $("#divhojaresumenObs").css("display", "none");
                    $("#ddlhojaresumenObs").prop("disabled", true)
                    $("#ddlhojaresumenObs").val(response.ObsHojaResumen)

                    $("#divcomprobanteObs").css("display", "none");
                    $("#ddlcomprobanteObs").prop("disabled", true);
                    $("#ddlcomprobanteObs").val(response.ObsCompobanteDinero)

                    $("#divcheckdigitalizacionObs").css("display", "none");
                    $("#ddlcheckdigitalizacionObs").prop("disabled", true);
                    $("#ddlcheckdigitalizacionObs").val(response.ObsCheckListDigitalizacion)


                    $("#divInformacionvalObs").css("display", "none");
                    $("#ddlInformacionvalObs").prop("disabled", true);
                    $("#ddlInformacionvalObs").val(response.ObsInformacionAval)

                    $("#divafecto15Obs").css("display", "none");
                    $("#ddlafecto15Obs").prop("disabled", true);
                    $("#ddlafecto15Obs").val(response.ObsAfecto15)

                    $("#divsegurodesgravamenObs").css("display", "none");
                    $("#ddlsegurodesgravamenObs").prop("disabled", true);
                    $("#ddlsegurodesgravamenObs").val(response.ObsSeguroDesgravamen)

                    $("#divsegurocesantiaObs").css("display", "none");
                    $("#ddlsegurocesantiaObs").prop("disabled", true);
                    $("#ddlsegurocesantiaObs").val(response.ObsSeguroCesantia)

                    $('#ddlLiquidacion').prop("disabled", true);
                    $('#ddlinformecuotas').prop("disabled", true);
                    $('#ddlsolicitudcredito').prop("disabled", true);
                    $('#ddlcertificacion').prop("disabled", true);
                    $('#ddlhojaresumen').prop("disabled", true);
                    $('#ddlcomprobante').prop("disabled", true);
                    $('#ddlcheckdigitalizacion').prop("disabled", true);
                    $('#ddlInformacionval').prop("disabled", true);
                    $('#ddlafecto15').prop("disabled", true);
                    $('#ddlsegurodesgravamen').prop("disabled", true);
                    $('#ddlsegurocesantia').prop("disabled", true);
                    $("#ddlsegurocesantiaObs").prop("disabled", true);

                    if ($('#ddlLiquidacion').val() == 1 || $('#ddlLiquidacion').val() == 4) {
                        $("#divLiqSueldo").hide();
                    }
                    if ($('#ddlinformecuotas').val() == 1 || $('#ddlinformecuotas').val() == 4) {
                        $("#divcuotas").hide();
                    }
                    if ($('#ddlsolicitudcredito').val() == 1 || $('#ddlsolicitudcredito').val() == 4) {
                        $("#divsolicitud").hide();
                    }
                    if ($('#ddlcertificacion').val() == 1 || $('#ddlcertificacion').val() == 4) {
                        $("#divcertificacion").hide();
                    }
                    if ($('#ddlhojaresumen').val() == 1 || $('#ddlhojaresumen').val() == 4) {
                        $("#divhojaresumen").hide();
                    }
                    if ($('#ddlcomprobante').val() == 1 || $('#ddlcomprobante').val() == 4) {
                        $("#divegreso").hide();
                    }
                    if ($('#ddlcheckdigitalizacion').val() == 1 || $('#ddlcheckdigitalizacion').val() == 4) {
                        $("#divdigitalizacion").hide();
                    }
                    if ($('#ddlInformacionval').val() == 1 || $('#ddlInformacionval').val() == 4) {
                        $('#divinformacion').hide();
                    }
                    if ($('#ddlafecto15').val() == 1 || $('#ddlafecto15').val() == 4) {
                        $('#divafecto').hide();
                    }
                    if ($('#ddlsegurodesgravamen').val() == 1 || $('#ddlsegurodesgravamen').val() == 4) {
                        $('#divsdesgravamen').hide();
                    }

                    if ($('#ddlsegurocesantia').val() == 1 || $('#ddlsegurocesantia').val() == 4) {
                        $('#divscesantia').hide();
                    }



                }


                if (response.EstadoGestion == "Corregido") {
                    EstadoEsp = "Corregido";


                    $("#ddPagare").prop("disabled", false)
                    $("#ddlcedula").prop("disabled", false)
                    $("#ddlPagareObs").css("display", "block");
                    $("#ddlcedulaObs").css("display", "block");
                    $("#ddlPagareObs").prop("disabled", true)
                    $("#ddlcedulaObs").prop("disabled", true)



                    $("#divLiquidacionObs").css("display", "none")
                    $("#ddlLiquidacionObs").prop("disabled", true)
                    $("#ddlLiquidacionObs").val(response.ObsLiquidacionSueldo)

                    $("#divinformecuotasObs").css("display", "none");
                    $("#ddlinformecuotasObs").prop("disabled", true)
                    $("#ddlinformecuotasObs").val(response.ObsInformeCuotas)

                    $("#divsolicitudcreditoObs").css("display", "none");
                    $("#ddlsolicitudcreditoObs").prop("disabled", true)
                    $("#ddlsolicitudcreditoObs").val(response.ObsSolicitudCredito)

                    $("#divcertificacionObs").css("display", "none");
                    $("#ddlcertificacionObs").prop("disabled", true)
                    $("#ddlcertificacionObs").val(response.ObsCertificacion)

                    $("#divhojaresumenObs").css("display", "none");
                    $("#ddlhojaresumenObs").prop("disabled", true)
                    $("#ddlhojaresumenObs").val(response.ObsHojaResumen)

                    $("#divcomprobanteObs").css("display", "none");
                    $("#ddlcomprobanteObs").prop("disabled", true);
                    $("#ddlcomprobanteObs").val(response.ObsCompobanteDinero)

                    $("#divcheckdigitalizacionObs").css("display", "none");
                    $("#ddlcheckdigitalizacionObs").prop("disabled", true);
                    $("#ddlcheckdigitalizacionObs").val(response.ObsCheckListDigitalizacion)


                    $("#divInformacionvalObs").css("display", "none");
                    $("#ddlInformacionvalObs").prop("disabled", true);
                    $("#ddlInformacionvalObs").val(response.ObsInformacionAval)

                    $("#divafecto15Obs").css("display", "none");
                    $("#ddlafecto15Obs").prop("disabled", true);
                    $("#ddlafecto15Obs").val(response.ObsAfecto15)

                    $("#divsegurodesgravamenObs").css("display", "none");
                    $("#ddlsegurodesgravamenObs").prop("disabled", true);
                    $("#ddlsegurodesgravamenObs").val(response.ObsSeguroDesgravamen)

                    $("#divsegurocesantiaObs").css("display", "none");
                    $("#ddlsegurocesantiaObs").prop("disabled", true);
                    $("#ddlsegurocesantiaObs").val(response.ObsSeguroCesantia)

                    $('#ddlLiquidacion').prop("disabled", true);
                    $('#ddlinformecuotas').prop("disabled", true);
                    $('#ddlsolicitudcredito').prop("disabled", true);
                    $('#ddlcertificacion').prop("disabled", true);
                    $('#ddlhojaresumen').prop("disabled", true);
                    $('#ddlcomprobante').prop("disabled", true);
                    $('#ddlcheckdigitalizacion').prop("disabled", true);
                    $('#ddlInformacionval').prop("disabled", true);
                    $('#ddlafecto15').prop("disabled", true);
                    $('#ddlsegurodesgravamen').prop("disabled", true);
                    $('#ddlsegurocesantia').prop("disabled", true);
                    $("#ddlsegurocesantiaObs").prop("disabled", true);

                    if ($('#ddlLiquidacion').val() == 1 || $('#ddlLiquidacion').val() == 4) {
                        $("#divLiqSueldo").hide();
                    }
                    if ($('#ddlinformecuotas').val() == 1 || $('#ddlinformecuotas').val() == 4) {
                        $("#divcuotas").hide();
                    }
                    if ($('#ddlsolicitudcredito').val() == 1 || $('#ddlsolicitudcredito').val() == 4) {
                        $("#divsolicitud").hide();
                    }
                    if ($('#ddlcertificacion').val() == 1 || $('#ddlcertificacion').val() == 4) {
                        $("#divcertificacion").hide();
                    }
                    if ($('#ddlhojaresumen').val() == 1 || $('#ddlhojaresumen').val() == 4) {
                        $("#divhojaresumen").hide();
                    }
                    if ($('#ddlcomprobante').val() == 1 || $('#ddlcomprobante').val() == 4) {
                        $("#divegreso").hide();
                    }
                    if ($('#ddlcheckdigitalizacion').val() == 1 || $('#ddlcheckdigitalizacion').val() == 4) {
                        $("#divdigitalizacion").hide();
                    }
                    if ($('#ddlInformacionval').val() == 1 || $('#ddlInformacionval').val() == 4) {
                        $('#divinformacion').hide();
                    }
                    if ($('#ddlafecto15').val() == 1 || $('#ddlafecto15').val() == 4) {
                        $('#divafecto').hide();
                    }
                    if ($('#ddlsegurodesgravamen').val() == 1 || $('#ddlsegurodesgravamen').val() == 4) {
                        $('#divsdesgravamen').hide();
                    }

                    if ($('#ddlsegurocesantia').val() == 1 || $('#ddlsegurocesantia').val() == 4) {
                        $('#divscesantia').hide();
                    }



                }

                if (response.EstadoGestion == "Aprobado") {
                    { // Aprobado
                        EstadoEsp = "Aprobado";
                        $("#divLiquidacionObs").css("display", "block")
                        $("#ddlLiquidacionObs").prop("disabled", true)
                        $("#ddlLiquidacion").prop("disabled", true)
                        $("#ddlLiquidacionObs").val(response.ObsLiquidacionSueldo)

                        $("#divinformecuotasObs").css("display", "block");
                        $("#ddlinformecuotasObs").prop("disabled", true)
                        $("#ddlinformecuotasObs").val(response.ObsInformeCuotas)
                        $("#ddlinformecuotas").prop("disabled", true)

                        $("#divsolicitudcreditoObs").css("display", "block");
                        $("#ddlsolicitudcreditoObs").prop("disabled", true)
                        $("#ddlsolicitudcreditoObs").val(response.ObsSolicitudCredito)
                        $("#ddlsolicitudcredito").prop("disabled", true)

                        $("#divcertificacionObs").css("display", "block");
                        $("#ddlcertificacionObs").prop("disabled", true)
                        $("#ddlcertificacionObs").val(response.ObsCertificacion)
                        $("#ddlcertificacion").prop("disabled", true)

                        $("#divhojaresumenObs").css("display", "block");
                        $("#ddlhojaresumenObs").prop("disabled", true)
                        $("#ddlhojaresumenObs").val(response.ObsHojaResumen)
                        $("#ddlhojaresumen").prop("disabled", true)

                        $("#divcomprobanteObs").css("display", "block");
                        $("#ddlcomprobanteObs").prop("disabled", true);
                        $("#ddlcomprobanteObs").val(response.ObsCompobanteDinero)
                        $("#ddlcomprobante").prop("disabled", true);

                        $("#divcheckdigitalizacionObs").css("display", "block");
                        $("#ddlcheckdigitalizacionObs").prop("disabled", true);
                        $("#ddlcheckdigitalizacionObs").val(response.ObsCheckListDigitalizacion)
                        $("#ddlcheckdigitalizacion").prop("disabled", true);


                        $("#divInformacionvalObs").css("display", "block");
                        $("#ddlInformacionvalObs").prop("disabled", true);
                        $("#ddlInformacionvalObs").val(response.ObsInformacionAval)
                        $("#ddlInformacionval").prop("disabled", true);

                        $("#divafecto15Obs").css("display", "block");
                        $("#ddlafecto15Obs").prop("disabled", true);
                        $("#ddlafecto15Obs").val(response.ObsAfecto15)
                        $("#ddlafecto15").prop("disabled", true);

                        $("#divsegurodesgravamenObs").css("display", "block");
                        $("#ddlsegurodesgravamenObs").prop("disabled", true);
                        $("#ddlsegurodesgravamenObs").val(response.ObsSeguroDesgravamen)
                        $("#ddlsegurodesgravamen").prop("disabled", true);

                        $("#divsegurocesantiaObs").css("display", "block");
                        $("#ddlsegurocesantiaObs").prop("disabled", true);
                        $("#ddlsegurocesantiaObs").val(response.ObsSeguroCesantia)
                        $("#ddlsegurocesantia").prop("disabled", true);



                    }
                    //   $('#btn-guardar').css('display', 'none')
                }


                //  $('#btn-guardar').css('display', 'none')

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

            $.SecPostJSON(BASE_URL + "/motor/api/digitalizacion/guardar-gestion-pagare", WebGestionDigitalizacion, function (respuesta) {

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
                Id_Estado: -1,
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
                SeguroCesantia: $("#ddlsegurocesantia").val(),
                ObsLiquidacionSueldo: $("#ddlLiquidacionObs").val(),
                ObsInformeCuotas: $("#ddlinformecuotasObs").val(),
                ObsSolicitudCredito: $("#ddlsolicitudcreditov").val(),
                ObsCertificacion: $("#ddlcertificacionObs").val(),
                ObsHojaResumen: $("#ddlhojaresumenObs").val(),
                ObsCompobanteDinero: $("#ddlcomprobanteObs").val(),
                ObsCheckListDigitalizacion: $("#ddlcheckdigitalizacionObs").val(),
                ObsInformacionAval: $("#ddlInformacionvalObs").val(),
                ObsAfecto15: $("#ddlafecto15v").val(),
                ObsSeguroDesgravamen: $("#ddlsegurodesgravamenObs").val(),
                ObsSeguroCesantia: $("#ddlsegurocesantiaObs").val(),
                ObsPagare: $("#ddlPagareObs").val(),
                ObsCI: $("#ddlcedulaObs").val(),
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

        if (Audit == "3sp3c1l1st4") {
            

            if ($('#ddPagare').val() == "0" || $("#ddlcedula").val() == "0") {
                $.niftyNoty({
                    type: 'danger',
                    message: '<strong>Error </strong> <li>Debe seleccionar estado de documento</l>i',
                    container: 'floating',
                    timer: 5000
                });
                return false;
            }
            var gestion = "";
            if ($("#lblEstado").text() == "Aprobado") {
                gestion = 1;
            }
            else {
                gestion = -1;
            }
            var WebGestionDigitalizacion = {
                Id_lead: Id_Lead,
                Id_Estado: estadoAprobado,
                Auditor: 1,
                RutEjecutivo: getCookie("Rut"),
                Tipo_Gestion: gestion,
                Pagare: $("#ddPagare").val(),
                Cedula: $("#ddlcedula").val(),

            }

            $.SecPostJSON(BASE_URL + "/motor/api/digitalizacion/guardar-gestion-pagare", WebGestionDigitalizacion, function (respuesta) {

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

    })



    $('#ddPagare').on('change', function (event) {
        validaEstados();
    });


    $("#ddlcedula").on('change', function (event) {
        validaEstados();
    });



});