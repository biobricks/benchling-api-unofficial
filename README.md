
An unofficial node.js module for accessing the [benchling](https://benchling.com/) API.

# Installation

```
npm install benchling-api-unofficial
```

# Setup

First you need an API key. Unfortunately the only way to get one currently seems to be to ask benchling support. Log in to benchling and use the bottom right icon to open a chat then ask support for API access. They can take a few days to reply. 

Once they enable API access log onto benchling once again, then go to your settings page by clicking the left bottom icon and find the 'settings' link near the top of the pop-up. Scroll to the bottom and you'll see a button called __Generate API key__. Click it and copy the key string.

Install dependencies and create a `settings.js` file:

```
npm install # <- only required if you cloned from git
cp settings.js.example settings.js
```

Edit the `settings.js` file setting the apiKey property to the API you copied from the benchling settings page.

Now you can try an example, e.g. to list all of your benchling sequences:

```
./examples/sequence_list.js
```

# Usage

Here's an example of listing all folders containing the string 'mySequences':

```
var benchling = require('benchling-api-unofficial')(1, '<myApiKey>');

benchling.folder.list({query: 'mySequences'}, function(err, data) {
  if(data) return console.error(err);

  console.log(data);
});
```

# API 

Currently only a subset of the full API is implemented.

All functions return one or two arguments: `err, [data]`.

The following functions are available:

## sequence

* sequence.list([opts], cb)
* sequence.get(id, [opts], cb)
* sequence.create(obj, [opts], cb)
* sequence.update(id, obj, [opts], cb)
* sequence.del(id, [opts], cb)

## folder

* folder.list([opts], cb)
* folder.get(id, [opts], cb)
* folder.create(obj, [opts], cb)
* folder.update(id, obj, [opts], cb)
* folder.del(id, [opts], cb)

See the [official benchling API documentation](https://api.benchling.com/docs/) for more info.


# Legal

Copyright 2017 BioBricks Foundation.

License: AGPLv3.

Benchling is not in any way affiliated with the BioBricks Foundation nor this git project nor any of the authors of this project and neither the BioBricks Foundation nor this git project is in any way endorsed by Benchling.
