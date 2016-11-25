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
   * 参数是数组，个数不固定
   * 返回的是包含第一个数组中在后面的数组中都不存在的元素组成的数组
   * 例如([2, 1, 6, 8], [2, 3], [8])返回[1,6]
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
   * array和arr中的每个元素都运行函数f，
   * 运行后的值进行比较，如果array中的某个值运行后再arr中不存在，那么将数组原来的值push进新的数组
   * array比较的数组，arr被比较的数组，f映射的函数
   * 返回的是包含运行f后第一个数组中在后面的数组中都不存在的元素组成的数组
   * 例如([3.1, 2.2, 1.3], [4.4, 2.5], Math.floor)返回[3.1, 1.3]
   */
  differenceBy: function(array, arr, f) {
    if (typeof f == 'string') {
      fn = function(value) {
        return value[f]
      }
    } else {
      fn = f
    }
    // if (Array.isArray(fn)) {

    // }
    // if (typeof fn = 'object') {

    // }
    return array.filter(function(a) {
      var ret = [];
      ret.push(a);
      return arr.map(b => fn(b)).every(b => b != ret.map(c => fn(c)))
    })
    array.filter(a => !f(a))
  },
  differenceWith: function(array, arr, f) {
    return array.filter(a => !f(a, arr[0]))
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
  /**
   * 将数组连接成字符串，且中间是以某个符号连接的
   * 参数是要连接的数组，中间的符号
   * 返回连接后的字符串
   * 例如(['a', 'b', 'c'], '~')返回'a~b~c'
   */
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
   * 参数是一个数组
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
   * 例如([2, 1], [3, 2])返回[1，3]
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
  /**
   * 返回value首次在数组array中被找到的索引值
   * 数组，查询的值，索引值
   * 在数组中从参数给的索引值开始查询，如果没给索引值，就从索引值为0开始查询。
   * 查到与value值相同的值就返回其索引值,否则就返回-1
   * 例如([1, 2, 1, 2], 2, 2)返回3
   */
  indexOf: function(arr, value, index) {
    if (index < 0) {
      for (var i = arr.length - 1; i > 0; i--) {
        if (arr[i] == value) {
          return i
        }
      }
    }
    if (index == undefined) {
      index = 0
    }
    for (var i = index; i < arr.length; i++) {
      if (arr[i] == value) {
        return i
      }
    }
    return -1
  },
  /**
   * 基本同上，只是从数组后面开始查询
   * 数组，查询的值，索引值
   * 在数组中从参数给的索引值开始查询，如果没给索引值，就从索引值为0开始查询。
   * 查到与value值相同的值就返回其索引值，否则就返回-1
   * 例如([1, 2, 1, 2], 2, 2)返回1
   */
  lastIndexOf: function(arr, value, index) {
    if (index == undefined) {
      index = arr.length
    }
    for (var i = index; i >= 0; i--) {
      if (arr[i] == value) {
        return i
      }
    }
    return -1
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
   * 将数组或对象的每一项按照传入的函数或对象属性来映射，将映射的结果组成新的数组返回
   * 第一个参数要映射的数组或对象，第二个参数是函数或者字符串,如果没有给第二个参数传值，则第二个参数就改为返回第一个参数的函数
   * 返回映射得到的新数组
   * 例如[[1, 2, 3]]返回[[1, 4, 9]],前提是传入的函数是function square(arr[i], i, arr) {return arr[i] * arr[i]}
   */
  map: function(collection, iteratee) {
    var result = []
    if (!iteratee) {
      iterater = function(a) {
        return a
      }
    } else if (typeof iteratee == "string") {
      iterater = function(value, key, collection) {
        return collection[key][iteratee]
      }
    } else {
      iterater = iteratee
    }

    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        result.push(iterater(collection[i], i, collection))
      }
    } else if (typeof collection == "object") {
      for (var key in collection) {
        result.push(iterater(collection[key], key, collection))
      }
    }
    return result
  },
  /**
   * 将数组或对象每一项传入第二个参数，若第二个参数返回真，则将该数组或者对象的这一项存入新的数组；否则不要；
   * 第二个参数可能是函数、数组、对象、字符串
   * 要检验的数组或对象，及断言函数或数组、对象、字符串
   * 返回检验后的数组
   * 例如传入var users = [{ 'user': 'barney', 'age': 36, 'active': true },{ 'user': 'fred',   'age': 40, 'active': false }];
   * 返回[{ 'user': 'barney', 'age': 36, 'active': true }]，前提是函数是按照'active'的值来判断真假
   */
  filter: function(collection, predicate) {
    var result = []
    if (!predicate) {
      fn = function(a) {
        return a
      }
    } else if (Array.isArray(predicate)) {
      fn = function(obj) {
        if (obj[predicate[0]] == predicate[1]) {
          return true
        }
        return false
      }
    } else if (typeof predicate == "object") {
      fn = function(obj) {
        for (var key in predicate) {
          if (predicate[key] != obj[key]) {
            return false
          }
        }
        return true
      }
    } else if (typeof predicate == "string") {
      fn = function(obj) {
        return obj[predicate]
      }
    } else {
      fn = predicate
    }

    for (var key in collection) {
      if (fn(collection[key]))
        result.push(collection[key])
    }
    return result
  },
  /**
   * 和filter相反，将数组每一项传入函数，若函数返回假，则将该数组的这一项存入新的数组；否则不要
   * 要检验的数组，及断言函数
   * 返回检验后的数组
   * 例如传入var users = [{ 'user': 'barney', 'age': 36, 'active': true },{ 'user': 'fred',   'age': 40, 'active': false }];
   * 返回[{ 'user': 'fred',   'age': 40, 'active': false }]，前提是函数是按照'active'的值来判断真假
   */
  reject: function(collection, predicate) {
    var result = []
    if (!predicate) {
      fn = function(a) {
        return a
      }
    } else if (Array.isArray(predicate)) {
      fn = function(obj) {
        if (obj[predicate[0]] == predicate[1]) {
          return true
        }
        return false
      }
    } else if (typeof predicate == "object") {
      fn = function(obj) {
        for (var key in predicate) {
          if (predicate[key] != obj[key]) {
            return false
          }
        }
        return true
      }
    } else if (typeof predicate == "string") {
      fn = function(obj) {
        return obj[predicate]
      }
    } else {
      fn = predicate
    }

    for (var key in collection) {
      if (!fn(collection[key]))
        result.push(collection[key])
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
  partition: function(collection, predicate) {
    var result = [
      [],
      []
    ]
    if (!predicate) {
      fn = function(a) {
        return a
      }
    } else if (Array.isArray(predicate)) {
      fn = function(obj) {
        if (obj[predicate[0]] == predicate[1]) {
          return true
        }
        return false
      }
    } else if (typeof predicate == "object") {
      fn = function(obj) {
        for (var key in predicate) {
          if (predicate[key] != obj[key]) {
            return false
          }
        }
        return true
      }
    } else if (typeof predicate == "string") {
      fn = function(obj) {
        return obj[predicate]
      }
    } else {
      fn = predicate
    }

    for (var i = 0; i < collection.length; i++) {
      if (fn(collection[i], i, collection)) {
        result[0].push(collection[i])
      } else {
        result[1].push(collection[i])
      }
    }
    return result
  },
  /**
   * 将数组或对象每一项传入第二个参数，若第二个参数返回真，则返回true，否则返回false；
   * 第二个参数可能是函数、数组、对象、字符串
   * 要检验的数组或对象，及断言函数或数组、对象、字符串
   * 返回检验后的数组
   * 例如传入([true, 1, null, 'yes'], Boolean),则返回false
   */
  every: function(collection, predicate) {
    if (!predicate) {
      fn = function(a) {
        return a
      }
    } else if (Array.isArray(predicate)) {
      fn = function(obj) {
        if (obj[predicate[0]] == predicate[1]) {
          return true
        }
        return false
      }
    } else if (typeof predicate == "object") {
      fn = function(obj) {
        for (var key in predicate) {
          if (predicate[key] != obj[key]) {
            return false
          }
        }
        return true
      }
    } else if (typeof predicate == "string") {
      fn = function(obj) {
        return obj[predicate]
      }
    } else {
      fn = predicate
    }

    for (var i = 0; i < collection.length; i++) {
      if (fn(collection[i], i, collection)) {
        continue
      } else {
        return false
      }
    }
    return true
  },
  /**
   * 将数组或对象每一项传入第二个参数，若每一项都为真，则返回true，只要有一个为假，否则返回false；
   * 第二个参数可能是函数、数组、对象、字符串
   * 要检验的数组或对象，及断言函数或数组、对象、字符串
   * 返回检验后的数组
   * 例如传入([true, 1, null, 'yes'], Boolean),则返回true
   */
  some: function(collection, predicate) {
    if (!predicate) {
      fn = function(a) {
        return a
      }
    } else if (Array.isArray(predicate)) {
      fn = function(obj) {
        if (obj[predicate[0]] == predicate[1]) {
          return true
        }
        return false
      }
    } else if (typeof predicate == "object") {
      fn = function(obj) {
        for (var key in predicate) {
          if (predicate[key] != obj[key]) {
            return false
          }
        }
        return true
      }
    } else if (typeof predicate == "string") {
      fn = function(obj) {
        return obj[predicate]
      }
    } else {
      fn = predicate
    }
    for (var i = 0; i < collection.length; i++) {
      if (fn(collection[i], i, collection)) {
        return true
      } else {
        continue
      }
    }
    return false
  },
  /**
   * 将数组或对象每一项传入函数中，再次将数组或对象的下一个值和函数的返回值一起再传入函数，以此类推
   * 将返回的值累加后返回，如果没有提供初始值，则将数组或者对象的第一个元素作为初始值
   * arr是用来迭代的集合，fn是每次迭代调用的函数，value是初始值
   * 要检验的数组或对象，及断言函数或数组、对象、字符串
   * 返回检验后的数组
   * 例如传入([1, 2], function(sum, n) {return sum + n;}, 0),则返回3
   */
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
  /**
   * 获取array数组的第n个元素。如果n为负数，则返回从数组结尾开始的第n个元素。
   * arr是要查询的数组，value是要返回元素的索引值
   * 返回查询到的元素的索引值
   * 输入(['a', 'b', 'c', 'd']，1)，返回'b'
   */
  nth: function(arr, value) {
    if (value < 0) {
      return arr[arr.length - Math.abs(value)]
    }
    return arr[value]
  },
  /**
   * 使用二进制的方式检索来决定value值应该插入到数组中尽可能小的索引位置，以保证array的排序
   * arr是要查询的数组，value是要查询的值
   * 返回value应该插入的位置的索引值
   * 输入([30, 50], 40)，返回1
   */
  sortedIndex: function(arr, value) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] <= value && arr[i + 1] >= value) {
        return i + 1
      }
    }
  },
  /**
   * 检查字符串string是否以给定的target字符串结尾
   * arr是要查询的数组，target是要检索的字符，position是检索的位置
   * 如果字符串string以target字符串结尾，那么返回 true，否则返回 false
   * 输入('abc', 'c')，返回true
   */
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
  /**
   * 转义string中的 "&", "<", ">", '"',"'", 和 "`" 字符为 HTML 实体字符
   * 要转义的字符串
   * 返回转义后字符串
   * 输入(fred, barney, & pebbles')，返回'fred, barney, &amp; pebbles'
   */
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
  /**
   * 转义 RegExp 字符串中特殊的字符 "^", "$", "",".","*","+","?","(",")","[","]","{","}", 和"|" in
   * @param  要转义的字符串
   * @return 返回转义后的字符串
   * 输入'[lodash](https://lodash.com/)'，则返回'\[lodash\]\(https://lodash\.com/\)'
   */
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
  //检验一个字符是不是字母
  letter: function(char) {
    if (char == undefined) {
      return false
    }
    if ((char.charCodeAt() >= 65 && char.charCodeAt() <= 90) || (char.charCodeAt() >= 97 && char.charCodeAt() <= 122)) {
      return true
    } else {
      return false
    }
  },
  //检验一个字符是不是大写字母
  isUpperCase: function(char) {
    if (char.charCodeAt() >= 65 && char.charCodeAt() <= 90) {
      return true
    }
    return false
  },
  /**
   * 转换字符串string为驼峰写法
   * 要转换的字符串
   * 返回驼峰写法的单词
   * 例如('Foo Bar')，返回'fooBar'
   */
  camelCase: function(str) {
    var str1 = ""
    for (var i = 0; i < str.length; i++) {
      if (this.letter(str[i])) {
        if (!this.letter(str[i - 1])) {
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
    return finalStr
  },
  /**
   * 转换字符串string为kebab case，也就是单词间以中划线隔开
   * 要转换的字符串
   * 返回kebab case的形式的单词
   * 例如('Foo Bar')，返回'foo-Bar'
   */
  kebabCase: function(str) {
    var newStr = ""
    for (var i = 0; i < str.length; i++) {
      if (this.letter(str[i])) {
        if (!this.letter(str[i - 1]) || (this.isUpperCase(str[i]) && (!this.isUpperCase(str[i - 1]) && !(this.isUpperCase(str[i + 1]))))) {
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
    return finalStr
  },
  /**
   * 转换字符串string以空格分开单词，并转换为小写
   * 要转换的字符串
   * 返回以空格分开的小写的字符串
   * 例如('Foo Bar')，返回'foo bar'
   */
  lowerCase: function(str) {
    var newStr = ""
    for (var i = 0; i < str.length; i++) {
      if (this.letter(str[i])) {
        if (!this.letter(str[i - 1]) || (this.isUpperCase(str[i]) && (!this.isUpperCase(str[i - 1]) && !(this.isUpperCase(str[i + 1]))))) {
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
    return finalStr
  },
  /**
   * 转换字符串string为 snake case，也就是单词间以下划线隔开
   * 要转换的字符串
   * 返回以下划线隔开的字符串，且是小写的
   * 例如('Foo Bar')，返回'foo_bar'
   */
  snakeCase: function(str) {
    var newStr = ""
    for (var i = 0; i < str.length; i++) {
      if (this.letter(str[i])) {
        if (!this.letter(str[i - 1]) || (this.isUpperCase(str[i]) && (!this.isUpperCase(str[i - 1]) && !(this.isUpperCase(str[i + 1]))))) {
          newStr += "_" + str[i].toLowerCase()
        } else {
          newStr += str[i].toLowerCase()
        }
      }
    }
    var finalStr = ""
    for (var i = 1; i < newStr.length; i++) {
      finalStr += newStr[i]
    }
    return finalStr
  },
  /**
   * 转换 string 字符串为 start case，也就是单词间以空格隔开，且所有手写字母是大写
   * 要转换的字符串
   * 返回转换的字符串
   * 例如('Foo Bar')，返回'Foo Bar'
   */
  startCase: function(str) {
    var newStr = ""
    for (var i = 0; i < str.length; i++) {
      if (this.letter(str[i])) {
        if (!this.letter(str[i - 1]) || (this.isUpperCase(str[i]) && (!this.isUpperCase(str[i - 1]) && !(this.isUpperCase(str[i + 1]))))) {
          newStr += " " + str[i]
        } else {
          newStr += str[i]
        }
      }
    }
    var finalStr = "" + newStr[1].toUpperCase()
    for (var i = 2; i < newStr.length; i++) {
      if (newStr[i] == " ") {
        finalStr += newStr[i]
        finalStr += newStr[i + 1].toUpperCase()
        i++
      } else {
        finalStr += newStr[i]
      }

    }
    return finalStr
  },
  /**
   * 转换 string字符串的首字母为小写
   * 要转换的字符串
   * 返回转换的字符串
   * 例如('Fred')，返回'fred'
   */
  lowerFirst: function(str) {
    var retStr = str[0].toLowerCase()
    for (var i = 1; i < str.length; i++) {
      retStr += str[i]
    }
    return retStr
  },
  /**
   * 填充字符串，如果字符串长度小于length，则从左侧和右侧一起开始填充字符。
   * 如果左侧和右侧没法平均分配，则截断超出的长度
   * 要转换的字符串；最终的字符串的长度；要填充的字符串，字符串可以只有一个字符，也可以有多个，
   * 如果没有指定填充的字符串，则其为空格
   * 返回转换的字符串
   * 例如('abc', 8)，返回'  abc   '
   */
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
  /**
   * 和上面的相似。填充字符串，如果字符串长度小于length，则从右侧一起开始填充字符。
   * 如果左侧和右侧没法平均分配，则截断超出的长度
   * 要转换的字符串；最终的字符串的长度；要填充的字符串，字符串可以只有一个字符，也可以有多个，
   * 如果没有指定填充的字符串，则其为空格
   * 返回转换的字符串
   * 例如('abc', 6)，返回'abc   '
   */
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
  /**
   * 和上面的相似。填充字符串，如果字符串长度小于length，则从左侧一起开始填充字符。
   * 如果左侧和右侧没法平均分配，则截断超出的长度
   * 要转换的字符串；最终的字符串的长度；要填充的字符串，字符串可以只有一个字符，也可以有多个，
   * 如果没有指定填充的字符串，则其为空格
   * 返回转换的字符串
   * 例如('abc', 6)，返回'   abc'
   */
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
  /**
   * 转换字符串string首字母为大写，剩下为小写
   * 要转换的字符串
   * 返回转换的字符串
   * 例如('FRED')，返回'Fred'
   */
  capitalize: function(str) {
    var retStr = str[0].toUpperCase()
    for (var i = 1; i < str.length; i++) {
      retStr += str[i].toLowerCase()
    }
    return retStr
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
  /**
   * 将给定字符串重复N次
   * @param  str是要重复的字符串
   * @param  要重复的的次数
   * @return 返回重复后的字符串
   * ('*', 3)
   *  => '***'
   */
  repeat: function(str, value) {
    var retStr = ""
    for (var i = 0; i < value; i++) {
      retStr += str
    }
    return retStr
  },
  /**
   * 将字符串中和pattern匹配的字符串改为replacement
   * @param  要替换的字符串
   * @param  匹配的内容
   * @param  替换的内容
   * @return 返回替换后的字符串
   * ('Hi Fred', 'Fred', 'Barney')
   * => 'Hi Barney'
   */
  replace: function(str, patter, replacement) {
    var arr = str.split(" ")
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == patter) {
        arr[i] = replacement
      }
    }
    return arr.join(" ")
  },
  /**
   * 将字符串以某种符号为间隔分开成数组
   * @param  要分隔的字符串
   * @param  分隔的符号
   * @param  数组长度的限制
   * @return 返回分隔后的数组
   * ('a-b-c', '-', 2)
   * => ['a', 'b']
   */
  split: function(str, separator, limit) {
    var arr = []
    for (var i = 0; i < str.length; i++) {
      if (str[i] == separator) {
        arr.push(str[i - 1])
      }
      if (arr.length == limit) {
        break
      }
    }
    return arr
  },
  /**
   * 对象按照a数组中的元素的路径得到属性值
   * 将数组中的元素分离成单独的字符的字符串，并将其中的符号都去掉；遍历最后得到的数组，每次都能得到一个对应的对象的属性值
   * 并将这个属性值重新赋给对象，以此将对象不断降级，知道只剩最后要的属性值
   * @param  obj要迭代的对象
   * @param  arr遍历的路径
   * @return 返回遍历得到的属性值的数组
   */
  at: function(obj, arr) {
    var ret = []
    for (var i = 0; i < arr.length; i++) {
      var separateArr = arr[i].split("")
      var newArr = []
      for (var j = 0; j < separateArr.length; j++) {
        if (separateArr[j] != '[' && separateArr[j] != ']' && separateArr[j] != '.') {
          newArr.push(separateArr[j])
        }
      }
      var newObject = obj
      for (var k = 0; k < newArr.length; k++) { //对象降级
        newObject = newObject[newArr[k]]
      }
      ret.push(newObject)
    }

    return ret
  },
  /**
   * @param  {将要倒置的对象}
   * @return {返回倒置后的对象}
   * ({ 'a': 1, 'b': 2, 'c': 1 })
   * => { '1': 'c', '2': 'b' }
   */
  invert: function(obj) {
    var resultObj = {}
    for (var key in obj) {
      resultObj[obj[key]] = key
    }
    return resultObj
  },
  /**
   * @param  {对象}
   * @return {但会对象的属性名}
   */
  keys: function(obj) {
    var arr = []
    for (var key in obj) {
      arr.push(key)
    }
    return arr
  },
  /**
   * @param  {对象}
   * @return {返回对象的属性值}
   */
  values: function(obj) {
    var arr = []
    for (var key in obj) {
      arr.push(obj[key])
    }
    return arr
  },
  // forIn: function(obj, iteratee) {
  //   for (var key in obj) {
  //     if (!iteratee(obj[key], key, obj)) {
  //       return obj
  //     }
  //   }
  //   return obj
  // },
  /**
   * 创建一个对象，对象的值与object相同，并且其属性是通过函数运行产生的新的属性
   * @param  {要遍历的对象}
   * @param  {每次迭代时调用的函数}
   * @return {返回映射后的新对象}
   */
  mapKeys: function(obj, iteratee) {
    var newObj = {}
    for (var key in obj) {
      newObj[iteratee(obj[key], key, obj)] = obj[key]
    }
    return newObj
  },
  /**
   * 创建一个对象，对象的属性与object相同，并且其属性值是通过函数运行产生的新的属性值
   * @param  {对象}
   * @param  {迭代的函数}
   * @return {返回对象的属性值}
   */
  mapValues: function(obj, iteratee) {
    if (!iteratee) {
      iterateer = function(a) {
        return a
      }
    }
    if (typeof iteratee == 'string') {
      iterateer = function() {
        return obj[key][iteratee]
      }
    }
    var newObj = {}
    for (var key in obj) {
      newObj[key] = iterateer(obj[key], key, obj)
    }
    return newObj
  },
  /**
   * 创建一个从 object 中选中的属性的对象
   * @param  {来源对象}
   * @param  {要被忽略的属性}
   * @return {返回新对象}
   * ({ 'a': 1, 'b': '2', 'c': 3 },['a', 'c'])
   * => { 'a': 1, 'c': 3 }
   */
  pick: function(obj, paths) {
    var newObj = {}
    for (var key in obj) {
      for (var i = 0; i < paths.length; i++) {
        if (key == paths[i]) {
          newObj[key] = obj[key]
        }
      }
    }
    return newObj
  },
  /**
   * 在第二个参数(函数)被调用n次之后，这个函数才能真正执行
   * @param  n函数被调用的次数
   * @param  func定义的函数
   * @return 返回第二个参数(函数)被执行的结果
   * 例如aaa = after(4,console.log),这句话执行之后
   * aaa就是一个函数，且
   * aaa = function (arg) {
   *   counter++
   *   if (counter > n) {
   *      return func(arg)
   *   }
   * }
   *且函数中的n == 4，func == console.log()
   *接下来调用aaa(888888)，那么在aaa这个函数执行四次之后，就可以执行到return func(arg)这句话了
   *这句话返回888888,(前提是给aaa的参数还是888888)，之后每次调用aaa都可以执行了，参数是可以改变的
   */
  after: function(n, func) {
    var counter = 0
    return function(arg) {
      counter++
      if (counter > n) {
        return func(arg)
      }

    }
  },
  /**
   * 和after类似，在函数调用n次之前，每次返回函数值，
   * n次之后再调用的话就返回第n次调用的返回的结果
   * @param  {[type]} n    [description]
   * @param  {[type]} func [description]
   * @return {[type]}      [description]
   */
  before: function(n, func) {
    var counter = 0
    var lastValue
    return function(arg) {
      counter++
      if (counter <= n) {
        lastValue = func(arg)
        return lastValue
      } else {
        return lastValue
      }
    }
  },
  /**
   * 比较两个对象时否相等
   * @param  对象a 
   * @param  对象b 
   * @return true or false
   */
  isEqual: function(a, b) {
    if (typeof a != typeof b) {
      return false
    }
    if (a != a && b != b) {
      return true
    }
    if (a === b) {
      return true
    }
    if (a !== b && typeof a === 'number' && typeof b === 'number') {
      return false
    }
    var arr = []
    for (var key in a) {
      arr.push(key)
    }
    for (var key in b) {
      if (arr.indexOf(key) < 0) {
        arr.push(key)
      }
    }
    for (key of arr) {
      if (!WuFang.isEqual(a[key], b[key])) {
        return false
      }
    }
    return true
  },
  /**
   * 比较source中每个值和compare中对应的值是否相等
   * @param   source 
   * @return  被比较的对象
   */
  matches: function(source) {
    var self = this
    return function(compare) {
      for (var key in source) {
        if (!self.isEqual(source[key], compare[key])) {
          return false
        }
      }
      return true
    }
  },
  /**
   * 检测给定路径在对象中的值是否和srcValue相等
   * @param  给定的路径
   * @param  比较的值
   * @return Boolean
   */
  matchesProperty: function(path, srcValue) {
    return function(obj) {
      if (obj[path] == srcValue) {
        return true
      }
      return false
    }
  },
  property: function(path) {
    return function(obj) {
      var ret = []
      var arr = path.split('.')
      for (var j = 0; j < obj.length; j++) {
        for (var i = 0; i < arr.length; i++) {
          obj[j] = obj[j][arr[i]]
        }
        ret.push(obj[j])
      }
      return ret
    }
  },

}
// var objects = [{
//   'x': 1,
//   'y': 2
// }, {
//   'x': 2,
//   'y': 1
// }];
// console.log(WuFang.differenceWith(objects, [{
//   'x': 1,
//   'y': 2
// }], WuFang.isEqual))
