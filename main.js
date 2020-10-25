getJSON = (fileName) => {
    var folderName = fileName.substring(0, 5);


    // var script = document.createElement('script');
    // script.src = `./${folderName}/${fileName}.json`;
    // document.querySelector('head').appendChild(script);

    
    const url = window.location.href.split(window.location.pathname)[0] + '/' + folderName + '/' + fileName + '.json';
    fetch(url).then(res => {
         if (res && res.status >= 200 && res.status < 400) {
              return res.json();
         }
         }).then(QArray => {
             if (QArray) {
                 jsonB(QArray);
         }
        }).catch(err => {
        console.log(err);
    });
}

toggleSubject = (subject) => {
    ['phy-col', 'chem-col', 'math-col', 'bio-col'].forEach((subColId) => {
        document.getElementById(subColId).classList.add('d-none');
    });
    document.getElementById(subject).classList.remove('d-none');
}
toggleGrid = (btn) => {
    var grid = btn.parentElement.parentElement.children[1];
    grid.classList.toggle('d-block');
    grid.classList.toggle('d-none');
    var btntxt = btn.innerText;
    if (btntxt === 'Show Grid') {
        btn.innerText = 'Hide Grid';
    } else {
        btn.innerText = 'Show Grid';
    }
}
loadJSON = (_this) => {
    if (_this.value !== '') {
        // const url = window.location.href.split(window.location.pathname)[0] + '/files/' + _this.value + '.json';
        // fetch(url).then(res => {
        //     if (res && res.status >= 200 && res.status < 400) {
        //         return res.json();
        //     }
        // }).then(QArray => {
        //     if (QArray) {
        //         jsonE(QArray);
        //     }
        // }).catch(err => {
        //     console.log(err);
        // });
        var script = document.createElement('script');
        script.src = `./files/${_this.value}.json`;
        document.querySelector('head').appendChild(script);
    }
}
jsonE = (data) => {
    var engContainer = document.getElementById('engContainer');
    engContainer.innerHTML = '';
    Object.keys(data).reverse().forEach(qId => {
        var qObj = data[qId];
        qObj['id'] = qId;
        pushCard(qObj, engContainer);
    });
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, engContainer]);
}
jsonB = (data) => {
    var benContainer = document.getElementById('benContainer');
    var btnGrid = document.getElementById('btn-grid');
    var btnCntrl = btnGrid.parentElement.children[0];
    benContainer.innerHTML = '';
    btnGrid.innerHTML = '';
    Object.keys(data).forEach((qId, index) => {
        var qObj = data[qId];
        qObj['id'] = qId;
        if (qObj['S'] || qObj['Q'] || qObj['A'] || qObj['B'] || qObj['C'] || qObj['D'] || qObj['R']) {
            pushCard(qObj, benContainer, index);
            pushBtn(qObj, btnGrid);
        }
    });
    btnCntrl.classList.add('d-flex');
    btnCntrl.classList.remove('d-none');
    document.getElementById('totalQCount').innerText = Object.keys(data).length;
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, benContainer]);
}
pushBtn = (qObj, btnGrid) => {
    var btn = document.createElement('button');
    btn.classList.add('btn', 'btn-info', 'm-1');
    btn.innerText = Number(qObj['id'].substring(7));
    btn.setAttribute('data-qid', qObj['id']);
    btn.onclick = toggleCard(btn);
    btnGrid.appendChild(btn);
}
toggleCard = (btn) => {
    return function () {
        document.getElementById(btn.getAttribute('data-qid')).classList.toggle('d-none');
    }
}
pushCard = (qObj, container, index) => {
    const card = document.createElement('div');
    const header = document.createElement('div');
    const body = document.createElement('div');
    const footer = document.createElement('div');
    const qid = document.createElement('div');
    const desc = document.createElement('p');
    const descTable = document.createElement('table');
    const descImg = document.createElement('div');
    const ques = document.createElement('div');
    const quesImg = document.createElement('div');
    const quesTable = document.createElement('table');
    const opt1 = document.createElement('p');
    const opt1Img = document.createElement('div');
    const opt2 = document.createElement('p');
    const opt2Img = document.createElement('div');
    const opt3 = document.createElement('p');
    const opt3Img = document.createElement('div');
    const opt4 = document.createElement('p');
    const opt4Img = document.createElement('div');
    const opt5 = document.createElement('p');
    const opt5Img = document.createElement('div');
    const ans = document.createElement('div');
    const hint = document.createElement('div');
    const hintImg = document.createElement('div');
    header.appendChild(qid);
    header.appendChild(desc);
    if (qObj['ST']) {
        header.appendChild(descTable);
        getTable(descTable, qObj['ST']);
    }
    if (qObj['SI']) {
        header.appendChild(descImg);
        descImg.innerHTML = qObj['SI'];
    }
    header.appendChild(ques);
    if (qObj['QT']) {
        header.appendChild(quesTable);
        getTable(quesTable, qObj['QT']);
    }
    if (qObj['QI']) {
        header.appendChild(quesImg);
        quesImg.innerHTML = qObj['QI'];
    }
    body.appendChild(opt1);
    if (qObj['AI']) {
        header.appendChild(opt1Img);
        opt1Img.innerHTML = qObj['AI'];
    }
    body.appendChild(opt2);
    if (qObj['BI']) {
        header.appendChild(opt2Img);
        opt2Img.innerHTML = qObj['BI'];
    }
    body.appendChild(opt3);
    if (qObj['CI']) {
        header.appendChild(opt3Img);
        opt3Img.innerHTML = qObj['CI'];
    }
    body.appendChild(opt4);
    if (qObj['DI']) {
        header.appendChild(opt4Img);
        opt4Img.innerHTML = qObj['DI'];
    }
    body.appendChild(opt5);
    if (qObj['EI']) {
        header.appendChild(opt5Img);
        opt5Img.innerHTML = qObj['EI'];
    }
    footer.appendChild(ans);
    footer.appendChild(hint);
    if (qObj['HI']) {
        header.appendChild(hintImg);
        hintImg.innerHTML = qObj['HI'];
    }
    card.appendChild(header);
    card.appendChild(body);
    card.appendChild(footer);
    qid.classList.add('text-warning');
    card.classList.add('card', 'mb-3');
    if (index !== 0) {
        card.classList.add('d-none');
    }
    card.id = qObj['id'];
    header.classList.add('card-header', 'bg-dark', 'text-light');
    body.classList.add('card-body', 'bg-secondary', 'text-light');
    footer.classList.add('card-footer', 'bg-dark', 'text-light');
    qid.innerText = qObj['id'];
    desc.innerText = qObj['S'] ? qObj['S'] : '';
    ques.innerText = qObj['Q'] ? qObj['Q'] : '';
    opt1.innerText = qObj['A'] ? 'A) ' + qObj['A'] : '';
    opt2.innerText = qObj['B'] ? 'B) ' + qObj['B'] : '';
    opt3.innerText = qObj['C'] ? 'C) ' + qObj['C'] : '';
    opt4.innerText = qObj['D'] ? 'D) ' + qObj['D'] : '';
    opt5.innerText = qObj['E'] ? 'E) ' + qObj['E'] : '';
    ans.innerText = qObj['R'] ? 'Ans: ' + qObj['R'] : '';
    hint.innerText = qObj['H'] ? 'Hint: ' + qObj['H'] : '';
    container.appendChild(card);
}

