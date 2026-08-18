/* ═══════════════════════════════════════════════════
   CAFÉ POS — Application Logic (Full Features + New UI)
   ═══════════════════════════════════════════════════ */

// ──────────────── DYNAMIC UI INJECTION ────────────────
function injectDynamicUI() {
  const container = document.createElement('div');
  container.innerHTML = `
    <div class="modal-overlay" id="expenses-modal" hidden style="align-items:center;">
      <div class="modal" style="max-width:420px;width:95%;padding:0;border-radius:16px;overflow:hidden;">
        <div style="display:flex; justify-content:space-between; align-items:center; padding:18px 20px; border-bottom:1px solid var(--border);">
          <h2 style="font-size:18px; font-weight:700;">المصروفات</h2>
          <button id="close-expenses" style="background:none; border:none; cursor:pointer; color:var(--text-secondary); font-size:22px;">✕</button>
        </div>
        <div style="padding:20px; display:flex; flex-direction:column; gap:14px;">
          <div>
            <label style="display:block; margin-bottom:6px; font-size:13px; color:var(--text-secondary); font-weight:600;">القسم</label>
            <select id="expense-category" style="width:100%; height:44px; border:1.5px solid var(--border); border-radius:8px; padding:0 12px; font-size:14px; font-family:'Cairo',sans-serif; background:var(--surface); outline:none;"></select>
          </div>
          <div>
            <label style="display:block; margin-bottom:6px; font-size:13px; color:var(--text-secondary); font-weight:600;">المبلغ</label>
            <input type="number" id="expense-amount" placeholder="0.00" min="0" step="0.5" style="width:100%; height:44px; border:1.5px solid var(--border); border-radius:8px; padding:0 12px; font-size:14px; outline:none; box-sizing:border-box;">
          </div>
          <div>
            <label style="display:block; margin-bottom:6px; font-size:13px; color:var(--text-secondary); font-weight:600;">اسم المورد / ملاحظة</label>
            <input type="text" id="expense-note" placeholder="مثال: شركة النيل للخامات" style="width:100%; height:44px; border:1.5px solid var(--border); border-radius:8px; padding:0 12px; font-size:14px; outline:none; box-sizing:border-box;">
          </div>
          <button id="submit-expense" style="width:100%; height:46px; background:var(--primary); color:white; border:none; border-radius:9px; font-weight:700; font-size:15px; cursor:pointer;">حفظ المصروف</button>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="credit-modal" hidden>
      <div class="modal" style="max-width: 400px; border-radius: 16px; overflow: hidden;">
        <div class="modal-header" style="display:flex; justify-content:space-between; padding:20px; border-bottom:1px solid var(--border);">
          <h2 style="font-size: 20px; font-weight: 700;">الآجل</h2>
          <button class="modal-close" id="close-credit" style="background:none; border:none; cursor:pointer;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="modal-body" style="padding:20px;">
          <div style="margin-bottom:16px;">
            <label style="display:block; margin-bottom:6px; font-size:13px; color:var(--text-secondary);">العميل</label>
            <select id="credit-customer" style="width:100%; height:44px; border:1px solid var(--border); border-radius:8px; padding:0 12px; font-size:14px;"></select>
          </div>
          <button id="submit-credit" style="width:100%; height:44px; background:var(--primary); color:white; border:none; border-radius:8px; font-weight:600; cursor:pointer;">تأكيد</button>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="pin-modal" hidden>
      <div class="modal" style="max-width: 320px; border-radius: 16px; overflow: hidden;">
        <div class="modal-header" style="display:flex; justify-content:space-between; padding:20px; border-bottom:1px solid var(--border);">
          <h2 style="font-size: 18px; font-weight: 700;">دخول المدير</h2>
          <button class="modal-close" id="close-pin" style="background:none; border:none; cursor:pointer;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="modal-body" style="padding:24px; display:flex; flex-direction:column; align-items:center;">
          <div id="pin-display" style="display:flex; gap:12px; margin-bottom:24px;">
            <span class="pin-dot"></span><span class="pin-dot"></span><span class="pin-dot"></span><span class="pin-dot"></span>
          </div>
          <p id="pin-error" style="color:var(--danger); font-size:13px; margin-bottom:12px; height:18px;" hidden>رمز غير صحيح</p>
          <div id="pin-pad" style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px; width:100%;">
            <button class="pin-btn">1</button><button class="pin-btn">2</button><button class="pin-btn">3</button>
            <button class="pin-btn">4</button><button class="pin-btn">5</button><button class="pin-btn">6</button>
            <button class="pin-btn">7</button><button class="pin-btn">8</button><button class="pin-btn">9</button>
            <button class="pin-btn btn-clear" style="color:var(--danger);">C</button><button class="pin-btn" style="grid-column: span 2;">0</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="confirm-modal" hidden>
      <div class="modal" style="max-width: 400px; border-radius: 18px; overflow: hidden;">
        <div class="modal-body" style="padding:28px 24px; text-align:center;">
          <h3 id="confirm-title" style="font-size:18px; font-weight:700; margin-bottom:8px;">هل أنت متأكد؟</h3>
          <p id="confirm-msg" style="color:var(--text-secondary); font-size:14px; margin-bottom:24px;">سيتم حذف هذا العنصر نهائياً.</p>
          <div style="display:flex; gap:10px;">
            <button id="btn-cancel-confirm" style="flex:1; height:44px; background:#F1F5F9; border:none; border-radius:10px; font-weight:600; cursor:pointer;">إلغاء</button>
            <button id="btn-do-confirm" style="flex:1; height:44px; background:var(--danger); color:white; border:none; border-radius:10px; font-weight:600; cursor:pointer;">حذف</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="cm-drawer-balance" hidden>
      <div class="modal" style="max-width: 360px; border-radius: 16px; padding: 28px 24px;">
        <h2 style="font-size: 17px; font-weight: 700; margin-bottom: 8px;">رصيد الدرج</h2>
        <p style="font-size: 14px; color: var(--text-secondary); margin-bottom: 20px;">أدخل رصيد الدرج الحالي</p>
        <input type="number" id="cm-drawer-amount" placeholder="0.00" style="width: 100%; height: 44px; border: 1.5px solid var(--border); border-radius: 9px; padding: 0 12px; font-size: 15px; margin-bottom: 18px; outline: none;">
        <div style="display:flex; gap:10px;">
          <button class="modal-cancel-btn" id="cm-drawer-cancel" style="flex:1; height:44px; background:#F1F5F9; border:none; border-radius:9px; font-weight:600; cursor:pointer;">إلغاء</button>
          <button id="cm-drawer-ok" style="flex:1; height:44px; background:var(--primary); color:white; border:none; border-radius:9px; font-weight:600; cursor:pointer;">حفظ</button>
        </div>
      </div>
    </div>

    <!-- DASHBOARD -->
    <div id="owner-dashboard" class="dash-root">
      <aside class="dash-sidebar">
        <div class="dash-brand">
          <div class="dash-brand-logo">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"/><path d="M12 3v6"/></svg>
          </div>
          <div>
            <div class="dash-brand-name">MENUX</div>
            <div class="dash-brand-sub">لوحة الإدارة</div>
          </div>
        </div>
        <nav id="dashboard-nav" class="dash-nav">
          <button class="dash-nav-item active" data-tab="reports"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="6" height="18" rx="1"/><rect x="9" y="8" width="6" height="13" rx="1"/><rect x="16" y="13" width="6" height="8" rx="1"/></svg><span>التقارير</span></button>
          <button class="dash-nav-item" data-tab="menu"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg><span>المنيو</span></button>
          <button class="dash-nav-item" data-tab="tables"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg><span>الطاولات</span></button>
          <button class="dash-nav-item" data-tab="expenses"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 10h20"/></svg><span>المصروفات</span></button>
          <button class="dash-nav-item" data-tab="customers"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg><span>العملاء</span></button>
          <button class="dash-nav-item" data-tab="settings"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg><span>الإعدادات</span></button>
        </nav>
        <button id="btn-exit-dashboard" class="dash-exit-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg><span>خروج</span></button>
      </aside>

      <main class="dash-main">
        <div class="dash-tab-pane active" id="tab-reports">
          <div class="dash-page-header">
            <div><h1 class="dash-page-title">التقارير</h1><p class="dash-page-sub" id="rep-date-label">اليوم</p></div>
            <div class="dash-header-actions">
              <input type="date" id="rep-date-picker" class="dash-date-input">
              <div class="dash-toggle-group">
                <button id="rep-today" class="dash-toggle-btn active">اليوم</button>
                <button id="rep-month" class="dash-toggle-btn">الشهر</button>
              </div>
            </div>
          </div>
          <div class="kpi-grid" style="grid-template-columns: repeat(4, 1fr);">
            <div class="kpi-card kpi-hero" id="kpi-hero-card" style="grid-column: 1 / -1;"><div class="kpi-label">المتوقع في الخزنة</div><div class="kpi-value" id="rep-cash-on-hand">0.00</div></div>
            <div class="kpi-card kpi-accent" id="kpi-revenue-card"><div class="kpi-label">إجمالي الإيراد</div><div class="kpi-value" id="rep-revenue">0.00</div></div>
            <div class="kpi-card"><div class="kpi-label">رصيد الدرج</div><div class="kpi-value kpi-purple" id="rep-drawer-balance">0.00</div></div>
            <div class="kpi-card" id="kpi-cash-card"><div class="kpi-label">إيراد نقدي</div><div class="kpi-value kpi-green" id="rep-cash">0.00</div></div>
            <div class="kpi-card" id="kpi-wallet-card"><div class="kpi-label">محفظة</div><div class="kpi-value kpi-blue" id="rep-wallet">0.00</div></div>
            <div class="kpi-card kpi-success"><div class="kpi-label">صافي الدخل</div><div class="kpi-value" id="rep-net">0.00</div></div>
          </div>
        </div>
        <div class="dash-tab-pane" id="tab-menu" style="display:none; height:100%;">
          <div style="display:flex; gap:28px; height:100%;">
            <div style="flex:0 0 38%; display:flex; flex-direction:column;">
              <div class="dash-page-header" style="margin-bottom:16px;"><h2 class="dash-page-title" style="font-size:20px;">الأقسام</h2><button id="btn-add-category" class="dash-btn-primary">+ قسم جديد</button></div>
              <div id="mgmt-categories-list" style="display:flex; flex-direction:column; gap:8px; overflow-y:auto; flex:1;"></div>
            </div>
            <div style="flex:1; display:flex; flex-direction:column; position:relative; border-right:1px solid var(--border); padding-right:28px;">
              <div class="dash-page-header" style="margin-bottom:16px;"><h2 id="mgmt-items-title" class="dash-page-title" style="font-size:20px;">المنتجات</h2></div>
              <div id="mgmt-items-list" style="display:flex; flex-direction:column; gap:10px; overflow-y:auto; padding-bottom:80px; flex:1;"></div>
              <button id="btn-add-item" class="dash-fab">+</button>
            </div>
          </div>
        </div>
        <div class="dash-tab-pane" id="tab-tables" style="display:none;"><div class="dash-page-header"><h1 class="dash-page-title">الطاولات</h1><button id="btn-add-table" class="dash-btn-primary">+ إضافة طاولة</button></div><div id="mgmt-tables-grid" class="tables-grid"></div></div>
        <div class="dash-tab-pane" id="tab-expenses" style="display:none;"><div class="dash-page-header"><h1 class="dash-page-title">تصنيفات المصروفات</h1><button id="btn-add-exp-cat" class="dash-btn-primary">+ إضافة صنف</button></div><div id="mgmt-exp-cats-list" style="max-width:520px; display:flex; flex-direction:column; gap:8px;"></div></div>
        <div class="dash-tab-pane" id="tab-customers" style="display:none;"><div class="dash-page-header"><h1 class="dash-page-title">العملاء</h1><button id="btn-add-customer" class="dash-btn-primary">+ إضافة عميل</button></div><div id="mgmt-customers-list" style="max-width:700px; display:flex; flex-direction:column; gap:10px;"></div></div>
        <div class="dash-tab-pane" id="tab-settings" style="display:none;"><div class="dash-page-header"><h1 class="dash-page-title">الإعدادات</h1><button id="btn-save-settings" class="dash-btn-primary">حفظ</button></div><div class="dash-settings-form"><div class="dash-field"><label>اسم المكان</label><input type="text" id="set-bname"></div><div class="dash-field"><label>اللغة</label><select id="set-lang"><option value="ar">العربية</option><option value="en">English</option></select></div><button id="btn-change-pin" class="dash-btn-outline">تغيير الرقم السري</button></div></div>
      </main>
    </div>
  `;
  document.body.appendChild(container);

  const style = document.createElement('style');
  style.innerHTML = `
    .pin-btn { height: 64px; border-radius: 12px; background: var(--surface-2); border: 1.5px solid var(--border); font-size: 22px; font-weight: 600; color: var(--text-primary); cursor: pointer; font-family:'Sora',sans-serif; }
    .pin-btn:hover { background:var(--primary-light); border-color:var(--primary); }
    .pin-dot { width: 14px; height: 14px; border-radius: 50%; border: 2px solid var(--primary); display:inline-block; }
    .pin-dot.filled { background: var(--primary); }
    .shake { animation: shake 0.4s; }
    @keyframes shake { 10%,90%{transform:translate3d(-1px,0,0)} 20%,80%{transform:translate3d(2px,0,0)} 30%,50%,70%{transform:translate3d(-4px,0,0)} 40%,60%{transform:translate3d(4px,0,0)} }
  `;
  document.head.appendChild(style);
}

