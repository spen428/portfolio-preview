# Portfolio/API

<div style="text-align: center"><img alt="Logo" src="../web/public/logo.svg" height="128" /></div>

This is a simple **Express** server that reads JSON files as serves their data under several endpoints. Please refer to
the parent directory's README for any details which may be missing here.

The purpose of this separation of data from the web project is to keep the personal data pertaining to my portfolio off
of the public internet, and also to open up the possibility for the live management of the website via a 'back office'.

## Configuration

- Dummy data exists under `res/dummy[/subfolder]/*.json` while real data containing sensitive information should be
  placed under `res/data[/subfolder]/*.json` before building, and **not** committed to the repository.
- Data is read from `$srcDir/../res/dummy` in development, and from the volume mounted at `/data` in production.
