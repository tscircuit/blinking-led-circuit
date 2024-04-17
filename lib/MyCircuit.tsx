import { SmallOutline } from "@tscircuit/footprints"

export const Trace = ({
  from,
  to,
  thickness,
  pcb_route_hints,
  schematic_route_hints,
}: {
  from: string
  to: string
  thickness?: string
  pcb_route_hints?: { x: number; y: number; via?: boolean }[]
  schematic_route_hints?: { x: number; y: number }[]
}) => (
  <trace
    from={from}
    to={to}
    thickness={thickness ?? "0.2mm"}
    pcb_route_hints={pcb_route_hints}
    schematic_route_hints={schematic_route_hints}
  />
)

export const Battery = ({
  name,
  center,
  pcb_x,
  pcb_y,
}: {
  name: string
  center: [number, number]
  pcb_x: number
  pcb_y: number
}) => (
  <component
    center={center}
    name={name}
    pcb_x={pcb_x}
    pcb_y={pcb_y}
    supplier_part_numbers={{
      jlcpcb: ["C70377"],
    }}
  >
    <port name="neg" x="-0.5mm" y="0mm" dir="left" />
    <port name="pos" x="0.5mm" y="0mm" dir="right" />
    <schematicbox width="2mm" height="0.5mm" x={0} y={0} />
    <schematictext
      text={name}
      position={{
        x: 0,
        y: 0,
      }}
    />
    <schematictext
      text="-"
      position={{
        x: -0.25,
        y: -0.125,
      }}
    />
    <schematictext
      text="+"
      position={{
        x: 0.25,
        y: -0.125,
      }}
    />
    <smtpad
      shape="rect"
      layer="top"
      x={0}
      y={-26 / 2 - 3 / 2}
      width="4.2mm"
      height="3mm"
      port_hints={["pos"]}
    />
    <smtpad
      shape="rect"
      layer="top"
      x={0}
      y={26 / 2 + 3 / 2}
      width="4.2mm"
      height="3mm"
      port_hints={["neg"]}
    />
  </component>
)

export const MyCircuit = () => (
  <board width="100mm" height="120mm" center_x={0} center_y={0}>
    <resistor
      resistance="100k"
      name="R1"
      footprint="1210"
      center={[-3, 0.5]}
      pcb_x={10}
      pcb_y={5}
      supplier_part_numbers={{
        jlcpcb: ["C620660"],
      }}
      rotation="90deg"
    />
    <resistor
      resistance="1k"
      name="R2"
      pcb_x={10}
      pcb_y={-5}
      supplier_part_numbers={{
        jlcpcb: ["C52444"],
      }}
      footprint="1210"
      center={[-3, -1]}
      rotation="90deg"
    />
    <resistor
      resistance="220"
      name="R3"
      pcb_x={30}
      pcb_y={5}
      supplier_part_numbers={{
        jlcpcb: ["C3000591"],
      }}
      footprint="1210"
      rotation="90deg"
      center={[3, 2]}
    />
    <capacitor
      capacitance="10uF"
      name="C1"
      pcb_x={10}
      pcb_y={10}
      footprint="1210"
      supplier_part_numbers={{
        jlcpcb: ["C92834"],
      }}
      center={[-3, 2]}
      rotation="90deg"
    />
    <diode
      name="LED"
      footprint="1210"
      supplier_part_numbers={{
        jlcpcb: ["C965841"],
      }}
      center={[3, 0.5]}
      rotation="90deg"
      pcb_x={30}
      pcb_y={0}
    />
    <bug
      name="U1"
      pcb_x={20}
      pcb_y={0}
      supplier_part_numbers={{
        jlcpcb: ["C596355"],
      }}
      footprint={
        <SmallOutline
          pad_count={8}
          pad_length={0.5}
          pad_width={1}
          pad_pitch={1.27}
          row_spacing={5.5}
        />
      }
      center={[0, 0]}
      port_arrangement={{
        left_side: {
          pins: [6, 7, 2],
        },
        right_side: {
          pins: [8, 4, 3, 5, 1],
        },
      }}
      port_labels={{
        // NE555 port labels
        1: "GND",
        2: "TRIG",
        3: "OUT",
        4: "RESET",
        5: "CTRL",
        6: "THRES",
        7: "DISCH",
        8: "VCC",
      }}
    />
    <Battery name="B1" center={[-1.5, -3]} pcb_x={-30} pcb_y={30} />
    <Battery name="B2" center={[1.5, -3]} pcb_x={-30} pcb_y={-30} />
    <Trace from=".B1 > .pos" thickness="1mm" to=".B2 > .neg" />
    <Trace from=".U1 > .DISCH" to=".R2 > .right" />
    <Trace from=".R2 > .right" to=".R1 > .left" />
    <Trace from=".R1 > .right" to=".C1 > .left" />
    <Trace from=".U1 > .THRES" to=".C1 > .left" />
    <Trace from=".U1 > .TRIG" to=".C1 > .left" />
    <Trace
      from=".C1 > .right"
      to=".B1 > .neg"
      thickness="0.6mm"
      schematic_route_hints={[
        {
          x: -4,
          y: 3,
        },
        {
          x: -4,
          y: -3,
        },
      ]}
    />
    <Trace
      from=".U1 > .GND"
      to=".C1 > .right"
      pcb_route_hints={[
        {
          x: 14,
          y: -2,
          via: true,
        },
        {
          x: 14,
          y: 12,
          via: true,
        },
      ]}
    />
    <Trace from=".R3 > .right" to=".C1 > .right" />
    <Trace from=".LED > .right" to=".R3 > .left" />
    <Trace
      from=".U1 > .OUT"
      to=".LED > .left"
      pcb_route_hints={[
        {
          x: 19,
          y: 1,
          via: true,
        },
        {
          x: 26,
          y: 0,
          via: true,
        },
      ]}
    />
    <bug
      name="S1"
      pcb_x={0}
      pcb_y={-20}
      supplier_part_numbers={{
        jlcpcb: ["C2906280"],
      }}
      footprint={
        <SmallOutline
          pad_count={6}
          pad_length={1}
          pad_width={2}
          pad_pitch={2.5}
          row_spacing={4.5}
        />
      }
      center={[4, -1.5]}
      port_arrangement={{
        left_size: 3,
        right_size: 3,
      }}
      port_labels={{
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
      }}
    />
    <Trace
      from=".U1 > .RESET"
      to=".S1 > .3"
      pcb_route_hints={[
        {
          x: 16,
          y: 3,
          via: true,
        },
        {
          x: 16,
          y: -6,
          via: true,
        },
      ]}
    />
    <Trace from=".R2 > .left" to=".S1 > .3" />
    <Trace from=".U1 > .VCC" to=".S1 > .3" />

    <Trace from=".B2 > .pos" to=".S1 > .2" thickness="0.6mm" />
  </board>
)
