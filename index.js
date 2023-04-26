document.addEventListener("DOMContentLoaded", getTable);
/* document.addEventListener("DOMContentLoaded", getModal); */
let id_user="";
function getTable(){
    let url = `https://vermenmasterchief.tk/estudiantes.php`
    fetch(url)
    .then(result=>{
        return result.json()
    })
    .then(data=>{
       /*  console.log(data.datos); */
        showTable(data.datos)
    })
}
/* function getModal(){
    let url2=`https://vermenmasterchief.tk/detalleEstudiante.php?api_key=Metallica&id_usuario=${id_usuario}`
    fetch(url2)
    .then(result=>{
        return result.json()
    })
    .then(data=>{
        console.log(data.datos);
    })
} */
function showTable(items){
    let cont = document.querySelector("#cont-table");
    let plantilla = ""
    items.forEach(item=>{
        let {id_usuario,cedula,nombre,programa,sexo,jornada} = item
        plantilla+=`
        <tr>
        <th style="border:  2px solid rgb(13, 160, 197);">${id_usuario}</th>
        <th style="border:  2px solid rgb(13, 160, 197);">${nombre}</th>
        <th style="border:  2px solid rgb(13, 160, 197);">${programa}</th>
        <th style="border:  2px solid rgb(13, 160, 197);">${sexo}</th>
        <th style="border:  2px solid rgb(13, 160, 197);">${jornada}</th>
        <th style="border:  2px solid rgb(13, 160, 197);"> 
        <button class="btn btn-primary btnDetail" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal" name="${nombre}" cc="${cedula}"id="${id_usuario}">Detalles</button>
        </th>
        </tr>
        `
    })
    cont.innerHTML = plantilla
    cont.addEventListener(`click`,(e)=>{
        let htmlTitle="";
        let modalTitle = document.querySelector(".modal-title");
        let modalBody = document.querySelector(".modal-body");
        let htmlModal="";
        let btnDetail = e.target.classList[2]
        if(btnDetail == `btnDetail`){
            let name= e.target.getAttribute(`name`)
            let cc= e.target.getAttribute(`cc`)
            let id = e.target.getAttribute(`id`)
            let link2 = `https://vermenmasterchief.tk/detalleEstudiante.php?api_key=Metallica&id_usuario=${id}`
            fetch(link2)
            .then(result=>{
                console.log(result);
                return result.json()
            })
            .then(data=>{
                console.log(data.datos[0]);
                showModal(data.datos[0])
            })
             
            function showModal(datos){
                let {foto, promedio, sisben} = datos
                htmlModal+=`
                 <div><img src="${foto}"></div>
                 <div>
                 <p>Nombre: ${name}</p>
                 <p>Cedula: ${cc} </p>
                 <p>Promedio: ${promedio}</p>
                 <p>Puntaje sisben: ${sisben}</p></div>
          `
          htmlTitle += `${name}`
          modalBody.innerHTML = htmlModal;
          modalTitle.innerHTML = htmlTitle;
            } 
        }
    })
    }
