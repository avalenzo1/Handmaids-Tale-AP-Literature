if(window.location.hash) {
  console.log("hello")
} else {
  console.log("nothing");
}

addEventListener('hashchange', function(e) {
  console.log("hello")
});