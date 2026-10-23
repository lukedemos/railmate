/* RailMate demo data. REAL = sourced from public Plasser American material, official GRM3000T operator tutorials,
   49 CFR Part 214 or FRA/NTSB records. Anything flagged sample/real:false is realistic demo data, not real. */
var RM = window.RM = window.RM || {};
RM.data = {};
var D = RM.data;

D.railroad = { name: `Keystone Central Railroad`, short: `KCR`, division: `Allegheny Division`, gang: `Surfacing Gang S-14` };

D.user = {
  name: `Marcus Hale`, first: `Marcus`, initials: `MH`, title: `Machine Operator II, Track Surfacing`, empId: `KCR-20417`,
  email: `m.hale@keystonecentral.example`, home: `Altoona MOW Terminal`, supervisor: `Dana Whitfield, Roadmaster`,
  certs: [
    { id: `rwp`, name: `Roadway Worker Protection (RWP)`, ref: `49 CFR 214.343 / 214.345`, issued: `2026-02-11`, expires: `2027-02-11`, issuer: `KCR Safety Training` },
    { id: `rmo`, name: `On-Track Roadway Maintenance Machine Operator`, ref: `49 CFR 214.355`, issued: `2025-06-03`, expires: `2027-06-03`, issuer: `KCR Engineering Dept.` },
    { id: `grm`, name: `GRM3000T Machine Qualification (demonstrated proficiency)`, ref: `49 CFR 214.341(b), 214.355`, issued: `2025-09-18`, expires: `2027-09-18`, issuer: `KCR Engineering Dept.` },
    { id: `rules`, name: `Operating Rules (GCOR) Annual`, ref: `Carrier rule book`, issued: `2026-01-07`, expires: `2027-01-07`, issuer: `KCR Rules Dept.` },
    { id: `aggs`, name: `AGGS / ATLAS Systems Operator`, ref: `OEM systems training`, issued: `2025-10-02`, expires: `2027-10-02`, issuer: `KCR Engineering Dept.` },
    { id: `loto`, name: `Hazardous Energy Control (Lockout/Tagout)`, ref: `KCR Safety Rule 12`, issued: `2026-04-21`, expires: `2027-04-21`, issuer: `KCR Safety Training` },
    { id: `hyd`, name: `Hydraulic Systems Maintenance, Level 2`, ref: `KCR Mechanical`, issued: `2025-11-14`, expires: `2027-11-14`, issuer: `KCR Mechanical Dept.` },
    { id: `fa`, name: `First Aid / CPR / AED`, ref: `KCR Safety Rule 4`, issued: `2025-12-09`, expires: `2027-12-09`, issuer: `American Red Cross` },
    { id: `p243`, name: `Part 243 Periodic Refresher`, ref: `49 CFR 243.201`, issued: `2026-03-30`, expires: `2027-03-30`, issuer: `KCR Safety Training` }
  ]
};

/* Each section declares the certs it needs. RM.access() locks a section if any is missing or expired. */
D.sections = [
  { id: `overview`, label: `Overview & Specs`, icon: `info`, requires: [], desc: `Official specs, systems and cab layout` },
  { id: `operate`, label: `Operate`, icon: `play`, requires: [`rwp`, `rmo`, `grm`, `rules`], desc: `Start-up, travel, work setup, tamping, AGGS` },
  { id: `service`, label: `Service`, icon: `wrench`, requires: [`rwp`, `loto`, `hyd`], desc: `Daily to 1,000-hour schedule` },
  { id: `parts`, label: `Parts ID`, icon: `cog`, requires: [], desc: `Search and identify components` },
  { id: `troubleshoot`, label: `Troubleshoot`, icon: `stetho`, requires: [`rwp`, `grm`, `loto`], desc: `Guided step-by-step diagnosis` },
  { id: `checklists`, label: `Checklists`, icon: `check`, requires: [`rwp`], desc: `Tap off, sign off, saved history` },
  { id: `docs`, label: `Documents`, icon: `book`, requires: [], desc: `Manuals, brochures and regulations` },
  { id: `training`, label: `Training`, icon: `grad`, requires: [], desc: `Video lessons and knowledge checks` },
  { id: `lessons`, label: `Lessons Learned`, icon: `bulb`, requires: [], desc: `Field stories from crews` },
  { id: `ask`, label: `Ask RailMate`, icon: `spark`, requires: [], desc: `AI assistant for anything else` }
];

D.machines = [
  { id: `grm3000t`, name: `GRM3000T`, maker: `Plasser American`, type: `Production & Switch Tamper`, live: true, img: `assets/img/dsc00735-sm.jpg`, unit: `KCR 3412`, hours: 4812 },
  { id: `reg`, name: `Ballast Regulator`, maker: `Generic`, type: `Ballast shaping & broom`, live: false },
  { id: `dts`, name: `Dynamic Track Stabilizer`, maker: `Generic`, type: `Track consolidation`, live: false },
  { id: `tie`, name: `Tie Exchanger`, maker: `Generic`, type: `Tie removal & insertion`, live: false },
  { id: `spike`, name: `Spiker / Spike Puller`, maker: `Generic`, type: `Fastener work`, live: false },
  { id: `hirail`, name: `Hi-Rail Boom Truck`, maker: `Generic`, type: `Material handling`, live: false },
  { id: `grind`, name: `Rail Grinder`, maker: `Generic`, type: `Rail profile maintenance`, live: false }
];

/* REAL: Plasser American GRM3000T product page */
D.specs = [
  [`Production rate`, `up to 2,400 ft/h`], [`Length`, `52' 2"`], [`Width`, `9' 6"`], [`Height`, `10' 8"`],
  [`Weight`, `70,500 lb`], [`Axle distance`, `30' 4"`], [`Engine power`, `325 HP (Cummins)`], [`Travel speed`, `up to 45 mph`],
  [`Max. travel radius`, `28°`], [`Work radius, long reference`, `23°`], [`Work radius, short reference`, `28°`], [`PLC operating temp.`, `–40 °F to 158 °F`]
];
D.heroStats = [ [2400, `ft/h`, `Production rate`], [325, `HP`, `Cummins diesel`], [45, `mph`, `Travel speed`], [70500, `lb`, `Machine weight`] ];

/* SAMPLE: capacities are not published */
D.capacities = [ [`Diesel fuel tank (green)`, `150 gal`], [`Hydraulic tank (blue)`, `120 gal`], [`Engine oil`, `7.5 gal`], [`Coolant`, `11 gal`], [`Rear-axle 2-speed gearbox`, `3.2 gal`], [`Pump drive gearbox`, `2.1 gal`] ];

D.systems = [
  { t: `Drive & power`, icon: `bolt`, img: `dsc00674`, pts: [`Both axles powered hydrostatically in work and travel`, `Rear axle has a two-speed gearbox`, `Pump drive gearbox on the Cummins diesel drives four hydraulic pumps: travel, work pressure, vibrators, oil cooling`, `Two 8D 12 V batteries in series give a 24 V system, with a battery master switch beside the box`, `Electric emergency pump can raise clamps or tamping units if main pressure is lost`] },
  { t: `Split-head tamping units`, icon: `tamp`, img: `dsc00709`, pts: [`Four 4-tool, non-synchronous tamping heads in two frames`, `Each frame splits into two individually controlled sections for switches; all four work in unison on plain line`, `Units raise and lower vertically for uniform compaction near the rail base`, `Vibratory hydraulic squeeze; tamping depth set from the work cab via a depth transducer`, `Automatic lubrication from a hydraulic accumulator on a timed interval`] },
  { t: `Rail clamp (lift & line)`, icon: `clamp`, img: `dsc00704`, pts: [`A lifting cylinder each side and a lining cylinder for left/right`, `Rail clamp rollers: one front, two rear (outside and inside)`, `Rail hooks grip under the rail base or head, with their own depth transducer`, `Center lining roller with sliding "gauge comp" axle stops rails spreading`, `Rollers for normal production; hooks in switches or at joints`] },
  { t: `Measuring system`, icon: `ruler`, img: `dsc00714`, pts: [`Rear buggy: slope sensor, lining-cord cylinder, AGGS distance encoders, feeler rod`, `Lining (middle) buggy: lining versine transducer and slope sensor`, `Front buggy: six wheels, obstruction limit switch for ATLAS, slope sensor`, `Short boom and long push boom set the short and long reference`, `ATLAS tie-finder near the front axle enables fully automatic tamping`] },
  { t: `Cab & controls`, icon: `cab`, img: `dsc00745`, pts: [`All operating controls in the seat armrests; seat swivels 180° for reverse travel`, `B51 (left): AGGS touch screen, mode switches, travel handle, clamp and index controls`, `B52 (right): PLC touch screen, service brake, ignition, emergency pump, emergency stop, throttle`, `B9 crossbar: lift and lining errors, slope sensors, ATLAS go/no-go`, `Pressurized, sound-insulated cab with fire extinguisher, first-aid kit and AGGS/ATLAS computer on UPS`] },
  { t: `TampLink & add-ons`, icon: `link`, img: `dsc00716`, pts: [`TampLink carries electrical, hydraulic, pneumatic and mechanical connections to other Plasser units`, `Control system auto-detects what is connected and configures itself`, `Standard on all GRM3000Ts since 2016`, `Works with the GRM2X tamping trailer, PST16SW and PTS90C stabilizer`, `GRM2X tamps every tie the GRM3000T skips, in continuous action`] }
];

D.gallery = [
  [`dsc00735`, `Work-unit area, left side`], [`dsc00714`, `Measuring buggies, clamp and tamping units`], [`dsc00709`, `Tamping unit close-up`],
  [`dsc00704`, `Rail clamp assembly`], [`dsc00745`, `Work cab and touch screens`], [`dsc00725`, `GRM3000T with GRM2X trailer`],
  [`dsc00716`, `GRM2X coupled via TampLink`], [`dsc00647`, `GRM2X tamping trailer`], [`dsc00674`, `Side view on track`],
  [`dsc00720`, `Consist on track`], [`dsc00740`, `Consist working`], [`dsc00646`, `Hose and drawbar connections`], [`3d_simulator`, `GRM 3D tamping simulator`]
];

