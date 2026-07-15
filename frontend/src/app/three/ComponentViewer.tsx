import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { ARButton } from "three/examples/jsm/webxr/ARButton.js";
import { buildModel } from "./models";

export default function ComponentViewer({ no }: { no: number }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const arSlotRef = useRef<HTMLDivElement>(null);
  const [arSupported, setArSupported] = useState<boolean | null>(null);

  useEffect(() => {
    const mount = mountRef.current!;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 20);
    camera.position.set(0, 0.15, 0.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.xr.enabled = true;
    mount.appendChild(renderer.domElement);

    
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    scene.add(new THREE.HemisphereLight(0xffffff, 0x3a3a38, 1.5));
    const key = new THREE.DirectionalLight(0xffffff, 3.0);
    key.position.set(2, 3, 2);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xcfe0ff, 1.2);
    fill.position.set(-2, 2, 2.5);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0xbffd44, 0.9);
    rim.position.set(-2, 1, -2);
    scene.add(rim);

    
    const model = buildModel(no);
    const previewGroup = new THREE.Group();
    previewGroup.add(model);
    previewGroup.rotation.x = -0.25; 
    scene.add(previewGroup);

    
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3()).length();
    const fitDist = size / (2 * Math.tan((Math.PI * camera.fov) / 360));
    camera.position.set(0, size * 0.25, fitDist * 1.3);
    camera.lookAt(0, 0, 0);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.minDistance = size * 0.6;
    controls.maxDistance = fitDist * 3;

    
    let arObserver: MutationObserver | undefined;
    if (navigator.xr && arSlotRef.current) {
      navigator.xr
        .isSessionSupported("immersive-ar")
        .then((ok) => setArSupported(ok))
        .catch(() => setArSupported(false));

      const button = ARButton.createButton(renderer, {
        optionalFeatures: ["local-floor", "bounded-floor", "hand-tracking", "layers"],
      });
      button.style.position = "static";
      button.style.transform = "none";
      button.style.left = "auto";
      button.style.bottom = "auto";
      button.style.margin = "0";
      button.style.padding = "12px 22px";
      button.style.borderRadius = "9999px";
      button.style.border = "1px solid #BFFD44";
      button.style.background = "#BFFD44";
      button.style.color = "#000";
      button.style.font = "700 15px 'Chivo', sans-serif";
      button.style.cursor = "pointer";
      button.style.width = "auto";

      
      const localize = () => {
        const map: Record<string, string> = {
          "START AR": "Masuk AR",
          "STOP AR": "Keluar AR",
          "AR NOT SUPPORTED": "AR tidak didukung perangkat ini",
          "AR NOT ALLOWED": "Akses AR ditolak",
          "WEBXR NOT AVAILABLE": "WebXR tidak tersedia",
          "WEBXR NEEDS HTTPS": "WebXR memerlukan HTTPS",
        };
        const t = button.textContent?.trim().toUpperCase() ?? "";
        if (map[t] && button.textContent !== map[t]) button.textContent = map[t];
      };
      localize();
      arObserver = new MutationObserver(localize);
      arObserver.observe(button, { childList: true, characterData: true, subtree: true });

      arSlotRef.current.appendChild(button);
    } else {
      setArSupported(false);
    }

    const onSessionStart = () => {
      controls.enabled = false;
      previewGroup.position.set(0, 1.3, -0.6);
      previewGroup.scale.setScalar(2.5);
    };
    const onSessionEnd = () => {
      controls.enabled = true;
      previewGroup.position.set(0, 0, 0);
      previewGroup.scale.setScalar(1);
    };
    renderer.xr.addEventListener("sessionstart", onSessionStart);
    renderer.xr.addEventListener("sessionend", onSessionEnd);

    renderer.setAnimationLoop(() => {
      model.rotation.y += renderer.xr.isPresenting ? 0.004 : 0.006;
      controls.update();
      renderer.render(scene, camera);
    });

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.xr.removeEventListener("sessionstart", onSessionStart);
      renderer.xr.removeEventListener("sessionend", onSessionEnd);
      renderer.setAnimationLoop(null);
      arObserver?.disconnect();
      controls.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      arSlotRef.current?.replaceChildren();
    };
  }, [no]);

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={mountRef}
        className="relative h-[340px] w-full overflow-hidden rounded-2xl border border-white/12 bg-black/40 md:h-[420px]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 40%, rgba(191,253,68,0.10), transparent 60%)",
        }}
      />
      <div className="flex flex-wrap items-center gap-3" ref={arSlotRef} />
      {arSupported === false && (
        <p
          className="text-[13px] font-light text-white/50"
          style={{ fontFamily: "'Chivo', sans-serif" }}
        >
          Perangkat ini belum mendukung WebXR AR. Buka halaman ini lewat browser{" "}
          <span className="text-white/80">Meta Quest 2</span> lalu tekan <b>Masuk AR</b> untuk
          menampilkan komponen dalam mode passthrough.
        </p>
      )}
    </div>
  );
}
