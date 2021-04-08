(function () {
  'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var boxFrustum = function (m, box) {
    var in_p = 0;

    for (var i = 0; i < 2; ++i) {
      var qx = box[i][0];

      for (var j = 0; j < 2; ++j) {
        var qy = box[j][1];

        for (var k = 0; k < 2; ++k) {
          var qz = box[k][2];
          var w = qx * m[3] + qy * m[7] + qz * m[11] + m[15];
          var x = qx * m[0] + qy * m[4] + qz * m[8] + m[12];
          if (x <= w) in_p |= 1;
          if (x >= -w) in_p |= 2;

          if (in_p === 63) {
            return true;
          }

          x = qx * m[1] + qy * m[5] + qz * m[9] + m[13];
          if (x <= w) in_p |= 4;
          if (x >= -w) in_p |= 8;

          if (in_p === 63) {
            return true;
          }

          x = qx * m[2] + qy * m[6] + qz * m[10] + m[14];
          if (x <= w) in_p |= 16;
          if (x >= 0) in_p |= 32;

          if (in_p === 63) {
            return true;
          }
        }
      }
    }

    return false;
  };

  const blocks = [{
    name: "air",
    culls: 0
  }, {
    name: "stone",
    color: [0.3, 0.32, 0.29],
    atlas: [1, 1, 1, 1, 1, 1],
    culls: 3
  }, {
    name: "grass",
    color: [0.376, 0.501, 0.219],
    atlas: [3, 3, 3, 3, 0, 2],
    culls: 3
  }, {
    name: "log",
    color: [0.509, 0.321, 0.003],
    atlas: [116, 116, 116, 116, 21, 21],
    culls: 3
  }, {
    name: "leaf",
    color: [0.376, 0.501, 0.219],
    atlas: [52, 52, 52, 52, 52, 52],
    culls: 2,
    density: 1,
    type: 0
  }, {
    name: "snow",
    color: [0.376, 0.501, 0.219],
    atlas: [64, 64, 64, 64, 64, 64],
    culls: 3
  }, {
    name: "dirt",
    color: [0.509, 0.321, 0.003],
    atlas: [2, 2, 2, 2, 2, 2],
    culls: 3
  }, {
    name: "plant",
    atlas: 28,
    culls: 2,
    density: 0,
    type: 1
  }, {
    name: "tuft",
    atlas: 39,
    culls: 2,
    density: 0,
    type: 1
  }, {
    name: "water",
    atlas: [222, 222, 222, 222, 222, 222],
    culls: 1
  }, {
    name: "sand",
    atlas: [48, 48, 48, 48, 48, 48],
    culls: 3
  }, {
    name: "sandstone",
    atlas: [142, 142, 142, 142, 142, 142],
    culls: 3
  }, {
    name: "marsh",
    atlas: [78, 78, 78, 78, 78, 78],
    culls: 3
  }, {
    name: "twig",
    atlas: 55,
    culls: 2,
    density: 0,
    type: 1
  }];
  const faceAttrs = {
    0: {
      mirror: true
    },
    1: {
      mirror: true
    },
    2: {
      mirror: true
    },
    3: {},
    21: {
      mirror: true
    },
    28: {},
    39: {},
    48: {},
    52: {
      mirror: true
    },
    64: {
      mirror: true
    },
    78: {
      mirror: true
    },
    116: {},
    142: {
      mirror: true
    },
    222: {}
  };

  /**
   * Common utilities
   * @module glMatrix
   */
  // Configuration Constants
  var EPSILON = 0.000001;
  var ARRAY_TYPE = typeof Float32Array !== 'undefined' ? Float32Array : Array;
  if (!Math.hypot) Math.hypot = function () {
    var y = 0,
        i = arguments.length;

    while (i--) {
      y += arguments[i] * arguments[i];
    }

    return Math.sqrt(y);
  };

  /**
   * 3x3 Matrix
   * @module mat3
   */

  /**
   * Creates a new identity mat3
   *
   * @returns {mat3} a new 3x3 matrix
   */

  function create() {
    var out = new ARRAY_TYPE(9);

    if (ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[5] = 0;
      out[6] = 0;
      out[7] = 0;
    }

    out[0] = 1;
    out[4] = 1;
    out[8] = 1;
    return out;
  }

  /**
   * 4x4 Matrix<br>Format: column-major, when typed out it looks like row-major<br>The matrices are being post multiplied.
   * @module mat4
   */

  /**
   * Creates a new identity mat4
   *
   * @returns {mat4} a new 4x4 matrix
   */

  function create$1() {
    var out = new ARRAY_TYPE(16);

    if (ARRAY_TYPE != Float32Array) {
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
      out[4] = 0;
      out[6] = 0;
      out[7] = 0;
      out[8] = 0;
      out[9] = 0;
      out[11] = 0;
      out[12] = 0;
      out[13] = 0;
      out[14] = 0;
    }

    out[0] = 1;
    out[5] = 1;
    out[10] = 1;
    out[15] = 1;
    return out;
  }
  /**
   * Creates a new mat4 initialized with values from an existing matrix
   *
   * @param {mat4} a matrix to clone
   * @returns {mat4} a new 4x4 matrix
   */

  function clone(a) {
    var out = new ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  /**
   * Copy the values from one mat4 to another
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the source matrix
   * @returns {mat4} out
   */

  function copy(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
  }
  /**
   * Set a mat4 to the identity matrix
   *
   * @param {mat4} out the receiving matrix
   * @returns {mat4} out
   */

  function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
  }
  /**
   * Multiplies two mat4s
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the first operand
   * @param {mat4} b the second operand
   * @returns {mat4} out
   */

  function multiply(out, a, b) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    var a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    var a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15]; // Cache only the current line of the second matrix

    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
  }
  /**
   * Translate a mat4 by the given vector
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to translate
   * @param {vec3} v vector to translate by
   * @returns {mat4} out
   */

  function translate(out, a, v) {
    var x = v[0],
        y = v[1],
        z = v[2];
    var a00, a01, a02, a03;
    var a10, a11, a12, a13;
    var a20, a21, a22, a23;

    if (a === out) {
      out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
      out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
      out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
      out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
      a00 = a[0];
      a01 = a[1];
      a02 = a[2];
      a03 = a[3];
      a10 = a[4];
      a11 = a[5];
      a12 = a[6];
      a13 = a[7];
      a20 = a[8];
      a21 = a[9];
      a22 = a[10];
      a23 = a[11];
      out[0] = a00;
      out[1] = a01;
      out[2] = a02;
      out[3] = a03;
      out[4] = a10;
      out[5] = a11;
      out[6] = a12;
      out[7] = a13;
      out[8] = a20;
      out[9] = a21;
      out[10] = a22;
      out[11] = a23;
      out[12] = a00 * x + a10 * y + a20 * z + a[12];
      out[13] = a01 * x + a11 * y + a21 * z + a[13];
      out[14] = a02 * x + a12 * y + a22 * z + a[14];
      out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
  }
  /**
   * Generates a perspective projection matrix with the given bounds.
   * Passing null/undefined/no value for far will generate infinite projection matrix.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {number} fovy Vertical field of view in radians
   * @param {number} aspect Aspect ratio. typically viewport width/height
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum, can be null or Infinity
   * @returns {mat4} out
   */

  function perspective(out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf;
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[15] = 0;

    if (far != null && far !== Infinity) {
      nf = 1 / (near - far);
      out[10] = (far + near) * nf;
      out[14] = 2 * far * near * nf;
    } else {
      out[10] = -1;
      out[14] = -2 * near;
    }

    return out;
  }
  /**
   * Generates a look-at matrix with the given eye position, focal point, and up axis.
   * If you want a matrix that actually makes an object look at another object, you should use targetTo instead.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {vec3} eye Position of the viewer
   * @param {vec3} center Point the viewer is looking at
   * @param {vec3} up vec3 pointing up
   * @returns {mat4} out
   */

  function lookAt(out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
    var eyex = eye[0];
    var eyey = eye[1];
    var eyez = eye[2];
    var upx = up[0];
    var upy = up[1];
    var upz = up[2];
    var centerx = center[0];
    var centery = center[1];
    var centerz = center[2];

    if (Math.abs(eyex - centerx) < EPSILON && Math.abs(eyey - centery) < EPSILON && Math.abs(eyez - centerz) < EPSILON) {
      return identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;
    len = 1 / Math.hypot(z0, z1, z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;
    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.hypot(x0, x1, x2);

    if (!len) {
      x0 = 0;
      x1 = 0;
      x2 = 0;
    } else {
      len = 1 / len;
      x0 *= len;
      x1 *= len;
      x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;
    len = Math.hypot(y0, y1, y2);

    if (!len) {
      y0 = 0;
      y1 = 0;
      y2 = 0;
    } else {
      len = 1 / len;
      y0 *= len;
      y1 *= len;
      y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;
    return out;
  }

  /**
   * 3 Dimensional Vector
   * @module vec3
   */

  /**
   * Creates a new, empty vec3
   *
   * @returns {vec3} a new 3D vector
   */

  function create$2() {
    var out = new ARRAY_TYPE(3);

    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    }

    return out;
  }
  /**
   * Creates a new vec3 initialized with values from an existing vector
   *
   * @param {vec3} a vector to clone
   * @returns {vec3} a new 3D vector
   */

  function clone$1(a) {
    var out = new ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
  }
  /**
   * Calculates the length of a vec3
   *
   * @param {vec3} a vector to calculate length of
   * @returns {Number} length of a
   */

  function length(a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    return Math.hypot(x, y, z);
  }
  /**
   * Creates a new vec3 initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @returns {vec3} a new 3D vector
   */

  function fromValues(x, y, z) {
    var out = new ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }
  /**
   * Copy the values from one vec3 to another
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the source vector
   * @returns {vec3} out
   */

  function copy$1(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
  }
  /**
   * Set the components of a vec3 to the given values
   *
   * @param {vec3} out the receiving vector
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @returns {vec3} out
   */

  function set(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
  }
  /**
   * Adds two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */

  function add(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
  }
  /**
   * Normalize a vec3
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a vector to normalize
   * @returns {vec3} out
   */

  function normalize(out, a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var len = x * x + y * y + z * z;

    if (len > 0) {
      //TODO: evaluate use of glm_invsqrt here?
      len = 1 / Math.sqrt(len);
    }

    out[0] = a[0] * len;
    out[1] = a[1] * len;
    out[2] = a[2] * len;
    return out;
  }
  /**
   * Calculates the dot product of two vec3's
   *
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {Number} dot product of a and b
   */

  function dot(a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  }
  /**
   * Computes the cross product of two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */

  function cross(out, a, b) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    var bx = b[0],
        by = b[1],
        bz = b[2];
    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
  }
  /**
   * Performs a linear interpolation between two vec3's
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {vec3} out
   */

  function lerp(out, a, b, t) {
    var ax = a[0];
    var ay = a[1];
    var az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
  }
  /**
   * Transforms the vec3 with a quat
   * Can also be used for dual quaternions. (Multiply it with the real part)
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the vector to transform
   * @param {quat} q quaternion to transform with
   * @returns {vec3} out
   */

  function transformQuat(out, a, q) {
    // benchmarks: https://jsperf.com/quaternion-transform-vec3-implementations-fixed
    var qx = q[0],
        qy = q[1],
        qz = q[2],
        qw = q[3];
    var x = a[0],
        y = a[1],
        z = a[2]; // var qvec = [qx, qy, qz];
    // var uv = vec3.cross([], qvec, a);

    var uvx = qy * z - qz * y,
        uvy = qz * x - qx * z,
        uvz = qx * y - qy * x; // var uuv = vec3.cross([], qvec, uv);

    var uuvx = qy * uvz - qz * uvy,
        uuvy = qz * uvx - qx * uvz,
        uuvz = qx * uvy - qy * uvx; // vec3.scale(uv, uv, 2 * w);

    var w2 = qw * 2;
    uvx *= w2;
    uvy *= w2;
    uvz *= w2; // vec3.scale(uuv, uuv, 2);

    uuvx *= 2;
    uuvy *= 2;
    uuvz *= 2; // return vec3.add(out, a, vec3.add(out, uv, uuv));

    out[0] = x + uvx + uuvx;
    out[1] = y + uvy + uuvy;
    out[2] = z + uvz + uuvz;
    return out;
  }
  /**
   * Alias for {@link vec3.length}
   * @function
   */

  var len = length;
  /**
   * Perform some operation over an array of vec3s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */

  var forEach = function () {
    var vec = create$2();
    return function (a, stride, offset, count, fn, arg) {
      var i, l;

      if (!stride) {
        stride = 3;
      }

      if (!offset) {
        offset = 0;
      }

      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }

      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        vec[2] = a[i + 2];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
        a[i + 2] = vec[2];
      }

      return a;
    };
  }();

  /**
   * 4 Dimensional Vector
   * @module vec4
   */

  /**
   * Creates a new, empty vec4
   *
   * @returns {vec4} a new 4D vector
   */

  function create$3() {
    var out = new ARRAY_TYPE(4);

    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
      out[3] = 0;
    }

    return out;
  }
  /**
   * Normalize a vec4
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a vector to normalize
   * @returns {vec4} out
   */

  function normalize$1(out, a) {
    var x = a[0];
    var y = a[1];
    var z = a[2];
    var w = a[3];
    var len = x * x + y * y + z * z + w * w;

    if (len > 0) {
      len = 1 / Math.sqrt(len);
    }

    out[0] = x * len;
    out[1] = y * len;
    out[2] = z * len;
    out[3] = w * len;
    return out;
  }
  /**
   * Performs a linear interpolation between two vec4's
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the first operand
   * @param {vec4} b the second operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {vec4} out
   */

  function lerp$1(out, a, b, t) {
    var ax = a[0];
    var ay = a[1];
    var az = a[2];
    var aw = a[3];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    out[3] = aw + t * (b[3] - aw);
    return out;
  }
  /**
   * Perform some operation over an array of vec4s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec4. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec4s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */

  var forEach$1 = function () {
    var vec = create$3();
    return function (a, stride, offset, count, fn, arg) {
      var i, l;

      if (!stride) {
        stride = 4;
      }

      if (!offset) {
        offset = 0;
      }

      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }

      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        vec[2] = a[i + 2];
        vec[3] = a[i + 3];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
        a[i + 2] = vec[2];
        a[i + 3] = vec[3];
      }

      return a;
    };
  }();

  /**
   * Quaternion
   * @module quat
   */

  /**
   * Creates a new identity quat
   *
   * @returns {quat} a new quaternion
   */

  function create$4() {
    var out = new ARRAY_TYPE(4);

    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
      out[2] = 0;
    }

    out[3] = 1;
    return out;
  }
  /**
   * Sets a quat from the given angle and rotation axis,
   * then returns it.
   *
   * @param {quat} out the receiving quaternion
   * @param {vec3} axis the axis around which to rotate
   * @param {Number} rad the angle in radians
   * @returns {quat} out
   **/

  function setAxisAngle(out, axis, rad) {
    rad = rad * 0.5;
    var s = Math.sin(rad);
    out[0] = s * axis[0];
    out[1] = s * axis[1];
    out[2] = s * axis[2];
    out[3] = Math.cos(rad);
    return out;
  }
  /**
   * Performs a spherical linear interpolation between two quat
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a the first operand
   * @param {quat} b the second operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {quat} out
   */

  function slerp(out, a, b, t) {
    // benchmarks:
    //    http://jsperf.com/quaternion-slerp-implementations
    var ax = a[0],
        ay = a[1],
        az = a[2],
        aw = a[3];
    var bx = b[0],
        by = b[1],
        bz = b[2],
        bw = b[3];
    var omega, cosom, sinom, scale0, scale1; // calc cosine

    cosom = ax * bx + ay * by + az * bz + aw * bw; // adjust signs (if necessary)

    if (cosom < 0.0) {
      cosom = -cosom;
      bx = -bx;
      by = -by;
      bz = -bz;
      bw = -bw;
    } // calculate coefficients


    if (1.0 - cosom > EPSILON) {
      // standard case (slerp)
      omega = Math.acos(cosom);
      sinom = Math.sin(omega);
      scale0 = Math.sin((1.0 - t) * omega) / sinom;
      scale1 = Math.sin(t * omega) / sinom;
    } else {
      // "from" and "to" quaternions are very close
      //  ... so we can do a linear interpolation
      scale0 = 1.0 - t;
      scale1 = t;
    } // calculate final values


    out[0] = scale0 * ax + scale1 * bx;
    out[1] = scale0 * ay + scale1 * by;
    out[2] = scale0 * az + scale1 * bz;
    out[3] = scale0 * aw + scale1 * bw;
    return out;
  }
  /**
   * Creates a quaternion from the given 3x3 rotation matrix.
   *
   * NOTE: The resultant quaternion is not normalized, so you should be sure
   * to renormalize the quaternion yourself where necessary.
   *
   * @param {quat} out the receiving quaternion
   * @param {mat3} m rotation matrix
   * @returns {quat} out
   * @function
   */

  function fromMat3(out, m) {
    // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
    // article "Quaternion Calculus and Fast Animation".
    var fTrace = m[0] + m[4] + m[8];
    var fRoot;

    if (fTrace > 0.0) {
      // |w| > 1/2, may as well choose w > 1/2
      fRoot = Math.sqrt(fTrace + 1.0); // 2w

      out[3] = 0.5 * fRoot;
      fRoot = 0.5 / fRoot; // 1/(4w)

      out[0] = (m[5] - m[7]) * fRoot;
      out[1] = (m[6] - m[2]) * fRoot;
      out[2] = (m[1] - m[3]) * fRoot;
    } else {
      // |w| <= 1/2
      var i = 0;
      if (m[4] > m[0]) i = 1;
      if (m[8] > m[i * 3 + i]) i = 2;
      var j = (i + 1) % 3;
      var k = (i + 2) % 3;
      fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
      out[i] = 0.5 * fRoot;
      fRoot = 0.5 / fRoot;
      out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
      out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
      out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
    }

    return out;
  }
  /**
   * Creates a quaternion from the given euler angle x, y, z.
   *
   * @param {quat} out the receiving quaternion
   * @param {x} Angle to rotate around X axis in degrees.
   * @param {y} Angle to rotate around Y axis in degrees.
   * @param {z} Angle to rotate around Z axis in degrees.
   * @returns {quat} out
   * @function
   */

  function fromEuler(out, x, y, z) {
    var halfToRad = 0.5 * Math.PI / 180.0;
    x *= halfToRad;
    y *= halfToRad;
    z *= halfToRad;
    var sx = Math.sin(x);
    var cx = Math.cos(x);
    var sy = Math.sin(y);
    var cy = Math.cos(y);
    var sz = Math.sin(z);
    var cz = Math.cos(z);
    out[0] = sx * cy * cz - cx * sy * sz;
    out[1] = cx * sy * cz + sx * cy * sz;
    out[2] = cx * cy * sz - sx * sy * cz;
    out[3] = cx * cy * cz + sx * sy * sz;
    return out;
  }
  /**
   * Performs a linear interpolation between two quat's
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a the first operand
   * @param {quat} b the second operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {quat} out
   * @function
   */

  var lerp$2 = lerp$1;
  /**
   * Normalize a quat
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a quaternion to normalize
   * @returns {quat} out
   * @function
   */

  var normalize$2 = normalize$1;
  /**
   * Sets a quaternion to represent the shortest rotation from one
   * vector to another.
   *
   * Both vectors are assumed to be unit length.
   *
   * @param {quat} out the receiving quaternion.
   * @param {vec3} a the initial vector
   * @param {vec3} b the destination vector
   * @returns {quat} out
   */

  var rotationTo = function () {
    var tmpvec3 = create$2();
    var xUnitVec3 = fromValues(1, 0, 0);
    var yUnitVec3 = fromValues(0, 1, 0);
    return function (out, a, b) {
      var dot$1 = dot(a, b);

      if (dot$1 < -0.999999) {
        cross(tmpvec3, xUnitVec3, a);
        if (len(tmpvec3) < 0.000001) cross(tmpvec3, yUnitVec3, a);
        normalize(tmpvec3, tmpvec3);
        setAxisAngle(out, tmpvec3, Math.PI);
        return out;
      } else if (dot$1 > 0.999999) {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        return out;
      } else {
        cross(tmpvec3, a, b);
        out[0] = tmpvec3[0];
        out[1] = tmpvec3[1];
        out[2] = tmpvec3[2];
        out[3] = 1 + dot$1;
        return normalize$2(out, out);
      }
    };
  }();
  /**
   * Performs a spherical linear interpolation with two control points
   *
   * @param {quat} out the receiving quaternion
   * @param {quat} a the first operand
   * @param {quat} b the second operand
   * @param {quat} c the third operand
   * @param {quat} d the fourth operand
   * @param {Number} t interpolation amount, in the range [0-1], between the two inputs
   * @returns {quat} out
   */

  var sqlerp = function () {
    var temp1 = create$4();
    var temp2 = create$4();
    return function (out, a, b, c, d, t) {
      slerp(temp1, a, d, t);
      slerp(temp2, b, c, t);
      slerp(out, temp1, temp2, 2 * t * (1 - t));
      return out;
    };
  }();
  /**
   * Sets the specified quaternion with values corresponding to the given
   * axes. Each axis is a vec3 and is expected to be unit length and
   * perpendicular to all other specified axes.
   *
   * @param {vec3} view  the vector representing the viewing direction
   * @param {vec3} right the vector representing the local "right" direction
   * @param {vec3} up    the vector representing the local "up" direction
   * @returns {quat} out
   */

  var setAxes = function () {
    var matr = create();
    return function (out, view, right, up) {
      matr[0] = right[0];
      matr[3] = right[1];
      matr[6] = right[2];
      matr[1] = up[0];
      matr[4] = up[1];
      matr[7] = up[2];
      matr[2] = -view[0];
      matr[5] = -view[1];
      matr[8] = -view[2];
      return normalize$2(out, fromMat3(out, matr));
    };
  }();

  /**
   * 2 Dimensional Vector
   * @module vec2
   */

  /**
   * Creates a new, empty vec2
   *
   * @returns {vec2} a new 2D vector
   */

  function create$5() {
    var out = new ARRAY_TYPE(2);

    if (ARRAY_TYPE != Float32Array) {
      out[0] = 0;
      out[1] = 0;
    }

    return out;
  }
  /**
   * Creates a new vec2 initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @returns {vec2} a new 2D vector
   */

  function fromValues$1(x, y) {
    var out = new ARRAY_TYPE(2);
    out[0] = x;
    out[1] = y;
    return out;
  }
  /**
   * Calculates the euclidian distance between two vec2's
   *
   * @param {vec2} a the first operand
   * @param {vec2} b the second operand
   * @returns {Number} distance between a and b
   */

  function distance(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.hypot(x, y);
  }
  /**
   * Rotate a 2D vector
   * @param {vec2} out The receiving vec2
   * @param {vec2} a The vec2 point to rotate
   * @param {vec2} b The origin of the rotation
   * @param {Number} c The angle of rotation
   * @returns {vec2} out
   */

  function rotate(out, a, b, c) {
    //Translate point to the origin
    var p0 = a[0] - b[0],
        p1 = a[1] - b[1],
        sinC = Math.sin(c),
        cosC = Math.cos(c); //perform rotation and translate to correct position

    out[0] = p0 * cosC - p1 * sinC + b[0];
    out[1] = p0 * sinC + p1 * cosC + b[1];
    return out;
  }
  /**
   * Alias for {@link vec2.distance}
   * @function
   */

  var dist = distance;
  /**
   * Perform some operation over an array of vec2s.
   *
   * @param {Array} a the array of vectors to iterate over
   * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
   * @param {Number} offset Number of elements to skip at the beginning of the array
   * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
   * @param {Function} fn Function to call for each vector in the array
   * @param {Object} [arg] additional argument to pass to fn
   * @returns {Array} a
   * @function
   */

  var forEach$2 = function () {
    var vec = create$5();
    return function (a, stride, offset, count, fn, arg) {
      var i, l;

      if (!stride) {
        stride = 2;
      }

      if (!offset) {
        offset = 0;
      }

      if (count) {
        l = Math.min(count * stride + offset, a.length);
      } else {
        l = a.length;
      }

      for (i = offset; i < l; i += stride) {
        vec[0] = a[i];
        vec[1] = a[i + 1];
        fn(vec, vec, arg);
        a[i] = vec[0];
        a[i + 1] = vec[1];
      }

      return a;
    };
  }();

  // It also provides static methods/values concerning chunks

  class Chunk {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.id = Chunk.getScudzik(x, y);
    } // at provides low-level query for a specific value


    at(x, y, z) {
      return this.map[z + Chunk.depth * (y + Chunk.width * x)];
    } // set provides low-level writing to the voxel data


    set(x, y, z, block) {
      this.map[z + Chunk.depth * (y + Chunk.width * x)] = block;
    } // voxelData is an expensive but easy to use query operation


    voxelData(x, y, z) {
      var voxelType = this.at(x, y, z);
      return {
        x: x + Chunk.width * this.x,
        y: y + Chunk.height * this.y,
        z: z,
        x2: x + 1 + Chunk.width * this.x,
        y2: y + 1 + Chunk.height * this.y,
        z2: z + 1,
        type: voxelType,
        data: blocks[voxelType],
        light: this.lights[z + Chunk.depth * (y + Chunk.width * x)],
        chunk: this
      };
    }

    insideFrustum(frustum) {
      var bbox = [[this.x * Chunk.width, this.y * Chunk.height, 100], [this.x * Chunk.width + Chunk.width, this.y * Chunk.height + Chunk.height, 200]];
      return boxFrustum(frustum, bbox);
    } // getScudzik maps 2 integers to uints (generating a chunk ID from chunk X,Y)


    static getScudzik(a, b) {
      var A = a >= 0 ? 2 * a : -2 * a - 1;
      var B = b >= 0 ? 2 * b : -2 * b - 1;
      return A >= B ? A * A + A + B : A + B * B;
    } // index3d determines the index of a 3d coord in a 1d array


    static index3d(x, y, z) {
      return z + Chunk.depth * (y + Chunk.width * x);
    }

    static index2d(x, y) {
      return x + Chunk.height * y;
    }

  } // PaddedChunk is a low-level container for raw chunk data with a shell
  // All queries are offset automatically, so x=-1 would query at x=0 in the maps

  _defineProperty(Chunk, "width", 16);

  _defineProperty(Chunk, "height", 16);

  _defineProperty(Chunk, "depth", 256);

  class PaddedChunk {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    } // at provides low-level query for a specific value


    at(x, y, z) {
      return this.map[z + 1 + PaddedChunk.depth * (y + 1 + PaddedChunk.width * (x + 1))];
    } // at provides low-level query for a specific value


    light(x, y, z) {
      return this.lights[z + 1 + PaddedChunk.depth * (y + 1 + PaddedChunk.width * (x + 1))];
    }

    static index3d(x, y, z) {
      return z + 1 + PaddedChunk.depth * (y + 1 + PaddedChunk.width * (x + 1));
    }

    static index2d(x, y) {
      return x + 1 + PaddedChunk.height * (y + 1);
    }

  } // InfiniteChunkMap wraps the complexity of infinite voxel pages
  // all methods are in global space

  _defineProperty(PaddedChunk, "width", 18);

  _defineProperty(PaddedChunk, "height", 18);

  _defineProperty(PaddedChunk, "depth", 258);

  class InfiniteChunkMap {
    constructor() {
      this.chunks = new Map();
    }

    getChunk(i, j) {
      var id = Chunk.getScudzik(i, j);
      var chunk = this.chunks.get(id);

      if (!chunk) {
        chunk = new Chunk(i, j);
        this.chunks.set(id, chunk);
      }

      return chunk;
    }

    locate(x, y, z) {
      var xChunk = Math.floor(x / Chunk.width);
      var yChunk = Math.floor(y / Chunk.height);
      var chunk = this.getChunk(xChunk, yChunk);
      return {
        chunk: chunk,
        x: x - xChunk * Chunk.width,
        y: y - yChunk * Chunk.height,
        z: z
      };
    }

    at(x, y, z) {
      if (z < 0 || z >= Chunk.depth) return 0;
      var target = this.locate(x, y, z);
      if (!target.chunk.map) return 0;
      return target.chunk.at(target.x, target.y, target.z);
    }

    height(x, y) {
      var target = this.locate(x, y);
      if (!target.chunk.heights) return 0;
      return target.chunk.heights[Chunk.index2d(target.x, target.y)];
    }

    light(x, y, z) {
      if (z < 0) return 0;
      if (z >= Chunk.depth) return 15;
      var target = this.locate(x, y, z);
      if (!target.chunk.lights) return 0;
      return target.chunk.lights[target.z + Chunk.depth * (target.y + Chunk.width * target.x)];
    }

    set(x, y, z, block) {
      var target = this.locate(x, y, z);
      target.chunk.set(target.x, target.y, target.z, block);
      var currHeight = target.chunk.heights[Chunk.index2d(target.x, target.y)];

      if (block == 0) {
        if (currHeight == z) {
          while (target.chunk.at(x, y, z) == 0 && z > 0) {
            z--;
          }

          target.chunk.heights[Chunk.index2d(target.x, target.y)] = z;
        }

        return;
      }

      if (z > currHeight) {
        target.chunk.heights[Chunk.index2d(target.x, target.y)] = z;
      }
    }

    query(x, y, z, x2, y2, z2) {
      var found = [];

      for (var i = Math.floor(x); i <= Math.ceil(x2); i++) {
        for (var j = Math.floor(y); j <= Math.ceil(y2); j++) {
          for (var k = Math.floor(z); k <= Math.ceil(z2); k++) {
            var target = this.locate(i, j, k);
            if (!target.chunk.map) continue;
            found.push(target.chunk.voxelData(target.x, target.y, target.z));
          }
        }
      }

      return found;
    }

    setIf(x, y, z, block) {
      if (this.at(x, y, z) != 0) {
        return false;
      }

      this.set(x, y, z, block);
      return true;
    }

    biomes() {
      var biomes = {};

      for (let {
        biome
      } of this.chunks.values()) {
        if (biome) biomes[biome] = biomes[biome] ? biomes[biome] + 1 : 1;
      }

      return biomes;
    }

    nearest(count, pt) {
      var neighbors = [];
      var [x, y] = pt;
      var {
        chunk
      } = this.locate(x, y, 0);
      this.neighbors(chunk, 9, function (chunk) {
        neighbors.push(chunk);
        chunk.dist = dist(pt, chunk.center);
      });
      neighbors.sort(function (a, b) {
        return b.dist - a.dist;
      });
      return neighbors.slice(0, count);
    }

    neighbors(chunk, n, f) {
      if (n == 8) {
        for (var i = chunk.x - 1; i <= chunk.x + 1; i++) for (var j = chunk.y - 1; j <= chunk.y + 1; j++) {
          if (i == chunk.x && j == chunk.y) continue;
          f(this.getChunk(i, j));
        }
      }

      if (n == 9) {
        for (var i = chunk.x - 1; i <= chunk.x + 1; i++) for (var j = chunk.y - 1; j <= chunk.y + 1; j++) {
          f(this.getChunk(i, j));
        }
      }
    }

    spiral(_x, _y, diam) {
      var list = [];
      var x = 0,
          y = 0,
          delta = [0, -1];

      for (var iter = diam * diam; iter > 0; iter--) {
        if (-diam / 2 < x && x <= diam / 2 && -diam / 2 < y && y <= diam / 2) list.push(this.getChunk(_x + x, _y + y));
        if (x === y || x < 0 && x === -y || x > 0 && x === 1 - y) delta = [-delta[1], delta[0]];
        x += delta[0];
        y += delta[1];
      }

      return list;
    }

    padded(chunk) {
      var pc = new PaddedChunk(chunk.x, chunk.y);
      pc.map = new Uint8Array(PaddedChunk.width * PaddedChunk.height * PaddedChunk.depth);
      pc.lights = new Uint8Array(PaddedChunk.width * PaddedChunk.height * PaddedChunk.depth);
      pc.heights = new Uint8Array(PaddedChunk.width * PaddedChunk.height);
      var cx = chunk.x * Chunk.width,
          cy = chunk.y * Chunk.height;

      for (var i = -1; i < Chunk.width + 1; i++) for (var j = -1; j < Chunk.height + 1; j++) for (var k = -1; k < Chunk.depth + 1; k++) {
        var block, light, height;

        if (i >= 0 && i < Chunk.width && j >= 0 && j < Chunk.height && k >= 0 && k <= Chunk.depth) {
          var srcID = Chunk.index3d(i, j, k);
          var block = chunk.map[srcID];
          var light = chunk.lights[srcID];
          var height = chunk.heights[Chunk.index2d(i, j)];
          var dstID = PaddedChunk.index3d(i, j, k);
          k += Chunk.depth;
          pc.map.set(chunk.map.subarray(srcID, srcID + Chunk.depth), dstID);
          pc.lights.set(chunk.lights.subarray(srcID, srcID + Chunk.depth), dstID);
          continue;
        }

        var block = this.at(cx + i, cy + j, k);
        var light = this.light(cx + i, cy + j, k);
        var height = this.height(cx + i, cy + j);
        var dstID = PaddedChunk.index3d(i, j, k);
        pc.map[dstID] = block;
        pc.lights[dstID] = light;
        pc.heights[PaddedChunk.index2d(i, j)] = height;
      }

      return pc;
    }

  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var constants = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.NORM_2D = 1.0 / 47.0;
    exports.NORM_3D = 1.0 / 103.0;
    exports.NORM_4D = 1.0 / 30.0;
    exports.SQUISH_2D = (Math.sqrt(2 + 1) - 1) / 2;
    exports.SQUISH_3D = (Math.sqrt(3 + 1) - 1) / 3;
    exports.SQUISH_4D = (Math.sqrt(4 + 1) - 1) / 4;
    exports.STRETCH_2D = (1 / Math.sqrt(2 + 1) - 1) / 2;
    exports.STRETCH_3D = (1 / Math.sqrt(3 + 1) - 1) / 3;
    exports.STRETCH_4D = (1 / Math.sqrt(4 + 1) - 1) / 4;
    exports.base2D = [[1, 1, 0, 1, 0, 1, 0, 0, 0], [1, 1, 0, 1, 0, 1, 2, 1, 1]];
    exports.base3D = [[0, 0, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1], [2, 1, 1, 0, 2, 1, 0, 1, 2, 0, 1, 1, 3, 1, 1, 1], [1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 2, 1, 1, 0, 2, 1, 0, 1, 2, 0, 1, 1]];
    exports.base4D = [[0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1], [3, 1, 1, 1, 0, 3, 1, 1, 0, 1, 3, 1, 0, 1, 1, 3, 0, 1, 1, 1, 4, 1, 1, 1, 1], [1, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 2, 1, 1, 0, 0, 2, 1, 0, 1, 0, 2, 1, 0, 0, 1, 2, 0, 1, 1, 0, 2, 0, 1, 0, 1, 2, 0, 0, 1, 1], [3, 1, 1, 1, 0, 3, 1, 1, 0, 1, 3, 1, 0, 1, 1, 3, 0, 1, 1, 1, 2, 1, 1, 0, 0, 2, 1, 0, 1, 0, 2, 1, 0, 0, 1, 2, 0, 1, 1, 0, 2, 0, 1, 0, 1, 2, 0, 0, 1, 1]];
    exports.gradients2D = [5, 2, 2, 5, -5, 2, -2, 5, 5, -2, 2, -5, -5, -2, -2, -5];
    exports.gradients3D = [-11, 4, 4, -4, 11, 4, -4, 4, 11, 11, 4, 4, 4, 11, 4, 4, 4, 11, -11, -4, 4, -4, -11, 4, -4, -4, 11, 11, -4, 4, 4, -11, 4, 4, -4, 11, -11, 4, -4, -4, 11, -4, -4, 4, -11, 11, 4, -4, 4, 11, -4, 4, 4, -11, -11, -4, -4, -4, -11, -4, -4, -4, -11, 11, -4, -4, 4, -11, -4, 4, -4, -11];
    exports.gradients4D = [3, 1, 1, 1, 1, 3, 1, 1, 1, 1, 3, 1, 1, 1, 1, 3, -3, 1, 1, 1, -1, 3, 1, 1, -1, 1, 3, 1, -1, 1, 1, 3, 3, -1, 1, 1, 1, -3, 1, 1, 1, -1, 3, 1, 1, -1, 1, 3, -3, -1, 1, 1, -1, -3, 1, 1, -1, -1, 3, 1, -1, -1, 1, 3, 3, 1, -1, 1, 1, 3, -1, 1, 1, 1, -3, 1, 1, 1, -1, 3, -3, 1, -1, 1, -1, 3, -1, 1, -1, 1, -3, 1, -1, 1, -1, 3, 3, -1, -1, 1, 1, -3, -1, 1, 1, -1, -3, 1, 1, -1, -1, 3, -3, -1, -1, 1, -1, -3, -1, 1, -1, -1, -3, 1, -1, -1, -1, 3, 3, 1, 1, -1, 1, 3, 1, -1, 1, 1, 3, -1, 1, 1, 1, -3, -3, 1, 1, -1, -1, 3, 1, -1, -1, 1, 3, -1, -1, 1, 1, -3, 3, -1, 1, -1, 1, -3, 1, -1, 1, -1, 3, -1, 1, -1, 1, -3, -3, -1, 1, -1, -1, -3, 1, -1, -1, -1, 3, -1, -1, -1, 1, -3, 3, 1, -1, -1, 1, 3, -1, -1, 1, 1, -3, -1, 1, 1, -1, -3, -3, 1, -1, -1, -1, 3, -1, -1, -1, 1, -3, -1, -1, 1, -1, -3, 3, -1, -1, -1, 1, -3, -1, -1, 1, -1, -3, -1, 1, -1, -1, -3, -3, -1, -1, -1, -1, -3, -1, -1, -1, -1, -3, -1, -1, -1, -1, -3];
    exports.lookupPairs2D = [0, 1, 1, 0, 4, 1, 17, 0, 20, 2, 21, 2, 22, 5, 23, 5, 26, 4, 39, 3, 42, 4, 43, 3];
    exports.lookupPairs3D = [0, 2, 1, 1, 2, 2, 5, 1, 6, 0, 7, 0, 32, 2, 34, 2, 129, 1, 133, 1, 160, 5, 161, 5, 518, 0, 519, 0, 546, 4, 550, 4, 645, 3, 647, 3, 672, 5, 673, 5, 674, 4, 677, 3, 678, 4, 679, 3, 680, 13, 681, 13, 682, 12, 685, 14, 686, 12, 687, 14, 712, 20, 714, 18, 809, 21, 813, 23, 840, 20, 841, 21, 1198, 19, 1199, 22, 1226, 18, 1230, 19, 1325, 23, 1327, 22, 1352, 15, 1353, 17, 1354, 15, 1357, 17, 1358, 16, 1359, 16, 1360, 11, 1361, 10, 1362, 11, 1365, 10, 1366, 9, 1367, 9, 1392, 11, 1394, 11, 1489, 10, 1493, 10, 1520, 8, 1521, 8, 1878, 9, 1879, 9, 1906, 7, 1910, 7, 2005, 6, 2007, 6, 2032, 8, 2033, 8, 2034, 7, 2037, 6, 2038, 7, 2039, 6];
    exports.lookupPairs4D = [0, 3, 1, 2, 2, 3, 5, 2, 6, 1, 7, 1, 8, 3, 9, 2, 10, 3, 13, 2, 16, 3, 18, 3, 22, 1, 23, 1, 24, 3, 26, 3, 33, 2, 37, 2, 38, 1, 39, 1, 41, 2, 45, 2, 54, 1, 55, 1, 56, 0, 57, 0, 58, 0, 59, 0, 60, 0, 61, 0, 62, 0, 63, 0, 256, 3, 258, 3, 264, 3, 266, 3, 272, 3, 274, 3, 280, 3, 282, 3, 2049, 2, 2053, 2, 2057, 2, 2061, 2, 2081, 2, 2085, 2, 2089, 2, 2093, 2, 2304, 9, 2305, 9, 2312, 9, 2313, 9, 16390, 1, 16391, 1, 16406, 1, 16407, 1, 16422, 1, 16423, 1, 16438, 1, 16439, 1, 16642, 8, 16646, 8, 16658, 8, 16662, 8, 18437, 6, 18439, 6, 18469, 6, 18471, 6, 18688, 9, 18689, 9, 18690, 8, 18693, 6, 18694, 8, 18695, 6, 18696, 9, 18697, 9, 18706, 8, 18710, 8, 18725, 6, 18727, 6, 131128, 0, 131129, 0, 131130, 0, 131131, 0, 131132, 0, 131133, 0, 131134, 0, 131135, 0, 131352, 7, 131354, 7, 131384, 7, 131386, 7, 133161, 5, 133165, 5, 133177, 5, 133181, 5, 133376, 9, 133377, 9, 133384, 9, 133385, 9, 133400, 7, 133402, 7, 133417, 5, 133421, 5, 133432, 7, 133433, 5, 133434, 7, 133437, 5, 147510, 4, 147511, 4, 147518, 4, 147519, 4, 147714, 8, 147718, 8, 147730, 8, 147734, 8, 147736, 7, 147738, 7, 147766, 4, 147767, 4, 147768, 7, 147770, 7, 147774, 4, 147775, 4, 149509, 6, 149511, 6, 149541, 6, 149543, 6, 149545, 5, 149549, 5, 149558, 4, 149559, 4, 149561, 5, 149565, 5, 149566, 4, 149567, 4, 149760, 9, 149761, 9, 149762, 8, 149765, 6, 149766, 8, 149767, 6, 149768, 9, 149769, 9, 149778, 8, 149782, 8, 149784, 7, 149786, 7, 149797, 6, 149799, 6, 149801, 5, 149805, 5, 149814, 4, 149815, 4, 149816, 7, 149817, 5, 149818, 7, 149821, 5, 149822, 4, 149823, 4, 149824, 37, 149825, 37, 149826, 36, 149829, 34, 149830, 36, 149831, 34, 149832, 37, 149833, 37, 149842, 36, 149846, 36, 149848, 35, 149850, 35, 149861, 34, 149863, 34, 149865, 33, 149869, 33, 149878, 32, 149879, 32, 149880, 35, 149881, 33, 149882, 35, 149885, 33, 149886, 32, 149887, 32, 150080, 49, 150082, 48, 150088, 49, 150098, 48, 150104, 47, 150106, 47, 151873, 46, 151877, 45, 151881, 46, 151909, 45, 151913, 44, 151917, 44, 152128, 49, 152129, 46, 152136, 49, 152137, 46, 166214, 43, 166215, 42, 166230, 43, 166247, 42, 166262, 41, 166263, 41, 166466, 48, 166470, 43, 166482, 48, 166486, 43, 168261, 45, 168263, 42, 168293, 45, 168295, 42, 168512, 31, 168513, 28, 168514, 31, 168517, 28, 168518, 25, 168519, 25, 280952, 40, 280953, 39, 280954, 40, 280957, 39, 280958, 38, 280959, 38, 281176, 47, 281178, 47, 281208, 40, 281210, 40, 282985, 44, 282989, 44, 283001, 39, 283005, 39, 283208, 30, 283209, 27, 283224, 30, 283241, 27, 283256, 22, 283257, 22, 297334, 41, 297335, 41, 297342, 38, 297343, 38, 297554, 29, 297558, 24, 297562, 29, 297590, 24, 297594, 21, 297598, 21, 299365, 26, 299367, 23, 299373, 26, 299383, 23, 299389, 20, 299391, 20, 299584, 31, 299585, 28, 299586, 31, 299589, 28, 299590, 25, 299591, 25, 299592, 30, 299593, 27, 299602, 29, 299606, 24, 299608, 30, 299610, 29, 299621, 26, 299623, 23, 299625, 27, 299629, 26, 299638, 24, 299639, 23, 299640, 22, 299641, 22, 299642, 21, 299645, 20, 299646, 21, 299647, 20, 299648, 61, 299649, 60, 299650, 61, 299653, 60, 299654, 59, 299655, 59, 299656, 58, 299657, 57, 299666, 55, 299670, 54, 299672, 58, 299674, 55, 299685, 52, 299687, 51, 299689, 57, 299693, 52, 299702, 54, 299703, 51, 299704, 56, 299705, 56, 299706, 53, 299709, 50, 299710, 53, 299711, 50, 299904, 61, 299906, 61, 299912, 58, 299922, 55, 299928, 58, 299930, 55, 301697, 60, 301701, 60, 301705, 57, 301733, 52, 301737, 57, 301741, 52, 301952, 79, 301953, 79, 301960, 76, 301961, 76, 316038, 59, 316039, 59, 316054, 54, 316071, 51, 316086, 54, 316087, 51, 316290, 78, 316294, 78, 316306, 73, 316310, 73, 318085, 77, 318087, 77, 318117, 70, 318119, 70, 318336, 79, 318337, 79, 318338, 78, 318341, 77, 318342, 78, 318343, 77, 430776, 56, 430777, 56, 430778, 53, 430781, 50, 430782, 53, 430783, 50, 431000, 75, 431002, 72, 431032, 75, 431034, 72, 432809, 74, 432813, 69, 432825, 74, 432829, 69, 433032, 76, 433033, 76, 433048, 75, 433065, 74, 433080, 75, 433081, 74, 447158, 71, 447159, 68, 447166, 71, 447167, 68, 447378, 73, 447382, 73, 447386, 72, 447414, 71, 447418, 72, 447422, 71, 449189, 70, 449191, 70, 449197, 69, 449207, 68, 449213, 69, 449215, 68, 449408, 67, 449409, 67, 449410, 66, 449413, 64, 449414, 66, 449415, 64, 449416, 67, 449417, 67, 449426, 66, 449430, 66, 449432, 65, 449434, 65, 449445, 64, 449447, 64, 449449, 63, 449453, 63, 449462, 62, 449463, 62, 449464, 65, 449465, 63, 449466, 65, 449469, 63, 449470, 62, 449471, 62, 449472, 19, 449473, 19, 449474, 18, 449477, 16, 449478, 18, 449479, 16, 449480, 19, 449481, 19, 449490, 18, 449494, 18, 449496, 17, 449498, 17, 449509, 16, 449511, 16, 449513, 15, 449517, 15, 449526, 14, 449527, 14, 449528, 17, 449529, 15, 449530, 17, 449533, 15, 449534, 14, 449535, 14, 449728, 19, 449729, 19, 449730, 18, 449734, 18, 449736, 19, 449737, 19, 449746, 18, 449750, 18, 449752, 17, 449754, 17, 449784, 17, 449786, 17, 451520, 19, 451521, 19, 451525, 16, 451527, 16, 451528, 19, 451529, 19, 451557, 16, 451559, 16, 451561, 15, 451565, 15, 451577, 15, 451581, 15, 451776, 19, 451777, 19, 451784, 19, 451785, 19, 465858, 18, 465861, 16, 465862, 18, 465863, 16, 465874, 18, 465878, 18, 465893, 16, 465895, 16, 465910, 14, 465911, 14, 465918, 14, 465919, 14, 466114, 18, 466118, 18, 466130, 18, 466134, 18, 467909, 16, 467911, 16, 467941, 16, 467943, 16, 468160, 13, 468161, 13, 468162, 13, 468163, 13, 468164, 13, 468165, 13, 468166, 13, 468167, 13, 580568, 17, 580570, 17, 580585, 15, 580589, 15, 580598, 14, 580599, 14, 580600, 17, 580601, 15, 580602, 17, 580605, 15, 580606, 14, 580607, 14, 580824, 17, 580826, 17, 580856, 17, 580858, 17, 582633, 15, 582637, 15, 582649, 15, 582653, 15, 582856, 12, 582857, 12, 582872, 12, 582873, 12, 582888, 12, 582889, 12, 582904, 12, 582905, 12, 596982, 14, 596983, 14, 596990, 14, 596991, 14, 597202, 11, 597206, 11, 597210, 11, 597214, 11, 597234, 11, 597238, 11, 597242, 11, 597246, 11, 599013, 10, 599015, 10, 599021, 10, 599023, 10, 599029, 10, 599031, 10, 599037, 10, 599039, 10, 599232, 13, 599233, 13, 599234, 13, 599235, 13, 599236, 13, 599237, 13, 599238, 13, 599239, 13, 599240, 12, 599241, 12, 599250, 11, 599254, 11, 599256, 12, 599257, 12, 599258, 11, 599262, 11, 599269, 10, 599271, 10, 599272, 12, 599273, 12, 599277, 10, 599279, 10, 599282, 11, 599285, 10, 599286, 11, 599287, 10, 599288, 12, 599289, 12, 599290, 11, 599293, 10, 599294, 11, 599295, 10];
    exports.p2D = [0, 0, 1, -1, 0, 0, -1, 1, 0, 2, 1, 1, 1, 2, 2, 0, 1, 2, 0, 2, 1, 0, 0, 0];
    exports.p3D = [0, 0, 1, -1, 0, 0, 1, 0, -1, 0, 0, -1, 1, 0, 0, 0, 1, -1, 0, 0, -1, 0, 1, 0, 0, -1, 1, 0, 2, 1, 1, 0, 1, 1, 1, -1, 0, 2, 1, 0, 1, 1, 1, -1, 1, 0, 2, 0, 1, 1, 1, -1, 1, 1, 1, 3, 2, 1, 0, 3, 1, 2, 0, 1, 3, 2, 0, 1, 3, 1, 0, 2, 1, 3, 0, 2, 1, 3, 0, 1, 2, 1, 1, 1, 0, 0, 2, 2, 0, 0, 1, 1, 0, 1, 0, 2, 0, 2, 0, 1, 1, 0, 0, 1, 2, 0, 0, 2, 2, 0, 0, 0, 0, 1, 1, -1, 1, 2, 0, 0, 0, 0, 1, -1, 1, 1, 2, 0, 0, 0, 0, 1, 1, 1, -1, 2, 3, 1, 1, 1, 2, 0, 0, 2, 2, 3, 1, 1, 1, 2, 2, 0, 0, 2, 3, 1, 1, 1, 2, 0, 2, 0, 2, 1, 1, -1, 1, 2, 0, 0, 2, 2, 1, 1, -1, 1, 2, 2, 0, 0, 2, 1, -1, 1, 1, 2, 0, 0, 2, 2, 1, -1, 1, 1, 2, 0, 2, 0, 2, 1, 1, 1, -1, 2, 2, 0, 0, 2, 1, 1, 1, -1, 2, 0, 2, 0];
    exports.p4D = [0, 0, 1, -1, 0, 0, 0, 1, 0, -1, 0, 0, 1, 0, 0, -1, 0, 0, -1, 1, 0, 0, 0, 0, 1, -1, 0, 0, 0, 1, 0, -1, 0, 0, -1, 0, 1, 0, 0, 0, -1, 1, 0, 0, 0, 0, 1, -1, 0, 0, -1, 0, 0, 1, 0, 0, -1, 0, 1, 0, 0, 0, -1, 1, 0, 2, 1, 1, 0, 0, 1, 1, 1, -1, 0, 1, 1, 1, 0, -1, 0, 2, 1, 0, 1, 0, 1, 1, -1, 1, 0, 1, 1, 0, 1, -1, 0, 2, 0, 1, 1, 0, 1, -1, 1, 1, 0, 1, 0, 1, 1, -1, 0, 2, 1, 0, 0, 1, 1, 1, -1, 0, 1, 1, 1, 0, -1, 1, 0, 2, 0, 1, 0, 1, 1, -1, 1, 0, 1, 1, 0, 1, -1, 1, 0, 2, 0, 0, 1, 1, 1, -1, 0, 1, 1, 1, 0, -1, 1, 1, 1, 4, 2, 1, 1, 0, 4, 1, 2, 1, 0, 4, 1, 1, 2, 0, 1, 4, 2, 1, 0, 1, 4, 1, 2, 0, 1, 4, 1, 1, 0, 2, 1, 4, 2, 0, 1, 1, 4, 1, 0, 2, 1, 4, 1, 0, 1, 2, 1, 4, 0, 2, 1, 1, 4, 0, 1, 2, 1, 4, 0, 1, 1, 2, 1, 2, 1, 1, 0, 0, 3, 2, 1, 0, 0, 3, 1, 2, 0, 0, 1, 2, 1, 0, 1, 0, 3, 2, 0, 1, 0, 3, 1, 0, 2, 0, 1, 2, 0, 1, 1, 0, 3, 0, 2, 1, 0, 3, 0, 1, 2, 0, 1, 2, 1, 0, 0, 1, 3, 2, 0, 0, 1, 3, 1, 0, 0, 2, 1, 2, 0, 1, 0, 1, 3, 0, 2, 0, 1, 3, 0, 1, 0, 2, 1, 2, 0, 0, 1, 1, 3, 0, 0, 2, 1, 3, 0, 0, 1, 2, 2, 3, 1, 1, 1, 0, 2, 1, 1, 1, -1, 2, 2, 0, 0, 0, 2, 3, 1, 1, 0, 1, 2, 1, 1, -1, 1, 2, 2, 0, 0, 0, 2, 3, 1, 0, 1, 1, 2, 1, -1, 1, 1, 2, 2, 0, 0, 0, 2, 3, 1, 1, 1, 0, 2, 1, 1, 1, -1, 2, 0, 2, 0, 0, 2, 3, 1, 1, 0, 1, 2, 1, 1, -1, 1, 2, 0, 2, 0, 0, 2, 3, 0, 1, 1, 1, 2, -1, 1, 1, 1, 2, 0, 2, 0, 0, 2, 3, 1, 1, 1, 0, 2, 1, 1, 1, -1, 2, 0, 0, 2, 0, 2, 3, 1, 0, 1, 1, 2, 1, -1, 1, 1, 2, 0, 0, 2, 0, 2, 3, 0, 1, 1, 1, 2, -1, 1, 1, 1, 2, 0, 0, 2, 0, 2, 3, 1, 1, 0, 1, 2, 1, 1, -1, 1, 2, 0, 0, 0, 2, 2, 3, 1, 0, 1, 1, 2, 1, -1, 1, 1, 2, 0, 0, 0, 2, 2, 3, 0, 1, 1, 1, 2, -1, 1, 1, 1, 2, 0, 0, 0, 2, 2, 1, 1, 1, -1, 0, 1, 1, 1, 0, -1, 0, 0, 0, 0, 0, 2, 1, 1, -1, 1, 0, 1, 1, 0, 1, -1, 0, 0, 0, 0, 0, 2, 1, -1, 1, 1, 0, 1, 0, 1, 1, -1, 0, 0, 0, 0, 0, 2, 1, 1, -1, 0, 1, 1, 1, 0, -1, 1, 0, 0, 0, 0, 0, 2, 1, -1, 1, 0, 1, 1, 0, 1, -1, 1, 0, 0, 0, 0, 0, 2, 1, -1, 0, 1, 1, 1, 0, -1, 1, 1, 0, 0, 0, 0, 0, 2, 1, 1, 1, -1, 0, 1, 1, 1, 0, -1, 2, 2, 0, 0, 0, 2, 1, 1, -1, 1, 0, 1, 1, 0, 1, -1, 2, 2, 0, 0, 0, 2, 1, 1, -1, 0, 1, 1, 1, 0, -1, 1, 2, 2, 0, 0, 0, 2, 1, 1, 1, -1, 0, 1, 1, 1, 0, -1, 2, 0, 2, 0, 0, 2, 1, -1, 1, 1, 0, 1, 0, 1, 1, -1, 2, 0, 2, 0, 0, 2, 1, -1, 1, 0, 1, 1, 0, 1, -1, 1, 2, 0, 2, 0, 0, 2, 1, 1, -1, 1, 0, 1, 1, 0, 1, -1, 2, 0, 0, 2, 0, 2, 1, -1, 1, 1, 0, 1, 0, 1, 1, -1, 2, 0, 0, 2, 0, 2, 1, -1, 0, 1, 1, 1, 0, -1, 1, 1, 2, 0, 0, 2, 0, 2, 1, 1, -1, 0, 1, 1, 1, 0, -1, 1, 2, 0, 0, 0, 2, 2, 1, -1, 1, 0, 1, 1, 0, 1, -1, 1, 2, 0, 0, 0, 2, 2, 1, -1, 0, 1, 1, 1, 0, -1, 1, 1, 2, 0, 0, 0, 2, 3, 1, 1, 0, 0, 0, 2, 2, 0, 0, 0, 2, 1, 1, 1, -1, 3, 1, 0, 1, 0, 0, 2, 0, 2, 0, 0, 2, 1, 1, 1, -1, 3, 1, 0, 0, 1, 0, 2, 0, 0, 2, 0, 2, 1, 1, 1, -1, 3, 1, 1, 0, 0, 0, 2, 2, 0, 0, 0, 2, 1, 1, -1, 1, 3, 1, 0, 1, 0, 0, 2, 0, 2, 0, 0, 2, 1, 1, -1, 1, 3, 1, 0, 0, 0, 1, 2, 0, 0, 0, 2, 2, 1, 1, -1, 1, 3, 1, 1, 0, 0, 0, 2, 2, 0, 0, 0, 2, 1, -1, 1, 1, 3, 1, 0, 0, 1, 0, 2, 0, 0, 2, 0, 2, 1, -1, 1, 1, 3, 1, 0, 0, 0, 1, 2, 0, 0, 0, 2, 2, 1, -1, 1, 1, 3, 1, 0, 1, 0, 0, 2, 0, 2, 0, 0, 2, -1, 1, 1, 1, 3, 1, 0, 0, 1, 0, 2, 0, 0, 2, 0, 2, -1, 1, 1, 1, 3, 1, 0, 0, 0, 1, 2, 0, 0, 0, 2, 2, -1, 1, 1, 1, 3, 3, 2, 1, 0, 0, 3, 1, 2, 0, 0, 4, 1, 1, 1, 1, 3, 3, 2, 0, 1, 0, 3, 1, 0, 2, 0, 4, 1, 1, 1, 1, 3, 3, 0, 2, 1, 0, 3, 0, 1, 2, 0, 4, 1, 1, 1, 1, 3, 3, 2, 0, 0, 1, 3, 1, 0, 0, 2, 4, 1, 1, 1, 1, 3, 3, 0, 2, 0, 1, 3, 0, 1, 0, 2, 4, 1, 1, 1, 1, 3, 3, 0, 0, 2, 1, 3, 0, 0, 1, 2, 4, 1, 1, 1, 1, 3, 3, 2, 1, 0, 0, 3, 1, 2, 0, 0, 2, 1, 1, 1, -1, 3, 3, 2, 0, 1, 0, 3, 1, 0, 2, 0, 2, 1, 1, 1, -1, 3, 3, 0, 2, 1, 0, 3, 0, 1, 2, 0, 2, 1, 1, 1, -1, 3, 3, 2, 1, 0, 0, 3, 1, 2, 0, 0, 2, 1, 1, -1, 1, 3, 3, 2, 0, 0, 1, 3, 1, 0, 0, 2, 2, 1, 1, -1, 1, 3, 3, 0, 2, 0, 1, 3, 0, 1, 0, 2, 2, 1, 1, -1, 1, 3, 3, 2, 0, 1, 0, 3, 1, 0, 2, 0, 2, 1, -1, 1, 1, 3, 3, 2, 0, 0, 1, 3, 1, 0, 0, 2, 2, 1, -1, 1, 1, 3, 3, 0, 0, 2, 1, 3, 0, 0, 1, 2, 2, 1, -1, 1, 1, 3, 3, 0, 2, 1, 0, 3, 0, 1, 2, 0, 2, -1, 1, 1, 1, 3, 3, 0, 2, 0, 1, 3, 0, 1, 0, 2, 2, -1, 1, 1, 1, 3, 3, 0, 0, 2, 1, 3, 0, 0, 1, 2, 2, -1, 1, 1, 1];
  });
  unwrapExports(constants);
  var constants_1 = constants.NORM_2D;
  var constants_2 = constants.NORM_3D;
  var constants_3 = constants.NORM_4D;
  var constants_4 = constants.SQUISH_2D;
  var constants_5 = constants.SQUISH_3D;
  var constants_6 = constants.SQUISH_4D;
  var constants_7 = constants.STRETCH_2D;
  var constants_8 = constants.STRETCH_3D;
  var constants_9 = constants.STRETCH_4D;
  var constants_10 = constants.base2D;
  var constants_11 = constants.base3D;
  var constants_12 = constants.base4D;
  var constants_13 = constants.gradients2D;
  var constants_14 = constants.gradients3D;
  var constants_15 = constants.gradients4D;
  var constants_16 = constants.lookupPairs2D;
  var constants_17 = constants.lookupPairs3D;
  var constants_18 = constants.lookupPairs4D;
  var constants_19 = constants.p2D;
  var constants_20 = constants.p3D;
  var constants_21 = constants.p4D;

  var lib = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var Contribution2 =
    /** @class */
    function () {
      function Contribution2(multiplier, xsb, ysb) {
        this.dx = -xsb - multiplier * constants.SQUISH_2D;
        this.dy = -ysb - multiplier * constants.SQUISH_2D;
        this.xsb = xsb;
        this.ysb = ysb;
      }

      return Contribution2;
    }();

    var Contribution3 =
    /** @class */
    function () {
      function Contribution3(multiplier, xsb, ysb, zsb) {
        this.dx = -xsb - multiplier * constants.SQUISH_3D;
        this.dy = -ysb - multiplier * constants.SQUISH_3D;
        this.dz = -zsb - multiplier * constants.SQUISH_3D;
        this.xsb = xsb;
        this.ysb = ysb;
        this.zsb = zsb;
      }

      return Contribution3;
    }();

    var Contribution4 =
    /** @class */
    function () {
      function Contribution4(multiplier, xsb, ysb, zsb, wsb) {
        this.dx = -xsb - multiplier * constants.SQUISH_4D;
        this.dy = -ysb - multiplier * constants.SQUISH_4D;
        this.dz = -zsb - multiplier * constants.SQUISH_4D;
        this.dw = -wsb - multiplier * constants.SQUISH_4D;
        this.xsb = xsb;
        this.ysb = ysb;
        this.zsb = zsb;
        this.wsb = wsb;
      }

      return Contribution4;
    }();

    function shuffleSeed(seed) {
      var newSeed = new Uint32Array(1);
      newSeed[0] = seed[0] * 1664525 + 1013904223;
      return newSeed;
    }

    var OpenSimplexNoise =
    /** @class */
    function () {
      function OpenSimplexNoise(clientSeed) {
        this.initialize();
        this.perm = new Uint8Array(256);
        this.perm2D = new Uint8Array(256);
        this.perm3D = new Uint8Array(256);
        this.perm4D = new Uint8Array(256);
        var source = new Uint8Array(256);

        for (var i = 0; i < 256; i++) source[i] = i;

        var seed = new Uint32Array(1);
        seed[0] = clientSeed;
        seed = shuffleSeed(shuffleSeed(shuffleSeed(seed)));

        for (var i = 255; i >= 0; i--) {
          seed = shuffleSeed(seed);
          var r = new Uint32Array(1);
          r[0] = (seed[0] + 31) % (i + 1);
          if (r[0] < 0) r[0] += i + 1;
          this.perm[i] = source[r[0]];
          this.perm2D[i] = this.perm[i] & 0x0e;
          this.perm3D[i] = this.perm[i] % 24 * 3;
          this.perm4D[i] = this.perm[i] & 0xfc;
          source[r[0]] = source[i];
        }
      }

      OpenSimplexNoise.prototype.array2D = function (width, height) {
        var output = new Array(width);

        for (var x = 0; x < width; x++) {
          output[x] = new Array(height);

          for (var y = 0; y < height; y++) {
            output[x][y] = this.noise2D(x, y);
          }
        }

        return output;
      };

      OpenSimplexNoise.prototype.array3D = function (width, height, depth) {
        var output = new Array(width);

        for (var x = 0; x < width; x++) {
          output[x] = new Array(height);

          for (var y = 0; y < height; y++) {
            output[x][y] = new Array(depth);

            for (var z = 0; z < depth; z++) {
              output[x][y][z] = this.noise3D(x, y, z);
            }
          }
        }

        return output;
      };

      OpenSimplexNoise.prototype.array4D = function (width, height, depth, wLength) {
        var output = new Array(width);

        for (var x = 0; x < width; x++) {
          output[x] = new Array(height);

          for (var y = 0; y < height; y++) {
            output[x][y] = new Array(depth);

            for (var z = 0; z < depth; z++) {
              output[x][y][z] = new Array(wLength);

              for (var w = 0; w < wLength; w++) {
                output[x][y][z][w] = this.noise4D(x, y, z, w);
              }
            }
          }
        }

        return output;
      };

      OpenSimplexNoise.prototype.noise2D = function (x, y) {
        var stretchOffset = (x + y) * constants.STRETCH_2D;
        var xs = x + stretchOffset;
        var ys = y + stretchOffset;
        var xsb = Math.floor(xs);
        var ysb = Math.floor(ys);
        var squishOffset = (xsb + ysb) * constants.SQUISH_2D;
        var dx0 = x - (xsb + squishOffset);
        var dy0 = y - (ysb + squishOffset);
        var xins = xs - xsb;
        var yins = ys - ysb;
        var inSum = xins + yins;
        var hash = xins - yins + 1 | inSum << 1 | inSum + yins << 2 | inSum + xins << 4;
        var value = 0;

        for (var c = this.lookup2D[hash]; c !== undefined; c = c.next) {
          var dx = dx0 + c.dx;
          var dy = dy0 + c.dy;
          var attn = 2 - dx * dx - dy * dy;

          if (attn > 0) {
            var px = xsb + c.xsb;
            var py = ysb + c.ysb;
            var indexPartA = this.perm[px & 0xff];
            var index = this.perm2D[indexPartA + py & 0xff];
            var valuePart = constants.gradients2D[index] * dx + constants.gradients2D[index + 1] * dy;
            value += attn * attn * attn * attn * valuePart;
          }
        }

        return value * constants.NORM_2D;
      };

      OpenSimplexNoise.prototype.noise3D = function (x, y, z) {
        var stretchOffset = (x + y + z) * constants.STRETCH_3D;
        var xs = x + stretchOffset;
        var ys = y + stretchOffset;
        var zs = z + stretchOffset;
        var xsb = Math.floor(xs);
        var ysb = Math.floor(ys);
        var zsb = Math.floor(zs);
        var squishOffset = (xsb + ysb + zsb) * constants.SQUISH_3D;
        var dx0 = x - (xsb + squishOffset);
        var dy0 = y - (ysb + squishOffset);
        var dz0 = z - (zsb + squishOffset);
        var xins = xs - xsb;
        var yins = ys - ysb;
        var zins = zs - zsb;
        var inSum = xins + yins + zins;
        var hash = yins - zins + 1 | xins - yins + 1 << 1 | xins - zins + 1 << 2 | inSum << 3 | inSum + zins << 5 | inSum + yins << 7 | inSum + xins << 9;
        var value = 0;

        for (var c = this.lookup3D[hash]; c !== undefined; c = c.next) {
          var dx = dx0 + c.dx;
          var dy = dy0 + c.dy;
          var dz = dz0 + c.dz;
          var attn = 2 - dx * dx - dy * dy - dz * dz;

          if (attn > 0) {
            var px = xsb + c.xsb;
            var py = ysb + c.ysb;
            var pz = zsb + c.zsb;
            var indexPartA = this.perm[px & 0xff];
            var indexPartB = this.perm[indexPartA + py & 0xff];
            var index = this.perm3D[indexPartB + pz & 0xff];
            var valuePart = constants.gradients3D[index] * dx + constants.gradients3D[index + 1] * dy + constants.gradients3D[index + 2] * dz;
            value += attn * attn * attn * attn * valuePart;
          }
        }

        return value * constants.NORM_3D;
      };

      OpenSimplexNoise.prototype.noise4D = function (x, y, z, w) {
        var stretchOffset = (x + y + z + w) * constants.STRETCH_4D;
        var xs = x + stretchOffset;
        var ys = y + stretchOffset;
        var zs = z + stretchOffset;
        var ws = w + stretchOffset;
        var xsb = Math.floor(xs);
        var ysb = Math.floor(ys);
        var zsb = Math.floor(zs);
        var wsb = Math.floor(ws);
        var squishOffset = (xsb + ysb + zsb + wsb) * constants.SQUISH_4D;
        var dx0 = x - (xsb + squishOffset);
        var dy0 = y - (ysb + squishOffset);
        var dz0 = z - (zsb + squishOffset);
        var dw0 = w - (wsb + squishOffset);
        var xins = xs - xsb;
        var yins = ys - ysb;
        var zins = zs - zsb;
        var wins = ws - wsb;
        var inSum = xins + yins + zins + wins;
        var hash = zins - wins + 1 | yins - zins + 1 << 1 | yins - wins + 1 << 2 | xins - yins + 1 << 3 | xins - zins + 1 << 4 | xins - wins + 1 << 5 | inSum << 6 | inSum + wins << 8 | inSum + zins << 11 | inSum + yins << 14 | inSum + xins << 17;
        var value = 0;

        for (var c = this.lookup4D[hash]; c !== undefined; c = c.next) {
          var dx = dx0 + c.dx;
          var dy = dy0 + c.dy;
          var dz = dz0 + c.dz;
          var dw = dw0 + c.dw;
          var attn = 2 - dx * dx - dy * dy - dz * dz - dw * dw;

          if (attn > 0) {
            var px = xsb + c.xsb;
            var py = ysb + c.ysb;
            var pz = zsb + c.zsb;
            var pw = wsb + c.wsb;
            var indexPartA = this.perm[px & 0xff];
            var indexPartB = this.perm[indexPartA + py & 0xff];
            var indexPartC = this.perm[indexPartB + pz & 0xff];
            var index = this.perm4D[indexPartC + pw & 0xff];
            var valuePart = constants.gradients4D[index] * dx + constants.gradients4D[index + 1] * dy + constants.gradients4D[index + 2] * dz + constants.gradients4D[index + 3] * dw;
            value += attn * attn * attn * attn * valuePart;
          }
        }

        return value * constants.NORM_4D;
      };

      OpenSimplexNoise.prototype.initialize = function () {
        var contributions2D = [];

        for (var i = 0; i < constants.p2D.length; i += 4) {
          var baseSet = constants.base2D[constants.p2D[i]];
          var previous = null;
          var current = null;

          for (var k = 0; k < baseSet.length; k += 3) {
            current = new Contribution2(baseSet[k], baseSet[k + 1], baseSet[k + 2]);
            if (previous === null) contributions2D[i / 4] = current;else previous.next = current;
            previous = current;
          }

          current.next = new Contribution2(constants.p2D[i + 1], constants.p2D[i + 2], constants.p2D[i + 3]);
        }

        this.lookup2D = [];

        for (var i = 0; i < constants.lookupPairs2D.length; i += 2) {
          this.lookup2D[constants.lookupPairs2D[i]] = contributions2D[constants.lookupPairs2D[i + 1]];
        }

        var contributions3D = [];

        for (var i = 0; i < constants.p3D.length; i += 9) {
          var baseSet = constants.base3D[constants.p3D[i]];
          var previous = null;
          var current = null;

          for (var k = 0; k < baseSet.length; k += 4) {
            current = new Contribution3(baseSet[k], baseSet[k + 1], baseSet[k + 2], baseSet[k + 3]);
            if (previous === null) contributions3D[i / 9] = current;else previous.next = current;
            previous = current;
          }

          current.next = new Contribution3(constants.p3D[i + 1], constants.p3D[i + 2], constants.p3D[i + 3], constants.p3D[i + 4]);
          current.next.next = new Contribution3(constants.p3D[i + 5], constants.p3D[i + 6], constants.p3D[i + 7], constants.p3D[i + 8]);
        }

        this.lookup3D = [];

        for (var i = 0; i < constants.lookupPairs3D.length; i += 2) {
          this.lookup3D[constants.lookupPairs3D[i]] = contributions3D[constants.lookupPairs3D[i + 1]];
        }

        var contributions4D = [];

        for (var i = 0; i < constants.p4D.length; i += 16) {
          var baseSet = constants.base4D[constants.p4D[i]];
          var previous = null;
          var current = null;

          for (var k = 0; k < baseSet.length; k += 5) {
            current = new Contribution4(baseSet[k], baseSet[k + 1], baseSet[k + 2], baseSet[k + 3], baseSet[k + 4]);
            if (previous === null) contributions4D[i / 16] = current;else previous.next = current;
            previous = current;
          }

          current.next = new Contribution4(constants.p4D[i + 1], constants.p4D[i + 2], constants.p4D[i + 3], constants.p4D[i + 4], constants.p4D[i + 5]);
          current.next.next = new Contribution4(constants.p4D[i + 6], constants.p4D[i + 7], constants.p4D[i + 8], constants.p4D[i + 9], constants.p4D[i + 10]);
          current.next.next.next = new Contribution4(constants.p4D[i + 11], constants.p4D[i + 12], constants.p4D[i + 13], constants.p4D[i + 14], constants.p4D[i + 15]);
        }

        this.lookup4D = [];

        for (var i = 0; i < constants.lookupPairs4D.length; i += 2) {
          this.lookup4D[constants.lookupPairs4D[i]] = contributions4D[constants.lookupPairs4D[i + 1]];
        }
      };

      return OpenSimplexNoise;
    }();

    exports.default = OpenSimplexNoise;
  });
  var OpenSimplexNoise = unwrapExports(lib);

  var noisejs = createCommonjsModule(function (module) {
    /*
     * A speed-improved perlin and simplex noise algorithms for 2D.
     *
     * Based on example code by Stefan Gustavson (stegu@itn.liu.se).
     * Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
     * Better rank ordering method by Stefan Gustavson in 2012.
     * Converted to Javascript by Joseph Gentle.
     *
     * Version 2012-03-09
     *
     * This code was placed in the public domain by its original author,
     * Stefan Gustavson. You may use it as you see fit, but
     * attribution is appreciated.
     *
     */
    (function (global) {
      // Passing in seed will seed this Noise instance
      function Noise(seed) {
        function Grad(x, y, z) {
          this.x = x;
          this.y = y;
          this.z = z;
        }

        Grad.prototype.dot2 = function (x, y) {
          return this.x * x + this.y * y;
        };

        Grad.prototype.dot3 = function (x, y, z) {
          return this.x * x + this.y * y + this.z * z;
        };

        this.grad3 = [new Grad(1, 1, 0), new Grad(-1, 1, 0), new Grad(1, -1, 0), new Grad(-1, -1, 0), new Grad(1, 0, 1), new Grad(-1, 0, 1), new Grad(1, 0, -1), new Grad(-1, 0, -1), new Grad(0, 1, 1), new Grad(0, -1, 1), new Grad(0, 1, -1), new Grad(0, -1, -1)];
        this.p = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180]; // To remove the need for index wrapping, double the permutation table length

        this.perm = new Array(512);
        this.gradP = new Array(512);
        this.seed(seed || 0);
      } // This isn't a very good seeding function, but it works ok. It supports 2^16
      // different seed values. Write something better if you need more seeds.


      Noise.prototype.seed = function (seed) {
        if (seed > 0 && seed < 1) {
          // Scale the seed out
          seed *= 65536;
        }

        seed = Math.floor(seed);

        if (seed < 256) {
          seed |= seed << 8;
        }

        var p = this.p;

        for (var i = 0; i < 256; i++) {
          var v;

          if (i & 1) {
            v = p[i] ^ seed & 255;
          } else {
            v = p[i] ^ seed >> 8 & 255;
          }

          var perm = this.perm;
          var gradP = this.gradP;
          perm[i] = perm[i + 256] = v;
          gradP[i] = gradP[i + 256] = this.grad3[v % 12];
        }
      };
      /*
      for(var i=0; i<256; i++) {
        perm[i] = perm[i + 256] = p[i];
        gradP[i] = gradP[i + 256] = grad3[perm[i] % 12];
      }*/
      // Skewing and unskewing factors for 2, 3, and 4 dimensions


      var F2 = 0.5 * (Math.sqrt(3) - 1);
      var G2 = (3 - Math.sqrt(3)) / 6;
      var F3 = 1 / 3;
      var G3 = 1 / 6; // 2D simplex noise

      Noise.prototype.simplex2 = function (xin, yin) {
        var n0, n1, n2; // Noise contributions from the three corners
        // Skew the input space to determine which simplex cell we're in

        var s = (xin + yin) * F2; // Hairy factor for 2D

        var i = Math.floor(xin + s);
        var j = Math.floor(yin + s);
        var t = (i + j) * G2;
        var x0 = xin - i + t; // The x,y distances from the cell origin, unskewed.

        var y0 = yin - j + t; // For the 2D case, the simplex shape is an equilateral triangle.
        // Determine which simplex we are in.

        var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords

        if (x0 > y0) {
          // lower triangle, XY order: (0,0)->(1,0)->(1,1)
          i1 = 1;
          j1 = 0;
        } else {
          // upper triangle, YX order: (0,0)->(0,1)->(1,1)
          i1 = 0;
          j1 = 1;
        } // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
        // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
        // c = (3-sqrt(3))/6


        var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords

        var y1 = y0 - j1 + G2;
        var x2 = x0 - 1 + 2 * G2; // Offsets for last corner in (x,y) unskewed coords

        var y2 = y0 - 1 + 2 * G2; // Work out the hashed gradient indices of the three simplex corners

        i &= 255;
        j &= 255;
        var perm = this.perm;
        var gradP = this.gradP;
        var gi0 = gradP[i + perm[j]];
        var gi1 = gradP[i + i1 + perm[j + j1]];
        var gi2 = gradP[i + 1 + perm[j + 1]]; // Calculate the contribution from the three corners

        var t0 = 0.5 - x0 * x0 - y0 * y0;

        if (t0 < 0) {
          n0 = 0;
        } else {
          t0 *= t0;
          n0 = t0 * t0 * gi0.dot2(x0, y0); // (x,y) of grad3 used for 2D gradient
        }

        var t1 = 0.5 - x1 * x1 - y1 * y1;

        if (t1 < 0) {
          n1 = 0;
        } else {
          t1 *= t1;
          n1 = t1 * t1 * gi1.dot2(x1, y1);
        }

        var t2 = 0.5 - x2 * x2 - y2 * y2;

        if (t2 < 0) {
          n2 = 0;
        } else {
          t2 *= t2;
          n2 = t2 * t2 * gi2.dot2(x2, y2);
        } // Add contributions from each corner to get the final noise value.
        // The result is scaled to return values in the interval [-1,1].


        return 70 * (n0 + n1 + n2);
      }; // 3D simplex noise


      Noise.prototype.simplex3 = function (xin, yin, zin) {
        var n0, n1, n2, n3; // Noise contributions from the four corners
        // Skew the input space to determine which simplex cell we're in

        var s = (xin + yin + zin) * F3; // Hairy factor for 2D

        var i = Math.floor(xin + s);
        var j = Math.floor(yin + s);
        var k = Math.floor(zin + s);
        var t = (i + j + k) * G3;
        var x0 = xin - i + t; // The x,y distances from the cell origin, unskewed.

        var y0 = yin - j + t;
        var z0 = zin - k + t; // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
        // Determine which simplex we are in.

        var i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords

        var i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords

        if (x0 >= y0) {
          if (y0 >= z0) {
            i1 = 1;
            j1 = 0;
            k1 = 0;
            i2 = 1;
            j2 = 1;
            k2 = 0;
          } else if (x0 >= z0) {
            i1 = 1;
            j1 = 0;
            k1 = 0;
            i2 = 1;
            j2 = 0;
            k2 = 1;
          } else {
            i1 = 0;
            j1 = 0;
            k1 = 1;
            i2 = 1;
            j2 = 0;
            k2 = 1;
          }
        } else {
          if (y0 < z0) {
            i1 = 0;
            j1 = 0;
            k1 = 1;
            i2 = 0;
            j2 = 1;
            k2 = 1;
          } else if (x0 < z0) {
            i1 = 0;
            j1 = 1;
            k1 = 0;
            i2 = 0;
            j2 = 1;
            k2 = 1;
          } else {
            i1 = 0;
            j1 = 1;
            k1 = 0;
            i2 = 1;
            j2 = 1;
            k2 = 0;
          }
        } // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
        // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
        // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
        // c = 1/6.


        var x1 = x0 - i1 + G3; // Offsets for second corner

        var y1 = y0 - j1 + G3;
        var z1 = z0 - k1 + G3;
        var x2 = x0 - i2 + 2 * G3; // Offsets for third corner

        var y2 = y0 - j2 + 2 * G3;
        var z2 = z0 - k2 + 2 * G3;
        var x3 = x0 - 1 + 3 * G3; // Offsets for fourth corner

        var y3 = y0 - 1 + 3 * G3;
        var z3 = z0 - 1 + 3 * G3; // Work out the hashed gradient indices of the four simplex corners

        i &= 255;
        j &= 255;
        k &= 255;
        var perm = this.perm;
        var gradP = this.gradP;
        var gi0 = gradP[i + perm[j + perm[k]]];
        var gi1 = gradP[i + i1 + perm[j + j1 + perm[k + k1]]];
        var gi2 = gradP[i + i2 + perm[j + j2 + perm[k + k2]]];
        var gi3 = gradP[i + 1 + perm[j + 1 + perm[k + 1]]]; // Calculate the contribution from the four corners

        var t0 = 0.5 - x0 * x0 - y0 * y0 - z0 * z0;

        if (t0 < 0) {
          n0 = 0;
        } else {
          t0 *= t0;
          n0 = t0 * t0 * gi0.dot3(x0, y0, z0); // (x,y) of grad3 used for 2D gradient
        }

        var t1 = 0.5 - x1 * x1 - y1 * y1 - z1 * z1;

        if (t1 < 0) {
          n1 = 0;
        } else {
          t1 *= t1;
          n1 = t1 * t1 * gi1.dot3(x1, y1, z1);
        }

        var t2 = 0.5 - x2 * x2 - y2 * y2 - z2 * z2;

        if (t2 < 0) {
          n2 = 0;
        } else {
          t2 *= t2;
          n2 = t2 * t2 * gi2.dot3(x2, y2, z2);
        }

        var t3 = 0.5 - x3 * x3 - y3 * y3 - z3 * z3;

        if (t3 < 0) {
          n3 = 0;
        } else {
          t3 *= t3;
          n3 = t3 * t3 * gi3.dot3(x3, y3, z3);
        } // Add contributions from each corner to get the final noise value.
        // The result is scaled to return values in the interval [-1,1].


        return 32 * (n0 + n1 + n2 + n3);
      }; // ##### Perlin noise stuff


      function fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
      }

      function lerp(a, b, t) {
        return (1 - t) * a + t * b;
      } // 2D Perlin Noise


      Noise.prototype.perlin2 = function (x, y) {
        // Find unit grid cell containing point
        var X = Math.floor(x),
            Y = Math.floor(y); // Get relative xy coordinates of point within that cell

        x = x - X;
        y = y - Y; // Wrap the integer cells at 255 (smaller integer period can be introduced here)

        X = X & 255;
        Y = Y & 255; // Calculate noise contributions from each of the four corners

        var perm = this.perm;
        var gradP = this.gradP;
        var n00 = gradP[X + perm[Y]].dot2(x, y);
        var n01 = gradP[X + perm[Y + 1]].dot2(x, y - 1);
        var n10 = gradP[X + 1 + perm[Y]].dot2(x - 1, y);
        var n11 = gradP[X + 1 + perm[Y + 1]].dot2(x - 1, y - 1); // Compute the fade curve value for x

        var u = fade(x); // Interpolate the four results

        return lerp(lerp(n00, n10, u), lerp(n01, n11, u), fade(y));
      }; // 3D Perlin Noise


      Noise.prototype.perlin3 = function (x, y, z) {
        // Find unit grid cell containing point
        var X = Math.floor(x),
            Y = Math.floor(y),
            Z = Math.floor(z); // Get relative xyz coordinates of point within that cell

        x = x - X;
        y = y - Y;
        z = z - Z; // Wrap the integer cells at 255 (smaller integer period can be introduced here)

        X = X & 255;
        Y = Y & 255;
        Z = Z & 255; // Calculate noise contributions from each of the eight corners

        var perm = this.perm;
        var gradP = this.gradP;
        var n000 = gradP[X + perm[Y + perm[Z]]].dot3(x, y, z);
        var n001 = gradP[X + perm[Y + perm[Z + 1]]].dot3(x, y, z - 1);
        var n010 = gradP[X + perm[Y + 1 + perm[Z]]].dot3(x, y - 1, z);
        var n011 = gradP[X + perm[Y + 1 + perm[Z + 1]]].dot3(x, y - 1, z - 1);
        var n100 = gradP[X + 1 + perm[Y + perm[Z]]].dot3(x - 1, y, z);
        var n101 = gradP[X + 1 + perm[Y + perm[Z + 1]]].dot3(x - 1, y, z - 1);
        var n110 = gradP[X + 1 + perm[Y + 1 + perm[Z]]].dot3(x - 1, y - 1, z);
        var n111 = gradP[X + 1 + perm[Y + 1 + perm[Z + 1]]].dot3(x - 1, y - 1, z - 1); // Compute the fade curve value for x, y, z

        var u = fade(x);
        var v = fade(y);
        var w = fade(z); // Interpolate

        return lerp(lerp(lerp(n000, n100, u), lerp(n001, n101, u), w), lerp(lerp(n010, n110, u), lerp(n011, n111, u), w), v);
      };

      global.Noise = Noise;
    })( module.exports);
  });

  var seedRandom = createCommonjsModule(function (module) {

    var width = 256; // each RC4 output is 0 <= x < 256

    var chunks = 6; // at least six RC4 outputs for each double

    var digits = 52; // there are 52 significant digits in a double

    var pool = []; // pool: entropy pool starts empty

    var GLOBAL = typeof commonjsGlobal === 'undefined' ? window : commonjsGlobal; //
    // The following constants are related to IEEE 754 limits.
    //

    var startdenom = Math.pow(width, chunks),
        significance = Math.pow(2, digits),
        overflow = significance * 2,
        mask = width - 1;
    var oldRandom = Math.random; //
    // seedrandom()
    // This is the seedrandom function described above.
    //

    module.exports = function (seed, options) {
      if (options && options.global === true) {
        options.global = false;
        Math.random = module.exports(seed, options);
        options.global = true;
        return Math.random;
      }

      var use_entropy = options && options.entropy || false;
      var key = []; // Flatten the seed string or build one from local entropy if needed.

      var shortseed = mixkey(flatten(use_entropy ? [seed, tostring(pool)] : 0 in arguments ? seed : autoseed(), 3), key); // Use the seed to initialize an ARC4 generator.

      var arc4 = new ARC4(key); // Mix the randomness into accumulated entropy.

      mixkey(tostring(arc4.S), pool); // Override Math.random
      // This function returns a random double in [0, 1) that contains
      // randomness in every bit of the mantissa of the IEEE 754 value.

      return function () {
        // Closure to return a random double:
        var n = arc4.g(chunks),
            // Start with a numerator n < 2 ^ 48
        d = startdenom,
            //   and denominator d = 2 ^ 48.
        x = 0; //   and no 'extra last byte'.

        while (n < significance) {
          // Fill up all significant digits by
          n = (n + x) * width; //   shifting numerator and

          d *= width; //   denominator and generating a

          x = arc4.g(1); //   new least-significant-byte.
        }

        while (n >= overflow) {
          // To avoid rounding up, before adding
          n /= 2; //   last byte, shift everything

          d /= 2; //   right using integer Math until

          x >>>= 1; //   we have exactly the desired bits.
        }

        return (n + x) / d; // Form the number within [0, 1).
      };
    };

    module.exports.resetGlobal = function () {
      Math.random = oldRandom;
    }; //
    // ARC4
    //
    // An ARC4 implementation.  The constructor takes a key in the form of
    // an array of at most (width) integers that should be 0 <= x < (width).
    //
    // The g(count) method returns a pseudorandom integer that concatenates
    // the next (count) outputs from ARC4.  Its return value is a number x
    // that is in the range 0 <= x < (width ^ count).
    //

    /** @constructor */


    function ARC4(key) {
      var t,
          keylen = key.length,
          me = this,
          i = 0,
          j = me.i = me.j = 0,
          s = me.S = []; // The empty key [] is treated as [0].

      if (!keylen) {
        key = [keylen++];
      } // Set up S using the standard key scheduling algorithm.


      while (i < width) {
        s[i] = i++;
      }

      for (i = 0; i < width; i++) {
        s[i] = s[j = mask & j + key[i % keylen] + (t = s[i])];
        s[j] = t;
      } // The "g" method returns the next (count) outputs as one number.


      (me.g = function (count) {
        // Using instance members instead of closure state nearly doubles speed.
        var t,
            r = 0,
            i = me.i,
            j = me.j,
            s = me.S;

        while (count--) {
          t = s[i = mask & i + 1];
          r = r * width + s[mask & (s[i] = s[j = mask & j + t]) + (s[j] = t)];
        }

        me.i = i;
        me.j = j;
        return r; // For robust unpredictability discard an initial batch of values.
        // See http://www.rsa.com/rsalabs/node.asp?id=2009
      })(width);
    } //
    // flatten()
    // Converts an object tree to nested arrays of strings.
    //


    function flatten(obj, depth) {
      var result = [],
          typ = (typeof obj)[0],
          prop;

      if (depth && typ == 'o') {
        for (prop in obj) {
          try {
            result.push(flatten(obj[prop], depth - 1));
          } catch (e) {}
        }
      }

      return result.length ? result : typ == 's' ? obj : obj + '\0';
    } //
    // mixkey()
    // Mixes a string seed into a key that is an array of integers, and
    // returns a shortened string seed that is equivalent to the result key.
    //


    function mixkey(seed, key) {
      var stringseed = seed + '',
          smear,
          j = 0;

      while (j < stringseed.length) {
        key[mask & j] = mask & (smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++);
      }

      return tostring(key);
    } //
    // autoseed()
    // Returns an object for autoseeding, using window.crypto if available.
    //

    /** @param {Uint8Array=} seed */


    function autoseed(seed) {
      try {
        GLOBAL.crypto.getRandomValues(seed = new Uint8Array(width));
        return tostring(seed);
      } catch (e) {
        return [+new Date(), GLOBAL, GLOBAL.navigator && GLOBAL.navigator.plugins, GLOBAL.screen, tostring(pool)];
      }
    } //
    // tostring()
    // Converts an array of charcodes to a string
    //


    function tostring(a) {
      return String.fromCharCode.apply(0, a);
    } //
    // When seedrandom.js is loaded, we immediately mix a few bits
    // from the built-in RNG into the entropy pool.  Because we do
    // not want to intefere with determinstic PRNG state later,
    // seedrandom will not call Math.random on its own again after
    // initialization.
    //


    mixkey(Math.random(), pool);
  });
  var seedRandom_1 = seedRandom.resetGlobal;

  const seed = 1018;
  const biomeFactor = 4;
  const biomes = {
    "desert": {
      "weight": 1
    },
    "river": {
      "weight": 2
    },
    "mountain": {
      "weight": 1
    },
    "plains": {
      "weight": 2
    },
    "forest": {
      "weight": 2
    },
    "ocean": {
      "weight": 1
    }
  };
  class HillyGenerator {
    constructor(chunkMap) {
      {
        this.simplex = new OpenSimplexNoise( seed );
        this.noise2D = this.simplex.noise2D.bind(this.simplex);
        this.noise3D = this.simplex.noise3D.bind(this.simplex);
      }

      this.chunkMap = chunkMap;
      this.seafloor = 3 / 10;
      this.sealevel = 4 / 10;
      this.terraincap = 7 / 10;
    }

    biome(chunk) {
      if (chunk.biome) return;
      chunk.rng = seedRandom("" + chunk.id);
      chunk.biome = this.calculateBiome(chunk);
      chunk.center = fromValues$1((chunk.x + chunk.rng()) * Chunk.width, (chunk.y + chunk.rng()) * Chunk.height);
    }

    calculateBiome(chunk) {
      var rivers = 1 - Math.abs(this.noise2D(chunk.x / 8 + 5.5, chunk.y / 8) * 2);
      if (rivers > .89) return "river"; // return "forest"

      var roughness = (this.noise2D(chunk.x / 20 + .5, chunk.y / 20) * 2 + this.noise2D(chunk.x / 200 + .5, chunk.y / 200)) / 3;
      var moisture = (this.noise2D(chunk.x / 15 + .5, chunk.y / 15) * 2 + this.noise2D(chunk.x / 150 + .5, chunk.y / 150)) / 3; // return ["ocean","mountain","desert","plains","forest"][Math.floor(chunk.rng()*5)]
      // return "plains"
      // return roughness>0?"ocean":"forest"

      if (moisture > .05) return "ocean";
      if (roughness > .1) return "mountain";
      if (moisture < -.2) return "desert";
      if (roughness < .1 && moisture > -.1) return "forest";
      return "plains";
    }

    generate(chunk) {
      if (chunk.map) return;
      this.chunkMap.neighbors(chunk, 9, this.biome.bind(this));
      if (!chunk.rng) debugger;
      var xBase = chunk.x;
      var yBase = chunk.y;
      var width = Chunk.width;
      var height = Chunk.height;
      var depth = Chunk.depth;
      this.lower = depth * this.seafloor;
      this.middle = depth * this.sealevel;
      this.higher = depth * this.terraincap;
      var wh = width * height;
      var whd = wh * depth;
      var blockMap = new Uint8Array(whd);
      var heightMap = new Uint8Array(wh);

      for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
          var highestBlock = 0;
          var samples = {};
          var curr = fromValues$1(x + xBase * width, y + yBase * height);
          var nearest = this.chunkMap.nearest(9, curr);
          var bestBiome;
          var sumInvDist = 0;

          for (var i = 0; i < nearest.length; i++) {
            var checkChunk = nearest[i];
            checkChunk.invDist = (checkChunk.dist ? 1 / Math.pow(checkChunk.dist, biomeFactor) : 1) * biomes[checkChunk.biome].weight;
            sumInvDist += checkChunk.invDist;
          }

          var totalInvDist = 0;

          for (var i = 0; i < nearest.length; i++) {
            var neighbor = nearest[i];
            var invDist = neighbor.invDist / sumInvDist;
            samples[neighbor.biome] = samples[neighbor.biome] ? samples[neighbor.biome] + invDist : invDist;

            if (!bestBiome || samples[neighbor.biome] > samples[bestBiome]) {
              bestBiome = neighbor.biome;
            }

            totalInvDist += invDist;
          }

          var mountainSample = samples["mountain"] / totalInvDist;
          var desertSample = samples["desert"] / totalInvDist;
          var forestSample = samples["forest"] / totalInvDist;
          var plainsSample = samples["plains"] / totalInvDist;
          var oceanSample = samples["ocean"] / totalInvDist;
          var riverSample = samples["river"] / totalInvDist;
          var eh = 0;

          if (mountainSample > 0) {
            var mountain = this.noise2D((x + xBase * width) / 60, (y + yBase * height) / 60);
            mountain += this.noise2D((x + xBase * width) / 30, (y + yBase * height) / 30) * .5;
            mountain += this.noise2D((x + xBase * width) / 15, (y + yBase * height) / 15) * .25;
            mountain /= 1.75;

            var _mountain = Math.sign(mountain) * Math.pow(mountain < 0 ? -mountain : mountain, 1.1);

            _mountain = _mountain * .7 + .15;
            eh += _mountain * mountainSample;
          }

          if (plainsSample > 0) {
            var plains = this.noise2D((x + xBase * width) / 70, (y + yBase * height) / 70);
            plains += this.noise2D((x + xBase * width) / 35, (y + yBase * height) / 35) * .5;
            plains /= 1.5;

            var _plains = Math.sign(plains) * Math.pow(plains < 0 ? -plains : plains, 1.5);

            _plains = _plains * .2 + .05;
            eh += _plains * plainsSample;
          }

          if (desertSample > 0) {
            var dunes = 1 - Math.abs(this.noise2D((x + xBase * width) / 40, (y + yBase * height) / 40));
            var flat = this.noise2D((x + xBase * width) / 30, (y + yBase * height) / 30);
            flat += this.noise2D((x + xBase * width) / 15, (y + yBase * height) / 15) * .5;
            flat /= 1.5;

            var _flat = Math.sign(flat) * Math.pow(flat < 0 ? -flat : flat, 2.5);

            _flat = _flat * .2 + .04;
            eh += Math.max(_flat, (dunes * .2 * 2 + _flat) / 3) * desertSample;
          }

          if (forestSample > 0) {
            var forest = this.noise2D((x + xBase * width) / 80, (y + yBase * height) / 80);
            forest += this.noise2D((x + xBase * width) / 40, (y + yBase * height) / 40) * .5;
            forest += this.noise2D((x + xBase * width) / 20, (y + yBase * height) / 20) * .25;
            forest /= 1.75;

            var _forest = Math.sign(forest) * Math.pow(forest < 0 ? -forest : forest, 1.5);

            _forest = _forest * .15 + .04;
            eh += _forest * forestSample;
          }

          if (oceanSample > 0) {
            var oceans = this.noise2D((x + xBase * width) / 80, (y + yBase * height) / 80);
            oceans += this.noise2D((x + xBase * width) / 40, (y + yBase * height) / 40) * .5;
            oceans /= 1.5;

            var _oceans = Math.sign(oceans) * Math.pow(oceans < 0 ? -oceans : oceans, 1.5);

            _oceans = _oceans * .4 - .5;
            eh += _oceans * oceanSample;
          }

          if (riverSample > 0) {
            var noise = this.noise2D((x + xBase * width) / 40, (y + yBase * height) / 40);
            noise += this.noise2D((x + xBase * width) / 20, (y + yBase * height) / 20) * .5;
            noise += this.noise2D((x + xBase * width) / 10, (y + yBase * height) / 10) * .25;
            noise /= 1.75;

            var _noise = Math.sign(noise) * Math.pow(noise < 0 ? -noise : noise, 1.2);

            _noise = _noise * .15 - .2;
            eh += _noise * riverSample;
          } // debugger
          // eh = (eh * .5) + .5
          // eh = Math.pow(eh, smooth)


          if (isNaN(eh)) {
            debugger;
          }

          var heightHere = this.middle + eh * (eh < 0 ? this.middle - this.lower : this.higher - this.middle);
          console.assert(heightHere > 0);
          var snowModifier = this.noise2D((x + xBase * width) / 100, (y + yBase * height) / 100) * .5 + .5;
          var palette = [2, 6, 1, 2]; // grass, dirt, stone.... grass shores

          if (bestBiome == "desert") palette = [10, 10, 11, 2]; // sand, sand, sandstone... grass shores

          if (bestBiome == "ocean") palette = [12, 10, 1, 10]; // marsh, sand, stone... sand shores

          for (var z = 0; z < depth; z++) {
            if (z >= heightHere) {
              if (z < depth * this.sealevel) {
                blockMap[Chunk.index3d(x, y, z)] = 9;

                if (z > highestBlock) {
                  highestBlock = z;
                }
              } else {
                continue;
              }
            } else {
              if (z > highestBlock) {
                highestBlock = z;
              }

              if (z > this.higher - 15 + 10 * snowModifier) {
                blockMap[Chunk.index3d(x, y, z)] = 5;
              } else if (z < heightHere - 3) {
                blockMap[Chunk.index3d(x, y, z)] = palette[2];
              } else if (z < heightHere - 1) {
                blockMap[Chunk.index3d(x, y, z)] = z < this.middle + 1 ? palette[3] : palette[1];
              } else {
                blockMap[Chunk.index3d(x, y, z)] = z < this.middle + 1 ? palette[3] : palette[0];
              }
            }
          }

          heightMap[Chunk.index2d(x, y)] = highestBlock;
        }
      } // console.log("minmax", min, max)


      chunk.map = blockMap;
      chunk.heights = heightMap;
      var structures = new Uint8Array(wh);
      chunk.structures = [];

      if (chunk.biome == "forest") {
        for (var i = 0; i < 5; i++) {
          var x = Math.floor(chunk.rng() * width),
              y = Math.floor(chunk.rng() * height);
          var id = Chunk.index2d(x, y);
          if (structures[id]) continue;
          structures[id] = 1;
          var top = chunk.heights[id] + 1;
          if (top >= depth - 10) continue;
          if (chunk.at(x, y, top - 1) != 2) continue;
          chunk.structures.push(["tree", x + chunk.x * width, y + chunk.y * height, top]);
        }

        for (var i = 0; i < 10; i++) {
          var x = Math.floor(chunk.rng() * width),
              y = Math.floor(chunk.rng() * height);
          var id = Chunk.index2d(x, y);
          if (structures[id]) continue;
          structures[id] = 1;
          var top = chunk.heights[id] + 1;
          if (top >= depth - 10) continue;
          if (chunk.at(x, y, top - 1) != 2) continue;
          chunk.structures.push(["tuft", x + chunk.x * width, y + chunk.y * height, top]);
        }

        for (var i = 0; i < 5; i++) {
          var x = Math.floor(chunk.rng() * width),
              y = Math.floor(chunk.rng() * height);
          var id = Chunk.index2d(x, y);
          if (structures[id]) continue;
          structures[id] = 1;
          var top = chunk.heights[id] + 1;
          if (top >= depth - 10) continue;
          if (chunk.at(x, y, top - 1) != 2) continue;
          chunk.structures.push(["plant", x + chunk.x * width, y + chunk.y * height, top]);
        }
      }

      if (chunk.biome == "plains") {
        for (var i = 0; i < 5; i++) {
          var x = Math.floor(chunk.rng() * width),
              y = Math.floor(chunk.rng() * height);
          var id = Chunk.index2d(x, y);
          if (structures[id]) continue;
          structures[id] = 1;
          var top = chunk.heights[id] + 1;
          if (top >= depth - 10) continue;
          if (chunk.at(x, y, top - 1) != 2) continue;
          chunk.structures.push(["plant", x + chunk.x * width, y + chunk.y * height, top]);
        }

        for (var i = 0; i < 15; i++) {
          var x = Math.floor(chunk.rng() * width),
              y = Math.floor(chunk.rng() * height);
          var id = Chunk.index2d(x, y);
          if (structures[id]) continue;
          structures[id] = 1;
          var top = chunk.heights[id] + 1;
          if (top >= depth - 10) continue;
          if (chunk.at(x, y, top - 1) != 2) continue;
          chunk.structures.push(["tuft", x + chunk.x * width, y + chunk.y * height, top]);
        }

        for (var i = 0; i < 1; i++) {
          var x = Math.floor(chunk.rng() * width),
              y = Math.floor(chunk.rng() * height);
          var id = Chunk.index2d(x, y);
          if (structures[id]) continue;
          structures[id] = 1;
          var top = chunk.heights[id] + 1;
          if (top >= depth - 10) continue;
          if (chunk.at(x, y, top - 1) != 2) continue;
          chunk.structures.push(["tree", x + chunk.x * width, y + chunk.y * height, top]);
        }
      }

      if (chunk.biome == "desert") {
        for (var i = 0; i < 15; i++) {
          var x = Math.floor(chunk.rng() * width),
              y = Math.floor(chunk.rng() * height);
          var id = Chunk.index2d(x, y);
          if (structures[id]) continue;
          structures[id] = 1;
          var top = chunk.heights[id] + 1;
          if (top >= depth - 10) continue;
          if (chunk.at(x, y, top - 1) != 10) continue;
          chunk.structures.push(["twig", x + chunk.x * width, y + chunk.y * height, top]);
        }
      }

      chunk.rng = false;
      console.log("done with rng", chunk.id);
      return chunk;
    }

    populateChunk(chunk) {
      if (chunk.populated) return;
      this.chunkMap.neighbors(chunk, 9, this.generate.bind(this));
      var item;

      while (item = chunk.structures.pop()) {
        if (item[0] == "tree") {
          var [, x, y, z] = item;
          this.growTree(x, y, z);
        }

        if (item[0] == "plant") {
          var [, x, y, z] = item;
          this.chunkMap.set(x, y, z, 7);
        }

        if (item[0] == "tuft") {
          var [, x, y, z] = item;
          this.chunkMap.set(x, y, z, 8);
        }

        if (item[0] == "twig") {
          var [, x, y, z] = item;
          this.chunkMap.set(x, y, z, 13);
        }
      }

      chunk.populated = true;
    }

    growTree(x, y, z) {
      var baseSize = Math.floor(6 + this.noise2D(x / 100, y / 100) * 5);
      var treeSize = Math.floor(6 + this.noise2D(x / 150, y / 150) * 5);

      for (var i = 0; i < baseSize; i++) {
        this.chunkMap.set(x, y, z + i, 3);
      }

      for (var i = -1; i < treeSize + 1; i++) {
        var radius = baseSize / 2 * (1 - Math.abs(i / treeSize));
        var scanArea = Math.ceil(radius);

        for (var xLeaf = x - scanArea; xLeaf <= x + scanArea; xLeaf++) {
          for (var yLeaf = y - scanArea; yLeaf <= y + scanArea; yLeaf++) {
            this.chunkMap.setIf(xLeaf, yLeaf, z + baseSize + i, 4);
          }
        }
      }
    }

  }

  class RadiosityLights {
    constructor(chunks, gen) {
      this.chunks = chunks;
      this.structures = gen;
    }

    seedLights(chunk) {
      if (chunk.lights) return;
      this.structures(chunk);
      var lightMap = new Uint8Array(Chunk.width * Chunk.height * Chunk.depth);

      for (var x = 0; x < Chunk.width; x++) {
        for (var y = 0; y < Chunk.height; y++) {
          for (var z = Chunk.depth - 1; z > chunk.heights[Chunk.index2d(x, y)]; z--) {
            lightMap[Chunk.index3d(x, y, z)] = 15;
          }
        }
      }

      chunk.lights = lightMap;
    }

    buildLightList(chunk) {
      if (chunk.initialLighting) return false;
      this.chunks.neighbors(chunk, 9, this.seedLights.bind(this));
      chunk.initialLighting = true;
      var nChunk = this.chunks.getChunk(chunk.x, chunk.y - 1);
      var eChunk = this.chunks.getChunk(chunk.x + 1, chunk.y);
      var sChunk = this.chunks.getChunk(chunk.x, chunk.y + 1);
      var wChunk = this.chunks.getChunk(chunk.x - 1, chunk.y);
      var width = Chunk.width;
      var height = Chunk.height;
      var depth = Chunk.depth;
      var lights = [];

      for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
          var heightHere = chunk.heights[Chunk.index2d(x, y)];
          lights.push([x, y, heightHere + 1, 15, 5]);
          var optimizeLights = true; //(x > 0 && x < width - 1 && y > 0 && y < height - 1)

          var highestNeighbor = depth;

          if (optimizeLights) {
            var a = x > 0 ? chunk.heights[Chunk.index2d(x - 1, y)] : heightHere;
            var b = y > 0 ? chunk.heights[Chunk.index2d(x, y - 1)] : heightHere;
            var c = x < width - 1 ? chunk.heights[Chunk.index2d(x + 1, y)] : heightHere;
            var d = y < height - 1 ? chunk.heights[Chunk.index2d(x, y + 1)] : heightHere;
            highestNeighbor = Math.max(a, b, c, d);
          }

          for (var z = highestNeighbor; z > heightHere + 1; z--) {
            lights.push([x, y, z, 13, 5]);
          }
        }
      }

      for (var z = 0; z < depth; z++) {
        var light;

        for (var x = 0; x < width; x++) {
          light = sChunk.lights[Chunk.index3d(x, 0, z)];
          if (light > chunk.lights[Chunk.index3d(x, height - 1, z)]) lights.push([x, height, z,, 0]);
          light = nChunk.lights[Chunk.index3d(x, height - 1, z)];
          if (light > chunk.lights[Chunk.index3d(x, 0, z)]) lights.push([x, -1, z, light, 2]);
        }

        for (var y = 0; y < height; y++) {
          light = eChunk.lights[Chunk.index3d(0, y, z)];
          if (light > chunk.lights[Chunk.index3d(width - 1, y, z)]) lights.push([width, y, z, light, 3]);
          light = wChunk.lights[Chunk.index3d(width - 1, y, z)];
          if (light > chunk.lights[Chunk.index3d(0, y, z)]) lights.push([-1, y, z, light, 1]);
        }
      }

      this.propagateLights(chunk, lights);
      return true;
    }

    propagateLights(chunk, lights) {
      var width = Chunk.width;
      var height = Chunk.height;
      var depth = Chunk.depth;
      var count = 0;

      while (lights.length > 0) {
        count++;

        if (lights.length > 1000000) {
          console.assert(lights.length < 1000000);
        }

        var light = lights.pop();
        var x = light[0],
            y = light[1],
            z = light[2];
        var lesslight = light[3] - 1,
            direction = light[4];

        if (z < depth) {
          if (x > 0 && y >= 0 && y < height) {
            var centerIndex = Chunk.index3d(x - 1, y, z);
            var target = blocks[chunk.map[centerIndex]];
            var loss = target.culls == 3 ? 15 : target.culls == 2 ? target.density : target.culls == 1 ? 1 : 0;
            var translight = lesslight - (loss + (direction == 3 ? 0 : 1));
            var targetLight = chunk.lights[centerIndex];

            if (targetLight < translight) {
              chunk.lights[centerIndex] = translight;

              if (translight > 0) {
                lights.push([x - 1, y, z, translight, 3]);
              }
            }
          }

          if (x < width - 1 && y >= 0 && y < height) {
            var centerIndex = Chunk.index3d(x + 1, y, z);
            var target = blocks[chunk.map[centerIndex]];
            var loss = target.culls == 3 ? 15 : target.culls == 2 ? target.density : target.culls == 1 ? 1 : 0;
            var translight = lesslight - (loss + (direction == 1 ? 0 : 1));
            var targetLight = chunk.lights[centerIndex];

            if (targetLight < translight) {
              chunk.lights[centerIndex] = translight;

              if (translight > 0) {
                lights.push([x + 1, y, z, translight, 1]);
              }
            }
          }

          if (y > 0 && x >= 0 && x < width) {
            var centerIndex = Chunk.index3d(x, y - 1, z);
            var target = blocks[chunk.map[centerIndex]];
            var loss = target.culls == 3 ? 15 : target.culls == 2 ? target.density : target.culls == 1 ? 1 : 0;
            var translight = lesslight - (loss + (direction == 0 ? 0 : 1));
            var targetLight = chunk.lights[centerIndex];

            if (targetLight < translight) {
              chunk.lights[centerIndex] = translight;

              if (translight > 0) {
                lights.push([x, y - 1, z, translight, 0]);
              }
            }
          }

          if (y < height - 1 && x >= 0 && x < width) {
            var centerIndex = Chunk.index3d(x, y + 1, z);
            var target = blocks[chunk.map[centerIndex]];
            var loss = target.culls == 3 ? 15 : target.culls == 2 ? target.density : target.culls == 1 ? 1 : 0;
            var translight = lesslight - (loss + (direction == 2 ? 0 : 1));
            var targetLight = chunk.lights[centerIndex];

            if (targetLight < translight) {
              chunk.lights[centerIndex] = translight;

              if (translight > 0) {
                lights.push([x, y + 1, z, translight, 2]);
              }
            }
          }

          if (z < depth - 1 && x >= 0 && x < width && y >= 0 && y < height) {
            var centerIndex = Chunk.index3d(x, y, z + 1);
            var target = blocks[chunk.map[centerIndex]];
            var loss = target.culls == 3 ? 15 : target.culls == 2 ? target.density : target.culls == 1 ? 1 : 0;
            var translight = lesslight - (loss + (direction == 4 ? 0 : 1));
            var targetLight = chunk.lights[centerIndex];

            if (targetLight < translight) {
              chunk.lights[centerIndex] = translight;

              if (translight > 0) {
                lights.push([x, y, z + 1, translight, 4]);
              }
            }
          }
        }

        if (z > 0 && x >= 0 && x < width && y >= 0 && y < height) {
          var centerIndex = Chunk.index3d(x, y, z - 1);
          var target = blocks[chunk.map[centerIndex]];
          var loss = target.culls == 3 ? 15 : target.culls == 2 ? target.density : target.culls == 1 ? 1 : 0;
          var translight = lesslight - (loss + (direction == 5 ? 0 : 1));
          var targetLight = chunk.lights[centerIndex];

          if (targetLight < translight) {
            chunk.lights[centerIndex] = translight;

            if (translight > 0) {
              lights.push([x, y, z - 1, translight, 5]);
            }
          }
        }
      }

      return count;
    }

  }

  function initShaderProgram(gl, vsSource, fsSource) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
      return null;
    }

    return shaderProgram;
  }
  function loadShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }
  function loadTextureAtlas(gl, url, num_images) {
    console.assert(isPowerOf2(num_images));
    const texture = gl.createTexture(); // Because images have to be download over the internet
    // they might take a moment until they are ready.
    // Until then put a single pixel in the texture so we can
    // use it immediately. When the image has finished downloading
    // we'll update the texture with the contents of the image.

    const level = 0;
    const internalFormat = gl.RGBA;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    var imagesPerRow = Math.sqrt(num_images);
    const pixels = new Uint8Array(imagesPerRow * 4); // opaque blue

    for (var i = 0; i < pixels.length; i += 4) {
      pixels[i + 3] = 255;
    }

    pixels[1] = 255;
    pixels[4] = 100;
    pixels[5] = 100;
    pixels[6] = 100;
    console.log("setting texture 0 to image", pixels);
    gl.bindTexture(gl.TEXTURE_2D_ARRAY, texture);
    gl.texImage3D(gl.TEXTURE_2D_ARRAY, level, internalFormat, 1, 1, imagesPerRow, border, srcFormat, srcType, pixels);
    console.log("loading in to overwrite pixels", url);
    const image = new Image();

    image.onload = function () {
      gl.bindTexture(gl.TEXTURE_2D_ARRAY, texture);
      let maxLevel = 100;
      var fullImage = document.createElement('canvas');
      fullImage.width = image.width;
      fullImage.height = image.height;
      var fullCtx = fullImage.getContext('2d');
      fullCtx.clearRect(0, 0, fullImage.width, fullImage.height);
      fullCtx.drawImage(image, 0, 0);
      var sizeOfSource = image.width / imagesPerRow;

      for (let level = 0; level <= maxLevel; level++) {
        var scale = Math.pow(2, level);
        var sizeOfTarget = sizeOfSource / scale;

        if (sizeOfTarget < 1) {
          maxLevel = level - 1;
          break;
        } // use canvas to get the pixel data array of the image


        var canvas = document.createElement('canvas');
        canvas.width = sizeOfTarget;
        canvas.height = sizeOfTarget * num_images;
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var y = 0;

        for (var j = 0; j < imagesPerRow; j++) {
          for (var i = 0; i < imagesPerRow; i++) {
            drawImageScaled(ctx, fullCtx, i * sizeOfSource, j * sizeOfSource, sizeOfSource, 0, y, scale);
            y += sizeOfTarget;
          }
        }

        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let pixels = new Uint8Array(imageData.data.buffer);
        console.log("extracting array from image", {
          sizeOfTarget: sizeOfTarget,
          height: image.height,
          imagesPerRow: imagesPerRow,
          sizeOfSource: sizeOfSource,
          width: image.width,
          bytes: pixels.length
        }); // document.body.appendChild(canvas)
        // -- Init Texture

        gl.texImage3D(gl.TEXTURE_2D_ARRAY, level, gl.RGBA, sizeOfTarget, sizeOfTarget, num_images, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        var err = gl.getError();

        if (err) {
          console.error(err);
        }
      }

      gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MAX_LEVEL, maxLevel);
      gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST);
      gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_WRAP_T, gl.REPEAT);
    };

    image.src = url;
    return texture;
  }

  function isPowerOf2(value) {
    return (value & value - 1) == 0;
  }

  function drawImageScaled(ctx, image, sx, sy, size, dx, dy, scale) {
    var singlePixel = ctx.getImageData(0, 0, 1, 1);

    for (let x = 0; x < size / scale; x += 1) {
      for (let y = 0; y < size / scale; y += 1) {
        if (!getAveragePixel(image, singlePixel.data, sx + x * scale, sy + y * scale, scale)) continue;
        ctx.putImageData(singlePixel, dx + x, dy + y);
      }
    } // ctx.drawImage(image, sx, sy, size, size, dx, dy, size/scale, size/scale);

  }

  function getAveragePixel(image, dst, x, y, scale) {
    let pixels = 0,
        r = 0,
        b = 0,
        g = 0,
        a = 0;
    let data = image.getImageData(x, y, scale, scale).data;
    if (!data) debugger;

    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] < 4) {
        continue;
      }

      pixels += 1;
      r += data[i + 0];
      g += data[i + 1];
      b += data[i + 2];
      a += data[i + 3];
    }

    if (pixels < scale * scale * .4) {
      return false;
    }

    dst[0] = Math.floor(r / pixels);
    dst[1] = Math.floor(g / pixels);
    dst[2] = Math.floor(b / pixels);
    dst[3] = Math.floor(a / pixels);
    return true;
  }

  class ChunkMesh {
    constructor(x, y, regular, unculled, transparent) {
      this.x = x;
      this.y = y;
      this.id = x + "," + y;
      this.regular = {
        mesh: regular.combine()
      };
      this.regular.length = this.regular.mesh.length / regular.attrs;
      this.unculled = {
        mesh: unculled.combine()
      };
      this.unculled.length = this.unculled.mesh.length / unculled.attrs;
      this.transparent = {
        mesh: transparent.combine()
      };
      this.transparent.length = this.transparent.mesh.length / transparent.attrs;
    }

    buffers() {
      return [this.regular.mesh.buffer, this.unculled.mesh.buffer, this.transparent.mesh.buffer];
    }

  }

  class MeshBuilder {
    constructor(size, attrs) {
      this.size = size;
      this.attrs = attrs;
      this.array = new Uint8Array(this.attrs * this.size);
      this.index = 0;
      this.arrays = [];
      this.totalLength = 0;
    }

    ensure(padding) {
      if (this.index + this.attrs * padding <= this.array.length) {
        return;
      } // this.arrays.push(this.array.subarray(0, this.index))


      this.arrays.push(this.array);
      this.array = new Uint8Array(this.attrs * this.size);
      this.totalLength += this.index;
      this.index = 0;
    }

    combine() {
      if (this.index === 0) {
        return new Uint8Array(0);
      }

      if (this.arrays.length === 0) {
        var arr = this.array.slice(0, this.index);
        this.index = 0;
        return arr;
      }

      this.totalLength += this.index;
      var bigArray = new Uint8Array(this.totalLength);
      var offset = 0;

      for (var i = 0; i < this.arrays.length; i++) {
        var len = this.arrays[i].length;
        bigArray.set(this.arrays[i], offset);
        offset += len;
      }

      bigArray.set(this.array.subarray(0, this.index), offset);
      this.arrays = [];
      this.totalLength = 0;
      this.index = 0;
      return bigArray;
    }

    add7(x, y, z, light, tx, ty, atlas) {
      this.ensure(1);
      this.array[this.index] = x;
      this.array[this.index + 1] = y;
      this.array[this.index + 2] = z;
      this.array[this.index + 3] = light;
      this.array[this.index + 4] = tx;
      this.array[this.index + 5] = ty;
      this.array[this.index + 6] = atlas;
      this.index += 7;
    }

  }

  var texScale = 16 / 256,
      tlPadding = 2 / 256,
      texWidth = texScale - 4 / 256;
  const faces = [{
    // north
    pt1: {
      x: 1,
      y: 0,
      z: 1,
      aos: [0, 2, 1],
      masks: [4, 1]
    },
    pt2: {
      x: 0,
      y: 0,
      z: 1,
      aos: [0, 6, 7],
      masks: [4, 3]
    },
    pt3: {
      x: 1,
      y: 0,
      z: 0,
      aos: [2, 4, 3],
      masks: [5, 1]
    },
    pt4: {
      x: 0,
      y: 0,
      z: 0,
      aos: [4, 6, 5],
      masks: [5, 3]
    },
    offsetX: 0,
    offsetY: -1,
    offsetZ: 0,
    neighbors: [[0, -1, 1], [1, -1, 1], [1, -1, 0], [1, -1, -1], [0, -1, -1], [-1, -1, -1], [-1, -1, 0], [-1, -1, 1]]
  }, {
    // east
    pt1: {
      x: 1,
      y: 1,
      z: 1,
      aos: [0, 6, 7],
      masks: [4, 2]
    },
    pt2: {
      x: 1,
      y: 0,
      z: 1,
      aos: [0, 2, 1],
      masks: [4, 0]
    },
    pt3: {
      x: 1,
      y: 1,
      z: 0,
      aos: [4, 6, 5],
      masks: [5, 2]
    },
    pt4: {
      x: 1,
      y: 0,
      z: 0,
      aos: [2, 4, 3],
      masks: [5, 0]
    },
    offsetX: +1,
    offsetY: 0,
    offsetZ: 0,
    neighbors: [[1, 0, 1], [1, -1, 1], [1, -1, 0], [1, -1, -1], [1, 0, -1], [1, 1, -1], [1, 1, 0], [1, 1, 1]]
  }, {
    // south
    pt1: {
      x: 0,
      y: 1,
      z: 1,
      aos: [0, 6, 7],
      masks: [4, 3]
    },
    pt2: {
      x: 1,
      y: 1,
      z: 1,
      aos: [0, 2, 1],
      masks: [4, 1]
    },
    pt3: {
      x: 0,
      y: 1,
      z: 0,
      aos: [4, 6, 5],
      masks: [5, 3]
    },
    pt4: {
      x: 1,
      y: 1,
      z: 0,
      aos: [2, 4, 3],
      masks: [5, 1]
    },
    offsetX: 0,
    offsetY: +1,
    offsetZ: 0,
    neighbors: [[0, 1, 1], [1, 1, 1], [1, 1, 0], [1, 1, -1], [0, 1, -1], [-1, 1, -1], [-1, 1, 0], [-1, 1, 1]]
  }, {
    // west
    pt1: {
      x: 0,
      y: 0,
      z: 1,
      aos: [0, 2, 1],
      masks: [4, 0]
    },
    pt2: {
      x: 0,
      y: 1,
      z: 1,
      aos: [0, 6, 7],
      masks: [4, 2]
    },
    pt3: {
      x: 0,
      y: 0,
      z: 0,
      aos: [2, 4, 3],
      masks: [5, 0]
    },
    pt4: {
      x: 0,
      y: 1,
      z: 0,
      aos: [4, 6, 5],
      masks: [5, 2]
    },
    offsetX: -1,
    offsetY: 0,
    offsetZ: 0,
    neighbors: [[-1, 0, 1], [-1, -1, 1], [-1, -1, 0], [-1, -1, -1], [-1, 0, -1], [-1, 1, -1], [-1, 1, 0], [-1, 1, 1]]
  }, {
    // higher
    pt1: {
      x: 0,
      y: 0,
      z: 1,
      aos: [0, 6, 7],
      masks: [0, 3]
    },
    pt2: {
      x: 1,
      y: 0,
      z: 1,
      aos: [0, 2, 1],
      masks: [0, 1]
    },
    pt3: {
      x: 0,
      y: 1,
      z: 1,
      aos: [4, 6, 5],
      masks: [2, 3]
    },
    pt4: {
      x: 1,
      y: 1,
      z: 1,
      aos: [2, 4, 3],
      masks: [2, 1]
    },
    offsetX: 0,
    offsetY: 0,
    offsetZ: +1,
    neighbors: [[0, -1, 1], [1, -1, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1], [-1, 1, 1], [-1, 0, 1], [-1, -1, 1]]
  }, {
    // lower
    pt1: {
      x: 0,
      y: 0,
      z: 0,
      aos: [0, 2, 1],
      masks: [0, 3]
    },
    pt2: {
      x: 1,
      y: 0,
      z: 0,
      aos: [0, 6, 7],
      masks: [0, 1]
    },
    pt3: {
      x: 0,
      y: 1,
      z: 0,
      aos: [2, 4, 3],
      masks: [2, 3]
    },
    pt4: {
      x: 1,
      y: 1,
      z: 0,
      aos: [4, 6, 5],
      masks: [2, 1]
    },
    offsetX: 0,
    offsetY: 0,
    offsetZ: -1,
    neighbors: [[0, -1, -1], [1, -1, -1], [1, 0, -1], [1, 1, -1], [0, 1, -1], [-1, 1, -1], [-1, 0, -1], [-1, -1, -1]]
  }];
  class BrilliantSurfaceExtractor {
    constructor() {
      this.method = "random";
      texScale = 0;
      texWidth = 1;
      tlPadding = 0;
      this.unculled = new MeshBuilder(5000, 7);
      this.regular = new MeshBuilder(5000, 7);
      this.transparent = new MeshBuilder(5000, 7);
    }

    occludes(check, targetID) {
      if (check === 0) return 0;
      let block = blocks[check];
      if (block.culls === 3) return 1;

      if (block.culls === 2) {
        if (block.type == 0) {
          return targetID === check ? 2 : 0;
        }

        return 0;
      }

      if (block.culls === 1) return targetID === check ? 1 : 0;
      return 0;
    }

    renderCross(chunk, block, target, x, y, z) {
      var atlas = block.atlas;
      let topLight = chunk.lights[PaddedChunk.index3d(x, y, z)] * 4;
      var tx = atlas % 16 * texScale + tlPadding,
          ty = Math.floor(atlas / 16) * texScale + tlPadding; // nw to se

      target.add7(x + 0, y + 0, z, topLight, tx, ty + texWidth, atlas);
      target.add7(x + 1, y + 1, z, topLight, tx + texWidth, ty + texWidth, atlas);
      target.add7(x + 1, y + 1, z + 1, topLight, tx + texWidth, ty, atlas);
      target.add7(x + 0, y + 0, z, topLight, tx, ty + texWidth, atlas);
      target.add7(x + 1, y + 1, z + 1, topLight, tx + texWidth, ty, atlas);
      target.add7(x + 0, y + 0, z + 1, topLight, tx, ty, atlas); // sw to ne

      target.add7(x + 0, y + 1, z + 1, topLight, tx, ty, atlas);
      target.add7(x + 0, y + 1, z, topLight, tx, ty + texWidth, atlas);
      target.add7(x + 1, y + 0, z + 1, topLight, tx + texWidth, ty, atlas);
      target.add7(x + 0, y + 1, z, topLight, tx, ty + texWidth, atlas);
      target.add7(x + 1, y + 0, z, topLight, tx + texWidth, ty + texWidth, atlas);
      target.add7(x + 1, y + 0, z + 1, topLight, tx + texWidth, ty, atlas);
    }

    renderFace(chunk, block, target, x, y, z, face) {
      let lookup = faces[face];
      let light = chunk.light(x + lookup.offsetX, y + lookup.offsetY, z + lookup.offsetZ);
      let aos = [0, 0, 0, 0, 0, 0, 0, 0];

      for (let i = 0; i < 8; i++) {
        let ao = lookup.neighbors[i];
        let lightHere = chunk.light(x + ao[0], y + ao[1], z + ao[2]);
        aos[i] = lightHere;
      }

      let pt1 = light,
          pt2 = light,
          pt3 = light,
          pt4 = light;
      pt1 = aos[lookup.pt1.aos[0]] + aos[lookup.pt1.aos[1]] + aos[lookup.pt1.aos[2]] + light;
      pt2 = aos[lookup.pt2.aos[0]] + aos[lookup.pt2.aos[1]] + aos[lookup.pt2.aos[2]] + light;
      pt3 = aos[lookup.pt3.aos[0]] + aos[lookup.pt3.aos[1]] + aos[lookup.pt3.aos[2]] + light;
      pt4 = aos[lookup.pt4.aos[0]] + aos[lookup.pt4.aos[1]] + aos[lookup.pt4.aos[2]] + light;
      pt1 = pt1 < 0 ? 0 : pt1;
      pt2 = pt2 < 0 ? 0 : pt2;
      pt3 = pt3 < 0 ? 0 : pt3;
      pt4 = pt4 < 0 ? 0 : pt4;
      let atlas = block.atlas[face] || 0;
      let tx = atlas % 16 * texScale + tlPadding,
          ty = Math.floor(atlas / 16) * texScale + tlPadding;
      let tw = texWidth,
          th = texWidth;

      if (faceAttrs[atlas].mirror) {
        let a = (quickhash(x * 7) + quickhash(y * 11) + quickhash(z * 13)) % 4;
        let hFlip = a % 2 == 0,
            vFlip = a < 2;

        if (hFlip) {
          tx += tw;
          tw = -tw;
        }

        if (vFlip) {
          ty += th;
          th = -th;
        }
      }

      if (pt1 + pt4 < pt2 + pt3) {
        target.add7(x + lookup.pt1.x, y + lookup.pt1.y, z + lookup.pt1.z, pt1, tx, ty, atlas);
        target.add7(x + lookup.pt2.x, y + lookup.pt2.y, z + lookup.pt2.z, pt2, tx + tw, ty, atlas);
        target.add7(x + lookup.pt3.x, y + lookup.pt3.y, z + lookup.pt3.z, pt3, tx, ty + th, atlas);
        target.add7(x + lookup.pt3.x, y + lookup.pt3.y, z + lookup.pt3.z, pt3, tx, ty + th, atlas);
        target.add7(x + lookup.pt2.x, y + lookup.pt2.y, z + lookup.pt2.z, pt2, tx + tw, ty, atlas);
        target.add7(x + lookup.pt4.x, y + lookup.pt4.y, z + lookup.pt4.z, pt4, tx + tw, ty + th, atlas);
      } else {
        target.add7(x + lookup.pt2.x, y + lookup.pt2.y, z + lookup.pt2.z, pt2, tx + tw, ty, atlas);
        target.add7(x + lookup.pt4.x, y + lookup.pt4.y, z + lookup.pt4.z, pt4, tx + tw, ty + th, atlas);
        target.add7(x + lookup.pt1.x, y + lookup.pt1.y, z + lookup.pt1.z, pt1, tx, ty, atlas);
        target.add7(x + lookup.pt1.x, y + lookup.pt1.y, z + lookup.pt1.z, pt1, tx, ty, atlas);
        target.add7(x + lookup.pt4.x, y + lookup.pt4.y, z + lookup.pt4.z, pt4, tx + tw, ty + th, atlas);
        target.add7(x + lookup.pt3.x, y + lookup.pt3.y, z + lookup.pt3.z, pt3, tx, ty + th, atlas);
      }
    }

    tesselate(chunk) {
      var w = Chunk.width,
          h = Chunk.height;
      var pos = 0,
          wh = w * h;

      for (var _x = 0; _x < wh; _x++) {
        pos = (pos + 1687194493) % wh;
        var x = pos % w,
            y = Math.floor(pos / w);
        let column = chunk.heights[PaddedChunk.index2d(x, y)] + 1;

        for (let z = column; z > 0; z--) {
          // if (x == 5 && y == 0 && z == 10) debugger
          let here = chunk.at(x, y, z); // if (here==0 && z<100) debugger

          if (here == 0) continue;
          let block = blocks[here];
          let target = this.regular;
          if (block.culls == 1) target = this.transparent;
          if (block.culls == 2) target = this.unculled; // contains a cross

          if (block.culls === 2 && block.type == 1) {
            this.renderCross(chunk, block, target, x, y, z);
            continue;
          }

          for (let face = 0; face < 6; face++) {
            let lookup = faces[face];
            let other = chunk.at(x + lookup.offsetX, y + lookup.offsetY, z + lookup.offsetZ);
            let occ = this.occludes(other, here);

            if (occ === 2) {
              occ = lookup.offsetX < 0 || lookup.offsetY < 0 || lookup.offsetZ < 0 ? 0 : 1;
            }

            if (occ !== 0) {
              continue;
            }

            this.renderFace(chunk, block, target, x, y, z, face);
          }
        }
      }

      return new ChunkMesh(chunk.x, chunk.y, this.regular, this.unculled, this.transparent);
    }

  }
  class ChunkSurfaceRenderer2 {
    constructor() {
      this.gl = null;
      this.program = {};
      this.modelViewMatrix = create$1();
    }

    context(newgl) {
      this.gl = newgl;
      var allTiles = loadTextureAtlas(this.gl, "texture.png", 256);
      {
        var vertexShader = "#version 300 es\n#define VERT_SHADER\n" + chunkShader2;
        var fragShader = "#version 300 es\n#define FRAG_SHADER\n" + chunkShader2;
        var shaderProgram = initShaderProgram(this.gl, vertexShader, fragShader);
        this.regular = {
          attribLocations: {
            vertexPosition: this.gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
            vertexLight: this.gl.getAttribLocation(shaderProgram, 'aVertexLight'),
            vertexTexture: this.gl.getAttribLocation(shaderProgram, 'aVertexTexture'),
            vertexAtlas: this.gl.getAttribLocation(shaderProgram, 'aVertexAtlas')
          },
          uniformLocations: {
            projectionMatrix: this.gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: this.gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
            sampler: this.gl.getUniformLocation(shaderProgram, 'uSampler')
          },
          program: shaderProgram,
          texture: allTiles
        };
      }
      {
        var vertexShader = "#version 300 es\n#define VERT_SHADER\n#define UNCULLED\n" + chunkShader2;
        var fragShader = "#version 300 es\n#define FRAG_SHADER\n#define UNCULLED\n" + chunkShader2;
        var shaderProgram = initShaderProgram(this.gl, vertexShader, fragShader);
        this.unculled = {
          attribLocations: {
            vertexPosition: this.gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
            vertexLight: this.gl.getAttribLocation(shaderProgram, 'aVertexLight'),
            vertexTexture: this.gl.getAttribLocation(shaderProgram, 'aVertexTexture'),
            vertexAtlas: this.gl.getAttribLocation(shaderProgram, 'aVertexAtlas')
          },
          uniformLocations: {
            projectionMatrix: this.gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: this.gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
            sampler: this.gl.getUniformLocation(shaderProgram, 'uSampler')
          },
          program: shaderProgram,
          texture: allTiles
        };
      }
      {
        var vertexShader = "#version 300 es\n#define VERT_SHADER\n#define TRANSPARENT\n" + chunkShader2;
        var fragShader = "#version 300 es\n#define FRAG_SHADER\n#define TRANSPARENT\n" + chunkShader2;
        var shaderProgram = initShaderProgram(this.gl, vertexShader, fragShader);
        this.transparent = {
          attribLocations: {
            vertexPosition: this.gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
            vertexLight: this.gl.getAttribLocation(shaderProgram, 'aVertexLight'),
            vertexTexture: this.gl.getAttribLocation(shaderProgram, 'aVertexTexture'),
            vertexAtlas: this.gl.getAttribLocation(shaderProgram, 'aVertexAtlas')
          },
          uniformLocations: {
            projectionMatrix: this.gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: this.gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
            time: this.gl.getUniformLocation(shaderProgram, 'uTime'),
            sampler: this.gl.getUniformLocation(shaderProgram, 'uSampler')
          },
          program: shaderProgram,
          texture: allTiles
        };
      }
      console.log("chunks program info:", this.regular);
    }

    blit(chunk) {
      if (chunk.uploaded) return;
      chunk.uploaded = true;
      console.log("uploading", chunk);
      let attrs = 7;
      let type = this.gl.UNSIGNED_BYTE;
      let size = 1;

      if (chunk.regular.length > 0) {
        chunk.regular.vbo = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, chunk.regular.vbo);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, chunk.regular.mesh, this.gl.STATIC_DRAW);
        chunk.regular.vao = this.gl.createVertexArray();
        this.gl.bindVertexArray(chunk.regular.vao);
        this.gl.vertexAttribPointer(this.regular.attribLocations.vertexPosition, 3, type, false, attrs * size, 0 * size);
        this.gl.enableVertexAttribArray(this.regular.attribLocations.vertexPosition);
        this.gl.vertexAttribPointer(this.regular.attribLocations.vertexLight, 1, type, false, attrs * size, 3 * size);
        this.gl.enableVertexAttribArray(this.regular.attribLocations.vertexLight);
        this.gl.vertexAttribPointer(this.regular.attribLocations.vertexTexture, 2, type, false, attrs * size, 4 * size);
        this.gl.enableVertexAttribArray(this.regular.attribLocations.vertexTexture);
        this.gl.vertexAttribPointer(this.regular.attribLocations.vertexAtlas, 1, type, false, attrs * size, 6 * size);
        this.gl.enableVertexAttribArray(this.regular.attribLocations.vertexAtlas);
        chunk.regular.mesh = null;
      }

      if (chunk.unculled.length > 0) {
        chunk.unculled.vbo = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, chunk.unculled.vbo);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, chunk.unculled.mesh, this.gl.STATIC_DRAW);
        chunk.unculled.vao = this.gl.createVertexArray();
        this.gl.bindVertexArray(chunk.unculled.vao);
        this.gl.vertexAttribPointer(this.unculled.attribLocations.vertexPosition, 3, type, false, attrs * size, 0 * size);
        this.gl.enableVertexAttribArray(this.unculled.attribLocations.vertexPosition);
        this.gl.vertexAttribPointer(this.unculled.attribLocations.vertexLight, 1, type, false, attrs * size, 3 * size);
        this.gl.enableVertexAttribArray(this.unculled.attribLocations.vertexLight);
        this.gl.vertexAttribPointer(this.unculled.attribLocations.vertexTexture, 2, type, false, attrs * size, 4 * size);
        this.gl.enableVertexAttribArray(this.unculled.attribLocations.vertexTexture);
        this.gl.vertexAttribPointer(this.unculled.attribLocations.vertexAtlas, 1, type, false, attrs * size, 6 * size);
        this.gl.enableVertexAttribArray(this.unculled.attribLocations.vertexAtlas);
        chunk.unculled.mesh = null;
      }

      if (chunk.transparent.length > 0) {
        chunk.transparent.vbo = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, chunk.transparent.vbo);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, chunk.transparent.mesh, this.gl.STATIC_DRAW);
        chunk.transparent.vao = this.gl.createVertexArray();
        this.gl.bindVertexArray(chunk.transparent.vao);
        this.gl.vertexAttribPointer(this.transparent.attribLocations.vertexPosition, 3, type, false, attrs * size, 0 * size);
        this.gl.enableVertexAttribArray(this.transparent.attribLocations.vertexPosition);
        this.gl.vertexAttribPointer(this.transparent.attribLocations.vertexLight, 1, type, false, attrs * size, 3 * size);
        this.gl.enableVertexAttribArray(this.transparent.attribLocations.vertexLight);
        this.gl.vertexAttribPointer(this.transparent.attribLocations.vertexTexture, 2, type, false, attrs * size, 4 * size);
        this.gl.enableVertexAttribArray(this.transparent.attribLocations.vertexTexture);
        this.gl.vertexAttribPointer(this.transparent.attribLocations.vertexAtlas, 1, type, false, attrs * size, 6 * size);
        this.gl.enableVertexAttribArray(this.transparent.attribLocations.vertexAtlas);
        chunk.transparent.mesh = null;
      }

      chunk.renderSize = 0;
    }

    free(chunk) {
      chunk.renderSize -= .02;

      if (chunk.renderSize <= 0) {
        if (!chunk.regular.vbo) {
          throw new Error("double-free chunk vertex");
        }

        this.gl.deleteBuffer(chunk.regular.vbo);
        this.gl.deleteVertexArray(chunk.regular.vao);
        chunk.regular.vbo = null;
        this.gl.deleteBuffer(chunk.unculled.vbo);
        this.gl.deleteVertexArray(chunk.unculled.vao);
        chunk.unculled.vbo = null;
        this.gl.deleteBuffer(chunk.transparent.vbo);
        this.gl.deleteVertexArray(chunk.transparent.vao);
        chunk.transparent.vbo = null;
        return true;
      }

      return false;
    }

    render(renderEvent, chunks) {
      var time = Date.now() / 25000 % 1;
      copy(this.modelViewMatrix, renderEvent.viewMatrix);
      var maximumRender = 40000;
      var rList = [];

      for (var i = 0; i < chunks.length; i++) {
        var chunk = chunks[i];
        if (!chunk.uploaded) continue;

        if (chunk.unculled.length + chunk.regular.length + chunk.transparent.length == 0) {
          continue;
        }

        if (chunk.renderSize < 1) {
          chunk.renderSize += .02;
        }

        if (Math.floor(chunk.renderSize) == 0) {
          continue;
        }

        if (!chunk.insideFrustum(renderEvent.frustrumMatrix)) {
          continue;
        }

        var translation = create$2();
        set(translation, chunk.x * Chunk.width, chunk.y * Chunk.height, 0);
        chunk.modelViewMatrix = clone(renderEvent.viewMatrix);
        translate(chunk.modelViewMatrix, chunk.modelViewMatrix, translation);
        rList.push(chunk);
      }

      rList.sort(function (a, b) {
        var dax = (a.x + .5) * Chunk.width - renderEvent.camera.position[0];
        var day = (a.y + .5) * Chunk.height - renderEvent.camera.position[1];
        var dbx = (b.x + .5) * Chunk.width - renderEvent.camera.position[0];
        var dby = (b.y + .5) * Chunk.height - renderEvent.camera.position[1];
        return dax * dax + day * day - (dbx * dbx + dby * dby);
      });
      var renderCount = 0;
      this.gl.activeTexture(this.gl.TEXTURE0);
      this.gl.bindTexture(this.gl.TEXTURE_2D_ARRAY, this.regular.texture);
      this.gl.useProgram(this.regular.program);
      this.gl.uniformMatrix4fv(this.regular.uniformLocations.projectionMatrix, false, renderEvent.projectionMatrix);
      this.gl.disable(this.gl.BLEND);
      this.gl.enable(this.gl.DEPTH_TEST);
      this.gl.depthFunc(this.gl.LEQUAL);
      this.gl.enable(this.gl.CULL_FACE);

      for (var i = 0; i < rList.length; i++) {
        var chunk = rList[i];
        if (Math.floor(chunk.renderSize * chunk.regular.length) == 0) continue;
        if (renderCount > maximumRender) break;
        renderCount++;
        this.gl.uniformMatrix4fv(this.regular.uniformLocations.modelViewMatrix, false, chunk.modelViewMatrix);
        this.gl.bindVertexArray(chunk.regular.vao);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, Math.floor(chunk.renderSize * chunk.regular.length));
      }

      this.gl.useProgram(this.unculled.program);
      this.gl.uniformMatrix4fv(this.unculled.uniformLocations.projectionMatrix, false, renderEvent.projectionMatrix);
      this.gl.disable(this.gl.CULL_FACE);

      for (var i = 0; i < rList.length; i++) {
        var chunk = rList[i];
        if (Math.floor(chunk.renderSize * chunk.unculled.length) == 0) continue;
        if (renderCount > maximumRender) break;
        renderCount++;
        this.gl.uniformMatrix4fv(this.unculled.uniformLocations.modelViewMatrix, false, chunk.modelViewMatrix);
        this.gl.bindVertexArray(chunk.unculled.vao);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, Math.floor(chunk.renderSize * chunk.unculled.length));
      }

      this.gl.useProgram(this.transparent.program);
      this.gl.uniformMatrix4fv(this.transparent.uniformLocations.projectionMatrix, false, renderEvent.projectionMatrix);
      this.gl.uniform1f(this.transparent.uniformLocations.time, time);
      this.gl.enable(this.gl.BLEND);
      this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

      for (var i = 0; i < rList.length; i++) {
        var chunk = rList[i];
        if (Math.floor(chunk.renderSize * chunk.transparent.length) == 0) continue;
        if (renderCount > maximumRender) break;
        renderCount++;
        this.gl.uniformMatrix4fv(this.transparent.uniformLocations.modelViewMatrix, false, chunk.modelViewMatrix);
        this.gl.bindVertexArray(chunk.transparent.vao);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, Math.floor(chunk.renderSize * chunk.transparent.length));
      }
    }

  }

  function quickhash(a) {
    a = a ^ a >> 4;
    a = (a ^ 0xdeadbeef) + (a << 5);
    return a ^ a >> 11;
  }

  const chunkShader2 = `
    #ifdef VERT_SHADER
    precision highp float;
    precision highp int;
    precision highp sampler2DArray;

    in vec4 aVertexPosition;
    in float aVertexLight;
    in vec2 aVertexTexture;
    in float aVertexAtlas;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    uniform float uTime;

    out float vLight;
    out vec2 vTextureCoord;
    flat out int vAtlas;

    void main(void) {
        vec4 pos = uModelViewMatrix * aVertexPosition;
        vec4 realPos = aVertexPosition;
        vec2 tex = aVertexTexture;


        vAtlas = int(aVertexAtlas);
        #ifdef TRANSPARENT
        if (vAtlas == 222) {
            float a = cos((pos.x/5.0)+uTime*6.0*3.1415926538);
            float b = sin((pos.y/4.0)+uTime*8.0*3.1415926538);
            tex.x += a/5.0;
            tex.y += b/5.0;
            realPos.z += -.18 + (a/20.0 + b/20.0) * .8;
        }
        #endif

        gl_Position = uProjectionMatrix * uModelViewMatrix * realPos;

        vLight = (aVertexLight + 3.0) / 70.0;
        vTextureCoord = tex;
    }
    #endif 
    
    #ifdef FRAG_SHADER
    precision highp float;
    precision highp int;
    precision highp sampler2DArray;

    in float vLight;
    in vec2 vTextureCoord;
    flat in int vAtlas;

    uniform sampler2DArray uSampler;

    out vec4 FragColor;

    void main(void) {
        #ifdef TRANSPARENT
        vec2 tex = vTextureCoord;
        #else
        vec2 tex = clamp(vTextureCoord, 0.0, 1.0);
        #endif

        vec4 textureColor = texture(uSampler, vec3(tex, vAtlas));
        float lighting = vLight;
        // FragColor = vec4(textureColor.rgb * lighting, textureColor.a * .5);
        #ifdef TRANSPARENT
            FragColor = vec4(textureColor.rgb * lighting, textureColor.a * .5);
        #else
            #ifdef UNCULLED
                if (textureColor.a < 1.0) {
                    discard;
                }
                FragColor = vec4(textureColor.rgb * lighting, textureColor.a);
            #else
                textureColor.b += (1.0-lighting)/2.0;
                FragColor = vec4(textureColor.rgb * lighting, 1);
            #endif
        #endif
    }
    #endif
    `;

  class ChunkRenderer {
    constructor(manager, canvas, inputs) {
      this.manager = manager;
      this.chunksList = [];
      this.canvas = canvas;
      this.inputs = inputs;
      this.renderer = new ChunkSurfaceRenderer2();
      canvas.events.on("context", this.contextAcquired.bind(this));
      canvas.events.on("render", this.render.bind(this));
      canvas.events.on("postrender", this.refreshChunks.bind(this));
    }

    addChunk(chunk) {
      this.chunksList.push(chunk);
    }

    render(ev) {
      var a = performance.now();
      this.renderer.render(ev, this.chunksList);
      this.canvas.addBenchmark({
        label: "terrainrender",
        ms: performance.now() - a
      });

      if (this.wireframe) {
        this.wireframe.preRender(ev);

        for (var i = 0; i < this.chunksList.length; i++) {
          this.wireframe.render(this.chunksList[i]);
        }
      }
    }

    contextAcquired(ev) {
      this.wireframe = new ChunkWireframeRenderer2(this.inputs);
      if (this.wireframe) this.wireframe.context(ev.gl);
      this.renderer.context(ev.gl);
    }

    refreshChunks(postrenderEvent) {
      for (var i = 0; i < this.chunksList.length; i++) {
        var chunk = this.chunksList[i];
        this.renderer.blit(chunk);
        if (chunk.inGPU) continue;
        if (this.wireframe) this.wireframe.blit(chunk);
        chunk.inGPU = true;
      }
    }

  }

  class ChunkWireframeRenderer2 {
    constructor(inputs) {
      console.log("enabling wireframe");
      this.gl = null;
      this.program = {};
      this.inputs = inputs;
      this.modelViewMatrix = create$1();
    }

    context(newgl) {
      this.gl = newgl;
      var vertexShader = "#version 300 es\n#define VERT_SHADER\n" + lineShader2;
      var fragShader = "#version 300 es\n#define FRAG_SHADER\n" + lineShader2;
      var shaderProgram = initShaderProgram(this.gl, vertexShader, fragShader);
      this.programInfo = {
        attribLocations: {
          vertexPosition: this.gl.getAttribLocation(shaderProgram, 'aVertexPosition')
        },
        uniformLocations: {
          projectionMatrix: this.gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
          modelViewMatrix: this.gl.getUniformLocation(shaderProgram, 'uModelViewMatrix')
        },
        program: shaderProgram
      };
    }

    preRender(renderEvent) {
      this.gl.useProgram(this.programInfo.program);
      this.gl.uniformMatrix4fv(this.programInfo.uniformLocations.projectionMatrix, false, renderEvent.projectionMatrix);
      copy(this.modelViewMatrix, renderEvent.viewMatrix);
      this.gl.uniformMatrix4fv(this.programInfo.uniformLocations.modelViewMatrix, false, this.modelViewMatrix);
      this.gl.enable(this.gl.DEPTH_TEST); // Enable depth testing

      this.gl.disable(this.gl.BLEND);
      this.gl.enable(this.gl.CULL_FACE);
    }

    blit(chunk) {
      var buff = new Float32Array(72);
      var w = chunk.width,
          h = chunk.height,
          d = chunk.depth,
          x = chunk.x * w,
          y = chunk.y * w;
      buff.set([x, y, 0, x + w, y, 0], 0);
      buff.set([x + w, y, 0, x + w, y + h, 0], 6);
      buff.set([x + w, y + h, 0, x, y + h, 0], 12);
      buff.set([x, y + h, 0, x, y, 0], 18);
      buff.set([x, y, d, x + w, y, d], 24);
      buff.set([x + w, y, d, x + w, y + h, d], 30);
      buff.set([x + w, y + h, d, x, y + h, d], 36);
      buff.set([x, y + h, d, x, y, d], 42);
      buff.set([x, y, 0, x, y, d], 48);
      buff.set([x + w, y, 0, x + w, y, d], 54);
      buff.set([x, y + h, 0, x, y + h, d], 60);
      buff.set([x + w, y + h, 0, x + w, y + h, d], 66);
      const wireframe = this.gl.createBuffer();
      chunk.wireframe = wireframe;
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, chunk.wireframe);
      this.gl.bufferData(this.gl.ARRAY_BUFFER, buff, this.gl.STATIC_DRAW);
      chunk.wireframe_vao = this.gl.createVertexArray();
      this.gl.bindVertexArray(chunk.wireframe_vao);
      this.gl.vertexAttribPointer(this.programInfo.attribLocations.vertexPosition, 3, this.gl.FLOAT, false, 3 * 4, 0 * 4);
      this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexPosition);
    }

    free(chunk) {
      this.gl.deleteBuffer(chunk.wireframe);
    }

    render(chunk) {
      /*this.gl.bindVertexArray(chunk.wireframe_vao)
      this.gl.drawArrays(this.gl.LINES, 0, 24);*/
    }

  }

  const lineShader2 = `
    #ifdef VERT_SHADER
    precision highp float;
    in vec4 aVertexPosition;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    void main(void) {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
    #endif 
    
    #ifdef FRAG_SHADER
    precision highp float;
    out vec4 FragColor;
    void main(void) {
        FragColor = vec4(0);
    }
    #endif
    `;

  // Copyright Joyent, Inc. and other Node contributors.

  var R = typeof Reflect === 'object' ? Reflect : null;
  var ReflectApply = R && typeof R.apply === 'function' ? R.apply : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  };
  var ReflectOwnKeys;

  if (R && typeof R.ownKeys === 'function') {
    ReflectOwnKeys = R.ownKeys;
  } else if (Object.getOwnPropertySymbols) {
    ReflectOwnKeys = function ReflectOwnKeys(target) {
      return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
    };
  } else {
    ReflectOwnKeys = function ReflectOwnKeys(target) {
      return Object.getOwnPropertyNames(target);
    };
  }

  function ProcessEmitWarning(warning) {
    if (console && console.warn) console.warn(warning);
  }

  var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
    return value !== value;
  };

  function EventEmitter() {
    EventEmitter.init.call(this);
  }

  var events = EventEmitter; // Backwards-compat with node 0.10.x

  EventEmitter.EventEmitter = EventEmitter;
  EventEmitter.prototype._events = undefined;
  EventEmitter.prototype._eventsCount = 0;
  EventEmitter.prototype._maxListeners = undefined; // By default EventEmitters will print a warning if more than 10 listeners are
  // added to it. This is a useful default which helps finding memory leaks.

  var defaultMaxListeners = 10;
  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function () {
      return defaultMaxListeners;
    },
    set: function (arg) {
      if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
      }

      defaultMaxListeners = arg;
    }
  });

  EventEmitter.init = function () {
    if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
      this._events = Object.create(null);
      this._eventsCount = 0;
    }

    this._maxListeners = this._maxListeners || undefined;
  }; // Obviously not all Emitters should be limited to 10. This function allows
  // that to be increased. Set to zero for unlimited.


  EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
    if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
    }

    this._maxListeners = n;
    return this;
  };

  function $getMaxListeners(that) {
    if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
    return that._maxListeners;
  }

  EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
    return $getMaxListeners(this);
  };

  EventEmitter.prototype.emit = function emit(type) {
    var args = [];

    for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);

    var doError = type === 'error';
    var events = this._events;
    if (events !== undefined) doError = doError && events.error === undefined;else if (!doError) return false; // If there is no 'error' event listener then throw.

    if (doError) {
      var er;
      if (args.length > 0) er = args[0];

      if (er instanceof Error) {
        // Note: The comments on the `throw` lines are intentional, they show
        // up in Node's output if this results in an unhandled exception.
        throw er; // Unhandled 'error' event
      } // At least give some kind of context to the user


      var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
      err.context = er;
      throw err; // Unhandled 'error' event
    }

    var handler = events[type];
    if (handler === undefined) return false;

    if (typeof handler === 'function') {
      ReflectApply(handler, this, args);
    } else {
      var len = handler.length;
      var listeners = arrayClone(handler, len);

      for (var i = 0; i < len; ++i) ReflectApply(listeners[i], this, args);
    }

    return true;
  };

  function _addListener(target, type, listener, prepend) {
    var m;
    var events;
    var existing;

    if (typeof listener !== 'function') {
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
    }

    events = target._events;

    if (events === undefined) {
      events = target._events = Object.create(null);
      target._eventsCount = 0;
    } else {
      // To avoid recursion in the case that type === "newListener"! Before
      // adding it to the listeners, first emit "newListener".
      if (events.newListener !== undefined) {
        target.emit('newListener', type, listener.listener ? listener.listener : listener); // Re-assign `events` because a newListener handler could have caused the
        // this._events to be assigned to a new object

        events = target._events;
      }

      existing = events[type];
    }

    if (existing === undefined) {
      // Optimize the case of one listener. Don't need the extra array object.
      existing = events[type] = listener;
      ++target._eventsCount;
    } else {
      if (typeof existing === 'function') {
        // Adding the second element, need to change to array.
        existing = events[type] = prepend ? [listener, existing] : [existing, listener]; // If we've already got an array, just append.
      } else if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      } // Check for listener leak


      m = $getMaxListeners(target);

      if (m > 0 && existing.length > m && !existing.warned) {
        existing.warned = true; // No error code for this since it is a Warning
        // eslint-disable-next-line no-restricted-syntax

        var w = new Error('Possible EventEmitter memory leak detected. ' + existing.length + ' ' + String(type) + ' listeners ' + 'added. Use emitter.setMaxListeners() to ' + 'increase limit');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        ProcessEmitWarning(w);
      }
    }

    return target;
  }

  EventEmitter.prototype.addListener = function addListener(type, listener) {
    return _addListener(this, type, listener, false);
  };

  EventEmitter.prototype.on = EventEmitter.prototype.addListener;

  EventEmitter.prototype.prependListener = function prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  };

  function onceWrapper() {
    var args = [];

    for (var i = 0; i < arguments.length; i++) args.push(arguments[i]);

    if (!this.fired) {
      this.target.removeListener(this.type, this.wrapFn);
      this.fired = true;
      ReflectApply(this.listener, this.target, args);
    }
  }

  function _onceWrap(target, type, listener) {
    var state = {
      fired: false,
      wrapFn: undefined,
      target: target,
      type: type,
      listener: listener
    };
    var wrapped = onceWrapper.bind(state);
    wrapped.listener = listener;
    state.wrapFn = wrapped;
    return wrapped;
  }

  EventEmitter.prototype.once = function once(type, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
    }

    this.on(type, _onceWrap(this, type, listener));
    return this;
  };

  EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
    }

    this.prependListener(type, _onceWrap(this, type, listener));
    return this;
  }; // Emits a 'removeListener' event if and only if the listener was removed.


  EventEmitter.prototype.removeListener = function removeListener(type, listener) {
    var list, events, position, i, originalListener;

    if (typeof listener !== 'function') {
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
    }

    events = this._events;
    if (events === undefined) return this;
    list = events[type];
    if (list === undefined) return this;

    if (list === listener || list.listener === listener) {
      if (--this._eventsCount === 0) this._events = Object.create(null);else {
        delete events[type];
        if (events.removeListener) this.emit('removeListener', type, list.listener || listener);
      }
    } else if (typeof list !== 'function') {
      position = -1;

      for (i = list.length - 1; i >= 0; i--) {
        if (list[i] === listener || list[i].listener === listener) {
          originalListener = list[i].listener;
          position = i;
          break;
        }
      }

      if (position < 0) return this;
      if (position === 0) list.shift();else {
        spliceOne(list, position);
      }
      if (list.length === 1) events[type] = list[0];
      if (events.removeListener !== undefined) this.emit('removeListener', type, originalListener || listener);
    }

    return this;
  };

  EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

  EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
    var listeners, events, i;
    events = this._events;
    if (events === undefined) return this; // not listening for removeListener, no need to emit

    if (events.removeListener === undefined) {
      if (arguments.length === 0) {
        this._events = Object.create(null);
        this._eventsCount = 0;
      } else if (events[type] !== undefined) {
        if (--this._eventsCount === 0) this._events = Object.create(null);else delete events[type];
      }

      return this;
    } // emit removeListener for all listeners on all events


    if (arguments.length === 0) {
      var keys = Object.keys(events);
      var key;

      for (i = 0; i < keys.length; ++i) {
        key = keys[i];
        if (key === 'removeListener') continue;
        this.removeAllListeners(key);
      }

      this.removeAllListeners('removeListener');
      this._events = Object.create(null);
      this._eventsCount = 0;
      return this;
    }

    listeners = events[type];

    if (typeof listeners === 'function') {
      this.removeListener(type, listeners);
    } else if (listeners !== undefined) {
      // LIFO order
      for (i = listeners.length - 1; i >= 0; i--) {
        this.removeListener(type, listeners[i]);
      }
    }

    return this;
  };

  function _listeners(target, type, unwrap) {
    var events = target._events;
    if (events === undefined) return [];
    var evlistener = events[type];
    if (evlistener === undefined) return [];
    if (typeof evlistener === 'function') return unwrap ? [evlistener.listener || evlistener] : [evlistener];
    return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
  }

  EventEmitter.prototype.listeners = function listeners(type) {
    return _listeners(this, type, true);
  };

  EventEmitter.prototype.rawListeners = function rawListeners(type) {
    return _listeners(this, type, false);
  };

  EventEmitter.listenerCount = function (emitter, type) {
    if (typeof emitter.listenerCount === 'function') {
      return emitter.listenerCount(type);
    } else {
      return listenerCount.call(emitter, type);
    }
  };

  EventEmitter.prototype.listenerCount = listenerCount;

  function listenerCount(type) {
    var events = this._events;

    if (events !== undefined) {
      var evlistener = events[type];

      if (typeof evlistener === 'function') {
        return 1;
      } else if (evlistener !== undefined) {
        return evlistener.length;
      }
    }

    return 0;
  }

  EventEmitter.prototype.eventNames = function eventNames() {
    return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
  };

  function arrayClone(arr, n) {
    var copy = new Array(n);

    for (var i = 0; i < n; ++i) copy[i] = arr[i];

    return copy;
  }

  function spliceOne(list, index) {
    for (; index + 1 < list.length; index++) list[index] = list[index + 1];

    list.pop();
  }

  function unwrapListeners(arr) {
    var ret = new Array(arr.length);

    for (var i = 0; i < ret.length; ++i) {
      ret[i] = arr[i].listener || arr[i];
    }

    return ret;
  }

  var forceWebgl1 = false;
  class Canvas {
    constructor() {
      this.events = new events();
      window.setInterval(() => this.events.emit("step"), 25);
      this.supports = {
        webgl2: true,
        webworker: true
      };
      this.debug = {};
      this.debugElement = {};
      this.lastText = "";
      this.profiles = {};
      this.nextRefresh = Date.now();
      this.events.on("postrender", this.refreshDebugNow.bind(this));
      this.camera = {
        position: create$2(),
        target: [0, 0, 0]
      };
    }

    start() {
      let host = document.currentScript.parentNode;
      var debugElement = document.createElement("div");
      debugElement.style.position = "absolute";
      debugElement.style.top = "0";
      debugElement.style.left = "0";
      this.debugElement = debugElement;
      var canvas = document.createElement("canvas");
      this.canvas = canvas;
      canvas.style.float = "right";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      window.devicePixelRatio = 1;
      var gl =  canvas.getContext("webgl2", {
        alpha: false,
        antialias: true,
        powerPreference: 'high-performance'
      });

      if (!gl || forceWebgl1) {
        supports.webgl2 = false;
        gl = canvas.getContext("webgl");

        if (!gl) {
          console.log("webgl disabled");
          debug.error = "webgl is not supported";
          refreshDebugNow();
          return;
        }
      }

      var available_extensions = gl.getSupportedExtensions();
      console.log("extensions:", available_extensions);
      const projectionMatrix = create$1();
      const viewMatrix = create$1();
      const frustrumMatrix = create$1();
      host.appendChild(canvas);
      this.inputs = new Inputs(this);
      host.style.padding = "0";
      host.style.margin = "0";
      var lastResize = 0;

      function resize(canvas) {
        var now = Date.now();

        if (now - lastResize < 200) {
          return;
        }

        lastResize = now; // Lookup the size the browser is displaying the canvas.

        var displayWidth = canvas.clientWidth * 1;
        var displayHeight = canvas.clientHeight * 1; // Check if the canvas is not the same size.

        if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
          // Make the canvas the same size
          canvas.width = displayWidth;
          canvas.height = displayHeight;
        }
      }

      resize(canvas);
      let loadingScreen = document.createElement("div");
      loadingScreen.innerHTML = "<h1>Loading...</h1>";
      loadingScreen.style.position = "absolute";
      loadingScreen.style.width = "100%";
      loadingScreen.style.height = "100%";
      loadingScreen.style.textAlign = "center";
      loadingScreen.style.verticalAlign = "middle";
      host.appendChild(loadingScreen);

      this.finishedLoading = function () {
        host.removeChild(loadingScreen);
        host.appendChild(debugElement);
      };

      this.events.emit("context", {
        gl: gl,
        canvas: canvas,
        supports: this.supports
      });
      var lastFrame = Date.now();
      var efps = 500;
      var fps = 60;
      var framesThisSecond = 0;
      var lastFPS = lastFrame;
      var fCount = 0,
          fMax = 1;

      function render() {
        var start = Date.now();
        window.requestAnimationFrame(render.bind(this));
        framesThisSecond += 1;

        if (start - lastFPS > 1000) {
          lastFPS = start;
          fps = (framesThisSecond + fps) / 2;
          framesThisSecond = 0;
        }

        fCount++;

        if (fps < 55) {
          fMax = (fMax * 99 + fMax + 1) / 100;
        } else {
          fMax = (fMax * 99 + fMax - 1) / 100;

          if (fMax < 1) {
            fMax = 1;
          }
        }

        document.title = "FPS " + Math.floor(fps) + "/" + Math.floor(fMax);

        if (fCount < fMax) {
          return;
        }

        fCount = 0;
        gl.viewport(0, 0, canvas.width, canvas.height);
        const fieldOfView = 82 * Math.PI / 180; // in radians

        const aspect = canvas.width / canvas.height;
        const zNear = 0.1;
        const zFar = 1000.0;
        lookAt(viewMatrix, this.camera.position, this.camera.target, [0, 0, 1]);
        perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);
        multiply(frustrumMatrix, projectionMatrix, viewMatrix);
        var renderEvent = {
          camera: this.camera,
          projectionMatrix: projectionMatrix,
          viewMatrix: viewMatrix,
          frustrumMatrix: frustrumMatrix
        };
        this.events.emit("prerender", renderEvent);
        gl.clearColor(0.529, 0.807, 0.921, 1.0); // Clear to black, fully opaque

        gl.clearDepth(1.0); // Clear everything

        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        this.events.emit("render", renderEvent);
        setTimeout(() => this.events.emit("postrender", {
          camera: this.camera
        }), 1);
        var frameTime = Date.now() - start;
        this.addBenchmark({
          label: "frame_time",
          ms: frameTime
        });
        if (frameTime > 0.001) efps = (efps * 9 + 1000 / frameTime) / 10;
        lastFrame = start;
        this.debug.error = gl.getError();
        this.debug.FPS = "aaactual: " + Math.floor(fps) + ", effective: " + Math.floor(efps);
      }

      this.events.on("postrender", function () {
        resize(canvas);
      });
      window.requestAnimationFrame(render.bind(this));
    }

    addProfile(ev) {
      var ms = ev.ms;
      var label = ev.label;

      if (!this.profiles[label]) {
        this.profiles[label] = {
          sum: 0,
          count: 0
        };
      }

      this.profiles[label].sum += ms;
      this.profiles[label].count += 1;
      var sum = Math.floor(this.profiles[label].sum * 10) / 10;
      var avg = Math.floor(this.profiles[label].sum / this.profiles[label].count * 10) / 10;
      this.debug[label] = "sum(" + sum + ") avg(" + avg + " x " + this.profiles[label].count + ")";
    }

    addBenchmark(ev) {
      var ms = ev.ms;
      var label = ev.label;

      if (!this.profiles[label]) {
        this.profiles[label] = 0;
      }

      this.profiles[label] = (this.profiles[label] * 99 + ms) / 100;
      var avg = Math.floor(this.profiles[label] * 1000) / 1000;
      this.debug[label] = avg;
    }

    refreshDebugNow() {
      var now = Date.now();

      if (now < this.nextRefresh) {
        return;
      }

      this.nextRefresh = now + 200;
      this.debug.supports_webgl2 = this.supports.webgl2;
      this.debug.supports_webworker = this.supports.webworker;
      var html = "<table>";
      var props = [];

      for (var prop in this.debug) {
        if (Object.prototype.hasOwnProperty.call(this.debug, prop)) {
          props.push(prop);
        }
      }

      props.sort();

      for (var i = 0; i < props.length; i++) {
        if (isNaN(this.debug[props[i]])) {
          html += "<tr><td>" + props[i] + "</td><td>" + this.debug[props[i]] + "</td></tr>";
        } else {
          html += "<tr><td>" + props[i] + "</td><td>" + Math.floor(this.debug[props[i]] * 10) / 10 + "</td></tr>";
        }
      }

      if (this.lastText == html) {
        return;
      }

      this.debugElement.innerHTML = html;
      this.lastText = html;
    }

  }
  class Inputs {
    constructor(canvas) {
      this.input = {
        mouse: {
          x: 0,
          y: 0,
          dragging: 0,
          dirty: false
        }
      };
      this.canvas = canvas;
      var parent = this.canvas.canvas.parentElement;
      var box = parent.getBoundingClientRect();
      parent.addEventListener("mousemove", ev => {
        this.input.mouse.x = ev.clientX - box.left;
        this.input.mouse.y = ev.clientY - box.top;
      });
      this.canvas.canvas.addEventListener("mousedown", ev => {
        this.input.mouse.x = ev.clientX - box.left;
        this.input.mouse.y = ev.clientY - box.top;
        this.input.mouse.dragging = true;
        this.input.mouse.dragStartTime = Date.now();
        ev.preventDefault();
      });
      parent.addEventListener("mouseup", ev => {
        this.input.mouse.dragging = false;
      });
      parent.addEventListener("touchmove", ev => {
        this.input.mouse.x = ev.touches[0].clientX - box.left;
        this.input.mouse.y = ev.touches[0].clientY - box.top;
      });
      this.canvas.canvas.addEventListener("touchstart", ev => {
        this.input.mouse.x = ev.touches[0].clientX - box.left;
        this.input.mouse.y = ev.touches[0].clientY - box.top;
        this.input.mouse.dragging = true;
        ev.preventDefault();
      });
      parent.addEventListener("touchend", ev => {
        this.input.mouse.dragging = false;
      });
      parent.addEventListener("keydown", ev => {
        this.input[ev.key] = true;
        ev.preventDefault();
      });
      parent.addEventListener("keyup", ev => {
        this.input[ev.key] = false;
      });
    }

  }

  const bindings = {
    forward: "w",
    backward: "s",
    right: "d",
    left: "a",
    jump: " " // Player should be initialized when the 0,0 chunk is ready

  };
  class Player {
    constructor(canvas, chunkMap) {
      this.events = new events();
      this.chunkMap = chunkMap;
      this.pitch = 0;
      this.yaw = 0;
      this.angle = create$4();
      this._looking = create$4();
      var chunk = this.chunkMap.locate(4, 4, 200);
      var height = chunk.chunk.heights[Chunk.index2d(4, 4)];
      this.position = fromValues(4.5, 4.5, height + 1); // gently try to face them away from a wall

      if (height > chunk.chunk.heights[Chunk.index2d(5, 4)]) {
        this.yaw = 0;
      } else if (height > chunk.chunk.heights[Chunk.index2d(3, 4)]) {
        this.yaw = 180;
      } else if (height > chunk.chunk.heights[Chunk.index2d(4, 5)]) {
        this.yaw = -90;
      } else {
        this.yaw = 90;
      }

      this.speed = create$2();
      this.camLastX = 0;
      this.camLastY = 0;
      this.mouseDirty = false;
      canvas.events.on("prerender", this.prerender.bind(this));
      canvas.events.on("step", this.step.bind(this));
      this.canvas = canvas;
      this.camera = canvas.camera;
      this.inputs = canvas.inputs;
      this.onground = false;
      this.canvas.finishedLoading();
    }

    prerender() {
      var eyes = clone$1(this.position);
      add(eyes, eyes, [0, 0, 1.55]);
      lerp(this.camera.position, this.camera.position, eyes, .9);
      lerp$2(this._looking, this._looking, this.angle, .9);
      var lookAt = fromValues(1, 0, 0);
      transformQuat(lookAt, lookAt, this._looking);
      add(lookAt, this.camera.position, lookAt);
      copy$1(this.camera.target, lookAt);
    }

    colliding() {
      var bbox = {
        x: this.position[0] - .4,
        y: this.position[1] - .4,
        z: this.position[2],
        x2: this.position[0] + .4,
        y2: this.position[1] + .4,
        z2: this.position[2] + 1.8
      };
      var interests = this.chunkMap.query(bbox.x, bbox.y, bbox.z, bbox.x2, bbox.y2, bbox.z2);

      for (var i = 0; i < interests.length; i++) {
        var interest = interests[i];

        if (interest.data.culls == 3) {
          if (bbox_colliding(bbox, interest)) {
            return true;
          }
        }
      }

      return false;
    }

    hugging() {
      var bbox = {
        x: this.position[0] - .45,
        y: this.position[1] - .45,
        z: this.position[2] + .1,
        x2: this.position[0] + .45,
        y2: this.position[1] + .45,
        z2: this.position[2] + .5
      };
      var interests = this.chunkMap.query(bbox.x, bbox.y, bbox.z, bbox.x2, bbox.y2, bbox.z2);

      for (var i = 0; i < interests.length; i++) {
        var interest = interests[i];

        if (interest.data.culls == 3 || interest.data.culls == 2 && interest.density > 0) {
          if (bbox_colliding(bbox, interest)) {
            return true;
          }
        }
      }

      return false;
    }

    swimming() {
      var bbox = {
        x: this.position[0] - .4,
        y: this.position[1] - .4,
        z: this.position[2] + .4,
        x2: this.position[0] + .4,
        y2: this.position[1] + .4,
        z2: this.position[2] + 1.2
      };
      var interests = this.chunkMap.query(bbox.x, bbox.y, bbox.z, bbox.x2, bbox.y2, bbox.z2);

      for (var i = 0; i < interests.length; i++) {
        var interest = interests[i];

        if (interest.data.culls == 1) {
          if (bbox_colliding(bbox, interest)) {
            return true;
          }
        }
      }

      return false;
    }

    step() {
      // first aim the camera and determine a new looking quat
      if (this.inputs.input.mouse.dragging) {
        let delay = this.inputs.input.mouse.dragStartTime - Date.now();
        this.yaw += (this.camLastX - this.inputs.input.mouse.x) * .5;
        this.pitch -= (this.camLastY - this.inputs.input.mouse.y) * .5;

        if (this.pitch > 89) {
          this.pitch = 89;
        }

        if (this.pitch < -89) {
          this.pitch = -89;
        }
      }

      fromEuler(this.angle, 0, this.pitch, this.yaw);
      this.camLastX = this.inputs.input.mouse.x;
      this.camLastY = this.inputs.input.mouse.y;

      if (this.inputs.input.mouse.dragging) {
        this.mouseDirty = false;
      } else {
        this.mouseDirty = true;
      }

      var power = .04,
          friction = .7;
      var swimming = this.swimming();

      if (this.inputs.input[bindings.forward]) {
        var impulse = fromValues$1(power, 0);
        rotate(impulse, impulse, [0, 0], this.yaw * Math.PI / 180);
        add(this.speed, this.speed, [impulse[0], impulse[1], 0]);
      }

      if (this.inputs.input[bindings.backward]) {
        var impulse = fromValues$1(-power, 0);
        rotate(impulse, impulse, [0, 0], this.yaw * Math.PI / 180);
        add(this.speed, this.speed, [impulse[0], impulse[1], 0]);
      }

      if (this.inputs.input[bindings.left]) {
        var impulse = fromValues$1(0, power);
        rotate(impulse, impulse, [0, 0], this.yaw * Math.PI / 180);
        add(this.speed, this.speed, [impulse[0], impulse[1], 0]);
      }

      if (this.inputs.input[bindings.right]) {
        var impulse = fromValues$1(0, -power);
        rotate(impulse, impulse, [0, 0], this.yaw * Math.PI / 180);
        add(this.speed, this.speed, [impulse[0], impulse[1], 0]);
      }

      if (this.inputs.input[bindings.jump]) {
        var hugging = this.hugging();

        if (swimming) {
          this.speed[2] += .06;

          if (hugging) {
            this.speed[2] += .1;
          }
        }

        if (this.onground) {
          this.speed[2] = .19;

          if (hugging) {
            this.speed[2] += .04;
          }
        }
      }

      this.position[0] += this.speed[0];

      while (this.colliding()) {
        this.position[0] -= this.speed[0];
        this.speed[0] -= Math.sign(this.speed[0]) * .1;

        if (this.speed[0] < .1) {
          this.speed[0] = 0;
          break;
        }

        this.position[0] += this.speed[0];
      }

      this.position[1] += this.speed[1];

      while (this.colliding()) {
        this.position[1] -= this.speed[1];
        this.speed[1] -= Math.sign(this.speed[1]) * .1;

        if (this.speed[1] < .1) {
          this.speed[1] = 0;
          break;
        }

        this.position[1] += this.speed[1];
      }

      this.position[2] += this.speed[2];
      this.onground = false;

      while (this.colliding()) {
        this.position[2] -= this.speed[2];

        if (this.speed[2] < 0) {
          this.onground = true;
        }

        this.speed[2] -= Math.sign(this.speed[0]) * .1;

        if (this.speed[2] < .1) {
          this.speed[2] = 0;
          break;
        }

        this.position[2] += this.speed[2];
      }

      this.speed[0] *= friction;
      this.speed[1] *= friction;

      if (this.swimming()) {
        this.speed[2] *= .8;
        add(this.speed, this.speed, [0, 0, -.03]);
      } else {
        this.speed[2] *= .99;
        add(this.speed, this.speed, [0, 0, -.014]);
      }

      var pos = [Math.floor(this.position[0]), Math.floor(this.position[1]), Math.floor(this.position[2])];
      this.canvas.debug.position = pos;
      var target = this.chunkMap.query(pos[0], pos[1], pos[2], pos[0], pos[1], pos[2]);

      if (target.length == 1) {
        this.canvas.debug.currentTile = target[0].data.name + " in chunk " + target[0].chunk.id + " " + target[0].chunk.biome;
      } else {
        this.canvas.debug.currentTile = "out-of-bounds";
      }

      this.canvas.debug.biomes = JSON.stringify(this.chunkMap.biomes());
      this.events.emit("position", {
        position: this.position
      });
    }

  }

  function bbox_colliding(a, b) {
    if (a.x2 < b.x) return false;
    if (a.x > b.x2) return false;
    if (a.y2 < b.y) return false;
    if (a.y > b.y2) return false;
    if (a.z2 < b.z) return false;
    if (a.z > b.z2) return false;
    return true;
  }

  class GameEngine {
    constructor(pipe, work) {
      this.pipe = pipe;
      this.work = work;
    }

    player_moved(ev) {
      this.pipe({
        "event": "area_of_interest",
        "x": ev.position[0],
        "y": ev.position[1],
        "z": ev.position[2]
      });
      var center = this.chunks.locate(ev.position[0], ev.position[1], 0);
      var toSend = this.chunks.spiral(center.chunk.x, center.chunk.y, 31);

      for (var i = 0; i < toSend.length; i++) {
        var chunk = toSend[i];
        if (chunk.clean) continue;
        var count = 0;
        this.chunks.neighbors(chunk, 8, function (chunk) {
          if (chunk.map) count++;
        });
        if (count < 8) continue;
        chunk.clean = true;
        var padded = this.chunks.padded(chunk);
        this.work({
          "event": "tesselate",
          "chunk": padded
        }, [padded.map.buffer, padded.lights.buffer, padded.heights.buffer]);
      }
    }

    handle_main(ev) {
      var start = performance.now();

      switch (ev.event) {
        case "profile":
          console.log("worker did handle", ev.label, "in", ev.ms);
          this.canvas.addProfile({
            "label": "event_" + ev.label,
            "ms": ev.ms
          });
          return;

        case "start":
          this.canvas = new Canvas();
          this.work({
            "event": "start_as_worker"
          });
          this.pipe({
            "event": "start_new_world"
          });
          this.chunks = new InfiniteChunkMap();
          this.renderer = new ChunkRenderer(this.chunks, this.canvas, this.canvas.inputs);
          this.canvas.start();
          break;

        case "spawn":
          this.player = new Player(this.canvas, this.chunks);
          this.player.events.on("position", this.player_moved.bind(this));
          break;

        case "new_chunk":
          var chunk = this.chunks.getChunk(ev.chunk.x, ev.chunk.y);
          chunk.map = ev.chunk.map;
          chunk.lights = ev.chunk.lights;
          chunk.heights = ev.chunk.heights;
          chunk.biome = ev.chunk.biome;
          break;

        case "tesselated":
          var chunk = this.chunks.getChunk(ev.chunk_mesh.x, ev.chunk_mesh.y);
          chunk.regular = ev.chunk_mesh.regular;
          chunk.unculled = ev.chunk_mesh.unculled;
          chunk.transparent = ev.chunk_mesh.transparent;
          this.renderer.addChunk(chunk);
          break;

        default:
          console.warn("unknown event", ev);
          break;
      }

      this.canvas.addProfile({
        "label": "event_" + ev.event,
        "ms": performance.now() - start
      });
      console.log("handled", ev);
    }

    handle_worker(ev) {
      var start = performance.now();

      switch (ev.event) {
        case "start_new_world":
          this.chunks = new InfiniteChunkMap();
          this.generator = new HillyGenerator(this.chunks);
          this.lighter = new RadiosityLights(this.chunks, this.generator.populateChunk.bind(this.generator));
          var toSend = this.chunks.spiral(0, 0, 5);

          for (var i = 0; i < toSend.length; i++) {
            this.lighter.buildLightList(toSend[i]);
            this.pipe({
              "event": "new_chunk",
              "chunk": toSend[i]
            });
          }

          this.pipe({
            "event": "spawn"
          });
          break;

        case "area_of_interest":
          var center = this.chunks.locate(ev.x, ev.y, ev.z);
          var toSend = this.chunks.spiral(center.chunk.x, center.chunk.y, 29);
          var work = 0;

          for (var i = 0; i < toSend.length; i++) {
            if (toSend[i].initialLighting) continue;
            this.lighter.buildLightList(toSend[i]);
            this.pipe({
              "event": "new_chunk",
              "chunk": toSend[i]
            });
            work++;
            if (work > 4) break;
          }

          if (work == 0) return; // skip profiling and such

          break;

        case "start_as_worker":
          this.chunks = new InfiniteChunkMap();
          this.tesselator = new BrilliantSurfaceExtractor(this.chunks);
          break;

        case "tesselate":
          var chunk = new PaddedChunk(ev.chunk.x, ev.chunk.y);
          chunk.map = ev.chunk.map;
          chunk.lights = ev.chunk.lights;
          chunk.heights = ev.chunk.heights;
          var cm = this.tesselator.tesselate(chunk);
          this.pipe({
            "event": "tesselated",
            "chunk_mesh": cm
          }, cm.buffers());
          break;

        default:
          console.warn("unknown event", ev);
          break;
      }

      this.pipe({
        event: "profile",
        label: ev.event + " ms",
        ms: performance.now() - start
      });
    }

  }

  class Orchestrator {
    constructor(mode) {
      console.log("creating new orchestrator in mode:", mode);
      this.work = [];
      this.working = false;
      var self = this;

      switch (mode) {
        case "client":
          if (window.Worker) {
            var host = new Worker("bundle.main.js");
            var worker = new Worker("bundle.main.js");
            var game = new GameEngine(function (a, b) {
              host.postMessage(a, b);
            }, function (a, b) {
              worker.postMessage(a, b);
            });

            host.onmessage = function (ev) {
              game.handle_main(ev.data);
            };

            worker.onmessage = function (ev) {
              game.handle_main(ev.data);
            };

            game.handle_main({
              "event": "start"
            });
            return;
          } // simulate webworkers through a work queue


          console.warn("web worker support improves performance");
          var game = new GameEngine(function (ev) {
            self.queue_work(ev);
          }, function (ev) {
            self.queue_work(ev);
          });
          this.workingThread = new GameEngine(game.handle_main.bind(game)); // fake "thread" calls real handler

          game.handle_main({
            "event": "start"
          });
          break;

        case "worker":
          // pass events through to the main game
          var game = new GameEngine(function (a, b) {
            postMessage(a, b);
          });

          onmessage = function (ev) {
            game.handle_worker(ev.data);
          };

          break;
      }
    }

    drain() {
      var deadline = Date.now() + 15;

      while (this.work.length > 0) {
        this.work.pop().call(this.game);

        if (Date.now() >= deadline) {
          break;
        }
      }

      if (this.work.length > 0) {
        setTimeout(this.drain.bind(this), 1);
      } else {
        this.working = false;
      }
    }

    addWork(work) {
      this.work.unshift(work);

      if (!this.working) {
        this.working = true;
        setTimeout(this.drain.bind(this), 1);
      }
    }

    queue_work(ev) {
      var self = this;
      this.addWork(function () {
        self.workingThread.handle_worker(ev);
      });
    }

  }

  var isWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
  new Orchestrator(isWorker ? "worker" : "client");

}());
