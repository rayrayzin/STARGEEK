const botaomodal = document.getElementById("btn");
const cards = document.querySelector(".cards");
const formulario = document.getElementById("formulario");
const nome = document.getElementById("nome");
const descricao = document.getElementById("descricao");
const foto = document.getElementById("foto");

var emaillogado;
verificaLog();


carregarCatalogo();
function carregarCatalogo(){
    let dados = JSON.parse(localStorage.getItem("catalogo"));
    let divcard = document.createElement("div");
    if(dados == null){
        divcard.innerHTML = "<p>Nenhum item cadsatrado</p>";
        cards.appendChild(divcard);
        return null;
    }

    dados.forEach((elemento, indice) => {
        let divcard = document.createElement("div");
        divcard.setAttribute("class", "card")
        divcard.innerHTML = ` <div class="cardimg"><img src="img/${elemento.foto}"> </div>
        ${elemento.nome}
        <div class="cardinfo"><a onclick="editar(${indice})">editar</a>
        <a onclick="excluir(${indice})">excluir</a></div>
        </div>`;
        
        cards.appendChild(divcard);
        
    });
}

function excluir(indice){
    let dados = JSON.parse(localStorage.getItem("catalogo"));
    if(dados.length == 1)
    {localStorage.clear("catalogo");}
    else{
    dados.splice(indice,1);
    localStorage.setItem("catalogo", JSON.stringify(dados));
    }
    window.location.reload();
}

function editar(indice){
    var url ="caditem.html?peditar=true&indice="+ encodeURIComponent(indice);
    window.location.href = url;
}

botaomodal.onclick = () =>{
    window.location.assign("cadastro.html");
}

function verificaLog(){
    let logado = sessionStorage.getItem("logado");
    if (logado != null) {
        emaillogado = logado;
    } else {
        window.location.assign("login.html");
    }
}

function get_container_width($addr)
{
        $tallest = 16.0 / 9.0;

        $container_width = 100;

        if ($addr[0] == '/') {
                $addr = $_SERVER["DOCUMENT_ROOT"] . $addr;
        }

        list($width, $height) = getimagesize($addr);
        if ($width > 0 && $height > 0) {
                $prop = $width / $height;
                if ($prop < $tallest) {
                        $container_width *= $prop / $tallest;
                }
        }

        return $container_width;
}

    $container_width = get_container_width($addr);

    echo("<div id='$name' class=cartimg>");
    echo("<div id='hdiv_$name' style='width: $container_width%;' class=cartimg2>\n");
    echo("<a href='$addr' class=noarrow>\n");
    echo("<img src='$addr' alt='$desc'>\n");
    echo("</a>\n");
    echo("</div>");
    echo("<i>$desc</i>\n");
    echo("</div>");