window.dataModal = [];
window.data = [];
window.data.filtros = [];
window.data.filtros.comuna = [];
window.data.filtros.prioridad = [];
window.data.filtros.estados = [];
window.data.modelos = [];
window.data.modelos.comuna;
window.data.modelos.prioridad = [];
window.data.modelos.estados = [];

var appPensionadoBasePotenciada = new Vue({
    el: '#tab-gestion-contactabilidad',
    data: {
        dataModalP: [],
        idPensionadoVal: ''
    },
    mounted() {
        //this.handleEventoClickBuscaBasePotenciada();
    },
    updated() {
    },
    methods: {
        handleEventoClickBuscaBasePotenciada(idLead) {
            
            let id = idLead;//$('#txtId').val();  // $('#txtIdBase').val() 
            fetch(`http://${motor_api_server}:4002/pensionados/base-potenciada/${id}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    
                    if (datos.length > 0) {
                        this.dataModalP = datos[0];
                        $("#tblPenPotenciada").bootstrapTable('load', datos);
                    }
                    else {
                        $.niftyNoty({
                            type: 'danger',
                            message: 'Contacto no existe en Base Potenciada...',
                            container: '#NotfGenericaDBPotenciado',
                            timer: 5000
                        });
                        this.dataModalP = datos;
                        //$("#txtIdBase").val("");
                        $('#lbNomPotenc').html()
                        appPensionadoBasePotenciada.setDefaultsModalPotenciada();
                        $("#tblPenPotenciada").bootstrapTable('load', []);
                    }
                });
        },
        setDefaultsModalPotenciada() {
            
            this.dataModalP = {}
            $("#tblPenPotenciada").bootstrapTable('load', []);
        },

        onlyNumber($event) {
            let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
            if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
                $event.preventDefault();
            }
        },
    },
});

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

var metodos = {

    CargaGrilla: function (rut, epp, estado) {

        $("#tblAsigPen").bootstrapTable('refresh', {
            url: '/motor/api/pensionados/listar-pensionados_uno_Porciento',
            query: {
                rut: rut,
                epp: epp,
                estado_id: estado
            }
        });
    },

    CargaEstadoGestion: function () {
        $.SecGetJSON(BASE_URL + "/motor/api/pensionados/listar-pensionados_estadosgestionnull", {}, function (response) {
            $("#ModaldllEstadoGestion").html("");
            $("#ModaldllEstadoGestion").append($("<option>").attr("value", "0").html("Seleccione"));
            $("#dllEstadoGestion").html("");
            $("#dllEstadoGestion").append($("<option>").attr("value", "0").html("Todos"));
            $.each(response, function (i, datos) {
                $("#dllEstadoGestion").append($("<option>").val(datos.eges_id).html(datos.eges_nombre).data("eges_id", datos.eges_id).data("Nombre", datos.eges_nombre));
                $("#ModaldllEstadoGestion").append($("<option>").val(datos.eges_id).html(datos.eges_nombre).data("eges_id", datos.eges_id).data("Nombre", datos.eges_nombre));
            });
        });
    },
    CargaSubEstadoGestion: function (padre) {
        $.SecGetJSON(BASE_URL + "/motor/api/pensionados/listar-pensionados_subestadosgestion", { padre: padre }, function (response) {
            $("#ModaldllSubEstadoGestion").html("");
            $("#ModaldllSubEstadoGestion").append($("<option>").attr("value", "0").html("Seleccione"));
            $.each(response, function (i, datos) {
                $("#ModaldllSubEstadoGestion").append($("<option>").val(datos.eges_id).html(datos.eges_nombre).data("eges_id", datos.eges_id).data("Nombre", datos.eges_nombre));
            });
        });
    },
    CargaEpp: function (idepp) {
        $.SecGetJSON(BASE_URL + "/motor/api/pensionados/listar-pensionados_epp", { idepp: idepp }, function (response) {

            $("#dllEppPen").html("");
            //$("#ModaldllEppPen").html("");
            $("#ModaldllNuevoEpp").html("");
            $("#dllEppPen").append($("<option>").attr("value", "0").html("Todos"));
            $("#ModaldllEppPen").append($("<option>").attr("value", "0").html("Todos"));
            $("#ModaldllNuevoEpp").append($("<option>").attr("value", "0").html("Todos"));
            $.each(response, function (i, datos) {
                $("#dllEppPen").append($("<option>").val(datos.Id).html(datos.RazonSocial).data("Id", datos.Id).data("RazonSocial", datos.RazonSocial));
                $("#ModaldllNuevoEpp").append($("<option>").val(datos.Id).html(datos.RazonSocial).data("Id", datos.Id).data("RazonSocial", datos.RazonSocial));
                //$("#ModaldllEppPen").append($("<option>").val(datos.RazonSocial).html(datos.RazonSocial).data("Id", datos.RazonSocial).data("RazonSocial", datos.RazonSocial));

            });
        });
    },

    CargaBeneficioModal: function (idbeneficio) {
        $.SecGetJSON(BASE_URL + "/motor/api/pensionados/listar-pensionados_beneficios", { idbeneficio: idbeneficio }, function (response) {

            $("#ModaldllBeneficioPen").html("");
            $("#ModaldllBeneficioPen").append($("<option>").attr("value", "").html("Todos"));
            $.each(response, function (i, datos) {

                $("#ModaldllBeneficioPen").append($("<option>").val(datos.Id).html(datos.Nombre).data("Id", datos.Id).data("Nombre", datos.Nombre));
            });
        });
    },

    CargaHistorialGestPensionados(rut) {

        var fechaHoy = new Date();
        var periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
        $.SecGetJSON(BASE_URL + "/motor/api/pensionados/listar-historial_gestion_pensionado", { rut: rut, periodo: periodo }, function (datos) {

            $("#gestiones_realizadas_pensionados").html("");
            $.each(datos, function (i, e) {
                if (e.Epp == 0) {
                    $("#gestiones_realizadas_pensionados").append($("<a>").attr("href", '#')
                        .append($("<h4>").addClass("list-group-item-heading").html("<strong>Gestor:</strong> " + e.NombreEjecutivo))
                        .append($("<p>").addClass("list-group-item-text").html("<strong>Fecha Gestión:</strong> " + e.FechaGestion.toFechaHoraPrueba()))
                        .append($("<p>").addClass("list-group-item-text").html("<strong>Estado:</strong> " + e.Estado + ",  <strong>Sub Estado:</strong> " + e.SubEstado))
                    );
                }
                else {
                    $("#gestiones_realizadas_pensionados").append($("<a>").attr("href", '#')
                        .append($("<h4>").addClass("list-group-item-heading").html("<strong>Gestor:</strong> " + e.NombreEjecutivo))
                        .append($("<p>").addClass("list-group-item-text").html("<strong>Fecha Gestión:</strong> " + e.FechaGestion.toFechaHoraPrueba()))
                        .append($("<p>").addClass("list-group-item-text").html("<strong>Estado:</strong> " + e.Estado + ",  <strong>Sub Estado:</strong> " + e.SubEstado))
                        .append($("<p>").addClass("list-group-item-text").html("<strong>Epp Actual:</strong> " + e.Epp))
                    );
                }
            });
        });
    },


    //obtenerLead(id) {

    //    $.SecGetJSON(BASE_URL + "/motor/api/pensionados/listar-pensionados_uno_Porciento_Id", { id: id }, function (response) {

    //        dataModal = response[0];

    //    });
    //},


};

function formatoFecha(value, row, index) {


    if (value != null) {
        return value.toFecha();
    }

}

function idFormatter(value, row, index) {

    return `<a href="${value}" class="btn-link" data-id="${value}" data-beneficio="${row.beneficio_text}" data-epp="${row.Epp_text}" data-rut="${row.Rut_Afiliado}" data-rutBnf="${row.Rut_Afiliado}"  data-nombre="${row.Nombre_Afiliado}" data-fechapension="${row.Fecha_Ultima_Pension}" data-fechabeneficio="${row.Fecha_Ultimo_Beneficio}" data-beneficioid="${row.Beneficio_id}" data-eppid="${row.Epp_id}" data-ejecutivorut="${row.Rut_Ejecutivo}" data-toggle="modal" data-target="#mdl_data_gestion_pensionado" data-backdrop="static" data-keyboard="false"  >${value}</a>`;
}

$(function () {
    //******************Page load********************

    var hoy = new Date();
    var d = hoy.getDate().toString().paddingLeft("00") + "-" + (hoy.getMonth() + 1).toString().paddingLeft("00") + "-" + hoy.getFullYear().toString();
    $("#dt_fecha_pensionado_desde").val(d)
    $("#dt_fecha_pensionado_hasta").val(d)



    //metodos.CargaComunas(0);
    //metodos.CargaPrioridad(0);
    metodos.CargaEstadoGestion();
    //metodos.CargaEjecutivoPensionados();
    metodos.CargaEpp(0);

    metodos.CargaBeneficioModal(1);

    


    //************index *************

    $('#btn_buscar_pensionado').on("click", function () {


        metodos.CargaGrilla($("#txtRutPen").val(), $("#dllEppPen").val(), $("#dllEstadoGestion").val());

    });

    //************tab contacto*********
    $("#ModaldllSubEstadoGestion").on("change", function (e) {
        if ($("#ModaldllSubEstadoGestion").val() == '101' || $("#ModaldllSubEstadoGestion").val() == '102' || $("#ModaldllSubEstadoGestion").val() == '301' || $("#ModaldllSubEstadoGestion").val() == '302') {
            $("#divnuevoepp").css("display", "block");
            $("#ModaldllNuevoEpp").val(0);
        } else {
            $("#divnuevoepp").css("display", "none");
            $('#divotroepp').css("display", "none");
        }

    });
    $("#ModaldllEstadoGestion").on("change", function (e) {
        if ($('#ModaldllEstadoGestion').val() == 0) {
            $('#ModaldllSubEstadoGestion').prop('disabled', true);
            $('#ModaldllSubEstadoGestion').val('');
            $('#divnuevoepp').css("display", "none");
            $('#divotroepp').css("display", "none");
        }
        else {

            metodos.CargaSubEstadoGestion($('#ModaldllEstadoGestion').val());
            $('#ModaldllSubEstadoGestion').prop('disabled', false);
            $('#ModaldllSubEstadoGestion').val(0);
        }
        
    });
    $("#ModaldllNuevoEpp").on("change", function (e) {
        if ($("#ModaldllNuevoEpp").val() == '29') {
            $("#divotroepp").css("display", "block");
            $('#peneppOtro').val("");
        } else {
            $("#divotroepp").css("display", "none");
        }

    });

    $("#tab-gestion-pensionado").on("change", function (e) {
        $('#btn-guardar').prop('disabled', false);

    });


    $('#btn-btCerrarModal').on("click", function () {
        //metodos.CargaGrilla("", 1, 1);
    });

    $('#btn-guardar').on("click", function () {

        
        var fechaHoy = new Date();
        var periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
        var otroepp = "";
        if ($('#ModaldllEstadoGestion').val() == '0') {
            $.niftyNoty({
                type: 'warning',
                message: '<strong>Advertencia, Debe seleccionar Estado</strong>',
                container: '#msjMantPensionadoContacto',
                timer: 3000
            });
            return false;
        }
        if ($('#ModaldllSubEstadoGestion').val() == '0') {
            $.niftyNoty({
                type: 'warning',
                message: '<strong>Advertencia, Debe seleccionar SubEstado</strong>',
                container: '#msjMantPensionadoContacto',
                timer: 3000
            });
            return false;
        }
        if (($("#ModaldllSubEstadoGestion").val() == '101' || $("#ModaldllSubEstadoGestion").val() == '102' || $("#ModaldllSubEstadoGestion").val() == '301' || $("#ModaldllSubEstadoGestion").val() == '302') && $('#ModaldllNuevoEpp').val() == '0') {
            $.niftyNoty({
                type: 'warning',
                message: '<strong>Advertencia, Debe seleccionar Nuevo EPP</strong>',
                container: '#msjMantPensionadoContacto',
                timer: 3000
            });
            return false;
        }
        if ($('#ModaldllNuevoEpp').val() == '29') {
            otroepp = $('#peneppOtro').val();
            if ($("#peneppOtro").val() == "") {
                $.niftyNoty({
                    type: 'danger',
                    message: '<strong>Error , Debe ingresar nombre EPP</strong>',
                    container: '#msjMantPensionadoContacto',
                    timer: 3000
                });
                return false;
            }
        }
        else { otroepp = ""; }
        var webGestionPensionado = {
            Id_lead: $('#txtId').val(),
            Epp_id: $('#ModaldllNuevoEpp').val(),
            Epp_Otro: otroepp,
            Estado_id: $('#ModaldllEstadoGestion').val(),
            SubEstado_id: $('#ModaldllSubEstadoGestion').val(),
            Periodo: periodo,
            EjecutivoRut: $('#rutejecutivo').val(),
            Observacion: $('#penObservacion').val()
        }
        $.SecPostJSON(BASE_URL + "/motor/api/pensionados/Guardar-Gestion-Pensionados", webGestionPensionado, function (respuesta) {
            
            if (respuesta.Estado == 'OK') {
                $.niftyNoty({
                    type: 'success',
                    container: '#msjMantPensionadoContacto',
                    html: '<strong>Correcto</strong><li>Datos Guardados Correctamente!!!</li>',
                    focus: false,
                    timer: 5000
                });
                $('#btn-guardar').prop('disabled', true);
                metodos.CargaHistorialGestPensionados($('#Pen_rut').val());
            }
            else {
                $.niftyNoty({
                    type: 'danger',
                    message: '<strong>Error al guardar </strong>',
                    container: '#msjMantPensionadoContacto',
                    timer: 5000
                });
            }
            metodos.CargaGrilla($("#txtRutPen").val(), $("#dllEppPen").val(), $("#dllEstadoGestion").val());
            $('#penObservacion').val("");
            $('#ModaldllEstadoGestion').val(0);
            $('#ModaldllSubEstadoGestion').prop('disabled', true);
            $('#ModaldllSubEstadoGestion').val('');
            $('#divnuevoepp').css("display", "none");
            $('#divotroepp').css("display", "none");
        });
    });


     
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


    //***************Modal **********

    $('#mdl_data_gestion_pensionado').on('hidden.bs.modal', async (event) => {
 

    });

    $('#mdl_data_gestion_pensionado').on('show.bs.modal', async (event) => {
        //*********************************tab datos pensionados******

        $("#tabDatosPen").tab('show');

        $('#penObservacion').val("");
        $('#ModaldllEstadoGestion').val(0);
        $('#ModaldllSubEstadoGestion').prop('disabled', true);
        $('#ModaldllSubEstadoGestion').val('');
        $('#divnuevoepp').css("display", "none");
        $('#divotroepp').css("display", "none");
        
        $('#pen_beneficio').val($(event.relatedTarget).data('beneficio'));
        $('#pen_epp').val($(event.relatedTarget).data('epp'));
        var fechapension = $(event.relatedTarget).data('fechapension');
        var fechabeneficio = $(event.relatedTarget).data('fechabeneficio');
        $('#Pen_rut').val($(event.relatedTarget).data('rut'));
        $('#pen_nombre').val($(event.relatedTarget).data('nombre'));
        $('#Modalfechaultimapension').val(fechapension.toFecha());
        $('#Modalfechaultimobeneficio').val(fechabeneficio.toFecha());
        $('#ModaldllBeneficioPen').val($(event.relatedTarget).data('beneficioid'));

        $('#txtId').val($(event.relatedTarget).data('id'));
        $('#rutejecutivo').val($(event.relatedTarget).data('ejecutivorut'));
    
        metodos.CargaHistorialGestPensionados($(event.relatedTarget).data('rut'));

        //*************contactabilidad*******
        
        rut_ = $(event.relatedTarget).data('rutbnf')
        nombre_ = $(event.relatedTarget).data('nombrebnf')
        origen_ = $(event.relatedTarget).data('origen')
        oferta_ = $(event.relatedTarget).data('ofertabnf')

        campana_ = $(event.relatedTarget).data('campana')
        cargas_ = $(event.relatedTarget).data('cargas')
        fecha_nacimiento_ = $(event.relatedTarget).data('fecha_nacimiento')

        $('#txtRutBnf').val(rut_)
        $('#txtNombreBnf').val(nombre_)
        
        $('#txtCampBenf').val(campana_)
        $('#txtFechaNacBenf').val(fecha_nacimiento_)
        $('#txtCargasBnf').val(cargas_)
        // $('#btn_comercial_bnf').attr('disabled', true);

        if (origen_ == 'Comercial') {
            $('#btComercialBnf').html('');
            let tipo = $(event.relatedTarget).data('tipo')
            let rutc = $(event.relatedTarget).data('rut')
            let rutafipsu = $(event.relatedTarget).data('rutafipsu')
            let periodo = $(event.relatedTarget).data('periodo')
            let tieneEncuesta = $(event.relatedTarget).data('tieneEncuesta')
            var button = '<button class="btn btn-success" style="border-radius: 8px;" id="btn_comercial_bnf"  data-target="#mdl_data" data-toggle="modal" data-tieneEncuesta="' + tieneEncuesta + '" data-periodo="' + periodo + '" data-rutafipsu="' + rutafipsu + '" data-rut="' + rutc + '" data-tipo="' + tipo + '">Ir a gestión comercial</button>';
            $('#btComercialBnf').append(button);
        }

        $('#dp-component-fecha-ani .input-group.date').datepicker(
            { autoclose: true, format: 'dd-mm-yyyy', language: "es", daysOfWeekDisabled: [6, 0], todayHighlight: true }
        ).on('changeDate', function (event) {
            event.stopPropagation();
        }).on('show.bs.modal hide.bs.modal', function (event) {
            event.stopPropagation();
        });

        appBnfModal.obtenerUltimaGest(rut_);
        appBnfModal.obtenerHistorialBnf(rut_);


        var rutCont = rut_;
        rutCont = rutCont.substring(0, rutCont.length - 2)

        cargaDatosDeContactoBnf(rutCont)
        $("#msjContactBeneficio").css('display', 'none')

    });

   
});