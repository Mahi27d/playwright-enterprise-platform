from fastapi import FastAPI

app = FastAPI(title="Playwright Enterprise Platform")

@app.get("/")
def read_root():
    return {"message": "Playwright Enterprise Platform API"}
