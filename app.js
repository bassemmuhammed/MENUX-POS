/* ═══════════════════════════════════════════════════
   CAFÉ POS — Application Logic (LTR OPTIMIZED)
   ═══════════════════════════════════════════════════ */

function injectDynamicUI() {
  const container = document.getElementById('dynamic-ui-container') || document.createElement('div');
  container.id = 'dynamic-ui-container';
  container.innerHTML = `
  <div class="modal-overlay" id="table-form-modal" hidden>
      <div class="modal">
        <div class="modal-header">
          <h2 id="table-form-title">إضافة طاولة / Add Table</h2>
          <button class="modal-close" onclick="document.getElementById('table-form-modal').hidden=true">✕</button>
        </div>
        <div class="modal-body expenses-body">
          <input type="hidden" id="table-form-id">
          <div>
            <label class="form-label">اسم الطاولة بالعربية / Arabic Name</label>
            <input type="text" id="table-form-name" class="form-input" placeholder="مثال: طاولة 1">
          </div>
        </div>
        <div class="modal-footer expenses-body">
          <button class="btn-cancel" onclick="document.getElementById('table-form-modal').hidden=true">إلغاء</button>
          <button class="btn-save" id="btn-save-table">حفظ الطاولة</button>
        </div>
      </div>
    </div>

    <!-- EXPENSES MODAL -->
    <div class="modal-overlay" id="expenses-modal" hidden>
      <div class="modal modal-expenses">
        <div class="modal-header">
          <h2>المصروفات</h2>
          <button class="modal-close" id="close-expenses">✕</button>
        </div>
        <div class="expenses-body">
          <div>
            <label class="form-label">القسم</label>
            <select id="expense-category" class="form-input"></select>
          </div>
          <div>
            <label class="form-label">المبلغ</label>
            <input type="number" id="expense-amount" class="form-input" placeholder="0.00" min="0" step="0.5">
          </div>
          <div>
            <label class="form-label">اسم المورد / ملاحظة</label>
            <input type="text" id="expense-note" class="form-input" placeholder="مثال: شركة النيل للخامات">
          </div>
          <button id="submit-expense" class="btn-submit">التالي — اختيار طريقة الدفع</button>
        </div>
      </div>
    </div>

    <!-- CREDIT MODAL -->
    <div class="modal-overlay" id="credit-modal" hidden>
      <div class="modal modal-credit">
        <div class="modal-header">
          <h2 data-i18n="credit">الآجل</h2>
          <button class="modal-close" id="close-credit">✕</button>
        </div>
        <div class="modal-body expenses-body">
          <div>
            <label class="form-label">العميل / Customer</label>
            <select id="credit-customer" class="form-input"></select>
          </div>
          <button id="submit-credit" class="btn-submit">تأكيد / Confirm</button>
        </div>
      </div>
    </div>

    <!-- OWNER PIN MODAL -->
    <div class="modal-overlay" id="pin-modal" hidden>
      <div class="modal modal-pin">
        <div class="modal-header">
          <h2>Owner Access / دخول المدير</h2>
          <button class="modal-close" id="close-pin">✕</button>
        </div>
        <div class="modal-body expenses-body" style="align-items:center;">
          <div id="pin-display" class="pin-display"><span class="pin-dot"></span><span class="pin-dot"></span><span class="pin-dot"></span><span class="pin-dot"></span></div>
          <p id="pin-error" class="pin-error" hidden>رمز غير صحيح / Incorrect PIN</p>
          <div id="pin-pad" class="pin-pad">
            <button class="pin-btn">1</button><button class="pin-btn">2</button><button class="pin-btn">3</button>
            <button class="pin-btn">4</button><button class="pin-btn">5</button><button class="pin-btn">6</button>
            <button class="pin-btn">7</button><button class="pin-btn">8</button><button class="pin-btn">9</button>
            <button class="pin-btn btn-clear">C</button><button class="pin-btn" style="grid-column: span 2;">0</button>
          </div>
        </div>
      </div>
    </div>

    <!-- CATEGORY FORM MODAL -->
    <div class="modal-overlay" id="category-form-modal" hidden>
      <div class="modal modal-cat">
        <div class="modal-header">
          <h2>إضافة قسم / Add Category</h2>
        </div>
        <div class="modal-body expenses-body">
          <input type="hidden" id="cat-form-id">
          <div><label class="form-label">اسم القسم بالعربي</label><input type="text" id="cat-form-ar" class="form-input"></div>
          <div><label class="form-label">Category Name (English)</label><input type="text" id="cat-form-en" class="form-input"></div>
          <div class="btn-row">
            <button id="btn-cancel-cat" class="btn-cancel">إلغاء</button>
            <button id="btn-save-cat" class="btn-save">حفظ</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ITEM FORM MODAL -->
    <div class="modal-overlay" id="item-form-modal" hidden>
      <div class="modal modal-item">
        <div class="modal-header"><h2 id="item-form-title">إضافة منتج / Add Item</h2></div>
        <div class="modal-body expenses-body">
          <input type="hidden" id="item-form-id">
          <div><label class="form-label">اسم المنتج بالعربي</label><input type="text" id="item-form-ar" class="form-input"></div>
          <div><label class="form-label">Product Name (English)</label><input type="text" id="item-form-en" class="form-input"></div>
          <div style="display:flex; gap:16px;">
            <div style="flex:1;"><label class="form-label">السعر / Price</label><input type="number" id="item-form-price" class="form-input" min="0" step="0.5"></div>
            <div style="flex:1;"><label class="form-label">القسم / Category</label><select id="item-form-category" class="form-input"></select></div>
          </div>
          <div class="btn-row">
            <button id="btn-cancel-item" class="btn-cancel">إلغاء</button>
            <button id="btn-save-item" class="btn-save">حفظ</button>
          </div>
        </div>
      </div>
    </div>

    <!-- CONFIRM DIALOG -->
    <div class="modal-overlay" id="confirm-modal" hidden>
      <div class="modal modal-confirm">
        <div class="modal-body expenses-body" style="text-align:center;">
          <h3 id="confirm-title">هل أنت متأكد؟</h3>
          <p id="confirm-msg" style="color:var(--text-secondary); font-size:14px; margin:8px 0 24px;">سيتم حذف هذا العنصر نهائياً.</p>
          <div class="btn-row">
            <button id="btn-cancel-confirm" class="btn-cancel">إلغاء</button>
            <button id="btn-do-confirm" class="btn-save" style="background:var(--danger);">حذف</button>
          </div>
        </div>
      </div>
    </div>

    <!-- OWNER DASHBOARD -->
    <div id="owner-dashboard" class="dash-root">
      <aside class="dash-sidebar">
        <div class="dash-brand">
          <div class="dash-brand-logo"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"/><path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"/><path d="M12 3v6"/></svg></div>
          <div><div class="dash-brand-name">MENUX</div><div class="dash-brand-sub">لوحة الإدارة</div></div>
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
              <input type="date" id="rep-date-picker" class="dash-date-input" title="اختر يوماً">
            </div>
          </div>
          <div class="kpi-grid">
            <div class="kpi-card kpi-hero"><div class="kpi-label">إجمالي الإيراد</div><div class="kpi-value" id="rep-revenue">0.00</div></div>
            <div class="kpi-card"><div class="kpi-label">إيراد نقدي</div><div class="kpi-value kpi-green" id="rep-cash">0.00</div></div>
            <div class="kpi-card"><div class="kpi-label">محفظة</div><div class="kpi-value kpi-blue" id="rep-wallet">0.00</div></div>
            <div class="kpi-card kpi-success"><div class="kpi-label">صافي الدخل</div><div class="kpi-value" id="rep-net">0.00</div></div>
          </div>
        </div>
        <div class="dash-tab-pane" id="tab-menu" style="display:none; height:100%;"></div>
        <div class="dash-tab-pane" id="tab-tables" style="display:none;"></div>
        <div class="dash-tab-pane" id="tab-expenses" style="display:none;"></div>
        <div class="dash-tab-pane" id="tab-customers" style="display:none;"></div>
        <div class="dash-tab-pane" id="tab-settings" style="display:none;"></div>
      </main>
    </div>
  `;
  if (!document.getElementById('dynamic-ui-container')) {
    document.body.appendChild(container);
  }
}

