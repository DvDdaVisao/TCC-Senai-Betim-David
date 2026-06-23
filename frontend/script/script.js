// ==========================================
// VARIÁVEIS DE CONTROLE DE ESTADO
// ==========================================
let modoEdicaoAtivo = false; 
let linhaSendoEditada = null; 
let ordemCrescenteCriticidade = true; 
let ordemCrescenteEtapa = true; 

// Gerenciamento de dados em memória (evita que sumam ao alternar telas)
let itensAtivos = []; 
let itensArquivados = []; 
let visualizandoArquivados = false; 

// ==========================================
// LÓGICA DA TELA DE LOGIN (RF1)
// ==========================================
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        console.log("Formulário de login interceptado com sucesso.");
        window.location.href = "frontend/html/home.html"; 
    });
}

// ==========================================
// FUNÇÃO DE RENDERIZAÇÃO DA TABELA
// ==========================================
function renderizarTabela() {
    const tabelaBody = document.querySelector('.custom-table tbody');
    if (!tabelaBody) return;
    
    tabelaBody.innerHTML = "";
    const listaAtual = visualizandoArquivados ? itensArquivados : itensAtivos;

    if (listaAtual.length === 0) {
        tabelaBody.innerHTML = `<tr><td colspan="6" style="color: #a0a5ad; font-style: italic; padding: 30px;">Nenhum item encontrado.</td></tr>`;
        return;
    }

    listaAtual.forEach((item, index) => {
        const novaLinha = document.createElement('tr');
        novaLinha.style.cursor = "pointer";
        
        // Armazena a referência do objeto original na tr para facilitar o rastreio
        novaLinha.dataset.index = index;

        novaLinha.addEventListener('click', function() {
            abrirRF3(item.tag, this);
        });

        novaLinha.innerHTML = `
            <td>${item.tag.toUpperCase()}</td>
            <td>${item.nome}</td>
            <td>${item.setor}</td>
            <td>
                <div class="conteudo-scroll">
                    ${item.descricao ? item.descricao : 'Sem observações.'}
                </div>
            </td>
            <td><span class="badge ${item.criticidade}">${item.criticidade.toUpperCase()}</span></td>
            <td><span class="badge ${item.etapa}">${item.etapa.toUpperCase()}</span></td>
        `;
        tabelaBody.appendChild(novaLinha);
    });
}

// ==========================================
// LÓGICA DA TELA HOME & MODAL (RF2 e RF3)
// ==========================================
function ativarModoEdicao() {
    // Se estiver na tela de arquivados, impede o modo edição
    if (visualizandoArquivados) return;

    modoEdicaoAtivo = true;
    document.getElementById('botoesPadrao').style.display = 'none';
    document.getElementById('avisoSelecao').style.display = 'flex';
}

function cancelarModoEdicao() {
    modoEdicaoAtivo = false;
    document.getElementById('avisoSelecao').style.display = 'none';
    document.getElementById('botoesPadrao').style.display = 'flex';
}

function abrirRF3(tagEquipamento, elementoLinha) {
    // Se não estiver no modo edição E estiver na tela de ativos, bloqueia o clique
    if (!modoEdicaoAtivo && !visualizandoArquivados) {
        console.log("Clique bloqueado: Sistema não está no modo de edição.");
        return; 
    }

    linhaSendoEditada = elementoLinha;
    cancelarModoEdicao();

    const idx = elementoLinha.dataset.index;
    // Puxa o item da lista correta dependendo da tela atual
    const item = visualizandoArquivados ? itensArquivados[idx] : itensAtivos[idx];

    const modal = document.getElementById('modalEquipamento');
    const btnArquivar = document.getElementById('btnArquivarModal');
    const btnDesarquivar = document.getElementById('btnDesarquivarModal');
    const btnSalvar = document.querySelector('.btn-salvar');

    // Desabilita os campos caso esteja apenas visualizando/desarquivando um item arquivado
    document.getElementById('inputTag').disabled = true;
    document.getElementById('inputNome').disabled = visualizandoArquivados;
    document.getElementById('inputFabricante').disabled = visualizandoArquivados;
    document.getElementById('txtDescricao').disabled = visualizandoArquivados;
    document.getElementById('selectCriticidade').disabled = visualizandoArquivados;
    document.getElementById('selectEtapa').disabled = visualizandoArquivados;

    if (visualizandoArquivados) {
        document.getElementById('modalTitle').innerText = "Visualizar Item Arquivado";
        btnArquivar.style.display = 'none';
        btnDesarquivar.style.display = 'block'; // Mostra o botão Desarquivar
        btnSalvar.style.display = 'none';       // Oculta o botão Salvar já que está arquivado
    } else {
        document.getElementById('modalTitle').innerText = "Editar Equipamento";
        btnArquivar.style.display = 'block';    // Mostra o botão Arquivar
        btnDesarquivar.style.display = 'none';
        btnSalvar.style.display = 'block';
    }

    // Preenche o modal com os dados do item
    document.getElementById('inputTag').value = item.tag;
    document.getElementById('inputNome').value = item.nome;
    document.getElementById('inputFabricante').value = item.fabricante || ""; 
    document.getElementById('txtDescricao').value = item.descricao || "";
    document.getElementById('selectCriticidade').value = item.criticidade;
    document.getElementById('selectEtapa').value = item.etapa;

    modal.classList.add('active');
}

