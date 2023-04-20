jQuery.support.cors = true;
var appCobranzaPrev = new Vue({
    el: '#page-content',
    data: {
        filtros: {
            estados: [],
            subEstados: [],

            estadosImp: [],
            subEstadosImp: [],

            estadosDec: [],
            subEstadosDec: [],
        },
        modelos: {
            estados: '',
            subEstados: '',

            estadosImp: '',
            subEstadosImp: '',

            estadosDec: '',
            subEstadosDec: '',
        }
    },
    mounted() {
        this.obtenerEstados();
        this.obtenerEstadosImp();
        this.obtenerEstadosDeclaradas();
    },
    methods: {

        obtenerEstados() {
            debugger;
            let padre = 0;
            fetch(`http://${motor_api_server}:4002/cobranza-previsional/lista-estados/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.estados = estadosJSON;
                });
        },
        obtenerSubEstados(padre) {
            debugger;
            fetch(`http://${motor_api_server}:4002/cobranza-previsional/lista-estados/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosSubJSON => {
                    this.filtros.subEstados = estadosSubJSON;
                });
        },
        eventoCambiaEstadoCobranza() {
            this.obtenerSubEstados(this.modelos.estados)
        },
        cargaLeadFiltroDiferenciCotizacion() {
            let es;
            let sub;
            if ($('select[name="dllEstado"] option:selected').text() != 'TODOS...') {
                es = $('select[name="dllEstado"] option:selected').text()
            } else {
                es = ""
            }
            if ($('select[name="dllSubEstado"] option:selected').text() != 'TODOS...') {
                sub = $('select[name="dllSubEstado"] option:selected').text()
            } else {
                sub = ""
            }

            $("#tbDiferencia").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/cobranza-previsional/lead-Diferencia-cotizacion`,
                query: {
                    estado: es,
                    subEstado: sub,
                    rut_ejecutivo: getCookie('Rut'),
                    oficina: getCookie('Oficina'),
                }
            });
        },

        //COTIZACIONES IMPAGAS
        obtenerEstadosImp() {
            let padre = 0;
            fetch(`http://${motor_api_server}:4002/cobranza-previsional/lista-estados/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.estadosImp = estadosJSON;
                });
        },
        obtenerSubEstadosImp(padre) {
            fetch(`http://${motor_api_server}:4002/cobranza-previsional/lista-estados/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosSubJSON => {
                    this.filtros.subEstadosImp = estadosSubJSON;
                });
        },
        eventoCambiaEstadoImp() {
            this.obtenerSubEstadosImp(this.modelos.estadosImp)
        },
        cargaLeadFiltroCotizacionImpaga() {
            let es;
            let sub;
            if ($('select[name="dllEstadoImp"] option:selected').text() != 'TODOS...') {
                es = $('select[name="dllEstadoImp"] option:selected').text()
            } else {
                es = ""
            }
            if ($('select[name="dllSubEstadoImp"] option:selected').text() != 'TODOS...') {
                sub = $('select[name="dllSubEstadoImp"] option:selected').text()
            } else {
                sub = ""
            }

            $("#tbImpagas").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/cobranza-previsional/lead-cotizaciones-impagas`,
                query: {
                    estado: es,
                    subEstado: sub,
                    rut_ejecutivo: getCookie('Rut'),
                    oficina: getCookie('Oficina'),
                }
            });
        },

        //COTIZACIONES DECLARADAS Y NO PAGADAS
        obtenerEstadosDeclaradas() {
            let padre = 0;
            fetch(`http://${motor_api_server}:4002/cobranza-previsional/lista-estados/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.estadosDec = estadosJSON;
                });
        },
        obtenerSubEstadosDec(padre) {
            fetch(`http://${motor_api_server}:4002/cobranza-previsional/lista-estados/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosSubJSON => {
                    this.filtros.subEstadosDec = estadosSubJSON;
                });
        },
        eventoCambiaEstadoDec() {
            this.obtenerSubEstadosDec(this.modelos.estadosDec)
        },
        cargaLeadFiltroCotizacionDec() {
            let es;
            let sub;
            if ($('select[name="dllEstadoDec"] option:selected').text() != 'TODOS...') {
                es = $('select[name="dllEstadoDec"] option:selected').text()
            } else {
                es = ""
            }
            if ($('select[name="dllSubEstadoDec"] option:selected').text() != 'TODOS...') {
                sub = $('select[name="dllSubEstadoDec"] option:selected').text()
            } else {
                sub = ""
            }

            $("#tblDeclaradas").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/cobranza-previsional/lead-cotizaciones-declaradas`,
                query: {
                    estado: es,
                    subEstado: sub,
                    rut_ejecutivo: getCookie('Rut'),
                    oficina: getCookie('Oficina'),
                }
            });
        },
    }
});

function formaterRut(value, row, index) {
    return `<a href="#" class="btn-link" data-target="#modal_cobranza" data-toggle="modal" data-dv="${row.dv}"  data-rut="${row.rut}" >${row.rut + '-' + row.dv}</a>`;
}
function formaterRutImpagos(value, row, index) {
    return `<a href="#" class="btn-link" data-target="#modal_impagas" data-toggle="modal" data-dv="${row.dv}"  data-rut="${row.rut}" >${row.rut + '-' + row.dv}</a>`;
}
function formaterRutDec(value, row, index) {
    return `<a href="#" class="btn-link" data-target="#modal_declarada" data-toggle="modal" data-dv="${row.dv}"  data-rut="${row.rut}" >${row.rut + '-' + row.dv}</a>`;
}
function formaterNum(value, row, index) {
    return value.toMoney();
}


var appModalDiferencia = new Vue({
    el: '#modal_cobranza',
    data: {
        filtros: {
            estadosModal: [],
            subEstadosModal: []
        },
        modelos: {
            estadosModal: '',
            subEstadosModal: ''

        },
        dataModal: {},
        dataModalHist: {},
    },
    mounted() {
        this.obtenerEstados();
    },
    methods: {

        obtenerEstados() {

            let padre = 0;
            fetch(`http://${motor_api_server}:4002/cobranza-previsional/lista-estados/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.estadosModal = estadosJSON;
                });
        },
        obtenerSubEstados(padre) {

            fetch(`http://${motor_api_server}:4002/cobranza-previsional/lista-estados/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosSubJSON => {
                    this.filtros.subEstadosModal = estadosSubJSON;
                });
        },
        eventoCambiaEstadoCobranzaModal() {
            this.obtenerSubEstados(this.modelos.estadosModal)
        },

        obtenerLeadDiferencia(rut) {
            fetch(`http://${motor_api_server}:4002/cobranza-previsional/detalle-lead-diferencia/${rut}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.dataModal = datos[0];
                    return datos
                })
        },
        obtenerHistorialDiferencia(rut) {
            fetch(`http://${motor_api_server}:4002/cobranza-previsional/historial-diferencia-cotizacion/${rut}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.dataModalHist = datos;
                    return datos
                })
        },
        handleSubmitGuadarGestion() {

            if ($('#dllEstadoCBModal').val() == '') {
                $(Swal.fire({
                    title: 'Debe ingresar un estado',
                    icon: 'error',
                    confirmButtonText: 'OK'
                }));
                return false;
            }

            if ($('#dllSubEstadoCbModal').val() == '') {
                $(Swal.fire({
                    title: 'Debe ingresar un subEstado',
                    icon: 'error',
                    confirmButtonText: 'OK'
                }));
                return false;
            }


            if ($("#dllSubEstadoCbModal").val() == 103 || $("#dllSubEstadoCbModal").val() == 106) {
                if ($('select[name="dllSubEstadoCbModal2"] option:selected').text() == "Seleccione...") {
                    $(Swal.fire({
                        title: 'Debe seleccionar subestado 2',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    }));
                    $("#dllSubEstadoCbModal2").focus();
                    return false;
                }
            }


            if ($('#txtobservacionDiferencia').val() == '') {
                $(Swal.fire({
                    title: 'Debe ingresar una observación',
                    icon: 'error',
                    confirmButtonText: 'OK'
                }));
                return false;
            }

            const formData = {
                rut: $('#txtRutDif').val(),
                dv: $('#txtDvDif').val(),
                razon_social: $('#txtRazonSocial').val(),
                estado: $('select[name="dllEstadoCBModal"] option:selected').text(),
                subEstado: $('select[name="dllSubEstadoCbModal"] option:selected').text(),
                observacion: $('#txtobservacionDiferencia').val(),
                rut_ejecutivo: getCookie('Rut'),
                oficina: parseInt(getCookie('Oficina')),
                subestado2: $('select[name="dllSubEstadoCbModal2"] option:selected').text(),
            };

            debugger;
            $.SecPostJSON(BASE_URL + "/motor/api/CobranzaPrevisional/guarda-gestion-diferencia-cotizacion", formData, function (respuesta) {
                debugger;
                Swal.fire({
                    title: 'Gestion ingresada correctamente!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })

                $("#divSubEstado2").css("display", "none");
                $("#dllSubEstadoCbModal2").val(-1);

            }).fail(function (errMsg) {
                debugger;
                $.niftyNoty({
                    type: "warning",
                    container: "floating",
                    title: "Avance Tareas",
                    message: "Tarea No Finalizada, contacte a Soporte!",
                    closeBtn: true,
                    timer: 5000
                });

            });
            //fetch(`http://${motor_api_server}:4002/cobranza-previsional/guarda-gestion-diferencia-cotizacion`, {
            //    method: 'POST',
            //    body: JSON.stringify(formData),
            //    headers: {
            //        'Content-Type': 'application/json',
            //        'Token': getCookie('Token')
            //    }
            //}).then(async (response) => {
            //    if (!response.ok) {
            //        $(Swal.fire({
            //            title: 'Error al guardar gestion',
            //            icon: 'error',
            //            confirmButtonText: 'OK'
            //        }));
            //        return false;
            //    }
            //    Swal.fire({
            //        title: 'Gestion ingresada correctamente!',
            //        icon: 'success',
            //        confirmButtonText: 'OK'
            //    })
            //});


            setTimeout(function () {
                appModalDiferencia.obtenerHistorialDiferencia($('#txtRutDif').val())
            }, 300);
            setTimeout(function () {
                appCobranzaPrev.cargaLeadFiltroDiferenciCotizacion();
            }, 300);

            appModalDiferencia.setDefaultsModalData()
        },
        setDefaultsModalData() {
            this.modelos = {
                estadosModal: '',
                subEstadosModal: '',
            }
            $('#txtobservacionDiferencia').val("");

        }
    }
});
$('#modal_cobranza').on('show.bs.modal', async (event) => {
    let dv = $(event.relatedTarget).data('dv')
    let rut = $(event.relatedTarget).data('rut')

    appModalDiferencia.obtenerLeadDiferencia(rut);
    appModalDiferencia.obtenerHistorialDiferencia(rut);
    formatMoneyPort();

});
$('#modal_cobranza').on('hidden.bs.modal', function (e) {
    appModalDiferencia.setDefaultsModalData();
})
function formatMoneyPort() {
    setTimeout(function () {
        $('.numero').each(function () {
            num = $(this).val()
            $(this).val(num.toMoney2());
        });
    }, 1000);
}

