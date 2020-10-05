"use strict";

export default function ({store, redirect}) {
    if (!store.state.auth) {
        next();
        return redirect('/Authentication/GetStarted');
    }
    next();
}
