// Interview Questions Logic - 2025 Version

let currentLevel2025 = '';

function selectInterviewLevel2025(level) {
    if(typeof selectedYear !== 'undefined' && selectedYear !== '2025') return;
    
    currentLevel2025 = level;
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
    
    switchTopic2025(1);
}

function switchTopic2025(topicId) {
    document.querySelectorAll('.topic-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.topic-btn')[topicId - 1].classList.add('active');
    document.querySelectorAll('.topic-content').forEach(content => content.classList.add('hidden'));
    const topicSection = document.getElementById('topic-' + topicId);
    topicSection.classList.remove('hidden');
    
    document.querySelectorAll('.solution-section').forEach(sol => sol.style.display = 'none');
    
    // Show/hide Backend Testing tabs based on year
    if(topicId === 2) {
        const tabs2025 = document.getElementById('backend-tabs-2025');
        const tabs2026 = document.getElementById('backend-tabs-2026');
        if(tabs2025) {
            tabs2025.classList.remove('hidden');
            tabs2025.style.display = 'flex';
        }
        if(tabs2026) {
            tabs2026.classList.add('hidden');
            tabs2026.style.display = 'none';
        }
        switchSubTopic2025(2, 2); // Start with JSON (no API Assertion in 2025)
    }
    
    // Logic สำหรับ Topic 3 (Automated Testing) - แสดง sub-topic แรก
    if(topicId === 3) {
        switchSubTopic2025(3, 1);
    }
    
    // Logic เดิมของ Topic 1
    if(topicId === 1) {
        document.getElementById('logic-content-junior').classList.add('hidden');
        document.getElementById('logic-content-senior').classList.add('hidden');
        if(currentLevel2025 === 'junior') {
            document.getElementById('logic-content-junior').classList.remove('hidden');
        } else {
            document.getElementById('logic-content-senior').classList.remove('hidden');
        }
    }
}

