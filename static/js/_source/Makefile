PACKAGE=mootor
SRC_DIR=src
VERSION=` date "+%Y.%m%d" `
RELEASE_DIR=release
COPY_DIR=..
RELEASE_FILE= $(PACKAGE)-$(VERSION).js
COPY_FILE=$(PACKAGE).js

all:
	@@echo "Building..."
	@@cat $(SRC_DIR)/core.js $(SRC_DIR)/nav.js $(SRC_DIR)/form.js $(SRC_DIR)/catalog.js > $(RELEASE_DIR)/$(RELEASE_FILE)
	@@echo "Build completed."
	@@cp $(RELEASE_DIR)/$(RELEASE_FILE) $(COPY_DIR)/$(COPY_FILE)