// ──────────────── STATE & HELPERS ────────────────
const state = { lang: 'ar', currentTable: null, selectedCategory: null, searchQuery: '', orders: {}, categories: [], menuItems: [], tables: [], settings: {} };

function t(key) { const dict = { 'no-table': 'لم يتم اختيار طاولة', 'no-items': 'لا توجد عناصر بعد', 'currency': 'ر.س', 'order-completed': 'تم إتمام الطلب', 'select-table-first': 'يرجى اختيار طاولة أولاً', 'empty-order': 'الطلب فارغ', 'table-selected': 'تم اختيار الطاولة' }; return dict[key] || key; }
function fmt(n) { return Number(n || 0).toFixed(2); }
function getCurrentOrder() { return state.currentTable ? state.orders[state.currentTable] : null; }
function showToast(msg, isError = false) {
  const el = document.getElementById('toast');
  document.getElementById('toast-message').textContent = msg;
  el.style.backgroundColor = isError ? 'var(--danger)' : 'var(--text-primary)';
  el.hidden = false; el.offsetHeight; el.classList.add('show');
  setTimeout(() => { el.classList.remove('show'); setTimeout(() => { el.hidden = true; }, 200); }, 2200);
}
const isoDate = () => new Date().toISOString();

// ──────────────── SUPABASE INIT ────────────────
const SUPABASE_URL = 'https://wbyovaggjnnafbcrlimr.supabase.co'; 
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndieW92YWdnam5uYWZiY3JsaW1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5Njk1NDIsImV4cCI6MjEwMjU0NTU0Mn0.7aOgvhdB4YMoQJAZ90ow8tMEJZN4-jqh8p6-T2MfBCg'; 
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function dbOp(storeName, method, data = null) {
  try {
    if (method === 'getAll') { const { data: result, error } = await supabaseClient.from(storeName).select('*'); if (error) throw error; return result || []; } 
    else if (method === 'get') { const { data: result, error } = await supabaseClient.from(storeName).select('*').eq('id', data).single(); if (error && error.code !== 'PGRST116') throw error; return result; } 
    else if (method === 'add') { if (data && data.items) delete data.items; const { data: result, error } = await supabaseClient.from(storeName).insert(data).select().single(); if (error) throw error; return result ? result.id : null; } 
    else if (method === 'put') { if (data && data.items) delete data.items; const { data: result, error } = await supabaseClient.from(storeName).upsert(data).select().single(); if (error) throw error; return result; } 
    else if (method === 'delete') { const { error } = await supabaseClient.from(storeName).delete().eq('id', data); if (error) throw error; }
  } catch (error) { console.error(`DB Error:`, error.message); showToast('خطأ في قاعدة البيانات', true); return null; }
}