D.panels = [
  { id: `B51`, side: `Left console`, items: [`AGGS touch screen`, `Mode switches (Travel/Work)`, `Directional / speed handle`, `Clamp frame controls`, `Index speed & direction`, `Rail hook & tamping-unit controls`, `Cross-level rail select`] },
  { id: `B52`, side: `Right console`, items: [`PLC touch screen`, `Emergency stop`, `Service brake`, `Ignition key`, `Emergency pump push-button`, `Throttle`, `Line reference select`, `ATLAS functions`] },
  { id: `B9`, side: `Front crossbar`, items: [`Right & left lift error`, `Lining error`, `Front / middle / rear slope sensors`, `ATLAS go / no-go`] },
  { id: `V8`, side: `Right-side enclosure`, items: [`24 V to 12 V converters`, `A/C, heater / cooler`, `Cab pressurizer`, `Storage`] },
  { id: `B3`, side: `Left-side box`, items: [`"Live Info" system`, `Machine parameters over cellular`] },
  { id: `Gauges`, side: `Instrument panel`, items: [`System air pressure`, `Brake air pressure`] }
];

D.ppe = { hat: `Hard hat`, glasses: `Safety glasses`, vest: `Hi-vis vest`, boots: `Safety-toe boots`, ears: `Hearing protection`, gloves: `Work gloves` };
D.hazards = { pinch: `Pinch points`, moving: `Moving machine`, hyd: `High-pressure hydraulics`, hot: `Hot surfaces`, energy: `Stored energy`, adjacent: `Adjacent track`, fall: `Slips & falls`, noise: `Noise`, elec: `24 V electrical` };

/* REAL procedures paraphrased from the official Plasser GRM3000T Operator Tutorials (Parts 3, 4, 5, 7, 8, 9, 10).
   Callouts c: [type, text] are on-track safety guidance (49 CFR 214 + KCR program). */
D.procedures = [
  { id: `startup`, title: `Pre-start & engine start-up`, part: 3, mins: 15, cat: `Engine`, requires: [`rwp`, `rmo`, `grm`, `rules`], brief: false,
    ppe: [`hat`, `glasses`, `vest`, `boots`, `ears`], hz: [`moving`, `hot`, `fall`],
    steps: [
      { t: `Walk around the machine`, d: `Look for damage, leaks and anything loose. Check that buggies and work units are secured.`, c: [`redzone`, `Confirm nobody is on, under or between the work units before you board. Announce that you are starting up.`] },
      { t: `Check fluid levels`, d: `Daily: fuel, hydraulic oil, engine oil and coolant. Check gearbox oil at least weekly.` },
      { t: `Battery master switch ON`, d: `The master switch is next to the battery box (two 8D 12 V batteries, 24 V system).` },
      { t: `Set up the cab`, d: `All switches OFF. The Travel/Work switch must be OFF or the engine will not start.`, c: [`tip`, `Most "won't crank" calls are the Travel/Work switch left in TRAVEL or WORK.`] },
      { t: `Ignition ON and check screens`, d: `Check the Engine screen and PLC screen for any malfunctions before cranking.` },
      { t: `Sound the horn`, d: `Sound the horn as required by the operating rules before starting.`, c: [`cfr`, `49 CFR 214.511 requires an operative horn and an automatic change-of-direction alarm.`] },
      { t: `Crank the engine`, d: `Crank for no more than 10 seconds. If it does not start, wait 1 minute before trying again.` },
      { t: `Verify engine readings`, d: `Idle about 900 RPM, good oil pressure, battery voltage showing the alternator charging, no ECM lights. If an ECM light is on, press Engine Diagnostics for the codes.` },
      { t: `Warm up`, d: `Idle at least 5 minutes before travel or work. Walk around again and check for leaks while it warms.`, c: [`hot`, `Hydraulic lines and the exhaust heat quickly. Never hand-check a leak; use cardboard.`] }
    ] },
  { id: `shutdown`, title: `Engine shutdown & secure`, part: 3, mins: 10, cat: `Engine`, requires: [`rwp`, `rmo`, `grm`], brief: false,
    ppe: [`hat`, `glasses`, `vest`, `boots`], hz: [`hot`, `energy`, `fall`],
    steps: [
      { t: `Apply the parking brake`, d: `Set the parking brake before anything else.` },
      { t: `Return to idle`, d: `Turn the throttle switch on B52 to the left.` },
      { t: `Cool down 5 minutes`, d: `Idle for 5 minutes so temperatures equalize.` },
      { t: `Travel/Work switch OFF`, d: `Return the mode switch to OFF.` },
      { t: `Electrical loads OFF`, d: `Headlights, work lights and A/C off.` },
      { t: `Shut down AGGS`, d: `Shut down the AGGS computer if it was used.` },
      { t: `Ignition OFF, master OFF`, d: `Turn the ignition off, then the battery master switch.`, c: [`loto`, `If anyone will work on the machine after shutdown, apply your personal lock and tag to the battery master per KCR Safety Rule 12.`] },
      { t: `Drain the air tanks`, d: `Drain moisture from the air tanks.`, c: [`energy`, `Air tanks are stored energy. Open drains slowly and keep your face clear.`] },
      { t: `Lock up the machine`, d: `Secure the machine per railroad procedures.` }
    ] },
  { id: `travel`, title: `Traveling the machine`, part: 4, mins: 12, cat: `Travel`, requires: [`rwp`, `rmo`, `grm`, `rules`], brief: true,
    ppe: [`hat`, `glasses`, `vest`, `boots`, `ears`], hz: [`moving`, `adjacent`],
    steps: [
      { t: `Walk-around for travel`, d: `All buggies and work units up, locked and secured with safety chains. Nothing that can fall off.`, c: [`redzone`, `A unit that drops in travel can derail the machine. Check every chain by hand.`] },
      { t: `Start and warm up`, d: `Start the engine and warm the engine and hydraulics.` },
      { t: `Travel/Work to TRAVEL`, d: `Select TRAVEL on the mode switch.` },
      { t: `Lights for direction`, d: `Turn on lights for the direction of travel.`, c: [`cfr`, `49 CFR 214.509: headlight lights the track 300 ft ahead; 360° beacon; brake light visible at 300 ft.`] },
      { t: `Service brake & direction`, d: `Apply the service brake and select a direction.` },
      { t: `Release the parking brake`, d: `The parking brake light goes out.` },
      { t: `Engine to 2,000 RPM`, d: `The hydraulic pumps need 2,000 RPM to work efficiently.` },
      { t: `Release the service brake`, d: `A light on the speed handle comes on when all travel enables are met. If not, open Diagnostics > Travel.` },
      { t: `Move off slowly`, d: `Raise the speed handle slowly until the machine moves.`, c: [`spacing`, `Keep the machine-spacing distance from your job briefing. Be prepared to stop short of other machines.`] },
      { t: `Brake test`, d: `Do a brake test with the service brake, then resume travel.` },
      { t: `Stopping`, d: `Service brake, then parking brake, return to idle, Travel/Work OFF, then follow shutdown.` }
    ] },
  { id: `tow`, title: `Towing the machine`, part: 4, mins: 20, cat: `Travel`, requires: [`rwp`, `rmo`, `grm`, `rules`], brief: true,
    ppe: [`hat`, `glasses`, `vest`, `boots`, `gloves`], hz: [`moving`, `energy`, `pinch`],
    steps: [
      { t: `Drive axles to neutral`, d: `Diagnostics > Travel > Gears > Neutral. A connected GRM2X must also be in neutral.` },
      { t: `Release the failsafe brakes`, d: `Close the failsafe brake release valve on the exterior right side of the cab, then supply external air to the emergency port of the brake cylinders, or leave the machine idling.`, c: [`energy`, `Chock or secure the machine before releasing brakes.`] },
      { t: `No air available?`, d: `Manually cage the brake cylinders by tightening the bolt at the back of each cylinder.`, c: [`pinch`, `Spring brakes hold large forces. Use the correct tool and keep hands clear of the pushrod.`] },
      { t: `After towing`, d: `Make sure the failsafe brakes are set again.`, c: [`cfr`, `49 CFR 214.525: towing limits are set by braking capability and grade.`] }
    ] },
  { id: `setup`, title: `Setup for work`, part: 5, mins: 25, cat: `Work`, requires: [`rwp`, `rmo`, `grm`, `rules`], brief: true,
    ppe: [`hat`, `glasses`, `vest`, `boots`, `gloves`, `ears`], hz: [`pinch`, `moving`, `adjacent`, `energy`],
    steps: [
      { t: `Mode to WORK, vibrators ON`, d: `Travel/Work switch to WORK. On the Tamping screen turn the vibrators ON so they warm up.` },
      { t: `Release lifting-cord tension`, d: `Outside the cab, release the lifting-cord tension.`, c: [`redzone`, `You are now in the machine's red zone. Tell the operator before you step down, and keep radio contact (FRA Safety Advisory 2024-01).`] },
      { t: `Lower rear, then middle buggy`, d: `Lower the rear buggy, then the middle (lining) buggy.`, c: [`pinch`, `Keep feet clear of buggy wheels as they drop to the rail.`] },
      { t: `Front buggy`, d: `Release the lining-cord tension, pull the front-buggy lock pin, lower the front buggy and pull it out.` },
      { t: `Install the push boom`, d: `Install the push boom on the front buggy towers. This is a two-person job.`, c: [`adjacent`, `Stay off the adjacent track unless it is within your working limits.`] },
      { t: `Connect hoses & cables`, d: `Connect the pneumatic hoses by matching the colored tape, then the electrical connectors.` },
      { t: `Cords`, d: `Snug the lining cord leaving slight slack and lock it. At the rear, take the slack out of the lifting cord.` },
      { t: `Tamping screen`, d: `Back in the cab: Tamping ON, Units UP, Units LOCK (unlock), unlock the head slide locks, then position the units over the rails.`, c: [`redzone`, `Confirm the ground crew is clear before any unit moves. Units can move sideways.`] },
      { t: `Surfacing screen`, d: `Lift and lining tensions ON.` },
      { t: `Clamps`, d: `Clamp screen: unlock the clamp frame. On B51 press Clamps LIFT, then Clamps LOWER onto the rail. Confirm on B9 or the Clamp screen.` },
      { t: `References`, d: `On B52 select the line reference (high rail in a curve, field side in tangent). On B51 set cross level to the opposite rail (low rail in a curve).` }
    ] },
  { id: `work`, title: `Working the machine (tamping cycle)`, part: 9, mins: 30, cat: `Work`, requires: [`rwp`, `rmo`, `grm`, `rules`], brief: true,
    ppe: [`hat`, `glasses`, `vest`, `boots`, `ears`], hz: [`moving`, `noise`, `adjacent`],
    steps: [
      { t: `Check indicators`, d: `Lining indicator on B9 at or near center, lift meters with no lift indication. Check line reference and zero point.` },
      { t: `Tamping ON, Autocycle`, d: `Select Tamping ON and Autocycle.` },
      { t: `Close the clamps`, d: `Rollers for normal track, hooks in switches or at joints. Set hook opening (Half/Full), position (Head/Base/Down) and depth.` },
      { t: `Run the cycle`, d: `Hold the tamping pedal (or pull back the B52 joystick) for the whole cycle: units down, lift and line, units up, work brake releases.`, c: [`redzone`, `If anyone enters the red zone, release the pedal and stop. Know where the emergency stop is without looking.`] },
      { t: `Index forward`, d: `Turn the index-speed knob on B51 clockwise to move forward.` },
      { t: `Next tie`, d: `Release the pedal over the next tie, then press it again. Repeat.` },
      { t: `Lift and depth targets`, d: `Ideal lift is 1¼ to 1¾ in. One insertion with about 1 s squeeze is usually enough. Tool blade top about ½ in below the tie bottom.`, c: [`tip`, `Lifts of 2 in or more may need two insertions. If ties stay down, make another insertion.`] },
      { t: `Monitor`, d: `Ramp the lift preset linearly. Watch the lining indicator, work-area and rear pendulum indicators, and lift meters (they should return to zero each cycle).` },
      { t: `Lining zero`, d: `Lining preset 000, no AGGS alignment output. Index onto good tangent and adjust the zero point on the Diagnostic screen until the needle swings equally. Repeat for the other rail.` }
    ] },
  { id: `aggsmeasure`, title: `AGGS measuring run`, part: 7, mins: 20, cat: `AGGS`, requires: [`rwp`, `rmo`, `grm`, `aggs`], brief: true,
    ppe: [`hat`, `glasses`, `vest`, `boots`], hz: [`moving`, `adjacent`],
    steps: [
      { t: `Machine configuration`, d: `Work mode, all buggies down, clamp frame and tamping units up and locked.` },
      { t: `Pick the start point`, d: `Start on decent tangent or in the full body of a curve, not within two machine lengths of a spiral or restriction. Mark the start with paint at the lining buggy.` },
      { t: `Tensions ON`, d: `Lift and lining tensions ON. Make sure there are no values in the lift/line sections.` },
      { t: `Diagnostics > Measure mode`, d: `Reset distance, measure mode ON (allows faster speed), and log events: crossings, turnouts, restrictions.` },
      { t: `Start recording`, d: `AGGS monitor: Run group > Measure. Travel Forward, name the file (e.g. by mile marker), verify the lining reference, Record, then move.` },
      { t: `Stop & save`, d: `Stop at least two machine lengths past a spiral or restriction. Stop > Exit > Yes.` }
    ] },
  { id: `aggssolve`, title: `AGGS basic solve`, part: 8, mins: 15, cat: `AGGS`, requires: [`aggs`], brief: false,
    ppe: [], hz: [],
    steps: [
      { t: `Open the file`, d: `Open the measured file and choose Auto optimize.` },
      { t: `Check each curve`, d: `Verify the curve hand (L/R) and measured cross level, then accept or enter the superelevation. Repeat for each curve.` },
      { t: `Curve points`, d: `Set the curve points (T, TS, SC, CS).` },
      { t: `Calculate throws and save`, d: `Calculate throws and save. The file is ready to work.`, c: [`tip`, `Where track is far from design, use the Engineering function, or import geometry from CLASP or a measuring car.`] }
    ] },
  { id: `emerg`, title: `Emergency pump: raise units`, part: 10, mins: 5, cat: `Recovery`, requires: [`rwp`, `rmo`, `grm`], brief: false,
    ppe: [`hat`, `glasses`, `vest`, `boots`], hz: [`moving`, `hyd`, `pinch`],
    steps: [
      { t: `Power ON`, d: `Main battery switch ON and PLC ON.` },
      { t: `Mode to WORK`, d: `On B51 turn the mode switch to WORK.` },
      { t: `Hold emergency pump`, d: `On B52 press and hold the emergency pump push-button for the whole operation.`, c: [`redzone`, `Clear everyone from under the units. They move as soon as you select them.`] },
      { t: `Raise one at a time`, d: `Raise the tamping units or the clamp frame, one at a time.` },
      { t: `Lock and secure`, d: `Lock and secure the units, then move the machine.`, c: [`cfr`, `Report the failure and tag the machine. 49 CFR 214.527 requires defects to be tagged, dated and reported.`] }
    ] }
];