// ──────────────── TRANSLATIONS ────────────────
const I18N = {
  ar: { 'tables': 'الطاولات', 'print': 'طباعة', 'credit': 'الآجل', 'more': 'المزيد', 'no-table': 'لم يتم اختيار طاولة', 'no-items': 'لا توجد عناصر بعد', 'subtotal': 'المجموع الفرعي', 'discount': 'الخصم', 'total': 'الإجمالي', 'cash': 'نقدي', 'wallet': 'محفظة', 'credit-pay': 'آجل', 'select-table': 'اختر طاولة', 'table': 'طاولة', 'remove': 'حذف', 'currency': 'ر.س', 'order-completed': 'تم إتمام الطلب بنجاح ✓', 'select-table-first': 'يرجى اختيار طاولة أولاً', 'empty-order': 'الطلب فارغ' },
  en: { 'tables': 'Tables', 'print': 'Print', 'credit': 'Credit', 'more': 'More', 'no-table': 'No Table Selected', 'no-items': 'No items yet', 'subtotal': 'Subtotal', 'discount': 'Discount', 'total': 'Total', 'cash': 'Cash', 'wallet': 'Wallet', 'credit-pay': 'Credit', 'select-table': 'Select a Table', 'table': 'Table', 'remove': 'Remove', 'currency': 'SAR', 'order-completed': 'Order completed successfully ✓', 'select-table-first': 'Please select a table first', 'empty-order': 'Order is empty' }
};

