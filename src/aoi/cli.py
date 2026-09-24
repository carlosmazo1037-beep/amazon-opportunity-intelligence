"""AOI CLI - Amazon Opportunity Intelligence command-line interface."""
import typer

from aoi import __version__
from aoi.commands import scan, report, dashboard, trends, reddit, news

app = typer.Typer(
    name="aoi",
    help="AOI - Amazon Opportunity Intelligence CLI",
    no_args_is_help=True,
    add_completion=False,
)


@app.callback()
def _root(
    version: bool = typer.Option(False, "--version", "-v", help="Show version and exit."),
) -> None:
    if version:
        typer.echo(f"aoi {__version__}")
        raise typer.Exit()


app.command(name="scan",      help="Scan all sources (trends + news).")(scan.run)
app.command(name="report",    help="Generate reports from scan results.")(report.run)
app.command(name="dashboard", help="Launch the Streamlit dashboard.")(dashboard.run)
app.command(name="trends",    help="Fetch Google Trends data.")(trends.run)
app.command(name="news",      help="Fetch Google News signals.")(news.run)
app.command(name="reddit",    help="(Coming soon) Fetch Reddit signals.")(reddit.run)


def main() -> None:
    app()


if __name__ == "__main__":
    main()