/* Service schedule. Interval structure (daily/50/200/500/1000 h) is REAL; tasks with real:false are SAMPLE (Plasser's lists are not public). */
D.service = [
  { id: `daily`, label: `Daily`, hrs: 0, tasks: [
    { t: `Walk-around for damage and leaks`, real: true }, { t: `Check fuel level`, real: true }, { t: `Check hydraulic oil level (blue tank)`, real: true },
    { t: `Check engine oil level`, real: true }, { t: `Check coolant level`, real: true }, { t: `Drain air tanks at shutdown`, real: true },
    { t: `Daily operator inspection of safety equipment (49 CFR 214.527)`, real: true }, { t: `Check tamping-unit auto-lube reservoir`, real: false }, { t: `Inspect tamping tools for loose or broken tines`, real: false } ] },
  { id: `h50`, label: `50 h`, hrs: 50, tasks: [
    { t: `Check gearbox oil (at least weekly)`, real: true }, { t: `Grease buggy pivots and push-boom pins`, real: false }, { t: `Inspect hoses at the tamping units for chafing`, real: false },
    { t: `Check lifting and lining cords for broken strands`, real: false }, { t: `Clean ATLAS tie-finder sensor face`, real: false } ] },
  { id: `h200`, label: `200 h`, hrs: 200, tasks: [
    { t: `Inspect vibrator drive and squeeze cylinders`, real: false }, { t: `Check rail clamp rollers and hooks for wear`, real: false },
    { t: `Check battery terminals and 24 V charging voltage`, real: false }, { t: `Drain water from fuel filter / separator`, real: false }, { t: `Check air dryer purge`, real: false } ] },
  { id: `h500`, label: `500 h`, hrs: 500, tasks: [
    { t: `Change engine oil and filter (per engine maker)`, real: false }, { t: `Replace fuel filters`, real: false }, { t: `Hydraulic oil sample for analysis`, real: false },
    { t: `Check pump drive gearbox oil`, real: false }, { t: `Inspect tamping-tool tungsten-carbide armor`, real: false } ] },
  { id: `h1000`, label: `1,000 h`, hrs: 1000, tasks: [
    { t: `Replace filters with the Plasser American 1000-hour OEM filter kit`, real: true }, { t: `Change gearbox oils`, real: false },
    { t: `Hydraulic oil: change only if analysis is out of limits (water > 1,000 ppm, viscosity < 90%)`, real: true }, { t: `Replace air filter elements`, real: false }, { t: `Calibrate depth and hook transducers`, real: false } ] }
];
D.oilLimits = [ [`Approved hydraulic oils`, `Shell Tellus Oil T-46 · Panolin HLP Synth 46 (bio)`], [`Viscosity`, `≥ 90% of original`], [`Water`, `max 1,000 ppm (0.10%)`], [`TAN (used oil)`, `up to 1 mg KOH/g`], [`Cleanliness`, `ISO 4406 19/16/13 – 20/17/14`], [`Achievable oil life`, `up to 20,000 h`] ];
D.lube = [ [`Tamping units`, `Automatic lube system`, `EP2 grease`, `Timed, automatic`], [`Buggy pivots & boom pins`, `Grease gun`, `EP2 grease`, `50 h`], [`Rear-axle gearbox`, `Gear oil`, `SAE 80W-90`, `500 h check / 1,000 h change`], [`Engine`, `Engine oil`, `SAE 15W-40`, `Per engine maker`], [`Hydraulic system`, `Hydraulic oil`, `Tellus T-46 / Panolin 46`, `By oil analysis`] ];

