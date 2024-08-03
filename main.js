import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';

const app = express()
const port = process.env.PORT || 3000;

app.set('trust proxy', 1) // trust first proxy

app.use(session({
    name: 'sessionid',
    secret: 'mysecret',
    cookie: { sameSite: 'none', secure: true,partitioned:true },
    resave: false,
    saveUninitialized: false
}));

app.use(express.static('public'));
app.use(bodyParser.json());

app.all('/data/:id', (req, res) => {
    req.session.count = (req.session.count || 0) + 1;
    res.set('Content-Security-Policy', "default-src 'self';");
    const r = {
        method: req.method,
        time: req.session.count,
        sessionId: req.session.id,
        pathParam: req.params.id,
    };
    if (Object.keys(req.body).length)
        r.data = JSON.stringify(req.body);
    res.send(r);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})