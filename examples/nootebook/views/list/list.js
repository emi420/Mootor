(function ($) {

    "use strict";
    
    var view = m.app.view("list");
    
    console.log("view",view);
    view.on("load", function() {
        initNotesList();
        //getRemoteNotes();
    });

    function getRemoteNotes() {
        $.ajax({url:"https://dev.voolks.com/classes/note/", 
            headers: {"X-Voolks-Api-Key":"1234", "X-Voolks-Session-Id": "dronsqs4wk695kjk3pnhwscoofn3s6fq"}, 
            success: processRemoteNotes
        });        
    }

    function processRemoveNotes(r) {
        console.log(r.response);
    }

    var goToLogin = function () {
        m.app.go("");
    }

    var goToNote = function (id) {
        m.app.go("#compose/"+id);
    }

    $("#new").on("tap click", function(e) {
        goToNote("new");
        e.preventDefault();
    });

    function initNotesList() {
        $(".note-container .note:not(#note-template)").remove();

        for (var n in window.notes) {
            var $noteElement = $("#note-template").clone();
            $noteElement.attr("id",n);
            $noteElement.html(window.notes[n].text);
            $noteElement.appendTo(".note-container");
            
            $noteElement.on("tap click", function(e) {
                goToNote(e.target.id);
                e.preventDefault();
            });


        }
    }
    
}(window.$));