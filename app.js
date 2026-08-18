/* ═══════════════════════════════════════════════════
   CAFÉ POS — Application Logic
   Supabase Edition · Bilingual (AR/EN)
   ═══════════════════════════════════════════════════ */

// ──────────────── DYNAMIC UI INJECTION ────────────────

function injectDynamicUI() {
  const container = document.createElement('div');
  container.innerHTML = `
  <div class="modal-overlay" id="table-form-modal" hidden>
      <div class="modal">
        <div class="modal-header">
          <h2 id="table-form-title">إضافة طاولة / Add Table</h2>
          <button class="modal-close" onclick="document.getElementById('table-form-modal').hidden=true" style="background:none; border:none; cursor:pointer;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div class="modal-body">
          <input type="hidden" id="table-form-id">
          <div>
            <label>اسم الطاولة بالعربية / Arabic Name</label>
            <input type="text" id="table-form-name" placeholder="مثال: طاولة 1">
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn-cancel" onclick="document.getElementById('table-form-modal').hidden=true">إلغاء</button>
          <button class="btn-save" id="btn-save-table">حفظ الطاولة</button>
        </div>
      </div>
    </div>
    <!-- ═══ EXPENSES MODAL ═══ -->
    <div class="cmodal-overlay" id="expenses-modal" style="align-items:center;">
      <div class="cmodal-box" style="max-width:420px;width:95%;padding:0;border-radius:16px;overflow:hidden;">
        <div style="display:flex; justify-content:space-between; align-items:center; padding:18px 20px; border-bottom:1px solid var(--border);">
          <h2 style="font-size:18px; font-weight:700;">المصروفات</h2>
          <button id="close-expenses" style="background:none; border:none; cursor:pointer; color:var(--text-secondary); font-size:22px; line-height:1;">✕</button>
        </div>
        <div style="padding:20px; display:flex; flex-direction:column; gap:14px;">
          <div>
            <label style="display:block; margin-bottom:6px; font-size:13px; color:var(--text-secondary); font-weight:600;">القسم</label>
            <select id="expense-category" style="width:100%; height:44px; border:1.5px solid var(--border); border-radius:8px; padding:0 12px; font-size:14px; font-family:'Cairo',sans-serif; background:var(--surface); outline:none;"></select>
          </div>
          <div>
            <label style="display:block; margin-bottom:6px; font-size:13px; color:var(--text-secondary); font-weight:600;">المبلغ</label>
            <input type="number" id="expense-amount" placeholder="0.00" min="0" step="0.5"
              style="width:100%; height:44px; border:1.5px solid var(--border); border-radius:8px; padding:0 12px; font-size:14px; font-family:'Cairo',sans-serif; outline:none; box-sizing:border-box;">
          </div>
          <div>
            <label style="display:block; margin-bottom:6px; font-size:13px; color:var(--text-secondary); font-weight:600;">اسم المورد / ملاحظة</label>
            <input type="text" id="expense-note" placeholder="مثال: شركة النيل للخامات"
              style="width:100%; height:44px; border:1.5px solid var(--border); border-radius:8px; padding:0 12px; font-size:14px; font-family:'Cairo',sans-serif; outline:none; box-sizing:border-box;">
          </div>
          <button id="submit-expense" style="width:100%; height:46px; background:var(--primary); color:white; border:none; border-radius:9px; font-weight:700; font-size:15px; cursor:pointer; font-family:'Cairo',sans-serif; margin-top:4px;">
            التالي — اختيار طريقة الدفع
          </button>
        </div>
      </div>
    </div>

    <!-- ═══ CREDIT MODAL ═══ -->
    <div class="modal-overlay" id="credit-modal" hidden>
      <div class="modal" style="max-width: 400px; border-radius: 16px; overflow: hidden;">
        <div class="modal-header" style="display:flex; justify-content:space-between; padding:20px; border-bottom:1px solid var(--border);">
          <h2 data-i18n="credit" style="font-size: 20px; font-weight: 700;">الآجل</h2>
          <button class="modal-close" id="close-credit" style="background:none; border:none; cursor:pointer;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-body" style="padding:20px;">
          <div style="margin-bottom:16px;">
            <label style="display:block; margin-bottom:6px; font-size:13px; color:var(--text-secondary);">العميل / Customer</label>
            <select id="credit-customer" style="width:100%; height:44px; border:1px solid var(--border); border-radius:8px; padding:0 12px; font-size:14px;"></select>
          </div>
          <button id="submit-credit" style="width:100%; height:44px; background:var(--primary); color:white; border:none; border-radius:8px; font-weight:600; cursor:pointer;">تأكيد / Confirm</button>
        </div>
      </div>
    </div>

    <!-- ═══ OWNER PIN MODAL ═══ -->
    <div class="modal-overlay" id="pin-modal" hidden>
      <div class="modal" style="max-width: 320px; border-radius: 16px; overflow: hidden;">
        <div class="modal-header" style="display:flex; justify-content:space-between; padding:20px; border-bottom:1px solid var(--border);">
          <h2 style="font-size: 18px; font-weight: 700;">Owner Access / دخول المدير</h2>
          <button class="modal-close" id="close-pin" style="background:none; border:none; cursor:pointer;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-body" style="padding:24px; display:flex; flex-direction:column; align-items:center;">
          <div id="pin-display" style="display:flex; gap:12px; margin-bottom:24px; transition: transform 0.2s;">
            <span class="pin-dot"></span><span class="pin-dot"></span><span class="pin-dot"></span>
            <span class="pin-dot"></span>
          </div>
          <p id="pin-error" style="color:var(--error); font-size:13px; margin-bottom:12px; height:18px;" hidden>رمز غير صحيح / Incorrect PIN</p>
          <div id="pin-pad" style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px; width:100%;">
            <button class="pin-btn">1</button><button class="pin-btn">2</button><button class="pin-btn">3</button>
            <button class="pin-btn">4</button><button class="pin-btn">5</button><button class="pin-btn">6</button>
            <button class="pin-btn">7</button><button class="pin-btn">8</button><button class="pin-btn">9</button>
            <button class="pin-btn btn-clear" style="color:var(--error);">C</button><button class="pin-btn" style="grid-column: span 2;">0</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══ CATEGORY FORM MODAL ═══ -->
    <div class="modal-overlay" id="category-form-modal" hidden>
      <div class="modal" style="max-width: 480px; border-radius: 20px; width:92%; box-shadow:0 20px 60px rgba(0,0,0,0.18);">
        <div style="width:40px; height:4px; background:var(--border); border-radius:2px; margin:12px auto;"></div>
        <div class="modal-header" style="padding:0 24px 16px; border-bottom:1px solid var(--border);">
          <h2 style="font-size: 20px; font-weight: 700;">إضافة قسم / Add Category</h2>
        </div>
        <div class="modal-body" style="padding:24px;">
          <input type="hidden" id="cat-form-id">
          <div style="margin-bottom:16px;">
            <label style="display:block; margin-bottom:6px; font-size:13px; color:var(--text-secondary);">اسم القسم بالعربي</label>
            <input type="text" id="cat-form-ar" style="width:100%; height:44px; border:1px solid var(--border); border-radius:8px; padding:0 12px; font-size:14px;">
          </div>
          <div style="margin-bottom:24px;">
            <label style="display:block; margin-bottom:6px; font-size:13px; color:var(--text-secondary);">Category Name (English)</label>
            <input type="text" id="cat-form-en" style="width:100%; height:44px; border:1px solid var(--border); border-radius:8px; padding:0 12px; font-size:14px;">
          </div>
          <div style="display:flex; gap:12px;">
            <button id="btn-cancel-cat" style="flex:1; height:44px; background:transparent; color:var(--text-secondary); border:1px solid var(--border); border-radius:8px; font-weight:600; cursor:pointer;">إلغاء / Cancel</button>
            <button id="btn-save-cat" style="flex:1; height:44px; background:var(--primary); color:white; border:none; border-radius:8px; font-weight:600; cursor:pointer;">حفظ / Save</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══ ITEM FORM MODAL ═══ -->
    <div class="modal-overlay" id="item-form-modal" hidden>
      <div class="modal" style="max-width: 500px; border-radius: 20px; width:92%; box-shadow:0 20px 60px rgba(0,0,0,0.18); overflow:visible;">
        <div style="width:40px; height:4px; background:var(--border); border-radius:2px; margin:12px auto;"></div>
        <div class="modal-header" style="padding:0 24px 16px; border-bottom:1px solid var(--border);">
          <h2 id="item-form-title" style="font-size: 20px; font-weight: 700;">إضافة منتج / Add Item</h2>
        </div>
        <div class="modal-body" style="padding:20px 24px 24px; overflow:hidden;">
          <input type="hidden" id="item-form-id">
          <div style="margin-bottom:16px;">
            <label style="display:block; margin-bottom:6px; font-size:13px; color:var(--text-secondary);">اسم المنتج بالعربي</label>
            <input type="text" id="item-form-ar" style="width:100%; height:44px; border:1px solid var(--border); border-radius:8px; padding:0 12px; font-size:14px;">
          </div>
          <div style="margin-bottom:16px;">
            <label style="display:block; margin-bottom:6px; font-size:13px; color:var(--text-secondary);">Product Name (English)</label>
            <input type="text" id="item-form-en" style="width:100%; height:44px; border:1px solid var(--border); border-radius:8px; padding:0 12px; font-size:14px;">
          </div>
          <div style="display:flex; gap:16px; margin-bottom:16px;">
            <div style="flex:1;">
              <label style="display:block; margin-bottom:6px; font-size:13px; color:var(--text-secondary);">السعر / Price</label>
              <input type="number" id="item-form-price" style="width:100%; height:44px; border:1px solid var(--border); border-radius:8px; padding:0 12px; font-size:14px;" min="0" step="0.5">
            </div>
            <div style="flex:1;">
              <label style="display:block; margin-bottom:6px; font-size:13px; color:var(--text-secondary);">القسم / Category</label>
              <select id="item-form-category" style="width:100%; height:44px; border:1px solid var(--border); border-radius:8px; padding:0 12px; font-size:14px;"></select>
            </div>
          </div>
          <div style="margin-bottom:24px; display:flex; align-items:center; justify-content:space-between; background:var(--surface); border:1px solid var(--border); padding:12px 16px; border-radius:8px;">
            <span style="font-weight:600;">متاح / Available</span>
            <div class="toggle-switch on" id="item-form-toggle" style="position:relative; width:44px; height:24px; background:var(--primary); border-radius:12px; cursor:pointer; transition:all 0.2s;">
              <div class="toggle-thumb" style="position:absolute; top:2px; left:22px; width:20px; height:20px; background:white; border-radius:50%; transition:all 0.2s;"></div>
            </div>
          </div>
          <div style="display:flex; gap:12px;">
            <button id="btn-cancel-item" style="flex:1; height:44px; background:transparent; color:var(--text-secondary); border:1px solid var(--border); border-radius:8px; font-weight:600; cursor:pointer;">إلغاء / Cancel</button>
            <button id="btn-save-item" style="flex:1; height:44px; background:var(--primary); color:white; border:none; border-radius:8px; font-weight:600; cursor:pointer;">حفظ / Save</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══ CONFIRM DIALOG ═══ -->
    <div class="modal-overlay" id="confirm-modal" hidden>
      <div class="modal" style="max-width: 400px; border-radius: 18px; overflow: hidden;">
        <div class="modal-body" style="padding:28px 24px; text-align:center;">
          <div style="width:52px;height:52px;background:#FEF2F2;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
          </div>
          <h3 id="confirm-title" style="font-size:18px; font-weight:700; margin-bottom:8px; color:var(--text-primary);">هل أنت متأكد؟</h3>
          <p id="confirm-msg" style="color:var(--text-secondary); font-size:14px; margin-bottom:24px;">سيتم حذف هذا العنصر نهائياً.</p>
          <div style="display:flex; gap:10px;">
            <button id="btn-cancel-confirm" style="flex:1; height:44px; background:#F3F4F6; color:var(--text-secondary); border:none; border-radius:10px; font-weight:600; cursor:pointer; font-family:inherit; font-size:14px;">إلغاء</button>
            <button id="btn-do-confirm" style="flex:1; height:44px; background:var(--error); color:white; border:none; border-radius:10px; font-weight:600; cursor:pointer; font-family:inherit; font-size:14px;">حذف</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══ OWNER DASHBOARD ═══ -->
    <div id="owner-dashboard" class="dash-root">
      <!-- SIDEBAR -->
      <aside class="dash-sidebar">
        <div class="dash-brand">
          <div class="dash-brand-logo">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"/><path d="M12 3v6"/></svg>
          </div>
          <div>
            <div class="dash-brand-name">MENUX</div>
            <div class="dash-brand-sub">لوحة الإدارة</div>
          </div>
        </div>
        <nav id="dashboard-nav" class="dash-nav">
          <button class="dash-nav-item active" data-tab="reports">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="6" height="18" rx="1"/><rect x="9" y="8" width="6" height="13" rx="1"/><rect x="16" y="13" width="6" height="8" rx="1"/></svg>
            <span>التقارير</span>
          </button>
          <button class="dash-nav-item" data-tab="menu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
            <span>المنيو</span>
          </button>
          <button class="dash-nav-item" data-tab="tables">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
            <span>الطاولات</span>
          </button>
          <button class="dash-nav-item" data-tab="expenses">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 10h20"/><path d="M6 14h.01"/><path d="M10 14h4"/></svg>
            <span>المصروفات</span>
          </button>
          <button class="dash-nav-item" data-tab="customers">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            <span>العملاء</span>
          </button>
          <button class="dash-nav-item" data-tab="settings">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
            <span>الإعدادات</span>
          </button>
        </nav>
        <button id="btn-exit-dashboard" class="dash-exit-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          <span>خروج</span>
        </button>
      </aside>

      <!-- MAIN AREA -->
      <main class="dash-main">

        <!-- ══ REPORTS TAB ══ -->
        <div class="dash-tab-pane active" id="tab-reports">
          <div class="dash-page-header">
            <div>
              <h1 class="dash-page-title">التقارير</h1>
              <p class="dash-page-sub" id="rep-date-label">اليوم</p>
            </div>
            <div class="dash-header-actions">
              <input type="date" id="rep-date-picker" class="dash-date-input" title="اختر يوماً">
              <div class="dash-toggle-group">
                <button id="rep-today" class="dash-toggle-btn active">اليوم</button>
                <button id="rep-month" class="dash-toggle-btn">الشهر</button>
              </div>
            </div>
          </div>

          <div class="kpi-grid" style="grid-template-columns: repeat(4, 1fr);">
            <div class="kpi-card kpi-hero" id="kpi-hero-card" style="cursor:pointer; grid-column: 1 / -1;" title="اضغط لرؤية التاريخ اليومي">
              <div class="kpi-icon-wrap kpi-icon-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
              </div>
              <div class="kpi-label">المتوقع في الخزنة</div>
              <div class="kpi-value" id="rep-cash-on-hand">0.00</div>
              <div class="kpi-hint">اضغط لعرض الإيراد اليومي ▾</div>
            </div>

            <div class="kpi-card kpi-accent" id="kpi-revenue-card" style="cursor:pointer;" title="اضغط لرؤية التاريخ اليومي">
              <div class="kpi-icon-wrap kpi-icon-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              </div>
              <div class="kpi-label">إجمالي الإيراد</div>
              <div class="kpi-value" id="rep-revenue">0.00</div>
              <div style="font-size:10px;color:rgba(255,255,255,0.55);margin-top:2px;">اضغط لعرض اليومي ▾</div>
            </div>

            <div class="kpi-card" style="border-color:rgba(74,29,150,0.2);">
              <div class="kpi-icon-wrap" style="background:#F3EEFF;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4A1D96" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M7 15h.01"/><path d="M11 15h2"/></svg>
              </div>
              <div class="kpi-label">رصيد الدرج</div>
              <div class="kpi-value kpi-purple" id="rep-drawer-balance">0.00</div>
            </div>

            <div class="kpi-card" id="kpi-cash-card" style="cursor:pointer;" title="اضغط لعرض فواتير الكاش">
              <div class="kpi-icon-wrap" style="background:#E8F5E9;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/></svg>
              </div>
              <div class="kpi-label">إيراد نقدي</div>
              <div class="kpi-value kpi-green" id="rep-cash">0.00</div>
              <div style="font-size:10px;color:var(--text-secondary);margin-top:2px;">اضغط للفواتير ▾</div>
            </div>

            <div class="kpi-card" id="kpi-wallet-card" style="cursor:pointer;" title="اضغط لعرض فواتير المحفظة">
              <div class="kpi-icon-wrap" style="background:#E3F2FD;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1565C0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 10H18a2 2 0 0 0 0 4h4"/></svg>
              </div>
              <div class="kpi-label">محفظة</div>
              <div class="kpi-value kpi-blue" id="rep-wallet">0.00</div>
              <div style="font-size:10px;color:var(--text-secondary);margin-top:2px;">اضغط للفواتير ▾</div>
            </div>

            <div class="kpi-card" id="kpi-credit-paid-card" style="cursor:pointer;" title="اضغط لعرض تقارير الآجل المدفوع">
              <div class="kpi-icon-wrap" style="background:#FFF3E0;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E65100" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"/></svg>
              </div>
              <div class="kpi-label">آجل مدفوع</div>
              <div class="kpi-value kpi-orange" id="rep-credit-paid">0.00</div>
              <div style="font-size:10px;color:var(--text-secondary);margin-top:2px;">اضغط للتفاصيل ▾</div>
            </div>

            <div class="kpi-card" id="kpi-exp-credit-card" style="cursor:pointer;" title="اضغط لعرض تفاصيل فواتير بضاعة الآجل">
              <div class="kpi-icon-wrap" style="background:#FFF3E0;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E65100" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"/><path d="M12 11v4"/><path d="M10 13h4"/></svg>
              </div>
              <div class="kpi-label">بضاعة آجل مدفوعة</div>
              <div class="kpi-value kpi-orange" id="rep-exp-credit-paid">0.00</div>
              <div style="font-size:10px;color:var(--text-secondary);margin-top:2px;">اضغط للتفاصيل ▾</div>
            </div>

            <div class="kpi-card kpi-success">
              <div class="kpi-icon-wrap" style="background:rgba(255,255,255,0.2);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-5"/></svg>
              </div>
              <div class="kpi-label">صافي الدخل</div>
              <div class="kpi-value" id="rep-net">0.00</div>
            </div>

            <div class="kpi-card" id="kpi-top-item-card" style="cursor:pointer;" title="اضغط لعرض تفاصيل المبيعات">
              <div class="kpi-icon-wrap" style="background:#F3E5F5;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7B1FA2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              </div>
              <div class="kpi-label">أكثر منتج مبيعاً</div>
              <div class="kpi-value kpi-purple kpi-sm" id="rep-top-item">—</div>
              <div style="font-size:10px;color:var(--text-secondary);margin-top:2px;">اضغط للتفاصيل ▾</div>
            </div>
          </div>

          <div class="dash-section-title">المصروفات</div>
          <div class="kpi-grid kpi-grid-3">
            <div class="kpi-card kpi-danger" id="kpi-exp-primary-card" style="cursor:pointer;" title="اضغط لتفاصيل المصروفات الأساسية">
              <div class="kpi-icon-wrap" style="background:rgba(255,255,255,0.2);">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 11-6 6v3h9l3-3"/><path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"/></svg>
              </div>
              <div class="kpi-label">مصروفات أساسية</div>
              <div class="kpi-value" id="rep-exp-primary">0.00</div>
              <div style="font-size:10px;color:rgba(255,255,255,0.55);margin-top:2px;">اضغط للتفاصيل ▾</div>
            </div>
            <div class="kpi-card" id="kpi-exp-raw-card" style="cursor:pointer;border-color:rgba(245,158,11,0.3);" title="اضغط لتفاصيل مصروفات الخامات">
              <div class="kpi-icon-wrap" style="background:#FFF8E1;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/></svg>
              </div>
              <div class="kpi-label">مصروفات خامات</div>
              <div class="kpi-value kpi-orange" id="rep-exp-raw">0.00</div>
              <div style="font-size:10px;color:var(--text-secondary);margin-top:2px;">اضغط للتفاصيل ▾</div>
            </div>
            <div class="kpi-card" id="kpi-exp-secondary-card" style="cursor:pointer;" title="اضغط لتفاصيل المصروفات الثانوية">
              <div class="kpi-icon-wrap" style="background:#F5F5F5;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <div class="kpi-label">مصروفات ثانوية</div>
              <div class="kpi-value" id="rep-exp-secondary">0.00</div>
              <div style="font-size:10px;color:var(--text-secondary);margin-top:2px;">اضغط للتفاصيل ▾</div>
            </div>
          </div>

          <div class="dash-section-title">بضاعة الآجل (غير مدفوعة)</div>
          <div class="credit-summary-bar" id="exp-purchases-bar">
            <div class="credit-summary-empty">لا توجد بضاعة آجل غير مدفوعة</div>
          </div>

          <div class="dash-section-title" style="margin-top:20px;">مديونية العملاء (غير مدفوعة)</div>
          <div class="credit-summary-bar" id="credit-summary-bar">
            <div class="credit-summary-empty">لا توجد مبالغ آجلة</div>
          </div>
        </div>

        <!-- ══ MENU TAB ══ -->
        <div class="dash-tab-pane" id="tab-menu" style="display:none; height:100%;">
          <div style="display:flex; gap:28px; height:100%;">
            <div style="flex:0 0 38%; display:flex; flex-direction:column;">
              <div class="dash-page-header" style="margin-bottom:16px;">
                <h2 class="dash-page-title" style="font-size:20px;">الأقسام</h2>
                <button id="btn-add-category" class="dash-btn-primary">+ قسم جديد</button>
              </div>
              <div id="mgmt-categories-list" style="display:flex; flex-direction:column; gap:8px; overflow-y:auto; flex:1;"></div>
            </div>
            <div style="flex:1; display:flex; flex-direction:column; position:relative; border-right:1px solid var(--border); padding-right:28px;">
              <div class="dash-page-header" style="margin-bottom:16px;">
                <h2 id="mgmt-items-title" class="dash-page-title" style="font-size:20px;">المنتجات</h2>
              </div>
              <div id="mgmt-items-list" style="display:flex; flex-direction:column; gap:10px; overflow-y:auto; padding-bottom:80px; flex:1;"></div>
              <button id="btn-add-item" class="dash-fab">+</button>
            </div>
          </div>
        </div>

        <!-- ══ TABLES TAB ══ -->
        <div class="dash-tab-pane" id="tab-tables" style="display:none;">
          <div class="dash-page-header">
            <h1 class="dash-page-title">الطاولات</h1>
            <button id="btn-add-table" class="dash-btn-primary">+ إضافة طاولة</button>
          </div>
          <div id="mgmt-tables-grid" class="tables-grid"></div>
        </div>

        <!-- ══ EXPENSES TAB ══ -->
        <div class="dash-tab-pane" id="tab-expenses" style="display:none;">
          <div class="dash-page-header">
            <h1 class="dash-page-title">تصنيفات المصروفات</h1>
            <button id="btn-add-exp-cat" class="dash-btn-primary">+ إضافة صنف</button>
          </div>
          <div class="dash-exp-hint">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            حدد نوع كل صنف (أساسي / خامات / ثانوي) لتصنيفه في التقارير
          </div>
          <div id="mgmt-exp-cats-list" style="max-width:520px; display:flex; flex-direction:column; gap:8px;"></div>
        </div>

        <!-- ══ CUSTOMERS TAB ══ -->
        <div class="dash-tab-pane" id="tab-customers" style="display:none;">
          <div class="dash-page-header">
            <h1 class="dash-page-title">العملاء</h1>
            <button id="btn-add-customer" class="dash-btn-primary">+ إضافة عميل</button>
          </div>
          <div id="mgmt-customers-list" style="max-width:700px; display:flex; flex-direction:column; gap:10px;"></div>
        </div>

        <!-- ══ SETTINGS TAB ══ -->
        <div class="dash-tab-pane" id="tab-settings" style="display:none;">
          <div class="dash-page-header">
            <h1 class="dash-page-title">الإعدادات</h1>
            <button id="btn-save-settings" class="dash-btn-primary">حفظ</button>
          </div>
          <div class="dash-settings-form">
            <div class="dash-field">
              <label>اسم المكان</label>
              <input type="text" id="set-bname">
            </div>
            <div class="dash-field">
              <label>رأس الفاتورة</label>
              <input type="text" id="set-rheader">
            </div>
            <div class="dash-field">
              <label>ذيل الفاتورة</label>
              <input type="text" id="set-rfooter">
            </div>
            <div class="dash-field">
              <label>اللغة</label>
              <select id="set-lang">
                <option value="ar">العربية</option>
                <option value="en">English</option>
              </select>
            </div>
            <div class="dash-field">
              <label>الطابعة</label>
              <select id="set-printer">
                <option value="bluetooth">Bluetooth</option>
                <option value="usb">USB</option>
              </select>
            </div>
            <button id="btn-change-pin" class="dash-btn-outline">🔒 تغيير الرقم السري</button>
          </div>
        </div>

      </main>
    </div>

    <!-- ═══ DAILY REVENUE POPUP ═══ -->
    <div class="cmodal-overlay" id="cm-daily-revenue">
      <div class="cmodal-box" style="max-width:480px; width:95%;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <div class="cmodal-title" style="margin:0;">الإيراد اليومي</div>
          <button id="cm-daily-close" style="background:none; border:none; cursor:pointer; color:#6B7280; font-size:20px;">✕</button>
        </div>
        <div id="daily-revenue-list" style="max-height:400px; overflow-y:auto;"></div>
      </div>
    </div>

    <!-- ═══ EXPENSE PRIMARY DETAIL POPUP ═══ -->
    <div class="cmodal-overlay" id="cm-exp-primary-detail">
      <div class="cmodal-box" style="max-width:520px; width:95%; padding:0; border-radius:16px; overflow:hidden;">
        <div style="display:flex; justify-content:space-between; align-items:center; padding:18px 20px; border-bottom:1px solid var(--border);">
          <div class="cmodal-title" style="margin:0;">تفاصيل المصروفات الأساسية</div>
          <button id="cm-exp-primary-close" style="background:none; border:none; cursor:pointer; color:#6B7280; font-size:20px;">✕</button>
        </div>
        <div style="padding:12px 16px; border-bottom:1px solid var(--border);">
          <input type="text" id="exp-primary-search" placeholder="🔍  ابحث بالصنف أو الملاحظة..."
            style="width:100%;height:38px;border:1.5px solid var(--border);border-radius:9px;padding:0 12px;font-size:13px;font-family:'Cairo',sans-serif;outline:none;box-sizing:border-box;">
        </div>
        <div id="exp-primary-detail-list" style="max-height:400px; overflow-y:auto; padding:4px 8px;"></div>
      </div>
    </div>

    <!-- ═══ EXPENSE RAW DETAIL POPUP ═══ -->
    <div class="cmodal-overlay" id="cm-exp-raw-detail">
      <div class="cmodal-box" style="max-width:520px; width:95%; padding:0; border-radius:16px; overflow:hidden;">
        <div style="display:flex; justify-content:space-between; align-items:center; padding:18px 20px; border-bottom:1px solid var(--border);">
          <div class="cmodal-title" style="margin:0;">تفاصيل مصروفات الخامات</div>
          <button id="cm-exp-raw-close" style="background:none; border:none; cursor:pointer; color:#6B7280; font-size:20px;">✕</button>
        </div>
        <div style="padding:12px 16px; border-bottom:1px solid var(--border);">
          <input type="text" id="exp-raw-search" placeholder="🔍  ابحث بالصنف أو الملاحظة..."
            style="width:100%;height:38px;border:1.5px solid var(--border);border-radius:9px;padding:0 12px;font-size:13px;font-family:'Cairo',sans-serif;outline:none;box-sizing:border-box;">
        </div>
        <div id="exp-raw-detail-list" style="max-height:400px; overflow-y:auto; padding:4px 8px;"></div>
      </div>
    </div>

    <!-- ═══ EXPENSE SECONDARY DETAIL POPUP ═══ -->
    <div class="cmodal-overlay" id="cm-exp-secondary-detail">
      <div class="cmodal-box" style="max-width:520px; width:95%; padding:0; border-radius:16px; overflow:hidden;">
        <div style="display:flex; justify-content:space-between; align-items:center; padding:18px 20px; border-bottom:1px solid var(--border);">
          <div class="cmodal-title" style="margin:0;">تفاصيل المصروفات الثانوية</div>
          <button id="cm-exp-secondary-close" style="background:none; border:none; cursor:pointer; color:#6B7280; font-size:20px;">✕</button>
        </div>
        <div style="padding:12px 16px; border-bottom:1px solid var(--border);">
          <input type="text" id="exp-secondary-search" placeholder="🔍  ابحث بالصنف أو الملاحظة..."
            style="width:100%;height:38px;border:1.5px solid var(--border);border-radius:9px;padding:0 12px;font-size:13px;font-family:'Cairo',sans-serif;outline:none;box-sizing:border-box;">
        </div>
        <div id="exp-secondary-detail-list" style="max-height:400px; overflow-y:auto; padding:4px 8px;"></div>
      </div>
    </div>

    <!-- ═══ DRAWER BALANCE MODAL ═══ -->
    <div class="cmodal-overlay" id="cm-drawer-balance">
      <div class="cmodal-box">
        <div class="cmodal-title">رصيد الدرج</div>
        <div class="cmodal-msg">أدخل رصيد الدرج الحالي</div>
        <input class="cmodal-input" id="cm-drawer-amount" type="number" placeholder="0.00" min="0" step="0.5" inputmode="decimal">
        <div class="cmodal-btns">
          <button class="cmodal-btn cancel" id="cm-drawer-cancel">إلغاء</button>
          <button class="cmodal-btn primary" id="cm-drawer-ok">حفظ</button>
        </div>
      </div>
    </div>

    <!-- ═══ EXPENSE PAYMENT METHOD MODAL ═══ -->
    <div class="cmodal-overlay" id="cm-exp-payment">
      <div class="cmodal-box">
        <div class="cmodal-title">طريقة الدفع</div>
        <div class="cmodal-msg" id="cm-exp-payment-msg">اختر طريقة دفع المصروف</div>
        <div class="cmodal-btns" style="flex-direction:column; gap:10px;">
          <button class="cmodal-btn primary" id="cm-exp-pay-cash" style="display:flex;align-items:center;justify-content:center;gap:8px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg>
            نقدي (كاش)
          </button>
          <button class="cmodal-btn" id="cm-exp-pay-credit" style="background:#FFF3E0;color:#E65100;display:flex;align-items:center;justify-content:center;gap:8px;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"/></svg>
            آجل (غير مدفوع)
          </button>
          <button class="cmodal-btn cancel" id="cm-exp-pay-cancel">إلغاء</button>
        </div>
      </div>
    </div>

    <!-- ═══ EXPENSE CREDIT PAY MODAL (partial or full) ═══ -->
    <div class="cmodal-overlay" id="cm-exp-credit-pay">
      <div class="cmodal-box" style="max-width:400px;">
        <div class="cmodal-title">دفع بضاعة آجل</div>
        <div class="cmodal-msg" id="cm-exp-credit-pay-msg">اختر طريقة الدفع</div>
        <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:18px;">
          <button class="cmodal-btn primary" id="cm-exp-full-pay" style="display:flex;align-items:center;justify-content:center;gap:8px;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            دفع المبلغ الكامل
          </button>
          <div style="background:var(--bg);border:1.5px solid var(--border);border-radius:10px;padding:14px;">
            <div style="font-size:13px;color:var(--text-secondary);margin-bottom:8px;font-weight:600;">أو ادفع مبلغ جزئي:</div>
            <div style="display:flex;gap:8px;align-items:center;">
              <input type="number" id="cm-exp-partial-amount" placeholder="0.00" min="0" step="0.5"
                style="flex:1;height:40px;border:1.5px solid var(--border);border-radius:8px;padding:0 10px;font-size:14px;font-family:'Cairo',sans-serif;outline:none;">
              <button class="cmodal-btn primary" id="cm-exp-partial-pay" style="flex:0 0 auto;padding:0 16px;height:40px;font-size:13px;">دفع</button>
            </div>
          </div>
        </div>
        <div class="cmodal-btns">
          <button class="cmodal-btn cancel" id="cm-exp-credit-pay-cancel">إلغاء</button>
        </div>
      </div>
    </div>

    <!-- ═══ EXPENSE CREDIT DETAIL POPUP ═══ -->
    <div class="cmodal-overlay" id="cm-exp-credit-detail">
      <div class="cmodal-box" style="max-width:520px; width:95%; padding:0; border-radius:16px;overflow:hidden;">
        <div style="display:flex; justify-content:space-between; align-items:center; padding:18px 20px; border-bottom:1px solid var(--border);">
          <div class="cmodal-title" style="margin:0;">فواتير بضاعة الآجل المدفوعة — الشهر</div>
          <button id="cm-exp-credit-detail-close" style="background:none; border:none; cursor:pointer; color:#6B7280; font-size:20px;">✕</button>
        </div>
        <div style="padding:12px 16px; border-bottom:1px solid var(--border);">
          <input type="text" id="exp-credit-search" placeholder="🔍  ابحث بالمورد أو الملاحظة..."
            style="width:100%;height:38px;border:1.5px solid var(--border);border-radius:9px;padding:0 12px;font-size:13px;font-family:'Cairo',sans-serif;outline:none;box-sizing:border-box;">
        </div>
        <div id="exp-credit-detail-list" style="max-height:400px; overflow-y:auto; padding:4px 8px;"></div>
      </div>
    </div>

    <!-- ═══ CREDIT PAID POPUP (آجل مدفوع خلال الشهر) ═══ -->
    <div class="cmodal-overlay" id="cm-credit-paid-detail">
      <div class="cmodal-box" style="max-width:520px; width:95%; padding:0; border-radius:16px; overflow:hidden;">
        <div style="display:flex; justify-content:space-between; align-items:center; padding:18px 20px; border-bottom:1px solid var(--border);">
          <div class="cmodal-title" style="margin:0;">تقارير الآجل المدفوع</div>
          <button id="cm-credit-paid-close" style="background:none; border:none; cursor:pointer; color:#6B7280; font-size:20px;">✕</button>
        </div>
        <div style="padding:12px 16px; border-bottom:1px solid var(--border);">
          <input type="text" id="credit-paid-search" placeholder="🔍  ابحث باسم العميل..."
            style="width:100%;height:38px;border:1.5px solid var(--border);border-radius:9px;padding:0 12px;font-size:13px;font-family:'Cairo',sans-serif;outline:none;box-sizing:border-box;">
        </div>
        <div id="credit-paid-detail-list" style="max-height:400px; overflow-y:auto; padding:4px 8px;"></div>
      </div>
    </div>

    <!-- ═══ CASH INVOICES POPUP (فواتير كاش خلال الشهر) ═══ -->
    <div class="cmodal-overlay" id="cm-cash-invoices">
      <div class="cmodal-box" style="max-width:520px; width:95%; padding:0; border-radius:16px; overflow:hidden;">
        <div style="display:flex; justify-content:space-between; align-items:center; padding:18px 20px; border-bottom:1px solid var(--border);">
          <div class="cmodal-title" style="margin:0;">فواتير الكاش المقفولة</div>
          <button id="cm-cash-invoices-close" style="background:none; border:none; cursor:pointer; color:#6B7280; font-size:20px;">✕</button>
        </div>
        <div style="padding:12px 16px; border-bottom:1px solid var(--border);">
          <input type="text" id="cash-invoices-search" placeholder="🔍  ابحث بالفاتورة أو الطاولة أو الصنف..."
            style="width:100%;height:38px;border:1.5px solid var(--border);border-radius:9px;padding:0 12px;font-size:13px;font-family:'Cairo',sans-serif;outline:none;box-sizing:border-box;">
        </div>
        <div id="cash-invoices-list" style="max-height:400px; overflow-y:auto; padding:4px 0;"></div>
      </div>
    </div>

    <!-- ═══ WALLET INVOICES POPUP (فواتير محفظة خلال الشهر) ═══ -->
    <div class="cmodal-overlay" id="cm-wallet-invoices">
      <div class="cmodal-box" style="max-width:520px; width:95%; padding:0; border-radius:16px; overflow:hidden;">
        <div style="display:flex; justify-content:space-between; align-items:center; padding:18px 20px; border-bottom:1px solid var(--border);">
          <div class="cmodal-title" style="margin:0;">فواتير المحفظة المقفولة</div>
          <button id="cm-wallet-invoices-close" style="background:none; border:none; cursor:pointer; color:#6B7280; font-size:20px;">✕</button>
        </div>
        <div style="padding:12px 16px; border-bottom:1px solid var(--border);">
          <input type="text" id="wallet-invoices-search" placeholder="🔍  ابحث بالفاتورة أو الطاولة أو الصنف..."
            style="width:100%;height:38px;border:1.5px solid var(--border);border-radius:9px;padding:0 12px;font-size:13px;font-family:'Cairo',sans-serif;outline:none;box-sizing:border-box;">
        </div>
        <div id="wallet-invoices-list" style="max-height:400px; overflow-y:auto; padding:4px 0;"></div>
      </div>
    </div>

    <!-- ═══ TOP ITEMS POPUP (تفاصيل المنتجات الأكثر مبيعاً) ═══ -->
    <div class="cmodal-overlay" id="cm-top-items">
      <div class="cmodal-box" style="max-width:500px; width:95%;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <div class="cmodal-title" style="margin:0;">تفاصيل المبيعات — الكميات</div>
          <button id="cm-top-items-close" style="background:none; border:none; cursor:pointer; color:#6B7280; font-size:20px;">✕</button>
        </div>
        <div id="top-items-list" style="max-height:440px; overflow-y:auto;"></div>
      </div>
    </div>

    <!-- ═══ CREDIT DETAIL POPUP (in customers tab) ═══ -->
    <div class="cmodal-overlay" id="cm-credit-detail">
      <div class="cmodal-box" style="max-width:500px; width:95%;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <div class="cmodal-title" style="margin:0;" id="cm-credit-detail-title">تفاصيل الآجل</div>
          <button id="cm-credit-detail-close" style="background:none; border:none; cursor:pointer; color:#6B7280; font-size:20px;">✕</button>
        </div>
        <div id="credit-detail-list" style="max-height:440px; overflow-y:auto;"></div>
      </div>
    </div>
  `;
  document.body.appendChild(container);

  // Add styles for dynamic elements
  const style = document.createElement('style');
  style.innerHTML = `
    /* ─── Dashboard Shell ─── */
    .dash-root { position:fixed; inset:0; background:var(--bg); z-index:200; display:none; flex-direction:row; }
    .dash-sidebar { width:220px; flex-shrink:0; background:var(--primary); display:flex; flex-direction:column; overflow:hidden; order:2; }
    .dash-brand { display:flex; align-items:center; gap:12px; padding:20px 16px; border-bottom:1px solid rgba(255,255,255,0.1); }
    .dash-brand-logo { width:36px; height:36px; background:rgba(255,255,255,0.15); border-radius:10px; display:flex; align-items:center; justify-content:center; color:white; flex-shrink:0; }
    .dash-brand-name { font-size:16px; font-weight:800; color:white; letter-spacing:0.5px; }
    .dash-brand-sub { font-size:11px; color:rgba(255,255,255,0.55); margin-top:1px; }
    .dash-nav { flex:1; padding:12px 0; overflow-y:auto; display:flex; flex-direction:column; gap:2px; }
    .dash-nav-item { display:flex; align-items:center; gap:10px; padding:11px 16px; background:none; border:none; color:rgba(255,255,255,0.65); width:100%; text-align:start; cursor:pointer; font-size:13px; font-weight:500; border-radius:0; transition:all 0.15s; font-family:'Cairo',sans-serif; }
    .dash-nav-item svg { flex-shrink:0; opacity:0.7; }
    .dash-nav-item:hover { background:rgba(255,255,255,0.08); color:white; }
    .dash-nav-item:hover svg { opacity:1; }
    .dash-nav-item.active { background:rgba(255,255,255,0.14); color:white; font-weight:700; border-inline-end:3px solid rgba(255,255,255,0.9); }
    .dash-nav-item.active svg { opacity:1; }
    .dash-exit-btn { display:flex; align-items:center; gap:10px; padding:14px 16px; border-top:1px solid rgba(255,255,255,0.1); background:none; color:rgba(255,255,255,0.6); font-size:13px; cursor:pointer; transition:all 0.15s; border-left:none; border-right:none; border-bottom:none; font-family:'Cairo',sans-serif; }
    .dash-exit-btn:hover { color:white; background:rgba(255,255,255,0.06); }

    /* ─── Main Content ─── */
    .dash-main { flex:1; overflow-y:auto; padding:28px 32px; background:var(--bg); }
    .dash-tab-pane { animation: dashFadeIn 0.2s ease; }
    @keyframes dashFadeIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }

    /* ─── Page Header ─── */
    .dash-page-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:24px; }
    .dash-page-title { font-size:22px; font-weight:800; color:var(--text-primary); }
    .dash-page-sub { font-size:13px; color:var(--text-secondary); margin-top:2px; }
    .dash-header-actions { display:flex; align-items:center; gap:10px; }

    /* ─── Toggle Buttons ─── */
    .dash-toggle-group { display:flex; background:var(--border); border-radius:8px; padding:3px; }
    .dash-toggle-btn { padding:7px 18px; border-radius:6px; background:none; border:none; cursor:pointer; font-weight:600; font-size:13px; color:var(--text-secondary); transition:all 0.15s; font-family:'Cairo',sans-serif; }
    .dash-toggle-btn.active { background:var(--surface); color:var(--primary); box-shadow:var(--shadow-sm); }

    /* ─── Date Input ─── */
    .dash-date-input { height:36px; border:1.5px solid var(--border); border-radius:8px; padding:0 10px; font-size:13px; color:var(--text-primary); background:var(--surface); cursor:pointer; font-family:'Cairo',sans-serif; outline:none; }
    .dash-date-input:focus { border-color:var(--primary); }

    /* ─── KPI Cards ─── */
    .kpi-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:20px; }
    .kpi-grid-3 { grid-template-columns:repeat(3,1fr); }
    .kpi-card { background:var(--surface); border:1px solid var(--border); border-radius:14px; padding:18px 20px; display:flex; flex-direction:column; gap:8px; transition:box-shadow 0.15s; }
    .kpi-card:hover { box-shadow:var(--shadow-md); }
    .kpi-hero { grid-column:1/-1; background:linear-gradient(135deg, var(--primary) 0%, #3B1680 100%); color:white; border:none; flex-direction:row; align-items:center; gap:20px; padding:22px 28px; }
    .kpi-hero .kpi-label { color:rgba(255,255,255,0.75); flex:1; }
    .kpi-hero .kpi-value { font-size:36px; font-weight:800; }
    .kpi-hero .kpi-hint { font-size:11px; color:rgba(255,255,255,0.5); }
    .kpi-accent { background:var(--primary); color:white; border:none; }
    .kpi-accent .kpi-label { color:rgba(255,255,255,0.75); }
    .kpi-accent .kpi-value { color:white; }
    .kpi-success { background:linear-gradient(135deg,#16A34A,#15803d); color:white; border:none; }
    .kpi-success .kpi-label { color:rgba(255,255,255,0.8); }
    .kpi-success .kpi-value { color:white; }
    .kpi-danger { background:linear-gradient(135deg,#DC2626,#b91c1c); color:white; border:none; }
    .kpi-danger .kpi-label { color:rgba(255,255,255,0.8); }
    .kpi-danger .kpi-value { color:white; }
    .kpi-icon-wrap { width:36px; height:36px; border-radius:10px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
    .kpi-icon-white { background:rgba(255,255,255,0.18); color:white; }
    .kpi-label { font-size:12px; color:var(--text-secondary); font-weight:600; }
    .kpi-value { font-size:24px; font-weight:800; color:var(--text-primary); line-height:1; }
    .kpi-sm { font-size:16px; }
    .kpi-green { color:#16A34A; }
    .kpi-blue { color:#1565C0; }
    .kpi-orange { color:#E65100; }
    .kpi-purple { color:#7B1FA2; }

    /* ─── Section Titles ─── */
    .dash-section-title { font-size:14px; font-weight:700; color:var(--text-secondary); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:12px; }

    /* ─── Credit Summary Bar ─── */
    .credit-summary-bar { display:flex; flex-direction:column; gap:8px; }
    .credit-summary-row { background:var(--surface); border:1px solid var(--border); border-radius:12px; padding:14px 18px; display:flex; align-items:center; justify-content:space-between; gap:12px; }
    .credit-summary-name { font-weight:700; font-size:14px; }
    .credit-summary-amt { font-weight:800; font-size:16px; color:var(--error); }
    .credit-summary-empty { text-align:center; color:var(--text-secondary); padding:24px; font-size:14px; }

    /* ─── Daily Revenue List ─── */
    .daily-row { display:flex; justify-content:space-between; align-items:center; padding:12px 4px; border-bottom:1px solid var(--border); font-size:14px; }
    .daily-row:last-child { border-bottom:none; }
    .daily-date { color:var(--text-secondary); font-size:13px; }
    .daily-amt { font-weight:700; color:var(--primary); }

    /* ─── Buttons ─── */
    .dash-btn-primary { height:38px; padding:0 18px; background:var(--primary); color:white; border:none; border-radius:9px; cursor:pointer; font-weight:700; font-size:13px; transition:all 0.15s; font-family:'Cairo',sans-serif; }
    .dash-btn-primary:hover { background:var(--primary-hover); box-shadow:0 4px 12px rgba(74,29,150,0.25); }
    .dash-btn-outline { width:100%; height:44px; margin-top:8px; background:transparent; border:1.5px solid var(--primary); color:var(--primary); border-radius:9px; cursor:pointer; font-weight:600; font-size:14px; font-family:'Cairo',sans-serif; }
    .dash-fab { position:absolute; bottom:0; right:24px; width:50px; height:50px; border-radius:50%; background:var(--primary); color:white; font-size:28px; border:none; cursor:pointer; box-shadow:var(--shadow-md); display:flex; align-items:center; justify-content:center; }

    /* ─── Settings Form ─── */
    .dash-settings-form { max-width:480px; display:flex; flex-direction:column; gap:14px; }
    .dash-field { display:flex; flex-direction:column; gap:6px; }
    .dash-field label { font-size:13px; font-weight:600; color:var(--text-secondary); }
    .dash-field input, .dash-field select { height:44px; border:1.5px solid var(--border); border-radius:9px; padding:0 12px; font-size:14px; font-family:'Cairo',sans-serif; outline:none; transition:border-color 0.15s; }
    .dash-field input:focus, .dash-field select:focus { border-color:var(--primary); }

    /* ─── Expense Type Badge ─── */
    .dash-exp-hint { background:var(--primary-light); border:1px solid rgba(74,29,150,0.15); border-radius:8px; padding:10px 14px; font-size:12px; color:var(--primary); display:flex; align-items:center; gap:8px; margin-bottom:16px; }
    .exp-type-select { height:34px; border:1.5px solid var(--border); border-radius:8px; padding:0 8px; font-size:12px; background:var(--bg); cursor:pointer; font-family:'Cairo',sans-serif; }

    /* ─── Customers Credit Detail ─── */
    .cust-credit-badge { background:#FEF2F2; color:var(--error); font-size:12px; font-weight:700; padding:3px 10px; border-radius:20px; }

    /* ─── Mgmt Row ─── */
    .mgmt-row { background: var(--surface); border: 1.5px solid var(--border); padding: 14px 16px; border-radius: 10px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; transition:all 0.15s; }
    .mgmt-row:hover { border-color:rgba(74,29,150,0.2); box-shadow:var(--shadow-xs); }
    .mgmt-row.active { border-color: var(--primary); background:var(--primary-light); }

    /* ─── PIN ─── */
    .pin-btn { height: 64px; border-radius: 12px; background: var(--sidebar-bg); border: 1.5px solid var(--border); font-size: 22px; font-weight: 600; color: var(--text-primary); cursor: pointer; transition: all 0.1s; font-family:'Sora',sans-serif; }
    .pin-btn:hover { background:var(--primary-light); border-color:var(--primary); }
    .pin-btn:active { transform: scale(0.95); }
    .pin-dot { width: 14px; height: 14px; border-radius: 50%; border: 2px solid var(--primary); display:inline-block; transition:all 0.15s; }
    .pin-dot.filled { background: var(--primary); transform:scale(1.1); }
    .shake { animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both; }
    @keyframes shake { 10%,90%{transform:translate3d(-1px,0,0)} 20%,80%{transform:translate3d(2px,0,0)} 30%,50%,70%{transform:translate3d(-4px,0,0)} 40%,60%{transform:translate3d(4px,0,0)} }
  `;
  document.head.appendChild(style);
}
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}

