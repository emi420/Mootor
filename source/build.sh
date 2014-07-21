#!/bin/bash 

cat js/clickfix.js \
    js/scrollfix.js \
    js/mootor.js \
    js/event.js \
    js/context.js \
    js/app.js \
    js/view.js \
    js/ui.js \
    js/uiapp.js \
    js/uiview.js \
    js/uipanel.js \
    js/router.js \
    js/route.js \
    js/uinavitem.js \
    js/uinavbar.js \
    js/uiheader.js \
    js/uifooter.js \
    js/uiloading.js \
    js/uiform.js \
    js/uiformvirtualinput.js \
    js/uiformgeo.js \
    js/uiformtext.js \
    js/uiformtextarea.js \
    js/uiformselect.js \
    js/uiformcheckbox.js \
    js/uiformoption.js \
    js/uiformdate.js \
    js/uiformtime.js \
    js/uibutton.js \
    js/uiformdraw.js \
    js/uiformcamera.js \
    js/uiformcamerasingle.js \
    > ../dist/js/mootor.js

rm -rf ../dist/img/*

mkdir ../dist/img/icons
mkdir ../dist/img/icons/white
mkdir ../dist/img/icons/black

cp img/icons/white/*.png ../dist/img/icons/white
cp img/icons/black/*.png ../dist/img/icons/black

cp css/*.css ../dist/css