preQuestion = () => {
    var card = findCurrentCard();
    card.classList.add('d-none');
    var preCard = card.previousSibling;
    if (!preCard) {
        preCard = card.parentElement.lastChild;
    }
    preCard.classList.remove('d-none');
}

nxtQuestion = () => {
    var card = findCurrentCard();
    card.classList.add('d-none');
    var nextCard = card.nextSibling;
    if (!nextCard) {
        nextCard = card.parentElement.firstChild;
    }
    nextCard.classList.remove('d-none');
}
findCurrentCard = () => {
    var cardList = Array.from(document.getElementById('benContainer').children);
    var card = null;
    for (var i = 0; i < cardList.length; i++) {
        card = cardList[i];
        if (!card.classList.contains('d-none')) {
            return card;
        }
    }
}

getTable = (table, tableData) => {
    const cols = tableData.split('&&');
    cols.forEach((col, index) => {
        cols[index] = col.split('&');
    });
    tableData = cols;
    const rowCount = tableData[0].length;
    table.classList.add('table', 'table-bordered', 'table-dark');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    for (var row = 0; row < rowCount; row++) {
        const tr = document.createElement('tr');
        for (var col = 0; col < tableData.length; col++) {
            if (row === 0) {
                const th = document.createElement('th');
                th.innerText = tableData[col][row];
                tr.appendChild(th);
            } else {
                const td = document.createElement('td');
                td.innerText = tableData[col][row];
                tr.appendChild(td);
            }
        }
        if (row === 0) {
            thead.appendChild(tr);
        } else {
            tbody.appendChild(tr);
        }
    }
    table.appendChild(thead);
    table.appendChild(tbody);
}
