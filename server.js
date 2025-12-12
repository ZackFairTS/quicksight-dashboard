const express = require('express');
const https = require('https');
const fs = require('fs');
const { QuickSightClient, GenerateEmbedUrlForRegisteredUserCommand } = require('@aws-sdk/client-quicksight');
require('dotenv').config();

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

const quicksight = new QuickSightClient({
    region: 'us-east-1'
});

app.get('/debug-domain', (req, res) => {
    const host = req.get('host');
    const origin = req.get('origin');
    const referer = req.get('referer');
    const protocol = req.secure ? 'https' : 'http';
    
    res.json({
        host: host,
        origin: origin,
        referer: referer,
        protocol: protocol,
        fullUrl: `${protocol}://${host}`,
        secure: req.secure,
        headers: req.headers
    });
});

app.post('/generate-embed-url', async (req, res) => {
    try {
        const host = req.get('host') || 'localhost:3000';
        const protocol = req.secure ? 'https' : 'http';
        
        console.log('Request host:', host);
        console.log('Request protocol:', protocol);
        console.log('Is secure:', req.secure);
        
        let allowedDomains = [];
        
        // For public IP addresses, only use HTTPS
        if (host.includes('localhost') || host.includes('127.0.0.1')) {
            allowedDomains = [
                'http://localhost:3000',
                'https://localhost:3000'
            ];
        } else {
            // For public addresses, use HTTPS
            allowedDomains = [
                `https://${host}`,
                'https://localhost:3000'
            ];
        }
        
        // Remove duplicates and limit to 3
        const uniqueDomains = [...new Set(allowedDomains)].slice(0, 3);
        console.log('Allowed domains:', uniqueDomains);
        
        const params = {
            AwsAccountId: process.env.AWS_ACCOUNT_ID || 'YOUR_AWS_ACCOUNT_ID',
            ExperienceConfiguration: {
                QuickSightConsole: {
                    InitialPath: '/start'
                }
            },
            UserArn: process.env.QUICKSIGHT_USER_ARN || 'arn:aws:quicksight:us-east-1:YOUR_AWS_ACCOUNT_ID:user/default/YOUR_USERNAME',
            AllowedDomains: uniqueDomains,
            SessionLifetimeInMinutes: 100
        };

        const command = new GenerateEmbedUrlForRegisteredUserCommand(params);
        const result = await quicksight.send(command);
        console.log('Generated URL:', result.EmbedUrl);
        res.json({ embedUrl: result.EmbedUrl });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/generate-quickchat-url', async (req, res) => {
    try {
        const host = req.get('host') || 'localhost:3000';
        const protocol = req.secure ? 'https' : 'http';
        
        let allowedDomains = [];
        
        if (host.includes('localhost') || host.includes('127.0.0.1')) {
            allowedDomains = [
                'http://localhost:3000',
                'https://localhost:3000'
            ];
        } else {
            allowedDomains = [
                `https://${host}`,
                'https://localhost:3000'
            ];
        }
        
        const uniqueDomains = [...new Set(allowedDomains)].slice(0, 3);
        console.log('QuickChat allowed domains:', uniqueDomains);
        
        const params = {
            AwsAccountId: process.env.AWS_ACCOUNT_ID,
            UserArn: process.env.QUICKSIGHT_USER_ARN,
            ExperienceConfiguration: {
                QuickChat: {}
            },
            AllowedDomains: uniqueDomains,
            SessionLifetimeInMinutes: 100
        };

        const command = new GenerateEmbedUrlForRegisteredUserCommand(params);
        const result = await quicksight.send(command);
        console.log('Generated QuickChat URL:', result.EmbedUrl);
        res.json({ embedUrl: result.EmbedUrl });
    } catch (error) {
        console.error('QuickChat Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// HTTPS configuration
const httpsOptions = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

https.createServer(httpsOptions, app).listen(port, '0.0.0.0', () => {
    console.log(`HTTPS Server running at https://0.0.0.0:${port}`);
    console.log('Access via public IP: https://YOUR_PUBLIC_IP:3000');
});
