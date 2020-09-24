class createNode{
  constructor(element){
    this.element = element; 
    this.sonraki = null;
    this.onceki = null;
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
        this.ilk.sonraki = null;
        this.ilk.onceki = null;
    }
    else {
        this.son.sonraki = dugum;
        dugum.onceki = this.son;
        this.son = dugum;
        this.son.sonraki = null;
    }

  }

  sil(element){
    var simdikiDugum = this.ilk;
    var oncekiDugum = null;
    var sonrakiDugum = null;
    while(simdikiDugum){
      if(simdikiDugum.element === element){
        break;
      }
      oncekiDugum = simdikiDugum;
      simdikiDugum = simdikiDugum.sonraki;
      sonrakiDugum = simdikiDugum.sonraki;
    }

    if(simdikiDugum !== null){
      if(simdikiDugum === this.ilk){
        if(simdikiDugum === this.son){
          this.ilk = null;
          this.son = null;
        }

        else{
          this.ilk.sonraki.onceki = null;
          this.ilk = this.ilk.sonraki;
        }
      }

      else{
        if(simdikiDugum === this.son){
          oncekiDugum.sonraki = null;
          this.son = oncekiDugum;
        }
        else{
          oncekiDugum.sonraki = sonrakiDugum;
          sonrakiDugum.onceki = oncekiDugum;
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
      liste.push(simdikiDugum);
      simdikiDugum = simdikiDugum.sonraki;
    }
    console.log(liste);
    return liste;
}
}