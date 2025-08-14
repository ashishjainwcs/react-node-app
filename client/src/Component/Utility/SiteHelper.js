

function updateUserData(user) {

    let siteData = JSON.parse(localStorage.getItem("siteData"));
    siteData.siteData.users = [...siteData.siteData.users, user];
    siteData.siteData.loggedInUser = user.firstName;
    siteData.siteData.loggedInUserId = user.userId
    siteData.siteData.loggedInUserType = user.userType
    localStorage.setItem("siteData", JSON.stringify(siteData));
    return;
}

export function replaceCategoryAndUpdateSiteData(categories) {
    let siteData = JSON.parse(localStorage.getItem("siteData"));
    siteData.siteData.categories = categories;
    updateSiteData(siteData);
}

export function replaceProductsAndUpdateSiteData(products) {
    let siteData = JSON.parse(localStorage.getItem("siteData"));
    siteData.siteData.products = products;
    updateSiteData(siteData);
}


function logoutSession(siteData) {
    siteData.siteData.loggedInUser = "";
    siteData.siteData.loggedInUserId = "";
    siteData.siteData.loggedInUserType = "";
    localStorage.setItem("siteData", JSON.stringify(siteData));
    return;

}

function userNameValid(siteData, userName) {

    let userId = "";
    siteData.siteData.users.map((user, index) => {
        if (user.email === userName) {
            userId = user.userId;
        }
        return user;
    });
    return userId;
}

function validatePassword(siteData, userName, password) {

    let passwordValid = false;
    siteData.siteData.users.map((user, index) => {
        if (user.email === userName && user.password === password) {
            passwordValid = true;
        }
        return user;
    });
    return passwordValid;
}

function initiateUserLogin(siteData, userId) {

    siteData.siteData.users.map((user) => {
        if (user.userId === userId) {
            siteData.siteData.loggedInUser = user.firstName;
            siteData.siteData.loggedInUserId = user.userId
            siteData.siteData.loggedInUserType = user.userType
            localStorage.setItem("siteData", JSON.stringify(siteData));
        }
        return user;
    });

    return;
}

function userIdAvailable(siteData, userName) {

    let userIdAvailable = true;
    siteData.siteData.users.map((user, index) => {
        if (user.email === userName) {
            userIdAvailable = false;
        }
        return user;
    });
    return userIdAvailable;
}

function updateSiteData(siteData) {

    localStorage.setItem("siteData", JSON.stringify(siteData));
    return;
}

function categoryNameAvailable(updatedCategory) {

    let siteData = JSON.parse(localStorage.getItem("siteData"));
    console.log("category available");
    console.log(updatedCategory.categoryName);
    let categoryAvailable = true;
    siteData.siteData.categories.map((category, index) => {

        console.log(category.categoryName);
        console.log(updatedCategory.categoryName);
        if (category.categoryName === updatedCategory.categoryName && category.categoryId !== updatedCategory.categoryId) {
            console.log("false");
            categoryAvailable = false;
        }

    });
    return categoryAvailable;

}

function categoryNameAvailableNew(siteData, addCategory) {
    console.log("category available");
    console.log(addCategory.categoryName);
    let categoryAvailable = true;
    siteData.siteData.categories.map((category, index) => {

        console.log(category.categoryName);
        console.log(addCategory.categoryName);
        if (category.categoryName === addCategory.categoryName) {
            console.log("false");
            categoryAvailable = false;
        }

    });
    return categoryAvailable;

}


function getNextCategoryId(categories) {
    console.log('getNextCategoryId');
    console.log(categories);
    let categoryId = 0;
    categories.map((category, index) => {
        if (categoryId < category.categoryId) {
            categoryId = category.categoryId
        }
        return categoryId;
    });
    categoryId++;
    console.log("categoryId :::: " + categoryId);
    return categoryId;
}


