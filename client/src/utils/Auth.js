import decode from 'jwt-decode';


// With this, we're creating a new JavaScript class called AuthService that we instantiate a new version of for every component that imports it. This isn't always necessary, but it does ensure we are using a new version of the functionality and takes some of the risk out of leaving remnant data hanging around.
class AuthService {
    //retrieve data saved in token
    getProfile() {
        return decode(this.getToken());
    }

    //check if user is still logged in
    loggedIn() {
        //check if there is a saved token and is valid
        const token = this.getToken();
        //use type ocersion to check if token is NOT undefied and the token is NOT expired
        return !!token && !this.isTokenExpired(token);
    }

    //check if token has expired
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    //retrieve token form localstorage
    getToken() {
        //retrieves the user token from localstorage
        return localStorage.getItem('id_token');
    }

    //set token to localstorage and reload to homepage
    login(idToken) {
        //saves user token to local storage
        localStorage.setItem('id_token', idToken);

        window.location.assign('/');
    }

    //clear token from localstorage and force logout with reload
    logout() {
        //clear user token and profile data from localstorage
        localStorage.removeItem('id_token');
        //this will reload the page and rest the state of the application
        window.location.assign('/');
    }
}

export default new AuthService();