$(document).ready(function() {
    $(".table-card").click(function() {
        var tableId = $(this).data("table-id");
        loadTableData(tableId);
    });

    function loadTableData(tableId) {
        // Fazer uma requisição AJAX para obter os dados da tabela pelo ID e preencher a div "selected-table"
        $.ajax({
            url: "/get_table_data/" + tableId,
            type: "GET",
            success: function(data) {
                $("#table-name").text(data.table_name); // Definir o nome da tabela

                // Preencher as colunas da tabela
                var tableColumns = data.columns.map(function(column) {
                    return "<th class='estilo'>" + column + "</th>"; // Criar uma célula de coluna para cada coluna na tabela
                });
                $("#table-data thead tr").html(tableColumns.join("")); // Adicionar as colunas à linha de cabeçalho da tabela

                // Preencher os dados da tabela
                var tableData = data.table_data.map(function(row) {
                    var rowData = data.columns.map(function(column) {
                        return "<td class='estilo'>" + (row[column] || "") + "</td>"; // Criar células de dados para cada coluna na linha
                    });
                    return "<tr>" + rowData.join("") + "</tr>"; // Criar uma linha com as células de dados
                });
                $("#table-data tbody").html(tableData.join("")); // Adicionar as linhas de dados ao corpo da tabela HTML
            },
            error: function() {
                $(".selected-table").html("<p>Erro ao carregar os dados da tabela.</p>");
            }
        });
    }
});

function redirectToIndex() {
    window.location.href = "/";
}