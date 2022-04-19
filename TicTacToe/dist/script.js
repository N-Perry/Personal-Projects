import * as React from "https://cdn.skypack.dev/react@17.0.1";
import * as ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";

class GameBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      round: 0,
      roundMoves: 0,
      nextPlayer: '',
      ownedX: [],
      ownedO: [],
      winner: '' };


    this.whoAndWhere = this.whoAndWhere.bind(this);
    this.whoIsNext = this.whoIsNext.bind(this);
    this.roundHandler = this.roundHandler.bind(this);
    this.victoryChecker = this.victoryChecker.bind(this);
    this.reset = this.reset.bind(this);
  }

  /* function that gets player & id of claimed sector (every buttonpress) and adds sector number to designated arrays in state (representing the sectors players have claimed) */
  whoAndWhere(player, sectorNumber) {
    if (player == 'X') {
      this.setState(state => ({
        ownedX: [...state.ownedX, sectorNumber] }),
      function () {
        this.victoryChecker();
      });
    } else if (player == 'O') {
      this.setState(state => ({
        ownedO: [...state.ownedO, sectorNumber] }),
      function () {
        this.victoryChecker();
      });
    }

    this.roundHandler();
  }


  /* function to determine who goes next based on who just went*/
  whoIsNext(currentPlayer) {
    if (currentPlayer == 'X') {
      this.setState({
        nextPlayer: 'O' });

    } else if (currentPlayer == 'O') {
      this.setState({
        nextPlayer: 'X' });

    }
  }

  /*increments this.state.roundMoves, roundMoves=2 means both players have played for the turn. */
  roundHandler() {
    if (this.state.roundMoves == 1) {
      this.setState(state => ({
        round: state.round + 1,
        roundMoves: 0 }));

    } else {
      this.setState(state => ({
        roundMoves: state.roundMoves + 1 }));

    }
  }

  victoryChecker() {
    /*no possible winner before they've both gone twice. might save some processing power, might not even be worth it i don't know man i just work here to feed my family*/
    if (this.state.round >= 2) {
      if (this.state.ownedX.length >= 3) {
        let x = [...this.state.ownedX]; /* just to shorten */

        if (x.includes(1) && x.includes(2) && x.includes(3) ||
        x.includes(4) && x.includes(5) && x.includes(6) ||
        x.includes(7) && x.includes(8) && x.includes(9) ||
        x.includes(1) && x.includes(4) && x.includes(7) ||
        x.includes(2) && x.includes(5) && x.includes(8) ||
        x.includes(3) && x.includes(6) && x.includes(9) ||
        x.includes(1) && x.includes(5) && x.includes(9) ||
        x.includes(3) && x.includes(5) && x.includes(7))
        {
          this.setState({
            winner: 'X' });

        }
      } else if (this.state.ownedO.length >= 3) {
        let o = this.state.ownedO; /* just to shorten */
        if (o.includes(1) && o.includes(2) && o.includes(3) ||
        o.includes(4) && o.includes(5) && o.includes(6) ||
        o.includes(7) && o.includes(8) && o.includes(9) ||
        o.includes(1) && o.includes(4) && o.includes(7) ||
        o.includes(2) && o.includes(5) && o.includes(8) ||
        o.includes(3) && o.includes(6) && o.includes(9) ||
        o.includes(1) && o.includes(5) && o.includes(9) ||
        o.includes(3) && o.includes(5) && o.includes(7))
        {
          this.setState({
            winner: 'O' });

        }
      }
    }
  }

  /* called when a player wins, resets game board*/
  reset() {
    this.setState({
      round: 0,
      roundMoves: 0,
      nextPlayer: '',
      ownedX: [],
      ownedO: [],
      winner: '' });

  }

  render() {
    let gameBoard = [];
    for (let i = 0; i < 9; i++) {
      gameBoard.push( /*#__PURE__*/
      React.createElement(GridSector, {
        id: i + 1,
        whoAndWhere: this.whoAndWhere,
        whoIsNext: this.whoIsNext,
        nextPlayer: this.state.nextPlayer,
        ownedX: this.state.ownedX,
        ownedO: this.state.ownedO }));


    }

    return /*#__PURE__*/(
      React.createElement("div", { id: "wrapper" }, /*#__PURE__*/
      React.createElement("h1", { id: "title" }, " Tic-Tac-Toe "), /*#__PURE__*/
      React.createElement("div", { className: "grid-container" },
      gameBoard),




      this.state.ownedX.length + this.state.ownedO.length == 9 ? /*#__PURE__*/React.createElement("h1", { class: "status" }, "Cat's game!") :
      this.state.winner ? /*#__PURE__*/React.createElement("h1", { class: "status" }, "Player ", this.state.winner, " wins!") :
      !this.state.nextPlayer ? /*#__PURE__*/React.createElement("h1", { class: "status" }, "Who will go first?") : /*#__PURE__*/
      React.createElement("h1", { class: "status" }, "Player ", this.state.nextPlayer, "'s turn."), /*#__PURE__*/


      React.createElement("button", { id: "reset", onClick: this.reset }, "Reset")));


  }}


class GridSector extends React.Component {
  constructor(props) {
    super(props);

    this.claimSector = this.claimSector.bind(this);
  }

  claimSector(event) {
    if (this.props.nextPlayer && event.target.value != this.props.nextPlayer) {
      alert("It's not your turn, silly!");
    } else {
      this.props.whoAndWhere(event.target.value, this.props.id);
      this.props.whoIsNext(event.target.value);
    }
  }

  render() {
    if (this.props.ownedX.includes(this.props.id)) {
      return /*#__PURE__*/(
        React.createElement("div", { className: "grid-item" }, "X"));



    } else if (this.props.ownedO.includes(this.props.id)) {
      return /*#__PURE__*/(
        React.createElement("div", { className: "grid-item" }, "O"));



    } else {
      return /*#__PURE__*/(
        React.createElement("div", { className: "grid-item" }, /*#__PURE__*/
        React.createElement("button", { value: "X", onClick: this.claimSector }, "X?"), " or ", /*#__PURE__*/

        React.createElement("button", { value: "O", onClick: this.claimSector }, "O?")));




    }
  }}


ReactDOM.render( /*#__PURE__*/React.createElement(GameBoard, null), document.getElementById('app'));