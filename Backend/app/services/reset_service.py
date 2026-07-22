from app.repositories.reset_repository import ResetRepository


class ResetService:
    def __init__(self, repo: ResetRepository):
        self.repo = repo

    def reset_progress(self):
        self.repo.reset_progress()
        return {"message": "Progress reset successfully."}