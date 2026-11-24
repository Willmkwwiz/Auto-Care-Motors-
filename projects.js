/**
 * AUTO CARE MOTORS — Workshop Transformation Projects
 * Each vehicle has a clear label for the selection list, a Then/Now comparison pair,
 * and stage cards so customers can switch between vehicles anytime.
 */

const WORKSHOP_PROJECTS = [
  {
    id: "mitsubishi-colt-black-respray",
    vehicle: "MITSUBISHI COLT (BLACK — FILLER PREP & GLOSS)",
    badge: "BODY FILLER, PANEL PREP & GLOSS FINISH • LILONGWE",
    summary:
      "Body filler and sanding prep under the workshop bay through gloss black exterior rollout in the yard and compound.",
    thenImage: "images/colt-black-body-filler-sanded.jpg",
    nowImage: "images/colt-black-front-gloss-canopy.jpg",
    thenLabel: "FILLER & SANDING PREP",
    nowLabel: "GLOSS FINISH ROLLOUT",
    stages: [
      {
        title: "01. Body Filler & Sanding Prep",
        img: "images/colt-black-body-filler-sanded.jpg",
        desc: "Body filler spots and sanded panels inside the shaded workshop bay."
      },
      {
        title: "02. Left Side & Rear Arch Prep",
        img: "images/colt-black-left-side-scuffs.jpg",
        desc: "Left side doors and rear wheel arch showing surface scuffs and steel spare wheel during prep."
      },
      {
        title: "03. Rear Hatch & Dust Check",
        img: "images/colt-black-rear-dust-arch.jpg",
        desc: "Rear hatch and left quarter panel inside the canopy bay before final wash and polish."
      },
      {
        title: "04. Gravel Yard Front Angle",
        img: "images/colt-black-front-gravel-yard.jpg",
        desc: "Front three-quarter view parked on gravel in the workshop yard."
      },
      {
        title: "05. Gloss Front Under Canopy",
        img: "images/colt-black-front-gloss-canopy.jpg",
        desc: "Finished glossy front hood, headlamps, and grille under the workshop canopy."
      },
      {
        title: "06. Right Side Gloss Reflection",
        img: "images/colt-black-right-side-gloss.jpg",
        desc: "Right side doors and rear quarter showing smooth paint reflection beside the blue canopy."
      },
      {
        title: "07. Compound Gloss Side View",
        img: "images/colt-black-compound-gloss.jpg",
        desc: "Side profile finished in the workshop compound near the green gate."
      }
    ]
  },
  {
    id: "bmw-320i-white-restoration",
    vehicle: "BMW 320i (WHITE — PANEL PREP & FINISHED)",
    badge: "MASKING, SURFACE PREP & REFINISHING • LILONGWE",
    summary:
      "Hood sanding and paint-prep masking through finished white exterior presentation on the BMW 320i.",
    thenImage: "images/bmw-320i-front-masked.jpg",
    nowImage: "images/bmw-320i-front-angle.jpg",
    thenLabel: "MASKED & PREP IN BAY",
    nowLabel: "FINISHED EXTERIOR ROLLOUT",
    stages: [
      {
        title: "01. Hood Prep & Sanding",
        img: "images/bmw-320i-hood-sanded.jpg",
        desc: "Hood surface leveled and sanded during bodywork preparation."
      },
      {
        title: "02. Front Grille & Lamp Masking",
        img: "images/bmw-320i-front-masked.jpg",
        desc: "Front fascia, grille openings, headlamps, and glass masked for refinishing."
      },
      {
        title: "03. Side, Wheel Masking & Canopy Prep",
        img: "images/bmw-320i-canopy-masked.jpg",
        desc: "Side profile, windows, and wheels masked during body preparation under the workshop canopy shelter alongside shop equipment."
      },
      {
        title: "04. Workshop Bay Prep",
        img: "images/bmw-320i-bay-masked.jpg",
        desc: "Front-three-quarter masked prep inside the workshop bay."
      },
      {
        title: "05. Rear Trunk & Lamp Masking",
        img: "images/bmw-320i-rear-masked.jpg",
        desc: "Rear window, tail lamps, and trunk area masked during prep."
      },
      {
        title: "06. Finished Front Three-Quarter",
        img: "images/bmw-320i-front-angle.jpg",
        desc: "Completed white exterior parked under the shaded workshop canopy."
      },
      {
        title: "07. Finished Side Profile",
        img: "images/bmw-320i-side-profile.jpg",
        desc: "Clean side body lines and gloss-and-machined alloy wheels on rollout."
      },
      {
        title: "08. Finished 320i Rear View",
        img: "images/bmw-320i-rear-320i.jpg",
        desc: "Completed rear 320i badge, tail lamps, and rear bumper finish."
      }
    ]
  },
  {
    id: "nissan-primera-bs339-restoration",
    vehicle: "NISSAN PRIMERA (BS 339 — MASKING & FINISHED)",
    badge: "FRONT MASKING, BAY CHECK & REFINISHING • LILONGWE",
    summary:
      "Front-end masking in the shaded bay through finished teal exterior angles on Nissan Primera BS 339.",
    thenImage: "images/primera-front-masked-bay.jpg",
    nowImage: "images/primera-bs339-left-front-yard.jpg",
    thenLabel: "FRONT MASKED IN BAY",
    nowLabel: "FINISHED BS 339 EXTERIOR",
    stages: [
      {
        title: "01. Front Masking & Lamp Removal",
        img: "images/primera-front-masked-bay.jpg",
        desc: "Windshield, side glass, and wheel masked with front headlamps removed over the workshop pit."
      },
      {
        title: "02. Service Bay Alignment Check",
        img: "images/primera-bs339-bay.jpg",
        desc: "Front end aligned over the concrete inspection bay."
      },
      {
        title: "03. Front View in Workshop Yard",
        img: "images/primera-bs339-front-yard.jpg",
        desc: "Front view of BS 339 in the yard facing the workshop wall and carwash bays."
      },
      {
        title: "04. Left Front Three-Quarter Yard View",
        img: "images/primera-bs339-left-front-yard.jpg",
        desc: "Left side, hood, headlamps, and alloy wheels parked in the workshop yard."
      },
      {
        title: "05. Rear View & PRIMERA Badge",
        img: "images/primera-bs339-rear-yard.jpg",
        desc: "Rear hatch, tail lamps, bumper, and PRIMERA badge on BS 339 in the yard."
      },
      {
        title: "06. Right Rear Bay View Under Canopy",
        img: "images/primera-bs339-right-rear-canopy.jpg",
        desc: "Right rear quarter, window tint, and BS 339 rear plate under the workshop canopy."
      },
      {
        title: "07. Left Rear Bay View Under Canopy",
        img: "images/primera-bs339-left-rear-canopy.jpg",
        desc: "Left rear angle of BS 339 parked under the shaded workshop canopy bay."
      }
    ]
  }
];


/**
 * Wash-bay products shown on the photo shelf. Edit names/text here.
 * pins = [x%, y%] positions on images/wash-products-shelf.jpg
 */
const WASH_PRODUCTS = [
  {
    name: "Tyre Shine",
    type: "TYRE CARE",
    summary: "Deep black, glossy tyre sidewalls.",
    use: "Applied after the wash and dry, so the tyres look as clean as the paintwork when the vehicle rolls out.",
    pins: [[40.1, 44.9]]
  },
  {
    name: "Dashboard & Vinyl Protectant",
    type: "INTERIOR & TRIM",
    summary: "Clean, protected plastic and vinyl.",
    use: "Used on dashboards, door panels and trim to leave an even, clean finish after interior cleaning. Two bottles are shown.",
    pins: [[50, 43.5], [63.2, 43.5]]
  },
  {
    name: "Engine Cleaner Spray",
    type: "ENGINE BAY",
    summary: "Loosens oil and grime before rinsing.",
    use: "Sprayed onto dirty engine-bay surfaces and rinsed off, leaving the bay cleaner after servicing.",
    pins: [[59.9, 81.2]]
  }
];
