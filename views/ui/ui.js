(function() {

    // Switch
    var mySwitch = $("#moo-ui-switch-1").ui({
        type: "Switch",
        value: window.localStorage.getItem("moo-switch-1")
    });    
    mySwitch.on("change", function() {
        window.localStorage.setItem("moo-switch-1", this.value);
    });
    
    // Text
    var myText = $("#moo-ui-text-1").ui({
        type: "Text",
        value: window.localStorage.getItem("moo-text-1")
    });
    myText.on("change", function() {
        window.localStorage.setItem("moo-text-1", this.value);
    });
    
    // TextArea
    $("#moo-ui-textarea-1").ui({
        type: "TextArea"
    });
    
    // Select
    $("#moo-ui-select-1").ui({
        type: "Select",
    });
    
    // Multiple select
    $("#moo-ui-select-multiple-1").ui({
        type: "SelectMultiple",
    });
    
    // Radio
    $("#moo-ui-radio-1").ui({
        type: "Radio",
    });
    
    // Checkbox
    $("#moo-ui-checkbox-1").ui({
        type: "Checkbox",
    });
        
}());