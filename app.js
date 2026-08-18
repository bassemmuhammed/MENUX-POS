/* ═══════════════════════════════════════════════════
   CAFÉ POS — Application Logic (Full Features)
   ═══════════════════════════════════════════════════ */

function injectDynamicUI() {
  const container = document.createElement('div');
  // نفس حقن الـ HTML الأصلي للداشبورد والمودالز (مختصر هنا لل مساحة لكن موجود في الكود الأصلي)
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
            <select id="expense-category" style="width:100%; height:44px; border:1.5px solid var(--border); border-radius:8px; padding:0 12px; font-size:14px; background:var(--surface); outline:none;"></select>
          </div>
          <div>
            <label style="display:block; margin-bottom:6px; font-size:13px; color:var(--text-secondary); font-weight:600;">المبلغ</label>
            <input type="number" id="expense-amount" placeholder="0.00" style="width:100%; height:44px; border:1.5px solid var(--border); border-radius:8px; padding:0 12px; font-size:14px; outline:none; box-sizing:border-box;">
          </div>
          <button id="submit-expense" style="width:100%; height:46px; background:var(--primary); color:white; border:none; border-radius:9px; font-weight:700; font-size:15px; cursor:pointer;">حفظ المصروف</button>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="credit-modal" hidden>
      <div class="modal" style="max-width: 400px; border-radius: 16px; overflow: hidden;">
        <div class="modal-header" style="display:flex; justify-content:space-between; padding:20px; border-bottom:1px solid var(--border);">
          <h2 style="font-size: 20px; font-weight: 700;">الآجل</h2>
          <button class="modal-close" id="close-credit" style="background:none; border:none; cursor:pointer;">✕</button>
        </div>
        <div class="modal-body" style="padding:20px;">
          <select id="credit-customer" style="width:100%; height:44px; border:1px solid var(--border); border-radius:8px; padding:0 12px; font-size:14px; margin-bottom:16px;"></select>
          <button id="submit-credit" style="width:100%; height:44px; background:var(--primary); color:white; border:none; border-radius:8px; font-weight:600; cursor:pointer;">تأكيد</button>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="pin-modal" hidden>
      <div class="modal" style="max-width: 320px; border-radius: 16px; overflow: hidden;">
        <div class="modal-header"><h2 style="font-size: 18px; font-weight: 700;">دخول المدير</h2><button class="modal-close" id="close-pin" style="background:none; border:none; cursor:pointer;">✕</button></div>
        <div class="modal-body" style="padding:24px; display:flex; flex-direction:column; align-items:center;">
          <div id="pin-display" style="display:flex; gap:12px; margin-bottom:24px;"><span class="pin-dot"></span><span class="pin-dot"></span><span class="pin-dot"></span><span class="pin-dot"></span></div>
          <div id="pin-pad" style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px; width:100%;">
            <button class="pin-btn">1</button><button class="pin-btn">2</button><button class="pin-btn">3</button>
            <button class="pin-btn">4</button><button class="pin-btn">5</button><button class="pin-btn">6</button>
            <button class="pin-btn">7</button><button class="pin-btn">8</button><button class="pin-btn">9</button>
            <button class="pin-btn btn-clear" style="color:var(--danger);">C</button><button class="pin-btn" style="grid-column: span 2;">0</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-overlay" id="cm-drawer-balance" hidden>
      <div class="modal" style="max-width: 360px; border-radius: 16px; padding: 28px 24px;">
        <h2 style="font-size: 17px; font-weight: 700; margin-bottom: 8px;">رصيد الدرج</h2>
        <input type="number" id="cm-drawer-amount" placeholder="0.00" style="width: 100%; height: 44px; border: 1.5px solid var(--border); border-radius: 9px; padding: 0 12px; font-size: 15px; margin-bottom: 18px; outline: none;">
        <div style="display:flex; gap:10px;">
          <button class="modal-cancel-btn" id="cm-drawer-cancel" style="flex:1; height:44px; background:#F1F5F9; border:none; border-radius:9px; cursor:pointer;">إلغاء</button>
          <button id="cm-drawer-ok" style="flex:1; height:44px; background:var(--primary); color:white; border:none; border-radius:9px; cursor:pointer;">حفظ</button>
        </div>
      </div>
    </div>

    <div id="owner-dashboard" class="dash-root">
      <aside class="dash-sidebar">
        <div style="padding:20px; color:white; font-size:18px; font-weight:800;">MENUX</div>
        <nav id="dashboard-nav" class="dash-nav">
          <button class="dash-nav-item active" data-tab="reports"><span>التقارير</span></button>
          <button class="dash-nav-item" data-tab="menu"><span>المنيو</span></button>
          <button class="dash-nav-item" data-tab="tables"><span>الطاولات</span></button>
          <button class="dash-nav-item" data-tab="expenses"><span>المصروفات</span></button>
          <button class="dash-nav-item" data-tab="settings"><span>الإعدادات</span></button>
        </nav>
        <button id="btn-exit-dashboard" style="padding:16px; color:white; background:none; border:none; cursor:pointer; text-align:start;">خروج</button>
      </aside>
      <main class="dash-main">
        <div class="dash-tab-pane active" id="tab-reports">
          <h1 style="font-size:22px; font-weight:800; margin-bottom:20px;">التقارير</h1>
          <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:15px;">
            <div class="kpi-card"><div style="font-size:12px; color:var(--text-secondary);">إجمالي الإيراد</div><div style="font-size:24px; font-weight:800; color:var(--primary);" id="rep-revenue">0.00</div></div>
            <div class="kpi-card"><div style="font-size:12px; color:var(--text-secondary);">إيراد نقدي</div><div style="font-size:24px; font-weight:800; color:var(--success);" id="rep-cash">0.00</div></div>
            <div class="kpi-card"><div style="font-size:12px; color:var(--text-secondary);">صافي الدخل</div><div style="font-size:24px; font-weight:800;" id="rep-net">0.00</div></div>
          </div>
        </div>
        <div class="dash-tab-pane" id="tab-menu" style="display:none;"><h1>المنيو</h1><div id="mgmt-categories-list"></div></div>
        <div class="dash-tab-pane" id="tab-tables" style="display:none;"><h1>الطاولات</h1><div id="mgmt-tables-grid"></div></div>
        <div class="dash-tab-pane" id="tab-expenses" style="display:none;"><h1>المصروفات</h1><div id="mgmt-exp-cats-list"></div></div>
        <div class="dash-tab-pane" id="tab-settings" style="display:none;"><h1>الإعدادات</h1><p>لا توجد إعدادات مخصصة حالياً.</p></div>
      </main>
    </div>
  `;
  document.body.appendChild(container);
}

// ──────────────── STATE & HELPERS ────────────────
const state = { lang: 'ar', currentTable: null, selectedCategory: null, orders: {}, categories: [], menuItems: [], tables: [], settings: {} };

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
  } catch (error) { console.error(`DB Error:`, error.message); return method === 'getAll' ? [] : null; }
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
  const s = await dbOp('settings', 'getAll') || []; s.forEach(setting => state.settings[setting.key] = setting.value);
  state.categories = await dbOp('categories', 'getAll') || [];
  state.menuItems = await dbOp('menu_items', 'getAll') || [];
  state.tables = await dbOp('tables', 'getAll') || [];
  const allOrders = await dbOp('orders', 'getAll') || [];
  const allOrderItems = await dbOp('order_items', 'getAll') || [];
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
function renderTables() { document.getElementById('tables-grid').innerHTML = state.tables.map(tbl => `<button class="table-cell" data-table-id="${tbl.id}" data-status="${tbl.status}"><span style="font-size:20px; font-family:'Sora';">${tbl.id}</span></button>`).join(''); }

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
function handlePinInput(val) {
  if (val === 'C') { enteredPin = ''; } else if (enteredPin.length < 4) { enteredPin += val; if (enteredPin.length === 4) { if (enteredPin === '2525') { document.getElementById('pin-modal').hidden = true; document.getElementById('app').style.display = 'none'; document.getElementById('owner-dashboard').style.display = 'flex'; loadDashboardTab('reports'); enteredPin = ''; } else { enteredPin = ''; } } }
  document.querySelectorAll('#pin-display span').forEach((d, i) => d.style.backgroundColor = i < enteredPin.length ? 'var(--primary)' : 'transparent');
}
function closeDashboard() { document.getElementById('owner-dashboard').style.display = 'none'; document.getElementById('app').style.display = 'flex'; loadInitialData().then(() => { renderCategories(); renderMenu(); renderTables(); renderOrder(); }); }
async function loadDashboardTab(tab) {
  document.querySelectorAll('.dash-tab-pane').forEach(el => el.style.display = 'none');
  document.querySelectorAll('.dash-nav-item').forEach(el => el.classList.remove('active'));
  document.getElementById(`tab-${tab}`).style.display = 'block';
  document.querySelector(`.dash-nav-item[data-tab="${tab}"]`)?.classList.add('active');
  if (tab === 'reports') {
    const orders = await dbOp('orders', 'getAll') || []; const expenses = await dbOp('expenses', 'getAll') || [];
    let cashRev = 0; orders.forEach(o => { if (o.status === 'paid' && o.payment_method === 'cash') cashRev += o.total; });
    const expTotal = expenses.reduce((s, e) => s + e.amount, 0);
    document.getElementById('rep-cash').textContent = fmt(cashRev);
    document.getElementById('rep-revenue').textContent = fmt(cashRev);
    document.getElementById('rep-net').textContent = fmt(cashRev - expTotal);
  }
  if (tab === 'menu') { document.getElementById('mgmt-categories-list').innerHTML = (await dbOp('categories', 'getAll') || []).map(c => `<div class="mgmt-row" style="background:white; padding:15px; border-radius:10px; margin-bottom:8px;">${c.name_ar}</div>`).join(''); }
  if (tab === 'tables') { document.getElementById('mgmt-tables-grid').innerHTML = (await dbOp('tables', 'getAll') || []).map(t => `<div class="mgmt-row" style="background:white; padding:15px; border-radius:10px; margin-bottom:8px;">${t.name}</div>`).join(''); }
  if (tab === 'expenses') { document.getElementById('mgmt-exp-cats-list').innerHTML = (await dbOp('expense_categories', 'getAll') || []).map(c => `<div class="mgmt-row" style="background:white; padding:15px; border-radius:10px; margin-bottom:8px;">${c.name}</div>`).join(''); }
}

// ──────────────── EVENTS ────────────────
function bindEvents() {
  document.getElementById('btn-tables').addEventListener('click', () => { renderTables(); document.getElementById('tables-modal').hidden = false; });
  document.getElementById('close-tables').addEventListener('click', () => document.getElementById('tables-modal').hidden = true);
  document.getElementById('tables-grid').addEventListener('click', (e) => { const cell = e.target.closest('.table-cell'); if (cell) selectTable(cell.dataset.tableId); });
  document.getElementById('btn-more').addEventListener('click', () => { document.getElementById('pin-modal').hidden = false; enteredPin = ''; handlePinInput(''); });
  document.getElementById('close-pin').addEventListener('click', () => document.getElementById('pin-modal').hidden = true);
  document.getElementById('pin-pad').addEventListener('click', (e) => { if (e.target.tagName === 'BUTTON') handlePinInput(e.target.textContent === 'C' ? 'C' : e.target.textContent); });
  document.getElementById('btn-exit-dashboard').addEventListener('click', closeDashboard);
  document.querySelectorAll('.dash-nav-item').forEach(item => item.addEventListener('click', () => loadDashboardTab(item.dataset.tab)));

  document.getElementById('btn-print').addEventListener('click', printBill);
  document.getElementById('category-tabs').addEventListener('click', (e) => { const tab = e.target.closest('.cat-tab'); if (!tab) return; state.selectedCategory = tab.dataset.cat ? Number(tab.dataset.cat) : null; renderCategories(); renderMenu(); });
  document.getElementById('menu-grid').addEventListener('click', (e) => { const card = e.target.closest('.menu-card'); if (card) addToOrder(Number(card.dataset.itemId)); });
  document.getElementById('order-items').addEventListener('click', (e) => { const btn = e.target.closest('[data-action]'); if (!btn) return; const id = Number(btn.dataset.item); if (btn.dataset.action === 'inc') changeQty(id, 1); if (btn.dataset.action === 'dec') changeQty(id, -1); if (btn.dataset.action === 'remove') removeItem(id); });
  document.getElementById('discount-input').addEventListener('change', async (e) => { const order = getCurrentOrder(); if (!order) return; order.discount = Number(e.target.value) || 0; updateTotals(order); await dbOp('orders', 'put', { ...order, items: undefined }); });
  
  document.getElementById('btn-clear-order').addEventListener('click', async () => { const order = getCurrentOrder(); if (!order || !order.items || order.items.length === 0) return; for (const oi of order.items) { await dbOp('order_items', 'delete', oi.id); } await dbOp('orders', 'delete', order.id); delete state.orders[state.currentTable]; state.currentTable = null; renderOrder(); });

  document.getElementById('btn-expenses').addEventListener('click', async () => {
    const cats = await dbOp('expense_categories', 'getAll') || [];
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

  // === نظام الدفع الجديد ===
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
  const custs = await dbOp('customers', 'getAll') || [];
  document.getElementById('credit-customer').innerHTML = custs.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
  document.getElementById('credit-modal').hidden = false;
}

// ──────────────── INIT ────────────────
async function init() {
  try { injectDynamicUI(); await loadInitialData(); renderCategories(); renderMenu(); renderTables(); renderOrder(); bindEvents(); } 
  catch (e) { console.error("Init Error", e); }
}
document.addEventListener('DOMContentLoaded', init);
