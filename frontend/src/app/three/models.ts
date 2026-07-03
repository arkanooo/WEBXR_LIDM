import * as THREE from "three";

// Procedural approximations of the 13 ARPeGa components, built from the
// dimensions in "Layout ARPeGa Final". Units: PDF millimetres are scaled down
// (÷ SCALE) into scene metres so a component sits nicely ~0.1–0.3 m in AR.
const SCALE = 200; // 1 scene unit = 200 mm  → a 60 mm part ≈ 0.3 units
const mm = (v: number) => v / SCALE;

const METAL = new THREE.MeshStandardMaterial({
  color: 0x9aa3ad,
  metalness: 0.85,
  roughness: 0.35,
});
const METAL_DARK = new THREE.MeshStandardMaterial({
  color: 0x6b7280,
  metalness: 0.8,
  roughness: 0.45,
});

function hexPrism(acrossFlats: number, height: number, boreDia = 0): THREE.Mesh {
  // acrossFlats = distance between opposite flats. Circumradius = AF / sqrt(3).
  const R = mm(acrossFlats) / Math.sqrt(3);
  const shape = new THREE.Shape();
  for (let i = 0; i < 6; i++) {
    const a = Math.PI / 6 + (i * Math.PI) / 3; // flat-top hex
    const x = R * Math.cos(a);
    const y = R * Math.sin(a);
    i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y);
  }
  shape.closePath();
  if (boreDia > 0) {
    const hole = new THREE.Path();
    hole.absarc(0, 0, mm(boreDia) / 2, 0, Math.PI * 2, true);
    shape.holes.push(hole);
  }
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: mm(height),
    bevelEnabled: true,
    bevelThickness: mm(1),
    bevelSize: mm(1),
    bevelSegments: 2,
  });
  geo.translate(0, 0, -mm(height) / 2);
  return new THREE.Mesh(geo, METAL);
}

function threadedShaft(dia: number, length: number): THREE.Mesh {
  const geo = new THREE.CylinderGeometry(mm(dia) / 2, mm(dia) / 2, mm(length), 32);
  return new THREE.Mesh(geo, METAL_DARK);
}

function group(...objs: THREE.Object3D[]): THREE.Group {
  const g = new THREE.Group();
  objs.forEach((o) => g.add(o));
  return g;
}

// ---- Individual builders -------------------------------------------------

function buildNut(): THREE.Object3D {
  return hexPrism(24, 13, 16);
}

function buildBolt(headAF = 24, headH = 13, shaftDia = 16, shaftLen = 44): THREE.Object3D {
  const head = hexPrism(headAF, headH, 0);
  head.rotation.x = Math.PI / 2; // align hex axis with the vertical shaft
  head.position.y = mm(shaftLen) / 2;
  const shaft = threadedShaft(shaftDia, shaftLen);
  shaft.position.y = -mm(headH) / 2;
  return group(head, shaft);
}

function buildNutAndBolt(): THREE.Object3D {
  const g = buildBolt(24, 13, 16, 59) as THREE.Group;
  const nut = hexPrism(24, 13, 16);
  nut.rotation.x = Math.PI / 2;
  nut.position.y = -mm(18);
  g.add(nut);
  return g;
}

function buildCounterbore(): THREE.Object3D {
  const head = new THREE.Mesh(
    new THREE.CylinderGeometry(mm(32) / 2, mm(32) / 2, mm(15), 40),
    METAL
  );
  head.position.y = mm(45) / 2;
  const shaft = threadedShaft(16, 45);
  shaft.position.y = -mm(15) / 2;
  return group(head, shaft);
}

function buildCountersink(): THREE.Object3D {
  const head = new THREE.Mesh(
    new THREE.CylinderGeometry(mm(35) / 2, mm(16) / 2, mm(12), 40),
    METAL
  );
  head.position.y = mm(45) / 2;
  const shaft = threadedShaft(16, 45);
  shaft.position.y = -mm(12) / 2;
  return group(head, shaft);
}

function gearShape(teeth: number, outerDia: number, rootDia: number, boreDia: number): THREE.Shape {
  const ro = mm(outerDia) / 2;
  const rr = mm(rootDia) / 2;
  const shape = new THREE.Shape();
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a0 = i * step;
    const a1 = a0 + step * 0.25;
    const a2 = a0 + step * 0.5;
    const a3 = a0 + step * 0.75;
    const pts = [
      [rr * Math.cos(a0), rr * Math.sin(a0)],
      [ro * Math.cos(a1), ro * Math.sin(a1)],
      [ro * Math.cos(a2), ro * Math.sin(a2)],
      [rr * Math.cos(a3), rr * Math.sin(a3)],
    ];
    pts.forEach(([x, y], idx) =>
      i === 0 && idx === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y)
    );
  }
  shape.closePath();
  const hole = new THREE.Path();
  hole.absarc(0, 0, mm(boreDia) / 2, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  return shape;
}

function buildSpurGear(): THREE.Object3D {
  const shape = gearShape(18, 42.4, 34, 19);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: mm(25.4),
    bevelEnabled: true,
    bevelThickness: mm(0.6),
    bevelSize: mm(0.6),
    bevelSegments: 1,
  });
  geo.translate(0, 0, -mm(25.4) / 2);
  return new THREE.Mesh(geo, METAL);
}

