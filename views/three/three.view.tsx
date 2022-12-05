import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring } from 'react-spring';
import { Mesh } from "three";
import { createRef, useEffect } from 'react';
import { ThemeType, TopicType, TypeType } from '../../lib/types';
			
export type ThreeViewProps = {
	topics: TopicType[];
	type: TypeType;
	theme: ThemeType; 
}

export const Tape = () => {
	const tapeRef = createRef<Mesh>();

	useFrame(() => {
    tapeRef.current.rotation.y += 0.01;
  });

	return (
		<mesh ref={tapeRef} rotation={[Math.PI / 1, 2, 1.575]}>
			<boxGeometry args={[0.5, 3, 2]} />
			<meshStandardMaterial />
		</mesh>
	)
}

export const ThreeView = (props: ThreeViewProps) => {
	const { topics, type, theme } = { ...props };

	const handleRotation = (mesh: Mesh) => {
		if (mesh?.current) {
			mesh.current.rotation.z = 0;
			mesh.current.rotation.y = 1.575;
			mesh.current.rotation.x = 0;
		} 
	}

	const { x } = useSpring({
			from: { x: 0 },
			config: { frequency: 1 },
		})

	useEffect(() => {
		x.start({ config: { velocity: 0 } })
		x.start({ config: { friction: 20 } })
	}, [])

  return (
		<>
		<Canvas style={{ width: '100%', height: '100vh'}}> 
			<ambientLight intensity={0.075} />
			<directionalLight color="grey" position={[0, 0, 0]} />
			<Tape/>
		</Canvas>
		{/* <button onClick={}>Rotate</button> */}
		</>
  )
}