# QuickSight Dashboard Web Service

A Node.js web service for embedding AWS QuickSight dashboards and QuickChat with dynamic URL generation and HTTPS support.

## Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Configure AWS credentials:**
```bash
aws configure
```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Update the following values in `.env`:
     - `AWS_ACCOUNT_ID`: Your AWS account ID (12-digit number)
     - `QUICKSIGHT_USER_ARN`: Your QuickSight user ARN
     - `QUICKCHAT_AGENT_ARN`: Your QuickChat agent ARN (optional)
   
   Example:
   ```
   AWS_ACCOUNT_ID=123456789012
   QUICKSIGHT_USER_ARN=arn:aws:quicksight:us-east-1:123456789012:user/default/your-username
   QUICKCHAT_AGENT_ARN=arn:aws:quicksight:us-east-1:123456789012:agent/your-agent-id
   ```

4. **Generate SSL certificates for HTTPS:**
```bash
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes -subj "/C=US/ST=State/L=City/O=Organization/CN=YOUR_PUBLIC_IP"
```

5. **Start the server:**
```bash
npm start
```

6. **Access the application:**
   - Main interface: https://localhost:3000 or https://YOUR_PUBLIC_IP:3000
   - QuickChat only: https://localhost:3000/quickchat.html

## Pages

### Main Interface (`index.html`)
- Tabbed interface with Dashboard and QuickChat views
- Integrated debugging tools
- Responsive design

### QuickChat Interface (`quickchat.html`)
- Dedicated QuickChat embedding page
- Simplified interface focused on chat functionality
- Configurable agent ARN support

## Configuration

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `AWS_ACCOUNT_ID` | Your AWS account ID | `123456789012` |
| `QUICKSIGHT_USER_ARN` | QuickSight user ARN | `arn:aws:quicksight:us-east-1:123456789012:user/default/username` |
| `QUICKCHAT_AGENT_ARN` | QuickChat agent ARN (optional) | `arn:aws:quicksight:us-east-1:123456789012:agent/agent-id` |

### AWS Requirements

- AWS credentials with QuickSight permissions
- QuickSight user registered in your account
- Appropriate IAM permissions for QuickSight embedding
- QuickChat agent configured (for chat functionality)

### QuickSight User ARN Format

The QuickSight User ARN follows this format:
```
arn:aws:quicksight:REGION:ACCOUNT_ID:user/NAMESPACE/USERNAME
```

- `REGION`: AWS region (e.g., us-east-1)
- `ACCOUNT_ID`: Your 12-digit AWS account ID
- `NAMESPACE`: Usually 'default'
- `USERNAME`: Your QuickSight username

### QuickChat Agent ARN Format

The QuickChat Agent ARN follows this format:
```
arn:aws:quicksight:REGION:ACCOUNT_ID:agent/AGENT_ID
```

## Features

- **Dashboard Embedding**: Dynamic QuickSight console embed URL generation
- **QuickChat Integration**: AI-powered chat interface with configurable agents
- **HTTPS Support**: Self-signed certificates for secure connections
- **CORS Configuration**: Automatic domain configuration for cross-origin requests
- **Debug Tools**: Built-in troubleshooting and domain debugging
- **Responsive Interface**: Works on desktop and mobile devices
- **Dual Access**: Main tabbed interface and dedicated QuickChat page

## API Endpoints

- `POST /generate-embed-url`: Generate QuickSight console embed URL
- `POST /generate-quickchat-url`: Generate QuickChat embed URL
- `GET /debug-domain`: Debug domain and CORS configuration
- `GET /health`: Health check endpoint

## Security Notes

- Never commit `.env` files to version control
- Use environment variables for sensitive information
- Generate new SSL certificates for production use
- Ensure proper AWS IAM permissions are configured
- Agent ARNs are configured in frontend for security

## Troubleshooting

1. **CORS Issues**: Ensure your domain is properly configured in AllowedDomains
2. **Authentication**: Verify AWS credentials and QuickSight user permissions
3. **SSL Certificates**: Generate certificates with correct domain/IP information
4. **QuickChat Issues**: Verify agent ARN is correct and agent is active

## Development

The application uses:
- Express.js for the web server
- AWS SDK v3 for QuickSight integration
- QuickSight Embedding SDK v2.11.0
- HTTPS with self-signed certificates
- Environment variables for configuration
