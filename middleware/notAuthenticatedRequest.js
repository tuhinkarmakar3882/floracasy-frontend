'use strict';

export default function ({store, redirect}) {
    if (store.state.auth) {
        next();
        return redirect('/Home/Dashboard');
    }
    next();
}
