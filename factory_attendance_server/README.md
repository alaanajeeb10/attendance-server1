# factory_attendance_server

צד שרת למערכת שעון נוכחות במפעל.

## הפעלה

1. לפתוח את התיקייה ב-WebStorm.
2. להריץ:

```bash
npm install
```

3. להפעיל MySQL ולייבא את הקובץ:

```txt
factory_attendance.sql
```

4. לבדוק בקובץ `gen_params.js` שהפרטים נכונים:

```js
exports.HOST        ="localhost";
exports.USER        ="root";
exports.PASSWORD    ="";
exports.DATABASE    ="factory_attendance";
```

5. להריץ:

```bash
npm start
```

השרת רץ על:

```txt
http://localhost:6127
```

## API

```txt
POST http://localhost:6127/api/ATT/Entry
POST http://localhost:6127/api/ATT/Exit
GET  http://localhost:6127/api/ATT/Report?worker_id=216622415&month=1&year=2026
```

## הערה

הקוד כתוב בשיטת הקורס: Router + Middleware + GenObj_Mid + res.ok/res.err.