function switchSubTopic2025(topicId, subTopicId) {
    // อัพเดทปุ่ม sub-topic สำหรับ Backend Testing (Topic 2)
    if(topicId === 2) {
        const btn1 = document.getElementById('backend-2025-btn-1');
        const btn2 = document.getElementById('backend-2025-btn-2');
        if(btn1 && btn2) {
            btn1.classList.remove('active');
            btn1.style.background = '#95a5a6';
            btn2.classList.remove('active');
            btn2.style.background = '#95a5a6';
            
            if(subTopicId === 2) {
                btn1.classList.add('active');
                btn1.style.background = '#3498db';
            } else if(subTopicId === 3) {
                btn2.classList.add('active');
                btn2.style.background = '#3498db';
            }
        }
    } else {
        // อัพเดทปุ่ม sub-topic สำหรับ topics อื่นๆ
        const parentTopic = document.getElementById('topic-' + topicId);
        const subButtons = parentTopic.querySelectorAll('.sub-topic-btn');
        subButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.style.background = '#95a5a6';
        });
        subButtons[subTopicId - 1].classList.add('active');
        subButtons[subTopicId - 1].style.background = '#3498db';
    }
    
    // แสดง/ซ่อน sub-topic content
    const parentTopic = document.getElementById('topic-' + topicId);
    const subContents = parentTopic.querySelectorAll('.sub-topic-content');
    subContents.forEach(content => content.classList.add('hidden'));
    const targetContent = document.getElementById('sub-topic-' + topicId + '-' + subTopicId);
    if(targetContent) {
        targetContent.classList.remove('hidden');
    }
    
    // Logic พิเศษสำหรับ SQL (Topic 2, Sub-topic 2)
    if(topicId === 2 && subTopicId === 2) {
        // Only handle if year 2025 is selected
        if(typeof selectedYear !== 'undefined' && selectedYear !== '2025') return;
        
        document.getElementById('sql-content-junior').classList.add('hidden');
        document.getElementById('sql-content-senior').classList.add('hidden');
        
        if(currentLevel2025 === 'junior') {
            document.getElementById('sql-content-junior').classList.remove('hidden');
        } else {
            document.getElementById('sql-content-senior').classList.remove('hidden');
        }
    }
    
    // Logic พิเศษสำหรับ JavaScript (Topic 3, Sub-topic 1)
    if(topicId === 3 && subTopicId === 1) {
        // Only handle if year 2025 is selected
        if(typeof selectedYear !== 'undefined' && selectedYear !== '2025') return;
        
        document.getElementById('js-junior-view').classList.add('hidden');
        document.getElementById('js-senior-view').classList.add('hidden');
        
        if(currentLevel2025 === 'junior') {
            document.getElementById('js-junior-view').classList.remove('hidden');
        } else {
            document.getElementById('js-senior-view').classList.remove('hidden');
        }
    }
    
    // Logic พิเศษสำหรับ Python (Topic 3, Sub-topic 2)
    if(topicId === 3 && subTopicId === 2) {
        // Only handle if year 2025 is selected
        if(typeof selectedYear !== 'undefined' && selectedYear !== '2025') return;
        
        document.getElementById('py-junior-view').classList.add('hidden');
        document.getElementById('py-senior-view').classList.add('hidden');
        
        if(currentLevel2025 === 'junior') {
            document.getElementById('py-junior-view').classList.remove('hidden');
        } else {
            document.getElementById('py-senior-view').classList.remove('hidden');
        }
    }
    
    // Logic พิเศษสำหรับ Robot Framework (Topic 3, Sub-topic 3)
    if(topicId === 3 && subTopicId === 3) {
        // Only handle if year 2025 is selected
        if(typeof selectedYear !== 'undefined' && selectedYear !== '2025') return;
        updateRfView2025();
    }
    
    // Logic พิเศษสำหรับ Cypress (Topic 3, Sub-topic 4)
    if(topicId === 3 && subTopicId === 4) {
        // Only handle if year 2025 is selected
        if(typeof selectedYear !== 'undefined' && selectedYear !== '2025') return;
        updateCyView2025();
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
let lastSelectedQuestion2025 = null;

function checkJsonAnswer(qId) {
    // Toggle if clicking the same button
    if(lastSelectedQuestion2025 === qId) {
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
    lastSelectedQuestion2025 = qId;
    
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
let lastSqlJuniorAnswer2025 = null;
let lastSqlSeniorAnswer2025 = null;

function checkSqlJunior(answer) {
    const feedback = document.getElementById('sql-junior-feedback');
    const buttons = document.querySelectorAll('#sql-content-junior .sql-btn');
    const index = (answer === 'A') ? 0 : (answer === 'B') ? 1 : (answer === 'C') ? 2 : 3;
    const clickedBtn = buttons[index];
    
    // Toggle if clicking the same button
    if(lastSqlJuniorAnswer2025 === answer) {
        buttons.forEach(btn => btn.className = 'sql-btn');
        feedback.classList.add('hidden');
        lastSqlJuniorAnswer2025 = null;
        return;
    }
    
    feedback.classList.remove('hidden', 'fb-success', 'fb-error');
    buttons.forEach(btn => btn.className = 'sql-btn');
    lastSqlJuniorAnswer2025 = answer;

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
    if(lastSqlSeniorAnswer2025 === answer) {
        buttons.forEach(btn => btn.className = 'sql-btn');
        feedback.classList.add('hidden');
        lastSqlSeniorAnswer2025 = null;
        return;
    }
    
    feedback.classList.remove('hidden', 'fb-success', 'fb-error');
    buttons.forEach(btn => btn.className = 'sql-btn');
    lastSqlSeniorAnswer2025 = answer;

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


// === JavaScript Coding Questions Logic ===
let lastJsJuniorAnswer2025 = null;
let lastJsSeniorAnswer2025 = null;

function checkJsAnswer(level, answer) {
    const isJunior = level === 'jr';
    const feedbackId = isJunior ? 'js-jr-feedback' : 'js-sr-feedback';
    const feedbackEl = document.getElementById(feedbackId);
    const viewId = isJunior ? 'js-junior-view' : 'js-senior-view';
    const buttons = document.getElementById(viewId).querySelectorAll('.code-opt-btn');
    const targetBtn = event.currentTarget;
    
    // Toggle if clicking the same button
    const lastAnswer = isJunior ? lastJsJuniorAnswer2025 : lastJsSeniorAnswer2025;
    if(lastAnswer === answer) {
        buttons.forEach(btn => btn.className = 'code-opt-btn');
        feedbackEl.classList.add('hidden');
        if(isJunior) lastJsJuniorAnswer2025 = null;
        else lastJsSeniorAnswer2025 = null;
        return;
    }
    
    feedbackEl.className = 'feedback-box hidden';
    buttons.forEach(btn => btn.className = 'code-opt-btn');
    
    if(isJunior) lastJsJuniorAnswer2025 = answer;
    else lastJsSeniorAnswer2025 = answer;

    let isCorrect = false;
    let msg = "";

    if(isJunior) {
        if(answer === 14) {
            isCorrect = true;
            msg = "✅ ถูกต้อง! (14)<br><small>การทำงานของ Loop: 6(บวก) → 4(ข้าม continue) → 8(บวก) → 10(หยุด break) ผลรวม = 6+8=14</small>";
        } else {
            msg = "❌ ผิด<br><small>ตรวจสอบการทำงานของ 'continue' (ข้ามรอบนี้) และ 'break' (หยุด loop ทันที)</small>";
        }
    } else {
        if(answer === '1005020') {
            isCorrect = true;
            msg = "✅ ถูกต้อง! ('1005020')<br><small>การแปลง Type: 100 + '50' = '10050' (ตัวเลขกลายเป็น String) จากนั้น '10050' + 20 = '1005020' (null ถูกข้าม)</small>";
        } else {
            msg = "❌ ผิด<br><small>JavaScript จะแปลงตัวเลขเป็น String เมื่อใช้ '+' กับ String (ต่อข้อความแทนที่จะบวก)</small>";
        }
    }

    if(isCorrect) {
        targetBtn.classList.add('correct');
        feedbackEl.innerHTML = msg;
        feedbackEl.classList.add('fb-success');
    } else {
        targetBtn.classList.add('wrong');
        feedbackEl.innerHTML = msg;
        feedbackEl.classList.add('fb-error');
    }
    feedbackEl.classList.remove('hidden');
}


// === Python Coding Questions Logic ===
let lastPyJuniorAnswer2025 = null;
let lastPySeniorAnswer2025 = null;

function checkPyAnswer(level, answer) {
    const isJunior = level === 'jr';
    const feedbackId = isJunior ? 'py-jr-feedback' : 'py-sr-feedback';
    const feedbackEl = document.getElementById(feedbackId);
    const viewId = isJunior ? 'py-junior-view' : 'py-senior-view';
    const buttons = document.getElementById(viewId).querySelectorAll('.code-opt-btn');
    const targetBtn = event.currentTarget;
    
    // Toggle if clicking the same button
    const lastAnswer = isJunior ? lastPyJuniorAnswer2025 : lastPySeniorAnswer2025;
    if(lastAnswer === answer) {
        buttons.forEach(btn => btn.className = 'code-opt-btn');
        feedbackEl.classList.add('hidden');
        if(isJunior) lastPyJuniorAnswer2025 = null;
        else lastPySeniorAnswer2025 = null;
        return;
    }
    
    feedbackEl.className = 'feedback-box hidden';
    buttons.forEach(btn => btn.className = 'code-opt-btn');
    
    if(isJunior) lastPyJuniorAnswer2025 = answer;
    else lastPySeniorAnswer2025 = answer;

    let isCorrect = false;
    let msg = "";

    if(isJunior) {
        if(answer === 14) {
            isCorrect = true;
            msg = "✅ ถูกต้อง! (14)<br><small>การทำงานของ Loop: 6(บวก) → 4(ข้าม continue) → 8(บวก) → 10(หยุด break) ผลรวม = 6+8=14</small>";
        } else {
            msg = "❌ ผิด<br><small>ตรวจสอบการทำงานของ 'continue' (ข้ามรอบนี้) และ 'break' (หยุด loop ทันที)</small>";
        }
    } else {
        if(answer === 'Error') {
            isCorrect = true;
            msg = "✅ ถูกต้อง! (TypeError)<br><small>Python จะเกิด TypeError เมื่อพยายามบวก int + str (100 + \"50\") เพราะ Python ไม่ทำ Type Coercion อัตโนมัติเหมือน JavaScript</small>";
        } else {
            msg = "❌ ผิด<br><small>Python เข้มงวดเรื่อง Type มากกว่า JavaScript จะไม่แปลง Type อัตโนมัติ การบวก int + str จะเกิด TypeError ทันที</small>";
        }
    }

    if(isCorrect) {
        targetBtn.classList.add('correct');
        feedbackEl.innerHTML = msg;
        feedbackEl.classList.add('fb-success');
    } else {
        targetBtn.classList.add('wrong');
        feedbackEl.innerHTML = msg;
        feedbackEl.classList.add('fb-error');
    }
    feedbackEl.classList.remove('hidden');
}



// === Robot Framework Logic ===

let lastRfJuniorAnswer2025 = null;
let lastRfSeniorAnswer2025 = null;

function updateRfView2025() {
    // Only handle if year 2025 is selected
    if(typeof selectedYear !== 'undefined' && selectedYear !== '2025') return;
    
    document.getElementById('rf-junior-view').classList.add('hidden');
    document.getElementById('rf-senior-view').classList.add('hidden');
    
    if(currentLevel2025 === 'junior') {
        document.getElementById('rf-junior-view').classList.remove('hidden');
    } else {
        document.getElementById('rf-senior-view').classList.remove('hidden');
    }
}

function checkRfAnswer(level, answer) {
    const isJunior = level === 'jr';
    const feedbackId = isJunior ? 'rf-jr-feedback' : 'rf-sr-feedback';
    const feedbackEl = document.getElementById(feedbackId);
    
    // Clear previous
    feedbackEl.className = 'feedback-box hidden';
    const viewId = isJunior ? 'rf-junior-view' : 'rf-senior-view';
    const buttons = document.getElementById(viewId).querySelectorAll('.code-opt-btn');
    buttons.forEach(btn => btn.className = 'code-opt-btn');

    const targetBtn = event.currentTarget;
    
    // Toggle if clicking the same button
    const lastAnswer = isJunior ? lastRfJuniorAnswer2025 : lastRfSeniorAnswer2025;
    if(lastAnswer === answer) {
        feedbackEl.classList.add('hidden');
        if(isJunior) lastRfJuniorAnswer2025 = null;
        else lastRfSeniorAnswer2025 = null;
        return;
    }
    
    if(isJunior) lastRfJuniorAnswer2025 = answer;
    else lastRfSeniorAnswer2025 = answer;

    let isCorrect = false;
    let msg = "";

    if(isJunior) {
        // Answer: B (Default value "1234" is used)
        if(answer === 'default') {
            isCorrect = true;
            msg = "✅ ถูกต้อง! ('1234')<br><small>เมื่อเรียกใช้ Keyword โดย <b>ไม่ส่ง Argument ตัวที่ 2</b> (password) ระบบจะใช้ค่า Default ที่กำหนดไว้ใน [Arguments] คือ '1234' <br>หมายเหตุ: ตัวแปร ${password} ที่ประกาศไว้ไม่ได้ถูกส่งเข้าไปใน Keyword เพราะไม่ได้ระบุในการเรียกใช้</small>";
        } else if (answer === 'pass999') {
            msg = "❌ ผิด<br><small>ตัวแปร ${password} ถูกประกาศไว้ในส่วน Variables แต่ <b>ไม่ได้ถูกส่งเข้าไป</b>ในการเรียกใช้ Keyword (Line 8 ส่งแค่ 'Admin' เท่านั้น)</small>";
        } else if (answer === 'admin') {
            msg = "❌ ผิด<br><small>'Admin' คือ Argument ตัวที่ 1 (username) ไม่ใช่ password ลองสังเกตลำดับการส่ง Argument อีกครั้ง</small>";
        } else {
            msg = "❌ ผิด<br><small>ลองนับจำนวน Argument ที่ส่งเข้าไป: มีแค่ 1 Argument คือ 'Admin' (username) เท่านั้น</small>";
        }
    } else {
        // Answer: B (Cascading Failure - orphan browser)
        if(answer === 'orphan') {
            isCorrect = true;
            msg = "✅ ถูกต้อง! (เสี่ยงต่อระบบรวน)<br><small><b>คำอธิบาย:</b> หากบรรทัดที่ 9 พัง Test Case จะหยุดทำงานทันที ทำให้คำสั่ง <code>Close Browser</code> ด้านล่างไม่ถูกเรียกใช้งาน ผลคือ Browser จะเปิดค้างไว้ (Zombie Browser) กิน Ram และทำให้ Test Case ข้อถัดไปพังตามไปด้วย (Cascading Failure) <br><b>วิธีแก้:</b> ต้องย้าย <code>Close Browser</code> ไปใส่ในส่วน <code>[Teardown]</code> เพื่อการันตีว่ามันจะถูกรันเสมอ</small>";
        } else if (answer === 'syntax') {
            msg = "❌ ผิด <br><small>คำสั่ง <code>Open Browser</code> สามารถใช้ที่ไหนก็ได้ (Test Case หรือ Keyword) ไม่จำเป็นต้องอยู่ใน Settings เสมอไป</small>";
        } else if (answer === 'hardcode') {
            msg = "⚠️ เป็นคำตอบที่ 'ถูกแต่ไม่ใช่ประเด็นหลัก'<br><small>การ Hardcode เป็นสิ่งไม่ดีก็จริง แต่มันไม่ทำให้ระบบ Test พังพินาศ (System Instability) เหมือนการไม่คืนค่า Environment ในข้อ B</small>";
        } else {
            msg = "❌ ผิด <br><small>ตัวแปรอาจจะถูก Import มาจาก Resource File อื่นก็ได้ ปัญหาหลักข้อนี้อยู่ที่การจัดการ Error Handling</small>";
        }
    }

    if(isCorrect) {
        targetBtn.classList.add('correct');
        feedbackEl.innerHTML = msg;
        feedbackEl.classList.add('fb-success');
    } else {
        targetBtn.classList.add('wrong');
        feedbackEl.innerHTML = msg;
        feedbackEl.classList.add('fb-error');
    }
    feedbackEl.classList.remove('hidden');
}


// === Cypress Logic ===

let lastCyJuniorAnswer2025 = null;
let lastCySeniorAnswer2025 = null;

function updateCyView2025() {
    // Only handle if year 2025 is selected
    if(typeof selectedYear !== 'undefined' && selectedYear !== '2025') return;
    
    document.getElementById('cy-junior-view').classList.add('hidden');
    document.getElementById('cy-senior-view').classList.add('hidden');
    
    if(currentLevel2025 === 'junior') {
        document.getElementById('cy-junior-view').classList.remove('hidden');
    } else {
        document.getElementById('cy-senior-view').classList.remove('hidden');
    }
}

function checkCyAnswer(level, answer) {
    const isJunior = level === 'jr';
    const feedbackId = isJunior ? 'cy-jr-feedback' : 'cy-sr-feedback';
    const feedbackEl = document.getElementById(feedbackId);
    
    // Clear previous
    feedbackEl.className = 'feedback-box hidden';
    const viewId = isJunior ? 'cy-junior-view' : 'cy-senior-view';
    const buttons = document.getElementById(viewId).querySelectorAll('.code-opt-btn');
    buttons.forEach(btn => btn.className = 'code-opt-btn');

    const targetBtn = event.currentTarget;
    
    // Toggle if clicking the same button
    const lastAnswer = isJunior ? lastCyJuniorAnswer2025 : lastCySeniorAnswer2025;
    if(lastAnswer === answer) {
        feedbackEl.classList.add('hidden');
        if(isJunior) lastCyJuniorAnswer2025 = null;
        else lastCySeniorAnswer2025 = null;
        return;
    }
    
    if(isJunior) lastCyJuniorAnswer2025 = answer;
    else lastCySeniorAnswer2025 = answer;

    let isCorrect = false;
    let msg = "";

    if(isJunior) {
        // Answer: C (Correctly clicks Submit)
        if(answer === 'submit') {
            isCorrect = true;
            msg = "✅ ถูกต้อง! (คลิกปุ่ม Submit)<br><small><b>คำอธิบาย:</b> `cy.get('.btn')` จะดึงปุ่มทั้งหมดมาเป็น List แต่เมื่อเราต่อท้าย (Chain) ด้วย `.contains('Submit')` Cypress จะฉลาดพอที่จะ **กรอง (Filter)** เอาเฉพาะปุ่มที่มีข้อความตรงกัน แล้วค่อยสั่ง Click ครับ</small>";
        } else if (answer === 'error') {
            msg = "❌ ผิด <br><small>Cypress ยอมให้ `cy.get` คืนค่าหลาย Element ได้ครับ แต่ถ้าสั่ง `.click()` ทันทีโดยไม่กรองก่อน ถึงจะ Error (แต่นี่เรากรองด้วย contains แล้ว)</small>";
        } else {
            msg = "❌ ผิด <br><small>`.contains()` เป็นคำสั่ง Filter ที่ทรงพลังครับ มันจะไม่คลิกตัวแรก (Cancel) แบบสุ่มสี่สุ่มห้า แต่จะหาตัวที่มีข้อความตรงกันเท่านั้น</small>";
        }
    } else {
        // Answer: B (Sync/Async Mix)
        if(answer === 'async') {
            isCorrect = true;
            msg = "✅ ถูกต้อง! (Sync/Async ไม่สัมพันธ์กัน)<br><small><b>คำอธิบาย:</b> คำสั่ง Cypress เป็น Asynchronous (ทำทีหลัง) แต่ตัวแปร `let/var` เป็น Synchronous (ทำเลย) ในบางจังหวะ Test Case อาจจะเริ่มรัน **ก่อน** ที่ `fixture` จะโหลดข้อมูลเสร็จ ทำให้ `userData` ไม่มีค่า <br><b>วิธีแก้:</b> ควรใช้ Cypress Alias: `cy.fixture('users').as('userData')` แทนการใช้ตัวแปร JS ปกติครับ</small>";
        } else if (answer === 'scope') {
            msg = "❌ ผิด <br><small>ตัวแปร Global สามารถเข้าถึงได้ตามปกติครับ (Scope ถูกต้อง) แต่ปัญหาอยู่ที่ 'Timing' (เวลาในการโหลดข้อมูลที่ไม่พร้อมกัน)</small>";
        } else {
            msg = "❌ ผิด <br><small>นี่คือ Anti-Pattern (ข้อห้าม) ที่พบบ่อยที่สุดที่ทำให้ Test เดี๋ยวผ่านเดี๋ยวพัง (Flaky) ใน Cypress ครับ</small>";
        }
    }

    if(isCorrect) {
        targetBtn.classList.add('correct');
        feedbackEl.innerHTML = msg;
        feedbackEl.classList.add('fb-success');
    } else {
        targetBtn.classList.add('wrong');
        feedbackEl.innerHTML = msg;
        feedbackEl.classList.add('fb-error');
    }
    feedbackEl.classList.remove('hidden');
}
