from pydantic_settings import BaseSettings


from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    DATABASE_URL: str
    API_PREFIX: str
    PROJECT_NAME: str
    PROJECT_VERSION: str

    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
    )


settings = Settings()