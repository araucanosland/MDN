﻿jQuery.support.cors = true;

var appSeguroContactabilidadFiltros = new Vue({
    el: '#demo-lft-tab-4',
    data: {
        item: '',
        filtros: {
            companias: [],
            puntosAtencion: [],
            puntosAtencionFiltro: [],
            estamentos: [],
            cargos: [],
        },
        modelos: {
            compania: '',
            puntosAten: '',
            puntosAtenFiltro: '',
            estamento: '',
            cargo: '',
        },
        dataModal: {}
    },
    mounted() {
        this.obtenerCompania();
        this.loadTablaContactabilidad();
    },
    updated() {
       
    },
    methods: {

        obtenerCompania() {
            
            let codigo_sucursal_asociada = getCookie('Oficina')
            let cargoAT = getCookie("Cargo")
            let oficinaAT;
            if ($("#ddloatcontactabilidad").val() == null) {
                oficinaAT = getCookie('Oficina')
            }
            else {
                oficinaAT = $("#ddloatcontactabilidad").val()
            }

            fetch(`http://${motor_api_server}:4002/compania/lista-compania/${codigo_sucursal_asociada}`, { 
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())

                .then(companiaJSON => {
              
                    let a = companiaJSON;
                    this.filtros.companias = companiaJSON;
                    console.log(this.filtros.companias)
                }).then(x => {
                  
                    $('#dllNombreEmpresa').chosen({ width: '100%' });
                    $("#dllNombreEmpresa").chosen().change(function (e) {
                        appSeguroContactabilidadFiltros.eventoCambiaEstado($(e.target).val());
                    });

                    $('#dllNombreEmpresaModal').chosen({ width: '100%' });
                    $("#dllNombreEmpresaModal").chosen().change(function (e) {
                        appSeguroContactabilidadFiltros.eventoCambiaEstado($(e.target).val());
                    });

                });

        },
        obtenerPuntoAtencion(compania) {
       
            let codigo_sucursal_asociada
            if (getCookie("Cargo") == "Agente Territorial") {

                codigo_sucursal_asociada = $("#ddloatcontactabilidad").val()
            }
            else {
                codigo_sucursal_asociada = getCookie('Oficina')
            }
            
            fetch(`http://${motor_api_server}:4002/compania/lista-punto-atencion/${compania}/${codigo_sucursal_asociada}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(puntosSubJSON => {
                 
                    this.filtros.puntosAtencion = puntosSubJSON;
                    this.filtros.puntosAtencionFiltro = puntosSubJSON;
                });
        },
        obtenerEstamento() {
            let codigo_sucursal_asociada = getCookie('Oficina')
            fetch(`http://${motor_api_server}:4002/compania/lista-estamento`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estamentoJSON => {
                    this.filtros.estamentos = estamentoJSON;
                });
        },
        obtenerCargo(nodo) {
            let nod = nodo;
            fetch(`http://${motor_api_server}:4002/compania/lista-cargo/${nod}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(cargosSubJSON => {
                    this.filtros.cargos = cargosSubJSON;
                });
        },
        eventoCambiaEstado(compania) {
          
            this.obtenerPuntoAtencion(compania)
        },
        eventoCambioOficina() {
            this.obtenerCompania();
        },
        eventoCambiaCargo() {
            let id = this.modelos.estamento.id;
            let nodo = this.modelos.estamento.nodo;
            this.obtenerCargo(nodo);
        },
        handleEventoClickFiltrar() {
            $("#tblContactoEmpresa").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/compania/leads`,
                query: {
                    punto_atencion_codigo: this.modelos.puntosAtenFiltro,
                    oficina: getCookie('Oficina'),
                }
            });
        },
        loadTablaContactabilidad() {
            $("#tblContactoEmpresa").bootstrapTable();
        },

        handleEventoClickTraeContacto(id) {
            fetch(`http://${motor_api_server}:4002/compania/leads-contacto/${id}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.dataModal = datos;
                    return datos
                }).then(x => {
                    $('#dllNombreEmpresaModal').val(x.puntoAtencion.compania.rut).trigger("chosen:updated");
                    this.modelos.estamento = x.estamento;
                    return x;
                }).then(x => {
                    this.obtenerCargo(x.estamento.nodo);
                    return x;
                }).then(x => {
                    this.modelos.cargo = x.cargo.id;
                    return x;
                }).then(x => {
                    this.modelos.puntosAten = x.puntoAtencion.codigo;
                });

        },
        handleEventoGrabaContacto() {
            let d = new Date();
            let fecha = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

            const formData = {
                estamento: this.modelos.estamento.id,
                cargo: $('#dllCargo').val(),
                rut: $('#txtRutContacto').val(),
                nombre: $('#txtNombreContacto').val(),
                fono: $('#txtFonoContacto').val(),
                mail: $('#txtMailContacto').val(),
                rut_ejecutivo: getCookie('Rut'),
                oficina: getCookie('Oficina'),
                fecha_ingreso: fecha,
                punto_atencion_codigo: $('#dllPuntoAtencionModal').val(),
            };

            if ($('#dllCargo').val() == "" || $('#dllCargo').val() == undefined) {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Los campos: Punto de Atención, Nombre, Estamento y Cargo son obligatorios',
                    container: '.msjContactabilidad',
                    timer: 4000
                });
                return false;
            }
            if ($('#dllPuntoAtencionModal').val() == "" || $('#dllPuntoAtencionModal').val() == undefined) {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Los campos: Punto de Atención, Nombre, Estamento y Cargo son obligatorios',
                    container: '.msjContactabilidad',
                    timer: 4000
                });
                return false;
            }
            if (this.modelos.estamento.id == "" || this.modelos.estamento.id == undefined) {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Los campos: Punto de Atención, Nombre, Estamento y Cargo son obligatorios',
                    container: '.msjContactabilidad',
                    timer: 4000
                });
                return false;
            }
            if ($('#txtNombreContacto').val() == "" || $('#txtNombreContacto').val() == undefined) {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Los campos: Punto de Atención, Nombre, Estamento y Cargo son obligatorios',
                    container: '.msjContactabilidad',
                    timer: 4000
                });
                return false;
            }
            fetch(`http://${motor_api_server}:4002/compania/guarda-compania-contacto`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(async (response) => {
                if (!response.ok) {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Error al intentar guardar Contacto.',
                        container: '.msjContactabilidad',
                        timer: 3000
                    });
                    return false;
                }
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Contacto Guardado correctamente.',
                    container: '.msjContactabilidad',
                    timer: 3000
                });
            });
            bloqueaCamposModal();
            $('#btn_save_contact').attr("disabled", true);
        },
        handleUpdateContacto() {
            let id = $('#txtidContacto').val();
            let d = new Date();
            let fecha = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

            const formData = {
                estamento: this.modelos.estamento.id,
                cargo: $('#dllCargo').val(),
                rut: $('#txtRutContacto').val(),
                nombre: $('#txtNombreContacto').val(),
                fono: $('#txtFonoContacto').val(),
                mail: $('#txtMailContacto').val(),
                rut_ejecutivo: getCookie('Rut'),
                oficina: getCookie('Oficina'),
                fecha_ingreso: fecha,
                punto_atencion_codigo: $('#dllPuntoAtencionModal').val(),
            };

            if ($('#dllCargo').val() == "" || $('#dllCargo').val() == undefined) {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Los campos: Punto de Atención, Nombre, Estamento y Cargo son obligatorios',
                    container: '.msjContactabilidad',
                    timer: 4000
                });
                return false;
            }
            if ($('#dllPuntoAtencionModal').val() == "" || $('#dllPuntoAtencionModal').val() == undefined) {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Los campos: Punto de Atención, Nombre, Estamento y Cargo son obligatorios',
                    container: '.msjContactabilidad',
                    timer: 4000
                });
                return false;
            }
            if (this.modelos.estamento.id == "" || this.modelos.estamento.id == undefined) {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Los campos: Punto de Atención, Nombre, Estamento y Cargo son obligatorios',
                    container: '.msjContactabilidad',
                    timer: 4000
                });
                return false;
            }
            if ($('#txtNombreContacto').val() == "" || $('#txtNombreContacto').val() == undefined) {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Los campos: Punto de Atención, Nombre, Estamento y Cargo son obligatorios',
                    container: '.msjContactabilidad',
                    timer: 4000
                });
                return false;
            }

            fetch(`http://${motor_api_server}:4002/compania/actualiza-compania-contacto/${id}`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(async (response) => {
                if (!response.ok) {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Error al intentar actualizar Contacto.',
                        container: '.msjContactabilidad',
                        timer: 3000
                    });
                    return false;
                }
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Contacto actualizado correctamente.',
                    container: '.msjContactabilidad',
                    timer: 3000
                });
                bloqueaCamposModal();
                $('#btn_update_contact').attr("disabled", true);
            });
        },
        editaContacto() {
            desactivaCamposModal();
            $('#btn_update_contact').removeAttr("disabled");
            // let idDLL = $('#dllNombreEmpresaModal').val();
            // $('#dllNombreEmpresaModal').prop('disabled', true).trigger("chosen:updated");
            // console.log({ nada: idDLL})
            /// $('#dllNombreEmpresaModal').val(idDLL).trigger("chosen:updated");
        },
        handleEventoAbreModal() {
            $('#btn_edit_contact').attr("disabled", true);
            $('#btn_save_contact').removeAttr("disabled");
            $('#btn_update_contact').css('display', 'none');
            $('#mdl_data_contactabiliadad').modal('show');
        },
        setDefaultsModal() {
            this.dataModal = {}
            this.modelos.cargo = ""
            this.modelos.estamento = ""
            this.modelos.puntosAten = ""
        },
    }
});


