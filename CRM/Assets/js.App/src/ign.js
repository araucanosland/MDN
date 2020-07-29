jQuery.support.cors = true;
var appIgn = new Vue({
    el: '#contIGN',
    data: {
        filtrosP: {
            estadosIgn: [],
            subEstadosIgn: [],
            estadoNominaIgn: [],

        },
        modelosP: {
            estadosIgn: '',
            subEstadosIgn: '',
            estadoNominaIgn: '',
        },
        dataM: {}
    },

    mounted() {
        this.obEstadoIgn();
        this.estadoNominaIgn();
    },
    methods: {
        cargalistaIgn() {
            var fechaHoy = new Date();
            var periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');

            $("#tblIgn").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/ign/leads`,
                query: {
                    oficina: getCookie('Oficina'),
                    cargo: getCookie('Cargo'),
                    rutEjecutivo: getCookie('Rut'),
                    periodo: periodo,
                    estado: this.modelosP.estadosIgn,
                    subEstado: this.modelosP.subEstadosIgn,
                    estadoNomina: this.modelosP.estadoNominaIgn,
                }
            });
        },
        loadTablaAcuerdoPago() {
            $("#tblIgn").bootstrapTable();
        },

        obEstadoIgn() {
            fetch(`http://${motor_api_server}:4002/ign/estados-ign`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtrosP.estadosIgn = estadosJSON;
                });
        },
        obSubEstados(padre) {
            fetch(`http://${motor_api_server}:4002/ign/sub-estado-ign/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(subEstadosSubJSON => {
                    this.filtrosP.subEstadosIgn = subEstadosSubJSON;
                });
        },
        eventoCambSubEstadoIng() {
            this.obSubEstados(this.modelosP.estadosIgn)

            if (this.modelosP.estadosIgn != 4 && this.modelosP.estadosIgn != 5) {
                $('#slSubEstadoIngPrin').prop('disabled', false);
            }
            else {
                $('#slSubEstadoIngPrin').prop('disabled', true);
            }
        },
        estadoNominaIgn() {
            fetch(`http://${motor_api_server}:4002/ign/estados-nomina`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtrosP.estadoNominaIgn = estadosJSON;
                });
        },

    }
});

function formatoMoneyFormatterign(value, row, index) {
    return '$ ' + value.toMoney(0);
}

function formatoPorcentaje(value, row, index) {
    return value + ' %'
}

function idFormatterMoldalIgn(value, row, index) {
    return `<a href="${value}" class="btn-link"  data-id_lead="${row.id_lead}" data-rut_emp="${value}"  data-toggle="modal" data-target="#modal_ign" data-backdrop="static" data-keyboard="false">${value}</a>`;
}

//$('#tab_ing').click(function () {
//    appIgn.cargalistaIgn();
//})


