var categoriesArray = [];

function showCategoriesList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let category = array[i];

       htmlContentToAppend += `    
                             <div class="row">
                                   <div class"col-md-2">
                                    <div class="card  text-justify m-3" style="width: 18rem;">
                                        <img src="` + category.imgSrc + `" class="card-img-top">
                                        
                                    <div class="card-body">
                                         <h5 class="">` + category.name + ` </h5>
                                           <p class="card-text" style="height: 96px">` + category.description + ` <br> <b>` + category.cost + " " + category.currency + `</b></p>   
                                          <a href="#" class="btn btn-primary">Ver más</a>
                                    </div>
                                     </div>
                                   </div>
                             </div>
                                   `

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    //Agregamos la funcion de showSpinner 
    showSpinner()

    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            categoriesArray = resultObj.data;
            //Muestro las categorías ordenadas
            showCategoriesList(categoriesArray);
            //Agregamos la funcion de hideSpinner 
            hideSpinner();
        }
    });
});