// ──────────────── ICONS ────────────────
const categoryIcons = {
  'قهوة ساخنة': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M5 8h14v9a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8Z"/></svg>',
  'مشروبات باردة': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2v6m0 0 3-3m-3 3L9 5"/><path d="M5 8h14l-1.5 12.5a2 2 0 0 1-2 1.5h-7a2 2 0 0 1-2-1.5L5 8z"/></svg>',
  'حلويات': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 20h16M6 20V12a6 6 0 0 1 12 0v8M12 6V2"/></svg>',
  'أطعمة': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 11h16M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3M6 11v9m12-9v9"/></svg>',
  'default': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 6h16M4 12h16M4 18h12"/></svg>'
};
function getCategoryIcon(name) { return categoryIcons[name] || categoryIcons['default']; }

// ──────────────── DB DATA FETCHING ────────────────
async function loadInitialData() {
  const s = await dbOp('settings', 'getAll'); s.forEach(setting => state.settings[setting.key] = setting.value);
  state.categories = await dbOp('categories', 'getAll'); state.menuItems = await dbOp('menu_items', 'getAll'); state.tables = await dbOp('tables', 'getAll');
  const allOrders = await dbOp('orders', 'getAll'); const allOrderItems = await dbOp('order_items', 'getAll');
  state.orders = {};
  for (const o of allOrders) { if (o.status === 'open' || o.status === 'printed') { o.items = allOrderItems.filter(i => i.order_id === o.id); state.orders[o.table_id] = o; } }
}

