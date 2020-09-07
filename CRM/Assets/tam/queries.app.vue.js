Vue.filter('nombreNoEncontrado', function (value) {
    return value ? value : 'Sin Nombre Para mostrar'
});

Vue.filter('puntaje', function (value) {
    return value ? value : '0'
});

var qApp = new Vue({
    el: '#query-app',
    data: {
        results: [],
        filters: {
            rut: ''
        }
    },
    methods: {
        onSearchClick: function () {
            _.set(this, 'results', []);
            const rut = _.get(this, 'filters.rut');
            if (rut === '') {
                console.log('');
                Swal.fire(
                    'Advertencia de Búsqueda.',
                    'Debes ingresar un rut.',
                    'warning'
                );
                return false;
            }
            this.showLoading('Buscando...', 'Estamos filtrando la búsqueda.')
            api(`${app_variables.external.motor_api_server}/tam/gestiones/${rut}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Tracking-Id': '--charlie--'
                }
            })
                .then(matchResults => {
                    if (matchResults.length === 0) {
                        Swal.fire(
                            'Sin resultados.',
                            'No se han encontrado resultados para esta búsqueda',
                            'warning'
                        );
                        return false;
                    }
                    _.set(this, 'results', matchResults);
                    this.finalizeLoading();
                })
                .catch(reason => {
                    console.log(reason);
                })
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
        finalizeLoading: function () {
            Swal.close();
        },
        isEtapaTransitoria: function (entrada) {
            return entrada == 'BUSQEUDA_OK' || entrada == 'ACEPTA_BIP' || entrada == 'PREFIERE_TAM' || entrada == 'MANTIENE_TAM' || entrada == 'OK_ESPERANDO_PREGUNTAS';
        }
    },
})