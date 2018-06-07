import * as React from 'react';
import './App.css';

// import logo from './logo.svg';

class App extends React.Component {

public canvasRef:any;

public readonly WIDTH = window.innerWidth;
public readonly HEIGHT = window.innerHeight;

public readonly tileW = 30;
public readonly tileH = 30;

public tileRowCount:number = 0;
public tileColumnCount:number = 0;

public moves = 0;
public enemies = 0;

public enemy = new Image();
public hero = new Image();

// tslint:disable-next-line:variable-name
private _tile:any = [];

// tslint:disable-next-line:variable-name
private _canvas:any;
// tslint:disable-next-line:variable-name
private _ctx:any;

  constructor(props:any){
    super(props);
    this.canvasRef = React.createRef();
    this.handleKeyPress = this.handleKeyPress.bind(this);
    let input:any = prompt("Please enter board height");
    // tslint:disable-next-line:radix
    this.tileRowCount = parseInt(input);
    input = prompt("Please enter board width");
    // tslint:disable-next-line:radix
    this.tileColumnCount = parseInt(input);
  }

  public componentDidMount() {
    this._canvas = this.canvasRef.current;
    this._ctx = this._canvas.getContext("2d");
    this.setTiles();
    this.draw();
  }

  public render() {
    return (
      <div className="App" tabIndex={0} onKeyDown={this.handleKeyPress}>
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Maze Game</h1>
        </header> */}
        {/* <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p> */}
        <div>
        <canvas ref={this.canvasRef} width={this.WIDTH} height={this.HEIGHT} />
      </div>
      </div>
    );
  }

  public draw(){
    this.clear();
    for(let c=0; c<this.tileColumnCount; c++){
      for(let r=0; r<this.tileRowCount; r++){
        this.clearSmallRect(this._tile[c][r].x,this._tile[c][r].y);
        this.rect(this._tile[c][r].x, this._tile[c][r].y, this.tileW, this.tileH, this._tile[c][r].state);
      }
    }
  }

  public clear(){
    this._ctx.clearRect(0,0,this.WIDTH,this.HEIGHT);
  }

  public rect(x:number,y:number,w:number,h:number,state:string){
    if(state ==='s'){
      this.hero = new Image();
      this.hero.src = "images/mario.png";
      this.hero.onload=()=>{
        this._ctx.drawImage(this.hero,x,y,w,h);
      };
    }else if(state === 'f'){
      this._ctx.fillStyle = "#FF0000";
      this._ctx.beginPath();
      this._ctx.rect(x,y,w,h);
      this._ctx.closePath();
      this._ctx.fill();
    }else if(state === 'e'){
      this._ctx.fillStyle = "#FFFFFF";
      this._ctx.beginPath();
      this._ctx.rect(x,y,w,h);
      this._ctx.closePath();
      this._ctx.fill();
    }else if(state === 'w'){
      this.enemy = new Image();
      this.enemy.src = "images/enemy.png";
      this.enemy.onload=()=>{
        this._ctx.drawImage(this.enemy,x,y,w,h);
      };
    }
  }

  public setTiles(){
    for(let c=0; c<this.tileColumnCount; c++){
      this._tile[c] = [];
      for(let r=0; r<this.tileRowCount; r++){
          this._tile[c][r] = {
            x:c*(this.tileW+3),
            y:r*(this.tileH+3),
            // tslint:disable-next-line:object-literal-sort-keys
            state:"e"
          }
          if(r!==0 && c!==0){
            const num:number = Math.floor(Math.random()*100)+1;
            if(num%13===0){
              this._tile[c][r].state = "w";
              this.enemies++;
            }
          }
      }
    }
    this._tile[0][0].state = "s";
    // this._tile[this.tileColumnCount-1][this.tileRowCount-1] = "f";
  }

  public handleKeyPress(e:any){
    e.preventDefault();
    // down arrow key
    if(e.nativeEvent.keyCode === 40){
      for(let c=0; c<this.tileColumnCount; c++){
        for(let r=0; r<this.tileRowCount; r++){
            if(this._tile[c][r].state === "s"){
              if(r<this.tileRowCount){
              this._tile[c][r].state = "e";
              let x = this._tile[c][r].x;
              let y = this._tile[c][r].y;
              this.clearSmallRect(x,y);
              this.rect(x,y,this.tileW,this.tileH,"e");
              r++;
              if(r !== this.tileRowCount){
                this.moves++;
                if(this._tile[c][r].state === "w"){
                  this.enemies--;
                  if(this.enemies === 0){
                  alert(`Game Over: Total moves to save Princess: ${this.moves}`);
                  }
                }
              this._tile[c][r].state = "s";
              x = this._tile[c][r].x;
              y = this._tile[c][r].y;
              this.clearSmallRect(x,y);
              this.rect(x,y,this.tileW,this.tileH,"s");
              }else{
                r--;
                this._tile[c][r].state = "s";
                x = this._tile[c][r].x;
                y = this._tile[c][r].y;
                this.clearSmallRect(x,y);
                this.rect(x,y,this.tileW,this.tileH,"s");
              }
              break;
            }
          }
          }
        }
      }
      // up arrow key
      else if(e.nativeEvent.keyCode === 38){
        for(let c=0; c<this.tileColumnCount; c++){
          for(let r=0; r<this.tileRowCount; r++){
              if(this._tile[c][r].state === "s"){
                if(r>0){
                  this._tile[c][r].state = "e";
                let x = this._tile[c][r].x;
                let y = this._tile[c][r].y;
                this.clearSmallRect(x,y);
                this.rect(x,y,this.tileW,this.tileH,"e");
                r--;
                if(r !== 0){
                  this.moves++;
              if(this._tile[c][r].state === "w"){
                this.enemies--;
                if(this.enemies === 0){
                  alert(`Game Over: Total moves to save Princess: ${this.moves}`);
                }
              }
                this._tile[c][r].state = "s";
                x = this._tile[c][r].x;
                y = this._tile[c][r].y;
                this.clearSmallRect(x,y);
                this.rect(x,y,this.tileW,this.tileH,"s");
                this.moves++;
                }else{
                  this._tile[c][r].state = "s";
                  x = this._tile[c][r].x;
                  y = this._tile[c][r].y;
                  this.clearSmallRect(x,y);
                  this.rect(x,y,this.tileW,this.tileH,"s");
                }
                break;
                }
              }
            }
          }
        }
        // right arrow key
        else if(e.nativeEvent.keyCode === 39){
          for(let c=0; c<this.tileColumnCount; c++){
            for(let r=0; r<this.tileRowCount; r++){
                if(this._tile[c][r].state === "s"){
                  if(c<this.tileColumnCount){
                  this._tile[c][r].state = "e";
                  let x = this._tile[c][r].x;
                  let y = this._tile[c][r].y;
                  this.clearSmallRect(x,y);
                  this.rect(x,y,this.tileW,this.tileH,"e");
                  c++;
                  if(c !== this.tileColumnCount){
                    this.moves++;
              if(this._tile[c][r].state === "w"){
                this.enemies--;
                if(this.enemies === 0){
                  alert(`Game Over: Total moves to save Princess: ${this.moves}`);
                }
              }
                  this._tile[c][r].state = "s";
                  x = this._tile[c][r].x;
                  y = this._tile[c][r].y;
                  this.clearSmallRect(x,y);
                  this.rect(x,y,this.tileW,this.tileH,"s");
                  }else{
                    c--;
                    this._tile[c][r].state = "s";
                    x = this._tile[c][r].x;
                    y = this._tile[c][r].y;
                    this.clearSmallRect(x,y);
                    this.rect(x,y,this.tileW,this.tileH,"s");
                  }
                  break;
                }
              }
              }
            }
          }
          // left arrow key
          else if(e.nativeEvent.keyCode === 37){
            for(let c=0; c<this.tileColumnCount; c++){
              for(let r=0; r<this.tileRowCount; r++){
                  if(this._tile[c][r].state === "s"){
                    if(c>0){
                      this._tile[c][r].state = "e";
                    let x = this._tile[c][r].x;
                    let y = this._tile[c][r].y;
                    this.clearSmallRect(x,y);
                    this.rect(x,y,this.tileW,this.tileH,"e");
                    c--;
                    if(c !== 0){
                      this.moves++;
              if(this._tile[c][r].state === "w"){
                this.enemies--;
                if(this.enemies === 0){
                  alert(`Game Over: Total moves to save Princess: ${this.moves}`);
                }
              }
                    this._tile[c][r].state = "s";
                    x = this._tile[c][r].x;
                    y = this._tile[c][r].y;
                    this.clearSmallRect(x,y);
                    this.rect(x,y,this.tileW,this.tileH,"s");
                    }else{
                      this._tile[c][r].state = "s";
                      x = this._tile[c][r].x;
                      y = this._tile[c][r].y;
                      this.clearSmallRect(x,y);
                      this.rect(x,y,this.tileW,this.tileH,"s");
                    }
                    break;
                    }
                  }
                }
              }
            }
    }

    public clearSmallRect(x:number,y:number){
      this._ctx.clearRect(x,y,this.tileW,this.tileH);
    }
}

export default App;
