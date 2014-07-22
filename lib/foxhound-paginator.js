var paginator = Foxhound.modules.Paginator = function(el){
  this.el = el;
  this.page = this.per_page = this.total = null;

  this.bindEvents();
  this.bindNavElements();
}

paginator.prototype.bindEvents = function(){
  var self = this;

  self.el.on('update', function(event, page, per_page, total){
    self.update(page, per_page, total);
  });

  self.el.on('first', function(){
    self.first();
  });

  self.el.on('previous', function(){
    self.previous();
  });

  self.el.on('next', function(){
    self.next();
  });

  self.el.on('last', function(){
    self.last();
  });

  self.el.on('goto', function(event, page){
    self.goTo(page);
  });
}

paginator.prototype.bindNavElements = function(){
  var self = this;

  self.el.find('*[fh-per-page]').on('click', function(e){
    var perPage = parseInt($(this).attr('fh-per-page'));

    self.el.trigger('paginate!', [1, perPage]);

    e.preventDefault();
    return;
  })

  self.el.find('*[fh-first]').on('click', function(e){
    self.el.trigger('first');
    e.preventDefault();
    return;
  })

  self.el.find('*[fh-last]').on('click', function(e){
    self.el.trigger('last');
    e.preventDefault();
    return;
  })

  self.el.find('*[fh-last]').on('click', function(e){
    self.el.trigger('last');
    e.preventDefault();
    return;
  })

  self.el.find('*[fh-previous]').on('click', function(e){
    self.el.trigger('previous');
    e.preventDefault();
    return;
  })

  self.el.find('*[fh-next]').on('click', function(e){
    self.el.trigger('next');
    e.preventDefault();
    return;
  })
}

paginator.prototype.update = function(page, per_page, total){
  this.page = page;
  this.per_page = per_page;
  this.total = total;

  this.el.data('page', page);
  this.el.data('per_page', per_page);
  this.el.data('total', total);

  this.el.trigger('updatedparams', [page, per_page, total]);
}

paginator.prototype.goTo = function(page){
  var totalPages = Math.ceil(this.total / this.per_page);

  if (page <= 0){
    page = 1;
  } else if(page > totalPages){
    page = totalPages;
  } else {
    page = page;
  }

  this.page = page;
  this.el.trigger('paginate!', [this.page, this.per_page]);
}

paginator.prototype.next = function(){
  this.goTo(this.page + 1);
}

paginator.prototype.previous = function(){
  this.goTo(this.page - 1);
}

paginator.prototype.first = function(){
  this.goTo(1);
}

paginator.prototype.last = function(){
  var totalPages = Math.ceil(this.total / this.per_page);
  this.goTo(totalPages);
}