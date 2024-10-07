const express = require('express');
const QRCode = require('qrcode');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let currentQuestionIndex = 0;
const questions = [
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: 2 },
    { question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Leo Tolstoy"], answer: 1 },
    { question: "What is the smallest planet in our solar system?", options: ["Earth", "Mars", "Mercury", "Venus"], answer: 2 },
    { question: "Which element has the chemical symbol 'O'?", options: ["Oxygen", "Gold", "Silver", "Helium"], answer: 0 },
    { question: "What year did the Titanic sink?", options: ["1910", "1912", "1914", "1916"], answer: 1 },
];

app.get('/', (req, res) => {
    res.send('Welcome to the KBC Game! Visit /qr to get the QR code.');
});

app.get('/question', (req, res) => {
    res.json(questions[currentQuestionIndex]);
});

app.post('/answer', (req, res) => {
    const { answer } = req.body;
    if (answer === questions[currentQuestionIndex].answer) {
        res.json({ correct: true });
        currentQuestionIndex = (currentQuestionIndex + 1) % questions.length; // Move to next question
    } else {
        res.json({ correct: false });
    }
});

app.get('/qr', (req, res) => {
    const url = 'http://localhost:3000/participate'; // Mobile participation URL
    QRCode.toDataURL(url, (err, src) => {
        res.send(`<img src="${src}">`);
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
