System.register("app/main", ["angular2/platform/browser", "app/app"], function($__export) {
  "use strict";
  var bootstrap,
      Application;
  return {
    setters: [function($__m) {
      bootstrap = $__m.bootstrap;
    }, function($__m) {
      Application = $__m.Application;
    }],
    execute: function() {
      bootstrap(Application);
    }
  };
});
