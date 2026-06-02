# Ascentis Bank — Frontend ↔ Backend API Reference

This document lists every backend route the Ascentis Bank frontend calls, the data it sends, and what it expects back. All requests use **Axios** with `withCredentials: true` for session cookies.

> **Base URL**: `VITE_API_BASE_URL`
> **Chatbot URL** (external): `https://chatbot-backend-neeo.onrender.com`

---

## 1. Authentication

### 1.1 `POST {LOGIN}` — User Login

- **Used in**: `LoginBasic.jsx → handleSubmit()`
- **Content-Type**: `application/x-www-form-urlencoded`
- **With Credentials**: `true`

**Request Body (form-urlencoded)**:
| Field | Type | Description |
| --- | --- | --- |
| `username` | string | User's username |
| `password` | string | User's password |

**Expected Response**:
- **Success (HTTP 201)**: User authenticated; the frontend then calls the **HOME** endpoint to load session account details and navigates to `/dashboard`.
- `response.data.data === 0` → Username does not exist.
- `response.data.data === 1` → Wrong password.
- Other `response.data.data` value → Login successful (no error message).

---

### 1.2 `GET {HOME}` — Get Session / Account Details (Home)

- **Used in**: `LoginBasic.jsx → handleSubmit()` (post-login), `Dashboard.jsx → handleHomeUIUpdate()` (refresh)
- **Content-Type**: `application/json`
- **With Credentials**: `true`

**Request Body**: None

**Expected Response** (JSON or stringified JSON):
```json
{
  "accountOwnerName": "string",
  "accountBalance": 0,
  "recentTransactions": [
    {
      "name": "string",
      "type": "Incoming | Outgoing",
      "status": "Completed | In Progress | Pending | Done",
      "date": "ISO date string",
      "amount": 0
    }
  ]
}
```

---

### 1.3 `GET {LOGOUT}` — Logout

- **Used in**: `Dashboard.jsx → handleLogout()`, `handleBeforeUnload` event, and on `popstate` event
- **Content-Type**: `application/json`
- **With Credentials**: `true`

**Request Body**: None

**Expected Response**:
- **Success (HTTP 201)**: Session destroyed; frontend navigates to `/login`.
- Any other status → Logout failed; user stays on the page.

---

## 2. Registration

### 2.1 `POST {CHECK_EMAIL}` — Check Email & Phone Availability

- **Used in**: `DefaultStepper.jsx → handleNext()` (Step 1 of registration)
- **Content-Type**: `application/x-www-form-urlencoded`
- **With Credentials**: `true`

**Request Body (form-urlencoded)**:
| Field | Type | Description |
| --- | --- | --- |
| `email` | string | User's email |
| `phone` | string | User's phone number |
| `form` | string | Hardcoded: `"register_email"` |

**Expected Response**:
- `response.data.exists === false` → Email & phone available; proceed to step 2.
- `response.data.exists === true` → Email or phone already in use; show `emailMessage` / `phoneMessage` (or `message`).
- `response.data.emailMessage` → Email-specific error.
- `response.data.phoneMessage` → Phone-specific error.
- `response.data.message` → Generic error.

---

### 2.2 `POST {CHECK_USER_ID}` — Check Username Availability

- **Used in**: `DefaultStepper.jsx → handleGetOtp()` (Step 2 of registration, after submitting full form)
- **Content-Type**: `application/x-www-form-urlencoded`
- **With Credentials**: `true`

**Request Body (form-urlencoded)** — the full `FormData` object:
| Field | Type | Description |
| --- | --- | --- |
| `full_name` | string | User's full name |
| `dob` | string (date) | Date of birth |
| `gender` | string | `male` / `female` / `other` |
| `age` | number | Age |
| `phone` | string | 10-digit phone |
| `email` | string | Email address |
| `res_address` | string | Residential address |
| `city` | string | City |
| `state` | string | State ISO code |
| `postal_code` | string | Postal/ZIP code |
| `country` | string | Country ISO code |
| `occupation` | string | `employed` / `selfEmployed` / `unemployed` / `student` |
| `account_type` | string | `savings` / `current` |
| `nominee_name` | string | Nominee name |
| `nominee_age` | string | Nominee age |
| `nominee_contact` | string | Nominee contact |
| `nominee_relation` | string | Nominee relation |
| `username` | string | Desired username |
| `password` | string | Desired password |
| `confirm_password` | string | Password confirmation |

