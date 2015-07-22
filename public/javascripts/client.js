$( document ).ready(function() {
  $(".mark").on('click', function (e) {
    var textarea = e.target.parentNode.firstChild;
    var preview = e.target.parentNode.children[1];
    var text = textarea.value;
    preview.innerHTML = markdown.toHTML(text);
    if (textarea.style.display === 'none') {
      textarea.style.display = 'block';
      preview.style.display = 'none';
    }
    else {
      textarea.style.display = 'none';
      preview.style.display = 'block';
    }
  })
  //check before deleting a chart
  $('.delete-chart').click(function () {
    var confirmation = window.confirm('Are you sure you want to delete this KWL(H)? Information cannot be recovered');
    if (confirmation){
      $('.delete-user-form').submit();
    } else {
      event.preventDefault();
    }
  });
  $('.delete-user').click(function () {
    var confirmation = window.confirm('Are you sure you want to delete your account and KWL(H) charts?');
    if (confirmation){
      $('.delete-user-form').submit();
    } else {
      event.preventDefault();
    }
  });
  $('.confirm').keyup(function (e) {
    if ($('.password').val() === $('.confirm').val()) {
      $('.confirmation').html('passwords match!')
    }
    else {
      $('.confirmation').html('passwords do not match!')
    }
  })
});
