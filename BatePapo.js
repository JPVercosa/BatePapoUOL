const baseUrl = "https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/";

const clearIntervalBttn = document.querySelector('.clearInterval')
const sideBarBttn = document.querySelector('ion-icon.people')
const sideBar = document.querySelector('.sidebar')
const darkBG = document.querySelector('.dark-background')
const sendBttn = document.querySelector('.sendBttn')

let contactSelected = 'todos'
let messageTypeSelected = 'message'

sendBttn.addEventListener('click', () => {
    const inputElem = document.querySelector('.message')
    sendMessage(nome, contactSelected, inputElem.value, messageTypeSelected)
})

sideBarBttn.addEventListener('click', () => {
    sideBar.classList.toggle('hidden')
    darkBG.classList.toggle('hidden')

})

darkBG.addEventListener('click', () => {
    sideBar.classList.toggle('hidden')
    darkBG.classList.toggle('hidden')

})

const connectRoom = async (nome) => {
    const data = { 'name': nome };
    try {
        const res = await axios.post(baseUrl + "participants", data);
        console.log(`${nome} conectado!`)
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
    if (nome) {
        const data = { 'name': nome };
        try {
            const res = await axios.post(baseUrl + "status", data);
            console.log(`${nome} está online!`)
        } catch (error) {
            console.log("Error function isOnline." + data.name)
            console.log(error);
        }
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

const sendMessage = async () => {
    const msg = document.querySelector('.message')
    const data = {
        'from': nome,
        'to': contactSelected,
        'text': msg.value,
        'type': (messageTypeSelected === "Privado" ? "private_message" : "message")
    }
    try {
        const res = await axios.post(baseUrl + "messages", data);
        getMessages();

    } catch (error) {
        console.log("Error function sendMessage")
        console.log(error)
    }
}

const searchParticipants = async () => {
    try {
        const res = await axios.get(baseUrl + "participants");
        fillContacts(res.data)
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
        if (feed[i].type === "private_message" && (feed[i].to === nome || feed[i].to === "Todos")) {
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

function fillContacts(users) {
    const contactList = document.querySelector(".contacts");

    contactList.innerHTML = `
            <li class="user" onclick="selectUser(this)">
                <p>
                    <ion-icon name="people"></ion-icon>
                    <span>Todos</span>
                    <ion-icon name="checkmark-outline" class="hidden" style="float:right"></ion-icon>
                </p>
            </li>
    `

    for (let i = 0; i < users.length; i++) {
        contactList.innerHTML += `
            <li class="user" onclick="selectUser(this)">
                <p>
                    <ion-icon name="person-circle"></ion-icon>
                    <span>${users[i].name}</span>
                    <ion-icon name="checkmark-outline" class="hidden" style="float:right"></ion-icon>
                </p>
            </li>
        `
    }
}

function selectUser(userLI) {
    const usersList = userLI.parentNode.children;
    const pUser = userLI.children[0];
    const ionIconCheck = pUser.lastElementChild;

    for (let i = 0; i < usersList.length; i++) {
        const auxCheck = usersList[i].children[0].lastElementChild;
        if (!auxCheck.classList.contains('hidden')) {
            auxCheck.classList.add('hidden');
        }
    }
    ionIconCheck.classList.remove('hidden');

    contactSelected = userLI.children[0].children[1].innerText;
    console.log(contactSelected);
}

function selectType(typeLI) {
    const typesList = typeLI.parentNode.children;
    const pType = typeLI.children[0]
    const ionIconCheck = pType.lastElementChild;

    for (let i = 0; i < typesList.length; i++) {
        const auxCheck = typesList[i].children[0].lastElementChild;
        if (!auxCheck.classList.contains('hidden')) {
            auxCheck.classList.add('hidden');
        }
    }
    ionIconCheck.classList.remove('hidden');

    messageTypeSelected = typeLI.children[0].children[1].innerText;
    console.log(messageTypeSelected);
}



const nome = prompt("Insira seu nome:", `userID${Math.floor(1 + Math.random() * 10)}`);

connectRoom(nome);
getMessages();
isOnline(nome)
searchParticipants();
//sendMessage(nome, 'todos', 'Minha primeira mensagem', 'message');
const onlineInterval = setInterval(isOnline, 5000, nome);
const refreshFeedInterval = setInterval(getMessages, 30000);
const refreshUsers = setInterval(searchParticipants, 100000)

