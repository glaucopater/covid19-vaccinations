import React, { useRef, useEffect } from 'react'
import { useFrame, useThree } from 'react-three-fiber'
import { extend } from 'react-three-fiber'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend({ OrbitControls })

export const CameraControls = () => {
    const { camera, gl, invalidate } = useThree();
    const ref = useRef();
    useFrame(() => ref.current.update());
    useEffect(() => void ref.current.addEventListener('change', invalidate), [invalidate]);
    return <orbitControls ref={ref} enableDamping args={[camera, gl.domElement]} />;
}