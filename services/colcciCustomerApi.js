import {request} from './request';
import {store} from '../app';
import axios from 'axios';

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

export async function createCart({CartName, BasketID, 
        Favorite, SessionID='', IdVendedor='',  
        CustomerID='', ShopperTicketID='', CustomerName='', 
         Email='', PostalCode='', Items=[], WebSiteID=156, Status='', CartID,
    }){
    try{
        const bask = await axios({
            method: 'post',
            url: 'https://apihub.amctextil.com.br/api/v1/ecommerce/model/carrinho',
            headers: {Authorization: 'Basic YWRhcGNvbjphZHAwNjc='},
            data: {
                CartName,
                BasketID,
                Favorite,
                SessionID,
                IdVendedor,                
                CustomerID,
                ShopperTicketID,
                WebSiteID,
                Items,
                CustomerName,                
                Email,
                Status,
                PostalCode,
                CartID
            },
        })
        return bask.data

    }catch(err){
        console.log(err.response.data)
    }
}

export async function getCartList({idVendor, CartName}){
    console.log(`https://apihub.amctextil.com.br/api/v1/ecommerce/model/carrinho?idVendedor=${idVendor}` + (CartName ? `&CartName=[${CartName}` : ''))
    try{
        const list = await axios({
            method: 'get',
            url: `https://apihub.amctextil.com.br/api/v1/ecommerce/model/carrinho?idVendedor=${idVendor}` + (CartName ? `&CartName=[${CartName}` : ''),
            headers: {Authorization: 'Basic YWRhcGNvbjphZHAwNjc='},
        }) 
        return list.data
    }catch(err){
        console.log(err.response.data)
    }
}

export async function getCart(CartID){
    try{
        const list = await axios({
            method: 'get',
            url: 'https://apihub.amctextil.com.br/api/v1/ecommerce/model/carrinho?CartID='+CartID,
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
            url: 'https://apihub.amctextil.com.br/api/v1/ecommerce/model/carrinho?CartID='+cartId, 
            headers: {Authorization: 'Basic YWRhcGNvbjphZHAwNjc='},
        })
        return 'deleted'

    }catch(err){
        console.log(err.reponse.data)
    }
}

export async function deleteCartItem(itemId ){
    try{
        await axios({
            method: 'delete',
            url: 'https://apihub.amctextil.com.br/api/v1/ecommerce/model/carrinhoItem?CartItemID='+itemId, 
            headers: {Authorization: 'Basic YWRhcGNvbjphZHAwNjc='},
            data: {}
        })
        return null

    }catch(err){
        console.log(err)
    }
}

export async function deleteItemFromBasket({BasketId, SessionID, CustomerID, BasketItemID, ShopperTicketID}) {
    
    try{
        const resp =  await axios({
            method: 'post',
            url: 'https://www.colcci.com.br/web-api/v1/Shopping/Basket/RemoveBasketItem', 
            headers: {Authorization: 'Basic aW50ZWdyYWNhb2VycDpBbWMuMjAyMA=='},
            data: {BasketId, SessionID, CustomerID, BasketItemID, ShopperTicketID},
        })

        if(resp){
            return resp
        }

    }catch(err){
        console.log(err)
    }
    return null
}

export async function getShippingValue({BasketID, PostalCode}) {
    try{
        const resp =  await axios({
            method: 'post',
            url: 'https://www.colcci.com.br/web-api/v1/Shopping/Basket/SetPostalCode', 
            headers: {Authorization: 'Basic aW50ZWdyYWNhb2VycDpBbWMuMjAyMA=='},
            data: {BasketID, PostalCode},
        })

        if(resp){
            return resp
        }

    }catch(err){
        console.log(err)
    }
    return null
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

export async function addItemToBasket({basketId, sessionId, product}) {
    try{
        const resp =  await axios({
            method: 'post',
            url: 'https://www.colcci.com.br/web-api/v1/Shopping/Basket/AddProduct', 
            headers: {Authorization: 'Basic aW50ZWdyYWNhb2VycDpBbWMuMjAyMA=='},
            data: {
                "BasketId": basketId,
                "SessionID": 'c1n1rvnq11q14gb23hglzcvp',
                "SessionID": sessionId,
                "Products": [product]
            },
        })
        
        if(resp){
            if(resp.data.Errors.length > 0){
                return {error: resp.data.Errors.map(el => el.ErrorMessage)}
            }else{
                return resp
            }
        }

    }catch(err){
        console.log(err)
    }
    return null
}



export async function addItemToCart({BasketID, BasketItemID, SKU, Quantity, SkuID, WebSiteID=156, ProductID, BasketPrice, CartID, ProductColor, ProductSize}) {
    
    try{
        const resp =  await axios({
            method: 'post',
            url: 'https://apihub.amctextil.com.br/api/v1/ecommerce/model/carrinhoItem', 
            headers: {Authorization: 'Basic YWRhcGNvbjphZHAwNjc='},
            data: {
                CartID,
                WebSiteID,
                BasketID,
                BasketItemID,
                Quantity,
                BasketPrice,
                ProductID,
                SkuID,                
                SKU,
                ProductColor,
                ProductSize,
            },
        })

        if(resp){
            return resp
        }

    }catch(err){
        console.log(err.response.data)
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

export async function createCustomer({Email, Password, Name, Sex, Surname, CPF, Birthdate, Phone}) {
    try{
        const resp = await axios({
            method: 'post',
            url: 'https://www.colcci.com.br/web-api/v1/Profile/Account/Register', 
            headers: {Authorization: 'Basic aW50ZWdyYWNhb2VycDpBbWMuMjAyMA=='},
            data: {
                "Email": Email,
                "Password": Password,     
                'Name': Name,
                "Gender": Sex,
                "Phone": Phone,
                "Surname": Surname,
                "CPF": CPF,
                'BirthDate': Birthdate,
            },
        })
        return resp

    }catch(err){
        console.log(err)
    }
}

export async function getCustomerList({Canal='Colcci', name='', count=10, lastId, numeroClientes}) {
    try{
        const resp = await axios({
            method: 'get',
            url: `https://apihub.amctextil.com.br/api/v1/ecommerce/model/clientes?Canal=${Canal}` + (name ? `&nome=[${name}` : ''), 
            headers: {Authorization: 'Basic YWRhcGNvbjphZHAwNjc='},    
            params: {
                count
            }     
        })
        
        return resp.data
    }catch(err){
        console.log(err)
    }
}

export async function searchProduct({filter='VESTIDO', numeroProdutos = 10, codLoja=2, lastId}) {
    try{
        const resp =  await axios({
            method: 'get',
            url: `https://apihub.amctextil.com.br/api/v1/ecommerce/model/consultaProdutos`, 
            headers: {Authorization: 'Basic YWRhcGNvbjphZHAwNjc='},
            params: {
                descricaoFiltro:filter,
                numeroProdutos:numeroProdutos,
                codLoja:codLoja,
                lastId,
            }
        })
        
        return resp.data

    }catch(err){
        console.log(err.response.data)
    }
}