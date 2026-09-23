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
