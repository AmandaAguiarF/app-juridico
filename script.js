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
    const documento = document.getElementById('documentoArquivo').files[0];

    const novoProcesso = {
        id: Date.now(),
        numeroProcesso,
        cliente,
        vara,
        juiz,
        dataAudiencia,
        status,
        documento: documento ? URL.createObjectURL(documento) : null
    };

    processos.push(novoProcesso);
    atualizarTabela();
    limparFormulario();
}

// Função para ativar a câmera e capturar uma foto
function capturarFoto() {
    const video = document.createElement('video');
    document.body.appendChild(video);

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            video.srcObject = stream;
            video.play();

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = 640; // Largura da imagem
            canvas.height = 480; // Altura da imagem

            setTimeout(() => {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const imagemCapturada = canvas.toDataURL('image/png');
                document.getElementById('capturaImagem').src = imagemCapturada;
                document.getElementById('capturaImagem').style.display = 'block';

                // Converte a imagem capturada para um blob e adiciona ao input
                canvas.toBlob(blob => {
                    const file = new File([blob], 'captura.png', { type: 'image/png' });
                    const dataTransfer = new DataTransfer();
                    dataTransfer.items.add(file);
                    document.getElementById('documentoArquivo').files = dataTransfer.files;
                });

                stream.getTracks().forEach(track => track.stop());
                video.remove();
            }, 2000); // Captura após 2 segundos
        })
        .catch(function(error) {
            console.log('Erro ao acessar a câmera: ', error);
        });
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
                <a href="${processo.documento}" target="_blank">${processo.documento ? 'Abrir Documento' : 'Nenhum Documento'}</a>
            </td>
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
    document.getElementById('capturaImagem').style.display = 'none'; // Esconder a imagem capturada
}

