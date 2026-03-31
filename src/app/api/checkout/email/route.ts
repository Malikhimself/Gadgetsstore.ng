import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, name, total, date, items } = body;

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const data = await resend.emails.send({
            from: 'Gadgets Store <orders@resend.dev>',
            to: [email],
            subject: 'Order Confirmation - Gadgets Store',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #09090b; color: #ffffff; padding: 40px; border-radius: 12px; border: 1px solid #333;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #22c55e; margin: 0;">Gadgets Store</h1>
                        <p style="color: #888; font-size: 14px;">Order Confirmed</p>
                    </div>
                    
                    <h2 style="font-size: 24px; margin-bottom: 20px;">Hi ${name || 'Valued Customer'},</h2>
                    <p style="font-size: 16px; line-height: 1.6; color: #ccc;">
                        Thank you for your purchase! We've received your order and are currently processing it.
                        Your state-of-the-art tech will be on its way to you shortly.
                    </p>
                    
                    <div style="background-color: #18181b; padding: 20px; border-radius: 8px; margin: 30px 0; border: 1px solid #333;">
                        <h3 style="margin-top: 0; color: #eee; border-bottom: 1px solid #333; padding-bottom: 10px;">Order Summary</h3>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span style="color: #aaa;">Date: </span>
                            <span style="font-weight: bold; color: #fff;"> ${date || new Date().toLocaleDateString()}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                            <span style="color: #aaa;">Items: </span>
                            <span style="font-weight: bold; color: #fff;"> ${items || 1}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-top: 20px; border-top: 1px solid #333; padding-top: 10px;">
                            <span style="font-size: 18px; color: #fff;">Total Paid: </span>
                            <span style="font-size: 18px; font-weight: bold; color: #22c55e;"> ₦${Number(total || 0).toLocaleString()}</span>
                        </div>
                    </div>
                    
                    <p style="font-size: 14px; color: #888; text-align: center; margin-top: 40px;">
                        Need help with your order? Reply to this email and our support team will assist you immediately.
                    </p>
                </div>
            `,
        });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("Email Error:", error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}
