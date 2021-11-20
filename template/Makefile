DOCS=*.md
META=metadata.yaml

OUTPUT=dist
FILENAME=main

all: prepare pdf odt

prepare:
	@if [ ! -d $(OUTPUT) ]; then mkdir $(OUTPUT); fi

pdf: prepare $(DOCS)
	@echo Exporting pdf file
	@pandoc -s  $(META) \
	-f markdown+smart  \
	$(DOCS) -o $(OUTPUT)/$(FILENAME).pdf \
	--pdf-engine=xelatex \
	--highlight-style=tango \

odt: prepare $(DOCS)
	@echo Exporting odt file
	@pandoc -s -f markdown $(META) $(DOCS) -o $(OUTPUT)/$(FILENAME).odt

clean:
	@rm -fvr dist

.PHONY: all prepare pdf odt clean
