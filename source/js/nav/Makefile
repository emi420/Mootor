PACKAGE=nav
VERSION=lastest
RELEASE_DIR=release
COPY_DIR=../../../js/plugins
RELEASE_FILE= $(PACKAGE)-$(VERSION).js
RELEASE_FILE_MIN= $(PACKAGE)-$(VERSION).min.js
COPY_FILE=$(PACKAGE).js

all:
	@@echo "Building..."
	@@cat _header.js\
	      nav.js\
	      header.js\
	      footer.js\
	      panel.js\
	      _footer.js\
	      > $(RELEASE_DIR)/$(RELEASE_FILE)
	@@echo "Build completed."
	@@cp $(RELEASE_DIR)/$(RELEASE_FILE) $(COPY_DIR)/$(COPY_FILE)
	@@echo "Build completed."


