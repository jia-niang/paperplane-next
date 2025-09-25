export async function GET(
  _request: Request,
  { params }: { params: Promise<{ shortKey: string }> }
) {
  const shortKey = (await params).shortKey
  const raw = await fetch(`https://console.paperplane.cc/api/shorts/${shortKey}`)

  return new Response(raw.body)
}
