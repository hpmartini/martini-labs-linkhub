import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Allow CORS for the frontend
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('SLACK_WEBHOOK_URL not configured');
    return res.status(500).json({ error: 'Webhook not configured' });
  }

  // Extract metadata from headers
  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim()
    || req.headers['x-real-ip']
    || 'Unknown';
  const userAgent = req.headers['user-agent'] || 'Unknown';

  // Vercel geo headers
  const geo = {
    city: decodeURIComponent(req.headers['x-vercel-ip-city'] as string || 'Unknown'),
    country: req.headers['x-vercel-ip-country'] || 'Unknown',
    region: req.headers['x-vercel-ip-country-region'] || 'Unknown',
  };

  // Client-side data from request body
  const clientData = req.body || {};

  // Parse user agent for friendly display
  const deviceInfo = parseUserAgent(userAgent as string);

  // Get current time in German timezone
  const timestamp = new Date().toLocaleString('de-DE', {
    timeZone: 'Europe/Berlin',
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  // Determine which site was scanned
  const site = clientData.site || 'Unknown';

  // Format Slack message with Block Kit
  const slackMessage = {
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: "📱 Business Card Scanned!",
          emoji: true
        }
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*📍 Location:*\n${geo.city}, ${geo.region}\n${geo.country}`
          },
          {
            type: "mrkdwn",
            text: `*${deviceInfo.emoji} Device:*\n${deviceInfo.name}`
          },
          {
            type: "mrkdwn",
            text: `*🕐 Time:*\n${timestamp}`
          },
          {
            type: "mrkdwn",
            text: `*📐 Screen:*\n${clientData.screen || 'Unknown'}`
          },
        ]
      },
      {
        type: "context",
        elements: [
          {
            type: "mrkdwn",
            text: `🌐 Site: ${site} | 🔤 Lang: ${clientData.language || 'Unknown'} | 🔗 IP: \`${ip}\``
          }
        ]
      },
      {
        type: "divider"
      }
    ]
  };

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slackMessage),
    });

    if (!response.ok) {
      console.error('Slack webhook failed:', response.status, await response.text());
      return res.status(500).json({ error: 'Failed to send notification' });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Error sending to Slack:', error);
    return res.status(500).json({ error: 'Internal error' });
  }
}

interface DeviceInfo {
  emoji: string;
  name: string;
}

function parseUserAgent(ua: string): DeviceInfo {
  // Mobile devices
  if (ua.includes('iPhone')) {
    const match = ua.match(/iPhone OS (\d+)/);
    return { emoji: '📱', name: `iPhone (iOS ${match?.[1] || '?'})` };
  }
  if (ua.includes('iPad')) {
    return { emoji: '📱', name: 'iPad' };
  }
  if (ua.includes('Android')) {
    const match = ua.match(/Android (\d+)/);
    // Try to get device model
    const modelMatch = ua.match(/;\s*([^;)]+)\s*Build/);
    const model = modelMatch?.[1]?.trim() || 'Device';
    return { emoji: '📱', name: `Android ${match?.[1] || ''} (${model})` };
  }

  // Desktop
  if (ua.includes('Macintosh') || ua.includes('Mac OS')) {
    if (ua.includes('Safari') && !ua.includes('Chrome')) {
      return { emoji: '🍎', name: 'Mac (Safari)' };
    }
    if (ua.includes('Chrome')) {
      return { emoji: '🍎', name: 'Mac (Chrome)' };
    }
    if (ua.includes('Firefox')) {
      return { emoji: '🍎', name: 'Mac (Firefox)' };
    }
    return { emoji: '🍎', name: 'Mac' };
  }

  if (ua.includes('Windows')) {
    const match = ua.match(/Windows NT (\d+\.\d+)/);
    const version = match?.[1] === '10.0' ? '10/11' : match?.[1] || '';
    if (ua.includes('Edge')) {
      return { emoji: '💻', name: `Windows ${version} (Edge)` };
    }
    if (ua.includes('Chrome')) {
      return { emoji: '💻', name: `Windows ${version} (Chrome)` };
    }
    if (ua.includes('Firefox')) {
      return { emoji: '💻', name: `Windows ${version} (Firefox)` };
    }
    return { emoji: '💻', name: `Windows ${version}` };
  }

  if (ua.includes('Linux')) {
    return { emoji: '🐧', name: 'Linux' };
  }

  // Fallback
  return { emoji: '🌐', name: ua.substring(0, 40) + (ua.length > 40 ? '...' : '') };
}