// ──────────────── TRANSLATIONS ────────────────

const I18N = {
  ar: {
    'lang-toggle': 'EN', 'tables': 'الطاولات', 'print': 'طباعة', 'expenses': 'المصروفات', 'credit': 'الآجل', 'more': 'المزيد',
    'no-table': 'لم يتم اختيار طاولة', 'no-items': 'لا توجد عناصر بعد', 'subtotal': 'المجموع الفرعي', 'discount': 'الخصم', 'total': 'الإجمالي',
    'cash': 'نقدي', 'wallet': 'محفظة', 'credit-pay': 'آجل', 'search-placeholder': 'ابحث عن منتج...', 'select-table': 'اختر طاولة',
    'table': 'طاولة', 'remove': 'حذف', 'currency': 'ج.م', 'order-completed': 'تم إتمام الطلب بنجاح ✓', 'select-table-first': 'يرجى اختيار طاولة أولاً',
    'empty-order': 'الطلب فارغ', 'status-empty': 'فارغة', 'status-open': 'مفتوحة', 'status-printed': 'مطبوعة', 'bill-printed': 'تم طباعة الفاتورة',
    'table-selected': 'تم اختيار الطاولة',
  },
  en: {
    'lang-toggle': 'عربي', 'tables': 'Tables', 'print': 'Print', 'expenses': 'Expenses', 'credit': 'Credit', 'more': 'More',
    'no-table': 'No Table Selected', 'no-items': 'No items yet', 'subtotal': 'Subtotal', 'discount': 'Discount', 'total': 'Total',
    'cash': 'Cash', 'wallet': 'Wallet', 'credit-pay': 'Credit', 'search-placeholder': 'Search for a product...', 'select-table': 'Select a Table',
    'table': 'Table', 'remove': 'Remove', 'currency': 'EGP', 'order-completed': 'Order completed successfully ✓', 'select-table-first': 'Please select a table first',
    'empty-order': 'Order is empty', 'status-empty': 'Empty', 'status-open': 'Open', 'status-printed': 'Printed', 'bill-printed': 'Bill printed',
    'table-selected': 'Table selected',
  },
};

