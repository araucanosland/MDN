var appReasignaciones = new Vue({
    el: '#page-reasignaciones',
    data: {
        datos: {
            asignados: {},
            ejecutivos: {}
        },
        sesion: {
            ejecutivoLogueado: getCookie('Rut'),
            oficinaLogueada: getCookie('Oficina')
        },
        modeloBusqueda: {
            rutEjecutivo: getCookie('Rut'),
            busqueda: '',
            rutEjecutivoDestino: ''
        },
        selections: []
    },
    async mounted() {
        this.fetchLeads(this.sesion.ejecutivoLogueado);
        this.datos.ejecutivos = await this.fetchEjecutivos();

    },
    updated() {
        console.log('actualizada');
    },
    methods: {
        //Retorna Promise
        fetchLeads(rutEjecutivo) {
            $('#table-conche-sumare').bootstrapTable({
                url: `http://${motor_api_server}:4002/lead-visados?rutEjecutivo=${rutEjecutivo}`
            });
        },
        handleSearchLeads() {
            $('#table-conche-sumare').bootstrapTable('refresh', {
                //rutEjecutivo, busqueda
                url: `http://${motor_api_server}:4002/lead-visados`,
                query: {
                    rutEjecutivo: this.modeloBusqueda.rutEjecutivo,
                    busquedaEmpresa: this.modeloBusqueda.busqueda
                }
            });

            this.selections = [];
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
        handleReasignarCasos() {
            let dtoInfo = {
                leads: this.selections,
                ejecutivoOrigen: this.modeloBusqueda.rutEjecutivo,
                ejecutivoDestino: this.modeloBusqueda.rutEjecutivoDestino
            };
            fetch(`http://${motor_api_server}:4002/lead-visados/reasignacion`, {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(dtoInfo),
                headers: {
                    'Content-Type': 'application/json',
                    'Token': getCookie('Token')
                }
            }).then(async (response) => {
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Gestión Guardada correctamente.',
                    onHide: function () {
                        location.reload();
                    }
                });
            });
        }
    },
    computed: {
      
    }
});

function getIdSelections() {
    return $.map($('#table-conche-sumare').bootstrapTable('getSelections'), function (row) {
        return row.id;
    });
}

function responseHandler(res) {

    $.each(res.rows, function (i, row) {
        row.sele = $.inArray(row.id, appReasignaciones.$data.selections) !== -1;
    });
    return res;
}

$(function () {

    // BUBBLE NUMBERS
    // =================================================================
    $('#demo-step-wz').bootstrapWizard({
        tabClass: 'wz-steps',
        nextSelector: '.next',
        previousSelector: '.previous',
        onTabClick: function (tab, navigation, index) {
            return false;
        },
        onInit: function () {
            $('#demo-step-wz').find('.finish').hide().prop('disabled', true);
        },
        onTabShow: function (tab, navigation, index) {
            var $total = navigation.find('li').length;
            var $current = index + 1;
            var $percent = (index / $total) * 100;
            var wdt = 100 / $total;
            var lft = wdt * index;
            var margin = (100 / $total) / 2;
            $('#demo-step-wz').find('.progress-bar').css({ width: $percent + '%', 'margin': 0 + 'px ' + margin + '%' });

            // If it's the last tab then hide the last button and show the finish instead
            if ($current >= $total) {
                $('#demo-step-wz').find('.next').hide();
                $('#demo-step-wz').find('.finish').show();
                $('#demo-step-wz').find('.finish').prop('disabled', false);
            } else {
                $('#demo-step-wz').find('.next').show();
                $('#demo-step-wz').find('.finish').hide().prop('disabled', true);
            }
        }
    });


    $('#table-conche-sumare').on('check.bs.table check-all.bs.table', function () {
        // save your data, here just save the current page
        appReasignaciones.$data.selections = [...appReasignaciones.$data.selections, ...getIdSelections()];
        appReasignaciones.$data.selections = [...new Set(appReasignaciones.$data.selections)];
        // push or splice the selections if you want to save all data selections
        console.log({ selections: appReasignaciones.$data.selections, mensaje: 'Select' });
    }).on('uncheck.bs.table', function (event, row) {
        appReasignaciones.$data.selections = appReasignaciones.$data.selections.filter((e) => e !== row.id);
    }).on('uncheck-all.bs.table', function (event, rows) {
        rows.forEach((row) => {
            appReasignaciones.$data.selections = appReasignaciones.$data.selections.filter((e) => e !== row.id);
        });
    });

});


