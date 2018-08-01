# Blue Generator

![build status](https://gitlab.com/sapir-optimizations/blue-generator/microservice-generator/badges/master/build.svg)

NOTE: this generator is based on template files located in [microservice-template](https://gitlab.com/sapir-optimizations/blue-generator/microservice-template) repository on gitlab.

### Overview
Blue Generator is a tool to initialize a working microservice template project ready to run, test and deploy.

### Requirements 
`Git` should be installed before using this tool.

This tool is using `git` to `fetch` template options from a remote repository and to `clone` the selected template.

### Getting Started
To install the generator using https:
```
npm install -g git+https://gitlab.com/sapir-optimizations/blue-generator/microservice-generator
```

or using ssh:
```
npm install -g git+ssh://gitlab.com:sapir-optimizations/blue-generator/microservice-generator.git
```

### Generating a project
Run: 
```
blue-generator
```

Answer questions about your project

* Project name
* Project template
* Main feature name

### Example

<span style="color:green">√</span> &nbsp; Fetching templates from git repository

<span style="color:green">?</span> &nbsp; What project template would you like to generate? `root`

<span style="color:green">?</span> &nbsp; Project name: `example-project`

<span style="color:green">?</span> &nbsp; Main feature name: `user`

<span style="color:green">√</span> &nbsp; Generating template files

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

