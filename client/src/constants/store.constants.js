export const ADD_TO_CART = "ADD_TO_CART";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const ADD_USER = "ADD_USER";
export const UPDATE_CATEGORY = "UPDATE_CATEGORY";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const DELETE_CATEGORY = "DELETE_CATEGORY";

export const UPDATE_PRODUCT= "UPDATE_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export const RESET_ACTION = "RESET_ACTION";

export const REMOVE_CART = "REMOVE_CART";
export const ADD_SHIPPING_DETAILS = "ADD_SHIPPING_DETAILS";
export const ADD_PAYMENT_DETAILS = "ADD_PAYMENT_DETAILS";
export const BUY_NOW = "BUY_NOW";


export const initialSiteData = () => {

    let siteData = JSON.parse(localStorage.getItem("siteData"));

    if (Object.keys(siteData).length === 0) {
        return {"siteData":{"users":[{"userId":1001,"firstName":"testfirst","lastName":"testLast","gender":"M","dateOfBirth":"23/09/1978","address":"Delhi","email":"ashish1@ashish1.com","password":"1234","phoneNumber":"9891198911","userType":"C"},{"userId":1002,"firstName":"testfirst1002","lastName":"testLast","gender":"M","dateOfBirth":"23/09/1978","address":"Delhi","email":"ashish@ashish.com","password":"1234","phoneNumber":"9891198911","userType":"C"},{"userId":1004,"firstName":"Test-Admin","lastName":"Jain","gender":"M","dateOfBirth":"2022-06-15","address":"Delhi, New Delhi","email":"abc@abc.com","password":"1234","phoneNumber":"9891198911","userType":"A"},{"userId":1005,"firstName":"Ashish","lastName":"Jain","gender":"M","dateOfBirth":"2022-06-15","address":"Delhi, New Delhi","email":"abcd@abcd.com","password":"1234","phoneNumber":"9891198911","userType":"A"},{"userId":1006,"firstName":"Ashish1","lastName":"Jain","gender":"M","dateOfBirth":"2025-05-14","address":"Delhi, New Delhi","email":"abcde@abcde.com","password":"1234","phoneNumber":"9891112345","userType":"C"},{"userId":1007,"firstName":"Test001","lastName":"Jain","gender":"M","dateOfBirth":"2025-04-29","address":"Delhi","email":"test1001@test.com","password":"1234","phoneNumber":"98911","userType":"C"},{"userId":1008,"firstName":"Test-User","lastName":"Jain","gender":"M","dateOfBirth":"2025-04-29","address":"Delhi","email":"user@user.com","password":"1234","phoneNumber":"98911","userType":"C"}],"loggedInUser":"Test-Admin","loggedInUserId":1004,"loggedInUserType":"A","categories":[{"categoryId":1001,"categoryName":"Apple23"},{"categoryId":1002,"categoryName":"Samsung1"},{"categoryId":1003,"categoryName":"Laptop"},{"categoryId":1004,"categoryName":"Air Conditioner - 2"},{"categoryName":"abcd","categoryId":1005}],"products":[{"productId":1001,"productCode":"1239","productName":"iPhone-6s-new","productPrice":22000,"imgSrc":"https://m.media-amazon.com/images/I/61VuVU94RnL._SX679_.jpg","categoryCode":1001,"timestamp":"2025-05-22T13:35:20.745Z"},{"productId":1002,"productCode":"1235","productName":"iPhone-7s","productPrice":35000,"imgSrc":"https://m.media-amazon.com/images/I/61VuVU94RnL._SX679_.jpg","categoryCode":1001},{"productId":1003,"productCode":"1236","productName":"iPhone-8s","productPrice":35000,"imgSrc":"https://m.media-amazon.com/images/I/61VuVU94RnL._SX679_.jpg","categoryCode":1001},{"productId":1004,"productCode":"1237","productName":"iPhone-9s","productPrice":39000,"imgSrc":"https://m.media-amazon.com/images/I/61VuVU94RnL._SX679_.jpg","categoryCode":1001},{"productCode":"1243","productName":"name","productPrice":"20000","categoryCode":1002,"imgSrc":"https://m.media-amazon.com/images/I/61VuVU94RnL._SX679_.jpg","productId":1007}],"paymentTypes":["Paypal","Cash on Delivery","Online Payment"],"orders":[{"ordersId":5002,"userId":1004,"shippingAddress":"nameadd","totalAmount":35000,"status":"P","products":[{"productId":1002,"productName":"iPhone-7s","productCode":"1235","productPrice":35000,"qty":1,"imgSrc":"https://m.media-amazon.com/images/I/61VuVU94RnL._SX679_.jpg"}],"name":"name","address":"","phoneNumber":"phone","paymentDetails":""}]}};
    } else {
        return siteData;
    }
}

export async function checkHttpStatus(response) {
  const clone = response.clone();
    const text = await clone.text();
    console.log("API Response Body :::", text);
  
  if (response.status >= 200 && response.status < 204) {
    return response.json();
  } else if (response.status === 204) {
    return true;
  } else if (response.status >= 400 && response.status < 500) {
    return response.json();
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}


export const jsonApiHeader = (contentType) => {
  // const token = localStorage.getItem('token')
  const contentTypeHeader = contentType ? { "Content-Type": contentType } : {};
  return {
    'x-apikey':'10bc272c4a1e03568378648911981cd254f36',
    'cache-control': 'no-cache',
    Accept: "application/json",
    ...contentTypeHeader,
    
    // Authorization: Bearer ${token},
  };
};
