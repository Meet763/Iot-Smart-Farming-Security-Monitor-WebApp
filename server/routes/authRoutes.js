import express from 'express'
import { pool } from '../lib/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import mqtt from 'mqtt'
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router()

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM user WHERE email = ?', [email]);
        if (rows.length > 0) {
            return res.status(409).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query("INSERT INTO user (username, email, password) VALUES (?, ?, ?)", [username, email, hashedPassword]);
        return res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        return res.status(500).json(err.message);
    }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await pool.query('SELECT * FROM user WHERE email = ?', [email])
        if (rows.length === 0) {
            return res.status(404).json({ message: "user not existed" })
        }
        const isMatch = await bcrypt.compare(password, rows[0].password)
        if (!isMatch) {
            return res.status(401).json({ message: "wrong password" })
        }
        const token = jwt.sign({ id: rows[0].id }, process.env.JWT_KEY, { expiresIn: '3h' })

        return res.status(201).json({ token: token, data:rows[0] })
    } catch (err) {
        return res.status(500).json(err.message)
    }
})

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(403).json({ message: "Invalid Token Format" });
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: "No Token Provided" })
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.userId = decoded.id;
        next()
    } catch (err) {
        return res.status(500).json({ message: "server error" })
    }
}

router.get('/home', verifyToken, async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM sensor_data ORDER BY Time DESC LIMIT 1');
        return res.status(200).json(rows[0]);  // Ensure you're sending an object, not an array, if only one record is expected
    } catch (err) {
        return res.status(500).json({ message: "server error" })
    }
});

const serverIp = process.env.DB_HOST;

const mqttClient = mqtt.connect(`mqtt://${serverIp}`, {
    username: process.env.mqtt_user,
    password: process.env.mqtt_pass,
});

const mqttTopicControl = "CONTROL_TOPIC";

mqttClient.on("connect", () => {
    console.log("Connected to MQTT Broker");
});

router.post('/control', verifyToken, async (req, res) => {
    const { action } = req.body;

    if (!action) {
        return res.status(400).json({ message: "Action is required" });
    }

    switch (action) {
        case "start":
            mqttClient.publish(mqttTopicControl, "1");
            return res.status(200).json({ message: "Electric current started!" });
        case "stop":
            mqttClient.publish(mqttTopicControl, "0");
            return res.status(200).json({ message: "Electric current stopped!" });
        default:
            return res.status(400).json({ message: "Invalid action. Use 'start' or 'stop'." });
    }
});

export default router;