var appIgnModal = new Vue({
    el: '#modal_ign',
    data: {
        filtros: {
            estadosIgn: [],
            subEstadosIgn: [],

        },
        modelos: {
            estadosIgn: '',
            subEstadosIgn: '',

        },
        dataModal: {}
    },
    mounted() {
        this.obtenerEstadoIgn();
    },
    methods: {
        obtenerEstadoIgn() {
            fetch(`http://${motor_api_server}:4002/ign/estados-ign`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(estadosJSON => {
                    this.filtros.estadosIgn = estadosJSON;
                });
        },
        obtenerSubEstados(padre) {
            fetch(`http://${motor_api_server}:4002/ign/sub-estado-ign/${padre}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(subEstadosSubJSON => {
                    this.filtros.subEstadosIgn = subEstadosSubJSON;
                });
        },
        eventoCambiaSubEstadoIng() {
            this.obtenerSubEstados(this.modelos.estadosIgn)

            if (this.modelos.estadosIgn != 4 && this.modelos.estadosIgn != 5) {
                $('#slSubEstadoIng').prop('disabled', false);
            }
            else {
                $('#slSubEstadoIng').prop('disabled', true);
            }
        },
        obtenerLeadIDIgn(id_lead) {
            let oficina = parseInt(getCookie('Oficina'))


            fetch(`http://${motor_api_server}:4002/ign/lead-ign/${id_lead}/${oficina}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.dataModal = datos;
                    return datos
                })
        },

        handleSubmitGestionIgn() {

            let Subestado = $('#slSubEstadoIng').val();

            let fechaCompromiso = $('#ges_prox_compromiso_ign').val();
            if (fechaCompromiso == " " || fechaCompromiso == "") {
                fechaCompromiso = null;
            }

            if ($('#dllEstadoIgn').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe Ingresar un Estado.',
                    container: '#msjIgn',
                    timer: 3000
                });
                return false;
            }

            if ($('#dllEstadoIgn').val() != 4 && $('#dllEstadoIgn').val() != 5) {

                if ($('#slSubEstadoIng').val() == '' || $('#slSubEstadoIng').val() == null) {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Debe Ingresar un Sub-Estado.',
                        container: '#msjIgn',
                        timer: 3000
                    });
                    return false;
                }
            }
            else {
                Subestado = 0
            }

            if ($('#txtObservacionIgn').val() == '') {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe Ingresar un Comentario.',
                    container: '#msjIgn',
                    timer: 3000
                });
                return false;
            }

            if ($('#slSubEstadoIng').val() == 12 && $('#ges_prox_compromiso_ign').val() == "") {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe Ingresar una fecha de Compromiso.',
                    container: '#msjIgn',
                    timer: 3000
                });
                return false;
            }

            const formData = {
                id_lead: $('#txtIdIng').val(),
                id_estado: $('#dllEstadoIgn').val(),
                id_subestado: Subestado,
                rut_empresa: $('#txtRutEmpIng').val(),
                fecha_compromiso: fechaCompromiso,
                comentario: $('#txtObservacionIgn').val(),
                rut_ejecutivo: getCookie('Rut'),
                oficina: parseInt(getCookie('Oficina')),
            };

            fetch(`http://${motor_api_server}:4002/ign`, {
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
                        container: '#msjIgn',
                        timer: 3000
                    });
                    return false;
                }
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Gestión Guardada correctamente.',
                    container: '#msjIgn',
                    timer: 3000
                });
                appIgnModal.obtenerLeadIDIgn($('#txtIdIng').val())
                appIgnModal.setDefaultsModal();
                $('#dllEstadoIgn').val("")
                $('#slSubEstadoIng').val("")
                appIgn.cargalistaIgn();


            });
        },

        setDefaultsModal() {
            this.modelos = {
                estadosIgn: '',
                subEstadosIgn: '',
            }

            $('#ges_prox_compromiso_ign').val('');
            $('#txtObservacionIgn').val('');
            $("#divFechaComp").css('display', 'none')
            $('#slSubEstadoIng').prop('disabled', false);
        },
    }
});



$('#modal_ign').on('show.bs.modal', async (event) => {

    let id_lead = $(event.relatedTarget).data('id_lead')
    $('#dp-component-ign .input-group.date').datepicker(
        { autoclose: true, format: 'dd-mm-yyyy', language: "es", daysOfWeekDisabled: [6, 0], todayHighlight: true }
    ).on('changeDate', function (event) {
        event.stopPropagation();
    }).on('show.bs.modal hide.bs.modal', function (event) {
        event.stopPropagation();
    });
    appIgnModal.obtenerLeadIDIgn(id_lead)
});

$('#modal_ign').on('hidden.bs.modal', async (event) => {

    appIgnModal.setDefaultsModal();

});

$('#slSubEstadoIng').change(function (e) {

    switch (this.value) {
        case "12":
            $("#divFechaComp").css('display', 'block')
            break;

        case '4':
            $('#slSubEstadoIng').prop('disabled', true);
            break;

        case '5':
            $('#slSubEstadoIng').prop('disabled', true);
            break;

    }
    if (this.value != 12) {
        $("#divFechaComp").css('display', 'none')
    }
});

