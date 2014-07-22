var result = Foxhound.modules.Result = function(el, template){
  var self = this;

  self.template = Handlebars.compile(template);
  self.container = el;
}

result.prototype.render = function(data){
  var newData = { data: data };

  this.container.html(this.template(newData));
}