var metodos = {
    CargaCompaniaAT: function () {

        let oficinaAT
        if (getCookie("Cargo") == "Agente Territorial") {

            if ($("#ddloatcontactabilidad").val() == null) {
                oficinaAT = getCookie('Oficina')
            }
            else {
                oficinaAT = $("#ddloatcontactabilidad").val()
            }
        }
        else {
            oficinaAT = getCookie('Oficina')
        }

          $.SecGetJSON(BASE_URL + "/motor/api/Contactos/obetener-compania-contacto-AT", { Oficina: getCookie('Oficina'), cargoAT: getCookie("Cargo"), oficinaAT: oficinaAT }, function (response) {
           
            $("#dllNombreEmpresas").html("");

            $("#dllNombreEmpresas").append($("<option>").val('').html("Seleccione").data("RutEmpresa", '').data("NombreEmpresa", "Seleccione"));
            $.each(response, function (i, datos) {

                $("#dllNombreEmpresas").append($("<option>").val(datos.RutEmpresa).html(datos.NombreEmpresa).data("RutEmpresa", datos.RutEmpresa).data("NombreEmpresa", datos.NombreEmpresa));

            });

          
        });



    },
    CargaPuntoAtencion: function () {
      
        
        let oficinaAT
        if (getCookie("Cargo") == "Agente Territorial") {

            if ($("#ddloatcontactabilidad").val() == null) {
                oficinaAT = getCookie('Oficina')
            }
            else {
                oficinaAT = $("#ddloatcontactabilidad").val()
            }
        }
        else {
            oficinaAT = getCookie('Oficina')
        }

        $.SecGetJSON(BASE_URL + "/motor/api/Contactos/obetener-compania-contacto-AT", { Oficina: getCookie('Oficina'), cargoAT: getCookie("Cargo"), oficinaAT: oficinaAT }, function (response) {
          
            $("#dllNombreEmpresasModal").html("");

            $("#dllNombreEmpresasModal").append($("<option>").val('').html("Seleccione").data("RutEmpresa", '').data("NombreEmpresa", "Seleccione"));
            $.each(response, function (i, datos) {

                $("#dllNombreEmpresasModal").append($("<option>").val(datos.RutEmpresa).html(datos.NombreEmpresa).data("RutEmpresa", datos.RutEmpresa).data("NombreEmpresa", datos.NombreEmpresa));
            });
            $("#dllNombreEmpresasModal").val($("#dllNombreEmpresas").val());

        });



    }
};