// ──────────────── RENDERING ────────────────
function renderCategories() {
  const container = document.getElementById('category-tabs');
  let html = `<button class="cat-tab ${!state.selectedCategory ? 'active' : ''}" data-cat=""><span class="cat-tab-icon">${categoryIcons['default']}</span><span>الكل</span></button>`;
  state.categories.sort((a, b) => a.sort_order - b.sort_order).forEach(c => {
    html += `<button class="cat-tab ${state.selectedCategory == c.id ? 'active' : ''}" data-cat="${c.id}"><span class="cat-tab-icon">${getCategoryIcon(c.name_ar)}</span><span>${c.name_ar}</span></button>`;
  });
  container.innerHTML = html;
}
function renderMenu() {
  const container = document.getElementById('menu-grid');
  let items = state.menuItems.filter(i => i.is_available);
  if (state.selectedCategory) items = items.filter(i => i.category_id == state.selectedCategory);
  container.innerHTML = items.map(item => `<button class="menu-card" data-item-id="${item.id}"><div class="menu-card-body"><span class="menu-card-name-ar">${item.name_ar}</span><span class="menu-card-name-en">${item.name_en}</span></div><div class="menu-card-footer"><span class="menu-card-price">${fmt(item.price)} <small>ر.س</small></span><span class="menu-card-add-icon">+</span></div></button>`).join('');
}
function renderOrder() {
  const container = document.getElementById('order-items'); const titleEl = document.getElementById('table-title'); const order = getCurrentOrder();
  if (state.currentTable) { const tbl = state.tables.find(t => t.id == state.currentTable); titleEl.innerHTML = tbl ? tbl.name : `طاولة #${state.currentTable}`; } else { titleEl.innerHTML = `<span class="table-title-placeholder">لم يتم اختيار طاولة</span>`; }
  if (!order || !order.items || order.items.length === 0) { container.innerHTML = `<div class="empty-state"><p>لا توجد عناصر بعد</p></div>`; updateTotals(null); return; }
  container.innerHTML = order.items.map(oi => `<div class="order-item"><div class="order-item-info"><div class="order-item-name-ar">${oi.name_ar}</div></div><div class="order-item-controls"><div class="qty-control"><button class="qty-btn" data-action="dec" data-item="${oi.id}">−</button><span class="qty-value">${oi.quantity}</span><button class="qty-btn" data-action="inc" data-item="${oi.id}">+</button></div><span class="order-item-total">${fmt(oi.line_total)} ر.س</span><button class="order-item-remove" data-action="remove" data-item="${oi.id}">حذف</button></div></div>`).join('');
  updateTotals(order);
}
function updateTotals(order) {
  let subtotal = 0; if (order && order.items) { subtotal = order.items.reduce((sum, oi) => sum + oi.line_total, 0); order.subtotal = subtotal; order.total = Math.max(0, subtotal - (order.discount || 0)); }
  document.getElementById('subtotal').innerHTML = `${fmt(order ? order.subtotal : 0)} <small>ر.س</small>`;
  document.getElementById('total-value').innerHTML = `${fmt(order ? order.total : 0)} <small>ر.س</small>`;
  const discInput = document.getElementById('discount-input'); if (document.activeElement !== discInput) { const disc = order ? order.discount : 0; discInput.value = disc > 0 ? disc : ''; }
}
function renderTables() { const container = document.getElementById('tables-grid'); container.innerHTML = state.tables.map(tbl => `<button class="table-cell" data-table-id="${tbl.id}" data-status="${tbl.status}"><span class="table-cell-number">${tbl.id}</span></button>`).join(''); }

