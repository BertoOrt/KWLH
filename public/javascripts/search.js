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
      results.forEach(function (e) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.innerHTML = e.topic;
        a.href = './?search='+e.topic.toLowerCase();
        li.appendChild(a);
        ul.appendChild(li);
        console.log(e.topic);
      });
    });
    xhr.send();
  });

});