// MODAL COTIZACIONES IMPAGAS  

var appModalImpagas = new Vue({
    el: '#modal_impagas',
    data: {
        filtros: {
            estadosModal: [],
            subEstadosModal: [],
        },
        modelos: {
            estadosModal: '',
            subEstadosModal: '',
        },
        dataModal: {},
        dataModalHist: {},
    },
    mounted() {
        this.obtenerEstados();
    },
    methods: {

        obtenerEstados() {
            let padre = 0;
            fetch(`http://${motor_api_server}:4002/cobranza-previsional/lista-estados/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.estadosModal = estadosJSON;
                });
        },
        obtenerSubEstados(padre) {
            fetch(`http://${motor_api_server}:4002/cobranza-previsional/lista-estados/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosSubJSON => {
                    this.filtros.subEstadosModal = estadosSubJSON;
                });
        },
        eventoCambiaEstadoCobranzaModal() {
            this.obtenerSubEstados(this.modelos.estadosModal)
        },
        obtenerLeadImpagas(rut) {
            fetch(`http://${motor_api_server}:4002/cobranza-previsional/detalle-lead-impagas/${rut}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.dataModal = datos[0];
                    return datos
                })
        },
        obtenerHistorialImpagas(rut) {
            fetch(`http://${motor_api_server}:4002/cobranza-previsional/historial-cotizaciones-impagas/${rut}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.dataModalHist = datos;
                    return datos
                })
        },
        handleSubmitGuadarGestionImp() {

            if ($('#dllEstadoCBModalImp').val() == '') {
                $(Swal.fire({
                    title: 'Debe ingresar un estado',
                    icon: 'error',
                    confirmButtonText: 'OK'
                }));
                return false;
            }

            if ($('#dllSubEstadoCbModalImp').val() == '') {
                $(Swal.fire({
                    title: 'Debe ingresar un subEstado',
                    icon: 'error',
                    confirmButtonText: 'OK'
                }));
                return false;
            }

            debugger;
            if ($("#dllSubEstadoCbModalImp").val() == 103 || $("#dllSubEstadoCbModalImp").val() == 106) {
                if ($('select[name="dllSubEstadoCbModalImp2"] option:selected').text() == "Seleccione...") {
                    $(Swal.fire({
                        title: 'Debe seleccionar subestado 2',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    }));
                    $("#dllSubEstadoCbModalImp2").focus();
                    return false;
                }
            }

            if ($('#txtobservacionImp').val() == '') {
                $(Swal.fire({
                    title: 'Debe ingresar una observación',
                    icon: 'error',
                    confirmButtonText: 'OK'
                }));
                return false;
            }
          

            const formData = {
                rut: $('#txtRutImp').val(),
                dv: $('#txtDvImp').val(),
                razon_social: $('#txtRazonSocialImp').val(),
                estado: $('select[name="dllEstadoCBModalImp"] option:selected').text(),
                subEstado: $('select[name="dllSubEstadoCbModalImp"] option:selected').text(),
                observacion: $('#txtobservacionImp').val(),
                rut_ejecutivo: getCookie('Rut'),
                subestado2: $('select[name="dllSubEstadoCbModalImp2"] option:selected').text(),
            };

            debugger;
            $.SecPostJSON(BASE_URL + "/motor/api/CobranzaPrevisional/guarda-gestion-cotizaciones-impagas", formData, function (respuesta) {
                debugger;
                Swal.fire({
                    title: 'Gestion ingresada correctamente!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })

                $("#divImpagasSubEstado2").css("display", "none");
                $("#dllSubEstadoCbModalImp2").val(-1);

            }).fail(function (errMsg) {
                debugger;
                $.niftyNoty({
                    type: "danger",
                    container: "floating",
                    title: "Avance Tareas",
                    message: "Tarea No Finalizada, contacte a Soporte!",
                    closeBtn: true,
                    timer: 5000
                });

            });

           /* fetch(`http://${motor_api_server}:4002/cobranza-previsional/guarda-gestion-cotizaciones-impagas`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'Token': getCookie('Token')
                }
            }).then(async (response) => {
                if (!response.ok) {
                    $(Swal.fire({
                        title: 'Error al guardar gestion',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    }));
                    return false;
                }
                Swal.fire({
                    title: 'Gestion ingresada correctamente!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            });
            */

            setTimeout(function () {
                appModalImpagas.obtenerHistorialImpagas($('#txtRutImp').val())
            }, 300);
            setTimeout(function () {
                appCobranzaPrev.cargaLeadFiltroCotizacionImpaga();
            }, 300);

            appModalImpagas.setDefaultsModalData()
        },
        setDefaultsModalData() {
            this.modelos = {
                estadosModal: '',
                subEstadosModal: '',
            }
            $('#txtobservacionImp').val("");

        }
    }
});
$('#modal_impagas').on('show.bs.modal', async (event) => {
    let dv = $(event.relatedTarget).data('dv')
    let rut = $(event.relatedTarget).data('rut')

    appModalImpagas.obtenerLeadImpagas(rut);
    appModalImpagas.obtenerHistorialImpagas(rut);
    formatMoneyPort();

});
$('#modal_impagas').on('hidden.bs.modal', function (e) {
    appModalImpagas.setDefaultsModalData();
})