**Expected Response**:
- `response.data.exists === false` → Username available; frontend then calls the **OTP** endpoint to send the verification email.
- `response.data.exists === true` → Username already exists; show `message`.

---

### 2.3 `GET {OTP}` — Send / Resend OTP (Registration)

- **Used in**: `DefaultStepper.jsx → handleGetOtp()` (after `CHECK_USER_ID` succeeds), `handleOtpReset()` (resend timer)
- **Content-Type**: `application/json`
- **With Credentials**: `true`

**Request Body**: None

**Expected Response**:
- `response.data.exists === true` → OTP email sent successfully; advance to OTP entry step.
- `response.data.exists === false` → Failed; show `response.data.message` and navigate to `/`.

---

### 2.4 `POST {VALIDATE_OTP}` — Verify Registration OTP

- **Used in**: `DefaultStepper.jsx → handleOtpSubmit()` (Step 3 of registration)
- **Content-Type**: `application/x-www-form-urlencoded`
- **With Credentials**: `true`

**Request Body (form-urlencoded)**:
| Field | Type | Description |
| --- | --- | --- |
| `otp` | string (number) | OTP entered by the user |

**Expected Response**:
- **HTTP 201** → Account created; frontend navigates to `/successPage`.
- Other status → `response.data.message` is shown as the OTP error.

---

## 3. Forgot Password Flow

### 3.1 `POST {FORGOT}` — Submit Forgot-Password Email

- **Used in**: `ForgotPassPageOne.jsx → handleEmailSubmit()` (Step 1)
- **Content-Type**: `application/x-www-form-urlencoded`
- **With Credentials**: `true`

**Request Body (form-urlencoded)**:
| Field | Type | Description |
| --- | --- | --- |
| `email` | string | Registered email address |
| `form` | string | Hardcoded: `"forgot_email"` |

**Expected Response**:
- `response.data.exists === true` AND `response.data.message !== "Your email is currently blocked"` → Frontend proceeds to call the **OTP** endpoint.
- Otherwise → Display `response.data.message` as an email error.

---

### 3.2 `GET {OTP}` — Send / Resend OTP (Forgot Password)

- **Used in**: `ForgotPassPageOne.jsx → handleEmailSubmit()` (after `FORGOT` succeeds) and `handleOtpReset()` (resend)
- **Content-Type**: `application/json`
- **With Credentials**: `true`

**Request Body**: None

**Expected Response**:
- `response.data.exists === true` → OTP email sent; advance to OTP entry step.
- `response.data.exists === false` → Show `response.data.message` alert.

---

### 3.3 `POST {VALIDATE}` — Verify Forgot-Password OTP

- **Used in**: `ForgotPassPageOne.jsx → handleOtpSubmit()` (Step 2)
- **Content-Type**: `application/x-www-form-urlencoded`
- **With Credentials**: `true`

**Request Body (form-urlencoded)**:
| Field | Type | Description |
| --- | --- | --- |
| `otp` | string (number) | OTP entered by the user |

**Expected Response**:
- `response.data.check === true` → OTP valid; advance to password reset step.
- `response.data.check !== true` → Invalid OTP; alert shown.

---

### 3.4 `POST {CHANGE}` — Set New Password

- **Used in**: `ForgotPassPageOne.jsx → handlePasswordSubmit()` (Step 3)
- **Content-Type**: `application/x-www-form-urlencoded`
- **With Credentials**: `true`

**Request Body (form-urlencoded)**:
| Field | Type | Description |
| --- | --- | --- |
| `newPassword` | string | New password (8+ chars, upper, lower, digit, special) |

**Expected Response**:
- **HTTP 201** → Password changed; frontend navigates to `/passwordsuccess`.
- Other status → Failed to update password; alert shown.

---

## 4. Dashboard — Account Info & Transactions

### 4.1 `GET {ACCOUNT_INFO}` — Fetch User Profile Info

- **Used in**: `Dashboard.jsx → fetchUserInfo()` (when user opens "Account Info" section)
- **Content-Type**: `application/json`
- **With Credentials**: `true`

**Request Body**: None

