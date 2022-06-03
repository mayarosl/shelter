let pageId = document.querySelector("[data-id-page]").getAttribute("data-id-page"),
            navItem = document.querySelector(`[data-id-nav=${pageId}]`);

        if(pageId == navItem.getAttribute("data-id-nav")) {
            navItem.classList.add("header__full-nav-link--active");
        };

let pageIdMobile = document.querySelector("[data-id-page]").getAttribute("data-id-page"),
        navItemMobile = document.querySelector(`[data-id-mobile-nav=${pageIdMobile}]`);

    if(pageIdMobile == navItemMobile.getAttribute("data-id-mobile-nav")) {
        navItemMobile.classList.add("mobile-nav__link--active");
        console.log(111)
    };