// Interview Questions Logic

let currentLevel = '';

function selectInterviewLevel(level) {
    currentLevel = level;
    document.querySelectorAll('.level-card').forEach(card => {
        card.classList.remove('selected-junior', 'selected-senior');
    });
    
    if(level === 'junior') {
        document.querySelector('.level-card.junior').classList.add('selected-junior');
    } else {
        document.querySelector('.level-card.senior').classList.add('selected-senior');
    }
    
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

function switchTopic(topicId) {
    document.querySelectorAll('.topic-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.topic-btn')[topicId - 1].classList.add('active');
    document.querySelectorAll('.topic-content').forEach(content => content.classList.add('hidden'));
    document.getElementById('topic-' + topicId).classList.remove('hidden');
    
    document.querySelectorAll('.solution-section').forEach(sol => sol.style.display = 'none');
    
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

// JSON Interactive Logic
let lastSelectedQuestion = null;

function checkJsonAnswer(qId) {
    // Toggle if clicking the same button
    if(lastSelectedQuestion === qId) {
        document.querySelectorAll('.json-val, .json-obj, span').forEach(el => {
            el.classList.remove('highlight-answer');
            el.classList.remove('highlight-block');
        });
        document.querySelectorAll('.json-btn').forEach(btn => btn.classList.remove('active-q'));
        document.getElementById('json-result-display').classList.add('hidden');
        lastSelectedQuestion = null;
        return;
    }
    
    document.querySelectorAll('.json-val, .json-obj, span').forEach(el => {
        el.classList.remove('highlight-answer');
        el.classList.remove('highlight-block');
    });
    document.querySelectorAll('.json-btn').forEach(btn => btn.classList.remove('active-q'));
    
    const buttons = document.querySelectorAll('.json-btn');
    buttons[qId-1].classList.add('active-q');
    lastSelectedQuestion = qId;
    
    const resultBox = document.getElementById('json-result-display');
    const outputText = document.getElementById('json-output-text');
    resultBox.classList.remove('hidden');

    switch(qId) {
        case 1: // $.members[0].skills[0]
            document.getElementById('ans-1').classList.add('highlight-answer');
            outputText.innerText = '"Java"';
            break;
        case 2: // $.members[?(@.is_active == false)].name
            document.getElementById('ans-bob').classList.add('highlight-answer');
            outputText.innerText = '["Bob"]';
            break;
        case 3: // $.members[?(@.salary > 50000)].name
            document.getElementById('ans-alice').classList.add('highlight-answer');
            document.getElementById('ans-charlie').classList.add('highlight-answer');
            outputText.innerText = '["Alice", "Charlie"]';
            break;
        case 4: // $.members[?(@.name == 'Bob')].skills
            document.getElementById('ans-4').classList.add('highlight-answer');
            document.getElementById('ans-4-val').classList.add('highlight-answer');
            outputText.innerText = '[["Python"]]';
            break;
        case 5: // $.members[*].salary
            document.getElementById('ans-sal-alice').classList.add('highlight-answer');
            document.getElementById('ans-sal-bob').classList.add('highlight-answer');
            document.getElementById('ans-sal-charlie').classList.add('highlight-answer');
            outputText.innerText = '[60000, 45000, 80000]';
            break;
    }
}
