// ──────────────── SUPABASE INIT ────────────────
const SUPABASE_URL = 'https://wbyovaggjnnafbcrlimr.supabase.co'; 
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndieW92YWdnam5uYWZiY3JsaW1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY5Njk1NDIsImV4cCI6MjEwMjU0NTU0Mn0.7aOgvhdB4YMoQJAZ90ow8tMEJZN4-jqh8p6-T2MfBCg'; 

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

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
  } catch (error) {
    console.error(`DB Error on ${storeName} (${method}):`, error.message);
    return null;
  }
}

// ──────────────── STATE & HELPERS ────────────────
const state = {
  lang: 'ar', currentTable: null, selectedCategory: null, searchQuery: '',
  orders: {}, categories: [], menuItems: [], tables: [], settings: {}
};

function t(key) { 
  const dict = { 'no-table': 'لم يتم اختيار طاولة', 'no-items': 'لا توجد عناصر بعد', 'currency': 'ر.س', 'order-completed': 'تم إتمام الطلب', 'select-table-first': 'يرجى اختيار طاولة أولاً', 'empty-order': 'الطلب فارغ', 'table-selected': 'تم اختيار الطاولة' };
  return dict[key] || key; 
}
function fmt(n) { return Number(n || 0).toFixed(2); }
function getCurrentOrder() { return state.currentTable ? state.orders[state.currentTable] : null; }
function showToast(msg, isError = false) {
  const el = document.getElementById('toast');
  if(!el) return;
  document.getElementById('toast-message').textContent = msg;
  el.style.backgroundColor = isError ? 'var(--danger)' : 'var(--text-primary)';
  el.hidden = false;
  el.offsetHeight;
  el.classList.add('show');
  setTimeout(() => { el.classList.remove('show'); setTimeout(() => { el.hidden = true; }, 200); }, 2200);
}
const isoDate = () => new Date().toISOString();

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
  let html = `<button class="cat-tab ${!state.selectedCategory ? 'active' : ''}" data-cat="">
    <span class="cat-tab-icon">${categoryIcons['default']}</span>
    <span>الكل</span>
  </button>`;
  state.categories.sort((a, b) => a.sort_order - b.sort_order).forEach(c => {
    html += `<button class="cat-tab ${state.selectedCategory == c.id ? 'active' : ''}" data-cat="${c.id}">
      <span class="cat-tab-icon">${getCategoryIcon(c.name_ar)}</span>
      <span>${c.name_ar}</span>
    </button>`;
  });
  container.innerHTML = html;
}

