﻿
var metodos = {
    cargaGestion: function (Id) {
        $.SecGetJSON(BASE_URL + "/motor/api/digitalizacion/listar-gestion-auditoria", { Id: Id }, function (response) {
           
            $("#AfiliadoRut").val(response.RutAfiliado);
            $("#AfiNombres").val(response.NombreAfiliado)
            $("#folio").val(response.Folio)
            $("#oferta").val(response.Oferta)
            $("#ddlLiquidacion").val(response.LiquidacionSueldo)
            $("#ddlinformecuotas").val(response.InformeCuotas)
            $("#ddlsolicitudcredito").val(response.SolicitudCredito)
            $("#ddlcertificacion").val(response.Certificacion)
            $("#ddlhojaresumen").val(response.HojaResumen)
            $("#ddlcomprobante").val(response.ComprobanteDinero)
            $("#ddlcheckdigitalizacion").val(response.CheckListDigitalizacion)
            $("#ddlInformacionval").val(response.InformacionAval)
            $("#ddlafecto15").val(response.Afecto15)
            $("#ddlsegurodesgravamen").val(response.SeguroDesgravamen)
            $("#ddlsegurocesantia").val(response.SeguroCesantia)
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
                
                if ($('#ddlLiquidacion').val() == 1 || $('#ddlLiquidacion').val() == 4) {
                    $("#divLiqSueldo").hide();
                }
                if ($('#ddlinformecuotas').val() == 1 || $('#ddlinformecuotas').val() ==4) {
                    $("#divcuotas").hide();
                }
                if ($('#ddlsolicitudcredito').val() == 1  || $('#ddlsolicitudcredito').val() == 4) {
                    $("#divsolicitud").hide();
                }
                if ($('#ddlcertificacion').val() == 1 || $('#ddlcertificacion').val() == 4) {
                    $("#divcertificacion").hide();
                }
                if ($('#ddlhojaresumen').val() == 1 || $('#ddlhojaresumen').val() == 4 ) {
                    $("#divhojaresumen").hide();
                }
                if ($('#ddlcomprobante').val() == 1 || $('#ddlcomprobante').val() == 4) {
                    $("#divegreso").hide();
                }
                if ($('#ddlcheckdigitalizacion').val() == 1 || $('#ddlcheckdigitalizacion').val() == 4 ) {
                    $("#divdigitalizacion").hide();
                }
                if ($('#ddlInformacionval').val() == 1 || $('#ddlInformacionval').val() == 4 ) {
                    $('#divinformacion').hide();
                }
                if ($('#ddlafecto15').val() == 1 || $('#ddlafecto15').val() == 4) {
                    $('#divafecto').hide();
                }
                if ($('#ddlsegurodesgravamen').val() == 1 || $('#ddlsegurodesgravamen').val() == 4 ) {
                    $('#divsdesgravamen').hide();
                }

                if ($('#ddlsegurocesantia').val() == 1 || $('#ddlsegurocesantia').val() == 4 ) {
                    $('#divscesantia').hide();
                }

            }



        })

    }

}

function validaEstados() {
    

    var estadoLiquidacion = '';
    if ($("#ddlLiquidacion").val() == 1 || $("#ddlLiquidacion").val() == 4)
        estadoLiquidacion = "OK"
    else
        estadoLiquidacion = 'Reparado'

    var estadoInformecuotas = '';
    if ($("#ddlinformecuotas").val() == 1 || $("#ddlinformecuotas").val() == 4)
        estadoInformecuotas = "OK"
    else
        estadoInformecuotas = 'Reparado'

    var solicitudcredito = '';
    if ($("#ddlsolicitudcredito").val() == 1 || $("#ddlsolicitudcredito").val() == 4)
        solicitudcredito = "OK"
    else
        solicitudcredito = 'Reparado'

    var certificacion = '';
    if ($("#ddlcertificacion").val() == 1 || $("#ddlcertificacion").val() == 4)
        certificacion = "OK"
    else
        certificacion = 'Reparado'

    var hojaresumen = '';
    if ($("#ddlhojaresumen").val() == 1 || $("#ddlhojaresumen").val() == 4)
        hojaresumen = "OK"
    else
        hojaresumen = 'Reparado'

    var comprobante = '';
    if ($("#ddlcomprobante").val() == 1 || $("#ddlcomprobante").val() == 4)
        comprobante = "OK"
    else
        comprobante = 'Reparado'


    var checkdigitalizacion = ''
    if ($("#ddlcheckdigitalizacion").val() == 1 || $("#ddlcheckdigitalizacion").val() == 4)
        checkdigitalizacion = "OK"
    else
        checkdigitalizacion = 'Reparado'



    var Informacionval = ''
    if ($("#ddlInformacionval").val() == 1 || $("#ddlInformacionval").val() == 4)
        Informacionval = "OK"
    else
        Informacionval = 'Reparado'


    var afecto15 = ''
    if ($("#ddlafecto15").val() == 1 || $("#ddlafecto15").val() == 4)
        afecto15 = "OK"
    else
        afecto15 = 'Reparado'


    var segurodesgravamen = ''
    if ($("#ddlsegurodesgravamen").val() == 1 || $("#ddlsegurodesgravamen").val() == 4)
        segurodesgravamen = "OK"
    else
        segurodesgravamen = 'Reparado'

    var segurocesantia = ''
    if ($("#ddlsegurocesantia").val() == 1 || $("#ddlsegurocesantia").val() == 4)
        segurocesantia = "OK"
    else
        segurocesantia = 'Reparado'

  
    if (estadoLiquidacion == 'OK' && estadoInformecuotas == 'OK' && solicitudcredito == 'OK' && certificacion == 'OK' && hojaresumen == 'OK' && comprobante == 'OK'  && Informacionval == 'OK' && afecto15 == 'OK' && segurodesgravamen == 'OK' && segurocesantia == 'OK') {

        $("#lblEstado").text("Aprobado").css("color", "green")
    }
    else {
        $("#lblEstado").text("Reparado").css("color", "red")
    }


}


