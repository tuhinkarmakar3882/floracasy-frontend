"use strict";

export default () => {
    return {
        menuOptions: [
            {
                id: 0,
                text: "Home",
                icon: "mdi-home",
                color: "red",
                route: "/"
            },
            {
                id: 1,
                text: "Book",
                icon: "mdi-book",
                color: "green",
                route: "/"
            },
        ],
        activeLink: 0,
    }
};
