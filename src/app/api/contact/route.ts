import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.CONTACT_GMAIL,
      pass: process.env.CONTACT_GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"FLAWDETECTOR Contact" <${process.env.CONTACT_GMAIL}>`,
    to: process.env.CONTACT_GMAIL,
    replyTo: email,
    subject: `[FlawDetector] ${name}님의 문의 🐥`,
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
    html: `
      <h2>새로운 FLAWDETECTOR 문의</h2>
      <p><strong>FROM:</strong> ${name}</p>
      <p><strong>EMAIL:</strong> ${email}</p>
      <p><strong>문의 내용:</strong></p>
      <pre style="white-space: pre-wrap; word-wrap: break-word; background-color: #f4f4f4; padding: 15px; border-radius: 5px;">${message}</pre>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { message: "문의가 등록되었습니다 🚀" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "문의에 실패하였습니다 ❌" },
      { status: 500 },
    );
  }
}
