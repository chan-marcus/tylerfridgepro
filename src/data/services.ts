// 7 services -> 7 pages at /services/[slug]/
// icon = key into the SVG icon set in src/components/ServiceIcon.astro
// (icons reuse the existing SVG keys so every card renders an icon)

export interface Service {
  slug: string;
  name: string;
  short: string;        // card blurb
  icon: string;
  h1: string;
  intro: string[];      // paragraphs
  signs: string[];      // warning signs / when to call
  causes: string[];     // common causes
  bullets: { title: string; body: string }[];
  faq: { q: string; a: string }[];
}

export const SERVICES: Service[] = [
  {
    slug: 'walk-in-cooler-repair',
    name: 'Walk-In Cooler Repair',
    short: 'Warm boxes, iced coils, and short-cycling compressors on walk-in coolers, diagnosed and fixed fast.',
    icon: 'commercial',
    h1: 'Walk-In Cooler Repair in Tyler, TX',
    signs: [
      'The box is holding above 41 degrees or climbing through the day',
      'Ice building up on the evaporator coil or water pooling on the floor',
      'The compressor runs constantly and never cycles off',
      'A warm spot near the door or product spoiling faster than usual',
      'A musty smell, or the unit suddenly running much louder'
    ],
    causes: [
      'A failing or short-cycling compressor',
      'Low refrigerant from a slow leak',
      'A condenser coil choked with grease and dust',
      'A stuck defrost cycle or a failed evaporator fan'
    ],
    intro: [
      'A walk-in that drifts above 41 degrees puts every dollar of product inside it on a clock, and in an East Texas summer that clock runs fast. Most walk-in cooler failures trace back to a handful of causes: a failing compressor, a refrigerant leak, an iced-up evaporator coil, a stuck defrost cycle, or a condenser fan and coil choked with grease and dust.',
      'A tech arrives, gets an accurate box temperature and pressures, and finds the actual fault instead of just topping off refrigerant and leaving. The goal is a stable, in-spec box before your next inspection and before your inventory takes the hit.'
    ],
    bullets: [
      { title: 'Fast, accurate diagnosis', body: 'Superheat, subcooling, and box temps read on arrival so the real fault gets found the first trip.' },
      { title: 'Leak detection and repair', body: 'Refrigerant leaks located and sealed, not just recharged, so the fix actually holds.' },
      { title: 'Defrost and coil issues', body: 'Iced evaporators, failed defrost timers, and dirty condensers cleared so the box holds temperature.' },
      { title: 'Product-first response', body: 'Priority scheduling because a warm walk-in is spoiling inventory by the hour.' }
    ],
    faq: [
      { q: 'How fast can a tech get here?', a: 'Dispatch is 24/7 and techs are local to Tyler and the surrounding towns. A warm walk-in is treated as an emergency, so response is measured in hours, not next-day.' },
      { q: 'My cooler is warm but the compressor is running. What is wrong?', a: 'A compressor that runs constantly and still cannot hold temperature usually means low refrigerant from a leak, an iced coil, or a dirty condenser. All three are common and all three are fixable same-visit in most cases.' },
      { q: 'Can you help me save the product inside?', a: 'If the box is still cold enough, a tech can advise on holding temperatures while the repair happens. Fast response is the biggest factor in whether inventory survives.' }
    ]
  },
  {
    slug: 'reach-in-cooler-freezer-repair',
    name: 'Reach-In Cooler & Freezer Repair',
    short: 'Undercounters, prep tables, and reach-in merchandisers that will not hold temp, back in service quickly.',
    icon: 'appliance',
    h1: 'Reach-In Cooler & Freezer Repair',
    signs: [
      'The unit runs but will not pull down to temperature',
      'Frost or ice building up inside the cabinet',
      'A torn gasket or a door that will not seal',
      'The compressor cycling on and off rapidly',
      'Puddles under the unit or a fan that has gone quiet'
    ],
    causes: [
      'Worn or torn door gaskets',
      'A dirty condenser coil behind the kick plate',
      'A failed fan motor or start component',
      'A thermostat out of calibration or low refrigerant'
    ],
    intro: [
      'Reach-ins, undercounter units, prep tables, and glass-door merchandisers are the workhorses of a commercial kitchen, and they fail in ways that are easy to miss until food is at risk. Worn door gaskets, frosted-over evaporators, failing start components, and dirty condenser coils are the usual suspects.',
      'A tech services the whole unit, not just the symptom: gasket seal, coil condition, fan operation, thermostat calibration, and refrigerant charge. A reach-in that holds a steady temperature is a reach-in that passes inspection and keeps product safe.'
    ],
    bullets: [
      { title: 'All reach-in styles', body: 'Undercounters, prep tables, glass-door merchandisers, and upright reach-in coolers and freezers.' },
      { title: 'Gasket and door service', body: 'Worn gaskets and misaligned doors let warm air in and drive up runtime; both are quick, high-impact fixes.' },
      { title: 'Coil and fan cleaning', body: 'Grease-caked condenser coils are the single most common cause of a reach-in that runs but will not cool.' },
      { title: 'Component replacement', body: 'Thermostats, start relays, fan motors, and controls swapped with the right parts for your unit.' }
    ],
    faq: [
      { q: 'My prep table is freezing the food on one end. Why?', a: 'Uneven cooling usually points to an airflow problem, a failing fan motor, or a thermostat out of calibration. It is a common and straightforward diagnosis.' },
      { q: 'Is it worth repairing an older reach-in?', a: 'Often yes, especially for gasket, fan, or control failures. A tech will give you an honest read on whether a repair or replacement makes more sense for your unit.' },
      { q: 'The unit ices up a few days after every defrost. What is going on?', a: 'Repeated icing points to a defrost cycle problem, a bad gasket letting humid air in, or a drain line issue. All are correctable so the frost stops coming back.' }
    ]
  },
  {
    slug: 'commercial-ice-machine-repair',
    name: 'Commercial Ice Machine Repair',
    short: 'Low output, thin or cloudy cubes, and no-ice failures on commercial ice machines, cleared fast.',
    icon: 'pipe',
    h1: 'Commercial Ice Machine Repair in Tyler',
    signs: [
      'Ice comes out cloudy, soft, or smaller than it used to',
      'Production has dropped and you run out during a rush',
      'The machine will not finish a harvest cycle',
      'Water leaking around the base or the bin',
      'A slimy film or an off taste in the ice'
    ],
    causes: [
      'Hard-water scale on the evaporator and water lines',
      'A faulty water inlet valve or float',
      'A worn water pump or a clogged distribution tube',
      'A refrigeration or harvest-cycle fault'
    ],
    intro: [
      'When the ice machine goes down, a bar or restaurant feels it within the hour. East Texas water is hard, and scale is the number one enemy of an ice machine: it coats the evaporator, slows production, and produces thin, cloudy, or misshapen cubes long before the unit stops entirely.',
      'A tech addresses both the immediate failure and the cause, whether that is scale buildup, a water inlet or float problem, a failing water pump, or a refrigeration fault. Regular descaling and water treatment keep the machine producing at rated capacity.'
    ],
    bullets: [
      { title: 'Low or no production', body: 'Output problems traced to water supply, scale, refrigeration, or harvest-cycle faults.' },
      { title: 'Descaling and cleaning', body: 'Hard-water scale removed from the evaporator and water system, the top cause of poor cubes in East Texas.' },
      { title: 'Water system repair', body: 'Inlet valves, floats, pumps, and drain issues corrected so the machine cycles cleanly.' },
      { title: 'Sanitation for food safety', body: 'Ice is food. Machines cleaned and sanitized to keep slime and mold out of the bin.' }
    ],
    faq: [
      { q: 'My cubes are thin and cloudy. Is the machine dying?', a: 'Usually not. Thin, cloudy, or soft cubes are the classic sign of scale buildup and water quality issues, both of which a cleaning and water treatment fix.' },
      { q: 'How often should an ice machine be cleaned?', a: 'Most manufacturers call for cleaning and sanitizing at least twice a year; hard-water areas like ours often need it more. It is the cheapest way to avoid a breakdown.' },
      { q: 'The machine stopped making ice completely. What now?', a: 'A full stop can be water supply, a harvest-cycle fault, or a refrigeration problem. A tech can diagnose it quickly and get production back before your next rush.' }
    ]
  },
  {
    slug: 'walk-in-freezer-repair',
    name: 'Walk-In Freezer Repair',
    short: 'Rising freezer temps, heavy frost, and failed defrost on walk-in freezers, fixed before product thaws.',
    icon: 'crawl',
    h1: 'Walk-In Freezer Repair',
    signs: [
      'The freezer temperature is rising toward or above zero',
      'Heavy frost or a wall of ice on the evaporator coil',
      'A door frozen shut or an iced-over frame',
      'The floor buckling or slick with ice',
      'The unit running nonstop without a defrost cycle'
    ],
    causes: [
      'A failed defrost heater, timer, or termination sensor',
      'Low refrigerant or a leaking coil',
      'Door gaskets or frame heaters that have failed',
      'A condenser struggling in the summer heat'
    ],
    intro: [
      'A walk-in freezer holds thousands of dollars of product below zero, so a failure is expensive fast. Freezers add complications a cooler does not have: a defrost system that has to work perfectly, door heaters that prevent ice-ups, and the constant battle against frost on the evaporator coil.',
      'A tech checks the full picture: refrigerant charge and leaks, defrost heaters and timers, evaporator and condenser condition, door gaskets and heaters, and the controls tying it together. The target is a freezer holding steady at temperature with a defrost cycle that keeps the coil clear.'
    ],
    bullets: [
      { title: 'Defrost system repair', body: 'Failed defrost heaters, timers, and termination controls are the leading cause of a frosted, warming freezer.' },
      { title: 'Frost and coil buildup', body: 'Ice-choked evaporators cleared and the root cause corrected so the frost does not return.' },
      { title: 'Door and gasket heaters', body: 'Frozen-shut doors and iced frames fixed so the seal holds and the box stays sealed.' },
      { title: 'Emergency response', body: 'A warming freezer is the fastest way to lose inventory, so it gets priority dispatch.' }
    ],
    faq: [
      { q: 'My freezer is building up heavy frost on the coil. Why?', a: 'Heavy coil frost almost always means a defrost problem, a failed heater, timer, or termination sensor, or a door seal letting humid air in. All are repairable.' },
      { q: 'The freezer temperature is climbing. How long do I have?', a: 'It depends on how full the box is and how warm it is getting, but do not wait. Call right away; a tech can prioritize the response and advise on protecting product.' },
      { q: 'Can you work on both my cooler and freezer in one visit?', a: 'Yes. Many kitchens run both, and a tech can service multiple units on the same trip.' }
    ]
  },
  {
    slug: 'refrigeration-preventive-maintenance',
    name: 'Refrigeration Preventive Maintenance',
    short: 'Scheduled coil cleaning, gasket checks, and system tune-ups that stop breakdowns before they start.',
    icon: 'claim',
    h1: 'Refrigeration Preventive Maintenance',
    signs: [
      'It has been more than a year since your last service',
      'Energy bills creeping up with no change in use',
      'Condenser coils you can see packed with dust and grease',
      'Units getting louder, icing more, or struggling in the heat',
      'A health inspection coming up on the calendar'
    ],
    causes: [
      'Condenser coils packed with grease and dust',
      'Worn door gaskets driving up runtime',
      'Low refrigerant from slow, unnoticed leaks',
      'Clogged drain lines and neglected controls'
    ],
    intro: [
      'The cheapest refrigeration repair is the breakdown that never happens. Most emergency failures, dirty condensers, worn gaskets, low refrigerant, clogged drains, come from problems that were visible and fixable weeks earlier. A maintenance schedule catches them on your timeline instead of during Friday dinner service.',
      'Scheduled visits cover coil cleaning, gasket and door inspection, refrigerant and electrical checks, drain clearing, and temperature verification across your coolers, freezers, and ice machines. Consistent maintenance also protects you at health inspection time.'
    ],
    bullets: [
      { title: 'Condenser and coil cleaning', body: 'The single highest-value maintenance task, keeping units efficient and preventing heat-related failures.' },
      { title: 'Gasket and seal checks', body: 'Worn gaskets caught and replaced before they drive up runtime and energy costs.' },
      { title: 'Full system inspection', body: 'Refrigerant charge, electrical connections, controls, and drains checked on every visit.' },
      { title: 'Scheduled around your hours', body: 'Maintenance timed for slow periods so it never interrupts service.' }
    ],
    faq: [
      { q: 'How often should commercial refrigeration be serviced?', a: 'Most operators do well with quarterly visits, though high-volume kitchens and hard-water ice machines often benefit from more frequent service. A tech can recommend a schedule for your equipment.' },
      { q: 'Will maintenance really save me money?', a: 'Yes. Clean coils and good gaskets cut energy use, and catching small faults early avoids emergency-rate repairs and lost inventory. Maintenance almost always pays for itself.' },
      { q: 'Does maintenance help with health inspections?', a: 'It does. Documented service and verified holding temperatures make inspection day a non-event instead of a scramble.' }
    ]
  },
  {
    slug: 'emergency-refrigeration-service',
    name: 'Emergency Refrigeration Service',
    short: '24/7 response when a cooler, freezer, or ice machine goes down and product is on the line.',
    icon: 'storm',
    h1: 'Emergency Refrigeration Service in Tyler, TX',
    signs: [
      'A cooler or freezer climbing above safe temperature right now',
      'A unit that has stopped running entirely',
      'A refrigerant smell or water pooling fast',
      'Product at risk with no backup box to move it to',
      'A breaker that keeps tripping on a refrigeration circuit'
    ],
    causes: [
      'Compressor or fan motor failure',
      'A sudden refrigerant leak',
      'Electrical or control faults, or a tripped breaker',
      'An iced-over evaporator coil'
    ],
    intro: [
      'Refrigeration does not fail on a schedule. It fails on the hottest Saturday of the year, overnight before a delivery, or in the middle of a full dining room. When it does, every hour of downtime is spoiling inventory and threatening a health-code violation.',
      'Emergency dispatch is 24/7, including nights, weekends, and holidays. A tech local to East Texas arrives, diagnoses the failure, and gets the box back in temperature, whether that is a walk-in, a reach-in, a freezer, or an ice machine.'
    ],
    bullets: [
      { title: 'True 24/7 dispatch', body: 'Nights, weekends, and holidays, because that is exactly when refrigeration tends to quit.' },
      { title: 'All commercial equipment', body: 'Walk-ins, reach-ins, freezers, ice machines, and prep tables all covered by one call.' },
      { title: 'Product-protection focus', body: 'The first priority is stabilizing the box so your inventory and your health rating are safe.' },
      { title: 'Local techs, fast arrival', body: 'Crews based in and around Tyler mean response in hours, not a next-day window.' }
    ],
    faq: [
      { q: 'Do you really answer at 2 a.m.?', a: 'Yes. Dispatch is staffed around the clock, and a warm box is treated as the emergency it is regardless of the hour.' },
      { q: 'What should I do while I wait for the tech?', a: 'Keep doors closed to hold cold air, note the current temperature, and if a unit is clearly failing, be ready to move critical product to a working box. Dispatch can talk you through it.' },
      { q: 'Is emergency service more expensive?', a: 'After-hours work carries its rate, but a fast response usually costs far less than the spoiled inventory and downtime of waiting. A tech will be straight with you about the call.' }
    ]
  },
  {
    slug: 'refrigeration-installation',
    name: 'Refrigeration Installation',
    short: 'New walk-ins, reach-ins, and ice machines sized, installed, and started up right the first time.',
    icon: 'extract',
    h1: 'Commercial Refrigeration Installation',
    signs: [
      'A unit that needs repair more often than it runs reliably',
      'A box that never quite keeps up with your volume',
      'Equipment past its service life or costing more to run',
      'A new build-out, remodel, or menu change',
      'A used unit you bought that needs commissioning'
    ],
    causes: [
      'Equipment sized wrong for the load or space',
      'Line sets and drainage done sloppily',
      'A startup rushed without verifying the charge',
      'Electrical or code details cut short'
    ],
    intro: [
      'A refrigeration system that is installed right runs quieter, lasts longer, and costs less to operate for its entire life. Wrong sizing, sloppy line sets, poor drainage, or a rushed startup create problems that haunt a kitchen for years. Doing it correctly the first time is the whole game.',
      'From a single reach-in to a full walk-in cooler and freezer buildout, installation covers proper sizing, refrigerant line work, electrical, drainage, and a documented startup with verified temperatures. New equipment gets commissioned to run at spec from day one.'
    ],
    bullets: [
      { title: 'Right-sized systems', body: 'Equipment matched to your load and space so it holds temperature without short-cycling or running nonstop.' },
      { title: 'Clean installation', body: 'Proper line sets, drainage, and electrical done to code and to last, not just to pass a first glance.' },
      { title: 'Documented startup', body: 'Verified charge, temperatures, and controls at commissioning so the system runs at spec from day one.' },
      { title: 'Coolers, freezers, and ice', body: 'Walk-ins, reach-ins, freezers, and ice machines for kitchens, bars, C-stores, and markets.' }
    ],
    faq: [
      { q: 'Can you help me pick the right size unit?', a: 'Yes. Sizing is part of the job, and getting it right up front prevents the efficiency and reliability problems that come from an under- or oversized system.' },
      { q: 'Do you install equipment I already bought?', a: 'In most cases, yes. A tech can install and commission owner-supplied equipment, verifying it starts up and holds temperature correctly.' },
      { q: 'How long does a walk-in installation take?', a: 'It varies with the scope, from a single reach-in swap in a few hours to a multi-day walk-in buildout. A tech will give you a realistic timeline for your project.' }
    ]
  },
  {
    slug: 'display-case-repair',
    name: 'Display Case & Merchandiser Repair',
    short: 'Open merchandisers, deli and grocery display cases, and glass-door coolers that will not hold temp or keep fogging over.',
    icon: 'appliance',
    h1: 'Display Case & Merchandiser Repair in Tyler, TX',
    signs: [
      'The glass fogs, sweats, or drips onto product',
      'One end of the case runs warmer than the other',
      'Frost or ice building on the coil or the shelves',
      'The case runs but will not hold a safe temperature',
      'Product on display spoiling or looking tired fast'
    ],
    causes: [
      'Failed anti-sweat heaters or worn gaskets',
      'A dirty condenser coil behind the kick plate',
      'A blocked airflow path or a failing fan',
      'Low refrigerant or a defrost fault'
    ],
    intro: [
      'A refrigerated display case sells product while it cools it, so when it drifts warm or fogs over you lose the sale and risk the food at the same time. Open grab-and-go merchandisers, deli and meat cases, bakery cases, and glass-door beverage coolers all sit in the sweet spot for trouble: constant door use, warm store air spilling in, and condenser coils packed with dust behind the kick plate.',
      'A tech gets the case back into the safe zone and keeps the glass clear, checking the refrigerant charge, evaporator and condenser coils, the defrost cycle, anti-sweat heaters, fans, and door gaskets so the product stays cold and looks the part.'
    ],
    bullets: [
      { title: 'All case styles', body: 'Open-air merchandisers, deli and meat cases, bakery and floral cases, and glass-door beverage coolers.' },
      { title: 'Fogging and sweating', body: 'Foggy glass and dripping cases traced to anti-sweat heaters, worn gaskets, or humidity load, and corrected.' },
      { title: 'Warm-zone diagnosis', body: 'Coils, charge, fans, and defrost checked so the whole case holds a safe, even temperature end to end.' },
      { title: 'Storefront-friendly timing', body: 'Repairs scheduled around your traffic so a full case is not sitting open during a rush.' }
    ],
    faq: [
      { q: 'The glass on my case keeps fogging up. Is that a refrigeration problem?', a: 'Usually yes. Fogging and sweating point to failed anti-sweat heaters, worn door gaskets, or a humidity and airflow issue in the case, all of which a tech can correct.' },
      { q: 'Only one end of my display case is warm. Why?', a: 'Uneven case temperature usually comes from an airflow blockage, a failing fan, a dirty coil, or a defrost fault. It is a common and fixable diagnosis.' },
      { q: 'Can you work on grocery and convenience store cases?', a: 'Yes. Open merchandisers, glass-door reach-in coolers, and deli and grocery display cases are all part of the job, timed around your store hours.' }
    ]
  }
];
