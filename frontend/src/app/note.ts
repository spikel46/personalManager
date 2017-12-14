export class Note {
  content : String;
  timestamp : Date;

  constructor(myJson){
    this.content = myJson.content;
    this.timestamp = myJson.content;
  }
}
