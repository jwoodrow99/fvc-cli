# FVC

File Version Control (FVC) is a CLI tool designed to give automated version control abilities (similar to Git) to those working with binary and media files, where traditional version control is not possible. This package is designed to increase productivity and organization, not to reduce the size of archived files similar to git.

## Future features

* Branching
  * Ability to switch between file branches (Debating weather it is necessary as a merge is not possible)

* Timeline
  * Interactive timeline describing each archive record.

* Heat map
  * GitHub style heat map, showing how often you make saves.

## Updating

* Simply go to the folder where you cloned the repo initially and run the following commands.

    ```bash
    git pull
    npm install
    ```

## How to set up

### Required Software

* [Node.js](https://nodejs.org/en/)
* [Git](https://git-scm.com/)

1. Clone the repo (Preferably run commands in Git Bash on Windows or Terminal on MacOS \ Linux)

    ```bash
    git clone https://github.com/jwoodrow99/fvc.git
    cd fvc
    ```

2. Install dependencies

    ```bash
    npm install
    ```

3. Like application to CLI

    ```bash
    npm link
    ```

4. Run application (Known issues on windows "command not found" go to bottom for solution.)

    ```bash
    fvc
    ```

## List of features

* FVC Archive
  * Archive the working directory and basic version control tools.

* FVC Ignore
  * You can creat a ```.fvcignore``` file in the root of the project and specify any files you wish to exclude from the archive.

* FVC User Interface
  * In adition to the CLI tool there is a GUI interface which can be launched from the working directory using ```fvc-cli gui```.

## List of commands

### Notes: In example <> refers to required peramater & [] refers to optional peramaters

### Notes: Use ```fvc-cli --help``` for console hlep and list of commands and flags

* init
  * Example: ```fvc-cli init```
  * Description: Creates a new FVC archive in the project folder.

* save
  * Example: ```fvc-cli save <message>```
  * Description: Saves a new log in your archive. Message must be in quotations.

* info
  * Example: ```fvc-cli info```
  * Description: Displays archive info.

* list
  * Example: ```fvc-cli list```
  * Description: List archives.

* restore
  * Example: ```fvc-cli restore <record_id>```
  * Description: Overwrite files in working directory with archived.
  * Flags
    * -f, --full: Removes all files in working directory and copies archived.

* destroy
  * Example: ```fvc-cli destroy [record_id]```
  * Description: Destroy FVC archive, or if record_id is passed, destroy a single archive.

* gui
  * Example: ```fvc-cli gui [port]```
  * Description: Opens the GUI interface in working directory.

## Windows Command not found Issue ([More Info](https://stackoverflow.com/questions/27864040/fixing-npm-path-in-windows-8-and-10))

This is a common issue with Node and NPM (not FVC). We need to update the path variable to include the Node and NPM binary files so they are globally accessable.

1. Use the global Search to search "Environment Variables"

2. Click "Edit system environment variables"

3. Click "New"

4. Add NPM path ```C:\Users\{yourName}\AppData\Roaming\npm```

## Created by Jack Woodrow for Jasmin Dyer ❤
