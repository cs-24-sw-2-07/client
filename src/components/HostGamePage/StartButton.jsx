function StartButton({ players, ready }) {
    return (
        <div>
            <button
                type="button"
                className="btn btn-primary col-4"
                disabled={players >= 2 && ready === players ? false : true}
                onClick={() => StartGame(players, ready)}
            >
                Start game
            </button>
            <p className={ready === players ? "text-success" : "text-danger"}>
                Players ready: {ready}/{players}
            </p>
        </div>
    );
}