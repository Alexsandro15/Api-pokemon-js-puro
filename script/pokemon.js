let erropkm = document.querySelector(".erro");
let cardpkm = document.querySelector(".card-pokemon");
async function usandoApiPokemon(nome) {
    try{
        console.log('Iniciando a requisição...');
        
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${nome}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.status);
        }

        const data = await response.json();

        let status = data.stats;
        
        let tipos = data.types;
        let tipospkm = [];
        tipos.forEach(tipo => {
            tipospkm.push(tipo.type.name);
        });
        
        let statusPkm = [];

        status.forEach(stat => {
            let statuspkmvalor = {
                nomestatus:stat.stat.name, valor: stat.base_stat
            }
            statusPkm.push(statuspkmvalor);
        });
        
        let sprites = data.sprites;
        let home = sprites.front_default;
        
        return [home, statusPkm, tipospkm];

    }catch(erro){
        erropkm.style.color = 'red';
        erropkm.innerHTML = `pokemon: ${nome} ñ encontrado`;
        cardpkm.innerHTML = "";
        cardpkm.classList.remove("card-pokemon");
        cardpkm.classList.add("erro-card");
        throw new Error(erro.message);
    }finally{
        console.log("requisição finalizada");
    }
}
let btn = document.querySelector("#btn");
btn.addEventListener('click', async function(event) {
event.preventDefault();

try{
    let nome = document.querySelector("#nomepkm").value;
    if(nome.length == 0){
        erropkm.innerHTML = `o nome ñ pode ser vazio`;
        throw new Error('Erro: o nome não pode ser vazio');
    }
    erropkm.innerHTML = ``;

    nome = nome.toLowerCase().trim();
    let [imagem, arraypkm, tipos] = await usandoApiPokemon(nome);
    
    if(imagem && arraypkm && tipos){

        cardpkm.classList.add("card-pokemon");
        function iniciarAnimacao() {
            cardpkm.classList.add("giro");
        }
        
        function pararAnimacao() {
            cardpkm.style.animation = "none"; 
            cardpkm.offsetHeight; 
            cardpkm.style.animation = null; 
        }
        
    
    
    cardpkm.style.display = "flex";
    iniciarAnimacao();
    
    function renderizaCard() {
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
}catch(erro){
   console.log("erro: ", erro.message);
}
});