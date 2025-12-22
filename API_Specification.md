# Bug Hunting App - API Specification

## Base URL
```
Mock API (Client-side simulation)
```

---

## 1. POST /api/register
**Description:** สมัครสมาชิกใหม่

### Request Body
```json
{
  "email": "string",
  "password": "string",
  "confirmPassword": "string",
  "dateOfBirth": "string (YYYY-MM-DD)",
  "fullName": "string"
}
```

### Expected Validation Rules
- `email`: ต้องเป็นรูปแบบ email ที่ถูกต้อง (name@domain.com)
- `password`: ความยาวอย่างน้อย 8 ตัวอักษร
- `confirmPassword`: ต้องตรงกับ password
- `dateOfBirth`: อายุต้อง >= 18 ปี
- ฟิลด์ทั้งหมดต้องกรอกครบ (required)

### Response (Success)
```json
{
  "status": "success",
  "message": "✅ Registration Successful!"
}
```

### Response (Error - Expected)
```json
{
  "status": "error",
  "message": "Validation failed",
  "errors": {
    "email": "Invalid email format",
    "password": "Password must be at least 8 characters",
    "confirmPassword": "Passwords do not match",
    "age": "Must be at least 18 years old"
  }
}
```

### 🐞 Known Bugs
- ❌ ไม่มีการ validate ใดๆ เลย
- ❌ สมัครสำเร็จแม้ไม่กรอกข้อมูลครบ
- ❌ email format ผิดก็ผ่าน
- ❌ password สั้นหรือไม่ตรงกันก็ผ่าน

---

## 2. GET /api/products
**Description:** ดึงรายการสินค้าทั้งหมด

### Request
ไม่มี parameters

### Response (Expected)
```json
[
  {
    "name": "Developer T-Shirt",
    "price": 120,
    "img": "👕"
  },
  {
    "name": "Debugging Rubber Duck",
    "price": 550,
    "img": "🦆"
  },
  {
    "name": "Coffee Mug",
    "price": 60,
    "img": "☕"
  }
]
```

### 🐞 Known Bugs
- ❌ ราคาสินค้าอาจผิดเพี้ยนจากที่กำหนด
- ❌ ข้อมูลไม่ตรงกับที่แสดงใน UI

---

## 3. POST /api/checkout
**Description:** คำนวณยอดรวมสินค้าในตะกร้า

### Request Body
```json
{
  "cart": [
    {
      "name": "Developer T-Shirt",
      "price": 120,
      "qty": 2
    },
    {
      "name": "Coffee Mug",
      "price": 60,
      "qty": 1
    }
  ]
}
```

### Expected Validation Rules
- `qty` ต้อง > 0 สำหรับทุกสินค้า
- ไม่สามารถ checkout ได้หาก qty = 0

### Response (Success)
```json
{
  "total": 300,
  "status": "success"
}
```

### Response (Error - Expected)
```json
{
  "status": "error",
  "message": "Quantity must be greater than 0"
}
```

### Calculation Formula
```
total = Σ(qty × price) for all items
```

### 🐞 Known Bugs
- ❌ qty = 0 สามารถ checkout ได้
- ❌ การคำนวณราคารวมอาจมีปัญหา

---

## 4. POST /api/payment
**Description:** ประมวลผลการชำระเงิน

### Request Body
```json
{
  "method": "Credit Card | Bank Transfer | e-Wallet",
  "amount": 300,
  "cardNumber": "1234567890123456"  // Required only for Credit Card
}
```

### Expected Validation Rules
- `method`: ต้องเป็น "Credit Card", "Bank Transfer", หรือ "e-Wallet"
- `cardNumber`: ต้องมี 16 หลัก (เฉพาะ Credit Card)
- `amount`: ต้อง > 0
- ทุกวิธีชำระต้องบันทึกประวัติการสั่งซื้อ

### Response (Success)
```json
{
  "status": "success",
  "recorded": true,
  "orderId": "ORD-20240101-001",
  "message": "Payment successful"
}
```

### Response (Error - Expected)
```json
{
  "status": "error",
  "message": "Invalid card number. Must be 16 digits"
}
```

### 🐞 Known Bugs
- ❌ Credit Card validation ไม่เข้มงวด (ไม่ตรวจสอบ 16 หลัก)
- ❌ Bank Transfer ไม่บันทึกประวัติ (`recorded: false`) แต่แสดงว่า success
- ❌ Card number ผิดก็ผ่าน validation

---

## 5. GET /api/orders
**Description:** ดึงประวัติการสั่งซื้อทั้งหมด

### Request
ไม่มี parameters

### Response (Expected)
```json
[
  {
    "orderId": "ORD-20240101-001",
    "date": "2024-01-01T10:30:00Z",
    "method": "Credit Card",
    "amount": 300,
    "items": [
      {
        "name": "Developer T-Shirt",
        "qty": 2,
        "price": 120
      }
    ]
  },
  {
    "orderId": "ORD-20240101-002",
    "date": "2024-01-01T14:20:00Z",
    "method": "Bank Transfer",
    "amount": 550,
    "items": [
      {
        "name": "Debugging Rubber Duck",
        "qty": 1,
        "price": 550
      }
    ]
  }
]
```

### Response (Empty)
```json
[]
```

### 🐞 Known Bugs
- ❌ Bank Transfer orders ไม่ปรากฏในรายการ
- ❌ รวม order ซ้ำ (duplicate entries)
- ❌ ไม่มีวันที่และเวลาในบาง orders
- ❌ ข้อมูลไม่ครบถ้วน (ขาด method, amount, หรือ items)

---

## Error Codes (Expected)

| Code | Message | Description |
|------|---------|-------------|
| 400 | Bad Request | ข้อมูล request ไม่ถูกต้อง |
| 422 | Validation Error | ข้อมูลไม่ผ่าน validation |
| 500 | Internal Server Error | เกิดข้อผิดพลาดในระบบ |

---

## Testing Notes

### Priority Test Cases
1. **Registration Validation** - ทดสอบทุก validation rule
2. **Checkout with qty=0** - ต้อง reject
3. **Bank Transfer Recording** - ต้องบันทึกประวัติ
4. **Credit Card Validation** - ต้องตรวจสอบ 16 หลัก
5. **Order History Completeness** - ต้องแสดงครบทุก order

### Test Data
```json
{
  "validEmail": "test@example.com",
  "invalidEmail": "invalid-email",
  "validPassword": "Password123",
  "shortPassword": "pass",
  "validCardNumber": "1234567890123456",
  "invalidCardNumber": "12345"
}
```

---

## Postman Collection
สามารถใช้ข้อมูลนี้สร้าง Postman Collection เพื่อทดสอบ API ทั้งหมด

### Environment Variables
```json
{
  "baseUrl": "http://localhost:3000",
  "testEmail": "qa.tester@example.com",
  "testPassword": "TestPass123"
}
```
