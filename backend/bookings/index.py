import json
import os
import uuid
import psycopg2

SCHEMA = os.environ.get("MAIN_DB_SCHEMA", "public")

def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])

def handler(event: dict, context) -> dict:
    """Управление бронированиями: создание, получение своих броней, получение всех (для админа).
    GET ?mode=my  — брони клиента (заголовок X-Client-Id)
    GET ?mode=admin — все брони (заголовок X-Admin-Password)
    POST — создать бронь
    PUT ?mode=status — обновить статус (заголовок X-Admin-Password)
    """
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-Client-Id, X-Admin-Password",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    method = event.get("httpMethod", "GET")
    params = event.get("queryStringParameters") or {}
    mode = params.get("mode", "")

    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        client_id = event.get("headers", {}).get("X-Client-Id") or str(uuid.uuid4())
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"""INSERT INTO {SCHEMA}.bookings (client_id, service, date, time, name, phone, dog)
                VALUES (%s, %s, %s, %s, %s, %s, %s) RETURNING id, created_at""",
            (client_id, body["service"], body["date"], body["time"],
             body["name"], body["phone"], body["dog"])
        )
        row = cur.fetchone()
        conn.commit()
        conn.close()
        return {
            "statusCode": 200,
            "headers": cors,
            "body": json.dumps({"id": row[0], "client_id": client_id, "created_at": str(row[1])})
        }

    if method == "GET" and mode == "my":
        client_id = event.get("headers", {}).get("X-Client-Id", "")
        if not client_id:
            return {"statusCode": 400, "headers": cors, "body": json.dumps({"error": "no client_id"})}
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"""SELECT id, service, date, time, name, phone, dog, status, created_at
                FROM {SCHEMA}.bookings WHERE client_id = %s ORDER BY created_at DESC""",
            (client_id,)
        )
        rows = cur.fetchall()
        conn.close()
        bookings = [
            {"id": r[0], "service": r[1], "date": r[2], "time": r[3],
             "name": r[4], "phone": r[5], "dog": r[6], "status": r[7], "created_at": str(r[8])}
            for r in rows
        ]
        return {"statusCode": 200, "headers": cors, "body": json.dumps(bookings)}

    if method == "GET" and mode == "admin":
        password = event.get("headers", {}).get("X-Admin-Password", "")
        if password != os.environ.get("ADMIN_PASSWORD", ""):
            return {"statusCode": 401, "headers": cors, "body": json.dumps({"error": "unauthorized"})}
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"""SELECT id, service, date, time, name, phone, dog, status, created_at
                FROM {SCHEMA}.bookings ORDER BY created_at DESC"""
        )
        rows = cur.fetchall()
        conn.close()
        bookings = [
            {"id": r[0], "service": r[1], "date": r[2], "time": r[3],
             "name": r[4], "phone": r[5], "dog": r[6], "status": r[7], "created_at": str(r[8])}
            for r in rows
        ]
        return {"statusCode": 200, "headers": cors, "body": json.dumps(bookings)}

    if method == "PUT" and mode == "status":
        password = event.get("headers", {}).get("X-Admin-Password", "")
        if password != os.environ.get("ADMIN_PASSWORD", ""):
            return {"statusCode": 401, "headers": cors, "body": json.dumps({"error": "unauthorized"})}
        body = json.loads(event.get("body") or "{}")
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"UPDATE {SCHEMA}.bookings SET status = %s WHERE id = %s",
            (body["status"], body["id"])
        )
        conn.commit()
        conn.close()
        return {"statusCode": 200, "headers": cors, "body": json.dumps({"ok": True})}

    return {"statusCode": 404, "headers": cors, "body": json.dumps({"error": "not found"})}
