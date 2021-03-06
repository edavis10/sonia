var Widget = Class.create({
  initialize: function(widget_id, config) {
    this.parent    = $("widgets");
    this.widget_id = widget_id;
    this.title     = config.title;
    this.config    = config;
    this.buildContainer(config);
    this.build();
    this.restorePosition();
  },

  onReceive: function(payload) {
    this.handlePayload(payload);
    this.update();
  },

  handlePayload: function(message) {
    console.warn(this.title, "should implement handlePayload(payload)");
  },

  update: function() {
    console.warn(this.title, "should implement update()");
  },

  build: function() {
    console.warn(this.title, "should implement build()");
  },

  buildContainer: function(config) {
    this.container = new Element("div", {id: this.widget_id, 'class': "widget " + config.name});
    this.parent.appendChild(this.container);
  },

  savePosition: function() {
    var position = { left: this.container.measure("left"), top: this.container.measure("top") };
    Storage.set(this.attrKey("position"), position);
  },

  restorePosition: function() {
    try {
      var position = Storage.get(this.attrKey("position"));
      var left = parseInt(position.left);
      var top  = parseInt(position.top);

      this.container.setStyle({ left: (left < 0) ? 0 : left + "px", top: (top < 0) ? 0 : top + "px"});
    } catch(err) {
      console.warn("Cound not set restore position", err);
    }
  },

  attrKey: function(attr) {
    return(this.widget_id + "_" + attr);
  }
});
