# 🔗 Kitty Magic Chat – API Flow (F-1 to F-12)

End-to-end flow from app launch → 1-to-1 message → real-time sync → moderation → recovery.

---

## Phase 0: App Launch & Authentication

**Method:** `POST /auth/refresh`
```json
{ "refresh_token": "abc123" }
```
⬇️
**Response:**
```json
{ "access_token": "jwt.token.string" }
```

**WS Connect (namespace: /chat)**  
```
wss://api.kittymagic.com/chat/socket.io/?EIO=4&transport=websocket
Authorization: Bearer <JWT>
```

---

## Phase 1: Discover or Start a 1-to-1 Conversation (F-1)

**POST /conversations**
```json
{ "peer_user_id": "b-user-id" }
```
⬇️
```json
{
  "conversation_id": "conv-a-b-uuid",
  "created_at": "2025-04-24T10:00:00Z"
}
```

---

## Phase 2: Send a Text Message (F-1)

**Socket.IO Event:** `sendMessage`
```json
{
  "conversation_id": "conv-a-b-uuid",
  "temp_id": "temp-123",
  "message_type": "TEXT",
  "content": "Hey B! 👋"
}
```

⬇️
**WS Emit:** `newMessage`
```json
{
  "message_id": "msg-uuid",
  "sender_id": "a-id",
  "message_type": "TEXT",
  "content": "Hey B! 👋",
  "sent_at": "2025-04-24T10:01:00Z"
}
```

---

## Phase 3: Send a Media Message (F-3)

**1. Upload Media**
**POST /media/upload**
(multipart/form-data with image/video)

⬇️
```json
{ "media_id": "media-uuid", "thumb_url": "https://..." }
```

**2. Send Media Message**
**Socket.IO:** `sendMessage`
```json
{
  "conversation_id": "conv-a-b-uuid",
  "message_type": "MEDIA",
  "media_id": "media-uuid"
}
```

---

## Phase 4: Add Reaction (F-4)

**PUT /conversations/{cid}/messages/{mid}/reactions/{emoji}**
```http
PUT /conversations/conv-a-b-uuid/messages/msg-uuid/reactions/❤️
Authorization: Bearer <JWT>
```

⬇️
WS Emit → `reactionUpdated`

---

## Phase 5: Group Poll (F-5)

**POST /groups/{gid}/messages**
```json
{
  "message_type": "POLL",
  "poll": {
    "question": "What's for lunch?",
    "options": ["Pizza", "Salad"],
    "expires_at": "2025-04-25T12:00:00Z",
    "is_multi": false,
    "is_anon": true
  }
}
```

⬇️
Poll bubble rendered in UI.

---

## Phase 6: Edit & Delete (F-6)

**PATCH /conversations/{cid}/messages/{mid}**
```json
{ "content": "Corrected message" }
```

**DELETE /conversations/{cid}/messages/{mid}**

---

## Phase 7: Search Messages (F-7)

**GET /search/messages?query=hello&group_id=gid**
⬇️
```json
{
  "items": [{ "message_id": "msg-uuid", "content": "hello there" }]
}
```

---

## Phase 8: Push Notification (F-8)

**Triggered by backend:**  
• User B is offline → FCM payload  
```json
{
  "title": "New message from A",
  "body": "Hey B! 👋"
}
```

---

## Phase 9: Offline Queue & Sync (F-9)

1. Message saved in AsyncStorage
2. On reconnect:  
**GET /conversations/{cid}/messages?page_state=<ts>**  
⬇️ fetch missed messages.

---

## Phase 10: Admin Moderation (F-10)

**PATCH /groups/{gid}**
```json
{ "is_frozen": true }
```

**DELETE /groups/{gid}/members/{uid}** – kick user

**GET /groups/{gid}/export** → download CSV

---

## Phase 11: End-to-End Encryption (F-11 - future)

**Socket.IO message:**
```json
{
  "conversation_id": "cid",
  "ciphertext": "base64-blob",
  "ratchet_id": "olm-session-id"
}
```

---

## Phase 12: Event Webhooks (F-12)

Redis Stream: `ev:pm.sent`  
```json
{
  "message_id": "msg-uuid",
  "conversation_id": "conv-id",
  "sender_id": "a-id",
  "content": "Hey B!",
  "ts": 1713960000000
}
```

Stream: `ev:message.deleted`, `ev:group.created`, etc. also emitted.

---

✅ This sequence hits **every functional requirement (F-1 → F-12)** and provides **exact endpoint/method/payload format** for implementation & testing.
