// ============================================
//  GOOGLE MERCH STORE — APP LOGIC + GA EVENTS
// ============================================

const GA_ID = 'G-JQNYGB0H1J';

// ============================================
//  PRODUCT CATALOGUE
// ============================================
const PRODUCTS = [
  {
    id: 'google-water-bottle',
    name: 'Google Water Bottle',
    category: 'Accessories',
    price: 34.99,
    localImage: 'assets/google-water-bottle.png',
  },
  {
    id: 'google-cloud-mug',
    name: 'Google Cloud Mug',
    category: 'Accessories',
    price: 24.99,
    localImage: 'assets/google-cloud-mug.png',
  },
  {
    id: 'google-timbuk2-backpack',
    name: 'Google Backpack',
    category: 'Bags',
    price: 89.99,
    localImage: 'assets/google-timbuk2-backpack.png',
  },
  {
    id: 'google-cloud-notebook',
    name: 'Google Cloud Notebook',
    category: 'Stationery',
    price: 19.99,
    localImage: 'assets/google-cloud-notebook.png',
  },
  {
    id: 'android-figure',
    name: 'Android Collectible Figure',
    category: 'Collectibles',
    price: 44.99,
    localImage: 'assets/android-figure.png',
  },
  {
    id: 'google-longsleeve',
    name: 'Google Long Sleeve Tee',
    category: 'Apparel',
    price: 39.99,
    localImage: 'assets/google-longsleeve.png',
  },
  {
    id: 'google-tshirt',
    name: 'Google Classic T-Shirt',
    category: 'Apparel',
    price: 29.99,
    localImage: 'assets/google-tshirt.png',
  },
  {
    id: 'google-meadow-planter',
    name: 'Google Meadow Planter',
    category: 'Home & Garden',
    price: 29.99,
    localImage: 'assets/google-meadow-planter.png',
  },
  {
    id: 'chrome-dino-collectible',
    name: 'Chrome Dino Dark Mode Collectible',
    category: 'Collectibles',
    price: 49.99,
    localImage: 'assets/chrome-dino-collectible.png',
  },
  {
    id: 'google-wood-cube-puzzle',
    name: 'Google Wood Cube Puzzle',
    category: 'Toys & Games',
    price: 34.99,
    localImage: 'assets/google-wood-cube-puzzle.png',
  },
  {
    id: 'google-maps-wheat-pen',
    name: 'Google Maps Wheat Pen',
    category: 'Stationery',
    price: 12.99,
    localImage: 'assets/google-maps-wheat-pen.png',
  },
  {
    id: 'google-play-sticker',
    name: 'Google Play Sticker Pack',
    category: 'Stationery',
    price: 8.99,
    localImage: 'assets/google-play-sticker.png',
  },
  {
    id: 'google-cloud-cap',
    name: 'Google Cloud Cap',
    category: 'Apparel',
    price: 34.99,
    localImage: 'assets/google-cloud-cap.png',
  },
  {
    id: 'google-bike-magnet',
    name: 'Google Bike Eco Wood Magnet',
    category: 'Accessories',
    price: 9.99,
    localImage: 'assets/google-bike-magnet.png',
  },
  {
    id: 'google-ombre-green-pen',
    name: 'Google Ombre Green Pen',
    category: 'Stationery',
    price: 11.99,
    localImage: 'assets/google-ombre-green-pen.png',
  },
];

// ============================================
//  PRODUCT COLORS (fallback if no image)
// ============================================
const PRODUCT_COLORS = {
  'google-water-bottle':      '#1a1a1a',
  'google-cloud-mug':         '#f5e6d3',
  'google-timbuk2-backpack':  '#1e3a5f',
  'google-cloud-notebook':    '#9ca3af',
  'android-figure':           '#34A853',
  'google-longsleeve':        '#1e3a8a',
  'google-tshirt':            '#111111',
  'google-meadow-planter':    '#4a7c59',
  'chrome-dino-collectible':  '#1a1a2e',
  'google-wood-cube-puzzle':  '#a0522d',
  'google-maps-wheat-pen':    '#c8a951',
  'google-play-sticker':      '#4285F4',
  'google-cloud-cap':         '#34A853',
  'google-bike-magnet':       '#6b7280',
  'google-ombre-green-pen':   '#2d6a4f',
};

// ============================================
//  CART STATE
// ============================================
let cart = JSON.parse(localStorage.getItem('gms_cart') || '[]');

