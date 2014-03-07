(function ($) {

    "use strict";
    
    var view = m.app.view("compose");
    
    view.on("load", function() {
        var newval;
        var note = getNoteById(view.params[0]);
        if (note) {
            newval = note.text;
            $(".header.edit").show();
            $(".header.new").hide();    
        }
        else {
            newval = "";
            $(".header.new").show();
            $(".header.edit").hide();    
        }
        $("textarea").val(newval);

        $("#save").on("tap click", function(e) {
            var note = {};
            note.id = view.params[0];
            note.text = $("textarea").val();

            if (!getNoteById(view.params[0])) {
                $.ajax({url:"https://dev.voolks.com/classes/note/",
                    data: JSON.stringify(note),
                    type: "POST",
                    headers: m.app.settings("headers"), 
                    success: processSaveNote,
                    error: processErrorNote
                });
            }
            else {
                $.ajax({url:"https://dev.voolks.com/classes/note/"+view.params[0]+"/",
                    data: JSON.stringify(note),
                    type: "PUT",
                    headers: m.app.settings("headers"), 
                    success: processSaveNote,
                    error: processErrorNote 
                });
            }
        
            e.preventDefault();
        });

       
    });
    function processSaveNote(r) {
        if (r.id) {
            m.app.go("#list/");
        }
        else {
            console.error(r);
        }

    }
    function processErrorNote(e) {
        throw(new Error(e));
    }

    function getNoteById(id) {
        for (var n in window.notes) {
            if (window.notes[n].id == id) {
                return window.notes[n];
            } 
        }
        return false;
    }
    
}(window.$));