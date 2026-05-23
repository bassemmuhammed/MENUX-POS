/* ═══════════════════════════════════════════════════
   CAFÉ POS — Application Logic
   Offline-first · Bilingual (AR/EN) · IndexedDB (v2)
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
    <div class="modal-overlay" id="expenses-modal" hidden>
      <div class="modal" style="max-width: 400px; border-radius: 16px; overflow: hidden;">
        <div class="modal-header" style="display:flex; justify-content:space-between; padding:20px; border-bottom:1px solid var(--border);">
          <h2 data-i18n="expenses" style="font-size: 20px; font-weight: 700;">المصروفات</h2>
          <button class="modal-close" id="close-expenses" style="background:none; border:none; cursor:pointer;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="modal-body" style="padding:20px;">
          <div style="margin-bottom:16px;">
            <label style="display:block; margin-bottom:6px; font-size:13px; color:var(--text-secondary);">القسم / Category</label>
            <select id="expense-category" style="width:100%; height:44px; border:1px solid var(--border); border-radius:8px; padding:0 12px; font-size:14px;"></select>
          </div>
          <div style="margin-bottom:16px;">
            <label style="display:block; margin-bottom:6px; font-size:13px; color:var(--text-secondary);">المبلغ / Amount</label>
            <input type="number" id="expense-amount" style="width:100%; height:44px; border:1px solid var(--border); border-radius:8px; padding:0 12px; font-size:14px;" min="0" step="0.5">
          </div>
          <div style="margin-bottom:16px;">
            <label style="display:block; margin-bottom:6px; font-size:13px; color:var(--text-secondary);">ملاحظات / Note</label>
            <input type="text" id="expense-note" style="width:100%; height:44px; border:1px solid var(--border); border-radius:8px; padding:0 12px; font-size:14px;">
          </div>
          <button id="submit-expense" style="width:100%; height:44px; background:var(--primary); color:white; border:none; border-radius:8px; font-weight:600; cursor:pointer;">حفظ / Save</button>
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
      <div class="modal" style="max-width: 480px; border-radius: 16px 16px 0 0; position:absolute; bottom:0; left:50%; transform:translateX(-50%); width:100%; box-shadow:0 -4px 20px rgba(0,0,0,0.1);">
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
      <div class="modal" style="max-width: 520px; border-radius: 16px 16px 0 0; position:absolute; bottom:0; left:50%; transform:translateX(-50%); width:100%; box-shadow:0 -4px 20px rgba(0,0,0,0.1);">
        <div style="width:40px; height:4px; background:var(--border); border-radius:2px; margin:12px auto;"></div>
        <div class="modal-header" style="padding:0 24px 16px; border-bottom:1px solid var(--border);">
          <h2 id="item-form-title" style="font-size: 20px; font-weight: 700;">إضافة منتج / Add Item</h2>
        </div>
        <div class="modal-body" style="padding:24px; max-height: 80vh; overflow-y: auto;">
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
    <div id="owner-dashboard" style="position:fixed; inset:0; background:var(--bg); z-index:200; display:none;">
      <div style="width:240px; background:var(--primary); color:white; display:flex; flex-direction:column; flex-shrink:0;">
        <div style="height:var(--top-bar-h); display:flex; align-items:center; padding:0 20px; font-size:20px; font-weight:700; border-bottom:1px solid rgba(255,255,255,0.1);">Owner Dashboard</div>
        <nav id="dashboard-nav" style="flex:1; padding:20px 0; overflow-y:auto; display:flex; flex-direction:column;">
          <button class="dash-nav-item active" data-tab="reports"><span>📊</span> التقارير / Reports</button>
          <button class="dash-nav-item" data-tab="menu"><span>🍽</span> المنيو / Menu</button>
          <button class="dash-nav-item" data-tab="tables"><span>🪑</span> الطاولات / Tables</button>
          <button class="dash-nav-item" data-tab="expenses"><span>💸</span> المصروفات / Expenses</button>
          <button class="dash-nav-item" data-tab="customers"><span>👥</span> العملاء / Customers</button>
          <button class="dash-nav-item" data-tab="settings"><span>⚙️</span> الإعدادات / Settings</button>
        </nav>
        <button id="btn-exit-dashboard" style="padding:16px 20px; border-top:1px solid rgba(255,255,255,0.1); background:none; color:white; font-size:16px; text-align:start; cursor:pointer;"><span>←</span> خروج / Exit</button>
      </div>
      <div style="flex:1; background:var(--sidebar-bg); overflow-y:auto; padding:32px;">
        
        <!-- REPORTS TAB -->
        <div class="dash-tab-pane active" id="tab-reports">
          <div style="display:flex; justify-content:space-between; margin-bottom:24px; align-items:center;">
            <h2 style="font-size:28px; font-weight:700;">التقارير / Reports</h2>
            <div style="display:flex; background:var(--border); border-radius:8px; padding:4px;">
              <button id="rep-today" class="toggle-btn active" style="padding:8px 20px; border-radius:6px; background:var(--bg); color:var(--primary); box-shadow:var(--shadow-sm); border:none; cursor:pointer; font-weight:600;">اليوم / Today</button>
              <button id="rep-month" class="toggle-btn" style="padding:8px 20px; border-radius:6px; background:none; border:none; cursor:pointer; font-weight:600; color:var(--text-secondary);">الشهر / Month</button>
            </div>
          </div>
          <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:20px;">
            <div style="grid-column:1 / -1; background:var(--primary); color:white; padding:24px; border-radius:10px; box-shadow:var(--shadow-sm);">
              <h3 style="font-size:14px; font-weight:500; margin-bottom:8px; color:rgba(255,255,255,0.8);">المتوقع في الخزنة / Expected Cash on Hand</h3>
              <div id="rep-cash-on-hand" style="font-size:40px; font-weight:700;">0.00</div>
            </div>
            <div style="background:var(--surface); padding:24px; border-radius:10px; box-shadow:var(--shadow-sm);">
              <h3 style="font-size:14px; color:var(--text-secondary); margin-bottom:8px;">الإيراد / Revenue</h3>
              <div id="rep-revenue" style="font-size:28px; font-weight:700;">0.00</div>
            </div>
            <div style="background:var(--surface); padding:24px; border-radius:10px; box-shadow:var(--shadow-sm);">
              <h3 style="font-size:14px; color:var(--text-secondary); margin-bottom:8px;">المصروفات / Expenses</h3>
              <div id="rep-expenses" style="font-size:28px; font-weight:700;">0.00</div>
            </div>
            <div style="background:var(--surface); padding:24px; border-radius:10px; box-shadow:var(--shadow-sm);">
              <h3 style="font-size:14px; color:var(--text-secondary); margin-bottom:8px;">صافي الدخل / Net Income</h3>
              <div id="rep-net" style="font-size:28px; font-weight:700;">0.00</div>
            </div>
            <div style="background:var(--surface); padding:24px; border-radius:10px; box-shadow:var(--shadow-sm);">
              <h3 style="font-size:14px; color:var(--text-secondary); margin-bottom:8px;">أكثر منتج / Top Item</h3>
              <div id="rep-top-item" style="font-size:20px; font-weight:700;">-</div>
            </div>
          </div>
          <h3 style="font-size:20px; font-weight:700; margin:24px 0 16px;">تقرير الآجل / Credit Report</h3>
          <table style="width:100%; border-collapse:collapse; background:var(--surface); border-radius:10px; overflow:hidden; box-shadow:var(--shadow-sm);">
            <thead style="background:var(--sidebar-bg); text-align:start;">
              <tr><th style="padding:16px; border-bottom:1px solid var(--border);">العميل / Customer</th><th style="padding:16px; border-bottom:1px solid var(--border);">المنتجات / Items</th><th style="padding:16px; border-bottom:1px solid var(--border);">الإجمالي / Total</th><th style="padding:16px; border-bottom:1px solid var(--border);">إجراء / Action</th></tr>
            </thead>
            <tbody id="credit-report-table"></tbody>
          </table>
        </div>

        <!-- MENU TAB -->
        <div class="dash-tab-pane" id="tab-menu" style="display:none; height:100%;">
          <div style="display:flex; gap:32px; height:100%;">
            <!-- Left Panel (35%) -->
            <div style="flex: 0 0 35%; display:flex; flex-direction:column;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                <h3 style="font-size:24px; font-weight:700; color:var(--primary);">الأقسام / Categories</h3>
                <button id="btn-add-category" style="height:36px; padding:0 16px; background:var(--primary); color:white; border:none; border-radius:8px; cursor:pointer; font-weight:600;">+ إضافة قسم</button>
              </div>
              <div id="mgmt-categories-list" style="display:flex; flex-direction:column; gap:8px; overflow-y:auto; flex:1; padding-right:8px;"></div>
            </div>
            
            <!-- Right Panel (65%) -->
            <div style="flex: 0 0 65%; display:flex; flex-direction:column; position:relative; border-right:1px solid var(--border); padding-right:32px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                <h3 id="mgmt-items-title" style="font-size:24px; font-weight:700; color:var(--primary);">المنتجات / Items</h3>
              </div>
              <div id="mgmt-items-list" style="display:flex; flex-direction:column; gap:12px; overflow-y:auto; padding-bottom:80px; flex:1;"></div>
              <button id="btn-add-item" style="position:absolute; bottom:0; right:32px; width:52px; height:52px; border-radius:50%; background:var(--primary); color:white; font-size:32px; border:none; cursor:pointer; box-shadow:var(--shadow-md); display:flex; align-items:center; justify-content:center;">+</button>
            </div>
          </div>
        </div>

        <!-- TABLES TAB -->
        <div class="dash-tab-pane" id="tab-tables" style="display:none;">
          <div style="display:flex; justify-content:space-between; margin-bottom:24px;">
            <h2 style="font-size:28px; font-weight:700;">الطاولات / Tables</h2>
            <button id="btn-add-table" style="padding:0 24px; background:var(--primary); color:white; border:none; border-radius:8px; cursor:pointer;">+ إضافة طاولة</button>
          </div>
          <div id="mgmt-tables-grid" class="tables-grid"></div>
        </div>

        <!-- EXPENSES TAB -->
        <div class="dash-tab-pane" id="tab-expenses" style="display:none;">
          <div style="display:flex; justify-content:space-between; margin-bottom:24px;">
            <h2 style="font-size:28px; font-weight:700;">تصنيفات المصروفات / Expense Categories</h2>
            <button id="btn-add-exp-cat" style="padding:0 24px; background:var(--primary); color:white; border:none; border-radius:8px; cursor:pointer;">+ إضافة صنف</button>
          </div>
          <div id="mgmt-exp-cats-list" style="max-width:448px; display:flex; flex-direction:column; gap:8px;"></div>
        </div>

        <!-- CUSTOMERS TAB -->
        <div class="dash-tab-pane" id="tab-customers" style="display:none;">
          <div style="display:flex; justify-content:space-between; margin-bottom:24px;">
            <h2 style="font-size:28px; font-weight:700;">العملاء / Customers</h2>
            <button id="btn-add-customer" style="padding:0 24px; background:var(--primary); color:white; border:none; border-radius:8px; cursor:pointer;">+ إضافة عميل</button>
          </div>
          <div id="mgmt-customers-list" style="max-width:512px; display:flex; flex-direction:column; gap:8px;"></div>
        </div>

        <!-- SETTINGS TAB -->
        <div class="dash-tab-pane" id="tab-settings" style="display:none;">
          <div style="display:flex; justify-content:space-between; margin-bottom:24px;">
            <h2 style="font-size:28px; font-weight:700;">الإعدادات / Settings</h2>
            <button id="btn-save-settings" style="padding:0 24px; background:var(--primary); color:white; border:none; border-radius:8px; cursor:pointer;">حفظ / Save</button>
          </div>
          <div style="max-width:512px;">
            <div style="margin-bottom:16px;">
              <label style="display:block; margin-bottom:6px; color:var(--text-secondary);">اسم المكان / Business name</label>
              <input type="text" id="set-bname" style="width:100%; height:44px; border:1px solid var(--border); border-radius:8px; padding:0 12px;">
            </div>
            <div style="margin-bottom:16px;">
              <label style="display:block; margin-bottom:6px; color:var(--text-secondary);">رأس الفاتورة / Receipt header</label>
              <input type="text" id="set-rheader" style="width:100%; height:44px; border:1px solid var(--border); border-radius:8px; padding:0 12px;">
            </div>
            <div style="margin-bottom:16px;">
              <label style="display:block; margin-bottom:6px; color:var(--text-secondary);">ذيل الفاتورة / Receipt footer</label>
              <input type="text" id="set-rfooter" style="width:100%; height:44px; border:1px solid var(--border); border-radius:8px; padding:0 12px;">
            </div>
            <div style="margin-bottom:16px;">
              <label style="display:block; margin-bottom:6px; color:var(--text-secondary);">اللغة / Language</label>
              <select id="set-lang" style="width:100%; height:44px; border:1px solid var(--border); border-radius:8px; padding:0 12px;">
                <option value="ar">العربية</option>
                <option value="en">English</option>
              </select>
            </div>
            <div style="margin-bottom:16px;">
              <label style="display:block; margin-bottom:6px; color:var(--text-secondary);">الطابعة / Printer</label>
              <select id="set-printer" style="width:100%; height:44px; border:1px solid var(--border); border-radius:8px; padding:0 12px;">
                <option value="bluetooth">Bluetooth</option>
                <option value="usb">USB</option>
              </select>
            </div>
            <button id="btn-change-pin" style="width:100%; height:44px; margin-top:16px; background:transparent; border:1px solid var(--primary); color:var(--primary); border-radius:8px; cursor:pointer;">تغيير الرقم السري / Change PIN</button>
          </div>
        </div>

      </div>
    </div>
  `;
  document.body.appendChild(container);

  // Add styles for dynamic elements
  const style = document.createElement('style');
  style.innerHTML = `
    .dash-nav-item { padding: 16px 20px; background: none; border: none; color: rgba(255,255,255,0.8); width: 100%; text-align: start; cursor: pointer; font-size: 16px; transition: all 0.2s; }
    .dash-nav-item span { margin-inline-end: 12px; font-size: 20px; }
    .dash-nav-item:hover { background: rgba(255,255,255,0.05); color: white; }
    .dash-nav-item.active { background: white; color: var(--primary); border-inline-start: 4px solid var(--primary-hover); }
    .mgmt-row { background: var(--surface); border: 1px solid var(--border); padding: 16px; border-radius: 8px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; }
    .mgmt-row.active { border-color: var(--primary); box-shadow: 0 0 0 1px var(--primary); }
    .pin-btn { height: 64px; border-radius: 12px; background: var(--sidebar-bg); border: none; font-size: 24px; font-weight: 600; color: var(--text-primary); cursor: pointer; transition: transform 0.1s; }
    .pin-btn:active { transform: scale(0.95); }
    .pin-dot { width: 16px; height: 16px; border-radius: 50%; border: 2px solid var(--primary); }
    .pin-dot.filled { background: var(--primary); }
    .shake { transform: translateX(5px); animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both; }
    @keyframes shake { 10%, 90% { transform: translate3d(-1px, 0, 0); } 20%, 80% { transform: translate3d(2px, 0, 0); } 30%, 50%, 70% { transform: translate3d(-4px, 0, 0); } 40%, 60% { transform: translate3d(4px, 0, 0); } }
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
  orders: {}, // Active orders loaded into memory { tableId: order }
  categories: [],
  menuItems: [],
  tables: [],
  settings: {}
};

// ──────────────── INDEXED DB ────────────────

const DB_NAME = 'cafe-pos-db';
const DB_VERSION = 2; // Upgraded version for new schema
let db = null;

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const d = e.target.result;
      const stores = [
        { name: 'categories', keyPath: 'id', autoInc: true },
        { name: 'menu_items', keyPath: 'id', autoInc: true },
        { name: 'tables', keyPath: 'id', autoInc: true },
        { name: 'orders', keyPath: 'id', autoInc: true },
        { name: 'order_items', keyPath: 'id', autoInc: true },
        { name: 'expenses', keyPath: 'id', autoInc: true },
        { name: 'expense_categories', keyPath: 'id', autoInc: true },
        { name: 'customers', keyPath: 'id', autoInc: true },
        { name: 'credit_orders', keyPath: 'id', autoInc: true },
        { name: 'settings', keyPath: 'key', autoInc: false }
      ];
      stores.forEach(s => {
        if (!d.objectStoreNames.contains(s.name)) {
          d.createObjectStore(s.name, s.autoInc ? { keyPath: s.keyPath, autoIncrement: true } : { keyPath: s.keyPath });
        }
      });
    };
    req.onsuccess = (e) => { db = e.target.result; resolve(db); };
    req.onerror = (e) => reject(e);
  });
}

function dbOp(storeName, method, data = null) {
  return new Promise((resolve, reject) => {
    if (!db) return reject('DB not initialized');
    const mode = (method === 'get' || method === 'getAll') ? 'readonly' : 'readwrite';
    const tx = db.transaction(storeName, mode);
    const store = tx.objectStore(storeName);
    let req;

    if (method === 'getAll') req = store.getAll();
    else if (method === 'get') req = store.get(data);
    else if (method === 'add' || method === 'put') req = store[method](data);
    else if (method === 'delete') req = store.delete(data);
    else if (method === 'clear') req = store.clear();

    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

// ──────────────── SEEDING ────────────────

async function seedDB() {
  const settings = await dbOp('settings', 'getAll');
  if (settings.length > 0) return; // Already seeded

  // Seed Settings
  await dbOp('settings', 'put', { key: 'business_name', value: 'Café POS' });
  await dbOp('settings', 'put', { key: 'language', value: 'ar' });
  await dbOp('settings', 'put', { key: 'printer', value: 'bluetooth' });
  await dbOp('settings', 'put', { key: 'owner_pin', value: '2525' });

  // Seed Tables
  for (let i = 1; i <= 20; i++) {
    await dbOp('tables', 'add', { name: `طاولة ${i}`, status: 'empty' });
  }

  // Seed Categories
  const cats = [
    { name_ar: 'قهوة ساخنة', name_en: 'Hot Coffee', sort_order: 1, emoji: '🔥' },
    { name_ar: 'مشروبات باردة', name_en: 'Cold Drinks', sort_order: 2, emoji: '🧊' },
    { name_ar: 'مشروبات خاصة', name_en: 'Specialty', sort_order: 3, emoji: '✨' },
    { name_ar: 'أطعمة', name_en: 'Food', sort_order: 4, emoji: '🥪' },
    { name_ar: 'حلويات', name_en: 'Desserts', sort_order: 5, emoji: '🍰' }
  ];
  let catIds = [];
  for (const c of cats) {
    const id = await dbOp('categories', 'add', c);
    catIds.push(id);
  }

  // Seed Items
  const items = [
    { category_id: catIds[0], name_ar: 'إسبريسو', name_en: 'Espresso', price: 12, is_available: 1 },
    { category_id: catIds[0], name_ar: 'كابتشينو', name_en: 'Cappuccino', price: 18, is_available: 1 },
    { category_id: catIds[1], name_ar: 'لاتيه مثلج', name_en: 'Iced Latte', price: 20, is_available: 1 },
    { category_id: catIds[3], name_ar: 'كلوب ساندويتش', name_en: 'Club Sandwich', price: 28, is_available: 1 },
    { category_id: catIds[4], name_ar: 'تشيز كيك', name_en: 'Cheesecake', price: 22, is_available: 1 }
  ];
  for (const i of items) {
    await dbOp('menu_items', 'add', i);
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

// Show a custom modal and return a Promise that resolves with true (ok) or false (cancel)
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

// Show an input modal and return Promise with value string or null
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
    await dbOp('orders', 'put', { ...order, items: undefined }); // save updated totals
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

        // 1. تحديث رقم الفاتورة والوقت
        document.getElementById('print-invoice-id').innerText = `رقم الفاتورة #${order.id ? order.id.toString().slice(-4) : '0000'}`;
        const now = new Date();
        document.getElementById('print-date-time').innerText = `${now.toLocaleDateString('en-GB')} ${now.toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'})}`;
        
        // 2. تحديث رقم الطاولة (بنسحبه من order.table_id أو من الحالة)
        const tableNum = order.table_id || state.currentTable || '-';
        document.getElementById('print-table-num').innerText = `رقم الطاولة: ${tableNum}`;

        // 3. تفريغ وتعبئة الجدول
        const tbody = document.getElementById('print-invoice-items');
        tbody.innerHTML = ''; 

        let subtotal = 0;
        let count = 0;

        order.items.forEach(item => {
            const price = parseFloat(item.price) || 0;
            const qty = parseInt(item.quantity) || 0;
            subtotal += (price * qty);
            count += qty;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="col-qty">${qty}</td>
                <td class="col-item">${item.name_ar || item.name}</td>
                <td class="col-price">${(price * qty).toFixed(2)}</td>
            `;
            tbody.appendChild(tr);
        });

        // 4. تحديث المجاميع
        const discount = parseFloat(order.discount) || 0;
        document.getElementById('invoice-subtotal').innerText = `${subtotal.toFixed(2)} ج.م`;
        document.getElementById('invoice-discount').innerText = `${discount.toFixed(2)} ج.م`;
        document.getElementById('invoice-total').innerText = `${(subtotal - discount).toFixed(2)} ج.م`;
        document.getElementById('invoice-items-count').innerText = `عدد المنتجات: ${count}`;

        // 5. الطباعة
        window.print();
    } catch (e) {
        console.error("خطأ في الطباعة:", e);
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
  document.getElementById('owner-dashboard').style.display = 'flex';
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

async function loadReports(type = 'today') {
  document.querySelectorAll('.toggle-btn').forEach(b => {
    b.classList.remove('active');
    b.style.background = 'none';
    b.style.color = 'var(--text-secondary)';
    b.style.boxShadow = 'none';
  });
  const activeBtn = document.getElementById(`rep-${type}`);
  activeBtn.classList.add('active');
  activeBtn.style.background = 'var(--bg)';
  activeBtn.style.color = 'var(--primary)';
  activeBtn.style.boxShadow = 'var(--shadow-sm)';

  const orders = await dbOp('orders', 'getAll');
  const creditOrders = await dbOp('credit_orders', 'getAll');
  const expenses = await dbOp('expenses', 'getAll');
  const orderItems = await dbOp('order_items', 'getAll');
  const customers = await dbOp('customers', 'getAll');

  const todayStr = isoDate().split('T')[0];
  const monthStr = todayStr.substring(0, 7); // YYYY-MM

  const matchDate = (dateStr) => {
    if (!dateStr) return false;
    if (type === 'today') return dateStr.startsWith(todayStr);
    return dateStr.startsWith(monthStr);
  };

  let revenue = 0;
  orders.forEach(o => {
    if (o.status === 'paid' && ['cash', 'wallet'].includes(o.payment_method) && matchDate(o.paid_at)) revenue += o.total;
  });
  creditOrders.forEach(co => {
    if (co.is_paid && matchDate(co.paid_at)) revenue += co.amount;
  });

  let expTotal = 0;
  expenses.forEach(e => {
    if (matchDate(e.created_at)) expTotal += e.amount;
  });

  // Top item
  const itemCounts = {};
  orders.forEach(o => {
    if (o.status === 'paid' && matchDate(o.paid_at)) {
      const items = orderItems.filter(oi => oi.order_id === o.id);
      items.forEach(oi => {
        itemCounts[oi.item_id] = (itemCounts[oi.item_id] || 0) + oi.quantity;
      });
    }
  });
  let topItemId = null, topQty = 0;
  for (const [id, qty] of Object.entries(itemCounts)) {
    if (qty > topQty) { topQty = qty; topItemId = id; }
  }
  let topItemName = '-';
  if (topItemId) {
    const it = await dbOp('menu_items', 'get', Number(topItemId));
    if (it) topItemName = `${state.lang === 'ar' ? it.name_ar : it.name_en} (${topQty})`;
  }

  // Expected Cash on Hand
  let cashOnHand = 0;
  orders.forEach(o => {
    if (o.status === 'paid' && ['cash', 'wallet'].includes(o.payment_method) && o.paid_at && o.paid_at.startsWith(monthStr)) cashOnHand += o.total;
  });
  creditOrders.forEach(co => {
    if (co.is_paid && co.paid_at && co.paid_at.startsWith(monthStr)) cashOnHand += co.amount;
  });
  expenses.forEach(e => {
    if (e.created_at && e.created_at.startsWith(monthStr)) cashOnHand -= e.amount;
  });

  document.getElementById('rep-revenue').textContent = fmt(revenue);
  document.getElementById('rep-expenses').textContent = fmt(expTotal);
  document.getElementById('rep-net').textContent = fmt(revenue - expTotal);
  document.getElementById('rep-top-item').textContent = topItemName;
  document.getElementById('rep-cash-on-hand').textContent = fmt(cashOnHand) + ' ' + t('currency');

  // Credit Report Table
  const unpaid = creditOrders.filter(co => !co.is_paid);
  const grouped = {};
  unpaid.forEach(co => {
    if (!grouped[co.customer_id]) grouped[co.customer_id] = { id: co.customer_id, orders: [] };
    grouped[co.customer_id].orders.push(co);
  });

  const tbody = document.getElementById('credit-report-table');
  if (Object.keys(grouped).length > 0) {
    tbody.innerHTML = Object.values(grouped).map(g => {
      const c = customers.find(x => x.id === g.id);
      const cName = c ? c.name : 'Unknown';
      return `
        <tr><td colspan="4" style="background:var(--sidebar-bg);font-weight:700;padding:16px;">${cName}</td></tr>
        ${g.orders.map(o => `
          <tr>
            <td style="padding:16px; border-bottom:1px solid var(--border);"></td>
            <td style="padding:16px; border-bottom:1px solid var(--border);">${o.items_summary}</td>
            <td style="padding:16px; border-bottom:1px solid var(--border);">${fmt(o.amount)}</td>
            <td style="padding:16px; border-bottom:1px solid var(--border);"><button class="btn-outline" onclick="window.payCreditOrder(${o.id}, ${g.id})">تم الدفع / Paid</button></td>
          </tr>
        `).join('')}
      `;
    }).join('');
  } else {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:20px;">لا توجد حسابات آجلة / No credit orders</td></tr>`;
  }
}

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
    const type = document.getElementById('rep-month').classList.contains('active') ? 'month' : 'today';
    loadReports(type);
    showToast('تم دفع الآجل / Credit Paid');
  } catch (e) { console.error(e); }
}

// ========== MENU TAB FUNCTIONS ==========

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

    // Re-render categories to update the active highlight
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

// ========== END MENU TAB FUNCTIONS ==========

async function loadTablesMgmt() {
  const tables = await dbOp('tables', 'getAll');
  document.getElementById('mgmt-tables-grid').innerHTML = tables.map(t => `
    <div style="background:var(--surface); border:1px solid var(--border); padding:16px; border-radius:8px; display:flex; justify-content:space-between;">
      <span>${t.name}</span>
      <button style="color:var(--error); background:none; border:none; cursor:pointer;" onclick="window.delTable(${t.id})">حذف</button>
    </div>
  `).join('');
}

async function loadExpensesMgmt() {
  const cats = await dbOp('expense_categories', 'getAll');
  document.getElementById('mgmt-exp-cats-list').innerHTML = cats.map(c => `
    <div class="mgmt-row">
      <span>${c.name}</span>
      <button style="color:var(--error); background:none; border:none; cursor:pointer;" onclick="window.delExpCat(${c.id})">حذف</button>
    </div>
  `).join('');
}
window.delExpCat = async (id) => {
  const ok = await showConfirmModal('cm-del-table', 'cm-del-table-ok', 'cm-del-table-cancel');
  if (!ok) return;
  await dbOp('expense_categories', 'delete', id);
  loadExpensesMgmt();
  showToast('تم الحذف');
};

async function loadCustomersMgmt() {
  const custs = await dbOp('customers', 'getAll');
  document.getElementById('mgmt-customers-list').innerHTML = custs.map(c => `
    <div class="mgmt-row">
      <div><div style="font-weight:700">${c.name}</div>${c.total_credit > 0 ? `<div style="color:var(--primary);font-size:12px;">آجل: ${fmt(c.total_credit)}</div>` : ''}</div>
      <button style="color:var(--error); background:none; border:none; cursor:pointer;" onclick="window.delCust(${c.id})">حذف</button>
    </div>
  `).join('');
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

// ──────────────── EVENTS ────────────────

function bindEvents() {
  const openModal = (id) => document.getElementById(id).hidden = false;
  const closeModal = (id) => document.getElementById(id).hidden = true;

  // Modals
  document.getElementById('btn-tables').addEventListener('click', () => { renderTables(); openModal('tables-modal'); });
  document.getElementById('close-tables').addEventListener('click', () => closeModal('tables-modal'));
  document.getElementById('tables-modal').addEventListener('click', (e) => { if (e.target === e.currentTarget) closeModal('tables-modal'); });

  document.getElementById('btn-more').addEventListener('click', () => { openModal('pin-modal'); enteredPin = ''; updatePinDisplay(); });
  document.getElementById('close-pin').addEventListener('click', () => closeModal('pin-modal'));

  document.getElementById('btn-expenses').addEventListener('click', async () => {
    const cats = await dbOp('expense_categories', 'getAll');
    document.getElementById('expense-category').innerHTML = cats.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    document.getElementById('expense-amount').value = '';
    document.getElementById('expense-note').value = '';
    openModal('expenses-modal');
  });
  document.getElementById('close-expenses').addEventListener('click', () => closeModal('expenses-modal'));
  document.getElementById('submit-expense').addEventListener('click', async () => {
    const cid = document.getElementById('expense-category').value;
    const cname = document.getElementById('expense-category').options[document.getElementById('expense-category').selectedIndex]?.text || '';
    const amt = Number(document.getElementById('expense-amount').value);
    const note = document.getElementById('expense-note').value;
    if (!amt) return;
    await dbOp('expenses', 'add', { category_id: Number(cid), category_name: cname, amount: amt, note, created_at: isoDate() });
    closeModal('expenses-modal');
    showToast('تم حفظ المصروف / Expense Saved');
  });

  // btn-credit handler (triggered via pay-credit-btn click)
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

  // Table selection
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

  // زر المسح في الهيدر
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

  // Dashboard Nav & PIN
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

  // Mgmt Add Actions
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
 // 1. تشغيل زر إضافة طاولة
  const btnAddTable = document.getElementById('btn-add-table');
  if (btnAddTable) {
    btnAddTable.addEventListener('click', async () => {
      const name = await showInputModal('cm-add-table', 'cm-table-name', 'cm-add-table-ok', 'cm-add-table-cancel');
      if (!name) return;
      try {
        const id = await dbOp('tables', 'add', { name, status: 'empty' });
        state.tables.push({ id, name, status: 'empty' });
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

// ──────────────── INIT ────────────────

async function init() {
  try {
    injectDynamicUI();
    await openDB();
    await seedDB();
    await loadInitialData();
    // One-time migration to set PIN to 2525 if it's not already set to a 4-digit PIN
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