// ──────────────── STATE ────────────────
const state = { lang: 'ar', currentTable: null, selectedCategory: null, orders: {}, categories: [], menuItems: [], tables: [], settings: {} };

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
  } catch (error) { console.error(`DB Error on ${storeName} (${method}):`, error.message); return method === 'getAll' ? [] : null; }
}

// ──────────────── HELPERS ────────────────
function t(key) { return I18N[state.lang][key] || key; }
function fmt(n) { return Number(n || 0).toFixed(2); }
function getCurrentOrder() { return state.currentTable ? state.orders[state.currentTable] : null; }
let toastTimer = null;
function showToast(msg, isError = false) { 
  const el = document.getElementById('toast'); 
  document.getElementById('toast-message').textContent = msg; 
  el.style.backgroundColor = isError ? 'var(--danger)' : 'var(--text-primary)'; 
  el.hidden = false; el.offsetHeight; el.classList.add('show'); 
  clearTimeout(toastTimer); 
  toastTimer = setTimeout(() => { el.classList.remove('show'); setTimeout(() => { el.hidden = true; }, 200); }, 2200); 
}
const isoDate = () => new Date().toISOString();

// ──────────────── DB DATA FETCHING ────────────────
async function loadInitialData() {
  state.categories = await dbOp('categories', 'getAll') || [];
  state.menuItems = await dbOp('menu_items', 'getAll') || [];
  state.tables = await dbOp('tables', 'getAll') || [];
  const allOrders = await dbOp('orders', 'getAll') || [];
  const allOrderItems = await dbOp('order_items', 'getAll') || [];
  state.orders = {};
  for (const o of allOrders) { if (o.status === 'open' || o.status === 'printed') { o.items = allOrderItems.filter(i => i.order_id === o.id); state.orders[o.table_id] = o; } }
}

