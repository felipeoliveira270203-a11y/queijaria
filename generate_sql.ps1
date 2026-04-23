$jsonContent = Get-Content -Raw -Encoding UTF8 'backup_queijaria_2026-04-21T00-09-26.json'
$data = ConvertFrom-Json $jsonContent

function Get-Num($val) {
    if ($null -eq $val) { return "0" }
    return [System.Convert]::ToString($val, [System.Globalization.CultureInfo]::InvariantCulture)
}

$produtosIds = @{}
foreach ($p in $data.produtos) {
    $produtosIds[$p.id] = $true
}

$sql = @()
$sql += "BEGIN;"

$sql += "TRUNCATE TABLE produtos CASCADE;"
foreach ($p in $data.produtos) {
    $id = $p.id
    $nome = ($p.nome -replace "'","''")
    $preco = Get-Num $p.preco
    $estoque = Get-Num $p.estoque
    $custo = Get-Num $p.custoMedio
    $sql += "INSERT INTO produtos (id, nome, preco, estoque, custo_medio) VALUES ($id, '$nome', $preco, $estoque, $custo);"
}

$sql += "TRUNCATE TABLE compras CASCADE;"
if ($null -ne $data.compras) {
    foreach ($c in $data.compras) {
        $id = $c.id
        $semana = $c.semana
        $prodId = $c.produtoId
        if (-not $produtosIds.ContainsKey($prodId)) { $prodId = "NULL" }
        $prod = ($c.produto -replace "'","''")
        $qtd = $c.qtd
        $unit = Get-Num $c.valorUnitario
        $total = Get-Num $c.valorTotal
        $forn = ($c.fornecedor -replace "'","''")
        $status = $c.status
        if ($null -eq $status) { $status = 'pendente' }
        $dataStr = $c.data
        $sql += "INSERT INTO compras (id, semana, produto_id, produto, qtd, valor_unitario, valor_total, fornecedor, status, data) VALUES ($id, $semana, $prodId, '$prod', $qtd, $unit, $total, '$forn', '$status', '$dataStr');"
    }
}

$sql += "TRUNCATE TABLE vendas CASCADE;"
if ($null -ne $data.vendas) {
    foreach ($v in $data.vendas) {
        $id = $v.id
        $semana = $v.semana
        $vend = ($v.vendedor -replace "'","''")
        $cli = ($v.cliente -replace "'","''")
        $prodId = $v.produtoId
        if (-not $produtosIds.ContainsKey($prodId)) { $prodId = "NULL" }
        $prod = ($v.produto -replace "'","''")
        $qtd = $v.qtd
        $unit = Get-Num $v.valorUnitario
        $total = Get-Num $v.valorTotal
        $lucro = Get-Num $v.lucro
        $custo = Get-Num $v.custoMedio
        $status = $v.status
        if ($null -eq $status) { $status = 'pendente' }
        $dataStr = $v.data
        $sql += "INSERT INTO vendas (id, semana, vendedor, cliente, produto_id, produto, qtd, valor_unitario, valor_total, lucro, custo_medio, status, data) VALUES ($id, $semana, '$vend', '$cli', $prodId, '$prod', $qtd, $unit, $total, $lucro, $custo, '$status', '$dataStr');"
    }
}

$sql += "TRUNCATE TABLE clientes_contatados CASCADE;"
if ($null -ne $data.clientesContatados) {
    foreach ($c in $data.clientesContatados) {
        $cli = ($c -replace "'","''")
        $sql += "INSERT INTO clientes_contatados (cliente) VALUES ('$cli');"
    }
}

$sql += "COMMIT;"

$sql | Set-Content -Encoding UTF8 'migration.sql'
