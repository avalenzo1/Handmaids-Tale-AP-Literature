$("#app").hide();

$(function () {
  // artifact

  function redirectPage() {
    if (window.location.hash) {
      if (window.location.hash.match(/#!\//i)) {
        let hashRegexPath = window.location.hash.replace("#!/", "");

        if (hashRegexPath !== "") {
          $("#app").show();
          $("#app").html(
            `<div style="text-align: center;"><div class="loader"></div></div>`
          );

          
          let urlRedirect = new URL(
            "https://avalenzo1.github.io/Handmaids-Tale-AP-Literature/artifact/" + hashRegexPath
          );

          $.ajax({
            type: "GET",
            url: urlRedirect,
            dataType: "html",
            error: function (xhr, status, error) {
              $(".nav-items a").removeClass("active");
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
              $(".banner").hide();
              $("#app").html(response);
              $(".nav-items a").removeClass("active");
              $(`.nav-items a[href="${window.location.hash}"]`).addClass("active");
            },
          });
        } else {
          $(".banner").show();
        }
      }
    }
  }

  redirectPage();

  window.addEventListener("hashchange", function () {
    redirectPage();
  });
});
