import * as React from 'react';
import './App.css';

import logo from './logo.svg';

class App extends React.Component {

public canvasRef:any;

public readonly WIDTH = 640;
public readonly HEIGHT = 425;

public readonly tileW = 40;
public readonly tileH = 40;

public tileRowCount = 20;
public tileColumnCount = 20;

// tslint:disable-next-line:variable-name
private _tile:any = [];

// tslint:disable-next-line:variable-name
private _canvas:any;
// tslint:disable-next-line:variable-name
private _ctx:any;

  constructor(props:any){
    super(props);
    this.canvasRef = React.createRef();
  }

  public componentDidMount() {
    this._canvas = this.canvasRef.current;
    this._ctx = this._canvas.getContext("2d");
    this.setTiles();
    this.draw();
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Maze Game</h1>
        </header>
        {/* <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p> */}
        <div>
        <canvas ref={this.canvasRef} width={640} height={425} />
      </div>
      </div>
    );
  }

  public draw(){
    this.clear();
    this._ctx.fillStyle = "#FFFFFF";
    for(let c=0; c<this.tileColumnCount; c++){
      for(let r=0; r<this.tileRowCount; r++){
        this.rect(this._tile[c][r].x, this._tile[c][r].y, this.tileW, this.tileH);
      }
    }
  }

  public clear(){
    this._ctx.clearRect(0,0,this.WIDTH,this.HEIGHT);
  }

  public rect(x:number,y:number,w:number,h:number){
    this._ctx.beginPath();
    this._ctx.rect(x,y,w,h);
    this._ctx.closePath();
    this._ctx.fill();
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
      }
    }
    this._tile[0][0].state = "s";
    this._tile[this.tileColumnCount-1][this.tileRowCount-1] = "f";
  }
}

export default App;