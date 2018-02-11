//vertex shader
attribute vec3 pos;
uniform mat4 mvpMat;

void main(void)
{
    gl_Position =mvpMat * vec4(pos, 1.0);
}

//fragment shader
void main(void)
{
    gl_FragColor =vec4(1.0. 1.0, 1.0, 1.0);
}