**Expected Response** (JSON or stringified JSON) — passed to `UserInformationDisplay`:
```json
{
  "accountInfo": { /* arbitrary user profile fields */ }
}
```

---

### 4.2 `GET {TRANSACTION_LIST}` — Fetch Full Transaction List

- **Used in**: `Dashboard.jsx → handleTransactionUIUpdate()` (when user opens "Transactions")
- **Content-Type**: `application/json`
- **With Credentials**: `true`

**Request Body**: None

**Expected Response** (JSON or stringified JSON):
```json
{
  "recentTransactions": [
    {
      "name": "string",
      "type": "Incoming | Outgoing",
      "status": "Completed | In Progress | Pending | Done",
      "date": "ISO date string",
      "amount": 0
    }
  ]
}
```

---

## 5. Dashboard — Pay or Transfer (OTP-secured)

### 5.1 `POST {PAY}` — Initiate Payment

- **Used in**: `Dashboard.jsx → handleSendPayment()` (Pay flow step 1)
- **Content-Type**: `application/x-www-form-urlencoded`
- **With Credentials**: `true`

**Request Body (form-urlencoded)**:
| Field | Type | Description |
| --- | --- | --- |
| `recipientName` | string | Account holder name of recipient |
| `recipientAccountNumber` | string | Recipient's account number |
| `amount` | number | Amount to transfer |
| `form` | string | Hardcoded: `"payment_email"` |
| `transactionDate` | string | `YYYY-MM-DDTHH:mm:ss` formatted local date/time |

**Expected Response**:
- `response.data.data === 2` → Valid recipient; frontend calls **OTP** endpoint to send the verification code.
- `response.data.data === 0` → Invalid account number.
- `response.data.data === 1` → Account number and recipient name do not match.

---

### 5.2 `GET {OTP}` — Send OTP for Payment

- **Used in**: `Dashboard.jsx → handleSendPayment()` (after `PAY` returns `data === 2`)
- **Content-Type**: `application/json`
- **With Credentials**: `true`

**Request Body**: None

**Expected Response**:
- `response.data.exists === true` → OTP sent; advance to OTP entry step.
- `response.data.exists === false` → Show `response.data.message`.

---

### 5.3 `POST {TRANSACTION}` — Verify Payment OTP & Execute Transfer

- **Used in**: `Dashboard.jsx → handleOtpSubmit()` (Pay flow step 2)
- **Content-Type**: `application/x-www-form-urlencoded`
- **With Credentials**: `true`

**Request Body (form-urlencoded)**:
| Field | Type | Description |
| --- | --- | --- |
| `otp` | string (number) | OTP entered by the user |

**Expected Response**:
- `response.data.data === 2` OR **HTTP 201** → Payment successful.
- `response.data.data === 0` → Wrong OTP; transaction failed.
- `response.data.data === 1` → Insufficient balance.

---

## 6. Dashboard — Auto Pay

### 6.1 `GET {AUTOPAY_LIST}` — Fetch Active Auto-Pay Mandates

- **Used in**: `Dashboard.jsx → handleAutoPayUIUpdate()` (when user opens "Auto Pay" tab)
- **Content-Type**: `application/json`
- **With Credentials**: `true`

**Request Body**: None

**Expected Response** (JSON or stringified JSON):
```json
{
  "existingAutopay": [
    {
      "autopay_Id": "string",
      "name": "string",
      "startDate": "ISO date string",
      "endDate": "ISO date string",
      "frequency": "Weekly | Monthly | Quaterly",
      "amount": 0
    }
  ]
}
```

---

### 6.2 `POST {AUTOPAY}` — Create New Auto-Pay Mandate

- **Used in**: `Dashboard.jsx → handleSetAutoPay()` (Auto Pay step 1)
- **Content-Type**: `application/x-www-form-urlencoded`
- **With Credentials**: `true`

**Request Body (form-urlencoded)**:
| Field | Type | Description |
| --- | --- | --- |
| `recipientName` | string | Recipient account holder name |
| `recipientAccountNumber` | string | Recipient account number |
| `endDate` | string (date) | End date (must be ≥ 7 days from today) |
| `paymentFrequency` | string | `weekly` / `monthly` / `quaterly` |
| `amount` | number | Amount per cycle |
| `autoPayDate` | string | `YYYY-MM-DDTHH:mm:ss` formatted start date/time |

