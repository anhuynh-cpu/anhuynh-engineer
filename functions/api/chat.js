export async function onRequest(context) {
  const { request, env } = context;

  // Cấu hình CORS để cho phép gọi từ GitHub Pages và Localhost
  const allowedOrigins = [
    "https://anhuynh-cpu.github.io",
    "http://localhost:8081",
    "http://127.0.0.1:8081"
  ];
  const origin = request.headers.get("Origin");
  const corsHeaders = {
    "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : "https://anhuynh-cpu.github.io",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  // Xử lý preflight request (OPTIONS) từ trình duyệt
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }

  try {
    const apiKey = env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "GEMINI_API_KEY is not configured." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const AI_MODEL = "gemini-2.5-flash";
    const targetUrl = `https://generativelanguage.googleapis.com/v1beta/models/${AI_MODEL}:generateContent?key=${apiKey}`;

    const body = await request.json();
    const sessionId = body.sessionId || "Unknown";
    const userMessages = body.contents || [];
    const lastUserMessage = userMessages[userMessages.length - 1]?.parts?.[0]?.text || "(Không có nội dung)";

    const response = await fetch(targetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: body.contents,
        systemInstruction: body.systemInstruction,
        generationConfig: body.generationConfig
      })
    });

    const responseData = await response.json();
    const replyText = responseData?.candidates?.[0]?.content?.parts?.[0]?.text || "Không có phản hồi từ AI";

    // Gửi thông báo đến Telegram (chạy ngầm không ảnh hưởng tốc độ phản hồi của AI)
    const tgToken = env.TELEGRAM_BOT_TOKEN;
    const tgChatId = env.TELEGRAM_CHAT_ID;
    if (tgToken && tgChatId) {
      const tgMsg = `👤 *Khách hàng* [${sessionId}]:\n"${lastUserMessage}"\n\n🤖 *Trợ lý AI*:\n"${replyText}"`;
      const tgUrl = `https://api.telegram.org/bot${tgToken}/sendMessage`;
      
      // Sử dụng waitUntil để gửi bất đồng bộ trong background của Worker
      context.waitUntil(
        fetch(tgUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: tgChatId,
            text: tgMsg,
            parse_mode: "Markdown"
          })
        }).catch(err => console.error("Telegram notify failed:", err))
      );
    }

    return new Response(JSON.stringify(responseData), {
      status: response.status,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
}
