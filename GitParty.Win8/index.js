
$(function() {
    var startupView = "About";


    GitParty.app = new DevExpress.framework.html.HtmlApplication({
        namespace: GitParty,
        layoutSet: DevExpress.framework.html.layoutSets[GitParty.config.layoutSet],
        navigation: GitParty.config.navigation,
        commandMapping: GitParty.config.commandMapping
    });

    $(window).unload(function() {
        GitParty.app.saveState();
    });

    GitParty.app.router.register(":view/:id", { view: "Home", id: undefined });
    GitParty.app.navigate();
});