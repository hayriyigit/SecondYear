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
        this.ilk.sonraki = this.ilk;

    }
    else {
        this.son.sonraki = dugum;
        this.son = dugum;
        this.son.sonraki = this.ilk;
    }

  }

  sil(element){
    var simdikiDugum = this.ilk;
    var oncekiDugum = null;
    while(true){
      if(simdikiDugum.sonraki === this.ilk){
        break;
      }
      else{
        if(simdikiDugum.element === element){
          break;
        }
        oncekiDugum = simdikiDugum;
        simdikiDugum = simdikiDugum.sonraki;
      }
          
    }

    if(simdikiDugum !== null){
      if(simdikiDugum === this.ilk){
        if(simdikiDugum === this.son){
          this.ilk = null;
          this.son = null;
        }

        else{
          this.ilk = this.ilk.sonraki;
          this.son.sonraki = this.ilk;
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
    var liste = []
    while(simdikiDugum){
      if(simdikiDugum.sonraki === this.ilk){
        liste.push(simdikiDugum);
        break;
      }
      liste.push(simdikiDugum);
      simdikiDugum = simdikiDugum.sonraki;
      
    }
    // console.log(liste);
    return liste;
}
}