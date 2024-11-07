
let menuOptions = [
    { name: 'X-Salada', price: 30, vegan: false, src: './assets/xsalada.jpeg', alt: 'x-salada'},
    { name: 'X-Bacon', price: 34, vegan: false, src: './assets/xbacon.png', alt: 'x-bacon'},
    { name: 'X-Bacon Egg', price: 39, vegan: false, src: './assets/bacon-egg.png', alt: 'x-bacon-egg'},
    { name: 'X-Monstruoso', price: 50, vegan: false, src: './assets/monstruoso.png', alt: 'x-monstruoso'},
    { name: 'X-Vegano', price: 55, vegan: true, src: './assets/xvegan.png', alt: 'x-vegano'},
    { name: 'X-Monstruoso Vegano', price: 45, vegan: true, src: './assets/monstruoso-vegan.png', alt: 'x-monstruoso-vegano'},
    ]

let botaoCardapio = document.querySelector('.botao-cardapio')
let botaoDesconto = document.querySelector('.botao-desconto')
let botaoValorTotal = document.querySelector('.botao-valor-total')
let botaoVegano = document.querySelector('.botao-vegano')

let lista = document.querySelector('ul')
let listaVegana

let exibeSoma = false
let desconto = false
let exibeVegano = false
let valorTotal


botaoCardapio.addEventListener('click', () => {desconto = false, exibeSoma = false, exibeVegano = false, mostrarCardapio(menuOptions)})
function mostrarCardapio(listaProdutos) {
    let itemLista = ''
    listaProdutos.forEach (produto => {
        itemLista += `
            <li>
                <img src="${produto.src}" alt="${produto.alt}">
                <p>${produto.name}</p>
                <p>R$ ${produto.price.toFixed(2)}</p>
            </li>
            `
    })

    lista.innerHTML = itemLista

    botaoDesconto.addEventListener('click', () => {
        desconto = true;

        if (exibeSoma == true) {
            valorTotal = menuOptions.reduce ((acc, produto) => acc + produto.price * 0.9, 0)
            lista.innerHTML = `
            <li>
                <p>O valor total do cardápio com desconto é R$ ${valorTotal.toFixed(2)}</p>
            </li>
            `
        }
        else if (exibeSoma == false) {
            let newPrices = menuOptions.map (produto => ({
                ...produto,
                price: produto.price * 0.9,
                })) 
                mostrarCardapio(newPrices)
        }
        
        if (exibeVegano == true) {
            let newPricesVegano = listaVegana.map (produto => ({
                ...produto,
                price: produto.price * 0.9,
                })) 
                mostrarCardapio(newPricesVegano)
        }

        if (exibeVegano && exibeSoma == true) {
            valorTotal = listaVegana.reduce ((acc, produto) => acc + produto.price * 0.9, 0)
            lista.innerHTML = `
            <li>
                <p>O valor total dos veganos com desconto é R$ ${valorTotal.toFixed(2)}</p>
            </li>
            `
        }
    })
}

botaoValorTotal.addEventListener('click', somaTudo)
function somaTudo() {
    exibeSoma = true

    if (desconto == true ) {
        valorTotal = menuOptions.reduce ((acc, produto) => acc + produto.price * 0.9, 0)
        lista.innerHTML = `
        <li>
            <p>O valor total do cardápio com desconto é R$ ${valorTotal.toFixed(2)}</p>
        </li>
        `
    }
    else if (desconto == false) {
        valorTotal = menuOptions.reduce ((acc, produto) => acc + produto.price, 0)
        lista.innerHTML = `
        <li>
            <p>O valor total do cardápio é R$ ${valorTotal.toFixed(2)}</p>
        </li>
        `
    }

    if (exibeVegano == true) {
        valorTotal = listaVegana.reduce ((acc, produto) => acc + produto.price, 0)
        lista.innerHTML = `
        <li>
            <p>O valor total dos veganos é R$ ${valorTotal.toFixed(2)}</p>
        </li>
        `
    }

    if (exibeVegano && desconto == true) {
        valorTotal = listaVegana.reduce ((acc, produto) => acc + produto.price * 0.9, 0)
        lista.innerHTML = `
        <li>
            <p>O valor total dos veganos com desconto é R$ ${valorTotal.toFixed(2)}</p>
        </li>
        `
    }
}

botaoVegano.addEventListener('click', filtroVegano)
function filtroVegano() {
    exibeSoma = false
    exibeVegano = true
    desconto = false
    listaVegana = menuOptions.filter (produto => {
        if(produto.vegan) {
            return true
        }
        else {
            return false
        }
    })

    mostrarCardapio(listaVegana)
}