var input = document.getElementById("schoolSearch");
var awesomplete = new Awesomplete(input, {
  minChars: 1,
  autoFirst: true
});

$("input").on("keyup", function(){
  $.ajax({
    url: 'https:/localhost:8080/suggestion' + this.value,
    type: 'GET',
    dataType: 'json'
  })
  .success(function(data) {
    var list = [];
    $.each(data, function(key, value) {
      list.push(value.name);
    });
    awesomplete.list = list;
  });
});