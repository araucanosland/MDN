
if (getCookie('Rut') === '13115389-9' || getCookie('Rut') === '14211768-1' || getCookie('Rut') === '16455469-4' || getCookie('Rut') === '08398979-3') {
    $('.slSucVisado').css('display', 'block');
}
else {
    $('.slSucVisado').css('display', 'none');
}




var prospectoDefaults = {
    id: 0,
    clase: 'Z',
    fechaCreacion: new Date(),
    cajaOrigen: 'na',
    oficinaIngreso: 0,
    ejecutivoIngreso: 'na',
    empresa: {
        "rut": "na",
        "nombre": "na",
        "rutHolding": "na",
        "nombreHolding": "na",
        "cantidadEmpleados": 0,
        "segmento": "na",
        "categoria": "na",
        "rubro": "na",
        "region": 0,
        "comuna": "na",
        "direccion": "na"
    }
};

const office = getCookie('Oficina');
const rutEjecutivo = getCookie('Rut');

Vue.filter('formatDate', function (value) {
    if (value) {
        var f = new Date(value);
        return f.toChileanDateString();
    }
});

var app = new Vue({
    el: '#page-prospectos-visados',
    data: {
        prospectosVisados: {},
        seleccionadoModal: prospectoDefaults,
        participees: {
            contactos: [],
            actuales: []
        },
        rutLogeado: getCookie('Rut'),
        cargoLogeado: getCookie('Cargo'),
        oficinaLogeado: getCookie('Oficina'),
        canales: [],
        ejecutivos: [],
        resultados: {
            resultadosPadres: [],
            resultadosHijos: [],
            resultadosAll: []
        },
        toipics: {
            vista: [],
            respuestas: []
        },
        formulario: {
            canales: [],
            estado: 0,
            subEstado: 0,
            comentarios: '',
            fechaProximaGestion: '',
            participantes: []
        },
        erroresValidacion: [],
        erroresValidaContacto: [],
        formularioContacto: {
            cargo: '',
            nombre: '',
            correo: '',
            telefono: '',
            celular: ''
        },
        filtros: {
            estadoGestion: '',
            clase: '',
            fechaInicioCompromiso: '',
            fechaFinCompromiso: '',
            busquedaEmpresa: '',
            rutEjecutivo: ''
        },
        sucursales: [],
        sucursalSeleccionada: ''
    },
    mounted: async function () {
        this.fetchLeads();
        this.fetchTopicos();
        this.sucursales = await this.fetchSucursales();

        if (this.vistaElevada) {
            this.ejecutivos = await this.fetchEjecutivos();
            $('#table-conche').bootstrapTable('showColumn', 'ejecutivo');
        }

        console.log('mounted');
    },
    updated: async function () {
        if (this.participees.actuales !== this.participees.contactos) {
            this.participees.actuales = this.participees.contactos;
            $("#managementQuorum").trigger("chosen:updated");
        }

        this.formulario.fechaProximaGestion = $('#nextCommitmentDate').val();
        this.formulario.participantes = [];
        $("#managementQuorum option:selected").each((i, e) => {
            this.formulario.participantes.push(parseInt($(e).val()));
        });

        this.checkForm();
        this.fireCalendar();

        console.log('updated');
    },
    methods: {
        async initModal(leadId, empresaRut) {
            this.seleccionadoModal = await this.fetchLead(leadId);
            this.participees = await this.fetchParticipees(empresaRut);
            this.canales = await this.fetchChannels();
            this.resultados.resultadosAll = await this.fetchResultados();
            this.resultados.resultadosPadres = this.resultados.resultadosAll.filter((elm) => elm.resultadoPadre === null);
        },
        fetchLeads() {
            /**/
            let q = {};
            if (this.vistaElevada) {
                q.oficina = this.oficinaLogeado;
            } else {
                q.rutEjecutivo = this.rutLogeado;
                q.oficina = this.oficinaLogeado;
            }

            $('#table-conche').bootstrapTable({
                url: `http://${motor_api_server}:4002/lead-visados`,
                query: q
            });
            setTimeout(function () {
                $("#table-conche").bootstrapTable('refresh', {
                    url: `http://${motor_api_server}:4002/lead-visados`,
                    query: q
                });
            }, 100);

        },
        fetchLead(id) {
            return fetch(`http://${motor_api_server}:4002/lead-visados/${id}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json());
        },
        fetchParticipees(empresaRut) {
            return fetch(`http://${motor_api_server}:4002/lead-visados/${empresaRut}/participantes?global=1`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json());
        },
        fetchChannels() {
            return fetch(`http://${motor_api_server}:4002/lead-visados/listados/canales`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json());
        },
        fetchResultados() {
            return fetch(`http://${motor_api_server}:4002/lead-visados/listados/resultados`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json());
        },
        fetchTopicos() {
            return fetch(`http://${motor_api_server}:4002/lead-visados/listados/topicos`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(myJson => {
                    this.$set(this.toipics, 'vista', myJson);
                });
        },
        handleResultadosHijos(padre) {
            this.$set(this.resultados, 'resultadosHijos', this.resultados.resultadosAll.filter(elm => elm.resultadoPadre !== null && elm.resultadoPadre.id === parseInt(padre)));
        },
        handleSubmit() {

            if (this.erroresValidacion.length === 0) {
                $('.bloquear-onsubmit').prop('disabled', true);

                const formData = {
                    ...this.formulario,
                    leadId: this.seleccionadoModal.id,
                    topicosResueltos: [],
                    ejecutivoRut: getCookie('Rut'),
                    ejecutivoNombre: getCookie('Usuario'),
                    oficina: parseInt(getCookie('Oficina'))
                };


                this.toipics.vista.forEach(topico => {
                    formData.topicosResueltos.push({
                        topicoId: topico.id,
                        nota: $(`input[name="radio_${topico.id}"]:checked`).val(),
                        comentario: $(`#text_${topico.id}`).val()
                    });
                });


                fetch(`http://${motor_api_server}:4002/lead-visados`, {
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
                            container: '#mensajes'
                        });

                        return false;
                    }



                    $('.bloquear-onsubmit').prop('disabled', false);

                    $.niftyNoty({
                        type: 'success',
                        icon: 'pli-like-2 icon-2x',
                        message: 'Gestión Guardada correctamente.',
                        container: '#mensajes'
                    });

                    this.formulario = {
                        canales: [],
                        estado: 0,
                        subEstado: 0,
                        comentarios: '',
                        fechaProximaGestion: '',
                        participantes: []
                    };

                    this.seleccionadoModal = await this.fetchLead(this.seleccionadoModal.id);
                    this.participees = await this.fetchParticipees(this.seleccionadoModal.empresa.rut);
                    $('#nextCommitmentDate').val('');
                    $("#managementQuorum option").prop('selected', false).trigger("chosen:updated");

                }).catch(reasons => {
                    console.log({ reasons });

                    $.niftyNoty({
                        type: 'danger',
                        message: 'Error al intentar guardar gestión.',
                        container: '#mensajes'
                    });
                });
            } else {
                $('#mensajes').html("");
                $.niftyNoty({
                    type: 'danger',
                    message: '<strong>Debes Ingresar los campos Obligatorios</strong> <br/>*' + this.erroresValidacion.join('<br/> *'),
                    container: '#mensajes'
                });
            }


        },
        checkForm() {

            this.erroresValidacion = [];

            if (this.formulario.canales.length === 0) {
                this.erroresValidacion.push('Debes Seleccionar un canal');
            }

            if (this.formulario.estado === '' || this.formulario.estado === 0) {
                this.erroresValidacion.push('Debes Seleccionar un Estado');
            }

            if (this.formulario.subEstado === '' || this.formulario.subEstado === 0) {
                this.erroresValidacion.push('Debes Seleccionar un Sub Estado');
            }

            if (this.formulario.comentarios.length === 0) {
                this.erroresValidacion.push('Debes Ingresar comentarios');
            }
            else if (this.formulario.comentarios.length === 5) {
                this.erroresValidacion.push('Debes Ingresar almenos 5 Caracteres');
            }

            if (this.formulario.participantes.length === 0) {
                this.erroresValidacion.push('Debes Seleccionar algún Participante');
            }
        },
        handleContactSubmit() {


            this.erroresValidaContacto = [];

            if (this.formularioContacto.cargo.length === 0) {
                this.erroresValidaContacto.push('Debes seleccionar un Cargo');
            }

            if (this.formularioContacto.nombre.length === 0) {
                this.erroresValidaContacto.push('Debes ingresar un nombre');
            }

            if (this.erroresValidaContacto.length === 0) {
                const contactoDTO = {
                    ...this.formularioContacto,
                    oficina: parseInt(getCookie('Oficina')),
                    ejecutivo: getCookie('Rut'),
                    empresaRut: this.seleccionadoModal.empresa.rut
                };


                fetch(`http://${motor_api_server}:4002/empresas/contactos/add`, {
                    method: 'POST',
                    body: JSON.stringify(contactoDTO),
                    headers: {
                        'Content-Type': 'application/json',
                        'Token': getCookie('Token')
                    }
                }).then(async (response) => {

                    if (!response.ok) {

                        $.niftyNoty({
                            type: 'danger',
                            message: 'Error al intentar guardar contacto.',
                            container: '#mensajes_contacto'
                        });

                        return false;
                    }


                    $.niftyNoty({
                        type: 'success',
                        icon: 'pli-like-2 icon-2x',
                        message: 'Contacto Guardado correctamente.',
                        container: '#mensajes_contacto'
                    });



                    this.formularioContacto = {
                        cargo: '',
                        nombre: '',
                        correo: '',
                        telefono: '',
                        celular: ''
                    };

                    this.seleccionadoModal = await this.fetchLead(this.seleccionadoModal.id);
                    this.participees = await this.fetchParticipees(this.seleccionadoModal.empresa.rut);
                    $("#managementQuorum").trigger("chosen:updated");

                }).catch(reasons => {
                    console.log({ reasons });

                    $.niftyNoty({
                        type: 'danger',
                        message: 'Error al intentar guardar gestión.',
                        container: '#mensajes_contacto'
                    });
                });

                console.log({
                    contactoDTO
                });
            } else {
                $('#mensajes_contacto').html("");
                $.niftyNoty({
                    type: 'danger',
                    message: '<strong>Debes Ingresar los campos Obligatorios</strong> <br/>*' + this.erroresValidaContacto.join('<br/> *'),
                    container: '#mensajes_contacto'
                });
            }


        },
        handleFilterTable() {

            let update = true;
            let filtros = {};


            if (this.vistaElevada) {
                filtros.oficina = this.oficinaLogeado;
                if (this.filtros.rutEjecutivo !== '') {
                    filtros.rutEjecutivo = this.filtros.rutEjecutivo;
                }
            } else {
                filtros.rutEjecutivo = this.rutLogeado;
            }

            if (this.filtros.estadoGestion !== '') {
                filtros.estado = this.filtros.estadoGestion;
            }

            if (this.filtros.clase !== '') {
                filtros.clase = this.filtros.clase;
            }

            if (this.filtros.fechaInicioCompromiso !== '' && this.filtros.fechaFinCompromiso !== '') {
                filtros.fechaInicioCompromiso = this.filtros.fechaInicioCompromiso;
                filtros.fechaFinCompromiso = this.filtros.fechaFinCompromiso;
            }

            if (this.filtros.busquedaEmpresa !== '' && this.filtros.busquedaEmpresa.length > 5) {
                filtros.busquedaEmpresa = this.filtros.busquedaEmpresa;
            } else if (this.filtros.busquedaEmpresa === '') {
                filtros.busquedaEmpresa = this.filtros.busquedaEmpresa;
            } else {
                update = false;
            }

            if (update) {
                $("#table-conche").bootstrapTable('refresh', {
                    url: `http://${motor_api_server}:4002/lead-visados`,
                    query: filtros
                });
            }
        },
        fireCalendar() {
            $('.lafecha .input-group.date').datepicker({
                autoclose: true,
                format: 'dd-mm-yyyy',
                language: "es",
                daysOfWeekDisabled: [6, 0],
                todayHighlight: true
            }).on('changeDate', function (event) {
                event.stopPropagation();
                const $that = $(event.target);
                const formdata = { fecha: event.date, id: $that.data('lead') };
                //console.log({ event, formdata }); return false;
                fetch(`http://${motor_api_server}:4002/lead-visados/set-fecha-primer-compromiso`, {
                    method: 'POST',
                    body: JSON.stringify(formdata),
                    headers: {
                        'Content-Type': 'application/json',
                        'Token': getCookie('Token')
                    }
                }).then(response => response.json())
                    .then(json => {
                        let $td = $that.closest('td');
                        $td.html(event.date.toChileanDateString());
                    });
            });
        },
        resetFilters() {
            this.filtros.estadoGestion = '';
            this.filtros.clase = '';
            this.filtros.fechaInicioCompromiso = '';
            this.filtros.fechaFinCompromiso = '';
            this.filtros.busquedaEmpresa = '';
            $("#table-conche").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/lead-visados?rutEjecutivo=${rutEjecutivo}`
            });
        },
        fetchEjecutivos() {
            return fetch(`${BASE_URL}/motor/api/perfil-empresas/dotacion-oficina`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Token': getCookie('Token')
                }
            }).then(response => response.json());

        },
        fetchSucursales() {
            return fetch(`${BASE_URL}/motor/api/stage/call-center/oficinas`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Token': getCookie('Token')
                }
            }).then(response => response.json());
        },
        handleSucursalesChange(e) {
            let q = {
                oficina: this.sucursalSeleccionada
            };

            $('#table-conche').bootstrapTable('refresh', { query: q });
        }
    },
    computed: {
        clasificacionClass: function () {
            return {
                'alert': true,
                'alert-success': this.seleccionadoModal.clase === 'A',
                'alert-warning': this.seleccionadoModal.clase === 'B',
                'alert-danger': this.seleccionadoModal.clase === 'C'
            };
        },
        vistaElevada: function () {
            return ((this.cargoLogeado === 'Agente' && this.oficinaLogeado === '992') || this.cargoLogeado === 'Administrador Sistema');
        }
    }
});


//Eventos JQUERY
$(function () {
    $('#table-conche').on('load-success.bs.table', function () {

        console.info('Hola pasamos por el evento de la tabla');
        app.fireCalendar();
    });


    $('#modalGestion').on('show.bs.modal', async (event) => {
        var $opener = $(event.relatedTarget);
        var leadId = $opener.data('lead');
        var empresaRut = $opener.text();
        await app.initModal(leadId, empresaRut);
    });

    $('#modalGestion').on('hidden.bs.modal', function (event) {
        app.$data.seleccionadoModal = prospectoDefaults;
        app.$data.formulario = {
            canales: [],
            estado: 0,
            subEstado: 0,
            comentarios: '',
            fechaProximaGestion: '',
            participantes: []
        };

        app.$data.participees.actuales = [];
        app.$data.participees.contactos = [];
        $('#nextCommitmentDate').val('');
        $("#managementQuorum").trigger("chosen:updated");
    });

    $('#bt-nuevo-contacto').on('click', function (event) {
        $('#bt-nuevo-contacto').hide();
        $('#bt-nuevo-contacto-volver').show();
        $('#wrap-contactos').hide();
        $('#wrap-add-contactos').show('slow');
    });

    $('#bt-nuevo-contacto-volver').on('click', function () {
        $('#bt-nuevo-contacto').show();
        $('#bt-nuevo-contacto-volver').hide();
        $('#wrap-add-contactos').hide();
        $('#wrap-contactos').show('slow');
    });

    //Chosen
    $('#managementQuorum').chosen({ width: '100%' }).change((event) => {
        app.$forceUpdate();
    });



    $('#demo-dp-range .input-daterange').datepicker({
        format: "dd-mm-yyyy",
        todayBtn: "linked",
        autoclose: true,
        todayHighlight: true,
        daysOfWeekDisabled: [6, 0],
        language: 'es'
    }).on('changeDate', function () {
        app.$data.filtros.fechaInicioCompromiso = $('#f-start').val();
        app.$data.filtros.fechaFinCompromiso = $('#f-end').val();
        app.handleFilterTable();
        app.$forceUpdate();
    });

    /*setTimeout(() => {
        app.fireCalendar();
    }, 1000);*/


    //Datepicker
    $('#dp-fecha-proxima-gestion .input-group.date').datepicker({
        autoclose: true,
        format: 'dd-mm-yyyy',
        language: "es",
        daysOfWeekDisabled: [6, 0],
        todayHighlight: true
    })
        .on('changeDate', function (event) {
            event.stopPropagation();
            app.$forceUpdate();
        })
        .on('show.bs.modal hide.bs.modal', function (event) {
            event.stopPropagation();
        });
});

//Formatters

function prospectosVisados_formatRut(value, row, index) {
    return `<a class="btn-link" data-toggle="modal" data-target="#modalGestion" data-lead="${row.id}" href="#">${value}</a>`;
}

function prospectosVisados_formatPrimerCompromiso(value, row, index) {

    return row.fechaCompromisoPrimeraGestion === null ? `<div class="form-group">
                                    <div class="lafecha">
                                        <div class="input-group date" data-lead="${row.id}">
                                            <input type="text" class="form-control" readonly>
                                            <span class="input-group-addon"><i class="demo-pli-calendar-4"></i></span>
                                        </div>
                                    </div>
                                </div>` : row.fechaCompromisoPrimeraGestion.toFecha();
}

function prospectosVisados_formatBanderaGestion(value, row, index) {
    return row.gestiones.length > 0 ? `Gestionado` : `No Gestionado`;
}

function prospectosVisados_formatNombreEjecutivoAsignado(value, row, index) {
    return $(`#filtrar-ejecutivo option[value='${row.ejecutivoIngreso}'`).text();
}