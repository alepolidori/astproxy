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

### Quick Start

The quickest way to get started is to execute the following steps:

1. install the executable:

```sh
npm install astproxy
```

2. Include the library:

```js
const astproxy = require('../index');
```

3. Configure `astproxy'

`astproxy` uses [Asterisk AMI](https://wiki.asterisk.org/wiki/display/AST/The+Asterisk+Manager+TCP+IP+API) to communicate with Asterisk, so it needs some information to connect to it:

```js
astproxy.config({
  port: 5038,
  host: 'localhost',
  username: '<USERNAME>',
  password: '<PASSWORD>',
  reconnect: true,
  reconnect_after: 3000
});
```
The credentials are usually present into `/etc/asterisk/manager.conf`.

4. Configure Asterisk objects and codes

Asterisk manages different kind of objects, such as *extensions, queues, trunks and parkings.* Some of them use the same technology, for example both extensions and trunks can use PJSIP protocol. In order to disinguish them, `astproxy` needs to know some data about them, such as their names. In addition you can specifiy some feature codes to have some Asterisk feature using commands.

```js
astproxy.configAstObjects({
  trunks: {
    'TWT_PJSIP': {
      'tech': 'pjsip',
      'trunkid': '1',
      'name': 'TWT_PJSIP',
      'usercontext': '',
      'maxchans': ''
    }
  },
  queues: {
    '4001': {
      'id': '4001',
      'name': 'queue4001',
      'dynmembers': [
        '2001',
        '2002',
        '2003'
      ],
      'sla': '60'
    }
  },
  feature_codes: {
    'pickup': '**',
    'dnd_toggle': '*76',
    'meetme_conf': '987',
    'incall_audio': '1987',
    'que_toggle': '*45'
  }
});
```

5. Configure extensions names:

```js
astproxy.configExtenNames({
  'user1': {
    'name': 'User1',
    'endpoints': {
      'mainextension': {
        '2001': {}
      },
      'extension': {
        '2001': {}
      }
    }
  }
});
```

in this case the extension `2001` has the name `User1`.

6. Start the module:

```js
astproxy.start();
```

At this point `astproxy` is ready to be used.

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
