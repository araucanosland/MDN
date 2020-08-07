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
