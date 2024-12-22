# Smart Farming Security Monitor WebApp

## Overview
The **Smart Farming Security Monitor WebApp** enhances farm security by integrating IoT devices and a user-friendly web interface. This project uses PIR sensors to detect motion and provides real-time monitoring and control over farm security systems.

## Features
- **User Authentication**: Secure login and signup functionality.
- **Real-Time Monitoring**: View motion detection data from PIR sensors.
- **Device Control**: Toggle current (ON/OFF) through the web interface.
- **IoT Integration**: Uses MQTT for communication between ESP32, sensors, and the web app.

## Technology Stack
- **Frontend**: React
- **Backend**: Node.js, Express.js
- **Database**: MySQL (connected via Node-RED)
- **IoT Devices**: ESP32 with PIR sensors
- **Communication Protocol**: MQTT

## Data Flow
1. PIR sensors detect motion and send data to ESP32.
2. ESP32 publishes data to an MQTT broker.
3. Node-RED processes the data and stores it in MySQL.
4. The web application fetches data from MySQL and provides controls to manage current status.
5. Current ON/OFF commands are sent from the website to the ESP32 via MQTT.

## Setup Instructions

### Prerequisites
- Node.js installed
- MySQL database configured
- MQTT broker setup
- Node-RED installed and configured
- ESP32 connected with PIR sensors

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/smart-farming-security-monitor.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Additional Information
- **Data Flow Control**: The website’s ON/OFF buttons control the current via MQTT, enabling seamless management of the farm's electrical devices.
- **IoT Data Handling**: Motion data from PIR sensors is processed in Node-RED and stored in MySQL, ensuring secure and efficient data management.
