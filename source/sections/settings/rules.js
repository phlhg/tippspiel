import Section from '../section'

export default class Rules extends Section {

    constructor(...args){
        super(...args)
    }

    init(){

        if(Lang.id == "de" || Lang.id == "de-ch"){

            this.view.root.innerHTML = 
            `<div class="text" style="text-align: justify">
                <h3>Punktevergabe</h3>
                <h4>Spiele</h4>
                <p>Bei allen Spielen kannst du ein Resultat (ohne Penaltyschiessen), einen Gewinner und einen Torschützen tippen. Für diese Tipps erhälst du Punkte in den folgenden Kategorieren:</p>
                <ul>
                    <li>
                        <strong>Team ( +1 )</strong><br/>
                        Dein getipptes Team hat das Spiel gewonnen.
                    </li>
                    <li>
                        <strong>Tor differenz ( +1 )</strong><br/>
                        Dein getipptes Resulat und das tatsächliche Resultat haben die gleiche Differenz von Toren (ohne Penaltyschiessen)</br/>
                    </li>
                    <li>
                        <strong>Exaktes Resultat ( +2 )</strong><br/>
                        Du hast das exakte Resulat (ohne Penaltyschiessen) getippt.
                    </li>
                    <li>
                        <strong>Penalty Bonus ( +2 )</strong><br/>
                        Du hast Unentschieden getippt und das Spiel hat mit einem Penaltyschiessen geendet, welches dein getipptes Team gewonnen hat.
                    </li>
                    <li>
                        <strong>Torschütze</strong><br/>
                        Für jedes Tor deinens getippten Torschützden erhälst du <strong>+1</strong>.
                    </li>
                </ul>
                <h4>Events</h4>
                <p>Bei einigen Events kannst du ein Event-Gewinner und Torschützenkönig tippen. Für diese Tipps erhälst du Punkte in den folgenden Kategorieren:</p>
                <ul>
                    <li>
                        <strong>Team ( +2 )</strong><br/>
                        Dein getipptes Team hat das Event gewonnen.
                    </li>
                    <li>
                        <strong>Torschützenkönig ( +2 )</strong><br/>
                        Dein getippter Torschützenkönig hat die meisten Tore im Event geschossen.
                    </li>
                </ul>
            </div>`

        } else {

            this.view.root.innerHTML = 
            `<div class="text" style="text-align: justify">
                <h3>Scoring</h3>
                <h4>Matches</h4>
                <p>All matches allow betting a result (without penalty shootout), a winner and a scorer. For those bets you receive points in the following categories:</p>
                <ul>
                    <li>
                        <strong>Team ( +1 )</strong><br/>
                        Your guessed team won the match.
                    </li>
                    <li>
                        <strong>Goal difference ( +1 )</strong><br/>
                        Your guessed result and the actual result have the same difference of goals (without penalty shootout).</br/>
                    </li>
                    <li>
                        <strong>Exact result ( +2 )</strong><br/>
                        You guessed the exact result (without penalty shootout).
                    </li>
                    <li>
                        <strong>Penalty Bonus ( +2 )</strong><br/>
                        You've guessed a draw and the match ended with a penalty shootout, which your guessed team won.
                    </li>
                    <li>
                        <strong>Scorer</strong><br/>
                        For each goal of your guessed scorer you get <strong>+1</strong>.
                    </li>
                </ul>
                <h4>Events</h4>
                <p>Some events allow betting on an event winner and a topscorer. For those bets you receive points in the following categories:</p>
                <ul>
                    <li>
                        <strong>Team ( +2 )</strong><br/>
                        Your guessed team won the event.
                    </li>
                    <li>
                        <strong>Topscorer ( +2 )</strong><br/>
                        Your guessed topscorer shot the most amount of goals at the event.
                    </li>
                </ul>
            </div>`

        }
    }

}