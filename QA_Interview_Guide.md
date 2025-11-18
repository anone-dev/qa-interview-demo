# Sr. QA Practical Hands-On Test Guide

## Overview
คุณจะได้ทำการทดสอบระบบ **QA Interview Demo** บนเว็บที่เตรียมไว้  
ระบบนี้จำลองการทำงานของเว็บไซต์ E-commerce ขนาดเล็ก  
ประกอบด้วยฟีเจอร์:
1. Register (สมัครสมาชิก)
2. Select Products (เลือกสินค้า)
3. Checkout (สรุปยอด)
4. Payment (ชำระเงิน)
5. Order History (ประวัติการสั่งซื้อ)

**หมายเหตุ:** ระบบนี้มีบั๊ก (Bug) แฝงทั้งฝั่ง UI และ API  
หน้าที่ของคุณคือ **ค้นหา วิเคราะห์ และรายงานบั๊ก** พร้อมเสนอแนวทางการทดสอบที่เหมาะสม

---

## Test Objectives
- ออกแบบ **Test Cases** ครอบคลุม workflow ทั้งระบบ
- ทำ **Manual Testing** เพื่อจับบั๊ก UI/UX/Functional
- ทำ **API Testing** กับ endpoint ที่กำหนด (ใช้ Postman หรือเครื่องมืออื่น)
- เขียน **Bug Report** ตามมาตรฐาน QA
- **Bonus:** เขียน Automation Script เพื่อทดสอบฟีเจอร์อย่างน้อย 1 ฟีเจอร์

---

## System URL
> โปรดใช้ URL ที่ผู้สัมภาษณ์ให้ เช่น  
> `https://yourusername.github.io/qa-demo/`

---

## Functional Scope
### 1. Register Page
**Expected:**
- อีเมลต้องมีรูปแบบ `name@domain.com`
- รหัสผ่านอย่างน้อย 8 ตัว
- อายุ >= 18 ปี

**Actual (Bug Hint):**
- อีเมล format ไม่ถูกตรวจสอบ
- รหัสผ่าน 7 ตัวก็สมัครได้
- อายุไม่ถูกตรวจสอบ

---

### 2. Products & Checkout Page
**Expected:**
- qty ต้อง > 0
- ราคาตรงตามที่ระบบกำหนด

**Actual (Bug Hint):**
- qty=0 สามารถ Checkout ได้
- ราคาผิดเมื่อดึงจาก API และเมื่อ qty > 10 จะลดราคาผิด

---

### 3. Payment Page
**Expected:**
- กรอกเลขบัตร Credit ครบ 16 ตัวเท่านั้นจึงจะ Success
- ทุกวิธีชำระต้องสร้างประวัติคำสั่งซื้อ

**Actual (Bug Hint):**
- Credit Card ใส่เลขไม่ครบก็ขึ้น Success
- Bank Transfer ไม่บันทึกประวัติการสั่งซื้อ

---

### 4. Order History Page
**Expected:**
- แสดงทุก order ที่เคยสั่งครบถ้วน
- แสดงวันที่สั่งซื้อ

**Actual (Bug Hint):**
- สั่งซื้อสินค้าชนิดซ้ำจะถูกรวมกับ order เดิม
- ไม่แสดงวันที่สั่งซื้อ

---

## API Endpoints (Mock)
- `POST /api/register`
  - **Expected:** Validate email, password >= 8, age >= 18
  - **Bug:** ไม่มีการตรวจสอบ

- `GET /api/products`
  - **Expected:** คืนราคาสินค้าตรงกับที่กำหนดใน UI
  - **Bug:** ราคาผิดเพี้ยน

- `POST /api/checkout`
  - **Expected:** qty ต้อง > 0
  - **Bug:** qty=0 ก็ผ่าน

- `POST /api/payment`
  - **Expected:** validate card และบันทึก order ทุกวิธีชำระ
  - **Bug:** card invalid ผ่านได้, Bank Transfer ไม่บันทึก

- `GET /api/orders`
  - **Expected:** คืนรายการ order ทั้งหมด พร้อมวันที่
  - **Bug:** รวม order ซ้ำ, ไม่มีวันที่

---

## Deliverables
คุณจะต้องส่ง:
1. **Test Case Document** – ครอบคลุมฟีเจอร์ทั้งหมด
2. **Bug Report** – Expected vs Actual, Steps to Reproduce, Severity, Priority
3. **API Test Result** – Postman collection หรืออื่น ๆ
4. **Bonus:** Automation Test Script

---

## Evaluation Criteria
- **Coverage:** ความครบถ้วนของ test case
- **Accuracy:** ความถูกต้องของ bug report
- **Analytical Skill:** ความสามารถในการวิเคราะห์ root cause
- **Process Thinking:** เสนอแนวทางป้องกันบั๊กในอนาคต
- **Technical Proficiency:** ความสามารถใช้เครื่องมือ QA/APIs/Automation

---

## Notes
- ระบบนี้ตั้งใจใส่บั๊กเพื่อทดสอบความละเอียดในการทดสอบ
- ไม่มีการแก้ไขระบบระหว่างทำข้อสอบ
