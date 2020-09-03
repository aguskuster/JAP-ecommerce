//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var productInfo = [];
var comentariosArray = [];
var d = new Date();
var date = d.getDate();
var month = d.getMonth() + 1;
var year = d.getFullYear();
var hour = d.getHours();
var min = d.getMinutes();
var sec = d.getSeconds();
var usuario = localStorage.getItem("user");
var image = localStorage.getItem("img");
var dateStr = year + "-" + month + "-" + date + " " + hour + ":" + min + ":" + sec;
var comments = "";

document.getElementById("btnPublic").addEventListener("click", function () {

    let opinion = document.getElementById("textArea").value;
    let rate = document.getElementById("number").value;

    if (opinion.trim() == "" || rate > 5) {
        Swal.fire({
            title: "Comentario no publicado !",
            text: "Verifica los datos que has ingresado.",
            icon: "error",
            backdrop: true,
            timer: 5000,
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true,
            stopKeydownPropagation: true,
        });

    } else {

        Swal.fire({
            title: "Comentario publicado !",
            text: "Gracias por tu comentario, lo tendremos en cuenta.",
            icon: "success",
            backdrop: true,
            timer: 5000,
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true,
            stopKeydownPropagation: true,
        });

         comments += `<article class="comment">
                                                                            <a class="comment-img" href="#non">
                                                                            <img src="`+ image + `" alt="" width="50" height="50">
                                                                            </a>
                                                                                 <div class="comment-body">
                                                                                    <div class="text">
                                                                                          <p>`+ opinion + `</p>
                                                                                    </div>
                                                                                            <p style="display:inline-block; margin-right:3%;" class="attribution">by <a href="#non">`+ usuario + `</a> ` + dateStr + `<br><br> Puntuación:<em style="margin-left:4px;color:skyblue;font-family:arial;">` + rate + `/5</em></p>
      
                                                                                </div>
                                                                            </article>`

        document.getElementById("seccionComentarios").innerHTML = comments
        document.getElementById("textArea").value = "";
        document.getElementById("number").value = 0;
    }
});





function showProInfo(array, arrayComments) {


    let imgs = "";
    let name = document.getElementById('productName');
    let prodescr = document.getElementById('productDescription');
    let soldCount = document.getElementById('productCount')
    let productCost = document.getElementById('productCost');

    name.innerHTML = productInfo.name;
    prodescr.innerHTML = productInfo.description;
    soldCount.innerHTML = "Cantidad de vehiculos vendidos: " + productInfo.soldCount;
    productCost.innerHTML = "Precio de compra: " + productInfo.cost + " " + productInfo.currency;

    for (let i = 0; i < productInfo.images.length; i++) {
        imgs += '<img class="img" src="'+ productInfo.images[i] +'" width="240px" height="180px" style="padding:10px border-radius:10px">'
        document.getElementById("productImagesGallery").innerHTML = imgs;
    };




    for (let comment in arrayComments) {
        comments += `<article class="comment">
        <a class="comment-img" href="#non">
          <img src="https://i.imgur.com/M0d2gtC.jpg" alt="" width="50" height="50">
        </a>
        <div class="comment-body">
          <div class="text">
            <p>`+ comentariosArray[comment].description + `</p>
          </div>
          <p style="display:inline-block; margin-right:3%;" class="attribution">by <a href="#non">`+ comentariosArray[comment].user + `</a> ` + comentariosArray[comment].dateTime + `<br><br> Puntuación:<em style="margin-left:4px;color:skyblue;font-family:arial;">` + comentariosArray[comment].score + `/5</em></p>
          
        </div>
      </article>`

        document.getElementById("seccionComentarios").innerHTML = comments;
    };






    /*   let comments = "<br>";
  
      for (let comment in arrayComments) {
          comments += '<img src="https://i.imgur.com/M0d2gtC.jpg" alt="" style="margin-right:30px; border-radius:60px" with="60px" height="50px" class="img-circle">'
          comments += '<strong >' + comentariosArray[comment].user.toUpperCase() + '</strong>:<br>';
          comments += '<p style="margin-left:4%;">' + comentariosArray[comment].description + '</p> <br> <small>' + " " + comentariosArray[comment].dateTime + '</small> ';
          comments += ' <br>';
          comments += 'Calificacion: <strong id="Stars">' +  + '/5</strong>';
          comments += '<br> <hr>';
          document.getElementById("seccionComentarios").innerHTML = comments;
      }
   */
};


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status == "ok") {
            productInfo = resultObj.data;

            showProInfo(productInfo, comentariosArray);
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status == "ok") {

            comentariosArray = resultObj.data;

            showProInfo(productInfo, comentariosArray);
        }
    });

});



