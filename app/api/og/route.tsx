import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';
export const dynamic = 'force-static';

export async function GET(request: NextRequest) {
  try {
    const title = 'Muhammad Khoiruzzadittaqwa';
    const description = 'Strategic Growth, Business & Research Consultant';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#0f172a', // slate-900
            padding: '80px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#14b8a6', // teal-500
                marginRight: '24px',
              }}
            />
            <span
              style={{
                fontSize: 32,
                color: '#94a3b8', // slate-400
                fontWeight: 600,
                letterSpacing: '0.05em',
              }}
            >
              ZADIT.PAGES.DEV
            </span>
          </div>
          
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: '#f8fafc', // slate-50
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              marginBottom: '32px',
            }}
          >
            {title}
          </div>
          
          <div
            style={{
              fontSize: 36,
              color: '#cbd5e1', // slate-300
              lineHeight: 1.4,
              maxWidth: '900px',
            }}
          >
            {description}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
