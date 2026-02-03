// Interview Questions Logic - 2026 Version (Enhanced)

let currentLevel2026 = '';

function selectInterviewLevel2026(level) {
    if (selectedYear !== '2026') return; // Only work for 2026
    
    currentLevel2026 = level;
    
    // Update descriptions for 2026
    updateLevelDescriptions2026();
    
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
        headerTitle.innerText = "Junior Level (2026 Enhanced)"; 
        headerBox.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"; 
    } else { 
        headerTitle.innerText = "Senior Level (2026 Enhanced)"; 
        headerBox.style.background = "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"; 
    }
    
    switchTopic2026(1);
}

function updateLevelDescriptions2026() {
    if (selectedYear !== '2026') return;
    
    const juniorDesc = document.getElementById('junior-desc');
    const seniorDesc = document.getElementById('senior-desc');
    
    if (juniorDesc) {
        juniorDesc.textContent = '3 Real-World Scenarios: Delivery Fee, Login Lockout, Leave Request (2-5 Years Exp.)';
    }
    
    if (seniorDesc) {
        seniorDesc.textContent = '3 Complex Scenarios: Parking System, Discount Logic, ATM Limits (5+ Years Exp.)';
    }
}

function switchTopic2026(topicId) {
    if (selectedYear !== '2026') return; // Only work for 2026
    
    document.querySelectorAll('.topic-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.topic-btn')[topicId - 1].classList.add('active');
    document.querySelectorAll('.topic-content').forEach(content => content.classList.add('hidden'));
    const topicSection = document.getElementById('topic-' + topicId);
    topicSection.classList.remove('hidden');
    
    document.querySelectorAll('.solution-section').forEach(sol => sol.style.display = 'none');
    
    // Hide all 2026 logic content when switching topics
    const junior2026 = document.getElementById('logic-content-junior-2026');
    const senior2026 = document.getElementById('logic-content-senior-2026');
    if(junior2026) junior2026.classList.add('hidden');
    if(senior2026) senior2026.classList.add('hidden');
    
    // Show/hide Backend Testing tabs based on year
    if(topicId === 2) {
        const tabs2025 = document.getElementById('backend-tabs-2025');
        const tabs2026 = document.getElementById('backend-tabs-2026');
        if(tabs2025) {
            tabs2025.classList.add('hidden');
            tabs2025.style.display = 'none';
        }
        if(tabs2026) {
            tabs2026.classList.remove('hidden');
            tabs2026.style.display = 'flex';
        }
        switchSubTopic2026(2, 1); // Start with API Assertion for 2026
    }
    
    // Logic สำหรับ Topic 3 (Automated Testing) - แสดง sub-topic แรก
    if(topicId === 3) {
        // Hide JavaScript and Python buttons for 2026, show Playwright
        const jsBtn = document.querySelector('.sub-topic-btn[onclick*="switchSubTopic2026(3, 1)"]');
        const pyBtn = document.querySelector('.sub-topic-btn[onclick*="switchSubTopic2026(3, 2)"]');
        const pwBtn = document.getElementById('playwright-btn');
        if(jsBtn) jsBtn.style.display = 'none';
        if(pyBtn) pyBtn.style.display = 'none';
        if(pwBtn) pwBtn.style.display = 'inline-block'; // Show Playwright for 2026
        
        switchSubTopic2026(3, 3); // Start with Robot Framework for 2026
    }
    
    // Logic เดิมของ Topic 1 (Logic Exam)
    if(topicId === 1) {
        document.getElementById('logic-content-junior').classList.add('hidden');
        document.getElementById('logic-content-senior').classList.add('hidden');
        
        if(currentLevel2026 === 'junior') {
            // Use 2026 version for junior if available
            if(junior2026) {
                junior2026.classList.remove('hidden');
                // Initialize first scenario
                switchJrLogic(1);
            } else {
                document.getElementById('logic-content-junior').classList.remove('hidden');
            }
        } else if(currentLevel2026 === 'senior') {
            // Use 2026 version for senior if available
            if(senior2026) {
                senior2026.classList.remove('hidden');
                // Initialize first scenario
                switchLogicScenario(1);
            } else {
                document.getElementById('logic-content-senior').classList.remove('hidden');
            }
        }
    }
}

