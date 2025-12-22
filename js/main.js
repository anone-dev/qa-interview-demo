// Main Navigation & Password Logic

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function switchMainTab(tab) {
    document.querySelectorAll('.section-view').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-tabs button').forEach(el => el.classList.remove('active'));
    
    if(tab === 'app') {
        document.getElementById('view-app').classList.add('active');
        document.querySelectorAll('.nav-tabs button')[0].classList.add('active');
    } else if(tab === 'interview') {
        document.getElementById('view-interview').classList.add('active');
        document.querySelectorAll('.nav-tabs button')[1].classList.add('active');
    }
}

async function authInterviewAccess() {
    while(true) {
        const password = await getPasswordInput('Enter Password to Access Interview Questions');
        if(password === null) return;
        const hash = await hashPassword(password);
        if(hash === '3c0d3661d0f3f5aafaf307a94d9e38045f39c002ad80d08427a2aad674159696') {
            switchMainTab('interview');
            return;
        }
        alert('⛔ Access Denied: Incorrect Password');
    }
}

function getPasswordInput(message) {
    return new Promise((resolve) => {
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:10000;display:flex;align-items:center;justify-content:center;';
        const modal = document.createElement('div');
        modal.style.cssText = 'background:white;padding:30px;border-radius:10px;box-shadow:0 4px 20px rgba(0,0,0,0.3);text-align:center;min-width:300px;';
        modal.innerHTML = `<h3 style="margin-top:0;color:#333;">🔒 ${message}</h3><input type="password" id="pwd-input" style="width:200px;padding:10px;border:2px solid #ddd;border-radius:5px;font-size:16px;text-align:center;" placeholder="•••••"><div style="margin-top:20px;"><button id="pwd-ok" style="background:#3498db;color:white;border:none;padding:10px 20px;border-radius:5px;margin-right:10px;cursor:pointer;">OK</button><button id="pwd-cancel" style="background:#95a5a6;color:white;border:none;padding:10px 20px;border-radius:5px;cursor:pointer;">Cancel</button></div>`;
        overlay.appendChild(modal); 
        document.body.appendChild(overlay);
        const input = document.getElementById('pwd-input');
        input.focus();
        function cleanup() { document.body.removeChild(overlay); }
        document.getElementById('pwd-ok').onclick = () => { 
            const password = input.value.trim(); 
            cleanup(); 
            resolve(password); 
        };
        document.getElementById('pwd-cancel').onclick = () => { 
            cleanup(); 
            resolve(null); 
        };
        input.onkeypress = (e) => { 
            if(e.key === 'Enter') document.getElementById('pwd-ok').click(); 
        };
    });
}

async function showAppSection(section) {
    if(section === 'bugs') {
        while(true) {
            const password = await getPasswordInput('Enter Password to View Bug Summary');
            if(password === null) return;
            const hash = await hashPassword(password);
            if(hash === 'b9c0cddf116b3ba8fb8eea843f6627b6c5c1867adf130d51923ab2fdece2467e') {
                switchAppSectionView(section);
                return;
            }
            alert('⛔ Access Denied: Incorrect Password');
        }
    }
    switchAppSectionView(section);
}

function switchAppSectionView(section) {
    document.querySelectorAll('.app-section').forEach(el => el.classList.add('hidden'));
    document.getElementById('btn-ui').classList.remove('active-junior');
    document.getElementById('btn-api').classList.remove('active-junior');
    document.getElementById('btn-bugs').classList.remove('active-junior');
    document.getElementById('app-' + section + '-section').classList.remove('hidden');
    document.getElementById('btn-' + section).classList.add('active-junior');
}

function toggleEndpoint(headerElement) { 
    const content = headerElement.nextElementSibling; 
    const arrow = headerElement.querySelector('.toggle-icon'); 
    if(content.style.display === 'block') { 
        content.style.display = 'none'; 
        arrow.style.transform = 'rotate(0deg)'; 
    } else { 
        content.style.display = 'block'; 
        arrow.style.transform = 'rotate(90deg)'; 
    } 
}
