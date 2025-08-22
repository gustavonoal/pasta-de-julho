function formatar(comando) {
    document.execCommand(comando, false, null);
}
function salvarTexto() {
    const conteudo = document.getElementById("editor").innerHTML;
    localStorage.setItem("textoSalvo", conteudo);
    alert("texto salvo com sucesso.");
}
function carregarTexto() {
    const conteudo = localStorage.getItem("textoSalvo");
    if (conteudo) {
        document.getElementById('editor').innerHTML = conteudo;
    } else {
        alert("Nenhum texto salvo encontrado.");
    }
}
function limparTexto() {
    if (confirm("deseja limpar o conteúdo?")) {
        document.getElementById("editor").innerHTML = "";
    }
}