# Blue Generator

![build status](https://gitlab.com/sapir-optimizations/blue-generator/microservice-generator/badges/master/build.svg)

NOTE: this generator is based on template files located in [microservice-template](https://gitlab.com/sapir-optimizations/blue-generator/microservice-template) repository on gitlab.

### Overview
Blue Generator is a tool to initialize a working microservice template project ready to run, test and deploy.

### Requirements 
`Git` should be installed before using this tool.

This tool is using `git` to `fetch` template options from a remote repository and to `clone` the selected template.

### Installation

To install the generator run:

```
npm install --global https://github.com/blue-stream/blue-stream-generator
```

### Generating a project
Run: 
```
blue-generator
```

Answer questions about your project

* Project name
* Main feature name
* Features to apply

### Example

<span style="color:green">√</span> &nbsp; Fetching templates from git repository

<span style="color:green">?</span> &nbsp; What project template would you like to generate? `root`

<span style="color:green">?</span> &nbsp; Project name: `example-project`

<span style="color:green">?</span> &nbsp; Main feature name: `user`

<span style="color:green">√</span> &nbsp; Generating template files

```
┌────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                    │
│    .d8888b.                                             888                                        │
│   d88P  Y88b                                            888                                        │
│   888    888                                            888                                        │
│   888         .d88b.  88888b.   .d88b.  888d888 8888b.  888888 .d88b.  888d888                     │
│   888  88888 d8P  Y8b 888 "88b d8P  Y8b 888P"      "88b 888   d88""88b 888P"                       │
│   888    888 88888888 888  888 88888888 888    .d888888 888   888  888 888                         │
│   Y88b  d88P Y8b.     888  888 Y8b.     888    888  888 Y88b. Y88..88P 888                         │
│    "Y8888P88  "Y8888  888  888  "Y8888  888    "Y888888  "Y888 "Y88P"  888                         │
│                                                                                                    │
│                                                                                                    │
│                                                                                by Ron Borysovski   │
│                                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────────────────────┘

? Project name: example-project
? Main feature name: user
✔ Fetching template
✔ Fetching available features
? Select features to enable MongoDB, Error Handler, Authentication using JWT
✔ Applying features
┌────────────────────────────────────────┐
│                                        │
│   Template is ready!                   │
│   To run your project:                 │
│               cd example-project       │
│               npm install              │
│               npm start                │
│                                        │
│                                        │
└────────────────────────────────────────┘
```


Will generate the following structure

```
example-project
   |____ src
   |      |____ user
   |      |       |____ user.router.ts
   |      |       |____ user.router.ts
   |      |       |____ user.controller.ts
   :      :       :
   |      |       |____ user.interface.ts
   |     config.ts
   |     server.ts
   :      :     
```

### Running a project

After generating a project named example-project

``` 
cd example-project 
npm install
npm start
```

### Running unit tests

``` 
npm test
```

Tests are executed with `Mocha` and `Chai`

