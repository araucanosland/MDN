var metodos = {
    CargaGrilla: function () {

        $("#tbencuestaPensionados").bootstrapTable('refresh', {
            url: '/motor/api/pensionados/encuesta-pensionados',
            query: {
                Token: getCookie("Token")
            }
        });
    },

    CargaddlEstados: function () {

        $.SecGetJSON(BASE_URL + "/motor/api/pensionados/encuesta-pensionados-estados", { Token: getCookie("Token") }, function (response) {

            $("#ddlrespuestaPregunta4").html("");
            $("#ddlrespuestaPregunta4").append($("<option>").val('-1').html("Seleccione...").data("id", '-1').data("descripcion", "Seleccione..."));
              $.each(response, function (i, datos) {
                  $("#ddlrespuestaPregunta4").append($("<option>").val(datos.Id).html(datos.Descripcion).data("Id", datos.Id).data("Descripcion", datos.Descripcion));

                           });

        });
    }

}

function idFormatter(value, row, index) {

    return `<a href="${value}"  class="btn-link" data-id="${value}" data-nombre="${row.NombrePensionado}" data-estado="${row.Estado_encuesta}" data-toggle="modal" data-target="#modal_encusta_pensionado" data-backdrop="static" data-keyboard="false" data-lead="${row.Id}"  data-rut="${row.RutPensionadoDV}">${row.RutPensionadoDV}</a>`;
}



function formatoFecha(value, row, index) {


    if (value != null) {
        return value.toFecha();
    }

}


$(function () {
    var validp1, esValidoMiau;
    metodos.CargaGrilla();
   

    $('#modal_encusta_pensionado').on('show.bs.modal', async (event) => {
      
        metodos.CargaddlEstados();

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

                var link = $(event.relatedTarget); // Button that triggered the modal


                //Pregunta 1
                $("#nombrepensionado").html(link.data('nombre'));

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




    $('#demo-bv-wz').find('.finish').on("click", function () {
        debugger;



    });





 




});