function api(endpoint, options = {}) {
    return new Promise((resolve, reject) => {
        fetch(endpoint, options)
            .then(response => {
                if (response.status === 200 || response.status === 201) {
                    return resolve(response.json());
                } else if (response.status === 204 || response.status === 202) {
                    return resolve();
                } else {
                    response.json().then(rs => {
                        return reject({ status: response.status, ...rs });
                    });
                }
            })
    });
}

function validaRutChileno(rutCompleto) {
    rutCompleto = rutCompleto.replace("‐", "-");
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto))
        return false;
    var tmp = rutCompleto.split('-');
    var digv = tmp[1];
    var rut = tmp[0];
    if (digv == 'K') digv = 'k';

    return (digitoVerificadorChileno(rut) == digv);
}

function digitoVerificadorChileno(T) {
    var M = 0, S = 1;
    for (; T; T = Math.floor(T / 10))
        S = (S + T % 10 * (9 - M++ % 6)) % 11;
    return S ? S - 1 : 'k';
}