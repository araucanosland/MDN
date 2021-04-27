
let dataCharts = {}
let dataCharts_eva = {}
$(function () {
    $('#demo-dp-component_evaluacion .input-group.date').datepicker(
        { autoclose: true, format: 'dd-mm-yyyy', language: "es", daysOfWeekDisabled: [6, 0], todayHighlight: true }
    )
});
jQuery.support.cors = true;
var appCalidad = new Vue({
    el: '#page-content',
    data: {
        filtros: {
            oficina: [],
            ejecutivos: [],
            oficinaF: [],
            ejecutivosF: [],
        },
        modelos: {
            oficina: '',
            ejecutivos: '',
            oficinaF: '',
            ejecutivosF: '',
        },
        preguntas_medicion: {},
        datos_evaM: {},
        datos_eva: {},
        preguntas_transversal: {},
        datos: [],
    },
    mounted() {
        this.obtenerOficina();
        this.obtenerOficinaF();
        this.preguntasMedicion();
        this.preguntasTransversal();
    },
    methods: {
        obtenerOficina() {
            fetch(`http://${motor_api_server}:4002/calidad/lista-oficina-calidad`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(oficinaJSON => {
                    this.filtros.oficina = oficinaJSON;
                });
        },
        eventoCambOficina() {
            this.obtenerEjecutivosOficina(this.modelos.oficina)
        },
        obtenerEjecutivosOficina(oficina) {
            var fechaHoy = new Date();
            var periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
            fetch(`http://${motor_api_server}:4002/calidad/lista-ejecutivo-oficina/${periodo}/${oficina}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(ejecutivosSubJSON => {
                    this.filtros.ejecutivos = ejecutivosSubJSON;
                });
        },
        obtenerOficinaF() {
            fetch(`http://${motor_api_server}:4002/calidad/lista-oficina-calidad`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(oficinaJSON => {
                    this.filtros.oficinaF = oficinaJSON;
                });
        },
        eventoCambOficinaF() {
            this.obtenerEjecutivosOficinaF(this.modelos.oficinaF)
        },
        obtenerEjecutivosOficinaF(oficina) {
            var fechaHoy = new Date();
            var periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
            fetch(`http://${motor_api_server}:4002/calidad/lista-ejecutivo-oficina/${periodo}/${oficina}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(ejecutivosSubJSON => {
                    this.filtros.ejecutivosF = ejecutivosSubJSON;
                });
        },
        preguntasMedicion() {
            fetch(`http://${motor_api_server}:4002/calidad/lista-lead-medicion`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.preguntas_medicion = datos;
                    return datos
                })
        },
        preguntasTransversal() {
            fetch(`http://${motor_api_server}:4002/calidad/lista-lead-transversal`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.preguntas_transversal = datos;
                    return datos
                })
        },
        cargaMisEvaluaciones() {
            $("#tblEvaluaciones").bootstrapTable('refresh', {
                url: `http://${motor_api_server}:4002/calidad/evaluaciones-calidad`,
                query: {
                    rut_evaluador: getCookie('Rut'),
                    oficina_evaluador: getCookie('Oficina'),
                    oficina_evaluado: $('#dllOficinaF').val(),
                    rut_evaluado: $('#dllOEjecutivoF').val(),
                    fecha_evaluacion: $('#dpfechaEvaF').val(),
                }
            });
        },
        cargaDatosEvaluacionModal(id) {
            fetch(`http://${motor_api_server}:4002/calidad/lista-evaluaciones-calidad/${id}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.datos_evaM = datos;
                    dataCharts = datos;
                    return datos
                })
        },
        cargaDatosEvaluacion(id) {
            fetch(`http://${motor_api_server}:4002/calidad/lista-evaluaciones-calidad/${id}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.datos_eva = datos;
                    dataCharts_eva = datos;
                    return datos
                })
            setTimeout(function () {
                Morris.Bar({
                    element: 'demo-morris-bar',
                    data: [
                        { y: 'Cerc.', a: dataCharts_eva.cercania },
                        { y: 'Expl.', a: dataCharts_eva.exploracion },
                        { y: 'Entr.', a: dataCharts_eva.entrega },
                        { y: 'Obje.', a: dataCharts_eva.objeciones },
                        { y: 'Cierre', a: dataCharts_eva.cierre },
                        { y: 'Efect.', a: dataCharts_eva.efectividad },

                    ],
                    xkey: 'y',
                    ykeys: ['a'],
                    labels: ['Porcentaje '],
                    gridEnabled: false,
                    gridLineColor: 'transparent',
                    barColors: ['#177bbb'],
                    resize: true,
                    hideHover: 'auto'
                });
            }, 1000);
        },
        onAuthenticationItemChange(event, event2, event3) {
            for (var i = 0; i < this.datos.length; i++) {
                if (this.datos[i].id == event2) {
                    this.datos.splice(i, 1);
                    break;
                }
            }
            this.datos.push({
                "id": event2,
                "proceso": event,
                "eva": $('input:radio[name=' + event2 + ']:checked').val(),
                "id_pregunta": event3,
            });
            //console.log(JSON.stringify(this.datos));
        },
        handleSubmitIniciaEvaluacion() {
            if ($("#btnInicia").html() == 'INICIAR LA EVALUACIÓN') {

                if ($('#dllOficina').val() == "") {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Debe ingresar una sucursal...',
                        container: '#msjCalidad',
                        timer: 3000
                    });
                    return false;
                }
                if ($('#dllOEjecutivo').val() == "") {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Debe ingresar un ejecutivo...',
                        container: '#msjCalidad',
                        timer: 3000
                    });
                    return false;
                }
                if ($('#dpfechaEva').val() == "") {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Debe ingresar una fecha de evaluación...',
                        container: '#msjCalidad',
                        timer: 3000
                    });
                    return false;
                }
                if ($('#txtRutAfi').val() == "") {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Debe ingresar rut de afiliado...',
                        container: '#msjCalidad',
                        timer: 3000
                    });
                    return false;
                }
                if ($('#txtFonoAfi').val() == "") {
                    $.niftyNoty({
                        type: 'danger',
                        message: 'Debe ingresar una fono de contacto...',
                        container: '#msjCalidad',
                        timer: 3000
                    });
                    return false;
                }
                $('#contPreguntas').css('display', 'block')
            }
            else if ($("#btnInicia").html() == 'NUEVA EVALUACIÓN') {
                $('.clear_rb').prop("checked", '');
                $('#dvEval').css('display', 'none')
                this.datos_eva = {}
                dataCharts_eva = {}
                $('#dpfechaEva').val('')
                this.modelos = {
                    oficina: '',
                    ejecutivos: '',
                    oficinaF: '',
                    ejecutivosF: '',
                }
                $("#btnInicia").html('INICIAR LA EVALUACIÓN')
            }
        },
        handleSubmitGrabaEvaluacion() {
            let id_eva_preg = 0;
            //#region evaluacion
            let cercania = 0;
            let n_cercania = 0;
            let exploracion = 0;
            let n_exploracion = 0;
            let entrega = 0;
            let n_entrega = 0;
            let objeciones = 0;
            let n_objeciones = 0;
            let cierre = 0;
            let n_cierre = 0;
            let efectividad = 0;
            let n_efectividad = 0;
            let rut_eva = $('#dllOEjecutivo').val()
            //#endregion
            //#region preguntas
            let id_evaluacion = '';
            let id_pregunta_1 = '';
            let repuesta_1 = '';
            let id_pregunta_2 = '';
            let repuesta_2 = '';
            let id_pregunta_3 = '';
            let repuesta_3 = '';
            let id_pregunta_4 = '';
            let repuesta_4 = '';
            let id_pregunta_5 = '';
            let repuesta_5 = '';
            let id_pregunta_6 = '';
            let repuesta_6 = '';
            let id_pregunta_7 = '';
            let repuesta_7 = '';
            let id_pregunta_8 = '';
            let repuesta_8 = '';
            let id_pregunta_9 = '';
            let repuesta_9 = '';
            let id_pregunta_10 = '';
            let repuesta_10 = '';
            let id_pregunta_11 = '';
            let repuesta_11 = '';
            let id_pregunta_12 = '';
            let repuesta_12 = '';
            let id_pregunta_13 = '';
            let repuesta_13 = '';
            let id_pregunta_14 = '';
            let repuesta_14 = '';
            let id_pregunta_15 = '';
            let repuesta_15 = '';
            let id_pregunta_16 = '';
            let repuesta_16 = '';
            let id_pregunta_17 = '';
            let repuesta_17 = '';
            let id_pregunta_18 = '';
            let repuesta_18 = '';
            let id_pregunta_19 = '';
            let repuesta_19 = '';
            let id_pregunta_20 = '';
            let repuesta_20 = '';
            let id_pregunta_21 = '';
            let repuesta_21 = '';
            let id_pregunta_22 = '';
            let repuesta_22 = '';
            let id_pregunta_23 = '';
            let repuesta_23 = '';
            let id_pregunta_24 = '';
            let repuesta_24 = '';
            let id_pregunta_25 = '';
            let repuesta_25 = '';
            let id_pregunta_26 = '';
            let repuesta_26 = '';
            let id_pregunta_27 = '';
            let repuesta_27 = '';
            //#endregion
            for (var i = 0; i < this.datos.length; i++) {
                if (this.datos[i].id_pregunta == '1_med') {
                    repuesta_1 = this.datos[i].eva
                    id_pregunta_1 = this.datos[i].id_pregunta
                }
                if (this.datos[i].id_pregunta == '2_med') {
                    repuesta_2 = this.datos[i].eva
                    id_pregunta_2 = this.datos[i].id_pregunta
                }
                if (this.datos[i].id_pregunta == '3_med') {
                    repuesta_3 = this.datos[i].eva
                    id_pregunta_3 = this.datos[i].id_pregunta
                }
                if (this.datos[i].id_pregunta == '4_med') {
                    repuesta_4 = this.datos[i].eva
                    id_pregunta_4 = this.datos[i].id_pregunta
                }
                if (this.datos[i].id_pregunta == '5_med') {
                    repuesta_5 = this.datos[i].eva
                    id_pregunta_5 = this.datos[i].id_pregunta
                }
                if (this.datos[i].id_pregunta == '6_med') {
                    repuesta_6 = this.datos[i].eva
                    id_pregunta_6 = this.datos[i].id_pregunta
                }
                if (this.datos[i].id_pregunta == '7_med') {
                    repuesta_7 = this.datos[i].eva
                    id_pregunta_7 = this.datos[i].id_pregunta
                }
                if (this.datos[i].id_pregunta == '8_med') {
                    repuesta_8 = this.datos[i].eva
                    id_pregunta_8 = this.datos[i].id_pregunta
                }
                if (this.datos[i].id_pregunta == '9_med') {
                    repuesta_9 = this.datos[i].eva
                    id_pregunta_9 = this.datos[i].id_pregunta
                }
                if (this.datos[i].id_pregunta == '10_med') {
                    repuesta_10 = this.datos[i].eva
                    id_pregunta_10 = this.datos[i].id_pregunta
                }
                if (this.datos[i].id_pregunta == '11_med') {
                    repuesta_11 = this.datos[i].eva
                    id_pregunta_11 = this.datos[i].id_pregunta
                }
                if (this.datos[i].id_pregunta == '12_med') {
                    repuesta_12 = this.datos[i].eva
                    id_pregunta_12 = this.datos[i].id_pregunta
                }
                if (this.datos[i].id_pregunta == '13_med') {
                    repuesta_13 = this.datos[i].eva
                    id_pregunta_13 = this.datos[i].id_pregunta
                }
                if (this.datos[i].id_pregunta == '14_med') {
                    repuesta_14 = this.datos[i].eva
                    id_pregunta_14 = this.datos[i].id_pregunta
                }
                if (this.datos[i].id_pregunta == '15_med') {
                    repuesta_15 = this.datos[i].eva
                    id_pregunta_15 = this.datos[i].id_pregunta
                }
                if (this.datos[i].id_pregunta == '16_med') {
                    repuesta_16 = this.datos[i].eva
                    id_pregunta_16 = this.datos[i].id_pregunta
                }
                if (this.datos[i].id_pregunta == '17_med') {
                    repuesta_17 = this.datos[i].eva
                    id_pregunta_17 = this.datos[i].id_pregunta
                }
                if (this.datos[i].id_pregunta == '18_med') {
                    repuesta_18 = this.datos[i].eva
                    id_pregunta_18 = this.datos[i].id_pregunta
                }
                if (this.datos[i].id_pregunta == '19_med') {
                    repuesta_19 = this.datos[i].eva
                    id_pregunta_19 = this.datos[i].id_pregunta
                }
                // transversal
                if (this.datos[i].id_pregunta == '1_trans') {
                    repuesta_20 = this.datos[i].eva
                    id_pregunta_20 = this.datos[i].id_pregunta
                }
                if (this.datos[i].id_pregunta == '2_trans') {
                    repuesta_21 = this.datos[i].eva
                    id_pregunta_21 = this.datos[i].id_pregunta
                }
                if (this.datos[i].id_pregunta == '3_trans') {
                    repuesta_22 = this.datos[i].eva
                    id_pregunta_22 = this.datos[i].id_pregunta
                }
                if (this.datos[i].id_pregunta == '4_trans') {
                    repuesta_23 = this.datos[i].eva
                    id_pregunta_23 = this.datos[i].id_pregunta
                }
                if (this.datos[i].id_pregunta == '5_trans') {
                    repuesta_24 = this.datos[i].eva
                    id_pregunta_24 = this.datos[i].id_pregunta
                }
                if (this.datos[i].id_pregunta == '6_trans') {
                    repuesta_25 = this.datos[i].eva
                    id_pregunta_25 = this.datos[i].id_pregunta
                }
                if (this.datos[i].id_pregunta == '7_trans') {
                    repuesta_26 = this.datos[i].eva
                    id_pregunta_26 = this.datos[i].id_pregunta
                }
                if (this.datos[i].id_pregunta == '8_trans') {
                    repuesta_27 = this.datos[i].eva
                    id_pregunta_27 = this.datos[i].id_pregunta
                }
            }
            for (var i = 0; i < this.datos.length; i++) {
                if (this.datos[i].proceso == 'Cercanía' && this.datos[i].eva == 'PRESENTE') {
                    cercania = cercania + 100
                    n_cercania = n_cercania + 1
                }
                if (this.datos[i].proceso == 'Cercanía' && this.datos[i].eva == 'EN OCASIONES') {
                    cercania = cercania + 50
                    n_cercania = n_cercania + 1
                }
                if (this.datos[i].proceso == 'Cercanía' && this.datos[i].eva == 'AUSENTE') {
                    cercania = cercania + 0
                    n_cercania = n_cercania + 1
                }
                if (this.datos[i].proceso == 'Cercanía' && this.datos[i].eva == 'NO APLICA') {
                    cercania = cercania + 0
                   // n_cercania = n_cercania + 1
                }
                //
                if (this.datos[i].proceso == 'Cierre' && this.datos[i].eva == 'PRESENTE') {
                    cierre = cierre + 100
                    n_cierre = n_cierre + 1
                }
                if (this.datos[i].proceso == 'Cierre' && this.datos[i].eva == 'EN OCASIONES') {
                    cierre = cierre + 50
                    n_cierre = n_cierre + 1
                }
                if (this.datos[i].proceso == 'Cierre' && this.datos[i].eva == 'AUSENTE') {
                    cierre = cierre + 0
                    n_cierre = n_cierre + 1
                }
                if (this.datos[i].proceso == 'Cierre' && this.datos[i].eva == 'NO APLICA') {
                    cierre = cierre + 0
                    //n_cierre = n_cierre + 1
                }
                //
                if (this.datos[i].proceso == 'Efectividad' && this.datos[i].eva == 'PRESENTE') {
                    efectividad = efectividad + 100
                    n_efectividad = n_efectividad + 1
                }
                if (this.datos[i].proceso == 'Efectividad' && this.datos[i].eva == 'EN OCASIONES') {
                    efectividad = efectividad + 50
                    n_efectividad = n_efectividad + 1
                }
                if (this.datos[i].proceso == 'Efectividad' && this.datos[i].eva == 'AUSENTE') {
                    efectividad = efectividad + 0
                    n_efectividad = n_efectividad + 1
                }
                if (this.datos[i].proceso == 'Efectividad' && this.datos[i].eva == 'NO APLICA') {
                    efectividad = efectividad + 0
                   // n_efectividad = n_efectividad + 1
                }
                //
                if (this.datos[i].proceso == 'Entrega' && this.datos[i].eva == 'PRESENTE') {
                    entrega = entrega + 100
                    n_entrega = n_entrega + 1
                }
                if (this.datos[i].proceso == 'Entrega' && this.datos[i].eva == 'EN OCASIONES') {
                    entrega = entrega + 50
                    n_entrega = n_entrega + 1
                }
                if (this.datos[i].proceso == 'Entrega' && this.datos[i].eva == 'AUSENTE') {
                    entrega = entrega + 0
                    n_entrega = n_entrega + 1
                }
                if (this.datos[i].proceso == 'Entrega' && this.datos[i].eva == 'NO APLICA') {
                    entrega = entrega + 0
                    //n_entrega = n_entrega + 1
                }
                //
                if (this.datos[i].proceso == 'Exploración' && this.datos[i].eva == 'PRESENTE') {
                    exploracion = exploracion + 100
                    n_exploracion = n_exploracion + 1
                }
                if (this.datos[i].proceso == 'Exploración' && this.datos[i].eva == 'EN OCASIONES') {
                    exploracion = exploracion + 50
                    n_exploracion = n_exploracion + 1
                }
                if (this.datos[i].proceso == 'Exploración' && this.datos[i].eva == 'AUSENTE') {
                    exploracion = exploracion + 0
                    n_exploracion = n_exploracion + 1
                }
                if (this.datos[i].proceso == 'Exploración' && this.datos[i].eva == 'NO APLICA') {
                    exploracion = exploracion + 0
                   // n_exploracion = n_exploracion + 1
                }
                //
                if (this.datos[i].proceso == 'Objeciones' && this.datos[i].eva == 'PRESENTE') {
                    objeciones = objeciones + 100
                    n_objeciones = n_objeciones + 1
                }
                if (this.datos[i].proceso == 'Objeciones' && this.datos[i].eva == 'EN OCASIONES') {
                    objeciones = objeciones + 50
                    n_objeciones = n_objeciones + 1
                }
                if (this.datos[i].proceso == 'Objeciones' && this.datos[i].eva == 'AUSENTE') {
                    objeciones = objeciones + 0
                    n_objeciones = n_objeciones + 1
                }
                if (this.datos[i].proceso == 'Objeciones' && this.datos[i].eva == 'NO APLICA') {
                    objeciones = objeciones + 0
                    //n_objeciones = n_objeciones + 1
                }
            }

            let iterado = n_cercania + n_exploracion + n_entrega + n_objeciones + n_cierre + n_efectividad
            let ite_prod = cercania + exploracion + entrega + objeciones + cierre + efectividad

            let prod
            if (ite_prod != 0 && iterado != 0) {
                prod = ite_prod / iterado
                prod = prod.toFixed(2);
            }
            else {
                prod = '0.0'
            }

   
            let cer
            if (cercania != 0 && n_cercania != 0) {
                cer = cercania / n_cercania
                cer = cer.toFixed(2);
            }
            else {
                cer = '0.0'
            }

            let expl
            if (exploracion != 0 && n_exploracion != 0) {
                expl = exploracion / n_exploracion
                expl = expl.toFixed(2);
            }
            else {
                expl = '0.0'
            }

            let ent
            if (entrega != 0 && n_entrega != 0) {
                ent = entrega / n_entrega
                ent = ent.toFixed(2);
            }
            else {
                ent = '0.0'
            }

            let obj
            if (objeciones != 0 && n_objeciones != 0) {
                obj = objeciones / n_objeciones
                obj = obj.toFixed(2);
            }
            else {
                obj = '0.0'
            }

            let cier
            if (cierre != 0 && n_cierre != 0) {
                cier = cierre / n_cierre
                cier = cier.toFixed(2);
            }
            else {
                cier = '0.0'
            }

            let efec
            if (efectividad != 0 && n_efectividad != 0) {
                efec = efectividad / n_efectividad
                efec = efec.toFixed(2);
            }
            else {
                efec = '0.0'
            }


            if ($('#dllOficina').val() == "") {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar una sucursal...',
                    container: '#msjCalidad',
                    timer: 3000
                });
                return false;
            }
            if ($('#dllOEjecutivo').val() == "") {
                $.niftyNoty({
                    type: 'danger',
                    message: 'Debe ingresar un ejecutivo...',
                    container: '#msjCalidad',
                    timer: 3000
                });
                return false;
            }
            const formDataEvaluacion = {
                rut_evaluador: getCookie('Rut'),
                oficina_evaluador: parseInt(getCookie('Oficina')),
                fecha_evaluacion: $('#dpfechaEva').val(),
                rut_afiliado: $('#txtRutAfi').val(),
                fono_afiliado: $('#txtFonoAfi').val(),
                promedio: prod,
                cercania: cer,
                exploracion: expl,
                entrega: ent,
                objeciones: obj,
                cierre: cier,
                efectividad: efec,
                rut_evaluado: rut_eva,
                nombre_evaluado: $('select[name="dllOEjecutivo"] option:selected').text(),
                oficina_evaluado: $('#dllOficina').val(),
            };

            fetch(`http://${motor_api_server}:4002/calidad/guarda-evaluacion`, {
                method: 'POST',
                body: JSON.stringify(formDataEvaluacion),
                headers: {
                    'Content-Type': 'application/json',
                    'Token': getCookie('Token')
                }
            }).then(async (response) => {
                if (!response.ok) {
                    $(Swal.fire({
                        title: 'Error al grabar evaluación',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    }));
                    return false;
                }
                Swal.fire({
                    title: 'Evaluación grabada correctamente!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })

                fetch(`http://${motor_api_server}:4002/calidad/id-evaluaciones/${rut_eva}`, {
                    method: 'GET',
                    mode: 'cors',
                    cache: 'default'
                })
                    .then(response => response.json())
                    .then(datos => {
                        appCalidad.cargaDatosEvaluacion(datos[0].id);
                        id_eva_preg = datos[0].id
                        return datos
                    })
                setTimeout(function () {
                    const formDataEvaluacionPreguntas = {
                        id_evaluacion: id_eva_preg,
                        rut_evaluado: rut_eva,
                        nombre_evaluado: $('select[name="dllOEjecutivo"] option:selected').text(),
                        oficina_evaluado: $('#dllOficina').val(),
                        rut_afiliado: $('#txtRutAfi').val(),
                        fono_afiliado: $('#txtFonoAfi').val(),
                        id_pregunta_1: id_pregunta_1,
                        repuesta_1: repuesta_1,
                        id_pregunta_2: id_pregunta_2,
                        repuesta_2: repuesta_2,
                        id_pregunta_3: id_pregunta_3,
                        repuesta_3: repuesta_3,
                        id_pregunta_4: id_pregunta_4,
                        repuesta_4: repuesta_4,
                        id_pregunta_5: id_pregunta_5,
                        repuesta_5: repuesta_5,
                        id_pregunta_6: id_pregunta_6,
                        repuesta_6: repuesta_6,
                        id_pregunta_7: id_pregunta_7,
                        repuesta_7: repuesta_7,
                        id_pregunta_8: id_pregunta_8,
                        repuesta_8: repuesta_8,
                        id_pregunta_9: id_pregunta_9,
                        repuesta_9: repuesta_9,
                        id_pregunta_10: id_pregunta_10,
                        repuesta_10: repuesta_10,
                        id_pregunta_11: id_pregunta_11,
                        repuesta_11: repuesta_11,
                        id_pregunta_12: id_pregunta_12,
                        repuesta_12: repuesta_12,
                        id_pregunta_13: id_pregunta_13,
                        repuesta_13: repuesta_13,
                        id_pregunta_14: id_pregunta_14,
                        repuesta_14: repuesta_14,
                        id_pregunta_15: id_pregunta_15,
                        repuesta_15: repuesta_15,
                        id_pregunta_16: id_pregunta_16,
                        repuesta_16: repuesta_16,
                        id_pregunta_17: id_pregunta_17,
                        repuesta_17: repuesta_17,
                        id_pregunta_18: id_pregunta_18,
                        repuesta_18: repuesta_18,
                        id_pregunta_19: id_pregunta_19,
                        repuesta_19: repuesta_19,
                        id_pregunta_20: id_pregunta_20,
                        repuesta_20: repuesta_20,
                        id_pregunta_21: id_pregunta_21,
                        repuesta_21: repuesta_21,
                        id_pregunta_22: id_pregunta_22,
                        repuesta_22: repuesta_22,
                        id_pregunta_23: id_pregunta_23,
                        repuesta_23: repuesta_23,
                        id_pregunta_24: id_pregunta_24,
                        repuesta_24: repuesta_24,
                        id_pregunta_25: id_pregunta_25,
                        repuesta_25: repuesta_25,
                        id_pregunta_26: id_pregunta_26,
                        repuesta_26: repuesta_26,
                        id_pregunta_27: id_pregunta_27,
                        repuesta_27: repuesta_27,
                        rut_evaluador: getCookie('Rut'),
                        oficina_evaluador: parseInt(getCookie('Oficina')),
                    };
                    fetch(`http://${motor_api_server}:4002/calidad/guarda-preguntas-evaluacion`, {
                        method: 'POST',
                        body: JSON.stringify(formDataEvaluacionPreguntas),
                        headers: {
                            'Content-Type': 'application/json',
                            'Token': getCookie('Token')
                        }
                    }).then(async (response) => { })
                }, 1000);

                $('#dvEval').css('display', 'block')
                $("#btnInicia").html('NUEVA EVALUACIÓN');
            });
        },
        setDefaultsModal() {
            this.datos_evaM = {}
            dataCharts = {}
        },
    }
});

