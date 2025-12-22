// Interview Questions Logic

let currentLevel = '';

function selectInterviewLevel(level) {
    currentLevel = level;
    document.getElementById('interview-level-select').classList.add('hidden');
    document.getElementById('interview-content-area').classList.remove('hidden');
    const headerTitle = document.getElementById('selected-level-text');
    const headerBox = document.getElementById('interview-header');
    
    if(level === 'junior') { 
        headerTitle.innerText = "Junior Level"; 
        headerBox.style.background = "#3498db"; 
    } else { 
        headerTitle.innerText = "Senior Level"; 
        headerBox.style.background = "#e67e22"; 
    }
    
    switchTopic(1);
}

function resetInterviewLevel() {
    document.getElementById('interview-level-select').classList.remove('hidden');
    document.getElementById('interview-content-area').classList.add('hidden');
    currentLevel = '';
}

function switchTopic(topicId) {
    document.querySelectorAll('.topic-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.topic-btn')[topicId - 1].classList.add('active');
    document.querySelectorAll('.topic-content').forEach(content => content.classList.add('hidden'));
    document.getElementById('topic-' + topicId).classList.remove('hidden');
    
    if(topicId === 1) {
        document.getElementById('logic-content-junior').classList.add('hidden');
        document.getElementById('logic-content-senior').classList.add('hidden');
        if(currentLevel === 'junior') {
            document.getElementById('logic-content-junior').classList.remove('hidden');
        } else {
            document.getElementById('logic-content-senior').classList.remove('hidden');
        }
    }
}

async function toggleSolution(level) {
    while(true) {
        const password = await getPasswordInput('Enter Password to View Solution');
        if(password === null) return;
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        if(hash === 'b9c0cddf116b3ba8fb8eea843f6627b6c5c1867adf130d51923ab2fdece2467e') {
            var x = document.getElementById("solution-" + level);
            x.style.display = (x.style.display === "block") ? "none" : "block";
            if(x.style.display === "block") {
                setTimeout(() => x.scrollIntoView({behavior: 'smooth'}), 100);
            }
            return;
        }
        alert('⛔ Access Denied: Incorrect Password');
    }
}