/* Parts. Component names and locations are REAL (Plasser tutorials). Part numbers, quantities, stock and interchange are SAMPLE. */
D.partCats = [ [`tamp`, `Tamping units`], [`clamp`, `Rail clamp & lining`], [`meas`, `Measuring system`], [`hyd`, `Hydraulics`], [`filt`, `Filters`], [`eng`, `Engine & drive`], [`elec`, `Electrical`], [`brake`, `Brakes & pneumatics`], [`cab`, `Cab & safety equipment`] ];
D.parts = [
  { id: `tine`, cat: `tamp`, name: `Tamping tool (tine)`, pn: `S-4410-0128`, qty: 16, area: `tamp`, loc: `Tamping heads, 4 per head`, desc: `Forged monobloc tool with tungsten-carbide armor on ballast-contact surfaces and a 5° slanted plate underside that lowers penetration resistance and wear.`, sub: [`Any of the 16 positions (same tool, left/right hand)`], stock: 24 },
  { id: `tinebolt`, cat: `tamp`, name: `Tool clamp bolt & wedge set`, pn: `S-4410-0311`, qty: 16, area: `tamp`, loc: `Tool holders on each tamping arm`, desc: `Holds each tine in its arm. Torque in sequence after every tool change.`, sub: [], stock: 40 },
  { id: `depthx`, cat: `tamp`, name: `Tamping-unit depth transducer`, pn: `S-6120-0045`, qty: 4, area: `tamp`, loc: `On each tamping unit`, desc: `Measures tool depth. The operator sets target depth from the touch panel for different rail sizes.`, sub: [`Hook depth transducer (same body, recalibrate)`], stock: 2 },
  { id: `squeeze`, cat: `tamp`, name: `Squeeze cylinder`, pn: `S-5230-0920`, qty: 8, area: `tamp`, loc: `Between tamping arms`, desc: `Hydraulic cylinder that closes the tools under the tie during the squeeze.`, sub: [], stock: 1 },
  { id: `lubeacc`, cat: `tamp`, name: `Auto-lube hydraulic accumulator`, pn: `S-5410-0077`, qty: 1, area: `tamp`, loc: `Next to the tamping units`, desc: `Powers the automatic tamping-unit lubrication system on a timed interval.`, sub: [], stock: 1 },
  { id: `slidelock`, cat: `tamp`, name: `Head slide lock pin`, pn: `S-4420-0150`, qty: 4, area: `tamp`, loc: `Tamping head slides`, desc: `Locks the split heads for travel. Unlocked from the Tamping screen during work setup.`, sub: [], stock: 6 },
  { id: `clamproll`, cat: `clamp`, name: `Rail clamp roller`, pn: `S-4610-0210`, qty: 6, area: `clamp`, loc: `Rail clamp frame: 1 front, 2 rear per side`, desc: `Grips the rail head for lifting in normal production. Better lifting than hooks.`, sub: [`Front and rear rollers interchange if flange profile matches`], stock: 4 },
  { id: `hook`, cat: `clamp`, name: `Rail hook`, pn: `S-4620-0118`, qty: 2, area: `clamp`, loc: `Rail clamp frame`, desc: `Grips under the rail base or head. Used in switches and at joints, with or without rollers.`, sub: [], stock: 2 },
  { id: `liftcyl`, cat: `clamp`, name: `Lifting cylinder`, pn: `S-5240-0640`, qty: 2, area: `clamp`, loc: `One each side of the clamp frame`, desc: `Lifts the rail to target height.`, sub: [`Left and right are the same cylinder`], stock: 1 },
  { id: `linecyl`, cat: `clamp`, name: `Lining cylinder`, pn: `S-5240-0655`, qty: 1, area: `clamp`, loc: `Rail clamp frame`, desc: `Moves the track left or right.`, sub: [], stock: 1 },
  { id: `gaugecomp`, cat: `clamp`, name: `Lining roller with gauge comp axle`, pn: `S-4630-0090`, qty: 1, area: `clamp`, loc: `Middle of the clamp frame`, desc: `Sliding axle stops the rails spreading when they are clamped.`, sub: [], stock: 1 },
  { id: `versine`, cat: `meas`, name: `Lining versine transducer`, pn: `S-6130-0021`, qty: 1, area: `buggy`, loc: `Lining (middle) buggy`, desc: `Measures alignment against the lining cord.`, sub: [], stock: 1 },
  { id: `slope`, cat: `meas`, name: `Slope sensor (pendulum)`, pn: `S-6140-0033`, qty: 3, area: `buggy`, loc: `Front, middle and rear buggies`, desc: `Measures cross level / superelevation. Rear for cross-level correction, middle for AGGS measuring.`, sub: [`Any buggy position after zero calibration`], stock: 2 },
  { id: `encoder`, cat: `meas`, name: `AGGS distance encoder`, pn: `S-6150-0012`, qty: 2, area: `buggy`, loc: `Rear buggy`, desc: `Measures traveled distance for AGGS.`, sub: [], stock: 1 },
  { id: `atlas`, cat: `meas`, name: `ATLAS tie-finder sensor`, pn: `S-6160-0008`, qty: 1, area: `power`, loc: `Near the front axle`, desc: `Detects tie locations and feeds the ATLAS computer for fully automatic tamping.`, sub: [], stock: 1 },
  { id: `obstr`, cat: `meas`, name: `Obstruction limit switch`, pn: `S-6170-0005`, qty: 1, area: `buggy`, loc: `Front buggy`, desc: `Detects obstructions for the ATLAS system.`, sub: [`Standard industrial limit switch, same thread (simulated)`], stock: 3 },
  { id: `feeler`, cat: `meas`, name: `Feeler rod`, pn: `S-4710-0044`, qty: 2, area: `buggy`, loc: `Rear and middle buggies`, desc: `Links the buggy to the lift cable and lift sending unit.`, sub: [], stock: 1 },
  { id: `cord`, cat: `meas`, name: `Lining / lifting cord (steel chord)`, pn: `S-4720-0300`, qty: 3, area: `buggy`, loc: `Between buggies`, desc: `Internal steel-chord reference for lining and leveling, tensioned by pneumatic cylinders.`, sub: [], stock: 2 },
  { id: `mainpump`, cat: `hyd`, name: `Hydraulic pump (1 of 4)`, pn: `S-5110-0400`, qty: 4, area: `power`, loc: `On the pump drive gearbox`, desc: `Four pumps serve travel, work pressure, vibrators and oil cooling.`, sub: [], stock: 0 },
  { id: `emergpump`, cat: `hyd`, name: `Electric emergency pump`, pn: `S-5120-0015`, qty: 1, area: `power`, loc: `Upper left of the clamp-frame area`, desc: `Raises the clamp frame or tamping units if hydraulic pressure or the main pump is lost.`, sub: [], stock: 1 },
  { id: `cooler`, cat: `hyd`, name: `Hydraulic oil cooler`, pn: `S-5310-0066`, qty: 1, area: `power`, loc: `Near the front axle`, desc: `Cools hydraulic oil, served by its own pump circuit.`, sub: [], stock: 0 },
  { id: `fhret`, cat: `filt`, name: `Hydraulic return filter element`, pn: `S-7110-0101`, qty: 2, area: `power`, loc: `Blue hydraulic tank`, desc: `Part of the 1000-hour OEM filter kit. Keep a spare kit on the machine.`, sub: [`Approved cross-reference only (see Ask RailMate)`], stock: 6 },
  { id: `fhpres`, cat: `filt`, name: `Hydraulic pressure filter element`, pn: `S-7110-0140`, qty: 3, area: `power`, loc: `Pump outlets`, desc: `High-pressure filters protecting the work circuits.`, sub: [], stock: 4 },
  { id: `feng`, cat: `filt`, name: `Engine oil filter`, pn: `S-7210-0012`, qty: 1, area: `power`, loc: `Cummins engine`, desc: `Engine full-flow oil filter.`, sub: [`Engine maker's equivalent for the same engine serial`], stock: 8 },
  { id: `ffuel`, cat: `filt`, name: `Fuel filter / water separator`, pn: `S-7220-0031`, qty: 2, area: `power`, loc: `Engine compartment`, desc: `Primary and secondary fuel filtration.`, sub: [], stock: 6 },
  { id: `fair`, cat: `filt`, name: `Engine air filter (primary & safety)`, pn: `S-7230-0050`, qty: 2, area: `power`, loc: `Engine air intake`, desc: `Two-stage dry air filter.`, sub: [], stock: 4 },
  { id: `fdryer`, cat: `filt`, name: `Air dryer cartridge`, pn: `S-7310-0009`, qty: 1, area: `power`, loc: `Pneumatic system`, desc: `Removes moisture from brake and cord-tension air.`, sub: [], stock: 2 },
  { id: `fcab`, cat: `filt`, name: `Cab pressurizer filter`, pn: `S-7410-0004`, qty: 1, area: `cab`, loc: `V8 enclosure`, desc: `Supports positive-pressure cab ventilation (49 CFR 214.505 for new tampers).`, sub: [], stock: 3 },
  { id: `engine`, cat: `eng`, name: `Cummins diesel engine, 325 HP`, pn: `S-8000-0001`, qty: 1, area: `power`, loc: `Engine compartment`, desc: `Main power source. The exact engine model is not published by Plasser.`, sub: [], stock: 0 },
  { id: `gearbox`, cat: `eng`, name: `Rear-axle two-speed gearbox`, pn: `S-8110-0020`, qty: 1, area: `power`, loc: `Rear axle`, desc: `Two-speed axle gearbox. Neutral is selected from Diagnostics > Travel > Gears for towing.`, sub: [], stock: 0 },
  { id: `pdg`, cat: `eng`, name: `Pump drive gearbox`, pn: `S-8120-0011`, qty: 1, area: `power`, loc: `On the diesel engine`, desc: `Drives the four hydraulic pumps.`, sub: [], stock: 0 },
  { id: `batt`, cat: `elec`, name: `8D 12 V battery`, pn: `S-9110-0008`, qty: 2, area: `power`, loc: `Battery box`, desc: `Two in series for the 24 V system.`, sub: [`Any 8D 12 V heavy-duty battery of equal or higher CCA (simulated)`], stock: 2 },
  { id: `master`, cat: `elec`, name: `Battery master switch`, pn: `S-9120-0002`, qty: 1, area: `power`, loc: `Next to the battery box`, desc: `Connects battery power to the machine. Lockout point for maintenance.`, sub: [], stock: 1 },
  { id: `conv`, cat: `elec`, name: `24 V to 12 V DC converter`, pn: `S-9130-0014`, qty: 2, area: `cab`, loc: `V8 enclosure, right side of cab`, desc: `Supplies 12 V cab equipment.`, sub: [], stock: 1 },
  { id: `ups`, cat: `elec`, name: `AGGS/ATLAS computer UPS box`, pn: `S-9140-0003`, qty: 1, area: `cab`, loc: `Work cab`, desc: `Keeps the AGGS/ATLAS computer powered through dips.`, sub: [], stock: 1 },
  { id: `fsb`, cat: `brake`, name: `Failsafe brake cylinder`, pn: `S-9510-0022`, qty: 4, area: `power`, loc: `At each axle`, desc: `Spring-applied brake. Can be caged by the rear bolt for towing.`, sub: [], stock: 1 },
  { id: `fsbv`, cat: `brake`, name: `Failsafe brake release valve`, pn: `S-9520-0006`, qty: 1, area: `cab`, loc: `Exterior right side of cab`, desc: `Closed during towing so external air can release the brakes.`, sub: [], stock: 1 },
  { id: `drain`, cat: `brake`, name: `Air tank drain valve`, pn: `S-9530-0010`, qty: 3, area: `power`, loc: `Air tanks`, desc: `Drain moisture at every shutdown.`, sub: [`Standard 1/4 in NPT drain cock (simulated)`], stock: 5 },
  { id: `estop`, cat: `cab`, name: `Emergency stop push-button`, pn: `S-9610-0001`, qty: 1, area: `cab`, loc: `B52 panel, right console`, desc: `Stops the machine. Test at the start of every shift.`, sub: [], stock: 2 },
  { id: `ext`, cat: `cab`, name: `Fire extinguisher, 5-BC or higher`, pn: `S-9710-0005`, qty: 1, area: `cab`, loc: `Work cab, within operator reach`, desc: `Required on new machines by 49 CFR 214.507.`, sub: [`Any 5-BC or higher rated unit`], stock: 3 },
  { id: `fak`, cat: `cab`, name: `First-aid kit`, pn: `S-9720-0002`, qty: 1, area: `cab`, loc: `Work cab`, desc: `Per 29 CFR 1926.50(d)(2), required by 49 CFR 214.507.`, sub: [], stock: 3 },
  { id: `beacon`, cat: `cab`, name: `360° roof beacon`, pn: `S-9730-0011`, qty: 1, area: `cab`, loc: `Cab roof`, desc: `Required by 49 CFR 214.509.`, sub: [], stock: 2 }
];
/* Photo hotspots (approximate positions, %) on dsc00714 */
D.hotspots = [
  { id: `power`, x: 9, y: 52, label: `Power & hydraulic area` },
  { id: `buggy`, x: 39, y: 79, label: `Measuring buggy` },
  { id: `clamp`, x: 58, y: 76, label: `Rail clamp (lift & line)` },
  { id: `tamp`, x: 75, y: 70, label: `Split-head tamping units` },
  { id: `cab`, x: 91, y: 24, label: `Work cab` }
];