function renderMenu() {
  const container = document.getElementById('menu-grid');
  let items = state.menuItems.filter(i => i.is_available);
  if (state.selectedCategory) items = items.filter(i => i.category_id == state.selectedCategory);
  container.innerHTML = items.map(item => `
    <button class="menu-card" data-item-id="${item.id}">
      <div class="menu-card-body">
        <span class="menu-card-name-ar">${item.name_ar}</span>
        <span class="menu-card-name-en">${item.name_en}</span>
      </div>
      <div class="menu-card-footer">
        <span class="menu-card-price">${fmt(item.price)} <small>ر.س</small></span>
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
    titleEl.innerHTML = tbl ? tbl.name : `طاولة #${state.currentTable}`;
  } else {
    titleEl.innerHTML = `<span class="table-title-placeholder">لم يتم اختيار طاولة</span>`;
  }

  if (!order || !order.items || order.items.length === 0) {
    container.innerHTML = `<div class="empty-state"><p>لا توجد عناصر بعد</p></div>`;
    updateTotals(null);
    return;
  }

  container.innerHTML = order.items.map(oi => `
    <div class="order-item">
      <div class="order-item-info">
        <div class="order-item-name-ar">${oi.name_ar}</div>
      </div>
      <div class="order-item-controls">
        <div class="qty-control">
          <button class="qty-btn" data-action="dec" data-item="${oi.id}">−</button>
          <span class="qty-value">${oi.quantity}</span>
          <button class="qty-btn" data-action="inc" data-item="${oi.id}">+</button>
        </div>
        <span class="order-item-total">${fmt(oi.line_total)} ر.س</span>
        <button class="order-item-remove" data-action="remove" data-item="${oi.id}">حذف</button>
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
  document.getElementById('subtotal').innerHTML = `${fmt(order ? order.subtotal : 0)} <small>ر.س</small>`;
  document.getElementById('total-value').innerHTML = `${fmt(order ? order.total : 0)} <small>ر.س</small>`;
  const discInput = document.getElementById('discount-input');
  if (document.activeElement !== discInput) {
    const disc = order ? order.discount : 0;
    discInput.value = disc > 0 ? disc : '';
  }
}

function renderTables() {
  const container = document.getElementById('tables-grid');
  container.innerHTML = state.tables.map(tbl => `
    <button class="table-cell" data-table-id="${tbl.id}" data-status="${tbl.status}">
      <span class="table-cell-number">${tbl.id}</span>
    </button>`).join('');
}

// ──────────────── CASHIER ACTIONS ────────────────
async function addToOrder(itemId) {
  if (!state.currentTable) return showToast(t('select-table-first'), true);
  let order = getCurrentOrder();
  if (!order) {
    const orderId = await dbOp('orders', 'add', { table_id: state.currentTable, status: 'open', discount: 0, subtotal: 0, total: 0, created_at: isoDate() });
    order = await dbOp('orders', 'get', orderId);
    order.items = [];
    state.orders[state.currentTable] = order;
  }
  const menuItem = state.menuItems.find(i => i.id == itemId);
  let existing = order.items.find(i => i.item_id == itemId);
  if (existing) {
    existing.quantity++;
    existing.line_total = existing.quantity * menuItem.price;
    await dbOp('order_items', 'put', existing);
  } else {
    const oi = { order_id: order.id, item_id: itemId, name_ar: menuItem.name_ar, price: menuItem.price, quantity: 1, line_total: menuItem.price };
    const oiId = await dbOp('order_items', 'add', oi);
    oi.id = oiId;
    order.items.push(oi);
  }
  updateTotals(order);
  await dbOp('orders', 'put', { ...order, items: undefined });
  renderOrder();
}

async function changeQty(orderItemId, delta) {
  const order = getCurrentOrder();
  const item = order.items.find(i => i.id == orderItemId);
  item.quantity += delta;
  if (item.quantity <= 0) return removeItem(orderItemId);
  item.line_total = item.quantity * item.price;
  await dbOp('order_items', 'put', item);
  updateTotals(order);
  await dbOp('orders', 'put', { ...order, items: undefined });
  renderOrder();
}

async function removeItem(orderItemId) {
  const order = getCurrentOrder();
  await dbOp('order_items', 'delete', orderItemId);
  order.items = order.items.filter(i => i.id !== orderItemId);
  updateTotals(order);
  await dbOp('orders', 'put', { ...order, items: undefined });
  renderOrder();
}

async function selectTable(id) {
  state.currentTable = Number(id);
  renderOrder();
  document.getElementById('tables-modal').hidden = true;
  showToast(t('table-selected'));
}

async function completeOrder(method) {
  const order = getCurrentOrder();
  order.status = 'paid';
  order.payment_method = method;
  order.paid_at = isoDate();
  await dbOp('orders', 'put', { ...order, items: undefined });
  const tbl = state.tables.find(t => t.id == state.currentTable);
  if (tbl) { tbl.status = 'empty'; await dbOp('tables', 'put', tbl); }
  delete state.orders[state.currentTable];
  state.currentTable = null;
  renderOrder();
  showToast(t('order-completed'));
}

// ──────────────── EVENTS ────────────────
function bindEvents() {
  document.getElementById('btn-tables').addEventListener('click', () => { renderTables(); document.getElementById('tables-modal').hidden = false; });
  document.getElementById('close-tables').addEventListener('click', () => document.getElementById('tables-modal').hidden = true);
  document.getElementById('tables-grid').addEventListener('click', (e) => {
    const cell = e.target.closest('.table-cell');
    if (cell) selectTable(cell.dataset.tableId);
  });
  document.getElementById('category-tabs').addEventListener('click', (e) => {
    const tab = e.target.closest('.cat-tab');
    if (!tab) return;
    state.selectedCategory = tab.dataset.cat ? Number(tab.dataset.cat) : null;
    renderCategories();
    renderMenu();
  });
  document.getElementById('menu-grid').addEventListener('click', (e) => {
    const card = e.target.closest('.menu-card');
    if (card) addToOrder(Number(card.dataset.itemId));
  });
  document.getElementById('order-items').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const id = Number(btn.dataset.item);
    if (btn.dataset.action === 'inc') changeQty(id, 1);
    if (btn.dataset.action === 'dec') changeQty(id, -1);
    if (btn.dataset.action === 'remove') removeItem(id);
  });
  document.getElementById('discount-input').addEventListener('change', async (e) => {
    const order = getCurrentOrder();
    if (!order) return;
    order.discount = Number(e.target.value) || 0;
    updateTotals(order);
    await dbOp('orders', 'put', { ...order, items: undefined });
  });
  
  // زرار المسح
  document.getElementById('btn-clear-order').addEventListener('click', async () => {
    const order = getCurrentOrder();
    if (!order || !order.items || order.items.length === 0) return showToast('السلة فارغة', true);
    try {
      for (const oi of order.items) { await dbOp('order_items', 'delete', oi.id); }
      await dbOp('orders', 'delete', order.id);
      delete state.orders[state.currentTable];
      state.currentTable = null;
      renderOrder();
      showToast('تم مسح السلة');
    } catch(e) { console.error(e); }
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
      const method = btn.dataset.method;
      document.getElementById('payment-modal').hidden = true;
      completeOrder(method);
    });
  });

  document.getElementById('close-payment-modal').addEventListener('click', () => {
    document.getElementById('payment-modal').hidden = true;
  });
}

// ──────────────── INIT ────────────────
async function init() {
  try {
    await loadInitialData();
    renderCategories();
    renderMenu();
    renderTables();
    renderOrder();
    bindEvents();
  } catch (e) {
    console.error("Init Error", e);
  }
}
document.addEventListener('DOMContentLoaded', init);
