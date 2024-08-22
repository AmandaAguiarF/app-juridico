// Cadastrar novo usuário
function cadastrar() {
    const nome = document.getElementById('cadastroNome').value;
    const email = document.getElementById('cadastroEmail').value;
    const senha = document.getElementById('cadastroSenha').value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioExistente = usuarios.find(usuario => usuario.email === email);

    if (usuarioExistente) {
        alert('E-mail já cadastrado.');
        return false;
    }

    usuarios.push({ nome, email, senha });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Cadastro realizado com sucesso! Faça login.');
    window.location.href = 'login.html';
    return false;
}

// Login de usuário
function login() {
    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuario = usuarios.find(usuario => usuario.email === email && usuario.senha === senha);

    if (usuario) {
        alert(`Bem-vindo, ${usuario.nome}!`);
        window.location.href = 'index.html';
    } else {
        alert('E-mail ou senha incorretos.');
    }
    return false;
}


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

let clientes = [];
let clienteAtual = null; // Armazena o cliente que está sendo editado

function adicionarCliente() {
    const nome = document.getElementById('clienteNome').value;
    const cpf = document.getElementById('clienteCPF').value;
    const telefone = document.getElementById('clienteTelefone').value;
    const email = document.getElementById('clienteEmail').value;
    const numeroProcesso = document.getElementById('numeroProcesso').value;
    const testemunhas = document.getElementById('testemunhas').value;
    const honorarios = document.getElementById('honorarios').value;
    const procuracao = document.getElementById('procuracao').files[0]?.name || "Nenhum arquivo anexado";

    const novoCliente = {
        nome,
        cpf,
        telefone,
        email,
        numeroProcesso,
        testemunhas,
        honorarios,
        procuracao
    };

    clientes.push(novoCliente);
    atualizarListaClientes();
    limparFormularioCliente();
}

function atualizarListaClientes() {
    const lista = document.getElementById('clienteLista');
    lista.innerHTML = '';

    clientes.forEach(cliente => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>Nome:</strong> ${cliente.nome} <br>
            <strong>CPF:</strong> ${cliente.cpf} <br>
            <strong>Telefone:</strong> ${cliente.telefone} <br>
            <strong>Email:</strong> ${cliente.email} <br>
            <strong>Número do Processo:</strong> ${cliente.numeroProcesso} <br>
            <strong>Testemunhas:</strong> ${cliente.testemunhas} <br>
            <strong>Honorários:</strong> R$ ${cliente.honorarios} <br>
            <strong>Procuração:</strong> ${cliente.procuracao} <br><br>
            <button onclick="editarCliente('${cliente.cpf}')">Editar</button>
            <button onclick="removerCliente('${cliente.cpf}')">Remover</button>
        `;
        lista.appendChild(li);
    });
}

function limparFormularioCliente() {
    document.getElementById('clienteForm').reset();
    document.getElementById('adicionarClienteBtn').style.display = 'inline-block';
    document.getElementById('atualizarClienteBtn').style.display = 'none';
    clienteAtual = null;
}

function editarCliente(cpf) {
    clienteAtual = clientes.find(cliente => cliente.cpf === cpf);

    document.getElementById('clienteNome').value = clienteAtual.nome;
    document.getElementById('clienteCPF').value = clienteAtual.cpf;
    document.getElementById('clienteTelefone').value = clienteAtual.telefone;
    document.getElementById('clienteEmail').value = clienteAtual.email;
    document.getElementById('numeroProcesso').value = clienteAtual.numeroProcesso;
    document.getElementById('testemunhas').value = clienteAtual.testemunhas;
    document.getElementById('honorarios').value = clienteAtual.honorarios;
    document.getElementById('adicionarClienteBtn').style.display = 'none';
    document.getElementById('atualizarClienteBtn').style.display = 'inline-block';
}

function atualizarCliente() {
    clienteAtual.nome = document.getElementById('clienteNome').value;
    clienteAtual.cpf = document.getElementById('clienteCPF').value;
    clienteAtual.telefone = document.getElementById('clienteTelefone').value;
    clienteAtual.email = document.getElementById('clienteEmail').value;
    clienteAtual.numeroProcesso = document.getElementById('numeroProcesso').value;
    clienteAtual.testemunhas = document.getElementById('testemunhas').value;
    clienteAtual.honorarios = document.getElementById('honorarios').value;
    const procuracao = document.getElementById('procuracao').files[0]?.name;
    if (procuracao) {
        clienteAtual.procuracao = procuracao;
    }

    atualizarListaClientes();
    limparFormularioCliente();
}
    function removerCliente(cpf) {
    clientes = clientes.filter(cliente => cliente.cpf !== cpf);
    atualizarListaClientes();
}


// Adicionar compromissos na agenda
function adicionarCompromisso() {
    const nome = document.getElementById('compromissoNome').value;
    const data = document.getElementById('compromissoData').value;
    const hora = document.getElementById('compromissoHora').value;

    if (nome && data && hora) {
        const lista = document.getElementById('compromissoLista');
        const item = document.createElement('li');
        item.textContent = `${nome} - ${data} às ${hora}`;
        lista.appendChild(item);
        limparFormulario('compromissoForm');
    }
}

// Página de Documentos
function adicionarDocumento() {
    const nome = document.getElementById('documentoNome').value;
    const arquivo = document.getElementById('documentoArquivo').files[0] ? document.getElementById('documentoArquivo').files[0].name : '';

    if (nome && arquivo) {
        const lista = document.getElementById('documentoLista');
        const item = document.createElement('li');
        item.textContent = `${nome} - ${arquivo}`;
        lista.appendChild(item);
        limparFormulario('documentoForm');
    }
}

// Função para limpar formulários
function limparFormulario(formId) {
    document.getElementById(formId).reset();
}
