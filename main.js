const form = document.getElementById('form-atividade');// criando uma variavel do formulario
const imgAprovado = '<img src="./images/aprovado.png" alt= "Emoji celebrando"/>'//variavel imagem de aprovado
const imgReprovado = '<img src="./images/reprovado.png" alt= "Emoji decepcionado"/>'//variavel imagem reprovado
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMinima = parseFloat(prompt("Digite a nota mínima:"));

let linhas = '';//variavel linhas em global para criar varias linhas em sequencia

form.addEventListener('submit',function(e) { //evento de submit e remoção de atualização da tela
    e.preventDefault();

    adicinaLinha();
    atualizaTabela ();
    atulizaMediaFinal();
});

function adicinaLinha() {
    const inputNomeAtividade = document.getElementById('nome-atividade');//capiturando o campo nome da atividade
    const inputNotaAtividade = document.getElementById('nota-atividade');//capiturando o campo nota da atividade

    if (atividades.includes(inputNomeAtividade.value)) {
        alert(`A atividade ${inputNomeAtividade.value} já foi inserida`);
    } else {
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));
    
            let linha = "<tr>"; //variavel para colocar os valores no corpo da tabela
            linha += `<td>${inputNomeAtividade.value}</td>`; //+= é a mesma coisa que uma concatenação
            linha += `<td>${inputNotaAtividade.value}</td>`;
            linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado}</td>`;//resultado se o aluno irá passar (?=if e :=else)
            linha += `</tr>`;//fechando a tag "tr"
    
            linhas += linha;
        }

        inputNomeAtividade.value = ""
        inputNotaAtividade.value = ""
    }



function atualizaTabela () {
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas //para inserir um conteudo dentro de uma tag é usando o "inner.Html"

}

function atulizaMediaFinal() {
    const mediaFinal = calculaMediaFinal()

    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2);
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado;
}

function calculaMediaFinal() {
    let somaDasNotas = 0;

    for(let i = 0; i < notas.length; i++) {
        somaDasNotas += notas[i];
    }

    return somaDasNotas / notas.length;
}
