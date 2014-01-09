PACKAGE=mootor
VERSION=troomo
RELEASE_DIR=../release
COPY_DIR=../../dist/js
RELEASE_FILE= $(PACKAGE)-$(VERSION).js
COPY_FILE=$(PACKAGE).js

all:
	@@echo "Building..."
	@@cat app/_header.js\
	      app/view.js\
	      app/_footer.js\
	      > $(RELEASE_DIR)/$(RELEASE_FILE)
	@@cp $(RELEASE_DIR)/$(RELEASE_FILE) $(COPY_DIR)/$(COPY_FILE)
	@@echo "Build completed."