/* SAMPLE fault codes */
D.faults = [
  [`E-101`, `Travel enable not met`, `Open Diagnostics > Travel and find the enable that is not green.`, `notravel`],
  [`E-214`, `Hydraulic oil temperature high`, `Reduce work rate, check the oil cooler.`, `hot`],
  [`E-305`, `Lining versine signal out of range`, `Check cord tension and transducer connector.`, `lining`],
  [`E-322`, `Slope sensor not plausible`, `Compare front/middle/rear values on B9.`, `lining`],
  [`E-512`, `ATLAS no-go`, `Clean the tie-finder face; check obstruction switch.`, `atlas`],
  [`E-601`, `Main pump pressure lost`, `Use the emergency pump to raise units.`, `pump`],
  [`E-702`, `ECM fault active`, `Engine Diagnostics for the engine code.`, `nostart`]
];

/* Troubleshooting decision trees. q-nodes have options o: [[label, next]]; fix-nodes are leaves. real:true trees are built from the official tutorials. */
D.trees = [
  { id: `nostart`, title: `Engine will not crank or start`, sys: `Engine`, real: true, start: `a`, nodes: {
    a: { q: `Is the battery master switch ON and do the cab screens power up?`, o: [[`Yes, screens are on`, `b`], [`No power at all`, `p1`]] },
    p1: { fix: `No 24 V power`, steps: [`Turn the battery master switch ON (next to the battery box).`, `Check both 8D batteries and terminals for corrosion or loose cables.`, `Measure across the pair: about 24–25 V at rest. Below 23 V, charge or replace (sample threshold).`], c: [`elec`, `Remove rings and watches. Two 8D batteries in series can deliver very high current.`], src: `Tutorial Part 1` },
    b: { q: `Is the Travel/Work switch fully OFF?`, o: [[`No, it was in TRAVEL or WORK`, `p2`], [`Yes, it is OFF`, `c`]] },
    p2: { fix: `Mode switch interlock`, steps: [`Turn the Travel/Work switch to OFF. The machine will not start in any other position.`, `Ignition ON, check the Engine and PLC screens, then crank.`], src: `Tutorial Part 3` },
    c: { q: `Does the engine turn over when you crank?`, o: [[`Cranks but won't fire`, `d`], [`Does not turn over`, `p3`]] },
    p3: { fix: `Starter circuit`, steps: [`Check for an ECM or PLC fault on the Engine screen.`, `Check the starter connections and starter relay.`, `If the starter only clicks, test battery voltage under load.`], c: [`loto`, `Before touching the starter, turn the battery master OFF and apply your lock and tag.`], sample: true },
    d: { q: `Is an ECM warning light on?`, o: [[`Yes`, `p4`], [`No`, `p5`]] },
    p4: { fix: `Read the engine codes`, steps: [`Press Engine Diagnostics on the PLC screen to read the ECM codes.`, `Note the code and call a Cummins-qualified mechanic with it.`], src: `Tutorial Part 3` },
    p5: { fix: `Fuel and cranking practice`, steps: [`Crank no more than 10 seconds, then wait 1 minute before trying again.`, `Check fuel level in the green tank and drain water from the separator.`, `If it still will not fire, tag the machine and report it.`], src: `Tutorial Part 3`, c: [`cfr`, `Tag, date and report the defect (49 CFR 214.527).`] }
  } },
  { id: `notravel`, title: `Machine will not travel`, sys: `Travel`, real: true, start: `a`, nodes: {
    a: { q: `Is the speed-handle light on?`, o: [[`Yes, light is on`, `e`], [`No light`, `b`]] },
    b: { q: `Open Diagnostics > Travel. Are all enable lights on the left green, except the two yellow ones?`, o: [[`One or more are not green`, `p1`], [`All green except two yellow`, `c`]] },
    p1: { fix: `Follow the missing enable`, steps: [`The light that is not green points to the cause.`, `Common ones: parking brake still applied, service brake not fully released, mode switch not in TRAVEL, units or buggies not locked.`, `Clear the condition and re-check the screen.`], src: `Tutorial Parts 4 and 10` },
    c: { q: `Is the engine at about 2,000 RPM?`, o: [[`No, still at idle`, `p2`], [`Yes`, `d`]] },
    p2: { fix: `Raise engine speed`, steps: [`Raise the engine to 2,000 RPM. The hydraulic pumps need it to work efficiently.`, `Then release the service brake fully and watch for the speed-handle light.`], src: `Tutorial Part 4` },
    d: { q: `Were the drive axles put in neutral for towing earlier?`, o: [[`Yes / not sure`, `p3`], [`No`, `p4`]] },
    p3: { fix: `Take gears out of neutral`, steps: [`Diagnostics > Travel > Gears: select the travel gear again.`, `If a GRM2X is coupled, check its axles too.`, `Make sure the failsafe brakes were set again after towing.`], src: `Tutorial Part 4` },
    p4: { fix: `Escalate to mechanical`, steps: [`Record what the Diagnostics > Travel screen shows (photo it).`, `Check System overview for any PLC module fault.`, `Call the KCR mechanical desk.`], sample: true },
    e: { fix: `Ready to move`, steps: [`All travel enables are met. Raise the speed handle slowly until the machine moves.`, `Do a brake test with the service brake before continuing.`], src: `Tutorial Part 4` }
  } },
  { id: `lining`, title: `Lining indicator off zero / poor alignment`, sys: `Measuring`, real: true, start: `a`, nodes: {
    a: { q: `Is this at the start of a work run?`, o: [[`Yes, at start-up`, `p1`], [`No, mid-run`, `b`]] },
    p1: { fix: `Run-in the lining`, steps: [`Either tamp only until the indicator nears zero, then turn auto-lining on,`, `or back up a short distance and line only until the tamping point.`, `Line swings and engineering stakes can also cause offsets.`], src: `Tutorial Part 9` },
    b: { q: `Does the needle swing equally either side on good tangent?`, o: [[`No, it favors one side`, `p2`], [`Yes`, `c`]] },
    p2: { fix: `Lining zeroing procedure`, steps: [`Set lining preset to 000, with no AGGS alignment output.`, `Index onto good tangent track.`, `Adjust the zero point on the Diagnostic screen until the needle swings equally.`, `Repeat for the other rail.`], src: `Tutorial Part 9` },
    c: { q: `Is the lining cord snug with only slight slack, and tensions ON?`, o: [[`No`, `p3`], [`Yes`, `p4`]] },
    p3: { fix: `Cord tension`, steps: [`Surfacing screen: lift and lining tensions ON.`, `Snug the lining cord leaving slight slack, and lock it.`], c: [`redzone`, `Tell the operator before stepping down to the cord. Machine stopped, work brake on.`], src: `Tutorial Part 5` },
    p4: { fix: `Check the versine transducer`, steps: [`Inspect the lining-buggy versine transducer and connector.`, `Check for fault E-305.`, `Replace the transducer if the signal stays out of range.`], sample: true }
  } },
  { id: `lift`, title: `Ties not coming up / poor surface`, sys: `Tamping`, real: true, start: `a`, nodes: {
    a: { q: `How big is the lift?`, o: [[`2 in or more`, `p1`], [`Under 2 in`, `b`]] },
    p1: { fix: `Use two insertions`, steps: [`Lifts of 2 in or more may need two insertions per tie.`, `Ideal lift in most conditions is 1¼ to 1¾ in.`], src: `Tutorial Part 9` },
    b: { q: `Are the tools reaching the right depth (blade top about ½ in below tie bottom)?`, o: [[`Not sure / too shallow`, `p2`], [`Depth is right`, `c`]] },
    p2: { fix: `Set tool depth`, steps: [`Set depth to the nearest 0.1 in on the Work screen (measured down from top of rail).`, `At a new tie, pull ballast away to check depth visually.`], c: [`redzone`, `Only check depth with the machine stopped, work brake on and units up. Establish radio contact first.`], src: `Tutorial Part 9` },
    c: { q: `Is the grade rail much higher than the opposite rail?`, o: [[`Yes`, `p3`], [`No`, `p4`]] },
    p3: { fix: `Start below zero`, steps: [`Start the lift below zero.`, `Disable the rear feeler-rod correction until the run-in brings the cross level in.`], src: `Tutorial Part 9` },
    p4: { fix: `Extra insertion`, steps: [`If tools squeeze against ties that fail to come up, make another insertion.`, `Keep the minimum lift greater than any cross-level error ahead of the machine.`], src: `Tutorial Part 9` }
  } },
  { id: `pump`, title: `Lost hydraulic pressure, units down`, sys: `Hydraulics`, real: true, start: `a`, nodes: {
    a: { q: `Are tamping units or the clamp frame stuck down on the rail?`, o: [[`Yes`, `b`], [`No, just a low-pressure warning`, `p2`]] },
    b: { q: `Is anyone on the ground near the units?`, o: [[`Yes / not sure`, `p0`], [`Area is clear`, `p1`]] },
    p0: { fix: `Clear the red zone first`, steps: [`Call all ground personnel clear of the machine by radio.`, `Get a verbal confirmation from each person before any unit moves.`, `Then use the emergency-pump procedure.`], c: [`redzone`, `FRA Safety Advisory 2024-01: no red-zone entry without established communication with the operator.`], link: `emerg` },
    p1: { fix: `Raise with the emergency pump`, steps: [`Main battery switch ON and PLC ON.`, `On B51 turn the mode switch to WORK.`, `Hold the emergency pump button on B52 for the whole operation.`, `Raise the tamping units or the clamp frame, one at a time.`, `Lock and secure them, then move the machine.`], src: `Tutorial Part 10`, link: `emerg` },
    p2: { fix: `Check hydraulic supply`, steps: [`Check the blue hydraulic tank level.`, `Look for a burst hose or major leak.`, `Note any fault code (E-601) and call mechanical.`], c: [`hyd`, `Never search for pin-hole leaks by hand. Injected oil is a surgical emergency.`], sample: true }
  } },
  { id: `hot`, title: `Hydraulic oil running hot`, sys: `Hydraulics`, real: false, start: `a`, nodes: {
    a: { q: `Is the oil cooler (near the front axle) clean and free of debris?`, o: [[`Clogged / dirty`, `p1`], [`Clean`, `b`]] },
    p1: { fix: `Clean the cooler`, steps: [`Shut down and let it cool.`, `Blow out the cooler from the clean side with low-pressure air.`], c: [`loto`, `Lock out the battery master before reaching near the cooler fan.`], sample: true },
    b: { q: `Is the hydraulic oil level correct?`, o: [[`Low`, `p2`], [`Correct`, `p3`]] },
    p2: { fix: `Top up with approved oil`, steps: [`Top up only with the approved oil fitted: Shell Tellus T-46 or Panolin HLP Synth 46.`, `Find the leak before returning to work.`], sample: true },
    p3: { fix: `Reduce load and escalate`, steps: [`Reduce the work rate and monitor.`, `Take an oil sample: water must be under 1,000 ppm.`, `Call mechanical with fault E-214.`], sample: true }
  } },
  { id: `atlas`, title: `ATLAS shows no-go`, sys: `Measuring`, real: false, start: `a`, nodes: {
    a: { q: `Is the front buggy down in work position?`, o: [[`Yes`, `b`], [`No, buggy is up`, `p0`]] },
    p0: { fix: `Lower the front buggy`, steps: [`ATLAS needs the front buggy and obstruction limit switch in work position.`], sample: true },
    b: { q: `Is there an obstruction (crossing, guard rail, debris) at the front buggy?`, o: [[`Yes`, `p1`], [`No`, `p2`]] },
    p1: { fix: `Work manually past the obstruction`, steps: [`Switch to manual tamping through the obstruction.`, `Re-enable ATLAS on clean track.`], sample: true },
    p2: { fix: `Clean and check the sensor`, steps: [`Clean the tie-finder face near the front axle.`, `Check the obstruction limit switch moves freely.`, `Check for fault E-512.`], c: [`loto`, `Machine stopped, work brake on and operator notified before you go under the frame.`], sample: true }
  } }
];