function switchSubTopic2026(topicId, subTopicId) {
    if (selectedYear !== '2026') return; // Only work for 2026
    
    // อัพเดทปุ่ม sub-topic สำหรับ Backend Testing (Topic 2)
    if(topicId === 2) {
        const btn1 = document.getElementById('backend-2026-btn-1');
        const btn2 = document.getElementById('backend-2026-btn-2');
        const btn3 = document.getElementById('backend-2026-btn-3');
        if(btn1 && btn2 && btn3) {
            btn1.classList.remove('active');
            btn1.style.background = '#95a5a6';
            btn2.classList.remove('active');
            btn2.style.background = '#95a5a6';
            btn3.classList.remove('active');
            btn3.style.background = '#95a5a6';
            
            if(subTopicId === 1) {
                btn1.classList.add('active');
                btn1.style.background = '#3498db';
            } else if(subTopicId === 2) {
                btn2.classList.add('active');
                btn2.style.background = '#3498db';
            } else if(subTopicId === 3) {
                btn3.classList.add('active');
                btn3.style.background = '#3498db';
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
    
    let targetContent;
    if(topicId === 2 && subTopicId === 2) {
        targetContent = document.getElementById('sub-topic-2-2-2026');
    } else {
        targetContent = document.getElementById('sub-topic-' + topicId + '-' + subTopicId);
    }
    if(targetContent) {
        targetContent.classList.remove('hidden');
    }
    
    // Logic พิเศษสำหรับ API Assertion (Topic 2, Sub-topic 1)
    if(topicId === 2 && subTopicId === 1) {
        const apiJr = document.getElementById('api-assertion-junior');
        const apiSr = document.getElementById('api-assertion-senior');
        if(apiJr) apiJr.classList.add('hidden');
        if(apiSr) apiSr.classList.add('hidden');
        
        const jrAns = document.getElementById('jr-api-ans-2026');
        const srAns = document.getElementById('api-ans-2026');
        if(jrAns) {
            jrAns.classList.add('hidden');
            jrAns.style.display = 'none';
        }
        if(srAns) {
            srAns.classList.add('hidden');
            srAns.style.display = 'none';
        }
        
        if(currentLevel2026 === 'junior') {
            if(apiJr) apiJr.classList.remove('hidden');
        } else {
            if(apiSr) apiSr.classList.remove('hidden');
        }
    }
    
    // Logic พิเศษสำหรับ JSON (Topic 2, Sub-topic 2) - Reset state
    if(topicId === 2 && subTopicId === 2) {
        if(selectedYear !== '2026') return;
        resetJsonState2026();
    }
    
    // Logic พิเศษสำหรับ SQL (Topic 2, Sub-topic 3)
    if(topicId === 2 && subTopicId === 3) {
        const sqlJr2025 = document.getElementById('sql-content-junior-2025');
        const sqlSr2025 = document.getElementById('sql-content-senior-2025');
        const sqlJr2026 = document.getElementById('sql-content-junior-2026');
        const sqlSr2026 = document.getElementById('sql-content-senior-2026');
        
        // Hide all SQL content first
        if(sqlJr2025) sqlJr2025.classList.add('hidden');
        if(sqlSr2025) sqlSr2025.classList.add('hidden');
        if(sqlJr2026) sqlJr2026.classList.add('hidden');
        if(sqlSr2026) sqlSr2026.classList.add('hidden');
        
        // Show 2026 SQL content based on level
        if(currentLevel2026 === 'junior') {
            if(sqlJr2026) sqlJr2026.classList.remove('hidden');
        } else {
            if(sqlSr2026) sqlSr2026.classList.remove('hidden');
        }
    }
    
    // Logic พิเศษสำหรับ JavaScript (Topic 3, Sub-topic 1)
    if(topicId === 3 && subTopicId === 1) {
        const jsJr = document.getElementById('js-junior-view');
        const jsSr = document.getElementById('js-senior-view');
        const jsJr26 = document.getElementById('js-junior-view-2026');
        const jsSr26 = document.getElementById('js-senior-view-2026');
        if(jsJr) jsJr.classList.add('hidden');
        if(jsSr) jsSr.classList.add('hidden');
        if(jsJr26) jsJr26.classList.add('hidden');
        if(jsSr26) jsSr26.classList.add('hidden');
        
        if(currentLevel2026 === 'junior') {
            // For 2026 Junior Level - JavaScript content is removed
            // Show empty message or redirect to other sections
        } else {
            // For 2026 Senior Level - JavaScript content is removed
            // Show empty message or redirect to other sections
        }
    }
    
    // Logic พิเศษสำหรับ Python (Topic 3, Sub-topic 2)
    if(topicId === 3 && subTopicId === 2) {
        const pyJr = document.getElementById('py-junior-view');
        const pySr = document.getElementById('py-senior-view');
        const pyJr26 = document.getElementById('py-junior-view-2026');
        const pySr26 = document.getElementById('py-senior-view-2026');
        if(pyJr) pyJr.classList.add('hidden');
        if(pySr) pySr.classList.add('hidden');
        if(pyJr26) pyJr26.classList.add('hidden');
        if(pySr26) pySr26.classList.add('hidden');
        
        if(currentLevel2026 === 'junior') {
            // For 2026 Junior Level - Python content is removed
            // Show empty message or redirect to other sections
        } else {
            // For 2026 Senior Level - Python content is removed
            // Show empty message or redirect to other sections
        }
    }
    
    // Logic พิเศษสำหรับ Robot Framework (Topic 3, Sub-topic 3)
    if(topicId === 3 && subTopicId === 3) {
        updateRfView2026();
    }
    
    // Logic พิเศษสำหรับ Cypress (Topic 3, Sub-topic 4)
    if(topicId === 3 && subTopicId === 4) {
        updateCyView2026();
    }
    
    // Logic พิเศษสำหรับ Playwright (Topic 3, Sub-topic 5)
    if(topicId === 3 && subTopicId === 5) {
        updatePwView2026();
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

// JSON Interactive Logic - Delegated to json-handler-2026.js

function resetJsonState2026() {
    document.querySelectorAll('#sub-topic-2-2-2026 .json-val, #sub-topic-2-2-2026 .json-obj, #sub-topic-2-2-2026 span').forEach(el => {
        el.classList.remove('highlight-answer', 'highlight-block');
    });
    document.querySelectorAll('#sub-topic-2-2-2026 .json-btn').forEach(btn => btn.classList.remove('active-q'));
    const resultBox = document.getElementById('json-result-display-2026');
    if(resultBox) resultBox.classList.add('hidden');
}

// === SQL Interactive Logic ===
let lastSqlJuniorAnswer2026 = null;
let lastSqlSeniorAnswer2026 = null;

function checkSqlJunior2026(answer) {
    const feedback = document.getElementById('sql-junior-feedback-2026');
    const sqlContent = document.getElementById('sql-content-junior-2026');
    if (!sqlContent || !feedback) return;
    const buttons = sqlContent.querySelectorAll('.sql-btn');
    if (buttons.length === 0) return;
    const index = (answer === 'A') ? 0 : (answer === 'B') ? 1 : (answer === 'C') ? 2 : 3;
    const clickedBtn = buttons[index];
    
    // Toggle if clicking the same button
    if(lastSqlJuniorAnswer2026 === answer) {
        buttons.forEach(btn => btn.className = 'sql-btn');
        feedback.classList.add('hidden');
        lastSqlJuniorAnswer2026 = null;
        return;
    }
    
    feedback.classList.remove('hidden', 'fb-success', 'fb-error');
    buttons.forEach(btn => btn.className = 'sql-btn');
    lastSqlJuniorAnswer2026 = answer;

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

function checkSqlSenior2026(answer) {
    const feedback = document.getElementById('sql-senior-feedback-2026');
    const sqlContent = document.getElementById('sql-content-senior-2026');
    if (!sqlContent || !feedback) return;
    const buttons = sqlContent.querySelectorAll('.sql-btn');
    if (buttons.length === 0) return;
    const index = (answer === 'A') ? 0 : (answer === 'B') ? 1 : (answer === 'C') ? 2 : 3;
    const clickedBtn = buttons[index];
    
    // Toggle if clicking the same button
    if(lastSqlSeniorAnswer2026 === answer) {
        buttons.forEach(btn => btn.className = 'sql-btn');
        feedback.classList.add('hidden');
        lastSqlSeniorAnswer2026 = null;
        return;
    }
    
    feedback.classList.remove('hidden', 'fb-success', 'fb-error');
    buttons.forEach(btn => btn.className = 'sql-btn');
    lastSqlSeniorAnswer2026 = answer;

    if(answer === 'A' || answer === 'B') {
        clickedBtn.classList.add('correct');
        if(answer === 'A') {
            feedback.innerHTML = "✅ ถูกต้อง! (LEFT JOIN + IS NULL)<br><small><b>วิธีที่ดีที่สุด:</b> LEFT JOIN จะคืนข้อมูลทั้งหมดจาก ParkingEntry และใช้ IS NULL เพื่อหารายการที่ไม่มีคู่ใน ParkingExit<br><b>Performance:</b> เร็วกว่า NOT IN เมื่อมี NULL values</small>";
        } else {
            feedback.innerHTML = "✅ ถูกต้อง! (NOT IN Subquery)<br><small><b>วิธีคลาสสิก:</b> ใช้ NOT IN กับ Subquery เพื่อหา ticket_id ที่ไม่มีใน ParkingExit<br><b>ข้อระวัง:</b> อาจมีปัญหาถ้ามี NULL ใน Subquery</small>";
        }
        feedback.classList.add('fb-success');
    } else {
        clickedBtn.classList.add('wrong');
        feedback.classList.add('fb-error');
        if(answer === 'C') feedback.innerHTML = "❌ ผิด - ตรงข้าม<br><small>ใช้ IN แทน NOT IN จะได้รายการที่<b>มี</b>ใน ParkingExit (TK-001, TK-003)<br>แต่เราต้องการรายการที่<b>ไม่มี</b> (TK-002, TK-004)</small>";
        if(answer === 'D') feedback.innerHTML = "❌ ผิด - JOIN Logic<br><small>INNER JOIN จะคืนเฉพาะรายการที่มีในทั้งสองตารางเท่านั้น<br>และ WHERE px.exit_time IS NULL จะไม่เกิดขึ้นเพราะ JOIN แล้วกรองเฉพาะที่ Match</small>";
    }
}


// === JavaScript Coding Questions Logic ===
let lastJsJuniorAnswer2026 = null;
let lastJsSeniorAnswer2026 = null;

function checkJsAnswer(level, answer) {
    const isJunior = level === 'jr';
    const feedbackId = isJunior ? (selectedYear === '2026' ? 'js-jr-feedback-2026' : 'js-jr-feedback') : (selectedYear === '2026' ? 'js-sr-feedback-2026' : 'js-sr-feedback');
    const feedbackEl = document.getElementById(feedbackId);
    const viewId = isJunior ? (selectedYear === '2026' ? 'js-junior-view-2026' : 'js-junior-view') : (selectedYear === '2026' ? 'js-senior-view-2026' : 'js-senior-view');
    const viewEl = document.getElementById(viewId);
    if (!viewEl || !feedbackEl) return;
    const buttons = viewEl.querySelectorAll('.code-opt-btn');
    const targetBtn = event?.currentTarget;
    if (!targetBtn) return;
    
    // Toggle if clicking the same button
    const lastAnswer = isJunior ? lastJsJuniorAnswer2026 : lastJsSeniorAnswer2026;
    if(lastAnswer === answer) {
        buttons.forEach(btn => btn.className = 'code-opt-btn');
        feedbackEl.classList.add('hidden');
        if(isJunior) lastJsJuniorAnswer2026 = null;
        else lastJsSeniorAnswer2026 = null;
        return;
    }
    
    feedbackEl.className = 'feedback-box hidden';
    buttons.forEach(btn => btn.className = 'code-opt-btn');
    
    if(isJunior) lastJsJuniorAnswer2026 = answer;
    else lastJsSeniorAnswer2026 = answer;

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
let lastPyJuniorAnswer2026 = null;
let lastPySeniorAnswer2026 = null;

function checkPyAnswer(level, answer) {
    const isJunior = level === 'jr';
    const feedbackId = isJunior ? (selectedYear === '2026' ? 'py-jr-feedback-2026' : 'py-jr-feedback') : (selectedYear === '2026' ? 'py-sr-feedback-2026' : 'py-sr-feedback');
    const feedbackEl = document.getElementById(feedbackId);
    const viewId = isJunior ? (selectedYear === '2026' ? 'py-junior-view-2026' : 'py-junior-view') : (selectedYear === '2026' ? 'py-senior-view-2026' : 'py-senior-view');
    const viewEl = document.getElementById(viewId);
    if (!viewEl || !feedbackEl) return;
    const buttons = viewEl.querySelectorAll('.code-opt-btn');
    const targetBtn = event?.currentTarget;
    if (!targetBtn) return;
    
    // Toggle if clicking the same button
    const lastAnswer = isJunior ? lastPyJuniorAnswer2026 : lastPySeniorAnswer2026;
    if(lastAnswer === answer) {
        buttons.forEach(btn => btn.className = 'code-opt-btn');
        feedbackEl.classList.add('hidden');
        if(isJunior) lastPyJuniorAnswer2026 = null;
        else lastPySeniorAnswer2026 = null;
        return;
    }
    
    feedbackEl.className = 'feedback-box hidden';
    buttons.forEach(btn => btn.className = 'code-opt-btn');
    
    if(isJunior) lastPyJuniorAnswer2026 = answer;
    else lastPySeniorAnswer2026 = answer;

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

let lastRfJuniorAnswer2026 = null;
let lastRfSeniorAnswer2026 = null;

function updateRfView() {
    document.getElementById('rf-junior-view').classList.add('hidden');
    document.getElementById('rf-senior-view').classList.add('hidden');
    
    if(currentLevel2026 === 'junior') {
        document.getElementById('rf-junior-view').classList.remove('hidden');
    } else {
        document.getElementById('rf-senior-view').classList.remove('hidden');
    }
}

function checkRfAnswer(level, answer) {
    const isJunior = level === 'jr';
    const feedbackId = isJunior ? (selectedYear === '2026' ? 'rf-jr-feedback-2026' : 'rf-jr-feedback') : (selectedYear === '2026' ? 'rf-sr-feedback-2026' : 'rf-sr-feedback');
    const feedbackEl = document.getElementById(feedbackId);
    if (!feedbackEl) return;
    feedbackEl.className = 'feedback-box hidden';
    const viewId = isJunior ? (selectedYear === '2026' ? 'rf-junior-view-2026' : 'rf-junior-view') : (selectedYear === '2026' ? 'rf-senior-view-2026' : 'rf-senior-view');
    const viewEl = document.getElementById(viewId);
    if (!viewEl) return;
    const buttons = viewEl.querySelectorAll('.code-opt-btn');
    buttons.forEach(btn => btn.className = 'code-opt-btn');
    const targetBtn = event?.currentTarget;
    if (!targetBtn) return;
    
    // Toggle if clicking the same button
    const lastAnswer = isJunior ? lastRfJuniorAnswer2026 : lastRfSeniorAnswer2026;
    if(lastAnswer === answer) {
        feedbackEl.classList.add('hidden');
        if(isJunior) lastRfJuniorAnswer2026 = null;
        else lastRfSeniorAnswer2026 = null;
        return;
    }
    
    if(isJunior) lastRfJuniorAnswer2026 = answer;
    else lastRfSeniorAnswer2026 = answer;

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

let lastCyJuniorAnswer2026 = null;
let lastCySeniorAnswer2026 = null;

function updateCyView() {
    document.getElementById('cy-junior-view').classList.add('hidden');
    document.getElementById('cy-senior-view').classList.add('hidden');
    
    if(currentLevel2026 === 'junior') {
        document.getElementById('cy-junior-view').classList.remove('hidden');
    } else {
        document.getElementById('cy-senior-view').classList.remove('hidden');
    }
}

function checkCyAnswer(level, answer) {
    const isJunior = level === 'jr';
    const feedbackId = isJunior ? (selectedYear === '2026' ? 'cy-jr-feedback-2026' : 'cy-jr-feedback') : (selectedYear === '2026' ? 'cy-sr-feedback-2026' : 'cy-sr-feedback');
    const feedbackEl = document.getElementById(feedbackId);
    if (!feedbackEl) return;
    feedbackEl.className = 'feedback-box hidden';
    const viewId = isJunior ? (selectedYear === '2026' ? 'cy-junior-view-2026' : 'cy-junior-view') : (selectedYear === '2026' ? 'cy-senior-view-2026' : 'cy-senior-view');
    const viewEl = document.getElementById(viewId);
    if (!viewEl) return;
    const buttons = viewEl.querySelectorAll('.code-opt-btn');
    buttons.forEach(btn => btn.className = 'code-opt-btn');
    const targetBtn = event?.currentTarget;
    if (!targetBtn) return;
    
    // Toggle if clicking the same button
    const lastAnswer = isJunior ? lastCyJuniorAnswer2026 : lastCySeniorAnswer2026;
    if(lastAnswer === answer) {
        feedbackEl.classList.add('hidden');
        if(isJunior) lastCyJuniorAnswer2026 = null;
        else lastCySeniorAnswer2026 = null;
        return;
    }
    
    if(isJunior) lastCyJuniorAnswer2026 = answer;
    else lastCySeniorAnswer2026 = answer;

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

// Additional functions for 2026 version
function updateRfView2026() {
    if (selectedYear !== '2026') return;
    
    // Hide 2025 versions
    document.getElementById('rf-junior-view').classList.add('hidden');
    document.getElementById('rf-senior-view').classList.add('hidden');
    // Hide 2026 versions
    document.getElementById('rf-junior-view-2026').classList.add('hidden');
    document.getElementById('rf-senior-view-2026').classList.add('hidden');
    
    if(currentLevel2026 === 'junior') {
        document.getElementById('rf-junior-view-2026').classList.remove('hidden');
    } else {
        document.getElementById('rf-senior-view-2026').classList.remove('hidden');
    }
}

function updateCyView2026() {
    if (selectedYear !== '2026') return;
    
    // Hide 2025 versions
    document.getElementById('cy-junior-view').classList.add('hidden');
    document.getElementById('cy-senior-view').classList.add('hidden');
    // Hide 2026 versions
    document.getElementById('cy-junior-view-2026').classList.add('hidden');
    document.getElementById('cy-senior-view-2026').classList.add('hidden');
    
    if(currentLevel2026 === 'junior') {
        document.getElementById('cy-junior-view-2026').classList.remove('hidden');
    } else {
        document.getElementById('cy-senior-view-2026').classList.remove('hidden');
    }
}

// === Playwright Logic ===

let lastPwJuniorAnswer2026 = null;
let lastPwSeniorAnswer2026 = null;

function updatePwView2026() {
    if (selectedYear !== '2026') return;
    
    // Hide 2025 versions
    document.getElementById('pw-junior-view').classList.add('hidden');
    document.getElementById('pw-senior-view').classList.add('hidden');
    // Hide 2026 versions
    document.getElementById('pw-junior-view-2026').classList.add('hidden');
    document.getElementById('pw-senior-view-2026').classList.add('hidden');
    
    if(currentLevel2026 === 'junior') {
        document.getElementById('pw-junior-view-2026').classList.remove('hidden');
    } else {
        document.getElementById('pw-senior-view-2026').classList.remove('hidden');
    }
}

function checkPwAnswer(level, answer) {
    const isJunior = level === 'jr';
    const feedbackId = isJunior ? (selectedYear === '2026' ? 'pw-jr-feedback-2026' : 'pw-jr-feedback') : (selectedYear === '2026' ? 'pw-sr-feedback-2026' : 'pw-sr-feedback');
    const feedbackEl = document.getElementById(feedbackId);
    if (!feedbackEl) return;
    feedbackEl.className = 'feedback-box hidden';
    const viewId = isJunior ? (selectedYear === '2026' ? 'pw-junior-view-2026' : 'pw-junior-view') : (selectedYear === '2026' ? 'pw-senior-view-2026' : 'pw-senior-view');
    const viewEl = document.getElementById(viewId);
    if (!viewEl) return;
    const buttons = viewEl.querySelectorAll('.code-opt-btn');
    buttons.forEach(btn => btn.className = 'code-opt-btn');
    const targetBtn = event?.currentTarget;
    if (!targetBtn) return;
    
    // Toggle if clicking the same button
    const lastAnswer = isJunior ? lastPwJuniorAnswer2026 : lastPwSeniorAnswer2026;
    if(lastAnswer === answer) {
        feedbackEl.classList.add('hidden');
        if(isJunior) lastPwJuniorAnswer2026 = null;
        else lastPwSeniorAnswer2026 = null;
        return;
    }
    
    if(isJunior) lastPwJuniorAnswer2026 = answer;
    else lastPwSeniorAnswer2026 = answer;

    let isCorrect = false;
    let msg = "";

    if(isJunior) {
        // Answer: B (Wait 2 seconds then click successfully)
        if(answer === 'wait') {
            isCorrect = true;
            msg = "✅ ถูกต้อง! (รอ 2 วินาที แล้วคลิกได้)<br><small><b>คำอธิบาย:</b> Playwright มี <b>Auto-waiting</b> ในตัว จะรอจนกว่า Element จะ <b>Visible</b> และ <b>Enabled</b> ก่อนที่จะคลิก แม้ว่าปุ่มจะเป็น display:none ในตอนแรก แต่หลัง 2 วินาที มันจะแสดงและคลิกได้ตามปกติ</small>";
        } else if (answer === 'error') {
            msg = "❌ ผิด <br><small>Playwright ไม่เกิด Error ทันที เพราะมันมี Auto-waiting จะรอจนกว่า Element จะพร้อมใช้งาน</small>";
        } else if (answer === 'timeout') {
            msg = "❌ ผิด <br><small>ถ้า Element ไม่แสดงภายใน 30 วินาที ถึงจะ Timeout แต่ในกรณีนี้ Element จะแสดงภายใน 2 วินาที</small>";
        } else {
            msg = "❌ ผิด <br><small>Playwright ไม่มี Force click จะรอจนกว่า Element จะพร้อมใช้งานก่อน</small>";
        }
    } else {
        // Answer: B (Race Condition)
        if(answer === 'race') {
            isCorrect = true;
            msg = "✅ ถูกต้อง! (Race Condition)<br><small><b>คำอธิบาย:</b> เมื่อรัน Parallel ตัวแปร <code>sharedCounter</code> จะถูกแชร์ระหว่าง 2 Workers ทำให้ Test A อาจได้ counter=2 และ Test B ได้ counter=1 หรือกลับกัน ทำให้ Assertion ผิดพลาด<br><b>Senior Tip:</b> ใช้ <code>test.describe.serial()</code> หรือ Fixtures แทน</small>";
        } else if (answer === 'pass') {
            msg = "❌ ผิด <br><small>Playwright ไม่ได้แยก Context อัตโนมัติ Global Variable ยังคงถูกแชร์ระหว่าง Workers</small>";
        } else if (answer === 'sequential') {
            msg = "❌ ผิด <br><small>Playwright จะรัน Parallel ตามการตั้งค่า --workers=2 ไม่ได้เปลี่ยนเป็น Sequential อัตโนมัติ</small>";
        } else {
            msg = "❌ ผิด <br><small>Playwright อนุญาตให้ใช้ Global Variable ได้ แต่ไม่แนะนำใน Parallel Testing</small>";
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

// Override functions for 2026 to use different variable names
function switchTopic(topicId) {
    if (selectedYear === '2026') {
        switchTopic2026(topicId);
        return;
    }
    // Let 2025 version handle it
}

function switchSubTopic(topicId, subTopicId) {
    if (selectedYear === '2026') {
        switchSubTopic2026(topicId, subTopicId);
        return;
    }
    // Let 2025 version handle it
}

// ==========================================
// JUNIOR LOGIC TABS (2026 VERSION)
// ==========================================

function switchJrLogic(id) {
    if (selectedYear !== '2026') return; // Only work for 2026
    
    // Hide all scenario views
    document.querySelectorAll('.jr-scenario-view').forEach(el => {
        el.classList.add('hidden');
    });
    
    // Hide all solutions when switching scenarios
    document.querySelectorAll('.solution-section').forEach(el => {
        el.classList.add('hidden');
        el.style.display = 'none';
    });
    
    // Deactivate all buttons
    document.querySelectorAll('.sub-topic-btn').forEach(btn => {
        if (btn.id.startsWith('btn-jr-')) {
            btn.style.background = '#95a5a6'; // Gray
            btn.classList.remove('active');
        }
    });

    // Show selected scenario
    document.getElementById(`jr-scen-${id}`).classList.remove('hidden');
    
    // Activate selected button
    const activeBtn = document.getElementById(`btn-jr-${id}`);
    activeBtn.style.background = '#2c3e50'; // Dark Blue
    activeBtn.classList.add('active');
}

async function toggleJrAns(elementId) {
    if (selectedYear !== '2026') return; // Only work for 2026
    
    const el = document.getElementById(elementId);
    if (!el) return;
    
    // If already visible, just hide it
    if (!el.classList.contains('hidden') && el.style.display !== 'none') {
        el.classList.add('hidden');
        el.style.display = 'none';
        return;
    }
    
    // If hidden, ask for password first
    while(true) {
        const password = await getPasswordInput('Enter Password to View Solution');
        if(password === null) return;
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        if(hash === 'b9c0cddf116b3ba8fb8eea843f6627b6c5c1867adf130d51923ab2fdece2467e') {
            el.classList.remove('hidden');
            el.style.display = 'block';
            setTimeout(() => el.scrollIntoView({behavior: 'smooth'}), 100);
            return;
        }
        alert('⛔ Access Denied: Incorrect Password');
    }
}

// ==========================================
// JUNIOR LOGIC TABS (2026 VERSION)
// ==========================================

function switchJrLogic(id) {
    if (selectedYear !== '2026') return;
    
    document.querySelectorAll('.jr-scenario-view').forEach(el => {
        el.classList.add('hidden');
    });
    
    document.querySelectorAll('.jr-scenario-view .solution-section').forEach(el => {
        el.classList.add('hidden');
        el.style.display = 'none';
    });
    
    document.querySelectorAll('.sub-topic-btn').forEach(btn => {
        if (btn.id && btn.id.startsWith('btn-jr-')) {
            btn.style.background = '#95a5a6';
            btn.classList.remove('active');
        }
    });

    const targetScenario = document.getElementById(`jr-scen-${id}`);
    if (targetScenario) {
        targetScenario.classList.remove('hidden');
    }
    
    const activeBtn = document.getElementById(`btn-jr-${id}`);
    if (activeBtn) {
        activeBtn.style.background = '#2c3e50';
        activeBtn.classList.add('active');
    }
}

async function toggleJrAns(elementId) {
    if (selectedYear !== '2026') return;
    
    const el = document.getElementById(elementId);
    if (!el) return;
    
    if (!el.classList.contains('hidden') && el.style.display !== 'none') {
        el.classList.add('hidden');
        el.style.display = 'none';
        return;
    }
    
    while(true) {
        const password = await getPasswordInput('Enter Password to View Solution');
        if(password === null) return;
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        if(hash === 'b9c0cddf116b3ba8fb8eea843f6627b6c5c1867adf130d51923ab2fdece2467e') {
            el.classList.remove('hidden');
            el.style.display = 'block';
            setTimeout(() => el.scrollIntoView({behavior: 'smooth'}), 100);
            return;
        }
        alert('⛔ Access Denied: Incorrect Password');
    }
}

// ==========================================
// LOGIC SCENARIO TABS (2026 VERSION)
// ==========================================

function switchLogicScenario(id) {
    if (selectedYear !== '2026') return;
    
    document.querySelectorAll('.logic-scenario-view').forEach(el => {
        el.classList.add('hidden');
    });
    
    document.querySelectorAll('.logic-scenario-view .solution-section').forEach(el => {
        el.classList.add('hidden');
        el.style.display = 'none';
    });
    
    document.querySelectorAll('.sub-topic-btn').forEach(btn => {
        if (btn.id && btn.id.startsWith('btn-logic-')) {
            btn.style.background = '#95a5a6';
            btn.classList.remove('active');
        }
    });

    const targetScenario = document.getElementById(`logic-scen-${id}`);
    if (targetScenario) {
        targetScenario.classList.remove('hidden');
    }
    
    const activeBtn = document.getElementById(`btn-logic-${id}`);
    if (activeBtn) {
        activeBtn.style.background = '#2c3e50';
        activeBtn.classList.add('active');
    }
}

async function toggleLogicAns(elementId) {
    if (selectedYear !== '2026') return;
    
    const el = document.getElementById(elementId);
    if (!el) return;
    
    if (!el.classList.contains('hidden') && el.style.display !== 'none') {
        el.classList.add('hidden');
        el.style.display = 'none';
        return;
    }
    
    while(true) {
        const password = await getPasswordInput('Enter Password to View Solution');
        if(password === null) return;
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        if(hash === 'b9c0cddf116b3ba8fb8eea843f6627b6c5c1867adf130d51923ab2fdece2467e') {
            el.classList.remove('hidden');
            el.style.display = 'block';
            setTimeout(() => el.scrollIntoView({behavior: 'smooth'}), 100);
            return;
        }
        alert('⛔ Access Denied: Incorrect Password');
    }
}


// === API Assertion Logic ===
let lastApiJuniorAnswer2026 = null;
let lastApiSeniorAnswer2026 = null;

function checkApiAssertion(level, answer) {
    if (selectedYear !== '2026') return;
    
    const isJunior = level === 'jr';
    const feedbackId = isJunior ? 'api-assertion-jr-feedback' : 'api-assertion-sr-feedback';
    const feedbackEl = document.getElementById(feedbackId);
    const viewId = isJunior ? 'api-assertion-junior' : 'api-assertion-senior';
    const viewEl = document.getElementById(viewId);
    if (!viewEl || !feedbackEl) return;
    const buttons = viewEl.querySelectorAll('.sql-btn');
    const targetBtn = event?.currentTarget;
    if (!targetBtn) return;
    
    const lastAnswer = isJunior ? lastApiJuniorAnswer2026 : lastApiSeniorAnswer2026;
    if(lastAnswer === answer) {
        buttons.forEach(btn => btn.className = 'sql-btn');
        feedbackEl.classList.add('hidden');
        if(isJunior) lastApiJuniorAnswer2026 = null;
        else lastApiSeniorAnswer2026 = null;
        return;
    }
    
    feedbackEl.className = 'feedback-box hidden';
    buttons.forEach(btn => btn.className = 'sql-btn');
    
    if(isJunior) lastApiJuniorAnswer2026 = answer;
    else lastApiSeniorAnswer2026 = answer;

    let isCorrect = false;
    let msg = "";

    if(isJunior) {
        if(answer === 'C') {
            isCorrect = true;
            msg = "✅ ถูกต้อง!<br><small><b>คำอธิบาย:</b> Assertion ชุดนี้ครอบคลุมทั้ง Status Code, Data Type Validation และ Business Logic<br>- ตรวจสอบ userId > 0 (ไม่ใช่แค่เท่ากับค่าเฉพาะ)<br>- ตรวจสอบ email format (มี @)<br>- ตรวจสอบ balance เป็น number<br>นี่คือ Best Practice สำหรับ Junior QA</small>";
        } else if(answer === 'A') {
            msg = "❌ ไม่เพียงพอ<br><small>การเช็คแค่ status ไม่สามารถตรวจจับ Bug ใน data ได้ เช่น userId เป็น null หรือ email ไม่มี @</small>";
        } else if(answer === 'B') {
            msg = "⚠️ ไม่แนะนำ (Hardcoded Value)<br><small>การเช็ค userId == 12345 จะทำให้ Test Case ใช้ไม่ได้กับ User คนอื่น (Brittle Test) ควรเช็ค userId > 0 แทน</small>";
        } else {
            msg = "❌ ผิด<br><small>การเช็คแค่ response != null ไม่เพียงพอ เพราะ response อาจมีค่า แต่ข้อมูลข้างในผิดพลาดได้</small>";
        }
    } else {
        if(answer === 'C') {
            isCorrect = true;
            msg = "✅ ถูกต้อง!<br><small><b>คำอธิบาย:</b> การใช้ <code>every()</code> ร่วมกับเงื่อนไข AND จะตรวจสอบว่า<b>ทุกรายการ</b>ใน Array ต้องมี price > 0 และ stock > 0<br>ถ้ามี Product B (price=0, stock=0) Assertion จะ Fail ทันที ซึ่งตรงตาม Business Rule<br><b>Senior Tip:</b> ใช้ <code>filter()</code> หา Item ที่ผิดเงื่อนไขเพื่อ Debug ได้ง่ายขึ้น</small>";
        } else if(answer === 'A') {
            msg = "❌ ไม่เพียงพอ<br><small>การเช็คแค่ length == 3 ไม่สามารถตรวจจับ Bug ที่สินค้ามี price=0 หรือ stock=0 ได้</small>";
        } else if(answer === 'B') {
            msg = "⚠️ ใกล้ถูกแล้ว แต่ไม่ครบ<br><small>เช็คแค่ price > 0 แต่ไม่ได้เช็ค stock > 0 ทำให้ Product B (stock=0) ยังผ่าน Assertion ได้</small>";
        } else {
            msg = "❌ ผิดโฟกัส<br><small>การเช็ค status และ total ไม่ได้ตรวจสอบ Business Rule ที่ว่า \"สินค้าต้องไม่มี price=0 และ stock=0\"</small>";
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

// Toggle Junior API Answer (2026 Delivery Fee Scenario)
async function toggleJrApiAns() {
    if (selectedYear !== '2026') return;
    
    const el = document.getElementById('jr-api-ans-2026');
    if (!el) return;
    
    if (!el.classList.contains('hidden') && el.style.display !== 'none') {
        el.classList.add('hidden');
        el.style.display = 'none';
        return;
    }
    
    while(true) {
        const password = await getPasswordInput('Enter Password to View Solution');
        if(password === null) return;
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        if(hash === 'b9c0cddf116b3ba8fb8eea843f6627b6c5c1867adf130d51923ab2fdece2467e') {
            el.classList.remove('hidden');
            el.style.display = 'block';
            setTimeout(() => el.scrollIntoView({behavior: 'smooth'}), 100);
            return;
        }
        alert('⛔ Access Denied: Incorrect Password');
    }
}

// Toggle Senior API Answer (2026 Parking Fee Scenario)
async function toggleApiAns() {
    if (selectedYear !== '2026') return;
    
    const el = document.getElementById('api-ans-2026');
    if (!el) return;
    
    if (!el.classList.contains('hidden') && el.style.display !== 'none') {
        el.classList.add('hidden');
        el.style.display = 'none';
        return;
    }
    
    while(true) {
        const password = await getPasswordInput('Enter Password to View Solution');
        if(password === null) return;
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        if(hash === 'b9c0cddf116b3ba8fb8eea843f6627b6c5c1867adf130d51923ab2fdece2467e') {
            el.classList.remove('hidden');
            el.style.display = 'block';
            setTimeout(() => el.scrollIntoView({behavior: 'smooth'}), 100);
            return;
        }
        alert('⛔ Access Denied: Incorrect Password');
    }
}