// ──────────────── STATE ────────────────

const state = {
  lang: 'ar',
  currentTable: null,
  selectedCategory: null,
  searchQuery: '',
  orders: {}, 
  categories: [],
  menuItems: [],
  tables: [],
  settings: {}
};

// ──────────────── SUPABASE INIT ────────────────

const SUPABASE_URL = 'https://wbyovaggjnnafbcrlimr.supabase.co'; 
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndieW92YWdnam5uYWZiY3JsaW1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5Njk1NDIsImV4cCI6MjEwMjU0NTU0Mn0.7aOgvhdB4YMoQJAZ90ow8tMEJZN4-jqh8p6-T2MfBCg'; 

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function openDB() { return true; }
async function seedDB() { return true; }

// ──────────────── DB WRAPPER (تعديل لدعم Supabase) ────────────────

async function dbOp(storeName, method, data = null) {
  try {
    if (method === 'getAll') {
      const { data: result, error } = await supabaseClient.from(storeName).select('*');
      if (error) throw error;
      return result || [];
    } 
    else if (method === 'get') {
      const { data: result, error } = await supabaseClient.from(storeName).select('*').eq('id', data).single();
      if (error && error.code !== 'PGRST116') throw error; 
      return result;
    } 
    else if (method === 'add') {
      if (data && data.items) delete data.items; 
      const { data: result, error } = await supabaseClient.from(storeName).insert(data).select().single();
      if (error) throw error;
      return result ? result.id : null; 
    } 
    else if (method === 'put') {
      if (data && data.items) delete data.items; 
      const { data: result, error } = await supabaseClient.from(storeName).upsert(data).select().single();
      if (error) throw error;
      return result;
    } 
    else if (method === 'delete') {
      const { error } = await supabaseClient.from(storeName).delete().eq('id', data);
      if (error) throw error;
    }
    else if (method === 'clear') {
      const { error } = await supabaseClient.from(storeName).delete().neq('id', 0);
      if (error) throw error;
    }
  } catch (error) {
    console.error(`DB Error on ${storeName} (${method}):`, error.message);
    showToast('خطأ في قاعدة البيانات: ' + error.message, true);
    return null;
  }
}