// ──────────────── RENDERING ────────────────
function renderMenu() {
  const container = document.getElementById('menu-grid');
  let items = state.menuItems.filter(i => i.is_available);
  container.innerHTML = items.map(item => `<button class="menu-card" data-item-id="${item.id}"><div class="menu-card-body"><span class="menu-card-name-ar">${item.name_ar}</span></div><div class="menu-card-footer"><span class="menu-card-price">${fmt(item.price)} <small>${t('currency')}</small></span></div></button>`).join('');
}
function renderOrder() {
  const container = document.getElementById('order-items'); const titleEl = document.getElementById('table-title'); const order = getCurrentOrder();
  if (state.currentTable) { const tbl = state.tables.find(t => t.id == state.currentTable); titleEl.innerHTML = tbl ? tbl.name : `${t('table')} #${state.currentTable}`; } 
  else { titleEl.innerHTML = `<span class="table-title-placeholder">${t('no-table')}</span>`; }
  if (!order || !order.items || order.items.length === 0) { container.innerHTML = `<div class="empty-state"><p>${t('no-items')}</p></div>`; updateTotals(null); return; }
  container.innerHTML = order.items.map(oi => `<div class="order-item"><div class="order-item-info"><div class="order-item-name-ar">${oi.name_ar}</div></div><div class="order-item-controls"><div class="qty-control"><button class="qty-btn" data-action="dec" data-item="${oi.id}">−</button><span class="qty-value">${oi.quantity}</span><button class="qty-btn" data-action="inc" data-item="${oi.id}">+</button></div><button class="order-item-remove" data-action="remove" data-item="${oi.id}">${t('remove')}</button></div></div>`).join('');
  updateTotals(order);
}
function updateTotals(order) {
  let subtotal = 0; if (order && order.items) { subtotal = order.items.reduce((sum, oi) => sum + oi.line_total, 0); order.subtotal = subtotal; order.total = Math.max(0, subtotal - (order.discount || 0)); }
  document.getElementById('subtotal').innerHTML = `${fmt(order ? order.subtotal : 0)} <small>${t('currency')}</small>`;
  document.getElementById('total-value').innerHTML = `${fmt(order ? order.total : 0)} <small>${t('currency')}</small>`;
}
function renderTables() { document.getElementById('tables-grid').innerHTML = state.tables.map(tbl => `<button class="table-cell" data-table-id="${tbl.id}"><span class="table-cell-number">${tbl.id}</span></button>`).join(''); }

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
async function changeQty(id, delta) { const order = getCurrentOrder(); const item = order.items.find(i => i.id == id); item.quantity += delta; if (item.quantity <= 0) return removeItem(id); item.line_total = item.quantity * item.price; await dbOp('order_items', 'put', item); updateTotals(order); await dbOp('orders', 'put', { ...order, items: undefined }); renderOrder(); }
async function removeItem(id) { const order = getCurrentOrder(); await dbOp('order_items', 'delete', id); order.items = order.items.filter(i => i.id !== id); updateTotals(order); await dbOp('orders', 'put', { ...order, items: undefined }); renderOrder(); }
async function selectTable(id) { state.currentTable = Number(id); renderOrder(); document.getElementById('tables-modal').hidden = true; }
async function completeOrder(method, customerId = null) {
  const order = getCurrentOrder(); order.status = 'paid'; order.payment_method = method; order.paid_at = isoDate(); order.customer_id = customerId;
  await dbOp('orders', 'put', { ...order, items: undefined });
  delete state.orders[state.currentTable]; state.currentTable = null; renderOrder(); showToast(t('order-completed'));
}

// ──────────────── DASHBOARD LOGIC ────────────────
let enteredPin = '';
function updatePinDisplay() { document.querySelectorAll('.pin-dot').forEach((d, i) => d.classList.toggle('filled', i < enteredPin.length)); }
function handlePinInput(val) {
  const errEl = document.getElementById('pin-error');
  const pinDisplay = document.getElementById('pin-display');
  
  if (val === 'C') { enteredPin = ''; } 
  else if (enteredPin.length < 4) {
    enteredPin += val;
    if (enteredPin.length === 4) {
      if (enteredPin === (state.settings.owner_pin || '2525')) {
        document.getElementById('pin-modal').hidden = true;
        document.getElementById('app').style.display = 'none';
        openDashboard();
        enteredPin = '';
        errEl.hidden = true;
      } else {
        enteredPin = '';
        errEl.hidden = false;
        pinDisplay.classList.add('shake');
        setTimeout(() => pinDisplay.classList.remove('shake'), 400);
      }
    }
  }
  updatePinDisplay();
}
function openDashboard() { document.getElementById('owner-dashboard').style.display = 'flex'; loadDashboardTab('reports'); }
function closeDashboard() { document.getElementById('owner-dashboard').style.display = 'none'; document.getElementById('app').style.display = 'flex'; loadInitialData().then(() => { renderMenu(); renderTables(); renderOrder(); }); }
async function loadDashboardTab(tab) {
  document.querySelectorAll('.dash-tab-pane').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.dash-nav-item').forEach(el => el.classList.remove('active'));
  document.getElementById(`tab-${tab}`).style.display = 'block';
  document.querySelector(`.dash-nav-item[data-tab="${tab}"]`)?.classList.add('active');
  if (tab === 'reports') loadReports();
}
async function loadReports() {
  const orders = await dbOp('orders', 'getAll') || [];
  const expenses = await dbOp('expenses', 'getAll') || [];
  
  let totalRev = 0, cashRev = 0, walletRev = 0;
  orders.forEach(o => {
    if (o.status === 'paid') {
      totalRev += o.total;
      if (o.payment_method === 'cash') cashRev += o.total;
      if (o.payment_method === 'wallet') walletRev += o.total;
    }
  });
  
  const expTotal = expenses.reduce((s, e) => s + e.amount, 0);
  document.getElementById('rep-revenue').textContent = fmt(totalRev);
  document.getElementById('rep-cash').textContent = fmt(cashRev);
  document.getElementById('rep-wallet').textContent = fmt(walletRev);
  document.getElementById('rep-net').textContent = fmt(totalRev - expTotal);
}