**Expected Response**:
- `response.data.data === 0` → Invalid account number.
- `response.data.data === 1` → Account number and name do not match.
- `response.data.data === 2` OR **HTTP 201** → Mandate created; advance to password step.

---

### 6.3 `POST {AUTO_PWD}` — Verify Password & Activate Auto-Pay

- **Used in**: `Dashboard.jsx → handleAutoPayPassword()` (Auto Pay step 2)
- **Content-Type**: `application/x-www-form-urlencoded`
- **With Credentials**: `true`

**Request Body (form-urlencoded)**:
| Field | Type | Description |
| --- | --- | --- |
| `password` | string | User's account password |

**Expected Response**:
- `response.data.data === 0` → Wrong password.
- `response.data.data === 1` → Auto-pay created, but insufficient balance for first transaction (alert shown).
- `response.data.data === 2` → Auto-pay activated successfully.

---

### 6.4 `POST {DROP_AUTOPAY}` — Delete an Auto-Pay Mandate

- **Used in**: `Dashboard.jsx → handleAutoPayDelete(transaction)` (Stop button)
- **Content-Type**: `application/x-www-form-urlencoded`
- **With Credentials**: `true`

**Request Body (form-urlencoded)**:
| Field | Type | Description |
| --- | --- | --- |
| `autopay_Id` | string | ID of the auto-pay mandate to delete |

**Expected Response**:
- `response.data.data === 1` OR **HTTP 201** → Deleted successfully.
- Other → Show `response.data.message`.

---

## 7. Dashboard — Fixed Deposit

### 7.1 `GET {EXISTING_FD}` — Fetch Active Fixed Deposits

- **Used in**: `Dashboard.jsx → handleFixedDepositUIUpdate()` (when user opens "Fixed Deposit" tab)
- **Content-Type**: `application/json`
- **With Credentials**: `true`

**Request Body**: None

**Expected Response** (JSON or stringified JSON):
```json
{
  "recentFD": [
    {
      "fd_Id": "string",
      "name": "string",
      "interestRate": 0,
      "amount": 0,
      "endDate": "ISO date string"
    }
  ]
}
```

---

### 7.2 `POST {FD}` — Open a New Fixed Deposit

- **Used in**: `Dashboard.jsx → handleOpenFixedDeposit()` (FD step 1)
- **Content-Type**: `application/x-www-form-urlencoded`
- **With Credentials**: `true`

**Request Body (form-urlencoded)**:
| Field | Type | Description |
| --- | --- | --- |
| `depositAmount` | number | Amount to deposit |
| `depositDuration` | string | `6` (months) / `1` / `3` / `5` (years) |
| `interestRate` | number | Frontend-computed: `4.5` / `5.0` / `5.5` / `6.0` |
| `fixedDepositDate` | string | `YYYY-MM-DDTHH:mm:ss` formatted open date/time |

**Expected Response**:
- `response.data.data === 0` → Insufficient balance to create FD.
- `response.data.data === 1` → FD created; advance to password step.

---

### 7.3 `POST {FD_PWD}` — Verify Password & Confirm FD

- **Used in**: `Dashboard.jsx → handleFixedDepositPassword()` (FD step 2)
- **Content-Type**: `application/x-www-form-urlencoded`
- **With Credentials**: `true`

**Request Body (form-urlencoded)**:
| Field | Type | Description |
| --- | --- | --- |
| `fdpassword` | string | User's account password |

**Expected Response**:
- `response.data.data === 0` → Wrong password.
- `response.data.data === 1` OR **HTTP 201** → FD confirmed successfully.

---

### 7.4 `POST {DROP_FD}` — Delete a Fixed Deposit

- **Used in**: `Dashboard.jsx → handleFdDelete(transaction)` (Stop button on an FD row)
- **Content-Type**: `application/x-www-form-urlencoded`
- **With Credentials**: `true`

**Request Body (form-urlencoded)**:
| Field | Type | Description |
| --- | --- | --- |
| `fd_Id` | string | ID of the fixed deposit to delete |

**Expected Response**:
- `response.data.data === 1` OR **HTTP 201** → FD deleted successfully.
- Other → Show `response.data.message`.

---

## 8. Account Deletion

