
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from urllib.parse import urlparse

app = FastAPI(
    title="AI Viral Clips API",
    description="API inicial para analizar videos y transmisiones autorizadas.",
    version="1.0.0"
)

class AnalyzeRequest(BaseModel):
    url: str
    video_type: str = "published"

@app.get("/")
def home():
    return {"message": "AI Viral Clips API funcionando"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/analyze")
def analyze_video(request: AnalyzeRequest):
    parsed = urlparse(request.url)

    if parsed.scheme not in ("http", "https"):
        raise HTTPException(status_code=400, detail="URL no válida")

    if not parsed.netloc:
        raise HTTPException(status_code=400, detail="URL no válida")

    if request.video_type not in ("published", "live"):
        raise HTTPException(status_code=400, detail="Tipo de video no válido")

    return {
        "status": "received",
        "message": "Video recibido. El procesamiento todavía está pendiente.",
        "url": request.url,
        "video_type": request.video_type
    }