function saveCart() {
  localStorage.setItem('gms_cart', JSON.stringify(cart));
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

// ============================================
//  GOOGLE ANALYTICS HELPERS
// ============================================
function gaItem(product, index = 0) {
  return {
    item_id:       product.id,
    item_name:     product.name,
    item_category: product.category,
    price:         product.price,
    index:         index,
    quantity:      product.qty || 1,
  };
}

function fireViewItemList() {
  if (typeof gtag === 'undefined') return;
  gtag('event', 'view_item_list', {
    item_list_id:   'merch_homepage',
    item_list_name: 'Google Merch Homepage',
    items: PRODUCTS.map((p, i) => gaItem(p, i)),
  });
  console.log('[GA] view_item_list fired');
}

function fireAddToCart(product) {
  if (typeof gtag === 'undefined') return;
  gtag('event', 'add_to_cart', {
    currency: 'USD',
    value:    product.price * product.qty,
    items:    [gaItem(product)],
  });
  console.log('[GA] add_to_cart fired:', product.name, 'qty:', product.qty);
}

function fireRemoveFromCart(product) {
  if (typeof gtag === 'undefined') return;
  gtag('event', 'remove_from_cart', {
    currency: 'USD',
    value:    product.price,
    items:    [gaItem(product)],
  });
  console.log('[GA] remove_from_cart fired:', product.name);
}

function fireBeginCheckout() {
  if (typeof gtag === 'undefined') return;
  const items = cart.map((item, i) => ({
    item_id:       item.id,
    item_name:     item.name,
    item_category: item.category,
    price:         item.price,
    quantity:      item.qty,
    index:         i,
  }));
  gtag('event', 'begin_checkout', {
    currency: 'USD',
    value:    getCartTotal(),
    items:    items,
  });
  console.log('[GA] begin_checkout fired, value:', getCartTotal().toFixed(2));
}

function firePurchase(orderId) {
  if (typeof gtag === 'undefined') return;
  const subtotal = getCartTotal();
  const rawTotal = subtotal * 1.18;
  const total    = Math.ceil(rawTotal);
  const tax      = total - subtotal;

  const items = cart.map((item, i) => ({
    item_id:       item.id,
    item_name:     item.name,
    item_category: item.category,
    price:         item.price,
    quantity:      item.qty,
    index:         i,
  }));

  gtag('event', 'purchase', {
    transaction_id: orderId,
    currency:       'USD',
    value:          parseFloat(total.toFixed(2)),
    tax:            parseFloat(tax.toFixed(2)),
    shipping:       0,
    items:          items,
  });
  console.log('[GA] purchase fired, order:', orderId, 'total:', total.toFixed(2));
}

// ============================================
//  PRODUCT CARD RENDERING
// ============================================
function getProductEmoji(category) {
  const map = {
    'Accessories':  '🎯',
    'Bags':         '🎒',
    'Stationery':   '✏️',
    'Collectibles': '🤖',
    'Apparel':      '👕',
    'Home & Garden':'🌿',
    'Toys & Games': '🧩',
  };
  return map[category] || '🛍️';
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  // Update item count
  const countEl = document.querySelector('.section-header p');
  if (countEl) countEl.textContent = `${PRODUCTS.length} items`;

  grid.innerHTML = PRODUCTS.map((p, i) => `
    <div class="product-card" style="animation: fadeUp 0.4s ease both; animation-delay: ${i * 0.05}s">
      <div class="card-accent" style="background:${PRODUCT_COLORS[p.id]}"></div>
      <div class="card-img-wrap" style="background:${PRODUCT_COLORS[p.id]}11">
        <img
          src="${p.localImage}"
          alt="${p.name}"
          onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
          style="max-height:160px; max-width:100%; object-fit:contain;"
        />
        <div style="
          display:none;
          width:120px; height:120px;
          background:${PRODUCT_COLORS[p.id]};
          border-radius:12px;
          align-items:center; justify-content:center;
          font-size:3rem;
          box-shadow:0 8px 24px ${PRODUCT_COLORS[p.id]}55;
        ">${getProductEmoji(p.category)}</div>
      </div>
      <div class="card-body">
        <p class="card-category">${p.category}</p>
        <h3 class="card-name">${p.name}</h3>
        <div class="card-footer">
          <span class="card-price">$${p.price.toFixed(2)}</span>
          <div class="qty-controls">
            <button class="qty-btn" onclick="changeQty('${p.id}', -1)">−</button>
            <span class="qty-display" id="qty-${p.id}">1</span>
            <button class="qty-btn" onclick="changeQty('${p.id}', 1)">+</button>
          </div>
        </div>
        <button
          class="add-to-cart"
          id="atc-${p.id}"
          onclick="addToCart('${p.id}')"
        >Add to Cart</button>
      </div>
    </div>
  `).join('');
}

// ============================================
//  QUANTITY CONTROLS
// ============================================
const selectedQty = {};

function changeQty(productId, delta) {
  if (!selectedQty[productId]) selectedQty[productId] = 1;
  selectedQty[productId] = Math.max(1, Math.min(10, selectedQty[productId] + delta));
  const el = document.getElementById(`qty-${productId}`);
  if (el) el.textContent = selectedQty[productId];
}

// ============================================
//  CART LOGIC
// ============================================
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const qty = selectedQty[productId] || 1;
  const existing = cart.find(i => i.id === productId);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ ...product, qty });
  }

  saveCart();
  updateCartUI();
  fireAddToCart({ ...product, qty });

  // Button feedback only — no sidebar popup
  const btn = document.getElementById(`atc-${productId}`);
  if (btn) {
    btn.textContent = '✓ Added';
    btn.classList.add('added');
    setTimeout(() => {
      btn.textContent = 'Add to Cart';
      btn.classList.remove('added');
    }, 1500);
  }

  // Reset qty display to 1
  selectedQty[productId] = 1;
  const qtyEl = document.getElementById(`qty-${productId}`);
  if (qtyEl) qtyEl.textContent = '1';
}

