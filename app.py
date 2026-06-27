import os
from dotenv import load_dotenv
import google.generativeai as genai

# טעינת משתני הסביבה מתוך קובץ ה-.env שיצרנו
load_dotenv()

# שליפת מפתח ה-API של Gemini בצורה מאובטחת מקובץ ה-.env
api_key = os.getenv("GEMINI_API_KEY")

# הגדרת החיבור ל-API של Gemini עם המפתח שלך
genai.configure(api_key=api_key)

print("Connected successfully! Ready to generate text.")