// ──────────────── CASHIER ACTIONS ────────────────
async function addToOrder(itemId) {
  if (!state.currentTable) return showToast(t('select-table-first'), true);
  let order = getCurrentOrder();
  if (!order) { const orderId = await dbOp('orders', 'add', { table_id: state.currentTable, status: 'open', discount: 0, subtotal: 0, total: 0, created_at: isoDate() }); order = await dbOp('orders', 'get', orderId); order.items = []; state.orders[state.currentTable] = order; }
  const menuItem = state.menuItems.find(i => i.id == itemId);
  let existing = order.items.find(i => i.item_id == itemId);
  if (existing) { existing.quantity++; existing.line_total = existing.quantity * menuItem.price; await dbOp('order_items', 'put', existing); } 
  else { const oi = { order_id: order.id, item_id: itemId, name_ar: menuItem.name_ar, price: menuItem.price, quantity: 1, line_total: menuItem.price }; const oiId = await dbOp('order_items', 'add', oi); oi.id = oiId; order.items.push(oi); }
  updateTotals(order); await dbOp('orders', 'put', { ...order, items: undefined }); renderOrder();
}
async function changeQty(orderItemId, delta) { const order = getCurrentOrder(); const item = order.items.find(i => i.id == orderItemId); item.quantity += delta; if (item.quantity <= 0) return removeItem(orderItemId); item.line_total = item.quantity * item.price; await dbOp('order_items', 'put', item); updateTotals(order); await dbOp('orders', 'put', { ...order, items: undefined }); renderOrder(); }
async function removeItem(orderItemId) { const order = getCurrentOrder(); await dbOp('order_items', 'delete', orderItemId); order.items = order.items.filter(i => i.id !== orderItemId); updateTotals(order); await dbOp('orders', 'put', { ...order, items: undefined }); renderOrder(); }
async function selectTable(id) { state.currentTable = Number(id); renderOrder(); document.getElementById('tables-modal').hidden = true; showToast(t('table-selected')); }
async function completeOrder(method, customerId = null) {
  const order = getCurrentOrder(); order.status = 'paid'; order.payment_method = method; order.paid_at = isoDate(); order.customer_id = customerId;
  await dbOp('orders', 'put', { ...order, items: undefined });
  if (method === 'credit' && customerId) { const summary = order.items.map(i => `${i.name_ar} (x${i.quantity})`).join(', '); await dbOp('credit_orders', 'add', { customer_id: customerId, order_id: order.id, amount: order.total, items_summary: summary, is_paid: 0, created_at: order.paid_at, paid_at: null }); const cust = await dbOp('customers', 'get', customerId); if (cust) { cust.total_credit = (cust.total_credit || 0) + order.total; await dbOp('customers', 'put', cust); } }
  const tbl = state.tables.find(t => t.id == state.currentTable); if (tbl) { tbl.status = 'empty'; await dbOp('tables', 'put', tbl); }
  delete state.orders[state.currentTable]; state.currentTable = null; renderOrder(); showToast(t('order-completed'));
}
async function printBill() {
  const order = getCurrentOrder(); if (!order) return;
  document.getElementById('print-table-num').textContent = state.tables.find(tb => tb.id == state.currentTable)?.name || '—';
  document.getElementById('print-date-time').textContent = new Date().toLocaleString();
  const tbody = document.getElementById('print-invoice-items'); tbody.innerHTML = '';
  let subtotal = 0; order.items.forEach(item => { subtotal += item.price * item.quantity; tbody.innerHTML += `<tr><td>${item.quantity}</td><td>${item.name_ar}</td><td>${(item.price * item.quantity).toFixed(2)}</td></tr>`; });
  document.getElementById('invoice-total').textContent = subtotal.toFixed(2); window.print();
}

