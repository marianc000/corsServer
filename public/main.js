const URL = 'data/321'
function send(method = 'get') {
    const options = {
        method
        , credentials: 'include'
    };
    if (!['get', 'delete'].includes(method)) {
        options.headers = {
            "Content-Type": "application/json",
        };
        options.body = JSON.stringify({ data: 123 });
    }
    return fetch(URL, options)
        .then(r => {
            if (r.ok) return r.json();
            return {error: r.status+' '+r.statusText};
        }).catch(er => ({ error: er }))
        .then(o => {
            console.log(o);
            tbody.insertAdjacentHTML('beforeend',  toRow(o) );
        });
}

function toRow(o) {
    if (o.error) return `<tr><td colspan=4>${o.error}</td></tr>`
    return `<tr><td>${o.method}</td><td>${o.time}</td><td>${o.sessionId}</td><td>${o.data}</td></tr>`;
}
send().then(() => send('post'))
    .then(() => send('put'))
    .then(() => send('delete'))
    .then(() => send('PATCH'));