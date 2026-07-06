from enum import Enum


class TaskStatus(str, Enum):
    PENDING = "pending"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"

class ResourceType(str, Enum):
    VIDEO = "video"
    ARTICLE = "article"
    PROBLEM = "problem"
    NOTES = "notes"
    DOCUMENT = "document"


class ResourceProvider(str, Enum):
    STRIVER = "striver"
    LEETCODE = "leetcode"
    GFG = "gfg"
    YOUTUBE = "youtube"
    INTERNAL = "internal"

class TaskType(str, Enum):
    THEORY = "theory"
    VIDEO = "video"
    PRACTICE = "practice"
    REVISION = "revision"
    QUIZ = "quiz"
    NOTES = "notes"

class Difficulty(str, Enum):
    EASY = "easy"
    MEDIUM = "medium"
    HARD = "hard"