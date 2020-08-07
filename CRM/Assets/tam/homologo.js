const app_variables = {
    env: 'production',
    base_url: 'http://serv-292/Motor/',
    sucursal: {
        codigo: getCookie('Oficina'),
        nombre: '',
    },
    ejecutivo: {
        nombre: getCookie('Usuario'),
        rut: getCookie('Rut'),
    },
    external: {
        motor_api_server: 'http://serv-292:4002',
    }
};