// ──────────────── HELPERS ────────────────

function t(key) { return I18N[state.lang][key] || key; }
function fmt(n) { return Number(n || 0).toFixed(2); }
function getCurrentOrder() { return state.currentTable ? state.orders[state.currentTable] : null; }

function applyLang() {
  const html = document.documentElement;
  html.lang = state.lang;
  html.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => { el.placeholder = t(el.dataset.i18nPlaceholder); });
}

let toastTimer = null;
function showToast(msg, isError = false) {
  const el = document.getElementById('toast');
  document.getElementById('toast-message').textContent = msg;
  el.style.backgroundColor = isError ? 'var(--error)' : 'var(--text-primary)';
  el.hidden = false;
  el.offsetHeight;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => { el.hidden = true; }, 200);
  }, 2200);
}

const isoDate = () => new Date().toISOString();

// ──────────────── CUSTOM MODAL HELPERS ────────────────

function openModal(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.add('open'); }
}
function closeModal(id) {
  const el = document.getElementById(id);
  if (el) { el.classList.remove('open'); }
}

function showConfirmModal(modalId, okBtnId, cancelBtnId) {
  return new Promise((resolve) => {
    openModal(modalId);
    const okBtn = document.getElementById(okBtnId);
    const cancelBtn = document.getElementById(cancelBtnId);
    const overlay = document.getElementById(modalId);

    const done = (result) => {
      closeModal(modalId);
      okBtn.removeEventListener('click', onOk);
      cancelBtn.removeEventListener('click', onCancel);
      overlay.removeEventListener('click', onOverlay);
      resolve(result);
    };
    const onOk = () => done(true);
    const onCancel = () => done(false);
    const onOverlay = (e) => { if (e.target === overlay) done(false); };

    okBtn.addEventListener('click', onOk);
    cancelBtn.addEventListener('click', onCancel);
    overlay.addEventListener('click', onOverlay);
  });
}

function showInputModal(modalId, inputId, okBtnId, cancelBtnId) {
  return new Promise((resolve) => {
    openModal(modalId);
    const input = document.getElementById(inputId);
    const okBtn = document.getElementById(okBtnId);
    const cancelBtn = document.getElementById(cancelBtnId);
    const overlay = document.getElementById(modalId);
    input.value = '';
    setTimeout(() => input.focus(), 200);

    const done = (val) => {
      closeModal(modalId);
      okBtn.removeEventListener('click', onOk);
      cancelBtn.removeEventListener('click', onCancel);
      overlay.removeEventListener('click', onOverlay);
      input.removeEventListener('keydown', onKey);
      resolve(val);
    };
    const onOk = () => { const v = input.value.trim(); if (v) done(v); else input.focus(); };
    const onCancel = () => done(null);
    const onOverlay = (e) => { if (e.target === overlay) done(null); };
    const onKey = (e) => { if (e.key === 'Enter') onOk(); if (e.key === 'Escape') done(null); };

    okBtn.addEventListener('click', onOk);
    cancelBtn.addEventListener('click', onCancel);
    overlay.addEventListener('click', onOverlay);
    input.addEventListener('keydown', onKey);
  });
}

// ──────────────── DB DATA FETCHING ────────────────

async function loadInitialData() {
  const s = await dbOp('settings', 'getAll');
  s.forEach(setting => state.settings[setting.key] = setting.value);
  if (state.settings.language) state.lang = state.settings.language;

  state.categories = await dbOp('categories', 'getAll');
  state.menuItems = await dbOp('menu_items', 'getAll');
  state.tables = await dbOp('tables', 'getAll');

  const allOrders = await dbOp('orders', 'getAll');
  const allOrderItems = await dbOp('order_items', 'getAll');

  state.orders = {};
  for (const o of allOrders) {
    if (o.status === 'open' || o.status === 'printed') {
      o.items = allOrderItems.filter(i => i.order_id === o.id);
      state.orders[o.table_id] = o;
    }
  }
}

// ──────────────── RENDERING ────────────────

function renderCategories() {
  const container = document.getElementById('category-tabs');
  let html = `<button class="cat-tab ${!state.selectedCategory ? 'active' : ''}" data-cat="" id="cat-all">
    <span class="cat-tab-emoji">☕</span>
    <span>${state.lang === 'ar' ? 'الكل' : 'All'}</span>
  </button>`;
  state.categories.sort((a, b) => a.sort_order - b.sort_order).forEach(c => {
    html += `<button class="cat-tab ${state.selectedCategory == c.id ? 'active' : ''}" data-cat="${c.id}" id="cat-${c.id}">
      <span class="cat-tab-emoji">${c.emoji || '🍽'}</span>
      <span>${state.lang === 'ar' ? c.name_ar : c.name_en}</span>
    </button>`;
  });
  container.innerHTML = html;
}

function renderMenu() {
  const container = document.getElementById('menu-grid');
  let items = state.menuItems.filter(i => i.is_available);

  if (state.selectedCategory) items = items.filter(i => i.category_id == state.selectedCategory);
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    items = items.filter(i => i.name_ar.includes(q) || (i.name_en && i.name_en.toLowerCase().includes(q)));
  }

  container.innerHTML = items.map(item => `
    <button class="menu-card" data-item-id="${item.id}">
      <div class="menu-card-body">
        <span class="menu-card-name-ar">${item.name_ar}</span>
        <span class="menu-card-name-en">${item.name_en}</span>
      </div>
      <div class="menu-card-footer">
        <span class="menu-card-price">${fmt(item.price)} <small>${t('currency')}</small></span>
        <span class="menu-card-add-icon">+</span>
      </div>
    </button>
  `).join('');
}

function renderOrder() {
  const container = document.getElementById('order-items');
  const titleEl = document.getElementById('table-title');
  const order = getCurrentOrder();

  if (state.currentTable) {
    const tbl = state.tables.find(t => t.id == state.currentTable);
    titleEl.innerHTML = tbl ? tbl.name : `${t('table')} #${state.currentTable}`;
    titleEl.classList.remove('table-title-placeholder');
  } else {
    titleEl.innerHTML = `<span class="table-title-placeholder">${t('no-table')}</span>`;
  }

  if (!order || !order.items || order.items.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#EDEDF0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>
        <p>${t('no-items')}</p>
      </div>`;
    updateTotals(null);
    return;
  }

  container.innerHTML = order.items.map(oi => `
    <div class="order-item">
      <div class="order-item-info">
        <div class="order-item-name-ar">${oi.name_ar}</div>
        <div class="order-item-name-en">${oi.name_en}</div>
      </div>
      <div class="order-item-controls">
        <div class="qty-control">
          <button class="qty-btn" data-action="dec" data-item="${oi.id}">−</button>
          <span class="qty-value">${oi.quantity}</span>
          <button class="qty-btn" data-action="inc" data-item="${oi.id}">+</button>
        </div>
        <span class="order-item-total">${fmt(oi.line_total)} ${t('currency')}</span>
        <button class="order-item-remove" data-action="remove" data-item="${oi.id}">${t('remove')}</button>
      </div>
    </div>`).join('');

  updateTotals(order);
}

function updateTotals(order) {
  let subtotal = 0;
  if (order && order.items) {
    subtotal = order.items.reduce((sum, oi) => sum + oi.line_total, 0);
    order.subtotal = subtotal;
    order.total = Math.max(0, subtotal - (order.discount || 0));
  }

  document.getElementById('subtotal').innerHTML = `${fmt(order ? order.subtotal : 0)} <small>${t('currency')}</small>`;
  document.getElementById('total-value').innerHTML = `${fmt(order ? order.total : 0)} <small>${t('currency')}</small>`;
  const discInput = document.getElementById('discount-input');
  if (document.activeElement !== discInput) {
    const disc = order ? order.discount : 0;
    discInput.value = disc > 0 ? disc : '';
  }
}

function renderTables() {
  const container = document.getElementById('tables-grid');
  container.innerHTML = state.tables.map(tbl => {
    const isSelected = state.currentTable == tbl.id;
    const order = state.orders[tbl.id];
    const total = order ? order.total : 0;
    return `
      <button class="table-cell ${isSelected ? 'selected' : ''}" data-table-id="${tbl.id}" data-status="${tbl.status}">
        <span class="table-cell-number">${tbl.id}</span>
        ${tbl.status !== 'empty' ? `<span class="table-cell-total">${fmt(total)} ${t('currency')}</span>` : ''}
      </button>`;
  }).join('');
}

// ──────────────── CASHIER ACTIONS ────────────────

async function addToOrder(itemId) {
  try {
    if (!state.currentTable) return showToast(t('select-table-first'), true);

    let order = getCurrentOrder();
    if (!order) {
      const orderId = await dbOp('orders', 'add', {
        table_id: state.currentTable, status: 'open', discount: 0, subtotal: 0, total: 0, created_at: isoDate()
      });
      order = await dbOp('orders', 'get', orderId);
      order.items = [];
      state.orders[state.currentTable] = order;

      const tbl = state.tables.find(t => t.id == state.currentTable);
      if (tbl) { tbl.status = 'open'; await dbOp('tables', 'put', tbl); }
    }

    const menuItem = state.menuItems.find(i => i.id == itemId);
    if (!menuItem) return;

    let existing = order.items.find(i => i.item_id == itemId);
    if (existing) {
      existing.quantity++;
      existing.line_total = existing.quantity * menuItem.price;
      await dbOp('order_items', 'put', existing);
    } else {
      const oi = {
        order_id: order.id, item_id: itemId, name_ar: menuItem.name_ar, name_en: menuItem.name_en,
        price: menuItem.price, quantity: 1, line_total: menuItem.price
      };
      const oiId = await dbOp('order_items', 'add', oi);
      oi.id = oiId;
      order.items.push(oi);
    }

    updateTotals(order);
    await dbOp('orders', 'put', { ...order, items: undefined });
    renderOrder();
  } catch (e) { console.error(e); showToast('Error', true); }
}

async function changeQty(orderItemId, delta) {
  try {
    const order = getCurrentOrder();
    if (!order) return;
    const item = order.items.find(i => i.id == orderItemId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      await removeItem(orderItemId);
      return;
    }

    item.line_total = item.quantity * item.price;
    await dbOp('order_items', 'put', item);
    updateTotals(order);
    await dbOp('orders', 'put', { ...order, items: undefined });
    renderOrder();
  } catch (e) { console.error(e); }
}

async function removeItem(orderItemId) {
  try {
    const order = getCurrentOrder();
    if (!order) return;
    const idx = order.items.findIndex(i => i.id == orderItemId);
    if (idx === -1) return;

    await dbOp('order_items', 'delete', orderItemId);
    order.items.splice(idx, 1);

    updateTotals(order);
    await dbOp('orders', 'put', { ...order, items: undefined });

    if (order.items.length === 0) {
      const tbl = state.tables.find(t => t.id == state.currentTable);
      if (tbl) { tbl.status = 'empty'; await dbOp('tables', 'put', tbl); }
    }
    renderOrder();
  } catch (e) { console.error(e); }
}

async function selectTable(id) {
  state.currentTable = Number(id);
  renderOrder();
  document.getElementById('tables-modal').hidden = true;
  const tbl = state.tables.find(t => t.id == id);
  if (tbl) showToast(`${t('table-selected')} ${tbl.name}`);
}

async function completeOrder(method, customerId = null) {
  try {
    if (!state.currentTable) return showToast(t('select-table-first'), true);
    const order = getCurrentOrder();
    if (!order || !order.items || order.items.length === 0) return showToast(t('empty-order'), true);

    order.status = 'paid';
    order.payment_method = method;
    order.paid_at = isoDate();
    order.customer_id = customerId;
    await dbOp('orders', 'put', { ...order, items: undefined });

    if (method === 'credit' && customerId) {
      const summary = order.items.map(i => `${i.name_ar} (x${i.quantity})`).join(', ');
      await dbOp('credit_orders', 'add', {
        customer_id: customerId, order_id: order.id, amount: order.total,
        items_summary: summary, is_paid: 0, created_at: order.paid_at, paid_at: null
      });
      const cust = await dbOp('customers', 'get', customerId);
      if (cust) {
        cust.total_credit = (cust.total_credit || 0) + order.total;
        await dbOp('customers', 'put', cust);
      }
    }

    const tbl = state.tables.find(t => t.id == state.currentTable);
    if (tbl) { tbl.status = 'empty'; await dbOp('tables', 'put', tbl); }

    delete state.orders[state.currentTable];
    state.currentTable = null;
    renderOrder();
    showToast(t('order-completed'));
  } catch (e) { console.error(e); showToast('Error', true); }
}
async function printBill() {
  try {
    const order = getCurrentOrder();
    if (!order) return;

    const cur = t('currency');
    const now = new Date();

    const tblObj = state.tables.find(tb => tb.id == state.currentTable);
    const tblDisplay = tblObj ? tblObj.name.replace(/[^\d]/g, '') || tblObj.name : (order.table_id || state.currentTable || '—');
    document.getElementById('print-table-num').textContent = tblDisplay;

    const dateStr = now.toLocaleDateString('en-GB');
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    document.getElementById('print-date-time').textContent = `Printed At: ${dateStr} ${timeStr}`;

    const invoiceNum = order.id ? String(order.id).padStart(6, '0') : '000000';
    document.getElementById('print-invoice-id').textContent = invoiceNum;

    const tbody = document.getElementById('print-invoice-items');
    tbody.innerHTML = '';
    let subtotal = 0, count = 0;

    order.items.forEach(item => {
      const price     = parseFloat(item.price) || 0;
      const qty       = parseInt(item.quantity) || 0;
      const lineTotal = price * qty;
      subtotal += lineTotal;
      count    += qty;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="inv-td-qty">${qty}</td>
        <td class="inv-td-item">${item.name_ar || item.name_en || item.name}</td>
        <td class="inv-td-price">${cur} ${lineTotal.toFixed(2)}</td>`;
      tbody.appendChild(tr);
    });

    const discount = parseFloat(order.discount) || 0;
    const total    = subtotal - discount;
    document.getElementById('invoice-subtotal').textContent = `${cur} ${subtotal.toFixed(2)}`;
    document.getElementById('invoice-discount').textContent = `${cur} ${discount.toFixed(2)}`;
    document.getElementById('invoice-total').textContent    = `${cur} ${total.toFixed(2)}`;
    document.getElementById('invoice-items-count').textContent = `Products Count ${count}`;

    const discRow = document.getElementById('inv-discount-wrap');
    if (discRow) discRow.style.display = discount > 0 ? '' : 'none';

    if (state.currentTable) {
      const tbl = state.tables.find(tb => tb.id == state.currentTable);
      if (tbl && tbl.status !== 'empty') {
        tbl.status = 'printed';
        await dbOp('tables', 'put', tbl);
        const o2 = getCurrentOrder();
        if (o2) { o2.status = 'printed'; await dbOp('orders', 'put', { ...o2, items: undefined }); }
        renderTables();
      }
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        window.print();
      });
    });

  } catch (e) {
    console.error('خطأ في الطباعة:', e);
    showToast('حدث خطأ أثناء الطباعة', true);
  }
}
let enteredPin = '';

function updatePinDisplay() {
  const dots = document.querySelectorAll('.pin-dot');
  dots.forEach((dot, i) => {
    dot.classList.toggle('filled', i < enteredPin.length);
  });
}

function handlePinInput(val) {
  const submit = () => {
    const ownerPin = state.settings.owner_pin || '2525';
    if (enteredPin === ownerPin) {
      document.getElementById('pin-modal').hidden = true;
      document.getElementById('app').style.display = 'none';
      openDashboard();
      enteredPin = '';
    } else {
      const err = document.getElementById('pin-error');
      err.hidden = false;
      const pad = document.getElementById('pin-display');
      pad.classList.remove('shake');
      void pad.offsetWidth;
      pad.classList.add('shake');
      setTimeout(() => {
        enteredPin = '';
        updatePinDisplay();
      }, 500);
    }
  };

  if (val === 'C') {
    enteredPin = '';
    document.getElementById('pin-error').hidden = true;
  } else if (val === 'E') {
    submit();
  } else {
    if (enteredPin.length < 4) {
      enteredPin += val;
      if (enteredPin.length === 4) {
        submit();
      }
    }
  }
  updatePinDisplay();
}

function openDashboard() {
  const dash = document.getElementById('owner-dashboard');
  dash.style.display = 'flex';
  dash.style.flexDirection = 'row-reverse';
  loadDashboardTab('reports');
}

function closeDashboard() {
  document.getElementById('owner-dashboard').style.display = 'none';
  document.getElementById('app').style.display = 'flex';
  loadInitialData().then(() => {
    renderCategories();
    renderMenu();
    renderTables();
    renderOrder();
  });
}

