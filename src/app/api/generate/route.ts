import { NextResponse } from "next/server";

export async function POST(req:Request) {
  try{
    const body = await req.json();

    const n8nResponse = await fetch(process.env.N8N_WEBHOOK_URL || "", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...body,
        request_at: new Date().toISOString()
      }),
    });
    if(!n8nResponse.ok){
      throw new Error("Failed to trigger n8n workflow");
    }
    const result = await n8nResponse.json();

    return NextResponse.json({
      success: true,
      message: "Content generation triggered successfully",
      data: result
    });
  }catch(error){
    console.error("Error in /api/generate:", error);
    return NextResponse.json(
      {success: false, message: "Failed to trigger content generation"},
      {status: 500}
    );
  }
}