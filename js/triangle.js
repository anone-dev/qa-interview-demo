// Triangle Challenge - Enhanced Functions

let cheatSheetUnlocked = false;

async function toggleCheatSheet() {
    const section = document.getElementById('cheat-sheet-section');
    
    if(cheatSheetUnlocked) {
        section.style.display = section.style.display === 'none' ? 'block' : 'none';
        return;
    }
    
    while(true) {
        const password = await getPasswordInput('Enter Instructor Password');
        if(password === null) return;
        
        if(password === 'qacoe') {
            cheatSheetUnlocked = true;
            section.style.display = 'block';
            return;
        } else {
            alert('⛔ Access Denied: Incorrect Password');
        }
    }
}

function drawTriangle(a, b, c, type) {
    const svg = document.getElementById('triangle-svg');
    if(!svg) return;
    svg.innerHTML = '';
    
    const w = 200, h = 180, pad = 20;
    const maxSide = Math.max(a, b, c);
    const scale = (w - 2*pad) / maxSide;
    
    const x1 = pad, y1 = h - pad;
    const x2 = pad + c * scale, y2 = h - pad;
    
    const cosA = (b*b + c*c - a*a) / (2*b*c);
    const sinA = Math.sqrt(1 - cosA*cosA);
    const x3 = x1 + b * scale * cosA;
    const y3 = y1 - b * scale * sinA;
    
    const points = [[x1, y1], [x2, y2], [x3, y3]];
    
    const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    poly.setAttribute('points', points.map(p => p.join(',')).join(' '));
    poly.setAttribute('fill', '#e8f4fd');
    poly.setAttribute('stroke', '#3498db');
    poly.setAttribute('stroke-width', '2');
    svg.appendChild(poly);
    
    const labels = [
        {x: (x2+x3)/2 + 8, y: (y2+y3)/2, text: 'a='+a},
        {x: (x1+x3)/2 - 15, y: (y1+y3)/2, text: 'b='+b},
        {x: (x1+x2)/2, y: y1 + 15, text: 'c='+c}
    ];
    
    labels.forEach(label => {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', label.x);
        text.setAttribute('y', label.y);
        text.setAttribute('font-size', '12');
        text.setAttribute('fill', '#2c3e50');
        text.setAttribute('font-weight', 'bold');
        text.textContent = label.text;
        svg.appendChild(text);
    });
    
    const visual = document.getElementById('tri-visual');
    if(visual) visual.style.display = 'block';
}

const _origShowSuccess = window.showSuccess;
const _origResetTriangle = window.resetTriangle;

window.showSuccess = function(msg) {
    _origShowSuccess(msg);
    
    const rawA = parseFloat(document.getElementById('tri-a').value);
    const rawB = parseFloat(document.getElementById('tri-b').value);
    const rawC = parseFloat(document.getElementById('tri-c').value);
    
    if(msg.includes('Equilateral')) {
        drawTriangle(rawA, rawB, rawC, 'equilateral');
    } else if(msg.includes('Isosceles')) {
        drawTriangle(rawA, rawB, rawC, 'isosceles');
    } else if(msg.includes('Right')) {
        drawTriangle(rawA, rawB, rawC, 'right');
    } else if(msg.includes('Obtuse')) {
        drawTriangle(rawA, rawB, rawC, 'obtuse');
    } else if(msg.includes('Acute')) {
        drawTriangle(rawA, rawB, rawC, 'acute');
    } else if(msg.includes('Scalene')) {
        drawTriangle(rawA, rawB, rawC, 'scalene');
    }
};

window.resetTriangle = function() {
    _origResetTriangle();
    const visual = document.getElementById('tri-visual');
    if(visual) visual.style.display = 'none';
};

// Reset cheat sheet when switching tabs
const _origSwitchMainTab = window.switchMainTab;
window.switchMainTab = function(tab) {
    if(tab !== 'triangle') {
        cheatSheetUnlocked = false;
        const section = document.getElementById('cheat-sheet-section');
        const errorDiv = document.getElementById('cheat-sheet-error');
        if(section) section.style.display = 'none';
        if(errorDiv) errorDiv.style.display = 'none';
    }
    _origSwitchMainTab(tab);
};