function DeshabilitarCombos() {
    $('#ddlLiquidacion').prop('disabled', true);
    $("#ddlinformecuotas").prop('disabled', true);
    $("#ddlsolicitudcredito").prop('disabled', true);
    $("#ddlcertificacion").prop('disabled', true);
    $("#ddlhojaresumen").prop('disabled', true);
    $("#ddlcomprobante").prop('disabled', true);
    $("#ddlcheckdigitalizacion").prop('disabled', true);
    $("#ddlInformacionval").prop('disabled', true);
    $("#ddlafecto15").prop('disabled', true);
    $("#ddlsegurodesgravamen").prop('disabled', true);
    $("#ddlsegurocesantia").prop('disabled', true);

}


$(function () {
   
    var Id_Lead = httpGet("ci");
    var Audit = httpGet("aud");

    //----Cargas Estados Lead
    metodos.cargaGestion(Id_Lead);

   
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

            if ($('#ddlLiquidacion').val() == "0" || $("#ddlsolicitudcredito").val() == "0" || $("#ddlcertificacion").val() == "0" || $("#ddlhojaresumen").val() == "0" || $("#ddlcomprobante").val() == "0" || $("#ddlcheckdigitalizacion").val() == "0" || $("#ddlInformacionval").val() == "0" || $("#ddlafecto15").val() == "0" || $("#ddlsegurodesgravamen").val() == "0" || $("#ddlsegurocesantia").val() == "0") {
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
                Auditor: 2,
                RutEjecutivo: getCookie("Rut"),
                Tipo_Gestion: 1,
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

        //if (httpGet("aud") == "4ud1t") {
        //    var WebGestionDigitalizacion = {
        //        Id_lead: Id_Lead,
        //        Id_Estado: 1,
        //        Auditor: 1,
        //        RutEjecutivo: getCookie("Rut"),
        //        Tipo_Gestion: 1,
        //        LiquidacionSueldo: $("#ddlLiquidacion").val(),
        //        InformeCuotas: $("#ddlinformecuotas").val(),
        //        SolicitudCredito: $("#ddlsolicitudcredito").val(),
        //        Certificacion: $("#ddlcertificacion").val(),
        //        HojaResumen: $("#ddlhojaresumen").val(),
        //        CompobanteDinero: $("#ddlcomprobante").val(),
        //        CheckListDigitalizacion: $("#ddlcheckdigitalizacion").val(),
        //        InformacionAval: $("#ddlInformacionval").val(),
        //        Afecto15: $("#ddlafecto15").val(),
        //        SeguroDesgravamen: $("#ddlsegurodesgravamen").val(),
        //        SeguroCesantia: $("#ddlsegurocesantia").val()
        //    }
        //    $.SecPostJSON(BASE_URL + "/motor/api/digitalizacion/guardar-gestion-misreparos", WebGestionDigitalizacion, function (respuesta) {

        //        if (respuesta.estado = 'OK') {
        //            $.niftyNoty({
        //                type: 'success',
        //                container: 'floating',
        //                html: '<strong>Correcto</strong><li>Datos Guardados Correctamente!!!</li>',
        //                focus: false,
        //                timer: 1000,
        //                onHidden: function () {
        //                    location.href = '/motor/App/Digitalizacion';
        //                }
        //            });
        //        }
        //        else {
        //            $.niftyNoty({
        //                type: 'danger',
        //                message: '<strong>Error al guardar </strong>',
        //                container: 'floating',
        //                timer: 5000
        //            });
        //        }


        //    });

        //}


    })



    $('#ddlLiquidacion').on('change', function (event) {
        validaEstados();
    });


    $("#ddlinformecuotas").on('change', function (event) {
        validaEstados();
    });
    $("#ddlsolicitudcredito").on('change', function (event) {
        validaEstados();
    });
    $("#ddlcertificacion").on('change', function (event) {
        validaEstados();
    });
    $("#ddlhojaresumen").on('change', function (event) {
        validaEstados();
    });
    $("#ddlcomprobante").on('change', function (event) {
        validaEstados();
    });
    $("#ddlcheckdigitalizacion").on('change', function (event) {
        validaEstados();
    });
    $("#ddlInformacionval").on('change', function (event) {
        validaEstados();
    });
    $("#ddlafecto15").on('change', function (event) {
        validaEstados();
    });
    $("#ddlsegurodesgravamen").on('change', function (event) {
        validaEstados();
    });
    $("#ddlsegurocesantia").on('change', function (event) {
        validaEstados();
    });



});