jQuery.support.cors = true;
var appCobranzaFiltros = new Vue({
    el: '#demo-lft-tab-10',
    data: {
        filtros: {
            causas: [],
            estados: [],
            subEstados: [],
            prioridad: [],
            vencimiento: [],
            estadoCliente: [],
            tipoCampana: [],
            derivacion: [],
        },
        modelos: {
            estado_cobranza: '',
            subEstado_cobranza: '',
            causa_cobranza: '',
            prioridad_cobranza: '',
            estadoCliente_cobranza: '',
            tipoCampana_cobranza: '',
            derivacion_cobranza: '',
        }
    },
    mounted() {
        this.obtenerCausas_cobranza();
        this.obtenerEstados_cobranza();
        this.loadTablacobranza();
        this.obtenerPrioridad();
        this.obtenerEstadoCliente();
        this.obtenerTipoCamapana();
        this.obtenerDerivacion();
    },
    updated() {
        // console.log('cambió')
    },
    methods: {
        obtenerCausas_cobranza() {
           
            fetch(`http://${motor_api_server}:4002/cobranza/causas`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(causasJSON => {
                   
                    this.filtros.causas = causasJSON;
                });
        },
        obtenerEstados_cobranza() {
            fetch(`http://${motor_api_server}:4002/cobranza/estados`, {
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
            fetch(`http://${motor_api_server}:4002/cobranza/estados?padre=${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosSubJSON => {
                    this.filtros.subEstados = estadosSubJSON;
                });
        },
        obtenerEstadoCliente() {
            fetch(`http://${motor_api_server}:4002/cobranza/estadoCliente`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.estadoCliente = estadosJSON;
                });
        },
        obtenerPrioridad() {
            fetch(`http://${motor_api_server}:4002/cobranza/Prioridad`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.prioridad = estadosJSON;
                });
        },
        obtenerTipoCamapana() {
            fetch(`http://${motor_api_server}:4002/cobranza/tipocampana`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.tipoCampana = estadosJSON;
                });
        },
        obtenerDerivacion() {
            fetch(`http://${motor_api_server}:4002/cobranza/derivacion`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.derivacion = estadosJSON;
                });
        },
        eventoCambiaEstado() {

            this.obtenerSubEstados(this.modelos.estado)

        },
        handleEventoClickFiltrarCobranza() {
           
            var fechaHoy = new Date();
            var periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');

            console.log({
                modelo: this.modelos
            })
            $("#tabla_cobranza").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/cobranza/leads`,
                query: {
                    periodo: periodo,
                    asignado: getCookie('Rut'),
                    causa: this.modelos.causa_cobranza,
                    estado: this.modelos.estado_cobranza,
                    subEstado: this.modelos.subEstado_cobranza,
                    prioridad: this.modelos.prioridad_cobranza,
                    estadoCliente: this.modelos.estadoCliente_cobranza,
                    tipoCampana: this.modelos.tipoCampana_cobranza,
                    derivacion: this.modelos.derivacion_cobranza,
                    oficina: getCookie('Oficina'),
                }
            });
        },
        loadTablacobranza() {
            $("#tabla_cobranza").bootstrapTable();
        }
    }
});


function cobranzaLinkFormatter(value, row, index) {
    return `<a href="#" class="btn-link" data-target="#mdl_data_cobranza" data-toggle="modal" data-lead="${row.id}" data-periodo="${row.periodo}" data-rut="${value}" >${value}</a>`;
}

function cobranzaNombresFormatter(value, row, index) {
    try {
        return value + ' ' + row.afiliado.apellidos;
    }
    catch
    {
        return 'No tenemos el dato Registrado';
        console.log({ row })
    }
}

function cobranzaPrioridadFormatter(value, row, index) {
    return value.toString().toEtiquetaPrioridad();
}

function cobranzaFormaterBasal(value, row, index) {

    try {
        if (row.gestiones[row.gestiones.length - 1] != undefined) {
            return row.gestiones[row.gestiones.length - 1].causaBasal.nombre
        } else {
            return '-';
        }
    }
    catch
    {
        return '-';
    }
}

function cobranzaFormaterEstado(value, row, index) {
    if (row.gestiones.length > 0) {
        const maximo = Math.max.apply(Math, row.gestiones.map(function (o) { return o.estadoCliente.id; }));
        const objetoFinal = row.gestiones.find((e) => {
            return e.estadoCliente.id === maximo;
        });
        return `<span class="${objetoFinal.estadoCliente.color}">${objetoFinal.estadoCliente.estado}</span>`
    }
    return '-';
}


function formatoMoneyFormatter(value, row, index) {
    return value.toMoney(0);
}

function estadoAfiliadoFormatter(value, row, index) {

    if (row.gestiones.length > 0) {
        const maximo = Math.max.apply(Math, row.gestiones.map(function (o) { return o.estadoCliente.id; }));
        const objetoFinal = row.gestiones.find((e) => {
            return e.estadoCliente.id === maximo;
        });
        return `<span class="${objetoFinal.estadoCliente.color}">${objetoFinal.estadoCliente.estado}</span>`
    }
    return 'Sin Gestion';
}


var appCobranzaModal = new Vue({
    el: '#mdl_data_cobranza',
    data: {
        filtrosModal: {
            causasModal: [],
            estadosModal: [],
            subEstadosModal: [],
            estadoCliente: []
        },
        modelosModal: {
            estado: '',
            subEstado: '',
            causaBasal: '',
            fechaCompromiso: '',
            comentarios: '',
            folioCredito: '',
        },
        comportamientos: {
            mostrarProximaGestionCobranza: false
        },
        dataModal: {}

    },
    mounted() {
        this.obtenerCausasModal();
        this.obtenerEstadosModal();
        this.obtenerEstadoClienteModal();
    },
    updated() {
        //console.log('cambió', {
        //    form: this.modelosModal
        //})
    },
    methods: {
        obtenerCausasModal() {
            fetch(`http://${motor_api_server}:4002/cobranza/causas`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(causasJSON => {
                    this.filtrosModal.causasModal = causasJSON;
                });
        },
        obtenerEstadosModal() {
            fetch(`http://${motor_api_server}:4002/cobranza/estados`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtrosModal.estadosModal = estadosJSON;
                });
        },
        obtenerSubEstadosModal(padre) {
          
         
            fetch(`http://${motor_api_server}:4002/cobranza/estados?padre=${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosSubJSON => {
                    this.filtrosModal.subEstadosModal = estadosSubJSON;
                });
        },
        obtenerEstadoCliente(datos) {
            if (datos.gestiones.length > 0) {
                const maximo = Math.max.apply(Math, datos.gestiones.map(function (o) {
                    //console.log({ o })
                    //return o.estadoCliente.id;
                    return o.estado.id;
                }));
                const objetoFinal = datos.gestiones.find((e) => {
                    return e.estadoCliente.id === maximo;

                    console.log({ objetoFinal });
                });
                $("#estadoClieModalNorm").html(`<span class="${objetoFinal.estadoCliente.color}">${objetoFinal.estadoCliente.estado}</span>`);
            } else {
                $("#estadoClieModalNorm").html('Sin Gestion');
            }
        },
        obtenerEstadoClienteModal() {
            fetch(`http://${motor_api_server}:4002/cobranza/estadoCliente`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtrosModal.estadoCliente = estadosJSON;
                });
        },

        eventoCambiaEstadoModal() {
           
            var param = $("#slEstadoModcobranza").val();
            this.obtenerSubEstadosModal(param)

        },
        manejarVisibilidadCalendarioCobranza() {
          
            const sbestado = this.filtrosModal.subEstadosModal.find(est => est.id == this.modelosModal.subEstado);
            this.comportamientos.mostrarProximaGestionCobranza = (new RegExp('--compromiso')).test(sbestado.opciones);
        },
        obtenerLead(rut) {
           
            var fechaHoy = new Date();
            var periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
            fetch(`http://${motor_api_server}:4002/cobranza/leads/${rut}/${periodo}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                   
                    console.log({
                        dep: datos
                    })
                    this.dataModal = datos;

                    return datos
                }).then(x => {
                    //this.obtenerEstadoCliente(x);
                });
        },
        handleSubmitcobranza() {
           
            let valContact = $('#slEstadoModcobranza').val();
            const formData = {
                lead: this.dataModal.id,
                ...this.modelosModal,
                rutEjecutivo: getCookie('Rut'),
                oficina: parseInt(getCookie('Oficina')),
                nombreEjecutivo: getCookie('Usuario'),
                rutAfiliado: $('#txtRutAfiNorm').val(),
            };

            fetch(`http://${motor_api_server}:4002/cobranza`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'Token': getCookie('Token')
                }
            }).then(async (response) => {
               
                if (!response.ok) {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Error al intentar guardar gestión.',
                        container: '.msjCobranza',
                        timer: 3000
                    });
                    return false;
                }
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Gestión Guardada correctamente.',
                    container: '.msjCobranza',
                    timer: 3000
                });
                $('#btGestcobranza').attr("disabled", true);
                $('#fpg_cobranza').css('display', 'none');
                appCobranzaModal.setDefaultsModal();
                appCobranzaFiltros.handleEventoClickFiltrar();


            });
            //.catch(reasons => {
            //    console.log({ reasons });
            //    $.niftyNoty({
            //        type: 'danger',
            //        message: 'Error al intentar guardar gestión.',
            //        container: '.msjcobranza',
            //        timer: 3000
            //    });
            //});
        },
        setDefaultsModal() {
            this.modelosModal = {
                estado: '',
                subEstado: '',
                causaBasal: '',
                fechaCompromiso: '',
                comentarios: '',
                folioCredito: '',
            }
        }
    },
});