function buildBevelGear(): THREE.Object3D {
  const shape = gearShape(20, 71.1, 60, 25.4);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: mm(12),
    bevelEnabled: true,
    bevelThickness: mm(3),
    bevelSize: mm(5),
    bevelSegments: 2,
  });
  geo.translate(0, 0, -mm(12) / 2);
  geo.rotateX(Math.PI / 2);
  const gear = new THREE.Mesh(geo, METAL);
  const hub = new THREE.Mesh(
    new THREE.CylinderGeometry(mm(30) / 2, mm(30) / 2, mm(14), 32),
    METAL
  );
  hub.position.y = mm(9);
  return group(gear, hub);
}

function buildStud(): THREE.Object3D {
  return threadedShaft(20, 96);
}

function buildBoxedStud(): THREE.Object3D {
  const shaft = threadedShaft(20, 96);
  const box = new THREE.Mesh(
    new THREE.BoxGeometry(mm(22), mm(22), mm(22)),
    METAL
  );
  return group(shaft, box);
}

function buildBearing(): THREE.Object3D {
  const width = mm(16);
  const outer = new THREE.Mesh(
    new THREE.CylinderGeometry(mm(62) / 2, mm(62) / 2, width, 48, 1, true),
    METAL
  );
  const outerInner = new THREE.Mesh(
    new THREE.CylinderGeometry(mm(52) / 2, mm(52) / 2, width, 48, 1, true),
    METAL_DARK
  );
  const inner = new THREE.Mesh(
    new THREE.CylinderGeometry(mm(40) / 2, mm(40) / 2, width, 48, 1, true),
    METAL_DARK
  );
  const innerBore = new THREE.Mesh(
    new THREE.CylinderGeometry(mm(30) / 2, mm(30) / 2, width, 48, 1, true),
    METAL
  );
  const g = group(outer, outerInner, inner, innerBore);
  // balls
  const ballR = mm(8);
  const track = mm(46) / 2;
  for (let i = 0; i < 9; i++) {
    const a = (i / 9) * Math.PI * 2;
    const ball = new THREE.Mesh(
      new THREE.SphereGeometry(ballR, 20, 20),
      new THREE.MeshStandardMaterial({ color: 0xcfd4da, metalness: 0.9, roughness: 0.2 })
    );
    ball.position.set(track * Math.cos(a), 0, track * Math.sin(a));
    g.add(ball);
  }
  g.rotation.x = Math.PI / 2;
  return g;
}

function tubeAlong(points: THREE.Vector3[], radius: number, closed = false): THREE.Mesh {
  const curve = new THREE.CatmullRomCurve3(points, closed);
  const geo = new THREE.TubeGeometry(curve, 200, radius, 16, closed);
  return new THREE.Mesh(geo, METAL);
}

function buildRod(): THREE.Object3D {
  // Straight section then a 30° bend with R100.
  const pts: THREE.Vector3[] = [];
  const straight = mm(300);
  pts.push(new THREE.Vector3(-straight, 0, 0));
  pts.push(new THREE.Vector3(0, 0, 0));
  const R = mm(100);
  const seg = 12;
  const ang = (30 * Math.PI) / 180;
  for (let i = 1; i <= seg; i++) {
    const t = (i / seg) * ang;
    pts.push(new THREE.Vector3(R * Math.sin(t), 0, 0).add(new THREE.Vector3(0, -R * (1 - Math.cos(t)), 0)));
  }
  const g = tubeAlong(pts, mm(12) / 2);
  g.position.x = mm(150);
  return g;
}

function helix(turns: number, radiusFn: (t: number) => number, height: number, samples = 240): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    const a = t * turns * Math.PI * 2;
    const r = radiusFn(t);
    pts.push(new THREE.Vector3(r * Math.cos(a), t * height - height / 2, r * Math.sin(a)));
  }
  return pts;
}

function buildStraightSpring(): THREE.Object3D {
  const pts = helix(9, () => mm(46) / 2, mm(60));
  return tubeAlong(pts, mm(4) / 2);
}

function buildConeSpring(): THREE.Object3D {
  const pts = helix(7, (t) => mm(58 - (58 - 25) * t) / 2, mm(62));
  return tubeAlong(pts, mm(4) / 2);
}

// ---- Registry ------------------------------------------------------------

const BUILDERS: Record<number, () => THREE.Object3D> = {
  1: buildNut,
  2: () => buildBolt(),
  3: buildNutAndBolt,
  4: buildCounterbore,
  5: buildCountersink,
  6: buildSpurGear,
  7: buildBevelGear,
  8: buildStud,
  9: buildBoxedStud,
  10: buildBearing,
  11: buildRod,
  12: buildStraightSpring,
  13: buildConeSpring,
};

/** Build a centered, unit-normalized model for the given component number. */
export function buildModel(no: number): THREE.Object3D {
  const builder = BUILDERS[no] ?? buildNut;
  const obj = builder();

  // Center on origin.
  const box = new THREE.Box3().setFromObject(obj);
  const center = box.getCenter(new THREE.Vector3());
  obj.position.sub(center);

  const wrapper = new THREE.Group();
  wrapper.add(obj);
  return wrapper;
}
