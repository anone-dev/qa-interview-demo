// Main Navigation & Password Logic

// Global variables for interview year selection
let selectedYear = null;

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
    const stored = localStorage.getItem('interviewAuth');
    if(stored) {
        const data = JSON.parse(stored);
        if(Date.now() < data.expiry) {
            switchMainTab('interview');
            return;
        }
        localStorage.removeItem('interviewAuth');
    }
    
    while(true) {
        const password = await getPasswordInput('Enter Password to Access Interview Questions');
        if(password === null) return;
        const hash = await hashPassword(password);
        
        if(hash === '3c0d3661d0f3f5aafaf307a94d9e38045f39c002ad80d08427a2aad674159696') {
            const expiry = Date.now() + (7 * 24 * 60 * 60 * 1000);
            localStorage.setItem('interviewAuth', JSON.stringify({expiry}));
            switchMainTab('interview');
            return;
        } else if(hash === 'b9c0cddf116b3ba8fb8eea843f6627b6c5c1867adf130d51923ab2fdece2467e') {
            switchMainTab('interview');
            return;
        } else {
            alert('⛔ Access Denied: Incorrect Password');
            continue;
        }
    }
}

// Interview Year Selection Functions
function selectInterviewYear(year) {
    // Toggle functionality - if clicking the same year, unselect it
    if (selectedYear === year) {
        selectedYear = null;
        
        // Reset descriptions to default
        resetLevelDescriptions();
        
        // Reset all year cards to light colors
        document.querySelectorAll('.year-card').forEach(card => {
            const cardYear = card.getAttribute('data-year');
            if (cardYear === '2025') {
                card.style.background = 'rgba(102, 126, 234, 0.3)';
            } else {
                card.style.background = 'rgba(240, 147, 251, 0.3)';
            }
        });
        
        // Hide level cards and content
        document.getElementById('interview-level-select').classList.add('hidden');
        document.getElementById('interview-content-area').classList.add('hidden');
        return;
    }
    
    selectedYear = year;
    
    // Update descriptions based on selected year
    if (year === '2026') {
        updateLevelDescriptions2026();
    } else {
        resetLevelDescriptions();
    }
    
    // Reset level selection when switching years
    document.querySelectorAll('.level-card.junior, .level-card.senior').forEach(card => {
        card.classList.remove('selected-junior', 'selected-senior');
    });
    
    // Update year card styles
    document.querySelectorAll('.year-card').forEach(card => {
        const cardYear = card.getAttribute('data-year');
        if (cardYear === year) {
            // Selected year - dark color
            if (year === '2025') {
                card.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            } else {
                card.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
            }
        } else {
            // Unselected year - light color
            if (cardYear === '2025') {
                card.style.background = 'rgba(102, 126, 234, 0.3)';
            } else {
                card.style.background = 'rgba(240, 147, 251, 0.3)';
            }
        }
    });
    
    // Hide content area when switching years
    document.getElementById('interview-content-area').classList.add('hidden');
    // Keep year cards visible and show level cards
    document.getElementById('interview-level-select').classList.remove('hidden');
    document.getElementById('selected-year-text').textContent = `Interview ${year}`;
}

function resetLevelDescriptions() {
    const juniorDesc = document.getElementById('junior-desc');
    const seniorDesc = document.getElementById('senior-desc');
    
    if (juniorDesc) {
        juniorDesc.textContent = 'Logic Exam, JSON/SQL Basics, JS/Python/Robot/Cypress Fundamentals';
    }
    
    if (seniorDesc) {
        seniorDesc.textContent = 'Advanced Logic, Complex Queries, Error Handling & Anti-Patterns';
    }
}

