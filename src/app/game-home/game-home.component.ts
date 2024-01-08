import { Component } from '@angular/core';

@Component({
  selector: 'app-game-home',
  templateUrl: './game-home.component.html',
  styleUrls: ['./game-home.component.scss']
})
export class GameHomeComponent {
  initData: boolean = false
  bombIcon:string="../../assets/image/bomb-png-46597.png" 
  bombIconStatus:boolean[]=[]
  bombNotIconStatus:boolean[]=[]
  newGameInitStatus: boolean = false
  gameOverStatus: boolean = false
  nextLevelStatus: boolean = false
  pointerStatus: boolean = false
  cellPointerStatus:boolean[]=[]
  pointValue: number = 0
  totalScore: number = 0
  rowCount: number = 3
  columnCount: number = 3
  rowValue: (number|string)[] = []
  columnValue: number[] = []
  gameData: number[][] = []
  gameDataId: boolean[] = []
  bombData: boolean[] = []
  initIndex: number[] = []
  clickedIndex: number[] = []
  count: number = 0
  nextLevelBombStatus:boolean=false
  ngOnInit() {
    for (let i = 1; i <= this.rowCount; i++) {
      for (let j = 1; j <= this.columnCount; j++) {
        this.rowValue.push(Math.round(Math.random() * 1) ? i : this.bombIcon)
        this.columnValue.push(j)
        this.gameDataId.push(false)
      }
    }
    this.rowValue.forEach((element: number|string, index: number) => {
      this.initIndex.push(index)
      if(typeof element=="string"){
        this.bombIconStatus.push(true)
      }else if(typeof element=="number"){
        this.bombIconStatus.push(false)
      }
    })
  }
  dataShow(value: number|string, id: number) {
    this.count = 0
    this.gameDataId[id] = true
    this.bombData=[]
    if(this.nextLevelBombStatus==false){
      this.clickedIndex.push(id)
    }
    else if(this.nextLevelBombStatus){
      this.clickedIndex.push(id)
    }
    if (value != this.bombIcon) {
      this.bombData[id] = false
    } else {
      this.bombData[id] = true
      this.pointerStatus = true
    }
    this.rowValue.forEach((element: number|string, index: number) => {
      if (element == value && index == id && value!=this.bombIcon) {
        this.pointValue += value as number
      }
      else if (value ==this.bombIcon) {
        this.gameOverStatus = true
        this.newGameInitStatus = true
      }
      
      if (element !=this.bombIcon) {
        this.count += element as number
      }
    })
    if (this.count == this.pointValue) {
      this.nextLevelStatus = true
      this.gameOverStatus = false
      this.pointerStatus = true
      if (this.nextLevelStatus) {
        const newArray = this.initIndex.filter((element: number) => !this.clickedIndex.includes(element))
        newArray.forEach((element: number) => {
          this.bombData[element] = true
        })
      }
    }
  }
  nextLevel() {
    if (this.nextLevelStatus) {
      this.bombIconStatus=[]
      this.bombNotIconStatus=[]
      this.nextLevelBombStatus=true
      this.clickedIndex=[]
      this.bombData=[]
      this.gameDataId = []
      this.pointerStatus = false
      this.nextLevelStatus = false
      this.pointValue = 0
      this.initData = false
      this.rowCount += 1
      this.columnCount += 1
      this.rowValue = []
      this.columnValue = []
      for (let i = 1; i <= this.rowCount; i++) {
        for (let j = 1; j <= this.columnCount; j++) {
          this.rowValue.push(Math.round(Math.random() * 1) ? i : this.bombIcon)
          this.columnValue.push(j)
          this.gameOverStatus = false
          this.nextLevelStatus = false
          this.gameDataId.push(false)
        }
      }
      this.rowValue.forEach((element: number|string, index: number) => {
        this.initIndex.push(index)
        if(typeof element=="string"){
          this.bombIconStatus.push(true)
        }else if(typeof element=="number"){
          this.bombIconStatus.push(false)
        }
      })
    }
  }
  newGame() {
    if (this.newGameInitStatus) {
      this.pointerStatus = false
      this.bombIconStatus=[]
      this.bombNotIconStatus=[]
      this.bombData = []
      this.pointValue = 0
      this.initData = false
      this.rowCount = 3
      this.columnCount = 3
      this.rowValue = []
      this.columnValue = []
      this.gameDataId = []
      this.initIndex=[]
      for (let i = 1; i <= this.rowCount; i++) {
        for (let j = 1; j <= this.columnCount; j++) {
          this.rowValue.push(Math.round(Math.random() * 1) ? i :this.bombIcon)
          this.columnValue.push(j)
          this.gameOverStatus = false
          // this.gameDataId.push(false)
        }
      }
      this.rowValue.forEach((element: number|string, index: number) => {
        this.initIndex.push(index)
        if(typeof element=="string"){
          this.bombIconStatus.push(true)
        }else if(typeof element=="number"){
          this.bombIconStatus.push(false)
        }
      })
    }
  }
}

