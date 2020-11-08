//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let nombre = document.getElementById("miPerfilNombre");
let apellido = document.getElementById("miPerfilApellido");
let edad = document.getElementById("miPerfilEdad");
let email = document.getElementById("miPerfilEmail");
let telefono = document.getElementById("miPerfilTelefono");
let imgUser = document.getElementById("myProfilepicture");



var input, img, url;
var input = document.querySelector("input[type=file]");
img = document.querySelector("#myProfileImg");

input.addEventListener("change", (event) => {
    url = URL.createObjectURL(event.target.files[0]);
    imgUser.value = event.target.files[0].name;
    img.src = url;
    localStorage.setItem("img", img.src = url);
});

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
    
}   

document.getElementById("guardarUsu").addEventListener('click', function(){
    traerDatosdeUsuario();
    window.location.reload();
})







function cargarDatosdeUsuario(){
    let usuario = localStorage.getItem("Usuario");
    let parsedUser = JSON.parse(usuario);
    
    nombre.value =  parsedUser.nombre
    apellido.value =  parsedUser.apellido
    edad.value =  parsedUser.edad
    email.value =  parsedUser.email
    telefono.value =  parsedUser.telefono
    img.src = localStorage.getItem("img")
    


}

document.addEventListener("DOMContentLoaded", function (e) {
    cargarDatosdeUsuario();
});