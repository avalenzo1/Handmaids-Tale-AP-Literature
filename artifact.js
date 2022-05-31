$("#app").html(`<div class="loader"></div>`);



$.ajax({
  type: "GET",
  url: "/artifact/artifact-1.html",
  dataType: "html",
  error: function(xhr, status, error) {
    $("#app").html(`
      <div class="alert alert-danger">
        <div class="alert-icon">
          <i class="fa-solid fa-triangle-exclamation"></i>
        </div>
        <div class="alert-message">
          An Error Occured: ${xhr.responseText}
        </div>
      </div>
    `);
  },
  success: function (res) {
    $("#app").html(res);
  },
});

if (window.location.hash) {
  let newURL = window.location.hash.replace("#!", "");
  let baseURL = 'https://handmaids-tale-project.glitch.me/';
  console.log(new URL(newURL), baseURL);
} else {
  
}

addEventListener("hashchange", function (e) {
  
});
