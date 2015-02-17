
$(function() {
    var startupView = "About";

    // Uncomment the line below to disable platform-specific look and feel and to use the Generic theme for all devices
    // DevExpress.devices.current({ platform: "generic" });

    if(DevExpress.devices.real().platform === "win8") {
        $("body").css("background-color", "#000");
    }

    $(document).on("deviceready", function () {
        navigator.splashscreen.hide();
        if (window.devextremeaddon) {
            window.devextremeaddon.setup();
        }
        $(document).on("backbutton", function () {
            DevExpress.processHardwareBackButton();
        });
    });

    function onNavigatingBack(e) {
        if(e.isHardwareButton && !GitParty.app.canBack()) {
            e.cancel = true;
            exitApp();
        }
    }

    function exitApp() {
        switch (DevExpress.devices.real().platform) {
            case "tizen":
                tizen.application.getCurrentApplication().exit();
                break;
            case "android":
                navigator.app.exitApp();
                break;
            case "win8":
                window.external.Notify("DevExpress.ExitApp");
                break;
        }
    }

    GitParty.app = new DevExpress.framework.html.HtmlApplication({
        namespace: GitParty,
        layoutSet: DevExpress.framework.html.layoutSets[GitParty.config.layoutSet],
        navigation: GitParty.config.navigation,
        commandMapping: GitParty.config.commandMapping
    });

    $(window).unload(function() {
        GitParty.app.saveState();
    });

    GitParty.app.router.register(":view/:id", { view: startupView, id: undefined });
    GitParty.app.on("navigatingBack", onNavigatingBack);
    GitParty.app.navigate();
});