let oficinaAT;
if ($("#ddloatcontactabilidad").val() == null) {
    oficinaAT = getCookie('Oficina')
}
else {
    oficinaAT = $("#ddloatcontactabilidad").val()
}

metodos.CargaCompaniaAT();


if (getCookie("Cargo") == "Agente Territorial") {

    $("#oficina_contactabilidad").css("display", "block");

    var fechaHoy = new Date();
    var Periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');

    $.SecGetJSON(BASE_URL + "/motor/api/Gestion/v3/listar-agente-territorial", { Periodo: Periodo, Rut: getCookie("Rut") }, function (response) {
        $("#ddloatcontactabilidad").html("");

        $("#ddloatcontactabilidad").append($("<option>").val('').html("Seleccione").data("id", '').data("nombre", "Seleccione"));
        $.each(response, function (i, datos) {
             $("#ddloatcontactabilidad").append($("<option>").val(datos.Cod_Oficina).html(datos.Oficina).data("Cod_Oficina", datos.Cod_Oficina).data("Oficina", datos.Oficina));

        });
        $("#ddloatcontactabilidad").val(getCookie("Oficina"))

    });

}
$("#ddloatcontactabilidad").change(function (e) {
   
   // $('#dllNombreEmpresa').removeAttr('disabled').trigger("chosen:updated");
    appSeguroContactabilidadFiltros.eventoCambioOficina();
   // $("#dllPuntoAtencion").val("");
   
    metodos.CargaCompaniaAT();
});
$("#dllNombreEmpresas").on("change", function (e) {
   
    appSeguroContactabilidadFiltros.obtenerPuntoAtencion($(this).val());
});

