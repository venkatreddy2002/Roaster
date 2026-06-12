(function () {
  function initNavigation() {
    // Mobile Menu Toggle
    const menuBtns = document.querySelectorAll(
      '.dashboard-menu-btn, .mobile-menu-btn, button[aria-label="Open menu"], button[aria-label="Open Navigation"]',
    );
    menuBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const dashboardDrawer = document.getElementById("dashboard-drawer");
        const mobileDrawer = document.getElementById("mobile-drawer");
        if (dashboardDrawer) dashboardDrawer.classList.remove("hidden");
        if (mobileDrawer) mobileDrawer.classList.remove("hidden");
      });
    });

    const closeBtns = document.querySelectorAll(
      ".dashboard-drawer-close, .drawer-close",
    );
    closeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const dashboardDrawer = document.getElementById("dashboard-drawer");
        const mobileDrawer = document.getElementById("mobile-drawer");
        if (dashboardDrawer) dashboardDrawer.classList.add("hidden");
        if (mobileDrawer) mobileDrawer.classList.add("hidden");
      });
    });

    const backdrops = document.querySelectorAll(
      ".dashboard-drawer-backdrop, .drawer-backdrop",
    );
    backdrops.forEach((backdrop) => {
      backdrop.addEventListener("click", () => {
        const dashboardDrawer = document.getElementById("dashboard-drawer");
        const mobileDrawer = document.getElementById("mobile-drawer");
        if (dashboardDrawer) dashboardDrawer.classList.add("hidden");
        if (mobileDrawer) mobileDrawer.classList.add("hidden");
      });
    });

    // Submenu Toggle
    const submenuToggles = document.querySelectorAll(".submenu-toggle");
    submenuToggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const content = toggle.nextElementSibling;
        const icon = toggle.querySelector('[data-lucide="chevron-down"], i');
        if (content) {
          content.classList.toggle("hidden");
        }
        if (icon) {
          icon.classList.toggle("rotate-180");
        }
      });
    });

    // Cart Button Click
    const cartBtns = document.querySelectorAll(
      '[data-lucide="shopping-cart"], [data-lucide="shopping-bag"], [aria-label="Cart"], .cart-btn',
    );
    cartBtns.forEach((btn) => {
      const parentBtn = btn.closest("button") || btn.closest("a") || btn;
      parentBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showToast("Added to cart");
      });
    });

    function showToast(message) {
      let toastContainer = document.getElementById("toast-container");
      if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.id = "toast-container";
        toastContainer.className =
          "fixed bottom-6 right-6 z-[100] flex flex-col gap-3";
        document.body.appendChild(toastContainer);
      }

      const toast = document.createElement("div");
      toast.className =
        "bg-brand-gold text-brand-espresso px-5 py-3 rounded-xl shadow-xl shadow-black/20 font-bold text-sm transform transition-all duration-300 translate-y-10 opacity-0 flex items-center gap-2 border border-brand-gold/50";
      toast.innerHTML = `<i data-lucide="check-circle" class="w-4 h-4"></i> <span>${message}</span>`;

      toastContainer.appendChild(toast);

      if (window.lucide) {
        window.lucide.createIcons({ root: toast });
      }

      requestAnimationFrame(() => {
        toast.classList.remove("translate-y-10", "opacity-0");
      });

      setTimeout(() => {
        toast.classList.add("translate-y-10", "opacity-0");
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    }

    // User Profile
    const userBtns = document.querySelectorAll('[data-lucide="user"]');
    userBtns.forEach((btn) => {
      const parentBtn = btn.closest("button");
      if (parentBtn) {
        parentBtn.addEventListener("click", (e) => {
          e.preventDefault();
          // Get path prefix (if we are in pages/ directory)
          const pathPrefix = window.location.pathname.includes("/pages/")
            ? ""
            : "pages/";
          window.location.href = pathPrefix + "dashboard.html";
        });
      }
    });

    // Mobile Drawer Login Button
    const mobileLoginBtns = document.querySelectorAll(".mobile-login-btn");
    mobileLoginBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const pathPrefix = window.location.pathname.includes("/pages/")
          ? ""
          : "pages/";
        window.location.href = pathPrefix + "login.html";
      });
    });

    // Flip Cards in About Beans
    const flipCards = document.querySelectorAll(".flip-card");
    flipCards.forEach((card) => {
      card.closest(".group").addEventListener("click", () => {
        card.classList.toggle("flipped");
      });
    });

    // Admin Dashboard Tabs
    const adminTabs = document.querySelectorAll('button[id^="tab-"]');
    if (adminTabs.length > 0) {
      adminTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          const targetId = tab.id.replace("tab-", "");
          adminTabs.forEach((t) => {
            t.classList.remove(
              "bg-brand-medium/50",
              "text-brand-gold",
              "border-r-2",
              "border-brand-gold",
            );
            t.classList.add("text-brand-latte/70", "hover:bg-brand-medium/30");
          });
          tab.classList.add(
            "bg-brand-medium/50",
            "text-brand-gold",
            "border-r-2",
            "border-brand-gold",
          );
          tab.classList.remove(
            "text-brand-latte/70",
            "hover:bg-brand-medium/30",
          );

          const panels = document.querySelectorAll(".tab-panel");
          panels.forEach((p) => p.classList.add("hidden"));
          const targetPanel = document.getElementById(`panel-${targetId}`);
          if (targetPanel) {
            targetPanel.classList.remove("hidden");
          }
        });
      });
    }

    // Auth Modal Toggles (Statically toggling views on login.html)
    const loginContainer = document.getElementById("auth-login-container");
    const registerContainer = document.getElementById(
      "auth-register-container",
    );
    const forgotContainer = document.getElementById(
      "auth-forgot-password-container",
    );

    const toRegisterBtn = document.getElementById("auth-toggle-to-register");
    const toLoginBtn = document.getElementById("auth-toggle-to-login");
    const toForgotBtn = document.getElementById("auth-toggle-to-forgot");
    const backToLoginBtns = document.querySelectorAll(
      '[id^="auth-back-to-login"]',
    );

    if (toRegisterBtn && loginContainer && registerContainer) {
      toRegisterBtn.addEventListener("click", (e) => {
        e.preventDefault();
        loginContainer.classList.add("hidden");
        registerContainer.classList.remove("hidden");
        if (forgotContainer) forgotContainer.classList.add("hidden");
      });
    }

    if (toLoginBtn && loginContainer && registerContainer) {
      toLoginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        registerContainer.classList.add("hidden");
        loginContainer.classList.remove("hidden");
        if (forgotContainer) forgotContainer.classList.add("hidden");
      });
    }

    if (toForgotBtn && loginContainer && forgotContainer) {
      toForgotBtn.addEventListener("click", (e) => {
        e.preventDefault();
        loginContainer.classList.add("hidden");
        if (registerContainer) registerContainer.classList.add("hidden");
        forgotContainer.classList.remove("hidden");
      });
    }

    backToLoginBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (forgotContainer) forgotContainer.classList.add("hidden");
        if (registerContainer) registerContainer.classList.add("hidden");
        if (loginContainer) loginContainer.classList.remove("hidden");
      });
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNavigation);
  } else {
    initNavigation();
  }
})();
