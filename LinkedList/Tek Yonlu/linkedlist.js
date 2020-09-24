class createNode{
  constructor(element){
    this.element = element; 
    this.sonraki = null;
  }
}

class LinkedList {
  constructor(){
    this.ilk = null;
    this.son = null;
  }

  ekle(element){
    var dugum = new createNode(element); // Yeni bir dugum olusturalim
    if(this.ilk === null){ //Eger dugum yoksa yeni dugumu ilk'e atalim
        this.ilk = dugum;
        this.son = this.ilk;
        this.son.sonraki = null;
    }
    else {
        this.son.sonraki = dugum;
        this.son = dugum;
        this.son.sonraki = null;
    }

  }

  sil(element){
    var simdikiDugum = this.ilk;
    var oncekiDugum = null;
    while(simdikiDugum){
      if(simdikiDugum.element === element){
        break;
      }
      oncekiDugum = simdikiDugum;
      simdikiDugum = simdikiDugum.sonraki;
    }

    if(simdikiDugum !== null){
      if(simdikiDugum === this.ilk){
        if(simdikiDugum === this.son){
          this.ilk = null;
          this.son = null;
        }

        else{
          this.ilk = this.ilk.sonraki;
        }
      }

      else{
        oncekiDugum.sonraki = simdikiDugum.sonraki;
        if(simdikiDugum === this.son){
          this.son = oncekiDugum;
        }
      }

      console.log("Node Silindi!");
    }

    else{
      console.log("Node bulunamadi");
    }
  };

  listele(){
    var simdikiDugum = this.ilk;
    var list = []
    while(simdikiDugum){
      list.push(simdikiDugum);
      simdikiDugum = simdikiDugum.sonraki;
    }

    return list;
}
}