/* Checklists */
D.checklists = [
  { id: `startup`, title: `Start-up`, icon: `play`, real: true, src: `GRM3000T Operator Tutorial Part 3`, items: [
    `Walk-around done: no damage, leaks or loose items`, `Fuel level OK`, `Hydraulic oil level OK`, `Engine oil level OK`, `Coolant level OK`, `Gearbox oil checked this week`,
    `Battery master switch ON`, `All cab switches OFF, Travel/Work OFF`, `Engine & PLC screens: no malfunctions`, `Horn sounded per rules`, `Started within 10 s of cranking`,
    `Idle ~900 RPM, oil pressure good, charging, no ECM light`, `Warmed up 5 min, re-checked for leaks` ] },
  { id: `shutdown`, title: `Shutdown`, icon: `power`, real: true, src: `GRM3000T Operator Tutorial Part 3`, items: [
    `Parking brake applied`, `Throttle to idle`, `Idled 5 minutes`, `Travel/Work switch OFF`, `Lights and A/C OFF`, `AGGS computer shut down`, `Ignition OFF, battery master OFF`, `Air tanks drained`, `Machine locked up per KCR procedure` ] },
  { id: `daily`, title: `Daily operator inspection`, icon: `shield`, real: true, src: `49 CFR 214.527 and 214.505–214.523`, items: [
    `Headlights and work lights`, `360° roof beacon`, `Brake lights`, `Horn`, `Change-of-direction alarm`, `Windshield and power wipers`, `Rear-view mirrors`, `Operator seat`,
    `Fire extinguisher 5-BC+ charged and mounted`, `First-aid kit stocked`, `Speed indicator`, `Floors, steps and ladders free of oil & obstructions`, `Safe rider positions marked`,
    `Service & parking brakes effective`, `Emergency stop tested`, `Flagging kit on board (if required)`, `Safety chains on buggies and units` ] },
  { id: `pretravel`, title: `Pre-travel`, icon: `train`, real: true, src: `GRM3000T Operator Tutorial Part 4`, items: [
    `Buggies and work units up and locked`, `Safety chains fitted`, `Nothing loose that can fall off`, `Engine and hydraulics warm`, `Travel/Work to TRAVEL`, `Lights for direction of travel`, `Engine at 2,000 RPM`, `Speed-handle enable light ON`, `Brake test done` ] },
  { id: `m50`, title: `50-hour service`, icon: `wrench`, real: false, src: `Sample service task list`, items: [
    `Machine locked out and tagged`, `Gearbox oil level checked`, `Buggy pivots and push-boom pins greased`, `Tamping-unit hoses inspected`, `Lifting and lining cords inspected`, `ATLAS sensor cleaned`, `Auto-lube reservoir filled`, `Lockout removed, machine returned to service` ] }
];

/* Documents */
D.docs = [
  { id: `cfr`, title: `49 CFR Part 214 — selected sections`, kind: `Regulation`, real: true, href: `docs/49-cfr-214-selected-sections.html`, size: `39 KB`, fmt: `HTML`, desc: `Definitions, roadway maintenance machines, operator qualification, good-faith challenge, required safety equipment, daily inspection. eCFR as of 2025-10-01.` },
  { id: `fra`, title: `FRA Safety Advisory 2024-01`, kind: `Safety advisory`, real: true, href: `docs/fra-safety-advisory-2024-01.pdf`, size: `180 KB`, fmt: `PDF`, desc: `Roadway maintenance machines: red zones, communication and compliance. Federal Register, Oct 18, 2024.`, cover: `cover-fra-safety-advisory-2024-01` },
  { id: `kit`, title: `1000-Hour OEM Filter Kit`, kind: `OEM brochure`, real: true, href: `docs/plasser-american-1000-hour-oem-filter-kit.pdf`, size: `1.7 MB`, fmt: `PDF`, desc: `Plasser American filter cartridge package for 1,000 operating hours.`, cover: `cover-plasser-american-1000-hour-oem-filter-kit` },
  { id: `filt`, title: `Filter Technology as a Productivity Factor`, kind: `OEM brochure`, real: true, href: `docs/plasser-american-filter-technology.pdf`, size: `3.6 MB`, fmt: `PDF`, desc: `Filters, approved hydraulic oils and oil-analysis limits for Plasser American machines.`, cover: `cover-plasser-american-filter-technology` },
  { id: `om`, title: `GRM3000T Operation Manual`, kind: `Manual`, real: false, pages: 412, desc: `Placeholder entry. The real manual is supplied to machine owners and is not public.`, toc: [`Safety instructions`, `Machine description`, `Controls and indicators`, `Start-up and shutdown`, `Travel operation`, `Work operation`, `AGGS / ATLAS`, `TampLink`, `Maintenance schedule`, `Lubricant diagram`] },
  { id: `sm`, title: `GRM3000T Service Manual`, kind: `Manual`, real: false, pages: 688, desc: `Placeholder entry. Customer-only document.`, toc: [`Hydraulic system`, `Pneumatic system`, `Electrical & PLC`, `Tamping units`, `Rail clamp`, `Measuring system`, `Drive & axles`, `Adjustments & calibration`] },
  { id: `pc`, title: `Spare Parts Catalogue`, kind: `Catalogue`, real: false, pages: 530, desc: `Placeholder entry. Parts are ordered by number or by machine model and number.`, toc: [`Frame & cab`, `Tamping units`, `Clamp frame`, `Buggies`, `Hydraulics`, `Filters`, `Electrical`] },
  { id: `ld`, title: `Lubricant Diagram`, kind: `Chart`, real: false, pages: 2, desc: `Placeholder entry. The real chart is posted on a plaque inside the cab.`, toc: [`Lube points`, `Lubricant types`, `Intervals`] },
  { id: `hs`, title: `Hydraulic Schematic`, kind: `Schematic`, real: false, pages: 14, desc: `Placeholder schematic set.`, toc: [`Travel circuit`, `Work circuit`, `Vibrator circuit`, `Cooling circuit`, `Emergency pump`] },
  { id: `es`, title: `Electrical Schematic`, kind: `Schematic`, real: false, pages: 36, desc: `Placeholder schematic set.`, toc: [`24 V distribution`, `PLC modules`, `Cab panels B51 / B52 / B9`, `Lighting`, `AGGS / ATLAS`] }
];
D.links = [
  [`Plasser American GRM3000T product page`, `https://www.plasseramerican.com/en/machines-systems/tamping/grm3000t`],
  [`eCFR: 49 CFR Part 214 (current)`, `https://www.ecfr.gov/current/title-49/subtitle-B/chapter-II/part-214`],
  [`Plasser American spare & wear parts`, `https://www.plasseramerican.com/en/fleet/spare-and-wear-parts/spare-parts`]
];