function formaterRut(value, row, index) {
    return `<a href="#" class="btn-link" data-target="#modal_evaluacion" data-toggle="modal" data-id="${row.id}" data-rut_evaluador="${value}" >${value}</a>`;
}
$('#modal_evaluacion').on('show.bs.modal', async (event) => {
    let id = $(event.relatedTarget).data('id')
    $('#demo-morris-bar2').html('')
    await appCalidad.cargaDatosEvaluacionModal(id);
    setTimeout(function () {
        Morris.Bar({
            element: 'demo-morris-bar2',
            data: [
                { y: 'Cerc.', a: dataCharts.cercania },
                { y: 'Expl.', a: dataCharts.exploracion },
                { y: 'Entr.', a: dataCharts.entrega },
                { y: 'Obje.', a: dataCharts.objeciones },
                { y: 'Cierre', a: dataCharts.cierre },
                { y: 'Efect.', a: dataCharts.efectividad },

            ],
            xkey: 'y',
            ykeys: ['a'],
            labels: ['Porcentaje '],
            gridEnabled: false,
            gridLineColor: 'transparent',
            barColors: ['#177bbb'],
            resize: true,
            hideHover: 'auto'
        });
    }, 1000);
});
$('#modal_evaluacion').on('hidden.bs.modal', function (e) {
    appCalidad.setDefaultsModal();
})