async function loadDashboardTab(tab) {
  if (tab === 'menu') console.log('Menu clicked');
  document.querySelectorAll('.dash-tab-pane').forEach(el => {
    el.classList.remove('active');
    el.style.display = 'none';
  });
  document.querySelectorAll('.dash-nav-item').forEach(el => el.classList.remove('active'));

  const activePane = document.getElementById(`tab-${tab}`);
  if (activePane) {
    activePane.classList.add('active');
    activePane.style.display = tab === 'menu' ? 'block' : 'block';
    if (tab === 'menu') activePane.style.height = '100%';
  }

  const activeNav = document.querySelector(`.dash-nav-item[data-tab="${tab}"]`);
  if (activeNav) activeNav.classList.add('active');

  if (tab === 'reports') loadReports();
  if (tab === 'menu') loadMenuTab();
  if (tab === 'tables') loadTablesMgmt();
  if (tab === 'expenses') loadExpensesMgmt();
  if (tab === 'customers') loadCustomersMgmt();
  if (tab === 'settings') loadSettingsMgmt();
}

let _repType = 'today';
let _repDate = null;

async function loadReports(type) {
  if (type) _repType = type;

  document.querySelectorAll('.dash-toggle-btn').forEach(b => b.classList.remove('active'));
  const activeBtn = document.getElementById(`rep-${_repType}`);
  if (activeBtn) activeBtn.classList.add('active');

  const orders       = await dbOp('orders',           'getAll');
  const creditOrders = await dbOp('credit_orders',    'getAll');
  const expenses     = await dbOp('expenses',         'getAll');
  const orderItems   = await dbOp('order_items',      'getAll');
  const customers    = await dbOp('customers',        'getAll');
  const expCats      = await dbOp('expense_categories','getAll');
  const expPurchases = await dbOp('expense_purchases', 'getAll');

  const todayStr = isoDate().split('T')[0];
  const monthStr = todayStr.substring(0, 7);

  const pickerVal = document.getElementById('rep-date-picker')?.value || '';

  const filterDate  = pickerVal || todayStr;
  const filterMonth = pickerVal ? pickerVal.substring(0, 7) : monthStr;

  const matchDate = (dateStr) => {
    if (!dateStr) return false;
    const d = (dateStr.split('T')[0]);
    if (_repType === 'today') return d === filterDate;
    return d.substring(0, 7) === filterMonth;
  };

  const lbl = document.getElementById('rep-date-label');
  if (lbl) {
    if (pickerVal && pickerVal !== todayStr) lbl.textContent = `بيانات ${pickerVal}`;
    else if (_repType === 'today') lbl.textContent = `اليوم — ${todayStr}`;
    else lbl.textContent = `الشهر — ${filterMonth}`;
  }

  let cashRev = 0, walletRev = 0, creditPaidRev = 0;
  orders.forEach(o => {
    if (o.status === 'paid' && matchDate(o.paid_at)) {
      if (o.payment_method === 'cash')   cashRev   += o.total;
      if (o.payment_method === 'wallet') walletRev += o.total;
    }
  });
  creditOrders.forEach(co => {
    if (co.is_paid && matchDate(co.paid_at)) creditPaidRev += co.amount;
  });
  const revenue = cashRev + walletRev;

  let expPrimary = 0, expRaw = 0, expSecondary = 0;
  expenses.forEach(e => {
    if (!matchDate(e.created_at)) return;
    const cat = expCats.find(c => c.id === e.category_id);
    const ctype = cat?.type || 'secondary';
    if (ctype === 'primary')   expPrimary   += e.amount;
    else if (ctype === 'raw')  expRaw       += e.amount;
    else                       expSecondary += e.amount;
  });
  const expTotal = expPrimary + expRaw + expSecondary;

  let expCreditPaid = 0;
  expPurchases.forEach(ep => {
    if ((ep.is_paid === 1 || ep.paid_amount > 0) && matchDate(ep.paid_at || ep.created_at)) {
      expCreditPaid += ep.paid_amount || ep.amount;
    }
  });

  const itemCounts = {};
  orders.forEach(o => {
    if (o.status === 'paid' && matchDate(o.paid_at)) {
      orderItems.filter(oi => oi.order_id === o.id).forEach(oi => {
        itemCounts[oi.item_id] = (itemCounts[oi.item_id] || 0) + oi.quantity;
      });
    }
  });
  let topItemId = null, topQty = 0;
  for (const [id, qty] of Object.entries(itemCounts)) {
    if (qty > topQty) { topQty = qty; topItemId = id; }
  }
  let topItemName = '—';
  if (topItemId) {
    const it = await dbOp('menu_items', 'get', Number(topItemId));
    if (it) topItemName = `${it.name_ar} (${topQty})`;
  }

  let cashOnHand = 0;
  orders.forEach(o => {
    if (o.status === 'paid' && ['cash','wallet'].includes(o.payment_method) && o.paid_at?.startsWith(monthStr)) cashOnHand += o.total;
  });
  creditOrders.forEach(co => { if (co.is_paid && co.paid_at?.startsWith(monthStr)) cashOnHand += co.amount; });
  expenses.forEach(e => { if (e.created_at?.startsWith(monthStr)) cashOnHand -= e.amount; });
  expPurchases.forEach(ep => {
    if (ep.paid_amount > 0 && ep.paid_at?.startsWith(monthStr)) cashOnHand -= ep.paid_amount;
  });

  const drawerSetting     = await dbOp('settings', 'get', 'drawer_balance');
  const drawerDateSetting = await dbOp('settings', 'get', 'drawer_balance_date');
  const drawerSavedDate   = drawerDateSetting?.value || '';
  const drawerBalance = (drawerSavedDate === filterDate)
    ? Number(drawerSetting?.value || 0)
    : 0;

  const netIncome = revenue + creditPaidRev + drawerBalance - expCreditPaid - expTotal;

  const cur = t('currency');
  document.getElementById('rep-cash-on-hand').textContent  = `${fmt(cashOnHand)} ${cur}`;
  document.getElementById('rep-cash').textContent          = `${fmt(cashRev)} ${cur}`;
  document.getElementById('rep-wallet').textContent        = `${fmt(walletRev)} ${cur}`;
  document.getElementById('rep-credit-paid').textContent   = `${fmt(creditPaidRev)} ${cur}`;
  document.getElementById('rep-revenue').textContent       = `${fmt(revenue + creditPaidRev)} ${cur}`;

  const netEl = document.getElementById('rep-net');
  if (netEl) {
    netEl.textContent = `${netIncome < 0 ? '-' : ''}${fmt(Math.abs(netIncome))} ${cur}`;
    const netCard = netEl.closest('.kpi-card');
    if (netCard) {
      if (netIncome < 0) {
        netCard.style.background = 'linear-gradient(135deg, #DC2626, #b91c1c)';
      } else {
        netCard.style.background = '';
      }
    }
  }

  document.getElementById('rep-top-item').textContent      = topItemName;
  document.getElementById('rep-exp-primary').textContent   = `${fmt(expPrimary)} ${cur}`;
  document.getElementById('rep-exp-raw').textContent       = `${fmt(expRaw)} ${cur}`;
  document.getElementById('rep-exp-secondary').textContent = `${fmt(expSecondary)} ${cur}`;
  const expCreditEl = document.getElementById('rep-exp-credit-paid');
  if (expCreditEl) expCreditEl.textContent = `${fmt(expCreditPaid)} ${cur}`;
  const drawerEl = document.getElementById('rep-drawer-balance');
  if (drawerEl) drawerEl.textContent = `${fmt(drawerBalance)} ${cur}`;

  const unpaidPurchases = expPurchases.filter(ep => !ep.is_paid || ep.paid_amount < ep.amount);
  const purchasesBar = document.getElementById('exp-purchases-bar');
  if (purchasesBar) {
    if (unpaidPurchases.length > 0) {
      purchasesBar.innerHTML = unpaidPurchases.map(ep => {
        const remaining = ep.amount - (ep.paid_amount || 0);
        const dateStr = ep.created_at ? ep.created_at.split('T')[0] : '—';
        return `<div class="credit-summary-row" style="flex-wrap:wrap;gap:8px;">
          <div style="flex:1;min-width:120px;">
            <div class="credit-summary-name">${ep.supplier_name || ep.category_name}</div>
            <div style="font-size:11px;color:var(--text-secondary);margin-top:2px;">${dateStr} ${ep.note && ep.note !== ep.supplier_name ? '· ' + ep.note : ''}</div>
          </div>
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="credit-summary-amt">${fmt(remaining)} ${cur}</span>
            <button class="dash-btn-primary" style="height:32px;padding:0 14px;font-size:12px;" onclick="window.openExpCreditPayModal(${ep.id})">دفع</button>
          </div>
        </div>`;
      }).join('');
    } else {
      purchasesBar.innerHTML = `<div class="credit-summary-empty">✓ لا توجد بضاعة آجل غير مدفوعة</div>`;
    }
  }

  const unpaid = creditOrders.filter(co => !co.is_paid);
  const grouped = {};
  unpaid.forEach(co => {
    if (!grouped[co.customer_id]) grouped[co.customer_id] = { id: co.customer_id, total: 0 };
    grouped[co.customer_id].total += co.amount;
  });
  const bar = document.getElementById('credit-summary-bar');
  if (Object.keys(grouped).length > 0) {
    bar.innerHTML = Object.values(grouped).map(g => {
      const c = customers.find(x => x.id === g.id);
      return `<div class="credit-summary-row">
        <span class="credit-summary-name">${c ? c.name : 'عميل'}</span>
        <span class="credit-summary-amt">${fmt(g.total)} ${cur}</span>
      </div>`;
    }).join('');
  } else {
    bar.innerHTML = `<div class="credit-summary-empty">✓ لا توجد مبالغ آجلة مستحقة</div>`;
  }
}

let _cashInvoicesData = [];

async function showCashInvoices() {
  const orders = await dbOp('orders', 'getAll');
  const orderItems = await dbOp('order_items', 'getAll');
  const todayStr = isoDate().split('T')[0];
  const monthStr = todayStr.substring(0, 7);
  const pickerVal = document.getElementById('rep-date-picker')?.value || '';
  const filterDate  = pickerVal || todayStr;
  const filterMonth = pickerVal ? pickerVal.substring(0, 7) : monthStr;
  const matchDate = (d) => {
    if (!d) return false;
    const day = d.split('T')[0];
    if (_repType === 'today') return day === filterDate;
    return day.substring(0, 7) === filterMonth;
  };
  const cur = t('currency');
  const cashOrders = orders.filter(o => o.status === 'paid' && o.payment_method === 'cash' && matchDate(o.paid_at));

  _cashInvoicesData = cashOrders.map(o => ({
    ...o,
    items: orderItems.filter(oi => oi.order_id === o.id),
    summary: orderItems.filter(oi => oi.order_id === o.id).map(oi => `${oi.name_ar} ×${oi.quantity}`).join('، ')
  }));

  renderCashInvoicesList('', cur);

  const searchEl = document.getElementById('cash-invoices-search');
  if (searchEl) {
    searchEl.value = '';
    searchEl.oninput = () => renderCashInvoicesList(searchEl.value, cur);
  }
  openModal('cm-cash-invoices');
}

function renderCashInvoicesList(query, cur) {
  const list = document.getElementById('cash-invoices-list');
  if (!list) return;
  const q = query.trim().toLowerCase();
  const filtered = q
    ? _cashInvoicesData.filter(o =>
        `فاتورة ${o.id} طاولة ${o.table_id} ${o.summary}`.toLowerCase().includes(q))
    : _cashInvoicesData;

  if (filtered.length === 0) {
    list.innerHTML = `<div style="text-align:center;padding:32px;color:var(--text-secondary);">${q ? 'لا نتائج للبحث' : 'لا توجد فواتير كاش في هذه الفترة'}</div>`;
    return;
  }
  const total = filtered.reduce((s, o) => s + o.total, 0);
  list.innerHTML = filtered.map(o => `
    <div style="padding:12px 16px;border-bottom:1px solid var(--border);">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
        <span style="font-weight:700;font-size:14px;">فاتورة #${String(o.id).slice(-4)} — طاولة ${o.table_id}</span>
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="font-weight:800;font-size:14px;color:#16A34A;">${fmt(o.total)} ${cur}</span>
          <button onclick="window.reprintInvoice(${o.id},'cash')"
            style="height:30px;padding:0 10px;background:var(--primary-light);color:var(--primary);border:1.5px solid rgba(74,29,150,0.2);border-radius:7px;font-size:12px;font-weight:700;cursor:pointer;font-family:'Cairo',sans-serif;display:flex;align-items:center;gap:4px;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
            طباعة
          </button>
        </div>
      </div>
      <div style="font-size:12px;color:var(--text-secondary);">${o.paid_at ? o.paid_at.split('T')[0] + ' ' + (o.paid_at.split('T')[1]||'').substring(0,5) : '—'}</div>
      ${o.summary ? `<div style="font-size:11px;color:var(--text-secondary);margin-top:2px;">${o.summary}</div>` : ''}
    </div>`).join('') +
    `<div style="padding:12px 16px;display:flex;justify-content:space-between;font-weight:800;font-size:15px;border-top:2px solid var(--border);">
      <span>الإجمالي</span><span style="color:#16A34A;">${fmt(total)} ${cur}</span>
    </div>`;
}

let _walletInvoicesData = [];

async function showWalletInvoices() {
  const orders = await dbOp('orders', 'getAll');
  const orderItems = await dbOp('order_items', 'getAll');
  const todayStr = isoDate().split('T')[0];
  const monthStr = todayStr.substring(0, 7);
  const pickerVal = document.getElementById('rep-date-picker')?.value || '';
  const filterDate  = pickerVal || todayStr;
  const filterMonth = pickerVal ? pickerVal.substring(0, 7) : monthStr;
  const matchDate = (d) => {
    if (!d) return false;
    const day = d.split('T')[0];
    if (_repType === 'today') return day === filterDate;
    return day.substring(0, 7) === filterMonth;
  };
  const cur = t('currency');
  const walletOrders = orders.filter(o => o.status === 'paid' && o.payment_method === 'wallet' && matchDate(o.paid_at));

  _walletInvoicesData = walletOrders.map(o => ({
    ...o,
    items: orderItems.filter(oi => oi.order_id === o.id),
    summary: orderItems.filter(oi => oi.order_id === o.id).map(oi => `${oi.name_ar} ×${oi.quantity}`).join('، ')
  }));

  renderWalletInvoicesList('', cur);

  const searchEl = document.getElementById('wallet-invoices-search');
  if (searchEl) {
    searchEl.value = '';
    searchEl.oninput = () => renderWalletInvoicesList(searchEl.value, cur);
  }
  openModal('cm-wallet-invoices');
}

function renderWalletInvoicesList(query, cur) {
  const list = document.getElementById('wallet-invoices-list');
  if (!list) return;
  const q = query.trim().toLowerCase();
  const filtered = q
    ? _walletInvoicesData.filter(o =>
        `فاتورة ${o.id} طاولة ${o.table_id} ${o.summary}`.toLowerCase().includes(q))
    : _walletInvoicesData;

  if (filtered.length === 0) {
    list.innerHTML = `<div style="text-align:center;padding:32px;color:var(--text-secondary);">${q ? 'لا نتائج للبحث' : 'لا توجد فواتير محفظة في هذه الفترة'}</div>`;
    return;
  }
  const total = filtered.reduce((s, o) => s + o.total, 0);
  list.innerHTML = filtered.map(o => `
    <div style="padding:12px 16px;border-bottom:1px solid var(--border);">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
        <span style="font-weight:700;font-size:14px;">فاتورة #${String(o.id).slice(-4)} — طاولة ${o.table_id}</span>
        <div style="display:flex;align-items:center;gap:8px;">
          <span style="font-weight:800;font-size:14px;color:#1565C0;">${fmt(o.total)} ${cur}</span>
          <button onclick="window.reprintInvoice(${o.id},'wallet')"
            style="height:30px;padding:0 10px;background:var(--primary-light);color:var(--primary);border:1.5px solid rgba(74,29,150,0.2);border-radius:7px;font-size:12px;font-weight:700;cursor:pointer;font-family:'Cairo',sans-serif;display:flex;align-items:center;gap:4px;">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
            طباعة
          </button>
        </div>
      </div>
      <div style="font-size:12px;color:var(--text-secondary);">${o.paid_at ? o.paid_at.split('T')[0] + ' ' + (o.paid_at.split('T')[1]||'').substring(0,5) : '—'}</div>
      ${o.summary ? `<div style="font-size:11px;color:var(--text-secondary);margin-top:2px;">${o.summary}</div>` : ''}
    </div>`).join('') +
    `<div style="padding:12px 16px;display:flex;justify-content:space-between;font-weight:800;font-size:15px;border-top:2px solid var(--border);">
      <span>الإجمالي</span><span style="color:#1565C0;">${fmt(total)} ${cur}</span>
    </div>`;
}

