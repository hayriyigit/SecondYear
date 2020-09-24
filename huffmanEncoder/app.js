// querySelector ile kelime/cumle girdisi ve butonumuzun oldugu
// kismi sectik
const form = document.querySelector("#kelime-form");

// kelime/cumle girdisi icin inputumuzu sectik
const kelime = document.querySelector("#kelime");

// Huffman ve LZW bilgilerini yazdiracagimiz
// tablo elemanlarini sectik
const tbody = document.querySelector("#tbody");
const tlast = document.querySelector("#tlast");
const tlzw1 = document.querySelector("#tlzw1");
const tlzw2 = document.querySelector("#tlzw2");

// Form objemizde girdi yapildiginda olusacak olay
// icin eventListener ekledik ve 'frekans' isimli fonksiyona
// gonderdik
form.addEventListener("submit",frekans);


//HUFFMAN ENCODING

// Harflerin frekanslarini cikardik
function frekansCikar(str){
var frekans={};
for (var i in str){

    if(frekans[str[i]]==undefined){

        frekans[str[i]]=1;
    }
    else {
        frekans[str[i]]=frekans[str[i]]+1;
    }
}

return frekans;
}

// Frekans listesine gore Huffman agacini olusturduk
function agacOlustur(liste){  
    while(liste.length>1)  
    {  
    sonIki=[liste[0][1],liste[1][1]]  
    kalan=liste.slice(2,liste.length);  
    frekans=liste[0][0]+liste[1][0];  
    liste=kalan;  
    son=[frekans,sonIki];  
    liste.push(son);  
    liste.sort();  
    }  
return liste[0][1];  
} 

// Harflerin ikilik degerlerini olusturulan agaca gore aldik
var code = {};
function huffmanKodu(agac,sonuc)  
{  
    if(typeof(agac)==typeof(""))  
        code[agac]=sonuc;  
    else  
    {  
        huffmanKodu( agac[0], sonuc+'0');  
        huffmanKodu( agac[1], sonuc+'1');  
    }  
}  
 

//LZW ENCODING

function lzwEncoding(){
    var result = new Array();
    var lzw = kelime.value.trim();
    var str = lzw.split("");
    
    // Str listesinde gecen her bir benzersiz-unique harfi 
    // sozluk adli listeye attik
    var sozluk = String.prototype.concat(...new Set(str)).split("");

    var string = "";
    for(var char in str){
    
        if(sozluk.includes(string+str[char])){
            string = string+str[char];
        }
        else{
            result.push(sozluk.indexOf(string));
            sozluk.push(string+str[char]);
            string = str[char];
        }
    }
    result.push(sozluk.indexOf(string));
    return [sozluk, result];
}


//TABLOLAR ICIN TEMA
/* <tr>
<th>harf</th>
<td>kod</td>
<td>bit</td>
<td>frekans</td>
</tr> */

// Fonsiyonumuza e (event) objesini gonderdik
function frekans(e){
    
    // Bilgilerin yer alacagi tablo kisimlarini
    // her bir sorgu icin temizledik
    tbody.innerHTML ="";
    tlast.innerHTML ="";

    tlzw1.innerHTML ="";
    tlzw2.innerHTML ="";

    // Kelime/Cumle girdimizin degerini aldik
    // trim fonksiyonu ile bastaki ve sondaki
    // gereksiz boslukleri sildik
    var yeni = kelime.value.trim();

    //HUFMAN ENCODING

    // Harf frekanslarini aldik
    var frekanslar = frekansCikar(yeni);
    var genel = new Array();

    // Cumlede gecen butun harflari aldik
    // Split fonksiyonu ile harf harf parcaladik
    var harfler = yeni.split("");

    // Harf frekanslarini push fonksitonu ile
    // genel adli liste attik
    for(var i in frekanslar){
        genel.push([frekanslar[i],i]);
    }

    // Sort fonksiyonu ile genel adli
    // listeyi frekanslara gore siraladik
    genel = genel.sort();
    var sonuc = '';
    
    tree=agacOlustur(genel);
    huffmanKodu(tree,sonuc, code);

    var toplamBit = 0;
    var sonKod = "";
    for(var i in frekanslar){
        var harf = i;
        var kod= code[i];
        var bitSayisi = code[i].length;
        var frekans = frekanslar[i];
        toplamBit += bitSayisi*frekans;
        
        // Huffman bilgilerini tablomuza attik
        tbody.innerHTML+=`<tr>
        <th>${harf}</th>
        <td>${kod}</td>
        <td>${bitSayisi}</td>
        <td>${frekans}</td>
        </tr>`;
    }

    for(var j in harfler){
        var kod= code[harfler[j]];
        
        // Concat fonksiyonu ile harflarin ikilik 
        // ifadelerini sonKod adli listeye attik
        sonKod = sonKod.concat(kod," ");
    }
    var normalDeger = yeni.length * 8;
    var kazanc = normalDeger - toplamBit;

        // Huffman bilgilerini tablomuza attik
        tlast.innerHTML+=` <tr>
        <td>${normalDeger} bit</td>
        <td>${toplamBit} bit</td>
        <td>${kazanc} bit</td>
        <td>${sonKod}</td>
        </tr>`

    code = {};
    
    //LZW ENCODING
    var lzw = lzwEncoding();
    sozluk = lzw[0];
    result = lzw[1];
    var lzwKazanc = normalDeger - (result.length * 8);

    // LZW bilgilerini tablomuza attik
    tlzw1.innerHTML = `<tr>
        <td>${sozluk.join(" / ")}</td>
        <td>${result.join(" , ")}</td>
    </tr>`;
    tlzw2.innerHTML = `<tr>
        <td>${normalDeger} bit</td>
        <td>${result.length * 8} bit</td>
        <td>${lzwKazanc} bit</td>
    </tr>`;
    
    kelime.value = "";
    e.preventDefault();
}