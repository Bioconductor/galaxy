import { getGalaxyInstance } from "app";
import _l from "utils/localization";
import { userLogout } from "utils/logout";

import { useUserStore } from "@/stores/userStore";

export function fetchMenu(options = {}) {
    const Galaxy = getGalaxyInstance();
    const menu = [];
    //
    // Analyze data tab.
    //
    menu.push({
        id: "analysis",
        url: "/",
        tooltip: _l("Tools and Current History"),
        icon: "fa-home",
        target: "_top",
    });

    //
    // Admin.
    //
    if (Galaxy.user.get("is_admin")) {
        menu.push({
            id: "admin",
            title: _l("Admin"),
            url: "/admin",
            tooltip: _l("Administer this Galaxy"),
            cls: "admin-only",
            onclick: () => {
                const userStore = useUserStore();
                userStore.toggleSideBar("admin");
            },
        });
    }

    //
    // Help tab.
    //
    const helpTab = {
        id: "help",
        title: _l("Help"),
        url: "javascript:void(0)",
        tooltip: _l("Support"),
        menu: [
            {
                title: _l("Bioconductor Support"),
                url: options.helpsite_url,
                target: "_blank",
                hidden: !options.helpsite_url,
            },
            {
                title: _l("Bioconductor Site"),
                url: "https://bioconductor.org",
                target: "_blank",
            },
            {
                title: _l("How to Cite Galaxy"),
                url: options.citation_url,
                target: "_blank",
            },
            {
                title: _l("Terms and Conditions"),
                url: options.terms_url,
                target: "_blank",
                hidden: !options.terms_url,
            },
        ],
    };
    menu.push(helpTab);

    //
    // User tab.
    //
    let userTab = {};
    if (!Galaxy.user.id) {
        if (options.allow_user_creation) {
            userTab = {
                id: "user",
                title: _l("Log in or Register"),
                cls: "loggedout-only",
                url: "/login",
                tooltip: _l("Log in or register a new account"),
                target: "_top",
            };
        } else {
            userTab = {
                id: "user",
                title: _l("Login"),
                cls: "loggedout-only",
                tooltip: _l("Login"),
                url: "/login",
                target: "_top",
            };
        }
    } else {
        userTab = {
            id: "user",
            title: _l("User"),
            cls: "loggedin-only",
            url: "javascript:void(0)",
            tooltip: _l("Account and saved data"),
            menu: [
                {
                    title: `${_l("Signed in as")} ${
                        Galaxy.user.get("username") ? Galaxy.user.get("username") : Galaxy.user.get("email")
                    }`,
                    disabled: true,
                },
                { divider: true },
            ],
        };
        if (Galaxy.config.interactivetools_enable) {
            userTab.menu.push({
                title: _l("Active Interactive Tools"),
                url: "/interactivetool_entry_points/list",
            });
        }
        if (Galaxy.config.enable_notification_system) {
            userTab.menu.push({
                title: _l("Notifications"),
                url: "/user/notifications",
            });
        }
        userTab.menu.push({ divider: true });
        userTab.menu.push({
            title: _l("Preferences"),
            url: "/user",
        });
        userTab.menu.push({
            title: _l("Sign Out"),
            onclick: userLogout,
            hidden: Galaxy.config.single_user,
        });
    }
    menu.push(userTab);
    return menu;
}