// ──────────────── EVENTS ────────────────
function bindEvents() {
  document.getElementById('btn-tables').addEventListener('click', () => { renderTables(); document.getElementById('tables-modal').hidden = false; });
  document.getElementById('close-tables').addEventListener('click', () => document.getElementById('tables-modal').hidden = true);
  document.getElementById('btn-more').addEventListener('click', () => { document.getElementById('pin-modal').hidden = false; enteredPin = ''; updatePinDisplay(); document.getElementById('pin-error').hidden = true; });
  document.getElementById('close-pin').addEventListener('click', () => document.getElementById('pin-modal').hidden = true);
  document.getElementById('tables-grid').addEventListener('click', (e) => { const cell = e.target.closest('.table-cell'); if (cell) selectTable(cell.dataset.tableId); });
  document.getElementById('menu-grid').addEventListener('click', (e) => { const card = e.target.closest('.menu-card'); if (card) addToOrder(Number(card.dataset.itemId)); });
  document.getElementById('order-items').addEventListener('click', (e) => { const btn = e.target.closest('[data-action]'); if (!btn) return; const id = Number(btn.dataset.item); if (btn.dataset.action === 'inc') changeQty(id, 1); if (btn.dataset.action === 'dec') changeQty(id, -1); if (btn.dataset.action === 'remove') removeItem(id); });
  document.getElementById('discount-input').addEventListener('change', async (e) => { const order = getCurrentOrder(); if (!order) return; order.discount = Number(e.target.value) || 0; updateTotals(order); await dbOp('orders', 'put', { ...order, items: undefined }); });
  
  document.getElementById('btn-clear-order').addEventListener('click', async () => {
    const order = getCurrentOrder();
    if (!order || !order.items || order.items.length === 0) return;
    try {
      const itemIds = order.items.map(i => i.id);
      if (itemIds.length > 0) {
        const { error } = await supabaseClient.from('order_items').delete().in('id', itemIds);
        if (error) throw error;
      }
      await dbOp('orders', 'delete', order.id);
      delete state.orders[state.currentTable];
      state.currentTable = null;
      renderOrder();
      showToast('تم مسح الطلب');
    } catch (error) { console.error('Clear order error:', error); showToast('حدث خطأ أثناء المسح', true); }
  });
  
  document.getElementById('pin-pad').addEventListener('click', (e) => { if (e.target.tagName === 'BUTTON') handlePinInput(e.target.textContent === 'C' ? 'C' : e.target.textContent); });
  document.getElementById('dashboard-nav').addEventListener('click', (e) => { const item = e.target.closest('.dash-nav-item'); if (item && item.dataset.tab) loadDashboardTab(item.dataset.tab); });
  document.getElementById('btn-exit-dashboard').addEventListener('click', closeDashboard);

  document.getElementById('btn-checkout').addEventListener('click', () => {
    if (!state.currentTable) return showToast(t('select-table-first'), true);
    const order = getCurrentOrder();
    if (!order || !order.items || order.items.length === 0) return showToast(t('empty-order'), true);
    document.getElementById('payment-total-amount').innerHTML = `${fmt(order.total)} <small>${t('currency')}</small>`;
    document.getElementById('payment-modal').hidden = false;
  });
  
  document.querySelectorAll('.payment-option-card').forEach(btn => {
    btn.addEventListener('click', () => {
      const method = btn.dataset.method; document.getElementById('payment-modal').hidden = true;
      if (method === 'credit') { openCreditModal(); } else { completeOrder(method); }
    });
  });
  document.getElementById('close-payment-modal').addEventListener('click', () => document.getElementById('payment-modal').hidden = true);

  document.addEventListener('keydown', (e) => {
    const pinModal = document.getElementById('pin-modal');
    if (pinModal.hidden) return;
    if (e.key >= '0' && e.key <= '9') handlePinInput(e.key);
    else if (e.key === 'Backspace' || e.key === 'Delete') handlePinInput('C');
  });
}

async function openCreditModal() {
  const custs = await dbOp('customers', 'getAll') || [];
  document.getElementById('credit-customer').innerHTML = custs.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
  document.getElementById('credit-modal').hidden = false;
}

// ──────────────── INIT ────────────────
async function init() {
  try { injectDynamicUI(); await loadInitialData(); renderMenu(); renderTables(); renderOrder(); bindEvents(); } 
  catch (e) { console.error("Init Error", e); }
}
document.addEventListener('DOMContentLoaded', init);
