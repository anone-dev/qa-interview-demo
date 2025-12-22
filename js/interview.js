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
    const topicSection = document.getElementById('topic-' + topicId);
    topicSection.classList.remove('hidden');
    
    document.querySelectorAll('.solution-section').forEach(sol => sol.style.display = 'none');
    
    // Logic สำหรับ Topic 2 (Backend Testing) - แสดง sub-topic แรก
    if(topicId === 2) {
        switchSubTopic(2, 1);
    }
    
    // Logic สำหรับ Topic 3 (Automated Testing) - แสดง sub-topic แรก
    if(topicId === 3) {
        switchSubTopic(3, 1);
    }
    
    // Logic เดิมของ Topic 1
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

function switchSubTopic(topicId, subTopicId) {
    // อัพเดทปุ่ม sub-topic
    const parentTopic = document.getElementById('topic-' + topicId);
    const subButtons = parentTopic.querySelectorAll('.sub-topic-btn');
    subButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.style.background = '#95a5a6';
    });
    subButtons[subTopicId - 1].classList.add('active');
    subButtons[subTopicId - 1].style.background = '#3498db';
    
    // แสดง/ซ่อน sub-topic content
    const subContents = parentTopic.querySelectorAll('.sub-topic-content');
    subContents.forEach(content => content.classList.add('hidden'));
    const targetContent = document.getElementById('sub-topic-' + topicId + '-' + subTopicId);
    if(targetContent) {
        targetContent.classList.remove('hidden');
    }
    
    // Logic พิเศษสำหรับ SQL (Topic 2, Sub-topic 2)
    if(topicId === 2 && subTopicId === 2) {
        document.getElementById('sql-content-junior').classList.add('hidden');
        document.getElementById('sql-content-senior').classList.add('hidden');
        
        if(currentLevel === 'junior') {
            document.getElementById('sql-content-junior').classList.remove('hidden');
        } else {
            document.getElementById('sql-content-senior').classList.remove('hidden');
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

// === SQL Interactive Logic ===
let lastSqlJuniorAnswer = null;
let lastSqlSeniorAnswer = null;

function checkSqlJunior(answer) {
    const feedback = document.getElementById('sql-junior-feedback');
    const buttons = document.querySelectorAll('#sql-content-junior .sql-btn');
    const index = (answer === 'A') ? 0 : (answer === 'B') ? 1 : (answer === 'C') ? 2 : 3;
    const clickedBtn = buttons[index];
    
    // Toggle if clicking the same button
    if(lastSqlJuniorAnswer === answer) {
        buttons.forEach(btn => btn.className = 'sql-btn');
        feedback.classList.add('hidden');
        lastSqlJuniorAnswer = null;
        return;
    }
    
    feedback.classList.remove('hidden', 'fb-success', 'fb-error');
    buttons.forEach(btn => btn.className = 'sql-btn');
    lastSqlJuniorAnswer = answer;

    if(answer === 'C') {
        clickedBtn.classList.add('correct');
        feedback.innerHTML = "✅ ถูกต้อง!<br><small>มีการใช้ Inner Join เชื่อม Key ได้ถูกต้อง (PK = FK) และใช้เครื่องหมายตรวจสอบยอดเงิน > 1000 ได้ตรงตามโจทย์</small>";
        feedback.classList.add('fb-success');
    } else {
        clickedBtn.classList.add('wrong');
        feedback.classList.add('fb-error');
        if(answer === 'A') feedback.innerHTML = "❌ ผิด<br><small>การระบุชื่อตารางต่อกันโดยไม่มีเงื่อนไข Join จะทำให้เกิด Cartesian Product<br>คือการนำทุกแถวของตารางแรก ไปจับคู่กับทุกแถวของตารางที่สอง ทำให้ข้อมูลเบิ้ลและผิดเพี้ยน (Cross Join)</small>";
        if(answer === 'B') feedback.innerHTML = "❌ ผิด<br><small>จับคู่ Key ผิด!<br>คุณไม่สามารถนำ Customer ID ไปเชื่อมกับ Order ID ได้ (คนละความหมายกัน) ต้องเชื่อมกับ Customer ID ในตาราง Orders ถึงจะถูก</small>";
        if(answer === 'D') feedback.innerHTML = "❌ ผิด<br><small>ตรวจสอบเครื่องหมายทางคณิตศาสตร์<br>โจทย์ต้องการยอดที่ มากกว่า 1,000 แต่ใน Code ใช้เครื่องหมาย น้อยกว่า (<)</small>";
    }
}

function checkSqlSenior(answer) {
    const feedback = document.getElementById('sql-senior-feedback');
    const buttons = document.querySelectorAll('#sql-content-senior .sql-btn');
    const index = (answer === 'A') ? 0 : (answer === 'B') ? 1 : (answer === 'C') ? 2 : 3;
    const clickedBtn = buttons[index];
    
    // Toggle if clicking the same button
    if(lastSqlSeniorAnswer === answer) {
        buttons.forEach(btn => btn.className = 'sql-btn');
        feedback.classList.add('hidden');
        lastSqlSeniorAnswer = null;
        return;
    }
    
    feedback.classList.remove('hidden', 'fb-success', 'fb-error');
    buttons.forEach(btn => btn.className = 'sql-btn');
    lastSqlSeniorAnswer = answer;

    if(answer === 'B') {
        clickedBtn.classList.add('correct');
        feedback.innerHTML = "✅ ถูกต้อง!<br><small>การใช้ Subquery ร่วมกับ NOT IN (ไม่อยู่ใน...) เป็นวิธีที่สะอาดและเข้าใจง่ายที่สุดในการหาข้อมูลที่ขาดหายไป โดยไม่ต้องกังวลเรื่อง Join Type</small>";
        feedback.classList.add('fb-success');
    } else {
        clickedBtn.classList.add('wrong');
        feedback.classList.add('fb-error');
        if(answer === 'A') feedback.innerHTML = "❌ ผิด<br><small>Inner Join จะตัดแถวที่ไม่เข้าคู่ออกไปก่อน<br>ทำให้ลูกค้าที่ไม่มีออเดอร์ (Bob) ถูกตัดทิ้งไปตั้งแต่บรรทัด Join แล้ว ดังนั้นเงื่อนไข WHERE ... IS NULL จึงหาใครไม่เจอเลย (ถ้าจะใช้ท่านี้ต้องเป็น LEFT JOIN)</small>";
        if(answer === 'C') feedback.innerHTML = "❌ ผิดตรรกะ (Logic Error)<br><small>คำสั่ง IN จะค้นหาลูกค้าที่ มี ออเดอร์อยู่ในระบบ ซึ่งเป็นสิ่งตรงกันข้ามกับที่โจทย์ต้องการ</small>";
        if(answer === 'D') feedback.innerHTML = "❌ ผิดไวยากรณ์ (Syntax Error)<br><small>ใน SQL เราไม่สามารถใช้เครื่องหมาย != (ไม่เท่ากับ) เปรียบเทียบค่าเดียว กับ List ของข้อมูลจำนวนมากจาก Subquery ได้ (ต้องใช้ NOT IN เท่านั้น)</small>";
    }
}
