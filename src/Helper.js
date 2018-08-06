import JQuery from 'jquery';
let $ = JQuery;
var letter_array = ["あ","い","う","え","お","か","き","く","け","こ","さ","し","す","せ","そ","た","ち","つ","て","と","な","に","ぬ","ね","の","は","ひ","ふ","へ","ほ","ま","み","む","め","も","や","ゆ","よ","ら","り","る", "れ","ろ","わ","を","ん","が","ぎ","ぐ","げ","ご","ざ","じ","ず","ぜ","ぞ","だ","ぢ","づ","で","ど","ば","び","ぶ","べ","ぼ","ぱ","ぴ","ぷ","ぺ","ぽ"];
var romaji_array = ['aa','ii','uu','ee','oo','ka','ki','ku','ke','ko','sa','si','su','se','so','ta','ti','tu','te','to','na','ni','nu','ne','no','ha','hi','hu','he','ho','ma','mi','mu','me','mo','ya','yu','yo','ra','ri','ru','re','ro','wa','wo','nn','ga','gi','gu','ge','go','za','ji','zu','ze','zo','da','ji','zu','de','do','ba','bi','bu','be','bo','pa','pi','pu','pe','po'];


Array.prototype.copyData = function() {
  var array = [];
  for (let index = 0; index < letter_array.length; index++) {
    array[index] = letter_array[index];
  }
  return array;
}
Array.prototype.shuffle = function() {
  var currentIndex = this.length, tem, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    tem = this[currentIndex];
    this[currentIndex] = this[randomIndex];
    this[randomIndex] = tem;
  }

  return this;
}

Array.prototype.randomItems = function(number) {
  var array = letter_array.copyData();
  array.shuffle();
  array = array.slice(0, number);
  return array;
}


function getAudioLink(letter) {
  // console.log(letter);
  var index = $.inArray(letter, letter_array);
  // var index = letter_array.indexOf(letter);
  if (index < 0 || romaji_array.length <= index) {
    return null;
  }
  var url = 'https://www.nhk.or.jp/lesson/mp3/syllabary/' +romaji_array[index] +'.mp3';
  // console.log(url);
  return url;
}

function getRandomItems(number) {
  var array = letter_array.copyData();
  array.shuffle();
  array = array.slice(0, number);
  return array;
}

function playAudio(item) {
  var audioUrl = getAudioLink(item);
  var audio = new Audio(audioUrl);
  audio.play();
}

export {getAudioLink, getRandomItems, playAudio}
