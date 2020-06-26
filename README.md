## Node.js Proxy for Asterisk PBX

Astproxy is a proxy between [Asterisk PBX system](https://www.asterisk.org/) and your application. It provides the possibility to send *commands* and to receive *events* from Asterisk offering an *abstraction layer* of data to always remain independent from the specific version of the PBX and to offer the possibiity to extend its functionalities to even support other type of PBX systems.

### Requirements

Node.js v10 LTS (10.19.0) or later.

### Asterisk versions supported

[Asterisk v13.](https://wiki.asterisk.org/wiki/display/AST/Asterisk+13+Documentation)

### Installation

This is a [Node.js](https://nodejs.org/en/) module available through the [npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).

Install with npm:
```
npm i astproxy --save
```

### Features

- Configuration by JSON files
- Send command to Asterisk
- Receive events from Asterisk
- Provides all the JSON data about:
  - extensions
  - queues
  - parkings
  - call conversation
- Runtime reloading

### Use Cases

An example of use cases could be:

- originate a new call, answer to an incoming call, hangup a call
- obtain all the extensions status: online, busy, ringing, offline, dnd, ...
- obtain information about all phone conversations