function removeFromCart(productId) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  fireRemoveFromCart(item);
  cart = cart.filter(i => i.id !== productId);
  saveCart();
  updateCartUI();
}

function updateCartUI() {
  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
  const badge = document.getElementById('cartCount');
  if (badge) badge.textContent = totalQty;

  const cartItemsEl = document.getElementById('cartItems');
  const cartFooter  = document.getElementById('cartFooter');
  const cartTotalEl = document.getElementById('cartTotal');

  if (!cartItemsEl) return;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    if (cartFooter) cartFooter.style.display = 'none';
    return;
  }

  cartItemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-img">
        <img
          src="${item.localImage}"
          alt="${item.name}"
          onerror="this.style.display='none'"
          style="width:40px;height:40px;object-fit:contain;border-radius:8px;"
        />
      </div>
      <div class="cart-item-info">
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">$${item.price.toFixed(2)} × ${item.qty} = <strong>$${(item.price * item.qty).toFixed(2)}</strong></p>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart('${item.id}')">✕</button>
    </div>
  `).join('');

  if (cartFooter) cartFooter.style.display = 'block';
  if (cartTotalEl) cartTotalEl.textContent = `$${getCartTotal().toFixed(2)}`;
}

// ============================================
//  CART SIDEBAR OPEN / CLOSE
// ============================================
function openCart() {
  document.getElementById('cartSidebar')?.classList.add('open');
  document.getElementById('cartOverlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartSidebar')?.classList.remove('open');
  document.getElementById('cartOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

// ============================================
//  CHECKOUT PAGE LOGIC
// ============================================
function renderCheckoutSummary() {
  const summaryItems = document.getElementById('summaryItems');
  const subtotalEl   = document.getElementById('summarySubtotal');
  const taxEl        = document.getElementById('summaryTax');
  const totalEl      = document.getElementById('summaryTotal');

  if (!summaryItems) return;

  if (cart.length === 0) {
    summaryItems.innerHTML = '<p style="color:var(--mid);font-size:0.9rem">No items in cart.</p>';
    return;
  }

  summaryItems.innerHTML = cart.map(item => `
    <div class="summary-item">
      <div class="summary-item-img">
        <img
          src="${item.localImage}"
          alt="${item.name}"
          onerror="this.style.display='none'"
          style="width:36px;height:36px;object-fit:contain;border-radius:6px;"
        />
      </div>
      <span class="summary-item-name">${item.name} ${item.qty > 1 ? `×${item.qty}` : ''}</span>
      <span class="summary-item-price">$${(item.price * item.qty).toFixed(2)}</span>
    </div>
  `).join('');

  const subtotal = getCartTotal();
  const rawTotal = subtotal * 1.18;
  const total    = Math.ceil(rawTotal);
  const tax      = total - subtotal;

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (taxEl)      taxEl.textContent      = `$${tax.toFixed(2)}`;
  if (totalEl)    totalEl.textContent    = `$${total.toFixed(2)}`;
}

function generateOrderId() {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();

  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');

  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  const seconds = String(now.getSeconds()).padStart(2, '0');
  const ms = String(now.getMilliseconds()).padStart(3, '0');
  const formattedDateTime = `${day}-${month}-${year}-${String(hours).padStart(2, '0')}-${minutes}-${seconds}-${ms}-${ampm}`;

  const random = Math.random().toString(36).substr(2, 10).toUpperCase();

  return `ORDER-${formattedDateTime}-${random}`;
}

function placeOrder() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  const orderId = generateOrderId();
  firePurchase(orderId);

  const modal   = document.getElementById('modalOverlay');
  const orderEl = document.getElementById('orderId');
  if (orderEl) orderEl.textContent = orderId;
  if (modal)   modal.style.display = 'flex';

  setTimeout(() => {
    cart = [];
    saveCart();
  }, 1500);
}

// ============================================
//  FADE-UP ANIMATION
// ============================================
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);

// ============================================
//  INIT
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  const isCheckout = document.body.classList.contains('checkout-page');
  updateCartUI();

  if (!isCheckout) {
    renderProducts();
    fireViewItemList();
  } else {
    renderCheckoutSummary();
    fireBeginCheckout();
  }
});