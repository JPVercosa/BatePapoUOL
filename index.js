const axios = require('axios');

const baseUrl = "https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/";

const nome = prompt("Insira seu nome:", `userID${Math.floor(1 + Math.random() * 10)}`);

const connectRoom = async (nome) => {
    const data = { nome: nome };
    try {
        axios.post(baseUrl + "participants", data);
    } catch (error) {
        console.log("Error function conectRoom.")
        console.log(error);
    }
}

setTimeout(() => {
    const keepOnline = async (nome) => {
        const data = { nome: nome };
        try {
            axios.post(baseUrl + "status", data);
        } catch (error) {
            console.log("Error function conectRoom.")
            console.log(error);
        }
    }
}, 5000)