/* Training: the 10 official tutorial topics (titles and lengths REAL). Outlines paraphrased. Video is a placeholder. */
D.training = [
  { n: 1, title: `Machine Overview`, len: `6:30`, img: `dsc00714`, outline: [`Rear buggy: slope sensor, lining cylinder, AGGS encoders, feeler rod`, `Rear axle two-speed gearbox`, `Four independent tamping units and depth transducer`, `Lining buggy and auto-lube accumulator`, `Rail clamp: lift & lining cylinders, rollers, hooks, gauge comp`, `Tanks, emergency pump, pump drive gearbox, Cummins engine`, `24 V battery box, master switch, ATLAS tie-finder, booms, front buggy`],
    quiz: [[`How many hydraulic pumps does the pump drive gearbox run?`, [`Two`, `Four`, `Six`], 1], [`What gives the 24 V system?`, [`One 24 V battery`, `Two 8D 12 V batteries in series`, `Four 6 V batteries`], 1], [`What does the gauge comp do?`, [`Stops rails spreading when clamped`, `Measures gauge`, `Changes gauge`], 0]] },
  { n: 2, title: `Cabin Components and Controls`, len: `3:56`, img: `dsc00745`, outline: [`Jump seats, V8 enclosure and cab pressurizer`, `B3 box and Live Info`, `Fire extinguisher, first-aid kit, AGGS/ATLAS computer and UPS`, `B9 crossbar indicators`, `Swivel seat, B51 and B52 consoles`, `Tamping foot pedal`],
    quiz: [[`Where is the emergency stop?`, [`B51`, `B52`, `B9`], 1], [`What does B9 show?`, [`Engine temperature`, `Lift/lining errors and ATLAS go/no-go`, `Fuel level`], 1], [`The operator seat swivels…`, [`90°`, `180°`, `It is fixed`], 1]] },
  { n: 3, title: `Engine Start-up and Shutdown`, len: `3:56`, img: `dsc00674`, outline: [`Walk-around and daily fluid checks`, `Travel/Work switch interlock`, `10-second crank limit, 1-minute wait`, `Normal readings at idle`, `5-minute warm-up and cool-down`, `Draining the air tanks`],
    quiz: [[`Maximum cranking time?`, [`5 s`, `10 s`, `30 s`], 1], [`The Travel/Work switch must be ___ to start.`, [`TRAVEL`, `WORK`, `OFF`], 2], [`Idle before shutdown for…`, [`1 min`, `5 min`, `15 min`], 1]] },
  { n: 4, title: `Traveling the Machine`, len: `4:20`, img: `dsc00720`, outline: [`Units locked and chained`, `Lights for direction`, `Service brake, direction, parking brake release`, `2,000 RPM for the pumps`, `Speed-handle enable light`, `Brake test`, `Towing: neutral, failsafe brake release, caging`],
    quiz: [[`Engine speed for travel?`, [`900 RPM`, `2,000 RPM`, `2,600 RPM`], 1], [`What lights up when travel enables are met?`, [`B9 lamp`, `Speed-handle light`, `Roof beacon`], 1], [`No air for towing? You…`, [`Cage the brake cylinders`, `Drain the tanks`, `Tow anyway`], 0]] },
  { n: 5, title: `Setup for Work`, len: `7:04`, img: `dsc00646`, outline: [`Vibrator warm-up`, `Lowering buggies in order`, `Push boom install (two people)`, `Hoses by colored tape`, `Cord slack and lock`, `Tamping, Surfacing and Clamp screens`, `Line and cross-level references`],
    quiz: [[`Line reference in a curve?`, [`Low rail`, `High rail`, `Either`], 1], [`Pneumatic hoses are matched by…`, [`Size`, `Colored tape`, `Number tags`], 1], [`Which buggy is lowered first?`, [`Front`, `Middle`, `Rear`], 2]] },
  { n: 6, title: `Basic Track Geometry`, len: `4:13`, img: `dsc00740`, outline: [`Alignment, profile, cross level, superelevation`, `Tangents, curves and spirals`, `Cant deficiency (underbalance)`, `What a tamper measures and modifies`, `Standard gauge 4' 8½" — the tamper does not modify gauge`],
    quiz: [[`Can the tamper actively change gauge?`, [`Yes`, `No`], 1], [`Cross level on a curve is called…`, [`Superelevation`, `Versine`, `Profile`], 0], [`Standard gauge is…`, [`4' 8½"`, `5' 0"`, `4' 6"`], 0]] },
  { n: 7, title: `AGGS Measuring`, len: `4:00`, img: `dsc00725`, outline: [`Machine configuration for measuring`, `Choosing a start point`, `Measure mode and logging events`, `Recording a file`, `Stopping past spirals and restrictions`],
    quiz: [[`Don't start within ___ machine lengths of a spiral.`, [`One`, `Two`, `Five`], 1], [`Clamp frame during measuring?`, [`Down`, `Up and locked`, `Floating`], 1]] },
  { n: 8, title: `AGGS Basic Solve Steps`, len: `3:58`, img: `dsc00716`, outline: [`Auto optimize`, `Curve hand and superelevation`, `Curve points T, TS, SC, CS`, `Calculate throws`, `Engineering mode and CLASP import`],
    quiz: [[`First step in a solve?`, [`Calculate throws`, `Auto optimize`, `Measure`], 1], [`TS stands for…`, [`Tangent to spiral`, `Tie spacing`, `Top of steel`], 0]] },
  { n: 9, title: `Working the Machine`, len: `8:07`, img: `dsc00735`, outline: [`Pre-work indicator checks`, `Rollers vs hooks`, `The tamping cycle and indexing`, `Ideal lift and squeeze time`, `Tool depth`, `Run-in at start-up`, `Lining zero procedure`, `Manual and AGGS cross level`],
    quiz: [[`Ideal lift in most conditions?`, [`½–1 in`, `1¼–1¾ in`, `2–3 in`], 1], [`Tool blade top vs tie bottom?`, [`Level`, `About ½ in below`, `2 in below`], 1], [`Hooks are used…`, [`Always`, `In switches and at joints`, `Never`], 1]] },
  { n: 10, title: `Troubleshooting and Maintenance`, len: `2:55`, img: `dsc00704`, outline: [`Daily, 50, 200, 500, 1,000-hour schedule`, `Lubricant diagram on the cab plaque`, `Diagnostics screen categories`, `Travel enables`, `System overview of PLC modules`, `Emergency pump procedure`],
    quiz: [[`Where is the maintenance schedule posted?`, [`Engine cover`, `Plaque on the cab wall`, `Battery box`], 1], [`The emergency pump button must be…`, [`Pressed once`, `Held for the whole operation`, `Locked in`], 1]] }
];

/* Lessons learned. real:true are public record; others SAMPLE. */
D.lessons = [
  { id: `vail`, real: true, title: `Tamper struck a roadway worker — Vail, AZ`, date: `Jan 31, 2021`, sys: `Red zone`,
    body: `During tie-gang work with about 50 people and 23 machines, a Union Pacific employee was struck and killed by a track maintenance tamper (another maker, not a GRM). The NTSB found the probable cause was the operator, in a panicked state, failing to stop the tamper's forward movement.`,
    take: [`Know where your emergency stop is without looking.`, `Practice the stop, not just the start.`, `Ground workers: never assume the operator can see you.`], src: `NTSB RRD21LR007` },
  { id: `fra24`, real: true, title: `FRA Safety Advisory 2024-01: machine red zones`, date: `Oct 18, 2024`, sys: `Red zone`,
    body: `After 2024 fatalities (a CSX foreman struck by a ballast regulator, a UP RWIC struck by an excavator bucket), FRA recommended machine-specific red-zone distances, no red-zone entry without established communication with the operator, red zones in every job briefing, and more operational testing.`,
    take: [`Define the red zone for this machine in every briefing.`, `Radio or eye contact before you enter.`], src: `Federal Register 89 FR 83940` },
  { id: `chain`, real: false, title: `Front buggy dropped in travel`, date: `Jun 2025`, sys: `Travel`, img: `dsc00720`,
    body: `A safety chain was left hanging after a short move between sets. At 30 mph the front buggy latch vibrated loose and the buggy contacted a crossing plank. No injuries; two hours lost.`,
    take: [`Touch every chain on the pre-travel walk-around.`, `Use the Pre-travel checklist even for short moves.`] },
  { id: `boom`, real: false, title: `Fingers pinched on push-boom install`, date: `Mar 2025`, sys: `Work setup`, img: `dsc00646`,
    body: `A helper steadied the push boom from underneath while the operator lowered the front buggy. The boom shifted and pinched two fingers.`,
    take: [`Two-person job: one directs, one handles.`, `Hands on the sides of the boom, never underneath.`] },
  { id: `hydleak`, real: false, title: `Pin-hole hydraulic leak near-miss`, date: `Sep 2024`, sys: `Hydraulics`, img: `dsc00704`,
    body: `A maintainer ran a gloved hand along a tamping-unit hose to find a mist leak. The jet cut the glove. He was not injured; the glove was.`,
    take: [`Use cardboard to find leaks.`, `Relieve pressure and lock out before touching hoses.`] },
  { id: `depth`, real: false, title: `Shallow tamping after a rail change`, date: `Aug 2025`, sys: `Tamping`, img: `dsc00709`,
    body: `After moving from 115 lb to 136 lb rail, tool depth was not reset. The surface fell back within a week and the section had to be re-tamped.`,
    take: [`Reset depth when rail size changes.`, `Pull ballast at a new tie to check depth.`] },
  { id: `refuse`, real: false, title: `Good-faith challenge on weak brakes`, date: `Apr 2026`, sys: `Brakes`, img: `dsc00674`,
    body: `An operator refused to travel after a weak brake test. The supervisor resolved the challenge under the written procedure: a brake cylinder seal was leaking. The machine was back in service the next day.`,
    take: [`You may refuse an unsafe machine (49 CFR 214.503).`, `A brake test is not a formality.`] }
];

D.safetyMoments = [
  { t: `Fouling a track starts at 4 feet`, b: `You are fouling a track when you are within 4 ft of the field side of the near running rail, or close enough to be struck. Plan your walk-around so you never step there without protection.`, src: `49 CFR 214.7` },
  { t: `Red zones need a conversation`, b: `Never enter a machine's red zone without established communication with the operator. Every job briefing should define it.`, src: `FRA Safety Advisory 2024-01` },
  { t: `15 seconds is the minimum`, b: `A watchman/lookout must give at least 15 seconds of warning before a train arrives. If you can't get that, you need a different form of protection.`, src: `49 CFR 214.7` },
  { t: `You can say no`, b: `If you believe a machine is unsafe or non-compliant, report it. You may refuse to operate it until the challenge is resolved.`, src: `49 CFR 214.503` },
  { t: `Practice the stop`, b: `In a panic, people freeze. Rehearse reaching the emergency stop on B52 before every work block.`, src: `NTSB RRD21LR007` }
];

D.contacts = [
  { t: `Emergency (fire, EMS, police)`, n: `911`, real: true, tone: `red` },
  { t: `KCR Dispatcher, Allegheny Div.`, n: `(814) 555-0142`, real: false, tone: `orange` },
  { t: `Roadmaster Dana Whitfield`, n: `(814) 555-0178`, real: false },
  { t: `KCR Safety Hotline (24/7)`, n: `(814) 555-0100`, real: false },
  { t: `KCR Mechanical desk`, n: `(814) 555-0163`, real: false },
  { t: `Plasser American Parts Hotline`, n: `(877) 577-2444`, real: true }
];

