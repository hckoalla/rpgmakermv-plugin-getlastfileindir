# GetLastFileInDirectory.js

## Description

This plugin allows you to retrieve the last file in a specified directory in your RPG Maker MV game, using JavaScript to interact with the file system.

## Features

- Get the most recently modified file from a given directory.
- Specify a custom subdirectory or use a default directory path.
- Display the result in the game message window.

## Installation

1. Download the `GetLastFileInDirectory.js` file.
2. Place it in the `js/plugins` folder of your RPG Maker MV project.
3. Open RPG Maker MV and go to the Plugin Manager.
4. Add the `GetLastFileInDirectory` plugin to your project.

## Plugin Parameters

- **Default Directory (`dir`)**: The default directory path relative to the game root (default is `os.homedir()`).
  
  You can set your custom path here if desired. If no path is provided, the default directory will be used.

## Usage

To use the plugin, you can call the plugin command `getLastFileInDir` followed by an optional subdirectory name.

Example:

getLastFileInDir Downloads

If no subdirectory is provided, the default directory will be used.

## Example Command

getLastFileInDir subfolder

This will check the `subfolder` directory inside the default directory and return the most recently modified file.

If no subdirectory is provided, it uses the default path.

## Error Handling

- If the specified directory does not exist, a message will be displayed: `The directory '{directory}' was not found!`
- If no files are found in the directory, the message will read: `No files found in the directory '{directory}'.`
- If there is an error accessing the files, the message will read: `Error accessing files in the directory '{directory}'.`

## Future Integration

This plugin can be part of a larger project, but now is WIP.
