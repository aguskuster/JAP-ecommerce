const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentCategoriesArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
const form = document.querySelector('#search');
const buttonSearch = document.querySelector('#btn');
const resultado = document.querySelector('#cat-list-container');

function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.soldCount < b.soldCount ){ return 1; }
            if ( a.soldCount > b.soldCount ){ return -1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.cost);
            let bCount = parseInt(b.cost);

            if ( aCount > bCount ){ return 1; }
            if ( aCount < bCount ){ return -1; }
            return 0;
        });
    }

    return result;
}




function showCategoriesList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let category = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))){

                htmlContentToAppend += `
                <div class="row">
                <a href="../product-info.html" class=" list-group-item-action">   
                <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + category.imgSrc + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">` + category.name + `</h4>
                            <small class="text-muted">` + category.soldCount + ` artículos vendidos</small>
                        </div>
                        <div class="text-muted">` + category.description + `</div>
                        <br>               
                         <div class="text-muted"> <b>` + category.cost + " " + category.currency + ` </b></div>
                        
                    </div>
                </div>
            </div> </a>

             </div>                              `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }else{
            location.href = "404page.html"
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showCategoriesList();
    });
});



const filtrito = () => {
    resultado.innerHTML = '';
    const textSearched = form.value.toLowerCase();
    for (let product of currentCategoriesArray) {
        let car = product.name.toLowerCase();
        if (car.indexOf(textSearched) !== -1) {
            resultado.innerHTML += `    
            <a href="../product-info.html" style="text-decoration: none;">
            <div class="list-group-item list-group-item-action">
            <div class="row ">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">` + product.name + `</h4>
                        <small class="text-muted">` + product.soldCount + ` artículos vendidos</small>
                    </div>
                    <div class="text-muted">` + product.description + `</div>
                    <br>               
                     <div class="text-muted"> <b>` + product.cost + " " + product.currency + ` </b></div>
                    
                </div>
            </div>
        </div>
        </a>
                                       `
        }
    }
    if (resultado.innerHTML === '') {
        resultado.innerHTML += `
        <div style="position: absolute;
        height: 150px;
        width: 200px;
        left: 50%;
        top: 50%;
        margin-top: 100px;
        margin-left: 100px;">
         <p>No se encuentra el producto buscado
       </div>
       `
    }
}
buttonSearch.addEventListener('click', filtrito);

form.addEventListener('keyup', filtrito);
filtrito();