### 8.1 `POST {DELETE_ACCOUNT}` — Delete User Account

- **Used in**: `Dashboard.jsx → handleAccountDelete()` (Account Info → Delete Account)
- **Content-Type**: `application/x-www-form-urlencoded`
- **With Credentials**: `true`

**Request Body (form-urlencoded)**:
| Field | Type | Description |
| --- | --- | --- |
| `password` | string | User's account password (confirmation) |

**Expected Response**:
- `response.data.data === 0` → Wrong password.
- `response.data.data === 1` → AutoPay is still associated; user must delete it first.
- `response.data.data === 2` → A Fixed Deposit is still associated; user must delete it first.
- `response.data.data === 3` AND **HTTP 201** → Account deleted. `response.data.amount` carries the forfeited balance to display in the success modal; frontend auto-redirects to `/login` after 3s.

---

## 9. Chatbot (External Service)

### 9.1 `POST https://chatbot-backend-neeo.onrender.com/get` — Send Chat Message

- **Used in**: `ChatBot.jsx → handleSubmit()`
- **Content-Type**: `application/json` (default for Axios)
- **With Credentials**: `false` (external service)

**Request Body (JSON)**:
| Field | Type | Description |
| --- | --- | --- |
| `msg` | string | The user's chat message |

**Expected Response**:
- Plain text / string body used directly as the bot reply (`response.data`).
- On error → Fallback message: `"Sorry, something went wrong!"`.

---

## Endpoint Summary

| # | Method | Endpoint Constant | Real Env Var | Purpose |
| - | ------ | ----------------- | ------------ | ------- |
| 1 | POST | `LOGIN` | `VITE_API_LOGIN` | User login |
| 2 | GET | `HOME` | `VITE_API_HOME` | Get session / account details |
| 3 | GET | `OTP` | `VITE_API_OTP` | Send OTP (registration / forgot password / payment) |
| 4 | POST | `FORGOT` | `VITE_API_FORGOT` | Submit forgot-password email |
| 5 | POST | `VALIDATE` | `VITE_API_VALIDATE` | Verify forgot-password OTP |
| 6 | POST | `CHANGE` | `VITE_API_CHANGE` | Set new password |
| 7 | POST | `TRANSACTION` | `VITE_API_TRANSACTION` | Verify payment OTP & execute transfer |
| 8 | GET | `TRANSACTION_LIST` | `VITE_API_TRANSACTION_LIST` | Fetch full transaction list |
| 9 | GET | `AUTOPAY_LIST` | `VITE_API_AUTOPAY_LIST` | Fetch active auto-pay mandates |
| 10 | GET | `EXISTING_FD` | `VITE_API_EXISTING_FD` | Fetch active fixed deposits |
| 11 | POST | `AUTOPAY` | `VITE_API_AUTOPAY` | Create new auto-pay mandate |
| 12 | POST | `AUTO_PWD` | `VITE_API_AUTO_PWD` | Verify password & activate auto-pay |
| 13 | GET | `LOGOUT` | `VITE_API_LOGOUT` | Logout |
| 14 | POST | `DROP_FD` | `VITE_API_DROP_FD` | Delete a fixed deposit |
| 15 | POST | `DROP_AUTOPAY` | `VITE_API_DROP_AUTOPAY` | Delete an auto-pay mandate |
| 16 | POST | `FD` | `VITE_API_FD` | Open a new fixed deposit |
| 17 | POST | `FD_PWD` | `VITE_API_FD_PWD` | Verify password & confirm FD |
| 18 | GET | `ACCOUNT_INFO` | `VITE_API_ACCOUNT_INFO` | Fetch user profile info |
| 19 | POST | `PAY` | `VITE_API_PAY` | Initiate payment |
| 20 | POST | `CHECK_EMAIL` | `VITE_API_CHECK_EMAIL` | Check email & phone availability |
| 21 | POST | `CHECK_USER_ID` | `VITE_API_CHECK_USER_ID` | Check username availability |
| 22 | POST | `VALIDATE_OTP` | `VITE_API_VALIDATE_OTP` | Verify registration OTP |
| 23 | POST | `DELETE_ACCOUNT` | `VITE_API_DELETE_ACCOUNT` | Delete user account |
| 24 | POST | *(external)* | — | Chatbot (separate service) |
