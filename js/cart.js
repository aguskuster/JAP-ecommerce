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
                                    ${array.articles[i].unitCost + " " + array.articles[i].currency} 
                                    </td>
                                    <td class="shoping__cart__quantity">
                                    <div>
                                    <input type="button" style="width: 23px;color:white;border:none;background-color:#97CAEF" value="-" id="subtract" onclick="subtract(${i});">
                                    <input type="number" id="numb_${i}" style="width: 23px; text-align: center;  border: 1px solid #ebebeb;" min="1" value="${arrayArticles.count}" onclick="changeText();" readonly>
                                    <input type="button" style="width: 23px;color:white;background-color:#97CAEF;border:none;" value="+" id="add" onclick="addition(${i});">
                                    </div>
                                    </td>
                                    <td class="shoping__cart__total"> 
                                        <div id="showTotal_${i}">${allInUSD(array.articles[i].currency, array.articles[i].unitCost, [i])} USD</div>
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
            <div class="row" style="display:flex;justify-content:center;">  
            <div class="shoping__checkout" style="width: 45%; height: 340px ; display: inline-block;">
            <h5>Envío</h5>
            <ul>
            <li><input name="envio" type="radio" value="5" checked="" required="" onclick="calcEnvio();"> Standard (12 a 15 días) - Costo del 5% sobre el subtotal.</li>
            <li><input name="envio" type="radio" value="7" required="" onclick="calcEnvio();" > Express (5-8 días) - Costo del 7% sobre el subtotal.</li>    
            <li><input name="envio" type="radio" value="15"  required="" onclick="calcEnvio();"> Premium (2-5 días) - Costo del 15% sobre el subtotal.</li>
                
                
                
            </ul>
        </div>            
                <div class="col-lg-6" >
                
                    <div class="shoping__checkout">
                        <h5>Valor de Compra</h5>
                        <ul>
                            <li>Subtotal <span id="subT">${calcSubTotal() + " USD"}</span></li> 
                            <li>Envio <span id="envioP">0 USD</span></li>
                            <li>Total <span id="totalEnvSubT">0 USD</span></li>
                            <button type="button" class="btn btn-info"  data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">Forma de Pago</button>    
                        </ul>
                    </div>
                </div>
            
                
            </div>
            <button id="btnCompra" disabled type="button" class="btn btn-success" style="float:right; margin-top:30px;" data-toggle="modal" data-target="#compraModal">Comprar</button> 
        </div>
        
    </section>
   `
    document.getElementById("cartContainer").innerHTML = carritoHTML;

};



/* $('#exampleModal').modal({
    backdrop: 'static',
    keyboard: false
});
 */
function calcEnvio() {
    let envio = document.getElementsByName("envio");
    for (var i = 0; i < envio.length; i++) {
        if (envio[i].checked) {
            var env = parseInt(envio[i].value);
            break;
        }
    }

    calcTotal(env);
}

function calcTotal(envio) {
    let totalConEnvio = (calcSubTotal() * envio) / 100
    document.getElementById("envioP").innerHTML = Math.round(totalConEnvio) + " USD"
    document.getElementById("totalEnvSubT").innerHTML = Math.round(totalConEnvio + calcSubTotal()) + " USD"
}
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status == "ok") {
            artCart = resultObj.data;
            showCart(artCart);
            calcEnvio();

        }
    });


});

function addition(id) {
    artCart.articles[id].count++;
    let quantityNumber = document.getElementById("numb_" + id);
    quantityNumber.value = artCart.articles[id].count;
    showT(id);
    calcEnvio();
}
function subtract(id) {
    artCart.articles[id].count--;
    if (artCart.articles[id].count < 1) {
        artCart.articles[id].count = 1;
    }
    let quantityNumber = document.getElementById("numb_" + id);
    quantityNumber.value = artCart.articles[id].count;
    showT(id);
    calcEnvio();

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

function confirmarCompra() {

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
function comprarBtn() {
   
   
    let payment = document.getElementsByName("pago");
    for (var i = 0; i < payment.length; i++) {
        let alertMsg =  `
        Revisa los datos ingresados, hay campos incorrectos
      `
        if (payment[i].checked) {
            var pagos = parseInt(payment[i].value);
            if (pagos == 0) {
                let emailPaypal = document.getElementById("email_PayPal").value
                if (emailPaypal.trim() == "") {

                    $("#errorMsj").removeClass("d-none")
                    setTimeout(function () { $("#errorMsj").addClass("d-none"); }, 5000)
                    document.getElementById("errorMsj").innerHTML = alertMsg
                } else {
                    confirmarCompra();
                }
            } else if (pagos == 1) {
                let CVVnro = document.getElementById("CVV").value
                let AnioVence = document.getElementById("experiationYear").value
                let MesVence = document.getElementById("experiationMonth").value
                let NroTarjeta = document.getElementById("card-number").value
                if (CVVnro.trim() === "" || AnioVence.trim() === "" || MesVence.trim() === "" || NroTarjeta.trim() === "") {

                    $("#errorMsj").removeClass("d-none");
                    setTimeout(function () { $("#errorMsj").addClass("d-none"); }, 5000);
                    document.getElementById("errorMsj").innerHTML = alertMsg
                } else {
                    confirmarCompra();
                }
            } else {
                let Cedula = document.getElementById("recipient-name-ci").value
                let nroCuenta = document.getElementById("recipient-name-nroC").value
                if (Cedula.trim() === "" || nroCuenta.trim() === "") {


                    $("#errorMsj").removeClass("d-none");
                    setTimeout(function () { $("#errorMsj").addClass("d-none"); }, 5000);
                    document.getElementById("errorMsj").innerHTML = alertMsg
                } else {
                    confirmarCompra();
                }
            }
        }


    }
}


function allInUSD(moneda, costoUnit, id) {
    if (moneda === 'UYU') {
        return (costoUnit / 40) * artCart.articles[id].count;
    } else {
        return costoUnit;
    }

}






function methodPayment() {
    let paypal = `
  


    <div class="pagoPaypal form-group" style="margin-top: 10px;">
    <label for="Email" class="col-form-label">Email: </label> <br>
    <input type="email" class="form-control mr-2 " id="email_PayPal" placeholder="Email">
  </div>
