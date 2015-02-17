
$(function() {
    var startupView = "About";

    DevExpress.devices.current("desktop");

    GitParty.app = new DevExpress.framework.html.HtmlApplication({
        namespace: GitParty,
        layoutSet: DevExpress.framework.html.layoutSets[GitParty.config.layoutSet],
        mode: "webSite",
        navigation: GitParty.config.navigation,
        commandMapping: GitParty.config.commandMapping
    });

    $(window).unload(function() {
        GitParty.app.saveState();
    });

    GitParty.app.router.register(":view/:id", { view: startupView, id: undefined });
    GitParty.app.navigate();
});