function validateFields(inputString) {
    return (inputString==='') ? false : true;
}

function getNextUserId(users) {
    console.log('getNextUserId');
    console.log(users);
    let userId=0;
    users.map((user, index) => {
        if (userId<user.userId) {
            userId = user.userId;
        }
        return user;
    });
    userId++;
    console.log("USERID :::: "+userId);
    return userId;
}


export {validateFields, getNextUserId} ;