/*
9)API do Pokemon
https://pokeapi.co/api/v2/pokemon/nome do pokemon aqui

pegue os moves salvo em uma var e habilidades em outra
retorne moves e habilidades
*/
async function usandoApiPokemon(nome) {
    try{
        console.log('Iniciando a requisição...'); // Adicione este log para verificar
        // Fazendo a requisição GET
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${nome}`;
        const response = await fetch(apiUrl);

        // Verificando se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.status);
        }

        // Convertendo a resposta para JSON
        const data = await response.json();

        // Exibindo os dados no console
        //console.log('Dados recebidos da API do pokemon:', data);
        console.log("mostrando dados");
        //let imagem = data.sprites.home.front_default;
        let status = data.stats;
        //let tipo = data.types[0].type.name;
        let tipos = data.types;
        let tipospkm = [];
        tipos.forEach(tipo => {
            console.log("tipo do pokemon ",tipo.type.name);
            tipospkm.push(tipo.type.name);
        });
        

        console.log("tipo: ",tipospkm);

        console.log("status do pokemon", status);
        let statusPkm = [];

        status.forEach(stat => {
            console.log(stat.base_stat);
            console.log(stat.stat.name);
            let statuspkmvalor = {
                nomestatus:stat.stat.name, valor: stat.base_stat
            }
            statusPkm.push(statuspkmvalor);
        });
        console.log("array do pkm", statusPkm);
        let sprites = data.sprites;
        let home = sprites.other.home.front_default;
        
        console.log(home);
        return [home, statusPkm, tipospkm];

    }catch(erro){
        console.log(`nome do pokemon: ${nome} ñ encontrado`);
    }
}
let btn = document.querySelector("#btn");
btn.addEventListener('click', async function(event) {
event.preventDefault();
let nome = document.querySelector("#nomepkm").value;
nome = nome.toLowerCase().trim();
let [imagem, arraypkm, tipos] = await usandoApiPokemon(nome);
console.log("array de fora", arraypkm);


if(imagem && arraypkm && tipos){
    function iniciarAnimacao() {
        cardpkm.classList.add("giro");
    }
    
    function pararAnimacao() {
        cardpkm.style.animation = "none"; // Remove a animação
        cardpkm.offsetHeight; // Força um reflow (truque para resetar a animação)
        cardpkm.style.animation = null; // Restaura a animação original
    }
    


let cardpkm = document.querySelector("#card-pokemon");
cardpkm.style.display = "flex";
iniciarAnimacao();

function renderizaCard() {
    console.log("Executando após 1 segundo...");
    cardpkm.innerHTML = `
    <div id="infocima">
        <p id="nome">${nome}</p>
        <div id="tipos"></div>
    </div>
            
    <div id="imgpkm">
        <img src="${imagem}" id="img"/>
    </div>
        <hr>
    <div id="info">
                
    </div>
`;
let tiposlista = document.querySelector("#tipos");
tipos.forEach(tipo => {
    tiposlista.innerHTML += `
        <img src="./tipos-pkm/${tipo}.svg" id="tipo"/>
    `;
});
let nomepkm = document.querySelector("#nome");
let imagemindex = document.querySelector("#img");
let tipopkm = document.querySelector("#tipo");
let info = document.querySelector("#info");
info.innerHTML = "";

arraypkm.forEach(item => {
    info.innerHTML += `
    <div id="dados">
        <strong id="nomestat">${item.nomestatus}:</strong>
        <p id="valorstat">${item.valor}</p>
        
    </div>
    <div id="barra" style="width:300px; height:10px; background-color: white;">
        <div style="width:${item.valor}px; height:10px; background-color: red;">
    </div>
    `;
});
}
pararAnimacao();
setTimeout(renderizaCard, 200);
}

});



