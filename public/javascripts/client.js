$( document ).ready(function() {
  $("#markdown").markdown({autofocus:false,savable:false})
  //check before deleting a chart
  $('.delete-chart').click(function () {
    var confirmation = window.confirm('Are you sure you want to delete this KWL(H)? Information cannot be recovered');
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
