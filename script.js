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

var questoes, ordem;
var curQuestao, pontos;

function comecarJogo() {
	questoes = JSON.parse(data);

	ordem = [];
	for (var i = 0; i < questoes.length; i++) {
		ordem.push(i);
	}
	ordem = shuffle(ordem);

	pontos = 0;
	document.getElementById("pontuacao").innerHTML = "Pontos: " + pontos;

	curQuestao = -1;
	perguntar();
}

function encerrar() {
	document.getElementById("questao").innerHTML = "Acabou! Voce fez " + pontos + " pontos";
}

function perguntar() {
	curQuestao += 1;

	if (curQuestao >= questoes.length) {
		encerrar();
		return;
	}

	var conteudo = '<h2>' + questoes[ordem[curQuestao]].pergunta + '</h2><br><form>';

	var cur = questoes[ordem[curQuestao]];
	for (var j = 0; j < cur.opcoes.length; j++) {
		conteudo += '<input type="radio" id="' + j + '" name="resp" value="' + cur.opcoes[j] + '">' + cur.opcoes[j] + '<br>';
	}
	
	conteudo += "</form>"

	conteudo += '<button onclick="responder()">Responder</button>';

	document.getElementById("questao").innerHTML = conteudo;
}

function responder() {
	var respondido = document.getElementById(questoes[ordem[curQuestao]].resposta).checked;

	if (respondido) {
		pontos++;
	}

	document.getElementById("pontuacao").innerHTML = "Pontos: " + pontos;

	perguntar();
}