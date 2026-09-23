from pathlib import Path

files = {
"research/google_trends.py":"def trending(country=\"US\"):\n    return []\n",
"research/reddit_finder.py":"def find_problems(subreddit):\n    return []\n",
"research/matcher.py":"RULES={\"organize\":[\"under sink organizer\"]}\n",
"automation/__init__.py":"",
"content/__init__.py":"",
"reports/__init__.py":""
}

for name,content in files.items():
    p=Path(name)
    p.parent.mkdir(parents=True,exist_ok=True)
    p.write_text(content,encoding="utf-8")

print("Builder ejecutado correctamente.")
