const express = require('express');
const cors = require('cors');
const app = express();
var bodyParser = require('body-parser');
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('PUBLIC'))
app.use(express.static('HTML'))
app.use(express.static('CSS'))
const port = 3000;
const nodemailer= require('nodemailer');

// Import
const uid = require('uid')



let users =
    [
        {
            "id": uid(10),
            "nume": "Cantu",
            "prenume": "Denisa",
            "email": "denisa.cantu@yahoo.com",
            "parola": "Denisa12",
            "gen": "feminin",
            "varsta": "20",
            "caracter": "p1"
        },
        {
            "id": uid(10),
            "nume": "Bucur",
            "prenume": "Andreea",
            "email": "andreeabucur45@yahoo.com",
            "parola": "Andreea12",
            "gen": "feminin",
            "varsta": "20",
            "caracter": "p1"
        }

    ]



app.post('/adauga-utilizator', (req, res) => {
    const userData = req.body;
    userData.id = uid(10);
    users.push(req.body);
    res.statusCode = 201;
    console.log(users);
    res.send(users);
});


app.get('/utilizatori/', (req, res) => {
    res.send(users);
});



app.get('/JOC/', (req, res) => {
    res.sendFile(__dirname + '/game.html')
});

app.get('*', function (req, res) {
    res.status(404).sendFile(__dirname + '/HTML/404.html');
}


);

app.post('/trimite-mail', (req, res) => {
    const obiect = req.body;
    console.log(obiect.emaill);
    trimitereMail(obiect.emaill,obiect.nume);

});



app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))




function trimitereMail(emaill,nume) 
   {
       console.log

    let transporter = nodemailer.createTransport
        ({
            service: 'gmail',
            auth: {
                user: "andrreea.bucur45@gmail.com",
                pass: "Javascriptgame"
            }
        });
    let mailOptions = {
        from: "andrreea.bucur45@gmail.com",
        to: emaill,
        subject: "Cont blocat temporar.",
        text: "Buna ziua, " + nume + "! Contul dumneavoastra a fost blocat temporar din cauza prea multor incercari esuate de logare. Daca nu ati fost dvs, va rugam sa ne contactati."
    };
    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            console.log("Error occurs",err)
        }
        else console.log("Email sent")
    });
}