function abrirParaCadastrar() {
    cancelarModoEdicao(); 
    linhaSendoEditada = null; 
    
    const modal = document.getElementById('modalEquipamento');
    document.getElementById('modalTitle').innerText = "Cadastrar Novo Item";
    document.getElementById('formEquipamento').reset();
    
    // Força a liberação dos inputs para o cadastro
    document.getElementById('inputTag').disabled = false;
    document.getElementById('inputNome').disabled = false;
    document.getElementById('inputFabricante').disabled = false;
    document.getElementById('txtDescricao').disabled = false;
    document.getElementById('selectCriticidade').disabled = false;
    document.getElementById('selectEtapa').disabled = false;

    document.getElementById('btnArquivarModal').style.display = 'none';
    document.getElementById('btnDesarquivarModal').style.display = 'none';
    document.querySelector('.btn-salvar').style.display = 'block';

    modal.classList.add('active');
}

function fecharModal() {
    document.getElementById('modalEquipamento').classList.remove('active');
    linhaSendoEditada = null;
}

// ==========================================
// ESCUTADOR DO FORMULÁRIO (SALVAR / CADASTRAR)
// ==========================================
const formEquipamento = document.getElementById('formEquipamento');

if (formEquipamento) {
    formEquipamento.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const tag = document.getElementById('inputTag').value;
        const nome = document.getElementById('inputNome').value;
        const fabricante = document.getElementById('inputFabricante').value;
        const descricao = document.getElementById('txtDescricao').value;
        const criticidade = document.getElementById('selectCriticidade').value;
        const etapa = document.getElementById('selectEtapa').value;

        const tituloModal = document.getElementById('modalTitle').innerText;

        if (tituloModal === "Cadastrar Novo Item") {
            const novoItem = {
                tag, nome, fabricante, descricao, criticidade, etapa,
                setor: 'Planta de Beneficiamento'
            };
            // Insere no início do array para simular o comportamento anterior
            itensAtivos.unshift(novoItem);
        } else {
            if (linhaSendoEditada) {
                const idx = linhaSendoEditada.dataset.index;
                itensAtivos[idx] = {
                    tag: itensAtivos[idx].tag, // mantém a tag original desabilitada
                    nome, fabricante, descricao, criticidade, etapa,
                    setor: itensAtivos[idx].setor
                };
            }
        }

        renderizarTabela();
        fecharModal();
    });
}

// ==========================================
// LÓGICA DE ARQUIVAMENTO
// ==========================================
function arquivarEquipamento() {
    if (!linhaSendoEditada) return;
    const idx = linhaSendoEditada.dataset.index;
    
    const itemRemovido = itensAtivos.splice(idx, 1)[0];
    itensArquivados.push(itemRemovido);

    renderizarTabela();
    fecharModal();
}

function desarquivarEquipamento() {
    if (!linhaSendoEditada) return;
    const idx = linhaSendoEditada.dataset.index;

    // Remove da lista de arquivados e devolve para o topo dos ativos
    const itemDesarquivado = itensArquivados.splice(idx, 1)[0];
    itensAtivos.unshift(itemDesarquivado);

    renderizarTabela();
    fecharModal();
    console.log("Item desarquivado com sucesso:", itemDesarquivado);
}

