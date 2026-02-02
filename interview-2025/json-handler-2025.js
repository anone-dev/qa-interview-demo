// JSON Path Question Handler - 2025 Version (Independent)

let lastSelectedQuestion2025 = null;

function checkJsonAnswer2025(qId) {
    if(typeof selectedYear !== 'undefined' && selectedYear !== '2025') return;
    
    // Toggle if clicking the same button
    if(lastSelectedQuestion2025 === qId) {
        document.querySelectorAll('.json-val, .json-obj, span').forEach(el => {
            el.classList.remove('highlight-answer', 'highlight-block');
        });
        document.querySelectorAll('.json-btn').forEach(btn => btn.classList.remove('active-q'));
        document.getElementById('json-result-display').classList.add('hidden');
        lastSelectedQuestion2025 = null;
        return;
    }
    
    document.querySelectorAll('.json-val, .json-obj, span').forEach(el => {
        el.classList.remove('highlight-answer', 'highlight-block');
    });
    document.querySelectorAll('.json-btn').forEach(btn => btn.classList.remove('active-q'));
    
    const buttons = document.querySelectorAll('.json-btn');
    buttons[qId-1].classList.add('active-q');
    lastSelectedQuestion2025 = qId;
    
    const resultBox = document.getElementById('json-result-display');
    const outputText = document.getElementById('json-output-text');
    resultBox.classList.remove('hidden');

    switch(qId) {
        case 1:
            document.getElementById('ans-1').classList.add('highlight-answer');
            outputText.innerText = '"Java"';
            break;
        case 2:
            document.getElementById('ans-bob').classList.add('highlight-answer');
            outputText.innerText = '["Bob"]';
            break;
        case 3:
            document.getElementById('ans-alice').classList.add('highlight-answer');
            document.getElementById('ans-charlie').classList.add('highlight-answer');
            outputText.innerText = '["Alice", "Charlie"]';
            break;
        case 4:
            document.getElementById('ans-4').classList.add('highlight-answer');
            document.getElementById('ans-4-val').classList.add('highlight-answer');
            outputText.innerText = '[["Python"]]';
            break;
        case 5:
            document.getElementById('ans-sal-alice').classList.add('highlight-answer');
            document.getElementById('ans-sal-bob').classList.add('highlight-answer');
            document.getElementById('ans-sal-charlie').classList.add('highlight-answer');
            outputText.innerText = '[60000, 45000, 80000]';
            break;
    }
}
