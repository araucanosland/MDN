Vue.use(VueFormWizard);
Vue.component('v-select', VueSelect.VueSelect);

new Vue({
    el: '#page-content',
    data: {
        afiliado: {
            rut: '',
            nombres: '',
            edad: '',
            score: 0,
            genero: 'M',
            poseeTAM: true
        },
        afiliadoEncontrado: {},
        model: {
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
                    validaNumero: ''
                }
            },
            eleccionTarjeta: '',
            respuestas: []
        },
        config: {},
        comunas: [],
        preguntas: [],
        score: 0,
        scorePonderado: 0,
        respuestas: []
    },
    // App Methods & Events
    methods: {
        onComplete: function () {
            Swal.fire({
                title: 'Autenticación OK!',
                text: 'Se le enviará TAM a domicilio.',
                icon: 'success',
                onClose: () => {
                    location.reload(true);
                }
            })
        },
        validateFirstStep: async function () {

            return await new Promise((resolve, reject) => {
                let errors = [];
                let fatalErrors = [];
                if (!_.get(this, 'model.rut')) {
                    errors.push('Debes Indicar un Rut');
                }

                if (!_.get(this, 'model.fechaNacimiento')) {
                    errors.push('Debes Indicar una fecha de Nacimiento');
                }

                if (!_.get(this, 'model.opcion')) {
                    errors.push('Debes Indicar una Opción');
                }

                if (!_.get(this, 'model.celular')) {
                    errors.push('Debes Indicar un Celular');
                }

                if (_.get(this, 'model.celular') && _.get(this, 'model.celular') != _.get(this, 'model.validaCelular')) {
                    errors.push('Los Valores de Celular No Coinciden');
                }

                if (_.get(this, 'model.telefono') && _.get(this, 'model.validaTelefono') != _.get(this, 'model.telefono')) {
                    errors.push('Los Valores de Telefono No Coinciden');
                }

                if (_.get(this, 'model.email') && _.get(this, 'model.validaEmail') != _.get(this, 'model.email')) {
                    errors.push('Los Valores del Email No Coinciden');
                }

                if (!_.get(this, 'model.direcciones.residencia.calle')) {
                    errors.push('Debes Indicar una Calle de Dirección de Residencia');
                }

                if (_.get(this, 'model.direcciones.residencia.calle') && _.get(this, 'model.direcciones.residencia.calle') != _.get(this, 'model.direcciones.residencia.validaCalle')) {
                    errors.push('Debes hacer Doble Validación para Calle de Dirección de Residencia');
                }

                if (!_.get(this, 'model.direcciones.residencia.numero')) {
                    errors.push('Debes Indicar un Numero de Dirección de Residencia');
                }

                if (_.get(this, 'model.direcciones.residencia.numero') && _.get(this, 'model.direcciones.residencia.numero') != _.get(this, 'model.direcciones.residencia.validaNumero')) {
                    errors.push('Debes hacer Doble Validación para Numero de Dirección de Residencia');
                }

                if (!_.get(this, 'model.direcciones.residencia.comuna')) {
                    errors.push('Debes Indicar una Comuna de Dirección de Residencia');
                }


                if (_.get(this, 'model.direcciones.laboral.calle') && _.get(this, 'model.direcciones.laboral.calle') != _.get(this, 'model.direcciones.laboral.validaCalle')) {
                    errors.push('Debes hacer Doble Validación para Calle de Dirección Laboral');
                }

                if (_.get(this, 'model.direcciones.laboral.numero') && _.get(this, 'model.direcciones.laboral.numero') != _.get(this, 'model.direcciones.laboral.validaNumero')) {
                    errors.push('Debes hacer Doble Validación para Numero de Dirección Laboral');
                }


                let isValidForm = errors.length === 0;
                if (!isValidForm) {
                    var errors_html = errors.join('</li><li class="msg-part">');
                    Swal.fire({
                        title: 'Error al Consultar Afiliado',
                        html: `<ul><li class="msg-part">${errors_html}</li></ul>`,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                    reject('INVALID_FORM');
                } else {

                    this.showLoading('Buscando Afiliado', 'Estamos buscando la información del Afiliado')
                    let rut = _.get(this, 'model.rut');
                    let rutStringArray = rut.split('');
                    rutStringArray.splice(rutStringArray.length - 1, 0, '-');
                    const sendRut = rutStringArray.join('');
                    _.set(this, 'model.rut_formateado', sendRut);
                    const sendModel = _.clone(_.get(this, 'model'));
                    const fNacimiento = moment(_.get(this, 'model.fechaNacimiento'), 'DD-MM-YYYY').toDate();
                    _.set(sendModel, 'fechaNacimiento', fNacimiento);
                    _.set(sendModel, 'ejecutivo', getCookie('Rut'));
                    _.set(sendModel, 'oficina', getCookie('Oficina'));
                    api(`${motor_api_server_full}/tam/gestion/on-boarding/${sendRut}`, {
                        method: 'POST',
                        body: JSON.stringify(sendModel),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(afiliadoOnBoard => {
                        _.set(this, 'afiliadoEncontrado', afiliadoOnBoard);
                        _.set(this, 'score', _.get(afiliadoOnBoard, 'score'));
                        _.set(this, 'scorePonderado', _.get(afiliadoOnBoard, 'score'));
                        
                        console.log({ afiliadoOnBoard });
                        const estadoResultante = _.get(afiliadoOnBoard, 'resultado')

                        if (estadoResultante == 'NO_ENCONTRADO') {
                            Swal.fire(
                                'Afiliado No Encontrado',
                                _.get(this, 'config.mensajes.NO_ENCONTRADO'),
                                'error'
                            ).then(s => {
                                console.log('reload', { s });
                                location.reload(true);
                            });
                            reject(estadoResultante);
                        }

                        if (estadoResultante == 'SOLICITA_REEMBOLSO') {
                            Swal.fire(
                                'Afiliado Solicita Reembolso',
                                _.get(this, 'config.mensajes.SOLICITA_REEMBOLSO'),
                                'warning'
                            ).then(s => {
                                console.log('reload', { s });
                                reject(estadoResultante);
                                location.reload(true);
                            });
                        }

                        if (estadoResultante == 'NO_CUMPLE_CON_EDAD') {
                            Swal.fire(
                                'Afiliado No Cumple con Edad',
                                _.get(this, 'config.mensajes.NO_CUMPLE_CON_EDAD'),
                                'error'
                            ).then(s => {
                                console.log('reload', { s });
                                reject(estadoResultante);
                                location.reload(true);
                            });
                        }


                        if (estadoResultante == 'DEBE_VALIDAR') {
                            Swal.fire(
                                'Debe Confirmar Información.',
                                _.get(this, 'config.mensajes.DEBE_VALIDAR'),
                                'warning'
                            ).then(s => {
                                console.log('reload', { s });
                                reject(estadoResultante);
                                location.reload(true);
                            });   
                        }

                        
                        if (estadoResultante == 'OK_ESPERANDO_OPCION_TOR') {
                            Swal.fire(
                                'Afiliado Encontrado.',
                                _.get(this, 'config.mensajes.ENCONTRADO'),
                                'success'
                            ).then(s => {
                                console.log('reload', { s });
                                resolve(estadoResultante);
                            });
                        }
                        
                    }).catch(error => {
                        console.log({ error });
                        reject(error);
                    });
                }

            }).then(result => {
                return true;
            }).catch(error => {
                return false;
            })

        },
        validateSecondStep: async function () {
            return await new Promise((resolve, reject) => {
                let errors = [];
                if (!_.get(this, 'model.eleccionTarjeta')) {
                    errors.push('Debes Indicar una opción');
                }

                if (errors.length > 0) {
                    let errors_html = errors.join('</li><li class="msg-part">');
                    Swal.fire({
                        title: 'Error en Formulario',
                        html: `<ul><li class="msg-part">${errors_html}</li></ul>`,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                    reject('INVALID_FORM');
                } else {
                    this.showLoading('Cargando', 'Estamos guardando la información ingresada.')
                    const sendModel = _.clone(_.get(this, 'model'));
                    const onBoardId = _.get(this, 'afiliadoEncontrado.gestionId', '0');
                    api(`${motor_api_server_full}/tam/gestion/${onBoardId}/card-choise`, {
                        method: 'POST',
                        body: JSON.stringify(sendModel),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(result => {
                        if (result.status === 'ACEPTA_BIP') {
                            Swal.fire({
                                title: 'Afiliado Acepta',
                                html: `Presiona OK para continuar`,
                                icon: 'success',
                                confirmButtonText: 'Ok'
                            }).then(rs => resolve(result));
                        } else {
                            Swal.fire({
                                title: 'Afiliado Prefiere / mantiene TAM',
                                html: _.get(this, 'config.mensajes.DESISTE_BIP'),
                                icon: 'warning',
                                confirmButtonText: 'De Acuerdo',
                                showCancelButton: true,
                                cancelButtonText: 'Volver'
                            }).then(result => {
                                if (result.isConfirmed) {
                                    location.reload(true);
                                }
                                reject(result.status);
                            });
                        }
                    }).catch(reason => {
                        Swal.fire({
                            title: 'Error al Procesar',
                            html: `Error: ${reason.message}`,
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        });
                        reject(reason)
                    });
                }

            }).then(x => true).catch(r => false);
        },
        validateThrirdStep: async function () {
            return await new Promise((resolve, reject) => {
                let errors = [];

                if (!_.get(this, 'model.direcciones.despacho.calle')) {
                    errors.push('Debes Indicar una Calle de Dirección de Despacho');
                }

                if (_.get(this, 'model.direcciones.despacho.calle') && _.get(this, 'model.direcciones.despacho.calle') != _.get(this, 'model.direcciones.despacho.validaCalle')) {
                    errors.push('Debes hacer Doble Validación para Calle de Dirección de Despacho');
                }

                if (!_.get(this, 'model.direcciones.despacho.numero')) {
                    errors.push('Debes Indicar un Numero de Calle para Dirección de Despacho');
                }

                if (_.get(this, 'model.direcciones.despacho.numero') && _.get(this, 'model.direcciones.despacho.numero') != _.get(this, 'model.direcciones.despacho.validaNumero')) {
                    errors.push('Debes hacer Doble Validación para el Numero de Calle de Dirección de Despacho');
                }

                if (!_.get(this, 'model.direcciones.despacho.comuna')) {
                    errors.push('Debes Indicar una Comuna para Dirección de Despacho');
                }

                if (errors.length > 0) {
                    let errors_html = errors.join('</li><li class="msg-part">');
                    Swal.fire({
                        title: 'Error en Formulario',
                        html: `<ul><li class="msg-part">${errors_html}</li></ul>`,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                    reject('INVALID_FORM');
                } else {
                    this.showLoading('Cargando', 'Estamos guardando la información ingresada.')
                    const sendModel = _.clone(_.get(this, 'model'));
                    const onBoardId = _.get(this, 'afiliadoEncontrado.gestionId', '0');
                    api(`${motor_api_server_full}/tam/gestion/${onBoardId}/delivery`, {
                        method: 'POST',
                        body: JSON.stringify(sendModel),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(afiliadoOnBoard => {

                        const estadoResultante = _.get(afiliadoOnBoard, 'resultado')
                        _.set(this, 'score', _.get(afiliadoOnBoard, 'score'));

                        if (estadoResultante == 'COMUNA_INVALIDA') {
                            Swal.fire(
                                'Comuna Inválida.',
                                _.get(this, 'config.mensajes.COMUNA_INVALIDA'),
                                'error'
                            ).then(s => {
                                console.log('reload', { s });
                                reject(estadoResultante);
                                location.reload(true);
                            });
                        } else {

                            if (estadoResultante == 'LLAMAR_EN_CUMPLE') {
                                Swal.fire(
                                    'Llamar en Cumpleaños',
                                    _.get(this, 'config.mensajes.LLAMAR_EN_CUMPLE'),
                                    'warning'
                                ).then(s => {
                                    console.log('reload', { s });
                                    reject(estadoResultante);
                                    location.reload(true);
                                });
                            } else if (estadoResultante == 'CIERRE_POSITIVO_CUMPLE_SCORE_MINIMO') {
                                Swal.fire({
                                    title: 'Autenticación Exitosa',
                                    html: _.get(this, 'config.mensajes.FIN_EXITO'),
                                    icon: 'success',
                                    confirmButtonText: 'Aceptar'
                                }).then(df => {
                                    resolve(estadoResultante);
                                    location.reload(true);
                                });
                            } else {
                                const rut = _.get(this, 'afiliadoEncontrado.rut');
                                api(`${motor_api_server_full}/tam/preguntas/${rut}`, {
                                    method: 'GET',
                                }).then(preguntas => {
                                    console.log({ preguntas })
                                    _.set(this, 'preguntas', preguntas);
                                    Swal.fire({
                                        title: 'Datos Despacho Guardados',
                                        html: `Presiona OK para continuar`,
                                        icon: 'success',
                                        confirmButtonText: 'Ok'
                                    }).then(rs => resolve(estadoResultante));
                                });
                            }
                        }
                    }).catch(reason => {
                        Swal.fire({
                            title: 'Error al Procesar',
                            html: `Error: ${reason.message}`,
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        });
                        reject(reason)
                    })
                }

            }).then(x => true).catch(r => false);
        },
        validateFourthStep: async function () {
            return await new Promise((resolve, reject) => {
                const respuestas = _.get(this, 'model.respuestas');
                const score = _.get(this, 'afiliadoEncontrado.score', 0);
                const scoreMinimo = 3;
                const delta = scoreMinimo - score;
                if (_.size(respuestas) < delta) {
                    Swal.fire({
                        title: `Debes completar al menos ${delta} Preguntas`,
                        html: `No puedes finalizar si no contestas al menos ${delta} preguntas`,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                    reject('INVALID_FORM')
                } else {

                    this.showLoading('Cargando', 'Estamos guardando la información ingresada.')
                    const sendModel = _.clone(_.get(this, 'model'));
                    const onBoardId = _.get(this, 'afiliadoEncontrado.gestionId', '0');
                    api(`${motor_api_server_full}/tam/gestion/${onBoardId}/authentication`, {
                        method: 'POST',
                        body: JSON.stringify(sendModel),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(respuestaGst => {
                        _.set(this, 'score', _.get(respuestaGst, 'score'));
                        if (respuestaGst.resultado == 'CIERRE_POSITIVO_CUMPLE_SCORE_MINIMO') {
                            Swal.fire({
                                title: 'Autenticación Exitosa',
                                html: _.get(this, 'config.mensajes.FIN_EXITO'),
                                icon: 'success',
                                confirmButtonText: 'Aceptar'
                            }).then(df => {
                                resolve(respuestaGst.resultado);    
                                location.reload(true);
                            });
                        } else {
                            Swal.fire({
                                title: 'Autenticación no ha logrado realizarse',
                                html: `Debe ir a Sucursal La Araucana cuando se levante la cuarentena.`,
                                icon: 'error',
                                confirmButtonText: 'Aceptar'
                            }).then(df => {
                                reject(respuestaGst.resultado);
                                location.reload(true);
                            });
                        }
                    });
                }

            }).then(x => true).catch(r => false);
        },
        setSameAddress: function () {
            const isChecked = _.get(this, 'model.direcciones.residenciaIgualDespacho');
            if (isChecked == false) {

                _.set(this, 'model.direcciones.despacho.calle', _.get(this, 'model.direcciones.residencia.calle'))
                _.set(this, 'model.direcciones.despacho.validaCalle', _.get(this, 'model.direcciones.residencia.calle'))
                _.set(this, 'model.direcciones.despacho.numero', _.get(this, 'model.direcciones.residencia.numero'))
                _.set(this, 'model.direcciones.despacho.validaNumero', _.get(this, 'model.direcciones.residencia.numero'))
                _.set(this, 'model.direcciones.despacho.comuna', _.get(this, 'model.direcciones.residencia.comuna'))
            } else {
                _.set(this, 'model.direcciones.despacho.calle', '')
                _.set(this, 'model.direcciones.despacho.validaCalle', '')
                _.set(this, 'model.direcciones.despacho.numero', '')
                _.set(this, 'model.direcciones.despacho.validaNumero', '')
                _.set(this, 'model.direcciones.despacho.comuna', '')
            }
            
        },
        buscarAfiliado: async function (rut) {
            const res = await api(`${motor_api_server_full}/tam/lead/${rut}`, {
                method: 'GET'
            });
            return res;
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
        }
    },
    // Vue Lifecycle
    mounted: function () {
        fetch(`${BASE_URL}/motor/Assets/tam/data/tam.json`, {
            method: 'get'
        })
            .then(res => res.json())
            .then(config => {
                _.set(this, 'config', config);
            });
        
        api(`${motor_api_server_full}/tam/comunas`, {
            method: 'GET'
        }).then(comunas => {
            _.set(this, 'comunas', comunas);
        })
    },
    computed: {
        preguntasRandom: function () {
            return _.sampleSize(_.get(this, 'config.preguntas'), 5 - parseInt(_.get(this, 'afiliado.score', 0)));
        },
        scriptEleccionTam: function () {
            return _.get(this, 'afiliadoEncontrado.flagTamMetro') == '1' ? _.get(this, 'config.scripts.CON_TAM') : _.get(this, 'config.scripts.SIN_TAM');
        },


    }
});