
var request = require('request');

var baseUrl = "https://api.benchling.com/v1";

function get(path, apiKey, opts, cb) {
  if(typeof opts === 'function') {
    cb = opts;
    opts = {};
  }
  opts = opts || {};

  request.get(baseUrl + path, {
    'auth': {
      'user': apiKey,
      'sendImmediately': true,
    },
    qs: opts
  }, cb)
}

function post(path, obj, apiKey, cb) {
  request.post(baseUrl + path, {
    'auth': {
      'user': apiKey,
      'sendImmediately': true
    },
    body: obj,
    json: true
  }, cb)
}

function patch(path, obj, apiKey, cb) {
  request.post(baseUrl + path, {
    'auth': {
      'user': apiKey,
      'sendImmediately': true
    },
    body: obj,
    json: true
  }, cb)
}

function del(path, id, apiKey, cb) {
  request.del(baseUrl + path, {
    'auth': {
      'user': apiKey,
      'sendImmediately': true
    },
    body: obj
  }, cb)
}

module.exports = function(apiVersion, apiKey) {
  if(apiVersion !== 1) throw new Error("Unsupported benchling API version");
  
  function objectList(path, opts, cb) {
    if(typeof opts === 'function') {
      cb = opts;
      opts = {}
    }
    opts = opts || {};
    
    get(path, apiKey, opts, function(err, resp, body) {
      if(err) return cb(err);
      if(resp.statusCode !== 200) return cb(new Error("Invalid response "+resp.statusCode+(body && (': '+body))));

      try {
        var o = JSON.parse(body);
      } catch(e) {
        return cb(e);
      }
      cb(null, o);
    })
  }

  function objectGet(path, id, opts, cb) {
    if(typeof opts === 'function') {
      cb = opts;
      opts = {}
    }
    opts = opts || {};
    
    get(path + encodeURIComponent(id), apiKey, opts, function(err, resp, body) {
      if(err) return cb(err);
      if(resp.statusCode !== 200) return cb(new Error("Invalid response "+resp.statusCode+(body && (': '+body))));

      try {
        var o = JSON.parse(body);
      } catch(e) {
        return cb(e);
      }
      cb(null, o);
    })
  }

  function objectCreate(path, obj, opts, cb) {
    if(typeof opts === 'function') {
      cb = opts;
      opts = {}
    }
    opts = opts || {};
    
    post(path, obj, apiKey, function(err, resp, body) {
      if(err) return cb(err);
      if(resp.statusCode !== 201) return cb(new Error("Invalid response "+resp.statusCode+(body && (': '+body))));

      try {
        var o = JSON.parse(body);
      } catch(e) {
        return cb(e);
      }
      cb(null, o);
    })
  }

  function objectUpdate(path, id, obj, opts, cb) {
    if(typeof opts === 'function') {
      cb = opts;
      opts = {}
    }
    opts = opts || {};
    
    patch(path, obj, apiKey, function(err, resp, body) {
      if(err) return cb(err);
      if(resp.statusCode !== 200) return cb(new Error("Invalid response "+resp.statusCode+(body && (': '+body))));

      try {
        var o = JSON.parse(body);
      } catch(e) {
        return cb(e);
      }
      cb(null, o);
    })
  }

  function objectDelete(path, id, obj, opts, cb) {
    if(typeof opts === 'function') {
      cb = opts;
      opts = {}
    }
    opts = opts || {};
    
    del(path, obj, apiKey, function(err, resp, body) {
      if(err) return cb(err);
      if(resp.statusCode !== 200) return cb(new Error("Invalid response "+resp.statusCode+(body && (': '+body))));

      try {
        var o = JSON.parse(body);
      } catch(e) {
        return cb(e);
      }
      cb(null, o);
    })
  }

  
  function sequenceList(opts, cb) {
    objectList('/sequences/', opts, cb)
  }

  function sequenceGet(id, opts, cb) {
    objectGet('/sequences/', id, opts, cb)
  }

  function sequenceCreate(obj, opts, cb) {
    objectCreate('/sequences/', obj, opts, cb)
  }

  function sequenceUpdate(id, obj, opts, cb) {
    objectUpdate('/sequences/', id, obj, opts, cb)
  }
  
  function sequenceDelete(id, opts, cb) {
    objectDelete('/sequences/', id, opts, cb)
  }
  
  function folderList(opts, cb) {
    objectList('/folders/', opts, cb)
  }

  function folderGet(id, opts, cb) {
    objectGet('/folder/', id, opts, cb)
  }

  function folderCreate(obj, opts, cb) {
    objectCreate('/folder/', obj, opts, cb)
  }

  function folderUpdate(id, obj, opts, cb) {
    objectUpdate('/folder/', id, obj, opts, cb)
  }
  
  function folderDelete(id, opts, cb) {
    objectDelete('/folder/', id, opts, cb)
  }


  return {
    sequence: {
      list: sequenceList,
      get: sequenceGet,
      create: sequenceCreate,
      update: sequenceUpdate,
      del: sequenceDelete
    },
    folder: {
      list: folderList,
      get: folderGet,
      create: folderCreate,
      update: folderUpdate,
      del: folderDelete,
    },
    folderItem: {
      // TODO implement
    }, 
    protein: {
      // TODO implement
    }
  }
};