// ──────────────── DASHBOARD LOGIC ────────────────
let enteredPin = '';
function updatePinDisplay() { document.querySelectorAll('.pin-dot').forEach((d, i) => d.classList.toggle('filled', i < enteredPin.length)); }
function handlePinInput(val) { if (val === 'C') { enteredPin = ''; } else if (enteredPin.length < 4) { enteredPin += val; if (enteredPin.length === 4) { if (enteredPin === (state.settings.owner_pin || '2525')) { document.getElementById('pin-modal').hidden = true; document.getElementById('app').style.display = 'none'; openDashboard(); enteredPin = ''; } else { enteredPin = ''; } } } updatePinDisplay(); }
function openDashboard() { document.getElementById('owner-dashboard').style.display = 'flex'; document.getElementById('owner-dashboard').style.flexDirection = 'row-reverse'; loadDashboardTab('reports'); }
function closeDashboard() { document.getElementById('owner-dashboard').style.display = 'none'; document.getElementById('app').style.display = 'flex'; loadInitialData().then(() => { renderCategories(); renderMenu(); renderTables(); renderOrder(); }); }
async function loadDashboardTab(tab) {
  document.querySelectorAll('.dash-tab-pane').forEach(el => { el.classList.remove('active'); el.style.display = 'none'; });
  document.querySelectorAll('.dash-nav-item').forEach(el => el.classList.remove('active'));
  document.getElementById(`tab-${tab}`).classList.add('active'); document.getElementById(`tab-${tab}`).style.display = 'block';
  document.querySelector(`.dash-nav-item[data-tab="${tab}"]`)?.classList.add('active');
  if (tab === 'reports') loadReports(); if (tab === 'menu') loadMenuTab(); if (tab === 'tables') loadTablesMgmt(); if (tab === 'expenses') loadExpensesMgmt(); if (tab === 'customers') loadCustomersMgmt(); if (tab === 'settings') loadSettingsMgmt();
}
async function loadReports() {
  const orders = await dbOp('orders', 'getAll'); const expenses = await dbOp('expenses', 'getAll');
  let cashRev = 0, walletRev = 0; orders.forEach(o => { if (o.status === 'paid' && o.paid_at?.startsWith(isoDate().split('T')[0])) { if (o.payment_method === 'cash') cashRev += o.total; if (o.payment_method === 'wallet') walletRev += o.total; } });
  const expTotal = expenses.filter(e => e.created_at?.startsWith(isoDate().split('T')[0])).reduce((s, e) => s + e.amount, 0);
  const netIncome = cashRev + walletRev - expTotal;
  document.getElementById('rep-cash-on-hand').textContent = fmt(cashRev + walletRev); document.getElementById('rep-cash').textContent = fmt(cashRev); document.getElementById('rep-wallet').textContent = fmt(walletRev);
  document.getElementById('rep-revenue').textContent = fmt(cashRev + walletRev); document.getElementById('rep-net').textContent = fmt(netIncome); document.getElementById('rep-drawer-balance').textContent = fmt(0);
}
let mgmtSelCat = null;
async function loadMenuTab() { const categories = await dbOp('categories', 'getAll'); categories.sort((a, b) => a.sort_order - b.sort_order); if (!mgmtSelCat && categories.length > 0) mgmtSelCat = categories[0].id; if (categories.length === 0) mgmtSelCat = null; document.getElementById('mgmt-categories-list').innerHTML = categories.map(c => `<div class="mgmt-row ${c.id === mgmtSelCat ? 'active' : ''}" onclick="selectCategory(${c.id})"><div>${c.name_ar}</div><button onclick="event.stopPropagation(); deleteCategory(${c.id})">حذف</button></div>`).join(''); if (mgmtSelCat) selectCategory(mgmtSelCat); }
async function selectCategory(categoryId) { mgmtSelCat = categoryId; const items = await dbOp('menu_items', 'getAll'); const catItems = items.filter(i => i.category_id === categoryId); document.getElementById('mgmt-items-list').innerHTML = catItems.map(i => `<div>${i.name_ar} - ${i.price}</div>`).join(''); }
async function loadTablesMgmt() { document.getElementById('mgmt-tables-grid').innerHTML = (await dbOp('tables', 'getAll')).map(t => `<div>${t.name}</div>`).join(''); }
async function loadExpensesMgmt() { document.getElementById('mgmt-exp-cats-list').innerHTML = (await dbOp('expense_categories', 'getAll')).map(c => `<div>${c.name}</div>`).join(''); }
async function loadCustomersMgmt() { document.getElementById('mgmt-customers-list').innerHTML = (await dbOp('customers', 'getAll')).map(c => `<div>${c.name}</div>`).join(''); }
async function loadSettingsMgmt() { /* Settings Logic */ }
window.deleteCategory = async function(id) { await dbOp('categories', 'delete', id); loadMenuTab(); renderCategories(); renderMenu(); }