//$("#dllNombreEmpresas").chosen().change(function (e) {
//    appSeguroContactabilidadFiltros.obtenerPuntoAtencion($(this).val());
//});


function contactabilidadLinkFormatter(value, row, index) {
    return `<a href="#" class="btn-link" data-target="#mdl_data_contactabiliadad" data-toggle="modal" data-id="${row.id}" >${value}</a>`;
}

$("#mdl_data_contactabiliadad").on("shown.bs.modal", function (event) {
    const id = $(event.relatedTarget).data('id');
    appSeguroContactabilidadFiltros.obtenerEstamento();
    //metodos.CargaPuntoAtencion();

    if (id != undefined) {
        $('#dllNombreEmpresaModal').prop('disabled', true).trigger("chosen:updated");
        $('#btn_edit_contact').removeAttr("disabled");
        $('#btn_update_contact').css('display', '');
        $('#btn_edit_contact').css('display', '');
        appSeguroContactabilidadFiltros.handleEventoClickTraeContacto(id);
    }
    else {
        appSeguroContactabilidadFiltros.setDefaultsModal();
        $('#btn_update_contact').css('display', 'none');
        $('#btn_edit_contact').css('display', 'none');
        $('#btn_save_contact').css('display', '');
        $('#dllNombreEmpresaModal').removeAttr('disabled').trigger("chosen:updated");
        $('#dllPuntoAtencionModal').val("")
        $('#dllEstamento').val('')
        desactivaCamposModal();
    }
});


$("#mdl_data_contactabiliadad").on("hidden.bs.modal", function () {
    bloqueaCamposModal();
    $('#btn_save_contact').attr("disabled", true);
    $('#btn_update_contact').attr("disabled", true);
    $('#btn_edit_contact').removeAttr("disabled");
    $('#btn_update_contact').css('display', 'none');
    $('#btn_save_contact').css('display', 'none');
    $('#dllNombreEmpresaModal').prop('disabled', true).trigger("chosen:updated");
    appSeguroContactabilidadFiltros.handleEventoClickFiltrar();
});

function desactivaCamposModal() {
    //  $('#dllNombreEmpresaModal').removeAttr('disabled').trigger("chosen:updated");
    $('#dllPuntoAtencionModal').removeAttr("disabled");
    $('#txtRutContacto').removeAttr("disabled");
    $('#txtNombreContacto').removeAttr("disabled");
    $('#dllEstamento').removeAttr("disabled");
    $('#dllCargo').removeAttr("disabled");
    $('#txtFonoContacto').removeAttr("disabled");
    $('#txtMailContacto').removeAttr("disabled");
}

function bloqueaCamposModal() {
    //  $('#dllNombreEmpresaModal').prop('disabled', true).trigger("chosen:updated");
    $('#dllPuntoAtencionModal').attr("disabled", true);
    $('#txtRutContacto').attr("disabled", true);
    $('#txtNombreContacto').attr("disabled", true);
    $('#dllEstamento').attr("disabled", true);
    $('#dllCargo').attr("disabled", true);
    $('#txtFonoContacto').attr("disabled", true);
    $('#txtMailContacto').attr("disabled", true);
}

function limpiaModal() {
    $('#dllPuntoAtencionModal').val("")
    $('#dllNombreEmpresaModal').val('').trigger("chosen:updated");
    $('#txtRutContacto').val('')
    $('#txtNombreContacto').val('')
    $('#dllEstamento').val('')
    $('#dllCargo').val('')
    $('#txtFonoContacto').val('')
    $('#txtMailContacto').val('')
}

