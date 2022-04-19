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
    this.roundHandler = this.roundHandler.bind(this);
    this.victoryChecker = this.victoryChecker.bind(this);
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

  render() {
    let gameBoard = [];
    for (let i = 0; i < 9; i++) {
      gameBoard.push( /*#__PURE__*/
      React.createElement(GridSector, {
        id: i + 1,
        whoAndWhere: this.whoAndWhere }));


    }

    return /*#__PURE__*/(
      React.createElement("div", { id: "test-div" }, /*#__PURE__*/
      React.createElement("div", { className: "grid-container" },
      gameBoard),

      this.state.winner ? /*#__PURE__*/React.createElement("h1", null, "Player ", this.state.winner, " wins!") : /*#__PURE__*/
      React.createElement("h1", null, "Play on!")));



  }}


class GridSector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      claimedBy: '' };


    this.claimSector = this.claimSector.bind(this);
  }

  claimSector(event) {
    this.setState({
      claimedBy: event.target.value });

    this.props.whoAndWhere(event.target.value, this.props.id);
  }

  render() {
    if (this.state.claimedBy) {
      return /*#__PURE__*/(
        React.createElement("div", { className: "grid-item" },
        this.state.claimedBy,
        this.props.id));


    } else {
      return /*#__PURE__*/(
        React.createElement("div", { className: "grid-item" }, /*#__PURE__*/
        React.createElement("button", { value: "X", onClick: this.claimSector }, "X?"), " or ", /*#__PURE__*/

        React.createElement("button", { value: "O", onClick: this.claimSector }, "O?")));




    }
  }}


ReactDOM.render( /*#__PURE__*/React.createElement(GameBoard, null), document.getElementById('app'));