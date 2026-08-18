/* ═══════════════════════════════════════════════════
   CAFÉ POS — Application Logic (Original Full Code)
   ═══════════════════════════════════════════════════ */

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
    <div class="modal-overlay" id="expenses-modal" hidden style="align-items:center;">
      <div class="modal" style="max-width:420px;width:95%;padding:0;border-radius:16px;overflow:hidden;">
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
            <input type="number" id="expense-amount" placeholder="0.00" min="0" step="0.5" style="width:100%; height:44px; border:1.5px solid var(--border); border-radius:8px; padding:0 12px; font-size:14px; font-family:'Cairo',sans-serif; outline:none; box-sizing:border-box;">
          </div>
          <div>
            <label style="display:block; margin-bottom:6px; font-size:13px; color:var(--text-secondary); font-weight:600;">اسم المورد / ملاحظة</label>
            <input type="text" id="expense-note" placeholder="مثال: شركة النيل للخامات" style="width:100%; height:44px; border:1.5px solid var(--border); border-radius:8px; padding:0 12px; font-size:14px; font-family:'Cairo',sans-serif; outline:none; box-sizing:border-box;">
          </div>
          <button id="submit-expense" style="width:100%; height:46px; background:var(--primary); color:white; border:none; border-radius:9px; font-weight:700; font-size:15px; cursor:pointer; font-family:'Cairo',sans-serif; margin-top:4px;">التالي — اختيار طريقة الدفع</button>
        </div>
      </div>
    </div>

    <!-- ═══ CREDIT MODAL ═══ -->
    <div class="modal-overlay" id="credit-modal" hidden>
      <div class="modal" style="max-width: 400px; border-radius: 16px; overflow: hidden;">
        <div class="modal-header" style="display:flex; justify-content:space-between; padding:20px; border-bottom:1px solid var(--border);">
          <h2 data-i18n="credit" style="font-size: 20px; font-weight: 700;">الآجل</h2>
          <button class="modal-close" id="close-credit" style="background:none; border:none; cursor:pointer;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
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
          <button class="modal-close" id="close-pin" style="background:none; border:none; cursor:pointer;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
        </div>
        <div class="modal-body" style="padding:24px; display:flex; flex-direction:column; align-items:center;">
          <div id="pin-display" style="display:flex; gap:12px; margin-bottom:24px; transition: transform 0.2s;"><span class="pin-dot"></span><span class="pin-dot"></span><span class="pin-dot"></span><span class="pin-dot"></span></div>
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
          <div style="margin-bottom:16px;"><label style="display:block; margin-bottom:6px; font-size:13px; color:var(--text-secondary);">اسم القسم بالعربي</label><input type="text" id="cat-form-ar" style="width:100%; height:44px; border:1px solid var(--border); border-radius:8px; padding:0 12px; font-size:14px;"></div>
          <div style="margin-bottom:24px;"><label style="display:block; margin-bottom:6px; font-size:13px; color:var(--text-secondary);">Category Name (English)</label><input type="text" id="cat-form-en" style="width:100%; height:44px; border:1px solid var(--border); border-radius:8px; padding:0 12px; font-size:14px;"></div>
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
        <div class="modal-header" style="padding:0 24px 16px; border-bottom:1px solid var(--border);"><h2 id="item-form-title" style="font-size: 20px; font-weight: 700;">إضافة منتج / Add Item</h2></div>
        <div class="modal-body" style="padding:20px 24px 24px; overflow:hidden;">
          <input type="hidden" id="item-form-id">
          <div style="margin-bottom:16px;"><label style="display:block; margin-bottom:6px; font-size:13px; color:var(--text-secondary);">اسم المنتج بالعربي</label><input type="text" id="item-form-ar" style="width:100%; height:44px; border:1px solid var(--border); border-radius:8px; padding:0 12px; font-size:14px;"></div>
          <div style="margin-bottom:16px;"><label style="display:block; margin-bottom:6px; font-size:13px; color:var(--text-secondary);">Product Name (English)</label><input type="text" id="item-form-en" style="width:100%; height:44px; border:1px solid var(--border); border-radius:8px; padding:0 12px; font-size:14px;"></div>
          <div style="display:flex; gap:16px; margin-bottom:16px;">
            <div style="flex:1;"><label style="display:block; margin-bottom:6px; font-size:13px; color:var(--text-secondary);">السعر / Price</label><input type="number" id="item-form-price" style="width:100%; height:44px; border:1px solid var(--border); border-radius:8px; padding:0 12px; font-size:14px;" min="0" step="0.5"></div>
            <div style="flex:1;"><label style="display:block; margin-bottom:6px; font-size:13px; color:var(--text-secondary);">القسم / Category</label><select id="item-form-category" style="width:100%; height:44px; border:1px solid var(--border); border-radius:8px; padding:0 12px; font-size:14px;"></select></div>
          </div>
          <div style="margin-bottom:24px; display:flex; align-items:center; justify-content:space-between; background:var(--surface); border:1px solid var(--border); padding:12px 16px; border-radius:8px;">
            <span style="font-weight:600;">متاح / Available</span>
            <div class="toggle-switch on" id="item-form-toggle" style="position:relative; width:44px; height:24px; background:var(--primary); border-radius:12px; cursor:pointer; transition:all 0.2s;"><div class="toggle-thumb" style="position:absolute; top:2px; left:22px; width:20px; height:20px; background:white; border-radius:50%; transition:all 0.2s;"></div></div>
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
          <div style="width:52px;height:52px;background:#FEF2F2;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC2626" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg></div>
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
          <button class="dash-nav-item" data-tab="settings"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.
