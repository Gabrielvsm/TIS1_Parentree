var parametros = getParams(window.location.href);

db.plantas.forEach(item => {
    
    if (item.nomePlanta == parametros.nome) {
		document.getElementById("informacoesPlanta").innerHTML = `
		
			<a id="nome_planta">"${item.nomePlanta}"</a>
			<a id="nome_cientifico"> "${item.nomeCientifico}"</a>
			<img id="imgPrincipalPlanta" src="${item.linkImagem}">
			<div id="descricao"><a>"${item.descricao}"</a></div>
			<a id="tags">Filtrado por:<p>"${item.tags}"</p></a>
        `;
    }
});


function adicionarMinhasPlantas(){
	var listaPlantas = [];

	if ( localStorage.getItem('minhasPlantas') === null ) { // Verifica se "minhasPlantas" ja existe no localStorage
		listaPlantas[0] = parametros.nome;					//se nao existir, cria o array e armazena o primeiro elemento
		localStorage.setItem('minhasPlantas', JSON.stringify(listaPlantas));
	} else {
		listaPlantas = JSON.parse( localStorage.getItem('minhasPlantas') ); // Caso ja exista pega o array do localStorage
		if(jaExiste(listaPlantas, parametros.nome)){						//e armazena o novo elemento
			listaPlantas[listaPlantas.length] = parametros.nome;
			localStorage.setItem('minhasPlantas', JSON.stringify(listaPlantas));
		}
	}

	console.log(localStorage.getItem('minhasPlantas'));
}

function jaExiste(lista, nome){

	for(let i = 0; i < lista.length; i++){
		if(lista[i] == nome) return false;
	}

	return true;
}

function getParams(url) {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};