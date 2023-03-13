jQuery.support.cors = true;
var appVentaRemota = new Vue({
    el: '#divBancos',
    data: {
        filtros: {
            banco: [],
        },
        modelos: {
            banco: '',
        }
    },
    mounted() {
        this.obtenerBanco();
    },
    methods: {

        obtenerBanco() {
           
            fetch(`http://${motor_api_server}:4002/venta-remota/lista-bancos`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(bancoJSON => {
                    
                    this.filtros.banco = bancoJSON;
                });
        },

        cargaLeadFiltroCall(rut) {
           
            fetch(`http://${motor_api_server}:4002/venta-remota/obtiene-registro-bancos/${rut}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(dato => {
                    $('#afi_n_cuenta').val(dato.n_cuenta)
                    $('#afi_banco').val(dato.banco)
                    $('#afi_tipo_cuenta').val(dato.tipo_cuenta)
                    $('#afi_fono_banco').val(dato.telefono)
                    $('#afi_email_banco').val(dato.email)
                });
        },

        guardaRegistroBancario() {

            let rutB = ''
            let nombre_ = ''
            if ($('#afi_rut_busc_b').val() != '' && $('#afi_rut_busc_b').val() != undefined) {
                rutB = $('#afi_rut_busc_b').val()
                nombre_ = $('#afi_nombres').val()
            }
            else if ($('#RutAfiliado').val() != '' && $('#RutAfiliado').val() != undefined) {
                rutB = $('#RutAfiliado').val()
                nombre_ = $('#NombreAfiliado').html()
            }
            else if ($('#afi_rut').val() != '' && $('#afi_rut').val() != undefined) {
                rutB = $("#afi_rut").val().replace(/\./g, '')
                nombre_ = $('#afi_nombres').val()
            }

            const formData = {
                rut: rutB,
                nombre: nombre_,
                telefono: $('#afi_fono_banco').val(),
                tipo_cuenta: $('select[name="afi_tipo_cuenta"] option:selected').text(),
                n_cuenta: $('#afi_n_cuenta').val(),
                banco: $('select[name="afi_banco"] option:selected').text(),
                email: $('#afi_email_banco').val(),
                ejecutivo_ingreso: getCookie('Rut'),
                oficina: parseInt(getCookie('Oficina')),
            };
            
            fetch(`http://${motor_api_server}:4002/venta-remota/guarda-banco-afiliado`, {
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
                        message: 'Error al intentar guardar Datos.',
                        container: '#msBanco_',
                        timer: 3000
                    });
                    return false;
                }
                $.niftyNoty({
                    type: 'success',
                    icon: 'pli-like-2 icon-2x',
                    message: 'Datos Guardados correctamente.',
                    container: '#msBanco_',
                    timer: 3000
                });
            });
        },
        setDefaultsModalData() {
            this.modelos = {
                banco: '',
            }
            $('#afi_n_cuenta').val("");
            $('#afi_tipo_cuenta').val("");
            $('#afi_fono_banco').val("");
            $('#afi_email_banco').val();
            $('#divBancos').css('display', 'none');
        }
    }
});