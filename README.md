# Markdown Helper

A tool that sets up a structured [markdown] project containing basic configuration to
generate pdf or other file formats from markdown via [pandoc].

By default it is set to create `.pdf` and `.odt` files.
You can add new file formats or change the existing ones in the [Makefile].

> Since it still under development and it was not published to any npm registry, the name of the tool is subject to change.

## Requirements

- gnu make
- pandoc
- git

On a deb-based linux distro you can run:

```bash
sudo apt install make pandoc git
```

## How to use

1. Start a new project by runing the command

```bash
markdown-helper create [DIRNAME]
```

This creates a new directory containing all the files that you need.

> If you don't provide a valid directory name for the `DIRNAME` param,
> `md2pdf` will create a new directory with the default value `markdown-project`

2. Build the files

On the terminal, go into the recently created directory and run the command

```bash
make
```

You'll find the newly created files under the `dist` directory.

## Default available make commands

### `make`

Generate all the file formats configured in the `Makefile`

### `make pdf`

Generate only `.pdf` file

### `make odt`

Generate only `.odt` file

### `make clean`

Remove all generated files

## Project file structure

Inside the project folder you'll find a few files:

### `main.md`

This is your markdown document. Since the
Makefile looks for any `.md` in the current directory,
you can create more files or rename them as you wish.

### `Makefile`

This is the file used by `GNU make` to generate your output files. Here you'll find the steps and settings used to generate them. Feel free to add or change the settings as needed.

### `metadata.yaml`

This is a metadata file which sets a few headers and layout options.

## Version control

The project is created with an already initialized git repo.
Feel free to tweak around.

[pandoc]: https://pandoc.org
[markdown]: https://daringfireball.net/projects/markdown/
[makefile]: https://www.gnu.org/software/make/manual/make.html#Introduction


## Todo

* Create script sctructure :+1:
* Copy template files to new directory :+1:
* Init git repo :+1:
* First commit :+1:
* Handle basic edge cases
  * Prevent crash when no values are passed
  * Show usage help message
* Publish package on npm