let _creditPaidData = [];
async function showCreditPaidDetail() {
  const creditOrders = await dbOp('credit_orders', 'getAll');
  const customers    = await dbOp('customers',     'getAll');
  const todayStr = isoDate().split('T')[0];
  const monthStr = todayStr.substring(0, 7);
  const pickerVal = document.getElementById('rep-date-picker')?.value || '';
  const filterDate  = pickerVal || todayStr;
  const filterMonth = pickerVal ? pickerVal.substring(0, 7) : monthStr;
  const matchDate = (d) => {
    if (!d) return false;
    const day = d.split('T')[0];
    if (_repType === 'today') return day === filterDate;
    return day.substring(0, 7) === filterMonth;
  };
  const cur = t('currency');
  _creditPaidData = creditOrders
    .filter(co => co.is_paid && matchDate(co.paid_at))
    .map(co => ({ ...co, custName: (customers.find(c => c.id === co.customer_id)?.name || 'عميل') }));

  renderCreditPaidList('', cur);
  const searchEl = document.getElementById('credit-paid-search');
  if (searchEl) { searchEl.value = ''; searchEl.oninput = () => renderCreditPaidList(searchEl.value, cur); }
  openModal('cm-credit-paid-detail');
}
function renderCreditPaidList(query, cur) {
  const list = document.getElementById('credit-paid-detail-list');
  if (!list) return;
  const q = query.trim().toLowerCase();
  const filtered = q ? _creditPaidData.filter(co => co.custName.toLowerCase().includes(q) || (co.items_summary||'').toLowerCase().includes(q)) : _creditPaidData;
  if (filtered.length === 0) {
    list.innerHTML = `<div style="text-align:center;padding:32px;color:var(--text-secondary);">${q ? 'لا نتائج للبحث' : 'لا توجد مدفوعات آجل في هذه الفترة'}</div>`;
    return;
  }
  const total = filtered.reduce((s, co) => s + co.amount, 0);
  list.innerHTML = filtered.map(co => `
    <div class="daily-row" style="flex-direction:column;align-items:flex-start;gap:4px;">
      <div style="display:flex;justify-content:space-between;width:100%;align-items:center;">
        <span style="font-weight:700;font-size:14px;">${co.custName}</span>
        <span class="daily-amt" style="color:#E65100;">${fmt(co.amount)} ${cur}</span>
      </div>
      <div style="font-size:12px;color:var(--text-secondary);">${co.paid_at ? co.paid_at.split('T')[0] : '—'}</div>
      ${co.items_summary ? `<div style="font-size:11px;color:var(--text-secondary);">${co.items_summary}</div>` : ''}
    </div>`).join('') +
    `<div style="border-top:2px solid var(--border);margin-top:8px;padding-top:10px;display:flex;justify-content:space-between;font-weight:800;font-size:15px;">
      <span>الإجمالي المحصل</span><span style="color:#E65100;">${fmt(total)} ${cur}</span>
    </div>`;
}

async function showTopItemsDetail() {
  const orders     = await dbOp('orders',      'getAll');
  const orderItems = await dbOp('order_items', 'getAll');
  const menuItems  = await dbOp('menu_items',  'getAll');
  const todayStr = isoDate().split('T')[0];
  const monthStr = todayStr.substring(0, 7);
  const pickerVal = document.getElementById('rep-date-picker')?.value || '';
  const filterDate  = pickerVal || todayStr;
  const filterMonth = pickerVal ? pickerVal.substring(0, 7) : monthStr;
  const matchDate = (d) => {
    if (!d) return false;
    const day = d.split('T')[0];
    if (_repType === 'today') return day === filterDate;
    return day.substring(0, 7) === filterMonth;
  };
  const itemCounts = {};
  const itemRevenue = {};
  orders.forEach(o => {
    if (o.status === 'paid' && matchDate(o.paid_at)) {
      orderItems.filter(oi => oi.order_id === o.id).forEach(oi => {
        itemCounts[oi.item_id]  = (itemCounts[oi.item_id]  || 0) + oi.quantity;
        itemRevenue[oi.item_id] = (itemRevenue[oi.item_id] || 0) + oi.line_total;
      });
    }
  });
  const sorted = Object.entries(itemCounts).sort((a, b) => b[1] - a[1]);
  const cur = t('currency');
  const list = document.getElementById('top-items-list');
  if (!list) return;
  if (sorted.length === 0) {
    list.innerHTML = `<div style="text-align:center;padding:32px;color:var(--text-secondary);">لا توجد مبيعات في هذه الفترة</div>`;
  } else {
    const maxQty = sorted[0][1];
    list.innerHTML = sorted.map(([id, qty], idx) => {
      const item = menuItems.find(m => m.id == id);
      const name = item ? item.name_ar : `منتج #${id}`;
      const rev  = itemRevenue[id] || 0;
      const pct  = Math.round((qty / maxQty) * 100);
      return `<div style="padding:10px 4px; border-bottom:1px solid var(--border);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="width:22px;height:22px;border-radius:50%;background:${idx===0?'var(--primary)':idx===1?'#1565C0':idx===2?'#16A34A':'var(--border)'};color:${idx<3?'white':'var(--text-secondary)'};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0;">${idx+1}</span>
            <span style="font-weight:700;font-size:14px;">${name}</span>
          </div>
          <div style="text-align:left;">
            <div style="font-weight:800;font-size:14px;color:var(--primary);">${qty} قطعة</div>
            <div style="font-size:11px;color:var(--text-secondary);">${fmt(rev)} ${cur}</div>
          </div>
        </div>
        <div style="height:4px;background:var(--border);border-radius:2px;">
          <div style="height:100%;width:${pct}%;background:${idx===0?'var(--primary)':'#E4E1EC'};border-radius:2px;transition:width 0.3s;"></div>
        </div>
      </div>`;
    }).join('');
  }
  openModal('cm-top-items');
}


let _expDetailData = {};
async function showExpenseDetail(type) {
  const expenses = await dbOp('expenses', 'getAll');
  const expCats  = await dbOp('expense_categories', 'getAll');
  const todayStr = isoDate().split('T')[0];
  const monthStr = todayStr.substring(0, 7);
  const pickerVal = document.getElementById('rep-date-picker')?.value || '';
  const filterDate  = pickerVal || todayStr;
  const filterMonth = pickerVal ? pickerVal.substring(0, 7) : monthStr;
  const matchDate = (d) => {
    if (!d) return false;
    const day = d.split('T')[0];
    if (_repType === 'today') return day === filterDate;
    return day.substring(0, 7) === filterMonth;
  };
  const cur = t('currency');
  const typeColors = { primary: 'var(--error)', raw: '#E65100', secondary: 'var(--text-secondary)' };
  const modalIds  = { primary: 'cm-exp-primary-detail', raw: 'cm-exp-raw-detail', secondary: 'cm-exp-secondary-detail' };
  const listIds   = { primary: 'exp-primary-detail-list', raw: 'exp-raw-detail-list', secondary: 'exp-secondary-detail-list' };
  const searchIds = { primary: 'exp-primary-search', raw: 'exp-raw-search', secondary: 'exp-secondary-search' };
  const typeLabels = { primary: 'مصروفات أساسية', raw: 'مصروفات خامات', secondary: 'مصروفات ثانوية' };

  _expDetailData[type] = expenses
    .filter(e => matchDate(e.created_at) && (expCats.find(c => c.id === e.category_id)?.type || 'secondary') === type)
    .map(e => ({ ...e, catName: expCats.find(c => c.id === e.category_id)?.name || '' }));

  renderExpenseDetailList(type, '', cur, typeColors, listIds, typeLabels);
  const searchEl = document.getElementById(searchIds[type]);
  if (searchEl) {
    searchEl.value = '';
    searchEl.oninput = () => renderExpenseDetailList(type, searchEl.value, cur, typeColors, listIds, typeLabels);
  }
  openModal(modalIds[type]);
}

function renderExpenseDetailList(type, query, cur, typeColors, listIds, typeLabels) {
  const list = document.getElementById(listIds[type]);
  if (!list) return;
  const q = query.trim().toLowerCase();
  const data = _expDetailData[type] || [];
  const filtered = q ? data.filter(e => (e.note||'').toLowerCase().includes(q) || e.catName.toLowerCase().includes(q)) : data;
  if (filtered.length === 0) {
    list.innerHTML = `<div style="text-align:center;padding:32px;color:var(--text-secondary);">${q ? 'لا نتائج للبحث' : 'لا توجد ' + typeLabels[type] + ' في هذه الفترة'}</div>`;
    return;
  }
  const total = filtered.reduce((s, e) => s + e.amount, 0);
  list.innerHTML = filtered.map(e => `
    <div class="daily-row" style="flex-direction:column;align-items:flex-start;gap:4px;">
      <div style="display:flex;justify-content:space-between;width:100%;align-items:center;">
        <span style="font-weight:700;font-size:14px;">${e.note || e.catName || '—'}</span>
        <span style="font-weight:800;font-size:14px;color:${typeColors[type]};">${fmt(e.amount)} ${cur}</span>
      </div>
      <div style="font-size:12px;color:var(--text-secondary);">${e.catName}${e.created_at ? ' · ' + e.created_at.split('T')[0] : ''}</div>
    </div>`).join('') +
    `<div style="border-top:2px solid var(--border);margin-top:8px;padding-top:10px;display:flex;justify-content:space-between;font-weight:800;font-size:15px;">
      <span>الإجمالي</span><span style="color:${typeColors[type]};">${fmt(total)} ${cur}</span>
    </div>`;
}

async function showDailyRevenue() {
  const orders       = await dbOp('orders',        'getAll');
  const creditOrders = await dbOp('credit_orders', 'getAll');

  const byDate = {};
  orders.forEach(o => {
    if (o.status !== 'paid' || !o.paid_at) return;
    const d = o.paid_at.split('T')[0];
    if (!byDate[d]) byDate[d] = 0;
    byDate[d] += o.total;
  });
  creditOrders.forEach(co => {
    if (!co.is_paid || !co.paid_at) return;
    const d = co.paid_at.split('T')[0];
    if (!byDate[d]) byDate[d] = 0;
    byDate[d] += co.amount;
  });

  const sorted = Object.entries(byDate).sort((a,b) => b[0].localeCompare(a[0]));
  const cur = t('currency');
  const list = document.getElementById('daily-revenue-list');

  if (sorted.length === 0) {
    list.innerHTML = `<div style="text-align:center; padding:32px; color:var(--text-secondary);">لا توجد بيانات بعد</div>`;
  } else {
    list.innerHTML = sorted.map(([date, amt]) => `
      <div class="daily-row">
        <span class="daily-date">${date}</span>
        <span class="daily-amt">${fmt(amt)} ${cur}</span>
      </div>`).join('');
  }
  openModal('cm-daily-revenue');
}

window.openExpCreditPayModal = async function(expPurchaseId) {
  const ep = await dbOp('expense_purchases', 'get', expPurchaseId);
  if (!ep) return;
  const remaining = ep.amount - (ep.paid_amount || 0);
  const cur = t('currency');
  document.getElementById('cm-exp-credit-pay-msg').textContent =
    `${ep.supplier_name || ep.category_name} — متبقي: ${fmt(remaining)} ${cur}`;
  document.getElementById('cm-exp-partial-amount').value = '';
  document.getElementById('cm-exp-partial-amount').max = remaining;
  openModal('cm-exp-credit-pay');
  window._pendingExpPurchase = { id: expPurchaseId, remaining };

  const fullBtn = document.getElementById('cm-exp-full-pay');
  const partialBtn = document.getElementById('cm-exp-partial-pay');
  const cancelBtn = document.getElementById('cm-exp-credit-pay-cancel');

  const cleanup = () => {
    fullBtn.onclick = null; partialBtn.onclick = null; cancelBtn.onclick = null;
  };

  fullBtn.onclick = async () => {
    cleanup();
    closeModal('cm-exp-credit-pay');
    const ep2 = await dbOp('expense_purchases', 'get', expPurchaseId);
    ep2.paid_amount = ep2.amount;
    ep2.is_paid = 1;
    ep2.paid_at = isoDate();
    await dbOp('expense_purchases', 'put', ep2);
    showToast('تم دفع المبلغ الكامل ✓');
    loadReports();
  };

  partialBtn.onclick = async () => {
    const partial = Number(document.getElementById('cm-exp-partial-amount').value);
    if (!partial || partial <= 0 || partial > remaining) {
      showToast('أدخل مبلغاً صحيحاً لا يتجاوز المتبقي', true);
      return;
    }
    cleanup();
    closeModal('cm-exp-credit-pay');
    const ep2 = await dbOp('expense_purchases', 'get', expPurchaseId);
    ep2.paid_amount = (ep2.paid_amount || 0) + partial;
    ep2.is_paid = ep2.paid_amount >= ep2.amount ? 1 : 0;
    ep2.paid_at = isoDate();
    await dbOp('expense_purchases', 'put', ep2);
    showToast(`تم دفع ${fmt(partial)} ${cur} ✓`);
    loadReports();
  };

  cancelBtn.onclick = () => { cleanup(); closeModal('cm-exp-credit-pay'); };
};

let _expCreditDetailData = [];
async function showExpCreditDetail() {
  const expPurchases = await dbOp('expense_purchases', 'getAll');
  const monthStr = isoDate().split('T')[0].substring(0, 7);
  const cur = t('currency');

  _expCreditDetailData = expPurchases.filter(ep =>
    (ep.is_paid === 1 || ep.paid_amount > 0) && ep.paid_at?.startsWith(monthStr)
  );

  renderExpCreditDetailList('', cur);
  const searchEl = document.getElementById('exp-credit-search');
  if (searchEl) {
    searchEl.value = '';
    searchEl.oninput = () => renderExpCreditDetailList(searchEl.value, cur);
  }
  openModal('cm-exp-credit-detail');
}

function renderExpCreditDetailList(query, cur) {
  const list = document.getElementById('exp-credit-detail-list');
  if (!list) return;
  const q = query.trim().toLowerCase();
  const filtered = q
    ? _expCreditDetailData.filter(ep =>
        (ep.supplier_name||'').toLowerCase().includes(q) ||
        (ep.category_name||'').toLowerCase().includes(q) ||
        (ep.note||'').toLowerCase().includes(q))
    : _expCreditDetailData;
  if (filtered.length === 0) {
    list.innerHTML = `<div style="text-align:center;padding:32px;color:var(--text-secondary);">${q ? 'لا نتائج للبحث' : 'لا توجد فواتير بضاعة آجل مدفوعة هذا الشهر'}</div>`;
    return;
  }
  const total = filtered.reduce((s, ep) => s + (ep.paid_amount || ep.amount), 0);
  list.innerHTML = filtered.map(ep => `
    <div class="daily-row" style="flex-direction:column;align-items:flex-start;gap:4px;">
      <div style="display:flex;justify-content:space-between;width:100%;align-items:center;">
        <span style="font-weight:700;font-size:14px;">${ep.supplier_name || ep.category_name}</span>
        <span class="daily-amt">${fmt(ep.paid_amount || ep.amount)} ${cur}</span>
      </div>
      <div style="display:flex;gap:12px;">
        <span class="daily-date">${ep.paid_at ? ep.paid_at.split('T')[0] : '—'}</span>
        ${ep.note && ep.note !== ep.supplier_name ? `<span style="font-size:11px;color:var(--text-secondary);">${ep.note}</span>` : ''}
        <span style="font-size:11px;background:${ep.is_paid ? '#E8F5E9' : '#FFF3E0'};color:${ep.is_paid ? '#16A34A' : '#E65100'};padding:1px 8px;border-radius:20px;font-weight:600;">
          ${ep.is_paid ? 'مدفوع كامل' : `جزئي (${fmt(ep.amount)} الأصلي)`}
        </span>
      </div>
    </div>`).join('') +
    `<div style="border-top:2px solid var(--border);margin-top:8px;padding-top:10px;display:flex;justify-content:space-between;font-weight:800;font-size:15px;">
      <span>الإجمالي المدفوع</span>
      <span style="color:var(--error);">${fmt(total)} ${cur}</span>
    </div>`;
}

window.reprintInvoice = async function(orderId, method) {
  try {
    const order   = await dbOp('orders',      'get', orderId);
    const items   = await dbOp('order_items', 'getAll');
    if (!order) return showToast('الفاتورة غير موجودة', true);
    const orderItems = items.filter(oi => oi.order_id === orderId);

    document.getElementById('print-invoice-id').innerText = `رقم الفاتورة #${String(order.id).slice(-4)}`;
    const d = order.paid_at ? new Date(order.paid_at) : new Date();
    document.getElementById('print-date-time').innerText =
      `${d.toLocaleDateString('en-GB')} ${d.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})}`;
    document.getElementById('print-table-num').innerText = `رقم الطاولة: ${order.table_id || '—'}`;

    const tbody = document.getElementById('print-invoice-items');
    tbody.innerHTML = '';
    let subtotal = 0, count = 0;
    orderItems.forEach(item => {
      const price = parseFloat(item.price) || 0;
      const qty   = parseInt(item.quantity) || 0;
      subtotal += price * qty;
      count    += qty;
      const tr = document.createElement('tr');
      tr.innerHTML = `<td class="col-qty">${qty}</td><td class="col-item">${item.name_ar}</td><td class="col-price">${(price*qty).toFixed(2)}</td>`;
      tbody.appendChild(tr);
    });
    const discount = parseFloat(order.discount) || 0;
    const cur = t('currency');
    document.getElementById('invoice-subtotal').innerText = `${subtotal.toFixed(2)} ${cur}`;
    document.getElementById('invoice-discount').innerText = `${discount.toFixed(2)} ${cur}`;
    document.getElementById('invoice-total').innerText    = `${(subtotal-discount).toFixed(2)} ${cur}`;
    document.getElementById('invoice-items-count').innerText = `عدد المنتجات: ${count}`;
    window.print();
  } catch(e) { console.error(e); showToast('خطأ في الطباعة', true); }
};

window.payCreditOrder = async function (creditId, customerId) {
  try {
    const co = await dbOp('credit_orders', 'get', creditId);
    if (!co) return;
    co.is_paid = 1;
    co.paid_at = isoDate();
    await dbOp('credit_orders', 'put', co);

    const cust = await dbOp('customers', 'get', customerId);
    if (cust) {
      cust.total_credit = Math.max(0, (cust.total_credit || 0) - co.amount);
      await dbOp('customers', 'put', cust);
    }
    loadCustomersMgmt();
    loadReports();
    showToast('تم دفع الآجل ✓');
  } catch (e) { console.error(e); }
}

let mgmtSelCat = null;

