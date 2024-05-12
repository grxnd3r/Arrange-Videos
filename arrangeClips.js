const fs = require('fs');
const path = require('path');

const directoryPath = './';

const targetsAndDestinations =
{
    "Apex Legends": {
        "regex": ["Apex-Legends*", "Apex Legends*"],
        "destination": "Apex Legends",
    },
    "Battlefield 3": {
        "regex": ["Battlefield-3*"],
        "destination": "Battlefield 3",
    },
    "Battlefield 2042": {
        "regex": ["Battlefield™-2042*"],
        "destination": "Battlefield 2042",
    },
    "Battlefield 4": {
        "regex": ["Battlefield 4*"],
        "destination": "Battlefield 4",
    },
    "Battlefield V": {
        "regex": ["Battlefield V*"],
        "destination": "Battlefield V",
    },
    "Brawlhalla": {
        "regex": ["Brawlhalla*"],
        "destination": "Brawlhalla",
    },
    "Call of Duty Black Ops 3": {
        "regex": ["Call of Duty  Black Ops 3*"],
        "destination": "Call of Duty Black Ops 3",
    },
    "Call of Duty Modern Warfare 2 (2022)": {
        "regex": ["Call of Duty  Modern Warfare 2 (2022)*"],
        "destination": "Call of Duty Modern Warfare 2 (2022)",
    },
    "Call of Duty": {
        "regex": ["Call of Duty*"],
        "destination": "Call of Duty",
    },
    "Celeste": {
        "regex": ["Celeste*"],
        "destination": "Celeste",
    },
    "Counter Strike Global Offensive": {
        "regex": ["Counter-strike*"],
        "destination": "Counter-strike Global Offensive",
    },
    "Cyberpunk 2077": {
        "regex": ["Cyberpunk-2077*"],
        "destination": "Cyberpunk 2077",
    },
    "Desktop": {
        "regex": ["Desktop*"],
        "destination": "Desktop",
    },
    "HearthStone": {
        "regex": ["HearthStone*"],
        "destination": "HearthStone",
    },
    "HELLDIVERS": {
        "regex": ["HELLDIVERS*"],
        "destination": "HELLDIVERS",
    },
    "League of legends": {
        "regex": ["League-of-legends*", "League of Legends*", "League-of-Legends*"],
        "destination": "League of Legends",
    },
    "Lethal Company": {
        "regex": ["Lethal-Company*"],
        "destination": "Lethal Company",
    },
    "Lost Ark": {
        "regex": ["Lost Ark*"],
        "destination": "Lost Ark",
    },
    "Minecraft": {
        "regex": ["Minecraft*"],
        "destination": "Minecraft",
    },
    "Overwatch": {
        "regex": ["Overwatch*"],
        "destination": "Overwatch",
    },
    "osu!": {
        "regex": ["osu!*", "Osu!*"],
        "destination": "osu!",
    },
    "Sons of the Forest": {
        "regex": ["Sons Of The Forest*"],
        "destination": "Sons of the Forest",
    },
    "Terraria": {
        "regex": ["Terraria*"],
        "destination": "Terraria",
    },
    "Tom Clancy's Rainbow Six Siege": {
        "regex": ["Tom Clancy's Rainbow Six  Siege*"],
        "destination": "Rainbow Six Siege",
    },
    "Undertale": {
        "regex": ["Undertale*"],
        "destination": "Undertale",
    },
    "Valorant": {
        "regex": ["Valorant*", "VALORANT*"],
        "destination": "Valorant",
    },
    "Warframe": {
        "regex": ["Warframe*"],
        "destination": "Warframe",
    },
}

// resetFiles(); // for testing, reset files to their original state
arrangeFiles();


// functions
function moveFilesToDestination(game) 
{
    // get every files with regex and move them to the destination
    const regexes = targetsAndDestinations[game].regex;
    regexes.forEach(function(regex) 
    {
        const files = getFilesFromRegex(regex);
        files.forEach(function(file) 
        {
            if ( isFolder(file) ) return;

            const oldPath = path.join(directoryPath, file);
            let newPath = path.join(directoryPath, targetsAndDestinations[game].destination, file);
            if ( !folderExists(targetsAndDestinations[game].destination) )
            {
                fs.mkdirSync(path.join(directoryPath, targetsAndDestinations[game].destination));
            }

            if ( fs.existsSync(newPath) ) 
            {
                // rename newPath to filename + datetime + extension
                const date = new Date();
                const datetime = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
                newPath = path.join(directoryPath, targetsAndDestinations[game].destination, `${path.parse(file).name}-${datetime}${path.extname(file)}`);
                fs.renameSync(oldPath, newPath);
                // console.log(`File ${file} already exists and was renamed to ${path.basename(newPath)}`);
            }
            else 
            {
                fs.renameSync(oldPath, newPath);
                // console.log(`Moved ${file} to ${targetsAndDestinations[game].destination}`);
            }

        });
    });
}

function getFilesFromRegex(regex)
{
    // get every files with regex
    return fs.readdirSync(directoryPath).filter(file => file.match(regex));
}

function folderExists(folder) 
{
    // check if folder exists
    return fs.existsSync(path.join(directoryPath, folder));
}

function isFolder(file) 
{
    // check if file is a folder
    return fs.lstatSync(path.join(directoryPath, file)).isDirectory();
}

function arrangeFiles() 
{
    for (const [game, instructions] of Object.entries(targetsAndDestinations)) {
        moveFilesToDestination(game);
    }
}

function resetFiles()
{
    const everyFolders = fs.readdirSync(directoryPath).filter(file => fs.lstatSync(path.join(directoryPath, file)).isDirectory());

    everyFolders.forEach(function(folder) {
        // get every files in the folder, put this file in ../ and delete the folder
        const files = fs.readdirSync(path.join(directoryPath, folder));
        files.forEach(function(file) 
        {
            fs.renameSync(path.join(directoryPath, folder, file), path.join(directoryPath, file));
            // console.log(`Moved ${file} to ${directoryPath}`);
        });
        
        fs.rmdirSync(path.join(directoryPath, folder));
    });
}