$(function () {





    $('#mdl_data_cobranza').on('show.bs.modal', async (event) => {
      
        const rut = event.relatedTarget != undefined ? $(event.relatedTarget).data('rut') : $('#afi_rut_busc').val();
        console.log({ rut })
        var rutCont = rut
        rutCont = rutCont.substring(0, rutCont.length - 2)
        await appCobranzaModal.obtenerLead(rut);
        cargaDatosDeContacto(rutCont, '#bdy_datos_contactos_cobranza')
        appCobranzaModal.setDefaultsModal();
        $('#fpg_cobranza').css('display', 'none');
        $('#btGestcobranza').attr("disabled", false);


        setInterval(function () {
          
            $('#demo-dp-component_cobranza .input-group.date').datepicker({
                autoclose: true,
                format: 'dd-mm-yyyy',
                startdate: "0d",
                language: "es",
                daysofweekdisabled: [6, 0],
                todayhighlight: true
            }).on('show.bs.modal hide.bs.modal', function (event) {
                event.stoppropagation();
            });
        }, 1000);
        $("#msjContactCobranza").css('display', 'none')



    });


    $('#mdl_data_cobranza').on('hidden.bs.modal', async (event) => {
       
        appCobranzaModal.setDefaultsModal();
        $('#slBasalModcobranza').attr("disabled", true);
    });

    $('#slEstadoModcobranza').change(function (e) {
       
        e.preventDefault();
        if ($(this).val() == 1) {
            $('#slBasalModcobranza').attr("disabled", false);
        }
        else {
            $('#slBasalModcobranza').attr("disabled", true);
            $('#fpg_cobranza').css('display', 'none');
            $('#slBasalModcobranza').val("");
        }
    });

    $('.subEstadoCobranza').change(function (e) {
      
        appCobranzaModal.manejarVisibilidadCalendarioCobranza();
        $('#datos-gestion_cobranza').show();
        /*$('#demo-dp-component_cobranza .input-group.date').datepicker({
            autoclose: true,
            format: 'dd-mm-yyyy',
            startDate: "0d",
            language: "es",
            daysOfWeekDisabled: [6, 0],
            todayHighlight: true

        }).on('show.bs.modal hide.bs.modal', function (event) {
            // prevent datepicker from firing bootstrap modal "show.bs.modal"
            event.stopPropagation();
            });*/
    });
});