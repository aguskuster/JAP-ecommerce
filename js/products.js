var categoriesArray = [];

function showCategoriesList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let category = array[i];

        htmlContentToAppend += `    
        <div class="list-group-item list-group-item-action">
        <div class="row ">
            <div class="col-3">
                <img src="` + category.imgSrc + `" class="img-thumbnail">
            </div>
            <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">` + category.name + `</h4>
                    <small class="text-muted">` + category.soldCount + ` artículos</small>
                </div>
                <div class="text-muted">` + category.description + `</div>
                <br>               
                 <div class="text-muted">` + category.cost + " " + category.currency + `</div>
                
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
document.addEventListener("DOMContentLoaded", function (e) {
    //Agregamos la funcion de showSpinner 
    showSpinner()

    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            categoriesArray = resultObj.data;
            //Muestro las categorías ordenadas
            showCategoriesList(categoriesArray);
            //Agregamos la funcion de hideSpinner 
            hideSpinner();
        }
    });
});