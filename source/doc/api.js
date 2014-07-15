YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "App",
        "Context",
        "Event",
        "Route",
        "Router",
        "UI",
        "UIApp",
        "UIButton",
        "UIFooter",
        "UIForm",
        "UIFormCamera",
        "UIFormCheckbox",
        "UIFormDate",
        "UIFormDraw",
        "UIFormFieldset",
        "UIFormGeo",
        "UIFormInput",
        "UIFormOption",
        "UIFormPassword",
        "UIFormSelect",
        "UIFormText",
        "UIFormTextArea",
        "UIFormTime",
        "UIFormToggleSwitch",
        "UIFormVirtualInput",
        "UIHeader",
        "UILoading",
        "UINavBar",
        "UINavItem",
        "UIPanel",
        "UIView",
        "View",
        "window.m"
    ],
    "modules": [
        "App",
        "Mootor",
        "Router",
        "UI",
        "View"
    ],
    "allModules": [
        {
            "displayName": "App",
            "name": "App",
            "description": "The App class defines the main object of the applications"
        },
        {
            "displayName": "Mootor",
            "name": "Mootor",
            "description": "The Event class defines and manage events"
        },
        {
            "displayName": "Router",
            "name": "Router",
            "description": "The Route class is for defining a route"
        },
        {
            "displayName": "UI",
            "name": "UI",
            "description": "The UI class is the class for all user interface elements.\nIt is not directly used, but extended by many other classes."
        },
        {
            "displayName": "View",
            "name": "View",
            "description": "The View class handles each view of the application. \nA list of views is specified in the applications options\nand the files are loaded from the \"views\" folder.\nEach view has a viewName.js, viewName.html and viewName.css files."
        }
    ]
} };
});