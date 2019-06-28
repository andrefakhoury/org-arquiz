// Shuffle an array
function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

		// Pick a remaining element
		randomIndex = (Math.random() * currentIndex) | 0;
		currentIndex -= 1;

		// And swap it with the current element.
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

// variaveis auxiliares, com informacoes das questoes
var questoes, ordem;
var curQuestao, pontos, qttQuestao;

/** Comeca um novo jogo, atualizando as informacoes necessarias */
function comecarJogo() {

	// insere as questoes do banco, e randomiza a ordem
	questoes = data;

	ordem = [];
	for (var i = 0; i < questoes.length; i++) {
		ordem.push(i);
	}

	ordem = shuffle(ordem);

	pontos = 0;
	qttQuestao = Math.min(questoes.length, 10); // limita a quantidade de questoes

	// deixa as questoes visiveis, e o botao de iniciar invisivel
	document.getElementById("container").style.visibility = "visible";
	document.getElementById("iniciar").style.visibility = "hidden";

	// insere a base das questoes e pontuacao
	document.getElementById("container").innerHTML = '<div id="pontuacao">Pontos: 0</div>'+
													 '<div id="questao" class="questao"></div>';

	document.getElementById("pontuacao").innerHTML = "Pontos: " + pontos;

	// chama a primeira pergunta
	curQuestao = -1;
	perguntar();
}

/** Encerra o jogo atual */
function encerrar() {
	var elem = document.getElementById("questao");
	elem.innerHTML = '<b>Acabou!</b> Voce fez <b>' + pontos + ' pontos</b>, de ' + qttQuestao + ' possíveis.<hr id="final">';

	var porcentagem = pontos/qttQuestao;

	// muda a reacao do final, dependendo dos acertos
	if (porcentagem == 1) {
		elem.innerHTML += "O cara é bom! Gabaritou tudo :)";
	} else if (porcentagem >= 0.5) {
		elem.innerHTML += "Show, passou sem recuperação!";
	} else if (porcentagem >= 0.3) {
		elem.innerHTML += "Quebrou o pré, mas vai precisar fazer a recuperação..."
	} else {
		elem.innerHTML += "Você foi reprovado :(";
	}

	// insere o botao de reiniciar jogo
	elem.innerHTML += '<br><button onclick="comecarJogo();">Recomeçar</button>';

}

/** Faz uma nova pergunta */
function perguntar() {
	curQuestao += 1;

	// nao ha mais questoes disponiveis
	if (curQuestao >= qttQuestao) {
		encerrar();
		return;
	}

	// insere o conteudo da questao atual
	var cur = questoes[ordem[curQuestao]];

	var conteudo = '<h2>' + (curQuestao+1) + ') ' + cur.pergunta + '</h2>';
	if (cur.imagem != null) // caso tenha imagem
		conteudo += '<img src="' + cur.imagem + '">';

	// opcoes de resposta
	conteudo += '<br><form>';
	for (var j = 0; j < cur.opcoes.length; j++) {
		conteudo += '<div id="pergunta"><input type="radio" id="' + j + '" name="resp" value="' + cur.opcoes[j] + '">' + '<label for="' + j + '">' + cur.opcoes[j] + '</label></div>';
	}
	
	conteudo += "</form>"

	conteudo += '<br><button onclick="responder()">Responder</button>';

	document.getElementById("questao").innerHTML = conteudo;
}

/** Compara a resposta do jogador com a resposta correta */
function responder() {
	var respondido = document.getElementById(questoes[ordem[curQuestao]].resposta).checked;
    var caixa = document.getElementById("container");

    // compara as respostas e coloca um efeito
    setTimeout(function(){ caixa.className = ""}, 1000);
	if (respondido) {
        caixa.className = "correct";
        pontos++;
	} else {
        caixa.className = "wrong";
    }
    
   	// atualiza a pontuacao
	document.getElementById("pontuacao").innerHTML = "Pontos: " + pontos;

	// nova pergunta
	perguntar();
}
