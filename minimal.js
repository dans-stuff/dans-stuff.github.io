const numFaces = 5000
const numChunks = 25

window.onload = function () {
    var canvas = document.createElement("canvas")
    canvas.style.float = "right"
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    window.devicePixelRatio = 1;
    document.body.appendChild(canvas)
    var displayWidth = canvas.clientWidth * 1;
    var displayHeight = canvas.clientHeight * 1;
    canvas.width = displayWidth;
    canvas.height = displayHeight;

    // start webgl
    var gl = canvas.getContext("webgl2", {
        powerPreference: "high-performance",
        alpha: false, antialias: false
    })
    if (!gl) console.log("failed to initialize gl")

    var program = initShaderProgram(gl, vert, frag)
    var aPos = gl.getAttribLocation(program, 'aVertexPosition')
    var aTex = gl.getAttribLocation(program, 'aVertexTexture')
    var uSampler = gl.getUniformLocation(program, 'uSampler')
    var uView = gl.getUniformLocation(program, 'uView')

    // create 2x2 texture
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    const pixels = new Uint8Array([0, 255, 128, 255, 128, 128, 255, 255, 255, 127, 128, 255, 0, 128, 255, 255]);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 2, 2, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    // create chunk meshes

    var chunks = []
    const perSide = Math.floor(Math.sqrt(numChunks))
    for (var i = -1; i < 1; i += 1 / perSide) {
        for (var j = -1; j < 1; j += 1 / perSide) {
            const attrs = 4
            var verts = []
            for (var f = 0; f < numFaces; f++) {
                var posx = (Math.random() * 2 - 1) / perSide
                var posy = (Math.random() * 2 - 1) / perSide
                var size = Math.random() * 0.01
                verts.push(
                    posx - size, posy - size, 0, 0,
                    posx + size, posy - size, 1, 0,
                    posx + size, posy + size, 1, 1
                )
            }
            var mesh = new Float32Array(verts)
            var vao = gl.createVertexArray()
            gl.bindVertexArray(vao)

            var vbo = gl.createBuffer()
            gl.bindBuffer(gl.ARRAY_BUFFER, vbo)
            gl.bufferData(gl.ARRAY_BUFFER, mesh, gl.STATIC_DRAW)
            gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 4 * attrs, 4 * 0);
            gl.enableVertexAttribArray(aPos);
            gl.vertexAttribPointer(aTex, 2, gl.FLOAT, false, 4 * attrs, 4 * 2);
            gl.enableVertexAttribArray(aTex);
            chunks.push({ vao: vao, pos: [i, j], tris: mesh.length / attrs })
        }
    }

    console.log("any error", gl.getError())

    function render() {
        window.requestAnimationFrame(render)
        gl.viewport(0, 0, canvas.width, canvas.height)
        gl.clearColor(0.529, 0.807, 0.921, 1.0); gl.clearDepth(1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

        // setup material
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.useProgram(program);
        gl.uniform1i(uSampler, 0)

        gl.disable(gl.BLEND)
        gl.enable(gl.DEPTH_TEST)
        gl.depthFunc(gl.LEQUAL)
        gl.enable(gl.CULL_FACE)

        // render mesh
        for (var i = 0; i < chunks.length; i++) {
            gl.uniform2fv(uView, chunks[i].pos)
            gl.bindVertexArray(chunks[i].vao)
            gl.drawArrays(gl.TRIANGLES, 0, chunks[i].tris);
        }
    }
    window.requestAnimationFrame(render)
}


const vert = `#version 300 es
precision highp float;
precision highp sampler2DArray;

uniform vec2 uView;

in vec2 aVertexPosition;
in vec2 aVertexTexture;

out vec2 vTextureCoord;

void main(void) {
    gl_Position = vec4(aVertexPosition+uView,0.0,1.0);
    vTextureCoord = aVertexTexture;
}
`

const frag = `#version 300 es
precision highp float;
precision highp sampler2D;

in vec2 vTextureCoord;
uniform sampler2D uSampler;

out vec4 FragColor;

void main(void) {
    vec4 textureColor = vec4(1.0,1.0,1.0,1.0); 
    textureColor = texture(uSampler, vec2(vTextureCoord));
    FragColor = vec4(textureColor.rgb, 1);
}
`


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