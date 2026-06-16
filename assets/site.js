// Shared site behavior
(function(){
  function init(){
    // ---- mobile nav toggle ----
    var header = document.querySelector('header');
    var btn = document.querySelector('.navtoggle');
    if(header && btn){
      btn.addEventListener('click', function(){
        var open = header.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      header.querySelectorAll('.navlinks a').forEach(function(a){
        a.addEventListener('click', function(){
          header.classList.remove('open');
          btn.setAttribute('aria-expanded','false');
        });
      });
    }

    // ---- email spam protection: assemble from data-* so the address is not in the HTML ----
    document.querySelectorAll('a.email').forEach(function(a){
      var user = a.getAttribute('data-user');
      var domain = a.getAttribute('data-domain');
      if(!user || !domain) return;
      var addr = user + '\u0040' + domain;
      a.setAttribute('href', 'mailto:' + addr);
      if(!a.textContent.trim()) a.textContent = addr;
    });

    // ---- open external links and files in a new tab ----
    document.querySelectorAll('a[href]').forEach(function(a){
      var href = a.getAttribute('href') || '';
      var external = /^https?:\/\//i.test(href);
      var isFile = /\.(pdf|docx?|xlsx?|csv|zip|pptx?)$/i.test(href);
      if(external || isFile){
        a.setAttribute('target','_blank');
        a.setAttribute('rel','noopener noreferrer');
      }
    });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
