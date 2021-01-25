# FVC

File Version Control (FVC) is a CLI tool designed to give automated version control abilities (similar to Git) to thoes working with binary and media files, where traditional version control is not possible. This package is designed to increase productivity and organization, not to reduce the size of archived files similar to git.

## Future features

* GUI Interface
  * A small application to view local archives and graphically interact with FVC features.

* Branching
  * Ability to switch between file branches (Debating weather it is necessary as a merge is not possible)

## How to set up

1. Clone the repo

    ```bash
    git clone https://github.com/jwoodrow99/fvc.git
    ```

2. Install dependencies

    ```bash
    npm install
    ```

3. Like application to CLI

    ```bash
    npm link
    ```

4. Run application

    ```bash
    fvc
    ```

## List of features

* FVC Ignore
  * You can creat a ```.fvcignore``` file in the root of the project and specify any files you wish to exclude from the archive.

## List of commands

### Notes: In example <> refers to required peramater & [] refers to optional peramaters

### Notes: Use ```fvc --help``` for console hlep and list of commands and flags

* init (Implimented)
  * Example: ```fvc init```
  * Description: Creates a new FVC archive in the project folder.

* save (Implimented)
  * Example: ```fvc save <message>```
  * Description: Saves a new log in your archive.

* info (Implimented)
  * Example: ```fvc info```
  * Description: Displays archive info.

* list (Implimented)
  * Example: ```fvc list```
  * Description: List archives.

* restore (Implimented)
  * Example: ```fvc restore <archive_id>```
  * Description: Overwrite files in working directory with archived.
  * Flags
    * -f, --full: Removes all files in working directory and copies archived.

* destroy (Implimented)
  * Example: ```fvc destroy [archive_id]```
  * Description: Destroy FVC archive, or if archive_id is passed, destroy a single archive.

## Created by Jack Woodrow for Jasmin Dyer ❤
