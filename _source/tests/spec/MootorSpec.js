describe("Mootor", function() {
    var divMain,
        eventClick = document.createEvent("HTMLEvents");
        eventClick.initEvent("click", false, true),
        bindCallback = function() { document.testCallback = true;},
        bindCallback2 = function() { document.testCallback2 = true;};
    
    beforeEach(function() {
        divMain = $("#main");
    });
    
    it("should be able to select and return an element by id", function() {
        expect($("#main").el).toEqual(document.getElementById("main"));
    });

    it("should be able to return the query that was passed", function() {
        expect($("#main").query).toEqual("main");
    });
    
    it("should be able to run code on document ready", function() {
        expect($.readyTest).toEqual(true);    
    });

    it("should be able to extend one object with other object properties", function() {
        $.extend({testExtend: true}, divMain);
        expect(divMain.testExtend).toEqual(true);    
    });
        
    it("should be able to return addEventListener feature, if its available", function() {        
        expect($.context.addEventListener).toNotEqual(undefined);    
    });

    it("should be able to add a className to an element", function() {
        $("#main").setClass("testClassName");
        expect(divMain.el.className.indexOf("testClassName")).toNotEqual(-1);    
    });

    it("should be able to remove a className to an element", function() {
        $("#main").removeClass("testClassName");
        expect(divMain.el.className.indexOf("testClassName")).toEqual(-1);    
    });

    it("should be able to verify if an element has a certain className", function() {
        $("#main").setClass("testClassName");
        expect($("#main").hasClass("testClassName")).toEqual(true);    
        expect($("#main").hasClass("34uy98fh934h98f43")).toEqual(false);    
    });

   it("should be able to bind events to an element and a callback function", function() {
        $("#main").bind("click", bindCallback);
        $("#main").el.dispatchEvent(eventClick);
        expect(document.testCallback).toEqual(true);    
    });

    it("should be able to unbind events to an element and a callback function", function() {
        document.testCallback = false;
        $("#main").unbind("click", bindCallback);
        $("#main").el.dispatchEvent(eventClick);
        expect(document.testCallback).toEqual(false);    
    });

    it("should be able to bind events to an element and multiple callback functions", function() {
        $("#main").bind("click", bindCallback);
        $("#main").bind("click", bindCallback2);
        $("#main").el.dispatchEvent(eventClick);
        expect(document.testCallback && document.testCallback2).toEqual(true);    
    });

    it("should be able to hide elements", function() {
        $("#main").hide();
        expect($("#main").el.style.display).toEqual("none");    
    });

    it("should be able to show elements", function() {
        $("#main").show();
        expect($("#main").el.style.display).toEqual("block");    
    });

    it("should be able to do Ajax calls, obtain a result and run a callback function", function() {
        runs(function() {
            $.ajax({
                url: "spec/MootorSpec.js", 
                callback: function(result) { $.testAjaxCallback = true; $.testAjaxCallbackResult = result; }
            });
        });
        waits(300) // Limit in milliseconds
        runs(function() {
            expect(
                $.testAjaxCallback && $.testAjaxCallbackResult.indexOf("testAjaxCallbackResult") > -1
            ).toEqual(true);    
        });
    });

    /**

    it("should be able to load HTML content into an element", function() {
        expect(false).toEqual(true);    
    });

    it("should be able to store data client-side", function() {
        expect(false).toEqual(true);    
    });
    ***/

});