function productNameAvailable(siteData, updatedProduct) {
    console.log("Product available");
    console.log(updatedProduct.productName);
    let productAvailable = true;
    siteData.siteData.products.map((product, index) => {

        console.log(product.productCode);
        console.log(updatedProduct.productCode);
        if (product.productCode === updatedProduct.productCode && product.productId !== updatedProduct.productId) {
            console.log("false");
            productAvailable = false;
        }

    });
    return productAvailable;
}

function productNameAvailableNew(siteData, addProduct) {
    console.log("Product available");
    console.log(addProduct.productName);
    let productAvailable = true;
    siteData.siteData.products.map((product, index) => {

        console.log(product.productCode);
        console.log(addProduct.productCode);
        if (product.productCode === addProduct.productCode) {
            console.log("false");
            productAvailable = false;
        }

    });
    return productAvailable;
}


function getNextProductId(products) {
    console.log('getNextProductId');
    console.log(products);
    let productId = 0;
    products.map((product) => {
        if (productId < product.productId) {
            productId = product.productId
        }
        return productId;
    });
    productId++;
    console.log("productId :::: " + productId);
    return productId;
}

export function addToCartAndUpdate(productId, inputQty) {
    let siteData = JSON.parse(localStorage.getItem("siteData"));

    console.log("add to cart and update called...",);
    let userId = siteData.siteData.loggedInUserId;
    let product = siteData.siteData.products.filter((product) => product.productId === productId);
    let pendingOrder = siteData.siteData.orders.filter((order) => order.userId === userId && order.status === "P");

    console.log("pending order data :::", pendingOrder, " product data", product);

    if (Object.keys(pendingOrder).length === 0) {
        let pendingCart = createPendingCart(pendingOrder[0], product[0], userId, siteData, inputQty)
        siteData.siteData.orders = [...siteData.siteData.orders, pendingCart];
    } else {
        pendingOrder = updatePendingCart(pendingOrder[0], product[0], inputQty);
        let updatedOrders = siteData.siteData.orders.map((order) => {

            console.log(order);
            if (order.ordersId === pendingOrder.ordersId) {
                return pendingOrder;
            } else {
                return order;
            }
        });
        siteData.siteData.orders = updatedOrders;

    }
    updateSiteData(siteData);

    return siteData;


}


function createPendingCart(pendingOrder, product, userId, siteData, inputQty) {

    let orderedProducts = {
        productId: product.productId,
        productName: product.productName,
        productCode: product.productCode,
        productPrice: product.productPrice,
        qty: inputQty,
        imgSrc: product.imgSrc
    }

    pendingOrder = {
        ordersId: getNextOrdersId(siteData.siteData.orders),
        userId: userId,
        shippingAddress: "",
        totalAmount: 0,
        status: "P",
        products: [orderedProducts],
        name:"",
        address:"",
        phoneNumber:""
    }

    let orderTotal = 0;
    pendingOrder.products.map((product) => { orderTotal += product.productPrice * product.qty });


    console.log("pendingOrder ", pendingOrder, " Order Total : ", orderTotal);
    pendingOrder.totalAmount = orderTotal;

    return pendingOrder;

}

function updatePendingCart(pendingOrder, product, inputQty) {

    let orderedProducts = {
        productId: product.productId,
        productName: product.productName,
        productCode: product.productCode,
        productPrice: product.productPrice,
        qty: inputQty,
        imgSrc: product.imgSrc

    }
    console.log("pendingOrder.products", pendingOrder.products);
    if (pendingOrder.products !== null && pendingOrder.products !== undefined) {
        console.log("products found in pending order");

        /* checking if the product is already there in pending cart, if yes, then 
        will increase the qty instead of adding new row */
        let productFound = false;
        pendingOrder.products.map((cartProduct) => {
            if (cartProduct.productId === product.productId) {
                cartProduct.qty = cartProduct.qty + inputQty;
                productFound = true;
            }
        });

        if (!productFound) {
            /* product not found in existing cart... adding new row */
            pendingOrder.products = [...pendingOrder.products, orderedProducts];
        }
    } else {
        pendingOrder = {
            ...pendingOrder,
            products: [orderedProducts]
        }
    }

    if (!pendingOrder.name) {
        pendingOrder.name="";
    }
    if (!pendingOrder.phoneNumber) {
        pendingOrder.phoneNumber="";
    }
    if (!pendingOrder.address) {
        pendingOrder.address="";
    }
    let orderTotal = 0;
    pendingOrder.products.map((product) => { orderTotal += product.productPrice * product.qty });


    console.log("pendingOrder ", pendingOrder, " Order Total : ", orderTotal);
    pendingOrder.totalAmount = orderTotal;
    return pendingOrder;
}