async function loadMenuTab() {
  document.getElementById('btn-add-item').onclick = () => addItem(mgmtSelCat);
  try {
    const categories = await dbOp('categories', 'getAll');
    categories.sort((a, b) => a.sort_order - b.sort_order);
    const items = await dbOp('menu_items', 'getAll');

    if (!mgmtSelCat && categories.length > 0) {
      mgmtSelCat = categories[0].id;
    }
    if (categories.length === 0) {
      mgmtSelCat = null;
    }

    renderCategoriesList(categories);
    if (mgmtSelCat) {
      selectCategory(mgmtSelCat);
    } else {
      renderItemsList([], null);
    }
  } catch (e) { console.error('Error loading menu tab:', e); }
}

function renderCategoriesList(categories) {
  const catList = document.getElementById('mgmt-categories-list');
  if (categories.length === 0) {
    catList.innerHTML = `<div style="text-align:center; padding:40px 20px; color:var(--text-secondary);">لا توجد أقسام / No categories yet</div>`;
    return;
  }

  catList.innerHTML = categories.map(c => `
    <div class="mgmt-row ${c.id === mgmtSelCat ? 'active' : ''}" onclick="selectCategory(${c.id})">
      <div style="font-weight:600;">${c.name_ar} <span style="color:var(--text-secondary);font-size:12px;font-weight:400;margin-inline-start:8px;">${c.name_en}</span></div>
      <button style="color:var(--error); background:none; border:none; cursor:pointer;" onclick="event.stopPropagation(); deleteCategory(${c.id})">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path></svg>
      </button>
    </div>
  `).join('');
}

async function selectCategory(categoryId) {
  try {
    mgmtSelCat = categoryId;
    const items = await dbOp('menu_items', 'getAll');
    const catItems = items.filter(i => i.category_id === categoryId);

    const categories = await dbOp('categories', 'getAll');
    categories.sort((a, b) => a.sort_order - b.sort_order);
    renderCategoriesList(categories);

    renderItemsList(catItems, categoryId);
  } catch (e) { console.error('Error selecting category:', e); }
}

async function renderItemsList(items, categoryId) {
  const itemsTitle = document.getElementById('mgmt-items-title');
  const itemsList = document.getElementById('mgmt-items-list');

  if (!categoryId) {
    itemsTitle.textContent = 'المنتجات / Items';
    itemsList.innerHTML = `<div style="text-align:center; padding:40px 20px; color:var(--text-secondary);">اختر قسم لعرض المنتجات / Select a category</div>`;
    return;
  }

  try {
    const cat = await dbOp('categories', 'get', categoryId);
    if (cat) itemsTitle.textContent = cat.name_ar;

    if (items.length === 0) {
      itemsList.innerHTML = `<div style="text-align:center; padding:40px 20px; color:var(--text-secondary);">لا توجد أصناف / No items</div>`;
      return;
    }

    itemsList.innerHTML = items.map(i => `
      <div style="background:white; border:1px solid var(--border); padding:12px 16px; border-radius:10px; display:flex; justify-content:space-between; align-items:center; cursor:pointer; opacity:${i.is_available ? 1 : 0.5}" onclick="editItem(${i.id})">
        <div><div style="font-size:14px; font-weight:700; color:var(--text-primary);">${i.name_ar}</div><div style="font-size:12px; color:var(--text-secondary); margin-top:4px;">${i.name_en}</div></div>
        <div style="display:flex; align-items:center; gap:16px;">
          <div style="font-size:14px; font-weight:700; color:var(--primary);">${fmt(i.price)} <small>${t('currency')}</small></div>
          <div class="toggle-switch ${i.is_available ? 'on' : ''}" style="position:relative; width:44px; height:24px; background:${i.is_available ? 'var(--primary)' : 'var(--border)'}; border-radius:12px; transition:all 0.2s;" onclick="event.stopPropagation(); updateItemAvailability(${i.id}, ${i.is_available ? 0 : 1})">
            <div class="toggle-thumb" style="position:absolute; top:2px; left:${i.is_available ? '22px' : '2px'}; width:20px; height:20px; background:white; border-radius:50%; transition:all 0.2s;"></div>
          </div>
          <button style="color:var(--error); background:none; border:none; cursor:pointer;" onclick="event.stopPropagation(); deleteItem(${i.id})">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path></svg>
          </button>
        </div>
      </div>
    `).join('');
  } catch (e) { console.error('Error rendering items:', e); }
}
async function editItem(itemId) {
  try {
    const cats = await dbOp('categories', 'getAll');
    cats.sort((a, b) => a.sort_order - b.sort_order);
    const sel = document.getElementById('item-form-category');
    sel.innerHTML = cats.map(c => `<option value="${c.id}">${c.name_ar}</option>`).join('');

    document.getElementById('item-form-title').textContent = 'تعديل المنتج / Edit Item';
    const it = await dbOp('menu_items', 'get', itemId);
    document.getElementById('item-form-id').value = it.id;
    document.getElementById('item-form-ar').value = it.name_ar;
    document.getElementById('item-form-en').value = it.name_en;
    document.getElementById('item-form-price').value = it.price;
    sel.value = it.category_id;

    const tgl = document.getElementById('item-form-toggle');
    if (it.is_available) { tgl.classList.add('on'); tgl.style.background = 'var(--primary)'; tgl.firstElementChild.style.left = '22px'; }
    else { tgl.classList.remove('on'); tgl.style.background = 'var(--border)'; tgl.firstElementChild.style.left = '2px'; }

    const modal = document.getElementById('item-form-modal');
    document.getElementById('owner-dashboard').appendChild(modal);
    modal.hidden = false;

    document.getElementById('btn-cancel-item').onclick = () => { modal.hidden = true; };
    document.getElementById('btn-save-item').onclick = async () => {
      const id = document.getElementById('item-form-id').value;
      const ar = document.getElementById('item-form-ar').value.trim();
      const en = document.getElementById('item-form-en').value.trim();
      const price = Number(document.getElementById('item-form-price').value);
      const catId = Number(document.getElementById('item-form-category').value);
      const isAvail = document.getElementById('item-form-toggle').classList.contains('on') ? 1 : 0;
      if (!ar || !en || !price || !catId) return showToast('يرجى تعبئة جميع الحقول / Fill all fields', true);
      const payload = { category_id: catId, name_ar: ar, name_en: en, price, is_available: isAvail };
      if (id) { payload.id = Number(id); await dbOp('menu_items', 'put', payload); showToast('تم تحديث المنتج', false); }
      else { await dbOp('menu_items', 'add', payload); showToast('تم إضافة المنتج', false); }
      modal.hidden = true;
      mgmtSelCat = catId;
      loadMenuTab();
      refreshCashierMenu();
    };
  } catch (e) { console.error('Error editing item:', e); }
}
async function addItem(categoryId) {
  try {
    const cats = await dbOp('categories', 'getAll');
    cats.sort((a, b) => a.sort_order - b.sort_order);
    const sel = document.getElementById('item-form-category');
    sel.innerHTML = cats.map(c => `<option value="${c.id}">${c.name_ar}</option>`).join('');

    if (categoryId) sel.value = categoryId;

    document.getElementById('item-form-title').textContent = 'إضافة منتج / Add Item';
    document.getElementById('item-form-id').value = '';
    document.getElementById('item-form-ar').value = '';
    document.getElementById('item-form-en').value = '';
    document.getElementById('item-form-price').value = '';

    const tgl = document.getElementById('item-form-toggle');
    tgl.classList.add('on'); tgl.style.background = 'var(--primary)'; tgl.firstElementChild.style.left = '22px';

    const modal = document.getElementById('item-form-modal');
    document.getElementById('owner-dashboard').appendChild(modal);
    modal.hidden = false;

    document.getElementById('btn-cancel-item').onclick = () => { modal.hidden = true; };
    document.getElementById('btn-save-item').onclick = async () => {
      const id = document.getElementById('item-form-id').value;
      const ar = document.getElementById('item-form-ar').value.trim();
      const en = document.getElementById('item-form-en').value.trim();
      const price = Number(document.getElementById('item-form-price').value);
      const catId = Number(document.getElementById('item-form-category').value);
      const isAvail = document.getElementById('item-form-toggle').classList.contains('on') ? 1 : 0;
      if (!ar || !en || !price || !catId) return showToast('يرجى تعبئة جميع الحقول / Fill all fields', true);
      const payload = { category_id: catId, name_ar: ar, name_en: en, price, is_available: isAvail };
      if (id) { payload.id = Number(id); await dbOp('menu_items', 'put', payload); showToast('تم تحديث المنتج', false); }
      else { await dbOp('menu_items', 'add', payload); showToast('تم إضافة المنتج', false); }
      modal.hidden = true;
      mgmtSelCat = catId;
      loadMenuTab();
      refreshCashierMenu();
    };
  } catch (e) { console.error('Error adding item:', e); }
}
function deleteItem(itemId) {
  showConfirmModal('cm-del-table', 'cm-del-table-ok', 'cm-del-table-cancel').then(async (ok) => {
    if (!ok) return;
    try {
      await dbOp('menu_items', 'delete', itemId);
      showToast('تم حذف المنتج', false);
      loadMenuTab();
      refreshCashierMenu();
    } catch (e) { console.error('Error deleting item:', e); }
  });
}
async function updateItemAvailability(itemId, isAvailable) {
  try {
    const it = await dbOp('menu_items', 'get', itemId);
    it.is_available = isAvailable;
    await dbOp('menu_items', 'put', it);
    loadMenuTab();
    refreshCashierMenu();
  } catch (e) { console.error('Error updating availability:', e); }
}

async function refreshCashierMenu() {
  try {
    state.categories = await dbOp('categories', 'getAll');
    state.menuItems = await dbOp('menu_items', 'getAll');
    renderCategories();
    renderMenu();
  } catch (e) { console.error('Error refreshing cashier:', e); }
}

async function loadTablesMgmt() {
  const tables = await dbOp('tables', 'getAll');
  document.getElementById('mgmt-tables-grid').innerHTML = tables.map(t => `
    <div style="background:var(--surface); border:1px solid var(--border); padding:16px; border-radius:10px; display:flex; justify-content:space-between; align-items:center;">
      <span style="font-weight:600;">${t.name}</span>
      <button style="color:var(--error); background:#FEF2F2; border:1px solid rgba(220,38,38,0.2); border-radius:8px; padding:6px 14px; cursor:pointer; font-size:13px; font-weight:600;" onclick="window.delTable(${t.id})">حذف</button>
    </div>
  `).join('');
}

window.delTable = async (id) => {
  const ok = await showConfirmModal('cm-del-table', 'cm-del-table-ok', 'cm-del-table-cancel');
  if (!ok) return;
  try {
    await dbOp('tables', 'delete', id);
    const idx = state.tables.findIndex(t => t.id == id);
    if (idx !== -1) state.tables.splice(idx, 1);
    if (state.currentTable == id) {
      state.currentTable = null;
      renderOrder();
    }
    loadTablesMgmt();
    renderTables();
    showToast('تم حذف الطاولة');
  } catch (e) { console.error(e); showToast('حدث خطأ', true); }
};

async function loadExpensesMgmt() {
  const cats = await dbOp('expense_categories', 'getAll');
  const typeLabel = { primary: 'أساسي', raw: 'خامات', secondary: 'ثانوي' };
  const typeColor = { primary: '#DC2626', raw: '#F59E0B', secondary: '#6B7280' };
  document.getElementById('mgmt-exp-cats-list').innerHTML = cats.length === 0
    ? `<div style="text-align:center;padding:32px;color:var(--text-secondary);">لا توجد تصنيفات بعد</div>`
    : cats.map(c => `
    <div class="mgmt-row" style="gap:12px;">
      <span style="font-weight:700; flex:1;">${c.name}</span>
      <select class="exp-type-select" onchange="window.updateExpCatType(${c.id}, this.value)" style="color:${typeColor[c.type||'secondary']};">
        <option value="primary" ${(c.type||'secondary')==='primary'?'selected':''}>أساسي</option>
        <option value="raw"     ${(c.type||'secondary')==='raw'?'selected':''}>خامات</option>
        <option value="secondary" ${(c.type||'secondary')==='secondary'?'selected':''}>ثانوي</option>
      </select>
      <button style="color:var(--error); background:none; border:none; cursor:pointer;" onclick="window.delExpCat(${c.id})">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6l-1 14H6L5 6m5 0V4h4v2"/></svg>
      </button>
    </div>`).join('');
}
window.updateExpCatType = async (id, type) => {
  const cat = await dbOp('expense_categories', 'get', id);
  if (cat) { cat.type = type; await dbOp('expense_categories', 'put', cat); }
};
window.delExpCat = async (id) => {
  const ok = await showConfirmModal('cm-del-table', 'cm-del-table-ok', 'cm-del-table-cancel');
  if (!ok) return;
  await dbOp('expense_categories', 'delete', id);
  loadExpensesMgmt();
  showToast('تم الحذف');
};

async function loadCustomersMgmt() {
  const custs        = await dbOp('customers',     'getAll');
  const creditOrders = await dbOp('credit_orders', 'getAll');
  const cur = t('currency');

  document.getElementById('mgmt-customers-list').innerHTML = custs.length === 0
    ? `<div style="text-align:center;padding:32px;color:var(--text-secondary);">لا يوجد عملاء بعد</div>`
    : custs.map(c => {
      const unpaid = creditOrders.filter(co => co.customer_id === c.id && !co.is_paid);
      const unpaidTotal = unpaid.reduce((s, co) => s + co.amount, 0);
      return `
      <div class="mgmt-row" style="align-items:flex-start; flex-direction:column; gap:10px; cursor:default;">
        <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
          <div style="font-weight:700; font-size:15px;">${c.name}</div>
          <div style="display:flex; align-items:center; gap:8px;">
            ${unpaidTotal > 0 ? `<span class="cust-credit-badge">آجل: ${fmt(unpaidTotal)} ${cur}</span>` : '<span style="font-size:12px;color:var(--success);">✓ لا توجد ديون</span>'}
            <button style="color:var(--error); background:none; border:none; cursor:pointer;" onclick="window.delCust(${c.id})">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6l-1 14H6L5 6m5 0V4h4v2"/></svg>
            </button>
          </div>
        </div>
        ${unpaid.length > 0 ? `
        <div style="width:100%; border-top:1px solid var(--border); padding-top:10px; display:flex; flex-direction:column; gap:6px;">
          ${unpaid.map(co => `
            <div style="display:flex; justify-content:space-between; align-items:center; font-size:13px; gap:8px;">
              <span style="color:var(--text-secondary); flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${co.items_summary}</span>
              <span style="font-weight:700; color:var(--error); white-space:nowrap;">${fmt(co.amount)} ${cur}</span>
              <button class="btn-outline" style="font-size:11px; padding:4px 10px; white-space:nowrap;" onclick="window.payCreditOrder(${co.id}, ${c.id})">تم الدفع</button>
            </div>`).join('')}
        </div>` : ''}
      </div>`;
    }).join('');
}

window.delCust = async (id) => {
  const ok = await showConfirmModal('cm-del-table', 'cm-del-table-ok', 'cm-del-table-cancel');
  if (!ok) return;
  await dbOp('customers', 'delete', id);
  loadCustomersMgmt();
  showToast('تم الحذف');
};

async function loadSettingsMgmt() {
  const s = await dbOp('settings', 'getAll');
  const getS = (k) => { const f = s.find(x => x.key === k); return f ? f.value : ''; };
  document.getElementById('set-bname').value = getS('business_name');
  document.getElementById('set-rheader').value = getS('receipt_header');
  document.getElementById('set-rfooter').value = getS('receipt_footer');
  document.getElementById('set-lang').value = getS('language') || 'ar';
  document.getElementById('set-printer').value = getS('printer') || 'bluetooth';
}

