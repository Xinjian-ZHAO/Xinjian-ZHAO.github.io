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
              var isActive = link.getAttribute("href") === "#" + id;
              link.classList.toggle("is-active", isActive);
              if (isActive) {
                link.setAttribute("aria-current", "location");
              } else {
                link.removeAttribute("aria-current");
              }
            });
          }
        });
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  var revealTargets = document.querySelectorAll(".reveal");
  if (!revealTargets.length) {
    revealTargets = [];
  }

  if ("IntersectionObserver" in window && revealTargets.length) {
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
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  var institutionLogoImages = document.querySelectorAll(".institution-logo img");
  institutionLogoImages.forEach(function (image) {
    var mark = image.parentElement;
    var useFallback = function () {
      if (mark) {
        mark.classList.add("is-unavailable");
      }
    };

    image.addEventListener("error", useFallback);
    if (image.complete && image.naturalWidth === 0) {
      useFallback();
    }
  });

  var trajectoryTree = document.querySelector("[data-trajectory-tree]");
  if (trajectoryTree) {
    var reducedMotion = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var drawTrajectory = function () {
      trajectoryTree.classList.add("is-drawn");
    };

    trajectoryTree.addEventListener("focusin", drawTrajectory);

    if (!("IntersectionObserver" in window) || reducedMotion) {
      drawTrajectory();
    } else {
      trajectoryTree.classList.add("is-animatable");
      var trajectoryObserver = new IntersectionObserver(
        function (entries, observer) {
          var isVisible = entries.some(function (entry) {
            return entry.isIntersecting;
          });

          if (isVisible) {
            drawTrajectory();
            observer.disconnect();
          }
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.01 }
      );

      trajectoryObserver.observe(trajectoryTree);
    }
  }

})();
