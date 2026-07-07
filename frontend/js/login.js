// LÓGICA DA TELA DE LOGIN (RF1)
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);

    // Se houver erro de login na URL, destaca os campos
    if (urlParams.get('erro') === 'dados_invalidos') {
        const containerErro = document.getElementById('msgerro');
        if (containerErro) containerErro.style.display = 'block';

        ['email', 'senha'].forEach(id => {
            const input = document.getElementById(id);
            if (input) input.style.borderColor = '#ff3265';
        });
    }
});