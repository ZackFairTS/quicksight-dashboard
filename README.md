# QuickSight Dashboard Web Service

A Node.js web service for embedding AWS QuickSight dashboards with dynamic URL generation and HTTPS support.

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
   
   Example:
   ```
   AWS_ACCOUNT_ID=123456789012
   QUICKSIGHT_USER_ARN=arn:aws:quicksight:us-east-1:123456789012:user/default/your-username
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
   - Local: https://localhost:3000
   - Public: https://YOUR_PUBLIC_IP:3000

## Configuration

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `AWS_ACCOUNT_ID` | Your AWS account ID | `123456789012` |
| `QUICKSIGHT_USER_ARN` | QuickSight user ARN | `arn:aws:quicksight:us-east-1:123456789012:user/default/username` |

### AWS Requirements

- AWS credentials with QuickSight permissions
- QuickSight user registered in your account
- Appropriate IAM permissions for QuickSight embedding

### QuickSight User ARN Format

The QuickSight User ARN follows this format:
```
arn:aws:quicksight:REGION:ACCOUNT_ID:user/NAMESPACE/USERNAME
```

- `REGION`: AWS region (e.g., us-east-1)
- `ACCOUNT_ID`: Your 12-digit AWS account ID
- `NAMESPACE`: Usually 'default'
- `USERNAME`: Your QuickSight username

## Features

- Dynamic QuickSight embed URL generation
- HTTPS support with self-signed certificates
- Automatic domain configuration for CORS
- Debug tools for troubleshooting
- Responsive web interface

## Security Notes

- Never commit `.env` files to version control
- Use environment variables for sensitive information
- Generate new SSL certificates for production use
- Ensure proper AWS IAM permissions are configured

## Troubleshooting

1. **CORS Issues**: Ensure your domain is properly configured in AllowedDomains
2. **Authentication**: Verify AWS credentials and QuickSight user permissions
3. **SSL Certificates**: Generate certificates with correct domain/IP information

## Development

The application uses:
- Express.js for the web server
- AWS SDK for QuickSight integration
- HTTPS with self-signed certificates
- Environment variables for configuration
