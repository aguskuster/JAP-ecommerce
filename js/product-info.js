//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var productInfo = [];
var comentariosArray = [];
var prodRel = [];
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
var productsRel = "";

document.getElementById("btnPublic").addEventListener("click", function () {

    let opinion = document.getElementById("textArea").value;
    let rate = document.getElementById("number").value;

    if (opinion.trim() == "" || rate > 5 || rate === "") {
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





function showProInfo(array, arrayComments, arrayRel) {


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
        imgs += '<img class="img" src="' + productInfo.images[i] + '" width="240px" height="180px" style="padding:10px border-radius:10px">'
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

    for (let productsRelated in arrayRel) {
        
        for (i = 0; i < array.relatedProducts.length; i++) {
            
            if (productsRelated == array.relatedProducts[i]) {

                productsRel += 
                            `    
                            <div class="row" style="display:inline-block">
                            <div class"col-md-2">
                              <div class="card  text-left m-4" style="width: 18rem;">
                                <img src="` + arrayRel[productsRelated].imgSrc + `" class="card-img-top">
                          
                                <div class="card-body">
                                  <h5 class="" id="carName">` + arrayRel[productsRelated].name + ` </h5>
                                  <p class="card-text" style="height: 96px">` + arrayRel[productsRelated].description + ` <br> <b>` +
                                      arrayRel[productsRelated].cost + " " + arrayRel[productsRelated].currency + `</b></p>
                                  <a href="404page.html" class="btn btn-primary" id="btnVerMas" onclick="cancelFunction();">Ver más</a>
                                 
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                     `

        }}

        document.getElementById("prodRelatedcon").innerHTML = productsRel
    };






};




document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status == "ok") {
            productInfo = resultObj.data;

           
        } else {
            location.href = "404page.html"
        }
    });
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status == "ok") {

            prodRel = resultObj.data;

            
        } else {
            location.href = "404page.html"
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status == "ok") {

            comentariosArray = resultObj.data;

            showProInfo(productInfo, comentariosArray, prodRel);
        } else {
            location.href = "404page.html"
        }
    });
  

});