/* Ask RailMate scripted Q&A. k = match keywords. sim = substitution/stock content is SIMULATED, not OEM-verified. */
D.ai = [
  { q: `I don't have a spare hydraulic return filter. What can I use?`, cat: `Substitution`, sim: true, k: [`return filter`, `hydraulic filter`, `filter`, `spare filter`],
    a: `**Short answer: don't run without one, and only fit a cross-referenced element.**\n\n1. Check the spare **1000-hour OEM filter kit** on the machine. Plasser American recommends each machine carries one, and it holds every hydraulic, pneumatic and power-system filter needed for 1,000 hours.\n2. If the kit is used up, the Altoona depot shows **6 in stock** (S-7110-0101). Unit 3409 at Tyrone carries the same element.\n3. A generic element is acceptable **only** if it matches the OEM micron rating, beta ratio, collapse pressure and bypass setting. Have mechanical confirm the cross-reference first.\n4. Take an oil sample after the change. Cleanliness target is ISO 4406 19/16/13 to 20/17/14.\n\n⚠️ Lock out the battery master and relieve tank pressure before opening the filter housing.`,
    src: [`Plasser American 1000-hour filter kit brochure`, `Filter Technology brochure`, `Stock & cross-reference: SIMULATED`] },
  { q: `I'm out of Shell Tellus T-46. Can I top up with a different hydraulic oil?`, cat: `Substitution`, sim: true, k: [`tellus`, `hydraulic oil`, `different oil`, `top up`, `oil`],
    a: `**Plasser American approves two hydraulic oils:** Shell Tellus Oil T-46 and Panolin HLP Synth 46 (biodegradable). Using other oils can void the warranty.\n\n- If the machine is filled with **Tellus T-46**, top up only with Tellus T-46.\n- **Do not mix** mineral oil with the synthetic bio oil. A change-over needs a full flush.\n- For a small emergency top-up, call mechanical first. They may approve it with an oil sample at the next service.\n\nCheck which oil is fitted on the label at the blue hydraulic tank.`,
    src: [`Plasser American Filter Technology brochure (approved oils)`, `Emergency top-up guidance: SIMULATED`] },
  { q: `A tamping tine broke. Can I swap one from another head?`, cat: `Substitution`, sim: true, k: [`tine`, `tamping tool`, `broke`, `broken tool`, `swap`],
    a: `**Yes, as a temporary fix.** Plasser designs GRM3000T components to be interchangeable to reduce spare parts.\n\n1. Raise and lock the units, then lock out.\n2. Move a tool from a position you won't need (for example a field-side tool on plain line), keeping left/right hand correct.\n3. Torque the clamp bolt and wedge set in sequence.\n4. Report the swap so the head is re-tooled at the next stop. The depot has **24 tines** (S-4410-0128).\n\n⚠️ Tines are heavy and hot after work. Gloves and safety glasses.`,
    src: [`Plasser American: interchangeable components`, `Swap positions & stock: SIMULATED`] },
  { q: `I don't have a spare 8D battery. What will work?`, cat: `Substitution`, sim: true, k: [`battery`, `8d`, `batteries`],
    a: `The GRM3000T uses **two 8D 12-volt batteries in series** for a 24 V system.\n\n- Any heavy-duty **8D 12 V** battery of equal or higher cold-cranking amps will fit the box.\n- Replace **both** if one is weak. A new battery in series with an old one gets over-worked.\n- Do **not** jump the 24 V system from a single 12 V truck battery. Use a 24 V source.\n\n⚠️ Battery master OFF before disconnecting. Negative off first, on last.`,
    src: [`Tutorial Part 1: battery box`, `Substitution guidance: SIMULATED`] },
  { q: `Lost a rail clamp roller. Can I keep working?`, cat: `Substitution`, sim: true, k: [`clamp roller`, `roller`, `rollers`],
    a: `**You can work on hooks** while you get a roller.\n\nRail hooks can be used without the rollers. Set the hook opening (Half/Full), position (Head/Base/Down) and hook depth on the PLC touch panel. Expect a lower production rate, because rollers have better lifting capability.\n\nFront and rear rollers may interchange if the flange profile matches. The depot shows **4 rollers** in stock.`,
    src: [`Tutorial Parts 1 and 9`, `Interchange & stock: SIMULATED`] },
  { q: `Why won't the machine travel?`, cat: `Troubleshooting`, k: [`travel`, `won't move`, `wont move`, `not moving`, `will not travel`],
    a: `Open **Diagnostics > Travel** on the PLC screen. All enable lights on the left should be **green except the two yellow ones**. The one that isn't points to the cause.\n\nAlso check:\n1. Engine at **2,000 RPM**.\n2. Parking brake released (light out) and service brake fully released.\n3. Gears not left in **neutral** from towing.\n\nThe speed-handle light comes on when all travel enables are met.`,
    src: [`GRM3000T Operator Tutorials Parts 4 and 10`], go: [`Open guided troubleshooting`, `#/m/grm3000t/troubleshoot/notravel`] },
  { q: `What's the ideal lift and how many insertions?`, cat: `Operation`, k: [`lift`, `insertion`, `squeeze`],
    a: `- Ideal lift in most conditions: **1¼ to 1¾ inch**.\n- Usually **one insertion per tie with about 1 second of squeeze** compacts the ballast properly.\n- Lifts of **2 inches or more** may need two insertions.\n- If ties stay down, make another insertion.\n- Keep the minimum lift greater than any cross-level error ahead of the machine.`,
    src: [`GRM3000T Operator Tutorial Part 9`] },
  { q: `How deep should the tamping tools go?`, cat: `Operation`, k: [`depth`, `deep`, `how deep`],
    a: `The **top of the tamping-tool blade should be about ½ inch below the bottom of the tie**.\n\nDepth is measured down from the top of rail and set to the nearest 0.1 inch on the **Work** screen. At a new tie, pull ballast away to check it visually, with the machine stopped and units up.\n\nReset the depth whenever the rail size changes.`,
    src: [`GRM3000T Operator Tutorials Parts 1 and 9`] },
  { q: `How do I raise the units if the main pump fails?`, cat: `Troubleshooting`, k: [`pump fail`, `emergency pump`, `units down`, `main pump`, `raise`],
    a: `Use the **electric emergency pump**:\n\n1. Main battery switch ON, PLC ON.\n2. On **B51**, mode switch to WORK.\n3. **Hold** the emergency pump button on **B52** for the whole operation.\n4. Raise the tamping units **or** the clamp frame, one at a time.\n5. Lock and secure them, then move the machine.\n\n⚠️ Clear everyone from under the units first.`,
    src: [`GRM3000T Operator Tutorial Part 10`], go: [`Open the procedure`, `#/m/grm3000t/operate/emerg`] },
  { q: `What is the red zone and when can I enter it?`, cat: `Safety`, k: [`red zone`, `redzone`, `enter`],
    a: `The **red zone** is the area around a machine where you can be struck by it or its moving parts. FRA Safety Advisory 2024-01 recommends:\n\n- Machine-specific red-zone distances that account for sight lines.\n- **No entry without established communication with the operator.**\n- Red zones discussed in every job briefing.\n\nFor the GRM3000T, today's KCR briefing sets it at **25 ft around work units and buggies** (sample value).`,
    src: [`FRA Safety Advisory 2024-01`, `KCR red-zone distance: SAMPLE`] },
  { q: `Can I refuse to operate a machine I think is unsafe?`, cat: `Safety`, k: [`refuse`, `unsafe`, `challenge`, `good faith`],
    a: `**Yes.** Under **49 CFR 214.503**, you must report a machine that is non-compliant or unsafe, and you **may refuse to operate it** until the good-faith challenge is resolved. Your employer must have written procedures to resolve it.`,
    src: [`49 CFR 214.503`], go: [`Start a good-faith challenge`, `#/safety/refuse`] },
  { q: `How long should I idle before shutdown?`, cat: `Operation`, k: [`idle`, `shutdown`, `shut down`, `warm up`],
    a: `- **Before shutdown:** idle **5 minutes** to equalize temperatures.\n- **After start-up:** idle **at least 5 minutes** before travel or work.\n- Normal idle is about **900 RPM**.\n\nDon't forget to drain the air tanks at shutdown.`,
    src: [`GRM3000T Operator Tutorial Part 3`] },
  { q: `What's the engine start-up sequence?`, cat: `Operation`, k: [`start the engine`, `start-up`, `startup`, `start up`, `starting`, `start`, `crank`],
    a: `**Start-up in order:**\n\n1. **Walk around** the machine: leaks, damage, buggies and work units secured, nobody on or under it.\n2. **Check fluids:** fuel, hydraulic oil, engine oil and coolant.\n3. **Battery master switch ON.**\n4. **All cab switches OFF.** The Travel/Work switch must be OFF or the engine will not start.\n5. **Ignition ON** and check the Engine and PLC screens.\n6. **Sound the horn**, then **crank for no more than 10 seconds**. If it doesn't start, wait 1 minute.\n7. Verify about **900 RPM idle**, oil pressure and charging, then **idle at least 5 minutes** before travel or work.`,
    src: [`GRM3000T Operator Tutorial Part 3`], go: [`Open start-up procedure`, `#/m/grm3000t/operate/startup`] },
  { q: `What does the gauge comp do?`, cat: `Machine`, k: [`gauge comp`, `gauge`],
    a: `The **gauge comp** is the sliding axle on the center lining roller of the rail clamp. It **stops the rails spreading** when they are clamped.\n\nNote: the tamper **cannot actively modify gauge**. It measures and corrects alignment, superelevation and left/right profile.`,
    src: [`GRM3000T Operator Tutorials Parts 1 and 6`] },
  { q: `When do I use hooks instead of rollers?`, cat: `Operation`, k: [`hooks`, `hook`],
    a: `Use **rollers** for normal production; they have better lifting capability. Use **hooks in switches or at track joints**, where rollers can't be used. Hooks grip under the rail base or the head (ball), with depth set by the hook depth transducer from the PLC panel.`,
    src: [`GRM3000T Operator Tutorials Parts 1 and 9`] },
  { q: `What does fault E-214 mean?`, cat: `Troubleshooting`, sim: true, k: [`e-214`, `e214`, `fault`, `code`, `hot oil`, `overheat`, `temperature`],
    a: `**E-214: Hydraulic oil temperature high** (sample fault code).\n\n1. Reduce the work rate.\n2. Check the oil cooler near the front axle for debris.\n3. Check the blue tank level; top up only with the approved oil fitted.\n4. If it persists, take an oil sample and call mechanical.`,
    src: [`Fault code list: SAMPLE`], go: [`Open guided troubleshooting`, `#/m/grm3000t/troubleshoot/hot`] }
];
D.aiFallback = `I don't have a verified answer for that one yet. In the live version I'd search the GRM3000T manuals, service bulletins and crew notes. For now, try one of the suggested questions, check **Troubleshoot** or **Documents**, or call the KCR mechanical desk at (814) 555-0163.`;
