import {request} from './request';
import {store} from '../app';
import axios from 'axios';

// Basic aW50ZWdyYWNhb2VycDpBbWMuMjAyMA==

export async function getCustomer(email, pass) {
    try{
        return await axios({
            method: 'post',
            url: 'https://www.colcci.com.br/web-api/v1/Profile/Account/Login', 
            headers: {Authorization: 'Basic aW50ZWdyYWNhb2VycDpBbWMuMjAyMA=='},
            data: {
                "Key": email,
                "Password": pass,     
            },
        })

    }catch(err){
        console.log(err)
    }
}

export async function createCart(basketId){
    try{
        const bask = await axios({
            method: 'post',
            url: 'https://apihub.amctextil.com.br/api/v1/ecommerce/model/carrinho', 
            headers: {Authorization: 'Basic YWRhcGNvbjphZHAwNjc='},
            data: {
                "BasketID": basketId,
                "CustomerID": 466583,
                "IdVendedor":"colcci-guilherme.below2@adapcon.com.br",

                "BasketAuthorityToken": "9d9c329e9d40826373432c20bc4cf0b0",
                "BasketHash": "13a2a905cb57bc6346095a161b19209d",
                // "BasketID": 1731737,
                // "CreatedDate": "2022-11-24T14:05:31.9150182-03:00",
                "CustomerID": 466583,
                "Email": "marcel@adapcon.com.br",
                "IdVendedor": "colcci-guilherme.below2@adapcon.com.br",
                "SessionID": "qd2cy0g4gdh0bqilsgcifn1j",
                "ShopperTicketID": "317159a2-c48d-4ae0-97d4-1f73f95f4d8f",
                "WebSiteID": 156,
                // "itens": [
                //     {
                //     "BasketItemID": 3890410,
                //     "BasketPrice": 129,
                //     "ProductID": 1024766,
                //     "Quantity": 1,
                //     "SKU": "044.01.07941-0-0050-PP",
                //     "SkuID": 1024767,
                //     }
                // ]
            },
        })
        return bask.data.Shopper.Basket

    }catch(err){
        console.log(err)
    }
}

export async function getCartList(idVendor){
    try{
        const list = await axios({
            method: 'get',
            url: 'https://apihub.amctextil.com.br/api/v1/ecommerce/model/carrinho?idVendedor='+idVendor,
            headers: {Authorization: 'Basic YWRhcGNvbjphZHAwNjc='},
        }) 
        return list.data
    }catch(err){
        console.log(err)
    }
}

export async function getCart(BasketID){
    try{
        const list = await axios({
            method: 'get',
            url: 'https://apihub.amctextil.com.br/api/v1/ecommerce/model/carrinho?BasketID='+BasketID,
            headers: {Authorization: 'Basic YWRhcGNvbjphZHAwNjc='},
        }) 
        return list.data
    }catch(err){
        console.log(err)
    }
}

export async function deleteCart(cartId ){
    try{
        await axios({
            method: 'delete',
            url: 'https://apihub.amctextil.com.br/api/v1/ecommerce/model/carrinho/'+cartId, 
            headers: {Authorization: 'Basic YWRhcGNvbjphZHAwNjc='},
        })
        return null

    }catch(err){
        console.log(err)
    }
}

export async function getBasket(basketId) {
    try{
        const bask = await axios({
            method: 'post',
            url: 'https://www.colcci.com.br/web-api/v1/Shopping/Basket/Get', 
            headers: {Authorization: 'Basic aW50ZWdyYWNhb2VycDpBbWMuMjAyMA=='},
            data: {
                "BasketId": basketId
            },
        })
        return bask.data.Shopper.Basket

    }catch(err){
        console.log(err)
    }
}

// export async function addItemToCart(basketId, sessionId, products) {
//     try{
//         const resp =  await axios({
//             method: 'post',
//             url: 'https://www.colcci.com.br/web-api/v1/Shopping/Basket/AddProduct', 
//             headers: {Authorization: 'Basic aW50ZWdyYWNhb2VycDpBbWMuMjAyMA=='},
//             data: {
//                 "BasketId": basketId,
//                 "SessionID": sessionId,
//                 "Products": products 
//             },
//         })

//         if(resp){
//             return resp
//         }

//     }catch(err){
//         console.log(err)
//     }
//     return null
// }

export async function addItemToCart(basketId, sessionId, products) {
    try{
        const resp =  await axios({
            method: 'post',
            url: 'https://apihub.amctextil.com.br/api/v1/ecommerce/model/carrinhoItem/', 
            headers: {Authorization: 'Basic YWRhcGNvbjphZHAwNjc='},
            data: {
                "BasketId": basketId,
                "SessionID": sessionId,
                "Products": products 
            },
        })

        if(resp){
            return resp
        }

    }catch(err){
        console.log(err)
    }
    return null
}

export async function checkoutRedirect(basketId, sessionId, customerId) {
    try{
        const resp = await axios({
            method: 'post',
            url: 'https://www.colcci.com.br/web-api/v1/Shopping/Basket/CheckoutRedirect', 
            headers: {Authorization: 'Basic aW50ZWdyYWNhb2VycDpBbWMuMjAyMA=='},
            data: {
                "BasketId": basketId,
                "SessionID": sessionId,
                "CustomerID": customerId
            },
        })
        return resp
    }catch(err){
        console.log(err)
    }
    return null
}

export async function createCustomer() {
    try{
        return await axios({
            method: 'post',
            url: 'https://www.colcci.com.br/web-api/v1/Profile/Account/Register', 
            headers: {Authorization: 'Basic aW50ZWdyYWNhb2VycDpBbWMuMjAyMA=='},
            data: {
                "Email": "webchu@gmail.com",
                "Password": "123",     
                'Name': 'afksdj',
                "gender": 'M',
                "Phone": '(47)988021634',
                "Surname": "pikachu",
                "CPF": "8765674564",
                'BirthDate': "20/09/1992",
            },
        })

    }catch(err){
        console.log(err)
    }
}

export async function getCustomerList(canal) {
    try{
        const resp = await axios({
            method: 'get',
            url: 'https://apihub.amctextil.com.br/api/v1/ecommerce/model/clientes', 
            headers: {Authorization: 'Basic YWRhcGNvbjphZHAwNjc='},         
        })
        return resp.data
    }catch(err){
        console.log(err)
    }
}

export async function searchProduct(filtro='VESTIDO', numeroProdutos = 10,codLoja=22) {
    try{
        resp =  await axios({
            method: 'get',
            url: `https://apihub.amctextil.com.br/api/v1/ecommerce/model/consultaProdutos`, 
            // url: `https://apihub.amctextil.com.br/api/v1/ecommerce/model/consultaProdutos?descricaoFiltro=${filtro}&numeroProdutos=${numeroProdutos}&codLoja=${codLoja}`, 
            headers: {Authorization: 'Basic YWRhcGNvbjphZHAwNjc='},
            params: {
                descricaoFiltro:filtro,
                numeroProdutos:numeroProdutos,
                codLoja:codLoja,
            }
        })
        
        return resp.data

    }catch(err){
        console.log(err, 'myerrrooor')
    }
}