import {SVG_NS, KEYS} from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';

export default class Game {
  constructor(element, width, height) {
    this.element= element;

    this.gameElement = document.getElementById(this.element);

    this.width= width;
    this.height= height;
    
    this.board = new Board(this.width, this.height);

    this.paddleWidth= 8;
    this.paddleHeight= 56;
    this.boardGap= 10;

    this.player1= new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.boardGap,
      (this.height - this.paddleHeight)/2,
      KEYS.a,
      KEYS.z,
    );
 
    this.player2= new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.width - this.paddleWidth - this.boardGap,
      (this.height - this.paddleHeight)/2,
      KEYS.up,
      KEYS.down,
    );

    this.r= 8;

    this.ball= new Ball(
      this.r,
      this.width,
      this.height,
    );

    this.ball2= new Ball(
      this.r,
      this.width,
      this.height,
    );

    this.score1 = new Score(this.width / 2 - 50, 30, 30);
    this.score2 = new Score(this.width / 2 + 25 , 30, 30);

    document.addEventListener('keydown', event => {
      if (event.key === KEYS.spaceBar) {
        this.pause = !this.pause;
      }
    });
  }

  render() {
    //pause game
    if (this.pause) {
      return;
    }
    //empty out game element before re rendering
    this.gameElement.innerHTML ='';

    let svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttributeNS(null, "width", this.width);
    svg.setAttributeNS(null, "height", this.height);
    svg.setAttributeNS(null, "viewbox", `0 0 ${this.width} ${this.height}`);
    svg.setAttributeNS(null, "version", '1.1');
    this.gameElement.appendChild(svg);
    // rendering all game elements inside the SVG
    this.board.render(svg);
    this.player1.render(svg);
    this.player2.render(svg);
    this.ball.render(svg, this.player1, this.player2);
    this.ball2.render(svg, this.player1, this.player2);
    this.score1.render(svg, this.player1.score);
    this.score2.render(svg, this.player2.score);
  }
}
