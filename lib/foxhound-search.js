var search = Foxhound.modules.Search = function(el, handle_data){
  this.el = el;
  this.url = this.el.data('url');
  this._params = this.paramsFromURL(window.location.href) || {};
  this.handle_data = handle_data;

  this.bindEvents();
}

search.prototype.paramsFromURL = function(url){

  if (!/\?/.test(url)) return;

  var qs = url.split('?')[1],
      params = qs.split('&'),
      hashParams = {};

  for(var i=0; i < params.length; i++){
    var param = params[i],
        key = param.split('=')[0],
        value = param.split('=')[1] || '';

    hashParams[key] = value;
  }

  return hashParams;
}

search.prototype.bindEvents = function(){
  var ENTER = 13,
      self = this;

  self.el.on('keydown', function(event){
    if ( event.which != ENTER ) return;

    self._params = {};

    var value = self.el.val(),
        params = {};

    if (value.length > 0) params = { q: value }

    self.el.trigger('search', [params]);

    event.preventDefault();
    return;
  });

  self.el.on('search', function(event, params){
    self.paramsMerge(params);
    self.refreshUrl(self.buildQueryString(self._params));
    self.search();
  });
}

search.prototype.paramsMerge = function(params){
  for(var p in params){
    this._params[p] = params[p];
  }
}

search.prototype.refreshUrl = function(path){
  window.history.pushState("search", "Search", path);
}


search.prototype.buildQueryString = function(params){
  var qs = [];
  for(var p in params){
    qs.push( p + '=' + params[p] );
  }

  return (qs.length > 0) ? '?' + qs.join('&') : '';
}

search.prototype.search = function(params){
  var self = this,
      qs = self.buildQueryString(this._params),
      url = self.url + qs;

  $.getJSON(url)
    .done(function(data){
      self.handle_data(data, function(updatedData){
        self.el.trigger('results', [updatedData]);
      })
    })
}