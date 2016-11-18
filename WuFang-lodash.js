var WuFang = {
  /**
   * 这是将数组arr分成二维数组，第二维数组的元素个数是m
   * arr是一个数组，m是第二位数组的元素个数
   * 返回的是新组成的数组
   * 例如([1,2,3,4,5],2)返回[[1,2],[3,4],[5]]
   */
  chunk: function(arr, m) {
    var result = []
    var temp = []
    for (var i = 0; i < arr.length; i++) {
      var j = i % m
      temp.push(arr[i])
      if (j == m - 1 || i == arr.length - 1) {
        result.push(temp)
        j = 0
        temp = []
      }
    }
    return result
  },
  chunk2: function(arr, m) {
    var result = []
    var l = Math.ceil(arr.length / m)
    for (var i = 0; i < l; i++) {
      result[i] = []
    }
    for (var j = 0; j < arr.length; j++) {
      var k = parseInt(j / m)
      result[k].push(arr[j])
    }
    return result
  },
  /**
   * 这是将数组arr中所有的false, null, 0, "", undefined, and NaN都删除掉
   * arr是一个数组
   * 返回的是新的只有数的数组
   * 例如([0, 1, false, 2, '', 3])返回[1, 2, 3]
   */
  compact: function(arr) {
    var newArr = []
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] / arr[i] != 1) {
        continue
      } else {
        newArr.push(arr[i])
      }
    }
    return newArr
  },
  /**
   * 这是将参数都连接到一个数组里面，参数是数字的话，直接push，参数是数组的话，将数组里面的元素push
   * 参数个数不固定
   * 返回的是将参数都连接起来的数组
   * 例如(array, 2, [3], [[4]])返回[1, 2, 3, [4]]
   */
  concat: function() {
    var ret = []
    for (var i = 0; i < arguments.length; i++) {
      if (!Array.isArray(arguments[i])) {
        ret.push(arguments[i])
      } else {
        for (var j = 0; j < arguments[i].length; j++) {
          ret.push(arguments[i][j])
        }
      }
    }
    return ret
  },
  /**
   * 传入的第一个数组中的元素如果在后面的数组中也存在，就删除，如果在后面的数组都不存在，就保存并返回
   * 参数时数组，个数不固定
   * 返回的是包含第一个数组中在后面的数组中都不存在的数组
   * 例如([2, 1, 6, 8], [2, 3], [8]))返回[1,6]
   */
  difference: function() {
    var compare = []
    var ret = []
    var flag = true
    for (var i = 1; i < arguments.length; i++) {
      for (var j = 0; j < arguments[i].length; j++) {
        compare.push(arguments[i][j])
      }
    }
    for (var k = 0; k < arguments[0].length; k++) {
      flag = true
      for (var l = 0; l < compare.length; l++) {
        if (arguments[0][k] == compare[l]) {
          flag = false
          break
        }
      }
      if (flag) {
        ret.push(arguments[0][k])
      }
    }
    return ret
  },
  /**
   * 删除数组前n项
   * 第一个参数是数组，第二个参数是要删除的元素的个数
   * 返回的是删除后的数组
   * 例如([1, 2, 3], 2)返回[3]
   */
  drop: function(arr, n) {
    if (n == undefined) {
      n = 1
    }
    for (var i = 0; i < n; i++) {
      arr.shift(i)
    }
    return arr
  },
  /**
   * 删除数组后n项
   * 第一个参数是数组，第二个参数是要删除的元素的个数
   * 返回的是删除后的数组
   * 例如([1, 2, 3], 2)返回[1]
   */
  dropRight: function(arr, n) {
    if (n == undefined) {
      n = 1
    }
    for (var i = 0; i < n; i++) {
      arr.pop()
    }
    return arr
  },
  /**
   * 将数组中的某几个元素替换成别的值
   * 第一个参数是数组，参数value是要替换的值，参数start是开始替换的位置，参数end是替换结束的位置，替换包括end，不包括start
   * 返回的替换后的数组
   * 例如([4, 6, 8, 10], '*', 1, 3)返回[4, '*', '*', 10]
   */
  fill: function(arr, value, start, end) {
    if (start == undefined) {
      start = 0
    }
    if (end == undefined) {
      end = arr.length
    }
    for (var i = start; i < end; i++) {
      arr[i] = value
    }
    return arr
  },
  /**
   * 将数组中的数组降一维，就是如果数组的元素还是数组，就把数组降一维
   * 参数就是数组
   * 返回的降维后的数组
   * 例如([1, [2, [3, [4]], 5]])返回[1, 2, [3, [4]], 5]
   */
  flatten: function(arr) {
    var result = []
    for (var i = 0; i < arr.length; i++) {
      if ((typeof arr[i]) == "number") {
        result.push(arr[i])
      } else {
        for (var j = 0; j < arr[i].length; j++) {
          result.push(arr[i][j])
        }
      }
    }
    return result
  },
  /**
   * 将数组降为一维的数组，就是只要数组中还有数组，就将递归调用自己，继续降维；直到数组中没有数组
   * 参数就是数组
   * 返回的降维后的数组
   * 例如([1, [2, [3, [4]], 5]])返回[1, 2, 3, 4, 5]
   */
  flattenDeep: function(arr) {
    var result = []
    for (var i = 0; i < arr.length; i++) {
      if (!(Array.isArray(arr[i]))) {
        result.push(arr[i])
      } else {
        for (var j = 0; j < arr[i].length; j++) {
          result.push(arr[i][j])
        }
      }
    }
    for (var k = 0; k < result.length; k++) {
      if (!(Array.isArray(result[k]))) {
        continue
      } else {
        return this.flattenDeep(result)
      }
    }
    return result
  },
  /**
   * 将数组中第一项变成对象的属性，第二项变成对应的属性的属性值
   * 参数就是数组
   * 返回的是新建成的对象
   * 例如([['a', 1], ['b', 2]])返回{ 'a': 1, 'b': 2 }
   */
  fromPairs: function(arr) {
    var obj = {}
    for (var i = 0; i < arr.length; i++) {
      obj[arr[i][0]] = arr[i][1]
    }
    return obj
  },
  initial: function(arr) {
    var ret = []
    for (var i = 0; i < arr.length - 1; i++) {
      ret.push(arr[i])
    }
    return ret
  },
  join: function(arr, separator) {
    var str = ""
    for (var i = 0; i < arr.length - 1; i++) {
      str += arr[i] + separator
    }
    return str + arr[arr.length - 1]
  },
  /**
   * 取出各数组中全等的元素
   * 参数就是需要检查的数组，个数不定
   * 返回的是全等的元素的数组
   * 例如([2, 1], [2, 3])返回[2]
   */
  intersection: function() {
    var ret = []
    var counter = 0
    for (var i = 0; i < arguments[0].length; i++) {
      counter = 0
      for (var j = 1; j < arguments.length; j++) {
        for (var k = 0; k < arguments[j].length; k++) {
          if (arguments[0][i] == arguments[j][k]) {
            counter++
            break
          }
        }
        if (counter == arguments.length - 1) {
          ret.push(arguments[0][i])
        }
      }
    }
    return ret
  },
  /**
   * 删除数组中的一些与value值相同的元素
   * arr是要删除元素的数组，value是值，如果arr中的元素和value一样，则删除
   * 返回删除后的arr
   * 例如(['a', 'b', 'c', 'a', 'b', 'c'],'a', 'c')返回['b', 'b']
   */
  pull: function(arr, value) {
    for (var i = 0; i < arr.length; i++) {
      for (var j = 1; j < arguments.length; j++) {
        if (arr[i] == arguments[j]) {
          arr.splice(i, 1)
          i = 0
          break
        }
      }
    }
    return arr
  },
  //同上,只是value可以是数值，也可以是数组
  pullAll: function(arr, value) {
    var comp = []
    for (var i = 1; i < arguments.length; i++) {
      for (var j = 0; j < arguments[i].length; j++) {
        comp.push(arguments[i][j])
      }
    }
    for (var k = 0; k < arr.length; k++) {
      for (var l = 0; l < comp.length; l++) {
        if (arr[k] == comp[l]) {
          arr.splice(k, 1)
          k = 0
          break
        }
      }
    }
    return arr
  },
  /**
   * 删除数组中的索引值与value中的值相同的元素
   * arr是要删除元素的数组，value是索引值，value可以是数值，也可以是数组，
   * 返回包含删除的元素的数组
   * 例如(['a', 'b', 'c', 'd'],[0, 3])返回['a', 'd']
   */
  pullAt: function(arr, index) {
    var result = []
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < index.length; j++) {
        if (i == index[j]) {
          result.push(arr[i])
          continue
        }
      }
    }
    for (var i = 0; i < arr.length; i++) {
      for (var j = 0; j < index.length; j++) {
        if (i == index[j]) {
          arr.splice(i, 1)
          continue
        }
      }
    }
    return result
  },
  /**
   * 将数组元素倒过来
   * arr要倒序的数组
   * 返回倒序的数组
   * 例如([1, 2, 3])返回[3, 2, 1]
   */
  reverse: function(arr) {
    var l = arr.length
    for (var i = 0; i < l; i++) {
      arr.push(arr[l - 1 - i])
    }
    arr.splice(0, l)
    return arr
  },
  /**
   * 将字符串以某种符号分开成数组，且只保留value个元素
   * string是要分开的字符串，separator隔开的符号，value是数组的元素的个数
   * 返回string转变的数组
   * 例如('a-b-c', '-', 2)返回['a', 'b']
   */
  split: function(string, separator, value) {
    var result = []
    if (value == 0) {
      return result
    }
    for (var i = 0; i < string.length; i++) {
      if (string[i] == separator) {
        continue
      }
      result.push(string[i])
      if (result.length == value) {
        break
      }
    }
    return result
  },
  head: function(arr) {
    return arr[0]
  },
  last: function(arr) {
    return arr[arr.length - 1]
  },
  /**
   * 删除数组的第一项
   */
  tail: function(arr) {
    arr.splice(0, 1)
    return arr
  },
  /**
   * 选取数组前n项
   */
  take: function(arr, n) {
    if (n == undefined) {
      n = 1
    }
    for (var i = arr.length - 1; i >= n; i--) {
      arr.pop()
    }
    return arr
  },
  /**
   * 选取数组后n项
   */
  takeRight: function(arr, n) {
    if (n == undefined) {
      n = 1
    }
    var l = arr.length - n
    for (var i = 0; i < l; i++) {
      arr.shift()
    }
    return arr
  },
  /**
   * 将n个数组连接成一个数组，但不能有重复的元素
   * n个数组
   * 返回连接后的数组，每次取得实参的值后，用函数判断，新连接的数组中是否已经有这个值了，
   * 如果有，就跳过；没有，就push进新的数组中
   * 例如([2], [1, 2])返回[1, 2]
   */
  union: function() {
    var ret = []
    for (var i = 0; i < arguments.length; i++) {
      for (var j = 0; j < arguments[i].length; j++) {
        if (judge(ret, arguments[i][j])) {
          ret.push(arguments[i][j])
        } else {
          continue
        }
      }
    }
    return ret

    function judge(array, value) {
      for (var k = 0; k < array.length; k++) {
        if (array[k] == value) {
          return false
        }
      }
      return true
    }
  },
  /**
   * 将数组复制一份，但是要删除掉数组中重复的元素
   * 数组
   * 返回复制的没有重复值的数组，和上一个做法一样
   * 例如([2, 1, 2])返回[2, 1]
   */
  uniq: function(arr) {
    var ret = []
    for (var i = 0; i < arr.length; i++) {
      if (judge(ret, arr[i])) {
        ret.push(arr[i])
      } else {
        continue
      }
    }
    return ret

    function judge(array, value) {
      for (var j = 0; j < array.length; j++) {
        if (array[j] == value) {
          return false
        }
      }
      return true
    }
  },
  /**
   * 删除数组中的和value值相等的元素
   * 一个要修改的数组，n个数值
   * 返回修改过的数组，每次取得数组的某一项，在value中遍历，如果有相等的，就不要了；如果没有相等的，就push进要返回的数组
   * 例如([2, 1, 2, 3], 1, 2)返回[3]
   */
  without: function(arr, value) {
    var ret = []
    var flag = true
    for (var i = 0; i < arr.length; i++) {
      flag = true
      for (var j = 1; j < arguments.length; j++) {
        if (arr[i] == arguments[j]) {
          flag = false
          break
        }
      }
      if (flag == true) {
        ret.push(arr[i])
      }
    }
    return ret
  },
  /**
   * n个数组中唯一出现的值重新组成一个数组
   * n个数组
   * 返回重新组合成的数组，将实参都连接成一个数组，遍历数组，如果某个元素只出现一次，则将其push进新的数组
   * 就push进要返回的数组
   * 例如([2, 1], [3, 2]))返回[1， 3]
   */
  xor: function() {
    var ret = []
    var comp = []
    for (var i = 0; i < arguments.length; i++) {
      for (var j = 0; j < arguments[i].length; j++) {
        comp.push(arguments[i][j])
      }
    }
    for (var k = 0; k < comp.length; k++) {
      if (judge(comp[k], comp) == 1) {
        ret.push(comp[k])
      } else {
        continue
      }
    }
    return ret

    function judge(value, arr) {
      var counter = 0
      for (var k = 0; k < arr.length; k++) {
        if (value == arr[k]) {
          counter++
        }
      }
      return counter
    }
  },
  indexOf: function(arr, value, index) {
    if (index < 0) {
      for (var i = arr.length - 1; i > 0; i--) {
        if (arr[i] == value) {
          return i
        }
      }
    }
    if (index == undefined) {
      index = 1
    }
    for (var i = index; i < arr.length; i++) {
      if (arr[i] == value) {
        return i
      }
    }
  },
  lastIndexOf: function(arr, value, index) {
    if (index == undefined) {
      index = arr.length
    }
    for (var i = index; i >= 0; i--) {
      if (arr[i] == value) {
        return i
      }
    }
  },
  /**
   * 将n个数组分解，每个数组的第一项组成一个新的数组的第一项，以此类推
   * n个数组
   * 返回重新组合的数组，每次取得所有数组的第一项，push进一个新的数组，所有实参遍历一遍之后，
   * 将新的数组push进要返回的数组中，以此类推
   * 例如(['a', 'b'], [1, 2], [true, false])返回[['a', 1, true], ['b', 2, false]]
   */
  zip: function() {
    var ret = []
    var result = []
    for (var i = 0; i < arguments[0].length; i++) {
      ret = []
      for (var j = 0; j < arguments.length; j++) {
        ret.push(arguments[j][i])
      }
      result.push(ret)
    }
    return result
  },
  /**
   * 将数组分解，数组的每一个元素的第一项组成新数组的第一项，以此类推
   * 分解的数组
   * 返回重新组合的数组
   * 例如[['a', 1, true], ['b', 2, false]]返回['a', 'b'], [1, 2], [true, false]
   */
  unzip: function(array) {
    var result = []
    var ret = []
    for (var i = 0; i < array[0].length; i++) {
      ret = []
      for (var j = 0; j < array.length; j++) {
        ret.push(array[j][i])
      }
      result.push(ret)
    }
    return result
  },
  /**
   * 将数组的每一项按照传入的函数来映射，将映射的结果组成新的数组返回
   * 要映射的数组，及函数
   * 返回映射后的数组
   * 例如[[1, 2, 3]]返回[[1, 4, 9]],前提是传入的函数是function square(arr[i], i, arr) {return arr[i] * arr[i]}
   */
  map: function(array, f) {
    var result = []
    for (var i = 0; i < array.length; i++) {
      result.push(f(array[i], i, array))
    }
    return result
  },
  /**
   * 将数组每一项传入函数，若函数返回真，则将该数组的这一项存入新的数组；否则不要
   * 要检验的数组，及断言函数
   * 返回检验后的数组
   * 例如传入var users = [{ 'user': 'barney', 'age': 36, 'active': true },{ 'user': 'fred',   'age': 40, 'active': false }];
   * 返回[{ 'user': 'barney', 'age': 36, 'active': true }]，前提是函数是按照'active'的值来判断真假
   */
  filter: function(users, f) {
    var result = []
    for (var i = 0; i < users.length; i++) {
      if (f(users[i], i, users)) {
        result.push(users[i])
      }
    }
    return result
  },
  /**
   * 将数组每一项传入函数，若函数返回假，则将该数组的这一项存入新的数组；否则不要
   * 要检验的数组，及断言函数
   * 返回检验后的数组
   * 例如传入var users = [{ 'user': 'barney', 'age': 36, 'active': true },{ 'user': 'fred',   'age': 40, 'active': false }];
   * 返回[{ 'user': 'fred',   'age': 40, 'active': false }]，前提是函数是按照'active'的值来判断真假
   */
  reject: function(users, f) {
    var result = []
    for (var i = 0; i < users.length; i++) {
      if (!f(users[i], i, users)) {
        result.push(users[i])
      }
    }
    return result
  },
  /**
   * 将数组每一项传入函数，若函数返回真，则将该数组的这一项存入新的数组的第一项；否则存入新数组的第二项
   * 要检验的数组，及断言函数
   * 返回检验后的数组
   * 例如传入var users = [
   * { 'user': 'barney',  'age': 36, 'active': false },
   * { 'user': 'fred',    'age': 40, 'active': true },
   * { 'user': 'pebbles', 'age': 1,  'active': false }
   * ];
   * 返回[
   * [{ 'user': 'barney', 'age': 36, 'active': true }],
   * [{ 'user': 'barney',  'age': 36, 'active': false }],
   * [{ 'user': 'pebbles', 'age': 1,  'active': false }]
   * ]，前提是函数是按照'active'的值来判断真假
   */
  partition: function(users, f) {
    var result = [
      [],
      []
    ]
    for (var i = 0; i < users.length; i++) {
      if (f(users[i], i, users)) {
        result[0].push(users[i])
      } else {
        result[1].push(users[i])
      }
    }
    return result
  },
  every: function(users, f) {
    for (var i = 0; i < users.length; i++) {
      if (f(users[i], i, users)) {
        continue
      } else {
        return false
      }
    }
    return true
  },
  some: function(users, f) {
    for (var i = 0; i < users.length; i++) {
      if (f(users[i], i, users)) {
        return true
      } else {
        continue
      }
    }
    return false
  },
  reduce: function(arr, fn, value) {
    var a = arr.length
    var result = 0
    if (value == undefined) {
      result = arr[0]
      arr.splice(0, 1)
      for (var i = 0; i < a - 1; i++) {
        result = fn(result, arr[0])
        arr.splice(0, 1)
      }
    } else {
      var result = value
      for (var i = 0; i < a; i++) {
        result = fn(result, arr[0])
        arr.splice(0, 1)
      }
    }

    return result
  },
  nth: function(arr, value) {
    if (value < 0) {
      return arr[arr.length - Math.abs(value)]
    }
    return arr[value]
  },
  sortedIndex: function(arr, value) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] <= value && arr[i + 1] >= value) {
        return i + 1
      }
    }
  },

  cameCase: function(str) {
    var str1 = ""
    for (var i = 0; i < str.length; i++) {
      if (letter(str[i])) {
        if (!letter(str[i - 1])) {
          str1 += str[i].toUpperCase()
        } else {
          str1 += str[i].toLowerCase()
        }
      }
    }
    var finalStr = str1[0].toLowerCase()
    for (var i = 1; i < str1.length; i++) {
      finalStr += str1[i]
    }

    function letter(char) {
      if (char == undefined) {
        return false
      }
      if ((char.charCodeAt() >= 65 && char.charCodeAt() <= 90) || (char.charCodeAt() >= 97 && char.charCodeAt() <= 122)) {
        return true
      } else {
        return false
      }
    }
    return finalStr
  },
  capitalize: function(str) {
    var retStr = str[0].toUpperCase()
    for (var i = 1; i < str.length; i++) {
      retStr += str[i].toLowerCase()
    }
    return retStr
  },
  endsWith: function(str, target, position) {
    if (position == undefined) {
      position = str.length
    }
    if (str[position - 1] == target) {
      return true
    } else {
      return false
    }
  },
  escape: function(str) {
    var retStr = ""
    for (var i = 0; i < str.length; i++) {
      retStr += characterEscape(str[i])
    }

    function characterEscape(char) {
      switch (char) {
        case "&":
          return "&amp;"
        case ">":
          return "&gt;"
        case "<":
          return "&lt;"
        case "'":
          return "&apos;"
        case '"':
          return "&quot;"
        case '`':
          return "&lsquo;"
      }
      return char
    }
    return retStr
  },
  escapeRegExp: function(str) {
    var retStr = ""
    for (var i = 0; i < str.length; i++) {
      if (characterEscape(str[i]) == "\\") {
        retStr += characterEscape(str[i])
      }
      retStr += str[i]
    }

    function characterEscape(char) {
      switch (char) {
        case "^":
        case "$":
        case "":
        case ".":
        case "*":
        case "+":
        case "?":
        case "(":
        case ")":
        case "[":
        case "]":
        case "{":
        case "}":
        case "|":
          return '\\'
      }
      return char
    }
    return retStr
  },
  kebabCase: function(str) {
    var newStr = ""
    for (var i = 0; i < str.length; i++) {
      if (letter(str[i])) {
        if (!letter(str[i - 1])) {
          newStr += "-" + str[i].toLowerCase()
        } else {
          newStr += str[i].toLowerCase()
        }
      }
    }
    var finalStr = ""
    for (var i = 1; i < newStr.length; i++) {
      finalStr += newStr[i]
    }

    function letter(char) {
      if (char == undefined) {
        return false
      }
      if ((char.charCodeAt() >= 65 && char.charCodeAt() <= 90) || (char.charCodeAt() >= 97 && char.charCodeAt() <= 122)) {
        return true
      } else {
        return false
      }
    }
    return finalStr
  },
  lowerCase: function(str) {
    var newStr = ""
    for (var i = 0; i < str.length; i++) {
      if (letter(str[i])) {
        if (!letter(str[i - 1]) || isUpperCase(str[i])) {
          newStr += " " + str[i].toLowerCase()
        } else {
          newStr += str[i].toLowerCase()
        }
      }
    }
    var finalStr = ""
    for (var i = 1; i < newStr.length; i++) {
      finalStr += newStr[i]
    }

    function letter(char) {
      if (char == undefined) {
        return false
      }
      if ((char.charCodeAt() >= 65 && char.charCodeAt() <= 90) || (char.charCodeAt() >= 97 && char.charCodeAt() <= 122)) {
        return true
      } else {
        return false
      }
    }

    function isUpperCase(char) {
      if (char.charCodeAt() >= 65 && char.charCodeAt() <= 90) {
        return true
      }
      return false
    }
    return finalStr
  },
  lowerFirst: function(str) {
    var retStr = str[0].toLowerCase()
    for (var i = 1; i < str.length; i++) {
      retStr += str[i]
    }
    return retStr
  },
  pad: function(str, len, char) {
    if (str.length == len) {
      return str
    } else {
      var finalStr = ""
      if (char == undefined) {
        char = " "
      }
      for (var i = 0; i < parseInt((len - str.length) / 2); i++) {
        finalStr += char[i % char.length]
      }
      for (var j = 0; j < str.length; j++) {
        finalStr += str[j]
      }
      for (var k = 0; k < Math.ceil((len - str.length) / 2); k++) {
        finalStr += char[k % char.length]
      }
    }
    return finalStr
  },
  padEnd: function(str, len, char) {
    if (str.length == len) {
      return str
    } else {
      var finalStr = ""
      if (char == undefined) {
        char = " "
      }
      for (var j = 0; j < str.length; j++) {
        finalStr += str[j]
      }
      for (var k = 0; k < len - str.length; k++) {
        finalStr += char[k % char.length]
      }
    }
    return finalStr
  },
  padStart: function(str, len, char) {
    if (str.length == len) {
      return str
    } else {
      var finalStr = ""
      if (char == undefined) {
        char = " "
      }
      for (var k = 0; k < len - str.length; k++) {
        finalStr += char[k % char.length]
      }
      for (var j = 0; j < str.length; j++) {
        finalStr += str[j]
      }
    }
    return finalStr
  },
  // parseInt: function(str, value) {
  // if ((value == undefined || value == 0) && (str[0] != "0" && str[1] != "x")) {
  //   value = 10
  // }
  // if (str[0] == "0" && str[1] == "x") {
  //   value = 16
  // }
  //   return Number(str)
  // },

}

// console.log(WuFang.parseInt('001001'))
