

var swComercial = new Switchery(document.querySelector('#ckb-comercial'));
var swNormalizacion = new Switchery(document.querySelector('#ckb-normalizacion'));
var swSegCesantia = new Switchery(document.querySelector('#ckb-seguro-cesantia'));
var swAcuerdoPago = new Switchery(document.querySelector('#ckb-acuerdo-pago'));
var swIgn = new Switchery(document.querySelector('#ckb-ign'));
var swPensionado = new Switchery(document.querySelector('#ckb-pensioados'));

$(function () {

    $('#ckb-comercial').on("change", function (e) {
        if ($(this).is(':checked')) {
            $('#txtComercial').val('500');
            $("#txtComercial").prop('disabled', false);

        } else {
            $('#txtComercial').val('0');
            $("#txtComercial").prop('disabled', true);
        }
    });
    $('#ckb-normalizacion').on("change", function (e) {
        if ($(this).is(':checked')) {
            $('#txtNormalizacion').val('500');
            $("#txtNormalizacion").prop('disabled', false);

        } else {
            $('#txtNormalizacion').val('0');
            $("#txtNormalizacion").prop('disabled', true);
        }
    });
    $('#ckb-seguro-cesantia').on('change', function () {
        if ($(this).is(':checked')) {
            $('#txtSegCesantia').val('500');
            $("#txtSegCesantia").prop('disabled', false);

        } else {
            $('#txtSegCesantia').val('0');
            $("#txtSegCesantia").prop('disabled', true);
        }
    });

    $('#ckb-acuerdo-pago').on('change', function () {
        if ($(this).is(':checked')) {
            $('#txtAcuerdoPago').val('500');
            $("#txtAcuerdoPago").prop('disabled', false);

        } else {
            $('#txtAcuerdoPago').val('0');
            $("#txtAcuerdoPago").prop('disabled', true);
        }
    });

    $('#ckb-ign').on('change', function () {
        if ($(this).is(':checked')) {
            $('#txtIgn').val('500');
            $("#txtIgn").prop('disabled', false);

        } else {
            $('#txtIgn').val('0');
            $("#txtIgn").prop('disabled', true);
        }
    });

    $('#ckb-pensioados').on('change', function () {
        if ($(this).is(':checked')) {
            $('#txtPensinados').val('200');
            $("#txtPensinados").prop('disabled', false);

        } else {
            $('#txtPensinados').val('0');
            $("#txtPensinados").prop('disabled', true);
        }
    });
});


$(document).on('click', 'input:radio[name=input-group-ejecutivos]', function () {
    let rutEjecutivo = this.value;
    $('#lbEjecutivo').html(':     ' + $(this).data("nombre").OrdenaNombre())
    $('#btAsignarEje').attr('disabled', false)

    $("input:checkbox.habilitado:checked").trigger("click");
    activaCheck()
    if ($(this).data("cargo") == 'Ejecutivo Pensionados') {
        swPensionado.disable()
    }
});

$('#btCancelar').on("click", function (e) {
    $("input:checkbox.habilitado:checked").trigger("click");
    $('#lbEjecutivo').html("");
    $("input[name=input-group-ejecutivos]").prop('checked', false);
    $('#btAsignarEje').attr('disabled', true);
    desactivaCheck();
});

function desactivaCheck() {
    swComercial.disable();
    swNormalizacion.disable();
    swSegCesantia.disable();
    swAcuerdoPago.disable();
    swIgn.disable();
    swPensionado.disable();
}
function activaCheck() {
    swComercial.enable();
    swNormalizacion.enable();
    swSegCesantia.enable();
    swAcuerdoPago.enable();
    swIgn.enable();
    swPensionado.enable();
}




$.SecGetJSON(BASE_URL + "/motor/api/Gestion/listar-mi-oficina-historica", { tipoCampania: 0, periodo: 202001 }, function (respuesta) {

    $.each(respuesta, function (i, e) {
        $("#ejecutivos-oficina").append(
            $("<tr>")
                .append(
                    $("<td>").addClass("text-center")
                        .append(
                            $("<input>").prop({ "type": "radio", "value": e.EjecutivoData.Rut, "id": e.EjecutivoData.Rut, "name": "input-group-ejecutivos" }).data('nombre', e.EjecutivoData.Nombres).data('cargo', e.EjecutivoData.Cargo).addClass('magic-radio')
                        )
                        .append("<label for=" + e.EjecutivoData.Rut + "></label>")//<label for="contacto-rdInteres-1" style="display: block"></label>
                ).append(
                    $("<td>").append(
                        $("<span>").addClass("text-main").addClass("text-semibold").css('font-size', '12px').html(e.EjecutivoData.Nombres.OrdenaNombre())
                    )
                ).append(
                    $("<td>").append(
                        $("<span>").addClass("text-main").addClass("text-semibold").css('font-size', '12px').html(e.EjecutivoData.Cargo)
                    ).addClass("busqueda-cargo")
                ).append(
                    $("<td>").append(
                        $("<span>").addClass("pull-right badge badge-warning").html("Sin Asignar")
                    )
                )
        );
    });




});