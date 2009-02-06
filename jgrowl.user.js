// ==UserScript==
// @name        jgrowl
// @namespace   http://fluidapp.com
// @description do growl notification instead of jgrowl
// @include     *
// @author      Daisuke Murase <typester@cpan.org>
// ==/UserScript==

(function (app) {
    if (!app) return;

    function strip_tags (str) {
        str = str.replace(/<.*?>/g, "");
        return str;
    }

    var jGrowl = jQuery.jGrowl;
    jQuery.jGrowl = function (message, option) {
        if (typeof(option) != "object") option = {};

        // strip html tags
        var header      = strip_tags(option["header"] || "");
        var description = strip_tags(message || "");

        app.showGrowlNotification({
            title: header,
            description: description,
            sticky: !!option["sticky"],
            onclick: function () { app.activate() }
        });

        return true;
    }

})(window.fluid);
