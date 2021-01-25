# FVC

File Version Control (FVC) is a CLI tool designed to give automated version control abilities (similar to Git) to those working with binary and media files, where traditional version control is not possible. This package is designed to increase productivity and organization, not to reduce the size of archived files similar to git.

## Future features

* GUI Interface
  * A small application to view local archives and graphically interact with FVC features.

* Branching
  * Ability to switch between file branches (Debating weather it is necessary as a merge is not possible)

## Updating

* Simply go to the folder where you cloned the repo initially and run the following commands.

    ```bash
    git pull
    npm install
    ```

## How to set up

1. Clone the repo

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

* FVC Ignore
  * You can creat a ```.fvcignore``` file in the root of the project and specify any files you wish to exclude from the archive.

## List of commands

### Notes: In example <> refers to required peramater & [] refers to optional peramaters

### Notes: Use ```fvc --help``` for console hlep and list of commands and flags

* init
  * Example: ```fvc init```
  * Description: Creates a new FVC archive in the project folder.

* save
  * Example: ```fvc save <message>```
  * Description: Saves a new log in your archive.

* info
  * Example: ```fvc info```
  * Description: Displays archive info.

* list
  * Example: ```fvc list```
  * Description: List archives.

* restore
  * Example: ```fvc restore <archive_id>```
  * Description: Overwrite files in working directory with archived.
  * Flags
    * -f, --full: Removes all files in working directory and copies archived.

* destroy
  * Example: ```fvc destroy [archive_id]```
  * Description: Destroy FVC archive, or if archive_id is passed, destroy a single archive.

## Windows Command not found Issue ([More Info](https://stackoverflow.com/questions/27864040/fixing-npm-path-in-windows-8-and-10))

This is a common issue with Node and NPM (not FVC). We need to update the path variable to include the Node and NPM binary files so they are globally accessable.

1. Use the global Search Charm to search "Environment Variables"

2. Click "Edit system environment variables"

3. Click "New"

4. Add NPM path ```C:\Users\{yourName}\AppData\Roaming\npm```

## Created by Jack Woodrow for Jasmin Dyer ❤
