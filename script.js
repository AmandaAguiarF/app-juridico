let processos = [];
let processoAtual = null;

// Função para adicionar um novo processo
function adicionarProcesso() {
    const numeroProcesso = document.getElementById('numeroProcesso').value;
    const cliente = document.getElementById('cliente').value;
    const vara = document.getElementById('vara').value;
    const juiz = document.getElementById('juiz').value;
    const dataAudiencia = document.getElementById('dataAudiencia').value;
    const status = document.getElementById('status').value;

    const novoProcesso = {
        id: Date.now(),
        numeroProcesso,
        cliente,
        vara,
        juiz,
        dataAudiencia,
        status
    };

    processos.push(novoProcesso);
    atualizarTabela();
    limparFormulario();
}

// Função para atualizar um processo existente
function atualizarProcesso() {
    processoAtual.numeroProcesso = document.getElementById('numeroProcesso').value;
    processoAtual.cliente = document.getElementById('cliente').value;
    processoAtual.vara = document.getElementById('vara').value;
    processoAtual.juiz = document.getElementById('juiz').value;
    processoAtual.dataAudiencia = document.getElementById('dataAudiencia').value;
    processoAtual.status = document.getElementById('status').value;

    atualizarTabela();
    limparFormulario();
    document.getElementById('adicionarBtn').style.display = 'inline-block';
    document.getElementById('atualizarBtn').style.display = 'none';
    processoAtual = null;
}

// Função para editar um processo
function editarProcesso(id) {
    processoAtual = processos.find(processo => processo.id === id);

    document.getElementById('numeroProcesso').value = processoAtual.numeroProcesso;
    document.getElementById('cliente').value = processoAtual.cliente;
    document.getElementById('vara').value = processoAtual.vara;
    document.getElementById('juiz').value = processoAtual.juiz;
    document.getElementById('dataAudiencia').value = processoAtual.dataAudiencia;
    document.getElementById('status').value = processoAtual.status;

    document.getElementById('adicionarBtn').style.display = 'none';
    document.getElementById('atualizarBtn').style.display = 'inline-block';
}

// Função para excluir um processo
function excluirProcesso(id) {
    processos = processos.filter(processo => processo.id !== id);
    atualizarTabela();
}

// Função para atualizar a tabela de processos
function atualizarTabela() {
    const tbody = document.getElementById('processoTabela').querySelector('tbody');
    tbody.innerHTML = '';

    processos.forEach(processo => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${processo.numeroProcesso}</td>
            <td>${processo.cliente}</td>
            <td>${processo.vara}</td>
            <td>${processo.juiz}</td>
            <td>${processo.dataAudiencia}</td>
            <td>${processo.status}</td>
            <td>
                <button onclick="editarProcesso(${processo.id})">Editar</button>
                <button onclick="excluirProcesso(${processo.id})">Excluir</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

// Função para limpar o formulário após adicionar ou atualizar um processo
function limparFormulario() {
    document.getElementById('processoForm').reset();
}

// Função para limpar formulários
function limparFormulario(formId) {
    document.getElementById(formId).reset();
}

var target = document.getElementById('target');
var watchId;

// function appendLocation(location, verb) {
//   verb = verb || 'updated';
//   var newLocation = document.createElement('p');
//   newLocation.innerHTML = 'Location ' + verb + ': ' + location.coords.latitude + ', ' + location.coords.longitude + '';
//   target.appendChild(newLocation);
// }

// if ('DeviceOrientationEvent' in window) {
//     window.addEventListener('deviceorientation', deviceOrientationHandler, false);
//   } else {
//     document.getElementById('logoContainer').innerText = 'Device Orientation API not supported.';
//   }
  
