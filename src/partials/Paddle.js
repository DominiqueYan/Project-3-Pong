import {SVG_NS} from '../settings';

export default class Paddle {
    constructor(boardHeight, width, height, x, y, upKey, downKey) {
      this.boardHeight = boardHeight;
      this.width = width;
      this.height = height;
      this.x = x;
      this.y = y;
      this.speed = 10;
      this.score = 0;
      this.color = "#FFFFFF"

      document.addEventListener("keydown", event => {
        switch(event.key){
            case upKey:
            this.up();
            break;
            case downKey:
            this.down();
            break;
        }
      });
    }

    up() {
        this.y= Math.max(0, this.y - this.speed);
    }
    
    down() {
        this.y= Math.min (this.boardHeight - this.height, this.y + this.speed);
    }

    render(svg) {
        let rect = document.createElementNS(SVG_NS, 'rect');
        rect.setAttributeNS(null, "width", this.width);
        rect.setAttributeNS(null, "height", this.height);
        rect.setAttributeNS(null, "x", this.x);
        rect.setAttributeNS(null, "y", this.y);
        rect.setAttributeNS(null, "fill", this.color);
        svg.appendChild(rect);
    }
  }