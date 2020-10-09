var artCart = [];
var arrayArticles = [];

function showCart(array) {
    let carritoHTML = "";
    carritoHTML += `
    <section class="shoping-cart spad">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="shoping__cart__table">
                    <table>
                        <thead>
                            <tr>
                                <th style="font-size:24px">Productos</th>
                                <th style="font-size:24px">Precio</th>
                                <th style="font-size:24px">Cantidad</th>
                                <th style="font-size:24px">Total</th>
                            </tr>
                        </thead>
                        <tbody>
    `
    for (var i = 0; i < array.articles.length; i++) {
        arrayArticles = array.articles[i];

        carritoHTML += `
  
                                <tr>
                                    <td class="shoping__cart__item">
                                    
                                        <img src="${arrayArticles.src}" alt="" width="100px" height="100px" style="border-radius:10px;border:solid 1px skyblue;">
                                       
                                        <h5 style="margin-left:15%">${arrayArticles.name}</h5>
                                    </td>
                                    <td class="shoping__cart__price">
                                    ${array.articles[i].unitCost+" "+array.articles[i].currency} 
                                    </td>
                                    <td class="shoping__cart__quantity">
                                    <div>
                                    <input type="button" style="width: 23px;color:white;border:none;background-color:#97CAEF" value="-" id="subtract" onclick="subtract(${i});">
                                    <input type="number" id="numb_${i}" style="width: 23px; text-align: center;  border: 1px solid #ebebeb;" min="1" value="${arrayArticles.count}" onclick="changeText();" readonly>
                                    <input type="button" style="width: 23px;color:white;background-color:#97CAEF;border:none;" value="+" id="add" onclick="addition(${i});">
                                    </div>
                                    </td>
                                    <td class="shoping__cart__total"> 
                                        <div id="showTotal_${i}">${allInUSD(array.articles[i].currency, array.articles[i].unitCost,[i])} USD</div>
                                    </td>  
                                </tr>                          
            
    
  `
    }
    carritoHTML += `	
                   </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="row" >              
                <div class="col-lg-6" >
                    <div class="shoping__checkout">
                        <h5>Valor de Compra</h5>
                        <ul>
                            <li>Total <span id="subT">${calcSubTotal() + " USD"}</span></li>
                            <br>
                            <button type="button" class="btn btn-info"  data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">Seleccionar Envio</button>    
                        </ul>
                    </div>
                </div>
                <button type="button" class="btn btn-success ml-auto mt-auto" style="height:50px; font-size:18px" onclick="comprarBtn();">Comprar</button>
            </div>
            
        </div>
        
    </section>
   `
    document.getElementById("cartContainer").innerHTML = carritoHTML;

};

function checkEnvio() {

    let dirr = document.getElementById("recipient-name").value
    let subtI = calcSubTotal();
    if (dirr === "") {
        Swal.fire({
            title: "Compra cancelada",
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
        //   document.getElementById("subT").innerText = subtI + 500 + " UYU";
    }




}



document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status == "ok") {
            artCart = resultObj.data;
            showCart(artCart);

        }
    });
});

function addition(id) {
    artCart.articles[id].count++;
    let quantityNumber = document.getElementById("numb_" + id);
    quantityNumber.value = artCart.articles[id].count;
    showT(id);
}
function subtract(id) {
    artCart.articles[id].count--;
    if (artCart.articles[id].count < 1) {
        artCart.articles[id].count = 1;
    }
    let quantityNumber = document.getElementById("numb_" + id);
    quantityNumber.value = artCart.articles[id].count;
    showT(id);

}

function showT(id) {
    var x;
    if (id == 0) {
        x = (artCart.articles[id].unitCost * artCart.articles[id].count) / 40;
    } else {
        x = artCart.articles[id].unitCost * artCart.articles[id].count;
    }

    document.getElementById("showTotal_" + id).innerHTML = x + " USD";

    document.getElementById("subT").innerHTML = calcSubTotal() + " USD";
}

function calcSubTotal() {
    let subTotal = 0;
    for (var i = 0; i < artCart.articles.length; i++) {
        if (i == 1) {
            subTotal += (artCart.articles[i].unitCost * artCart.articles[i].count);
        } else {
            subTotal += (artCart.articles[i].unitCost * artCart.articles[i].count) / 40;
        }

    }
    return subTotal;
}

function comprarBtn() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: 'Confirmar Compra',
        text: "¿ Estas seguro ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',


    }).then((result) => {
        if (result.value) {
            swalWithBootstrapButtons.fire({
                title: 'Compra Realizada',
                text: 'Gracias por elegirnos',
                icon: 'success',
                showConfirmButton: false
            })
            location.href = "cover.html";


        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Compra Cancelada',
                'Lo  tomaremos en cuenta',
                'error'
            );
        }
    })
}

function allInUSD(moneda, costoUnit, id) {
    if (moneda === 'UYU'){
        return (costoUnit / 40)*artCart.articles[id].count;
    }else{
        return costoUnit;
    }



 /*    if (moneda === 'UYU' && cant == 2) { //TODO:SE TE VE FRESCO PANA
        return (costoUnit * 2) / 40;
    } else if (moneda === 'UYU') {
        return costoUnit / 40;
    } else {
        return costoUnit;
    }
 */

}
