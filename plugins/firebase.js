const firebase = require('firebase')

const firebaseConfig = {
    apiKey: "AIzaSyAWuJIU3_V6pf0QvF9wev36pNvXYGmNJNo",
    authDomain: "floracasy.firebaseapp.com",
    databaseURL: "https://floracasy.firebaseio.com",
    projectId: "floracasy",
    storageBucket: "floracasy.appspot.com",
    messagingSenderId: "295292997514",
    appId: "1:295292997514:web:7ac338f7f4fee2ede48273",
    measurementId: "G-XJLFQ1C8VD"
};
let app = null
// prevent initializing firebase more than once
if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig)
    // firebase.analytics();
}
// inject it so it can be accessed as this.$firebase inside the project
export default (ctx, inject) => {
    inject('firebase', firebase)
}
