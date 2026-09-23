
Write-Host ""
Write-Host "===================================" -ForegroundColor Cyan
Write-Host " AOI Updater - MVP-1.1" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

# Carpetas
$folders=@(
"src/core",
"src/research",
"dashboard",
"database",
"reports",
"logs",
"tests"
)

foreach($f in $folders){
    New-Item -ItemType Directory -Force $f | Out-Null
}

# requirements
@"
streamlit
pandas
python-dotenv
requests
pytrends
praw
openai
reportlab
openpyxl
pytest
xlsxwriter
"@ | Set-Content requirements.txt

# Logger
@"
import logging
from pathlib import Path

Path("logs").mkdir(exist_ok=True)

logging.basicConfig(
 filename="logs/aoi.log",
 level=logging.INFO,
 format="%(asctime)s %(levelname)s %(message)s"
)

logger=logging.getLogger("AOI")
"@ | Set-Content src/core/logger.py

# Google Trends
@"
from pytrends.request import TrendReq

COUNTRIES={
'US':'united_states',
'ES':'spain',
'GB':'united_kingdom',
'DE':'germany',
'JP':'japan',
'CA':'canada',
'MX':'mexico',
'BR':'brazil'
}

def get_trends():
    py=TrendReq(hl='en-US',tz=360)
    data=[]

    for code,country in COUNTRIES.items():
        try:
            df=py.trending_searches(pn=code)
            for term in df[0].head(10):
                data.append({
                    'country':country,
                    'keyword':term,
                    'status':'DATO_VERIFICADO'
                })
        except:
            pass

    return data
"@ | Set-Content src/research/google_trends.py

Write-Host ""
Write-Host "MVP-1.1 instalado correctamente." -ForegroundColor Green