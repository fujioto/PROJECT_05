'use strict';

// -------------------------ДОБАВЛЕНИЕ ЗАПИСЕЙ-------------------------------

const addButton = document.querySelector('.add');
const closeAddModal = document.querySelector('.close-add');

addButton.addEventListener('click', () => {
    document.querySelector('.modal-add-overlay').style.display = 'block';
})

closeAddModal.addEventListener('click', () => {
    document.querySelector('.modal-add-overlay').style.display = 'none';
})

document.querySelector('.confirm-add').addEventListener('click', () => {
    const data = {
        id: generateUniqueId(),
        surname: document.querySelector('.surname-input').value,
        pass: document.querySelector('.pass-input').value,
        name: document.querySelector('.name-input').value,
        adress: document.querySelector('.address-input').value,
        patron: document.querySelector('.patron-input').value,
        specs: document.querySelector('.specs-input').value
    };
    // let tr = document.createElement('tr')
    // let tbody = document.querySelector('.tbody')
    // tr.classList.add(`${data.id}`)
    // tbody.append(tr);
    // let tdId = document.createElement('td')
    // tdId.classList.add('id')
    // tdId.innerHTML = `${data.id}`
    // tr.append(tdId)
    // let tdFCS = document.createElement('td')
    // tdFCS.classList.add('FCS')
    // tdFCS.innerHTML = `${data.surname} ${data.name} ${data.patron}`
    // tr.append(tdFCS)
    // let tdComeIn = document.createElement('td')
    // tdComeIn.classList.add('comeIn')
    // tdComeIn.innerHTML = '00:00'
    // tr.append(tdComeIn)
    // let tdComeOut = document.createElement('td')
    // tdComeOut.classList.add('comeOut')
    // tdComeOut.innerHTML = '00:00'
    // tr.append(tdComeOut)
    // let tdTotalTime = document.createElement('td')
    // tdTotalTime.classList.add('totalTime')
    // tdTotalTime.innerHTML = '00:00'
    // tr.append(tdTotalTime)
    // let tdInfo = document.createElement('td')
    // tdInfo.classList.add('info')
    // tdInfo.innerHTML = 'INFORMATION'
    // tr.append(tdInfo)
    // let tdStat = document.createElement('td')
    // let deleteImg = document.createElement('img');
    // let deleteButton = document.createElement('button')
    // let showStatButton = document.createElement('button')
    // showStatButton.classList.add('show-stat-button');
    // showStatButton.innerHTML = "ПОКАЗАТЬ"
    // tdStat.append(showStatButton);
    // deleteButton.classList.add('delete-button')
    // deleteImg.setAttribute("src", "../img/delete-user-left-2-svgrepo-com-1-delete.svg");
    // deleteImg.classList.add('delete-img')
    // tdStat.classList.add('stat')
    // deleteButton.append(deleteImg);
    // tdStat.append(deleteButton);
    // tr.append(tdStat)
    sendDataToJsonFile(data);
    document.querySelector('.surname-input').value = ""
    document.querySelector('.pass-input').value = ""
    document.querySelector('.name-input').value = ""
    document.querySelector('.address-input').value = ""
    document.querySelector('.patron-input').value = ""
    document.querySelector('.specs-input').value = ""
    document.querySelector('.modal-add-overlay').style.display = 'none';
    let tbody = document.querySelector('.tbody');
    let rows = tbody.getElementsByTagName('tr');
    for (let el of rows) {
        el.remove();
    };
    generateWorkers();
});

const generateUniqueId = () => {
    return Math.floor(Math.random() * (9999 - 1) + 1);
}

const sendDataToJsonFile = (data) => {
    if (localStorage.getItem('persons') !== null) {
        let existArray = JSON.parse(localStorage.getItem('persons'));
        existArray.push(data);
        localStorage.setItem('persons', JSON.stringify(existArray));
    } else {
        let lotArray = [];
        lotArray.push(data);
        localStorage.setItem('persons', JSON.stringify(lotArray))
    }
}

// ---------------------------------ГЕНЕРАЦИЯ ИЗ LOCAL STORAGE-----------------------------------------

const generateWorkers = () => {
    if (localStorage.getItem('persons') === null) {
        console.log('NOTHING TO GENERATE STOOPID NIGGER')
    } else {
        let localArray = JSON.parse(localStorage.getItem('persons'));
        localArray.forEach(el => {
            let tr = document.createElement('tr')
            let tbody = document.querySelector('.tbody')
            tr.classList.add(`${el.id}`)
            tbody.append(tr);
            let tdId = document.createElement('td')
            tdId.classList.add('id')
            tdId.innerHTML = `${el.id}`
            tr.append(tdId)
            let tdFCS = document.createElement('td')
            tdFCS.classList.add('FCS')
            tdFCS.innerHTML = `${el.surname} ${el.name} ${el.patron}`
            tr.append(tdFCS)
            let tdComeIn = document.createElement('td')
            tdComeIn.classList.add('comeIn')
            tdComeIn.innerHTML = '00:00'
            tr.append(tdComeIn)
            let tdComeOut = document.createElement('td')
            tdComeOut.classList.add('comeOut')
            tdComeOut.innerHTML = '00:00'
            tr.append(tdComeOut)
            let tdTotalTime = document.createElement('td')
            tdTotalTime.classList.add('totalTime')
            tdTotalTime.innerHTML = '00:00'
            tr.append(tdTotalTime)
            let tdInfo = document.createElement('td')
            let showInfoButton = document.createElement('button');
            let showInfoImg = document.createElement('img');
            let editInfoButton = document.createElement('button');
            let editInfoImg = document.createElement('img')
            showInfoImg.classList.add('show-info-img');
            showInfoImg.setAttribute('src', '../img/shopiconshow-info.svg');
            showInfoButton.classList.add('show-info-button');
            editInfoImg.classList.add('edit-info-img');
            editInfoImg.setAttribute('src', '../img/vectoredit.svg')
            editInfoButton.classList.add('edit-info-button');
            tdInfo.classList.add('info')
            showInfoButton.append(showInfoImg);
            editInfoButton.append(editInfoImg);
            tdInfo.append(showInfoButton);
            tdInfo.append(editInfoButton);
            tr.append(tdInfo)
            let tdStat = document.createElement('td')
            let deleteImg = document.createElement('img');
            let deleteButton = document.createElement('button')
            let showStatButton = document.createElement('button')
            showStatButton.classList.add('show-stat-button');
            showStatButton.innerHTML = "ПОКАЗАТЬ"
            tdStat.append(showStatButton);
            deleteButton.classList.add('delete-button')
            deleteImg.setAttribute("src", "../img/delete-user-left-2-svgrepo-com-1-delete.svg");
            deleteImg.classList.add('delete-img')
            tdStat.classList.add('stat')
            deleteButton.append(deleteImg);
            tdStat.append(deleteButton);
            tr.append(tdStat)
        });
    }
}

//--------------------------УДАЛЕНИЕ ЗАПИСЕЙ----------------------------------

const table = document.querySelector('.ems')

table.addEventListener('click', (event) => {
    let td = event.target.closest('button');
  
    if (!td) return;

    if(!td.classList.contains('delete-button')) return;

    let workerId = Number((td.parentNode).parentNode.className);

    let localArr = JSON.parse(localStorage.getItem('persons'));
    localArr.forEach(el => {
        if (el.id === workerId) {
            let index = localArr.indexOf(el);
            localArr.splice(index, 1);
            localStorage.setItem('persons', JSON.stringify(localArr));
        }
    })
})


document.addEventListener('onload', () => {
    generateWorkers();
})
