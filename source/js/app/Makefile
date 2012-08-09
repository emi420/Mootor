PACKAGE=app
VERSION=lastest
RELEASE_DIR=release
COPY_DIR=../../../js/plugins
RELEASE_FILE= $(PACKAGE)-$(VERSION).js
COPY_FILE=$(PACKAGE).js

all:
	@@echo "Building..."
	@@cat _header.js\
	      app.js\
	      model.js\
	      _footer.js\
	      > $(RELEASE_DIR)/$(RELEASE_FILE)
	@@echo "Build completed."
	@@cp $(RELEASE_DIR)/$(RELEASE_FILE) $(COPY_DIR)/$(COPY_FILE)
	@@echo "Build completed."