`;
    let mastercard = ` 
   
    
    <div class="pagoMasterCard form-group">
<label for="card-number" class="col-form-label">Nro. de Tarjeta: </label> <br>
<input type="number" class="form-control" id="card-number" required maxlength="16">

<label for="expirationdate" class="col-form-label">Fecha de Vencimiento: </label> <br>
<input type="text" class="form-control mr-2 " style="display: inline-block;width:85px;" id="experiationMonth"
  placeholder="MM" required maxlength="2">
<input type="text" class="form-control mr-2 " style="display: inline-block;width:85px;" id="experiationYear"
  placeholder="AA" required maxlength="2"><br>
  <label for="departamentos" class="col-form-label">CVV2/CVC2</label> <br> 
  <input type="s" class="form-control mr-2 " style="display: inline-block;width:85px;" id="CVV"
  placeholder="CVV" required maxlength="4">
</div>
`

    let transferenciaBank = `
   


<div class="wiretransfer form-group">
    <label for="nroCuenta" class="col-form-label">Nro. de Cuenta: </label> <br>
    <input type="number" class="form-control mr-2 " id="recipient-name-nroC" placeholder="Ingresar número de cuenta"><br>

    <label for="cedula" class="col-form-label">Cedula: </label> <br>
    <input type="number" class="form-control mr-2 " id="recipient-name-ci" placeholder="Ingrese número de cedula"><br>
  </div>
`
    let divPay = document.getElementById("modalContent");
    let payment = document.getElementsByName("pago");
    let Pais = document.getElementById("recipient-name-pais").value
    let Calle = document.getElementById("recipient-name-calle").value
    let Esq = document.getElementById("recipient-name-esq").value
    let Nro = document.getElementById("recipient-name-nro").value

    
    let addModalBody = '';

    if (Pais == "" || Calle == "" || Esq == "" || Nro == "") {
        addModalBody += `
        
        Revisa los datos ingresados, hay campos incorrectos
      `

        $("#Error").removeClass("d-none")
        setTimeout(function () { $("#Error").addClass("d-none"); }, 5000)
        document.getElementById("Error").innerHTML += addModalBody
    } else {
        $("#btnConfirmModal").attr("data-dismiss", "modal")

        for (var i = 0; i < payment.length; i++) {
            if (payment[i].checked) {
                var pay = parseInt(payment[i].value);
                
                if (pay == 0) {
                    divPay.innerHTML = paypal;
                    $("#compraModal").css("height", "400px");
                    document.getElementById("btnCompra").removeAttribute("disabled");
                } else if (pay == 1) {
                    divPay.innerHTML = mastercard;
                    $("#compraModal").css("height", "600px");
                    document.getElementById("btnCompra").removeAttribute("disabled");
                } else {
                    divPay.innerHTML = transferenciaBank;
                    $("#compraModal").css("height", "420px");
                    document.getElementById("btnCompra").removeAttribute("disabled");
                }
                break;
            }
        }
    }
}