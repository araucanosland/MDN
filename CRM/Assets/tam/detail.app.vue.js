Vue.component('v-select', VueSelect.VueSelect);

var dApp = new Vue({
    el: '#detail-app',
    data: {
        afiliadoEncontrado: {},
        model: {
            id: '',
            idLead: '',
            rut: '',
            rut_formateado: '',
            fechaNacimiento: '',
            opcion: '',
            celular: '',
            telefono: '',
            email: '',
            validaCelular: '',
            validaTelefono: '',
            validaEmail: '',
            direcciones: {
                residenciaIgualDespacho: false,
                residencia: {
                    calle: '',
                    numero: '',
                    comuna: '',
                    validaCalle: '',
                    validaNumero: ''
                },
                laboral: {
                    calle: '',
                    numero: '',
                    comuna: '',
                    validaCalle: '',
                    validaNumero: ''
                },
                despacho: {
                    calle: '',
                    numero: '',
                    comuna: '',
                    validaCalle: '',
                    validaNumero: '',
                    numeracionInterior: ''
                }
            },
            eleccionTarjeta: '',
            respuestas: [],
            anotaciones: '',
            celularOperador: '',
            celularTipoContrato: '',
            contactoEmergencia: {
                nombre: '',
                telefono: '',
                relacion: ''
            },
        },
        config: {},
        comunas: [],
        preguntas: [],
        score: 0,
        scorePonderado: 0,
        respuestas: [],
        areAnswersEnabled: true,

    },
    methods: {
        preloadInfo: function () {
            this.showLoading();
            api(`${app_variables.external.motor_api_server}/tam/gestion/${rutAfiliado}/detalle/${idGestion}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Tracking-Id': '--charlie--'
                }
            }).then(response => {
                console.log(response)

                _.set(this, 'afiliadoEncontrado.rut', _.get(response, 'rut'));
                _.set(this, 'afiliadoEncontrado.nombre', _.get(response, 'nombre'));
                _.set(this, 'afiliadoEncontrado.edad', _.get(response, 'edad'));
                _.set(this, 'afiliadoEncontrado.flagTamMetro', _.get(response, 'flag_TamMetro'));
                _.set(this, 'afiliadoEncontrado.score', _.get(response, 'score_autenticacion'));

                _.set(this, 'model.rut', _.get(response, 'rut'));
                _.set(this, 'model.rut_formateado', _.get(response, 'rut'));
                _.set(this, 'model.id', _.get(response, 'id'));
                _.set(this, 'model.idLead', _.get(response, 'id_lead'));
                _.set(this, 'model.anotaciones', _.get(response, 'anotaciones'));

                _.set(this, 'model.direcciones.despacho.comuna', _.get(response, 'comuna_despacho'));
                _.set(this, 'model.direcciones.despacho.calle', _.get(response, 'direccion_despacho'));
                _.set(this, 'model.direcciones.despacho.numero', _.get(response, 'num_despacho'));
                _.set(this, 'model.direcciones.despacho.numeracionInterior', _.get(response, 'numeracion_interior_despacho'));

                _.set(this, 'model.direcciones.laboral.comuna', _.get(response, 'comuna_laboral'));
                _.set(this, 'model.direcciones.laboral.calle', _.get(response, 'direccion_laboral'));
                _.set(this, 'model.direcciones.laboral.numero', _.get(response, 'numero_laboral'));

                _.set(this, 'model.direcciones.residencia.comuna', _.get(response, 'comuna_residencia'));
                _.set(this, 'model.direcciones.residencia.calle', _.get(response, 'direccion_residencia'));
                _.set(this, 'model.direcciones.residencia.numero', _.get(response, 'num_residencia'));
                _.set(this, 'model.direcciones.residencia.numeracionInterior', _.get(response, 'numeracion_interior_residencia'));

                _.set(this, 'model.opcion', _.get(response, 'opcion_bip'));
                _.set(this, 'model.eleccionTarjeta', _.get(response, 'seleccion_tarjeta'));
                _.set(this, 'model.fechaNacimiento', moment(_.get(response, 'fecha_nacimiento')).format('DD-MM-YYYY'));

                _.set(this, 'model.email', _.get(response, 'correo'));
                _.set(this, 'model.celular', _.get(response, 'celular'));
                _.set(this, 'model.celularOperador', _.get(response, 'celular_operador', ''));
                _.set(this, 'model.celularTipoContrato', _.get(response, 'celular_tipo_contrato', ''));
                _.set(this, 'model.telefono', _.get(response, 'telefono'));

                _.set(this, 'model.contactoEmergencia.nombre', _.get(response, 'contacto_emergencia_nombre'));
                _.set(this, 'model.contactoEmergencia.relacion', _.get(response, 'contacto_emergencia_relacion'));
                _.set(this, 'model.contactoEmergencia.telefono', _.get(response, 'contacto_emergencia_telefono'));

                const rut = _.get(response, 'rut')
                api(`${app_variables.external.motor_api_server}/tam/preguntas/${rut}`, {
                    method: 'GET',
                }).then(preguntas => {
                    _.set(this, 'preguntas', preguntas);
                    _.forEach(preguntas, (value, key) => {
                        const preg = key + 1;
                        this.model.respuestas[key] = _.get(response, `result_preunta${preg}`);
                    });
                    Swal.close();
                });
            }).catch(reason => {
                Swal.fire(
                    'Sin resultados.',
                    'No se han encontrado resultados para esta búsqueda',
                    'warning'
                );
                return false;
            });
        },
        showLoading: function (title = 'Cargando', text = 'estamos procesando la información') {
            Swal.fire({
                title: title,
                html: `<p>${text}<p>.`,
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                onBeforeOpen: () => {
                    Swal.showLoading()
                },
            });
        },
        onAuthenticationItemChange: function () {
            let score = parseInt(_.get(this, 'scorePonderado'), 10) + _.filter(_.get(this, 'model.respuestas'), { respuesta: 'califica' }).length;
            _.set(this, 'score', score);
        },
        onSaveInfo: function (event) {
            this.showLoading();
            const sendModel = _.get(this, 'model');
            console.log({ sendModel });

            api(`${app_variables.external.motor_api_server}/tam/gestion`, {
                method: 'PUT',
                body: JSON.stringify(sendModel),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                Swal.fire({
                    title: 'Información Almacenada con éxito!',
                    html: `Presiona OK para cerrar`,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
            }).catch(reason => {
                Swal.fire({
                    title: 'Ha ocurrido un error al guardar!',
                    html: `Presiona OK para cerrar`,
                    icon: 'danger',
                    confirmButtonText: 'Ok'
                });
            });
        }
    },

    created: function () {

        api(`${app_variables.base_url}/Assets/tam/data/tam.json`, {
            method: 'get'
        }).then(config => {
            _.set(this, 'config', config);
        });

        api(`${app_variables.external.motor_api_server}/tam/comunas`, {
            method: 'GET'
        }).then(comunas => {
            _.set(this, 'comunas', comunas);

            this.preloadInfo();
        });
    },
    computed: {
        scriptEleccionTam: function () {
            return _.get(this, 'afiliadoEncontrado.flagTamMetro') == '1' ? _.get(this, 'config.scripts.CON_TAM') : _.get(this, 'config.scripts.SIN_TAM');
        },
    }
})