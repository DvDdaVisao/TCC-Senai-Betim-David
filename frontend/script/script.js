// Aguarda o formulário ser enviado
document.getElementById('loginForm').addEventListener('submit', function(event) {
    // 1. Impede o recarregamento padrão da página
    event.preventDefault(); 
    
    // Opcional: Se quiser testar capturando os dados que o usuário digitou
    const idDigitado = document.getElementById('id').value;
    const senhaDigitada = document.getElementById('senha').value;
    console.log("Tentativa de login com ID:", idDigitado);

    // 2. Redireciona temporariamente para a home (ajuste o caminho se necessário)
    window.location.href = "home.html"; 
});