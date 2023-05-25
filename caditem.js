const nome = document.getElementById("nome");
const descricao = document.getElementById("descricao");
const foto = document.getElementById("foto");
const botaocadastrar = document.querySelector(".btncadastrar");

var url = new URL(window.location.href);
var peditar = url.searchParams.get("peditar");
var pindice = url.searchParams.get("indice");

if (peditar == "true"){
  editar(pindice);
}

botaocadastrar.onclick = (evento)=>{
  
  if ((peditar != "true") || (peditar == null)){
    evento.preventDefault();
    fenvio().then(result =>{
                     if(result){
                        let dados = JSON.parse(localStorage.getItem("catalogo"))||[];
                        dados.push(
                                      {
                                        nome: nome.value,
                                        descricao: descricao.value,
                                        foto: nomeArq
                                        }
                                     )
                        localStorage.setItem("catalogo", JSON.stringify(dados));
                        window.location.assign("catalogo.html");
                        
                     }else{
                        alert("Houve erro no envio do arquivo");
                     }

                    });
      }else
      {
        editarenvio(evento);
        window.location.assign("catalogo.html");
      }
    
}
function editar(indice){
  nome.value = "editar";
  descricao.value = "editar";
  foto.files[0] = null;  
  let dados = JSON.parse(localStorage.getItem("catalogo"));
  nome.value = dados[indice].nome;
  descricao.value = dados[indice].descricao;
  fotoa= dados[indice].foto;
 
}
var fotoa;
function editarenvio(evento){
     evento.preventDefault();
    if ((fotoa != foto.value)&&(foto.value != "")){
 
    fenvio()
    .then(result =>{
                    if(result){
                      salvaEdicao(nomeArq);
                       }
                    });
   }
   else
   {
        salvaEdicao(fotoa);
   } 
}

function salvaEdicao(pfoto){
  let dados = JSON.parse(localStorage.getItem("catalogo"));
  dados[pindice].nome = nome.value;
  dados[pindice].descricao = descricao.value;
  dados[pindice].foto = pfoto;
  localStorage.setItem("catalogo", JSON.stringify(dados));

}
var nomeArq;
async function fenvio() { 
    const url = 'http://localhost:3005/upload';
    const arquivo = document.getElementById("foto").files[0];
    const formData = new FormData();
    formData.append('arquivo', arquivo);
    console.log(JSON.stringify(formData.values[0]));
    console.log(JSON.stringify(formData.values[1]));
    try{
         
         var resp = await fetch(url, {
                                       method: 'POST',
                                       body: formData,
                                     }
                               ) 
         console.log(resp);
         if (resp.ok){
           let respText = await resp.text();
           nomeArq = respText;
           return true;
         }
         else{
              return false;
         }
       }
    catch (error) {
        console.error(error);
        return false;
      }
}