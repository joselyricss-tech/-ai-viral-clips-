
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, HttpUrl
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="AI Viral Clips API",
    description="Backend para analizar videos y preparar clips virales",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class VideoRequest(BaseModel):
    url: HttpUrl
    video_type: str = "published"

@app.get("/")
def home():
    return {
        "message": "AI Viral Clips API funcionando",
        "status": "online"
    }

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.post("/analyze")
def analyze_video(request: VideoRequest):
    if request.video_type not in ["published", "live"]:
        raise HTTPException(
            status_code=400,
            detail="Tipo de video no válido"
        )

    return {
        "status": "received",
        "message": "Video recibido. El procesamiento todavía está pendiente.",
        "video_url": str(request.url),
        "video_type": request.video_type
    }
