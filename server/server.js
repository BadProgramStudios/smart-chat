import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import OpenAI from 'openai';

dotenv.config();



const openai = new OpenAI({
    apiKey: process.env.OPEN_API_KEY
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    res.status(200).send({
        message:'Hello Word api funcionando en node'
    })
})

app.post('/', async (req, res) => {

    try{
        const promt = req.body.promt;
        const response = await openai.completions.create({
            model: "text-davinci-003",
            prompt: `${promt}`,
            temperature: 0.6,
            max_tokens: 150,
        });

        res.status(200).send({
            bot: response.choices[0].text
        })

    } catch (error){
        console.log(error);
        res.status(500).send({error});
    }




})

app.listen(3003, ()=> console.log('Server is running on port http://localhost:3003'))
