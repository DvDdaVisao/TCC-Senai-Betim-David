<?php
require_once __DIR__ . '/../Conexao/Conexao.php';

header('Content-Type: application/json');

try {
    $pdo = Conexao::getConexao();
    
    $jsonRecebido = file_get_contents('php://input');
    $requisicao   = json_decode($jsonRecebido, true);

    if (!$requisicao) {
        echo json_encode(['sucesso' => false, 'erro' => 'Dados inválidos ou vazios.']);
        exit;
    }

    $acao  = $requisicao['acao'];
    $dados = $requisicao['dados'];

    if ($acao === 'cadastrar') {
        $sql = "INSERT INTO itens (nome, setor, observacao, criticidade, etapa) 
                VALUES (:nome, :setor, :observacao, :criticidade, :etapa)";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':nome'        => $dados['nome'],
            ':setor'       => $dados['setor'],
            ':observacao'  => $dados['descricao'],
            ':criticidade' => $dados['criticidade'],
            ':etapa'       => $dados['etapa']
        ]);

        $tagGerada = $pdo->lastInsertId();

        echo json_encode([
            'sucesso' => true, 
            'mensagem' => 'Item cadastrado com sucesso!',
            'tag' => $tagGerada 
        ]);

    } else if ($acao === 'editar') {
        $sql = "UPDATE itens 
                SET nome = :nome, setor = :setor, observacao = :observacao, 
                    criticidade = :criticidade, etapa = :etapa 
                WHERE tag = :tag";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':nome'        => $dados['nome'],
            ':setor'       => $dados['setor'],
            ':observacao'  => $dados['descricao'],
            ':criticidade' => $dados['criticidade'],
            ':etapa'       => $dados['etapa'],
            ':tag'         => $dados['tag'] 
        ]);

        echo json_encode(['sucesso' => true, 'mensagem' => 'Item atualizado com sucesso!']);
    } else {
        echo json_encode(['sucesso' => false, 'erro' => 'Ação não permitida.']);
    }

} catch (PDOException $e) {
    echo json_encode(['sucesso' => false, 'erro' => 'Erro no Banco: ' . $e->getMessage()]);
}
?>