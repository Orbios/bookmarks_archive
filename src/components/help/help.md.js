const content = `
### Introduction

Bookmarks Archive (*BA*) is a desktop program to store your Web Bookmarks. Over time number of bookmarks saved in your browser will grow and it is not very convenient to manage bookmarks collection in the browser itself.

*BA* provides an easy and convenient way to work with your bookmarks collection no matter how big it is.

### Functionality

You can import bookmarks from any major browser. First export bookmarks as HTML file. Then use that HTML file to import bookmarks into *BA*. You can import bookmarks in that way a few times, each bookmark will be imported just once.

If a bookmark is located is some sub-folder this information will be saved for that bookmark in *original path*.

You can edit bookmarks, create tags, assign tags to bookmarks. Tags will allow you to search for bookmarks later on.

*BA* has several filtering modes that allow you to search for bookmarks based on different criteria. You can search for new ones (with no tags), bookmarks with particular tags (at least one of selected) or deleted bookmarks.

For each filter mode, you can search by text. It will search in bookmark *title*, *url* and *original path*.

### Settings

Bookmarks data is stored as JSON file in '*PATH*/bookmarks.json' (by default), you can change that location to something else.

* *PATH*: Per-user application data directory, which by default points to:
    - %APPDATA% on Windows
    - $XDG_CONFIG_HOME or ~/.config on Linux
    - ~/Library/Application Support on macOS

The directory for storing your app's configuration files, which by default is the appData directory appended with your app's name.

### Tips

There are some keyboard shortcuts:

* Ctrl+R: reload page
* Ctrl+W: close program
* Esc: close modal or close tag list selection

It may be convenient to use tags names like folder structure:

* Programming/JavaScript
* Programming/JavaScript/ES6
* Programming/CSS
`;

export default content;
