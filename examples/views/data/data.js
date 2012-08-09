(function($) {

    "use strict";

    // Get application by id
    var app = $("demo").app();
    
    /*
     * Data model
     */ 
     
    var myModel = function(options) {
        this.id = options.id;
        this.switch = options.switch;
        this.text = options.text;
        this.textarea = options.textarea;
        this.select = options.select;
        this.radio = options.radio;
        this.check = options.check;
        
        return this;
    };           
    app.models.myModel = app.Model({
        model: myModel,
        localStoragePrefix: "demo-mymodel"
    });
    
    /*
     *  View initialization
     */

    // Insert some sample data

    var record;
    
    if (app.models.myModel.count() === 0) {
        record = app.models.myModel.create({
            switch: 0,
            text: "And you run, and you run",
            textarea: "Is not the way it seems",
            select: "0",
            radio: "2",
            check: "2,4"
        });
    } else {
        record = app.models.myModel.get(1);
    }
    record.check = record.check.split(",");
   
    // Initialize UI

    var ui = {
        switch: $("#switch").ui({
            type: "Switch",
            value: record.switch,
        }),
        text: $("#text").ui({
            type: "Text",
            value: record.text,
        }),
        textarea: $("#textarea").ui({
            type: "TextArea",
            value: record.textarea,
        }),
        select: $("#select").ui({
            type: "Select",
            position: "bottom",
            value: record.select,
        }),
        radio: $("#radio").ui({
            type: "Radio",
            value: record.radio,
        }),
        check: $("#checkbox").ui({
            type: "Checkbox",
            value: record.check,
        }),       
        save: $("#save"),
    };
    
    app.data.set("dataUI", ui);
    
    /*
     * UI controllers
     */
    
    // Save button
    
    ui.save.onTapEnd(function() {
        record.switch = ui.switch.value;
        record.text = ui.text.value;
        record.textarea = ui.textarea.value;
        record.select = ui.select.value;
        record.radio = ui.radio.value;
        record.check = ui.check.value.join(",");

        record.put()
    });
    
}(window.Mootor));

