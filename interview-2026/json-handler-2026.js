// JSON Path Question Handler - 2026 Version (Independent)

let lastSelectedQuestion2026 = null;

function checkJsonAnswer2026(qId) {
    if(selectedYear !== '2026') return;
    
    // Toggle if clicking the same button
    if(lastSelectedQuestion2026 === qId) {
        document.querySelectorAll('#sub-topic-2-2-2026 .json-val, #sub-topic-2-2-2026 .json-obj, #sub-topic-2-2-2026 span').forEach(el => {
            el.classList.remove('highlight-answer', 'highlight-block');
        });
        document.querySelectorAll('#sub-topic-2-2-2026 .json-btn').forEach(btn => btn.classList.remove('active-q'));
        document.getElementById('json-result-display-2026').classList.add('hidden');
        lastSelectedQuestion2026 = null;
        return;
    }
    
    document.querySelectorAll('#sub-topic-2-2-2026 .json-val, #sub-topic-2-2-2026 .json-obj, #sub-topic-2-2-2026 span').forEach(el => {
        el.classList.remove('highlight-answer', 'highlight-block');
    });
    document.querySelectorAll('#sub-topic-2-2-2026 .json-btn').forEach(btn => btn.classList.remove('active-q'));
    
    const buttons = document.querySelectorAll('#sub-topic-2-2-2026 .json-btn');
    buttons[qId-1].classList.add('active-q');
    lastSelectedQuestion2026 = qId;
    
    const resultBox = document.getElementById('json-result-display-2026');
    const outputText = document.getElementById('json-output-text-2026');
    resultBox.classList.remove('hidden');

    switch(qId) {
        case 1:
            outputText.innerText = 'undefined (Bob has only 1 skill)';
            break;
        case 2:
            document.getElementById('ans-alice-2026').classList.add('highlight-answer');
            document.getElementById('ans-charlie-2026').classList.add('highlight-answer');
            outputText.innerText = '["Alice", "Charlie"]';
            break;
        case 3:
            document.getElementById('ans-sal-alice-2026').classList.add('highlight-answer');
            document.getElementById('ans-sal-bob-2026').classList.add('highlight-answer');
            document.getElementById('ans-sal-charlie-2026').classList.add('highlight-answer');
            outputText.innerText = '[60000, 45000, 80000]';
            break;
    }
}
