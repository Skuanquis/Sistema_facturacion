let btn = document.getElementById("btn_bill")
let items_list = document.getElementById("items_list")
let bill_details = document.getElementById("bill_details")
let items_selected

let frag = document.createDocumentFragment()

// TODO Obtener los datos del servidor
let respuesta = {
    "products" : {
        "1234" : ["Juguete1", 289],
        "1235" : ["Juguete2", 89],
        "1236" : ["Juguete3", 59],
        "1237" : ["Juguete4", 209],
    },
    "total" : 1234,
    "tipo_pago": "Una sola vez",
    "nit" : "123456"
}

let show_items = () => {
    for (const id_prod in respuesta["products"]) {
        if (Object.hasOwnProperty.call(respuesta["products"], id_prod)) {
            const element = respuesta["products"][id_prod];
            let bill_item = document.createElement("div")
            bill_item.classList.add("item-content")
            bill_item.innerHTML = `
                <h5 class="item-title">${element[0]}</h5>
                <h5 class="item-title">${element[1]}$</h5>
            `
            // console.log(typeof(bill_item));
            frag.appendChild(bill_item)
        }
    }
    items_list.appendChild(frag)
}

btn.addEventListener("click", () => {
    console.log("Imprimiendo");
    window.print()
})

window.onload = () => {
    items_selected = JSON.parse(localStorage.getItem("kart"));
    
    // TODO Aqui en se obtendran los datos del servidor
    // products = JSON.parse(localStorage.getItem("products"));
    
    show_items()
}