/**
 * 这个是干嘛的
 * 参数是干嘛的
 * 返回什么
 * 例子
 * 尽量，或者说，如非刻意，不要更改函数的实际传入的参数值
 */
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
    for (var i = 1; i < arguments.length; i++) {
      if ((typeof arguments[i]) === "number") {
        arguments[0].push(arguments[i])
      } else {
        for (var j = 0; j < arguments[i].length; j++) {
          arguments[0].push(arguments[i][j])
        }
      }
    }
    return arguments[0]
  },
  difference: function() {
    var compare = []
    for (var i = 1; i < arguments.length; i++) {
      for (var j = 0; j < arguments[i].length; j++) {
        compare.push(arguments[i][j])
      }
    }
    for (var k = 0; k < arguments[0].length; k++) {
      for (var l = 0; l < compare.length; l++) {
        if (arguments[0][k] == compare[l]) {
          arguments[0].shift()
        }
      }
    }
    return arguments[0]
  },
}
console.log(WuFang.difference([2, 1, 9, 8, 7], [2, 3], [1, 4, 5]))
