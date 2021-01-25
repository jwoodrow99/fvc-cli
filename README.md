# FVC

File Version Control (FVC) is a CLI tool designed to give automated version control abilities (similar to Git) to thoes working with binary and media files, where traditional version control is not possible.

## How to set up

1. Clone the repo

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

## List of commands

### Notes: In example <> refers to required peramater & [] refers to optional peramaters.

* init (Implimented)
  * Example: ```fvc init```
  * Description: Creates a new FVC archive in the project folder.

* save (Implimented)
  * Example: ```fvc save <message>```
  * Description: Saves a new log in your archive.

* list (Working On)
  * Example: ```fvc save```
  * Description: Saves a new log in your archive.

* restore (Working On)
  * Example: ```fvc save```
  * Description: Saves a new log in your archive.

* destroy (Working On)
  * Example: ```fvc save```
  * Description: Saves a new log in your archive.
