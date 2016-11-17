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
      arr.pop([arr.length - 1 - i])
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
   * 取出各数组中全等的元素
   * 参数就是需要检查的数组，个数不定
   * 返回的是全等的元素的数组
   * 例如([1, 2], [4, 2], [2, 1])返回[2]
   */
  // intersection: function() {
  //   var counter = 0
  //   var ret = []
  //   for (var i = 0; i < arguments[0].length; i++) {
  //     for (var j = 0; j < arguments[1].length; j++) {
  //       if (arguments[0][i] == arguments[1][j]) {
  //         ret.push(arguments[0][i])
  //       }
  //     }
  //   }
  //   for (var k = 0; k < arr.length; k++) {

  //   }
  //   return ret
  // },
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
  pullAt: function(arr) {
    var comp = []
    var result = []
    for (var i = 1; i < arguments.length; i++) {
      for (var j = 0; j < arguments[i].length; j++) {
        comp.push(arguments[i][j])
      }
    }

    for (var k = 0; k < arr.length; k++) {
      for (var l = 0; l < comp.length; l++) {
        if (k == comp[l]) {
          result.push(arr[k])
          break
        }
      }
    }
    for (var k = 0; k < arr.length; k++) {
      for (var l = 0; l < comp.length; l++) {
        if (k == comp[l]) {
          arr.splice(k, 1)
          break
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
  unzip: function() {
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

}


// console.log(WuFang.intersection([1, 2], [4, 2], [2, 1]))
// var array = ['a', 'b', 'c', 'd'];
// console.log(WuFang.pullAt(array, [0, 3]))
// console.log(WuFang.())
console.log(WuFang.unzip(['a', 'b'], [1, 2], [true, false]))
