jQuery.support.cors = true;

var appPex = new Vue({
    el: '#tab-estado-tam',
    data: {
        dataSearch: {}
    },
    mounted() {
    },
    methods: {
        buscaEstadoTam() {
            let rut = $('#inputRutEstado').val()
            fetch(`http://${motor_api_server}:4002/tam/estado-tarjeta-tam/${rut}`, {
                method: 'GET',
                mode: 'cors',
                cache: 'default'
            })
                .then(response => response.json())
                .then(datos => {
                    if (datos.length != 0) {
                        this.dataSearch = datos[0];
                        $('#divStateCard').css('display', 'block')
                        return datos
                    } else {
                        $('#divStateCard').css('display', 'none')
                    

                        Swal.fire({
                            title: 'Rut no encontrado..',
                            html: `<ul><li class="msg-part">No se encontro estado de tarjeta TAM.</li></ul>`,
                            icon: 'error',
                            confirmButtonText: 'Ok'
                        });
                    }
                })
        }
    }
});


