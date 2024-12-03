//=============================================================================
// GetLastFileInDirectory.js
//=============================================================================

/*:
 * @plugindesc Get the last file in a directory with JS in RPGMaker.
 * @author hckoalla
 *
 * @param dir
 * @text Default Directory
 * @desc The default directory path relative to the game root (default is 'os.homedir()')
 * @default D:\Users\hckoalla\
 *
 * @help Command:
 * 
 * Plugin Command: 
 * getLastFileInDir Downloads\
 *
 * Example:
 * getLastFileInDir subfolder
 * If no subDirectory is provided, it uses the default path.
 */

const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;

Game_Interpreter.prototype.pluginCommand = function (command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);

    if (command === "getLastFileInDir") {
        const customSubDir = args.length > 0 ? args.join(" ") : null;
        getLastFileInDir(customSubDir);
    }
};

const fs = require('fs');
const path = require('path');

function getLastFileInDir(customSubDir) {
    const parameters = PluginManager.parameters('GetLastFileInDirectory');
    const defaultDirectory = parameters['dir'] || os.homedir();

    const directory = customSubDir 
        ? path.join(defaultDirectory, customSubDir) 
        : defaultDirectory;

    if (!fs.existsSync(directory)) {
        $gameMessage.add(`The directory '${directory}' was not found!`);
        return;
    }

    const files = fs.readdirSync(directory).filter(file => {
        const filePath = path.join(directory, file);
        return fs.statSync(filePath).isFile();
    });

    if (files.length === 0) {
        $gameMessage.add(`No files found in the directory '${directory}'.`);
        return;
    }

    const filesWithStats = files.map(file => {
        const filePath = path.join(directory, file);
        try {
            return {
                name: file,
                time: fs.statSync(filePath).mtime.getTime(),
            };
        } catch (error) {
            console.error(`Error accessing file: ${filePath}`, error);
            return null;
        }
    }).filter(file => file !== null);

    if (filesWithStats.length === 0) {
        $gameMessage.add(`Error accessing files in the directory '${directory}'.`);
        return;
    }

    filesWithStats.sort((a, b) => b.time - a.time);

    const lastFileName = filesWithStats[0].name;
    $gameMessage.add(`Last file: ${lastFileName}`);
}
