(function ($) {

    "use strict";
    
    var view = m.app.view("compose");
    
    view.on("load", function() {
        var newval;
        
        if (window.notes[view.params[0]]) {
            newval = window.notes[view.params[0]].text;    
        }
        else {
            newval = "";
        }
        $("textarea").val(newval);
       
    });

    $("#save").on("tap click", function(e) {
        var note;
        if (!window.notes[view.params[0]]) {
            note = {};
            window.notes.push(note);
        }
        else {
            note = window.notes[view.params[0]];
        }
        note.text = $("textarea").val();
        
        m.app.go("#list/perdielnombredeusuario");

        e.preventDefault();
    });

    
}(window.$));