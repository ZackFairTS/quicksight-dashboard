# QuickSight Dashboard Web Service

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure AWS credentials:
```bash
aws configure
```

3. Update `server.js`:
   - Replace `YOUR_DASHBOARD_ID` with your actual dashboard ID
   - Update AWS account ID if different

4. Start the server:
```bash
npm start
```

5. Open http://localhost:3000 in your browser

## Requirements

- AWS credentials with QuickSight permissions
- Valid QuickSight dashboard ID
- Node.js installed
