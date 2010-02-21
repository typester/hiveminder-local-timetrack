// ==UserScript==
// @name           hiveminder local time tracking
// @namespace      unknownplace.org
// @description    add time tracking feature on hiveminder
// @include        http://hiveminder.com/*
// @include        https://hiveminder.com/*
// ==/UserScript==

(function (d, w) {
    var debug = false;
    function log() { debug && w.console.log.apply(null, arguments)  };

    var $ = w.jQuery;
    var tasks = [];

    var start_button = $("<a>")
        .text("Start!")
        .addClass("track_start").css({
            "display": "block",
            "width": "50px",
            "padding": "4px",
            "-moz-border-radius-topleft": "5px",
            "-moz-border-radius-bottomleft": "5px",
            "-webkit-border-top-left-radius": "5px",
            "-webkit-border-bottom-left-radius": "5px",
            "background-color": "#00bb00",
            "color": "#ffffff",
            "text-align": "center",
            "float": "left"
        });

    var stop_button = $("<a>")
        .text("Stop!")
        .addClass("track_stop").css({
            "display": "block",
            "width": "50px",
            "padding": "4px",
            "-moz-border-radius-topleft": "5px",
            "-moz-border-radius-bottomleft": "5px",
            "-webkit-border-top-left-radius": "5px",
            "-webkit-border-bottom-left-radius": "5px",
            "background-color": "#ff3344",
            "color": "#ffffff",
            "text-align": "center",
            "float": "left"
        }).hide();

    var indicator = $("<div>")
    .text("00:00:00")
        .addClass("track_indicator").css({
            "display": "block",
            "width": "80px",
            "padding": "4px",
            "-moz-border-radius-topright": "5px",
            "-moz-border-radius-bottomright": "5px",
            "-webkit-border-top-right-radius": "5px",
            "-webkit-border-bottom-right-radius": "5px",
            "background-color": "#eee",
            "color": "#333",
            "text-align": "center",
            "font-weight": "bold",
            "float": "left"
        });

    var time_format = function (sec) {
        var h = parseInt(sec / 60 / 60);
        var m = parseInt((sec - h*60*60) / 60);
        var s = parseInt(sec - h*60*60 - m*60);
        if (h < 10) h = "0" + h;
        if (m < 10) m = "0" + m;
        if (s < 10) s = "0" + s;
        return h + ":" + m + ":" + s;
    }

    var start = function (task) {
        stop();

        task.running = (new Date()).getTime() - task.time * 1000;
        $(".track_start", task.obj).hide();
        $(".track_stop", task.obj).show();

        setTimeout(timer, 200, task);

        $.jGrowl("Start \"" + task.name + "\"");
    };

    var stop = function () {
        for (var i in tasks) {
            var task = tasks[i];
            if (task.running) {
                task.running = false;
                $(".track_stop", task.obj).hide();
                $(".track_start", task.obj).show();

                $.jGrowl("Stopped \"" + task.name + "\"");
            }
        }
    };

    var timer = function (task) {
        if (task.running) {
            var elapsed = ((new Date()).getTime() - task.running) / 1000;

            if (parseInt(elapsed / 60) > parseInt(task.time / 60)) {
                if ( (parseInt(elapsed / 60) % 10) == 0 ) {
                    $.jGrowl(task.name + " [" + time_format(elapsed) + "]", {
                        header: "You're doing now:"
                    });
                }
            }

            task.time = elapsed;
            task.indicator.text( time_format(task.time) );

            setTimeout(arguments.callee, 200, task);
        }
    };

    $(".task_container").each(function (i) {
        var task = {
            obj : this,
            id  : $(".record_locator", this).text(),
            name: $(".task_summary", this).text(),
            time: 0,
            running: false,
            indicator: indicator.clone()
        }
        tasks.push(task);

        var div = $("<div>").css({
            "display": "block",
            "overflow": "auto",
            "float": "right"
        });

        $(".task_summary", this).after(div);
        div
        .append( start_button.clone().click(function () { start(task) }) )
        .append( stop_button.clone().click(stop) )
        .append( task.indicator );
    });

})(document, (typeof(unsafeWindow) != "undefined") ? unsafeWindow : window);

