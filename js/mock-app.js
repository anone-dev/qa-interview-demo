// Mock Application Logic

let orders = [];
let products = []; 

// Mock API Functions
function apiRegister(data) { 
    return new Promise(resolve => { 
        setTimeout(() => resolve({
            status: "success", 
            message: "✅ Registration Successful!"
        }), 600); 
    }); 
}

function apiGetProducts() { 
    return new Promise(resolve => { 
        resolve([
            {name: "Developer T-Shirt", price: 120, img: "👕"}, 
            {name: "Debugging Rubber Duck", price: 550, img: "🦆"}, 
            {name: "Coffee Mug", price: 60, img: "☕"}
        ]); 
    }); 
}

function apiCheckout(cart) { 
    return new Promise(resolve => { 
        let total = 0; 
        cart.forEach(item => total += item.qty * item.price); 
        resolve({total: total}); 
    }); 
}

function apiPayment(method, amount, cardNum) { 
    return new Promise(resolve => { 
        setTimeout(() => { 
            if(method === "Bank Transfer") { 
                resolve({status: "success", recorded: false}); 
            } else { 
                resolve({status: "success", recorded: true}); 
            } 
        }, 800); 
    }); 
}

function apiGetOrders() { 
    return new Promise(resolve => resolve(orders)); 
}

// UI Functions
function register() { 
    document.getElementById('reg-msg').className = 'msg-box'; 
    document.getElementById('reg-msg').innerText = 'Processing...'; 
    apiRegister({}).then(res => { 
        const msgDiv = document.getElementById('reg-msg'); 
        msgDiv.innerText = res.message; 
        msgDiv.classList.add('msg-success'); 
        setTimeout(() => { 
            document.getElementById('page-register').classList.add('hidden'); 
            loadProducts(); 
        }, 1000); 
    }); 
}

function loadProducts() { 
    apiGetProducts().then(items => { 
        products = items; 
        const listDiv = document.getElementById('product-list'); 
        listDiv.innerHTML = ""; 
        items.forEach((p, i) => { 
            listDiv.innerHTML += `<div class="product-card"><div style="font-size:3rem;">${p.img}</div><h3>${p.name}</h3><span class="price-tag">${p.price} THB</span><div style="margin-top:10px;">Qty: <input id="qty-${i}" type="number" value="1" style="width:60px; text-align:center;"></div></div>`; 
        }); 
        document.getElementById('page-products').classList.remove('hidden'); 
    }); 
}

function checkout() { 
    const cart = products.map((p, i) => { 
        return {
            name: p.name, 
            price: p.price, 
            qty: parseInt(document.getElementById(`qty-${i}`).value)
        }; 
    }); 
    apiCheckout(cart).then(res => { 
        document.getElementById('order-summary').innerHTML = `Total Amount:<br><span style="font-size:3rem; font-weight:bold;">${res.total} THB</span>`; 
        document.getElementById('page-products').classList.add('hidden'); 
        document.getElementById('page-checkout').classList.remove('hidden'); 
    }); 
}

function goPayment() { 
    document.getElementById('page-checkout').classList.add('hidden'); 
    document.getElementById('page-payment').classList.remove('hidden'); 
}

function toggleCardInput() { 
    const method = document.getElementById('pay-method').value; 
    document.getElementById('card-input-group').style.display = (method === 'Credit Card') ? 'block' : 'none'; 
}

function processPayment() { 
    const method = document.getElementById('pay-method').value; 
    const amountText = document.getElementById('order-summary').innerText; 
    const amount = parseInt(amountText.replace(/[^0-9]/g, "")); 
    document.getElementById('pay-msg').innerText = "Processing Payment..."; 
    apiPayment(method, amount, "").then(res => { 
        const msg = (res.recorded) ? "✅ Payment Successful!" : "✅ Payment Successful! (Wait, did it record?)"; 
        document.getElementById('pay-msg').innerText = msg; 
        document.getElementById('pay-msg').className = "msg-box msg-success"; 
        if(res.recorded) {
            orders.push({
                item: "Order via " + method, 
                amount: amount, 
                date: new Date().toLocaleString()
            }); 
        }
        setTimeout(() => { 
            showHistory(); 
            document.getElementById('page-payment').classList.add('hidden'); 
            document.getElementById('page-history').classList.remove('hidden'); 
        }, 1500); 
    }); 
}

function showHistory() { 
    apiGetOrders().then(hist => { 
        if(hist.length === 0) { 
            document.getElementById('history-list').innerHTML = "<p style='text-align:center; color:red;'>⚠️ No orders found! (Bug?)</p>"; 
        } else { 
            document.getElementById('history-list').innerHTML = hist.map(o => 
                `<div style="border-bottom:1px solid #ddd; padding:10px;"><b>${o.item}</b> <span style="float:right; color:green; font-weight:bold;">${o.amount} THB</span><div style="font-size:0.8rem; color:#888;">${o.date}</div></div>`
            ).join(""); 
        } 
    }); 
}

function resetApp() {
    orders = [];
    products = [];
    
    document.getElementById('page-products').classList.add('hidden');
    document.getElementById('page-checkout').classList.add('hidden');
    document.getElementById('page-payment').classList.add('hidden');
    document.getElementById('page-history').classList.add('hidden');
    
    document.getElementById('reg-first').value = '';
    document.getElementById('reg-last').value = '';
    document.getElementById('reg-email').value = '';
    document.getElementById('reg-pass').value = '';
    document.getElementById('reg-confirm').value = '';
    document.getElementById('reg-dob').value = '';
    document.getElementById('pay-msg').innerText = '';
    document.getElementById('reg-msg').innerText = '';
    document.getElementById('reg-msg').className = '';
    
    document.getElementById('page-register').classList.remove('hidden');
}
