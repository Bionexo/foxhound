function Foxhound(options){
  options = options || {}

  this.options = {
    container: options.container || '*[fh-container=true]',
    query: options.query || '*[fh-query=true]',
    pagination: options.pagination || '*[fh-pagination=true]',
    template: options.template || '',
    handle_data: options.handle_data
  }

  this.init();
}

Foxhound.modules = {}
Foxhound.prototype.init = function(){
  this.search = new Foxhound.modules.Search(
    $(this.options.query),
    this.options.handle_data
  );

  this.result = new Foxhound.modules.Result(
    $(this.options.container),
    this.options.template
  );

  this.paginator = new Foxhound.modules.Paginator($(this.options.pagination));

  this.bindEvents();
}

Foxhound.prototype.bindEvents = function(){
  var self = this;

  $(self.options.query).on('results', function(event, data){
    self.result.render(data);
    $(self.options.pagination).trigger('update', [
      data.page,
      data.per_page,
      data.total
    ]);
  })

  $(self.options.pagination).on('paginate!', function(event, page, per_page){
    $(self.options.query).trigger('search', [{
      page: page,
      per_page: per_page
    }])
  })
}