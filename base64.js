  function decode(str) {
    if(str.slice(str.length - 2) === '==') {
      str = str.slice(0,str.length - 2)
    } 
    if((str.slice(str.length - 1) === '=') && (str.slice(str.length - 2) != '==')) {
      str = str.slice(0,str.length - 1)
    }
    console.log(str)
    return str.split('').map(it=>data[it].toString(2)).map(function(it) {
      var l = 6 - it.length 
      for(var i = 1; i <= l; i++) {
        it = 0 + it
      }
      return it
    }).join('').match(/(\d{8})/g).map(it=>String.fromCharCode(parseInt(it,2))).join('')
  }

var data = {
 'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4, 'F': 5, 'G': 6, 'H': 7, 'I': 8, 'J': 9, 'K': 10, 'L': 11, 'M': 12, 'N': 13, 'O': 14, 'P': 15, 'Q': 16, 'R': 17, 'S': 18, 'T': 19, 'U': 20, 'V': 21, 'W': 22, 'X': 23, 'Y': 24, 'Z': 25, 'a': 26, 'b': 27, 'c': 28, 'd': 29, 'e': 30, 'f': 31, 'g': 32, 'h': 33, 'i': 34, 'j': 35, 'k': 36, 'l': 37, 'm': 38, 'n': 39, 'o': 40, 'p': 41, 'q': 42, 'r': 43, 's': 44, 't': 45, 'u': 46, 'v': 47, 'w': 48, 'x': 49, 'y': 50, 'z': 51, '0': 52, '1': 53, '2': 54, '3': 55, '4': 56, '5': 57, '6': 58, '7': 59, '8': 60, '9': 61, '+': 62, '/': 63,
}


function encode(str) {
  var remainder = str.length % 3
  if(remainder== 1) {
    str += '00'
  } else if(remainder == 2){
    str += '0'
  }
  var arr = str.match(/(...)/g).map(it=>it.split(''))
  
  var result = arr.map(it=>it.map(
      function(value,index,array) {
        if(index === array.length - 1 && value === 0) {
          return '00000000'
        } 
        if(index === array.length - 2 && value === 0) {
          return '00000000'
        }
        return value.charCodeAt().toString(2)
      }).map(it=>{
        var l = 8 - it.length 
        for(var i = 1; i <= l;i++) {
          it = 0 + it
        }
        return it
    }).join('').match(/(\d{6})/g).map(
      it=>base64Index[parseInt(it,2)]).join('')
    ).join('')
  if(remainder == 1) {
    return result.slice(0,result.length -2) + '=='
  } else if(remainder == 2) {
    return result.slice(0,result.length -1) + '='
  } else {
    return result
  }
}
var base64Index = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z','a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9','+', '/']