(function ($) {

    "use strict";
    
    var view = m.app.view("list");
    
    console.log("adding onload");
    view.on("load", function() {
        //initNotesList();
        getRemoteNotes();
    });

    function getRemoteNotes() {
        $.ajax({url:"https://dev.voolks.com/classes/note/", 
            headers: m.app.settings("headers"), 
            success: processRemoteNotes
        });        
    }

    function processRemoteNotes(r) {
        if (r.result) {
            window.notes = r.result;
            initNotesList();
        }
        else {
            console.error(r);
        }
        
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
            $noteElement.attr("id",window.notes[n].id);
            $noteElement.html(window.notes[n].text);
            $noteElement.appendTo(".note-container");
            
            $noteElement.on("tap click", function(e) {
                goToNote(e.target.id);
                e.preventDefault();
            });


        }
    }
    
}(window.$));