function bindEvents() {
  const openModal = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.classList.contains('cmodal-overlay')) { el.classList.add('open'); }
    else { el.hidden = false; }
  };
  const closeModal = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.classList.contains('cmodal-overlay')) { el.classList.remove('open'); }
    else { el.hidden = true; }
  };

  document.getElementById('btn-tables').addEventListener('click', () => { renderTables(); openModal('tables-modal'); });
  document.getElementById('close-tables').addEventListener('click', () => closeModal('tables-modal'));
  document.getElementById('tables-modal').addEventListener('click', (e) => { if (e.target === e.currentTarget) closeModal('tables-modal'); });

  document.getElementById('btn-more').addEventListener('click', () => { openModal('pin-modal'); enteredPin = ''; updatePinDisplay(); });
  document.getElementById('close-pin').addEventListener('click', () => closeModal('pin-modal'));

  document.getElementById('btn-expenses').addEventListener('click', async () => {
    const cats = await dbOp('expense_categories', 'getAll');
    document.getElementById('expense-category').innerHTML = cats.length > 0
      ? cats.map(c => `<option value="${c.id}">${c.name}</option>`).join('')
      : '<option value="">لا توجد أقسام — أضف من الداشبورد</option>';
    document.getElementById('expense-amount').value = '';
    document.getElementById('expense-note').value = '';
    openModal('expenses-modal');
  });
  document.getElementById('close-expenses').addEventListener('click', () => closeModal('expenses-modal'));
  document.getElementById('expenses-modal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal('expenses-modal');
  });
  document.getElementById('submit-expense').addEventListener('click', async () => {
    const cid = document.getElementById('expense-category').value;
    const cname = document.getElementById('expense-category').options[document.getElementById('expense-category').selectedIndex]?.text || '';
    const amt = Number(document.getElementById('expense-amount').value);
    const note = document.getElementById('expense-note').value.trim();
    if (!cid) return showToast('اختر القسم أولاً', true);
    if (!amt || amt <= 0) return showToast('أدخل مبلغاً صحيحاً', true);

    closeModal('expenses-modal');
    document.getElementById('cm-exp-payment-msg').textContent =
      `${cname} — ${fmt(amt)} ${t('currency')}${note ? ' | ' + note : ''}`;

    openModal('cm-exp-payment');

    window._pendingExpense = { cid: Number(cid), cname, amt, note };
  });

  document.getElementById('cm-exp-pay-cash').addEventListener('click', async () => {
    const pe = window._pendingExpense;
    if (!pe) return;
    closeModal('cm-exp-payment');
    await dbOp('expenses', 'add', {
      category_id: pe.cid, category_name: pe.cname,
      amount: pe.amt, note: pe.note, payment_method: 'cash', created_at: isoDate()
    });
    window._pendingExpense = null;
    showToast('تم حفظ المصروف نقداً ✓');
    if (document.getElementById('owner-dashboard').style.display !== 'none') loadReports();
  });

  document.getElementById('cm-exp-pay-credit').addEventListener('click', async () => {
    const pe = window._pendingExpense;
    if (!pe) return;
    closeModal('cm-exp-payment');
    await dbOp('expense_purchases', 'add', {
      category_id: pe.cid, category_name: pe.cname,
      supplier_name: pe.note || pe.cname,
      amount: pe.amt, paid_amount: 0, is_paid: 0,
      note: pe.note, created_at: isoDate(), paid_at: null
    });
    window._pendingExpense = null;
    showToast('تم تسجيل البضاعة آجل ✓');
    if (document.getElementById('owner-dashboard').style.display !== 'none') loadReports();
  });

  document.getElementById('cm-exp-pay-cancel').addEventListener('click', () => {
    closeModal('cm-exp-payment');
    window._pendingExpense = null;
  });
  document.getElementById('cm-exp-payment').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) { closeModal('cm-exp-payment'); window._pendingExpense = null; }
  });

  document.getElementById('cm-exp-credit-detail-close').addEventListener('click', () => closeModal('cm-exp-credit-detail'));
  document.getElementById('cm-exp-credit-detail').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal('cm-exp-credit-detail');
  });

  async function openCreditModal() {
    if (!state.currentTable) return showToast(t('select-table-first'), true);
    const order = getCurrentOrder();
    if (!order || !order.items || order.items.length === 0) return showToast(t('empty-order'), true);

    const custs = await dbOp('customers', 'getAll');
    document.getElementById('credit-customer').innerHTML = custs.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    openModal('credit-modal');
  }
  document.getElementById('close-credit').addEventListener('click', () => closeModal('credit-modal'));
  document.getElementById('submit-credit').addEventListener('click', async () => {
    const cid = document.getElementById('credit-customer').value;
    if (!cid) return;
    await completeOrder('credit', Number(cid));
    closeModal('credit-modal');
  });

  document.getElementById('tables-grid').addEventListener('click', (e) => {
    const cell = e.target.closest('.table-cell');
    if (cell) selectTable(cell.dataset.tableId);
  });

  document.getElementById('btn-print').addEventListener('click', printBill);

  document.getElementById('category-tabs').addEventListener('click', (e) => {
    const tab = e.target.closest('.cat-tab');
    if (!tab) return;
    state.selectedCategory = tab.dataset.cat ? Number(tab.dataset.cat) : null;
    renderCategories();
    renderMenu();
  });

  document.getElementById('menu-grid').addEventListener('click', (e) => {
    const card = e.target.closest('.menu-card');
    if (!card) return;
    addToOrder(Number(card.dataset.itemId));
    card.classList.remove('flash'); void card.offsetWidth; card.classList.add('flash');
  });

  document.getElementById('order-items').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const id = Number(btn.dataset.item);
    switch (btn.dataset.action) {
      case 'inc': changeQty(id, 1); break;
      case 'dec': changeQty(id, -1); break;
      case 'remove': removeItem(id); break;
    }
  });

  document.getElementById('discount-input').addEventListener('change', async (e) => {
    const order = getCurrentOrder();
    if (!order) return;
    order.discount = Number(e.target.value) || 0;
    updateTotals(order);
    await dbOp('orders', 'put', { ...order, items: undefined });
  });

  document.getElementById('pay-cash').addEventListener('click', async () => {
    const order = getCurrentOrder();
    if (!order || !order.items || order.items.length === 0) return showToast(t('empty-order'), true);
    document.getElementById('cm-pay-title').textContent = 'تأكيد الدفع نقداً';
    document.getElementById('cm-pay-msg').textContent = `إجمالي الطلب: ${fmt(order.total)} ${t('currency')} — هل تريد إتمام الطلب؟`;
    const ok = await showConfirmModal('cm-confirm-pay', 'cm-pay-ok', 'cm-pay-cancel');
    if (ok) completeOrder('cash');
  });
  document.getElementById('pay-wallet').addEventListener('click', async () => {
    const order = getCurrentOrder();
    if (!order || !order.items || order.items.length === 0) return showToast(t('empty-order'), true);
    document.getElementById('cm-pay-title').textContent = 'تأكيد الدفع بالمحفظة';
    document.getElementById('cm-pay-msg').textContent = `إجمالي الطلب: ${fmt(order.total)} ${t('currency')} — هل تريد إتمام الطلب؟`;
    const ok = await showConfirmModal('cm-confirm-pay', 'cm-pay-ok', 'cm-pay-cancel');
    if (ok) completeOrder('wallet');
  });
  document.getElementById('pay-credit-btn').addEventListener('click', () => openCreditModal());

  document.getElementById('btn-clear-order').addEventListener('click', async () => {
    const order = getCurrentOrder();
    if (!order || !order.items || order.items.length === 0) return showToast('السلة فارغة بالفعل', true);
    const ok = await showConfirmModal('cm-clear-cart', 'cm-clear-cart-ok', 'cm-clear-cart-cancel');
    if (!ok) return;
    try {
      for (const oi of order.items) {
        await dbOp('order_items', 'delete', oi.id);
      }
      await dbOp('orders', 'delete', order.id);
      const tbl = state.tables.find(t => t.id == state.currentTable);
      if (tbl) { tbl.status = 'empty'; await dbOp('tables', 'put', tbl); }
      delete state.orders[state.currentTable];
      state.currentTable = null;
      renderOrder();
      showToast('تم مسح السلة');
    } catch(e) { console.error(e); showToast('حدث خطأ', true); }
  });

  document.getElementById('pin-pad').addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      let val = e.target.textContent;
      if (e.target.classList.contains('btn-enter')) val = 'E';
      if (e.target.classList.contains('btn-clear')) val = 'C';
      handlePinInput(val);
    }
  });

  document.getElementById('dashboard-nav').addEventListener('click', (e) => {
    const item = e.target.closest('.dash-nav-item');
    if (item && item.dataset.tab) loadDashboardTab(item.dataset.tab);
  });
  document.getElementById('btn-exit-dashboard').addEventListener('click', closeDashboard);

  document.getElementById('rep-today').addEventListener('click', () => loadReports('today'));
  document.getElementById('rep-month').addEventListener('click', () => loadReports('month'));

  const datePicker = document.getElementById('rep-date-picker');
  if (datePicker) {
    datePicker.addEventListener('change', () => {
      _repType = 'today';
      loadReports('today');
    });
  }

  const heroCard = document.getElementById('kpi-hero-card');
  if (heroCard) heroCard.addEventListener('click', showDailyRevenue);

  const revenueCard = document.getElementById('kpi-revenue-card');
  if (revenueCard) revenueCard.addEventListener('click', showDailyRevenue);

  const cashCard = document.getElementById('kpi-cash-card');
  if (cashCard) cashCard.addEventListener('click', showCashInvoices);

  const walletCard = document.getElementById('kpi-wallet-card');
  if (walletCard) walletCard.addEventListener('click', showWalletInvoices);

  const creditPaidCard = document.getElementById('kpi-credit-paid-card');
  if (creditPaidCard) creditPaidCard.addEventListener('click', showCreditPaidDetail);

  const expCreditCard = document.getElementById('kpi-exp-credit-card');
  if (expCreditCard) expCreditCard.addEventListener('click', showExpCreditDetail);

  const topItemCard = document.getElementById('kpi-top-item-card');
  if (topItemCard) topItemCard.addEventListener('click', showTopItemsDetail);

  const expPrimaryCard = document.getElementById('kpi-exp-primary-card');
  if (expPrimaryCard) expPrimaryCard.addEventListener('click', () => showExpenseDetail('primary'));

  const expRawCard = document.getElementById('kpi-exp-raw-card');
  if (expRawCard) expRawCard.addEventListener('click', () => showExpenseDetail('raw'));

  const expSecondaryCard = document.getElementById('kpi-exp-secondary-card');
  if (expSecondaryCard) expSecondaryCard.addEventListener('click', () => showExpenseDetail('secondary'));

  document.getElementById('cm-exp-primary-close')?.addEventListener('click', () => closeModal('cm-exp-primary-detail'));
  document.getElementById('cm-exp-primary-detail')?.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeModal('cm-exp-primary-detail'); });
  document.getElementById('cm-exp-raw-close')?.addEventListener('click', () => closeModal('cm-exp-raw-detail'));
  document.getElementById('cm-exp-raw-detail')?.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeModal('cm-exp-raw-detail'); });
  document.getElementById('cm-exp-secondary-close')?.addEventListener('click', () => closeModal('cm-exp-secondary-detail'));
  document.getElementById('cm-exp-secondary-detail')?.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeModal('cm-exp-secondary-detail'); });

  const btnDrawer = document.getElementById('btn-drawer-balance');
  if (btnDrawer) btnDrawer.addEventListener('click', async () => {
    const todayStr = isoDate().split('T')[0];
    const current  = await dbOp('settings', 'get', 'drawer_balance');
    const savedDate = (await dbOp('settings', 'get', 'drawer_balance_date'))?.value || '';
    const isToday = savedDate === todayStr;
    document.getElementById('cm-drawer-amount').value = isToday ? (current?.value || '') : '';
    openModal('cm-drawer-balance');
  });

  document.getElementById('cm-drawer-ok')?.addEventListener('click', async () => {
    const val = Number(document.getElementById('cm-drawer-amount').value);
    if (isNaN(val) || val < 0) return showToast('أدخل مبلغاً صحيحاً', true);
    const todayStr = isoDate().split('T')[0];
    await dbOp('settings', 'put', { key: 'drawer_balance', value: val });
    await dbOp('settings', 'put', { key: 'drawer_balance_date', value: todayStr });
    closeModal('cm-drawer-balance');
    showToast('تم حفظ رصيد الدرج ✓');
    if (document.getElementById('owner-dashboard').style.display !== 'none') loadReports();
  });
  document.getElementById('cm-drawer-cancel')?.addEventListener('click', () => closeModal('cm-drawer-balance'));
  document.getElementById('cm-drawer-balance')?.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeModal('cm-drawer-balance'); });

  const dailyClose = document.getElementById('cm-daily-close');
  if (dailyClose) dailyClose.addEventListener('click', () => closeModal('cm-daily-revenue'));
  document.getElementById('cm-daily-revenue')?.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeModal('cm-daily-revenue'); });

  const creditDetailClose = document.getElementById('cm-credit-detail-close');
  if (creditDetailClose) creditDetailClose.addEventListener('click', () => closeModal('cm-credit-detail'));
  document.getElementById('cm-credit-detail')?.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeModal('cm-credit-detail'); });

  document.getElementById('cm-exp-credit-detail-close')?.addEventListener('click', () => closeModal('cm-exp-credit-detail'));
  document.getElementById('cm-exp-credit-detail')?.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeModal('cm-exp-credit-detail'); });

  document.getElementById('cm-credit-paid-close')?.addEventListener('click', () => closeModal('cm-credit-paid-detail'));
  document.getElementById('cm-credit-paid-detail')?.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeModal('cm-credit-paid-detail'); });

  document.getElementById('cm-cash-invoices-close')?.addEventListener('click', () => closeModal('cm-cash-invoices'));
  document.getElementById('cm-cash-invoices')?.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeModal('cm-cash-invoices'); });

  document.getElementById('cm-wallet-invoices-close')?.addEventListener('click', () => closeModal('cm-wallet-invoices'));
  document.getElementById('cm-wallet-invoices')?.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeModal('cm-wallet-invoices'); });

  document.getElementById('cm-top-items-close')?.addEventListener('click', () => closeModal('cm-top-items'));
  document.getElementById('cm-top-items')?.addEventListener('click', (e) => { if (e.target === e.currentTarget) closeModal('cm-top-items'); });

  document.getElementById('btn-add-category').addEventListener('click', () => {
    document.getElementById('cat-form-id').value = '';
    document.getElementById('cat-form-ar').value = '';
    document.getElementById('cat-form-en').value = '';
    const modal = document.getElementById('category-form-modal');
    document.getElementById('owner-dashboard').appendChild(modal);
    modal.hidden = false;
  });
  document.getElementById('btn-cancel-cat').addEventListener('click', () => document.getElementById('category-form-modal').hidden = true);
  document.getElementById('btn-save-cat').addEventListener('click', async () => {
    const ar = document.getElementById('cat-form-ar').value.trim();
    const en = document.getElementById('cat-form-en').value.trim();
    if (!ar || !en) return showToast('يرجى تعبئة جميع الحقول / Fill all fields', true);

    const maxSort = state.categories.reduce((max, c) => Math.max(max, c.sort_order), 0);
    const newId = await dbOp('categories', 'add', { name_ar: ar, name_en: en, sort_order: maxSort + 1, emoji: '🍽' });
    document.getElementById('category-form-modal').hidden = true;
    showToast('تم إضافة القسم', false);
    mgmtSelCat = newId;
    loadMenuTab();
    refreshCashierMenu();
  });
  document.getElementById('btn-cancel-confirm').addEventListener('click', () => document.getElementById('confirm-modal').hidden = true);
 
  const btnAddTable = document.getElementById('btn-add-table');
  if (btnAddTable) {
    btnAddTable.addEventListener('click', async () => {
      const name = await showInputModal('cm-add-table', 'cm-table-name', 'cm-add-table-ok', 'cm-add-table-cancel');
      if (!name) return;
      try {
        const numMatch = name.match(/\d+/);
        const tableId = numMatch ? parseInt(numMatch[0]) : Date.now() % 10000;
        const existing = state.tables.find(t => t.id == tableId);
        if (existing) return showToast('رقم الطاولة موجود بالفعل', true);
        await dbOp('tables', 'put', { id: tableId, name, status: 'empty' });
        state.tables.push({ id: tableId, name, status: 'empty' });
        loadTablesMgmt();
        renderTables();
        showToast('تم إضافة الطاولة');
      } catch (e) { console.error(e); showToast('حدث خطأ أثناء الحفظ', true); }
    });
  }
  document.getElementById('btn-add-exp-cat').addEventListener('click', async () => {
    const n = await showInputModal('cm-add-expcat', 'cm-expcat-name', 'cm-add-expcat-ok', 'cm-add-expcat-cancel');
    if (!n) return;
    await dbOp('expense_categories', 'add', { name: n });
    loadExpensesMgmt();
    showToast('تم إضافة الصنف');
  });
  document.getElementById('btn-add-customer').addEventListener('click', async () => {
    const n = await showInputModal('cm-add-customer', 'cm-customer-name', 'cm-add-customer-ok', 'cm-add-customer-cancel');
    if (!n) return;
    await dbOp('customers', 'add', { name: n, total_credit: 0 });
    loadCustomersMgmt();
    showToast('تم إضافة العميل');
  });
  document.getElementById('btn-save-settings').addEventListener('click', async () => {
    await dbOp('settings', 'put', { key: 'business_name', value: document.getElementById('set-bname').value });
    await dbOp('settings', 'put', { key: 'receipt_header', value: document.getElementById('set-rheader').value });
    await dbOp('settings', 'put', { key: 'receipt_footer', value: document.getElementById('set-rfooter').value });
    await dbOp('settings', 'put', { key: 'language', value: document.getElementById('set-lang').value });
    await dbOp('settings', 'put', { key: 'printer', value: document.getElementById('set-printer').value });
    showToast('تم الحفظ / Saved');
  });
  document.getElementById('btn-change-pin').addEventListener('click', async () => {
    const n = await showInputModal('cm-change-pin', 'cm-pin-value', 'cm-change-pin-ok', 'cm-change-pin-cancel');
    if (n && n.length === 4 && /^\d{4}$/.test(n)) {
      await dbOp('settings', 'put', { key: 'owner_pin', value: n });
      state.settings.owner_pin = n;
      showToast('تم التغيير / PIN Changed');
    } else if (n) {
      showToast('يجب أن يكون الرقم 4 أرقام', true);
    }
  });
}

async function init() {
  try {
    injectDynamicUI();
    await openDB();
    await seedDB();
    await loadInitialData();
    if (state.settings.owner_pin !== '2525' && (state.settings.owner_pin?.length !== 4)) {
      await dbOp('settings', 'put', { key: 'owner_pin', value: '2525' });
      state.settings.owner_pin = '2525';
    }
    applyLang();
    renderCategories();
    renderMenu();
    renderTables();
    renderOrder();
    bindEvents();
  } catch (e) {
    console.error("Init Error", e);
    showToast("Database Error", true);
  }
}

document.addEventListener('DOMContentLoaded', init);
window.deleteCategory = async function(id) {
  const ok = await showConfirmModal('cm-del-table', 'cm-del-table-ok', 'cm-del-table-cancel');
  if (!ok) return;
  try {
    await dbOp('categories', 'delete', id);
    showToast('تم حذف القسم', false);
    if (typeof loadMenuTab === 'function') loadMenuTab();
    if (typeof refreshCashierMenu === 'function') refreshCashierMenu();
  } catch (e) { console.error("خطأ أثناء الحذف:", e); }
};