function getNextOrdersId(orders) {
    console.log('getNextOrdersId');
    console.log(orders);
    let ordersId = 0;
    orders.map((order) => {
        if (ordersId < order.ordersId) {
            ordersId = order.ordersId
        }
        return ordersId;
    });
    ordersId=ordersId+1;
    console.log("orderId :::: " + ordersId);
    return ordersId;
}



export function removeFromCartAndUpdate(productId) {
    let siteData = JSON.parse(localStorage.getItem("siteData"));

    console.log("remove from cart and update called...",);
    let userId = siteData.siteData.loggedInUserId;
    let pendingOrder = siteData.siteData.orders.filter((order) => order.userId === userId && order.status === "P")[0];

    console.log("pending order data :::", pendingOrder);

    let productFound = false;
    let orderTotalAmount = 0;
    let updatedPendingOrder = pendingOrder.products.filter((product) => {

        if (!productFound && product.productId === productId) {
            productFound = true;
        } else {
            orderTotalAmount = orderTotalAmount + (product.productPrice * product.qty);
            return product;
        }
    });
    pendingOrder.products = [...updatedPendingOrder];
    pendingOrder.totalAmount = orderTotalAmount;

    console.log("updated Basket after removal :", pendingOrder);

    let updatedOrders = siteData.siteData.orders.map((order) => {

        console.log(order);
        if (order.ordersId === pendingOrder.ordersId) {
            return pendingOrder;
        } else {
            return order;
        }
    });
    siteData.siteData.orders = updatedOrders;

    updateSiteData(siteData);

    return siteData;


}

export const updateCartShippingDetails = (inputName, inputAddress, inputPhoneNumber) => {

    let siteData = JSON.parse(localStorage.getItem("siteData"));

    let userId = siteData.siteData.loggedInUserId;
    let pendingOrder = siteData.siteData.orders.filter((order) => order.userId === userId && order.status === "P")[0];
    pendingOrder = {
        ...pendingOrder,
        name: inputName,
        shippingAddress: inputAddress,
        phoneNumber: inputPhoneNumber
    }
    let updatedOrders = siteData.siteData.orders.map((order) => {

        console.log(order);
        if (order.ordersId === pendingOrder.ordersId) {
            return pendingOrder;
        } else {
            return order;
        }
    });

    siteData.siteData.orders = updatedOrders;
    updateSiteData(siteData);

    return updatedOrders;
}


export const updateCartPaymentTypes = (paymentSelected) => {

    let siteData = JSON.parse(localStorage.getItem("siteData"));

    let userId = siteData.siteData.loggedInUserId;
    let pendingOrder = siteData.siteData.orders.filter((order) => order.userId === userId && order.status === "P")[0];
    debugger
    pendingOrder = {
        ...pendingOrder,
        paymentDetails: paymentSelected,
        status: "C"
    }
    let updatedOrders = siteData.siteData.orders.map((order) => {

        console.log(order);
        
        if (order.ordersId === pendingOrder.ordersId) {
            console.log("inside ");
            return pendingOrder;
        } else {
            console.log("inside else ");
            return order;
        }
    });

    siteData.siteData.orders = updatedOrders;
    updateSiteData(siteData);

    return updatedOrders;
}

export { updateUserData, logoutSession, userNameValid, validatePassword, initiateUserLogin, userIdAvailable, updateSiteData, categoryNameAvailable, getNextCategoryId, categoryNameAvailableNew, productNameAvailable, productNameAvailableNew, getNextProductId };

