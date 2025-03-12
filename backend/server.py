"""
M.A.D.H.A.V.A - Main Server
"""

import os
from fastapi import FastAPI, Request, Depends, HTTPException, status
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Import routes
from routes.auth import router as auth_router
from routes.users import router as users_router

# Create FastAPI app
app = FastAPI(
    title="M.A.D.H.A.V.A",
    description="Multi-domain Adaptive Dynamic Hybrid AI Vector Architecture",
    version="1.0.0"
)

# Configure CORS
allowed_origins = [
    "http://localhost:5173",  # Vite dev server
    "http://localhost:3000",  # Alternative dev port
    os.getenv("FRONTEND_URL", "http://localhost:5173")  # Production URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "X-Requested-With"],
    expose_headers=["Content-Length"],
    max_age=600,  # Cache preflight requests for 10 minutes
)

# Mount static files
static_dir = Path(__file__).parent / "static"
app.mount("/static", StaticFiles(directory=str(static_dir)), name="static")

# Setup templates
templates_dir = Path(__file__).parent / "templates"
templates = Jinja2Templates(directory=str(templates_dir))

# Include routers
app.include_router(auth_router, tags=["Authentication"])
app.include_router(users_router, prefix="/api/users", tags=["Users"])

# Root route
@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    """Redirect to login page."""
    return templates.TemplateResponse("login.html", {"request": request})

# Dashboard route
@app.get("/dashboard", response_class=HTMLResponse)
async def dashboard(request: Request):
    """Render the dashboard page."""
    return templates.TemplateResponse("dashboard.html", {"request": request})

# Health check
@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "version": "1.0.0"}

# Run the server
if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    uvicorn.run("server:app", host=host, port=port, reload=True) 