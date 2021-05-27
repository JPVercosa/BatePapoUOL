const baseUrl = "https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/";

const clearIntervalBttn = document.querySelector('.clearInterval')
const sideBarBttn = document.querySelector('ion-icon.people')
const sideBar = document.querySelector('.sidebar')
const darkBG = document.querySelector('.dark-background')

sideBarBttn.addEventListener('click', () => {
    sideBar.classList.toggle('hidden')
    darkBG.classList.toggle('hidden')

})

darkBG.addEventListener('click', () => {
    sideBar.classList.toggle('hidden')
    darkBG.classList.toggle('hidden')

})

clearIntervalBttn.addEventListener('click', () => {
    clearInterval(onlineInterval);
    clearInterval(refreshFeedInterval);
    console.log('Teste');
})


const connectRoom = async (nome) => {
    const data = { 'name': nome };
    try {
        const res = await axios.post(baseUrl + "participants", data);
        console.dir(res.data);
    } catch (error) {
        console.log("Error function connectRoom.")
        if (error.response.status === 400) {
            console.log("Nome de usuário já existente.")
            nome = prompt("Por favor insira outro nome de usuário: ", `userID${Math.floor(1 + Math.random() * 10)}`)
            connectRoom(nome);
        } else
            console.log(error);
    }
}

const isOnline = async (nome) => {
    const data = { 'name': nome };
    try {
        const res = await axios.post(baseUrl + "status", data);
    } catch (error) {
        console.log("Error function isOnline.")
        console.log(error);
    }
}

const getMessages = async () => {
    try {
        const res = await axios.get(baseUrl + "messages")
        fillFeed(res.data);
    } catch (error) {
        console.log("Error function getMessages")
        console.log(error)
    }
}

const sendMessage = async (from, to, text, type) => {
    const data = {
        'from': from,
        'to': to,
        'text': text,
        'type': type
    }
    try {
        const res = await axios.post(baseUrl + "messages", data);

    } catch (error) {
        console.log("Error function sendMessage")
        console.log(error)
    }
}

const searchParticipants = async () => {
    try {
        const res = await axios.get(baseUrl + "participants", data);

    } catch (error) {
        console.log("Error function searchParticipants")
        console.log(error)
    }
}

function fillFeed(feed) {
    const container = document.querySelector(".feed");

    for (let i = 0; i < feed.length; i++) {
        if (feed[i].type === "status") {
            container.innerHTML += `
            <li class="system">
                <p>
                    <span>(${feed[i].time})</span> <strong>${feed[i].from}</strong>: ${feed[i].text}
                </p>
            </li>
            `
        }
        if (feed[i].type === "message") {
            container.innerHTML += `
            <li>
                <p>
                    <span>(${feed[i].time})</span> <strong>${feed[i].from}</strong> para <strong>${feed[i].to}</strong>: ${feed[i].text}
                </p>
            </li>
            `
        }
        if (feed[i].type === "private_message" && (feed[i].to === enter_room.name || feed[i].to === "Todos")) {
            container.innerHTML += `
            <li class="private">
                <p>
                    <span>(${feed[i].time})</span> <strong>${feed[i].from}</strong> para <strong>${feed[i].to}</strong>: ${feed[i].text}
                </p>
            </li>
            `
        }

        const scroll = container.lastElementChild;
        scroll.scrollIntoView();
    }
}



const nome = prompt("Insira seu nome:", `userID${Math.floor(1 + Math.random() * 10)}`);

connectRoom(nome);
getMessages();
//sendMessage(nome, 'todos', 'Minha primeira mensagem', 'message');
const onlineInterval = setInterval(isOnline, 5000, nome);
const refreshFeedInterval = setInterval(getMessages, 3000);