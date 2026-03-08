(function () {
  var menuToggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".primary-nav");
  var navLinks = document.querySelectorAll(".primary-nav a");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      var expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("is-open");
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var sections = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window && sections.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute("id");
            navLinks.forEach(function (link) {
              link.classList.toggle("is-active", link.getAttribute("href") === "#" + id);
            });
          }
        });
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: 0.1 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  var revealTargets = document.querySelectorAll(".reveal");
  if (!revealTargets.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    revealTargets.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var revealObserver = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) {
          return;
        }
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.05 }
  );

  revealTargets.forEach(function (el) {
    revealObserver.observe(el);
  });
})();
