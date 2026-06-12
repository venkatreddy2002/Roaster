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
      let styleTag = document.getElementById("toast-styles");
      if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.id = "toast-styles";
        styleTag.innerHTML = `
          .custom-toast-container {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 12px;
          }
          .custom-toast {
            background-color: #D4AF37;
            color: #1E1A16;
            padding: 12px 20px;
            border-radius: 12px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
            font-weight: 700;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 8px;
            border: 1px solid rgba(212, 175, 55, 0.5);
            transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1);
            transform: translateY(40px);
            opacity: 0;
            font-family: inherit;
          }
          .custom-toast.show {
            transform: translateY(0);
            opacity: 1;
          }
        `;
        document.head.appendChild(styleTag);
      }

      let toastContainer = document.getElementById("toast-container");
      if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.id = "toast-container";
        toastContainer.className = "custom-toast-container";
        document.body.appendChild(toastContainer);
      }

      const toast = document.createElement("div");
      toast.className = "custom-toast";
      toast.innerHTML = `<i data-lucide="check-circle" style="width:16px;height:16px;"></i> <span>${message}</span>`;

      toastContainer.appendChild(toast);

      if (window.lucide) {
        window.lucide.createIcons({ root: toast });
      }

      requestAnimationFrame(() => {
        void toast.offsetWidth; // force reflow
        toast.classList.add("show");
      });

      setTimeout(() => {
        toast.classList.remove("show");
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
