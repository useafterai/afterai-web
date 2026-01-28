(function(){
  const year = document.getElementById('year');
  if(year) year.textContent = new Date().getFullYear();

  // Show a lightweight success message after Formspree redirects back.
  const ok = document.getElementById('okMsg');
  if(ok){
    const params = new URLSearchParams(window.location.search);
    if(params.get('submitted') === '1'){
      ok.textContent = "You're on the list. We'll reach out soon.";
      // Clean up the URL so refresh doesn't keep showing the message.
      try{
        const url = new URL(window.location.href);
        url.searchParams.delete('submitted');
        window.history.replaceState({}, document.title, url.pathname + (url.searchParams.toString() ? ('?' + url.searchParams.toString()) : '') + url.hash);
      }catch(_){/* no-op */}
    }
  }
})();
