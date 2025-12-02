import GameCard from "../game-card/GameCard";
import useRequest from "../../hooks/useRequest";
// import { useEffect, useState } from "react";

export default function Catalog() {
    const { data: games } = useRequest('/data/games', []);
    // const [games, setGames] = useState([]);

    // useEffect(() => {
    //     fetch('http://localhost:3030/data/games')
    //         .then(res => res.json())
    //         .then(result => {
    //             setGames(result);
    //         })
    // }, []);

    return (
        <section id="catalog-page">
            <h1>Catalog</h1>

            {games.length === 0 && <h3 className="no-articles">No Added Games Yet</h3>}

            <div className="catalog-container">
                {games.map(game => <GameCard key={game._id} {...game} />)}
            </div>

        </section>
    );
}
