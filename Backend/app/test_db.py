from db.database import engine

try:
    with engine.connect() as connection:
        print("✅ Database connected successfully!")
except Exception as e:
    print(f"❌ Database connection failed: {e}")