//  MODAL COTIZACIONES DECLARADAS Y NO PAGADAS
var appModalDeclarado = new Vue({
    el: '#modal_declarada',
    data: {
        filtros: {
            estadosModal: [],
            subEstadosModal: [],
        },
        modelos: {
            estadosModal: '',
            subEstadosModal: '',
        },
        dataModal: {},
        dataModalHist: {},
    },
    mounted() {
        this.obtenerEstados();
    },
    methods: {

        obtenerEstados() {
            let padre = 0;
            fetch(`http://${motor_api_server}:4002/cobranza-previsional/lista-estados/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.estadosModal = estadosJSON;
                });
        },
        obtenerSubEstadosDec(padre) {
            fetch(`http://${motor_api_server}:4002/cobranza-previsional/lista-estados/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosSubJSON => {
                    this.filtros.subEstadosModal = estadosSubJSON;
                });
        },
        eventoCambiaEstadoDecModal() {
            this.obtenerSubEstadosDec(this.modelos.estadosModal)
        },
        obtenerLeadDeclarado(rut) {
            fetch(`http://${motor_api_server}:4002/cobranza-previsional/detalle-lead-declaradas/${rut}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.dataModal = datos[0];
                    return datos
                })
        },
        obtenerHistorialDeclarado(rut) {
            fetch(`http://${motor_api_server}:4002/cobranza-previsional/historial-cotizaciones-declaradas/${rut}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.dataModalHist = datos;
                    return datos
                })
        },
        handleSubmitGuadarGestionDec() {

            if ($('#dllEstadoCBModalDec').val() == '') {
                $(Swal.fire({
                    title: 'Debe ingresar un estado',
                    icon: 'error',
                    confirmButtonText: 'OK'
                }));
                return false;
            }

            if ($('#dllSubEstadoCbModalDec').val() == '') {
                $(Swal.fire({
                    title: 'Debe ingresar un subEstado',
                    icon: 'error',
                    confirmButtonText: 'OK'
                }));
                return false;
            }


            if ($("#dllSubEstadoCbModalDec").val() == 103 || $("#dllSubEstadoCbModalDec").val() == 106) {
                if ($('select[name="dllSubEstadoCbModalDec2"] option:selected').text() == "Seleccione...") {
                    $(Swal.fire({
                        title: 'Debe seleccionar subestado 2',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    }));
                    $("#dllSubEstadoCbModalDec2").focus();
                    return false;
                }
            }

            if ($('#txtobservacionDec').val() == '') {
                $(Swal.fire({
                    title: 'Debe ingresar una observación',
                    icon: 'error',
                    confirmButtonText: 'OK'
                }));
                return false;
            }

            const formData = {
                rut: $('#txtRutDec').val(),
                dv: $('#txtDvDec').val(),
                razon_social: $('#txtRazonSocialDec').val(),
                estado: $('select[name="dllEstadoCBModalDec"] option:selected').text(),
                subEstado: $('select[name="dllSubEstadoCbModalDec"] option:selected').text(),
                observacion: $('#txtobservacionDec').val(),
                rut_ejecutivo: getCookie('Rut'),
                oficina: parseInt(getCookie('Oficina')),
                subestado2: $('select[name="dllSubEstadoCbModalDec2"] option:selected').text(),
            };

            debugger;
            $.SecPostJSON(BASE_URL + "/motor/api/CobranzaPrevisional/guarda-gestion-cotizaciones-no-declaradas", formData, function (respuesta) {
                debugger;
                Swal.fire({
                    title: 'Gestion ingresada correctamente!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                $("#divDecSubEstado2").css("display", "none");
                $("#dllSubEstadoCbModalDec2").val(-1);

            }).fail(function (errMsg) {
                debugger;
                $.niftyNoty({
                    type: "warning",
                    container: "floating",
                    title: "Avance Tareas",
                    message: "Tarea No Finalizada, contacte a Soporte!",
                    closeBtn: true,
                    timer: 5000
                });

            });

            //fetch(`http://${motor_api_server}:4002/cobranza-previsional/guarda-gestion-cotizaciones-declaradas`, {
            //    method: 'POST',
            //    body: JSON.stringify(formData),
            //    headers: {
            //        'Content-Type': 'application/json',
            //        'Token': getCookie('Token')
            //    }
            //}).then(async (response) => {
            //    if (!response.ok) {
            //        $(Swal.fire({
            //            title: 'Error al guardar gestion',
            //            icon: 'error',
            //            confirmButtonText: 'OK'
            //        }));
            //        return false;
            //    }
            //    Swal.fire({
            //        title: 'Gestion ingresada correctamente!',
            //        icon: 'success',
            //        confirmButtonText: 'OK'
            //    })
            //});


            setTimeout(function () {
                appModalDeclarado.obtenerHistorialDeclarado($('#txtRutDec').val())
            }, 300);
            setTimeout(function () {
                appCobranzaPrev.cargaLeadFiltroDiferenciCotizacion();
            }, 300);

            appModalDeclarado.setDefaultsModalData()
        },
        setDefaultsModalData() {
            this.modelos = {
                estadosModal: '',
                subEstadosModal: '',
            }
            $('#txtobservacionDec').val("");

        }
    }
});
$('#modal_declarada').on('show.bs.modal', async (event) => {
    let dv = $(event.relatedTarget).data('dv')
    let rut = $(event.relatedTarget).data('rut')

    appModalDeclarado.obtenerLeadDeclarado(rut);
    appModalDeclarado.obtenerHistorialDeclarado(rut);
    formatMoneyPort();

});
$('#modal_declarada').on('hidden.bs.modal', function (e) {
    appModalDeclarado.setDefaultsModalData();
})