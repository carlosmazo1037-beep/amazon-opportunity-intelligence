# src/aoi/research/reddit_finder.py
import praw
from aoi.core.logger import logger

def find_problems(subreddit: str = "AmazonFBA", limit: int = 25) -> list[dict]:
    reddit = praw.Reddit(
        client_id="...",       # desde .env
        client_secret="...",
        user_agent="aoi/0.2",
    )
    results = []
    for post in reddit.subreddit(subreddit).hot(limit=limit):
        results.append({"keyword": post.title, "source": "reddit", "score": post.score})
    logger.info(f"Reddit: {len(results)} posts de r/{subreddit}")
    return results