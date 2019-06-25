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
var curQuestao, pontos, qttQuestao;

function comecarJogo() {
	questoes = JSON.parse(data);

	ordem = [];
	for (var i = 0; i < questoes.length; i++) {
		ordem.push(i);
	}

	ordem = shuffle(ordem);

	pontos = 0;
	qttQuestao = Math.min(questoes.length, 10);

	document.getElementById("container").style.visibility = "visible";
	document.getElementById("iniciar").style.visibility = "hidden";

	document.getElementById("container").innerHTML = '<div id="pontuacao">Pontos: 0</div>'+
													 '<div id="questao" class="questao"></div>';

	document.getElementById("pontuacao").innerHTML = "Pontos: " + pontos;

	curQuestao = -1;
	perguntar();
}

function encerrar() {
	var elem = document.getElementById("questao");
	elem.innerHTML = '<b>Acabou!</b> Voce fez <b>' + pontos + ' pontos</b>, de ' + qttQuestao + ' possíveis.<hr id="final">';

	var porcentagem = pontos/qttQuestao;

	if (porcentagem == 1) {
		elem.innerHTML += "O cara é bom! Gabaritou tudin :)";
	} else if (porcentagem >= 0.5) {
		elem.innerHTML += "Show, passou sem rec!";
	} else if (porcentagem >= 0.3) {
		elem.innerHTML += "Quebrou o pré, mas dava pra ter ido melhor..."
	} else {
		elem.innerHTML += "Tá reprovado, vai ter q fazer de novo kk";
	}

	elem.innerHTML += '<br><button onclick="comecarJogo();">Recomeçar</button>';

}

function perguntar() {
	curQuestao += 1;

	if (curQuestao >= qttQuestao) {
		encerrar();
		return;
	}

	var conteudo = '<h2>' + (curQuestao+1) + ') ' + questoes[ordem[curQuestao]].pergunta + '</h2>';

	if (questoes[ordem[curQuestao]].imagem != null)
		conteudo += '<img src="' + questoes[ordem[curQuestao]].imagem + '">';

	conteudo += '<br><form>';

	var cur = questoes[ordem[curQuestao]];
	for (var j = 0; j < cur.opcoes.length; j++) {
		conteudo += '<div id="pergunta"><input type="radio" id="' + j + '" name="resp" value="' + cur.opcoes[j] + '">' + '<label for="' + j + '">' + cur.opcoes[j] + '</label></div>';
	}
	
	conteudo += "</form>"

	conteudo += '<br><button onclick="responder()">Responder</button>';

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