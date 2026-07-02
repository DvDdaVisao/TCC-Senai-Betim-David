<?php
// backend/buscar_itens.php
ob_start(); // Remove qualquer espaço ou aviso acidental que possa quebrar o JSON

require_once __DIR__ . '/Conexao/Conexao.php'; 

header('Content-Type: application/json');

try {
    // Captura a conexão PDO através do método estático da sua classe Conexao
    $pdo = Conexao::getConexao(); 

    // 1. Busca os ativos mapeando ID_Itens para id/tag, e observacao para descricao
    $stmtAtivos = $pdo->prepare("SELECT ID_Itens AS id, ID_Itens AS tag, nome, setor, observacao AS descricao, criticidade, etapa FROM itens");
    $stmtAtivos->execute();
    $ativos = $stmtAtivos->fetchAll(PDO::FETCH_ASSOC);

    // 2. Busca os arquivados mapeando ID_Itens_Arquivados para id, ID_Itens para tag, e crticidade para criticidade
    $stmtArquivados = $pdo->prepare("SELECT ID_Itens_Arquivados AS id, ID_Itens AS tag, nome, setor, observacao AS descricao, crticidade AS criticidade, etapa FROM itens_arquivados");
    $stmtArquivados->execute();
    $arquivados = $stmtArquivados->fetchAll(PDO::FETCH_ASSOC);

    // Garante que se o banco retornar vazio, vire um array limpo para o JavaScript não falhar
    $ativos = $ativos ? $ativos : [];
    $arquivados = $arquivados ? $arquivados : [];

    // Limpa o buffer de saída e envia o JSON perfeito
    ob_end_clean();
    echo json_encode([
        'sucesso' => true,
        'ativos' => $ativos,
        'arquivados' => $arquivados
    ]);

} catch (PDOException $e) {
    ob_end_clean();
    echo json_encode([
        'sucesso' => false,
        'erro' => $e->getMessage()
    ]);
}
?>