// CORRIGIDO: Agora manipula corretamente o botão de ícone com o Google Fonts
function verArquivados() {
    visualizandoArquivados = !visualizandoArquivados;
    
    const btnIconeArquivados = document.getElementById('btnVerArquivados');
    const btnEditar = document.querySelector('.btn-editar');
    const btnAdicionar = document.querySelector('.btn-adicionar');

    if (visualizandoArquivados) {
        if (btnIconeArquivados) {
            btnIconeArquivados.style.backgroundColor = "#ffb300";
            btnIconeArquivados.style.borderColor = "#ffb300";
            btnIconeArquivados.style.color = "#22252a";
            btnIconeArquivados.title = "Visualizar Itens Ativos";
        }

        if (btnEditar) {
            btnEditar.disabled = true;
            btnEditar.style.opacity = "0.4";
            btnEditar.style.cursor = "not-allowed";
        }
        if (btnAdicionar) {
            btnAdicionar.disabled = true;
            btnAdicionar.style.opacity = "0.4";
            btnAdicionar.style.cursor = "not-allowed";
        }
    } else {
        if (btnIconeArquivados) {
            btnIconeArquivados.style.backgroundColor = "";
            btnIconeArquivados.style.borderColor = "";
            btnIconeArquivados.style.color = "";
            btnIconeArquivados.title = "Visualizar Itens Arquivados";
        }

        if (btnEditar) {
            btnEditar.disabled = false;
            btnEditar.style.opacity = "1";
            btnEditar.style.cursor = "pointer";
        }
        if (btnAdicionar) {
            btnAdicionar.disabled = false;
            btnAdicionar.style.opacity = "1";
            btnAdicionar.style.cursor = "pointer";
        }
    }

    renderizarTabela();
}

// NOVA FUNÇÃO: Pronta para você programar a lógica do histórico de alterações
function verHistorico() {
    console.log("Botão de histórico de alterações clicado!");
    // Aqui você pode abrir um modal próprio do histórico ou redirecionar a página.
}

// ==========================================
// LÓGICA DA BARRA DE PESQUISA (FILTRO DINÂMICO)
// ==========================================
const inputPesquisa = document.querySelector('.search-input');

if (inputPesquisa) {
    inputPesquisa.addEventListener('input', function() {
        const termoPesquisa = this.value.toLowerCase();
        const linhasTabela = document.querySelectorAll('.custom-table tbody tr');

        linhasTabela.forEach(function(linha) {
            if (linha.cells.length > 1) { 
                const tag = linha.cells[0].innerText.toLowerCase();
                const nome = linha.cells[1].innerText.toLowerCase();

                if (tag.includes(termoPesquisa) || nome.includes(termoPesquisa)) {
                    linha.style.display = ""; 
                } else {
                    linha.style.display = "none"; 
                }
            }
        });
    });
}

// ==========================================
// LÓGICA DE ORDENAÇÃO POR CRITICIDADE
// ==========================================
function ordenarPorCriticidade() {
    const listaParaOrdenar = visualizandoArquivados ? itensArquivados : itensAtivos;
    const pesos = { 'ALTA': 3, 'MÉDIA': 2, 'MEDIA': 2, 'BAIXA': 1 };

    listaParaOrdenar.sort(function(a, b) {
        const pesoA = pesos[a.criticidade.toUpperCase()] || 0;
        const pesoB = pesos[b.criticidade.toUpperCase()] || 0;
        return ordemCrescenteCriticidade ? pesoB - pesoA : pesoA - pesoB;
    });

    const seta = document.getElementById('setaCriticidade');
    if (seta) seta.innerText = ordemCrescenteCriticidade ? "⬇" : "⬆";
    
    ordemCrescenteCriticidade = !ordemCrescenteCriticidade;
    renderizarTabela();
}

// ==========================================
// LÓGICA DE ORDENAÇÃO POR ETAPA DE REPARO
// ==========================================
function ordenarPorEtapa() {
    const listaParaOrdenar = visualizandoArquivados ? itensArquivados : itensAtivos;
    const fluxoEtapas = { 'ENVIO': 1, 'PERITAGEM': 2, 'APROVAÇÃO': 3, 'APROVACAO': 3, 'EXECUÇÃO': 4, 'EXECUCAO': 4, 'RETORNO': 5 };

    listaParaOrdenar.sort(function(a, b) {
        const pesoA = fluxoEtapas[a.etapa.toUpperCase()] || 0;
        const pesoB = fluxoEtapas[b.etapa.toUpperCase()] || 0;
        return ordemCrescenteEtapa ? pesoA - pesoB : pesoB - pesoA;
    });

    const seta = document.getElementById('setaEtapa');
    if (seta) seta.innerText = ordemCrescenteEtapa ? "⬇" : "⬆";

    ordemCrescenteEtapa = !ordemCrescenteEtapa;
    renderizarTabela();
}