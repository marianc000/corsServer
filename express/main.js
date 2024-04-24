import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';

const app = express()
const port = process.env.PORT || 3000;

app.use(session({
    name: 'sessionid',
    secret: 'mysecret',
    cookie: { sameSite: 'none',secure:true },
    resave: false,
    saveUninitialized: false
}));

app.use(express.static('public'));
app.use(bodyParser.json());

app.all('/data/:id', (req, res) => {
    req.session.count = (req.session.count || 0) + 1;
    res.send({method:req.method,
        time:req.session.count,
        sessionId:req.session.id,
        // pathParam:req.params.id,
        data:JSON.stringify(req.body)
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})