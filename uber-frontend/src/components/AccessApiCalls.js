import axios from 'axios';
const url = "http://localhost:5000/app/";
//const url = `http://${process.env.REACT_APP_IP_ADDRESS}:5000/app/`;

export const signUp = newUser => {
    return axios
    .post(url+"signup", {
        fname: newUser.fname,
        lname: newUser.lname,
        email: newUser.email,
        password: newUser.password
    }).then(res => {
        console.log(res);
        return res;
    }).catch(res => {
        console.log(res);
        let errorMessage = {"message": "error"}
        return errorMessage;
    })
}

export const signIn = user => {
    return axios
    .post(url + "signin", {
        email: user.email,
        password: user.password
    }).then(res => {
        console.log(res);
        if (res.status === 200) {
            if (res.data["message"] === "User logged in successfully") {
                localStorage.setItem('isLoggedIn', res.data["isLoggedIn"])
                localStorage.setItem('fname', res.data["fname"])
                localStorage.setItem('lname', res.data["lname"])
                localStorage.setItem('email', res.data["email"])
            }
        }
        return res;
    }).catch(res => {
        console.log(res);
        let errorMessage = {"message": "error"}
        return errorMessage;
    })
}