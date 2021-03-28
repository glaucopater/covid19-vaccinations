import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useLoader } from 'react-three-fiber';
import { CameraControls } from '../../Components/CameraControls';
import * as THREE from 'three';
import { RADIUS_SPHERE, convertLatLon, latLongToVector3 } from "../../Utils/three";
import countriesData from "../../Store/countries.json";
import { Header } from "../../Components/Header";
import { PageTitle } from "../../Components/PageTitle";
import { Footer } from "../../Components/Footer";
import { useApi } from "../../Api/";
import earth4 from './assets/earth4.jpg';
import earth_bump from './assets/earth_bump.jpg';
import "./styles.css";

const LOOK_AT_COORDS = [0, 0, 0];

const Vaccination3dBar = ({ position, onClick, vaccinations, population }) => {
    const mesh = useRef();
    const [isHovered, setIsOvered] = React.useState(false);
    useEffect(() => {
        mesh.current.lookAt(...LOOK_AT_COORDS)
    }, [mesh])

    let populationFactor;
    if (population > 0 && population < 1000000)
        populationFactor = 0.05;
    else if (population >= 1000000 && population < 100000000)
        populationFactor = 0.1;
    else populationFactor = 0.3;

    const boxDimensions = [1, 1, vaccinations * 100 / population];
    const defaultScale = [populationFactor, populationFactor, 0.1];

    return (
        <mesh
            position={position}
            ref={mesh}
            scale={defaultScale}
            onClick={onClick}
            onTouchStart={onClick}
            onPointerOver={(e) => setIsOvered(true)}
            onPointerOut={(e) => setIsOvered(false)}>
            <boxBufferGeometry args={boxDimensions} />
            <meshStandardMaterial transparent color={isHovered ? '#ff0000' : '#30ff30'} />
        </mesh>
    )
}


const Earth = ({ setSelectedCountry }) => {
    const { apiData, isError } = useApi();
    const ref = useRef();
    const [texture, bump] = useLoader(THREE.TextureLoader, [earth4, earth_bump]);
    const radium = RADIUS_SPHERE;

    if (isError) {
        return <group ref={ref} name="error"></group>;
    }

    if (!apiData || apiData === []) {
        return <group ref={ref} name="loading"></group>;
    }

    const points = countriesData.map(([name, lat, long]) => {
        const country = apiData.length > 0 && apiData.filter(item => item.location === name) || null
        const population = country && country[0] && country[0].population || 0
        const vaccinations = country && country[0] && country[0].vaccinations || 0
        return {
            name,
            point: latLongToVector3(lat, long, 5, 2),
            population: population,
            vaccinations: vaccinations
        }
    })

    const handleOnClick = (e, name, point, vaccinations, population) => {
        setSelectedCountry({ name, population, vaccinations });
        console.log(name, point, population.toLocaleString(), vaccinations.toLocaleString(),
            e.point.x, e.point.y, e.point.z, convertLatLon([e.point.x, e.point.y, e.point.z]))
    }


    const earthContent = <group ref={ref} name="earth">
        {points && points.map(({ name, point, population, vaccinations }) => {
            if (population > 0)
                return <Vaccination3dBar
                    key={name}
                    position={point}
                    population={population}
                    vaccinations={vaccinations}
                    onClick={(e) => handleOnClick(e, name, point, vaccinations, population)}
                />
        })}
        <mesh visible position={[0, 0, 0]}>
            <sphereBufferGeometry attach="geometry" args={[radium, 64, 64]} />
            <meshStandardMaterial attach="material" map={texture} bumpMap={bump} bumpScale={0.05} />
        </mesh>
    </group>

    return earthContent;
}

const CountryInfo = ({ name, population, vaccinations }) => {
    return (
        <div className="countryInfo">
            {name}: {Number.parseFloat((vaccinations * 100 / population)).toFixed(2)}%
        </div>);
}

export default function Globe() {
    const defaultCameraPosition = [12, 25, 12];
    const [selectedCountry, setSelectedCountry] = React.useState();

    return (
        <>
            <Header small>
                <PageTitle small />
            </Header>
            {selectedCountry && <CountryInfo {...selectedCountry} />}
            <Canvas camera={{ position: defaultCameraPosition, fov: 40 }}>
                <color attach="background" args={['black']} />
                <CameraControls />
                <ambientLight intensity={0.9} />
                <spotLight position={[1, 1, 1]} angle={0.15} penumbra={1} />
                <pointLight position={[-2, -1, -1]} />
                <Suspense fallback={null}>
                    <Earth setSelectedCountry={setSelectedCountry} />
                </Suspense>
            </Canvas>
            <Footer />
        </>
    )
}
