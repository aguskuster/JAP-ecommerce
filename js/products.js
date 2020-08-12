var categoriesArray = [];

function showCategoriesList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let category = array[i];

        // Quitamos el alt="category.desc" en la etiqueta img
        // Modificamos el small poniendo un div y sacamos la linea de codigo fuera del div en el que se encontraba
        // Modificamos el atributo que venia category.proCount a description, ya que en el json aparecia como tal 
        // Además agregamos el productCount para no desperdiciar la información que contenía el json
        /*  htmlContentToAppend += `
          
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
                  
                  <div class="text-muted"> Precio :` +" "+category.cost +" "+ category.currency  + `</div>
  
              </div>
          </div>
      </div>
      `*/
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