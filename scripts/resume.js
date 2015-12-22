(function() {
  var actions = {
    print: function() {
      window.print();
    }
  };

  $(document).on('click', 'a[data-action]', function() {
    var $target = $(this);
    var actionName = $target.attr('data-action');
    if (!actionName) return;
    var action = actions[actionName];
    if (!action) return;
    action();
  });
})();
