$("#app").html(`<div class="loader"></div>`);

$.ajax({
  type: "GET",
  url: "/artifact-1.html",
  dataType: "html",
  error: function(xhr, status, error) {
    $("#app").html(`
      <div class="alert alert-danger">
        <div class="">
          <i class="fa-solid fa-triangle-exclamation"></i> An Error Occured: ${xhr.responseText}
          
        
      </div>
    `);
  },
  success: function (res) {
    $("#app").html(res);
  },
});

if (window.location.hash) {
  console.log("hello");
} else {
  console.log("nothing");
}

addEventListener("hashchange", function (e) {
  console.log("hello");
});
