const content = `
### Introduction

Bookmarks Archive (*BA*) is a desktop program that allows you to store your web bookmarks. 

As the number of bookmarks saved in your browser grows, it can become inconvenient to manage your collection within the browser itself.

*BA* provides an easy and convenient way to work with your bookmarks collection no matter how big it is.

### Functionality

*BA* allows you to **import bookmarks** from any major browser. To do so, you need to first export your bookmarks as an HTML file.  

Here's how to export bookmarks from Google Chrome as an HTML file:

1. Open Google Chrome and click on the three-dot icon in the top-right corner of the window;
2. Select "*Bookmarks*" from the drop-down menu and then click on "*Bookmark manager*";
3. In the Bookmark manager window, click on the three-dot icon in the top-right corner and select "*Export bookmarks*";
4. Choose a location on your computer where you want to save the HTML file, give it a name, and click on "*Save*".

Once you have the HTML file, you can use it to import bookmarks into *BA*. 

To store bookmarks data in the **cloud**, you can use Dropbox or Google Drive. Just create a folder in your **Dropbox** or **Google Drive** and set it as bookmarks data location.

You can import bookmarks multiple times, but each bookmark will be imported only once. 

If a bookmark is located in a sub-folder, this information will be saved for that bookmark in the "*original path*" field.

*BA* allows you to edit bookmarks, create tags, and assign tags to bookmarks. 

Using tags makes it easy to search for bookmarks later on. 

BA also has several filtering modes that allow you to search for bookmarks based on different criteria. 

You can search for bookmarks with no tags, bookmarks with particular tags (at least one of the selected tags), or deleted bookmarks. 

For each filter mode, you can search by text in the bookmark *title*, *URL*, and *original path*.

### Settings

*BA* stores bookmarks data as a JSON file in the *PATH*/bookmarks.json directory (by default), but you can change this location to something else. 

The **PATH** directory is the per-user application data directory, which by default points to:

- **%APPDATA%** on Windows
- **$XDG_CONFIG_HOME** or **~/.config** on Linux
- **~/Library/Application Support** on macOS

The directory for storing your app's configuration files, which by default is the appData directory appended with your app's name.

### Tips

Here are some keyboard shortcuts that you might find useful:

* Ctrl+R: Reload page
* Ctrl+W: Close program
* Esc: Close modal or close tag list selection

You may find it convenient to use tag names like folder structure, for example:

* Programming/JavaScript
* Programming/JavaScript/ES6
* Programming/CSS
`;

export default content;
