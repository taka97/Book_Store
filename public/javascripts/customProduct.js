function init_sidebar () {
  var CURRENT_URL = window.location.pathname.split('#')[0].split('?')[0]
  $('.page_sidebar').find('a[href="' + CURRENT_URL + '"]').addClass('active')
  // console.log('Add class successful')
}

$(document).ready(function () {
  init_sidebar()
})
