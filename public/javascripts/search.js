$(document).ready(function() {

  $('#search').on('keyup', function () {
    var searchText = $(this).val();
    var xhr = new XMLHttpRequest;
    xhr.open('get', './'+'?search='+searchText);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.addEventListener('load', function () {
      var results = JSON.parse(xhr.response);
      var ul = document.getElementById('searchlist');
      ul.style.display = 'inline-block';
      ul.innerHTML = null;
      for(var i=0; i < 5; i++){
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.innerHTML = results[i].topic;
        a.href = './?search='+results[i].topic.toLowerCase();
        li.appendChild(a);
        ul.appendChild(li);
      }
      if (!searchText) {
        ul.style.display = 'none';
      }
    });
    xhr.send();
  });

});
