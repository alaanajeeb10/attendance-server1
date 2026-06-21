let tableName = "attendance_records";
let employeesTable = "employees";

async function SaveEmployee(worker_id, full_name){
    const Query = `
        INSERT INTO ${employeesTable} (employee_code, full_name)
        VALUES (?, ?)
        ON DUPLICATE KEY UPDATE full_name = VALUES(full_name)
    `;
    let values = [worker_id, full_name];
    return await GenObj_Mid.QueryExecSimpleReply(Query, values);
}

async function AddEntry(req,res,next){
    let worker_id = req.body.worker_id || "";
    let full_name = req.body.full_name || "";
    let note = req.body.note || "";
    note = note.substring(0,255);    worker_id = worker_id.trim();
    full_name = full_name.trim();
    res.ok = false;
    res.err = "";

    if(worker_id.trim() === "" || full_name.trim() === ""){        res.err = "wrong parameters";
        return next();
    }

    let employeeRows = await SaveEmployee(worker_id, full_name);
    if(employeeRows === false){
        res.err = "חלה תקלה בשמירת העובד";
        return res.status(500).json({status:"ERROR", err:res.err});
    }

    const Query = `
        INSERT INTO ${tableName}
        (employee_code, record_type, record_date, record_time, remarks)
        VALUES (?, 'ENTRY', CURDATE(), CURTIME(), ?)
    `;

    let values = [worker_id, note];

    let rows = await GenObj_Mid.QueryExecSimpleReply(Query, values);

    if(rows === false){
        res.err = "חלה תקלה, נא לנסות שנית";
        return res.status(500).json({status:"ERROR", Query:Query, err:res.err, values:values});
    }

    res.ok = true;
    res.insertId = rows.insertId;
    next();
}

async function AddExit(req,res,next){
    let worker_id = req.body.worker_id || "";
    let full_name = req.body.full_name || "";
    let note = req.body.note || "";
    note = note.substring(0,255);
    res.ok = false;
    res.err = "";

    if(worker_id.trim() === "" || full_name.trim() === ""){        res.err = "wrong parameters";
        return next();
    }

    let employeeRows = await SaveEmployee(worker_id, full_name);
    if(employeeRows === false){
        res.err = "חלה תקלה בשמירת העובד";
        return res.status(500).json({status:"ERROR", err:res.err});
    }

    const Query = `
        INSERT INTO ${tableName}
        (employee_code, record_type, record_date, record_time, remarks)
        VALUES (?, 'EXIT', CURDATE(), CURTIME(), ?)
    `;

    let values = [worker_id, note];

    let rows = await GenObj_Mid.QueryExecSimpleReply(Query, values);

    if(rows === false){
        res.err = "חלה תקלה, נא לנסות שנית";
        return res.status(500).json({status:"ERROR", Query:Query, err:res.err, values:values});
    }

    res.ok = true;
    res.insertId = rows.insertId;
    next();
}

async function GetMonthlyReport(req,res,next){
    let worker_id = req.query.worker_id || "";
    let month     = req.query.month     || "";
    let year      = req.query.year      || "";

    res.ok = false;
    res.err = "";

    if(worker_id === "" || month === "" || year === ""){
        res.err="Missing required parameters";
        return next();
    }

    let Query = `
        SELECT 
            ar.id,
            ar.employee_code AS worker_id,
            e.full_name,
            ar.record_type AS action_type,
            DATE_FORMAT(ar.record_date,'%Y-%m-%d') AS action_date,
            ar.record_time AS action_time,
            ar.remarks AS note
        FROM ${tableName} ar
        JOIN ${employeesTable} e
        ON ar.employee_code = e.employee_code
        WHERE ar.employee_code = ?
        AND MONTH(ar.record_date) = ?
        AND YEAR(ar.record_date) = ?
        ORDER BY ar.record_date, ar.record_time
    `;

    let values = [worker_id, month, year];

    let rows = await GenObj_Mid.QueryExecSimpleReply(Query, values);

    if(rows === false){
        res.err = "חלה תקלה, נא לנסות שנית";
        return res.status(500).json({status:"ERROR", Query:Query, err:res.err, values:values});
    }

    res.ok = true;
    req.ItemsData = {list:rows};
    next();
}

module.exports = {
    AddEntry,
    AddExit,
    GetMonthlyReport
};