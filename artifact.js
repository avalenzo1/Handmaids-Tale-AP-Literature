$("#app").hide();

$(function(){
  // artifact
  
  $()
  
  function redirectPage() {
    if (window.location.hash) {
      $("#app").show();
      $("#app").html(`<div style="text-align: center;"><div class="loader"></div></div>`);
      
      if (window.location.hash.match(/#!\//i)) {
        let hashRegexPath = window.location.hash.replace("#!/", "");
        let urlRedirect = new URL('https://handmaids-tale-project.glitch.me/' + hashRegexPath);

        $.ajax({
          type: "GET",
          url: urlRedirect,
          dataType: "html",
          error: function(xhr, status, error) {
            $("#app").html(`
              <div class="alert alert-warning">
                <div class="alert-icon">
                  <i class="fa-solid fa-triangle-exclamation"></i>
                </div>
                <div class="alert-message">
                  An Error Occured: ${xhr.responseText}
                </div>
              </div>
            `);
          },
          success: function (response) {
            $("#app").html(response);
          },
        }); 
      }
    }
  }

  redirectPage();
  
  window.addEventListener("hashchange", function() {
    redirectPage()
  });
});