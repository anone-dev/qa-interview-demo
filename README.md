# qa-interview-demo

## Interview Questions Structure

โปรเจคนี้ได้แบ่ง Interview Questions เป็น 2 ส่วน:

### 📅 Interview 2025 (Current Version)
- ตำแหน่ง: `interview-2025/interview-2025.js`
- เป็นเวอร์ชันปัจจุบันที่ใช้งานอยู่
- มีคำถามและโจทย์ที่ใช้สำหรับการสัมภาษณ์ปี 2025
- **Junior Level**: Logic Exam, JSON/SQL, JavaScript/Python/Robot Framework/Cypress
- **Senior Level**: Logic Exam, JSON/SQL, JavaScript/Python/Robot Framework/Cypress/Playwright

### 🚀 Interview 2026 (Enhanced Version)
- ตำแหน่ง: `interview-2026/interview-2026.js`
- เป็นเวอร์ชันที่ปรับปรุงใหม่สำหรับปี 2026
- มีการปรับแต่งสีและ UI เพื่อแยกความแตกต่าง
- **Junior Level**: 3 Real-World Scenarios
  - 🚚 Delivery Fee Calculation
  - 🔐 Login Lockout System
  - 📅 Leave Request Validation
- **Senior Level**: 3 Complex Business Logic Scenarios
  - 🚗 Parking Fee System
  - 🛍️ Discount Logic with Exclusions
  - 🏧 ATM Withdrawal Limits
- **Backend Testing**: API Assertion, JSON, SQL (แทน JavaScript/Python)
- **Automation Testing**: Robot Framework (Appium), Cypress, Playwright (แทน JavaScript/Python)

## การใช้งาน

1. เข้าไปที่แท็บ "🧩 Interview Questions"
2. เลือกปีที่ต้องการ (2025 หรือ 2026)
3. เลือกระดับ (Junior หรือ Senior)
   - **2025**: คำถามแบบดั้งเดิม (Logic Exam, JSON/SQL, JavaScript/Python/Robot Framework/Cypress)
   - **2026**: โจทย์แบบ Scenario-based (3 scenarios ต่อระดับ, API Assertion, Robot Framework Appium, Cypress, Playwright)
4. ทำแบบทดสอบตามหัวข้อต่างๆ

## ความแตกต่างระหว่าง 2025 และ 2026

| Feature | 2025 | 2026 |
|---------|------|------|
| Logic Exam | 1 โจทย์ต่อระดับ | 3 Scenarios ต่อระดับ |
| Backend Testing | JSON/SQL | API Assertion/JSON/SQL |
| Automation Testing | JS/Python/RF/Cypress | RF(Appium)/Cypress/Playwright |
| Card Description | แสดงหัวข้อทั่วไป | แสดงรายละเอียด Scenarios |
| UI Theme | สีเขียว (Green) | สีน้ำเงิน (Blue) |
| Timing Display | แสดงเวลาสัมภาษณ์แต่ละขั้นตอน | แสดงเวลาสัมภาษณ์แต่ละขั้นตอน |
| Focus | ทดสอบความรู้พื้นฐาน | ทดสอบการแก้ปัญหาจริง |

## UI Color Scheme

- **Interview 2025**: Light Green Theme (เหมาะกับ Junior Level)
- **Interview 2026**: Light Blue Theme (เหมาะกับ Senior Level)
- **Junior Level Cards**: Green gradient background
- **Senior Level Cards**: Blue gradient background

## Interview Timing

ทั้ง 2 เวอร์ชันแสดงเวลาสัมภาษณ์:
- แนะนำตัว 5-10 min | QA COE 15-25 min
- QA Lead 15-25 min | ผู้สมัครถาม 5 min

## การพัฒนาต่อ

สำหรับการปรับปรุงเวอร์ชัน 2026:
- แก้ไขไฟล์ `interview-2026/interview-2026.js`
- เพิ่ม Scenarios ใหม่หรือปรับปรุง Scenarios เดิม
- ทดสอบให้แน่ใจว่าไม่กระทบกับเวอร์ชัน 2025
- Description จะอัพเดทอัตโนมัติตาม `updateLevelDescriptions2026()` function