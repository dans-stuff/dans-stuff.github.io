(function () {
  'use strict';

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
   * Subtracts vector b from vector a
   *
   * @param {vec3} out the receiving vector
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {vec3} out
   */

  function subtract(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
  }
  /**
   * Calculates the euclidian distance between two vec3's
   *
   * @param {vec3} a the first operand
   * @param {vec3} b the second operand
   * @returns {Number} distance between a and b
   */

  function distance(a, b) {
    var x = b[0] - a[0];
    var y = b[1] - a[1];
    var z = b[2] - a[2];
    return Math.hypot(x, y, z);
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
   * Alias for {@link vec3.subtract}
   * @function
   */

  var sub = subtract;
  /**
   * Alias for {@link vec3.distance}
   * @function
   */

  var dist = distance;
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
   * Creates a new vec4 initialized with values from an existing vector
   *
   * @param {vec4} a vector to clone
   * @returns {vec4} a new 4D vector
   */

  function clone$2(a) {
    var out = new ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
  }
  /**
   * Creates a new vec4 initialized with the given values
   *
   * @param {Number} x X component
   * @param {Number} y Y component
   * @param {Number} z Z component
   * @param {Number} w W component
   * @returns {vec4} a new 4D vector
   */

  function fromValues$1(x, y, z, w) {
    var out = new ARRAY_TYPE(4);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    out[3] = w;
    return out;
  }
  /**
   * Copy the values from one vec4 to another
   *
   * @param {vec4} out the receiving vector
   * @param {vec4} a the source vector
   * @returns {vec4} out
   */

  function copy$2(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
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

  function fromValues$2(x, y) {
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

  function distance$1(a, b) {
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

  var dist$1 = distance$1;
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
    culls: 0,
    illumination: 1
  }, {
    name: "stone",
    color: [0.3, 0.32, 0.29],
    atlas: [1, 1, 1, 1, 1, 1],
    culls: 3,
    illumination: 0
  }, {
    name: "grass",
    color: [0.376, 0.501, 0.219],
    atlas: [3, 3, 3, 3, 0, 2],
    culls: 3,
    illumination: 0
  }, {
    name: "log",
    color: [0.509, 0.321, 0.003],
    atlas: [116, 116, 116, 116, 21, 21],
    culls: 3,
    illumination: 0
  }, {
    name: "leaf",
    color: [0.376, 0.501, 0.219],
    atlas: [52, 52, 52, 52, 52, 52],
    culls: 2,
    illumination: 1,
    density: 1,
    type: 0
  }, {
    name: "snow",
    color: [0.376, 0.501, 0.219],
    atlas: [66, 66, 66, 66, 66, 66],
    culls: 3,
    illumination: 0
  }, {
    name: "dirt",
    color: [0.509, 0.321, 0.003],
    atlas: [2, 2, 2, 2, 2, 2],
    culls: 3,
    illumination: 0
  }, {
    name: "plant",
    atlas: 28,
    culls: 2,
    illumination: 1,
    density: 0,
    type: 1
  }, {
    name: "tuft",
    atlas: 39,
    culls: 2,
    illumination: 1,
    density: 0,
    type: 1
  }, {
    name: "water",
    atlas: [222, 222, 222, 222, 222, 222],
    culls: 1,
    illumination: 1
  }, {
    name: "sand",
    atlas: [18, 18, 18, 18, 18, 18],
    culls: 3,
    illumination: 0
  }, {
    name: "sandstone",
    atlas: [142, 142, 142, 142, 142, 142],
    culls: 3,
    illumination: 0
  }, {
    name: "marsh",
    atlas: [78, 78, 78, 78, 78, 78],
    culls: 3,
    illumination: 0
  }, {
    name: "twig",
    atlas: 55,
    culls: 2,
    illumination: 1,
    density: 0,
    type: 1
  }, {
    name: "gold",
    // 14
    atlas: [32, 32, 32, 32, 32, 32],
    culls: 3,
    illumination: 0
  }, {
    name: "iron",
    atlas: [33, 33, 33, 33, 33, 33],
    culls: 3,
    illumination: 0
  }, {
    name: "coal",
    atlas: [34, 34, 34, 34, 34, 34],
    culls: 3,
    illumination: 0
  }, {
    name: "diamond",
    atlas: [50, 50, 50, 50, 50, 50],
    culls: 3,
    illumination: 0
  }, {
    name: "mossy_brick",
    atlas: [100, 100, 100, 100, 100, 100],
    culls: 3,
    illumination: 0
  }, {
    name: "patch",
    atlas: [64, 64, 64, 64, 64, 64],
    culls: 3,
    illumination: 0
  }];

  const _lut = [];

  for (let i = 0; i < 256; i++) {
    _lut[i] = (i < 16 ? '0' : '') + i.toString(16);
  }

  let _seed = 1234567;
  const MathUtils = {
    DEG2RAD: Math.PI / 180,
    RAD2DEG: 180 / Math.PI,
    generateUUID: function () {
      // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/21963136#21963136
      const d0 = Math.random() * 0xffffffff | 0;
      const d1 = Math.random() * 0xffffffff | 0;
      const d2 = Math.random() * 0xffffffff | 0;
      const d3 = Math.random() * 0xffffffff | 0;
      const uuid = _lut[d0 & 0xff] + _lut[d0 >> 8 & 0xff] + _lut[d0 >> 16 & 0xff] + _lut[d0 >> 24 & 0xff] + '-' + _lut[d1 & 0xff] + _lut[d1 >> 8 & 0xff] + '-' + _lut[d1 >> 16 & 0x0f | 0x40] + _lut[d1 >> 24 & 0xff] + '-' + _lut[d2 & 0x3f | 0x80] + _lut[d2 >> 8 & 0xff] + '-' + _lut[d2 >> 16 & 0xff] + _lut[d2 >> 24 & 0xff] + _lut[d3 & 0xff] + _lut[d3 >> 8 & 0xff] + _lut[d3 >> 16 & 0xff] + _lut[d3 >> 24 & 0xff]; // .toUpperCase() here flattens concatenated strings to save heap memory space.

      return uuid.toUpperCase();
    },
    clamp: function (value, min, max) {
      return Math.max(min, Math.min(max, value));
    },
    // compute euclidian modulo of m % n
    // https://en.wikipedia.org/wiki/Modulo_operation
    euclideanModulo: function (n, m) {
      return (n % m + m) % m;
    },
    // Linear mapping from range <a1, a2> to range <b1, b2>
    mapLinear: function (x, a1, a2, b1, b2) {
      return b1 + (x - a1) * (b2 - b1) / (a2 - a1);
    },
    // https://www.gamedev.net/tutorials/programming/general-and-gameplay-programming/inverse-lerp-a-super-useful-yet-often-overlooked-function-r5230/
    inverseLerp: function (x, y, value) {
      if (x !== y) {
        return (value - x) / (y - x);
      } else {
        return 0;
      }
    },
    // https://en.wikipedia.org/wiki/Linear_interpolation
    lerp: function (x, y, t) {
      return (1 - t) * x + t * y;
    },
    // http://www.rorydriscoll.com/2016/03/07/frame-rate-independent-damping-using-lerp/
    damp: function (x, y, lambda, dt) {
      return MathUtils.lerp(x, y, 1 - Math.exp(-lambda * dt));
    },
    // https://www.desmos.com/calculator/vcsjnyz7x4
    pingpong: function (x, length = 1) {
      return length - Math.abs(MathUtils.euclideanModulo(x, length * 2) - length);
    },
    // http://en.wikipedia.org/wiki/Smoothstep
    smoothstep: function (x, min, max) {
      if (x <= min) return 0;
      if (x >= max) return 1;
      x = (x - min) / (max - min);
      return x * x * (3 - 2 * x);
    },
    smootherstep: function (x, min, max) {
      if (x <= min) return 0;
      if (x >= max) return 1;
      x = (x - min) / (max - min);
      return x * x * x * (x * (x * 6 - 15) + 10);
    },
    // Random integer from <low, high> interval
    randInt: function (low, high) {
      return low + Math.floor(Math.random() * (high - low + 1));
    },
    // Random float from <low, high> interval
    randFloat: function (low, high) {
      return low + Math.random() * (high - low);
    },
    // Random float from <-range/2, range/2> interval
    randFloatSpread: function (range) {
      return range * (0.5 - Math.random());
    },
    // Deterministic pseudo-random float in the interval [ 0, 1 ]
    seededRandom: function (s) {
      if (s !== undefined) _seed = s % 2147483647; // Park-Miller algorithm

      _seed = _seed * 16807 % 2147483647;
      return (_seed - 1) / 2147483646;
    },
    degToRad: function (degrees) {
      return degrees * MathUtils.DEG2RAD;
    },
    radToDeg: function (radians) {
      return radians * MathUtils.RAD2DEG;
    },
    isPowerOfTwo: function (value) {
      return (value & value - 1) === 0 && value !== 0;
    },
    ceilPowerOfTwo: function (value) {
      return Math.pow(2, Math.ceil(Math.log(value) / Math.LN2));
    },
    floorPowerOfTwo: function (value) {
      return Math.pow(2, Math.floor(Math.log(value) / Math.LN2));
    },
    setQuaternionFromProperEuler: function (q, a, b, c, order) {
      // Intrinsic Proper Euler Angles - see https://en.wikipedia.org/wiki/Euler_angles
      // rotations are applied to the axes in the order specified by 'order'
      // rotation by angle 'a' is applied first, then by angle 'b', then by angle 'c'
      // angles are in radians
      const cos = Math.cos;
      const sin = Math.sin;
      const c2 = cos(b / 2);
      const s2 = sin(b / 2);
      const c13 = cos((a + c) / 2);
      const s13 = sin((a + c) / 2);
      const c1_3 = cos((a - c) / 2);
      const s1_3 = sin((a - c) / 2);
      const c3_1 = cos((c - a) / 2);
      const s3_1 = sin((c - a) / 2);

      switch (order) {
        case 'XYX':
          q.set(c2 * s13, s2 * c1_3, s2 * s1_3, c2 * c13);
          break;

        case 'YZY':
          q.set(s2 * s1_3, c2 * s13, s2 * c1_3, c2 * c13);
          break;

        case 'ZXZ':
          q.set(s2 * c1_3, s2 * s1_3, c2 * s13, c2 * c13);
          break;

        case 'XZX':
          q.set(c2 * s13, s2 * s3_1, s2 * c3_1, c2 * c13);
          break;

        case 'YXY':
          q.set(s2 * c3_1, c2 * s13, s2 * s3_1, c2 * c13);
          break;

        case 'ZYZ':
          q.set(s2 * s3_1, s2 * c3_1, c2 * s13, c2 * c13);
          break;

        default:
          console.warn('THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: ' + order);
      }
    }
  };

  class Quaternion {
    constructor(x = 0, y = 0, z = 0, w = 1) {
      this._x = x;
      this._y = y;
      this._z = z;
      this._w = w;
    }

    static slerp(qa, qb, qm, t) {
      console.warn('THREE.Quaternion: Static .slerp() has been deprecated. Use qm.slerpQuaternions( qa, qb, t ) instead.');
      return qm.slerpQuaternions(qa, qb, t);
    }

    static slerpFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1, t) {
      // fuzz-free, array-based Quaternion SLERP operation
      let x0 = src0[srcOffset0 + 0],
          y0 = src0[srcOffset0 + 1],
          z0 = src0[srcOffset0 + 2],
          w0 = src0[srcOffset0 + 3];
      const x1 = src1[srcOffset1 + 0],
            y1 = src1[srcOffset1 + 1],
            z1 = src1[srcOffset1 + 2],
            w1 = src1[srcOffset1 + 3];

      if (t === 0) {
        dst[dstOffset + 0] = x0;
        dst[dstOffset + 1] = y0;
        dst[dstOffset + 2] = z0;
        dst[dstOffset + 3] = w0;
        return;
      }

      if (t === 1) {
        dst[dstOffset + 0] = x1;
        dst[dstOffset + 1] = y1;
        dst[dstOffset + 2] = z1;
        dst[dstOffset + 3] = w1;
        return;
      }

      if (w0 !== w1 || x0 !== x1 || y0 !== y1 || z0 !== z1) {
        let s = 1 - t;
        const cos = x0 * x1 + y0 * y1 + z0 * z1 + w0 * w1,
              dir = cos >= 0 ? 1 : -1,
              sqrSin = 1 - cos * cos; // Skip the Slerp for tiny steps to avoid numeric problems:

        if (sqrSin > Number.EPSILON) {
          const sin = Math.sqrt(sqrSin),
                len = Math.atan2(sin, cos * dir);
          s = Math.sin(s * len) / sin;
          t = Math.sin(t * len) / sin;
        }

        const tDir = t * dir;
        x0 = x0 * s + x1 * tDir;
        y0 = y0 * s + y1 * tDir;
        z0 = z0 * s + z1 * tDir;
        w0 = w0 * s + w1 * tDir; // Normalize in case we just did a lerp:

        if (s === 1 - t) {
          const f = 1 / Math.sqrt(x0 * x0 + y0 * y0 + z0 * z0 + w0 * w0);
          x0 *= f;
          y0 *= f;
          z0 *= f;
          w0 *= f;
        }
      }

      dst[dstOffset] = x0;
      dst[dstOffset + 1] = y0;
      dst[dstOffset + 2] = z0;
      dst[dstOffset + 3] = w0;
    }

    static multiplyQuaternionsFlat(dst, dstOffset, src0, srcOffset0, src1, srcOffset1) {
      const x0 = src0[srcOffset0];
      const y0 = src0[srcOffset0 + 1];
      const z0 = src0[srcOffset0 + 2];
      const w0 = src0[srcOffset0 + 3];
      const x1 = src1[srcOffset1];
      const y1 = src1[srcOffset1 + 1];
      const z1 = src1[srcOffset1 + 2];
      const w1 = src1[srcOffset1 + 3];
      dst[dstOffset] = x0 * w1 + w0 * x1 + y0 * z1 - z0 * y1;
      dst[dstOffset + 1] = y0 * w1 + w0 * y1 + z0 * x1 - x0 * z1;
      dst[dstOffset + 2] = z0 * w1 + w0 * z1 + x0 * y1 - y0 * x1;
      dst[dstOffset + 3] = w0 * w1 - x0 * x1 - y0 * y1 - z0 * z1;
      return dst;
    }

    get x() {
      return this._x;
    }

    set x(value) {
      this._x = value;

      this._onChangeCallback();
    }

    get y() {
      return this._y;
    }

    set y(value) {
      this._y = value;

      this._onChangeCallback();
    }

    get z() {
      return this._z;
    }

    set z(value) {
      this._z = value;

      this._onChangeCallback();
    }

    get w() {
      return this._w;
    }

    set w(value) {
      this._w = value;

      this._onChangeCallback();
    }

    set(x, y, z, w) {
      this._x = x;
      this._y = y;
      this._z = z;
      this._w = w;

      this._onChangeCallback();

      return this;
    }

    clone() {
      return new this.constructor(this._x, this._y, this._z, this._w);
    }

    copy(quaternion) {
      this._x = quaternion.x;
      this._y = quaternion.y;
      this._z = quaternion.z;
      this._w = quaternion.w;

      this._onChangeCallback();

      return this;
    }

    setFromEuler(euler, update) {
      if (!(euler && euler.isEuler)) {
        throw new Error('THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.');
      }

      const x = euler._x,
            y = euler._y,
            z = euler._z,
            order = euler._order; // http://www.mathworks.com/matlabcentral/fileexchange/
      // 	20696-function-to-convert-between-dcm-euler-angles-quaternions-and-euler-vectors/
      //	content/SpinCalc.m

      const cos = Math.cos;
      const sin = Math.sin;
      const c1 = cos(x / 2);
      const c2 = cos(y / 2);
      const c3 = cos(z / 2);
      const s1 = sin(x / 2);
      const s2 = sin(y / 2);
      const s3 = sin(z / 2);

      switch (order) {
        case 'XYZ':
          this._x = s1 * c2 * c3 + c1 * s2 * s3;
          this._y = c1 * s2 * c3 - s1 * c2 * s3;
          this._z = c1 * c2 * s3 + s1 * s2 * c3;
          this._w = c1 * c2 * c3 - s1 * s2 * s3;
          break;

        case 'YXZ':
          this._x = s1 * c2 * c3 + c1 * s2 * s3;
          this._y = c1 * s2 * c3 - s1 * c2 * s3;
          this._z = c1 * c2 * s3 - s1 * s2 * c3;
          this._w = c1 * c2 * c3 + s1 * s2 * s3;
          break;

        case 'ZXY':
          this._x = s1 * c2 * c3 - c1 * s2 * s3;
          this._y = c1 * s2 * c3 + s1 * c2 * s3;
          this._z = c1 * c2 * s3 + s1 * s2 * c3;
          this._w = c1 * c2 * c3 - s1 * s2 * s3;
          break;

        case 'ZYX':
          this._x = s1 * c2 * c3 - c1 * s2 * s3;
          this._y = c1 * s2 * c3 + s1 * c2 * s3;
          this._z = c1 * c2 * s3 - s1 * s2 * c3;
          this._w = c1 * c2 * c3 + s1 * s2 * s3;
          break;

        case 'YZX':
          this._x = s1 * c2 * c3 + c1 * s2 * s3;
          this._y = c1 * s2 * c3 + s1 * c2 * s3;
          this._z = c1 * c2 * s3 - s1 * s2 * c3;
          this._w = c1 * c2 * c3 - s1 * s2 * s3;
          break;

        case 'XZY':
          this._x = s1 * c2 * c3 - c1 * s2 * s3;
          this._y = c1 * s2 * c3 - s1 * c2 * s3;
          this._z = c1 * c2 * s3 + s1 * s2 * c3;
          this._w = c1 * c2 * c3 + s1 * s2 * s3;
          break;

        default:
          console.warn('THREE.Quaternion: .setFromEuler() encountered an unknown order: ' + order);
      }

      if (update !== false) this._onChangeCallback();
      return this;
    }

    setFromAxisAngle(axis, angle) {
      // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm
      // assumes axis is normalized
      const halfAngle = angle / 2,
            s = Math.sin(halfAngle);
      this._x = axis.x * s;
      this._y = axis.y * s;
      this._z = axis.z * s;
      this._w = Math.cos(halfAngle);

      this._onChangeCallback();

      return this;
    }

    setFromRotationMatrix(m) {
      // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
      // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
      const te = m.elements,
            m11 = te[0],
            m12 = te[4],
            m13 = te[8],
            m21 = te[1],
            m22 = te[5],
            m23 = te[9],
            m31 = te[2],
            m32 = te[6],
            m33 = te[10],
            trace = m11 + m22 + m33;

      if (trace > 0) {
        const s = 0.5 / Math.sqrt(trace + 1.0);
        this._w = 0.25 / s;
        this._x = (m32 - m23) * s;
        this._y = (m13 - m31) * s;
        this._z = (m21 - m12) * s;
      } else if (m11 > m22 && m11 > m33) {
        const s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);
        this._w = (m32 - m23) / s;
        this._x = 0.25 * s;
        this._y = (m12 + m21) / s;
        this._z = (m13 + m31) / s;
      } else if (m22 > m33) {
        const s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);
        this._w = (m13 - m31) / s;
        this._x = (m12 + m21) / s;
        this._y = 0.25 * s;
        this._z = (m23 + m32) / s;
      } else {
        const s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);
        this._w = (m21 - m12) / s;
        this._x = (m13 + m31) / s;
        this._y = (m23 + m32) / s;
        this._z = 0.25 * s;
      }

      this._onChangeCallback();

      return this;
    }

    setFromUnitVectors(vFrom, vTo) {
      // assumes direction vectors vFrom and vTo are normalized
      let r = vFrom.dot(vTo) + 1;

      if (r < Number.EPSILON) {
        // vFrom and vTo point in opposite directions
        r = 0;

        if (Math.abs(vFrom.x) > Math.abs(vFrom.z)) {
          this._x = -vFrom.y;
          this._y = vFrom.x;
          this._z = 0;
          this._w = r;
        } else {
          this._x = 0;
          this._y = -vFrom.z;
          this._z = vFrom.y;
          this._w = r;
        }
      } else {
        // crossVectors( vFrom, vTo ); // inlined to avoid cyclic dependency on Vector3
        this._x = vFrom.y * vTo.z - vFrom.z * vTo.y;
        this._y = vFrom.z * vTo.x - vFrom.x * vTo.z;
        this._z = vFrom.x * vTo.y - vFrom.y * vTo.x;
        this._w = r;
      }

      return this.normalize();
    }

    angleTo(q) {
      return 2 * Math.acos(Math.abs(MathUtils.clamp(this.dot(q), -1, 1)));
    }

    rotateTowards(q, step) {
      const angle = this.angleTo(q);
      if (angle === 0) return this;
      const t = Math.min(1, step / angle);
      this.slerp(q, t);
      return this;
    }

    identity() {
      return this.set(0, 0, 0, 1);
    }

    invert() {
      // quaternion is assumed to have unit length
      return this.conjugate();
    }

    conjugate() {
      this._x *= -1;
      this._y *= -1;
      this._z *= -1;

      this._onChangeCallback();

      return this;
    }

    dot(v) {
      return this._x * v._x + this._y * v._y + this._z * v._z + this._w * v._w;
    }

    lengthSq() {
      return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
    }

    length() {
      return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
    }

    normalize() {
      let l = this.length();

      if (l === 0) {
        this._x = 0;
        this._y = 0;
        this._z = 0;
        this._w = 1;
      } else {
        l = 1 / l;
        this._x = this._x * l;
        this._y = this._y * l;
        this._z = this._z * l;
        this._w = this._w * l;
      }

      this._onChangeCallback();

      return this;
    }

    multiply(q, p) {
      if (p !== undefined) {
        console.warn('THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead.');
        return this.multiplyQuaternions(q, p);
      }

      return this.multiplyQuaternions(this, q);
    }

    premultiply(q) {
      return this.multiplyQuaternions(q, this);
    }

    multiplyQuaternions(a, b) {
      // from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm
      const qax = a._x,
            qay = a._y,
            qaz = a._z,
            qaw = a._w;
      const qbx = b._x,
            qby = b._y,
            qbz = b._z,
            qbw = b._w;
      this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
      this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
      this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
      this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

      this._onChangeCallback();

      return this;
    }

    slerp(qb, t) {
      if (t === 0) return this;
      if (t === 1) return this.copy(qb);
      const x = this._x,
            y = this._y,
            z = this._z,
            w = this._w; // http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

      let cosHalfTheta = w * qb._w + x * qb._x + y * qb._y + z * qb._z;

      if (cosHalfTheta < 0) {
        this._w = -qb._w;
        this._x = -qb._x;
        this._y = -qb._y;
        this._z = -qb._z;
        cosHalfTheta = -cosHalfTheta;
      } else {
        this.copy(qb);
      }

      if (cosHalfTheta >= 1.0) {
        this._w = w;
        this._x = x;
        this._y = y;
        this._z = z;
        return this;
      }

      const sqrSinHalfTheta = 1.0 - cosHalfTheta * cosHalfTheta;

      if (sqrSinHalfTheta <= Number.EPSILON) {
        const s = 1 - t;
        this._w = s * w + t * this._w;
        this._x = s * x + t * this._x;
        this._y = s * y + t * this._y;
        this._z = s * z + t * this._z;
        this.normalize();

        this._onChangeCallback();

        return this;
      }

      const sinHalfTheta = Math.sqrt(sqrSinHalfTheta);
      const halfTheta = Math.atan2(sinHalfTheta, cosHalfTheta);
      const ratioA = Math.sin((1 - t) * halfTheta) / sinHalfTheta,
            ratioB = Math.sin(t * halfTheta) / sinHalfTheta;
      this._w = w * ratioA + this._w * ratioB;
      this._x = x * ratioA + this._x * ratioB;
      this._y = y * ratioA + this._y * ratioB;
      this._z = z * ratioA + this._z * ratioB;

      this._onChangeCallback();

      return this;
    }

    slerpQuaternions(qa, qb, t) {
      this.copy(qa).slerp(qb, t);
    }

    equals(quaternion) {
      return quaternion._x === this._x && quaternion._y === this._y && quaternion._z === this._z && quaternion._w === this._w;
    }

    fromArray(array, offset = 0) {
      this._x = array[offset];
      this._y = array[offset + 1];
      this._z = array[offset + 2];
      this._w = array[offset + 3];

      this._onChangeCallback();

      return this;
    }

    toArray(array = [], offset = 0) {
      array[offset] = this._x;
      array[offset + 1] = this._y;
      array[offset + 2] = this._z;
      array[offset + 3] = this._w;
      return array;
    }

    fromBufferAttribute(attribute, index) {
      this._x = attribute.getX(index);
      this._y = attribute.getY(index);
      this._z = attribute.getZ(index);
      this._w = attribute.getW(index);
      return this;
    }

    _onChange(callback) {
      this._onChangeCallback = callback;
      return this;
    }

    _onChangeCallback() {}

  }

  Quaternion.prototype.isQuaternion = true;

  class Vector3 {
    constructor(x = 0, y = 0, z = 0) {
      this.x = x;
      this.y = y;
      this.z = z;
    }

    set(x, y, z) {
      if (z === undefined) z = this.z; // sprite.scale.set(x,y)

      this.x = x;
      this.y = y;
      this.z = z;
      return this;
    }

    setScalar(scalar) {
      this.x = scalar;
      this.y = scalar;
      this.z = scalar;
      return this;
    }

    setX(x) {
      this.x = x;
      return this;
    }

    setY(y) {
      this.y = y;
      return this;
    }

    setZ(z) {
      this.z = z;
      return this;
    }

    setComponent(index, value) {
      switch (index) {
        case 0:
          this.x = value;
          break;

        case 1:
          this.y = value;
          break;

        case 2:
          this.z = value;
          break;

        default:
          throw new Error('index is out of range: ' + index);
      }

      return this;
    }

    getComponent(index) {
      switch (index) {
        case 0:
          return this.x;

        case 1:
          return this.y;

        case 2:
          return this.z;

        default:
          throw new Error('index is out of range: ' + index);
      }
    }

    clone() {
      return new this.constructor(this.x, this.y, this.z);
    }

    copy(v) {
      this.x = v.x;
      this.y = v.y;
      this.z = v.z;
      return this;
    }

    add(v, w) {
      if (w !== undefined) {
        console.warn('THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
        return this.addVectors(v, w);
      }

      this.x += v.x;
      this.y += v.y;
      this.z += v.z;
      return this;
    }

    addScalar(s) {
      this.x += s;
      this.y += s;
      this.z += s;
      return this;
    }

    addVectors(a, b) {
      this.x = a.x + b.x;
      this.y = a.y + b.y;
      this.z = a.z + b.z;
      return this;
    }

    addScaledVector(v, s) {
      this.x += v.x * s;
      this.y += v.y * s;
      this.z += v.z * s;
      return this;
    }

    sub(v, w) {
      if (w !== undefined) {
        console.warn('THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
        return this.subVectors(v, w);
      }

      this.x -= v.x;
      this.y -= v.y;
      this.z -= v.z;
      return this;
    }

    subScalar(s) {
      this.x -= s;
      this.y -= s;
      this.z -= s;
      return this;
    }

    subVectors(a, b) {
      this.x = a.x - b.x;
      this.y = a.y - b.y;
      this.z = a.z - b.z;
      return this;
    }

    multiply(v, w) {
      if (w !== undefined) {
        console.warn('THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.');
        return this.multiplyVectors(v, w);
      }

      this.x *= v.x;
      this.y *= v.y;
      this.z *= v.z;
      return this;
    }

    multiplyScalar(scalar) {
      this.x *= scalar;
      this.y *= scalar;
      this.z *= scalar;
      return this;
    }

    multiplyVectors(a, b) {
      this.x = a.x * b.x;
      this.y = a.y * b.y;
      this.z = a.z * b.z;
      return this;
    }

    applyEuler(euler) {
      if (!(euler && euler.isEuler)) {
        console.error('THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.');
      }

      return this.applyQuaternion(_quaternion.setFromEuler(euler));
    }

    applyAxisAngle(axis, angle) {
      return this.applyQuaternion(_quaternion.setFromAxisAngle(axis, angle));
    }

    applyMatrix3(m) {
      const x = this.x,
            y = this.y,
            z = this.z;
      const e = m.elements;
      this.x = e[0] * x + e[3] * y + e[6] * z;
      this.y = e[1] * x + e[4] * y + e[7] * z;
      this.z = e[2] * x + e[5] * y + e[8] * z;
      return this;
    }

    applyNormalMatrix(m) {
      return this.applyMatrix3(m).normalize();
    }

    applyMatrix4(m) {
      const x = this.x,
            y = this.y,
            z = this.z;
      const e = m.elements;
      const w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);
      this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
      this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
      this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;
      return this;
    }

    applyQuaternion(q) {
      const x = this.x,
            y = this.y,
            z = this.z;
      const qx = q.x,
            qy = q.y,
            qz = q.z,
            qw = q.w; // calculate quat * vector

      const ix = qw * x + qy * z - qz * y;
      const iy = qw * y + qz * x - qx * z;
      const iz = qw * z + qx * y - qy * x;
      const iw = -qx * x - qy * y - qz * z; // calculate result * inverse quat

      this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
      this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
      this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
      return this;
    }

    project(camera) {
      return this.applyMatrix4(camera.matrixWorldInverse).applyMatrix4(camera.projectionMatrix);
    }

    unproject(camera) {
      return this.applyMatrix4(camera.projectionMatrixInverse).applyMatrix4(camera.matrixWorld);
    }

    transformDirection(m) {
      // input: THREE.Matrix4 affine matrix
      // vector interpreted as a direction
      const x = this.x,
            y = this.y,
            z = this.z;
      const e = m.elements;
      this.x = e[0] * x + e[4] * y + e[8] * z;
      this.y = e[1] * x + e[5] * y + e[9] * z;
      this.z = e[2] * x + e[6] * y + e[10] * z;
      return this.normalize();
    }

    divide(v) {
      this.x /= v.x;
      this.y /= v.y;
      this.z /= v.z;
      return this;
    }

    divideScalar(scalar) {
      return this.multiplyScalar(1 / scalar);
    }

    min(v) {
      this.x = Math.min(this.x, v.x);
      this.y = Math.min(this.y, v.y);
      this.z = Math.min(this.z, v.z);
      return this;
    }

    max(v) {
      this.x = Math.max(this.x, v.x);
      this.y = Math.max(this.y, v.y);
      this.z = Math.max(this.z, v.z);
      return this;
    }

    clamp(min, max) {
      // assumes min < max, componentwise
      this.x = Math.max(min.x, Math.min(max.x, this.x));
      this.y = Math.max(min.y, Math.min(max.y, this.y));
      this.z = Math.max(min.z, Math.min(max.z, this.z));
      return this;
    }

    clampScalar(minVal, maxVal) {
      this.x = Math.max(minVal, Math.min(maxVal, this.x));
      this.y = Math.max(minVal, Math.min(maxVal, this.y));
      this.z = Math.max(minVal, Math.min(maxVal, this.z));
      return this;
    }

    clampLength(min, max) {
      const length = this.length();
      return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
    }

    floor() {
      this.x = Math.floor(this.x);
      this.y = Math.floor(this.y);
      this.z = Math.floor(this.z);
      return this;
    }

    ceil() {
      this.x = Math.ceil(this.x);
      this.y = Math.ceil(this.y);
      this.z = Math.ceil(this.z);
      return this;
    }

    round() {
      this.x = Math.round(this.x);
      this.y = Math.round(this.y);
      this.z = Math.round(this.z);
      return this;
    }

    roundToZero() {
      this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x);
      this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y);
      this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z);
      return this;
    }

    negate() {
      this.x = -this.x;
      this.y = -this.y;
      this.z = -this.z;
      return this;
    }

    dot(v) {
      return this.x * v.x + this.y * v.y + this.z * v.z;
    } // TODO lengthSquared?


    lengthSq() {
      return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    length() {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    manhattanLength() {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
    }

    normalize() {
      return this.divideScalar(this.length() || 1);
    }

    setLength(length) {
      return this.normalize().multiplyScalar(length);
    }

    lerp(v, alpha) {
      this.x += (v.x - this.x) * alpha;
      this.y += (v.y - this.y) * alpha;
      this.z += (v.z - this.z) * alpha;
      return this;
    }

    lerpVectors(v1, v2, alpha) {
      this.x = v1.x + (v2.x - v1.x) * alpha;
      this.y = v1.y + (v2.y - v1.y) * alpha;
      this.z = v1.z + (v2.z - v1.z) * alpha;
      return this;
    }

    cross(v, w) {
      if (w !== undefined) {
        console.warn('THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.');
        return this.crossVectors(v, w);
      }

      return this.crossVectors(this, v);
    }

    crossVectors(a, b) {
      const ax = a.x,
            ay = a.y,
            az = a.z;
      const bx = b.x,
            by = b.y,
            bz = b.z;
      this.x = ay * bz - az * by;
      this.y = az * bx - ax * bz;
      this.z = ax * by - ay * bx;
      return this;
    }

    projectOnVector(v) {
      const denominator = v.lengthSq();
      if (denominator === 0) return this.set(0, 0, 0);
      const scalar = v.dot(this) / denominator;
      return this.copy(v).multiplyScalar(scalar);
    }

    projectOnPlane(planeNormal) {
      _vector.copy(this).projectOnVector(planeNormal);

      return this.sub(_vector);
    }

    reflect(normal) {
      // reflect incident vector off plane orthogonal to normal
      // normal is assumed to have unit length
      return this.sub(_vector.copy(normal).multiplyScalar(2 * this.dot(normal)));
    }

    angleTo(v) {
      const denominator = Math.sqrt(this.lengthSq() * v.lengthSq());
      if (denominator === 0) return Math.PI / 2;
      const theta = this.dot(v) / denominator; // clamp, to handle numerical problems

      return Math.acos(MathUtils.clamp(theta, -1, 1));
    }

    distanceTo(v) {
      return Math.sqrt(this.distanceToSquared(v));
    }

    distanceToSquared(v) {
      const dx = this.x - v.x,
            dy = this.y - v.y,
            dz = this.z - v.z;
      return dx * dx + dy * dy + dz * dz;
    }

    manhattanDistanceTo(v) {
      return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
    }

    setFromSpherical(s) {
      return this.setFromSphericalCoords(s.radius, s.phi, s.theta);
    }

    setFromSphericalCoords(radius, phi, theta) {
      const sinPhiRadius = Math.sin(phi) * radius;
      this.x = sinPhiRadius * Math.sin(theta);
      this.y = Math.cos(phi) * radius;
      this.z = sinPhiRadius * Math.cos(theta);
      return this;
    }

    setFromCylindrical(c) {
      return this.setFromCylindricalCoords(c.radius, c.theta, c.y);
    }

    setFromCylindricalCoords(radius, theta, y) {
      this.x = radius * Math.sin(theta);
      this.y = y;
      this.z = radius * Math.cos(theta);
      return this;
    }

    setFromMatrixPosition(m) {
      const e = m.elements;
      this.x = e[12];
      this.y = e[13];
      this.z = e[14];
      return this;
    }

    setFromMatrixScale(m) {
      const sx = this.setFromMatrixColumn(m, 0).length();
      const sy = this.setFromMatrixColumn(m, 1).length();
      const sz = this.setFromMatrixColumn(m, 2).length();
      this.x = sx;
      this.y = sy;
      this.z = sz;
      return this;
    }

    setFromMatrixColumn(m, index) {
      return this.fromArray(m.elements, index * 4);
    }

    setFromMatrix3Column(m, index) {
      return this.fromArray(m.elements, index * 3);
    }

    equals(v) {
      return v.x === this.x && v.y === this.y && v.z === this.z;
    }

    fromArray(array, offset = 0) {
      this.x = array[offset];
      this.y = array[offset + 1];
      this.z = array[offset + 2];
      return this;
    }

    toArray(array = [], offset = 0) {
      array[offset] = this.x;
      array[offset + 1] = this.y;
      array[offset + 2] = this.z;
      return array;
    }

    fromBufferAttribute(attribute, index, offset) {
      if (offset !== undefined) {
        console.warn('THREE.Vector3: offset has been removed from .fromBufferAttribute().');
      }

      this.x = attribute.getX(index);
      this.y = attribute.getY(index);
      this.z = attribute.getZ(index);
      return this;
    }

    random() {
      this.x = Math.random();
      this.y = Math.random();
      this.z = Math.random();
      return this;
    }

  }

  Vector3.prototype.isVector3 = true;

  const _vector =
  /*@__PURE__*/
  new Vector3();

  const _quaternion =
  /*@__PURE__*/
  new Quaternion();

  const _startP =
  /*@__PURE__*/
  new Vector3();

  const _startEnd =
  /*@__PURE__*/
  new Vector3();

  class Line3 {
    constructor(start = new Vector3(), end = new Vector3()) {
      this.start = start;
      this.end = end;
    }

    set(start, end) {
      this.start.copy(start);
      this.end.copy(end);
      return this;
    }

    copy(line) {
      this.start.copy(line.start);
      this.end.copy(line.end);
      return this;
    }

    getCenter(target) {
      if (target === undefined) {
        console.warn('THREE.Line3: .getCenter() target is now required');
        target = new Vector3();
      }

      return target.addVectors(this.start, this.end).multiplyScalar(0.5);
    }

    delta(target) {
      if (target === undefined) {
        console.warn('THREE.Line3: .delta() target is now required');
        target = new Vector3();
      }

      return target.subVectors(this.end, this.start);
    }

    distanceSq() {
      return this.start.distanceToSquared(this.end);
    }

    distance() {
      return this.start.distanceTo(this.end);
    }

    at(t, target) {
      if (target === undefined) {
        console.warn('THREE.Line3: .at() target is now required');
        target = new Vector3();
      }

      return this.delta(target).multiplyScalar(t).add(this.start);
    }

    closestPointToPointParameter(point, clampToLine) {
      _startP.subVectors(point, this.start);

      _startEnd.subVectors(this.end, this.start);

      const startEnd2 = _startEnd.dot(_startEnd);

      const startEnd_startP = _startEnd.dot(_startP);

      let t = startEnd_startP / startEnd2;

      if (clampToLine) {
        t = MathUtils.clamp(t, 0, 1);
      }

      return t;
    }

    closestPointToPoint(point, clampToLine, target) {
      const t = this.closestPointToPointParameter(point, clampToLine);

      if (target === undefined) {
        console.warn('THREE.Line3: .closestPointToPoint() target is now required');
        target = new Vector3();
      }

      return this.delta(target).multiplyScalar(t).add(this.start);
    }

    applyMatrix4(matrix) {
      this.start.applyMatrix4(matrix);
      this.end.applyMatrix4(matrix);
      return this;
    }

    equals(line) {
      return line.start.equals(this.start) && line.end.equals(this.end);
    }

    clone() {
      return new this.constructor().copy(this);
    }

  }

  class Chunk {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.z = 0;
      this.id = Chunk.getScudzik(x, y);
      this.bbox = [[x, y, 0], [(x + 1) * Chunk.width + 1, (y + 1) * Chunk.height + 1, Chunk.depth + 1]];
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
      // var pad = 0
      // var l = 103, h = 120
      // l = 0
      // h = Chunk.depth
      // var bbox = [
      //     [this.x * Chunk.width + pad, this.y * Chunk.height + pad, l],
      //     [this.x * Chunk.width + Chunk.width - pad, this.y * Chunk.height + Chunk.height - pad, h]
      // ]
      return boxFrustum(frustum, this.bbox);
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
      var here = this.at(x, y, z);
      let {
        illumination
      } = blocks[here];
      return this.lights[z + 1 + PaddedChunk.depth * (y + 1 + PaddedChunk.width * (x + 1))] + illumination;
    }

    static index3d(x, y, z) {
      return z + 1 + PaddedChunk.depth * (y + 1 + PaddedChunk.width * (x + 1));
    }

    static index2d(x, y) {
      return x + 1 + PaddedChunk.height * (y + 1);
    }

  } // SubChunk is a low-level container for a 1x1 chunk with a shell
  // all calls should be in chunk-local space

  _defineProperty(PaddedChunk, "width", 18);

  _defineProperty(PaddedChunk, "height", 18);

  _defineProperty(PaddedChunk, "depth", 258);

  class SubChunk {
    constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
    } // at provides low-level query for a specific value


    at(x, y, z) {
      return this.map[SubChunk.index3d(x, y, z)];
    } // at provides low-level query for a specific value


    light(x, y, z) {
      return this.lights[SubChunk.index3d(x, y, z)];
    }

    index3d(x, y, z) {
      // global-space
      return z - this.z + 1 + SubChunk.depth * (y - this.y + 1 + SubChunk.width * (x - this.x + 1));
    }

    index2d(x, y, z) {
      // global-space
      return x - this.x + 1 + SubChunk.height * (y - this.y + 1);
    }

    static index3d(x, y, z) {
      return z + 1 + SubChunk.depth * (y + 1 + SubChunk.width * (x + 1));
    }

    static index2d(x, y, z) {
      return x + 1 + SubChunk.height * (y + 1);
    }

  }

  _defineProperty(SubChunk, "width", 3);

  _defineProperty(SubChunk, "height", 3);

  _defineProperty(SubChunk, "depth", 3);

  var posB3 = new Vector3(0, 0, 0);
  var posA3 = new Vector3(0, 0, 0); // InfiniteChunkMap wraps the complexity of infinite voxel pages
  // all methods are in global space

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

    setIff(x, y, z, block, iff) {
      var c = this.at(x, y, z);
      if (iff[c]) this.set(x, y, z, block);
    }

    set(x, y, z, block) {
      var target = this.locate(x, y, z);
      if (!target.chunk) return;
      if (!target.chunk.map) debugger;
      var curr = target.chunk.at(target.x, target.y, target.z);
      if (curr == block) return;
      target.chunk.set(target.x, target.y, target.z, block);
      target.chunk.meshDirty = true;
      var currHeight = target.chunk.heights[Chunk.index2d(target.x, target.y)];

      if (block == 0) {
        if (currHeight == target.z) {
          while (target.chunk.at(target.x, target.y, target.z) == 0 && target.z > 0) {
            target.z--;
          }

          target.chunk.heights[Chunk.index2d(target.x, target.y)] = target.z;
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
            if (k >= Chunk.depth) continue;
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
      this.neighbors(chunk, count, function (chunk) {
        neighbors.push(chunk);
        chunk.dist = dist$1(pt, chunk.center);
      });
      neighbors.sort(function (a, b) {
        return b.dist - a.dist;
      });
      return neighbors.slice(0, count);
    }

    within(pt, dist) {
      // if (dist>Chunk.width*3) throw new Error("unable to locate chunks at that range")
      var neighbors = [];
      var [x, y] = pt;
      var {
        chunk
      } = this.locate(x, y, 0);
      this.neighbors(chunk, 49, function (chunk) {
        chunk.dist = dist$1(pt, chunk.center);
        if (chunk.dist > dist) return;
        neighbors.push(chunk);
      });
      neighbors.sort(function (a, b) {
        return b.dist - a.dist;
      });
      return neighbors;
    }

    neighbors(chunk, n, f) {
      if (n == 1) {
        f(chunk);
      }

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

      if (n == 24) {
        for (var i = chunk.x - 2; i <= chunk.x + 2; i++) for (var j = chunk.y - 2; j <= chunk.y + 2; j++) {
          if (i == chunk.x && j == chunk.y) continue;
          f(this.getChunk(i, j));
        }
      }

      if (n == 25) {
        for (var i = chunk.x - 2; i <= chunk.x + 2; i++) for (var j = chunk.y - 2; j <= chunk.y + 2; j++) {
          f(this.getChunk(i, j));
        }
      }

      if (n == 49) {
        for (var i = chunk.x - 3; i <= chunk.x + 3; i++) for (var j = chunk.y - 3; j <= chunk.y + 3; j++) {
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

    subChunk(x, y, z) {
      var pc = new SubChunk(x, y, z);
      pc.map = new Uint8Array(SubChunk.width * SubChunk.height * SubChunk.depth);
      pc.lights = new Uint8Array(SubChunk.width * SubChunk.height * SubChunk.depth);
      pc.heights = new Uint8Array(SubChunk.width * SubChunk.height);

      for (var i = x - 1; i < x + 1 + 1; i++) for (var j = y - 1; j < y + 1 + 1; j++) for (var k = z - 1; k < z + 1 + 1; k++) {
        var block, light, height;
        var block = this.at(i, j, k);
        var light = this.light(i, j, k);
        var height = this.height(i, j);
        var dstID = pc.index3d(i, j, k);
        pc.map[dstID] = block;
        pc.lights[dstID] = light;
        pc.heights[pc.index2d(i, j)] = height;
      }

      return pc;
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

    hitscan(origin, direction) {
      var result = false;
      var self = this;

      function check(x, y, z) {
        if (self.at(x, y, z) > 0) {
          result = {
            x: x,
            y: y,
            z: z
          };
          return true;
        }

        return false;
      }

      raycast(origin, direction, 1000, check);
      return result;
    } // calls callback with every x,y,z between origin and destination
    // modified "destination" in place


    line(origin, destination, callback) {
      sub(destination, destination, origin);
      let len = length(destination);
      normalize(destination, destination);
      raycast(origin, destination, len, callback);
    }

    flood(x, y, z, test) {
      if (!test(x, y, z)) return;
      this.flood(x - 1, y, z, test);
      this.flood(x + 1, y, z, test);
      this.flood(x, y - 1, z, test);
      this.flood(x, y + 1, z, test);
      this.flood(x, y, z - 1, test);
      this.flood(x, y, z + 1, test);
    }

    rasterizeLine(sphere1, sphere2, check) {
      var line;
      var self = this;
      let testPos = new Vector3();

      function replacer(x, y, z) {
        let curr = self.at(x, y, z);
        let replace = check(x, y, z, curr);
        if (replace == curr) return false;
        self.set(x, y, z, replace);
        let pos = new Vector3(x + .5, y + .5, z + .5);
        let d = line.closestPointToPointParameter(pos, true);
        let r = MathUtils.lerp(sphere1[3], sphere2[3], d);
        line.at(d, testPos);
        let dist = pos.distanceTo(testPos);
        return dist < r;
      }

      function startFlood(x, y, z) {
        self.flood(x, y, z, replacer);
      }

      line = new Line3(posA3.fromArray(sphere1), posB3.fromArray(sphere2));
      self.line(sphere1, clone$1(sphere2), startFlood);
    }

    rasterizeCylinder(sphere1, sphere2, check) {
      var line;
      var self = this;
      let testPos = new Vector3();

      function replacer(x, y, z) {
        let curr = self.at(x, y, z);
        let replace = check(x, y, z, curr);
        if (replace == curr) return false;
        self.set(x, y, z, replace);
        let pos = new Vector3(x + .5, y + .5, z + .5);
        let d = line.closestPointToPointParameter(pos, false);
        if (d < 0 || d > 1) return false;
        let r = MathUtils.lerp(sphere1[3], sphere2[3], d);
        line.at(d, testPos);
        let dist = pos.distanceTo(testPos);
        return dist < r;
      }

      function startFlood(x, y, z) {
        self.flood(x, y, z, replacer);
      }

      line = new Line3(posA3.fromArray(sphere1), posB3.fromArray(sphere2));
      self.line(sphere1, clone$1(sphere2), startFlood);
    }

  }
  /**
   * Call the callback with (x,y,z,face) of all blocks along the line
   * segment from point 'origin' in vector direction 'direction' of length
   * 'radius'. 'radius' may be infinite.
   * 
   * 'face' is the normal vector of the face of that block that was entered.
   * It should not be used after the callback returns.
   * 
   * If the callback returns a true value, the traversal will be stopped.
   */

  function raycast(origin, direction, radius, callback) {
    // From "A Fast Voxel Traversal Algorithm for Ray Tracing"
    // by John Amanatides and Andrew Woo, 1987
    // <http://www.cse.yorku.ca/~amana/research/grid.pdf>
    // <http://citeseer.ist.psu.edu/viewdoc/summary?doi=10.1.1.42.3443>
    // Extensions to the described algorithm:
    //   • Imposed a distance limit.
    //   • The face passed through to reach the current cube is provided to
    //     the callback.
    // The foundation of this algorithm is a parameterized representation of
    // the provided ray,
    //                    origin + t * direction,
    // except that t is not actually stored; rather, at any given point in the
    // traversal, we keep track of the *greater* t values which we would have
    // if we took a step sufficient to cross a cube boundary along that axis
    // (i.e. change the integer part of the coordinate) in the variables
    // tMaxX, tMaxY, and tMaxZ.
    // Cube containing origin point.
    var x = Math.floor(origin[0]);
    var y = Math.floor(origin[1]);
    var z = Math.floor(origin[2]); // Break out direction vector.

    var dx = direction[0];
    var dy = direction[1];
    var dz = direction[2]; // Direction to increment x,y,z when stepping.

    var stepX = signum(dx);
    var stepY = signum(dy);
    var stepZ = signum(dz); // See description above. The initial values depend on the fractional
    // part of the origin.

    var tMaxX = intbound(origin[0], dx);
    var tMaxY = intbound(origin[1], dy);
    var tMaxZ = intbound(origin[2], dz); // The change in t when taking a step (always positive).

    var tDeltaX = stepX / dx;
    var tDeltaY = stepY / dy;
    var tDeltaZ = stepZ / dz; // Buffer for reporting faces to the callback.

    var face; // Avoids an infinite loop.

    if (dx === 0 && dy === 0 && dz === 0) throw new RangeError("Raycast in zero direction!"); // Rescale from units of 1 cube-edge to units of 'direction' so we can
    // compare with 't'.

    radius /= Math.sqrt(dx * dx + dy * dy + dz * dz);

    while (true) {
      // Invoke the callback, unless we are not *yet* within the bounds of the
      // world.
      if (callback(x, y, z, face)) break; // tMaxX stores the t-value at which we cross a cube boundary along the
      // X axis, and similarly for Y and Z. Therefore, choosing the least tMax
      // chooses the closest cube boundary. Only the first case of the four
      // has been commented in detail.

      if (tMaxX < tMaxY) {
        if (tMaxX < tMaxZ) {
          if (tMaxX > radius) break; // Update which cube we are now in.

          x += stepX; // Adjust tMaxX to the next X-oriented boundary crossing.

          tMaxX += tDeltaX; // Record the normal vector of the cube face we entered.

          face = stepX > 0 ? 1 : 3;
        } else {
          if (tMaxZ > radius) break;
          z += stepZ;
          tMaxZ += tDeltaZ;
          face = stepZ > 0 ? 4 : 5;
        }
      } else {
        if (tMaxY < tMaxZ) {
          if (tMaxY > radius) break;
          y += stepY;
          tMaxY += tDeltaY;
          face = stepY > 0 ? 0 : 1;
        } else {
          // Identical to the second case, repeated for simplicity in
          // the conditionals.
          if (tMaxZ > radius) break;
          z += stepZ;
          tMaxZ += tDeltaZ;
          face = stepZ > 0 ? 4 : 5;
        }
      }
    }
  }

  function intbound(s, ds) {
    // Find the smallest positive t such that s+t*ds is an integer.
    if (ds < 0) {
      return intbound(-s, -ds);
    } else {
      s = mod(s, 1); // problem is now s+t*ds = 1

      return (1 - s) / ds;
    }
  }

  function signum(x) {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
  }

  function mod(value, modulus) {
    return (value % modulus + modulus) % modulus;
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

  const biomeSmooth = 100; // 1 to Chunk.width*3, performance tuner

  const caveness = [1.5, 4]; // 1.8 to 4.3
  const biomes = {
    "mountain": {
      "weight": 1,
      "height": +.5,
      "caves": 2,
      river: .85
    },
    "plains": {
      "weight": 2,
      "height": +.09,
      "caves": 1,
      river: .88
    },
    "desert": {
      "weight": 1,
      "height": +.04,
      "caves": 1,
      river: .8
    },
    "forest": {
      "weight": 2,
      "height": +.03,
      "caves": 1,
      river: .8
    },
    "ocean": {
      "weight": 1,
      "height": -.5,
      "caves": 1,
      river: 1
    },
    "river": {
      "weight": 2,
      "height": -.2,
      "caves": 1,
      river: .8
    }
  };
  class HillyGenerator {
    constructor(chunkMap) {
      this.seed =  seed ;

      {
        var simplex = new OpenSimplexNoise(this.seed);

        this.noise2D = (x, y) => simplex.noise2D(x, y) / 0.866;

        this.noise3D = simplex.noise3D.bind(simplex);
      }

      this.chunkMap = chunkMap;
      this.seafloor = 3 / 10;
      this.sealevel = 4 / 10;
      this.terraincap = 7 / 10;
      this.lower = Chunk.depth * this.seafloor;
      this.middle = Chunk.depth * this.sealevel;
      this.higher = Chunk.depth * this.terraincap;
      this.benchmarks = {
        generation: 1,
        population: 1
      };
    }

    biome(chunk) {
      if (chunk.initialBiome) return;
      chunk.initialBiome = this.calculateBiome(chunk);
    }

    randomgen(chunk) {
      if (chunk.didRNG) return;
      chunk.didRNG = true;
      this.chunkMap.neighbors(chunk, 9, this.biome.bind(this));
      chunk.rng = seedRandom("" + this.seed + ":" + chunk.id);
      chunk.biome = chunk.initialBiome; // this is a safe moment to do any biome switching we might want to do
      // so long as you inspect initialBiome of other chunks, not their true biome (Cellular Automata)
      // let allBiomes = Object.keys(biomes)
      // chunk.biome = allBiomes[Math.floor(chunk.rng()*allBiomes.length)]

      let rVal = biomes[chunk.initialBiome].river;
      var rivers = 1 - Math.abs(this.noise2D(chunk.x / (30 / rVal) + 5.5, chunk.y / (30 / rVal)) * 2); // rivers *= (1+this.noise2D(chunk.x / 50 + 5.5, chunk.y / 50))/2

      if (rivers > rVal) chunk.biome = "river";
      chunk.center = fromValues$2((chunk.x + chunk.rng()) * Chunk.width, (chunk.y + chunk.rng()) * Chunk.height);
      var eh = biomes[chunk.biome].height;
      chunk.roughHeight = this.middle + eh * (eh < 0 ? this.middle - this.lower : this.higher - this.middle);
      var caveRNG = chunk.rng();
      var radius = caveRNG * caveRNG * (caveness[1] - caveness[0]) + caveness[0];
      chunk.caveBudget = Math.floor(chunk.rng() * 40) + 40;
      chunk.caves = [];

      for (var i = 0; i < biomes[chunk.biome].caves; i++) {
        var heightRNG = 2 * (chunk.rng() - .5);
        heightRNG = Math.sign(heightRNG) * Math.pow(Math.abs(heightRNG), 1);
        heightRNG = heightRNG / 2 + .5;
        chunk.caves.push({
          x: chunk.x * Chunk.width + Math.floor(chunk.rng() * Chunk.width),
          y: chunk.y * Chunk.height + Math.floor(chunk.rng() * Chunk.height),
          z: Math.floor(heightRNG * (chunk.roughHeight * .95) + 5),
          radius: radius
        });
      }
    }

    calculateBiome(chunk) {
      // return "desert"
      var roughness = (this.noise2D(chunk.x / 10 + .5, chunk.y / 10) * 2 + this.noise2D(chunk.x / 20 + .5, chunk.y / 20)) / 3;
      var moisture = (this.noise2D(chunk.x / 8 + .5, chunk.y / 8) * 2 + this.noise2D(chunk.x / 16 + .5, chunk.y / 16)) / 3; // return ["ocean","mountain","desert","plains","forest"][Math.floor(chunk.rng()*5)]
      // return "plains"
      // return roughness>0?"ocean":"forest"

      if (roughness > .3) return "mountain";
      if (roughness < -.3) return "ocean";
      if (moisture < -.3) return "desert";
      if (moisture > .3) return "forest";
      return "plains";
    }

    generate(chunk) {
      if (chunk.map) return;
      this.chunkMap.neighbors(chunk, 49, this.randomgen.bind(this));
      var start = performance.now();
      performance.mark("generate");
      if (!chunk.rng) debugger;
      var xBase = chunk.x;
      var yBase = chunk.y;
      var width = Chunk.width;
      var height = Chunk.height;
      var depth = Chunk.depth;
      var wh = width * height;
      var whd = wh * depth;
      var blockMap = new Uint8Array(whd);
      var heightMap = new Uint8Array(wh);
      var totalHeight = 0;
      var curr = fromValues$2((xBase + .5) * width, (yBase + .5) * height);
      var nearest = this.chunkMap.within(curr, biomeSmooth);
      var distinctBiomes = false;

      for (var i = 0; i < nearest.length; i++) {
        if (nearest[i].biome != chunk.biome) {
          distinctBiomes = true;
          break;
        }
      }

      for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
          var highestBlock = 0;
          var samples = {};
          var totalInvDist = 0;

          if (distinctBiomes) {
            curr = fromValues$2(x + xBase * width, y + yBase * height);
            var sumInvDist = 0;

            for (var i = 0; i < nearest.length; i++) {
              var checkChunk = nearest[i];
              let dist = dist$1(curr, checkChunk.center);
              checkChunk.dist = dist;

              if ( checkChunk.dist > 23) {
                checkChunk.invDist = 0;
                continue;
              }

              samples[checkChunk.biome] = 0; // checkChunk.invDist = (checkChunk.dist ? 1 / Math.pow(checkChunk.dist, biomeBlend) : 1) * biomes[checkChunk.biome].weight

              checkChunk.invDist = 1 - checkChunk.dist / 23;
              sumInvDist += checkChunk.invDist;
            }

            var bestBiome;
            var bestSample = 0;

            for (var i = 0; i < nearest.length; i++) {
              var neighbor = nearest[i];
              if ( neighbor.invDist == 0) continue;
              var invDist = neighbor.invDist / sumInvDist;
              let sample = samples[neighbor.biome] + invDist;
              samples[neighbor.biome] = sample;

              if (sample > bestSample) {
                bestBiome = neighbor.biome;
                bestSample = sample;
              }

              totalInvDist += invDist;
            }
          } else {
            samples[chunk.biome] = 1;
            bestBiome = chunk.biome;
            totalInvDist = 1;
          }

          var mountainSample = samples["mountain"] / totalInvDist;
          var desertSample = samples["desert"] / totalInvDist;
          var forestSample = samples["forest"] / totalInvDist;
          var plainsSample = samples["plains"] / totalInvDist;
          var oceanSample = samples["ocean"] / totalInvDist;
          var riverSample = samples["river"] / totalInvDist;
          var eh = 0;

          if (mountainSample > 0) {
            var mountain = this.noise2D((x + xBase * width) / 160, (y + yBase * height) / 160);
            mountain += this.noise2D((x + xBase * width) / 80, (y + yBase * height) / 80) * .5;
            mountain += this.noise2D((x + xBase * width) / 40, (y + yBase * height) / 40) * .25;
            mountain += this.noise2D((x + xBase * width) / 20, (y + yBase * height) / 20) * .125;
            mountain /= 1.875;

            var _mountain = Math.sign(mountain) * Math.pow(mountain < 0 ? -mountain : mountain, 1.1);

            _mountain = _mountain * .7 + biomes["mountain"].height;
            eh += _mountain * mountainSample;
          }

          if (plainsSample > 0) {
            var plains = this.noise2D((x + xBase * width) / 70, (y + yBase * height) / 70);
            plains += this.noise2D((x + xBase * width) / 35, (y + yBase * height) / 35) * .5;
            plains /= 1.5;

            var _plains = Math.sign(plains) * Math.pow(plains < 0 ? -plains : plains, 1.5);

            _plains = _plains * .1 + biomes["plains"].height;
            eh += _plains * plainsSample;
          }

          if (desertSample > 0) {
            var duneNoise = this.noise2D((x + xBase * width) / 80, (y + yBase * height) / 80);
            var dunes = 1 - Math.abs(duneNoise);
            var flat = this.noise2D((x + xBase * width) / 30, (y + yBase * height) / 30);
            flat += this.noise2D((x + xBase * width) / 15, (y + yBase * height) / 15) * .5;
            flat /= 1.5;

            var _flat = Math.sign(flat) * Math.pow(flat < 0 ? -flat : flat, 2.5);

            _flat = _flat * .2 + biomes["desert"].height;
            eh += Math.max(_flat, (dunes * .2 * 2 + _flat) / 3) * desertSample;
          }

          if (forestSample > 0) {
            var forest = this.noise2D((x + xBase * width) / 80, (y + yBase * height) / 80);
            forest += this.noise2D((x + xBase * width) / 40, (y + yBase * height) / 40) * .5;
            forest += this.noise2D((x + xBase * width) / 20, (y + yBase * height) / 20) * .25;
            forest /= 1.75;

            var _forest = Math.sign(forest) * Math.pow(forest < 0 ? -forest : forest, 1.5);

            _forest = _forest * .15 + biomes["forest"].height;
            eh += _forest * forestSample;
          }

          if (oceanSample > 0) {
            var oceans = this.noise2D((x + xBase * width) / 80, (y + yBase * height) / 80);
            oceans += this.noise2D((x + xBase * width) / 40, (y + yBase * height) / 40) * .5;
            oceans /= 1.5;

            var _oceans = Math.sign(oceans) * Math.pow(oceans < 0 ? -oceans : oceans, 1.5);

            _oceans = _oceans * .4 + biomes["ocean"].height;
            eh += _oceans * oceanSample;
          }

          if (riverSample > 0) {
            var noise = this.noise2D((x + xBase * width) / 40, (y + yBase * height) / 40);
            noise += this.noise2D((x + xBase * width) / 20, (y + yBase * height) / 20) * .5;
            noise += this.noise2D((x + xBase * width) / 10, (y + yBase * height) / 10) * .25;
            noise /= 1.75;

            var _noise = Math.sign(noise) * Math.pow(noise < 0 ? -noise : noise, 1.2);

            _noise = _noise * .15 + biomes["river"].height;
            eh += _noise * riverSample;
          }

          if (isNaN(eh)) {
            debugger;
          }

          var heightHere = this.middle + eh * (eh < 0 ? this.middle - this.lower : this.higher - this.middle);
          console.assert(heightHere > 0);
          var snowModifier;
          if (depth > this.higher - 30) snowModifier = this.noise2D((x + xBase * width) / 15, (y + yBase * height) / 15) * .5 + .5;
          var palette = [2, 6, 1, 10]; // grass, dirt, stone.... sand shores

          if (bestBiome == "desert") palette = [10, 11, 1, 6]; // sand, sandstone, stone... dirt shores

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

              if (z > this.higher - 30 + 10 * snowModifier) {
                blockMap[Chunk.index3d(x, y, z)] = 5;
              } else if (z < heightHere - 3) {
                blockMap[Chunk.index3d(x, y, z)] = palette[2];
              } else if (z < heightHere - 1) {
                blockMap[Chunk.index3d(x, y, z)] = z < this.middle ? palette[3] : palette[1];
              } else {
                blockMap[Chunk.index3d(x, y, z)] = z < this.middle ? palette[3] : palette[0];
              }
            }
          }

          heightMap[Chunk.index2d(x, y)] = highestBlock;
          totalHeight += highestBlock;
        }
      }

      chunk.averageHeight = totalHeight / (Chunk.width * Chunk.height); // console.log("minmax", min, max)

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
          chunk.structures.push(["pine", x + chunk.x * width, y + chunk.y * height, chunk.heights[id] + 1]);
        }

        for (var i = 0; i < 10; i++) {
          var x = Math.floor(chunk.rng() * width),
              y = Math.floor(chunk.rng() * height);
          var id = Chunk.index2d(x, y);
          if (structures[id]) continue;
          structures[id] = 1;
          chunk.structures.push(["tuft", x + chunk.x * width, y + chunk.y * height, chunk.heights[id] + 1]);
        }

        for (var i = 0; i < 5; i++) {
          var x = Math.floor(chunk.rng() * width),
              y = Math.floor(chunk.rng() * height);
          var id = Chunk.index2d(x, y);
          if (structures[id]) continue;
          structures[id] = 1;
          chunk.structures.push(["plant", x + chunk.x * width, y + chunk.y * height, chunk.heights[id] + 1]);
        }
      }

      if (chunk.biome == "plains") {
        if (chunk.rng() < .2) {
          for (var i = 0; i < 5; i++) {
            var x = Math.floor(chunk.rng() * width),
                y = Math.floor(chunk.rng() * height);
            var id = Chunk.index2d(x, y);
            if (structures[id]) continue;
            structures[id] = 1;
            chunk.structures.push(["plant", x + chunk.x * width, y + chunk.y * height, chunk.heights[id] + 1]);
          }
        } else {
          for (var i = 0; i < 12; i++) {
            var x = Math.floor(chunk.rng() * width),
                y = Math.floor(chunk.rng() * height);
            var id = Chunk.index2d(x, y);
            if (structures[id]) continue;
            structures[id] = 1;
            chunk.structures.push(["tuft", x + chunk.x * width, y + chunk.y * height, chunk.heights[id] + 1]);
          }
        }

        for (i = 0; i < (chunk.rng() < .1) ? 1 : 0; i++) {
          var x = Math.floor(chunk.rng() * width),
              y = Math.floor(chunk.rng() * height);
          var id = Chunk.index2d(x, y);
          if (structures[id]) continue;
          structures[id] = 1;
          chunk.structures.push(["tree", x + chunk.x * width, y + chunk.y * height, chunk.heights[id] + 1]);
        }
      }

      if (chunk.biome == "desert") {
        for (var i = 0; i < 8; i++) {
          var x = Math.floor(chunk.rng() * width),
              y = Math.floor(chunk.rng() * height);
          var id = Chunk.index2d(x, y);
          if (structures[id]) continue;
          structures[id] = 1;
          chunk.structures.push(["twig", x + chunk.x * width, y + chunk.y * height, chunk.heights[id] + 1]);
        }

        for (i = 0; i < (chunk.rng() < .01) ? 1 : 0; i++) {
          var x = Math.floor(chunk.rng() * width),
              y = Math.floor(chunk.rng() * height);
          var id = Chunk.index2d(x, y);
          if (structures[id]) continue;
          structures[id] = 1;
          chunk.structures.push(["monolith", x + chunk.x * width, y + chunk.y * height, chunk.heights[id] - 1]);
        }
      }

      let per10kBlocks = chunk.averageHeight * Chunk.width * Chunk.height / 10000;

      for (let i = 0; i < 3 * per10kBlocks; i++) {
        var diamond = {
          block: 17,
          x: chunk.x * width + Chunk.width * chunk.rng(),
          y: chunk.y * height + Chunk.height * chunk.rng(),
          z: chunk.averageHeight * Math.pow(chunk.rng(), 6),
          r: 1.5
        };
        chunk.structures.push(["stone_vein", diamond]);
      }

      for (let i = 0; i < 6 * per10kBlocks; i++) {
        var gold = {
          block: 14,
          x: chunk.x * width + Chunk.width * chunk.rng(),
          y: chunk.y * height + Chunk.height * chunk.rng(),
          z: chunk.averageHeight * Math.pow(chunk.rng(), 4),
          r: 1.6
        };
        chunk.structures.push(["stone_vein", gold]);
      }

      for (let i = 0; i < 10 * per10kBlocks; i++) {
        var iron = {
          block: 15,
          x: chunk.x * width + Chunk.width * chunk.rng(),
          y: chunk.y * height + Chunk.height * chunk.rng(),
          z: chunk.averageHeight * Math.pow(chunk.rng(), 2),
          r: 1.7
        };
        chunk.structures.push(["stone_vein", iron]);
      }

      for (let i = 0; i < 12 * per10kBlocks; i++) {
        var coal = {
          block: 16,
          x: chunk.x * width + Chunk.width * chunk.rng(),
          y: chunk.y * height + Chunk.height * chunk.rng(),
          z: chunk.averageHeight * Math.pow(chunk.rng(), 1),
          r: 1.9
        };
        chunk.structures.push(["stone_vein", coal]);
      }

      let allCavePairs = [];

      for (var i = 0; i < chunk.caves.length; i++) {
        var aCave = chunk.caves[i];
        this.chunkMap.neighbors(chunk, 8, function (c) {
          for (var j = 0; j < c.caves.length; j++) {
            var bCave = c.caves[j];
            var heightOffset = bCave.z == aCave.z ? 1 : Math.abs(bCave.z - aCave.z);
            var score = chunk.rng() + heightOffset / 50;
            allCavePairs.push({
              score: score,
              aCave: aCave,
              bCave: bCave,
              cost: heightOffset
            });
          }
        });
      }

      allCavePairs.sort(function (a, b) {
        return a.score - b.score;
      }); // debugger

      for (let i = 0; i < allCavePairs.length; i++) {
        chunk.caveBudget -= allCavePairs[i].cost;
        if (chunk.caveBudget < 0) break;
        chunk.structures.push(["cave", allCavePairs[i]]); // LIFO, caves should be first
      }

      var time = performance.now() - start;
      performance.measure("Generating Chunk", "generate");
      this.benchmarks.generation = (this.benchmarks.generation + time) / 2;
      return chunk;
    }

    populateChunk(chunk) {
      if (chunk.populated) return;
      this.chunkMap.neighbors(chunk, 25, this.generate.bind(this));
      var start = performance.now();
      performance.mark("populate");
      var item;

      while (item = chunk.structures.pop()) {
        if (item[0] == "cave") {
          var {
            bCave: caveB,
            aCave: caveA
          } = item[1];
          var {
            x,
            y,
            z,
            radius
          } = caveA;
          var {
            x: ox,
            y: oy,
            z: oz,
            radius: oradius
          } = caveB;
          var starting = fromValues$1(x, y, z, radius);
          var ending = fromValues$1(ox, oy, oz, oradius);
          var posA = clone$2(starting);
          var posB = clone$2(starting);
          let resolution = 9; // rasterize a spline in parts

          for (var f = 0; f < 1; f += 1 / resolution) {
            lerp$1(posB, starting, ending, f + 1 / resolution);
            posB[2] = MathUtils.lerp(z, oz, MathUtils.smootherstep(f + 1 / resolution, 0, 1));
            this.chunkMap.rasterizeLine(posA, posB, (x, y, z, curr) => HillyGenerator.caveBlocks[curr] ? 0 : curr);
            copy$2(posA, posB);
          }
        }

        if (item[0] == "monolith") {
          let [, x, y, z] = item;
          x += .5;
          y += .5;
          let height = chunk.rng() * 4 + 4;

          for (let i = 0; i < 4; i++) this.chunkMap.rasterizeCylinder([x, y, z + i * height, 7 - i], [x, y, z + (i + 1) * height, 7 - i], (x, y, z, curr) => curr == 0 ? 18 : curr);

          for (let i = 0; i < 4; i++) this.chunkMap.rasterizeCylinder([x, y, z + i * height, 5 - i], [x, y, z + (i + 1) * height, 5 - i], (x, y, z, curr) => curr == 18 ? 0 : curr);

          this.chunkMap.rasterizeLine([x, y, z + 4, .1], [x, y, z + 4.1, 0], (x, y, z, curr) => curr == 0 ? 19 : curr);
        }

        if (item[0] == "stone_vein") {
          let {
            x,
            y,
            z,
            r,
            block
          } = item[1];
          this.setCircleIf(x, y, z, r, block, HillyGenerator.veinBlocks);
        }

        if (item[0] == "tree") {
          var [, x, y, z] = item;
          var under = this.chunkMap.at(x, y, z - 1);
          if (under != 2) continue;
          this.growTree(x, y, z, chunk);
        }

        if (item[0] == "pine") {
          var [, x, y, z] = item;
          var under = this.chunkMap.at(x, y, z - 1);
          if (under != 2) continue;
          this.growPine(x, y, z, chunk);
        }

        if (item[0] == "plant") {
          var [, x, y, z] = item;
          var under = this.chunkMap.at(x, y, z - 1);
          if (under != 2) continue;
          this.chunkMap.set(x, y, z, 7);
        }

        if (item[0] == "tuft") {
          var [, x, y, z] = item;
          var under = this.chunkMap.at(x, y, z - 1);
          if (under != 10 && under != 2) continue;
          this.chunkMap.set(x, y, z, 8);
        }

        if (item[0] == "twig") {
          var [, x, y, z] = item;
          var under = this.chunkMap.at(x, y, z - 1);
          if (under != 10) continue;
          this.chunkMap.set(x, y, z, 13);
        }
      }

      chunk.populated = true;
      chunk.rng = false;
      var time = performance.now() - start;
      this.benchmarks.population = (this.benchmarks.population + time) / 2;
      performance.measure("Populating Chunk", "populate");
    }

    setCircleIf(x, y, z, radius, dest, iff) {
      for (var i = x - radius; i <= x + radius; i++) for (var j = y - radius; j <= y + radius; j++) for (var k = z - radius; k <= z + radius; k++) {
        if (dist([x, y, z], [i, j, k]) < radius) {
          this.chunkMap.setIff(Math.floor(i), Math.floor(j), Math.floor(k), dest, iff);
        }
      }
    }

    growPine(x, y, z, chunk) {
      let leaves = chunk.rng() > .05;
      let height = chunk.rng() * 2 + 4;
      let base = [x + chunk.rng(), y + chunk.rng(), z, 0];
      let baseEnd = [x + .5, y + .5, z + height, 0];
      let leafStart = [x + .5, y + .5, z + 3, 1.7];
      let leafEnd = [x + .5, y + .5, z + height + 4, .3];
      if (leaves) this.chunkMap.rasterizeCylinder(leafStart, leafEnd, (x, y, z, curr) => curr == 0 ? 4 : curr);
      this.chunkMap.rasterizeLine(base, baseEnd, (x, y, z, curr) => curr == 0 || curr == 4 ? 3 : curr);
    }

    growTree(x, y, z, chunk) {
      let leaves = chunk.rng() > .05;
      let hrng = chunk.rng();
      let height = hrng * hrng * 2 + 3;
      let base = height / 10;
      if (height > 4.2) height *= 3.2;
      let top = [x + .5 + (chunk.rng() - .5) * height / 4, y + .5 + (chunk.rng() - .5) * height / 4, z + height, .4];
      this.chunkMap.rasterizeLine([x + .5, y + .5, z, base], top, (x, y, z, curr) => curr == 0 || curr == 4 ? 3 : curr);
      let d = chunk.rng() * Math.PI;

      for (let i = 0; i < 3; i++) {
        let len = chunk.rng() * 2 + height / 2;

        let _x = x + .5 + Math.sin(d + i * Math.PI * 2 / 3) * len;

        let _y = y + .5 + Math.cos(d + i * Math.PI * 2 / 3) * len;

        let _z = z + height + 2 + 1 * chunk.rng();

        let _r = chunk.rng() + 1; // branches.push([_x,_y,_z,0])


        let tip = [_x, _y, _z, 0];
        this.chunkMap.rasterizeLine(tip, top, (x, y, z, curr) => curr == 0 || curr == 4 ? 3 : curr); // draw balls of leaves

        tip[3] = 1;
        tip[2] -= 1;
        let tipTop = [(_x + x) / 2, (_y + y) / 2, _z + 1, _r];
        if (leaves) this.chunkMap.rasterizeLine(tip, tipTop, (x, y, z, curr) => curr == 0 ? 4 : curr);
      }
    }

  }

  _defineProperty(HillyGenerator, "caveBlocks", {
    1: true,
    2: true,
    6: true,
    10: true,
    11: true,
    12: true,
    14: true,
    15: true,
    16: true,
    17: true
  });

  _defineProperty(HillyGenerator, "veinBlocks", {
    1: true
  });

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
    var imagesPerRow = Math.sqrt(num_images);
    console.assert(isPowerOf2(num_images));
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D_ARRAY, texture);
    const pixels = new Uint8Array([0, 255, 128, 255, 128, 128, 255, 255, 255, 127, 128, 255, 0, 128, 255, 255]);
    gl.texImage3D(gl.TEXTURE_2D_ARRAY, 0, gl.RGBA, 2, 2, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    let maxLevel = 100;
    gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_MAX_LEVEL, maxLevel);
    gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D_ARRAY, gl.TEXTURE_WRAP_T, gl.REPEAT);
    console.log("loading in to overwrite pixels", url);
    const image = new Image();

    image.onload = function () {
      gl.bindTexture(gl.TEXTURE_2D_ARRAY, texture);
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
      } // gl.generateMipmap(gl.TEXTURE_2D_ARRAY);

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

  const textureFilename = "rpg.png";
  const atlasOverride = 0; // optimizations

  const greedy = true;
  class ChunkMesh {
    constructor(x, y, regular, unculled, transparent) {
      this.x = x;
      this.y = y; // if (x==-5 && y==-1) debugger

      this.id = x + "," + y;
      this.regular = regular.combine();
      this.regular.length = this.regular.mesh.length / regular.attrs;
      if (this.regular.elements.length > 0) this.regular.length = this.regular.elements.length;
      this.unculled = unculled.combine();
      this.unculled.length = this.unculled.mesh.length / unculled.attrs;
      if (this.unculled.elements.length > 0) this.unculled.length = this.unculled.elements.length;
      this.transparent = transparent.combine();
      this.transparent.length = this.transparent.mesh.length / transparent.attrs;
      if (this.transparent.elements.length > 0) this.transparent.length = this.transparent.elements.length; // debugger

      this.triangles = this.transparent.length + this.unculled.length + this.regular.length;
    }

    buffers() {
      return [this.regular.mesh.buffer, this.regular.elements.buffer, this.unculled.mesh.buffer, this.unculled.elements.buffer, this.transparent.mesh.buffer, this.transparent.elements.buffer];
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
      this.elements = new Uint32Array(1000000);
      if (this.elements.length == 0) throw new Error("unable to allocate element buffer");
      this.elementIndex = 0;
      this.elementNumber = 0;
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
      if (this.index > this.elements.length) {
        throw new Error("not allowed: more than " + this.elements.length + ` elements`);
      }

      var elements = Uint32Array.from(this.elements.subarray(0, this.elementIndex));
      this.elementIndex = 0;
      this.elementNumber = 0;

      if (this.index > 65000) {
        this.index = 0;
        console.log("chunk with", elements.length, "elements up to", this.index);
        return {
          "mesh": new Uint8Array(0),
          "elements": new Uint8Array(0)
        };
      }

      if (this.index === 0) {
        return {
          "mesh": new Uint8Array(0),
          "elements": new Uint8Array(0)
        };
      }

      if (this.arrays.length === 0) {
        var arr = this.array.slice(0, this.index);
        this.index = 0;
        return {
          "mesh": arr,
          "elements": elements
        };
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
      return {
        "mesh": bigArray,
        "elements": elements
      };
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

      if (this.index + this.attrs >= 150000 && this.index < 150000) {
        console.error("chunk has large index");
        throw new Error("mesh index can't fit");
      }

      if (this.index > 65536) ;

      this.index += this.attrs;
      let id = this.elementNumber;
      this.elementNumber++;
      return id;
    }

    addQuad(c1, c2, c3, c4) {
      this.elements[this.elementIndex] = c1;
      this.elements[this.elementIndex + 1] = c2;
      this.elements[this.elementIndex + 2] = c3;
      this.elements[this.elementIndex + 3] = c3;
      this.elements[this.elementIndex + 4] = c2;
      this.elements[this.elementIndex + 5] = c4;
      this.elementIndex += 6;
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
      aos: [0, 1, 2],
      masks: [4, 1]
    },
    pt2: {
      x: 0,
      y: 0,
      z: 1,
      aos: [6, 7, 0],
      masks: [4, 3]
    },
    pt3: {
      x: 1,
      y: 0,
      z: 0,
      aos: [2, 3, 4],
      masks: [5, 1]
    },
    pt4: {
      x: 0,
      y: 0,
      z: 0,
      aos: [4, 5, 6],
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
      aos: [6, 7, 0],
      masks: [4, 2]
    },
    pt2: {
      x: 1,
      y: 0,
      z: 1,
      aos: [0, 1, 2],
      masks: [4, 0]
    },
    pt3: {
      x: 1,
      y: 1,
      z: 0,
      aos: [4, 5, 6],
      masks: [5, 2]
    },
    pt4: {
      x: 1,
      y: 0,
      z: 0,
      aos: [2, 3, 4],
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
      aos: [6, 7, 0],
      masks: [4, 3]
    },
    pt2: {
      x: 1,
      y: 1,
      z: 1,
      aos: [0, 1, 2],
      masks: [4, 1]
    },
    pt3: {
      x: 0,
      y: 1,
      z: 0,
      aos: [4, 5, 6],
      masks: [5, 3]
    },
    pt4: {
      x: 1,
      y: 1,
      z: 0,
      aos: [2, 3, 4],
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
      aos: [0, 1, 2],
      masks: [4, 0]
    },
    pt2: {
      x: 0,
      y: 1,
      z: 1,
      aos: [6, 7, 0],
      masks: [4, 2]
    },
    pt3: {
      x: 0,
      y: 0,
      z: 0,
      aos: [2, 3, 4],
      masks: [5, 0]
    },
    pt4: {
      x: 0,
      y: 1,
      z: 0,
      aos: [4, 5, 6],
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
      aos: [6, 7, 0],
      masks: [0, 3]
    },
    pt2: {
      x: 1,
      y: 0,
      z: 1,
      aos: [0, 1, 2],
      masks: [0, 1]
    },
    pt3: {
      x: 0,
      y: 1,
      z: 1,
      aos: [4, 5, 6],
      masks: [2, 3]
    },
    pt4: {
      x: 1,
      y: 1,
      z: 1,
      aos: [2, 3, 4],
      masks: [2, 1]
    },
    offsetX: 0,
    offsetY: 0,
    offsetZ: +1,
    neighbors: [[0, -1, 1], [1, -1, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1], [-1, 1, 1], [-1, 0, 1], [-1, -1, 1]]
  }, {
    // lower
    pt1: {
      x: 1,
      y: 1,
      z: 0,
      aos: [2, 3, 4],
      masks: [2, 1]
    },
    pt2: {
      x: 1,
      y: 0,
      z: 0,
      aos: [0, 1, 2],
      masks: [0, 1]
    },
    pt3: {
      x: 0,
      y: 1,
      z: 0,
      aos: [4, 5, 6],
      masks: [2, 3]
    },
    pt4: {
      x: 0,
      y: 0,
      z: 0,
      aos: [6, 7, 0],
      masks: [0, 3]
    },
    offsetX: 0,
    offsetY: 0,
    offsetZ: -1,
    neighbors: [[0, -1, -1], [1, -1, -1], [1, 0, -1], [1, 1, -1], [0, 1, -1], [-1, 1, -1], [-1, 0, -1], [-1, -1, -1]]
  }];
  class BrilliantSurfaceExtractor {
    constructor(w, h, d) {
      this.method = "random";
      this.ao = 1;
      this.fancy = true;
      texScale = 0;
      texWidth = 1;
      tlPadding = 0;
      this.width = w;
      this.height = h;
      this.depth = d;
      this.unculled = new MeshBuilder(5000, 8);
      this.regular = new MeshBuilder(5000, 8);
      this.transparent = new MeshBuilder(5000, 8);
      this.targets = [this.regular, this.transparent, this.unculled];
      this.faceBuffer = {};

      for (var face = 0; face < 6; face++) {
        this.faceBuffer[face] = new Uint32Array(w * h * d);
      }

      this.xStartBuffer = new Uint8Array(w * d);
      this.yStartBuffer = new Uint8Array(h * d);
      this.zStartBuffer = new Uint8Array(w * h);
      this.xEndBuffer = new Uint8Array(w * d);
      this.yEndBuffer = new Uint8Array(h * d);
      this.zEndBuffer = new Uint8Array(w * h);
      this.startBuffers = {
        0: this.xStartBuffer,
        1: this.yStartBuffer,
        2: this.xStartBuffer,
        3: this.yStartBuffer,
        4: this.yStartBuffer,
        5: this.yStartBuffer
      };
      this.endBuffers = {
        0: this.xEndBuffer,
        1: this.yEndBuffer,
        2: this.xEndBuffer,
        3: this.yEndBuffer,
        4: this.yEndBuffer,
        5: this.yEndBuffer
      };
      this.xStartBuffer.fill(w);
      this.yStartBuffer.fill(h);
      this.zStartBuffer.fill(d);
      this.xEndBuffer.fill(0);
      this.yEndBuffer.fill(0);
      this.zEndBuffer.fill(0);
      this.faces = [[], [], [], [], [], []];
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
      let topLight = chunk.light(x, y, z);
      var tx = atlas % 16 * texScale + tlPadding,
          ty = Math.floor(atlas / 16) * texScale + tlPadding; // nw to se

      var c1 = target.add7(x + 1, y + 1, z, topLight, tx + texWidth, ty + texWidth, atlas);
      var c2 = target.add7(x + 0, y + 0, z, topLight, tx, ty + texWidth, atlas);
      var c3 = target.add7(x + 1, y + 1, z + 1, topLight, tx + texWidth, ty, atlas);
      var c4 = target.add7(x + 0, y + 0, z + 1, topLight, tx, ty, atlas);
      target.addQuad(c1, c2, c3, c4); // sw to ne

      var c1 = target.add7(x + 0, y + 1, z + 1, topLight, tx, ty, atlas);
      var c2 = target.add7(x + 0, y + 1, z, topLight, tx, ty + texWidth, atlas);
      var c3 = target.add7(x + 1, y + 0, z + 1, topLight, tx + texWidth, ty, atlas);
      var c4 = target.add7(x + 1, y + 0, z, topLight, tx + texWidth, ty + texWidth, atlas);
      target.addQuad(c1, c2, c3, c4);
    }

    tesselate(chunk) {
      performance.mark("mesh");
      performance.mark("scan");
      var w = Chunk.width,
          h = Chunk.height;
      var wh = w * h;
      this.bounds = {
        x: [w, 0],
        y: [h, 0],
        z: [Chunk.depth, 0]
      };
      this.trackBounds = true;

      for (var _x = 0; _x < wh; _x++) {
        let x, y;

        {
          // these can be used if the chunk is 16x16
          x = _x & 15;
          y = _x >> 4 & 15;
        }

        let column = chunk.heights[PaddedChunk.index2d(x, y)] + 1;

        for (let z = column; z >= 0; z--) {
          this.addVoxel(x, y, z, chunk);
        }
      }

      performance.measure("Scanning Chunk", "scan");
      let mesh = this.finish(chunk.x, chunk.y);
      performance.measure("Meshing Chunk", "mesh");
      return {
        "mesh": mesh,
        "bounds": this.bounds
      };
    }

    addVoxel(x, y, z, chunk) {
      let here = chunk.at(x, y, z);
      if (here == 0) return;
      let block = blocks[here]; // contains a cross

      if (block.culls === 2 && block.type == 1) {
        let target = this.targets[2];
        this.renderCross(chunk, block, target, x, y, z);
        return;
      }

      let occlusions;

      for (let face = 0; face < 6; face++) {
        let {
          offsetX,
          offsetY,
          offsetZ
        } = faces[face];
        let other = chunk.at(x + offsetX, y + offsetY, z + offsetZ);
        let occ = this.occludes(other, here);

        if (occ === 2) {
          if (this.fancy == 1) {
            occ = offsetX < 0 || offsetY < 0 || offsetZ < 0 ? 0 : 1;
          } else {
            occ = true;
          }
        }

        if (occ !== 0) {
          continue;
        }

        if (!occlusions) occlusions = [true, true, true, true, true, true];
        occlusions[face] = false;
      }

      if (!occlusions) return;
      let targetID = 0;
      if (block.culls == 1) targetID = 1;
      if (block.culls == 2) targetID = 2;
      if (!this.fancy) targetID = 0;
      let index = Chunk.index3d(x, y, z);

      for (let face = 0; face < 6; face++) {
        if (occlusions[face]) continue;
        var faceData = this.faceData(chunk, block, x, y, z, face, occlusions);
        faceData = (faceData << 2) + targetID;
        this.faceBuffer[face][index] = faceData;

        {
          this.faces[face].push([x, y, z]);
        }
      }

      if ( this.trackBounds) {
        if (x < this.bounds.x[0]) this.bounds.x[0] = x;
        if (y < this.bounds.y[0]) this.bounds.y[0] = y;
        if (z < this.bounds.z[0]) this.bounds.z[0] = z;
        if (x + 1 > this.bounds.x[1]) this.bounds.x[1] = x + 1;
        if (y + 1 > this.bounds.y[1]) this.bounds.y[1] = y + 1;
        if (z + 1 > this.bounds.z[1]) this.bounds.z[1] = z + 1;
      }
    }

    index3d(x, y, z) {
      return z + this.depth * (y + this.width * x);
    }

    index2d(x, y) {
      return y + this.width * x;
    }

    finish(chunkX, chunkY) {
      this.mergeFaces();

      return new ChunkMesh(chunkX, chunkY, this.regular, this.unculled, this.transparent);
    }

    mergeFaces() {
      // axis, first is the tightest, third should iterate through the chunk in slices
      let axis = {
        0: [[1, 0, 0, this.width], [0, 0, 1, this.depth], [0, 1, 0, this.height]],
        1: [[0, 1, 0, this.height], [0, 0, 1, this.depth], [1, 0, 0, this.width]],
        2: [[1, 0, 0, this.width], [0, 0, 1, this.depth], [0, 1, 0, this.height]],
        3: [[0, 1, 0, this.height], [0, 0, 1, this.depth], [1, 0, 0, this.width]],
        4: [[0, 1, 0, this.height], [1, 0, 0, this.width], [0, 0, 1, this.depth]],
        5: [[0, 1, 0, this.height], [1, 0, 0, this.width], [0, 0, 1, this.depth]] // dimension-generic face merging
        // it has to have slightly special behaviour for top/bottom faces

      };

      for (let face = 0; face < 6; face++) {
        let faceBuffer = this.faceBuffer[face];
        let [axis1, axis2, axis3] = axis[face];
        let [a3x, a3y, a3z, axis3length] = axis3;
        let [a2x, a2y, a2z, axis2length] = axis2;
        let [a1x, a1y, a1z, axis1length] = axis1;
        let self = this;

        let addFace = function (x, y, z) {
          let id = self.index3d(x, y, z);
          let faceData = faceBuffer[id];
          if (!faceData) return 1;
          let primary = 1; // expand along primary axis as much as possible

          while (k + primary < axis1length && greedy) {
            let id = self.index3d(x + primary * a1x, y + primary * a1y, z + primary * a1z);
            let thisFaceData = faceBuffer[id];
            if (thisFaceData != faceData) break;
            faceBuffer[id] = 0;
            primary++;
          } // then expand along the secondary axis


          let secondary = 1;

          while (j + secondary < axis2[3] && greedy) {
            let ok = true;

            for (let _p = 0; _p < primary; _p++) {
              let id = self.index3d(x + _p * a1x + secondary * a2x, y + _p * a1y + secondary * a2y, z + _p * a1z + secondary * a2z);
              let thisFaceData = faceBuffer[id];
              if (thisFaceData == faceData) continue;
              ok = false;
              break;
            }

            if (!ok) break;

            for (let _p = 0; _p < primary; _p++) {
              let id = self.index3d(x + _p * a1x + secondary * a2x, y + _p * a1y + secondary * a2y, z + _p * a1z + secondary * a2z);
              faceBuffer[id] = 0;
            }

            secondary++;
          }

          let _w = primary * a1x + secondary * a2x + 1 * a3x;

          let _h = primary * a1y + secondary * a2y + 1 * a3y;

          let _d = primary * a1z + secondary * a2z + 1 * a3z;

          self.renderFace(x, y, z, _w, _h, _d, face == 4 ? secondary : primary, face == 4 ? primary : secondary, faceData, face);
          return primary;
        };

        if (true) {
          // use the facearray
          for (let i = 0; i < this.faces[face].length; i++) {
            let [x, y, z] = this.faces[face][i];
            addFace(x, y, z);
          }
        } else {
          // iterate through whole buffer
          for (; i < axis3length; i++) {
            for (var j; j < axis2length; j++) {

              for (var k; k < end; k++) {
              }
            }
          }
        }

        faceBuffer.fill(0);
      }

      this.faces = [[], [], [], [], [], []];
    } // render a quad to the buffer at x,y,z, of size w,h,d and texture scale txs, tys


    renderFace(x, y, z, w, h, d, txs, tys, faceData, face) {
      let atlas = faceData >>> 22 & 255;
      let pt1 = faceData >>> 17 & 31;
      let pt2 = faceData >>> 12 & 31;
      let pt3 = faceData >>> 7 & 31;
      let pt4 = faceData >>> 2 & 31;
      let target = this.targets[faceData >>> 0 & 3];
      let tx = atlas % 16 * texScale + tlPadding,
          ty = Math.floor(atlas / 16) * texScale + tlPadding;

      if ((txs > 1 || tys > 1) && atlasOverride) {
        atlas =  atlas;
      }

      let lookup = faces[face];
      let tw = texWidth * txs,
          th = texWidth * tys;

      if (pt1 + pt4 < pt2 + pt3) {
        let c1 = target.add7(x + lookup.pt1.x * w, y + lookup.pt1.y * h, z + lookup.pt1.z * d, pt1, tx, ty, atlas);
        let c2 = target.add7(x + lookup.pt2.x * w, y + lookup.pt2.y * h, z + lookup.pt2.z * d, pt2, tx + tw, ty, atlas);
        let c3 = target.add7(x + lookup.pt3.x * w, y + lookup.pt3.y * h, z + lookup.pt3.z * d, pt3, tx, ty + th, atlas);
        let c4 = target.add7(x + lookup.pt4.x * w, y + lookup.pt4.y * h, z + lookup.pt4.z * d, pt4, tx + tw, ty + th, atlas);
        target.addQuad(c1, c2, c3, c4);
      } else {
        let c1 = target.add7(x + lookup.pt1.x * w, y + lookup.pt1.y * h, z + lookup.pt1.z * d, pt1, tx, ty, atlas);
        let c2 = target.add7(x + lookup.pt2.x * w, y + lookup.pt2.y * h, z + lookup.pt2.z * d, pt2, tx + tw, ty, atlas);
        let c3 = target.add7(x + lookup.pt3.x * w, y + lookup.pt3.y * h, z + lookup.pt3.z * d, pt3, tx, ty + th, atlas);
        let c4 = target.add7(x + lookup.pt4.x * w, y + lookup.pt4.y * h, z + lookup.pt4.z * d, pt4, tx + tw, ty + th, atlas);
        target.addQuad(c1, c2, c3, c4);
      }
    }

    static aoBlendFunc(a, b, c, d) {
      return Math.floor((a + b + c + d) / 4);
    }

    faceData(chunk, block, x, y, z, face, occlusions) {
      let lookup = faces[face];
      let light = chunk.light(x + lookup.offsetX, y + lookup.offsetY, z + lookup.offsetZ);

      if (this.ao == 0) {
        if (face == 0 || face == 1 || face == 2 || face == 3) light -= 1;
        if (face == 4) light += 1; // can shave off like 2% more but not worth it
        //light = Math.floor(light/2)*2 
      }

      if (this.ao == 1) {
        var count = 0;
        if (face == 4) light += 1;
        if (face == 5) light -= 1;

        for (let i = 0; i < 8; i += 2) {
          // skip corners
          let [xo, yo, zo] = lookup.neighbors[i];
          let lightHere = chunk.light(x + xo, y + yo, z + zo);
          if (lightHere < light) count++;
        }

        if (count > 0) {
          light -= 1;
        }
      }

      let pt1 = light;
      let pt2 = light;
      let pt3 = light;
      let pt4 = light;

      if (this.ao == 2 || this.ao == 3) {
        let aos = [light, light, light, light, light, light, light, light]; // loop through all neighbors, no corners if this.ao=2

        for (let i = 0; i < 8; i += this.ao == 3 ? 1 : 2) {
          let [xo, yo, zo] = lookup.neighbors[i];
          let lightHere = chunk.light(x + xo, y + yo, z + zo);
          aos[i] = lightHere;
        }

        pt1 = BrilliantSurfaceExtractor.aoBlendFunc(light, aos[lookup.pt1.aos[0]], aos[lookup.pt1.aos[2]], aos[lookup.pt1.aos[1]]);
        pt2 = BrilliantSurfaceExtractor.aoBlendFunc(light, aos[lookup.pt2.aos[0]], aos[lookup.pt2.aos[2]], aos[lookup.pt2.aos[1]]);
        pt3 = BrilliantSurfaceExtractor.aoBlendFunc(light, aos[lookup.pt3.aos[0]], aos[lookup.pt3.aos[2]], aos[lookup.pt3.aos[1]]);
        pt4 = BrilliantSurfaceExtractor.aoBlendFunc(light, aos[lookup.pt4.aos[0]], aos[lookup.pt4.aos[2]], aos[lookup.pt4.aos[1]]);

        if (this.ao == 3) {
          // corner glinting
          if (!occlusions[lookup.pt1.masks[0]] && !occlusions[lookup.pt1.masks[1]]) pt1 += 1;
          if (!occlusions[lookup.pt2.masks[0]] && !occlusions[lookup.pt2.masks[1]]) pt2 += 1;
          if (!occlusions[lookup.pt3.masks[0]] && !occlusions[lookup.pt3.masks[1]]) pt3 += 1;
          if (!occlusions[lookup.pt4.masks[0]] && !occlusions[lookup.pt4.masks[1]]) pt4 += 1;
        }
      }

      let atlas = block.atlas[face] || 0;
      return ((((atlas << 5) + pt1 << 5) + pt2 << 5) + pt3 << 5) + pt4;
    }

  }
  class ChunkSurfaceMaterial {
    constructor() {
      this.gl = null;
      this.program = {};
      this.modelViewMatrix = create$1();
      this.highlight = null;
      this.tesselator = new BrilliantSurfaceExtractor(Chunk.width, Chunk.height, Chunk.depth);
      this.smallTesselator = new BrilliantSurfaceExtractor(1, 1, 1);
    }

    context(newgl) {
      this.gl = newgl;
      var max = newgl.getParameter(newgl.MAX_ELEMENTS_INDICES);
      console.log("MAX_ELEMENTS_INDICES:", max);
      var allTiles = loadTextureAtlas(this.gl, textureFilename, 256); // var pixel = loadTextureAtlas(this.gl, textureFilename, 1)
      // for(var i = 0; i < 10; i++) {
      // burn the cpu for no reason
      // loadTextureAtlas(this.gl, textureFilename, 1)
      // }

      let pixel;
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
          texture: allTiles,
          pixel: pixel
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
          texture: allTiles,
          pixel: pixel
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
          texture: allTiles,
          pixel: pixel
        };
      }
      console.log("chunks program info:", this.regular);
    }

    blit(chunk) {
      // debugger
      if (chunk.uploaded) return;
      chunk.uploaded = true;
      let attrs = 8;
      let type = this.gl.UNSIGNED_BYTE;
      let size = 1;

      if (chunk.regular.length > 0) {
        var mesh = chunk.regular.mesh; // new Float32Array(chunk.regular.mesh)

        chunk.regular.vao = this.gl.createVertexArray();
        this.gl.bindVertexArray(chunk.regular.vao);
        chunk.regular.vbo = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, chunk.regular.vbo);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, mesh, this.gl.STATIC_DRAW);
        chunk.regular.mesh = null;

        if (chunk.regular.elements.length > 0) {
          chunk.regular.ids = this.gl.createBuffer();
          this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, chunk.regular.ids);
          this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, chunk.regular.elements, this.gl.STATIC_DRAW);
        }

        this.gl.vertexAttribPointer(this.regular.attribLocations.vertexPosition, 3, type, false, attrs * size, 0 * size);
        this.gl.enableVertexAttribArray(this.regular.attribLocations.vertexPosition);
        this.gl.vertexAttribPointer(this.regular.attribLocations.vertexLight, 1, type, false, attrs * size, 3 * size);
        this.gl.enableVertexAttribArray(this.regular.attribLocations.vertexLight);
        this.gl.vertexAttribPointer(this.regular.attribLocations.vertexTexture, 2, type, false, attrs * size, 4 * size);
        this.gl.enableVertexAttribArray(this.regular.attribLocations.vertexTexture);
        this.gl.vertexAttribPointer(this.regular.attribLocations.vertexAtlas, 1, type, false, attrs * size, 6 * size);
        this.gl.enableVertexAttribArray(this.regular.attribLocations.vertexAtlas);
      }

      if (chunk.unculled.length > 0) {
        var mesh = chunk.unculled.mesh; // new Float32Array(chunk.unculled.mesh)

        chunk.unculled.vao = this.gl.createVertexArray();
        this.gl.bindVertexArray(chunk.unculled.vao);
        chunk.unculled.vbo = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, chunk.unculled.vbo);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, mesh, this.gl.STATIC_DRAW);
        chunk.unculled.mesh = null;

        if (chunk.unculled.elements.length > 0) {
          chunk.unculled.ids = this.gl.createBuffer();
          this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, chunk.unculled.ids);
          this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, chunk.unculled.elements, this.gl.STATIC_DRAW);
        }

        this.gl.vertexAttribPointer(this.unculled.attribLocations.vertexPosition, 3, type, false, attrs * size, 0 * size);
        this.gl.enableVertexAttribArray(this.unculled.attribLocations.vertexPosition);
        this.gl.vertexAttribPointer(this.unculled.attribLocations.vertexLight, 1, type, false, attrs * size, 3 * size);
        this.gl.enableVertexAttribArray(this.unculled.attribLocations.vertexLight);
        this.gl.vertexAttribPointer(this.unculled.attribLocations.vertexTexture, 2, type, false, attrs * size, 4 * size);
        this.gl.enableVertexAttribArray(this.unculled.attribLocations.vertexTexture);
        this.gl.vertexAttribPointer(this.unculled.attribLocations.vertexAtlas, 1, type, false, attrs * size, 6 * size);
        this.gl.enableVertexAttribArray(this.unculled.attribLocations.vertexAtlas);
      }

      if (chunk.transparent.length > 0) {
        var mesh = chunk.transparent.mesh; // new Float32Array(chunk.transparent.mesh)

        chunk.transparent.vao = this.gl.createVertexArray();
        this.gl.bindVertexArray(chunk.transparent.vao);
        chunk.transparent.vbo = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, chunk.transparent.vbo);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, mesh, this.gl.STATIC_DRAW);
        chunk.transparent.mesh = null;

        if (chunk.transparent.elements.length > 0) {
          chunk.transparent.ids = this.gl.createBuffer();
          this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, chunk.transparent.ids);
          this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, chunk.transparent.elements, this.gl.STATIC_DRAW);
        }

        this.gl.vertexAttribPointer(this.transparent.attribLocations.vertexPosition, 3, type, false, attrs * size, 0 * size);
        this.gl.enableVertexAttribArray(this.transparent.attribLocations.vertexPosition);
        this.gl.vertexAttribPointer(this.transparent.attribLocations.vertexLight, 1, type, false, attrs * size, 3 * size);
        this.gl.enableVertexAttribArray(this.transparent.attribLocations.vertexLight);
        this.gl.vertexAttribPointer(this.transparent.attribLocations.vertexTexture, 2, type, false, attrs * size, 4 * size);
        this.gl.enableVertexAttribArray(this.transparent.attribLocations.vertexTexture);
        this.gl.vertexAttribPointer(this.transparent.attribLocations.vertexAtlas, 1, type, false, attrs * size, 6 * size);
        this.gl.enableVertexAttribArray(this.transparent.attribLocations.vertexAtlas);
      }
    }

    free(chunk) {
      if (!chunk.uploaded) return;
      chunk.uploaded = false;
      this.gl.deleteBuffer(chunk.regular.vbo);
      this.gl.deleteVertexArray(chunk.regular.vao);
      chunk.regular.vbo = null;
      this.gl.deleteBuffer(chunk.unculled.vbo);
      this.gl.deleteVertexArray(chunk.unculled.vao);
      chunk.unculled.vbo = null;
      this.gl.deleteBuffer(chunk.transparent.vbo);
      this.gl.deleteVertexArray(chunk.transparent.vao);
      chunk.transparent.vbo = null;
    }

    render(renderEvent, chunkMap) {
      var chunks = chunkMap.chunks;
      var time = Date.now() / 25000 % 1;
      copy(this.modelViewMatrix, renderEvent.viewMatrix);
      var maximumRender = 10000;
      var rList = [];
      var countRenderableChunks = 0;

      for (let chunk of chunks.values()) {
        if (!chunk.uploaded) continue;
        if (chunk.renderSize == 0) continue;

        if (chunk.unculled.length + chunk.regular.length + chunk.transparent.length == 0) {
          continue;
        }

        countRenderableChunks++;

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

      if (rList.length == 0) {
        return {
          countDrawCalls: 0,
          countChunks: 0,
          countFrustum: 0,
          countTris: 0
        };
      }

      var countDrawCalls = 0,
          countTris = 0;
      this.gl.activeTexture(this.gl.TEXTURE0);
      this.gl.bindTexture(this.gl.TEXTURE_2D_ARRAY, this.regular.texture);
      this.gl.useProgram(this.regular.program);
      this.gl.uniformMatrix4fv(this.regular.uniformLocations.projectionMatrix, false, renderEvent.projectionMatrix);
      this.gl.uniform1i(this.regular.uniformLocations.sampler, 0);
      this.gl.disable(this.gl.BLEND);
      this.gl.enable(this.gl.DEPTH_TEST);
      this.gl.depthFunc(this.gl.LEQUAL);
      this.gl.enable(this.gl.CULL_FACE);
      this.gl.vertexAttrib1f(this.regular.attribLocations.vertexAtlas, 224);

      for (var i = 0; i < rList.length; i++) {
        var chunk = rList[i];
        var rSize = chunk.renderSize;
        if (Math.floor(rSize * chunk.regular.length) == 0) continue;
        if (countDrawCalls > maximumRender) break;
        countDrawCalls++;
        this.gl.uniformMatrix4fv(this.regular.uniformLocations.modelViewMatrix, false, chunk.modelViewMatrix);
        this.gl.bindVertexArray(chunk.regular.vao);
        this.gl.drawElements(this.gl.TRIANGLES, Math.floor(rSize * chunk.regular.length), this.gl.UNSIGNED_INT, 0);
        countTris += Math.floor(rSize * chunk.regular.length);
      }

      this.gl.useProgram(this.unculled.program);
      this.gl.uniformMatrix4fv(this.unculled.uniformLocations.projectionMatrix, false, renderEvent.projectionMatrix);
      this.gl.uniform1i(this.unculled.uniformLocations.sampler, 0);
      this.gl.disable(this.gl.CULL_FACE);
      this.gl.vertexAttrib1f(this.unculled.attribLocations.vertexAtlas, 11);

      for (var i = 0; i < rList.length; i++) {
        var chunk = rList[i];
        var rSize = chunk.renderSize;
        if (Math.floor(rSize * chunk.unculled.length) == 0) continue;
        if (countDrawCalls > maximumRender) break;
        countDrawCalls++;
        this.gl.uniformMatrix4fv(this.unculled.uniformLocations.modelViewMatrix, false, chunk.modelViewMatrix);
        this.gl.bindVertexArray(chunk.unculled.vao);
        this.gl.drawElements(this.gl.TRIANGLES, Math.floor(rSize * chunk.unculled.length), this.gl.UNSIGNED_INT, 0);
        countTris += Math.floor(rSize * chunk.unculled.length);
      }

      this.gl.useProgram(this.transparent.program);
      this.gl.uniformMatrix4fv(this.transparent.uniformLocations.projectionMatrix, false, renderEvent.projectionMatrix);
      this.gl.uniform1f(this.transparent.uniformLocations.time, time);
      this.gl.uniform1i(this.transparent.uniformLocations.sampler, 0);
      this.gl.enable(this.gl.BLEND);
      this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
      this.gl.vertexAttrib1f(this.transparent.attribLocations.vertexAtlas, 255);

      for (var i = 0; i < rList.length; i++) {
        var chunk = rList[i];
        var rSize = chunk.renderSize;
        if (Math.floor(rSize * chunk.transparent.length) == 0) continue;
        if (countDrawCalls > maximumRender) break;
        countDrawCalls++;
        this.gl.uniformMatrix4fv(this.transparent.uniformLocations.modelViewMatrix, false, chunk.modelViewMatrix);
        this.gl.bindVertexArray(chunk.transparent.vao);
        this.gl.drawElements(this.gl.TRIANGLES, Math.floor(rSize * chunk.transparent.length), this.gl.UNSIGNED_INT, 0);
        countTris += Math.floor(rSize * chunk.transparent.length);
      }

      if (this.highlight) {
        let {
          x,
          y,
          z
        } = this.highlight;
        var tempChunk = chunkMap.subChunk(x, y, z);
        this.smallTesselator.addVoxel(0, 0, 0, tempChunk);
        var chunk = this.smallTesselator.finish();

        if (chunk.triangles > 0) {
          this.blit(chunk);
          var translation = create$2();
          set(translation, x, y, z);
          var modelViewMatrix = clone(renderEvent.viewMatrix);
          translate(modelViewMatrix, modelViewMatrix, translation);
          var program = chunk.regular.length ? "regular" : chunk.transparent.length ? "transparent" : "unculled";
          this.gl.enable(this.gl.POLYGON_OFFSET_FILL);
          this.gl.polygonOffset(-1.0, -.1);
          this.gl.blendFunc(this.gl.CONSTANT_COLOR, this.gl.SRC_COLOR);
          this.gl.depthFunc(this.gl.LEQUAL); // this.gl.enable(this.gl.CULL_FACE)

          this.gl.useProgram(this[program].program);
          this.gl.uniformMatrix4fv(this[program].uniformLocations.projectionMatrix, false, renderEvent.projectionMatrix);
          this.gl.uniformMatrix4fv(this[program].uniformLocations.modelViewMatrix, false, modelViewMatrix);
          this.gl.bindVertexArray(chunk[program].vao);
          this.gl.drawElements(this.gl.TRIANGLES, chunk[program].length, this.gl.UNSIGNED_INT, 0);
          this.gl.disable(this.gl.POLYGON_OFFSET_FILL);
          this.free(chunk);
        }
      }

      return {
        countDrawCalls: countDrawCalls,
        countChunks: countRenderableChunks,
        countFrustum: rList.length - countRenderableChunks,
        countTris: countTris
      };
    }

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

    const float gamma = 0.2;
    const float maxLight = 17.0;

    float inverse_smoothstep( float x ) {
        return 0.5 - sin(asin(1.0-2.0*x)/3.0);
    }

    void main(void) {
        vec4 pos = uModelViewMatrix * aVertexPosition;
        vec4 realPos = aVertexPosition;
        vec2 tex = aVertexTexture;

        vAtlas = int(aVertexAtlas);
        // #ifdef TRANSPARENT
        // if (vAtlas == 222) {
        //     float a = cos((pos.x/5.0)+uTime*6.0*3.1415926538);
        //     float b = sin((pos.y/4.0)+uTime*8.0*3.1415926538);
        //     tex.x += a/5.0;
        //     tex.y += b/5.0;
        //     realPos.z += -.18 + (a/20.0 + b/20.0) * .8;
        // }
        // #endif

        gl_Position = uProjectionMatrix * uModelViewMatrix * realPos;

        vLight = mix(gamma, 1.0, aVertexLight/maxLight);

        // bool xo = (mod(pos.x, 2.0)==0.0);
        // bool yo = (mod(pos.y, 2.0)==0.0);
        // // bool zo = (mod(pos.z, 2.0)==0.0);
        // if (xo && (tex.x == 0.0)) {
        //     tex.x += 1.0;
        // }
        
        vTextureCoord = tex/1.0;
    }

    #endif 
    
    #ifdef FRAG_SHADER
    
    precision mediump float;
    precision mediump int;
    precision mediump sampler2DArray;
    precision mediump sampler2D;

    in float vLight;
    in vec2 vTextureCoord;
    flat in int vAtlas;

    uniform sampler2DArray uSampler;

    out vec4 FragColor;

    void main(void) {
        // #ifdef TRANSPARENT
        vec2 tex = vTextureCoord;
        // #else
        // vec2 tex = clamp(vTextureCoord, 0.0, 1.0);
        // #endif

        vec4 textureColor = vec4(1.0,1.0,1.0,1.0); //
        textureColor = texture(uSampler, vec3(tex*16.0/16.0, vAtlas));
        // textureColor = texture(uSampler, vec2(tex*16.0/16.0));
        float lighting = vLight;
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

        // FragColor = vec4(lighting,lighting,lighting,1.0);
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
      this.host = document.currentScript.parentNode;
      this.events = new events();
      this.supports = {
        webgl2: true,
        webworker: true
      };
      this.debug = {};
      this.debugElement = {};
      this.lastText = "";
      this.profiles = {};
      this.nextRefresh = Date.now();
      this.events.on("step", this.refreshDebugNow.bind(this));
      this.camera = {
        position: create$2(),
        target: [0, 0, 1]
      };
    }

    start() {
      window.setInterval(() => this.events.emit("step"), 25);
      var overlay = document.createElement("div");
      overlay.style = "position:absolute;bottom:0;left:0;width:100%;font-family:monospace;";
      this.overlay = overlay;
      var optionsElement = document.createElement("div");
      this.optionsElement = optionsElement;
      overlay.appendChild(optionsElement);
      var qualityElement = document.createElement("select");
      var values = ["Low", "Medium", "High", "Best"];
      qualityElement.name = "Quality Options";

      for (var i = 0; i < values.length; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = values[i];
        qualityElement.appendChild(option);
      }

      qualityElement.value = 2;
      this.qualityElement = qualityElement;
      optionsElement.appendChild(qualityElement);
      var debugElement = document.createElement("div");
      debugElement.style = "background:rgba(200,200,200,.5);outline:1px solid black;width:100%;";
      this.debugElement = debugElement;
      overlay.appendChild(debugElement);
      var renderDistanceElement = document.createElement("input");
      renderDistanceElement.type = "range";
      renderDistanceElement.value = 7;
      renderDistanceElement.min = 1;
      renderDistanceElement.max = 31;
      renderDistanceElement.step = 1;
      this.renderDistanceElement = renderDistanceElement;
      optionsElement.appendChild(renderDistanceElement);
      var canvas = document.createElement("canvas");
      this.canvas = canvas;
      canvas.style.float = "right";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      window.devicePixelRatio = 1;
      var gl =  canvas.getContext("webgl2", {
        alpha: false,
        antialias: false,
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
      this.host.appendChild(canvas);
      this.inputs = new Inputs(this);
      this.host.style.padding = "0";
      this.host.style.margin = "0";
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
      this.loadingBar = document.createElement("h1");
      this.loadingBar.innerText = "Loading... ";
      loadingScreen.appendChild(this.loadingBar);
      loadingScreen.style = "display:flex;align-items:center;justify-content: center;position:absolute;width:100%;height:100%;";
      this.host.appendChild(loadingScreen);

      this.finishedLoading = function () {
        this.host.removeChild(loadingScreen);
        this.host.appendChild(overlay);
      };

      this.events.emit("context", {
        gl: gl,
        canvas: canvas,
        supports: this.supports
      });
      var lastFrame = performance.now();
      var efps = 500;
      var timerPending = false;
      let query;
      let timers = {
        cpu: 1,
        gpu: 1,
        delay: 0,
        total: 2
      };
      let frames = [];
      let ext = gl.getExtension('EXT_disjoint_timer_query_webgl2');
      document.title = "VOKS DUM";

      function render(fTime) {
        frames = frames.filter(function (t) {
          return t > fTime - 1000;
        });
        var start = performance.now();
        window.requestAnimationFrame(render.bind(this));

        if (!timerPending && ext) {
          query = gl.createQuery();
          gl.beginQuery(ext.TIME_ELAPSED_EXT, query);
        }

        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0.529, 0.807, 0.921, 1.0);
        gl.clearDepth(1.0);
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
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        this.events.emit("render", renderEvent);
        let metricSmoothing = 60;

        if (ext) {
          if (!timerPending) {
            gl.endQuery(ext.TIME_ELAPSED_EXT);
            timerPending = true;
          } else {
            setTimeout(function () {
              if (!query) return;
              let available = gl.getQueryParameter(query, gl.QUERY_RESULT_AVAILABLE);
              let disjoint = gl.getParameter(ext.GPU_DISJOINT_EXT);

              if (available && !disjoint) {
                let timeElapsed = gl.getQueryParameter(query, gl.QUERY_RESULT) / 1000000;
                timers.gpu = (timers.gpu * metricSmoothing + timeElapsed) / (metricSmoothing + 1);
              }

              timerPending = false;
              gl.deleteQuery(query);
              query = false;
            }.bind(this), 1);
          }
        }

        timers.cpu = (timers.cpu * metricSmoothing + (performance.now() - start)) / (metricSmoothing + 1);
        timers.delay = (timers.delay * metricSmoothing + (start - fTime)) / (metricSmoothing + 1);
        timers.total = (timers.total * metricSmoothing + (timers.cpu + timers.gpu + timers.delay)) / (metricSmoothing + 1);
        if (timers.total > 0.001) efps = 1000 / timers.total;
        lastFrame = start;

        let f = val => (Math.floor(val * 10) / 10).toFixed(1);

        let p = val => Math.floor(val).toString().padStart(4, " ");

        this.debug.FPS = `${p(efps)}/${frames.push(fTime)} CPU:${f(timers.cpu)} GPU:${f(timers.gpu)} DEL:${f(timers.delay)}`;
      }

      var errCheck = 0;
      this.events.on("step", function () {
        errCheck++;

        if (errCheck > 10) {
          errCheck = 0;
          var err = gl.getError();

          if (err) {
            this.debug.error = "gl:" + err;
            console.error("gl error", this.debug.error);
          }
        }

        resize(canvas);
      }.bind(this));
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
      var avg = Math.floor(this.profiles[label].sum / this.profiles[label].count * 10) / 10; // this.debug[label] = "sum(" + sum + ") avg(" + avg + " x " + this.profiles[label].count + ")"
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
      var html = `<table style="padding:4px">`;
      var props = [];

      for (var prop in this.debug) {
        if (Object.prototype.hasOwnProperty.call(this.debug, prop)) {
          props.push(prop);
        }
      }

      props.sort();

      for (var i = 0; i < props.length; i++) {
        if (isNaN(this.debug[props[i]])) {
          html += `<tr><td style="padding:4px;font-weight:bold">` + props[i] + "</td><td>" + this.debug[props[i]] + "</td></tr>";
        } else if (props[i].startsWith("auto")) {
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
    jump: " ",
    place: "f" // Player should be initialized when the 0,0 chunk is ready

  };
  class Player {
    constructor(canvas, chunkMap) {
      this.events = new events();
      this.chunkMap = chunkMap;
      this.pitch = 0;
      this.yaw = 0;
      this.angle = create$4();
      this._looking = create$4();
      var {
        chunk
      } = this.chunkMap.locate(4, 4, 200);
      this.currentChunk = chunk;
      var height = chunk.heights[Chunk.index2d(4, 4)];
      this.position = fromValues(4.5, 4.5, height + 1);
      this.jumpedAndHeld = false; // gently try to face them away from a wall

      if (height > chunk.heights[Chunk.index2d(5, 4)]) {
        this.yaw = 0;
      } else if (height > chunk.heights[Chunk.index2d(3, 4)]) {
        this.yaw = 180;
      } else if (height > chunk.heights[Chunk.index2d(4, 5)]) {
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
      this.targetVoxel = false;
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
      var rayDir = create$2();
      sub(rayDir, this.camera.target, this.camera.position);
      this.targetVoxel = this.chunkMap.hitscan(this.camera.position, rayDir);
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
          friction = this.jetpack ? .95 : .7;
      var swimming = this.swimming();
      var alreadyColliding = this.colliding();

      if (this.inputs.input[bindings.forward]) {
        var impulse = fromValues$2(power, 0);
        rotate(impulse, impulse, [0, 0], this.yaw * Math.PI / 180);
        add(this.speed, this.speed, [impulse[0], impulse[1], 0]);
      }

      if (this.inputs.input[bindings.backward]) {
        var impulse = fromValues$2(-power, 0);
        rotate(impulse, impulse, [0, 0], this.yaw * Math.PI / 180);
        add(this.speed, this.speed, [impulse[0], impulse[1], 0]); // alreadyColliding = true
      }

      if (this.inputs.input[bindings.left]) {
        var impulse = fromValues$2(0, power);
        rotate(impulse, impulse, [0, 0], this.yaw * Math.PI / 180);
        add(this.speed, this.speed, [impulse[0], impulse[1], 0]);
      }

      if (this.inputs.input[bindings.right]) {
        var impulse = fromValues$2(0, -power);
        rotate(impulse, impulse, [0, 0], this.yaw * Math.PI / 180);
        add(this.speed, this.speed, [impulse[0], impulse[1], 0]);
      }

      if (this.inputs.input[bindings.place] && this.targetVoxel) {
        let {
          x,
          y,
          z
        } = this.targetVoxel;
        this.chunkMap.set(x, y, z, 17); // this.position[0] += 1000000
      }

      if (this.onground) this.jetpack = false;
      if (alreadyColliding) this.jetpack = true;

      if (this.inputs.input[bindings.jump]) {
        if (swimming) {
          this.speed[2] += .03;
        }

        if (this.onground) {
          if (this.jumpedAndHeld) this.jetpack = true;
          this.jumpedAndHeld = true;
          this.speed[2] = .17;
        }
      } else {
        this.jumpedAndHeld = false;
      }

      if (this.inputs.input[bindings.jump] && this.jetpack) this.speed[2] = (this.speed[2] * 5 + .5) / 6;
      this.position[0] += this.speed[0];

      while (!alreadyColliding && this.colliding()) {
        this.position[0] -= this.speed[0];
        this.speed[0] -= Math.sign(this.speed[0]) * .1;

        if (this.speed[0] < .1) {
          this.speed[0] = 0;
          break;
        }

        this.position[0] += this.speed[0];
      }

      this.position[1] += this.speed[1];

      while (!alreadyColliding && this.colliding()) {
        this.position[1] -= this.speed[1];
        this.speed[1] -= Math.sign(this.speed[1]) * .1;

        if (this.speed[1] < .1) {
          this.speed[1] = 0;
          break;
        }

        this.position[1] += this.speed[1];
      }

      var swimmingBeforeVertical = this.swimming();
      var swimmingAfterVertical = swimmingBeforeVertical;
      this.onground = false;
      this.position[2] += this.speed[2];

      while (!alreadyColliding && this.colliding()) {
        if (this.speed[2] < 0) {
          this.onground = true;
        }

        this.position[2] -= this.speed[2];
        this.speed[2] -= Math.sign(this.speed[2]) * .1;

        if (this.speed[2] < .1) {
          this.speed[2] = 0;
          break;
        }

        this.position[2] += this.speed[2];
      }

      if (swimmingBeforeVertical && this.speed[2] > 0) {
        // breached water check
        swimmingAfterVertical = this.swimming();
        if (!swimmingAfterVertical) add(this.speed, this.speed, [0, 0, .1]);
      }

      this.speed[0] *= friction;
      this.speed[1] *= friction;

      if (swimmingBeforeVertical) {
        this.speed[2] *= .8;
        add(this.speed, this.speed, [0, 0, -.01]);
      } else {
        this.speed[2] *= .99;
        add(this.speed, this.speed, [0, 0, -.014]);
      }

      if (this.targetVoxel) {
        let {
          x: vx,
          y: vy,
          z: vz
        } = this.targetVoxel;
        let {
          x: tx,
          y: ty,
          z: tz,
          chunk
        } = this.chunkMap.locate(vx, vy, vz);
        let type = chunk.at(tx, ty, tz);
        this.canvas.debug["Looking At"] = JSON.stringify({
          "block": blocks[type],
          "dirty": chunk.meshDirty
        });
      } else {
        this.canvas.debug["Looking At"] = "nothing";
      }

      var pos = [Math.floor(this.position[0]), Math.floor(this.position[1]), Math.floor(this.position[2])];
      var target = this.chunkMap.query(pos[0], pos[1], pos[2], pos[0], pos[1], pos[2]);

      if (target.length == 1) {
        this.canvas.debug["Position"] = pos + " " + target[0].data.name + " in chunk " + target[0].chunk.id + " " + target[0].chunk.biome;
      } else {
        this.canvas.debug["Position"] = pos + " out-of-bounds";
      }

      let [x, y] = this.position;
      this.currentChunk = this.chunkMap.locate(x, y).chunk;
      this.canvas.debug.Biomes = JSON.stringify(this.chunkMap.biomes());
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

    render(ev) {
      // debugger
      let {
        countDrawCalls,
        countChunks,
        countFrustum,
        countTris
      } = this.renderer.render(ev, this.chunks);
      this.canvas.debug.Chunks = `RenderDistance: ${this.cache.renderDistance} Chunks: ${countChunks}/${this.chunks.chunks.size} ${countFrustum} `;
      this.canvas.debug.Chunks += `WebGL:${countDrawCalls} TRIS:${countTris}`;
    }

    step() {
      // let the host know the area we're in
      if (!this.player) return;
      this.renderer.highlight = this.player.targetVoxel;
      let rd = this.canvas.renderDistanceElement.value;
      var center = this.player.currentChunk;
      var q = parseInt(this.canvas.qualityElement.value);

      if (this.cache.quality !== q) {
        this.cache.quality = q; // debugger

        for (let chunk of this.chunks.chunks.values()) {
          chunk.meshDirty = true;
        }
      }

      if (center.id != this.cache.chunkID || rd != this.cache.renderDistance) {
        this.pipe({
          "event": "chunk_of_interest",
          "x": center.x,
          "y": center.y
        });
        console.log("old chunk", this.cache.chunkID, "new chunk", center);
        this.cache.chunkID = this.player.currentChunk.id;
        this.cache.renderDistance = rd;

        for (let chunk of this.chunks.chunks.values()) {
          chunk.isHot = false;
          chunk.isVisible = false;
          chunk.shouldShow = false;
          chunk.shouldHide = true;
        } // update the status of chunks in our viewing range


        var toSend = this.chunks.spiral(center.x, center.y, 39);

        for (var i = 0; i < toSend.length; i++) {
          let chunk = toSend[i];
          chunk.isHot = true;
          chunk.isVisible = dist$1([center.x, center.y], [chunk.x, chunk.y]) <= this.cache.renderDistance;
        }
      } // update the visibility flag


      for (let chunk of this.chunks.chunks.values()) {
        if (!chunk.isHot) continue;
        if (!chunk.isVisible) continue;
        chunk.shouldHide = false;
        if (!chunk.map) continue;
        var count = 0;
        this.chunks.neighbors(chunk, 8, function (chunk) {
          if (chunk.map) count++;
          chunk.isHot = true;
          chunk.shouldHide = false;
        });
        if (count < 8) continue; // neighbors are all ready, lets get this rendering

        chunk.shouldShow = true;
      }

      var allowedWork = 10; // for every chunk, see if we need to free things

      for (let chunk of this.chunks.chunks.values()) {
        // create or destroy the mesh
        if (chunk.shouldShow) {
          if (!chunk.meshUploaded && chunk.meshReady) {
            this.renderer.blit(chunk);
            chunk.meshUploaded = true;
            chunk.meshReady = false;
            console.timeStamp("blit chunk");
          }

          if (chunk.meshDirty && !chunk.meshPending && allowedWork > 0) {
            allowedWork -= 1;
            var padded = this.chunks.padded(chunk);
            this.work({
              "event": "tesselate",
              "chunk": padded,
              "quality": this.cache.quality
            }, [padded.map.buffer, padded.lights.buffer, padded.heights.buffer]);
            chunk.meshPending = true;
            chunk.meshDirty = false;
          }
        }

        if (chunk.shouldHide) {
          if (chunk.meshUploaded) {
            chunk.renderSize -= .02;

            if (chunk.renderSize < 0) {
              this.renderer.free(chunk);
              chunk.meshUploaded = false;
              chunk.meshDirty = true;
            }
          }
        } else {
          if (chunk.meshUploaded) {
            chunk.renderSize += .02;

            if (chunk.renderSize > 1) {
              chunk.renderSize = 1;
            }
          }
        } // clean this chunk up entirely


        if (!chunk.isHot) {
          console.log("freeing", chunk, chunk.id);
          if (chunk.wasSent) this.pipe({
            "event": "unloaded_chunk",
            "x": chunk.x,
            "y": chunk.y
          });
          chunk.wasSent = false;
          chunk.map = null;
          chunk.lights = null;
          this.chunks.chunks.delete(chunk.id);
        }
      }
    }

    handle_main(ev) {
      var start = performance.now();

      switch (ev.event) {
        case "profile":
          // console.log("worker did handle", ev.label, "in", ev.ms)
          this.canvas.addProfile({
            "label": ev.label,
            "ms": ev.ms
          });

          try {
            let prof = `Ms `,
                profs = this.canvas.profiles;
            prof += `TFC:${Math.floor(profs.event_start_new_world.sum / profs.event_start_new_world.count * 10) / 10} `;
            prof += `POP:${Math.floor(profs.chunk_populate.sum / profs.chunk_populate.count * 10) / 10} `;
            prof += `GEN:${Math.floor(profs.chunk_generate.sum / profs.chunk_generate.count * 10) / 10} `;
            prof += `TES:${Math.floor(profs.event_tesselate.sum / profs.event_tesselate.count * 10) / 10} `;
            prof += `GCC:${Math.floor(profs.get_completed_chunk.sum / profs.get_completed_chunk.count * 10) / 10} `;
            this.canvas.debug.Generation = prof;
          } catch {}

          return;

        case "start":
          this.work({
            "event": "start_as_worker"
          });
          this.pipe({
            "event": "start_new_world"
          });
          this.canvas = new Canvas();
          return;

        case "prepare_world":
          this.chunks = new InfiniteChunkMap();
          this.renderer = new ChunkSurfaceMaterial(this.canvas);
          this.cache = {};
          this.canvas.events.on("context", ({
            gl
          }) => this.renderer.context(gl));
          this.canvas.events.on("render", this.render.bind(this));
          this.canvas.events.on("step", this.step.bind(this));
          this.canvas.start();
          this.canvas.loadingBar.innerText = "Generating...";
          return;

        case "spawn":
          this.player = new Player(this.canvas, this.chunks);

          for (let chunk of this.chunks.chunks.values()) {
            chunk.renderSize = 1;
          }

          this.step();
          this.canvas.finishedLoading();
          return;

        case "new_chunk":
          this.canvas.loadingBar.innerText = "Meshing...";
          var chunk = this.chunks.getChunk(ev.chunk.x, ev.chunk.y);
          chunk.map = ev.chunk.map;
          chunk.lights = ev.chunk.lights;
          chunk.heights = ev.chunk.heights;
          chunk.biome = ev.chunk.biome;
          chunk.wasSent = true;
          chunk.meshDirty = true;
          chunk.renderSize = 0;
          return;

        case "tesselated":
          let {
            chunk_mesh: mesh,
            chunk_bounds: bounds
          } = ev;
          var chunk = this.chunks.getChunk(mesh.x, mesh.y);
          chunk.bbox = [[chunk.x * Chunk.width + bounds.x[0], chunk.y * Chunk.height + bounds.y[0], chunk.z * Chunk.depth + bounds.z[0]], [chunk.x * Chunk.width + bounds.x[1], chunk.y * Chunk.height + bounds.y[1], chunk.z * Chunk.depth + bounds.z[1]]];
          chunk.regular = mesh.regular;
          chunk.unculled = mesh.unculled;
          chunk.transparent = mesh.transparent;
          chunk.meshReady = true;
          chunk.meshPending = false;
          if (!chunk.meshUploaded) return; // dont log the normal case

          var oldRS = chunk.renderSize;
          this.renderer.free(chunk);
          this.renderer.blit(chunk);
          chunk.renderSize = oldRS;
          return;

        default:
          console.warn("unknown event", ev);
          break;
      }

      this.canvas.addProfile({
        "label": "event_" + ev.event,
        "ms": performance.now() - start
      }); // console.log("handled", ev)
    }

    tick_host() {
      var toSend = this.chunks.spiral(this.hotChunk.x, this.hotChunk.y, 35);
      var work = 0;

      for (var i = 0; i < toSend.length; i++) {
        if (work > 4) break;
        var chunk = toSend[i];
        if (chunk.sent) continue; // debugger

        var start = performance.now();
        this.lighter.buildLightList(chunk);
        this.pipe({
          "event": "new_chunk",
          "chunk": chunk
        });
        this.pipe({
          event: "profile",
          label: "get_completed_chunk",
          ms: performance.now() - start
        });
        this.pipe({
          event: "profile",
          label: "chunk_generate",
          ms: this.generator.benchmarks.generation
        });
        this.pipe({
          event: "profile",
          label: "chunk_populate",
          ms: this.generator.benchmarks.population
        });
        chunk.sent = true;
        work++;
      }
    }

    handle_worker(ev) {
      var start = performance.now();

      switch (ev.event) {
        case "start_new_world":
          this.chunks = new InfiniteChunkMap();
          this.generator = new HillyGenerator(this.chunks);
          this.lighter = new RadiosityLights(this.chunks, this.generator.populateChunk.bind(this.generator));
          this.pipe({
            event: "prepare_world"
          });
          var toSend = this.chunks.spiral(0, 0, 3);

          for (var i = 0; i < toSend.length; i++) {
            var chunk = toSend[i];
            this.lighter.buildLightList(chunk);
            this.pipe({
              "event": "new_chunk",
              "chunk": chunk
            });
            chunk.sent = true;
          }

          this.pipe({
            "event": "spawn"
          });
          this.hotChunk = this.chunks.getChunk(0, 0);
          setInterval(this.tick_host.bind(this));
          break;

        case "unloaded_chunk":
          var chunk = this.chunks.getChunk(ev.x, ev.y);
          if (!chunk.sent) debugger;
          chunk.sent = false;
          return;

        case "chunk_of_interest":
          this.hotChunk = this.chunks.getChunk(ev.x, ev.y);
          return;
        // skip profiling and such

        case "start_as_worker":
          this.chunks = new InfiniteChunkMap();
          this.tesselator = new BrilliantSurfaceExtractor(Chunk.width, Chunk.height, Chunk.depth);
          return;

        case "tesselate":
          var chunk = new PaddedChunk(ev.chunk.x, ev.chunk.y);
          chunk.map = ev.chunk.map;
          chunk.lights = ev.chunk.lights;
          chunk.heights = ev.chunk.heights;
          this.tesselator.ao = ev.quality;
          this.tesselator.fancy = ev.quality != 0;
          var {
            mesh,
            bounds
          } = this.tesselator.tesselate(chunk);
          this.pipe({
            "event": "tesselated",
            "chunk_mesh": mesh,
            "chunk_bounds": bounds
          }, mesh.buffers());
          break;

        default:
          console.warn("unknown event", ev);
          break;
      }

      this.pipe({
        event: "profile",
        label: "event_" + ev.event,
        ms: performance.now() - start
      });
    }

  }

  class Orchestrator {
    constructor(mode) {
      this.work = [];
      this.working = false;
      var self = this;

      switch (mode) {
        case "client":
          if ( window.Worker) {
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
      } // console.log("created new orchestrator in mode:", mode)

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
