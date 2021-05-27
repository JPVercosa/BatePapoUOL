const baseUrl = "https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/";

const clearIntervalBttn = document.querySelector('.clearInterval')
clearIntervalBttn.addEventListener('click', () => {
    clearInterval(interval);
    console.log('Teste');
})


const nome = prompt("Insira seu nome:", `userID${Math.floor(1 + Math.random() * 10)}`);


const connectRoom = async (nome) => {
    const data = { 'nome': nome };
    console.log(data);
    try {
        const res = await axios.post(baseUrl + "participants", data);
        console.dir(res.data);
    } catch (error) {
        console.log("Error function connectRoom.")
        console.log(error);
    }
}

const isOnline = async (nome) => {
    const data = { 'nome': nome };
    console.log("5s + " + nome)
    try {
        const res = await axios.post(baseUrl + "status", data);
        console.dir(res.data);
    } catch (error) {
        console.log("Error function isOnline.")
        console.log(error);
    }
}

const getMessages = async () => {
    try {
        const res = await axios.get(baseUrl + "messages")
        console.dir(res.data);
    } catch (error) {
        console.log("Error function getMessages")
        console.log(error)
    }
}




connectRoom(nome);
getMessages();
//const interval = setInterval(isOnline, 5000, nome)