//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let nombre = document.getElementById("miPerfilNombre");
let apellido = document.getElementById("miPerfilApellido");
let edad = document.getElementById("miPerfilEdad");
let email = document.getElementById("miPerfilEmail");
let telefono = document.getElementById("miPerfilTelefono");
let img = document.getElementById("myProfilepicture");
let changeImg = document.getElementById("myProfileImg")


function traerDatosdeUsuario() {
   
    let usuario = {};
    
    usuario = {
        "nombre" : nombre.value,
        "apellido" : apellido.value,
        "edad" : edad.value,
        "email" : email.value,
        "telefono" : telefono.value,
        "imgURL" : img.value
    }
    localStorage.setItem("Usuario",JSON.stringify(usuario));
    localStorage.setItem('img', img.value)
}   

document.getElementById("guardarUsu").addEventListener('click', function(){
    traerDatosdeUsuario();
    location.href = "my-profile.html";
})


function cambiar(){
    var pdrs = document.getElementById('file-upload').files;
    localStorage.setItem('img', pdrs)
    
}




function cargarDatosdeUsuario(){
    let usuario = localStorage.getItem("Usuario");
    let parsedUser = JSON.parse(usuario);
    
    nombre.value =  parsedUser.nombre
    apellido.value =  parsedUser.apellido
    edad.value =  parsedUser.edad
    email.value =  parsedUser.email
    telefono.value =  parsedUser.telefono
    changeImg.src = localStorage.getItem("img")
    img.value = localStorage.getItem("img")


}

document.addEventListener("DOMContentLoaded", function (e) {
    cargarDatosdeUsuario();
});