// import rightClick from 'angular-right-click';
import { Component, OnInit } from '@angular/core';
import { Board } from '../board.model';
import { Tile} from '../tile.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  board: Board;
  gameWin: boolean = false;
  gameOver: boolean = false;
  width: number = 8;
  height: number = 8;
  mines: number = 10;
  openZeros: boolean = false;
  time: number = 0;
  startTime = true;
  timeInterval;
  constructor() { }

  ngOnInit() {
    this.board = new Board (this.width, this.height, this.mines);
    this.board.makeBoard();
  }

  startTimer() {
    if(this.startTime){
      this.startTime=false;
      this.timeInterval = setInterval(() =>{
        this.time++
      }, 1000)
    }


  }

  onChange(difficulty) {
    if(difficulty === ""){
      this.width = 8;
      this.height = 8;
      this.mines = 10;
    }else if(difficulty === "1"){
      this.width = 16;
      this.height = 16;
      this.mines = 40;
    }else if(difficulty === "2"){
      this.width = 31;
      this.height = 16;
      this.mines = 99;
    }else {
      this.width = 8;
      this.height = 8;
      this.mines = 63;
    }
    this.board= new Board(this.width, this.height, this.mines);
    this.board.makeBoard();
    this.gameOver = false;
    this.gameWin = false;
    this.time = 0;
    this.startTime = true;
    clearInterval(this.timeInterval);

  }


  checkCell(cell: Tile) {
    if(cell.value === 0){
      this.gameOver = true;
      this.startTime = true;
      clearInterval(this.timeInterval);
    }else {
      this.board.checkMines(cell);
      if(cell.mineCount === 0){
        // this.openZeros = true;
        this.board.checkAround(cell);
      }
      // while(this.openZeros){
      //   for (let i = 0; i <= this.height;  i++){
      //     for (let j = 0; j <= this.width;  j++){
      //       let currentCell = this.board.boardArray[i][j];
      //       if(currentCell.value===0){
      //         this.board.checkAround(currentCell);
      //       }
      //
      //     }
      //   }
      //   this.openZeros=this.checkZeros();
      // }
      this.gameWin = this.board.checkWin();
      if(this.gameWin){
        clearInterval(this.timeInterval);
        this.startTime = true;
      }
    }
  }

  // checkZeros() {
  //   for (let k = 0; k <= this.height;  k++){
  //     for (let l = 0; l <= this.width;  l++){
  //       let currentCell = this.board.boardArray[k][l];
  //       if(currentCell.value === 0){
  //         let row = currentCell.coordinates[0];
  //         let col = currentCell.coordinates[1];
  //         if (row === 0 && col === 0){
  //           for (let i = row; i <= row + 1;  i++){
  //             for (let j = col; j <= col + 1;  j++){
  //               if(this.board.boardArray[i][j].mineCount === null){
  //                 return true;
  //               }
  //             }
  //           }
  //         }else if (row === 0 && col === this.height-1){
  //           for (let i = row; i <= row + 1;  i++){
  //             for (let j = col-1; j <= col;  j++){
  //               if(this.board.boardArray[i][j].mineCount === null){
  //                 return true;
  //               }
  //             }
  //           }
  //         }else if (row === this.width-1 && col === 0) {
  //           for (let i = row-1; i <= row;  i++){
  //             for (let j = col; j <= col + 1;  j++){
  //               if(this.board.boardArray[i][j].mineCount === null){
  //                 return true;
  //               }
  //             }
  //           }
  //         }else if (row === this.width-1 && col === this.height-1) {
  //           for (let i = row-1; i <= row;  i++){
  //             for (let j = col-1; j <= col;  j++){
  //               if(this.board.boardArray[i][j].mineCount === null){
  //                 return true;
  //               }
  //             }
  //           }
  //
  //         }else if(row === 0) {
  //           for (let i = row; i <= row + 1;  i++){
  //             for (let j = col-1; j <= col + 1;  j++){
  //               if(this.board.boardArray[i][j].mineCount === null){
  //                 return true;
  //               }
  //             }
  //           }
  //
  //         }else if (row === this.width-1) {
  //           for (let i = row-1; i <= row;  i++){
  //             for (let j = col-1; j <= col + 1;  j++){
  //               if(this.board.boardArray[i][j].mineCount === null){
  //                 return true;
  //               }
  //             }
  //           }
  //
  //         }else if (col === 0) {
  //           for (let i = row-1; i <= row + 1;  i++){
  //             for (let j = col; j <= col + 1;  j++){
  //               if(this.board.boardArray[i][j].mineCount === null){
  //                 return true;
  //               }
  //             }
  //           }
  //
  //         }else if(col === this.height-1){
  //           for (let i = row-1; i <= row + 1;  i++){
  //             for (let j = col-1; j <= col;  j++){
  //               if(this.board.boardArray[i][j].mineCount === null){
  //                 return true;
  //               }
  //             }
  //           }
  //
  //         }else {
  //           for (let i = row-1; i <= row + 1;  i++){
  //             for (let j = col-1; j <= col + 1;  j++){
  //               if(this.board.boardArray[i][j].mineCount === null){
  //                 return true;
  //               }
  //             }
  //           }
  //         }
  //       }
  //
  //     }
  //   }
  //   return false;
  // }


  newGame(){
    this.board = new Board (this.width, this.height, this.mines);
    this.board.makeBoard();
    this.gameOver = false;
    this.gameWin = false;
    this.time = 0;
    this.startTime = true;
    clearInterval(this.timeInterval);
  }



}
