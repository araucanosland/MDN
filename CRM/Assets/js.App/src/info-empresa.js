jQuery.support.cors = true;
var appInfoEmpresa = new Vue({
    el: '#infoEmpresa',
    data: {
        dataModal: {}
    },
   

    mounted() {
        
    },
    methods: {
        obtenerInfoEmpresa() {
            this.dataModal = []
            let rutEmpresa = $('#txtRutInfoEmp').val();
            let fechaHoy = new Date();
            let periodo = fechaHoy.getFullYear().toString() + (fechaHoy.getMonth() + 1).toString().padStart(2, '0');

            fetch(`http://${motor_api_server}:4002/info-empresa/lista-info-empresa/${rutEmpresa}/${periodo}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    this.dataModal = datos[0];
                    this.dataModal.PENETRACION = (this.dataModal.PENETRACION * 100).toFixed(1)
                    this.dataModal.IGN_ACTUAL = (this.dataModal.IGN_ACTUAL * 100).toFixed(1)
                    this.dataModal.INDICE_MORA_30 = (this.dataModal.INDICE_MORA_30 * 100).toFixed(1)
                    this.dataModal.TR = (this.dataModal.TR * 100).toFixed(1)
                    this.dataModal.TOTAL_NOMINA = formatNumber(this.dataModal.TOTAL_NOMINA)
                    this.dataModal.PENDIENTE_PAGO = formatNumber(this.dataModal.PENDIENTE_PAGO)
                    this.dataModal.DEUDA = formatNumber(this.dataModal.DEUDA)
                    this.dataModal.MORA_30 = formatNumber(this.dataModal.MORA_30)
                    this.dataModal.MORA_365 = formatNumber(this.dataModal.MORA_365)
                    $('#txtRutInfoEmp').val("")
                    return datos
                })
        },
    }
});

function formatNumber(num) {
    if (!num || num == 'NaN') return '-';
    if (num == 'Infinity') return '&#x221e;';
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + '.' + num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num);
}














