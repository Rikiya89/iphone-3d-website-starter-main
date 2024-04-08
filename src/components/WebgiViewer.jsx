import React, {
    useRef,
    useState,
    useCallback,
    forwardRef,
    useImperativeHandle,
    useEffect,
} from 'react';
import {
    ViewerApp,
    AssetManagerPlugin,
    GBufferPlugin,
    ProgressivePlugin,
    TonemapPlugin,
    SSRPlugin,
    SSAOPlugin,
    BloomPlugin,
    GammaCorrectionPlugin,
} from "webgi";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollAnimation } from '../lib/scroll-animation';

gsap.registerPlugin(ScrollTrigger);

const WebgiViewer = forwardRef((props, ref) => {
    const canvasRef = useRef(null);
    const [viewerRef, setupViewerRef] = useState(null);
    const [targetRef, setTargetRef] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [positionRef, setPositionRef] = useState(null);
    const canvasContainerRef = useRef(null); // Changed to useRef

    useImperativeHandle(ref, () => ({
        triggerPreview() {
            canvasContainerRef.current.style.pointerEvents = 'all';
            props.contentRef.current.style.opacity =  "0";
            gsap.to(positionRef.current, { // Ensure we're using .current
                x: 13.04,
                y: -2.01,
                z: 2.29,
                duration: 2,
                onUpdate: () => {
                    viewerRef.current.setDirty(); // Ensure we're using .current
                    cameraRef.current.positionTargetUpdated(true); // Ensure we're using .current
                }
            });
    
            gsap.to(targetRef.current, { x: 0.11, y: 0.0, z: 0.0, duration: 2 }); // Ensure we're using .current

            viewerRef.current.scene.activeCamera.setCameraOptions({ controlsEnabled: true }); // Ensure we're using .current
        }
    }), [canvasContainerRef, props, positionRef, viewerRef, cameraRef, targetRef]); // Updated dependencies

    const memorizedScrollAnimation = useCallback(
        (position, target, onUpdate) => {
            if (position && target && onUpdate) {
                scrollAnimation(position, target, onUpdate);
            }
        }, []
    );

    const setupViewer = useCallback(async () => {
        const viewer = new ViewerApp({
            canvas: canvasRef.current,
        });

        setupViewerRef(viewer);

        const manager = await viewer.addPlugin(AssetManagerPlugin);
        const camera = viewer.scene.activeCamera;
        const position = camera.position;
        const target = camera.target;

        setCameraRef(camera);
        setPositionRef(position);
        setTargetRef(target);

        await viewer.addPlugin(GBufferPlugin);
        await viewer.addPlugin(new ProgressivePlugin(32));
        await viewer.addPlugin(new TonemapPlugin(true));
        await viewer.addPlugin(GammaCorrectionPlugin);
        await viewer.addPlugin(SSRPlugin);
        await viewer.addPlugin(SSAOPlugin);
        await viewer.addPlugin(BloomPlugin);

        viewer.renderer.refreshPipeline();

        await manager.addFromPath("scene-black.glb");

        viewer.getPlugin(TonemapPlugin).config.clipBackground = true;

        viewer.scene.activeCamera.setCameraOptions({ controlsEnabled: false });

        window.scrollTo(0, 0);

        let needsUpdate = true;

        const onUpdate = () => {
            needsUpdate = true;
            viewer.setDirty();
        };

        viewer.addEventListener("preFrame", () => {
            if (needsUpdate) {
                camera.positionTargetUpdated(true);
                needsUpdate = false;
            }
        });

        memorizedScrollAnimation(position, target, onUpdate);
    }, [canvasRef]); // Updated dependencies

    useEffect(() => {
        setupViewer();
    }, [setupViewer]); // Updated dependencies

    return (
        <div id='webgi-canvas-container' ref={canvasContainerRef}>
            <canvas id='webgi-canvas' ref={canvasRef} />
        </div>
    );
});

export default WebgiViewer;