function goBackToYearSelect() {
    selectedYear = null;
    
    // Reset descriptions to default
    resetLevelDescriptions();
    
    // Reset all year cards to light colors
    document.querySelectorAll('.year-card').forEach(card => {
        const cardYear = card.getAttribute('data-year');
        if (cardYear === '2025') {
            card.style.background = 'rgba(102, 126, 234, 0.3)';
        } else {
            card.style.background = 'rgba(240, 147, 251, 0.3)';
        }
    });
    
    // Reset level selection
    document.querySelectorAll('.level-card.junior, .level-card.senior').forEach(card => {
        card.classList.remove('selected-junior', 'selected-senior');
    });
    
    document.getElementById('interview-content-area').classList.add('hidden');
    document.getElementById('interview-level-select').classList.add('hidden');
    document.getElementById('interview-year-select').classList.remove('hidden');
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


// ==========================================
// 📐 TRIANGLE CHALLENGE LOGIC (FINAL)
// ==========================================

// State Tracking (เก็บสถานะการปลดล็อค)
const foundCases = new Set();
const foundErrors = new Set();

// 1. DEFINITIONS (ข้อมูลโจทย์ตามภาพต้นฉบับ)
const triangleCases = [
    { id: 1, name: "All fields are empty", desc: "A=, B=, C=" },
    { id: 2, name: "This is not a triangle", desc: "A+B < C (1,2,10)" },
    { id: 3, name: "Not all fields specified", desc: "A=3, B=4, C=" },
    { id: 4, name: "Equilateral triangle", desc: "3,3,3" },
    { id: 5, name: "Isosceles triangle", desc: "5,5,8" },
    { id: 6, name: "Right triangle", desc: "3,4,5 (Pythagoras)" },
    { id: 7, name: "Obtuse triangle", desc: "2,3,4" },
    { id: 8, name: "Acute triangle", desc: "5,6,7" },
    { id: 9, name: "Not a triangle (Sum=)", desc: "1,2,3 (Boundary)" },
    { id: 10, name: "Large numbers", desc: "1000000+" },
    { id: 11, name: "SQL injection", desc: "' OR 1=1" },
    { id: 12, name: "XSS attack", desc: "<script>" }
];

const bugCases = [
    { id: 'E1', name: "Field C not being validated", desc: "Try text in C only" },
    { id: 'E2', name: "All zeros - not equilateral", desc: "0,0,0" },
    { id: 'E3', name: "Float numbers not handled", desc: "3.5, 4.5, 5.5" },
    { id: 'E4', name: "Negative values accepted", desc: "-3, -3, -3" }
];

// Initialize UI (สร้างตาราง Grid)
function initTriangleGame() {
    const grid = document.getElementById('case-grid');
    const errGrid = document.getElementById('error-grid');
    
    // ป้องกัน Error หากไม่พบ Element ในหน้าอื่น
    if(!grid || !errGrid) return;

    grid.innerHTML = '';
    errGrid.innerHTML = '';

    triangleCases.forEach(c => {
        grid.innerHTML += `<div id="case-${c.id}" class="case-card"><span class="case-icon">🔒</span>#${c.id}: ???</div>`;
    });
    
    bugCases.forEach(b => {
        errGrid.innerHTML += `<div id="bug-${b.id}" class="case-card"><span class="case-icon">🔒</span>#${b.id}: ???</div>`;
    });
}

// Unlock Helper
function unlockCase(id, type = 'normal') {
    const set = type === 'bug' ? foundErrors : foundCases;
    const badge = type === 'bug' ? 'error-badge' : 'score-badge';
    const total = type === 'bug' ? 4 : 12;
    const prefix = type === 'bug' ? 'bug-' : 'case-';
    
    if(!set.has(id)) {
        set.add(id);
        const card = document.getElementById(prefix + id);
        const data = type === 'bug' ? bugCases.find(b=>b.id===id) : triangleCases.find(c=>c.id===id);
        
        if(card) {
            card.classList.add(type === 'bug' ? 'error-unlocked' : 'unlocked');
            card.innerHTML = `<span class="case-icon">${type === 'bug' ? '🐞' : '✅'}</span>#${id}: ${data.name}`;
        }
        
        const badgeEl = document.getElementById(badge);
        if(badgeEl) badgeEl.innerText = `${type==='bug'?'Errors':'Cases'}: ${set.size}/${total}`;
    }
}

// Main Check Function
function checkTriangle() {
    const resBox = document.getElementById('tri-result');
    const rawA = document.getElementById('tri-a').value;
    const rawB = document.getElementById('tri-b').value;
    const rawC = document.getElementById('tri-c').value;

    resBox.style.display = 'block';
    resBox.className = ''; 

    const allInput = rawA + rawB + rawC;

    // --- 1. SECURITY & STRINGS (Cases #10, #11, #12) ---
    if(allInput.includes("'") || allInput.toLowerCase().includes("or 1=1")) { unlockCase(11); showError("Database Error: Syntax incorrect"); return; }
    if(allInput.includes("<") || allInput.includes(">") || allInput.includes("script")) { unlockCase(12); alert("XSS Blocked!"); return; }
    if(rawA.length > 6 || rawB.length > 6 || rawC.length > 6) { unlockCase(10); }

    // --- 2. EMPTY CHECKS (Cases #1, #3) ---
    if(rawA === "" && rawB === "" && rawC === "") { unlockCase(1); showError("All fields are empty"); return; }
    if(rawA === "" || rawB === "" || rawC === "") { unlockCase(3); showError("Not all fields specified"); return; }

    // --- 3. BUG HUNTING - PRE CONVERSION (Errors E1, E3) ---
    // Bug E1: Field C not validated (A,B are numbers, C is text)
    if(!isNaN(rawA) && !isNaN(rawB) && isNaN(rawC)) { unlockCase('E1', 'bug'); showError("System Error: C is invalid (Validation Bug)"); return; }
    
    // Bug E3: Float numbers (Input contains dot)
    if(rawA.includes(".") || rawB.includes(".") || rawC.includes(".")) { unlockCase('E3', 'bug'); showError("Float numbers not handled"); return; }

    // Convert to Numbers
    const a = parseFloat(rawA);
    const b = parseFloat(rawB);
    const c = parseFloat(rawC);

    if(isNaN(a) || isNaN(b) || isNaN(c)) { showError("Error: Inputs must be numbers"); return; }

    // --- 4. BUG HUNTING - LOGIC (Errors E2, E4) ---
    
    // Bug E2: All Zeros (Should allow Equilateral but logic says no)
    if(a===0 && b===0 && c===0) { unlockCase('E2', 'bug'); showError("0,0,0 is not equilateral"); return; }
    
    // *** BUG E4: Negative Equilateral ***
    // (จำลองบั๊ก: รับค่าลบได้ และบอกว่าเป็นด้านเท่า)
    if(a < 0 && b < 0 && c < 0 && a === b && b === c) { 
        unlockCase('E4', 'bug'); 
        showSuccess("Equilateral triangle"); // Fake success message mimicking the bug
        return; 
    }
    
    // General Negative Check (ถ้าไม่เข้าเงื่อนไข E4 ให้ Error ตามปกติ)
    if(a < 0 || b < 0 || c < 0) { showError("Error: Side cannot be negative"); return; }

    // --- 5. GEOMETRY LOGIC (Cases #2, #9, #4, #5, #6, #7, #8) ---
    
    // Case #9: Boundary (Sum equals 3rd side -> Line)
    if(a+b===c || a+c===b || b+c===a) { unlockCase(9); showError("Not a triangle (Boundary)"); return; }
    
    // Case #2: Not a triangle (Sum less than 3rd side)
    if(a+b<c || a+c<b || b+c<a) { unlockCase(2); showError("This is not a triangle"); return; }

    // Valid Triangle - Classify by Priority
    
    // Priority 1: Equilateral (all sides equal)
    if(a === b && b === c) { 
        unlockCase(4); 
        showSuccess("Equilateral triangle");
        return;
    }
    
    // Priority 2: Isosceles (any two sides equal)
    if(a === b || b === c) { 
        unlockCase(5); 
        showSuccess("Isosceles triangle");
        return;
    }
    
    // Priority 3: Scalene - Check angle types
    const sides = [a,b,c].sort((x,y)=>x-y);
    const [s1, s2, hyp] = sides;
    const pythagoras = s1**2 + s2**2;
    const hypSq = hyp**2;

    // Right triangle
    if(Math.abs(pythagoras - hypSq) < 0.1) { 
        unlockCase(6); 
        showSuccess("Right triangle");
        return;
    }
    
    // Obtuse triangle
    if(pythagoras < hypSq) { 
        unlockCase(7); 
        showSuccess("Obtuse triangle");
        return;
    }
    
    // Acute triangle
    unlockCase(8); 
    showSuccess("Acute triangle");
}

// --- Helpers ---
function showError(msg) { 
    const el = document.getElementById('tri-result'); 
    el.style.backgroundColor = "#fadbd8"; 
    el.style.color = "#7b241c"; 
    el.innerText = msg; 
    el.style.display = 'block';
    // Hide triangle visualization on error
    const visual = document.getElementById('tri-visual');
    if(visual) visual.style.display = 'none';
}

function showSuccess(msg) { 
    const el = document.getElementById('tri-result'); 
    el.style.backgroundColor = "#d5f5e3"; 
    el.style.color = "#145a32"; 
    el.innerText = msg; 
    el.style.display = 'block';
}

function resetTriangle() { 
    document.getElementById('tri-a').value=''; 
    document.getElementById('tri-b').value=''; 
    document.getElementById('tri-c').value=''; 
    document.getElementById('tri-result').style.display='none'; 
}

function toggleCheatSheet() {
    const password = prompt("🔐 ใส่รหัสผ่านผู้คุมสอบ (Instructor Password):");
    
    if(password === "qacoe") {
        const cheatText = 
`🕵️♂️ เฉลยและคำอธิบาย (Instructor Solutions)

--- 🎯 1. Test Cases (ต้องทำให้ครบ 12 ข้อ) ---
#1 All fields are empty (A=, B=, C=): ไม่กรอกข้อมูลเลย -> [ว่าง], [ว่าง], [ว่าง]
#2 This is not a triangle (A+B < C): ไม่เป็นสามเหลี่ยม -> 1, 2, 10
#3 Not all fields specified (Missing inputs): กรอกไม่ครบ -> 3, 4, [ว่าง]
#4 Equilateral triangle (A=B=C): ด้านเท่า -> 3, 3, 3
#5 Isosceles triangle (A=B ≠ C): หน้าจั่ว -> 5, 5, 8
#6 Right triangle (Pythagoras): มุมฉาก -> 3, 4, 5
#7 Obtuse triangle (Angle > 90°): มุมป้าน -> 2, 3, 4
#8 Acute triangle (All angles < 90°): มุมแหลม -> 5, 6, 7
#9 Not a triangle - Boundary (A+B = C): ผลรวมเท่ากันพอดี -> 1, 2, 3
#10 Large numbers (1,000,000+): เลขหลักล้าน -> 1000000, 1000000, 1000000
#11 SQL injection (' OR 1=1): ทดสอบความปลอดภัย -> ' OR 1=1
#12 XSS attack (<script>): ทดสอบความปลอดภัย -> <script>

--- 🐞 2. Errors Handling (ต้องหาให้เจอ 4 จุด) ---
E1: Field C not being validated (A,B=Num, C=Text) -> 3, 3, 'A'
E2: All zeros - not an equilateral triangle (0,0,0) -> 0, 0, 0
E3: Float numbers not handled (1.5, 1.5, 1.5) -> 3.5, 4.5, 5.5
E4: Negative values accepted (-3, -3, -3) -> -3, -3, -3`;

        alert(cheatText);
    } else {
        if(password !== null) alert("⛔ รหัสผ่านไม่ถูกต้อง");
    }
}

// Call init on load (Ensure DOM is ready)
document.addEventListener('DOMContentLoaded', initTriangleGame);

// Update switchMainTab to support triangle view
const originalSwitchMainTab = switchMainTab;
switchMainTab = function(tab) {
    document.querySelectorAll('.section-view').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-tabs button').forEach(el => el.classList.remove('active'));
    
    if(tab === 'app') {
        document.getElementById('view-app').classList.add('active');
        document.querySelectorAll('.nav-tabs button')[0].classList.add('active');
    } else if(tab === 'triangle') {
        document.getElementById('view-triangle').classList.add('active');
        document.querySelectorAll('.nav-tabs button')[1].classList.add('active');
        initTriangleGame(); // Initialize triangle game when switching to this tab
    } else if(tab === 'interview') {
        document.getElementById('view-interview').classList.add('active');
        document.querySelectorAll('.nav-tabs button')[2].classList.add('active');
        
        // Reset to year selection only
        selectedYear = null;
        
        // Reset descriptions to default
        resetLevelDescriptions();
        
        document.getElementById('interview-year-select').classList.remove('hidden');
        document.getElementById('interview-level-select').classList.add('hidden');
        document.getElementById('interview-content-area').classList.add('hidden');
        
        // Reset year card styles
        document.querySelectorAll('.year-card').forEach(card => {
            const cardYear = card.getAttribute('data-year');
            if (cardYear === '2025') {
                card.style.background = 'rgba(102, 126, 234, 0.3)';
            } else {
                card.style.background = 'rgba(240, 147, 251, 0.3)';
            }
        });
        
        // Reset level selection
        document.querySelectorAll('.level-card.junior, .level-card.senior').forEach(card => {
            card.classList.remove('selected-junior', 'selected-senior');
        });
    }
};
