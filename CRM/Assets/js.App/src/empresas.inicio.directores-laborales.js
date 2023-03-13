//@charlie Prä//
var app = new Vue({
    el: '#tab-2',
    data: {
        sesion: {
            rutEjecutivo: function () {
                return getCookie('Rut');
            },
            oficina: function () {
                return parseInt(getCookie('Oficina'));
            },
            cargo: function () {
                return getCookie('Cargo');
            }
        },
        leadModal: {
            id: 0,
            empresaRut: '',
            empresaCodigoPuntoAtencion: '',
            empresaNombre: '',
            empresaNombrePuntoAtencion: '',
            empresaCantidadTrabajadores: 0,
            banderaNoAplica: null,
            directoresLaborales: [],
            contactosEmpresa: []
        },
        leads: [
            {
                id: 0,
                empresaRut: '',
                empresaCodigoPuntoAtencion: '',
                empresaNombre: '',
                empresaNombrePuntoAtencion: '',
                empresaCantidadTrabajadores: 0,
                directoresLaborales: []
            }
        ],
        modeloFormulario: {
            nombre: '',
            cargo: '',
            tipo: '',
            telefonoFijo: '',
            telefonoCelular: '',
            correo: ''
        },
        erroresValidacion: [],
        filtros: {
            estadoGestion: '',
            ejecutivo: getCookie('Rut')
        },
        estado: {
            editando: false,
            ejecutivos: []
        }
    },
    mounted: async function () {
        //await this.fetchLeads();

        $('#table-conche').bootstrapTable({
            url: `http://${motor_api_server}:4002/directores-laborales?ejecutivo=${this.sesion.rutEjecutivo()}`
        });

        if (this.mostrarAdminSucursal) {
            console.log({ mensaje: 'somos admins!!' });
            this.fetchEjecutivosOficina();
        }
    },
    updated: function () {
        this.chequeaFormulario();

        //console.log({
        //    mostrarAdminSucursal: this.mostrarAdminSucursal
        //})
    },
    methods: {
        async fetchLeads() {
            return fetch(`http://${motor_api_server}:4002/directores-laborales?ejecutivo=${this.sesion.rutEjecutivo()}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            }).then(response => response.json())
                .then(leads => this.leads = leads)
                .then(x => {
                    if ($('#table-conche').bootstrapTable() === undefined) {
                        $('#table-conche').bootstrapTable();
                    }
                });
        },
        async fetchLead(id) {
            return fetch(`http://${motor_api_server}:4002/directores-laborales/${id}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json());
        },
        async agregaDirectivo() {

            if (this.erroresValidacion.length > 0) {
                $('#mensajes').html("");
                $.niftyNoty({
                    type: 'danger',
                    title: `<strong>Debes Ingresar los campos Obligatorios</strong> `,
                    message: `<ul><li> ${this.erroresValidacion.join('</li><li>')}</li></ul>` ,
                    container: '#mensajes'
                });
                return false;
            }

            $('.bloquear-onsubmit').prop('disabled', true);
            const formdata = {
                ...this.modeloFormulario,
                empresaId: this.leadModal.id,
                ejecutivoIngreso: this.sesion.rutEjecutivo(),
                oficinaIngreso: this.sesion.oficina()
            };

            let url_envio = `http://${motor_api_server}:4002/directores-laborales`;
            let metodo_envio = 'POST';

            if (this.estado.editando) {
                url_envio = `http://${motor_api_server}:4002/directores-laborales/${this.estado.editando}`;
                metodo_envio = 'PUT';
                console.log('estamos aca', { codigo: this.estado.editando, url_envio, metodo_envio });
            }

            fetch(url_envio, {
                method: metodo_envio,
                body: JSON.stringify(formdata),
                headers: {
                    'Content-Type': 'application/json',
                    'Token': getCookie('Token')
                }
            }).then(async (response) => {

                if (!response.ok) {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Error al intentar ingresar "Directivo", porfavor intenta nuevamente mas tarde.',
                        container: '#mensajes'
                    });
                    return false;
                }

                this.modeloFormulario = {
                    nombre: '',
                    cargo: '',
                    telefonoFijo: '',
                    telefonoCelular: '',
                    correo: '',
                    tipo: ''
                };
                this.estado.editando = false;

                await this.initModal(formdata.empresaId);
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Gestión Guardada correctamente.',
                    container: '#mensajes'
                });

                $('.bloquear-onsubmit').prop('disabled', false);
            });


        },
        async chequeaFormulario() {
            this.erroresValidacion = [];

            if (this.modeloFormulario.nombre.length === 0) {
                this.erroresValidacion.push('Debes ingresar un "Nombre"');
            }

            if (this.modeloFormulario.cargo.length === 0) {
                this.erroresValidacion.push('Debes seleccionar un "Cargo"');
            }

            if (this.modeloFormulario.tipo.length === 0) {
                this.erroresValidacion.push('Debes seleccionar un "Tipo"');
            }
        },
        async initModal(leadId) {
            this.leadModal = await this.fetchLead(leadId);


        },
        handleFilterTable(event) {
            $("#table-conche").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/directores-laborales`,
                query: {
                    ejecutivo: this.sesion.rutEjecutivo(),
                    estado: this.filtros.estadoGestion
                }
            });
        },
        handleClickEditarDirectivo(id) {
            let obtenido = this.leadModal.directoresLaborales.find(directivo => directivo.id === id);
            console.log({ id, obtenido });
            this.estado.editando = id;
            this.modeloFormulario = {
                nombre: obtenido.nombre,
                cargo: obtenido.cargo,
                tipo: obtenido.tipo,
                telefonoFijo: obtenido.telefonoFijo,
                telefonoCelular: obtenido.telefonoCelular,
                correo: obtenido.correo
            };
        },
        handleClickEliminarDirectivo(id) {
            if (confirm('¿Realmente deseas eliminar el "Directivo" seleccionado?')) {
                fetch(`http://${motor_api_server}:4002/directores-laborales/${id}`, {
                    method: 'DELETE',
                    mode: 'cors'
                })
                    .then(async (response) => {
                        $.niftyNoty({
                            type: 'warning',
                            icon: 'pli-like-2 icon-2x',
                            message: 'Directivo eliminado con éxito.',
                            container: '#mensajes'
                        });

                        await this.initModal(this.leadModal.id);
                    });
            }
        },
        handleClickEmpresaNoAplica() {

            if (confirm(`¿Realmente deseas marcar esta empresa como "No Aplicable"?`)) {
  
                fetch(`http://${motor_api_server}:4002/directores-laborales/empresa-no-aplica/${this.leadModal.id}`, {
                    method: 'PUT',
                    mode: 'cors'
                })
                    .then(async (response) => {

                        $.niftyNoty({
                            type: 'warning',
                            icon: 'pli-like-2 icon-2x',
                            message: 'Empresa marcada con éxito.',
                            container: '#mensajes'
                        });
                        await this.initModal(this.leadModal.id);
                    });
            }
        },
        fetchEjecutivosOficina() {
            fetch(`${BASE_URL}/motor/api/perfil-empresas/dotacion-oficina`, {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Token': getCookie('Token')
                }
            })
                .then(response => response.json())
                .then(rsJson => {
                    this.estado.ejecutivos = rsJson;
                });
        },
        handleChangeEjecutivo() {
            $("#table-conche").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/directores-laborales`,
                query: {
                    ejecutivo: this.filtros.ejecutivo,
                    estado: this.filtros.estadoGestion
                }
            });
        }
    },
    computed: {
        mostrarAdminSucursal: function () {
            let cargosPermitidos = ['Agente', 'Jefe Servicio al Cliente', 'Administrador Sistema'];
            return cargosPermitidos.indexOf(this.sesion.cargo()) > -1; 
        }
    }
});

function linkFormatter(value, row) {
    return `<a class="btn-link" data-toggle="modal" data-target="#modalGestion" data-lead="${row.id}" href="#">${row.empresaCodigoPuntoAtencion}</a>`;
}

function estadoFormatter(value, row) {
    return  row.banderaNoAplica === null ? row.directoresLaborales.length > 0  ? 'Gestionado' : 'Sin Gestión' : 'No Aplica';
}

function nombresFormatter(value, row) {
    return `${row.empresaNombre} \\ ${row.empresaNombrePuntoAtencion}`;
}

//Eventos JQUERY
$(function () {
    $('#modalGestion').on('show.bs.modal', async (event) => {
        var $opener = $(event.relatedTarget);
        var leadId = $opener.data('lead');
        await app.initModal(leadId);
    });

    $('#modalGestion').on('hidden.bs.modal', async (event) => {
        //$('#table-conche').bootstrapTable('destroy');
        await app.fetchLeads();
        app.$data.estado.editando = false;
        app.$data.modeloFormulario = {
            nombre: '',
            cargo: '',
            tipo: '',
            telefonoFijo: '',
            telefonoCelular: '',
            correo: ''
        };

        app.$data.leadModal = {
            id: 0,
            empresaRut: '',
            empresaCodigoPuntoAtencion: '',
            empresaNombre: '',
            empresaNombrePuntoAtencion: '',
            empresaCantidadTrabajadores: 0,
            banderaNoAplica: null,
            directoresLaborales: [],
            contactosEmpresa: []
        };


        $('#mensajes').html("");
    });


    

});
