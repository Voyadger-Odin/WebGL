import { useEffect, useRef, useState } from 'react';

import { hexToRgb } from '@/shared/lib/utils';

import { IBuffers, initBuffers, initShaderProgram } from '../lib/utils';

import { vertexShader } from '../util/shaders';

interface InputProps {
  mainColor: string;
}

interface ShaderCanvasProps {
  shaderData: string;
  inputProps: InputProps;
  size?: number;
  onClick?: () => void;
  hasActiveReminders?: boolean;
  hasUpcomingReminders?: boolean;
  isRunning?: boolean;
  className?: string;
}

interface IProgramInfo {
  program: WebGLProgram;
  attribLocations: {
    vertexPosition: GLint;
    textureCoord: GLint;
  };
  uniformLocations: {
    iResolution: WebGLUniformLocation | null;
    iTime: WebGLUniformLocation | null;
    iMouse: WebGLUniformLocation | null;
    mainColor: WebGLUniformLocation | null;
    hasActiveReminders: WebGLUniformLocation | null;
    hasUpcomingReminders: WebGLUniformLocation | null;
    disableCenterDimming: WebGLUniformLocation | null;
  };
}

export const ShaderCanvas = ({
  shaderData,
  inputProps,
  size = 600,
  onClick,
  hasActiveReminders = false,
  hasUpcomingReminders = false,
  isRunning = true,
  className,
}: ShaderCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const mousePositionRef = useRef<[number, number]>([0.5, 0.5]); // Store mouse position in ref instead of state
  const mainColorRef = useRef<[number, number, number]>([0.5, 0.5, 0.5]); // Store mouse position in ref instead of state
  const programInfoRef = useRef<IProgramInfo | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Track mouse position relative to the canvas without causing re-renders
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mousePositionRef.current = [x, y]; // Update ref, not state
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Use the vertex shader and selected fragment shader
    const vsSource = vertexShader;
    const fsSource = shaderData;

    // Initialize shader program
    const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
    if (!shaderProgram) return;

    programInfoRef.current = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
      },
      uniformLocations: {
        iResolution: gl.getUniformLocation(shaderProgram, 'iResolution'),
        iTime: gl.getUniformLocation(shaderProgram, 'iTime'),
        iMouse: gl.getUniformLocation(shaderProgram, 'iMouse'),
        mainColor: gl.getUniformLocation(shaderProgram, 'mainColor'),
        hasActiveReminders: gl.getUniformLocation(shaderProgram, 'hasActiveReminders'),
        hasUpcomingReminders: gl.getUniformLocation(
          shaderProgram,
          'hasUpcomingReminders',
        ),
        disableCenterDimming: gl.getUniformLocation(
          shaderProgram,
          'disableCenterDimming',
        ),
      },
    };

    // Create buffers
    const buffers = initBuffers(gl);
    const startTime = Date.now();

    // Set canvas size
    canvas.width = size as number;
    canvas.height = size as number;
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Render function
    const render = () => {
      const currentTime = (Date.now() - startTime) / 1000;

      // Get the current mouse position from ref
      const mousePos = mousePositionRef.current;
      const mainColor = mainColorRef.current;

      drawScene(
        gl!,
        programInfoRef.current,
        buffers,
        currentTime,
        canvas.width,
        canvas.height,
        !!hasActiveReminders,
        !!hasUpcomingReminders,
        mousePos, // Pass current mouse position from ref
        mainColor,
      );
      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationRef.current);
      // Clean up WebGL resources
      if (gl && shaderProgram) {
        gl.deleteProgram(shaderProgram);
      }
    };
  }, [size, hasActiveReminders, hasUpcomingReminders, shaderData, isRunning]);

  // Draw the scene
  function drawScene(
    gl: WebGLRenderingContext,
    programInfo: IProgramInfo | null,
    buffers: IBuffers,
    currentTime: number,
    width: number,
    height: number,
    hasActiveReminders: boolean,
    hasUpcomingReminders: boolean,
    mousePos: [number, number],
    mainColor: [number, number, number],
  ) {
    if (!programInfo) {
      return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clearDepth(1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Tell WebGL to use our program when drawing
    gl.useProgram(programInfo.program);

    // Set shader uniforms
    gl.uniform2f(programInfo.uniformLocations.iResolution, width, height);
    gl.uniform1f(programInfo.uniformLocations.iTime, isRunning ? currentTime : 0);
    gl.uniform2f(programInfo.uniformLocations.iMouse, mousePos[0], mousePos[1]);
    gl.uniform3f(
      programInfo.uniformLocations.mainColor,
      mainColor[0],
      mainColor[1],
      mainColor[2],
    );
    gl.uniform1i(
      programInfo.uniformLocations.hasActiveReminders,
      hasActiveReminders ? 1 : 0,
    );
    gl.uniform1i(
      programInfo.uniformLocations.hasUpcomingReminders,
      hasUpcomingReminders ? 1 : 0,
    );
    // For the main shader, we keep center dimming enabled for reminder text readability
    gl.uniform1i(programInfo.uniformLocations.disableCenterDimming, 0);

    // Set vertex position attribute
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      2, // 2 components per vertex
      gl.FLOAT, // the data is 32-bit floats
      false, // don't normalize
      0, // stride
      0, // offset
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition); // Set texture coordinate attribute
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
    gl.vertexAttribPointer(
      programInfo.attribLocations.textureCoord,
      2, // 2 components per vertex
      gl.FLOAT, // the data is 32-bit floats
      false, // don't normalize
      0, // stride
      0, // offset
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);

    // Draw
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
    gl.drawElements(
      gl.TRIANGLES,
      6, // vertex count
      gl.UNSIGNED_SHORT, // type
      0, // offset
    );
  }

  // Handle mouse leave - reset mouse position to center when cursor leaves canvas
  const handleMouseLeave = () => {
    setIsHovered(false);
    mousePositionRef.current = [0.5, 0.5]; // Reset to center
  };

  useEffect(() => {
    const mainColor = hexToRgb(inputProps.mainColor);
    if (mainColor) {
      mainColorRef.current = [mainColor.r / 255, mainColor.g / 255, mainColor.b / 255];
    }
  }, [inputProps]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: '100%',
        height: '100%',
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    />
  );
};
