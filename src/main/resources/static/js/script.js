    const products = [
        { name: "Toast", price: 10, image: "/images/toast.png" },
        { name: "Ayran", price: 5, image: "/images/ayran.png" },
        { name: "Cola", price: 8, image: "/images/cola.png" },
        { name: "Sandwich", price: 12, image: "/images/sandwich.png" },
        { name: "Water", price: 2, image: "/images/water.png" },
        { name: "Tea", price: 3, image: "/images/tea.png" },
        { name: "Coffee", price: 15, image: "/images/coffee.png" },
        { name: "Pizza Slice", price: 20, image: "/images/pizza.png" },
        { name: "Burger", price: 25, image: "/images/burger.png" },
        { name: "Fries", price: 10, image: "/images/fries.png" },
        { name: "Ice Cream", price: 7, image: "/images/icecream.png" },
        { name: "Cake", price: 15, image: "/images/cake.png" },
        { name: "Chocolate", price: 10, image: "/images/chocolate.png" },
        { name: "Juice", price: 6, image: "/images/juice.png" },
        { name: "Milk", price: 4, image: "/images/milk.png" },
        { name: "Donut", price: 8, image: "/images/donut.png" },
        { name: "Soup", price: 12, image: "/images/soup.png" },
        { name: "Salad", price: 18, image: "/images/salad.png" },
        { name: "Pasta", price: 22, image: "/images/pasta.png" },
        { name: "Grilled Cheese", price: 14, image: "/images/grilledcheese.png" }
    ];
    const cart = [];
    document.addEventListener('DOMContentLoaded', () => {
        isLoginButton();
        profileOrLogin();
        customerOrEmployee();
        showOrders();
        placeAnOrder();
        logout();
        listProducts();
    });
    function isLoginButton(){
        const loginButton = document.getElementById('loginbutton');
        if (loginButton) {
            loginButton.addEventListener('click', (event) => {
                event.preventDefault();
                const username = document.getElementById('username').value.trim();
                const password = document.getElementById('password').value.trim();
                const role = document.getElementById('role').value.trim();
                if (!username || !password || !role) {
                    alert('Please fill in all the fields!');
                    return;
                }
                login(username, password, role);
            });
        }
    }
    async function login(username, password, role){
        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, role })
        })
    }
    function logout(){
        const logoutButton = document.getElementById('logoutButton');
            if (logoutButton) {
                logoutButton.addEventListener('click', () => {
                    fetch('/logout', { method: 'GET' })
                        .then(response => response.text())
                        .then(hrefUrl => {
                            window.location.href = hrefUrl;
                        })
                });
        }
    }
    function listProducts(){
        const productsDiv = document.getElementById('products');
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'col-md-4 product';
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}" />
                <h5>${product.name}</h5>
                <p>Price: $${product.price}</p>
                <button class="btn btn-primary" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
                `;
                productsDiv.appendChild(productDiv);
            });
    }
    function addToCart(name, price) {
        const existingProduct = cart.find(product => product.name === name);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        renderCart();
    }
    function renderCart() {
        const cartContainer = document.getElementById('cart');
        cartContainer.innerHTML = '';
        cart.forEach((product, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>$${product.price}</td>
                <td>${product.quantity}</td>
                <td><button class="btn btn-danger" onclick="removeFromCart(${index})">Remove</button></td>
            `;
            cartContainer.appendChild(row);
        });
    }
    function removeFromCart(index) {
        cart.splice(index, 1); //
        renderCart();
    }
    async function isSessionOpen(){
        const response = await fetch('/session-status', { method: 'GET' });
        return await response.text();
    }
    async function profileOrLogin(){
        const authButton = document.getElementById('authButton');
        const session = await isSessionOpen();
        if (session == 'open') {
            authButton.textContent = 'Profile';
            authButton.setAttribute('href', '/profile');
        } else {
            authButton.textContent = 'Log In';
            authButton.setAttribute('href', '/login');
        }
    }
    async function checkRole(){
        const response = await fetch('/check-role', { method: 'GET' });
        return await response.text();
    }
    async function customerOrEmployee(){
        const dashboardOnly = document.getElementById('dashboardOnly');
        const ordersOnly = document.getElementById('ordersOnly');
        const productsOnly = document.getElementById('productsOnly');
        productsOnly.style.display ='none';
        ordersOnly.style.display ='none';
        dashboardOnly.style.display ='none';
        const role = await checkRole();
        if (role == 'customer') {
            productsOnly.style.display = 'block';
            ordersOnly.style.display = 'block'
        }else if (role == 'employee') {
            dashboardOnly.style.display = 'block'
        }
    }
    function showOrders(){
        const dashboardContainer = document.getElementById('dashboardOrdersContainer');
        const myOrdersContainer = document.getElementById('myOrdersContainer');
        if (dashboardContainer) {
            loadOrders(dashboardContainer, true);
        } else if (myOrdersContainer) {
            loadOrders(myOrdersContainer, false);
        }
    }
    function loadOrders(container, isEmployee) {
         fetch('/api/orders/showOrders')
             .then(response => response.json())
             .then(orders => renderOrders(container, orders, isEmployee))
             .catch(() => {
                 container.innerHTML = '<p style="text-align: center;">Failed to load orders.</p>';
             });
    }
    function renderOrders(container, orders, isEmployee) {
         if (!orders || orders.length === 0) {
             container.innerHTML = '<p style="text-align: center;">No orders found.</p>';
             return;
         }
         container.innerHTML = orders.map((order, index) => `
             <div>
                 <h3>Order ${index + 1} (Customer: ${order.user.username}) (Order id: ${order.id})</h3>
                 <table class="table">
                     <thead>
                         <tr>
                             <th>Product</th>
                             <th>Quantity</th>
                             <th>Price</th>
                             <th>Total</th>
                         </tr>
                     </thead>
                     <tbody>
                         ${order.products.map(product => `
                             <tr>
                                 <td>${product.name}</td>
                                 <td>${product.quantity}</td>
                                 <td>$${product.price.toFixed(2)}</td>
                                 <td>$${(product.quantity * product.price).toFixed(2)}</td>
                             </tr>`).join('')}
                     </tbody>
                 </table>
                 <div>
                     <p class="fw-bold">Total : $${order.total}</p>
                     <strong>Status:</strong>
                     <span class="status-label" data-order-id="${order.id}" id="status-${order.id}">${order.status}</span>
                     ${isEmployee ? `
                         <select class="status-select d-none" data-order-id="${order.id}" id="select-${order.id}">
                             <option value="Being-Prepared" ${order.status === 'Being-Prepared' ? 'selected' : ''}>Being-Prepared</option>
                             <option value="Ready-for-Pickup" ${order.status === 'Ready-for-Pickup' ? 'selected' : ''}>Ready for Pickup</option>
                             <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                             <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                         </select>
                         <button class="btn btn-secondary edit-status" data-order-id="${order.id}">Edit</button>
                         <button class="btn btn-primary update-status d-none" data-order-id="${order.id}">Update</button>
                     ` : ''}
                 </div>
             </div>
         `).join('');

         if (isEmployee) attachStatusHandlers();
     }
    function attachStatusHandlers() {
        document.querySelectorAll('.edit-status').forEach(button => {
            button.addEventListener('click', event => {
                event.preventDefault();
                const orderId = event.target.dataset.orderId;
                document.getElementById(`status-${orderId}`).classList.add('d-none');
                document.getElementById(`select-${orderId}`).classList.remove('d-none');
                event.target.classList.add('d-none');
                document.querySelector(`.update-status[data-order-id="${orderId}"]`).classList.remove('d-none');
            });
        });
        document.querySelectorAll('.update-status').forEach(button => {
            button.addEventListener('click', event => {
                const orderId = event.target.dataset.orderId;
                const newStatus = document.getElementById(`select-${orderId}`).value;
                fetch('/api/orders/update-status', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ orderId, newStatus })
                })
                .then(response => {
                    if (!response.ok) throw new Error('Failed to update order status.');
                    document.getElementById(`status-${orderId}`).textContent = newStatus;
                    document.getElementById(`status-${orderId}`).classList.remove('d-none');
                    document.getElementById(`select-${orderId}`).classList.add('d-none');
                    button.classList.add('d-none');
                    document.querySelector(`.edit-status[data-order-id="${orderId}"]`).classList.remove('d-none');
                    alert(`Order ${orderId} status updated to ${newStatus}.`);
                })
                .catch(() => alert('An error occurred while updating the order status.'));
            });
        });
    }
    function placeAnOrder(){
        const placeOrderButton = document.getElementById('placeOrderButton');
        if (placeOrderButton) {
            placeOrderButton.addEventListener('click', (event) => {
                event.preventDefault();

                if (cart.length === 0) {
                    alert('Your cart is empty. Add some products to place an order.');
                    return;
                }
                const totalAmount = cart.reduce((total, product) => total + product.price * product.quantity, 0);
                const paymentWindow = window.open(`/payment?total=${totalAmount}`, 'Payment', `width=500,height=500,top=${(window.screen.height/2)-(500/2)},left=${(window.screen.width/2)-(500/2)}`);
                if (!paymentWindow) {
                    alert('Payment popup was blocked. Please enable popups in your browser.');
                    return;
                }
                window.paymentSuccess = (paymentMethod) => {
                    paymentWindow.close();
                    // Ödeme başarılıysa sipariş ver
                    fetch('/api/orders/place-order', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            products: cart,
                            payment: {
                                paymentMethod: paymentMethod,
                                amount: totalAmount
                            }
                        })
                    })
                    .then(response => {
                        if (!response.ok) throw new Error('Failed to place order.');
                        alert('Order placed successfully! Thank you.');
                        cart.length = 0; // Sepeti temizle
                        document.getElementById('cart').innerHTML = ''; // Sepet görselini temizle
                        window.location.href = '/myOrders';
                    })
                    .catch(() => alert('An error occurred while placing your order.'));
                };

                window.paymentFailed = () => {
                    paymentWindow.close();
                    alert('Payment failed. Please try again.');
                };
            });
        }
   }






