// ──────────────── EVENTS ────────────────
function bindEvents() {
  document.getElementById('btn-tables').addEventListener('click', () => { renderTables(); document.getElementById('tables-modal').hidden = false; });
  document.getElementById('close-tables').addEventListener('click', () => document.getElementById('tables-modal').hidden = true);
  document.getElementById('btn-more').addEventListener('click', () => { document.getElementById('pin-modal').hidden = false; enteredPin = ''; updatePinDisplay(); });
  document.getElementById('close-pin').addEventListener('click', () => document.getElementById('pin-modal').hidden = true);
  document.getElementById('tables-grid').addEventListener('click', (e) => { const cell = e.target.closest('.table-cell'); if (cell) selectTable(cell.dataset.tableId); });
  document.getElementById('btn-print').addEventListener('click', printBill);
  document.getElementById('category-tabs').addEventListener('click', (e) => { const tab = e.target.closest('.cat-tab'); if (!tab) return; state.selectedCategory = tab.dataset.cat ? Number(tab.dataset.cat) : null; renderCategories(); renderMenu(); });
  document.getElementById('menu-grid').addEventListener('click', (e) => { const card = e.target.closest('.menu-card'); if (card) addToOrder(Number(card.dataset.itemId)); });
  document.getElementById('order-items').addEventListener('click', (e) => { const btn = e.target.closest('[data-action]'); if (!btn) return; const id = Number(btn.dataset.item); if (btn.dataset.action === 'inc') changeQty(id, 1); if (btn.dataset.action === 'dec') changeQty(id, -1); if (btn.dataset.action === 'remove') removeItem(id); });
  document.getElementById('discount-input').addEventListener('change', async (e) => { const order = getCurrentOrder(); if (!order) return; order.discount = Number(e.target.value) || 0; updateTotals(order); await dbOp('orders', 'put', { ...order, items: undefined }); });
  
  document.getElementById('btn-clear-order').addEventListener('click', async () => { const order = getCurrentOrder(); if (!order || !order.items || order.items.length === 0) return; for (const oi of order.items) { await dbOp('order_items', 'delete', oi.id); } await dbOp('orders', 'delete', order.id); delete state.orders[state.currentTable]; state.currentTable = null; renderOrder(); });
  document.getElementById('pin-pad').addEventListener('click', (e) => { if (e.target.tagName === 'BUTTON') handlePinInput(e.target.textContent === 'C' ? 'C' : e.target.textContent); });
  document.getElementById('dashboard-nav').addEventListener('click', (e) => { const item = e.target.closest('.dash-nav-item'); if (item && item.dataset.tab) loadDashboardTab(item.dataset.tab); });
  document.getElementById('btn-exit-dashboard').addEventListener('click', closeDashboard);

  document.getElementById('btn-expenses').addEventListener('click', async () => {
    const cats = await dbOp('expense_categories', 'getAll');
    document.getElementById('expense-category').innerHTML = cats.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    document.getElementById('expenses-modal').hidden = false;
  });
  document.getElementById('close-expenses').addEventListener('click', () => document.getElementById('expenses-modal').hidden = true);
  document.getElementById('submit-expense').addEventListener('click', async () => {
    const cid = document.getElementById('expense-category').value; const amt = Number(document.getElementById('expense-amount').value);
    if (!cid || !amt) return showToast('أدخل البيانات', true);
    await dbOp('expenses', 'add', { category_id: Number(cid), amount: amt, created_at: isoDate() });
    document.getElementById('expenses-modal').hidden = true; showToast('تم حفظ المصروف');
  });

  document.getElementById('btn-drawer-balance').addEventListener('click', () => document.getElementById('cm-drawer-balance').hidden = false);
  document.getElementById('cm-drawer-cancel').addEventListener('click', () => document.getElementById('cm-drawer-balance').hidden = true);
  document.getElementById('cm-drawer-ok').addEventListener('click', async () => {
    const val = Number(document.getElementById('cm-drawer-amount').value);
    await dbOp('settings', 'put', { key: 'drawer_balance', value: val });
    document.getElementById('cm-drawer-balance').hidden = true; showToast('تم حفظ رصيد الدرج');
  });

  // نظام الدفع الجديد
  document.getElementById('btn-checkout').addEventListener('click', () => {
    if (!state.currentTable) return showToast(t('select-table-first'), true);
    const order = getCurrentOrder();
    if (!order || !order.items || order.items.length === 0) return showToast(t('empty-order'), true);
    document.getElementById('payment-total-amount').innerHTML = `${fmt(order.total)} <small>ر.س</small>`;
    document.getElementById('payment-modal').hidden = false;
  });
  document.querySelectorAll('.payment-option-card').forEach(btn => {
    btn.addEventListener('click', () => {
      const method = btn.dataset.method; document.getElementById('payment-modal').hidden = true;
      if (method === 'credit') { openCreditModal(); } else { completeOrder(method); }
    });
  });
  document.getElementById('close-payment-modal').addEventListener('click', () => document.getElementById('payment-modal').hidden = true);
}

async function openCreditModal() {
  const custs = await dbOp('customers', 'getAll');
  document.getElementById('credit-customer').innerHTML = custs.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
  document.getElementById('credit-modal').hidden = false;
}

// ──────────────── INIT ────────────────
async function init() {
  try { injectDynamicUI(); await loadInitialData(); renderCategories(); renderMenu(); renderTables(); renderOrder(); bindEvents(); } 
  catch (e) { console.error("Init Error", e); showToast("Database Error", true); }
}
document.addEventListener('DOMContentLoaded', init);
